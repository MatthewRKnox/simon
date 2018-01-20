// Before first Clean 225 Lines of codes
var waitYourTurn = false;
var simonSaid = [];
var nextColor = 0;
var colorLit = false;
let simonsAnswer;

var title = document.getElementById('title');

let gameStatus = {
  button: document.getElementById('start'),
  startRestart: () => {
    if (gameStatus.gameStarted) {
      window.location.href = window.location.href;
      gameStatus.gameStarted = false;
    } else {
      gameStatus.simonsTurn();
      gameStatus.button.innerHTML = 'Restart';
      gameStatus.gameStarted = true;
      simonsPlan();
    }
  },

  simonsFinished: (input) => {
    if (input == undefined) {
      return simonsAnswer;
    }

    simonsAnswer = input;
    return simonsAnswer;
  },

  simonsTurn: () => messageBox.button.innerHTML = 'Watch Carefully',
  playersTurn: () =>messageBox.button.innerHTML = 'Your turn',
  wrongButton: () => messageBox.button.innerHTML = 'Wrong!!!',
  playerWon: () => messageBox.button.innerHTML = 'YOU WIN!!!!',
  playerLost: () =>messageBox.button.innerHTML = 'FAIL!!!',
};

gameStatus.button.onclick = () => {
    gameStatus.startRestart();
  };

let difficulty = {
  button: document.getElementById('strict'),
  casual: () => {
        difficulty.button.innerHTML = 'Casual';
        difficulty.button.style.color = '#19A54F';
        difficulty.isStrict = false;
      },

  strict: function () {
        difficulty.button.innerHTML = 'Strict';
        difficulty.button.style.color = '#e50b21';
        difficulty.isStrict = true;
      },
};

difficulty.button.onclick = function () {
  difficulty.isStrict ? difficulty.casual() : difficulty.strict();
};

let messageBox = {
  button: document.getElementById('messageBox'),
};

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

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var greenSound = new Sound(440, 'triangle');
var redSound = new Sound(523.3, 'triangle');
var blueSound = new Sound(587.3, 'triangle');
var yellowSound = new Sound(659.3, 'triangle');

function Color(theButton, theUnlit, theLit, theSound) {
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
      if (gameStatus.simonsFinished()) {
        yourTurn(color);
      }
    });
}

function light(color, toneLength) {
  this.toneLength = toneLength;
  color.button.style.backgroundColor = color.lit;
  playSound(color.sound, this.toneLength);
}

function unlight(color) {
  color.button.style.backgroundColor = color.unlit;
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

function repeatAfterMe(simonSaid, start) {
  gameStatus.simonsFinished(false);
  gameStatus.simonsTurn();
  var start = start || 0;
  simonColor = start;
  if (!colorLit) {
    light(simonSaid[simonColor], 700);
  } else {
    unlight(simonSaid[simonColor]);
  }

  colorLit = !colorLit;
  start = colorLit ? start : start + 1;
  if (start < simonSaid.length) {
    setTimeout(function () {
        repeatAfterMe(simonSaid, start);
      }, 700);
  } else {
    gameStatus.playersTurn();
    gameStatus.simonsFinished(true);
  }
}

function simonsPlan() {
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
    if (nextColor == 5) {
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
    if (difficulty.isStrict) {
      gameOverVictory(false);
    } else {
      nextColor = 0;
      tryAgain();
      setTimeout(function () {
          repeatAfterMe(simonSaid);
        }, 2000);

    }
  }
}

function gameOverVictory(won, start) {
  start = start || 0;
  var result = won ? gameStatus.playerWon() : gameStatus.playerLost();
  if (start < 1) {
    setTimeout(function () {
      gameOverVictory(won, start + 1);
    }, 3000);
  } else {
    gameStatus.startRestart();
  }
}

function tryAgain(start) {
  start = start || 0;
  gameStatus.wrongButton();
  if (start < 1) {
    setTimeout(function () {
      tryAgain(start + 1);
    }, 2000);
  } else {
    gameStatus.simonsTurn();
  }
}
