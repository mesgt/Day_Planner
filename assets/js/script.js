$(document).ready(function () {
    var now = moment().format("MMMM Do, YYYY");
    var todayHeading = $("#navbar-subtitle");
    var plannerDiv = $("#plannerContainer");
    


    todayHeading.text("Today is " + now);
    plannerDiv.empty();

    if (test = true) {
        nowHour24 = 12;
        nowHour12 = 1;
    }

    var oldPlans = JSON.parse(localStorage.getItem("oldPlans"));
    if (oldPlans !== null) {
        planTextArr = oldPlans;
    }
    else {
        planTextArr = new Array(9);
    }



    for (hour = 8; hour <= 17; hour++) {
        // index for array use offset from hour
        var index = hour - 8;
        var rowDiv = $("<div>");
        rowDiv.addClass("row");
        rowDiv.addClass("plannerRow");
        rowDiv.attr("hour-index", hour);

        var timeDiv = $("<div>");
        timeDiv.addClass("col-md-2");
        var timeBoxSpn = $("<span>");
        timeBoxSpn.attr("class", "timeBox");

        // format hours for display
        var displayHour = 0;
        var ampm = "";
        if (hour >= 12) {
            displayHour = hour - 12; //12pm is not being displayed
            ampm = "PM";
        } 
        else {
            displayHour = hour;
            ampm = "AM";
        }

        // populate timeBox with time
        timeBoxSpn.text(displayHour + ampm);
        rowDiv.append(timeDiv);
        timeDiv.append(timeBoxSpn);

        var dailyPlanSpn = $("<input>");

        dailyPlanSpn.attr("id", `input-${index}`);
        dailyPlanSpn.attr("hour-index", index);
        dailyPlanSpn.attr("type", "text");
        dailyPlanSpn.attr("class", "dailyPlan");

        // access index from data array for hour 
        dailyPlanSpn.val(planTextArr[index]);

        var inptDiv = $("<div>");
        inptDiv.addClass("col-md-9");

        rowDiv.append(inptDiv);
        inptDiv.append(dailyPlanSpn);

        var saveDiv = $("<div>");
        saveDiv.addClass("col-md-1");

        var saveButton = $("<i>");
        saveButton.attr("id", `saveid-${index}`);
        saveButton.attr("save-id", index);
        saveButton.attr("class", "far fa-save saveIcon");

        rowDiv.append(saveDiv);
        saveDiv.append(saveButton);
        updateRowColor(rowDiv, hour);
        plannerDiv.append(rowDiv);
    };

    // function to update row color
    function updateRowColor(hourRow, hour) {
        var currentTime = moment().format("HH");
        if (hour < currentTime) {
            if (test) { 
            hourRow.css("background-color", "lightgrey")
            }
        } 
        else if (hour > currentTime) {
            hourRow.css("background-color", "lightgreen")
        } 
        else {
            hourRow.css("background-color", "tomato")
        }
    };

    // saves to local storage
    $(document).on("click", "i", function (event) {
        event.preventDefault();
        var index = $(this).attr("save-id");
        var inputId = "#input-" +index;
        var value = $(inputId).val();
        planTextArr[index] = value;
        localStorage.setItem("oldPlans", JSON.stringify(planTextArr));
    });

    // function to color save button on change of input
    $(document).on("change", "input", function (event) {
        event.preventDefault();
        var i = $(this).attr("hour-index");
    });
});
