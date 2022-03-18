const fiftyFifty = document.querySelector(".ff");
const keys = document.querySelector(".keys");
var highScore = document.querySelector(".highscore");
var score = document.querySelector(".score");
const hint = document.querySelector(".hintBtn");
var notify = document.querySelector(".notify");
var modal = document.getElementById("myModal");
var modalContent = document.querySelector(".modal-content");
var restartBtn = document.querySelector(".RestartBtn");
var wordInputArea = document.querySelector(".wordInputArea");
const wrongAnswer = document.querySelector(".wrongInputs");
const map = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7,
  i: 8,
  j: 9,
  k: 10,
  l: 11,
  m: 12,
  n: 13,
  o: 14,
  p: 15,
  q: 16,
  r: 17,
  s: 18,
  t: 19,
  u: 20,
  v: 21,
  w: 22,
  x: 23,
  y: 24,
  z: 25,
};
const alphabetArray = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const randomWords = [
  "rain",
  "apple",
  "bye",
  "hello",
  "boy",
  "bat",
  "action",
  "common",
  "button",
  "account",
  "capital",
  "fitness",
  "abandon",
  "cricket",
  "football",
  "quadratic",
  "birthday",
  "whatsapp",
  "facebook",
  "programming",
];
var letterArray = [];
var wrongInputs = [];
var rightInputs = [];
const hangManArea = document.querySelector(".hangManArea");
const human = [
  '<circle cx="190" cy="130" r="30" stroke="white" stroke-width="3" fill="rgb(34, 48, 75)";/>',
  '<line x1="190" y1="160" x2="190" y2="250" style="stroke:white;stroke-width:2" />',
  '<line x1="190" y1="190" x2="140" y2="140" style="stroke:white;stroke-width:2" />',
  '<line x1="190" y1="190" x2="240" y2="140" style="stroke:white;stroke-width:2" />',
  '<line x1="190" y1="250" x2="140" y2="300" style="stroke:white;stroke-width:2" />',
  '<line x1="190" y1="250" x2="250" y2="300" style="stroke:white;stroke-width:2" />',
];
var gameOverCount = 0;
var currentScore = 0;

function createWordBox(word) {
  highScore.innerHTML = `High Score:${localStorage.getItem("highScore") || 0}`;
  score.innerHTML += localStorage.getItem("score") || 0;
  for (let i = 0; i < 1; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < word.length; j++) {
      const col = document.createElement("div");
      col.setAttribute("id", word[j]);
      col.classList.add("letterBox");
      letterArray.push(col);
      row.append(col);
    }
    wordInputArea.append(row);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

let index = Math.round(randomNumber(0, randomWords.length - 1));
//Test Case
// let index = 19;
var wonCount = randomWords[index].length;
createWordBox(randomWords[index]);
keys.addEventListener("click", (e) => {
  if (!e.target.classList.contains("keyRow")) {
    e.target.classList.add("disableKeys");
    //this flag is used if we press the button and if it is not present in the word
    var letterPresentFlag = false;
    letterArray.forEach((el) => {
      if (e.target.textContent === el.getAttribute("id").toLowerCase()) {
        if (el.innerHTML === "") {
          //true because the word is present inside it
          letterPresentFlag = true;
          el.innerHTML = el.getAttribute("id");
          el.classList.add("revealed");
          wonCount--;
        }
      }
    });

    //To handle wrong inputs
    if (!letterPresentFlag) {
      hangManArea.innerHTML += human[gameOverCount];
      gameOverCount++;
      if (gameOverCount == human.length) {
        gameOver();
      }
    }

    if (wonCount == 0) {
      gameWon();
    }
  }
});

function gameOver() {
  localStorage.setItem("flag", "true");
  scoreUpdate();
  document.getElementsByTagName("p")[0].innerHTML = "Oops,You Lost😥";
  modal.style.display = "block";
  modalContent.style.backgroundColor = "#D01010";
  restartBtn.addEventListener("click", () => {
    window.location.reload();
  });
}

function gameWon() {
  restartBtn.innerHTML = "Next";
  scoreUpdate();
  document.getElementsByTagName("p")[0].innerHTML =
    "Congratulations! You Won😎";
  modal.style.display = "block";
  modalContent.style.backgroundColor = "#07BD0C";
  restartBtn.addEventListener("click", () => {
    window.location.reload();
  });
}

//Hint Button Functionality
hint.addEventListener("click", () => {
  fiftyFifty.classList.add("disabled");
  hint.classList.add("disabled");
  let len = randomWords[index].length / 2;
  let numArray = [];
  while (numArray.length < len - 1) {
    console.log("hello");
    let num = Math.round(randomNumber(0, randomWords[index].length - 1));
    if (!numArray.includes(num)) {
      if (letterArray[num].innerHTML === "") {
        wonCount--;
        letterArray[num].innerHTML = letterArray[num].getAttribute("id");
        letterArray[num].classList.add("revealed");
        numArray.push(num);
      }
    }
  }
});

function scoreUpdate() {
  if (localStorage.getItem("flag") === "false") {
    if (
      parseInt(localStorage.getItem("highScore")) <
      parseInt(localStorage.getItem("score"))
    ) {
      localStorage.setItem("highScore", localStorage.getItem("score"));
      highScore.innerHTML = localStorage.getItem("highScore");
    }
    currentScore = Math.round(randomWords[index].length / 2 + 2);
    var lsScore = parseInt(localStorage.getItem("score"));
    localStorage.setItem("score", (lsScore += currentScore));
    score.innerHTML = `Score: ${localStorage.getItem("score")}`;
  } else if (localStorage.getItem("flag") === "true") {
    console.log("hello");
    console.log(currentScore);
    localStorage.setItem("flag", "false");
    if (
      parseInt(localStorage.getItem("highScore")) <
      parseInt(localStorage.getItem("score"))
    ) {
      localStorage.setItem("highScore", localStorage.getItem("score"));
      highScore.innerHTML = localStorage.getItem("highScore");
      localStorage.setItem("score", 0);
    }
    localStorage.setItem("score", 0);
  }
}

var alphabetCount = 0;
function createKeyboard() {
  for (let i = 0; i < 2; i++) {
    var keyRow = document.createElement("div");
    keyRow.classList.add("keyRow");
    for (let j = 0; j < 13; j++) {
      var keyCol = document.createElement("div");
      keyCol.classList.add("keyCol");
      keyCol.setAttribute("id", alphabetCount);
      keyCol.innerHTML = alphabetArray[alphabetCount];
      alphabetCount++;
      keyRow.append(keyCol);
    }
    keys.append(keyRow);
  }
}
createKeyboard();

fiftyFifty.addEventListener("click", () => {
  let count = 0;
  while (count < 13) {
    let numb = Math.round(randomNumber(0, alphabetArray.length - 1));
    if (
      !document.getElementById(numb).classList.contains("disableKeys") &&
      !letterArray.includes(document.getElementById(alphabetArray[numb]))
    ) {
      document.getElementById(numb).classList.add("disableKeys");
      count++;
    }
  }
  hint.classList.add("disabled");
  fiftyFifty.classList.add("disabled");
});
