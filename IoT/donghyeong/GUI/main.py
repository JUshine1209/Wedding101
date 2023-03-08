import os
import imutils
import numpy as np
import importlib.util
import mediapipe as mp

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

from MainWindow import Ui_Form
from time import *
from random import randrange

class MyThread(QThread):
    mySignal = Signal(QPixmap)
    def __init__(self):
        super().__init__()
        if spec is not None:
            self.cam = cv2.VideoCapture(0)
            self.frame_cnt = 0
            self.img = None
            self.video_stream = None
            self.fourcc = cv2.VideoWriter_fourcc(*'XVID')
            self.record = False
            self.background_image = None

            self.fps = 60
            self.width = 640
            self.height = 480

            # mediapipe modules
            self.mp_drawing = mp.solutions.drawing_utils
            self.mp_drawing_styles = mp.solutions.drawing_styles
            self.mp_selfie_segmentation = mp.solutions.selfie_segmentation
            self.mp_holistic = mp.solutions.holistic


    def run(self):
        # setting the background image
        self.set_background_image(bg_dir = "./BackgroundImage", bg_name = "flower1.png")

        while True:
            ret, self.img = self.cam.read()

            if ret:
                self.resize_image()
                self.image_processing(mode = 1, frame_check = 1)
                self.printImage()
            else:
                print("camera is not working")
                self.close_window()
                return

            self.frame_cnt += 1
            sleep(1/self.fps) # 60 fps


    def set_background_image(self, bg_dir = "./BackgroundImage", bg_name = 'flower1.png'):
        background_path = os.path.join(bg_dir, bg_name)
        background_image = cv2.imread(background_path)
        background_image = cv2.resize(background_image, (self.width, self.height))
        self.background_image = background_image


    def resize_image(self):
        image = self.img
        # 상하반전
        image = cv2.flip(image, 0) 
        
        # 1) 가로 모드
        # resizing - default interpolation: linear
        image = cv2.resize(image, (self.width, self.height))

        # TODO: 2) 세로모드 - rotation + resize

        self.img = image


    def image_processing(self, mode = 2, frame_check = 12):
        '''
        1. Segmentation - selfie
        2. Detection - right/left hand, Pose
        3. Chroma key replacement
        '''

        # 1. Selfie Segmentation
        if mode == 1:
            self.mediapipe_selfie_segmentation()

        # 2. Detection
        elif (mode == 2) and (self.frame_cnt % frame_check == 0):
            self.mediapipe_holistic()
        
        elif (mode == 3) :
            self.chromakey_replacement()


    def mediapipe_holistic(self) :
        with self.mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:

            # Recolor from BGR to RGB
            self.img = cv2.cvtColor(self.img, cv2.COLOR_BGR2RGB)

            # Make Detections
            results = holistic.process(self.img)

            # Recolor from RGB to BGR
            self.img = cv2.cvtColor(self.img, cv2.COLOR_RGB2BGR)

            # Right hand
            self.mp_drawing.draw_landmarks(self.img, 
                                            results.right_hand_landmarks, 
                                            self.mp_holistic.HAND_CONNECTIONS)
            
            # Left hand
            self.mp_drawing.draw_landmarks(self.img, 
                                            results.left_hand_landmarks, 
                                            self.mp_holistic.HAND_CONNECTIONS)

            # # Pose Detection 
            # self.mp_drawing.draw_landmarks(self.img, 
            #                                results.pose_landmarks, 
            #                                self.mp_holistic.POSE_CONNECTIONS)

    def mediapipe_selfie_segmentation(self) :
        # For webcam input:
        BG_COLOR = (192, 192, 192) # gray
        with self.mp_selfie_segmentation.SelfieSegmentation(model_selection=1) as selfie_segmentation:
            self.img

            # Flip the image horizontally for a later selfie-view display, and convert
            # the BGR image to RGB.
            self.img = cv2.cvtColor(cv2.flip(self.img, 1), cv2.COLOR_BGR2RGB)
            
            # To improve performance, optionally mark the image as not writeable to
            # pass by reference.
            self.img.flags.writeable = False
            self.img.flags.writeable = True
            self.img = cv2.cvtColor(self.img, cv2.COLOR_RGB2BGR)

            # Draw selfie segmentation on the background image.
            # To improve segmentation around boundaries, consider applying a joint
            # bilateral filter to "results.segmentation_mask" with "image".
            condition = np.stack((selfie_segmentation.process(self.img).segmentation_mask,) * 3, axis=-1) > 0.1
            
            # The background can be customized.
            #   a) Load an image (with the same width and height of the input image) to
            #      be the background, e.g., bg_image = cv2.imread('/path/to/image/file')
            #   b) Blur the input image by applying image filtering, e.g.,
            #      bg_image = cv2.GaussianBlur(image,(55,55),0)
            if self.background_image is None:
                self.background_image = np.zeros(self.img.shape, dtype=np.uint8)
                self.background_image[:] = BG_COLOR

            self.img = np.where(condition, self.img, self.background_image)


    def chromakey_replacement(self):
        # # check hsv value from image
        # hsv = cv2.cvtColor(self.img, cv2.COLOR_BGR2HSV)
        
        # # make a mask from hsv values
        # mask = cv2.inRange(hsv, (50, 150, 0), (70, 255, 255)) # 영상, 최솟값, 최댓값
        
        # # utilizing mask to input image
        # # copyTo(src, mask, dst)
        # cv2.copyTo(self.background_image, mask, self.img)

        norm_factor = 255
        b = self.img[:, :, 0] / norm_factor
        g = self.img[:, :, 1] / norm_factor
        r = self.img[:, :, 2] / norm_factor

        red_vs_green = (r - g) + .3
        blue_vs_green = (b - g) + .3

        """
        Darker pixels would be around 0.
        In order to ommit removing dark pixels we
        sum .3 to make small negative numbers to be
        above 0.
        """

        red_vs_green = (r - g) + .3
        blue_vs_green = (b - g) + .3

        """
        Now pixels below 0. value would have a
        high probability to be background green
        pixels.
        """
        red_vs_green[red_vs_green < 0] = 0
        blue_vs_green[blue_vs_green < 0] = 0

        """
        Combine the red(blue) vs green ratios to
        set an alpha layer with valid alpha-values.
        """
        alpha = (red_vs_green + blue_vs_green) * 255
        
        self.img[alpha == 0] = 0


    def printImage(self):
        imgBGR = self.img
        imgRGB = cv2.cvtColor(imgBGR, cv2.COLOR_BGR2RGB)
        h, w, byte = imgRGB.shape
        img = QImage(imgRGB, w, h, byte * w, QImage.Format_RGB888)
        pix_img = QPixmap(img)
        self.mySignal.emit(pix_img)


class MyApp(QWidget, Ui_Form):
    userSignal = Signal()
    def __init__(self):
        super().__init__()
        # set class variable
        self.th = None

        # set class functions
        self.setupUi(self)
        self.main()

    def main(self):
        # this is video thread
        if spec is not None:
            self.th = MyThread()
            self.th.mySignal.connect(self.setImage)
            self.th.start()

    def setImage(self, img):
        self.video_stream.setPixmap(img)
    
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

    def record_start(self):
        pass

    def record_stop(self):
        pass

    def close_window(self):
        if spec is not None:
            self.th.terminate()
            self.th.wait(3000)
        self.frame_cnt = 0
        self.close()


app = QApplication()
win = MyApp()

win.show()
app.exec_()
