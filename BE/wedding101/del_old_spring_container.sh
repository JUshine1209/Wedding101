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
