$(document).ready(function () {
    $("#button_add_topic").click(function () {
        $("#window_background").css("display", "block");
        $("#window__add_topic").css("display", "flex");
    });

    $("#button_add_assignment").click(function () {
        $("#window_background").css("display", "block");
        $("#window__add_assignment").css("display", "flex");
    });

    $("#x_add_topic, #button_cancel_add_topic").click(function () {
        $("#window_background").css("display", "none");
        $("#window__add_topic").css("display", "none");
    });

    $("#x_add_assignment, #button_cancel_add_assignment").click(function () {
        $("#window_background").css("display", "none");
        $("#window__add_assignment").css("display", "none");
    });
    
    $("#topic_error_container").css("display", "none");
    $("#assignment_error_container").css("display", "none");

    let selectedElement = $("#assignment_topic");
    let currentTopics = $(".content .title_row");

    currentTopics.each(function() 
    {
        let option = $("<option></option>");
        option.text($(this).text());
        selectedElement.append(option);
    });

 
    $("#logo").click(function() {
        window.location.href = `/`;
    });
});

function hourEnter(event, hourInput) 
{
    if (event.key === 'Enter') 
    {
        var hourValue = hourInput.value;

        if (hourValue == '' || hourValue <= 0) 
        {
            hourValue = 0;
        }
        else if (hourValue >= 23) 
        {
            hourValue = 23;
        }

        hourInput.value = hourValue;
        event.preventDefault();
        formatTwoDigits(hourInput);
    }
}

function minuteEnter(event, minuteInput) 
{
    if (event.key === 'Enter') 
    {
        var minuteValue = minuteInput.value;

        if (minuteValue == '' || minuteValue <= 0) 
        {
            minuteValue = 0;
        }
        else if (minuteValue >= 59) 
        {
            minuteValue = 59;
        }

        minuteInput.value = minuteValue;
        event.preventDefault();
        formatTwoDigits(minuteInput); 
    }
}

function timeChange(input)
{
    formatTwoDigits(input);
}

function formatTwoDigits(input) 
{
    input.value = input.value.replace(/\D/g, '').padStart(2, '0');
}

function validateAddTopic() 
{
    $("#topic_name").val($("#topic_name").val().replace(/\s+/g, ' ').trim());
    const topicName = $("#topic_name").val();

    if (topicName === "") 
    {
        $("#topic_error_message").text("Please fill out Topic name.");
        $("#topic_error_container").css("display", "block");
        return false; 
    }

    const courseTopics = $(".content .title_row");
    let topicExists = false;

    courseTopics.each(function() 
    {
        if($(this).text() === topicName)
        {
            $("#topic_error_message").text("Topic name has already exists.");
            $("#topic_error_container").css("display", "block");
            topicExists = true; 
            return false; 
        }
    });

    if(topicExists)
    {
        return false;
    }

    return true;
}

function validateAddAssignment() 
{
    $("#assignment_name").val($("#assignment_name").val().replace(/\s+/g, ' ').trim());
    const assignmentName = $("#assignment_name").val();

    const openDate = $("#assignment_open_date").val();
    const openHour = $("#assignment_open_hour").val();
    const openMinute = $("#assignment_open_minute").val();

    const dueDate = $("#assignment_due_date").val();
    const dueHour = $("#assignment_due_hour").val();
    const dueMinute = $("#assignment_due_minute").val();

    
    if (assignmentName === "") 
    {
        $("#assignment_error_message").text("Please fill out Assignment name.");
        $("#assignment_error_container").css("display", "block");
        return false; 
    }

    if (openDate === "") 
    {
        $("#assignment_error_message").text("Please fill out Open date.");
        $("#assignment_error_container").css("display", "block");
        return false; 
    }

    if (dueDate === "") 
    {
        $("#assignment_error_message").text("Please fill out Due date.");
        $("#assignment_error_container").css("display", "block");
        return false; 
    }

    const openTime = new Date(openDate);
    openTime.setHours(openHour, openMinute);
    const dueTime = new Date(dueDate);
    dueTime.setHours(dueHour, dueMinute);

    if(openTime >= dueTime)
    {
        $("#assignment_error_message").text("Open time must be earlier than Due time.");
        $("#assignment_error_container").css("display", "block");
        return false;
    }

    $('input[name="assignment_open_time"]').val(openTime);
    $('input[name="assignment_due_time"]').val(dueTime);
    return true;  
}

function submission(id)
{
    window.location.href = `/teacher/submission?exercise_id=${encodeURIComponent(id)}`;
}
