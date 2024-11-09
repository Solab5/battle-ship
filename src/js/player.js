const Gameboard = require('./gameboard');

class Player {
    constructor(type = 'human') {
        this.type = type;
        this.gameboard = new Gameboard();
        this.availablePositions = this.initializeAvailablePositions();
    }

    getType() {
        return this.type;
    }

    attack(opponent, x, y) {
        if (this.type === "human") {
            opponent.gameboard.receiveAttack(x, y);
        } else if (this.type === "computer") {
            opponent.gameboard.receiveAttack(x, y)
        }
        this.updateAvailablePositions(x, y);
    }

    initializeAvailablePositions() {
        const positions = [];
        for (let x = 0; x < this.gameboard.board.length; x++) {
          for (let y = 0; y < this.gameboard.board[0].length; y++) {
            positions.push([x, y]);
          }
        }
        return positions;
    }
    
    updateAvailablePositions(x, y) {
        const index = this.availablePositions.findIndex(
          (pos) => pos[0] === x && pos[1] === y
        );
        if (index !== -1) {
          this.availablePositions.splice(index, 1);
        }
      }

    randomAttack(opponent) {
        if (this.availablePositions.length === 0) {
            return;
        }
        const randomIndex = Math.floor(Math.random() * this.availablePositions.length);
        const [x, y] = this.availablePositions[randomIndex];
        this.attack(opponent, x, y);
    }

}

module.exports = Player;