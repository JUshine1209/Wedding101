# -*- coding: utf-8 -*-

################################################################################
## Form generated from reading UI file 'cam_write_ui.ui'
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
        QWidget)
else:
    from PySide2.QtCore import (QCoreApplication, QDate, QDateTime, QLocale,
        QMetaObject, QObject, QPoint, QRect,
        QSize, QTime, QUrl, Qt)
    from PySide2.QtGui import (QBrush, QColor, QConicalGradient, QCursor,
        QFont, QFontDatabase, QGradient, QIcon,
        QImage, QKeySequence, QLinearGradient, QPainter,
        QPalette, QPixmap, QRadialGradient, QTransform)
    from PySide2.QtWidgets import (QApplication, QLabel, QPushButton, QSizePolicy,
        QWidget)


class Ui_Form(object):
    def setupUi(self, Form):
        if not Form.objectName():
            Form.setObjectName(u"Form")
        Form.resize(400, 300)
        self.control_bt = QPushButton(Form)
        self.control_bt.setObjectName(u"control_bt")
        self.control_bt.setGeometry(QRect(20, 240, 75, 24))
        self.save_bt = QPushButton(Form)
        self.save_bt.setObjectName(u"save_bt")
        self.save_bt.setGeometry(QRect(130, 240, 75, 24))
        self.image_label = QLabel(Form)
        self.image_label.setObjectName(u"image_label")
        self.image_label.setGeometry(QRect(10, 10, 320, 240)) 

        self.retranslateUi(Form)

        QMetaObject.connectSlotsByName(Form)
    # setupUi

    def retranslateUi(self, Form):
        Form.setWindowTitle(QCoreApplication.translate("Form", u"Form", None))
        self.control_bt.setText(QCoreApplication.translate("Form", u"Start", None))
        self.save_bt.setText(QCoreApplication.translate("Form", u"Record", None))
        self.image_label.setText(QCoreApplication.translate("Form", u"TextLabel", None))
    # retranslateUi

