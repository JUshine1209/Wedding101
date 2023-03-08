import importlib.util
import picamera
import time
from threading import Condition
import io
from PIL import Image
import numpy as np

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

from sampleui import Ui_Form


class StreamingOutput(object):
    def __init__(self):
        self.buffer = io.BytesIO()
        
        # Specify resolution
        self.resolution = (640, 480)
        
        # Specify video codec
        self.codec = cv2.VideoWriter_fourcc(*"XVID")
        
        # Specify name of Output file
        self.filename = "Recording.avi"
        
        # Specify frames rate. We can choose
        # any value and experiment with it
        self.fps = 15
        
        # Creating a VideoWriter object
        self.out = cv2.VideoWriter(self.filename, self.codec, self.fps, self.resolution)



    def write(self, buf):
        if buf.startswith(b'\xff\xd8'):
            self.buffer.seek(0)
        return self.buffer.write(buf)


class MyThread(QThread):
    mySignal = Signal(QPixmap)

    def __init__(self):
        super().__init__()
        self.cam = picamera.PiCamera()
        self.cam.resolution = (640, 480)
        self.cam.rotation = 180
        # self.cam.framerate = 30

        self.cam.hflip = True
        self.output = StreamingOutput()

        self.video_frame = None
        self.background_image_temp = Image.open("../GUI/BackgroundImage/flower1.png")
        self.background_image = np.array(self.background_image_temp)[:,:,:3]
        self.background_image = np.resize(self.background_image_temp, (480, 640, 3))
        # print(f'bg size: {np.shape(self.background_image)}')
        # self.background_image = self.background_image[:,:,::-1]

        
    def run(self):
        self.cam.start_recording(self.output, format='mjpeg')
        while True:
            self.printImage()
            # time.sleep(1/30) # 60 fps

    def printImage(self):
        self.output.buffer.seek(0)
        image_data = self.output.buffer.read()
        if len(image_data) != 0:    
            img = Image.open(io.BytesIO(image_data))
            self.video_frame = np.array(img)
            # print(f'frame size: {np.shape(self.video_frame)}')
            self.video_frame = self.video_frame[:,:,::-1]
            # self.chromakey_replacement()
            self.output.out.write(self.video_frame)
        # image_data = 
        qimg = QImage.fromData(image_data)
        pix_img = QPixmap(qimg)
        self.mySignal.emit(pix_img)

    def chromakey_replacement(self):
        # # check hsv value from image
        # hsv = cv2.cvtColor(self.video_frame, cv2.COLOR_BGR2HSV)
        
        # # make a mask from hsv values
        # mask = cv2.inRange(hsv, (50, 150, 0), (70, 255, 255)) # 영상, 최솟값, 최댓값
        
        # # utilizing mask to input image
        # # copyTo(src, mask, dst)
        # cv2.copyTo(self.background_image, mask, self.video_frame)

        norm_factor = 255
        b = self.video_frame[:, :, 0] / norm_factor
        g = self.video_frame[:, :, 1] / norm_factor
        r = self.video_frame[:, :, 2] / norm_factor

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
        mask = (red_vs_green + blue_vs_green) * 255
        mask[mask > 50] = 255

        self.video_frame[mask == 0] = self.background_image[mask == 0]



class MainWindow(QWidget):
    # class constructor
    def __init__(self):
        # call QWidget constructor
        super().__init__()
        self.ui = Ui_Form()
        self.ui.setupUi(self)
        self.th = MyThread()
        self.th.mySignal.connect(self.setImage)
        self.th.start()

    def setImage(self, img):
        self.ui.label.setPixmap(img)

    def close_window(self):
        self.th.output.video_out.release()
        self.th.quit()
        self.th.wait(3000)
        self.close()


app = QApplication()
win = MainWindow()

win.show()
app.exec_()