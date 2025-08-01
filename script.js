const boardElement = document.querySelector(`.game-board`);
const boardCells = boardElement.querySelectorAll(`.cell`);
const setNamesButton = document.querySelector(`#setNamesButton`);
const resetButton = document.querySelector(`#resetButton`);
const gameOverModal = document.querySelector(`#gameOverModal`);
const resultMessage = gameOverModal.querySelector(`#resultText`);
const restartButton = gameOverModal.querySelector(`#restartButton`);
const playerNamesModal = document.querySelector(`#playerNamesModal`);
const namesModalForm = playerNamesModal.querySelector(`#namesModalForm`);
const name1Input = namesModalForm.querySelector(`#name1Input`);
const name2Input = namesModalForm.querySelector(`#name2Input`);
const player1NamePara = document.querySelector(`#player1NamePara`);
const player2NamePara = document.querySelector(`#player2NamePara`);

// PLAYER FACTORY FUNCTION
const createPlayer = (name, mark) => {
  let playerName = name;
  let playerMark = mark;

  const getName = () => playerName;
  const getMark = () => playerMark;
  const setName = (name) => {
    playerName = name;
  };

  return { getName, getMark, setName };
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
  const player1 = createPlayer(`Player: 1 (X)`, `X`);
  const player2 = createPlayer(`Player: 2 (O)`, `O`);
  let activePlayer;
  let isGameOver;

  const initializeGame = () => {
    GameBoard.resetBoard();
    activePlayer = player1;
    isGameOver = false;
    UiController.updatePlayerNames();
    UiController.updateBoardDisplay();
    UiController.clickListners();
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

  return {
    initializeGame,
    playRound,
    player1,
    player2,
  };
})();

// DISPLAY CONTROLLER MODULE
const UiController = (() => {
  const showGameOverModal = (message) => {
    gameOverModal.showModal();
    resultMessage.textContent = message;
  };

  const updatePlayerNames = () => {
    player1NamePara.textContent = GameController.player1.getName();
    player2NamePara.textContent = GameController.player2.getName();
  };

  const handleBoardClick = () => {
    boardElement.addEventListener(`click`, (e) => {
      if (!e.target.classList.contains(`cell`)) return;

      const clickedCell = e.target;
      GameController.playRound(Number(clickedCell.dataset.index));
      updateBoardDisplay();
    });
  };

  const handleSetNamesButtonClick = () => {
    setNamesButton.addEventListener(`click`, (e) => {
      name1Input.value = ``;
      name2Input.value = ``;
      playerNamesModal.showModal();
      namesModalForm.addEventListener(`submit`, (e) => {
        GameController.player1.setName(`${name1Input.value} (X)`);
        GameController.player2.setName(`${name2Input.value} (O)`);
        updatePlayerNames();
      });
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

  const clickListners = () => {
    handleBoardClick();
    handleSetNamesButtonClick();
    handleResetButtonClick();
    handleRestartButtonClick();
  };

  return {
    updateBoardDisplay,
    updatePlayerNames,
    showGameOverModal,
    clickListners,
  };
})();

GameController.initializeGame();
