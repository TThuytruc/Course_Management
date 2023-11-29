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
function downloadAll() {
    // Get all file links in the table
    var fileLinks = document.querySelectorAll('.file_name');

    // Iterate through each link and trigger download
    fileLinks.forEach(function(link) {
        var fileName = link.textContent.trim(); // Extracting the file name
        var fileContent = 'This is the content of ' + fileName; // You need to replace this with actual file content or fetch it from somewhere

        // Create a Blob from the file content
        var blob = new Blob([fileContent], { type: 'text/plain' });

        // Create a download link
        var downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = fileName;

        // Append the link to the document and trigger the download
        document.body.appendChild(downloadLink);
        downloadLink.click();

        // Remove the link from the document
        document.body.removeChild(downloadLink);
    });
}