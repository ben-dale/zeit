var progress;

$(document).ready(function () {
  progress = 0;
  $('#check').click(checkAnswer);
});


function checkAnswer() {
  
  var answer = $('#answer').val().trim();
  $('#answer').val('');

  
  // TODO what happens when get to 100
  progress = progress + 10;
  setProgressBarTo(progress);

  var newQuestion = randomTimeString();
  $('#time').text(newQuestion);
}

function setProgressBarTo(percentage) {
  $('#progress').attr('aria-valuenow', percentage).attr('style', 'width: ' + percentage + '%')
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


function randomTimeString() {
  var hour = randomNumberBetween(0, 23);
  var minute = oneOf([0, 2, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 58]);
  return timeString(hour, minute);
}

function timeString(hour, minute) {
  var hourString = hour;
  if (hour < 10) {
    hourString = '0' + hour;
  }

  var minuteString = minute;
  if (minute < 10) {
    minuteString = '0' + minute;
  }

  return hourString + ':' + minuteString;
}

function oneOf(array) {
  return array[Math.floor(Math.random() * array.length)];
}