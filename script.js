// GAME_BOARD_OBJECT

const gameBoard = (() => {
  const createEmptyBoard = () => Array(9).fill(``);
  let board = createEmptyBoard();

  const get = () => [...board];

  const addMark = (mark, index) => {
    if (typeof mark !== `string` || mark === ``) return false;
    if (typeof index !== "number" || isNaN(index)) return false;
    if (mark !== `X` && mark !== `O`) return false;
    if (index < 0 || index > 8) return false;
    if (board[index]) return false;

    board[index] = mark;
    return true;
  };

  const reset = () => {
    board = createEmptyBoard();
  };

  const isFull = () => board.every((slot) => slot !== ``);

  return { get, addMark, reset, isFull };
})();

// PLAYERS_OBJECT

const playerFactory = (name, marker) => {
  const getName = () => name;
  const getMark = () => marker;

  return { getName, getMark };
};

// GAME_CONTROLLER_OBJECT

const gameController = (() => {
  const playerOne = playerFactory(`Asad`, `X`);
  const playerTwo = playerFactory(`Samad`, `O`);
  let currentPlayer;
  let gameOver;

  const init = () => {
    gameBoard.reset();
    currentPlayer = playerOne;
    gameOver = false;
  };

  const switchTurn = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  };

  const checkWin = () => {
    const board = gameBoard.get();
    const WINNING_COMBOS = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return WINNING_COMBOS.some(([a, b, c]) => {
      const mark = board[a];
      return mark && mark === board[b] && mark === board[c];
    });
  };

  const playRound = (index) => {
    if (gameOver) {
      console.log(`Game over.`);
      return;
    }

    const mark = currentPlayer.getMark();
    const isValidMove = gameBoard.addMark(mark, index);

    if (!isValidMove) {
      console.log(`invalid move`);
      return;
    }

    const isWinner = checkWin();
    const isBoardFull = gameBoard.isFull();

    if (isWinner) {
      gameOver = true;
      console.log(`${currentPlayer.getName()} wins.`);
      console.log(gameBoard.get());
      return;
    }

    if (isBoardFull) {
      gameOver = true;
      console.log(`It's a draw.`);
      console.log(gameBoard.get());
      return;
    }

    switchTurn();
    console.log(gameBoard.get());
  };

  return { init, playRound };
})();

// DISPLAY_CONTROLLER_OBJECT

const displayController = (() => {})();

gameController.init();
gameController.playRound(0);
gameController.playRound(8);
gameController.playRound(1);
gameController.playRound(7);
gameController.playRound(5);
gameController.playRound(6);
