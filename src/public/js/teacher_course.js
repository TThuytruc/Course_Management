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
    

    let selectedElement = $("#assignment_topic");
    let currentTopics = $(".content .title_row");
    currentTopics.each(function() 
    {
        let option = $("<option></option>");
        option.text($(this).text());
        selectedElement.append(option);
    });
    
    selectedElement = $("#assignment_open_hour");
    for (var i = 0; i <= 23; i++) 
    {
        let option = $("<option></option>");
        option.text(String(i).padStart(2, '0'));
        selectedElement.append(option);
    }

    selectedElement = $("#assignment_open_minute");
    for (var i = 0; i <= 59; i++) 
    {
        let option = $("<option></option>");
        option.text(String(i).padStart(2, '0'));
        selectedElement.append(option);
    }

    selectedElement = $("#assignment_due_hour");
    for (var i = 0; i <= 23; i++) 
    {
        let option = $("<option></option>");
        option.text(String(i).padStart(2, '0'));
        selectedElement.append(option);
    }

    selectedElement = $("#assignment_due_minute");
    for (var i = 0; i <= 59; i++) 
    {
        let option = $("<option></option>");
        option.text(String(i).padStart(2, '0'));
        selectedElement.append(option);
    }
});
