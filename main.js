const gameboard = (function () {
  const EMPTY_BOARD = [``, ``, ``, ``, ``, ``, ``, ``, ``];

  let board = [...EMPTY_BOARD];

  const get = () => [...board];

  const mark = (index, mark) => {
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

  return { get, mark, isFull, reset };
})();

const playerFactory = (function () {
  function createPlayer(name, mark) {
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
  }
  return { createPlayer };
})();

const player1 = playerFactory.createPlayer(`Asad`, `X`);
const player2 = playerFactory.createPlayer(`Samad`, `O`);
