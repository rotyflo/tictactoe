"use strict";

let p1 = "";
let p2 = "";
let turn = "p1";
let first = "p1";
let message = document.getElementById("message");
let replay = document.getElementById("replay");
let positionsNames = ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3"];
let positionsFunctions = [a1, a2, a3, b1, b2, b3, c1, c2, c3];
let gameOver = false;
let pvp = document.getElementById("pvp");
let pvcButton = document.getElementById("pvc-button");
let pvpButton = document.getElementById("pvp-button");
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

pvcButton.addEventListener("click", function() {
  pvcButton.style.backgroundColor = "#bbb";
  pvcButton.style.color = "white";
  pvpButton.style.backgroundColor = "white";
  pvpButton.style.color = "black";
});

pvpButton.addEventListener("click", function() {
  pvpButton.style.backgroundColor = "#bbb";
  pvpButton.style.color = "white";
  pvcButton.style.backgroundColor = "white";
  pvcButton.style.color = "black";
});

["x", "o"].forEach(function (piece) {
  selectPiece(document.getElementById(piece), piece);
});

positionsNames.forEach(function (position) {
  whenClick(document.getElementById(position));
});

replay.addEventListener("click", function () {
  positionsFunctions.forEach(function (position) {
    position.innerText = "";
  });

  first = first === "p1" ? "p2" : "p1";

  if (first === "p2") {
    if (pvp.checked) {
      turn = "p2";
      message.innerText = "Player 2";
    } else {
      computersTurn();
      turn = "p1";
      message.innerText = "Player 1";
    }
  } else {
    turn = "p1";
    message.innerText = "Player 1";
  }

  gameOver = false;
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

      checkForWinner();
      checkForDraw();

      if (gameOver === false) {
        // TWO PLAYER
        if (pvp.checked) {
          message.innerText = turn === "p1" ? "Player 1" : "Player 2";
        }
        // VS COMPUTER
        else {
          if (turn === "p2") {
              computersTurn();
          }
        }
      }

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
  if (pvp.checked) {
    message.innerText = p1 === winner ? "PLAYER 1 WINS!" : "PLAYER 2 WINS!";
  }
  else {
    message.innerText = p1 === winner ? "PLAYER 1 WINS!" : "COMPUTER WINS!";
  }

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

function computersTurn() {
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
          combo[0].innerText = p2;
          moved = true;
          break;

        case "X X":
        case "O O":
          combo[1].innerText = p2;
          moved = true;
          break;

        case "XX ":
        case "OO ":
          combo[2].innerText = p2;
          moved = true;
          break;
      }
    }
  });

  if (!moved) {
    switch (b2.innerText) {
      case "":
        b2.innerText = p2;
        break;

      case p2:
        if (a2.innerText === "") a2.innerText = p2;
        else if (b1.innerText === "") b1.innerText = p2;
        else if (b3.innerText === "") b3.innerText = p2;
        else if (c2.innerText === "") c2.innerText = p2;
        else {
          for (let i = 0; !moved; i++) {
            if (positionsFunctions[i].innerText === "") {
              positionsFunctions[i].innerText = p2;
              moved = true;
            }
          }
        }
        break;

      case p1:
        if (a1.innerText === "") a1.innerText = p2;
        else if (a3.innerText === "") a3.innerText = p2;
        else if (c1.innerText === "") c1.innerText = p2;
        else if (c3.innerText === "") c3.innerText = p2;
        else {
          for (let i = 0; !moved; i++) {
            if (positionsFunctions[i].innerText === "") {
              positionsFunctions[i].innerText = p2;
              moved = true;
            }
          }
        }
        break;
    }
  }

  turn = "p1";
}