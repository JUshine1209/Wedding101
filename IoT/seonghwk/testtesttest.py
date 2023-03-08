import cv2
import numpy as np
import pyaudio
import wave
import os

# Set video and audio recording parameters
frames_per_second = 20
frame_width = 640
frame_height = 480
audio_channels = 1
audio_sample_rate = 44100
audio_sample_width = 2

# Initialize video capture
cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, frame_width)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, frame_height)
cap.set(cv2.CAP_PROP_FPS, frames_per_second)

# Initialize audio recording
audio = pyaudio.PyAudio()
# stream = audio.open(format=audio.get_format_from_width(audio_sample_width),
#                     channels=audio_channels,
#                     rate=audio_sample_rate,
#                     input=True,
#                     frames_per_buffer=1024)
stream = audio.open(format=pyaudio.paInt16, channels=2, rate=44100, input=True, frames_per_buffer=1024)


# Create video and audio recording objects
fourcc = cv2.VideoWriter_fourcc(*'XVID')
video_out = cv2.VideoWriter('output.avi', fourcc, frames_per_second, (frame_width, frame_height))
audio_out = wave.open('output.wav', 'wb')
audio_out.setnchannels(audio_channels)
audio_out.setsampwidth(audio.get_sample_size(audio_sample_width))
audio_out.setframerate(audio_sample_rate)

# Start recording
while True:
    # Get video frame
    ret, frame = cap.read()
    if not ret:
        break
    video_out.write(frame)
    
    # Get audio frame
    audio_frame = stream.read(1024)
    audio_out.writeframes(audio_frame)
    
    # Display video frame
    cv2.imshow('frame', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Stop recording and release resources
cap.release()
video_out.release()
audio_out.close()
stream.stop_stream()
stream.close()
audio.terminate()
cv2.destroyAllWindows()

# Combine video and audio into a single file
command = f'ffmpeg -i output.avi -i output.wav -c:v copy -c:a aac -strict experimental output.mp4'
os.system(command)
