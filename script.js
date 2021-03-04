//Global Variables
var pattern = new Array();
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.7; //must be between 0.0 and 1.0
var guessCounter = 0;
var clueHoldTime = 1000; //how long to hold each clue's light/sound
var cluePauseTime = 333; //how long to pause in between clues
var nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence

//Functions in charge of running and stopping the game
function startGame() {
  progress = 0;
  gamePlaying = true;
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  document.getElementById("customStartBtn").classList.add("hidden");
  hideCustom()
  playClueSequence();
}
function stopGame() {
  gamePlaying = false;
  document.getElementById("stopBtn").classList.add("hidden");
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("customStartBtn").classList.add("hidden");
  document.getElementById("customStartBtn").classList.add("hidden");
  document.getElementById("inputSequence").classList.add("hidden");
  clueHoldTime = 1000;
  cluePauseTime = 333;
  nextClueWaitTime = 1000;
  pattern = new Array();
}

//Custom Button Functions
function showCustom() {
  document.getElementById("inputSequence").classList.remove("hidden");
  document.getElementById("customBtnOff").classList.add("hidden");
  document.getElementById("customBtnOn").classList.remove("hidden");
  document.getElementById("customStartBtn").classList.remove("hidden");
  document.getElementById("customStartBtn").classList.remove("hidden");
  document.getElementById("startBtn").classList.add("hidden");
}
function hideCustom() {
  document.getElementById("inputSequence").classList.add("hidden");
  document.getElementById("customBtnOff").classList.remove("hidden");
  document.getElementById("customBtnOn").classList.add("hidden");
  document.getElementById("customStartBtn").classList.add("hidden");
}
function startCustom() {
  progress = 0;
  gamePlaying = true;
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  document.getElementById("customStartBtn").classList.add("hidden");
  document.getElementById("customStartBtn").classList.add("hidden");
  document.getElementById("inputSequence").classList.add("hidden");
  playClueSequence();
}

//Setting Up Difficulty Functions
function casual() {
  if (gamePlaying == true) {
    stopGame();
  } else {
  clueHoldTime = 750;
  cluePauseTime = 333;
  nextClueWaitTime = 1000;
  pattern = [1, 4, 3, 2, 5];
  document.getElementById("startBtn").classList.remove("hidden");
    hideCustom()
  }
}
function intermediate() {
  if (gamePlaying == true) {
    stopGame();
  } else {
  clueHoldTime = 500;
  cluePauseTime = 222;
  nextClueWaitTime = 500;
  pattern = [2, 2, 4, 1, 8, 7, 1, 8, 7];
    document.getElementById("startBtn").classList.remove("hidden");
    hideCustom()
  }
}
function expert() {
  if (gamePlaying == true) {
    stopGame();
  } else {
  clueHoldTime = 250;
  cluePauseTime = 222;
  nextClueWaitTime = 500;
  pattern = [2, 2, 4, 5, 8, 7, 1, 1, 7, 2, 8, 1, 6, 6, 2, 1];
    document.getElementById("startBtn").classList.remove("hidden");
    hideCustom()
  }
}
function goodMorning() {
  if (gamePlaying == true) {
    stopGame();
  } else {
  clueHoldTime = 300;
  cluePauseTime = 222;
  nextClueWaitTime = 500;
  pattern = [5, 3, 2, 1, 2, 3, 5, 3, 2, 1, 2, 3, 2, 3, 5, 3, 5, 6, 3, 6];
    document.getElementById("startBtn").classList.remove("hidden");
    hideCustom()
  }
}
function custom() {
  if (gamePlaying == true) {
    stopGame();
  } else {
  clueHoldTime = 250;
  cluePauseTime = 222;
  nextClueWaitTime = 500;
  var numbers = document.getElementById("inputSequence").value;
  var numbersArray = Array.from(numbers.split(','),Number);
  for(var a =0;a<numbersArray.length;a++){
    pattern[a]=numbersArray[a];
    }
  }
}

// Sound Synthesis Functions
var freqMap = {
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

// Initializing Sound Synthesizer Functions
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

//Clue Sequence Functionality
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
  pattern = new Array();
  alert("Game Over. You lost.");
}
function winGame() {
  stopGame();
  pattern = new Array();
  alert("Game Over. You won!");
}

