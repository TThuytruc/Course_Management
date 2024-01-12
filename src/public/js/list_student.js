async function showListStudent(value) {
    window.location.href = `/list_student?course_id=${encodeURIComponent(value)}`;
}
function update(selectedItem) {
    document.getElementById('dropdownMenuButton').innerText = selectedItem;
    var list_student = []
    var tbody = document.getElementById("list_student");

    for (var i = 0; i < tbody.rows.length; i++) {
        var cells = tbody.rows[i].cells;
        var data = {
            mssv: cells[0].innerText,
            name: cells[1].innerText,
            email: cells[2].innerText,
            finalscore: cells[3].innerText,
        };
        list_student.push(data);
    }

    if (selectedItem === 'mssv') {
        list_student.sort(function (a, b) {
            var mssv_a = parseInt(a.mssv, 10);
            var mssv_b = parseInt(b.mssv, 10);

            return mssv_a - mssv_b;
        });
    }
    if (selectedItem === 'name') {
        list_student.sort(function (a, b) {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();

            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
    }
    if (selectedItem === 'finalscore') {
        list_student.sort(function (a, b) {
            var score_a = 0;
            var score_b = 0;
            if (a.finalscore !== '') {
                score_a = parseInt(a.finalscore, 10);
            }
            if (b.finalscore !== '') {
                score_b = parseInt(b.finalscore, 10);
            }
            return score_a - score_b;
        });
    }
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    for (const student of list_student) {
        // Tạo một hàng mới (<tr>)
        var newRow = document.createElement("tr");

        // Tạo các ô mới (<td>) và đặt giá trị
        var cellId = document.createElement("td");
        cellId.textContent = student.mssv;

        var cellName = document.createElement("td");
        cellName.textContent = student.name;

        var cellEmail = document.createElement("td");
        cellEmail.textContent = student.email;

        var cellScore = document.createElement("td");
        cellScore.textContent = student.finalScore;

        // Thêm các ô vào hàng
        newRow.appendChild(cellId);
        newRow.appendChild(cellName);
        newRow.appendChild(cellEmail);
        newRow.appendChild(cellScore);

        // Thêm hàng vào tbody
        tbody.appendChild(newRow);
    }

}