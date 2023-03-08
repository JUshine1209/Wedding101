# 💑 Wedding101 - 예비부부에게 축하영상 & 사진을 보내보세요!

## ♥ Wedding101(웹 최적화) : [https://wedding101.shop](https://wedding101.shop)

## 🎁 Project Box : [Notion](https://www.notion.so/mslrbt/A101-NOTION-958ffa1d750e4de0baeca2d1f9738dfa)

<br />
## ⏳ 프로젝트 진행기간

2023.01.03 ~ 2023.02.17(45일)
<br />
2학기 공통프로젝트

</br>

## 🎬 배경

_-정신없이 지나간 결혼식 다시 추억할 수는 없을까?-_
<img src="https://user-images.githubusercontent.com/79901413/220566247-f3ee38a2-1473-4dd3-87ca-d1352583653b.gif" title="프로젝트개요" width="70%" height="70%"/>

## 🔍 개요

_-예비 부부가 결혼 과정에서 지나치기 쉬운 순간들을 담아-_
<br /><br />
Wedding101이란 결혼(Wedding)과 101(입문)의 합성어입니다. 결혼이라는 일생일대의 경험이 좋은 추억으로 남을 수 있도록 본 서비스가 좋은 길잡이가 될 수 있음을 의미하고 있습니다.
<br /><br />
Wedding101은 예비부부를 향한 축하를 사진과 영상으로 담아 디지털 앨범을 제공하는 서비스입니다. 본 프로젝트는 IoT 플랫폼을 이용한 미디어와 디지털 앨범이라는 웹 서비스를 통해 아날로그와 디지털이 통합된 사용자 경험을 제공하고자 합니다.
</br>

## 🧡 주요기능

---

- ### 현장 부스
- 결혼식장에 축하 메세지를 보내는 부스 설치
- 친지, 지인 등 하객이 부부를 위해 사진, 영상을 보낼 수 있습니다.
- 사진은 폴라로이드 형태로 메세지를, 영상은 음성과 함께 메세지를 보낼 수 있습니다.

<br />

- ### 모바일 청첩장
- 결혼식 현장에 가지 못한 분들을 위한 서비스
- 예비 부부가 미리 보낸 청첩장을 통해 접근가능합니다.
- 모바일에서 부부를 위한 사진과 영상 메세지를 보낼 수 있습니다.

<br />

- ### 앨범관리
- 결혼식 이후 부부가 축하 영상 및 사진을 확인하고 북마크 및 삭제 등이 가능합니다. 특히 미디어 북마크를 통해 통합본을 신청하여 새로운 하나의 미디어로 받아볼 수 있습니다.
  <br />

## 🛠 주요기술

---

**BackEnd**

- IntelliJ IDE
- Spring Boot
- Spring Data JPA
- Spring Security
- Spring Web
- Swagger
- mySQL 8.0.29

**FrontEnd**

- Visual Studio Code IDE 1.74.3
- React 18.0
- Material UI
- Node.js 18.13.0

**IoT**

- PyCharm IDE
- Raspberry Pi 4 model B
- PySide6 + 2

**Design**

- Figma

**CI/CD**

- AWS EC2
- Jenkins
- Nginx

## 📔 프로젝트 파일구조

---

### Back

```
BE
├─main
│  ├─java
│  │  └─com
│  │      └─ssafy
│  │          └─wedding101
│  │              ├─common
│  │              ├─config
│  │              ├─controller
│  │              ├─filter
│  │              ├─handler
│  │              ├─model
│  │              │  ├─dto
│  │              │  ├─entity
│  │              │  ├─repository
│  │              │  └─service
│  │              │      └─impl
│  │              └─util
│  └─resources
│      └─static
└─test
```

### Front

```
FE
├─node_modules
├─public
└─src
    ├─api
    ├─assets
    │  └─img
    ├─components
    │  ├─album
    │  ├─board
    │  ├─common
    │  ├─main
    │  ├─serviceProcess
    │  ├─user
    │  │  ├─UserLogin
    │  │  ├─UserModify
    │  │  └─UserRegist
    │  └─WeddingInvitation
    │      └─InfoModify
    ├─data
    ├─modules
    ├─pages
    │  ├─Album
    │  ├─BoardQuestion
    │  ├─BoardReview
    │  ├─Main
    │  ├─ServiceProcess
    │  ├─User
    │  │  ├─UserLogin
    │  │  ├─UserMyPage
    │  │  └─UserRegist
    │  └─WeddingInvitation
    ├─test
    └─utils

```

## 🔈 협업 툴

---

- Git
- Notion
- JIRA
- MatterMost

## 🎲 팀원 역할 분배

---

### Web - BackEnd

- 권영진
- 김지현

### Web - FrontEnd

- 류제엽

### IoT

- 김성환(팀장)
- 이동형
- 이진욱

### CI/CD

- 이동형

## 🖨 프로젝트 산출물

- [기능명세서(excel)](<./docs/%EA%B8%B0%EB%8A%A5%EB%AA%85%EC%84%B8%EC%84%9C(excel).pdf>)
- [프로젝트명세서(docx)](<./docs/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8_%EB%AA%85%EC%84%B8%EC%84%9C(docx).pdf>)
- [ERD](./docs/ERD.png)
- [유저스토리](./docs/%EC%9C%A0%EC%A0%80%EC%8A%A4%ED%86%A0%EB%A6%AC.pdf)
- [웹 플로우차트](./docs/%EC%9B%B9_%ED%94%8C%EB%A1%9C%EC%9A%B0%EC%B0%A8%ED%8A%B8.PNG)
- [iot 플로우차트](./docs/iot_%ED%94%8C%EB%A1%9C%EC%9A%B0%EC%B0%A8%ED%8A%B8.PNG)
- [웹 와이어프레임](./docs/%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84.pdf)
- [iot 와이어프레임](./docs/Rpi%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84.pdf)