//Game Logic Function
function guess(btn) {
  console.log("user guessed: " + btn);
  if (!gamePlaying) {
    return;
  }
  if (pattern[guessCounter] == btn) {

  if (guessCounter == progress) {
      if (progress == pattern.length - 1) {
        winGame();
        pattern = new Array();
      } else {
        progress++;
        playClueSequence();
      }
    } else {
      guessCounter++;
    }
  } else {
    loseGame();
  }
}

//Reassigning Pitch Value Functions
function keyE() {
  freqMap = {
  1: 329.63,
  2: 369.99,
  3: 415.3,
  4: 440,
  5: 493.88,
  6: 554.37,
  7: 622.25,
  8: 659.25
};
}
function keyF() {
  freqMap = {
  1: 349.23,
  2: 392,
  3: 440,
  4: 466.16,
  5: 523.25,
  6: 587.33,
  7: 659.25,
  8: 698.46
};
}
function keyC() {
  freqMap = {
  1: 261.63,
  2: 293.66,
  3: 329.63,
  4: 349.23,
  5: 392.00,
  6: 440.00,
  7: 493.88,
  8: 523.25	
};
}
function keyD() {
  freqMap = {
  1: 293.66,
  2: 329.63,
  3: 369.99,
  4: 392.00,
  5: 440.00,
  6: 493.88,
  7: 554.37,
  8: 587.33	
};
}
function keyG() {
  freqMap = {
  1: 392.00,
  2: 440.00,
  3: 493.88,
  4: 523.25,
  5: 587.33,
  6: 659.25,
  7: 739.99,
  8: 783.99	
};
}
function keyA() {
  freqMap = {
  1: 440.00,
  2: 493.88,
  3: 554.37,
  4: 587.33,
  5: 659.25,
  6: 739.99,
  7: 830.61,
  8: 880.00	
};
}
function keyB() {
  freqMap = {
  1: 493.88,
  2: 554.37,
  3: 622.25,
  4: 659.25,
  5: 739.99,
  6: 830.61,
  7: 932.33,
  8: 987.77	
};
}
function keyDFlat() {
  freqMap = {
  1: 277.18,
  2: 311.13,
  3: 349.23,
  4: 369.99,
  5: 415.30,
  6: 466.16,
  7: 523.25,
  8: 554.37	
};
}
function keyEFlat() {
  freqMap = {
  1: 311.13,
  2: 349.23,
  3: 392.00,
  4: 415.30,
  5: 466.16,
  6: 523.25,
  7: 587.33,
  8: 622.25	
};
}
function keyGFlat() {
  freqMap = {
  1: 369.99,
  2: 415.30,
  3: 466.16,
  4: 493.88,
  5: 554.37,
  6: 622.25,
  7: 698.46,
  8: 739.99	
};
}
function keyAFlat() {
  freqMap = {
  1: 415.30,
  2: 466.16,
  3: 523.25,
  4: 554.37,
  5: 622.25,
  6: 698.46,
  7: 783.99,
  8: 830.61	
};
}
function keyBFlat() {
  freqMap = {
  1: 466.16,
  2: 523.25,
  3: 587.33,
  4: 622.25,
  5: 698.46,
  6: 783.99,
  7: 880.00,
  8: 932.33	
};
}

