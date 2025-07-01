const gameBoard = (function () {
  const EMPTY_BOARD = [``, ``, ``, ``, ``, ``, ``, ``, ``];

  let board = [...EMPTY_BOARD];

  const getState = () => [...board];

  const addMark = (index, mark) => {
    if (index < 0 || index > 8) return false;
    if (board[index] !== ``) return false;
    if (mark !== `X` && mark !== `O`) return false;

    board[index] = mark;
    return true;
  };

  const isFull = () => board.every((slot) => slot !== ``);
  const reset = () => {
    board = [...EMPTY_BOARD];
  };

  return { getState, addMark, isFull, reset };
})();

const playerFactory = function (name, mark) {
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
  const player1 = playerFactory(`Asad`, `X`);
  const player2 = playerFactory(`Samad`, `O`);
  let turn = player1.getMark();

  const startGame = function () {
    gameBoard.reset();
  };

  const switchTurn = function (lastTurn) {
    return lastTurn === `X` ? (turn = `O`) : (turn = `X`);
  };

  const playRound = function (index) {
    gameBoard.addMark(index, turn);
    switchTurn(turn);
    console.log(checkWin());
  };

  const checkWin = function () {
    const board = gameBoard.getState();
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

    return winningCombos.some((combo) => {
      return combo.every(
        (index) => board[index] === `X` || board[index] === `O`
      );
    });
  };

  return { startGame, playRound, checkWin };
})();

gameController.startGame();
console.log(gameBoard.getState());
gameController.playRound(8);
console.log(gameBoard.getState());
gameController.playRound(0);
console.log(gameBoard.getState());
gameController.playRound(7);
console.log(gameBoard.getState());
gameController.playRound(1);
console.log(gameBoard.getState());
gameController.playRound(5);
console.log(gameBoard.getState());
gameController.playRound(2);
console.log(gameBoard.getState());
