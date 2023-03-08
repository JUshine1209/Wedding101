from PySide2.QtWidgets import *
from PySide2.QtCore import *
from PySide2.QtGui import *
from PySide2.QtMultimedia import *
from PySide2.QtMultimediaWidgets import *
from QT_screens_code.mainwindow import Ui_Form
from QT_screens_code.chk_Dialog import Ui_chk_Dialog
from datetime import datetime
from uuid import uuid4
import os
import requests
import pyaudio
import wave
import threading
import time
import subprocess
import cv2
import boto3
import json

os.environ["QT_IM_MODULE"] = "qtvirtualkeyboard"
relation_list = ['', 'family', 'relatives', 'friend', 'colleague', 'acquaintance']
receiver_list = ['', 'G', 'B']


def handle_visible_changed():
    if not QGuiApplication.inputMethod().isVisible():
        return
    for w in QGuiApplication.allWindows():
        if w.metaObject().className() == "QtVirtualKeyboard::InputView":
            keyboard = w.findChild(QObject, "keyboard")
            if keyboard is not None:
                r = w.geometry()
                r.moveTop(keyboard.property("y"))
                w.setMask(QRegion(r))
                return


class VideoRecorder(QThread):
    mySignal = Signal(QPixmap)
    textSignal = Signal(str)

    "Video class based on openCV"

    def __init__(self, name="temp_video.avi", fourcc="MJPG", sizex=768, sizey=768, camindex=0, fps=60):
        super().__init__()
        self.recording_now = True
        self.device_index = camindex
        self.fps = fps  # fps should be the minimum constant rate at which the camera can
        self.fourcc = fourcc  # capture images (with no decrease in speed over time; testing is required)
        self.frameSize = (sizex, sizey)  # video formats and sizes also depend and vary according to the camera used
        self.video_filename = name + "-video.avi"
        self.video_cap = cv2.VideoCapture(self.device_index)
        self.video_cap.set(cv2.CAP_PROP_FRAME_WIDTH, sizex)
        self.video_cap.set(cv2.CAP_PROP_FRAME_HEIGHT, sizey)
        self.video_writer = cv2.VideoWriter_fourcc(*self.fourcc)
        self.video_out = cv2.VideoWriter(self.video_filename, self.video_writer, self.fps, self.frameSize)
        self.frame_counts = 1
        self.start_time = time.time()
        self.video_frame = None
        self.background_image = None

        self.fps = 60
        self.width = sizex
        self.height = sizey

        self.is_writing = False
        # mediapipe modules
        # self.mp_drawing = mp.solutions.drawing_utils
        # self.mp_drawing_styles = mp.solutions.drawing_styles
        # self.mp_selfie_segmentation = mp.solutions.selfie_segmentation
        # self.mp_holistic = mp.solutions.holistic

    def video_write_now(self):
        print("hello timer")
        # self.time_tick += 1
        # self.textSignal.emit(f"{5 - self.time_tick} 초")
        # if time_tick == 5:
        #     self.is_writing = True
        #     self.timer.stop()
        #     self.textSignal.emit("녹화중")


    def run(self):
        # self.set_background_image(bg_dir = "../BackgroundImage", bg_name = "flower1.png")
        # self.timer = QTimer(self)
        
        # Video starts being recorded
        # counter = 1
        timer_start = time.time()
        timer_current = 0

        self.recording_now = True

        while self.recording_now:
            ret, self.video_frame = self.video_cap.read()

            if ret:
                self.video_frame = cv2.flip(self.video_frame, 0)
                # self.chromakey_replacement()
                # self.mediapipe_selfie_segmentation()
                if self.is_writing:
                    self.video_out.write(self.video_frame) # <----- 얘가 녹화하는 역할, 
                # print(str(counter) + " " + str(self.frame_counts) + " frames written " + str(timer_current))
                self.frame_counts += 1

                imgRGB = cv2.cvtColor(self.video_frame, cv2.COLOR_BGR2RGB)
                h, w, byte = imgRGB.shape
                img = QImage(imgRGB, w, h, byte * w, QImage.Format_RGB888)
                pix_img = QPixmap(img)
                self.mySignal.emit(pix_img)

                # counter += 1
                # timer_current = time.time() - timer_start
                # gray = cv2.cvtColor(video_frame, cv2.COLOR_BGR2GRAY)
                # cv2.imshow('video_frame', gray)
                # cv2.waitKey(1)
            else:
                break


    def stop(self):
        "Finishes the video recording therefore the thread too"
        if self.recording_now:
            self.recording_now = False
            self.video_cap.release()
            # self.video_out.release()
            # cv2.destroyAllWindows()
            self.quit()
            self.wait(500)  # 5000ms = 5s

    def set_writing(self):
        self.is_writing = True
        # pass


