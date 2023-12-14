function studentLoadCourse(userId, courseId)
{
    window.location.href = `/student/course?user_id=${encodeURIComponent(userId)}&course_id=${encodeURIComponent(courseId)}`;
}