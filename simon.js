// create web audio api context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var gainNode = audioCtx.createGain();

// create Oscillator node
var greenSound, redSound, yellowSound, blueSound;

  createAudio();
function createAudio(){

greenSound = audioCtx.createOscillator();

greenSound.type = 'triangle';
greenSound.frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz
greenSound.connect(audioCtx.destination);

 redSound = audioCtx.createOscillator();

redSound.type = 'triangle';
redSound.frequency.setValueAtTime(523.3, audioCtx.currentTime); // value in hertz
redSound.connect(audioCtx.destination);

 blueSound = audioCtx.createOscillator();

blueSound.type = 'triangle';
blueSound.frequency.setValueAtTime(587.3, audioCtx.currentTime); // value in hertz
blueSound.connect(audioCtx.destination);

 yellowSound = audioCtx.createOscillator();

yellowSound.type = 'triangle';
yellowSound.frequency.setValueAtTime(659.3, audioCtx.currentTime); // value in hertz
yellowSound.connect(audioCtx.destination);
}

var sequenceLength = 1;
var simonSaid = [];
var nextColor = 0;
var colorLit = false;

var green = {
  element: document.getElementById("green"),
  unlit: '#19A54F',
  lit: '#02f961',
  sound: greenSound
}

var red = {
  element: document.getElementById('red'),
  unlit: '#9B1422',
  lit: '#e50b21',
  sound: redSound

}


var yellow = {
  element: document.getElementById('yellow'),
  unlit: '#CBA528',
  lit: '#f7be02',
  sound: yellowSound

}


var blue = {
  element: document.getElementById('blue'),
  unlit: '#105299',
  lit: '#298FFB',
  sound: blueSound
}

var colors = [green, red, blue, yellow];

green.element.addEventListener('click', function(){
  yourTurn(green);
});

red.element.addEventListener('click', function(){
  yourTurn(red);
});

yellow.element.addEventListener('click', function(){
  yourTurn(yellow);
});

blue.element.addEventListener('click', function(){
  yourTurn(blue);
});

function light(color) {
  color.element.style.backgroundColor = color.lit;
  createAudio();
  color.sound.start();
  color.sound.stop(audioCtx.currentTime + 0.8);

}

function unlight(color){
  color.element.style.backgroundColor = color.unlit;
}

function repeatAfterMe(simonSaid, start) {
  var start = start || 0;
  simonColor = start;
  if (!colorLit){
    light(simonSaid[simonColor]);
    colorLit = true;
  }
  else {
    unlight(simonSaid[simonColor])
    colorLit = false;
  }

  if (start < (simonSaid.length -1)){
    setTimeout(function() {
      repeatAfterMe(simonSaid, start + 1);
    }, 1000);
  }
}

function simonsPlan(){
    var random = Math.floor(Math.random() * 4);
    simonsColor = colors[random];
    simonSaid.push(simonsColor);
    simonSaid.push(simonsColor);
    repeatAfterMe(simonSaid);
}


function yourTurn(yourGuess) {
  if (yourGuess == simonSaid[nextColor]){
  light(yourGuess);
  nextColor = nextColor + 2;
  setTimeout(function () {
    unlight(yourGuess);
  }, 400);
 }
 else {
   alert("WRONG!!!");
   simonSaid = [];
 }
 if (nextColor == simonSaid.length){
   nextColor = 0;
   simonsPlan();
 }
}
