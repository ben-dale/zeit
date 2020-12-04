var progress;
var inSuccessView;
var inFailView;
var input;
var correctAnswer;
var hour;
var minute;

$(document).ready(function () {
  progress = 0;
  inFailView = false;
  inSuccessView = false;
  hour = randomNumberBetween(0, 23);
  minute = oneOf([0, 2, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 58]);
  correctAnswer = correctAnswerFrom(hour, minute);

  $('#check').click(checkAnswer);
  $('#input').on('keyup', function (e) {
    if (($('#input').val() !== '' || (inFailView || inSuccessView)) && (e.key === 'Enter' || e.keyCode === 13)) {
      checkAnswer();
    }
  });

  $('#input').focus();

  updateScreen();
});

function updateScreen() {
  $('#time').text(timeString(hour, minute));
  $('#progress').prop('aria-valuenow', progress).prop('style', 'width: ' + progress + '%');
  $('#input').val(input);

  if (inSuccessView) {
    $('#check').removeClass('btn-info').addClass('btn-success').text('Nächste');
  } else if (inFailView) {
    $('#failMessage').removeClass('d-none');
    $('#check').removeClass('btn-info').addClass('btn-danger').text('Nächste');
  } else {
    $('#failMessage').addClass('d-none');
    $('#input').focus();
    $('#check').removeClass('btn-success').removeClass('btn-danger').addClass('btn-info').text('Prüfen');
  }
}


function checkAnswer() {
  if (inSuccessView || inFailView) {
    hour = randomNumberBetween(0, 23);
    minute = oneOf([0, 2, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 58]);
    correctAnswer = correctAnswerFrom(hour, minute);
    inSuccessView = false;
    inFailView = false;
    input = '';
  } else {
    input = $('#input').val().trim();
    if (correctAnswer === input) {
      inSuccessView = true;
      progress = progress + 10;
    } else {
      inFailView = true;
    }
  }

  updateScreen();
}

function correctAnswerFrom(h, m) {
  return "test";
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
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