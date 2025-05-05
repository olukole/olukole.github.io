/* Game State Variables */
let currentPlayer = "X"; // Tracks current player's symbol (X or O)
let player1Name = "Player 1"; // Name of player using X
let player2Name = "Player 2"; // Name of player using O
let currentPlayerName = player1Name; // Tracks current player's name
let gameState = ["", "", "", "", "", "", "", "", ""]; // Array representing the 9 cells
let gameActive = true; // Tracks if game is in progress
let gameCount = 1; // Counts total games played
let gameHistory = []; // Stores results of last 5 games

/* Winning Combinations Array */
const winningCombinations = [
  [0, 1, 2], //Rows
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], //Columns
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], //Diagonals
  [2, 4, 6],
];

/* Event Listeners */
// Add click handlers to all cells
document.querySelectorAll(".cell").forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

/* Main Game Logic - Handles Player Moves */
function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = parseInt(cell.getAttribute("data-index"));

  // Ignore click if cell is filled or game is over
  if (gameState[cellIndex] !== "" || !gameActive) return;

  // Update cell with player's mark
  gameState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer === "X" ? "x-mark" : "o-mark");

  // Check for win condition
  if (checkWin()) {
    const winStatus = `${currentPlayerName} Wins!`;
    document.querySelector(".status").textContent = winStatus;
    updateGameHistory(currentPlayerName);
    gameActive = false;
    return;
  }

  // Check for draw condition
  if (checkDraw()) {
    document.querySelector(".status").textContent = "Game Draw!";
    updateGameHistory("Draw");
    gameActive = false;
    return;
  }

  // Switch to next player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  currentPlayerName =
    currentPlayerName === player1Name ? player2Name : player1Name;
  document.querySelector(
    ".status"
  ).textContent = `Current Player: ${currentPlayerName}`;
}

/* Win Condition Check */
function checkWin() {
  // Check if any winning combination is complete
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return gameState[index] === currentPlayer;
    });
  });
}

/* Draw Condition Check */
function checkDraw() {
  // Check if all cells are filled
  return gameState.every((cell) => cell !== "");
}

/* Game History Update */
function updateGameHistory(winner) {
  // Add new game result to history
  gameHistory.unshift({
    gameNumber: gameCount,
    winner: winner,
  });

  // Keep only last 5 games
  if (gameHistory.length > 5) {
    gameHistory.pop();
  }

  // Update score table display
  const scoreHistory = document.getElementById("score-history");
  scoreHistory.innerHTML = ""; // Clear current history

  // Add each game to the table
  gameHistory.forEach((game) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>Game ${game.gameNumber}</td>
      <td>${game.winner}</td>
    `;
    scoreHistory.appendChild(row);
  });
}

/* Game Reset Function */
function restartGame() {
  // Reset all game state variables
  currentPlayer = "X";
  currentPlayerName = player1Name;
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;

  // Update status display
  document.querySelector(
    ".status"
  ).textContent = `Current Player: ${currentPlayerName}`;

  // Clear all cells
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("x-mark", "o-mark");
  });

  // Increment game counter
  gameCount++;
}

/* Score Reset Function */
function resetScores() {
  // Clear game history and reset counter
  gameHistory = [];
  gameCount = 1;

  // Clear score table display
  const scoreHistory = document.getElementById("score-history");
  scoreHistory.innerHTML = "";
}

/* Player Name Setup Function */
function setPlayerNames() {
  // Prompt for new player names
  const name1 = prompt("Enter name for Player 1 (X):", "Player 1");
  const name2 = prompt("Enter name for Player 2 (O):", "Player 2");

  // Update names if provided
  if (name1) player1Name = name1;
  if (name2) player2Name = name2;

  // Update current player name and display
  currentPlayerName = currentPlayer === "X" ? player1Name : player2Name;
  document.querySelector(
    ".status"
  ).textContent = `Current Player: ${currentPlayerName}`;
}
