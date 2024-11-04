#!/bin/bash

# Name of the Docker image and container
IMAGE_NAME="key-counter"
IMAGE_TAG="latest"
CONTAINER_NAME="key-counter"

# Port to expose
PORT=9000

# Stop and remove the container if it already exists
if [ "$(docker ps -aq -f name=${CONTAINER_NAME})" ]; then
    echo "Stopping and removing existing container ${CONTAINER_NAME}..."
    docker rm -f ${CONTAINER_NAME}
fi

# Run the container
echo "Starting new container ${CONTAINER_NAME}..."
docker run -d -p ${PORT}:${PORT} --name ${CONTAINER_NAME} ${IMAGE_NAME}:${IMAGE_TAG}

echo "Container ${CONTAINER_NAME} is now running on port ${PORT}."