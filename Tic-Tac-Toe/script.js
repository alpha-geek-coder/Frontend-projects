const boardSize = 3;

// Game Board module, setup the board
function GameBoard() {
  const board = [];

  for (let row = 0; row < boardSize; row++) {
    board[row] = [];
    for (let col = 0; col < boardSize; col++) {
      board[row][col] = Cell();
    }
  }

  const getBoard = () => board;

  const placeToken = (cellNumber, playerToken) => {
    const row = Math.floor(cellNumber / boardSize);
    const col = cellNumber % boardSize;
    if (board[row][col].getValue() !== -1) return;
    board[row][col].addToken(playerToken);
  };

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithCellValues);
  };

  return { getBoard, placeToken, printBoard };
}

function Cell() {
  let value = -1;

  const getValue = () => value;

  const addToken = (token) => {
    value = token;
  };
  return { getValue, addToken };
}
// Game Controller module

function GameController(playerOne = "Player One", playerTwo = "Player Two") {
  const gameBoard = GameBoard();
  const players = [
    {
      name: playerOne,
      token: "X",
    },
    {
      name: playerTwo,
      token: "O",
    },
  ];
  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    gameBoard.printBoard();
    console.log(`${activePlayer.name}'s [${activePlayer.token}] turn.`);
  };

  const checkWinner = () => {
    let board = gameBoard.getBoard();
    //  Check rows and columns
    for (let i = 0; i < boardSize; i++) {
      // Check Row win
      let rowWin = board[i][0].getValue() !== -1;
      for (let j = 1; j < boardSize; j++) {
        if (board[i][j].getValue() !== board[i][0].getValue()) rowWin = false;
      }
      if (rowWin) return board[i][0];

      // Check Column win
      let colWin = board[0][i].getValue() !== -1;
      for (let j = 1; j < boardSize; j++) {
        if (board[j][i].getValue() !== board[0][i].getValue()) colWin = false;
      }
      if (colWin) return board[0][i];
    }
    // Check main diagonal
    let diagWin = board[0][0].getValue() !== -1;
    for (let i = 1; i < boardSize; i++) {
      if (board[i][i].getValue() !== board[0][0].getValue()) diagWin = false;
    }
    if (diagWin) return board[0][0];

    // Check anti-diagonal
    let antiDiagWin = board[0][boardSize - 1].getValue() !== -1;
    for (let i = 1; i < boardSize; i++) {
      if (
        board[i][boardSize - 1 - i].getValue() !==
        board[0][boardSize - 1].getValue()
      )
        antiDiagWin = false;
    }
    if (antiDiagWin) return board[0][boardSize - 1];

    // No winner
    return null;
  };

  const playRound = (cellNumber) => {
    console.log(
      `Placing ${getActivePlayer().name}'s token into cell ${cellNumber}...`
    );
    gameBoard.placeToken(cellNumber, getActivePlayer().token);
    const result = checkWinner();
    switchPlayerTurn();
    printNewRound();

    return result;
  };

  printNewRound();

  return { getActivePlayer, playRound, getBoard: gameBoard.getBoard };
}

function ScreenController() {
  const game = GameController();
  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");
  const dialog = document.querySelector("dialog");
  const newGameButton = document.querySelector(".new-game");
  const winMsg = document.querySelector(".win-msg");

  const updateScreen = () => {
    // Clear Screen
    boardDiv.textContent = "";

    // get the newest version of the board and player turn
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    // Display player's turn
    playerTurnDiv.textContent = `${activePlayer.name}'s  [${activePlayer.token}] turn...`;

    // Render board squares
    let cellNumber = 0;
    board.forEach((row) => {
      row.forEach((cell) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");

        // Add data attributes to identify each cell
        cellButton.dataset.cellNumber = cellNumber++;
        cellButton.textContent = cell.getValue() === -1 ? "" : cell.getValue();
        boardDiv.appendChild(cellButton);
      });
    });
  };

  // Add event handler for the board
  function clickHandlerBoard(e) {
    const selectedColumn = e.target.dataset.cellNumber;

    // Make sure the user clicked a column and no the gaps in between
    if (!selectedColumn) return;
    const result = game.playRound(selectedColumn);

    // Render selection on screen
    updateScreen();

    if (result) {
      winMsg.textContent = `${game.getActivePlayer().name} WINS!!! 🏆🏆🏆`;
      dialog.showModal();
    }
  }

  boardDiv.addEventListener("click", clickHandlerBoard);

  // Add event handler for new game
  function newGameHandler(e) {
      e.preventDefault();
      ScreenController();
    dialog.close();
    
  }

  newGameButton.addEventListener("click", newGameHandler);

  // Initial Render
  updateScreen();
}

ScreenController();
