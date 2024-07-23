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

- LOGGING_LEVEL = error/warn/info/verbose/debug # The default value is 'debug'
  - Purpose: This affects what information is logged on the backend console. The option you choose will be displayed and all those on the left side of it (e.g. if set to 'verbose', then debug messages are not displayed.)

## Quick tips for PSQL

- psql -U postgres -d postgres -c "ALTER USER username WITH PASSWORD 'new_password';"
  - Set up a new password if password is missing
- \l
  - List all your databases
- CREATE DATABASE my_new_database;
  - Create a new database
- \conninfo
  - Check the current database connection
- psql -U postgres -d my_new_database
  - Connect to a specific database