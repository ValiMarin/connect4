const board = document.getElementById("board");
const columnSelector = document.getElementById("columnSelector");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const gameOverPanel = document.getElementById("gameOverPanel");
const winner = document.getElementById("winner");

const buttons = [];

let gameMatrix;

let turn = "red";

function newGame() {
  gameOverPanel.classList.add("hidden");

  turn = "red";

  if (gameMatrix) {
    gameMatrix.forEach((row) =>
      row.forEach((cellObj) => {
        cellObj.cell?.remove();
      })
    );
  }

  gameMatrix = Array.from({ length: 6 }, () =>
    Array.from({ length: 7 }, () => ({
      cell: null,
      value: "emptyCell",
    }))
  );

  buttons.forEach((obj) => {
    obj.btn.remove();
  });

  buttons.length = 0;

  for (let i = 0; i < 6; ++i) {
    for (let j = 0; j < 7; ++j) {
      const div = document.createElement("div");
      div.classList.add("grid-item", "emptyCell");
      board.appendChild(div);

      gameMatrix[i][j].cell = div;
    }
  }

  for (let i = 0; i < 7; ++i) {
    const button = document.createElement("button");
    button.id = i;
    button.classList.add("btn", "btn-primary");
    columnSelector.appendChild(button);

    buttons.push({
      btn: button,
      ref: 5,
    });

    button.addEventListener("click", (e) => {
      nextMove(e.target.id);
    });
  }
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

function checkDirection(row, col, rowOffset, colOffset) {
  let streak = 0;

  for (let i = -3; i <= 3; ++i) {
    const currentRowPos = row + i * rowOffset;
    const currentColPos = col + i * colOffset;

    if (
      currentRowPos >= 0 &&
      currentRowPos <= 5 &&
      currentColPos >= 0 &&
      currentColPos <= 6 &&
      gameMatrix[currentRowPos][currentColPos].value ===
        gameMatrix[row][col].value
    ) {
      ++streak;
      if (streak === 4) return true;
    } else {
      streak = 0;
    }
  }

  return false;
}

function boardCheck(row, col) {
  if (
    checkDirection(row, col, 0, 1) ||
    checkDirection(row, col, 1, 0) ||
    checkDirection(row, col, 1, 1) ||
    checkDirection(row, col, 1, -1)
  ) {
    gameOver();
  }
}

function nextMove(id) {
  const col = Number(id);

  if (buttons[col].ref >= 0) {
    gameMatrix[buttons[col].ref][col].cell.classList.replace("emptyCell", turn);
    gameMatrix[buttons[col].ref][col].value = turn;
    boardCheck(buttons[col].ref, col);
    --buttons[col].ref;
    turn = turn === "yellow" ? "red" : "yellow";
  }
}

newGame();