//Slider Functions
function sliderValue(slideAmount) {
  var sliderValue = document.getElementById("value");
sliderValue.innerHTML = slideAmount;
  
  if (slideAmount == 1) {
  keyC();
  document.getElementById("keyC").classList.remove("hidden");
  document.getElementById("keyDFlat").classList.add("hidden");
  document.getElementById("keyD").classList.add("hidden");
  document.getElementById("keyEFlat").classList.add("hidden");
  document.getElementById("keyE").classList.add("hidden");
  document.getElementById("keyF").classList.add("hidden");
  document.getElementById("keyGFlat").classList.add("hidden");
  document.getElementById("keyG").classList.add("hidden");
  document.getElementById("keyAFlat").classList.add("hidden");
  document.getElementById("keyA").classList.add("hidden");
  document.getElementById("keyBFlat").classList.add("hidden");
  document.getElementById("keyB").classList.add("hidden");
    
} else if (slideAmount == 2) {
  keyDFlat();
  document.getElementById("keyC").classList.add("hidden");
  document.getElementById("keyDFlat").classList.remove("hidden");
  document.getElementById("keyD").classList.add("hidden");
  document.getElementById("keyEFlat").classList.add("hidden");
  document.getElementById("keyE").classList.add("hidden");
  document.getElementById("keyF").classList.add("hidden");
  document.getElementById("keyGFlat").classList.add("hidden");
  document.getElementById("keyG").classList.add("hidden");
  document.getElementById("keyAFlat").classList.add("hidden");
  document.getElementById("keyA").classList.add("hidden");
  document.getElementById("keyBFlat").classList.add("hidden");
  document.getElementById("keyB").classList.add("hidden");
} else if (slideAmount == 3) {
  keyD();
  document.getElementById("keyC").classList.add("hidden");
  document.getElementById("keyDFlat").classList.add("hidden");
  document.getElementById("keyD").classList.remove("hidden");
  document.getElementById("keyEFlat").classList.add("hidden");
  document.getElementById("keyE").classList.add("hidden");
  document.getElementById("keyF").classList.add("hidden");
  document.getElementById("keyGFlat").classList.add("hidden");
  document.getElementById("keyG").classList.add("hidden");
  document.getElementById("keyAFlat").classList.add("hidden");
  document.getElementById("keyA").classList.add("hidden");
  document.getElementById("keyBFlat").classList.add("hidden");
  document.getElementById("keyB").classList.add("hidden");
} else if (slideAmount == 4) {
  keyEFlat();
  document.getElementById("keyC").classList.add("hidden");
  document.getElementById("keyDFlat").classList.add("hidden");
  document.getElementById("keyD").classList.add("hidden");
  document.getElementById("keyEFlat").classList.remove("hidden");
  document.getElementById("keyE").classList.add("hidden");
  document.getElementById("keyF").classList.add("hidden");
  document.getElementById("keyGFlat").classList.add("hidden");
  document.getElementById("keyG").classList.add("hidden");
  document.getElementById("keyAFlat").classList.add("hidden");
  document.getElementById("keyA").classList.add("hidden");
  document.getElementById("keyBFlat").classList.add("hidden");
  document.getElementById("keyB").classList.add("hidden");
}
  else if (slideAmount == 5) {
  keyE();
  document.getElementById("keyC").classList.add("hidden");
  document.getElementById("keyDFlat").classList.add("hidden");
  document.getElementById("keyD").classList.add("hidden");
  document.getElementById("keyEFlat").classList.add("hidden");
  document.getElementById("keyE").classList.remove("hidden");
  document.getElementById("keyF").classList.add("hidden");
  document.getElementById("keyGFlat").classList.add("hidden");
  document.getElementById("keyG").classList.add("hidden");
  document.getElementById("keyAFlat").classList.add("hidden");
  document.getElementById("keyA").classList.add("hidden");
  document.getElementById("keyBFlat").classList.add("hidden");
  document.getElementById("keyB").classList.add("hidden");
} else if (slideAmount == 6) {
  keyF();
  document.getElementById("keyC").classList.add("hidden");
  document.getElementById("keyDFlat").classList.add("hidden");
  document.getElementById("keyD").classList.add("hidden");
  document.getElementById("keyEFlat").classList.add("hidden");
  document.getElementById("keyE").classList.add("hidden");
  document.getElementById("keyF").classList.remove("hidden");
  document.getElementById("keyGFlat").classList.add("hidden");
  document.getElementById("keyG").classList.add("hidden");
  document.getElementById("keyAFlat").classList.add("hidden");
  document.getElementById("keyA").classList.add("hidden");
  document.getElementById("keyBFlat").classList.add("hidden");
  document.getElementById("keyB").classList.add("hidden");
}else if (slideAmount == 7) {
  keyGFlat();
  document.getElementById("keyC").classList.add("hidden");
  document.getElementById("keyDFlat").classList.add("hidden");
  document.getElementById("keyD").classList.add("hidden");
  document.getElementById("keyEFlat").classList.add("hidden");
  document.getElementById("keyE").classList.add("hidden");
  document.getElementById("keyF").classList.add("hidden");
  document.getElementById("keyGFlat").classList.remove("hidden");
  document.getElementById("keyG").classList.add("hidden");
  document.getElementById("keyAFlat").classList.add("hidden");
  document.getElementById("keyA").classList.add("hidden");
  document.getElementById("keyBFlat").classList.add("hidden");
  document.getElementById("keyB").classList.add("hidden");
}else if (slideAmount == 8) {
  keyG();
  document.getElementById("keyC").classList.add("hidden");
  document.getElementById("keyDFlat").classList.add("hidden");
  document.getElementById("keyD").classList.add("hidden");
  document.getElementById("keyEFlat").classList.add("hidden");
  document.getElementById("keyE").classList.add("hidden");
  document.getElementById("keyF").classList.add("hidden");
  document.getElementById("keyGFlat").classList.add("hidden");
  document.getElementById("keyG").classList.remove("hidden");
  document.getElementById("keyAFlat").classList.add("hidden");
  document.getElementById("keyA").classList.add("hidden");
  document.getElementById("keyBFlat").classList.add("hidden");
  document.getElementById("keyB").classList.add("hidden");
} else if (slideAmount == 9) {
  keyAFlat();
  document.getElementById("keyC").classList.add("hidden");
  document.getElementById("keyDFlat").classList.add("hidden");
  document.getElementById("keyD").classList.add("hidden");
  document.getElementById("keyEFlat").classList.add("hidden");
  document.getElementById("keyE").classList.add("hidden");
  document.getElementById("keyF").classList.add("hidden");
  document.getElementById("keyGFlat").classList.add("hidden");
  document.getElementById("keyG").classList.add("hidden");
  document.getElementById("keyAFlat").classList.remove("hidden");
  document.getElementById("keyA").classList.add("hidden");
  document.getElementById("keyBFlat").classList.add("hidden");
  document.getElementById("keyB").classList.add("hidden");
} else if (slideAmount == 10) {
  keyA();
  document.getElementById("keyC").classList.add("hidden");
  document.getElementById("keyDFlat").classList.add("hidden");
  document.getElementById("keyD").classList.add("hidden");
  document.getElementById("keyEFlat").classList.add("hidden");
  document.getElementById("keyE").classList.add("hidden");
  document.getElementById("keyF").classList.add("hidden");
  document.getElementById("keyGFlat").classList.add("hidden");
  document.getElementById("keyG").classList.add("hidden");
  document.getElementById("keyAFlat").classList.add("hidden");
  document.getElementById("keyA").classList.remove("hidden");
  document.getElementById("keyBFlat").classList.add("hidden");
  document.getElementById("keyB").classList.add("hidden");
} else if (slideAmount == 11) {
  keyBFlat();
  document.getElementById("keyC").classList.add("hidden");
  document.getElementById("keyDFlat").classList.add("hidden");
  document.getElementById("keyD").classList.add("hidden");
  document.getElementById("keyEFlat").classList.add("hidden");
  document.getElementById("keyE").classList.add("hidden");
  document.getElementById("keyF").classList.add("hidden");
  document.getElementById("keyGFlat").classList.add("hidden");
  document.getElementById("keyG").classList.add("hidden");
  document.getElementById("keyAFlat").classList.add("hidden");
  document.getElementById("keyA").classList.add("hidden");
  document.getElementById("keyBFlat").classList.remove("hidden");
  document.getElementById("keyB").classList.add("hidden");
} else if (slideAmount == 12) {
  keyB();
  document.getElementById("keyC").classList.add("hidden");
  document.getElementById("keyDFlat").classList.add("hidden");
  document.getElementById("keyD").classList.add("hidden");
  document.getElementById("keyEFlat").classList.add("hidden");
  document.getElementById("keyE").classList.add("hidden");
  document.getElementById("keyF").classList.add("hidden");
  document.getElementById("keyGFlat").classList.add("hidden");
  document.getElementById("keyG").classList.add("hidden");
  document.getElementById("keyAFlat").classList.add("hidden");
  document.getElementById("keyA").classList.add("hidden");
  document.getElementById("keyBFlat").classList.add("hidden");
  document.getElementById("keyB").classList.remove("hidden");
  }
}