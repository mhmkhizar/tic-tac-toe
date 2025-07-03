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
    checkWinner();
  };

  const checkWinner = function () {
    let winner = null;
    const board = gameBoard.getBoard();
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
      if (board[a] && board[a] === board[b] && board[b] === board[c])
        winner = board[a];
    }

    if ((gameBoard.isBoardFull() && !winner) || winner) {
      if (winner) console.log(`Winner is ${winner}.`);
      else console.log(`It's a Draw.`);
      gameBoard.resetBoard();
    }
  };

  return { initializeGame, handleMove, checkWinner };
})();
