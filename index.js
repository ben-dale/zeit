var progress;
var inSuccessView;
var inFailView;
var input;
var correctAnswers;
var hour;
var minute;

$(document).ready(function () {
  progress = 0;
  inFailView = false;
  inSuccessView = false;
  hour = randomNumberBetween(0, 23);
  minute = oneOf([5]);
  correctAnswers = correctAnswersFrom(hour, minute);

  $('#check').click(checkAnswer);
  $('#input').on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
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
    $('#failMessageText').text(correctAnswers.join(' / '));
    $('#input').focus();
    $('#check').removeClass('btn-success').removeClass('btn-danger').addClass('btn-info').text('Prüfen');
  }
}

function checkAnswer() {
  if ($('#input').val() !== '' || (inFailView || inSuccessView)) {
    if (inSuccessView || inFailView) {
      hour = randomNumberBetween(0, 23);
      minute = oneOf([0, 2, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 58]);
      correctAnswers = correctAnswersFrom(hour, minute);
      inSuccessView = false;
      inFailView = false;
      input = '';
    } else {
      input = $('#input').val().trim();
      if (correctAnswers.includes(input)) {
        inSuccessView = true;
        progress = progress + 10;
      } else {
        inFailView = true;
      }
    }

    updateScreen();
  }
}

function correctAnswersFrom(h, m) {
  if (m === 5) {
    var answers = [];
    var hourAsText = hourAsTexts(h);
    for (var i = 0; i < hourAsText.length; i++) {
      answers.push('fünf nach ' + hourAsText[i]);
    }
    return answers;
  }
}

function hourAsTexts(h) {
  switch (h) {
    case 0: return ['mitternacht'];
    case 1: return ['eins'];
    case 2: return ['zwei'];
    case 3: return ['drei'];
    case 4: return ['vier'];
    case 5: return ['fünf'];
    case 6: return ['sechs'];
    case 7: return ['sieben'];
    case 8: return ['acht'];
    case 9: return ['neun'];
    case 10: return ['zehn'];
    case 11: return ['elf'];
    case 12: return ['zwölf'];
    case 13: return ['eins', 'dreizehn'];
    case 14: return ['zwei', 'vierzehn'];
    case 15: return ['drei', 'fünfzehn'];
    case 16: return ['vier', 'sechszehn'];
    case 17: return ['fünf', 'siebzehn'];
    case 18: return ['sechs', 'achtzehn'];
    case 19: return ['sieben', 'neunzehn'];
    case 20: return ['acht', 'zwanzig'];
    case 21: return ['neun', 'einundzwanzig'];
    case 22: return ['zehn', 'zweiundzwanzig'];
    case 23: return ['elf', 'dreiundzwanzig'];
    case 24: return ['zwölf', 'mitternacht'];
  }
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
