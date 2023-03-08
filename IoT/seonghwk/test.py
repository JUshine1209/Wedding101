import cv2, io, time
import numpy as np
from PIL import Image
path = './cam.jpg'
with open(path, 'rb') as f:
    print(type(f))
    data = f.read()

print(type(data))

"""
time_cv = time.time()
for _ in range(20):
  encoded_img = np.fromstring(data, dtype = np.uint8)
  img_cv = cv2.imdecode(encoded_img, cv2.IMREAD_COLOR)
print('openCV :', time.time() - time_cv)

time_pil = time.time()
for _ in range(20):
  data_io = io.BytesIO(data)
  img_pil = Image.open(data_io)
print('PIL :', time.time() - time_pil)

"""