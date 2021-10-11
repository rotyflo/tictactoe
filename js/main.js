"use strict";

let message = document.getElementById("message");
let replay = document.getElementById("replay");
let positionsNames = ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3"];
let positionsFunctions = [a1, a2, a3, b1, b2, b3, c1, c2, c3];
let gameOver = false;
let winningCombos = [
  [a1, a2, a3],
  [b1, b2, b3],
  [c1, c2, c3],
  [a1, b1, c1],
  [a2, b2, c2],
  [a3, b3, c3],
  [a1, b2, c3],
  [c1, b2, a3]
];
let players = {
  one: {
    name: "Player",
    piece: "X",
    turn: true,
    winner: false
  },
  two: {
    name: "Computer",
    piece: "O",
    turn: false,
    winner: false
  }
}

document.getElementById("playerone").addEventListener("keyup", (pressed) => {
  if (pressed.key === "Enter") startGame();
});

document.getElementById("playertwo").addEventListener("keyup", (pressed) => {
  if (pressed.key === "Enter") startGame();
});

document.getElementById("start-button").addEventListener("click", () => {
  startGame();
});

positionsNames.forEach(function (position) {
  whenClick(document.getElementById(position));
});

replay.addEventListener("click", function () {
  clearBoard();

  if (getWinner().name === getCurrentPlayer().name) {
    switchTurns();
  } else if (players.two.name === "Computer") {
    takeComputerTurn();
  }
  printMatchup();

  gameOver = false;
  replay.style.display = "none";
});


// Functions

function applySettings() {
  let nameOne = document.getElementById("playerone").value;
  let nameTwo = document.getElementById("playertwo").value;
  if (nameOne.length > 0) players.one.name = nameOne;
  if (nameTwo.length > 0) players.two.name = nameTwo;
}

function startGame() {
  applySettings();
  hideSettings();
  printMatchup();
  unhideBoard();
}

function hideSettings() {
  document.getElementById("settings").style.display = "none";
}

function unhideBoard() {
  document.getElementById("game").style.display = "block";
  replay.style.display = "none";
}

function printMatchup() {
  message.innerText = `${players.one.name} vs. ${players.two.name}`;
}

function switchTurns() {
  let playerOne = players.one;
  let playerTwo = players.two;

  if (playerOne.turn) {
    playerTwo.turn = true;
    playerOne.turn = false;
  } else {
    playerOne.turn = true;
    playerTwo.turn = false;
  }
}

function clearBoard() {
  positionsFunctions.forEach(function (position) {
    position.innerText = "";
  });
}

function getWinner() {
  if (players.one.winner) return players.one;
  return players.two;
}

function getCurrentPlayer() {
  if (players.one.turn) return players.one;
  return players.two;
}

function whenClick(position) {
  position.addEventListener("click", function () {
    if (position.innerText === "" && !gameOver) {
      position.innerText = getCurrentPlayer().piece;

      switchTurns();
      checkForWinner();
      checkForDraw();

      if (gameOver === false) {
        if (players.two.turn && players.two.name === "Computer") {
          takeComputerTurn();
        }
      }

      printMatchup();
      checkForWinner();
      checkForDraw();
    }
  });
}

function checkForWinner() {
  winningCombos.forEach(function (combo) {
    let result = "";

    combo.forEach(function (position) {
      result += position.innerText;
    });

    if (result === "XXX") declareWinner(players.one);
    if (result === "OOO") declareWinner(players.two);
  });
}

function declareWinner(player) {
  message.innerText = `${player.name} wins!`;
  
  players.one.winner = false;
  players.two.winner = false;
  player.winner = true;

  switchTurns();
  gameOver = true;
  replay.style.display = "initial";
}

function checkForDraw() {
  let draw = true;

  positionsFunctions.forEach(function (position) {
    if (position.innerText === "") draw = false;
  });

  if (draw && !gameOver) {
    message.innerText = "It's a draw!";
    replay.style.display = "initial";
  }
}

function takeComputerTurn() {
  let computerPiece = players.two.piece;
  let playerOnePiece = players.one.piece;
  let moved = false;

  winningCombos.forEach(function (combo) {
    if (!moved) {
      let result = "";

      combo.forEach(function (position) {
        result += position.innerText === "" ? " " : position.innerText;
      });

      switch (result) {
        case " XX":
        case " OO":
          combo[0].innerText = computerPiece;
          moved = true;
          break;

        case "X X":
        case "O O":
          combo[1].innerText = computerPiece;
          moved = true;
          break;

        case "XX ":
        case "OO ":
          combo[2].innerText = computerPiece;
          moved = true;
          break;
      }
    }
  });

  if (!moved) {
    switch (b2.innerText) {
      case "":
        b2.innerText = computerPiece;
        break;

      case computerPiece:
        if (a2.innerText === "") a2.innerText = computerPiece;
        else if (b1.innerText === "") b1.innerText = computerPiece;
        else if (b3.innerText === "") b3.innerText = computerPiece;
        else if (c2.innerText === "") c2.innerText = computerPiece;
        else {
          for (let i = 0; !moved; i++) {
            if (positionsFunctions[i].innerText === "") {
              positionsFunctions[i].innerText = computerPiece;
              moved = true;
            }
          }
        }
        break;

      case playerOnePiece:
        if (a1.innerText === "") a1.innerText = computerPiece;
        else if (a3.innerText === "") a3.innerText = computerPiece;
        else if (c1.innerText === "") c1.innerText = computerPiece;
        else if (c3.innerText === "") c3.innerText = computerPiece;
        else {
          for (let i = 0; !moved; i++) {
            if (positionsFunctions[i].innerText === "") {
              positionsFunctions[i].innerText = computerPiece;
              moved = true;
            }
          }
        }
        break;
    }
  }

  switchTurns();
}