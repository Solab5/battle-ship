class GameView {
    constructor(game) {
        this.game = game;
        this.player1Board = document.querySelector('#player1-board');
        this.player2Board = document.querySelector('#player2-board');
    }

    renderBoards() {
        this.player1Board.innerHTML = ''; // Clear previous board
        this.player2Board.innerHTML = ''; // Clear previous board

        this.renderBoard(this.game.player1.gameboard, this.player1Board);
        this.renderBoard(this.game.player2.gameboard, this.player2Board);
    }

    renderBoard(gameboard, boardElement) {
        gameboard.board.forEach((row, x) => {
            row.forEach((cell, y) => {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                cellElement.dataset.x = x;
                cellElement.dataset.y = y;

                if (cell === 'hit') {
                    cellElement.classList.add('hit');
                } else if (cell === 'miss') {
                    cellElement.classList.add('miss');
                }

                cellElement.addEventListener('click', () => {
                    this.game.handleAttack(x, y);
                });

                boardElement.appendChild(cellElement);
            });
        });
    }
}

module.exports = GameView;