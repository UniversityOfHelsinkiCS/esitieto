CREATE TABLE course_info (
    id SERIAL PRIMARY KEY,
    kori_name VARCHAR(50) NOT NULL,
    course_name VARCHAR(255) NOT NULL,
    official_course_id VARCHAR(50) NOT NULL,
    CONSTRAINT course_kori_name_unique UNIQUE (kori_name)
);

CREATE TABLE degree_info (
    id SERIAL PRIMARY KEY,
    kori_name VARCHAR(50) NOT NULL,
    degree_name VARCHAR(255) NOT NULL,
    official_degree_id VARCHAR(50) NOT NULL,
    CONSTRAINT degree_kori_name_unique UNIQUE (kori_name)
);

CREATE TABLE course_degree_relation (
    id SERIAL PRIMARY KEY,
    degree_kori_name VARCHAR(50) NOT NULL,
    course_kori_name VARCHAR(50) NOT NULL,
    CONSTRAINT no_duplicate_course_degree_relation UNIQUE (degree_kori_name, course_kori_name)
);

CREATE TABLE prerequisite_course_relation (
    id SERIAL PRIMARY KEY,
    course_kori_name VARCHAR(50) NOT NULL,
    prerequisite_course_kori_name VARCHAR(50) NOT NULL,
    CONSTRAINT unique_course_prerequisite UNIQUE (course_kori_name, prerequisite_course_kori_name),
    CONSTRAINT no_self_prerequisite CHECK (course_kori_name != prerequisite_course_kori_name)
);

CREATE TABLE course_prerequisite_comments (
    id SERIAL PRIMARY KEY,
    prerequisite_course_relation_id INT NOT NULL,
    comment VARCHAR(1000) NOT NULL,
    FOREIGN KEY (prerequisite_course_relation_id) REFERENCES prerequisite_course_relation(id)
);


CREATE INDEX idx_prerequisite_course_course_kori_name ON prerequisite_course_relation(course_kori_name);
CREATE INDEX idx_prerequisite_course_prerequisite_course_kori_name ON prerequisite_course_relation(prerequisite_course_kori_name);
CREATE INDEX idx_course_degree_relation_id ON course_degree_relation(degree_kori_name);
