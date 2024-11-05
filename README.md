# Key Counter

A simple server built with NestJS that tracks the frequency of input keys submitted via HTTP requests.

# Endpoints

1. `POST /input`
    - Description: Increments the count of the key if the key already exists, otherwise creates a new key with a count of 1. The key is case-sensitive and is trimmed before being stored.
    - Request Headers: `Content-Type: text/plain`. Otherwise, the server will respond with a 415 Unsupported Media Type error.
    - Request Body: Non-empty string containing the key to be stored. Throws a 400 Bad Request error if the body is empty.
    - Success Response: `204 No Content`
2. `GET /query`
    - Description: Retrieves the count of the key. The key is case-sensitive and is trimmed before being queried.
    - Query Parameters: `key` - Non-empty string containing the key to be queried. Throws a 400 Bad Request error if the key is not provided.
    - Success Response: `200 OK` with the count of the key in the response body.

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

# Building Locally

After installing the dependencies, you can build the project with the following command:

```sh
npm run build && npm run start:prod
```

# Building with Docker

1. [Build Script](scripts/build.sh) is provided to build the Docker image.
    ```sh
    chmod +x scripts/build.sh && scripts/build.sh
    ```
2. [Run Script](scripts/run.sh) is provided to run the Docker container.
    ```sh
    chmod +x scripts/run.sh && scripts/run.sh
    ```

# Running End-to-End Tests

```sh
npm run test:e2e
```

# Recommended Extensions

-   [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
-   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
-   [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) if you want to run the server in a container
