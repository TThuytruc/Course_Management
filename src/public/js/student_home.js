function studentLoadCourse(userId, courseId)
{
    window.location.href = `/student/course?course_id=${encodeURIComponent(courseId)}`;
}

$(document).ready(function() {
    $("#logo").click(function() {
        window.location.href = `/`;
    });
});