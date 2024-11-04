#!/bin/bash

# Name of the Docker image
IMAGE_NAME="key-counter"
IMAGE_TAG="latest"

echo "Building Docker image ${IMAGE_NAME}:${IMAGE_TAG}..."
docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .

echo "Docker image ${IMAGE_NAME}:${IMAGE_TAG} built successfully."