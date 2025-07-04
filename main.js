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

const gameController = (function () {
  const player1 = createPlayer(`Asad`, `X`);
  const player2 = createPlayer(`Samad`, `O`);

  let activePlayer;
  let isGameOver;

  const initializeGame = function () {
    gameBoard.resetBoard();
    activePlayer = player1;
    isGameOver = false;
    console.log(gameBoard.getBoard()); // -------- FVP
  };

  const switchPlayerTurn = function () {
    return (activePlayer = activePlayer === player1 ? player2 : player1);
  };

  const playRound = function (index) {
    if (isGameOver)
      return console.log("Game is over! Please start a new game.");

    const wasPlaced = gameBoard.placeMark(index, activePlayer.getMark());

    if (wasPlaced) {
      console.log(gameBoard.getBoard()); // -------- FVP
      const winner = checkWinner();
      if (winner) {
        isGameOver = true;
        winner === `Draw`
          ? console.log(`It's a draw.`)
          : console.log(`Winner is ${activePlayer.getName()} ${winner}`);
        return;
      } else switchPlayerTurn();
    } else {
      console.log("Invalid move. Try another spot.");
    }
  };

  const checkWinner = function () {
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
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        return board[a];
      }
    }

    if (gameBoard.isBoardFull()) {
      return `Draw`;
    }

    return null;
  };

  return { initializeGame, playRound, checkWinner };
})();

gameController.initializeGame();
gameController.playRound(0);
gameController.playRound(1);
gameController.playRound(2);
gameController.playRound(3);
gameController.playRound(4);
gameController.playRound(6);
gameController.playRound(5);
gameController.playRound(8);
gameController.playRound(7);
