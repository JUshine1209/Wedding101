# -*- coding: utf-8 -*-

################################################################################
## Form generated from reading UI file 'chk_Dialog.ui'
##
## Created by: Qt User Interface Compiler version 6.4.2
##
## WARNING! All changes made in this file will be lost when recompiling UI file!
################################################################################

from PySide2.QtCore import (QCoreApplication, QDate, QDateTime, QLocale,
    QMetaObject, QObject, QPoint, QRect,
    QSize, QTime, QUrl, Qt)
from PySide2.QtGui import (QBrush, QColor, QConicalGradient, QCursor,
    QFont, QFontDatabase, QGradient, QIcon,
    QImage, QKeySequence, QLinearGradient, QPainter,
    QPalette, QPixmap, QRadialGradient, QTransform)
from PySide2.QtWidgets import (QApplication, QDialog, QFrame, QLabel,
    QPushButton, QSizePolicy, QWidget)

class Ui_chk_Dialog(object):
    def setupUi(self, chk_Dialog):
        if not chk_Dialog.objectName():
            chk_Dialog.setObjectName(u"chk_Dialog")
        chk_Dialog.setWindowModality(Qt.ApplicationModal)
        chk_Dialog.resize(1040, 520)
        chk_Dialog.setStyleSheet(u"background:#FFAFAF;")
        self.chk_D_frame = QFrame(chk_Dialog)
        self.chk_D_frame.setObjectName(u"chk_D_frame")
        self.chk_D_frame.setGeometry(QRect(50, 30, 940, 460))
        self.chk_D_frame.setStyleSheet(u"background: #FFFFFF;border-radius: 50px;")
        self.chk_D_frame.setFrameShape(QFrame.StyledPanel)
        self.chk_D_frame.setFrameShadow(QFrame.Raised)
        self.chk_D_button_3 = QPushButton(self.chk_D_frame)
        self.chk_D_button_3.setObjectName(u"chk_D_button_3")
        self.chk_D_button_3.setGeometry(QRect(180, 290, 241, 121))
        font = QFont()
        font.setPointSize(40)
        font.setBold(True)
        self.chk_D_button_3.setFont(font)
        self.chk_D_button_3.setStyleSheet(u"background: #FFAB7C;color: #FFFFFF;")
        self.chk_D_button_4 = QPushButton(self.chk_D_frame)
        self.chk_D_button_4.setObjectName(u"chk_D_button_4")
        self.chk_D_button_4.setGeometry(QRect(540, 290, 241, 121))
        self.chk_D_button_4.setFont(font)
        self.chk_D_button_4.setStyleSheet(u"background: #FFAB7C;color: #FFFFFF;")
        self.chk_D_label_2 = QLabel(self.chk_D_frame)
        self.chk_D_label_2.setObjectName(u"chk_D_label_2")
        self.chk_D_label_2.setGeometry(QRect(230, 30, 481, 221))
        font1 = QFont()
        font1.setPointSize(30)
        font1.setBold(True)
        self.chk_D_label_2.setFont(font1)
        self.chk_D_label_2.setAlignment(Qt.AlignCenter)

        self.retranslateUi(chk_Dialog)
        self.chk_D_button_3.clicked.connect(chk_Dialog.accept)
        self.chk_D_button_4.clicked.connect(chk_Dialog.reject)

        QMetaObject.connectSlotsByName(chk_Dialog)
    # setupUi

    def retranslateUi(self, chk_Dialog):
        chk_Dialog.setWindowTitle(QCoreApplication.translate("chk_Dialog", u"Dialog", None))
        self.chk_D_button_3.setText(QCoreApplication.translate("chk_Dialog", u"\ud655\uc778", None))
        self.chk_D_button_4.setText(QCoreApplication.translate("chk_Dialog", u"\ucde8\uc18c", None))
        self.chk_D_label_2.setText(QCoreApplication.translate("chk_Dialog", u"\uc2e0\ud63c\ubd80\ubd80\n"
"OOO, OOO\n"
"\ub2d8\uc758 \uacb0\ud63c\uc2dd\uc774 \ub9de\uc2b5\ub2c8\uae4c?", None))
    # retranslateUi

