/******************VARIABLES***************/

let pianoB = document.getElementById('teclasBlancas');
let pianoN = document.getElementById('teclasNegras');

let keys = [
    {note: 'c4', white: undefined, label: 'S', keyboard: 83, dom: undefined, audio: undefined},
    {note: 'd4', white: undefined, label: 'D', keyboard: 68, dom: undefined, audio: undefined},
    {note: 'e4', white: undefined, label: 'F', keyboard: 70, dom: undefined, audio: undefined},
    {note: 'f4', white: undefined, label: 'G', keyboard: 71, dom: undefined, audio: undefined},
    {note: 'g4', white: undefined, label: 'H', keyboard: 72, dom: undefined, audio: undefined},
    {note: 'a4', white: undefined, label: 'J', keyboard: 74, dom: undefined, audio: undefined},
    {note: 'b4', white: undefined, label: 'K', keyboard: 75, dom: undefined, audio: undefined},
    {note: 'c5', white: undefined, label: 'L', keyboard: 76, dom: undefined, audio: undefined},
    {note: 'c4s', white: undefined, label: 'E', keyboard: 69, dom: undefined, audio: undefined},
    {note: 'd4s', white: undefined, label: 'R', keyboard: 82, dom: undefined, audio: undefined},
    {note: 'void'},
    {note: 'f4s', white: undefined, label: 'Y', keyboard: 89, dom: undefined, audio: undefined},
    {note: 'g4s', white: undefined, label: 'U', keyboard: 85, dom: undefined, audio: undefined},
    {note: 'a4s', white: undefined, label: 'I', keyboard: 73, dom: undefined, audio: undefined},
];

let allowedKeys = {};

/*******************FUNCTIONS******************/

function play(obj) {
  obj.audio.currentTime = 0;
  obj.audio.play();
}

function makeDiv(text, item, clase) {
  let div = document.createElement('div');
  div.innerHTML = text;
  div.classList.add(clase);
  item.appendChild(div);
}

/********************LISTENERS******************/

document.addEventListener('keydown', (e) => {
  e.preventDefault();

  if(allowedKeys[e.keyCode] === false) return;
  allowedKeys[e.keyCode] = false;

  const target = keys.find((key) => {
    return key.keyboard === e.keyCode;
  });

  play(target);

  const css = target.white ? 'teclaBlancaKB' : 'teclaNegraKB';
  target.dom.classList.add(css);
});

document.addEventListener('keyup', (e) => {
  e.preventDefault();
  allowedKeys[e.keyCode] = true;

  const target = keys.find((key) => {
    return key.keyboard === e.keyCode;
  });

  const css = target.white ? 'teclaBlancaKB' : 'teclaNegraKB';
  target.dom.classList.remove(css);
});

document.addEventListener('focus' , function(e) {
  allowedKeys = {};
})

/****************BUILDING THE PIANO*****************/

keys.forEach( (key) => {

  const match = key.note.match(/(\w\d[s])|(void)/);

  // If it's dummy key, process and return
  if(match && match[2]) {
    let dummy = document.createElement('div');
    dummy.classList.add('dummy');
    pianoN.appendChild(dummy);
    return;
  }

  // Load sound for this key
  key.audio = new Audio('./mp3/' + key.note + '.mp3');

  // Make HTML visualization
  key.dom = document.createElement('div');
  key.dom.id = key.note;

  // Make labels for key
  makeDiv(key.label, key.dom, 'keyboardK');
  makeDiv(key.note.toUpperCase().replace('S','#').replace(/[0-9]/g,''), key.dom, 'notes');

  // Event listener
  key.dom.onmousedown = () => {play(this.id)}

  // Append to correct HTML container
  if(match){
    key.white = false;
    key.dom.classList.add('teclaNegra');
    pianoN.appendChild(key.dom);

  } else { // White key
    key.white = true;
    key.dom.classList.add('teclaBlanca');
    pianoB.appendChild(key.dom);
  }

});