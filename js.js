// Initialize game variables
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scoreX = 0;
let scoreO = 0;

// Handle click on a cell
function handleClick(index) {
    // Check if the selected cell is empty and the game is active
    if (gameBoard[index] === '' && gameActive) {
        // Update game board and display the current player's symbol
        gameBoard[index] = currentPlayer;
        document.getElementById('board').children[index].textContent = currentPlayer;

        // Check for a winner or a draw
        if (checkWinner()) {
            // If there's a winner, update the score and end the game
            updateScore();
            gameActive = false;
            alert(`Player ${currentPlayer} wins!`);
        } else if (gameBoard.every(cell => cell !== '')) {
            // If it's a draw, display the message and end the game
            document.getElementById('status').textContent = "It's a draw!";
            gameActive = false;
        } else {
            // Switch to the next player's turn
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

// Check for a winner based on win patterns
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

// Update the score and display it on the page
function updateScore() {
    if (currentPlayer === 'X') {
        scoreX++;
        document.getElementById('scoreX').textContent = scoreX;
    } else {
        scoreO++;
        document.getElementById('scoreO').textContent = scoreO;
    }
}

// Reset the game to its initial state
function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    document.getElementById('status').textContent = 'Player X, you go first';
    const cells = document.getElementById('board').children;
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = '';
    }
}

// Dynamically create the game board
const boardElement = document.getElementById('board');
for (let i = 0; i < 9; i++) {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.addEventListener('click', () => handleClick(i));
    boardElement.appendChild(cellElement);
}

// Reset scores to zero
function resetScores() {
    scoreX = 0;
    scoreO = 0;
    document.getElementById('scoreX').textContent = scoreX;
    document.getElementById('scoreO').textContent = scoreO;
}
