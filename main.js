const gameBoard = (function () {
  const EMPTY_BOARD = [``, ``, ``, ``, ``, ``, ``, ``, ``];

  let currentBoard = [...EMPTY_BOARD];

  const getBoard = () => [...currentBoard];

  const placeMark = (index, mark) => {
    if (index < 0 || index > 8) return false;
    if (currentBoard[index] !== ``) return false;
    if (mark !== `X` && mark !== `O`) return false;

    currentBoard[index] = mark;
    return true;
  };

  const isBoardFull = () => currentBoard.every((slot) => slot !== ``);

  const resetBoard = () => {
    currentBoard = [...EMPTY_BOARD];
  };

  return { getBoard, placeMark, isBoardFull, resetBoard };
})();

const createPlayer = function (name, mark) {
  if (typeof name !== `string` || name.trim() === ``) {
    console.warn(`Invalid name provided, using default name...`);
    name = `Player`;
  }
  if (mark !== `X` && mark !== `O`) {
    console.warn(`Invalid mark provided, using default mark...`);
    mark = `X`;
  }

  const playerName = name.trim();
  const playerMark = mark;

  const getName = () => playerName;
  const getMark = () => playerMark;

  return { getName, getMark };
};

const player1 = createPlayer(`Asad`, `X`);
const player2 = createPlayer(`Samad`, `O`);

const gameController = (function () {
  let currentTurn;

  const initializeGame = function () {
    gameBoard.resetBoard();
    currentTurn = player1.getMark();
  };

  const toggleTurn = function (lastMark) {
    return lastMark === `X` ? `O` : `X`;
  };

  const handleMove = function (index) {
    const wasPlaced = gameBoard.placeMark(index, currentTurn);
    if (wasPlaced) currentTurn = toggleTurn(currentTurn);
  };

  return { initializeGame, handleMove };
})();

gameController.initializeGame();
console.log(gameBoard.getBoard());
gameController.handleMove(9);
console.log(gameBoard.getBoard());
gameController.handleMove(8);
console.log(gameBoard.getBoard());
gameController.handleMove(7);
console.log(gameBoard.getBoard());
gameController.handleMove(9);
console.log(gameBoard.getBoard());
gameController.handleMove(6);
console.log(gameBoard.getBoard());
