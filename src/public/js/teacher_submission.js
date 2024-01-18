window.onload = function () {
    var downloadLink = document.querySelector('.file_name');
    var fileName = downloadLink.textContent || downloadLink.innerText;
    var filePath = "" + fileName;
    downloadLink.href = filePath;
    downloadLink.download = fileName;
   
};

function scoreEnter(event) {
    if (event.key === 'Enter') {
        var scoreInput = document.getElementById('box_scores');
        var scoreValue = scoreInput.value;
        if (scoreValue == '' || scoreValue <= 0) {
            scoreValue = 0;
        }
        else {
            if (scoreValue >= 10) {
                scoreValue = 10;
            }
        }
        scoreInput.value = scoreValue;
        // scoreValue is score of student.
        event.preventDefault();
    }
}
async function downloadAll(user_id,exercise_id,exercise_name,course_name,course_id) {
    // console.log(user_id);
    // console.log(exercise_id);
    // console.log(exercise_name);
    // console.log(course_name);
    
        const data={user_id:user_id,exercise_id:exercise_id,exercise_name:exercise_name,course_name:course_name,course_id:course_id}
        
        const jsonData = JSON.stringify(data);
        try {
        
        // Gửi yêu cầu POST đến endpoint để tải xuống file ZIP
        const response = await fetch('/teacher/downloadAll', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
              },
              body: jsonData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Chuyển đổi response thành blob
        const blob = await response.blob();
        // Tạo URL tạm thời từ blob
        const blobURL = window.URL.createObjectURL(blob);

        // Tạo một đối tượng link để kích hoạt tải xuống
        const downloadLink = document.createElement('a');
        downloadLink.href = blobURL;
        let name_zip= exercise_name.replace(/\s+/g, '_');
        name_zip = exercise_name.replace(/[\/\\:*?"<>|]/g, '');
        console.log(name_zip);
        downloadLink.download = `${name_zip}-${exercise_id}.zip`;

        // Thêm vào body để tránh lỗi không xác định trong một số trình duyệt
        document.body.appendChild(downloadLink);

        // Kích hoạt tải xuống bằng cách giả mạo sự kiện bấm vào liên kết
        downloadLink.click();

        // Gỡ bỏ đối tượng link tạm thời khỏi body
        document.body.removeChild(downloadLink);

        // Giải phóng URL tạm thời
        window.URL.revokeObjectURL(blobURL);

    } catch (error) {
        console.error('Error during download:', error);
    }
}
