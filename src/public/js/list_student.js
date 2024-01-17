async function showListStudent(value)
{
    window.location.href = `/list_student?course_id=${encodeURIComponent(value)}`;
}
async function updateFinalScore(course_id, user_id, score) {

    const data = {
        course_id: course_id,
        user_id: user_id,
        score: score
    };
    const response = await fetch('/list_student/updateFinalScore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({data})
    });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Server response:', result);
      } else {
        console.error('Failed to send data to server');
      }
    console.log("Update Score");
}
function updateAllScores(event) {
    if (event.key === 'Enter') {
        const inputElements = document.querySelectorAll('.score');
        inputElements.forEach(inputElement => {
            const courseId = inputElement.getAttribute('data-course-id');
            const userId = inputElement.getAttribute('data-student-id');
            let score = inputElement.value;
            if (score === '') {
                score = null;
            }
            updateFinalScore(courseId, userId, score);
        });
        location.reload();
    }
}
