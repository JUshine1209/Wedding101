# -*- coding: utf-8 -*-

################################################################################
## Form generated from reading UI file 'mainwindow.ui'
##
## Created by: Qt User Interface Compiler version 6.4.2
##
## WARNING! All changes made in this file will be lost when recompiling UI file!
################################################################################

import importlib.util

spec = importlib.util.find_spec("PySide2")
if spec is None:
    from PySide6.QtCore import (QCoreApplication, QDate, QDateTime, QLocale,
                                QMetaObject, QObject, QPoint, QRect,
                                QSize, QTime, QUrl, Qt)
    from PySide6.QtGui import (QBrush, QColor, QConicalGradient, QCursor,
                               QFont, QFontDatabase, QGradient, QIcon,
                               QImage, QKeySequence, QLinearGradient, QPainter,
                               QPalette, QPixmap, QRadialGradient, QTransform)
    from PySide6.QtWidgets import (QApplication, QLabel, QPushButton, QSizePolicy,
                                   QStackedWidget, QVBoxLayout, QWidget)
else:
    from PySide2.QtCore import (QCoreApplication, QDate, QDateTime, QLocale,
                                QMetaObject, QObject, QPoint, QRect,
                                QSize, QTime, QUrl, Qt)
    from PySide2.QtGui import (QBrush, QColor, QConicalGradient, QCursor,
                               QFont, QFontDatabase, QGradient, QIcon,
                               QImage, QKeySequence, QLinearGradient, QPainter,
                               QPalette, QPixmap, QRadialGradient, QTransform)
    from PySide2.QtWidgets import (QApplication, QLabel, QPushButton, QSizePolicy,
                                   QStackedWidget, QVBoxLayout, QWidget)

