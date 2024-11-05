class Gameboard {
    constructor() {
        this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
        this.missedShots = [];
    }

    placeShip(ship, coordinates) {
        const [x, y] = coordinates;

        if (y + ship.length > 10) {
            throw new Error("Ship placement out of bounds");
        }
    
        
        for (let i = 0; i < ship.length; i++) {
            this.board[x][y + i] = ship;
        }
    }

    receiveAttack([x, y]) {
        const target = this.board[x][y];
        if (target) {
            target.hit();
        } else {
            this.missedShots.push([x, y]);
        }
    }

    allShipsSunk() {
        const ships = this.board.flat().filter(cell => cell !== null);
        return ships.every(ship => ship.isSunk());
    }
}

module.exports = Gameboard;