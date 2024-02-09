# Setting up psql database

## Install PostgreSQL
## Initialize local database

Open CMD or terminal (or whatever you use?) in projectroot/backend (the same directory where schema.sql is in)

input:
psql -U postgres -d local_database -f schema.sql
Password for user postgres:

output:
CREATE TYPE
CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE INDEX
CREATE INDEX
CREATE INDEX

## Insert

INSERT INTO Courses (course_code, course_name, course_nick_name, kori_name) VALUES ('CS101', 'Introduction to Computer Science', 'Intro CS', 'CS101_KORI');

output:
INSERT 0 1

## Check that it works:

input
SELECT * FROM Courses;

output:
 id | course_code |           course_name            | course_nick_name | kori_name
----+-------------+----------------------------------+------------------+------------
  1 | CS101       | Introduction to Computer Science | Intro CS         | CS101_KORI
(1 row)


# Setting up the backend for the database

## Create an .env file into the backend, it should contain the following:

- POSTGRES_USER=postgres (this is the default username postgres has, but if you have different one change it)
- POSTGRES_PASSWORD=yourpassword
- DATABASE_HOST=localhost
- DATABASE_PORT=port
- DATABASE_NAME=local_database (this is what I use, if you name your database differently change it accordingly)

## Check that the backend can reach the database

curl http://localhost:3001/api/getCourses

output:
[{"id":1,"course_code":"CS101","course_name":"Introduction to Computer Science","course_nick_name":"Intro CS","kori_name":"CS101_KORI"}]

# (Optional) Testing database with REST Api

Note: You can only use these if your psql server is running!

- Install REST Client in vscode
- Head over to the "rest" directory available in project root
- Right above the first lines of code, there is a "send request" button
- Click them as you will, the vscode will display the results. If you have setup the psql database + server properly, they should work! See below for visualization

![restusage](https://i.gyazo.com/edb6d25843d098f19da254aa152c05ed.gif)
