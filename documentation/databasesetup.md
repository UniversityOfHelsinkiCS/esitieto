# Setting up psql database

1. Install PostgreSQL
2. Initializing local database

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

3. Insert

INSERT INTO Courses (course_code, course_name, course_nick_name, kori_name) VALUES ('CS101', 'Introduction to Computer Science', 'Intro CS', 'CS101_KORI');

output:
INSERT 0 1

4. Check that it works:

input
SELECT * FROM Courses;

output:
 id | course_code |           course_name            | course_nick_name | kori_name
----+-------------+----------------------------------+------------------+------------
  1 | CS101       | Introduction to Computer Science | Intro CS         | CS101_KORI
(1 row)


# Setting up the backend for the database

1. Create an .env file into the backend, it should contain the following:

POSTGRES_USER=postgres (this is the default username postgres has, but if you have different one change it)
POSTGRES_PASSWORD=yourpassword
DATABASE_HOST=localhost
DATABASE_PORT=port
DATABASE_NAME=local_database (this is what I use, if you name your database differently change it accordingly)

2. Check that the backend can reach the database

curl http://localhost:3001/api/getCourses

output:
[{"id":1,"course_code":"CS101","course_name":"Introduction to Computer Science","course_nick_name":"Intro CS","kori_name":"CS101_KORI"}]