class Ui_Form(object):
    def setupUi(self, Form):
        if not Form.objectName():
            Form.setObjectName(u"Form")
        Form.resize(1280, 960)
        self.verticalLayout = QVBoxLayout(Form)
        self.verticalLayout.setObjectName(u"verticalLayout")
        self.stackedWidget = QStackedWidget(Form)
        self.stackedWidget.setObjectName(u"stackedWidget")
        self.video_page = QWidget()
        self.video_page.setObjectName(u"video_page")
        self.video_home_button = QPushButton(self.video_page)
        self.video_home_button.setObjectName(u"video_home_button")
        self.video_home_button.setGeometry(QRect(490, 250, 75, 24))
        self.video_next_button = QPushButton(self.video_page)
        self.video_next_button.setObjectName(u"video_next_button")
        self.video_next_button.setGeometry(QRect(490, 350, 75, 24))
        self.video_label = QLabel(self.video_page)
        self.video_label.setObjectName(u"video_label")
        self.video_label.setGeometry(QRect(440, 40, 50, 16))
        self.video_prev_button = QPushButton(self.video_page)
        self.video_prev_button.setObjectName(u"video_prev_button")
        self.video_prev_button.setGeometry(QRect(500, 300, 75, 24))
        self.record_stop_button = QPushButton(self.video_page)
        self.record_stop_button.setObjectName(u"record_stop_button")
        self.record_stop_button.setGeometry(QRect(200, 330, 75, 24))
        self.record_start_button = QPushButton(self.video_page)
        self.record_start_button.setObjectName(u"record_start_button")
        self.record_start_button.setGeometry(QRect(80, 330, 75, 24))
        self.video_stream = QLabel(self.video_page)
        self.video_stream.setObjectName(u"video_stream")
        self.video_stream.setGeometry(QRect(50, 40, 341, 251))
        self.stackedWidget.addWidget(self.video_page)
        self.main_page = QWidget()
        self.main_page.setObjectName(u"main_page")
        self.main_next_button = QPushButton(self.main_page)
        self.main_next_button.setObjectName(u"main_next_button")
        self.main_next_button.setGeometry(QRect(270, 410, 75, 24))
        self.pushButton = QPushButton(self.main_page)
        self.pushButton.setObjectName(u"pushButton")
        self.pushButton.setGeometry(QRect(590, 90, 75, 24))
        self.stackedWidget.addWidget(self.main_page)
        self.info_page = QWidget()
        self.info_page.setObjectName(u"info_page")
        self.info_label = QLabel(self.info_page)
        self.info_label.setObjectName(u"info_label")
        self.info_label.setGeometry(QRect(280, 190, 50, 16))
        self.info_home_button = QPushButton(self.info_page)
        self.info_home_button.setObjectName(u"info_home_button")
        self.info_home_button.setGeometry(QRect(490, 330, 75, 24))
        self.info_next_button = QPushButton(self.info_page)
        self.info_next_button.setObjectName(u"info_next_button")
        self.info_next_button.setGeometry(QRect(480, 390, 75, 24))
        self.info_prev_button = QPushButton(self.info_page)
        self.info_prev_button.setObjectName(u"info_prev_button")
        self.info_prev_button.setGeometry(QRect(360, 390, 75, 24))
        self.stackedWidget.addWidget(self.info_page)
        self.input_page = QWidget()
        self.input_page.setObjectName(u"input_page")
        self.input_next_button = QPushButton(self.input_page)
        self.input_next_button.setObjectName(u"input_next_button")
        self.input_next_button.setGeometry(QRect(460, 400, 75, 24))
        self.input_home_button = QPushButton(self.input_page)
        self.input_home_button.setObjectName(u"input_home_button")
        self.input_home_button.setGeometry(QRect(490, 320, 75, 24))
        self.input_label = QLabel(self.input_page)
        self.input_label.setObjectName(u"input_label")
        self.input_label.setGeometry(QRect(250, 190, 50, 16))
        self.input_prev_button = QPushButton(self.input_page)
        self.input_prev_button.setObjectName(u"input_prev_button")
        self.input_prev_button.setGeometry(QRect(340, 400, 75, 24))
        self.stackedWidget.addWidget(self.input_page)
        self.mode_select_page = QWidget()
        self.mode_select_page.setObjectName(u"mode_select_page")
        self.mode_select_home_button = QPushButton(self.mode_select_page)
        self.mode_select_home_button.setObjectName(u"mode_select_home_button")
        self.mode_select_home_button.setGeometry(QRect(480, 260, 75, 24))
        self.mode_select_image_button = QPushButton(self.mode_select_page)
        self.mode_select_image_button.setObjectName(u"mode_select_image_button")
        self.mode_select_image_button.setGeometry(QRect(170, 380, 75, 24))
        self.mode_select_label = QLabel(self.mode_select_page)
        self.mode_select_label.setObjectName(u"mode_select_label")
        self.mode_select_label.setGeometry(QRect(260, 180, 101, 31))
        self.mode_select_video_button = QPushButton(self.mode_select_page)
        self.mode_select_video_button.setObjectName(u"mode_select_video_button")
        self.mode_select_video_button.setGeometry(QRect(370, 380, 75, 24))
        self.mode_select_prev_button = QPushButton(self.mode_select_page)
        self.mode_select_prev_button.setObjectName(u"mode_select_prev_button")
        self.mode_select_prev_button.setGeometry(QRect(480, 310, 75, 24))
        self.stackedWidget.addWidget(self.mode_select_page)
        self.image_page = QWidget()
        self.image_page.setObjectName(u"image_page")
        self.image_next_button = QPushButton(self.image_page)
        self.image_next_button.setObjectName(u"image_next_button")
        self.image_next_button.setGeometry(QRect(440, 360, 75, 24))
        self.image_home_button = QPushButton(self.image_page)
        self.image_home_button.setObjectName(u"image_home_button")
        self.image_home_button.setGeometry(QRect(470, 300, 75, 24))
        self.image_label = QLabel(self.image_page)
        self.image_label.setObjectName(u"image_label")
        self.image_label.setGeometry(QRect(230, 140, 50, 16))
        self.image_prev_button = QPushButton(self.image_page)
        self.image_prev_button.setObjectName(u"image_prev_button")
        self.image_prev_button.setGeometry(QRect(330, 360, 75, 24))
        self.stackedWidget.addWidget(self.image_page)
        self.end_page = QWidget()
        self.end_page.setObjectName(u"end_page")
        self.end_home_button = QPushButton(self.end_page)
        self.end_home_button.setObjectName(u"end_home_button")
        self.end_home_button.setGeometry(QRect(470, 370, 75, 24))
        self.end_label = QLabel(self.end_page)
        self.end_label.setObjectName(u"end_label")
        self.end_label.setGeometry(QRect(260, 160, 131, 31))
        self.stackedWidget.addWidget(self.end_page)

        self.verticalLayout.addWidget(self.stackedWidget)


        self.retranslateUi(Form)
        self.main_next_button.clicked.connect(Form.go_next_page)
        self.info_home_button.clicked.connect(Form.go_home_page)
        self.end_home_button.clicked.connect(Form.go_home_page)
        self.image_next_button.clicked.connect(Form.go_end_page)
        self.image_home_button.clicked.connect(Form.go_home_page)
        self.info_next_button.clicked.connect(Form.go_next_page)
        self.input_next_button.clicked.connect(Form.go_next_page)
        self.input_home_button.clicked.connect(Form.go_home_page)
        self.mode_select_image_button.clicked.connect(Form.go_next_page)
        self.mode_select_home_button.clicked.connect(Form.go_home_page)
        self.video_home_button.clicked.connect(Form.go_home_page)
        self.video_next_button.clicked.connect(Form.go_end_page)
        self.mode_select_video_button.clicked.connect(Form.go_next_page)
        self.mode_select_prev_button.clicked.connect(Form.go_prev_page)
        self.video_prev_button.clicked.connect(Form.go_prev_page)
        self.input_prev_button.clicked.connect(Form.go_prev_page)
        self.info_prev_button.clicked.connect(Form.go_prev_page)
        self.image_prev_button.clicked.connect(Form.go_prev_page)
        self.pushButton.clicked.connect(Form.close_window)

        QMetaObject.connectSlotsByName(Form)
    # setupUi

    def retranslateUi(self, Form):
        Form.setWindowTitle(QCoreApplication.translate("Form", u"Form", None))
        self.video_home_button.setText(QCoreApplication.translate("Form", u"Home", None))
        self.video_next_button.setText(QCoreApplication.translate("Form", u"Next", None))
        self.video_label.setText(QCoreApplication.translate("Form", u"video", None))
        self.video_prev_button.setText(QCoreApplication.translate("Form", u"Prev", None))
        self.record_stop_button.setText(QCoreApplication.translate("Form", u"Stop", None))
        self.record_start_button.setText(QCoreApplication.translate("Form", u"Record", None))
        self.video_stream.setText(QCoreApplication.translate("Form", u"TextLabel", None))
        self.main_next_button.setText(QCoreApplication.translate("Form", u"Start", None))
        self.pushButton.setText(QCoreApplication.translate("Form", u"Close", None))
        self.info_label.setText(QCoreApplication.translate("Form", u"Info", None))
        self.info_home_button.setText(QCoreApplication.translate("Form", u"Home", None))
        self.info_next_button.setText(QCoreApplication.translate("Form", u"Next", None))
        self.info_prev_button.setText(QCoreApplication.translate("Form", u"Prev", None))
        self.input_next_button.setText(QCoreApplication.translate("Form", u"Next", None))
        self.input_home_button.setText(QCoreApplication.translate("Form", u"Home", None))
        self.input_label.setText(QCoreApplication.translate("Form", u"Input", None))
        self.input_prev_button.setText(QCoreApplication.translate("Form", u"Prev", None))
        self.mode_select_home_button.setText(QCoreApplication.translate("Form", u"Home", None))
        self.mode_select_image_button.setText(QCoreApplication.translate("Form", u"Image", None))
        self.mode_select_label.setText(QCoreApplication.translate("Form", u"mode select", None))
        self.mode_select_video_button.setText(QCoreApplication.translate("Form", u"Video", None))
        self.mode_select_prev_button.setText(QCoreApplication.translate("Form", u"Prev", None))
        self.image_next_button.setText(QCoreApplication.translate("Form", u"Next", None))
        self.image_home_button.setText(QCoreApplication.translate("Form", u"Home", None))
        self.image_label.setText(QCoreApplication.translate("Form", u"image", None))
        self.image_prev_button.setText(QCoreApplication.translate("Form", u"Prev", None))
        self.end_home_button.setText(QCoreApplication.translate("Form", u"Home", None))
        self.end_label.setText(QCoreApplication.translate("Form", u"Thank you", None))
    # retranslateUi

