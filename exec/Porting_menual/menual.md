# 포팅 매뉴얼

## 1. 환경 구성
---
1) EC2 서버에 도커 설치 
    a. 공식 문서 참조 - [🔗](https://docs.docker.com/engine/install/ubuntu/) 
    b. 순서
    - 이전 도커 관련 라이브러리 삭제
        ```sh
        $sudo apt-get remove docker docker-engine docker.io containerd runc
        ```
    - <u>**Docker 레포지토리**</u>를 설정
      -  apt 패키지 업데이트 + apt가 HTTPS를 통해 저장소를 사용할 수 있도록 패키지 설치
            ```sh
            $sudo   apt-get update
            $sudo   apt-get install \
                    ca-certificates \
                    curl \
                    gnupg \
                    lsb-release
            ```
      - Docker’s official GPG 키 추가
        ```sh
        $sudo mkdir -m 0755 -p /etc/apt/keyrings
        $curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
        ```
      - 레포지토리 설정
        ```sh
        $echo \ "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \ $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
        ```
    - <u>**Docker 엔진**</u> 설치 
       - apt 패키지 업데이트
            ```sh 
            $sudo apt-get update 
            ```
       - Docker 엔진, containerd, and Docker Compose 설치
            ```sh 
            $sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin 
            ```
    - 도커 동작 확인
      ```sh 
      $docker ps
      CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
      ```
      - 권한 에러 시 권한 부여
        ```sh
        $sudo chown root:docker /var/run/docker.sock
        ```
---
1) 자동 CI/CD Pipeline 설계 </br><br>
   a. 배포 툴 설정
    - 🐳 Docker 
      - 도커 이미지를 통해 손 쉬운 배포와 배포환경 조성 가능<br>
      - 도커파일과 도커 컴포즈를 통해 여러 도커 컨테이너를 손쉽게 관리 가능 <br>

   - 🕴🏼Jenkins
      - FE / BE 의 빌드 과정과 배포 과정을 ***pipeline*** 스크립트 하나로 관리 가능 <br>
      - 빌드 테스트와 로그를 통해 에러 체크 용이
      - 다양한 플러그 인 제공 <br><br>
   
   b. 자동 배포 환경을 위한 디렉토리 구조
      - 아래의 구조로 디렉토리들을 구성해야한다
      - 홈 디렉토리 파악 : 3개의 디렉토리 (도커 파일 폴더, 프로젝트 폴더, 젠킨스 백업 폴더)
        ```sh
        ~$ls 
        Dockerfiles  S08P12A101  jenkins_backup
        ```
      - Dockerfiles 구조
        ```sh
        $tree ./Dockerfiles
        ./Dockerfiles
        ├── docker-compose.yaml
        ├── jenkins
        │   └── Dockerfile
        ├── mysql
        │   ├── Dockerfile
        │   └── conf.d
        │       └── my.cnf
        └── nginx
            ├── Dockerfile
            ├── conf.d
            │   └── default.conf
            └── nginx.conf
        ```
    - jenkins_backup 디렉토리는 docker-compose 로 젠킨스를 실행 시킬 때<br>
      볼륨을 마운트하는 대상이 된다. 따라서 젠킨스가 껐다 켜져도 원상복구가 된다<br><br>

    c. 자동 배포를 위한 설정 파일 구성
    - 파일 별 역할 
        |docker-compose.yaml|Dockerfile(BE)|Dockerfile(FE)|pipeline|
        |:------:|:--:|:--:|:--:|
        |jenkins, nginx, mysql|Spring|React|Jenkins|
    - 파일 별 환경 설정
      - ***<h5>docker-compose.yaml</h5>***
        ```yaml
            version: "3"
            services:
                jenkins:
                    container_name: jenkins
                    build:
                        context: ./jenkins
                        dockerfile: Dockerfile
                    ports:
                        - "9090:8080"
                        - "50000:50000"
                    volumes:
                        - /home/ubuntu/jenkins_backup:/var/jenkins_home
                        - /var/run/docker.sock:/var/run/docker.sock
                    environment:
                        TZ: "Asia/Seoul"
                mysql:
                    container_name: mysql
                    build:
                        context: ./mysql
                        dockerfile: Dockerfile
                    ports:
                        - "3306:3306"
                    volumes:
                        - /mysql:/var/lib/mysql
                    environment:
                        MYSQL_DATABASE: wedding101_db
                        MYSQL_ROOT_PASSWORD: ssafy
                        MYSQL_PASSWORD: ssafy
                        MYSQL_ALLOW_EMPTY_PASSWORD: "yes"
                        MYSQL_CHARACTER_SET_SERVER: utf8mb4
                        MYSQL_COLLATION_SERVER: utf8mb4_unicode_ci
                nginx:
                    container_name: nginx
                    build:
                        context: ./nginx
                        dockerfile: Dockerfile
                    ports:
                        - "80:80"
                        - "443:443"
                    expose:
                        - "80"
                        - "443"
                    volumes:
                        - ./nginx/conf.d:/etc/nginx/conf.d
                        - /etc/letsencrypt:/etc/letsencrypt
                        - ./nginx/nginx.conf:/etc/nginx/nginx.conf

        ```
    - ***<h5>Spring Dockerfile</h5>***
      - BE dockerfile 은 프로젝트 깃랩 레포지토리의 BE/wedding101 에 위치해 있는 상태이다
      - ```sh
        ~$ls ~/S08P12A101/BE/wedding101
        Dockerfile  del_old_spring_container.sh 
        build.gradle    gradle  gradlew gradle.properties  src     gradlew.bat     settings.gradle  logs 
        ```
      - Jenkins 가 동작하는 workspace 는 gitlab push 시그널 (webhook) 에 맞춰 자동으로
        S08P12A101 깃랩 레포지토리를 Clone 해와서 빌드 + Dockerfile 기반 배포 진행하게 되는데, Dockerfile 은 아래와 같다. ffmpeg 은 추후 BE 에서 영상 통합본을 만드는데 필요한 라이브러리로, 파일이 저장되 경로를 설정했다
        ```sh
        ~$cat ~/S08P12A101/BE/wedding101/Dockerfile
        FROM openjdk:11-jdk-slim

        RUN apt-get update &&\
            apt install ffmpeg -y &&\
            mkdir -p /root/ffmpeg/temp/image /root/ffmpeg/temp/video

        RUN apt-get install -y locales file vim sudo tzdata

        RUN locale-gen ko_KR.UTF-8
        RUN sudo sed -i 's/^# \(ko_KR.UTF-8\)/\1/' /etc/locale.gen
        RUN sudo locale-gen

        ARG JAR_FILE=build/libs/*.jar
        ENV TZ="Asia/Seoul"

        COPY ${JAR_FILE} app.jar

        ENTRYPOINT ["java", "-jar", "/app.jar"]
        ```
      - 같은 이름의 도커 컨테이너가 존재하는 경우 기존의 컨테이너를 내리고, 지워줘야한다
        이를 위해 셸 스크립트를 작성하였다.
        ```sh
        #!/bin/bash
        # 1. for removing '<none>:<none>' docker image
        #    you can check this on the official documentation
        #    https://docs.docker.com/engine/reference/commandline/images/
        DANGLING_DOCKER_IMAGE=$(docker images -f "dangling=true" -q)

        # 2. for removing 'spring-server' container previously made
        #    'PRE_JAVA_CONTAINER' has all the value which has been made before
        #    'PRE_JAVA_IMAGE', 'PRE_JAVA_TAG' for checking docker images which has "spring-server"
        PRE_JAVA_CONTAINER=$(docker ps -a | grep "java -jar" | awk '{print $1}')
        PRE_JAVA_IMAGE=$(docker images -a | grep "spring-server" | awk '{print $1}')
        PRE_JAVA_TAG=$(docker images -a | grep "spring-server" | awk '{print $2}')

        if [ -n "$PRE_JAVA_CONTAINER" ] ; then
                echo "Removing $PRE_JAVA_CONTAINER where command including 'java -jar'"
                echo 'y' | docker system prune
                docker stop $PRE_JAVA_CONTAINER
                docker rm $PRE_JAVA_CONTAINER
        else
                echo "Great. There's no pre-container where command is 'java -jar'.."
        fi

        if [ -n "$DANGLING_DOCKER_IMAGE" ] ; then
                echo "Removing image-$DANGLING_DOCKER_IMAGE(<none>:<none>).."
                docker rmi $DANGLING_DOCKER_IMAGE
        else
                echo "Great. There's no danling docker images(<none>:<none>).."
        fi

        if [ -n "$PRE_JAVA_IMAGE" ] ; then
                echo "Removing previous $PRE_JAVA_IMAGE:$PRE_JAVA_TAG.."
                docker rmi -f $PRE_JAVA_IMAGE:$PRE_JAVA_TAG
                echo 'y' | docker system prune
        else
                echo "Great. There's no previous $PRE_JAVA_IMAGE:$PRE_JAVA_TAG"
        fi
        ```

   - ***<h5>React Dockerfile</h5>***
      - FE dockerfile 은 프로젝트 깃랩 레포지토리의 FE/wedding101 에 위치해 있는 상태이다
      - ```sh
        ~$ls ~/S08P12A101/FE/wedding101
        Dockerfile                 build                      node_modules               package-lock.json          public
        README.md                  del_old_react_container.sh npm_start.sh               package.json               src
        ```
      - Jenkins 가 동작하는 workspace 는 gitlab push 시그널 (webhook) 에 맞춰 자동으로 S08P12A101 깃랩 레포지토리를 Clone 해와서 빌드 + Dockerfile 기반 배포 진행하게 되는데, Dockerfile 은 아래와 같다
        ```sh
        ~$cat ~/S08P12A101/FE/wedding101/Dockerfile
        FROM node:18.13.0
        WORKDIR /usr/src/app
        COPY ./package* /usr/src/app/
        RUN npm install
        RUN npm install -g serve
        COPY ./ /usr/src/app/
        RUN npm run build
        ENTRYPOINT ["serve", "-s", "build"]
        ```
      - 같은 이름의 도커 컨테이너가 존재하는 경우 기존의 컨테이너를 내리고, 지워줘야한다
        이를 위해 셸 스크립트를 작성하였다.
        ```sh
        #!/bin/bash
        # 1. for removing '<none>:<none>' docker image
        #    you can check this on the official documentation
        #    https://docs.docker.com/engine/reference/commandline/images/
        DANGLING_DOCKER_IMAGE=$(docker images -a | grep none | awk '{print $3}')

        # 2. for removing 'react' container previously made
        #    'PRE_REACT_CONTAINER' has all the value which has been made before
        #    'PRE_REACT_IMAGE', 'PRE_REACT_TAG' for checking docker images which has "react"
        PRE_REACT_CONTAINER=$(docker ps -a | grep "react" | awk '{print $1}')
        PRE_REACT_IMAGE=$(docker images -a | grep "react" | awk '{print $1}')
        PRE_REACT_TAG=$(docker images -a | grep "react" | awk '{print $2}')

        if [ -n "$PRE_REACT_CONTAINER" ] ; then
                echo "Removing $PRE_REACT_CONTAINER where command including 'react'"
                echo 'y' | docker system prune
                docker stop $PRE_REACT_CONTAINER
                docker rm $PRE_REACT_CONTAINER
        else
                echo "Great. There's no pre-container where command is 'react'.."
        fi

        if [ -n "$DANGLING_DOCKER_IMAGE" ] ; then
                echo "Removing image-$DANGLING_DOCKER_IMAGE(<none>:<none>).."
                docker rmi $DANGLING_DOCKER_IMAGE -f
        else
                echo "Great. There's no danling docker images(<none>:<none>).."
        fi

        if [ -n "$PRE_REACT_IMAGE" ] ; then
                echo "Removing previous $PRE_REACT_IMAGE:$PRE_REACT_TAG.."
                docker rmi -f $PRE_REACT_IMAGE:$PRE_REACT_TAG
                echo 'y' | docker system prune
        else
                echo "Great. There's no previous $PRE_REACT_IMAGE:$PRE_REACT_TAG"
        fi
        ```
   - ***<h5>Jenkins Pipeline script</h5>***
     - jenkins 에 적용되는 파이프라인 스크립트는 다음과 같다
     - git url 에는 본인의 레포지토리 주소가 들어간다
     - docker-compose 를 진행한 Jenkins, nginx, mysql 은 도커 네트워크가 따로 잡힌다
       - 따라서 react, spring 컨테이너를 띄울때 docker-compose 네트워크 포함시켜야한다
        ```
        pipeline {
            agent any
                stages {
                    stage('Prepare') {
                    steps {
                        echo 'Clonning Repository'
                        git url: 'https://lab....com/.../S08P12A101',
                        branch: 'develop',
                        credentialsId: 'gitlab-credential'
                        }
                        post {
                        success { 
                        echo 'Successfully Cloned Repository'
                        }
                            failure {
                        error 'This pipeline stops here...'
                        }
                    }
                    }
                    
                    stage('BE - Bulid') {
                    steps {
                        echo 'Bulid Gradle'
                        dir('BE/wedding101'){
                            sh 'chmod +X ./gradlew'
                            sh './gradlew clean build'
                        }
                    }
                    post {
                        failure {
                        error 'This pipeline stops here...'
                        }
                    }
                    }
                    
                    stage('BE - Deploy'){
                        steps {
                            dir('BE/wedding101'){
                                echo 'Check current working docker container'
                                sh 'chmod +X ./del_old_spring_container.sh'
                                sh './del_old_spring_container.sh'
                                sh 'cat ./Dockerfile'
                                echo 'Docker build and run spring-boot container'
                                sh 'docker ps'
                                sh 'docker images'
                                sh 'docker build -t spring-server:latest .'
                                sh 'docker run -d -p 8085:9090 \
                                    --network dockerfiles_default \
                                    --name spring spring-server:latest '
                                sh 'docker ps'
                                sh 'docker images'
                            }
                        }
                    }
                    
                    stage('FE - Bulid') {
                        steps {
                            echo 'Bulid React'
                            dir('FE/wedding101'){
                                echo 'React Docker container build'
                                sh 'cat ./Dockerfile'
                                sh 'docker ps'
                                sh 'docker images'
                                sh 'chmod +X ./del_old_react_container.sh'
                                sh './del_old_react_container.sh'
                                sh 'docker build -t react:latest -f ./Dockerfile .'
                            }
                        }
                    }
                    
                    stage('FE - Deploy') {
                        agent any
                        steps {
                            dir('FE/wedding101'){
                                echo 'Check current working docker container'
                                sh 'docker ps'
                                sh 'docker images'
                                sh 'docker run -d --name react \
                                --network dockerfiles_default \
                                -p 3000:3000 react:latest'
                                sh 'docker ps'
                                sh 'docker images'
                            }
                        }
                    }
                }
            }
        ```
