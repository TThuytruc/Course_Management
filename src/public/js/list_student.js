async function showListStudent()
{
    const value='2';
    try {
        const response = await fetch('/list_student/loadListStudent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_course:value }),
        });
    
        if (!response.ok) {
          throw new Error('Server response not ok');
        }
    
      } catch (error) {
        console.error('Error:', error);
      }
    window.location.href = '/list_student/list_student';
}