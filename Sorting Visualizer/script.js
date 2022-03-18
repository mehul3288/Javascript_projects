var arr = [];
const grid = document.querySelector(".grid");
var btn = document.querySelector(".btn");
var rowArr = [];
var randomNum = 0;

function gridBuilder(rows) {
  for (let i = 0; i < rows; i++) {
    var row = document.createElement("div");
    row.classList.add("row");
    randomNum = Math.round(randomNumber(1, 100));
    row.style.width = randomNum * 10 + "px";
    row.setAttribute("data", randomNum);
    rowArr.push(row);
    grid.appendChild(row);
    row.innerHTML = randomNum;
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// function randomNumberArrayGenerator(len, arr) {
//   for (let i = 0; i < len; i++) {
//     arr[i] = Math.round(randomNumber(1, 100));
//   }
// }

// randomNumberArrayGenerator(60, arr);
gridBuilder(60);

function test(flag) {
  if (!flag) {
    setTimeout(function () {
      test(true);
    }, 2000);

    return;
  }
}

function bubbleSort(varArr) {
  for (let i = 0; i < varArr.length - 1; i++) {
    setTimeout(function timer() {
      for (let j = 0; j < varArr.length - i - 1; j++) {
        if (
          parseInt(varArr[j].getAttribute("data")) >
          parseInt(varArr[j + 1].getAttribute("data"))
        ) {
          temp = varArr[j];
          varArr[j] = varArr[j + 1];
          varArr[j + 1] = temp;
          // varArr[j].classList.add("currentSelected");
          // varArr[j + 1].classList.add("currentSelected");
          grid.innerHTML = "";
          rowArr.forEach((element) => {
            grid.append(element);
          });
          // setTimeout(function timer() {
          //   varArr[j].classList.remove("currentSelected");
          //   varArr[j + 1].classList.remove("currentSelected");
          // }, j * 100);
        }
      }
    }, i * 100);
  }
}

btn.addEventListener("click", () => {
  btn.classList.add("disabled");
  bubbleSort(rowArr);
});

function insertionSort(arr, n) {
  let i, key, j;
  for (i = 1; i < n; i++) {
    key = arr[i];
    j = i - 1;

    /* Move elements of arr[0..i-1], that are 
        greater than key, to one position ahead 
        of their current position */
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
}