class AudioRecorder(QThread):
    "Audio class based on pyAudio and Wave"

    def __init__(self, filename="temp_audio.wav", rate=44100, fpb=1024, channels=2):
        super().__init__()
        self.recording_now = True
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
                                      frames_per_buffer=self.frames_per_buffer)
        self.audio_frames = []

    def run(self):
        "Audio starts being recorded"
        self.stream.start_stream()
        self.recording_now = True
        while self.recording_now:
            data = self.stream.read(self.frames_per_buffer)
            self.audio_frames.append(data)
            if not self.recording_now:
                break

    def stop(self):
        "Finishes the audio recording therefore the thread too"
        if self.recording_now:
            self.recording_now = False
            self.stream.stop_stream()
            # self.stream.close()
            # self.audio.terminate()
            waveFile = wave.open(self.audio_filename, 'wb')
            waveFile.setnchannels(self.channels)
            waveFile.setsampwidth(self.audio.get_sample_size(self.format))
            waveFile.setframerate(self.rate)
            waveFile.writeframes(b''.join(self.audio_frames))
            waveFile.close()
            self.quit()
            self.wait(500)  # 5000ms = 5s


class PhotoViewfinder(QThread):
    mySignal = Signal(QPixmap)

    def __init__(self, width=768, height=768, camindex=0):
        super().__init__()
        self.recording_now = True
        self.cap = cv2.VideoCapture(camindex)
        self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, width)
        self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, height)
        self.frame = None
        self.img = None

    def run(self):
        self.recording_now = True
        while self.recording_now:
            ret, self.frame = self.cap.read()
            if ret:
                self.frame = cv2.flip(self.frame, 0)
                imgRGB = cv2.cvtColor(self.frame, cv2.COLOR_BGR2RGB)
                h, w, byte = imgRGB.shape
                self.img = QImage(imgRGB, w, h, byte * w, QImage.Format_RGB888)
                pix_img = QPixmap(self.img)
                self.mySignal.emit(pix_img)
            else:
                break

    def stop(self):
        "Finishes the video recording therefore the thread too"
        if self.recording_now:
            self.recording_now = False
            self.cap.release()
            self.quit()
            self.wait(500)  # 5000ms = 5s


class CheckDialog(QDialog, Ui_chk_Dialog):
    def __init__(self):
        super().__init__()
        self.setupUi(self)
        self.setWindowFlags(Qt.WindowType.FramelessWindowHint)

    def show_dialog(self):
        return super().exec_()


