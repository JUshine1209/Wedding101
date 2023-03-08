import requests


album_access_id = "123456789a"
url = "http://i8a101.p.ssafy.io:8085/album/"

response = requests.get(url + 'access/' + album_access_id).json()

params = {'userSeq': response['infoData']['userSeq']}

response = requests.get(url, params=params)
print(response.json())
# print(response['infoData']['groomName'])
