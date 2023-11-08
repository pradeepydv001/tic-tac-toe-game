const cells = document.querySelectorAll('[data-cell]');
const submitButton = document.getElementById('submitBtn');
const resultMessage = document.getElementById('result');

let xTurn = true;
let gameWon = false;

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

submitButton.addEventListener('click', checkWinner);

function handleClick(e) {
    if (gameWon) return;

    const cell = e.target;
    if (cell.textContent === '') {
        const currentPlayer = xTurn ? 'X' : 'O';
        cell.textContent = currentPlayer;
        cell.dataset.cell = currentPlayer;
        xTurn = !xTurn;
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]            // Diagonals
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        const cellA = cells[a];
        const cellB = cells[b];
        const cellC = cells[c];

        if (cellA.textContent === cellB.textContent &&
            cellB.textContent === cellC.textContent &&
            cellA.textContent !== '') {
            cellA.style.backgroundColor = 'green';
            cellB.style.backgroundColor = 'green';
            cellC.style.backgroundColor = 'green';
            resultMessage.textContent = `${cellA.textContent} wins!`;
            gameWon = true;
            return;
        }
    }

    if ([...cells].every(cell => cell.textContent !== '')) {
        resultMessage.textContent = "It's a draw!";
    }
}
