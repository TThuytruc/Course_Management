function adminLoadCourse(id)
{
    window.location.href = `/admin/course?id_course=${encodeURIComponent(id)}`;
}