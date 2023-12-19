-- Tạo bảng Account
CREATE TABLE Account (
    Account_id SERIAL PRIMARY KEY,
    Account_email VARCHAR(50) NOT NULL UNIQUE,
    Account_password VARCHAR(50) NOT NULL
);

-- Tạo bảng User
CREATE TABLE User_ (
    User_id SERIAL PRIMARY KEY,
	Account_id INTEGER NOT NULL,
    User_name VARCHAR(50) NOT NULL,
    User_Role VARCHAR(10) NOT NULL
);

-- Tạo bảng Teacher
CREATE TABLE Teacher (
    User_id INTEGER PRIMARY KEY
);

-- Tạo bảng Admin
CREATE TABLE Admin_ (
    User_id INTEGER PRIMARY KEY
);

-- Tạo bảng Student
CREATE TABLE Student (
    User_id INTEGER PRIMARY KEY
);

-- Tạo bảng Course
CREATE TABLE Course (
    Course_id SERIAL PRIMARY KEY,
    Course_name VARCHAR(100) NOT NULL,
	MaxNumberOfStudent INTEGER NOT NULL,
	Schedule VARCHAR(20)
);

-- Tạo bảng Topic
CREATE TABLE Topic (
    Topic_id SERIAL PRIMARY KEY,
	Course_id INTEGER NOT NULL,
    Topic_name VARCHAR(100) NOT NULL, 
	Description TEXT
);

-- Tạo bảng Course_Student
CREATE TABLE Course_Student(
    Course_id INTEGER,
    User_id INTEGER, 
	FinalScore DECIMAL,
	PRIMARY KEY (Course_id, User_id) 
);

-- Tạo bảng Course_Teacher
CREATE TABLE Course_Teacher(
    Course_id INTEGER,
    User_id INTEGER, 
	PRIMARY KEY (Course_id, User_id) 
);

-- Tạo bảng Exercise
CREATE TABLE Exercise (
    Exercise_id SERIAL PRIMARY KEY,
	Topic_id INTEGER NOT NULL,
    Exercise_name VARCHAR(50) NOT NULL, 
	OpenTime Timestamp without time zone NOT NULL,
	DueTime Timestamp without time zone NOT NULL,
	Description TEXT 
);

-- Tạo bảng Submission
CREATE TABLE Submission (
    User_id INTEGER,
    Exercise_id INTEGER,
    SubmissionTime Timestamp without time zone NOT NULL,
	SubmissionFile BYTEA,
    Score DECIMAL,
	PRIMARY KEY(User_id, Exercise_id)
);

-- Khóa ngoại
ALTER TABLE User_ 
ADD CONSTRAINT fk_User_Acc
FOREIGN KEY (Account_id) REFERENCES Account(Account_id);

ALTER TABLE Admin_ 
ADD CONSTRAINT fk_Ad_User
FOREIGN KEY (User_id) REFERENCES User_(User_id);

ALTER TABLE Teacher 
ADD CONSTRAINT fk_Teacher_User
FOREIGN KEY (User_id) REFERENCES User_(User_id);

ALTER TABLE Student 
ADD CONSTRAINT fk_Student_User
FOREIGN KEY (User_id) REFERENCES User_(User_id);

ALTER TABLE Course_Teacher 
ADD CONSTRAINT fk_CT1
FOREIGN KEY (User_id) REFERENCES Teacher(User_id);

ALTER TABLE Course_Teacher 
ADD CONSTRAINT fk_CT2
FOREIGN KEY (Course_id) REFERENCES Course(Course_id);

ALTER TABLE Topic 
ADD CONSTRAINT fk_TC
FOREIGN KEY (Course_id) REFERENCES Course(Course_id);

ALTER TABLE Course_Student 
ADD CONSTRAINT fk_CS
FOREIGN KEY (User_id) REFERENCES Student(User_id);

ALTER TABLE Course_Student 
ADD CONSTRAINT fk_CS2
FOREIGN KEY (Course_id) REFERENCES Course(Course_id);

ALTER TABLE Exercise
ADD CONSTRAINT fk_ET
FOREIGN KEY (Topic_id) REFERENCES Topic(Topic_id);

ALTER TABLE Submission 
ADD CONSTRAINT fk_SE1
FOREIGN KEY (Exercise_id) REFERENCES Exercise(Exercise_id);

ALTER TABLE Submission
ADD CONSTRAINT fk_SE2
FOREIGN KEY (User_id) REFERENCES Student(User_id);

-- Function: lấy user từ account_id
CREATE OR REPLACE FUNCTION get_user_with_account_id(account_id_param integer)
RETURNS user_ AS $$
DECLARE
    user_record user_;
BEGIN 
    SELECT *
    INTO user_record
    FROM user_
    WHERE account_id = account_id_param;
    
    RETURN user_record;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION delete_course(course_id_param integer)
RETURNS VOID AS $$
BEGIN   
    EXECUTE 'DELETE FROM course_student WHERE Course_id = $1' USING course_id_param;
	EXECUTE 'DELETE FROM course_teacher WHERE Course_id = $1' USING course_id_param;
	EXECUTE 'DELETE FROM course WHERE Course_id = $1' USING course_id_param;
END;
$$ LANGUAGE plpgsql;