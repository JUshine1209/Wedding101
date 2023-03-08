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
import mediapipe as mp
import numpy as np
from datetime import datetime
from uuid import uuid4


from simpleui import Ui_Form


class VideoRecorder(QThread):
    mySignal = Signal(QPixmap)

    "Video class based on openCV"
    def __init__(self, name="temp_video.avi", fourcc="MJPG", sizex=640, sizey=480, camindex=0, fps=60):
        super().__init__()
        self.open = True
        self.device_index = camindex
        self.fps = fps                  # fps should be the minimum constant rate at which the camera can
        self.fourcc = fourcc            # capture images (with no decrease in speed over time; testing is required)
        self.frameSize = (sizex, sizey) # video formats and sizes also depend and vary according to the camera used
        self.video_filename = name + "-video.avi"
        self.video_cap = cv2.VideoCapture(self.device_index)
        self.video_writer = cv2.VideoWriter_fourcc(*self.fourcc)
        self.video_out = cv2.VideoWriter(self.video_filename, self.video_writer, self.fps, self.frameSize)
        self.frame_counts = 1
        self.start_time = time.time()
        self.video_frame = None
        self.background_image = None


        self.fps = 60
        self.width = 640
        self.height = 480
        # mediapipe modules
        # self.mp_drawing = mp.solutions.drawing_utils
        # self.mp_drawing_styles = mp.solutions.drawing_styles
        self.mp_selfie_segmentation = mp.solutions.selfie_segmentation
        # self.mp_holistic = mp.solutions.holistic


    def run(self):
        # self.set_background_image(bg_dir = "../BackgroundImage", bg_name = "flower1.png")

        "Video starts being recorded"
        # counter = 1
        timer_start = time.time()
        timer_current = 0
        self.open = True
        while self.open:
            ret, self.video_frame = self.video_cap.read()
            if ret:
                self.video_frame = cv2.flip(self.video_frame, 0)
                # self.chromakey_replacement()
                # self.mediapipe_selfie_segmentation()
                self.video_out.write(self.video_frame)
                # print(str(counter) + " " + str(self.frame_counts) + " frames written " + str(timer_current))
                self.frame_counts += 1


                imgRGB = cv2.cvtColor(self.video_frame, cv2.COLOR_BGR2RGB)
                h, w, byte = imgRGB.shape
                img = QImage(imgRGB, w, h, byte * w, QImage.Format_RGB888)
                pix_img = QPixmap(img)
                self.mySignal.emit(pix_img)

                # counter += 1
                # timer_current = time.time() - timer_start
                # time.sleep(1/self.fps)
                # gray = cv2.cvtColor(video_frame, cv2.COLOR_BGR2GRAY)                 
                # cv2.imshow('video_frame', gray)
                # cv2.waitKey(1)
            else:
                break

    def set_background_image(self, bg_dir = "../BackgroundImage", bg_name = 'flower1.png'):
        background_path = os.path.join(bg_dir, bg_name)
        background_image = cv2.imread(background_path)
        background_image = cv2.resize(background_image, (self.width, self.height))
        self.background_image = background_image

    def mediapipe_selfie_segmentation(self) :
        # For webcam input:
        BG_COLOR = (192, 192, 192) # gray
        with self.mp_selfie_segmentation.SelfieSegmentation(model_selection=1) as selfie_segmentation:

            # Flip the image horizontally for a later selfie-view display, and convert
            # the BGR image to RGB.
            self.video_frame = cv2.cvtColor(cv2.flip(self.video_frame, 1), cv2.COLOR_BGR2RGB)
            
            # To improve performance, optionally mark the image as not writeable to
            # pass by reference.
            self.video_frame.flags.writeable = False
            self.video_frame.flags.writeable = True
            self.video_frame = cv2.cvtColor(self.video_frame, cv2.COLOR_RGB2BGR)

            # Draw selfie segmentation on the background image.
            # To improve segmentation around boundaries, consider applying a joint
            # bilateral filter to "results.segmentation_mask" with "image".
            condition = np.stack((selfie_segmentation.process(self.video_frame).segmentation_mask,) * 3, axis=-1) > 0.1
            
            # The background can be customized.
            #   a) Load an image (with the same width and height of the input image) to
            #      be the background, e.g., bg_image = cv2.imread('/path/to/image/file')
            #   b) Blur the input image by applying image filtering, e.g.,
            #      bg_image = cv2.GaussianBlur(image,(55,55),0)
            if self.background_image is None:
                self.background_image = np.zeros(self.video_frame.shape, dtype=np.uint8)
                self.background_image[:] = BG_COLOR

            self.video_frame = np.where(condition, self.video_frame, self.background_image)

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
        alpha = (red_vs_green + blue_vs_green) * 255
        alpha[alpha > 50] = 255

        self.video_frame[alpha == 0] = self.background_image[alpha == 0]

    def stop(self):
        "Finishes the video recording therefore the thread too"
        if self.open:
            self.open=False
            self.video_cap.release()
            # self.video_out.release()
            cv2.destroyAllWindows()
            self.quit()
            self.wait(500) #5000ms = 5s


