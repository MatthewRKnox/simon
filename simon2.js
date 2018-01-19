// Before first Clean 225 Lines of codes
var waitYourTurn = false;
var simonSaid = [];
var nextColor = 0;
var colorLit = false;

var title = document.getElementById('title');

var restartButton = document.getElementById('restart');
restartButton.addEventListener('click', function () {
  restart();
});

function restart() {
  window.location.href = window.location.href;
}

let strict = {
  button: document.getElementById('strict'),
  casual: () => {
        strict.button.innerHTML = 'Casual';
        this.style.color = '#19A54F';
        strict.isStrict = false;
      },

  strict: () => {
        strictButton.innerHTML = 'Strict';
        this.style.color = '#e50b21';
        strict.isStrict = true;
      },
};

strict.button.onclick = function () {
  strict.isStrict ? strict.casual : strict.strict;
};

var startButton = document.getElementById('start');

startButton.addEventListener('click', function () {
  if (startButton.innerHTML == 'Start') {
    startButton.innerHTML = 'Watch Carefullly...';
    simonsPlan();
  }
});

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var greenSound = new Sound(440, 'triangle');
var redSound = new Sound(523.3, 'triangle');
var blueSound = new Sound(587.3, 'triangle');
var yellowSound = new Sound(659.3, 'triangle');

function Sound(frequency) {
  this.osc = audioCtx.createOscillator();
  this.osc.frequency.value = frequency;
  this.osc.type = 'triangle';
  this.osc.start(0);
}

Sound.prototype.play = function () {
  this.osc.connect(audioCtx.destination);
};

Sound.prototype.stop = function () {
  this.osc.disconnect();
};

function Color(theButton, theUnlit, theLit, theSound) {
  console.log('testing' + this);
  this.button = document.getElementById(theButton);
  this.unlit = theUnlit;
  this.lit = theLit;
  this.sound = theSound;
}

var green = new Color('green', '#19A54F', '#02f961', greenSound);
var red = new Color('red', '#9B1422', '#e50b21', redSound);
var yellow = new Color('yellow', '#CBA528', '#f7be02', yellowSound);
var blue = new Color('blue', '#105299', '#298FFB', blueSound);

var colors = [green, red, yellow, blue];
colorClicked(green);
colorClicked(red);
colorClicked(blue);
colorClicked(yellow);

function colorClicked(color) {
  color.button.addEventListener('click', function () {
      if (!waitYourTurn) {
        yourTurn(color);
      }
    });
}

function light(color, toneLength) {
  this.toneLength = toneLength;
  color.button.style.backgroundColor = color.lit;
  playSound(color.sound, this.toneLength);
}

function playSound(colorSound, toneLength, start, isPlaying) {
  var isPlaying = isPlaying || false;
  var start = start || 0;
  this.colorSound = colorSound;
  isPlaying ? colorSound.stop() : colorSound.play();
  isPlaying = !isPlaying;
  if (start < 1) {
    setTimeout(function () {
      playSound(this.colorSound, toneLength, start + 1, isPlaying);
    }, toneLength);
  }
}

function unlight(color) {
  color.button.style.backgroundColor = color.unlit;
}

function repeatAfterMe(simonSaid, start) {
  waitYourTurn = true;
  var start = start || 0;
  simonColor = start;
  if (!colorLit) {
    light(simonSaid[simonColor], 800);
  } else {
    unlight(simonSaid[simonColor]);
  }

  colorLit = !colorLit;
  start = colorLit ? start : start + 1;
  if (start < simonSaid.length) {
    setTimeout(function () {
        repeatAfterMe(simonSaid, start);
      }, 1000);
  } else {
    waitYourTurn = false;
  }
}

function simonsPlan() {
  startButton.onclick = '';
  var random = Math.floor(Math.random() * 4);
  simonsColor = colors[random];
  simonSaid.push(simonsColor);
  title.innerHTML = 'Steps: ' + simonSaid.length;
  repeatAfterMe(simonSaid);
}

function yourTurn(yourGuess) {
  if (yourGuess == simonSaid[nextColor]) {
    light(yourGuess, 200);
    nextColor++;
    if (nextColor == 20) {
      gameOverVictory(true);
      return;
    }

    setTimeout(function () {
      unlight(yourGuess);
    }, 200);

    if (nextColor == simonSaid.length) {
      nextColor = 0;
      setTimeout(function () {
        simonsPlan();
      }, 2000);
    }
  } else {
    if (strict.isStrict) {
      gameOverVictory(false);
    } else {
      tryAgain();
      setTimeout(function () {
          repeatAfterMe(simonSaid);
        }, 2000);

    }
  }
}

function gameOverVictory(won, start) {
  start = start || 0;
  var result = won ? 'You Win!!!' : 'FAIL!!!';
  startButton.innerHTML = result;
  if (start < 1) {
    setTimeout(function () {
      gameOverVictory(won, start + 1);
    }, 3000);
  } else {
    restart();
  }
}

function tryAgain(start) {
  start = start || 0;
  startButton.innerHTML = 'Wrong!!!';
  if (start < 1) {
    setTimeout(function () {
      youFailed(start + 1);
    }, 2000);
  } else {
    startButton.innerHTML = 'Watch Carefullly...';
  }
}
