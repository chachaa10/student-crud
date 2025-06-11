## Running with Docker

You can run the entire project—including the frontend, backend, and MySQL database—using Docker Compose. This provides a consistent environment and simplifies setup.

### Requirements

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your machine.
- The provided Dockerfiles require Node.js version `22.13.1-slim` (as specified in the Dockerfiles).

### Services and Ports

- **Frontend (js-frontend):**
  - Runs the built Vite app using `serve`.
  - Exposes port **4173** (mapped to `localhost:4173`).
- **Backend (js-server):**
  - Node.js server for API endpoints.
  - Exposes port **3001** (mapped to `localhost:3001`).
- **Database (mysql-db):**
  - MySQL database service.
  - Exposes port **3306** (mapped to `localhost:3306` for local development).

### Environment Variables

- The MySQL service uses the following environment variables (set in `docker-compose.yml`):
  - `MYSQL_ROOT_PASSWORD`: example_root_password _(change this in production!)_
  - `MYSQL_DATABASE`: studentportal
  - `MYSQL_USER`: studentuser
  - `MYSQL_PASSWORD`: studentpass _(change this in production!)_
- The backend can be configured to use a `.env` file for database connection details. If you have a custom `.env`, uncomment the `env_file` line in the `js-server` service in `docker-compose.yml`.

### Build and Run

From the root of the project, run:

```bash
# Build and start all services
docker compose up --build
```

This will:

- Build the frontend and backend images using the provided Dockerfiles
- Start the frontend, backend, and MySQL services
- Create a persistent volume for MySQL data (`mysql-data`)

The frontend will be available at [http://localhost:4173](http://localhost:4173), and the backend API at [http://localhost:3001](http://localhost:3001).

### Database Initialization

- The MySQL container will create the `studentportal` database automatically.
- To initialize the schema, you can run:

  ```bash
  docker exec -i <mysql_container_name> mysql -ustudentuser -pstudentpass studentportal < server/schema.sql
  ```

  Replace `<mysql_container_name>` with the actual container name (find it with `docker ps`).

### Notes

- Change the default MySQL passwords in `docker-compose.yml` before deploying to production.
- If you need to customize environment variables for the backend, provide a `.env` file in the `server/` directory and uncomment the `env_file` line in the compose file.
- The containers run as non-root users for improved security.
