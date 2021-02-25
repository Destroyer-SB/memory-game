//Global Variables
var pattern = [1, 4, 3, 2, 5, 4, 6, 7, 8];
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.7; //must be between 0.0 and 1.0
var guessCounter = 0;

var clueHoldTime = 1000; //how long to hold each clue's light/sound
var cluePauseTime = 333; //how long to pause in between clues
var nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence

function startGame() {
  //initialize game variables
  progress = 0;
  gamePlaying = true;
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  playClueSequence();
}

function stopGame() {
  gamePlaying = false;
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  clueHoldTime = 1000;
  cluePauseTime = 333;
  nextClueWaitTime = 1000;
}

function casual() {
  clueHoldTime = 1000;
  cluePauseTime = 333;
  nextClueWaitTime = 1000;
  pattern = [1, 4, 3, 2, 5, 4, 6, 7, 8];
}

function intermediate() {
  clueHoldTime = 500;
  cluePauseTime = 222;
  nextClueWaitTime = 500;
  pattern = [2, 2, 4, 1, 8, 7, 1, 8, 7];
}

function expert() {
  clueHoldTime = 250;
  cluePauseTime = 222;
  nextClueWaitTime = 500;
  pattern = [2, 2, 4, 5, 8, 7, 1, 1, 7, 2, 8, 1, 6, 6, 2, 1];
}

function goodMorning() {
  clueHoldTime = 300;
  cluePauseTime = 222;
  nextClueWaitTime = 500;
  pattern = [5, 3, 2, 1, 2, 3, 5, 3, 2, 1, 2, 3, 2, 3, 5, 3, 5, 6, 3, 6]
}

// Sound Synthesis Functions
const freqMap = {
  1: 349.23,
  2: 392,
  3: 440,
  4: 466.16,
  5: 523.25,
  6: 587.33,
  7: 659.25,
  8: 698.46
};

function playTone(btn, len) {  o.frequency.value = freqMap[btn];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  tonePlaying = true;
  setTimeout(function() {
    stopTone();
  }, len);
}
function startTone(btn) {
  if (!tonePlaying) {
    o.frequency.value = freqMap[btn];
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    tonePlaying = true;
  }
}
function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
}

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext();
var o = context.createOscillator();
var g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0, context.currentTime);
o.connect(g);


function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
}

function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
}

function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}

function playClueSequence() {
  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for (let i = 0; i <= progress; i++) {
    // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    setTimeout(playSingleClue, delay, pattern[i]); // set a timeout to play that clue
    delay += clueHoldTime;
    delay += cluePauseTime;
  }
}

function loseGame() {
  stopGame();
  alert("Game Over. You lost.");
}
function winGame() {
  stopGame();
  alert("Game Over. You won!");
}

function guess(btn) {
  console.log("user guessed: " + btn);
  if (!gamePlaying) {
    return;
  }
  if (btn == pattern[guessCounter]) {

  if (guessCounter == progress) {
      if (progress == pattern.length - 1) {
        winGame();
      } else {
        progress = progress + 1;
        playClueSequence();
      }
    } else {
      guessCounter = guessCounter + 1;
    }
  } else {
    loseGame();
  }
}

