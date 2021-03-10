'use strict';

//----- All Variables -----//
let score0El = document.getElementById('score--0');
let score1El = document.getElementById('score--1');
let current0El = document.getElementById('current--0');
let current1El = document.getElementById('current--1');
let diceEl = document.querySelector('.dice');
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');

let switchPlayer = function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  if (activePlayer === 1) {
    activePlayer = 0;
  } else if (activePlayer === 0) {
    activePlayer = 1;
  }
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  //Switch to next player
};

//---- Scores by default ----//

let currentScore = 0;
let scores = [0, 0];
let activePlayer = 0;
//---- Output score 0 ----//
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

//----- Name PLayers -----//

let namePlayerOne = prompt('Name first Player?');
document.getElementById('name--0').textContent = namePlayerOne;
let namePlayerTwo = prompt('Name Second Player?');
document.getElementById('name--1').textContent = namePlayerTwo;

//---------------------------------------//
//------ BTN ROLL ------ //
//---------------------------------------//
btnRoll.addEventListener('click', function () {
  // 1.Generating a random dice roll

  let dice = Math.trunc(Math.random() * 6) + 1;

  //2.Display dice

  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;
  currentScore = dice;

  //2. Check for rolled 1: if true, switch to next player

  if (dice !== 1) {
    //Add dice to current score

    scores[activePlayer] += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      scores[activePlayer];
  } else {
    if (scores[activePlayer] >= 100) {
      document.getElementById(`score--${activePlayer}`).textContent = 1;
    } else {
      // Make current score from a player 0
      scores[activePlayer] = 0;
      document.getElementById(`current--${activePlayer}`).textContent = 0;

      switchPlayer();
    }
  }
});

let mainPlayerOneScore = 0;
let mainPlayerTwoScore = 0;

//---------------------------------------//
//---- BTN HOLD -----//
//---------------------------------------//
document.querySelector('.btn--hold').addEventListener('click', function () {
  if (activePlayer === 0) {
    mainPlayerOneScore += scores[activePlayer];
    scores[activePlayer] = 0;
    score0El.textContent = mainPlayerOneScore;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
  } else if (activePlayer === 1) {
    mainPlayerTwoScore += scores[activePlayer];
    scores[activePlayer] = 0;
    score1El.textContent = mainPlayerTwoScore;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
  }

  switchPlayer();

  if (mainPlayerOneScore >= 100) {
    document.getElementById('name--0').textContent =
      namePlayerOne + ' ' + 'Win';
    document.querySelector(`.player--0`).classList.remove('player--active');
    document.querySelector(`.player--0`).classList.add('player--win');
  } else if (mainPlayerTwoScore >= 100) {
    document.getElementById('name--1').textContent =
      namePlayerTwo + ' ' + 'Win';
    document.querySelector(`.player--1`).classList.remove('player--active');
    document.querySelector(`.player--1`).classList.add('player--win');
  }
});

//---------------------------------------//
//---- Button RESET ----//
//---------------------------------------//
btnNew.addEventListener('click', function () {
  //---- Scores by default ----//

  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  mainPlayerOneScore = 0;
  mainPlayerTwoScore = 0;
  //---- Output score 0 ----//
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');

  document.getElementById(`current--${0}`).textContent = 0;
  document.getElementById(`current--${1}`).textContent = 0;

  document.querySelector(`.player--${0}`).classList.add('player--active');
  document.querySelector(`.player--${1}`).classList.remove('player--active');
  activePlayer = 0;
  //----- Name PLayers -----//

  let namePlayerOne = prompt('Name first Player?');
  document.getElementById('name--0').textContent = namePlayerOne;
  let namePlayerTwo = prompt('Name Second Player?');
  document.getElementById('name--1').textContent = namePlayerTwo;
});
