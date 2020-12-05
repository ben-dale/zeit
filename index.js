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
  minute = oneOf([0, 2, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 58]);
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
    $('#successMessage').removeClass('d-none');
    $('#successMessageText').text('„' + correctAnswers.join('“ oder „') + '“');
  } else if (inFailView) {
    $('#failMessage').removeClass('d-none');
    $('#failMessageText').text('„' + correctAnswers.join('“ oder „') + '“');
    $('#check').removeClass('btn-info').addClass('btn-danger').text('Nächste');
  } else {
    $('#failMessage').addClass('d-none');
    $('#failMessageText').text('');
    $('#successMessage').addClass('d-none');
    $('#successMessageText').text('');
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
      var correctAnswerFound = false;
      for (var i = 0; i < correctAnswers.length; i++) {
        if (input.toLowerCase() === correctAnswers[i].toLowerCase()) {
          correctAnswerFound = true;
          break;
        }
      }
      if (correctAnswerFound) {
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
  if (m === 0) {
    var answers = [];
    if (h === 1) {
      answers.push('ein Uhr');
    } else if (h === 13) {
      answers.push('ein Uhr');
      answers.push('dreizehn Uhr');
    } else {
      var hourAsText = hourAsTexts(h, m);
      for (var i = 0; i < hourAsText.length; i++) {
        answers.push(hourAsText[i] + ' Uhr');
      }
    }
    return answers;
  }

  if (m === 2) {
    var answers = [];
    var hourAsText = hourAsTexts(h);
    for (var i = 0; i < hourAsText.length; i++) {
      answers.push('Kurz nach ' + hourAsText[i]);
    }
    return answers;
  }

  if (m === 5) {
    var answers = [];
    var hourAsText = hourAsTexts(h);
    for (var i = 0; i < hourAsText.length; i++) {
      answers.push('fünf nach ' + hourAsText[i]);
    }
    return answers;
  }

  if (m === 10) {
    var answers = [];
    var hourAsText = hourAsTexts(h);
    for (var i = 0; i < hourAsText.length; i++) {
      answers.push('zehn nach ' + hourAsText[i]);
    }
    return answers;
  }

  if (m === 15) {
    var answers = [];
    var hourAsText = hourAsTexts(h);
    for (var i = 0; i < hourAsText.length; i++) {
      answers.push('Viertel nach ' + hourAsText[i]);
    }
    return answers;
  }

  if (m === 20) {
    var answers = [];
    var hourAsText = hourAsTexts(h);
    for (var i = 0; i < hourAsText.length; i++) {
      answers.push('zwanzig nach ' + hourAsText[i]);
    }
    return answers;
  }

  if (m === 25) {
    var answers = [];
    var hourAsText = hourAsTexts(h + 1);
    for (var i = 0; i < hourAsText.length; i++) {
      answers.push('fünf vor halb ' + hourAsText[i]);
    }
    return answers;
  }

  if (m === 30) {
    var answers = [];
    var hourAsText = hourAsTexts(h + 1);
    for (var i = 0; i < hourAsText.length; i++) {
      answers.push('halb ' + hourAsText[i]);
    }
    return answers;
  }

  if (m === 35) {
    var answers = [];
    var hourAsText = hourAsTexts(h + 1);
    for (var i = 0; i < hourAsText.length; i++) {
      answers.push('fünf nach halb ' + hourAsText[i]);
    }
    return answers;
  }

  if (m === 40) {
    var answers = [];
    var hourAsText = hourAsTexts(h + 1);
    for (var i = 0; i < hourAsText.length; i++) {
      answers.push('zwanzig vor ' + hourAsText[i]);
    }
    return answers;
  }

  if (m === 45) {
    var answers = [];
    var hourAsText = hourAsTexts(h + 1);
    for (var i = 0; i < hourAsText.length; i++) {
      answers.push('Viertel vor ' + hourAsText[i]);
    }
    return answers;
  }

  if (m === 50) {
    var answers = [];
    var hourAsText = hourAsTexts(h + 1);
    for (var i = 0; i < hourAsText.length; i++) {
      answers.push('zehn vor ' + hourAsText[i]);
    }
    return answers;
  }

  if (m === 55) {
    var answers = [];
    var hourAsText = hourAsTexts(h + 1);
    for (var i = 0; i < hourAsText.length; i++) {
      answers.push('fünf vor ' + hourAsText[i]);
    }
    return answers;
  }

  if (m === 58) {
    var answers = [];
    var hourAsText = hourAsTexts(h + 1);
    for (var i = 0; i < hourAsText.length; i++) {
      answers.push('Kurz vor ' + hourAsText[i]);
      answers.push('Gleich vor ' + hourAsText[i]);
    }
    return answers;
  }

  return [];
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
    case 25: return ['eins'];
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
