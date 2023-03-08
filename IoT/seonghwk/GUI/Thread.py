from PySide2.QtWidgets import *
from PySide2.QtCore import *
from PySide2.QtGui import *
from MainWindow import Ui_Form
import cv2
import datetime
from time import *

class MyThread(QThread):
    mySignal = Signal(QPixmap)

    def __init__(self):
        super().__init__()
        self.cam = cv2.VideoCapture(0)
        self.img = None
        self.video_stream = None
        self.fourcc = cv2.VideoWriter_fourcc(*'XVID')
        self.record = False
    
    def __call__(self):
        self.mySignal.connect(self.setImage)
        self.start()

    def run(self):
        while True:
            ret, self.img = self.cam.read()
            if ret:
                self.resize_image()
                self.printImage()
            else:
                print("camera is not working")
            sleep(0.05)
    
    def resize_image(self):
        self.img = cv2.flip(self.img, -1)
        
    def setImage(self, img):
        self.video_stream.setPixmap(img)

    def printImage(self):
        imgBGR = self.img
        imgRGB = cv2.cvtColor(imgBGR, cv2.COLOR_BGR2RGB)
        h, w, byte = imgRGB.shape
        img = QImage(imgRGB, w, h, byte*w, QImage.Format_RGB888)
        pix_img = QPixmap(img)
        self.mySignal.emit(pix_img)
