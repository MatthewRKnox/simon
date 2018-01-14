// Before first Clean 225 Lines of codes
var soundPlaying = false;
var gameInProgress = false;
var waitYourTurn = true;
var sequenceLength = 1;
var simonSaid = [];
var nextColor = 0;
var colorLit = false;
var strict = false;
var strictButton = document.getElementById("strict");
strictButton.onclick = function() {
  if (strict) {
    strict = false;
    strictButton.innerHTML = "Casual";
    this.style.color = "#19A54F";
  } else if (!strict) {
    strict = true;
    strictButton.innerHTML = "Strict";
    this.style.color = "#e50b21";
  }
};
var startButton = document.getElementById("start");
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var greenSound = new Sound(440, "triangle");
var redSound = new Sound(523.3, "triangle");
var blueSound = new Sound(587.3, "triangle");
var yellowSound = new Sound(659.3, "triangle");

startButton.addEventListener("click", function() {
  if (!gameInProgress) {
    startButton.innerHTML = "Watch Carefullly...";
    simonsPlan();
  }
  gameInProgress = true;
});
var title = document.getElementById("title");

var restartButton = document.getElementById("restart");
restartButton.addEventListener("click", function() {
  restart();
});

function restart() {
  window.location.href = window.location.href;
}

function Sound(frequency) {
  this.osc = audioCtx.createOscillator(); // Create oscillator node
  this.osc.frequency.value = frequency;
  this.osc.type = "triangle";
  this.osc.start(0);
}

Sound.prototype.play = function() {
  this.osc.connect(audioCtx.destination);
};

Sound.prototype.stop = function() {
  this.osc.disconnect();
};

var green = {
  element: document.getElementById("green"),
  unlit: "#19A54F",
  lit: "#02f961",
  sound: greenSound
};
var red = {
  element: document.getElementById("red"),
  unlit: "#9B1422",
  lit: "#e50b21",
  sound: redSound
};
var yellow = {
  element: document.getElementById("yellow"),
  unlit: "#CBA528",
  lit: "#f7be02",
  sound: yellowSound
};
var blue = {
  element: document.getElementById("blue"),
  unlit: "#105299",
  lit: "#298FFB",
  sound: blueSound
};
var colors = [green, red, blue, yellow];

green.element.addEventListener("click", function() {
  if (!waitYourTurn) {
    yourTurn(green);
  }
});
red.element.addEventListener("click", function() {
  if (!waitYourTurn) {
    yourTurn(red);
  }
});
yellow.element.addEventListener("click", function() {
  if (!waitYourTurn) {
    yourTurn(yellow);
  }
});
blue.element.addEventListener("click", function() {
  if (!waitYourTurn) {
    yourTurn(blue);
  }
});

function light(color, toneLength) {
  this.toneLength = toneLength;
  color.element.style.backgroundColor = color.lit;
  playSound(color.sound, this.toneLength);
}
function playSound(colorSound, toneLength, start) {
  this.colorSound = colorSound;
  var start = start || 0;
  soundPlaying ? colorSound.stop() : colorSound.play();
  soundPlaying ? (soundPlaying = false) : (soundPlaying = true);
  if (start < 1) {
    setTimeout(function() {
      playSound(this.colorSound, toneLength, start + 1);
    }, toneLength);
  }
}
function unlight(color) {
  color.element.style.backgroundColor = color.unlit;
}
function repeatAfterMe(simonSaid, start) {
    waitYourTurn = true;
    var start = start || 0;
    simonColor = start;
    if (!colorLit) {
      light(simonSaid[simonColor], 800);
      colorLit = true;
    } else {
      unlight(simonSaid[simonColor]);
      colorLit = false;
    }
    if (start < simonSaid.length - 1) {
      setTimeout(function() {
        repeatAfterMe(simonSaid, start + 1);
      }, 1000);
    } else {
      waitYourTurn = false;
    }
}

function simonsPlan() {
  startButton.onclick = "";
  var random = Math.floor(Math.random() * 4);
  simonsColor = colors[random];
  simonSaid.push(simonsColor);
  simonSaid.push(simonsColor);
  title.innerHTML = "Steps: " + simonSaid.length / 2;
  repeatAfterMe(simonSaid);
}

function yourTurn(yourGuess) {
  if (yourGuess == simonSaid[nextColor]) {
    light(yourGuess, 200);
    nextColor = nextColor + 2;
    if (nextColor == 40) {
      youWin();
      return;
    }
    setTimeout(function() {
      unlight(yourGuess);
    }, 200);

    if (nextColor == simonSaid.length) {
      nextColor = 0;
      setTimeout(function() {
        simonsPlan();
      }, 2000);
    }
  } else {
      if (strict) {
        totalFailure();
      }
      else {
        youFailed();
        repeatAfterMe(simonSaid);
      }
  }
}

function youFailed(start) {
  start = start || 0;
  startButton.innerHTML = "Wrong!!!";
  if (start < 1) {
    setTimeout(function() {
      youFailed(start + 1);
    }, 1000);
  } else {
    startButton.innerHTML = "Watch Carefullly...";
  }
}

function totalFailure(start) {
  start = start || 0;
  startButton.innerHTML = "FAIL!!!!";
  if (start < 1) {
    setTimeout(function() {
      totalFailure(start + 1);
    }, 1000);
  } else {
    restart();
  }
}

function youWin(start) {
  start = start || 0;
  startButton.innerHTML = "You Win!!!!";
  if (start < 1) {
    setTimeout(function() {
      youWin(start + 1);
    }, 3000);
  } else {
    restart();
  }
}
