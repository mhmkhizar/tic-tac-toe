// PLAYER FACTORY FUNCTION
const createPlayer = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;

  return { getName, getMark };
};

// GAME BOARD MODULE
const GameBoard = (() => {
  const createEmptyBoard = () => Array(9).fill(``);

  let boardState = createEmptyBoard();

  const getBoard = () => {
    return [...boardState];
  };

  const resetBoard = () => {
    boardState = createEmptyBoard();
  };

  const isBoardFull = () => {
    return boardState.every((cell) => cell !== ``);
  };

  const placeMark = (mark, index) => {
    if (typeof mark !== `string` || mark === ``) return false;
    if (typeof index !== `number` || isNaN(index)) return false;
    if (mark !== `X` && mark !== `O`) return false;
    if (index < 0 || index > 8) return false;
    if (boardState[index]) return false;

    boardState[index] = mark;
    return true;
  };

  return { getBoard, resetBoard, isBoardFull, placeMark };
})();

// GAME CONTROLLER MODULE
const GameController = (() => {
  const player1 = createPlayer(`Asad`, `X`);
  const player2 = createPlayer(`Samad`, `O`);
  let activePlayer;
  let isGameOver;

  const initializeGame = () => {
    GameBoard.resetBoard();
    activePlayer = player1;
    isGameOver = false;

    UiController.updateBoardDisplay();
    UiController.handleBoardClick();
    UiController.handleResetButtonClick();
    UiController.handleRestartButtonClick();
    UiController.showSetNamesModal();
  };

  const switchTurn = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
  };

  const hasWinner = () => {
    const boardState = GameBoard.getBoard();
    const WINNING_COMBINATIONS = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return WINNING_COMBINATIONS.some(([a, b, c]) => {
      const mark = boardState[a];
      return mark && mark === boardState[b] && mark === boardState[c];
    });
  };

  const playRound = (cellIndex) => {
    if (isGameOver) return;

    const currentMark = activePlayer.getMark();
    const isValidMove = GameBoard.placeMark(currentMark, cellIndex);

    if (!isValidMove) return;

    const winnerExists = hasWinner();
    const boardIsFull = GameBoard.isBoardFull();

    if (winnerExists) {
      isGameOver = true;
      UiController.showGameOverModal(`${activePlayer.getName()} wins. 🥳`);
      return;
    }

    if (boardIsFull) {
      isGameOver = true;
      UiController.showGameOverModal(`Ohho, it's a draw. 🤝`);
      return;
    }

    switchTurn();
  };

  return { initializeGame, playRound };
})();

// DISPLAY CONTROLLER MODULE
const UiController = (() => {
  const boardElement = document.querySelector(`.game-board`);
  const boardCells = boardElement.querySelectorAll(`.cell`);

  const gameOverModal = document.querySelector(`#gameOverModal`);
  const resultMessage = gameOverModal.querySelector(`#resultText`);
  const restartButton = gameOverModal.querySelector(`#restartButton`);

  const setNamesButton = document.querySelector(`#setNamesButton`);
  const resetButton = document.querySelector(`#resetButton`);

  const setNamesModal = document.querySelector(`#setNamesModal`);

  //heelo

  const showSetNamesModal = () => {
    setNamesButton.addEventListener(`click`, (e) => {
      setNamesModal.show();
    });
  };

  const showGameOverModal = (message) => {
    gameOverModal.showModal();
    resultMessage.textContent = message;
  };

  const handleBoardClick = () => {
    boardElement.addEventListener(`click`, (e) => {
      if (!e.target.classList.contains(`cell`)) return;

      const clickedCell = e.target;
      GameController.playRound(Number(clickedCell.dataset.index));
      updateBoardDisplay();
    });
  };

  const handleResetButtonClick = () => {
    resetButton.addEventListener(`click`, () => {
      GameController.initializeGame();
    });
  };

  const handleRestartButtonClick = () => {
    restartButton.addEventListener(`click`, () => {
      GameController.initializeGame();
      gameOverModal.close();
    });
  };

  const updateBoardDisplay = () => {
    const boardState = GameBoard.getBoard();
    boardCells.forEach((cell, index) => {
      cell.textContent = `${boardState[index]}`;
    });
  };

  return {
    updateBoardDisplay,
    handleBoardClick,
    handleResetButtonClick,
    handleRestartButtonClick,
    showGameOverModal,
    showSetNamesModal,
  };
})();

GameController.initializeGame();
