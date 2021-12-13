const boxes = Array.from(document.querySelectorAll(".board__box"));
const settingsBar = document.querySelector(".settingsbar");
const turnText = document.querySelector(".turn");
const oScoreEl = document.querySelector(".o-score");
const xScoreEl = document.querySelector(".x-score");
const btnReset = document.querySelector(".reset");
const winningMessageEl = document.querySelector(".winning-message");
const btnPlayerOne = document.querySelector(".btn-player-1");
const btnPlayerTwo = document.querySelector(".btn-player-2");
let boxesSelected = [];
let currentPlayer = "X";
let mode = 1;
let winner = false;
let xChecked = [];
let oChecked = [];
let xScore = 0;
let oScore = 0;

const clearBoard = function () {
  xScore = 0;
  oScore = 0;
  winner = false;
  xChecked = [];
  oChecked = [];
  boxesSelected = [];
  turnText.textContent = "Turn: X";
  toggleMessage("");
  winningMessageEl.classList.add("none");
  btnReset.classList.add("down");
  btnReset.classList.add("none");
  boxes.forEach((box) => {
    box.classList.remove("green");
    box.innerHTML = "";
  });
  xScoreEl.textContent = `x: ${xScore}`;
  oScoreEl.textContent = `o: ${oScore}`;
  currentPlayer = "X";
};

btnPlayerOne.addEventListener("click", () => {
  mode = 1;
  btnPlayerOne.classList.add("green");
  btnPlayerTwo.classList.remove("green");
  clearBoard();
});
btnPlayerTwo.addEventListener("click", () => {
  mode = 2;
  btnPlayerTwo.classList.add("green");
  btnPlayerOne.classList.remove("green");
  clearBoard();
});

const toggleMessage = function (message) {
  winningMessageEl.textContent = message;
  winningMessageEl.classList.toggle("none");
};

btnReset.addEventListener("click", () => {
  winner = false;
  xChecked = [];
  oChecked = [];
  boxesSelected = [];
  toggleMessage("");
  btnReset.classList.add("down");
  btnReset.classList.add("none");
  boxes.forEach((box) => {
    box.classList.remove("green");
    box.innerHTML = "";
  });

  if (mode == 1 && currentPlayer == "O") {
    playerOneModeBot();
  }
});

const handleScore = function () {
  if (currentPlayer === "X") {
    xScore++;
  } else {
    oScore++;
  }

  xScoreEl.textContent = `x: ${xScore}`;
  oScoreEl.textContent = `o: ${oScore}`;
};

const switchPlayer = function () {
  if (currentPlayer === "X") {
    currentPlayer = "O";
    turnText.textContent = "Turn: O";
  } else {
    currentPlayer = "X";
    turnText.textContent = "Turn: X";
  }
};

const renderBoxCheck = function (boxElement) {
  boxElement.innerHTML = `<span class="board__check">${currentPlayer}</span>`;
};

const renderWin = function () {
  toggleMessage(`${currentPlayer} Won!`);
  handleScore();
  btnReset.classList.remove("none");
  btnReset.classList.remove("down");
};

const checkWin = function () {
  const winningCombos = [
    ["0", "1", "2"],
    ["0", "4", "8"],
    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["2", "4", "6"],
    ["3", "4", "5"],
    ["6", "7", "8"],
  ];
  const playersNumsChecked = [xChecked, oChecked];
  winningCombos.forEach((combo) => {
    const [num1, num2, num3] = combo;
    playersNumsChecked.forEach((player) => {
      if (
        player.includes(num1) &&
        player.includes(num2) &&
        player.includes(num3)
      ) {
        [
          document.querySelector(`[data-box-num='${num1}']`),
          document.querySelector(`[data-box-num='${num2}']`),
          document.querySelector(`[data-box-num='${num3}']`),
        ].forEach((num) => {
          num.classList.add("green");
        });
        winner = true;

        document.querySelector(`[data-box-num='${num2}']`);
        document.querySelector(`[data-box-num='${num3}']`);
        renderWin();
      }
    });
  });
};

const checkDraw = function () {
  if (boxes.every((box) => box.firstChild)) {
    console.log("draw");
    toggleMessage("Draw");
    btnReset.classList.remove("none");
    btnReset.classList.remove("down");
  }
};

function playerOneModeBot() {
  const aboutToBeWins = [
    // Third number is the number the player needs to win
    [0, 1, 2],
    [1, 2, 0],
    [0, 2, 1],
    [0, 6, 3],
    [3, 6, 0],
    [0, 3, 6],
    [0, 4, 8],
    [4, 3, 5],
    [4, 7, 1],
    [5, 8, 2],
    [4, 5, 3],
    [0, 4, 8],
    [2, 4, 6],
    [4, 6, 2],
    [4, 8, 0],
    [0, 8, 4],
    [6, 2, 4],
    [3, 5, 4],
    [6, 8, 7],
    [7, 8, 6],
    [6, 7, 8],
    [1, 7, 4],
    [2, 8, 5],
    [1, 4, 7],
    [2, 5, 8],
  ];
  const length = Array.from(document.querySelectorAll(".board__box")).filter(
    (box) => box.firstChild
  ).length;
  console.log(length, "P");
  console.log(xChecked);

  const winningCombo = aboutToBeWins.find((c) => {
    return (
      oChecked.includes(`${c[0]}`) &&
      oChecked.includes(`${c[1]}`) &&
      !xChecked.includes(`${c[2]}`) &&
      !oChecked.includes(`${c[2]}`)
    );
  });

  if (winningCombo) {
    const box = document.querySelector(`[data-box-num='${winningCombo[2]}']`);
    console.log(box, "pokjkokjjdkdk");
    box.click();
    console.log(box, boxesSelected, "A");
  }
  if (!winningCombo) {
    const combo = aboutToBeWins.find((c) => {
      return (
        xChecked.includes(`${c[0]}`) &&
        xChecked.includes(`${c[1]}`) &&
        !xChecked.includes(`${c[2]}`) &&
        !oChecked.includes(`${c[2]}`)
      );
    });
    console.log(combo, "LLLL");
    if (combo) {
      const box = document.querySelector(`[data-box-num='${combo[2]}']`);
      console.log(box, "pokjkokjjdkdk");
      box.click();
      console.log(box, boxesSelected, "A");
    }
  }

  if (
    Array.from(document.querySelectorAll(".board__box")).filter(
      (box) => box.firstChild
    ).length == length
  ) {
    console.log("hi");
    let number = Math.floor(Math.random() * 9);
    while (boxesSelected.includes(`${number}`) && boxesSelected.length < 9) {
      number = Math.floor(Math.random() * 9);
    }
    const box = document.querySelector(`[data-box-num='${number}']`);
    console.log(box, boxesSelected, "B");
    box.click();
  }
}

const handleBoxClick = function (e) {
  const boxNum = e.target.dataset.boxNum;

  if (!boxesSelected.includes(boxNum) && !winner) {
    boxesSelected.push(boxNum);

    if (currentPlayer === "X") {
      xChecked.push(e.target.dataset.boxNum);
    }
    if (currentPlayer === "O") {
      oChecked.push(e.target.dataset.boxNum);
    }

    renderBoxCheck(e.target);
    checkWin();
    checkDraw();
    switchPlayer();
    console.log(currentPlayer, e.target.dataset.boxNum, mode);
    if (currentPlayer == "O" && mode == 1) {
      console.log("bot");
      playerOneModeBot();
    }
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", (e) => {
    handleBoxClick(e);
  });
});
