// PLAYER FACTORY FUNCTION
const createPlayer = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;

  return { getName, getMark };
};

// GAME BOARD MODULE
const GameBoard = (() => {
  const createEmptyBoard = () => Array(9).fill(``);

  let board = createEmptyBoard();

  const getBoard = () => {
    return [...board];
  };

  const resetBoard = () => {
    board = createEmptyBoard();
  };

  const isBoardFull = () => {
    return board.every((cell) => cell !== ``);
  };

  const placeMark = (mark, index) => {
    if (typeof mark !== `string` || mark === ``) return false;
    if (typeof index !== `number` || isNaN(index)) return false;
    if (mark !== `X` && mark !== `O`) return false;
    if (index < 0 || index > 8) return false;
    if (board[index]) return false;

    board[index] = mark;
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
  };

  const switchTurn = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
  };

  const hasWinner = () => {
    const board = GameBoard.getBoard();
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
      const mark = board[a];
      return mark && mark === board[b] && mark === board[c];
    });
  };

  const playRound = (cellIndex) => {
    if (isGameOver) {
      console.log(`Game over.`);
      return;
    }

    const currentMark = activePlayer.getMark();
    const isValidMove = GameBoard.placeMark(currentMark, cellIndex);

    if (!isValidMove) {
      console.log(`Invalid move`);
      return;
    }

    const winnerExists = hasWinner();
    const boardIsFull = GameBoard.isBoardFull();

    if (winnerExists) {
      isGameOver = true;
      console.log(`${activePlayer.getName()} wins.`);
      console.log(GameBoard.getBoard());
      return;
    }

    if (boardIsFull) {
      isGameOver = true;
      console.log(`It's a draw.`);
      console.log(GameBoard.getBoard());
      return;
    }

    switchTurn();
    console.log(GameBoard.getBoard());
  };

  return { initializeGame, playRound };
})();

// DISPLAY CONTROLLER MODULE
const DisplayController = (() => {
  const updateBoardDisplay = () => {
    const board = GameBoard.getBoard();
    const boardCells = document.querySelectorAll(`.game-board.grid > .cell`);

    boardCells.forEach((cell, index) => {
      cell.textContent = `${board[index]}`;
    });
  };

  return { updateBoardDisplay };
})();
