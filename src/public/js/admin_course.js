function DeleteAll(table, id) {
  console.log("delete");
  const delete_description = document.getElementById('delete_description');
  delete_description.textContent = `Are you sure to delete All ${table} ?`;
  document.getElementById('courseIdInput').value = id;
  document.getElementById('personIdInput').value = table;
  // Show the Bootstrap modal
  $('#modal-course-delete').modal('show');

}

function DeleteAcction() {
  const id = document.getElementById('courseIdInput').value;
  const table = document.getElementById('personIdInput').value;
  //   console.log(id);
  //   console.log(table);
  if (table === 'student') {
    DeleteAllStudent(id);
  }
  else {
    DeleteAllTeacher(id);
  }
  CloseDialog();
}
function CloseDialog() {
  $('#modal-course-delete').modal('hide');
  $('#modal-user-add').modal('hide');
  $('#modal-user-delete').modal('hide');
}
// Show the Bootstrap modal

async function DeleteAllTeacher(id_course) {
  var tbody = document.getElementById("list_teacher");
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  const response = await fetch('/admin/deleteAllTeacher', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id_course: id_course })
  });

  if (response.ok) {
    const result = await response.json();
    console.log('Server response:', result);
  } else {
    console.error('Failed to send data to server');
  }
  // console.log("Delete Teacher");
}
async function DeleteAllStudent(id_course) {
  var tbody = document.getElementById("list_student");
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  const response = await fetch('/admin/deleteAllStudent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id_course: id_course })
  });

  if (response.ok) {
    const result = await response.json();
    console.log('Server response:', result);
  } else {
    console.error('Failed to send data to server');
  }
  // console.log("Delete Student");
}
async function deleteUser(user_id, course_id, userType) {
  var message = 'Are you sure to delete this ' + userType + '?';
  document.getElementById('del_description').textContent = message;

  document.getElementById('dl_user_id').value = user_id;
  document.getElementById('dl_course_id').value = course_id;

  $('#modal-user-delete').modal('show');
}
async function DeleteOneUser() {
  const user_id = document.getElementById('dl_user_id').value;
  const course_id = document.getElementById('dl_course_id').value;
  console.log(course_id);
  console.log(user_id);
  const response = await fetch('/admin/deleteUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ course_id: course_id, user_id: user_id })
  });

  if (response.ok) {
    const result = await response.json();
    console.log('Server response:', result);

    // Remove the user from the teacher table
    var userRowInTeacherTable = document.getElementById('teacher-' + user_id);
    if (userRowInTeacherTable) {
      userRowInTeacherTable.remove();
    }

    // Remove the user from the student table
    var userRowInStudentTable = document.getElementById('student-' + user_id);
    if (userRowInStudentTable) {
      userRowInStudentTable.remove();
    }
  } else {
    console.error('Failed to send data to server');
  }
  console.log("Delete User");
  CloseDialog();
  location.reload();
}
async function addUser(currentCount, maxCount, userType) {
  // Update the user type, current count and max count
  if (userType == 'student') {
    document.getElementById('userType').value = 'student';
    document.getElementById('currentCount').textContent = 'Number of students: ' + currentCount;
    document.getElementById('maxCount').textContent = 'Max number of students: ' + maxCount;
  }
  else {
    document.getElementById('currentCount').textContent = 'Number of teachers: ' + currentCount;
    document.getElementById('userType').value = 'teacher';
  }

  // Show the modal
  $('#modal-user-add').modal('show');
}

async function addTeacher(course_id, user_id) {
  const response = await fetch('/admin/addTeacher', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ course_id: course_id, user_id: user_id })
  });

  if (response.ok) {
    const result = await response.json();
    console.log('Server response:', result);
  } else {
    console.error('Failed to send data to server');
  }
  console.log("Add Teacher");
}
async function addStudent(course_id, user_id) {

  const response = await fetch('/admin/addStudent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ course_id: course_id, user_id: user_id })
  });

  if (response.ok) {
    const result = await response.json();
    console.log('Server response:', result);
  } else {
    console.error('Failed to send data to server');
  }
  console.log("Add Student");
}
async function Add(course_id) {
  event.preventDefault();
  const user_id_string = document.getElementById('userIdInput').value;
  const user_id = parseInt(user_id_string, 10);
  if (isNaN(user_id)) {
    console.error('Invalid user ID');
    return;
  }
  console.log(user_id);
  const userType = document.getElementById('userType').value;
  if (userType == 'student') {
    addStudent(course_id, user_id);
    console.log("student");
  } else if (userType == 'teacher') {
    addTeacher(course_id, user_id);
    console.log("teacher");
  } else {
    console.error('Invalid user type');
  }
  CloseDialog();
  location.reload();
}

async function importExcel() {
  const input = document.getElementById('file_submission');
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });

      // Lấy thông tin từ sheet đầu tiên
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      // Chuyển đổi dữ liệu từ sheet sang JSON
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      // Bỏ qua dòng header (nếu có) và in ra dữ liệu
      const dataWithoutHeader = jsonData.slice(1);
      const id = document.getElementById('courseIdInput').value;
      const list_student = document.getElementById('list_student');
      const dataSendSever = {
        id: id,
        students: dataWithoutHeader
      };
      var status = 200;
      fetch('/admin/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: dataSendSever }),
      })
        .then(response => {
          if (response.status != 200) {
            status = response.status;
          }
          // console.log(response);
          return response.json();
        })
        .then(data => {
          console.log(data);
          console.log('status', status);
          location.reload();
          if (status != 200) {
            console.log('failed');
            alert(data.message);
          }
          // Xử lý dữ liệu trả về từ server (nếu có)
        })
        .catch(error => {
          console.error('Error:', error);
        });

    };
    reader.readAsBinaryString(file);

  }
}

async function importExcelTeacher() {
  const input = document.getElementById('file_listTeacher');
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });

      // Lấy thông tin từ sheet đầu tiên
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      // Chuyển đổi dữ liệu từ sheet sang JSON
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      // Bỏ qua dòng header (nếu có) và in ra dữ liệu
      const dataWithoutHeader = jsonData.slice(1);
      const id = document.getElementById('courseIdInput').value;

      const dataSendSever = {
        id: id,
        students: dataWithoutHeader
      };
      fetch('/admin/importTeacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: dataSendSever }),
      })
        .then(response => response.json())
        .then(data => {
          location.reload();
          // Xử lý dữ liệu trả về từ server (nếu có)
        })
        .catch(error => {
          console.error('Error:', error);
        });

    };
    reader.readAsBinaryString(file);
  }
}