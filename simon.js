
var green = {
  element: document.getElementById('green'),
  unpressed: '#19A54F',
  pressed: '#02f961'
}

var red = {
  element: document.getElementById('red'),
  unpressed: '#9B1422',
  pressed: '#e50b21'
}


var yellow = {
  element: document.getElementById('yellow'),
  unpressed: '#f7be02',
  pressed: '#CBA528'
}


var blue = {
  element: document.getElementById('blue'),
  unpressed: '#298FFB'
  pressed: '#105299'
}

green.addEventListener('click', function(){
  pressed('green');
});

red.addEventListener('click', function(){
  pressed('red');
});

yellow.addEventListener('click', function(){
  pressed('yellow');
});

blue.addEventListener('click', function(){
  pressed('blue');
});

function pressed(color) {
  green.element.style.backgroundColor = green.pressed;
}
