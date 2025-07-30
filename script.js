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
  const getMark = () => marker;

  return { getName, getMark };
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
    const isValidMove = gameBoard.addMark(currentPlayer.getMark(), index);

    if (isValidMove) {
      const winner = checkWin();
      if (winner) {
        console.log(`${currentPlayer.getName()} wins.`);
      } else {
        switchTurn();
        console.log(gameBoard.get());
      }
    } else {
      return console.log(`invalid move`);
    }
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

    return WINNING_COMBOS.some(
      ([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c]
    );
  };

  return { init, playRound };
})();

gameController.init();
gameController.playRound(0);
gameController.playRound(2);
gameController.playRound(1);
gameController.playRound(3);
gameController.playRound(5);
gameController.playRound(4);
gameController.playRound(6);
gameController.playRound(7);
gameController.playRound(8);