---

## 🎀 프로젝트 결과물

- [포팅메뉴얼](./exec/Porting_menual/menual.md)
- [중간발표자료](./ppt/Wedding101_%EC%A4%91%EA%B0%84%EB%B0%9C%ED%91%9C.pptx)
- [최종발표자료](./ppt/Wedding101_%EC%B5%9C%EC%A2%85%EB%B0%9C%ED%91%9C.pptx)

## 🧡 Wedding101 서비스 화면

---

### 로그인

- 서비스 신청을 위해 로그인이 필요합니다.
  <br>
  <img src="https://user-images.githubusercontent.com/79901413/220556110-117c4698-fa21-4fb6-aaba-2b5a635895ba.gif" title="로그인" width="70%" height="70%"/>
  <br />

### 회원가입

- 아이디, 이메일 중복확인 및 비밀번호 길이 등 검증과정을 거쳐 가입합니다.
  <br />
  <img src="https://user-images.githubusercontent.com/79901413/220556104-181ead89-299c-4d70-bb53-771622877cca.gif" title="회원가입" width="70%" height="70%"/>
  <br />

### 마이페이지

- 로그인 후 마이페이지에서 자신의 정보를 확인하고 수정할 수 있습니다.
- 결혼정보 신청 후 확인 및 수정이 가능합니다.
  <br />
  <img src="https://user-images.githubusercontent.com/79901413/220556077-2c87b77f-1d23-416b-acd9-168a826a825f.gif" title="마이페이지" width="70%" height="70%"/>
  <br />

### 메인화면

- 서비스 개요를 소개합니다.
- 전체 페이지 스크롤을 통해 구현하였습니다.
  <br />
  <img src="https://user-images.githubusercontent.com/79901413/220556080-23ba88c8-20e7-47a5-bb5b-f295c132a962.gif" title="메인화면" width="70%" height="70%"/>
  <br />

### 서비스 신청

- 로그인 후 메인화면 또는 헤더에서 서비스를 신청할 수 있습니다.
  <br />
  <img src="https://user-images.githubusercontent.com/79901413/220556084-769ca79c-10fc-4165-bcc9-71744b8b16db.gif" title="서비스신청-1" width="70%" height="70%"/>
  <img src="https://user-images.githubusercontent.com/79901413/220556087-eedbe859-6092-4938-a2eb-b683ec1e7999.gif" title="서비스신청-2" width="70%" height="70%"/>
  <img src="https://user-images.githubusercontent.com/79901413/220556090-a495d526-cc97-487b-ade3-fefeafea34ae.gif" title="서비스신청-3,4" width="70%" height="70%"/>
  <br />

### 방명로그

- 소형 포토 영상 부스를 통해 영상 기반 방명록을 작성할 수 있습니다.
- 신랑 신부는 웹 상으로 하객이 남기는 실시간 축하 영상을 확인할 수 있습니다.
  <br/>
  <img src="https://user-images.githubusercontent.com/48194000/219672037-1fbacaa7-1318-450c-8237-728c3b7e8661.gif" title="웹 앨범" width="70%" height="70%"/>
  <br/>
- 두 가지 모드
  1. 폴라로이드 모드
     - 사진을 찍고 손 글씨를 남기면 폴라로이드로 합쳐 웹 앨범 페이지로 전송합니다.
  2. 방명로그 모드
     - 동영상을 통해 결혼 축하영상을 찍고 웹 앨범 페이지로 전송합니다.

### 모바일 청첩장

- 모바일 환경에서 영상 및 사진을 업로드 할 수 있습니다.
- 업로드한 미디어는 부부가 앨범 목록에서 확인가능합니다.
  <br />
  <img src="https://user-images.githubusercontent.com/79901413/220558876-cebe2381-f98c-4748-95c2-6dc38ba40375.gif" title="모바일청첩장"/>
  <br />

### 앨범표지

- 서비스 신청 후 앨범표지에 접근할 수 있습니다.
- 앨범 목록에서 통합본 신청 후 앨범표지화면에서 확인가능합니다.
  <br />
  <img src="https://user-images.githubusercontent.com/79901413/220556096-4b9cd9ba-fead-4751-bc8b-61451a75575f.gif" title="앨범-통합본" width="70%" height="70%"/>
  <br />

### 앨범목록

- 하객이 보낸 사진과 영상을 확인할 수 있습니다.
- 미디어 북마크 및 삭제가 가능합니다.
- 통합본 신청을 통해 북마크 미디어들을 통합본으로 만들 수 있습니다.
  <br />
  <img src="https://user-images.githubusercontent.com/79901413/220556105-65eede97-cf39-46d2-b2ac-c46fcae98247.gif" title="앨범-목록" width="70%" height="70%"/>
  <br />

### 리뷰

- 서비스 이용에 대한 리뷰를 남길 수 있습니다.
  <br />
  <img src="https://user-images.githubusercontent.com/79901413/220556068-42a29c08-3694-4a76-8ae7-e772bc926cd5.gif" title="리뷰" width="70%" height="70%"/>
  <br />

<details>
<summary>Jenkins Connection Test</summary>
<div markdown="1">

```
1. iot branch modify
2. update (add -> commit -> push)
3. merge branch from iot to develop

then,
jenkins should detect somethings has been merged,
and should rebuild and test.
```

before setting the pipeline on the jenkins

</div>
</details>
