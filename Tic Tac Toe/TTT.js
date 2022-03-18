const board = document.getElementById("grid");
const buttonX = document.querySelector(".chooseX");
const buttonO = document.querySelector(".chooseO");
const rows = 3;
const cols = 3;
var grid = [];
var value = "❌";
var updatedI = 0;
var updatedJ = 0;
var gameWon = false;
var reload = document.getElementById("reload_game");

function GameBoard() {
  for (let i = 0; i < rows; i++) {
    const row = document.createElement("div");
    grid[i] = [];
    row.classList.add("row");
    for (let j = 0; j < cols; j++) {
      const col = document.createElement("div");
      col.setAttribute("data", `${i},${j}`);
      col.classList.add("col");
      row.appendChild(col);
      grid[i][j] = col;
      col.addEventListener("click", (e) => {
        click(col);
      });
    }
    board.appendChild(row);
    console.log(row);
  }
}

GameBoard();

console.log(grid);

function click(col) {
  if (checkForDraw()) {
    document.querySelector(".game_won").innerHTML = "Draw";
    return;
  }
  if (gameWon) return;
  if (col.classList.contains("revealed")) return;
  col.classList.add(value === "❌" ? "X" : "O");
  console.log(col);
  var [x, , y] = [...col.getAttribute("data")];
  x = parseInt(x);
  y = parseInt(y);
  checkAdjacentSquares(x, y);
  col.classList.add("revealed");
  col.innerHTML = value;
}

buttonX.addEventListener("click", function (e) {
  value = "❌";
});

buttonO.addEventListener("click", function (e) {
  value = "⭕";
});

function checkAdjacentSquares(x, y) {
  var val = grid[x][y].classList.contains("X") ? "X" : "O";
  console.log(val);
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      var newX = x + i;
      var newY = y + j;
      if (newX < rows && newY < cols && newX >= 0 && newY >= 0) {
        console.log("First If");
        if (grid[newX][newY].classList.contains(val)) {
          newX = newX + i;
          newY = newY + j;
          console.log("Second If");
          if (newX < rows && newY < cols && newX >= 0 && newY >= 0) {
            if (
              grid[newX][newY].classList.contains(val) &&
              grid[newX][newY].classList.contains("revealed")
            ) {
              console.log("Third If");
              win(val);
              return;
            }
          } else {
            newX = x - i;
            newY = y - j;
            if (newX < rows && newY < cols && newX >= 0 && newY >= 0) {
              if (
                grid[newX][newY].classList.contains(val) &&
                grid[newX][newY].classList.contains("revealed")
              ) {
                console.log("Third If");
                win(val);
                return;
              }
            }
          }
        }
      }
    }
  }
}

function checkForDraw() {
  let count = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j].classList.contains("revealed")) {
        count++;
      }
    }
  }
  return count === rows * cols;
}

function win(val) {
  document.querySelector(".game_won").innerHTML =
    (val === "X" ? "❌" : "⭕") + " Won";
  gameWon = true;
  // alert((val === 'X' ? '❌' : '⭕') + " Won")
  console.log("You Won");
  return;
}

reload.addEventListener("click", function (e) {
  window.location.reload();
});
