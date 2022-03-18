const container = document.querySelector(".container");
var restart = document.querySelector(".restart");
var score = document.querySelector(".score");
var scoreCounter = 100;
colArray = [];
var count = 0;
var matchCount = 0;
var timer = document.querySelector(".timer");
var highScore = document.querySelector(".Highest_Score");
var highestScore = localStorage.getItem("highestScore");
//List of Random Cards
var backCover = "🧧";
//Icons Array
var randomImages = [
  "🎈",
  "⚾",
  "🎮",
  "🎯",
  "🍕",
  "🍨",
  "🚂",
  "⭐",
  "😊",
  "🦮",
  "🎈",
  "⚾",
  "🎮",
  "🎯",
  "🍕",
  "🍨",
  "🚂",
  "⭐",
  "😊",
  "🦮",
];

//function to sort array
var sortedImage = randomImages.sort(() => Math.random() - 0.5);
console.log(sortedImage);

if (highestScore === null) highScore.innerHTML = `Highest Score:0`;
else highScore.innerHTML = `Highest Score:${highestScore}`;

//starting value of timer
timer.innerHTML = "0 mins 0 sec";

//Area where cards will be placed
function createPlayingArea() {
  for (let i = 0; i < 2; i++) {
    var row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < 10; j++) {
      var col = document.createElement("div");
      var icons = document.createElement("div");
      icons.classList.add("icon");
      col.setAttribute("id", count);
      count++;
      icons.innerHTML = backCover;
      col.append(icons);
      col.classList.add("col");
      col.classList.add("reverse");
      row.append(col);
      colArray.push(col);
    }
    container.append(row);
  }
}

createPlayingArea();
console.log(container);

//This array takes 2 elements which is the first and second click
var pair = [];

//This start counter is use to initialize the timer only once
var startCounter = 0;

//Click functions
click = (col) => {
  console.log(col.textContent);
  startCounter++;
  //This startTimer function should only run once
  if (startCounter == 1) {
    startTimer();
  }

  //This is use when user click 1st time on cards it flips
  col.classList.contains("reverse")
    ? (col.classList.remove("reverse"), col.classList.add("flipped"))
    : (col.classList.remove("flipped"), col.classList.add("reverse"));

  var id = col.getAttribute("id");
  if (!pair.includes(id)) {
    pair.push(id);
  }
  console.log(pair);

  //if class is flipped base on the id it will access the elements in array and will assign that particular icon if class reverse then it will just assign the back side of that image in our case is🧧
  if (col.classList.contains("flipped")) {
    document.getElementById(id).childNodes[0].innerHTML =
      sortedImage[parseInt(id)];
  } else {
    document.getElementById(col.getAttribute("id")).childNodes[0].innerHTML =
      backCover;
  }

  //so basically we are comparing two items so if arrays's length is less than 2 it will not work
  if (pair.length == 2) {
    compare(pair);
  }
};

//This is use to assign eventListener to all the div elements with class col
colArray.forEach((element) => {
  element.addEventListener("click", (e) => {
    click(element);
  });
});

// function to check wheteher the two cards are equal or not
compare = (pairs) => {
  const [a, b] = pairs;
  console.log(a, b);
  if (
    document.getElementById(a).childNodes[0].textContent ==
    document.getElementById(b).childNodes[0].textContent
  ) {
    matchCount++;
    console.log("same");
    //We have disabled class because the already found match should not be clickable
    document.getElementById(a).classList.add("disabled");
    document.getElementById(b).classList.add("disabled");

    //we are making pair array empty again as we ave found the match
    pair = [];
    if (matchCount == sortedImage.length / 2) {
      GameWon();
    }
  } else {
    scoreCounter--;
    UpdateScore();
    pair = [];
    document.getElementById(a).classList.remove("flipped");
    document.getElementById(a).classList.add("reverse");
    document.getElementById(b).classList.remove("flipped");
    document.getElementById(b).classList.add("reverse");
    // var arr = [a, b];
    pairs.forEach((id) => {
      document.getElementById(id).childNodes[0].innerHTML = backCover;
    });
  }
};

var minHand = 0;
var secHand = 0;
var timeTaken = [];
startTimer = () => {
  var timeInterval = setInterval(() => {
    secHand++;
    secHand == 60 && (minHand++, (secHand = 0));
    timer.innerHTML = `${minHand} mins ${secHand} sec`;
    if (matchCount == sortedImage.length / 2) {
      timeTaken.push(minHand);
      timeTaken.push(secHand);
      clearInterval(timeInterval);
    }
  }, 1000);
};

function GameWon() {
  if (scoreCounter > highestScore)
    localStorage.setItem("highestScore", scoreCounter);
  document.getElementById("disable").classList.add("overlay");
  document.querySelector(
    ".gamewon"
  ).innerHTML = `Game Won in ${minHand} mins ${secHand} secs your score was ${scoreCounter}`;
  restart.classList.remove("hidden");
}

restart.addEventListener("click", () => {
  window.location.reload();
});

function UpdateScore() {
  score.innerHTML = `Score:${scoreCounter}`;
}

console.log(localStorage);
// localStorage.setItem("name", "Mehul");
