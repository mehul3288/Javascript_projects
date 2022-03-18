const board = document.getElementById("board");
var count = 0;
const bombAmount = 20;
var cellArray = [];
const rows = 10;
const cols = 10;
var isGameOver = false;
var flags = 0;
let reloadButton = document.getElementById("reload_game");
var flagsLeft = bombAmount;
var win = false;

function createBoard(rows, cols) {
  const bombsArray = Array(bombAmount).fill("bomb"); //20
  const emptyArray = Array(rows * cols - bombAmount).fill("valid"); //remaining which is 80
  const gameArray = emptyArray.concat(bombsArray);
  const shuffledArray = gameArray.sort(() => Math.random() - 0.5);
  for (let i = 0; i < rows; i++) {
    cellArray[i] = [];
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < cols; j++) {
      const col = document.createElement("div");
      col.classList.add("col");

      // col.setAttribute('id', count);
      col.classList.add(shuffledArray[count]);
      row.appendChild(col);
      cellArray[i][j] = col;
      //   col.addEventListener("click", function (e) {
      //     click(col);
      //   });
      count++;

      col.oncontextmenu = function (e) {
        e.preventDefault();
        addFlag(col);
      };
    }
    board.appendChild(row);
  }
}

createBoard(rows, cols);
console.log(cellArray);
adjacentMines();

//Event Delegation meaning giving parent element addEventListener and by clicking on the child element due to bubbling the event get excuted
board.addEventListener("click", function (e) {
  e.target.classList.contains("col") && click(e.target);
});

function adjacentMines() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (cellArray[i][j].classList.contains("valid")) {
        let adjBombs = calculateNumber(i, j);
        cellArray[i][j].setAttribute("data", adjBombs);
        // cellArray[i][j].innerHTML = adjBombs;
      }
    }
  }
}

function calculateNumber(x, y) {
  var total = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let newI = x + i;
      let newJ = y + j;
      if (newI < 0 || newJ < 0) {
        continue;
      } else {
        if (
          newI < rows &&
          newJ < cols &&
          cellArray[newI][newJ].classList.contains("bomb")
        ) {
          total++;
        }
      }
    }
  }
  return total;
}

//On Click Function
function click(col) {
  if (win) return;
  if (col.getAttribute("data") == 0 && !isGameOver) {
    checkAllEmptySquares(col);
  }
  if (isGameOver) return;
  if (col.classList.contains("flag") || col.classList.contains("revealed"))
    return;
  if (col.classList.contains("bomb")) {
    console.log("bomb");
    gameOver();
  }
  let number = parseInt(col.getAttribute("data"));
  if (number != 0) {
    col.classList.add("revealed");
    col.innerHTML = number;
    return;
  }
  col.classList.add("revealed");
}

//Add Flag function
function addFlag(col) {
  if (win) return;
  if (isGameOver) return;
  if (!col.classList.contains("revealed") && flags < bombAmount) {
    if (!col.classList.contains("flag")) {
      console.log(flags);
      col.classList.add("flag");
      col.innerHTML = "🚩";
      flags++;
      flagsLeft--;
      document.getElementById("flagsTag").innerHTML = "🚩" + ": " + flagsLeft;
      checkForWin();
    } else {
      col.classList.remove("flag");
      col.innerHTML = "";
      flags--;
      flagsLeft++;
      document.getElementById("flagsTag").innerHTML = "🚩" + ": " + flagsLeft;
    }
  } else {
    if (col.classList.contains("flag")) {
      col.classList.remove("flag");
      col.innerHTML = "";
      flags--;
      flagsLeft++;
      document.getElementById("flagsTag").innerHTML = "🚩" + ": " + flagsLeft;
    }
    return;
  }
}

// If Win
function checkForWin() {
  var matched = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (
        cellArray[i][j].classList.contains("flag") &&
        cellArray[i][j].classList.contains("bomb")
      ) {
        matched++;
      }
    }
  }
  if (matched == bombAmount) {
    win = true;
    console.log("You Win");
    document.getElementById("marqueeTag").innerHTML = "👑 You Won 👑";
    return;
  }
}

//Game Over Function
function gameOver() {
  document.getElementById("marqueeTag").innerHTML =
    "Game Over 💣. Click Start Again";
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (cellArray[i][j].classList.contains("bomb")) {
        cellArray[i][j].classList.add("revealed");
        cellArray[i][j].innerHTML = "💣";
      }
    }
  }
  isGameOver = true;
  // document.getElementById("gameover").innerHTML = "Game Over 💣";
}

function checkAllEmptySquares(col) {
  if (col.getAttribute("data") != 0) {
    return;
  } else {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (cellArray[i][j] == col) {
          // console.log("called");
          // console.log(col);
          // console.log(i, "-----", j)
          calculateadjacentEmptyCells(i, j);
        }
      }
    }
  }
}

function calculateadjacentEmptyCells(x, y) {
  if (x >= rows || y >= cols || x < 0 || y < 0) {
    return;
  }

  if (cellArray[x][y].classList.contains("revealed")) {
    return;
  }
  if (cellArray[x][y].classList.contains("flag")) {
    return;
  }

  if (cellArray[x][y].getAttribute("data") > 0) {
    cellArray[x][y].classList.add("revealed");
    cellArray[x][y].innerHTML = cellArray[x][y].getAttribute("data");
    return;
  }

  cellArray[x][y].classList.add("revealed");

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let newI = x + i;
      let newJ = y + j;
      calculateadjacentEmptyCells(newI, newJ);
    }
  }
}

reloadButton.addEventListener("click", function () {
  window.location.reload();
});
