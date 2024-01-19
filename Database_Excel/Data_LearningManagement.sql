-- Bảng Account
INSERT INTO Account (Account_email, Account_password)
VALUES
('ndbao@gmail.com', '123'),
('tdanh@gmail.com', '123'),
('canh@gmail.com', '123'),
('nldan@gmail.com', '123'),
('hanh@gmail.com', '123'),
('tmngoc@gmail.com', '123'),
('haminh@gmail.com', '123'),
('ltanh@gmail.com', '123'),
('tmnghia@gmail.com', '123'),
('ctan@gmail.com', '123'),
('lphuc@gmail.com', '123'),
('cbanh@gmail.com', '123'),
('nmphuc@gmail.com', '123'),
('cman@gmail.com', '123'),
('tldanh@gmail.com', '123'),
('npminh@gmail.com', '123'),
('tlanh@gmail.com', '123'),
('tdan@gmail.com', '123'),
('nminh@gmail.com', '123'),
('ltadan@gmail.com', '123'),
('chmy@gmail.com', '123'),
('tdaquan@gmail.com', '123'),
('tatuan@gmail.com', '123'),
('lpttruc@gmail.com', '123'),
('nnthien@gmail.com', '123'),
('lvnam@gmail.com', '123'),
('htaquan@gmail.com', '123'),
('ndhan@gmail.com', '123'),
('ntkiet@gmail.com', '123'),
('tpminh@gmail.com', '123'),
('ntnphuong@gmail.com', '123'),
('dclam@gmail.com', '123'),
('dmhai@gmail.com', '123'),
('tnqhuong@gmail.com', '123');

-- Bảng User_
INSERT INTO User_ (Account_id, User_name, User_Role)
VALUES
(1, 'Nguyen Duy Bao', 'admin'),
(2, 'Tran Duy Anh', 'teacher'),
(3, 'Chau Anh', 'teacher'),
(4, 'Nguyen Linh Dan', 'student'),
(5, 'Huynh Anh', 'student'),
(6, 'Tran Minh Ngoc', 'student'),
(7, 'Hoang Anh Minh', 'student'),
(8, 'Le Tuan Anh', 'student'),
(9, 'Tran Minh Nghia', 'student'),
(10, 'Chau Thanh An', 'student'),
(11, 'Le Phuc', 'student'),
(12, 'Chau Bao Anh', 'student'),
(13, 'Nguyen Minh Phuc', 'student'),
(14, 'Chau Minh An', 'student'),
(15, 'Tran Le Dieu Anh', 'student'),
(16, 'Nguyen Phuc Minh', 'student'),
(17, 'Tran Linh Anh', 'student'),
(18, 'Tran Dinh An', 'student'),
(19, 'Nguyen Minh', 'student'),
(20, 'Le Tran Anh Dan', 'student'),
(21, 'Chau Hai My', 'student'),
(22, 'Tran Dieu Anh Quan', 'student'),
(23, 'Truong Anh Tuan', 'student'),
(24, 'Le Phan Thuy Truc', 'student'),
(25, 'Nguyen Ngoc Thien', 'student'),
(26, 'Luong Van Nam', 'student'),
(27, 'Huynh Tran Anh Quan', 'student'),
(28, 'Nguyen Dieu Han', 'student'),
(29, 'Nguyen Tuan Kiet', 'student'),
(30, 'Tran Phuc Minh', 'student'),
(31, 'Nguyen Thi Ngoc Phuong', 'teacher'),
(32, 'Do Cao Lam', 'teacher'),
(33, 'Doan Manh Hai', 'teacher'),
(34, 'Tran Ngoc Que Huong', 'teacher');

-- Bảng Admin_
INSERT INTO Admin_ (User_id)
VALUES
(1);

-- Bảng Teacher
INSERT INTO Teacher (User_id)
VALUES
(2),
(3),
(31),
(32),
(33),
(34);

-- Bảng Student
INSERT INTO Student (User_id)
VALUES
(4),
(5),
(6),
(7),
(8),
(9),
(10),
(11),
(12),
(13),
(14),
(15),
(16),
(17),
(18),
(19),
(20),
(21),
(22),
(23),
(24),
(25),
(26),
(27),
(28),
(29),
(30);


-- Bảng Course
INSERT INTO Course (Course_name, MaxNumberOfStudent, Schedule)
VALUES
('Introduction to Software Engineering', 40, 'Monday'),
('Computer Networks', 30, 'Tuesday'),
('Web Development', 70, 'Wednesday'),
('Operating System', 50, 'Thursday'),
('Mobile Development', 90, 'Saturday'),
('Database Management', 100, 'Tuesday');

-- Bảng Topic
INSERT INTO Topic (Course_id, Topic_name, Description)
VALUES
(1, 'Project Management', NULL),
(1, 'Architectural Design', 'Use package diagram and class diagram to design the architectural in all assignments.'),
(2, 'Projects', NULL),
(3, 'Frontend', NULL);

-- Bảng Course_Student
INSERT INTO Course_Student (Course_id, User_id, FinalScore)
VALUES
(1, 5, NULL),
(1, 4, NULL),
(1, 6, NULL),
(1, 7, NULL),
(1, 8, NULL),
(1, 9, NULL),
(1, 10, NULL),
(1, 11, NULL),
(1, 12, NULL),
(1, 23, NULL),
(1, 24, NULL),
(2, 6, NULL),
(2, 9, NULL),
(2, 10, NULL),
(2, 12, NULL),
(2, 17, NULL),
(2, 19, NULL),
(2, 22, NULL),
(2, 23, NULL),
(2, 24, NULL),
(2, 25, NULL),
(2, 29, NULL),
(3, 7, null),
(3, 8, null),
(3, 10, null),
(3, 15, null),
(3, 17, null),
(3, 21, null),
(3, 22, null),
(3, 25, null),
(4, 5, null),
(4, 4, null),
(5, 4, null),
(5, 5, null),
(5, 6, null),
(5, 7, null),
(5, 8, null),
(5, 9, null),
(5, 10, null),
(5, 11, null),
(6, 4, null),
(6, 5, null),
(6, 6, null),
(6, 7, null),
(6, 8, null),
(6, 9, null),
(6, 10, null),
(6, 11, null);

-- Bảng Course_Teacher
INSERT INTO Course_Teacher (Course_id, User_id)
VALUES
(1, 2),
(1, 32),
(1, 34),
(1, 3),
(2, 3),
(2, 31),
(2, 32),
(2, 33),
(3, 32),
(3, 31),
(4, 31),
(4, 33),
(5, 2),
(5, 32),
(5, 31),
(6, 3),
(6, 31),
(6, 32);

-- Bảng Exercise
INSERT INTO Exercise (Topic_id, Exercise_name, OpenTime, DueTime, Description)
VALUES
(1, 'Exercise 01: Risk analysis', '2023-12-01 06:00:00', '2024-02-01 23:00:00', 'All files must be compressed into zip. File name: <StudentID>.zip'),
(1, 'Exercise 02: Estimate', '2024-01-15 09:00:00', '2024-02-23 23:59:00', NULL),
(2, 'Use case', '2023-11-02 14:15:00', '2024-01-03 10:00:00', 'Create use-case specification for the exercise in slide 42.'),
(3, 'Project 01 - Socket', '2023-11-08 07:00:00', '2024-01-28 22:30:00', 'If files are too large, upload to Google Drive and submit the .txt file containing the link'),
(4, 'HTML', '2024-01-18 12:00:00', '2024-01-25 23:59:00', NULL);
