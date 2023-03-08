import sys
from PySide2.QtWidgets import QApplication, QMainWindow, QAction, QLabel, QGraphicsScene, QGraphicsView
from PySide2.QtGui import QPainter, QBrush, QPen, QImage, QPixmap
from PySide2.QtCore import Qt, QPoint

class PaintWindow(QMainWindow):
    def __init__(self):
        super().__init__()

        # Set up the user interface
        self.view = QGraphicsView(self)
        self.view.setRenderHint(QPainter.Antialiasing)
        self.setCentralWidget(self.view)

        # Create a QImage and set it as the background of the view
        self.image = QImage(500, 500, QImage.Format_RGB32)
        self.image.fill(Qt.white)
        self.view.setScene(QGraphicsScene(self))
        self.view.scene().addPixmap(QPixmap.fromImage(self.image))

        # Set up the brush and pen for drawing
        self.brush = QBrush(Qt.black)
        self.pen = QPen(self.brush, 5, Qt.SolidLine, Qt.RoundCap, Qt.RoundJoin)

        # Connect mouse events to the appropriate slots
        self.view.mousePressEvent = self.mouse_press_event
        self.view.mouseMoveEvent = self.mouse_move_event

    def mouse_press_event(self, event):
        self.last_point = event.pos()

    def mouse_move_event(self, event):
        painter = QPainter(self.image)
        painter.setPen(self.pen)
        painter.drawLine(self.last_point, event.pos())
        self.last_point = event.pos()
        self.view.scene().clear()
        self.view.scene().addPixmap(QPixmap.fromImage(self.image))

app = QApplication(sys.argv)
paint_window = PaintWindow()
paint_window.show()
sys.exit(app.exec_())
