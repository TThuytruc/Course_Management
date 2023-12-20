function SaveSubmission() {
    var fileInput = document.getElementById('file_submission');
    var date= getTime();
    console.log(date);
    
    if (fileInput.files.length > 0) {
        var formData = new FormData();
        // Thêm user_id vào FormData
        formData.append('user_id', 4);
        formData.append('date', date);
        formData.append('exercise_id', 1);

        for (var i = 0; i < fileInput.files.length; i++) {
            formData.append('files', fileInput.files[i]);
        }
        // Sử dụng fetch để gửi dữ liệu và file đến server
        fetch('/student/upload', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                // Xử lý kết quả từ server nếu cần
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    console.log("Save");
}
function CancelSubmission() {
    var fileInput = document.getElementById('file_submission');

    // Đặt giá trị của input file về rỗng để xóa tất cả các file đã chọn
    fileInput.value = "";

    // Cập nhật hiển thị tên file
    displayFileNames();
    console.log("Cancle");
}
function displayFileNames() {
    var fileInput = document.getElementById('file_submission');
    var fileNames = document.getElementById('file_names');

    // Kiểm tra xem đã chọn file hay chưa
    if (fileInput.files.length > 0) {
        // Lấy tên của tất cả các file được chọn
        var names = Array.from(fileInput.files).map(file => file.name);

        // Hiển thị danh sách tên file
        fileNames.innerHTML = 'Selected files: ' + names.join(', ');

    } else {
        // Nếu không có file nào được chọn, hiển thị thông báo
        fileNames.innerHTML = 'No files selected';
    }
}
function getTime() {
    var currentDate = new Date();

    var day = currentDate.getDate().toString().padStart(2, '0');
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
    var year = currentDate.getFullYear();
    var hours = currentDate.getHours().toString().padStart(2, '0');
    var minutes = currentDate.getMinutes().toString().padStart(2, '0');
    var seconds = currentDate.getSeconds().toString().padStart(2, '0');

    // Tạo chuỗi theo định dạng mm-dd-yyyy hh:mm:ss
    var formattedDateTime = `${month}-${day}-${year} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
}