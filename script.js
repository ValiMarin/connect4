const board = document.getElementById("board");
const columnSelector = document.getElementById("columnSelector");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const gameOverPanel = document.getElementById("gameOverPanel");
const winner = document.getElementById("winner");

const cells = [];
const buttons = [];

let gameMatrix;

let turn = "red";

function newGame() {
  gameOverPanel.classList.add("hidden");

  turn = "red";

  cells.forEach((cell) => {
    cell.remove();
  });

  cells.length = 0;

  buttons.forEach((obj) => {
    obj.btn.remove();
  });

  buttons.length = 0;

  for (let i = 0; i < 42; ++i) {
    const div = document.createElement("div");
    div.classList.add("grid-item", "emptyCell");
    board.appendChild(div);
    cells.push(div);
  }

  for (let i = 0; i < 7; ++i) {
    const button = document.createElement("button");
    button.classList.add("btn", "btn-primary");
    columnSelector.appendChild(button);

    buttons.push({
      btn: button,
      ref: i + 35,
      row: 5,
      col: i,
    });

    button.addEventListener("click", (e) => {
      nextMove(buttons[i].col);
    });
  }

  gameMatrix = Array.from({ length: 6 }, () => Array(7).fill(null));
}

function gameOver() {
  turn === "red"
    ? (winner.textContent = player1.value + " won!")
    : (winner.textContent = player2.value + " won!");

  gameOverPanel.classList.remove("hidden");

  setTimeout(() => {
    newGame();
  }, 2000);
}

function boardCheck(row, col) {
  let streak4, min, max;

  //horizontal check
  (min = col - 3), (max = col + 3);
  streak4 = 0;

  while (min < 0) ++min;

  while (max > 6) --max;

  for (let i = min; i <= max; ++i) {
    if (
      gameMatrix[row][i] !== null &&
      gameMatrix[row][i] === gameMatrix[row][col]
    ) {
      ++streak4;

      if (streak4 === 4) {
        gameOver();
        return;
      }
    } else streak4 = 0;
  }

  //vertical check
  (min = row - 3), (max = row + 3);
  streak4 = 0;

  while (min < 0) ++min;

  while (max > 5) --max;

  for (let i = min; i <= max; ++i) {
    if (
      gameMatrix[i][col] !== null &&
      gameMatrix[i][col] === gameMatrix[row][col]
    ) {
      ++streak4;

      if (streak4 === 4) {
        gameOver();
        return;
      }
    } else streak4 = 0;
  }

  //main diagonal check
  min = {
    minRow: row - 3,
    minCol: col - 3,
  };
  max = {
    maxRow: row + 3,
    maxCol: col + 3,
  };
  streak4 = 0;

  while (min.minRow < 0 || min.minCol < 0) {
    ++min.minRow;
    ++min.minCol;
  }

  while (max.maxRow > 5 || max.maxCol > 6) {
    --max.maxRow;
    --max.maxCol;
  }

  for (let i = min.minRow; i <= max.maxRow; ++i) {
    if (
      gameMatrix[i][min.minCol] !== null &&
      gameMatrix[i][min.minCol] === gameMatrix[row][col]
    ) {
      ++streak4;

      if (streak4 === 4) {
        gameOver();
        return;
      }
    } else streak4 = 0;

    ++min.minCol;
  }

  //secondary diagonal check
  (min.minRow = row - 3),
    (min.minCol = col + 3),
    (max.maxRow = row + 3),
    (max.maxCol = col - 3),
    (streak4 = 0);

  while (min.minRow < 0 || min.minCol > 6) {
    ++min.minRow;
    --min.minCol;
  }

  while (max.maxRow > 5 || max.maxCol < 0) {
    --max.maxRow;
    ++max.maxCol;
  }

  for (let i = min.minRow; i <= max.maxRow; ++i) {
    if (
      gameMatrix[i][min.minCol] !== null &&
      gameMatrix[i][min.minCol] === gameMatrix[row][col]
    ) {
      ++streak4;

      if (streak4 === 4) {
        gameOver();
        return;
      }
    } else streak4 = 0;

    --min.minCol;
  }
}

function nextMove(col) {
  if (buttons[col].ref >= 0) {
    cells[buttons[col].ref].classList.replace("emptyCell", turn);
    gameMatrix[buttons[col].row][col] = turn;
    boardCheck(buttons[col].row, col);
    buttons[col].ref -= 7;
    --buttons[col].row;
    turn = turn === "yellow" ? "red" : "yellow";
  }
}

newGame();
