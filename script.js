const cells = document.querySelectorAll('.cell');
const statusMessage = document.getElementById('status-message');
const resetButton = document.getElementById('reset-btn');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X'; 
let gameOver = false;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    statusMessage.textContent = "Your turn!";
    cells.forEach(cell => cell.textContent = '');
}

function checkWinner(player) {
    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === player);
    });
}

function aiMove() {
    const emptyCells = board.reduce((acc, curr, index) => curr === '' ? acc.concat(index) : acc, []);
    if (emptyCells.length === 0) return;

    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomIndex] = 'O';
    cells[randomIndex].textContent = 'O';

    if (checkWinner('O')) {
        gameOver = true;
        statusMessage.textContent = "AI wins!";
    } else {
        currentPlayer = 'X';
        statusMessage.textContent = "Your turn!";
    }
}

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (gameOver || cell.textContent !== '') return;

        const index = cell.getAttribute('data-index');
        board[index] = 'X';
        cell.textContent = 'X';

        if (checkWinner('X')) {
            gameOver = true;
            statusMessage.textContent = "You win!";
        } else if (board.every(cell => cell !== '')) {
            gameOver = true;
            statusMessage.textContent = "It's a tie!";
        } else {
            currentPlayer = 'O';
            statusMessage.textContent = "AI's turn...";
            setTimeout(aiMove, 500); 
        }
    });
});

resetButton.addEventListener('click', resetGame);
