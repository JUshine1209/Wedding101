import cv2
import numpy as np
import pyaudio

# Start video capture
cap = cv2.VideoCapture(0)
fourcc = cv2.VideoWriter_fourcc(*'XVID')
out = cv2.VideoWriter('output.avi', fourcc, 20.0, (640, 480))

# Start audio capture
p = pyaudio.PyAudio()
stream = p.open(format=pyaudio.paInt16, channels=2, rate=44100, input=True, frames_per_buffer=1024)

while True:
    ret, frame = cap.read()
    if ret:
        # Write video frame
        out.write(frame)

        # Read audio data
        data = stream.read(1024)
        # Do something with audio data

        # Display video frame
        cv2.imshow('Video', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

# Release resources
cap.release()
out.release()
cv2.destroyAllWindows()
stream.stop_stream()
stream.close()
p.terminate()
