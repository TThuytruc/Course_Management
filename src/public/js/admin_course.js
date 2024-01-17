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
  console.log(id);
  console.log(table);
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
  console.log("Delete Teacher");
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
  console.log("Delete Student");
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

      const dataSendSever = {
        id: id,
        students: dataWithoutHeader
      };
      fetch('/admin/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: dataSendSever }),
      })
        .then(response => response.json())
        .then(data => {
          // Xử lý dữ liệu trả về từ server (nếu có)
        })
        .catch(error => {
          console.error('Error:', error);
        });

    };
    reader.readAsBinaryString(file);
  }

}

async function importExcelTeacher()
{
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
          // Xử lý dữ liệu trả về từ server (nếu có)
        })
        .catch(error => {
          console.error('Error:', error);
        });

    };
    reader.readAsBinaryString(file);
  }

}