/******************VARIABLES***************/

var pianoB = document.getElementById('teclasBlancas');
var pianoN = document.getElementById('teclasNegras');

var teclasBlancas = []; 
var teclasNegras = [];

var notes = ['c1','d1','e1','f1','g1','a1','b1','c2',
             'c1s','d1s','f1s','g1s','a1s'];
var keys = [83,68,70,71,72,74,75,76,69,82,89,85,73];
var keysK = ['S','D','F','G','H','J','K','L','E','R','Y','U','I'];
var audio = [];

/*******************FUNCIONES******************/

function play(o) {
  audio[notes.indexOf(o)].currentTime = 0;  //Para que podamos darle varias veces aunque no haya acabado el mp3
  audio[notes.indexOf(o)].play();
}

function makeDiv(text,item,clase) {
  var div = document.createElement('div');
  div.innerHTML = text;
  div.classList.add(clase);
  item.appendChild(div);
}

/********************LISTENER TECLAS ******************/

document.addEventListener('keydown', function(e) {
  //console.log(keys.indexOf(e.keyCode))
  play(notes[keys.indexOf(e.keyCode)]); 
  if(keys.indexOf(e.keyCode)<8){
    teclasBlancas[keys.indexOf(e.keyCode)].classList.add('teclaBlancaKB');
  }
  else{
    //teclasNegras[keys.indexOf(e.keyCode)].classList.add('teclaNegraKB');
  }
});

document.addEventListener('keyup', function(e) {
  //console.log(keys.indexOf(e.keyCode))
  if(keys.indexOf(e.keyCode)<8)
    teclasBlancas[keys.indexOf(e.keyCode)].classList.remove('teclaBlancaKB');
  else
    1
    //teclasNegras[keys.indexOf(e.keyCode)].classList.remove('teclaNegraKB');
});


/********************SONIDOS************************/
for(i=0;i<notes.length;i++){
  audio[i] = new Audio('https://rawcdn.githack.com/pffy/mp3-piano-sound/master/mp3/' + notes[i] + '.mp3');
}


/********TECLAS BLANCAS ****************************/

for(i=0;i<8;i++){
  teclasBlancas[i] = document.createElement('div');
  teclasBlancas[i].classList.add('teclaBlanca');
  teclasBlancas[i].id = notes[i];
  
  
  makeDiv(keysK[i],teclasBlancas[i],'keyboardK');
  makeDiv(notes[i].toUpperCase().replace('S','#').replace(/[0-9]/g,''), teclasBlancas[i], 'notes');
  
  teclasBlancas[i].onmousedown = function() {play(this.id);}    //onclick -> onmousedown para que se ejecute el sonido al pulsar y no al dejar de pulsar
  pianoB.appendChild(teclasBlancas[i]);
  
} 

/*****************TECLAS NEGRAS ***********************/

  dummy =  document.createElement('div');
  dummy.classList.add('dummy');
  

for(i=0;i<5;i++){
  teclasNegras[i] = document.createElement('div');
  teclasNegras[i].classList.add('teclaNegra');
  teclasNegras[i].id = notes[8+i];
  
  makeDiv(keysK[8+i],teclasNegras[i],'keyboardK');
  makeDiv(notes[8+i].toUpperCase().replace('S','#').replace(/[0-9]/g,''),teclasNegras[i],'notes');
  
  teclasNegras[i].onmousedown = function() { play(this.id); }
  
  if(i==2)
     pianoN.appendChild(dummy);
     
  pianoN.appendChild(teclasNegras[i]);
} 

  teclasNegras.splice(2, 0, dummy);

/************************FORMATO NOTAS**********************/