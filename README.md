# Key Counter

A simple server built with NestJS that tracks the frequency of input keys submitted via HTTP requests.

# Installation

1. Clone the repository:

    ```sh
    git clone git@github.com:toramanomer/key-counter.git
    ```

2. Navigate to the project directory, and install the dependencies:

    ```sh
    cd key-counter && npm install
    ```

3. Start the server in watch mode:

    ```sh
    npm run start:dev
    ```

# Recommended Extensions

-   [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
-   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
-   [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) if you want to run the server in a container

# Building & Running with Docker

1. [Build Script](scripts/build.sh) is provided to build the Docker image.
    ```sh
    chmod +x scripts/build.sh && scripts/build.sh
    ```
2. [Run Script](scripts/run.sh) is provided to run the Docker container.
    ```sh
    chmod +x scripts/run.sh && scripts/run.sh
    ```
