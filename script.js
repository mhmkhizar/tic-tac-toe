const gameBoard = (() => {
  const EMPTY_BOARD = [``, ``, ``, ``, ``, ``, ``, ``, ``];

  let board = [...EMPTY_BOARD];

  const reset = () => {
    board = [...EMPTY_BOARD];
  };

  return { reset };
})();

const playerFactory = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;

  return { getName, getMarker };
};

const gameController = (() => {
  const playerOne = playerFactory(`Asad`, `X`);
  const playerTwo = playerFactory(`Samad`, `O`);

  const init = () => {
    gameBoard.reset();
    const currentPlayer = playerOne;
  };

  const playRound = () => {};

  return { init, playRound };
})();

gameController.init();
