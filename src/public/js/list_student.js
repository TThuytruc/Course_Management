async function showListStudent(value) {
    window.location.href = `/list_student?course_id=${encodeURIComponent(value)}`;
}

function update(selectedItem) {
    document.getElementById('dropdownMenuButton').innerText = selectedItem;
    var list_student = []
    var tbody = document.getElementById("list_student");
    var  object_value= document.getElementById('object_value')
    for (var i = 0; i < tbody.rows.length; i++) {
        var cells = tbody.rows[i].cells;
        var finalscore=0;
        var dataStudentId=0;
        var dataCourseId=0;
        if(object_value.value=='student')
        {
            finalscore=cells[3].innerText
        }
        else
        {
            finalscore= cells[3].firstChild.value;
            // console.log(finalscore);
            dataStudentId=cells[3].firstChild.getAttribute('data-student-id');
            dataCourseId=cells[3].firstChild.getAttribute('data-course-id');
        }
        var data = {
            mssv: cells[0].innerText,
            name: cells[1].innerText,
            email: cells[2].innerText,
            finalscore: finalscore,
            dataCourseId:dataCourseId,
            dataStudentId:dataStudentId
        };
        list_student.push(data);
    }
    // console.log(list_student);
    if (selectedItem === 'ID') {
        list_student.sort(function (a, b) {
            var mssv_a = parseInt(a.mssv, 10);
            var mssv_b = parseInt(b.mssv, 10);

            return mssv_a - mssv_b;
        });
    }

    if (selectedItem === 'Name') {
        list_student.sort(function (a, b) {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();
            nameA = nameA.split(' ');
            nameB = nameB.split(' ');
            if (nameA.length > 0) {
                nameA = nameA[nameA.length - 1];
            }
            else {
                nameA = '';
            }
            if (nameB.length > 0) {
                nameB = nameB[nameB.length - 1];
            }
            else {
                nameB = '';
            }

            const collator = new Intl.Collator('vi');
            return collator.compare(nameA, nameB);
        });
    }

    if (selectedItem === 'Final Score') {
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
        var aElement= document.createElement('a');
        aElement.textContent= student.email;
        aElement.style="color:#e91e63 !important;"
        cellEmail.appendChild(aElement); 

        // console.log(student);
        var cellScore = document.createElement("td");
        if(object_value.value==='student')
        {
            cellScore.textContent = (student.finalscore);
        }
        else
        {

            var inputElement= document.createElement('input');
            var inputElement = document.createElement('input');
            inputElement.type = "number";
            inputElement.className = "score";
            inputElement.setAttribute("data-score", `${student.finalscore}`);
            inputElement.setAttribute("data-student-id", `${student.dataStudentId}`);
            inputElement.setAttribute("data-course-id", `${student.dataCourseId}`);
            inputElement.name = "score";
            inputElement.min = "0";
            inputElement.max = "10";
            inputElement.step = "0.1";
            inputElement.onkeydown = function(event) {
                updateAllScores(event);
            };
            inputElement.setAttribute("value", `${student.finalscore}`);
            console.log(inputElement);  
            cellScore.appendChild(inputElement); 
        }

        // Thêm các ô vào hàng
        newRow.appendChild(cellId);
        newRow.appendChild(cellName);
        newRow.appendChild(cellEmail);
        newRow.appendChild(cellScore);

        // Thêm hàng vào tbody
        tbody.appendChild(newRow);
    }

}
async function updateFinalScore(course_id, user_id, score) {

    const data = {
        course_id: course_id,
        user_id: user_id,
        score: score
    };
    const response = await fetch('/list_student/updateFinalScore', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data })
    });

    if (response.ok) {
        const result = await response.json();
    } else {
        console.error('Failed to send data to server');
    }

    location.reload();
}

function updateAllScores(event) {
    if (event.key === 'Enter') {
        const inputElements = document.querySelectorAll('.score');
        inputElements.forEach(inputElement => {
            const courseId = inputElement.getAttribute('data-course-id');
            const userId = inputElement.getAttribute('data-student-id');
            let score = inputElement.value;
            if (score === '') {
                score = null;
            }
            updateFinalScore(courseId, userId, score);
        });
    }
}

$(document).ready(function() {
    $("#logo").click(function() {
        window.location.href = `/`;
    });
});
