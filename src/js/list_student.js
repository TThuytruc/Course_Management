window.onload=function()
{
    var tableBody = document.getElementById("list_student");

  // Dữ liệu giả mạo (có thể thay thế bằng dữ liệu thực tế từ server)
  var data = [
    { mssv: "21120537", student: "Trần Huỳnh Anh Quân", email: "abc@gmail.com"},
    { mssv: "21120549", student: "Jane Doe", email: "def@gmail.com"},
    { mssv: "21120552", student: "Kim Jon Kun", email: "ghi@gmail.com"},
    { mssv: "21120560", student: "Lee Min Ho", email: "jkg@gmail.com"}
    // Thêm các dòng dữ liệu khác nếu cần
  ];

  // Lặp qua mảng dữ liệu và thêm vào bảng
  data.forEach(function (item) {
    var row = tableBody.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = item.mssv;
    cell2.innerHTML = item.student;
    cell3.innerHTML = item.email;
  });
}