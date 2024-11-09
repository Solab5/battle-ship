const Player = require('./player');
const Ship = require('./ship');
const GameView = require('./dom');

class Game {
    constructor() {
        this.player1 = new Player("human");
        this.player2 = new Player("computer");
        this.currentPlayer = this.player1;
        this.gameView = new GameView(this);
        this.setUpGame();
    }

    setUpGame() {
        this.player1.gameboard.placeShip(new Ship(3), 0, 0, true);
        this.player1.gameboard.placeShip(new Ship(3), 1, 1, false);
        this.player2.gameboard.placeShip(new Ship(3), 2, 2, true);
        this.player2.gameboard.placeShip(new Ship(3), 3, 3, false);
        this.gameView.renderBoards();
    }

    handleAttack(x, y) {
        if (this.currentPlayer === this.player1) {
            this.player1.attack(this.player2, x, y);
            this.gameView.renderBoards();
            this.currentPlayer = this.player2;
            this.computerTurn();
        } else {
            this.computerTurn();
            this.gameView.renderBoards();
            this.currentPlayer = this.player1;
        }
    }

    computerTurn() {
        const availablePositions = this.player2.availablePositions;
        const randomIndex = Math.floor(Math.random() * availablePositions.length);
        const [x, y] = availablePositions[randomIndex];
        this.player2.attack(this.player1, x, y);
    }
}

module.exports = Game;