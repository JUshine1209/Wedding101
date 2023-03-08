# 230125

1. 페이지 전환 기능 구현
  - QStackedWidget
  - 페이지 구성 : 메인, 약관, 정보입력, 모드선택, 사진모드, 영상모드, 종료
  - 다음 버튼, 홈 버튼
2. GUI에서 영상 녹화하여 파일 생성하는 예제 실행
3. 영상과 음성 동시화하는 파일 생성

4. PySide.QThread vs therading.thread
- [Blog Article](https://coding-yoon.tistory.com/46)

- `pip install pyaudio`


### sum-up
1. cam_audio_record/main.py
  - 녹음, 녹화 싱크 맞음
2. cam_write/main.py
  - GUI 버튼으로 녹음, 녹화 합본 생성 가능
  - but, 싱크가 맞지 않는 문제
  - also, 반복적으로 생성하는 방법은 아직 구현하지 못함


# 230126

1. dhl 영상처리 기능 + 배경 전환 위한 UI 구성
2. GUI + 영상/음성 녹화 기능 합치기
3. 스트림과 버퍼에 대한 이해
  - [스트리밍(Streaming)이란](https://curryyou.tistory.com/440)
  - [PiCamera Docs](https://picamera.readthedocs.io/en/release-1.13/recipes1.html#)
4. 라즈베리파이 한글 설정
5. alsamixer로 마이크 음량 키우기

### sum-up
1. 간헐적으로 영상/음성 녹화에 segmentation fault 및 기타 오류 사항 개선해야함
2. Picamera로 녹화, Pyaudio로 녹음하는 방법 생각해볼 필요 있다.


# 230127
1. 음성 및 영상 녹화 시 실시간 피드백 가능
- but, 녹화 종료 후 초기 화면으로 돌아가지 않음


# 230130
1. Python에서 class의 object 상속 : [사실 큰 의미는 없는 것이었다](https://jh-bk.tistory.com/24)
2. Picam, start_recording 작동 원리
  - If output is not a string, but is an object with a write method, it is assumed to be a file-like object and the video data is appended to it (the implementation only assumes the object has a write() method - no other methods are required but flush will be called at the end of recording if it is present).
3. Picam 정보를 stream에 전송, stream에서 바이트 정보 읽어서 PIL 이미지로 변환, 배열로 변환하여 cv2 Videowriter로 파일 녹화
4. subprocess 사용법 : [subprocess 모듈 사용법 및 예제](https://hbase.tistory.com/341)


1. Pi Camera vs cv2
2. 동시 처리? vs 후처리?


# 230131
1. 파일 정리
- Camera/main.py
  - GUI : only label for image streaming
  - camera utility : picam recording stream to io.BytesIO
  - record : cv2.VideoWriter
  - 영상처리 아니면 매우 빠르다.
  - 근데 영상 녹화본 속도가 프레임 설정에 따라 실제 소요 시간과 다르다

- GUI/video_audio_simultaneous_record/main.py
  - GUI : label for image streaming (small) and button for recording / stop (toggle with mode)
  - camera utility : cv2.VideoCapture
  - record : cv2.VideoWrite
  - 영상 녹화, 음성 녹음 쓰레드 실행
  - 녹화, 녹음본 통합 via ffmpeg

- GUI/main.py
  - GUI : main GUI setup
  - camera utility : cv2.VideoCapture
  - 영상처리 with mediapipeline selfie sementation, 속도가 많이 느려진다.

2. 영상 전송 테스트 코드 작성
  - Python 'request' module
    ```python
    import requests

    url = "http://localhost:3000/upload"
    file_path = "test.avi"

    with open(file_path, 'rb') as f:
        files = {'file': f}
        response = requests.post(url, files=files)

    print(response.status_code)
    ```

3. What should I do from now on..
- 영상 녹화 페이지라고 생각하고
  - 화면 지속적으로 재생하는 스레드
  - 녹화시작 누르면 영상녹화 스레드, 음성녹음 스레드 실행
  - 중지 누르면 다음 화면 넘어가야 한다. (지금까지 가져온 정보를 지니고 있는채로, 녹화한 영상 재생하기)
  - 제출 누르면 request로 POST 요청하기
