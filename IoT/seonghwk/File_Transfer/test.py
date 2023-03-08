import requests

url = "http://example.com/upload"
file_path = "video.mp4"

with open(file_path, 'rb') as f:
    files = {'file': (file_path, f, 'video/mp4')}
    response = requests.post(url, files=files)

print(response.status_code)