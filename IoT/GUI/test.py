from PySide2.QtWidgets import *
from PySide2.QtCore import *
from PySide2.QtGui import *
from MainWindow import Ui_Form
from time import *
import cv2

class MyThread(QThread):
    mySignal = Signal(QPixmap)

    def __init__(self):
        super().__init__()
        self.video_stream = cv2.VideoCapture(0)
        self.img = None
        self.fourcc = cv2.VideoWriter_fourcc(*'XVID')
        self.record = False


    def run(self):
        while True:
            ret, self.img = self.video_stream.read()
            if ret:
                # self.resize_image()
                self.printImage()
            else:
                print("camera is not working")
            sleep(0.05)
    
    def resize_image(self):
        self.img = cv2.flip(self.img, -1)

    def printImage(self):
        imgBGR = self.img
        imgRGB = cv2.cvtColor(imgBGR, cv2.COLOR_BGR2RGB)
        h, w, byte = imgRGB.shape
        img = QImage(imgRGB, w, h, byte*w, QImage.Format_RGB888)
        pix_img = QPixmap(img)
        self.mySignal.emit(pix_img)


class MyApp(QWidget, Ui_Form):
    def __init__(self):
        super().__init__()
        # set class variable
        self.th = None

        # set class functions
        self.setupUi(self)
        self.main()

    def main(self):
        # from Thread import MyThread
        # this is video thread
        self.th = MyThread()
        self.th.mySignal.connect(self.setImage)
        self.th.start()

    def go_next_page(self):
        currentpage = self.stackedWidget.currentIndex()
        sender = self.sender()
        print(sender)
        if sender.objectName() == "mode_select_video_button":
            currentpage += 1
        self.stackedWidget.setCurrentIndex(currentpage + 1)

    def go_prev_page(self):
        currentpage = self.stackedWidget.currentIndex()
        sender = self.sender()
        print(sender.objectName())
        if sender.objectName() == "video_prev_button":
            currentpage -= 1
        self.stackedWidget.setCurrentIndex(currentpage - 1)

    def go_home_page(self):
        self.stackedWidget.setCurrentIndex(0)

    def go_video_page(self):
        currentpage = self.stackedWidget.currentIndex()
        self.stackedWidget.setCurrentIndex(currentpage + 2)

    def go_end_page(self):
        self.stackedWidget.setCurrentIndex(self.stackedWidget.count() - 1)

    def setImage(self, img):
        self.video_stream.setPixmap(img)

    def close_window(self):
        self.th.terminate()
        self.th.wait(3000)
        self.close()
        

app = QApplication()
win = MyApp()

win.show()
app.exec_()
