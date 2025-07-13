const gameBoard = (function () {
  const EMPTY_BOARD = [``, ``, ``, ``, ``, ``, ``, ``, ``];
  let currentBoard = [...EMPTY_BOARD];

  const getBoard = () => [...currentBoard];
  const isBoardFull = () => currentBoard.every((slot) => slot !== ``);
  const resetBoard = () => (currentBoard = [...EMPTY_BOARD]);

  const placeMark = (index, mark) => {
    if (typeof index !== `number` || index < 0 || index > 8) return false;
    if (typeof mark !== `string`) return false;
    const upperMark = mark.toUpperCase();
    if (upperMark !== `X` && upperMark !== `O`) return false;
    if (currentBoard[index] !== ``) return false;

    currentBoard[index] = upperMark;
    return true;
  };

  return { getBoard, placeMark, isBoardFull, resetBoard };
})();

const playerFactory = function (name, mark) {
  if (typeof name !== `string` || name.trim() === ``)
    return console.warn(`Invalid name`);
  if (typeof mark !== `string`) return console.warn(`Invalid mark`);
  const upperMark = mark.toUpperCase();
  if (upperMark !== `X` && upperMark !== `O`)
    return console.warn(`Invalid mark`);

  const playerName = name;
  const playerMark = mark;

  const getName = () => playerName;
  const getMark = () => playerMark;

  return { getName, getMark };
};

const gameController = (function () {
  const playerOne = playerFactory(`Saul Goodman`, `X`);
  const playerTwo = playerFactory(`Damon Salvatore`, `O`);
  let activePlayer;
  let isGameOver;

  const initializeGame = () => {
    gameBoard.resetBoard();
    activePlayer = playerOne;
    isGameOver = false;
    displayController.init();
    console.log(
      `Game is started. Active player is ${activePlayer.getName()} (Mark: "${activePlayer.getMark()}")`
    );
  };

  const playRound = (index) => {
    if (isGameOver)
      return console.log(`Game is over, please start a new game.`);

    const wasPlaced = gameBoard.placeMark(index, activePlayer.getMark());
    if (wasPlaced) {
      console.log(gameBoard.getBoard());
      const winner = checkWinner();
      if (winner) {
        isGameOver = true;
        winner === `Draw`
          ? console.log(`It's a draw`)
          : console.log(
              `The winner is ${activePlayer.getName()}'s "${activePlayer.getMark()}"`
            );
        return;
      } else switchPlayerTurn();
    } else {
      return console.log(`Invalid spot.`);
    }
  };

  const switchPlayerTurn = () => {
    return (activePlayer = activePlayer === playerOne ? playerTwo : playerOne);
  };

  const checkWinner = () => {
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
      } else if (gameBoard.isBoardFull()) return `Draw`;
    }

    return null;
  };

  return { initializeGame, playRound };
})();

const displayController = (function () {
  const domBoard = document.querySelector(`.game-board`);
  const domBoardCells = domBoard.querySelectorAll(`.cell`);

  const init = () => {
    domBoard.addEventListener(`click`, handleCellClick);
    updateDom();
  };

  const updateDom = () => {
    const board = gameBoard.getBoard();
    for (const [i, cell] of board.entries()) {
      domBoardCells[i].textContent = cell;
    }
  };

  function handleCellClick(e) {
    if (!e.target.classList.contains(`cell`)) return;
    const cell = e.target;
    const index = [...domBoardCells].indexOf(cell);
    gameController.playRound(index);
    updateDom();
  }
  return { init };
})();

gameController.initializeGame();
// gameController.playRound(0);
// gameController.playRound(1);
// gameController.playRound(2);
// gameController.playRound(3);
// gameController.playRound(4);
// gameController.playRound(6);
// gameController.playRound(5);
// gameController.playRound(8);
// gameController.playRound(7);
