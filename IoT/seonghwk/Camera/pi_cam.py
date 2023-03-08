import picamera
import time

camera = picamera.PiCamera()
camera.rotation = 180
camera.resolution = (640, 480)
camera.start_preview()
time.sleep(2)
camera.start_recording('my_video.h264')
camera.wait_recording(10)
camera.stop_recording()
camera.stop_preview()



from io import BytesIO
from picamera import PiCamera

stream = BytesIO()
camera = PiCamera()
camera.resolution = (640, 480)
camera.start_recording(stream, format='h264', quality=23)
camera.wait_recording(15)
camera.stop_recording()