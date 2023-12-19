function adminLoadCourse(id)
{
    window.location.href = `/admin/course?course_id=${encodeURIComponent(id)}`;
}

document.addEventListener('DOMContentLoaded', function(){
    $('#modal-course-delete').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var course_id = button.data('id') // Extract info from data-* attributes
        console.log(course_id)
        $('#modal-course-delete').find('form').attr('action',`/course/delete/${course_id}`);
        // console.log(form)
      })
})