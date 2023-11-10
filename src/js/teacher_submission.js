window.onload = function() {
    var downloadLink = document.querySelector('.file_name');
    var fileName = downloadLink.textContent || downloadLink.innerText;
    var filePath = "" + fileName;

    downloadLink.href = filePath;
    downloadLink.download = fileName;
};
