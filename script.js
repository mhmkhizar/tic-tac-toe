const gameBoard = (() => {
  const EMPTY_BOARD = [``, ``, ``, ``, ``, ``, ``, ``, ``];
  let board = [...EMPTY_BOARD];

  const get = () => [...board];

  const addMark = (mark, index) => {
    if (typeof mark !== `string` || mark === ``) return false;
    if (typeof index !== "number" || isNaN(index)) return false;
    if (mark !== `X` && mark !== `O`) return false;
    if (index < 0 || index > 8) return false;

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

  const init = () => {
    gameBoard.reset();
    const currentPlayer = playerOne;
  };

  const playRound = () => {};

  return { init, playRound };
})();

gameBoard.addMark(`X`, 0);
console.log(gameBoard.get());
