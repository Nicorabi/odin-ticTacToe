document.addEventListener("DOMContentLoaded", function () {
  const board = document.querySelectorAll(".board");
  const startButton = document.getElementById("btn");
  const header = document.getElementById("header");
  let currentPlayer = "X";
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  let gameActive = true;

  function checkWin() {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        gameBoard[a] &&
        gameBoard[a] === gameBoard[b] &&
        gameBoard[b] === gameBoard[c]
      ) {
        return gameBoard[a];
      }
    }

    return null;
  }

  function handleMove(index) {
    if (gameBoard[index] === "" && gameActive) {
      gameBoard[index] = currentPlayer;
      board[index].textContent = currentPlayer;
      const winner = checkWin();
      if (winner) {
        header.textContent =
          winner === "X" ? "Player 1 wins!" : "Player 2 wins!";
        gameActive = false;
      } else if (!gameBoard.includes("")) {
        header.textContent = "It's a draw!";
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }
  }

  function startNewGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    header.textContent = "Tic Tac Toe";
    board.forEach((cell) => (cell.textContent = ""));
    currentPlayer = "X";
  }

  board.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      handleMove(index);
    });
  });

  startButton.addEventListener("click", startNewGame);
});
