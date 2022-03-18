const board = document.querySelector(".board");
var boardArray = [];
var count = 0;
var currentScore = 0;
const lives = document.querySelector(".lives");
var livesRemainig = 10;
const score = document.querySelector(".score");
var gameOver = false;
var setInt;

//Making the board
function Board() {
  for (let i = 0; i < 2; i++) {
    boardArray[i] = [];
    var row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j <= 2; j++) {
      count++;
      var col = document.createElement("div");
      col.classList.add("col");
      col.setAttribute("id", count);
      row.append(col);
      boardArray[i][j] = col;
      col.addEventListener("click", (e) => {
        click(col);
      });
    }
    board.append(row);
  }
  score.innerHTML = "Score:" + currentScore;
  lives.innerHTML = "Lives:" + livesRemainig;
}
console.log(board);
Board();
console.log("Hello");

//Function to generate numbers between 1 and 6
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//Function to render images on screen
function renderImages() {
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j <= 2; j++) {
      var img = document.createElement("img");
      img.src = "dirt.png";
      boardArray[i][j].appendChild(img);
    }
  }

  document.querySelector(".start").addEventListener("click", () => {
    document.querySelector(".start").disabled = true;
    console.log("Hello");
    //set Interval is used to change the replace the existing image with mole's image after 1s interval
    setInt = setInterval(() => {
      if (gameOver) {
        clearInterval(setInt);
        document.querySelector(".gameover").innerHTML =
          "Game Over Your Score:" + currentScore;
      }
      const rndInt = randomIntFromInterval(1, 6);
      //   img.src = "mole.jpg";
      //It return an array of child of that particular element
      var child = document.getElementById(rndInt.toString()).childNodes;
      child[0].src = "mole.png";
      changeBack(rndInt);
    }, 1000);
  });
}
renderImages();

function changeBack(num) {
  setTimeout(() => {
    var child = document.getElementById(num.toString()).childNodes;
    child[0].src = "dirt.png";
  }, 1000);
}

function click(col) {
  if (col.childNodes[0].src == "http://127.0.0.1:5500/mole.png") {
    currentScore++;
    score.innerHTML = "Score:" + currentScore;
  } else {
    livesRemainig--;
    if (livesRemainig >= 0) {
      lives.innerHTML = "Lives:" + livesRemainig;
    } else {
      gameOver = true;
    }
  }
}
