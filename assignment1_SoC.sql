CREATE DATABASE university;
CREATE TABLE Department(
 dept_name VARCHAR PRIMARY KEY,
 building VARCHAR,
 budget NUMERIC
);

CREATE TABLE Instructor(
 id INT PRIMARY KEY,
 NAME VARCHAR,
 dept_name VARCHAR REFERENCES Department(dept_name),
 salart NUMERIC
);

CREATE TABLE Student(
 ID INT PRIMARY KEY,
 name VARCHAR,
 dept_name VARCHAR REFERENCES Department(dept_name),
 tot_cred NUMERIC
);

CREATE TABLE Course(
 course_id VARCHAR PRIMARY KEY,
 title VARCHAR,
 dept_name VARCHAR REFERENCES Department(dept_name),
 credits NUMERIC
);

CREATE TABLE Advisor(
 s_ID INT PRIMARY KEY REFERENCES student(ID),
 i_ID INT REFERENCES Instructor(ID)
);

CREATE TABLE Classroom (
 building VARCHAR,
 room_number VARCHAR,
 capacity INT,
 PRIMARy KEY (building, room_number)
);

CREATE TABLE Time_slot(
 time_slot_id VARCHAR,
 day VARCHAR,
 start_hr INT,
 start_min INT,
 end_hr INT,
 end_min INT,
 PRIMARY KEY(time_slot_id, day, start_hr, start_min)
);

CREATE TABLE Section (
    course_id VARCHAR REFERENCES Course(course_id),
    sec_id VARCHAR,
    semester VARCHAR,
    year INT,
    building VARCHAR,
    room_number VARCHAR,
    time_slot_id VARCHAR,
    PRIMARY KEY (course_id, sec_id, semester, year),
    FOREIGN KEY (building, room_number) REFERENCES Classroom(building, room_number)
);

CREATE TABLE Teaches (
    ID INT REFERENCES Instructor(ID),
    course_id VARCHAR REFERENCES Course(course_id),
    sec_id VARCHAR,
    semester VARCHAR,
    year INT,
    PRIMARY KEY (ID, course_id, sec_id, semester, year)
);

CREATE TABLE Takes (
    ID INT REFERENCES Student(ID),
    course_id VARCHAR REFERENCES Course(course_id),
    sec_id VARCHAR,
    semester VARCHAR,
    year INT,
    grade VARCHAR,
    PRIMARY KEY (ID, course_id, sec_id, semester, year)
);

CREATE TABLE Prereq (
    course_id VARCHAR REFERENCES Course(course_id),
    prereq_id VARCHAR REFERENCES Course(course_id),
    PRIMARY KEY (course_id, prereq_id)
);

--question 2

SELECT COUNT(DISTINCT course_id) FROM teaches;
SELECT COUNT(DISTINCT ID) AS distinct_instructors
FROM teaches
WHERE semester = 'Spring' AND year = 2018;

SELECT COUNT(DISTINCT teaches.course_id) AS course_count
FROM teaches
JOIN instructor ON teaches.ID = instructor.ID
WHERE instructor.name ='Srinivasan';

SELECT DISTINCT course_id
FROM takes
JOIN student ON takes.ID = student.ID
WHERE student.name = 'Levy';

SELECT name
FROM student
WHERE ID NOT IN (
    SELECT s_ID FROM advisor
);