class AudioRecorder(QThread):
    "Audio class based on pyAudio and Wave"
    def __init__(self, filename="temp_audio.wav", rate=44100, fpb=1024, channels=2):
        super().__init__()
        self.open = True
        self.rate = rate
        self.frames_per_buffer = fpb
        self.channels = channels
        self.format = pyaudio.paInt16
        self.audio_filename = filename + "-audio.wav"
        self.audio = pyaudio.PyAudio()
        self.stream = self.audio.open(format=self.format,
                                      channels=self.channels,
                                      rate=self.rate,
                                      input=True,
                                      frames_per_buffer = self.frames_per_buffer)
        self.audio_frames = []

    def run(self):
        "Audio starts being recorded"
        self.stream.start_stream()
        self.open = True
        while self.open:
            data = self.stream.read(self.frames_per_buffer) 
            self.audio_frames.append(data)
            if not self.open:
                break

    def stop(self):
        "Finishes the audio recording therefore the thread too"
        if self.open:
            self.open = False
            self.stream.stop_stream()
            self.stream.close()
            self.audio.terminate()
            waveFile = wave.open(self.audio_filename, 'wb')
            waveFile.setnchannels(self.channels)
            waveFile.setsampwidth(self.audio.get_sample_size(self.format))
            waveFile.setframerate(self.rate)
            waveFile.writeframes(b''.join(self.audio_frames))
            waveFile.close()
            self.quit()
            self.wait(500) #5000ms = 5s


class MainWindow(QWidget):
    # class constructor
    def __init__(self):
        # call QWidget constructor
        super().__init__()
        self.ui = Ui_Form()
        self.ui.setupUi(self)
        # icon
        self.setWindowIcon(QIcon('icon.png'))
        # set control_bt callback clicked  function
        self.ui.control_bt.clicked.connect(self.controlSave)
        # set video and audio record thread
        self.open = False
        self.video_thread = None
        self.audio_thread = None
        self.name = None


    def controlSave(self):
        if self.open:
            self.open = False
            self.stop_AVrecording()
            self.ui.control_bt.setText("Record")
            self.ui.label.setText("Camera")
            self.file_manager()
        else:
            self.open = True
            self.start_AVrecording()
            self.ui.control_bt.setText("Stop")
            self.ui.label.setText("recording")


    def setImage(self, img):
        self.ui.label.setPixmap(img)


    # start/stop both thread
    def start_AVrecording(self, filename="test"):
        self.name = datetime.now().strftime('%Y-%m%d-%H%M%S-') + str(uuid4())
        self.video_thread = VideoRecorder(name = self.name)
        print("created video thread")
        self.audio_thread = AudioRecorder(filename = self.name)
        print("created audio thread")
        self.video_thread.mySignal.connect(self.setImage)
        print("add signal from video thread")
        self.audio_thread.start()
        print("started audio thread")
        self.video_thread.start()
        print("started video thread")
        return filename
    

    def stop_AVrecording(self, filename="test"):
        self.audio_thread.stop()
        print("audio thread stopped")
        frame_counts = self.video_thread.frame_counts
        elapsed_time = time.time() - self.video_thread.start_time
        recorded_fps = frame_counts / elapsed_time
        print("total frames " + str(frame_counts))
        print("elapsed time " + str(elapsed_time))
        print("recorded fps " + str(recorded_fps))
        self.video_thread.stop()
        print("video thread stopped")
        self.ui.label.setText("Camera")


        # # Makes sure the threads have finished    
        # while threading.active_count() > 1:
        #     time.sleep(1)

        # Merging audio and video signal
        if abs(recorded_fps - 6) >= 0.01:    # If the fps rate was higher/lower than expected, re-encode it to the expected
            print("Re-encoding")
            cmd = "ffmpeg -r " + str(recorded_fps) + f" -i {self.name}-video.avi -pix_fmt yuv420p -r 6 {self.name}2-video.avi"
            subprocess.call(cmd, shell=True)
            print("Muxing")
            cmd = f"ffmpeg -y -ac 2 -channel_layout stereo -i {self.name}-audio.wav -i {self.name}2-video.avi -pix_fmt yuv420p " + self.name + ".avi"
            subprocess.call(cmd, shell=True)
        else:
            print("Normal recording\nMuxing")
            cmd = f"ffmpeg -y -ac 2 -channel_layout stereo -i {self.name}-audio.wav -i {self.name}-video.avi -pix_fmt yuv420p " + self.name + ".avi"
            subprocess.call(cmd, shell=True)
            print("..")


    def file_manager(self, filename="test"):
        "Required and wanted processing of final files"
        local_path = os.getcwd()
        if os.path.exists(str(local_path) + f"/{self.name}-audio.wav"):
            os.remove(str(local_path) + f"/{self.name}-audio.wav")
        if os.path.exists(str(local_path) + f"/{self.name}-video.avi"):
            os.remove(str(local_path) + f"/{self.name}-video.avi")
        if os.path.exists(str(local_path) + f"/{self.name}2-video.avi"):
            os.remove(str(local_path) + f"/{self.name}2-video.avi")
        # if os.path.exists(str(local_path) + "/" + filename + ".avi"):
        #     os.remove(str(local_path) + "/" + filename + ".avi")def file_manager(filename="test"):
        "Required and wanted processing of final files"
        local_path = os.getcwd()
        if os.path.exists(str(local_path) + f"/{self.name}-audio.wav"):
            os.remove(str(local_path) + f"/{self.name}-audio.wav")
        if os.path.exists(str(local_path) + f"/{self.name}-video.avi"):
            os.remove(str(local_path) + f"/{self.name}-video.avi")
        if os.path.exists(str(local_path) + f"/{self.name}2-video.avi"):
            os.remove(str(local_path) + f"/{self.name}2-video.avi")
        # if os.path.exists(str(local_path) + "/" + filename + ".avi"):
        #     os.remove(str(local_path) + "/" + filename + ".avi")

app = QApplication()
win = MainWindow()

win.show()
app.exec_()