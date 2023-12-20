function DeleteAll(table,id)
{
  console.log("delete");
  const delete_description= document.getElementById('delete_description');
  delete_description.textContent=`Are you sure to delete All ${table} ?`;
  document.getElementById('courseIdInput').value = id;
  document.getElementById('personIdInput').value = table;
  // Show the Bootstrap modal
  $('#modal-course-delete').modal('show');

}

function DeleteAcction()
{
  const id= document.getElementById('courseIdInput').value;
  const table=document.getElementById('personIdInput').value ;
  console.log(id);
  console.log(table);
  if(table==='student')
  {
    DeleteAllStudent(id);
  }
  else
  {
    DeleteAllTeacher(id);
  }
}
function CloseDialog()
{
  $('#modal-course-delete').modal('hide');
}
  // Show the Bootstrap modal

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