---
<h4>3. 기타 환경 설정 및 파일</h4>

- NGINX
  - nginx.conf : 모바일에서 영상 업로드시 용량 제한 존재 
    - 이를 해결 하기 위한 http block 에 아래의 옵션 추가 
    - ```client_max_body_size 50M;```
  - ~/Dockerfiles/nginx/conf.d/deafult.conf
    - reverse proxy 설정 + https (ssl 키 적용)
        ```
        server {
            listen 80 default_server;
            listen [::]:80 default_server;

            server_name wedding101.shop;

            return 301 https://$server_name$request_uri;
        }

        server {
            listen 443 ssl;
            listen [::]:443 ssl;

            ssl_certificate /etc/letsencrypt/live/wedding101.shop/fullchain.pem;
            ssl_certificate_key /etc/letsencrypt/live/wedding101.shop/privkey.pem;

            location / {
                proxy_pass http://wedding101.shop:3000;
            }
            location /api/ {
                proxy_pass http://wedding101.shop:8085/;
            }
        }
        ```

- Jenkins
    <details><summary>플러그인</summary>
      - Bitbucket Pipeline for Blue Ocean <br>
      - Dashboard for Blue Ocean <br>
      - Personalization for Blue Ocean <br>
      - Display URL for Blue Ocean <br>
      - Server Sent Events (SSE) Gateway <br>
      - Events API for Blue Ocean <br>
      - Blue Ocean Pipeline Editor <br>
      - i18n for Blue Ocean <br>
      - Autofavorite for Blue Ocean <br>
      - Blue Ocean <br>
      - NodeJS <br>
      - GitLab <br>
      - Generic Webhook Trigger <br>
      - Gitlab Authentication <br>
      - Gitlab API <br>
      - GitLab Branch Source <br>
      - Gitlab Merge Request Builder <br>
      - Config File Provider <br>
      - Docker <br>
      - Docker Pipeline <br>
      - docker-build-step
    </details>
---
<h4>4. 서비스 </h4>

1. 서비스 메인페이지<br>
![01_메인화면보여주기](https://user-images.githubusercontent.com/48194000/219656233-34d129be-c950-4d3c-96d1-86d7b0c87953.gif)


2. 로그인 및 신청<br>
![02_로그인및서비스신청](https://user-images.githubusercontent.com/48194000/219671967-22f0ac2b-b899-4581-b4b0-157ed3389dd8.gif)


3. 모바일 청첩장<br>
![03_모바일청첩장](https://user-images.githubusercontent.com/48194000/219672008-8c62ddb2-bc3a-48d1-81cb-d6344d575355.gif)


4. IoT 부스 데모<br>
    ![04_IoT부스데모](https://user-images.githubusercontent.com/48194000/219672037-1fbacaa7-1318-450c-8237-728c3b7e8661.gif)


5. 통합 앨범 신청 및 통합 앨범 확인<br>
    ![06_통합앨범신청](https://user-images.githubusercontent.com/48194000/219672105-60929c5b-bf81-4c27-ab0d-0e2a555b7a22.gif)
    ![07_통합앨범확인](https://user-images.githubusercontent.com/48194000/219672134-b073365a-668a-4115-a01f-bc2acda3b74e.gif)
