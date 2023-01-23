const cells = document.querySelectorAll(".cell");
const playersTokenDisplay = document.querySelector("h2 span");
const resetBtn = document.querySelector("button");
const playerPointsDisplay = document.querySelector(".player-score");
const botPointsDisplay = document.querySelector(".bot-score");

const xToken = '<i class="fa-solid fa-x"></i>';
const circleToken = '<i class="fa-solid fa-o"></i>';
let playersToken;
let botsToken;
let isGameActive = true;
let playerPoints = 0;
let botPoints = 0;

let isClickable = true;

document.querySelector(".game-content").addEventListener(
  "click",
  (e) => {
    if (!isClickable) {
      e.stopPropagation();
      e.preventDefault();
    }
  },
  true
);

const checkForWin = (side) => {
  const winningConditions = [
    [cells[0], cells[1], cells[2]],
    [cells[3], cells[4], cells[5]],
    [cells[6], cells[7], cells[8]],
    [cells[0], cells[3], cells[6]],
    [cells[1], cells[4], cells[7]],
    [cells[2], cells[5], cells[8]],
    [cells[0], cells[4], cells[8]],
    [cells[2], cells[4], cells[6]],
  ];

  for (i = 0; i < winningConditions.length; i++) {
    if (winningConditions[i].every((cell) => cell.classList.contains(side))) {
      winningConditions[i].forEach((cell) => cell.classList.add("won"));
      handlePoints(side);
      isGameActive = false;
      setTimeout(() => {
        clearRound();
      }, 2000);
      break;
    }
  }
};

const handlePoints = (side) => {
  if (side === "player") {
    playerPoints++;
  } else if (side === "bot") {
    botPoints++;
  }
  playerPointsDisplay.innerHTML = playerPoints;
  botPointsDisplay.innerHTML = botPoints;
};

const handleCellClick = (clickedCellEl) => {
  const clickedCell =
    cells[clickedCellEl.target.getAttribute("data-cell-index")];
  if (clickedCell.classList.contains("taken")) {
    alert("You can't play there!");
  } else if (!isGameActive) {
    alert("Round is done!");
  } else {
    clickedCell.classList.add("taken", "player");
    clickedCell.innerHTML = playersToken;
    isClickable = false;
    checkForWin("player");
    botMove();
  }
};

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

const assingTokens = () => {
  playersToken = Math.random() - 0.5 > 0 ? xToken : circleToken;
  playersTokenDisplay.innerHTML = playersToken;
  botsToken = playersToken == xToken ? circleToken : xToken;
};

const botMove = () => {
  const availableCells = document.querySelectorAll(".cell:not(.taken)");
  setTimeout(() => {
    if (isGameActive) {
      const chosenCell =
        availableCells[Math.floor(Math.random() * availableCells.length)];
      chosenCell.classList.add("taken", "bot");
      chosenCell.innerHTML = botsToken;
      checkForWin("bot");
      isClickable = true;
    }
  }, 1000);
};

const clearRound = () => {
  cells.forEach((cell) => {
    cell.classList.remove("taken", "player", "bot", "won");
    cell.innerHTML = "";
  });
  isClickable = true;
  isGameActive = true;
};

resetBtn.addEventListener("click", () => {
  clearRound();
  playerPoints = 0;
  botPoints = 0;
  handlePoints();
});

assingTokens();
