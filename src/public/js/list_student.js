async function showListStudent(value)
{
    window.location.href = `/list_student/list_student?id_course=${encodeURIComponent(value)}`;
}