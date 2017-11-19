"use strict";

let p1 = "";
let p2 = "";
let turn = "p1";
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

["x", "o"].forEach(function (piece) {
  selectPiece(document.getElementById(piece), piece);
});

positionsNames.forEach(function (position) {
    whenClick(document.getElementById(position));
});

replay.addEventListener("click", function() {
  positionsFunctions.forEach(function(position) {
    position.innerText = "";
  });
  gameOver = false;
  turn = "p1";
  message.innerText = "Player 1";
  replay.style.display = "none";
});

function selectPiece(piece, symbol) {
  piece.addEventListener("click", function () {
    p1 = symbol.toUpperCase();
    p2 = p1 === "X" ? "O" : "X";
    document.getElementById("menu").style.display = "none";
    document.getElementById("game").style.display = "initial";
  });
}

function whenClick(position) {
  position.addEventListener("click", function () {
    if (position.innerText === "" && !gameOver) {
      position.innerText = turn === "p1" ? p1 : p2;
      turn = turn === "p1" ? "p2" : "p1";
      message.innerText = turn === "p1" ? "Player 1" : "Player 2";
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

    if (result === "XXX") declareWinner("X");
    if (result === "OOO") declareWinner("O");
  });
}

function declareWinner(winner) {
  message.innerText = p1 === winner ? "PLAYER 1 WINS!" : "PLAYER 2 WINS!";
  gameOver = true;
  replay.style.display = "initial";
}

function checkForDraw() {
  let draw = true;

  positionsFunctions.forEach(function (position) {
    if (position.innerText === "") draw = false;
  });

  if (draw && !gameOver) {
    message.innerText = "IT'S A DRAW!";
    replay.style.display = "initial";
  }
}