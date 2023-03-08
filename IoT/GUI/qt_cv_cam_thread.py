import cv2
import numpy as np

from PySide2.QtWidgets import *
from PySide2.QtGui import *
from PySide2.QtCore import *

from time import *
from MainWindow import Ui_Form


class MyThread(QThread):
    # mySignal = Signal(QPixmap)
    mySignal = Signal(QPixmap, QPixmap)

    def __init__(self):
        super(MyThread, self).__init__()
        self.cam = cv2.VideoCapture(0)
        
        self.cam.set(cv2.CAP_PROP_BUFFERSIZE, 2 ) #

        self.cam.set(3, 480)
        self.cam.set(4, 320)

        self.FPS = 60 #
        self.FPS_MS = int(1/self.FPS * 1000) #


        self.mode = 'edge'

    def run(self):
        while True:
            ret, self.img = self.cam.read()
            if ret:
                self.img = cv2.flip(self.img, -1) 
                self.printImage(self.img)
            # sleep(0.1)
            # sleep(0.001)

    def printImage(self, imgBGR):
        imgRGB = cv2.cvtColor(imgBGR, cv2.COLOR_BGR2RGB)
        h, w, byte = imgRGB.shape
        img = QImage(imgRGB, w, h, byte * w, QImage.Format_RGB888)
        pix_img = QPixmap(img)

        if self.mode != 'og':
            img_after = self.processingImage(imgBGR, self.mode)
            img2 = QImage(img_after, w, h, img_after.strides[0], QImage.Format_Grayscale8)
            pix_img2 = QPixmap(img2)
        else:
            pix_img2 = pix_img

        self.mySignal.emit(pix_img, pix_img2)   

    def processingImage(self, img, mode='edge'):
        if mode == 'edge':
            img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            img = cv2.Canny(img, 80, 80)

        if mode == 'blur':
            img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            img = cv2.blur(img, (15, 15))

        if mode == 'morph':
            img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            kernel = np.ones((3, 3))
            img = cv2.morphologyEx(img, cv2.MORPH_GRADIENT, kernel)

        return img


class MyApp(QWidget, Ui_Form):
    def __init__(self):
        super().__init__()
        # set class variable
        self.th = None

        # set class functions
        self.setupUi(self)
        self.video_process('start') 

    def video_process(self, status = 'start'):
        if status == 'start':
            self.th = MyThread()
            self.th.start()
        else:
            self.th.terminate()
            self.th.wait(3000)

    def go_next_page(self):
        currentpage = self.stackedWidget.currentIndex()
        self.stackedWidget.setCurrentIndex(currentpage + 1)

    def go_prev_page(self):
        currentpage = self.stackedWidget.currentIndex()
        self.stackedWidget.setCurrentIndex(currentpage - 1)

    def go_home_page(self):
        self.stackedWidget.setCurrentIndex(0)

    def go_video_page(self):
        currentpage = self.stackedWidget.currentIndex()
        self.stackedWidget.setCurrentIndex(currentpage + 2)

    def go_end_page(self):
        self.stackedWidget.setCurrentIndex(self.stackedWidget.count() - 1)

    def close_window(self):
        self.video_stream('close')
        self.close()


app = QApplication()
win = MyApp()
win.show()
app.exec_()