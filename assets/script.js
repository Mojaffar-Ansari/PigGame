"use strict";
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelector('.btn--user_manual');

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");


const dice_rolling_audio = new Audio('assets/audio/dice_roll_audio.wav');
const winning_audio = new Audio('assets/audio/winning.wav');
const transition_audio = new Audio('assets/audio/transition.wav');
const new_game_audio = new Audio('assets/audio/new_game.wav');

// Code for mModal window
const openModal = function(){
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

const closeModal = function(){
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

btnOpenModal.addEventListener('click',openModal);
btnCloseModal.addEventListener('click',closeModal);
overlay.addEventListener('click',closeModal);

document.addEventListener('keydown',function(e){
  if(e.key === 'Escape' && !modal.classList.contains('hidden')){
    closeModal();
  }
});


// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");

  transition_audio.volume = 0.2;
  transition_audio.play();
};

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Genarate a randome dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `assets/img/dice-${dice}.png`;
    dice_rolling_audio.volume = 0.4;
    dice_rolling_audio.play();
    // 3. Check for rolled 1: if true, switch to next player
    if (dice != 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// Hold button functionality
btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      winning_audio.volume = 0.5;
      winning_audio.play();
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // 3. Switch to the next player
      switchPlayer();
    }
  }
});


const resetGame = function(){
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  new_game_audio.volume = 0.3;
  new_game_audio.play();
}

// New Game button functionality
btnNew.addEventListener('click',function(){
  if(!playing){
    resetGame();
  }
  else{
    const confirmNewGame = confirm('Are you sure for new game??');
    if(confirmNewGame){
      resetGame();
    }
  }
}); 