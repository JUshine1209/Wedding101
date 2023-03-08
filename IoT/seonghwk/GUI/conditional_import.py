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