class MyApp(QWidget, Ui_Form):
    userSignal = Signal()

    def __init__(self):
        super().__init__()
        # set Qthread variable
        self.photo_thread = None
        self.video_thread = None
        self.audio_thread = None

        self.setupUi(self)
        self.media_player = QMediaPlayer()
        self.review_player = QMediaPlayer()
        self.stackedWidget.setCurrentIndex(10)
        self.timer = QTimer(self)
        self.timer.timeout.connect(self.photo_take_now)
        
        self.vid_timer = QTimer(self)
        self.vid_timer.setInterval(1000)
        self.vid_timer.timeout.connect(self.video_timer_ticking)
        self.time_tick = 0

        # setting up resources
        self.arrow_button_pix = QPixmap("QT_Resources/Pics/proceed.png")
        self.arrow_icon = QIcon(self.arrow_button_pix)
        self.disabled_button_pix = QPixmap("QT_Resources/Pics/unavailable_proceed.png")
        self.disabled_button_icon = QIcon(self.disabled_button_pix)
        self.prev_button_pix = QPixmap("QT_Resources/Pics/prev.png")
        self.prev_icon = QIcon(self.prev_button_pix)
        self.home_button_pix = QPixmap("QT_Resources/Pics/home.png")
        self.home_icon = QIcon(self.home_button_pix)
        self.home_button2_pix = QPixmap("QT_Resources/Pics/home_2.png")
        self.home_icon2 = QIcon(self.home_button2_pix)
        self.font_id1 = QFontDatabase.addApplicationFont(
            "QT_Resources/Fonts/BeauRivage-Regular.ttf")
        self.font_id2 = QFontDatabase.addApplicationFont(
            "QT_Resources/Fonts/PlayfairDisplay-Italic-VariableFont_wght.ttf")
        self.photo_image = None
        self.hand_image = None
        self.joined_image = None

        self.SenderName = ''
        self.SenderRelation = 0
        self.SenderReceiver = 0
        self.user_id = None
        self.album_seq = None

        self.stackedWidget.setGraphicsEffect(QGraphicsDropShadowEffect(blurRadius=10, xOffset=5, yOffset=5))
        self.setup_pages()

        # set control_bt callback clicked  function
        self.recording_now = False
        self.name = None
        self.main()
        self.playlist = None


        self.file_name = 'downloaded_thanks_video.mp4'
        self.bucket = 'a101-wedding101-pjt'
        self.key = None

    def main(self):
        pass

    def set_only_int(self):
        self.onlyInt = QIntValidator()
        self.srvc_chk_lineEdit.setValidator(self.onlyInt)

    def set_srvc_chk(self):
        self.srvc_chk_button.setIcon(self.arrow_icon)
        self.srvc_chk_button.setIconSize(self.arrow_button_pix.rect().size())

    def set_home(self):
        self.home_background.setStyleSheet("background-image: url('QT_Resources/Pics/home_back.png')")
        self.home_background.setFont(QFont('Beau Rivage', 100))
        self.home_text1.setFont(QFont('Beau Rivage', 40))
        self.home_text1.setStyleSheet("background-color: rgba(255,255,255,0);")

    def set_info(self):
        self.info_title.setFont(QFont('Beau Rivage', 60))
        self.info_next_button.setIcon(self.arrow_icon)
        self.info_next_button.setIconSize(self.arrow_button_pix.rect().size())
        self.info_image1.setPixmap(QPixmap("QT_Resources/Pics/congrat.png"))
        self.info_image1.setScaledContents(True)
        self.info_image2.setPixmap(QPixmap("QT_Resources/Pics/vidready.png"))
        self.info_image2.setScaledContents(True)

    def set_agreement(self):
        self.agreement_page.setStyleSheet("QCheckBox::indicator{width:36px;height:36px;}")
        self.agreement_next_button.setIcon(self.disabled_button_icon)
        self.agreement_next_button.setIconSize(self.disabled_button_pix.rect().size())
        self.agreement_next_button.setDisabled(True)
        self.agreement_checkBox1.stateChanged.connect(self.check_agreement)
        self.agreement_checkBox2.stateChanged.connect(self.check_agreement)

    def set_input(self):
        self.input_home_button.setIcon(self.home_icon)
        self.input_home_button.setIconSize(self.home_button_pix.rect().size())
        self.input_next_button.setIcon(self.arrow_icon)
        self.input_next_button.setIconSize(self.arrow_button_pix.rect().size())
        self.input_relation_combo.view().setStyleSheet(
            "QListView{background:#FFAB7C;color:#FFFFFF;border:3px solid brown;border-radius:0;}"
            "QListView::item:hover{background:#FFFFFF;color:#A55252;}"
        )
        self.input_receiver_combo.view().setStyleSheet(
            "QListView{background:#FFAB7C;color:#FFFFFF;border:3px solid brown;border-radius:0;}"
            "QListView::item:hover{background:#FFFFFF;color:#A55252;}"
        )
        self.input_relation_combo.currentIndexChanged.connect(self.select_relation)
        self.input_receiver_combo.currentIndexChanged.connect(self.select_receiver)

    def set_thanks(self):
        self.thanks_title.setFont(QFont('Playfair Display', 40))
        self.media_player.setVideoOutput(self.thanks_video_screen)
        media = QMediaContent(
            QUrl.fromLocalFile("/home/pi/A101/IoT/Jinuk/GUI/QT_Resources/Videos/sample_video.mkv"))
        self.media_player.setMedia(media)
        self.media_player.setVolume(50)
        self.thanks_video_screen.show()

    def set_select(self):
        self.select_home_button.setIcon(self.home_icon2)
        self.select_home_button.setIconSize(self.home_button2_pix.rect().size())
        self.select_prev_button.setIcon(self.prev_icon)
        self.select_prev_button.setIconSize(self.prev_button_pix.rect().size())
        self.select_sample_img1.setStyleSheet("background-image: url('QT_Resources/Pics/congrat_sample.png');"
                                              "border-radius: 0;")
        cong_gif = QMovie("QT_Resources/Pics/congrat_vid.gif")
        self.select_sample_img2.setMovie(cong_gif)
        cong_gif.start()

    def set_photo(self):
        self.photo_home_button.setIcon(self.home_icon2)
        self.photo_home_button.setIconSize(self.home_button2_pix.rect().size())
        self.photo_prev_button.setIcon(self.prev_icon)
        self.photo_prev_button.setIconSize(self.prev_button_pix.rect().size())

    def set_handwrite(self):
        self.handwrite_graphicsView.setRenderHint(QPainter.Antialiasing)
        self.hand_image = QImage(960, 320, QImage.Format_RGB32)
        self.hand_image.fill(Qt.white)
        self.handwrite_graphicsView.setScene(QGraphicsScene(self))
        self.handwrite_graphicsView.scene().addPixmap(QPixmap.fromImage(self.hand_image))
        self.brush = QBrush(Qt.black)
        self.pen = QPen(self.brush, 5, Qt.SolidLine, Qt.RoundCap, Qt.RoundJoin)
        self.handwrite_graphicsView.mousePressEvent = self.brush_press_event
        self.handwrite_graphicsView.mouseMoveEvent = self.brush_move_event

    def set_pic_review(self):
        pass

    def set_vid_record(self):
        self.video_home_button.setIcon(self.home_icon2)
        self.video_home_button.setIconSize(self.home_button2_pix.rect().size())
        self.video_prev_button.setIcon(self.prev_icon)
        self.video_prev_button.setIconSize(self.prev_button_pix.rect().size())

    def set_vid_review(self):
        self.video_review_home_button.setIcon(self.home_icon2)
        self.video_review_home_button.setIconSize(self.home_button2_pix.rect().size())

    def set_end(self):
        self.end_home_button.setIcon(self.home_icon2)
        self.end_home_button.setIconSize(self.home_button2_pix.rect().size())

    def setup_pages(self):
        self.set_srvc_chk()
        self.set_home()
        self.set_info()
        self.set_agreement()
        self.set_input()
        self.set_thanks()
        self.set_select()
        self.set_photo()
        self.set_handwrite()
        self.set_pic_review()
        self.set_vid_record()
        self.set_vid_review()
        self.set_end()

    def go_next_page(self):
        current_page = self.stackedWidget.currentIndex()
        sender = self.sender()
        print(sender)
        if sender.objectName() == "select_vid_button":
            self.video_stream.clear()
            current_page += 3
        if sender.objectName() == "video_review_next_button":
            self.submit_video_info()
        self.stackedWidget.setCurrentIndex(current_page + 1)
        self.media_player.stop()

    def go_prev_page(self):
        current_page = self.stackedWidget.currentIndex()
        sender = self.sender()
        print(sender.objectName())
        if sender.objectName() == "photo_prev_button":
            if self.photo_thread.isRunning():
                self.photo_thread.stop()
        if sender.objectName() == "image_prev_button":
            current_page -= 1
        if sender.objectName() == "video_prev_button":
            current_page -= 3
        if sender.objectName() == "video_review_prev_button":
            self.review_player.stop()
            current_page -= 4

        self.stackedWidget.setCurrentIndex(current_page - 1)

    def go_home_page(self):
        if self.sender().objectName() == "photo_prev_button":
            if self.photo_thread.isRunning():
                self.photo_thread.stop()
        self.stackedWidget.setCurrentIndex(1)
        self.input_name_edit.clear()
        self.input_relation_combo.setCurrentIndex(0)
        self.input_receiver_combo.setCurrentIndex(0)
        self.agreement_checkBox1.setChecked(False)
        self.agreement_checkBox2.setChecked(False)
        self.SenderName = ''
        self.SenderRelation = 0
        self.SenderReceiver = 0

    def go_video_page(self):
        current_page = self.stackedWidget.currentIndex()
        self.stackedWidget.setCurrentIndex(current_page + 2)

    def go_photo_page(self):
        self.stackedWidget.setCurrentIndex(7)
        self.media_player.stop()
        self.handwrite_clear()
        self.photo_thread = PhotoViewfinder()
        self.photo_thread.mySignal.connect(self.photo_make_preview)
        self.photo_thread.start()

    def go_end_page(self):
        self.name = datetime.now().strftime('%Y-%m%d-%H%M%S-') + str(uuid4())
        self.photo_image.toImage().save("./"+self.name+".jpg", "JPEG", 100)
        self.submit_image_info()

        self.stackedWidget.setCurrentIndex(self.stackedWidget.count() - 1)

    def submit_video_info(self):

        url = "http://i8a101.p.ssafy.io:8085/s3/uploadVideo"
        file_path = f"{self.name}.avi"

        payload = {
            'userId' : self.user_id
        }

        with open(file_path, 'rb') as f:
            files = {
                'multipartFile' : (file_path, f, '/')
            }
            response = requests.post(url, files=files, data=payload)

        print(response.text)

        url = "http://i8a101.p.ssafy.io:8085/media"

        parser = "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/"
        s3_path = (response.text).split(parser)[1]

        data = {
            "albumSeq": self.album_seq,
            "storageUrl": s3_path,
            "onBooth": True,
            "mediaName": self.SenderName,
            "mediaRelation": relation_list[self.SenderRelation],
            "mediaReceiver": receiver_list[self.SenderReceiver],
            "wish": False,
            "inBin": False,
            "video": True
        }

        headers = {'Content-Type': 'application/json',}

        response = requests.post(url, headers=headers, data=json.dumps(data))
        print(response.json())

    def submit_image_info(self):
        url = "http://i8a101.p.ssafy.io:8085/s3/uploadImage"
        file_path = f"{self.name}.jpg"

        payload = {
            'userId' : self.user_id
        }

        with open(file_path, 'rb') as f:
            files = {
                'multipartFile' : (file_path, f, '/')
            }
            response = requests.post(url, files=files, data=payload)

        print(response.text)

        url = "http://i8a101.p.ssafy.io:8085/media"

        parser = "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/"
        s3_path = (response.text).split(parser)[1]

        data = {
            "albumSeq": self.album_seq,
            "storageUrl": s3_path,
            "onBooth": True,
            "mediaName": self.SenderName,
            "mediaRelation": relation_list[self.SenderRelation],
            "mediaReceiver": receiver_list[self.SenderReceiver],
            "wish": False,
            "inBin": False,
            "video": False
        }

        headers = {'Content-Type': 'application/json',}

        response = requests.post(url, headers=headers, data=json.dumps(data))
        print(response.json())

    def record_control(self):
        if self.recording_now:
            self.recording_now = False
            self.stop_AVrecording()
            self.video_control_button.setText("record")
            # self.video_stream.setText("Camera")
            self.video_stream.clear()
            self.file_manager()
            self.set_review_video()
            self.go_next_page()
        else:
            self.recording_now = True
            self.video_control_button.setText("5초 후")
            self.start_AVrecording()
            # self.start_5sec_timer()
            # self.video_stream.setText("recording")

    def video_timer_ticking(self):
        self.time_tick += 1
        self.video_control_button.setText(f"{5 - self.time_tick} 초")
        if self.time_tick == 5:
            self.video_thread.set_writing()
            self.vid_timer.stop()
            self.video_control_button.setText("녹화중")

    # def start_5sec_timer(self):
    #     start_time = time.time()
    #     while True:
    #         curr_time = time.time()
    #         time_passed = int(curr_time - start_time)
    #         self.video_control_button.setText(f"{5 - time_passed} 초")
    #         print(5 - time_passed)
    #         if time_passed == 5:
    #             break

    # start/stop both thread
    def start_AVrecording(self, filename="test"):
        self.vid_timer.start()
        self.name = datetime.now().strftime('%Y-%m%d-%H%M%S-') + str(uuid4())
        self.video_thread = VideoRecorder(name=self.name, sizex=1280, sizey=720)
        print("created video thread")
        self.audio_thread = AudioRecorder(filename=self.name)
        print("created audio thread")
        self.video_thread.mySignal.connect(self.set_video_preview)
        self.video_thread.textSignal.connect(self.set_video_control_button_text)
        print("add signal from video thread") 
        self.audio_thread.start()
        print("started audio thread")
        self.video_thread.start()
        print("started video thread")

        return filename

    def set_video_control_button_text(self, text):
        self.video_control_button.setText(text)

    def stop_AVrecording(self, filename="test"):
        self.time_tick = 0
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
        self.video_control_button.setText("Camera")

        # # Makes sure the threads have finished
        # while threading.active_count() > 1:
        #     time.sleep(1)

        # Merging audio and video signal
        if abs(recorded_fps - 6) >= 0.01:  # If the fps rate was higher/lower than expected, re-encode it to the expected
            print("Re-encoding")
            cmd = "ffmpeg -r " + str(
                recorded_fps) + f" -i {self.name}-video.avi -pix_fmt yuv420p -r 6 {self.name}2-video.avi"
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

    def set_video_preview(self, img):
        self.video_stream.setPixmap(img)

    def close_window(self):
        # if spec is not None:
        #     self.th.terminate()
        #     self.th.wait(3000)
        self.close()

    def set_review_video(self):
        self.playlist = QMediaPlaylist()
        url = QUrl.fromLocalFile(f"/home/pi/A101/IoT/Jinuk/GUI/{self.name}.avi")
        self.playlist.addMedia(QMediaContent(url))
        self.playlist.setPlaybackMode(QMediaPlaylist.Loop)

        # media = QMediaContent(QUrl.fromLocalFile("/home/pi/A101/IoT/Jinuk/GUI/QT_Resources/Videos/sample_video.mkv"))
        self.review_player.setPlaylist(self.playlist)
        # self.review_player.setMedia(QMediaContent(url))
        self.review_player.setVolume(100)
        self.review_player.setVideoOutput(self.video_review_widget)
        self.review_player.play()
        # self.widget.show()

    def check_service_validation(self):
        self.request_album_info()
        check_validation_window = CheckDialog()
        check_validation_window.setModal(True)
        check_validation_window.chk_D_label_2.setText(f"신혼부부\n{self.groom_name}, {self.bride_name}\n님의 결혼식이 맞습니까?")
        cd = check_validation_window.show_dialog()
        print(cd)
        if cd:
            self.go_next_page()
            self.request_thankyou_video()


    def request_thankyou_video(self):
        url = "http://i8a101.p.ssafy.io:8085/album/"
        params = {'userSeq': self.user_seq}
        response = requests.get(url, params=params).json()
        print(response['data']['albumThanksUrl'])

        parser = "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/"

        self.key = response['data']['albumThanksUrl'].split(parser)[1]

        client = boto3.client(
                's3',
                aws_access_key_id = 'AKIASAR2BR5LCYLEDGWM',
                aws_secret_access_key = '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',
                region_name = 'ap-northeast-2'
        )

        client.download_file(self.bucket, self.key, self.file_name)

        media = QMediaContent(QUrl.fromLocalFile("/home/pi/A101/IoT/Jinuk/GUI/" + self.file_name))
        self.media_player.setMedia(media)
        self.media_player.setVolume(50)
        self.thanks_video_screen.show()


    def request_album_info(self):
        album_access_id = self.srvc_chk_lineEdit.text()
        url = "http://i8a101.p.ssafy.io:8085/album/access/" + album_access_id
        res = requests.get(url).json()

        self.album_seq = res['albumSeq']
        self.user_seq = res['infoData']['userSeq']
        self.groom_name = res['infoData']['groomName']
        self.bride_name = res['infoData']['brideName']
        self.home_text2.setText(f"신혼부부 {self.groom_name}, {self.bride_name} 님에게 기념 사진이나 영상 편지를 남겨보세요")

        url = "http://i8a101.p.ssafy.io:8085/user"
        params = {'userSeq': self.user_seq}
        res = requests.get(url, params=params).json()
        self.user_id = res['data']['userId']

    def check_agreement(self):
        if self.agreement_checkBox1.isChecked() and self.agreement_checkBox2.isChecked():
            self.agreement_next_button.setIcon(self.arrow_icon)
            self.agreement_next_button.setDisabled(False)
            self.agreement_next_button.setEnabled(True)
            print("yes")
        else:
            self.agreement_next_button.setIcon(self.disabled_button_icon)
            self.agreement_next_button.setEnabled(False)
            self.agreement_next_button.setDisabled(True)
            print("not")

    def check_input(self):
        if not self.input_name_edit.text():
            print("이름 없음")
            return
        if not self.SenderRelation:
            print('관계 없음')
            return
        if not self.SenderReceiver:
            print('대상 없음')
            return
        self.SenderName = self.input_name_edit.text()
        self.go_next_page()
        self.media_player.play()

    def select_relation(self):
        self.SenderRelation = self.input_relation_combo.currentIndex()
        print(self.SenderRelation)
        print(relation_list[self.SenderRelation])

    def select_receiver(self):
        self.SenderReceiver = self.input_receiver_combo.currentIndex()
        print(self.SenderReceiver)
        print(receiver_list[self.SenderReceiver])

    def photo_take_now(self):
        self.photo_thread.stop()
        self.timer.stop()
        self.photo_image = self.photo_viewfinder.pixmap()
        self.go_next_page()
        self.photo_take_button_2.setEnabled(True)
        self.photo_take_button_3.setEnabled(True)

    def photo_take_3sec(self):
        self.photo_take_button_2.setDisabled(True)
        self.timer.setInterval(3000)
        self.timer.start()

    def photo_take_10sec(self):
        self.photo_take_button_3.setDisabled(True)
        self.timer.setInterval(10000)
        self.timer.start()

    def photo_make_preview(self, qimg):
        self.photo_viewfinder.setPixmap(qimg)

    def photo_retake(self):
        self.stackedWidget.setCurrentIndex(self.stackedWidget.currentIndex() - 1)
        self.photo_thread = PhotoViewfinder()
        self.photo_thread.mySignal.connect(self.photo_make_preview)
        self.photo_thread.start()

    def photo_save(self):
        self.name = datetime.now().strftime('%Y-%m%d-%H%M%S-') + str(uuid4())
        self.photo_image.toImage().save("./"+self.name+".jpg", "JPEG", 100)
        self.submit_image_info()
        self.go_end_page()

    def brush_press_event(self, event):
        self.last_point = event.pos()

    def brush_move_event(self, event):
        painter = QPainter(self.hand_image)
        painter.setPen(self.pen)
        painter.drawLine(self.last_point, event.pos())
        self.last_point = event.pos()
        self.handwrite_graphicsView.scene().clear()
        self.handwrite_graphicsView.scene().addPixmap(QPixmap.fromImage(self.hand_image))

    def handwrite_fin(self):
        self.joined_image = QImage(600, 800, QImage.Format_RGB32)
        self.joined_image.fill(0xffffff)
        photo_resized = self.photo_image.toImage().scaled(600,600)
        handwrite_resized = self.hand_image.scaled(600,200)
        joiner = QPainter(self.joined_image)
        joiner.drawImage(0, 0, photo_resized)
        joiner.drawImage(0,600,handwrite_resized)
        self.go_next_page()
        self.photo_review_screen.setPixmap(QPixmap.fromImage(self.joined_image))
        self.photo_image = self.photo_review_screen.pixmap()

    def handwrite_clear(self):
        self.hand_image = QImage(960, 320, QImage.Format_RGB32)
        self.hand_image.fill(Qt.white)
        self.handwrite_graphicsView.scene().clear()
        self.handwrite_graphicsView.scene().addPixmap(QPixmap.fromImage(self.hand_image))


app = QApplication()
app.setApplicationName("Wed101")

QGuiApplication.inputMethod().visibleChanged.connect(handle_visible_changed)

win = MyApp()
win.show()
# win.showFullScreen()
app.exec_()
