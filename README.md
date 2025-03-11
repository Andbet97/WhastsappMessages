# WWeb.js integration with Express.js and React application

This project uses `docker-compose` to manage containers.

## Requirements

Make sure you have installed:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## How to Run the Project

### 1. Build and Start Containers
Run the following command to build the images and start the containers:

```bash
docker compose up --build
```

💡 *This command performs both steps: building and starting the containers. It is recommended to use it whenever there are changes in the configuration or source code.*

### 2. Start Containers Without Rebuilding
If the containers are already built and you just need to start them:

```bash
docker compose up
```

### 3. Stop and Remove Containers
To stop the containers and free up resources:

```bash
docker compose down
```

### 4. View Real-Time Logs
If you need to see the logs of the running containers:

```bash
docker compose logs -f
```

## Additional Notes
- If changes are made to the `Dockerfile` or `docker-compose.yml` files, the images need to be rebuilt with `docker compose up --build`.
- To run commands inside a running container:
  ```bash
  docker exec -it <container_name> bash
  ```
  or if the container uses `sh` instead of `bash`:
  ```bash
  docker exec -it <container_name> sh
  ```
