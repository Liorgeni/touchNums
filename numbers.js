"use strict";
var easy;
var medium;
var hard;
var levels;
var counter = 1;
var firstNumClicked = false;
var currTime;
var tick;
var startTime;
var gBoard;
const timeDisplay = document.querySelector(".show--time");

onInit("easy");

function onInit(level) {
  clearInterval(tick);
  timeDisplay.innerText = "0:000";
  counter = 1;
  firstNumClicked = false;
  levels = {
    easy: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    medium: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25,
    ],
    hard: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
    ],
  };
  gBoard = [...levels[level]];
  renderBoard(levels[level]);
  // console.log("gBoard", gBoard);
}

function renderBoard(board) {
  // console.log("board", board);
  var bPow = board.length ** 0.5;
  // console.table(board);
  var strHTML = "";

  for (var i = 0; i < bPow; i++) {
    strHTML += "<tr>";
    for (var j = 0; j < bPow; j++) {
      var currNum = drawNum(board);
      strHTML += `<td id=${currNum} onclick="checkNum(this)"> ${currNum}</td>`;
      //   console.log(currNum);
    }
    strHTML += "</tr>\n";
  }
  var elBoard = document.querySelector(".board");
  elBoard.innerHTML = strHTML;
}

function checkNum(elCell) {
  var clickedNum = +elCell.getAttribute("id");
  //   console.log(elCell);
  //   console.log(clickedNum);
  // console.log("counter", counter);
  // console.log("gBoard", gBoard);
  if (clickedNum === counter) {
    startTimer();
    elCell.classList.add("occupied");
    counter++;
  }
  if (counter === gBoard.length + 1) {
    clearInterval(tick);

    alert("Well Done!!");
  }
}
function startTimer() {
  if (!firstNumClicked) {
    firstNumClicked = true;
    startTime = Date.now();
    tick = setInterval(function () {
      var timer = Date.now() - startTime;
      var sec = timer / 1000;
      currTime = `${sec.toFixed(3)}`;
      timeDisplay.innerText = currTime;
    }, 10);
  }
}

/////////////////////////////////////////////////

function drawNum(board) {
  var randIdx = getRandomInt(0, board.length);
  var num = board[randIdx];
  board.splice(randIdx, 1);
  return num;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
