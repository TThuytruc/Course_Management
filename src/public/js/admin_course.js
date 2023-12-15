async function DeleteAllTeacher(id_course)
{
    var tbody = document.getElementById("list_teacher");
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    const response = await fetch('/admin/deleteAllTeacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id_course:id_course})
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Server response:', result);
      } else {
        console.error('Failed to send data to server');
      }
    console.log("Delete Teacher");
}
async function DeleteAllStudent(id_course)
{
    var tbody = document.getElementById("list_student");
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    const response = await fetch('/admin/deleteAllStudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id_course:id_course})
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Server response:', result);
      } else {
        console.error('Failed to send data to server');
      }
    console.log("Delete Student");
}