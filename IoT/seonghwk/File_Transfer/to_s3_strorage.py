import requests, json

url = "http://i8a101.p.ssafy.io:8085/s3/uploadImage"
file_path = 'qwerTest.jpg'
payload={
  'userId' : 'dudwls624'
}

with open(file_path, 'rb') as f:
    files = {
        'multipartFile' : (file_path, f, '/')
    }
    response = requests.post(url, files=files, data=payload)

# response = requests.post(url, data=payload, files=files)

print(response.text)

url = "http://i8a101.p.ssafy.io:8085/media"

headers = {
  'Content-Type': 'application/json',
}


data = {
  "mediaSeq": 0,
  "albumSeq": 1,
  "storageUrl": "/dudwls624/image/b7355130-610c-4237-9feb-3c7d936d8404.jpg",
  "onBooth": True,
  "mediaName": "string",
  "mediaRelation": "string",
  "mediaReceiver": "G",
  "video": True,
  "wish": True,
  "inBin": True
}

response = requests.post(url, headers=headers, data=json.dumps(data))

print(response.json())