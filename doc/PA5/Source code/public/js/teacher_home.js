function teacherLoadCourse(userId, courseId)
{
    window.location.href = `/teacher/course?course_id=${encodeURIComponent(courseId)}`;
}

$(document).ready(function() {
    $("#logo").click(function() {
        window.location.href = `/`;
    });
});