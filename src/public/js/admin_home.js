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
      })

      $('#modal-course-insert').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var course_id = button.data('id') // Extract info from data-* attributes
        const form = $('#modal-course-insert').find('form');
        $('#course_name-error').css('display', 'none');
        $('#maxnumberofstudent-error').css('display', 'none');
        form.submit(function(event) {
            event.preventDefault();
            
            let isValid = true;
            const course_name = form.find('input[name="course_name"]').val();
            const maxNumberOfStudent = form.find('input[name="maxnumberofstudent"]').val();
            const schedule = form.find('input[name="schedule"]').val();
           
            let regex = /^[A-Z][a-z]{0,}( [A-Z][a-z]{0,}){0,}$/;
            if (!course_name.match(regex)) {
                $('#course_name-error').html('The first character of each word should be uppercase, and the rest should be lowercase, there is a single space between words!');
                $('#course_name-error').css('display', 'block');
                isValid = false
            }
            if (maxNumberOfStudent <= 0) {
                $('#maxnumberofstudent-error').css('display', 'block');
                isValid = false;
            } 
    
            if (isValid) {
                form.get(0).submit();
            }
        })
      })
})

$(document).ready(function() {
    $("#logo").click(function() {
        window.location.href = `/`;
    });
});