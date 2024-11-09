const Gameboard = require('./gameboard');

class Player {
    constructor(type = 'human') {
        this.type = type;
        this.board = new Gameboard();
    }

    attack(opponent, coordinates) {
        opponent.board.receiveAttack(coordinates);
    }
}

module.exports = Player;