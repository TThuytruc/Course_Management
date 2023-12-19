window.onload=function()
{
    let listSubmission=document.querySelectorAll(".submission");
    let list_current_submission=document.querySelector('.list_current_submission');
    for(submission of listSubmission)
    {
        let clone= submission.cloneNode(true);
        let changeColor=clone.querySelector('.text');

        changeColor.classList.add("color_submission");
        list_current_submission.appendChild(clone);
    }   
}

function submission1(id)
{
    window.location.href = `/student/submission?exercise_id=${encodeURIComponent(id)}`;
}


