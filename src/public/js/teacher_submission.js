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
async function downloadAll() {
    try {
        // Gửi yêu cầu GET đến endpoint để tải xuống file ZIP
        const response = await fetch('/teacher/downloadAll', {
            method: 'GET',
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
        downloadLink.download = 'demo.zip';

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
