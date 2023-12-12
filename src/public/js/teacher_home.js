function teacherLoadCourse(userId, courseId)
{
    window.location.href = `/teacher/course?user_id=${encodeURIComponent(userId)}&course_id=${encodeURIComponent(courseId)}`;
}