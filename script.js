const gameBoard = (() => {
  const EMPTY_BOARD = [``, ``, ``, ``, ``, ``, ``, ``, ``];
  let board = [...EMPTY_BOARD];

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
    board = [...EMPTY_BOARD];
  };

  return { get, addMark, reset };
})();

const playerFactory = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;

  return { getName, getMarker };
};

const gameController = (() => {
  const playerOne = playerFactory(`Asad`, `X`);
  const playerTwo = playerFactory(`Samad`, `O`);
  let currentPlayer;

  const init = () => {
    gameBoard.reset();
    currentPlayer = playerOne;
  };

  const playRound = (index) => {
    const isValidMove = gameBoard.addMark(currentPlayer.getMarker(), index);
    if (isValidMove) {
      switchTurn();
      console.log(gameBoard.get());
    } else {
      return console.log(`invalid move`);
    }
  };

  const switchTurn = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  };

  return { init, playRound };
})();

gameController.init();
gameController.playRound(0);
gameController.playRound(0);
gameController.playRound(1);
gameController.playRound(0);
