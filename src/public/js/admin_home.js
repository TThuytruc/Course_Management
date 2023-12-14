function adminLoadCourse(id)
{
    window.location.href = `/admin/course?course_id=${encodeURIComponent(id)}`;
}