## Create an .env file in the project root with the following variables:

- VITE_DEV_PORT=3000
  - Purpose: Specifies the port to run the program in development mode locally.
- POSTGRES_USER=postgres
  - Note: The default PostgreSQL username. Change it if your setup uses a different username.
- POSTGRES_PASSWORD=yourpassword
  - Replace `yourpassword` with the actual password for your PostgreSQL user.
- DATABASE_HOST=localhost
  - The hostname where your PostgreSQL database is running. `localhost` for running the program locally.
- DATABASE_PORT=5432
  - PostgreSQL's default port. Change if your database listens on a different port.
- DATABASE_NAME=local_database
  - Use the name of your local database here. Ensure the `POSTGRES_USER` has the necessary permissions on this database.


## Optional development related .env variables:

- LOGGING_LEVEL = error/warn/info/verbose/debug
  - Purpose: This affects what information is logged on the backend console. The option you choose will be displayed and all those on the left side of it (e.g. if set to 'verbose', then debug messages are not displayed.)
