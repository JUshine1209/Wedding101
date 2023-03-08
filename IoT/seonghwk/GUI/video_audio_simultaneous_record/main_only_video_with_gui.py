import importlib.util

spec = importlib.util.find_spec("PySide2")
if spec is None:
    from PySide6.QtWidgets import *
    from PySide6.QtCore import *
    from PySide6.QtGui import *
else:
    from PySide2.QtWidgets import *
    from PySide2.QtCore import *
    from PySide2.QtGui import *
    import cv2


import pyaudio, wave, threading, time, subprocess, os

from cam_write_ui import Ui_Form

class VideoRecorder(QThread):
    def __init__(self):
        super().__init__()
        if spec is not None:
            self.cam = cv2.VideoCapture(0)
            self.img = None
            self.video_stream = None
            self.fourcc = cv2.VideoWriter_fourcc(*'XVID')
            self.record = False

    def run(self):
        while True:
            ret, self.img = self.cam.read()
            if ret:
                self.resize_image(width=1024)
                self.printImage()
            else:
                print("camera is not working")
            sleep(0.05)
  


class MainWindow(QWidget):
    # class constructor
    def __init__(self):
        # call QWidget constructor
        super().__init__()
        self.ui = Ui_Form()
        self.ui.setupUi(self)
        # icon
        self.setWindowIcon(QIcon('icon.png'))
        # create a timer
        self.viewTimer = QTimer()
        self.saveTimer = QTimer()
        # set timer timeout callback function
        self.viewTimer.timeout.connect(self.viewCam)
        self.saveTimer.timeout.connect(self.saveCam)
        # set control_bt callback clicked  function
        self.ui.control_bt.clicked.connect(self.controlView)
        self.ui.save_bt.clicked.connect(self.controlSave)
        # set video output
        self.out = cv2.VideoWriter('outpy.avi',cv2.VideoWriter_fourcc('M', 'J', 'P', 'G'), 24, (640, 480))
        # waring message box
        self.msg = QMessageBox()
        self.msg.setWindowIcon(QIcon('warning.png'))



    # view camera
    def viewCam(self):
        if not self.saveTimer.isActive():
            # read image in BGR format
            ret, image = self.cap.read()
            image = cv2.flip(image, 0)
            image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

            # get image infos
            height, width, channel = image.shape
            step = channel * width
            # create QImage from image
            qImg = QImage(image.data, width, height, step, QImage.Format_RGB888)
            # show image in img_label
            self.ui.image_label.setPixmap(QPixmap.fromImage(qImg))


    # start/stop timer
    def controlSave(self):
        # if camera timer active
        if self.viewTimer.isActive():
            self.msg.setWindowTitle("Warning")
            self.msg.setText("Please stop the camera")
            self.msg.exec_()
        # if timer is stopped
        if not self.saveTimer.isActive():
            if not self.viewTimer.isActive():
                # create video capture
                self.cap = cv2.VideoCapture(0)
                # start timer
                self.saveTimer.start(30)
                # update save_bt text
                self.ui.save_bt.setText("Stop")
        # if timer is started
        else:
            # stop timer
            self.saveTimer.stop()
            # release video capture
            self.cap.release()
            # update save_bt text
            self.ui.save_bt.setText("Save")
            self.ui.image_label.setText("Camera")

    def controlView(self):
        # if timer is stopped
        if self.saveTimer.isActive():
            self.msg.setWindowTitle("Warning")
            self.msg.setText("Please stop recording")
            self.msg.exec_()
        if not self.viewTimer.isActive():
            if not self.saveTimer.isActive():
                # create video capture
                self.cap = cv2.VideoCapture(0)
                # start timer
                self.viewTimer.start(30)
                # update control_bt text
                self.ui.control_bt.setText("Stop")
        # if timer is started
        else:
            # stop timer
            self.viewTimer.stop()
            # release video capture
            self.cap.release()
            # update control_bt text
            self.ui.control_bt.setText("Start")
            self.ui.image_label.setText("Camera")

    def saveCam(self):
        if not self.viewTimer.isActive():
            ret, image = self.cap.read()
            image = cv2.flip(image, 0)
            image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

            # get image infos
            height, width, channel = image.shape
            step = channel * width
            # write video
            self.out.write(image)
            # create QImage from image
            qImg = QImage(image.data, width, height, step, QImage.Format_RGB888)
            # show image in img_label
            self.ui.image_label.setPixmap(QPixmap.fromImage(qImg))


app = QApplication()
win = MainWindow()

win.show()
app.exec_()