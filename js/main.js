"use strict";

let menu = document.getElementById("menu");
let o = document.getElementById("o");
let x = document.getElementById("x");
let board = document.getElementById("board");
let a1 = document.getElementById("a1");
let a2 = document.getElementById("a2");
let a3 = document.getElementById("a3");
let b1 = document.getElementById("b1");
let b2 = document.getElementById("b2");
let b3 = document.getElementById("b3");
let c1 = document.getElementById("c1");
let c2 = document.getElementById("c2");
let c3 = document.getElementById("c3");
let p1 = "";
let p2 = "";
let turn = "p1";

o.addEventListener("click", function() {
  p1 = "O";
  p2 = "X";
	menu.style.display = "none";
	board.style.display = "initial";
});

x.addEventListener("click", function() {
  p1 = "X";
  p2 = "O";
	menu.style.display = "none";
	board.style.display = "initial";
});

a1.addEventListener("click", function() {
	a1.innerText = turn === "p1" ? p1 : p2;
  turn = turn === "p1" ? "p2" : "p1";
});
a2.addEventListener("click", function() {
  a2.innerText = turn === "p1" ? p1 : p2;
  turn = turn === "p1" ? "p2" : "p1";
});
a3.addEventListener("click", function() {
  a3.innerText = turn === "p1" ? p1 : p2;
  turn = turn === "p1" ? "p2" : "p1";
});
b1.addEventListener("click", function() {
  b1.innerText = turn === "p1" ? p1 : p2;
  turn = turn === "p1" ? "p2" : "p1";
});
b2.addEventListener("click", function() {
  b2.innerText = turn === "p1" ? p1 : p2;
  turn = turn === "p1" ? "p2" : "p1";
});
b3.addEventListener("click", function() {
  b3.innerText = turn === "p1" ? p1 : p2;
  turn = turn === "p1" ? "p2" : "p1";
});
c1.addEventListener("click", function() {
  c1.innerText = turn === "p1" ? p1 : p2;
  turn = turn === "p1" ? "p2" : "p1";
});
c2.addEventListener("click", function() {
  c2.innerText = turn === "p1" ? p1 : p2;
  turn = turn === "p1" ? "p2" : "p1";
});
c3.addEventListener("click", function() {
  c3.innerText = turn === "p1" ? p1 : p2;
  turn = turn === "p1" ? "p2" : "p1";
});