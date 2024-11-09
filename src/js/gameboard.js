class Gameboard {
    constructor() {
        this.board = Array(10).fill(null).map(() => Array(10).fill(""));
        this.ships = [];
    }

    placeShip(ship, x, y, horizontal) {
        const boardHeight = this.board.length;
        const boardWidth = this.board[0].length;
        if (x < 0 || x > boardHeight || y < 0 || y > boardWidth) 
            throw new Error("Not a valid position");

        if (horizontal) {
            if (y + ship.length > boardWidth)
                throw new Error("Not a valid position");
            for (let i = 0; i < ship.length; i++) {
                if (this.board[x][y+i] !== ""){
                    throw new Error("Not a valid position");
                }
            }
            for (let i = 0; i < ship.length; i++) {
                this.board[x][y+i] = ship;
            }
        } else {
            if ( x + ship.length > boardHeight)
                throw new Error("Not a valid position");
            for (let i = 0; i < ship.length; i ++) {
                if (this.board[x+i][y] !== "") {
                    throw new Error("Not a valid position");
                }
            }
            for (let i = 0; i < ship.length; i++) {
                this.board[x+i][y] = ship;
            }
        };
        this.ships.push(ship);
        return true;
    }

    receiveAttack(x, y) {
        if (x < 0 || x >= this.board.length || y < 0 || y >= this.board[0].length)
            throw new Error("Not a valid attack!");
        if (this.board[x][y] == "hit" || this.board[x][y] == "miss")
            throw new Error("Position already attacked!");

        if (this.board[x][y] !== "") {
            const ship = this.board[x][y];
            ship.hit();
            this.board[x][y] = "hit";
        }else {
            this.board[x][y] = "miss";
        }

    }
}


module.exports = Gameboard;