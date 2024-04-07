async function showListStudent(value) {
  window.location.href = `/list_student?course_id=${encodeURIComponent(value)}`;
}

async function updateScore(exercise_id, user_id, score) {
  const data = {
    exercise_id: exercise_id,
    user_id: user_id,
    score: score,
  };

  const response = await fetch("/teacher/updateScore", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  });

  if (response.ok) {
    const result = await response.json();
    console.log("Server response:", result);
  } else {
    console.error("Failed to send data to server");
  }
}

function updateAllScores(event) {
  if (event.key === "Enter") {
    const inputElements = document.querySelectorAll(".score");
    inputElements.forEach((inputElement) => {
      const userId = inputElement.getAttribute("data-student-id");
      const exerciseId = inputElement.getAttribute("data-exercise-id");
      let score = inputElement.value;
      if (score === "") {
        score = null;
      } else if (score < 0) {
        score = 0;
      } else if (score > 10) {
        score = 10;
      }
      updateScore(exerciseId, userId, score);
    });
    location.reload();
  }
}

async function downloadAll(
  user_id,
  exercise_id,
  exercise_name,
  course_name,
  course_id
) {
  const data = {
    user_id: user_id,
    exercise_id: exercise_id,
    exercise_name: exercise_name,
    course_name: course_name,
    course_id: course_id,
  };
  const jsonData = JSON.stringify(data);

  try {
    // Gửi yêu cầu POST đến endpoint để tải xuống file ZIP
    const response = await fetch("/teacher/downloadAll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Chuyển đổi response thành blob
    const blob = await response.blob();
    // Tạo URL tạm thời từ blob
    const blobURL = window.URL.createObjectURL(blob);

    // Tạo một đối tượng link để kích hoạt tải xuống
    const downloadLink = document.createElement("a");
    downloadLink.href = blobURL;
    let name_zip = exercise_name.replace(/\s+/g, "_");
    name_zip = exercise_name.replace(/[\/\\:*?"<>|]/g, "");
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
    console.error("Error during download:", error);
  }
}

$(document).ready(function () {
  $("#logo").click(function () {
    window.location.href = `/`;
  });
});

async function downloadOneSubmission(
  course_name,
  exercise_name,
  submissionfile,
  exercise_id,
  course_id
) {
  const data = {
    fileName: submissionfile,
    exercise_id: exercise_id,
    exercise_name: exercise_name,
    course_name: course_name,
    course_id: course_id,
  };
  const jsonData = JSON.stringify(data);

  try {
    // Gửi yêu cầu POST đến endpoint để tải xuống file ZIP
    const response = await fetch("/teacher/downloadSingle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Chuyển đổi response thành blob
    const blob = await response.blob();
    // Tạo URL tạm thời từ blob
    const blobURL = window.URL.createObjectURL(blob);

    // Tạo một đối tượng link để kích hoạt tải xuống
    const downloadLink = document.createElement("a");
    downloadLink.href = blobURL;
    let name_zip = submissionfile
    downloadLink.download = `${name_zip}`;

    // Thêm vào body để tránh lỗi không xác định trong một số trình duyệt
    document.body.appendChild(downloadLink);

    // Kích hoạt tải xuống bằng cách giả mạo sự kiện bấm vào liên kết
    downloadLink.click();

    // Gỡ bỏ đối tượng link tạm thời khỏi body
    document.body.removeChild(downloadLink);

    // Giải phóng URL tạm thời
    window.URL.revokeObjectURL(blobURL);
  } catch (error) {
    console.error("Error during download:", error);
  }
}
