var calendarEvents = [];

//  format  date into (Day/Month/Year)
var currentDate = moment().format("dddd, MMMM Do YYYY");

// pulls  current date and prints through index.html using #currentday
function setCurrentTime() {
  $("#currentDay").html(currentDate);
}

$(".save-btn").on("click", function () {
  var text = $(this).siblings("textarea").val().trim();
  var time = $(this).siblings("textarea").attr("id");

  var tempArray = [];
  tempArray.push({
    text: text,
    date: currentDate,
    time: time,
  });
  saveEvents(tempArray);
});

var saveEvents = function (tempArray) {
    if (calendarEvents && calendarEvents.length) {
    // store for loop result
    var forLoopResult = false;

    // checks if date is already in array, when true .splice into same date
    for (var i = 0; i < calendarEvents.length; i++) {
      if (
        calendarEvents[i].time === tempArray[0].time &&
        calendarEvents[i].date === tempArray[0].date
      ) {
        calendarEvents.splice(i, 1, tempArray[0]);
        forLoopResult = true;
        break;
      }
    }
    // if array is not empty but data isn't replacing existing .push
    if (!forLoopResult) {
      calendarEvents.push(tempArray[0]);
    }
  }
  // if the array is empty .push
  else {
    calendarEvents.push(tempArray[0]);
  }
  localStorage.setItem("events", JSON.stringify(calendarEvents)); // Save to local storage
};

var loadEvents = function () {
  calendarEvents = JSON.parse(localStorage.getItem("events")); // Load local storage

  // if nothing is stored in local storage return an empty array
  if (!calendarEvents) {
    calendarEvents = [];
  }

  for (var i = 0; i < calendarEvents.length; i++) {
    if (currentDate === calendarEvents[i].date) {
      $("#" + calendarEvents[i].time).val(calendarEvents[i].text);
    }
  }
};

var changeColors = function () {
  for (var i = 9; i <= 17; i++) {
    if (moment(i, "HH").format("HH") < moment().format("HH")) {
      $("#" + i).removeClass("bg-light");
      $("#" + i).addClass("bg-secondary"); // gray (past)
    } else if (moment(i, "HH").format("HH") > moment().format("HH")) {
      $("#" + i).removeClass("bg-light");
      $("#" + i).addClass("bg-success"); // green (future)
    } else {
      $("#" + i).removeClass("bg-light");
      $("#" + i).addClass("bg-danger"); // red (present)
    }
  }
};

setInterval(setCurrentTime, 1000 * 60 * 15); // Update every 15 min
setInterval(changeColors, 1000 * 60 * 15); // Update every 15 min

setCurrentTime();
loadEvents();
changeColors();
