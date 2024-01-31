CREATE TYPE course_recommendation_type AS ENUM ('mandatory', 'optional', 'alt_mandatory');

CREATE TABLE Courses (
    id SERIAL PRIMARY KEY,
    course_code VARCHAR(255) NOT NULL,
    course_name VARCHAR(255) NOT NULL,
    course_nick_name VARCHAR(255),
    kori_name VARCHAR(255) NOT NULL
);

CREATE TABLE Degree (
    id SERIAL PRIMARY KEY,
    degree_name VARCHAR(255) NOT NULL,
    kori_name VARCHAR(255) NOT NULL
);

CREATE TABLE CourseDegreeRelation (
    id SERIAL PRIMARY KEY,
    course_id INT,
    degree_id INT,
    FOREIGN KEY (course_id) REFERENCES Courses(id),
    FOREIGN KEY (degree_id) REFERENCES Degree(id),
    UNIQUE (course_id, degree_id)
);

CREATE TABLE PrerequisiteCourse (
    course_id INT,
    prerequisite_course_id INT,
    course_type course_recommendation_type,
    PRIMARY KEY (course_id, prerequisite_course_id),
    FOREIGN KEY (course_id) REFERENCES Courses(id),
    FOREIGN KEY (prerequisite_course_id) REFERENCES Courses(id)
);

CREATE INDEX idx_course_degree_relation_degree_id ON CourseDegreeRelation(degree_id);
CREATE INDEX idx_prerequisite_course_course_id ON PrerequisiteCourse(course_id);
CREATE INDEX idx_prerequisite_course_prerequisite_course_id ON PrerequisiteCourse(prerequisite_course_id);
