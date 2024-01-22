const buttonRemove = document.getElementById("buttonRemove");
const buttonSave = document.getElementById("buttonSave");
const inputFile=document.getElementById("inputFile");
const buttonCancel= document.getElementById('buttonCancel');

window.onload = function () {
    const isSubmit = document.getElementById("isSubmit").value;
    const isValid= document.getElementById('isValid').value;
    if (isSubmit==='true') {
        buttonRemove.style.display = "block";
        buttonSave.style.display = "none";
        inputFile.style.display="none";
        buttonCancel.disabled =true;
        if(isValid==='true')
        {
            buttonSave.disabled=true;
            buttonCancel.disabled =true;
            buttonRemove.disabled = true;
        }
    }
    else {
        buttonRemove.style.display = "none";
        buttonSave.style.display = "block";
        inputFile.style.display="block";
        buttonCancel.disabled =false;
        if(isValid==='true')
        {
            buttonSave.disabled=true;
            buttonCancel.disabled =true;
            buttonRemove.disabled = true;
        }
    }
};

function SaveSubmission(user_id, exercise_id, exercise_name, course_name,course_id) {
    var fileInput = document.getElementById('file_submission');
    var date = getTime();
  
    if (fileInput.files.length > 0) {
        var formData = new FormData();

        formData.append('user_id', user_id);
        formData.append('date', date);
        formData.append('exercise_id', exercise_id);
        formData.append('course_name', course_name);
        formData.append('exercise_name', exercise_name);
        formData.append('course_id', course_id);

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
                buttonRemove.style.display = "block";
                buttonSave.style.display = "none";
                inputFile.style.display="none";
                buttonCancel.disabled =true;

                alert("submitted successfully")
                window.location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

function CancelSubmission() {
    var fileInput = document.getElementById('file_submission');

    // Đặt giá trị của input file về rỗng để xóa tất cả các file đã chọn
    fileInput.value = "";

    // Cập nhật hiển thị tên file
    displayFileNames();
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

var fileInput = document.getElementById('file_submission');

function RemoveSubmission()
{
    $('#modal-course-delete').modal('show');
}

function CloseDialog()
{
  $('#modal-course-delete').modal('hide');
}

async function DeleteAcction(user_id,exercise_id,exercise_name,course_name,nameFileSubmit,course_id)
{
    // Đặt giá trị của input file về rỗng để xóa tất cả các file đã chọn
    fileInput.value = "";

    // Cập nhật hiển thị tên file
    displayFileNames();
    buttonRemove.style.display = "none";
    buttonSave.style.display = "block";
    inputFile.style.display="block";
    buttonCancel.disabled =false;

    $('#modal-course-delete').modal('hide');
    const data={user_id:user_id,exercise_id:exercise_id,exercise_name:exercise_name,course_name:course_name,nameFileSubmit:nameFileSubmit,course_id:course_id}
    const jsonData = JSON.stringify(data);

    try {
    // Gửi yêu cầu POST đến endpoint để tải xuống file ZIP
    const response = await fetch('/student/removeFile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
          },
          body: jsonData
    })
    .then(response => response.json())
    .then(data => {
    // Xử lý kết quả từ server nếu cần
    })
    .catch(error => {
        console.error('Error:', error);
    });

    location.reload();
    } catch (error) {
        console.error('Error during download:', error);
    }
}

$(document).ready(function() {
    $("#logo").click(function() {
        window.location.href = `/`;
    });
});
