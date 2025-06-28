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
