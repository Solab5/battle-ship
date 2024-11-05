const Gameboard = require('./gameboard');
const Ship = require('./ship');

test('places a ship at specific cordinates', () => {
    const gameboard = new Gameboard();
    const ship = new Ship(3);
    gameboard.placeShip(ship, [0, 0]);

    expect(gameboard.board[0][0]).toBe(ship);
    expect(gameboard.board[0][1]).toBe(ship);
    expect(gameboard.board[0][2]).toBe(ship);
})

test('receiveAttack() registers a hit or a miss', () => {
    const gameboard = new Gameboard();
    const ship = new Ship(3);
    gameboard.placeShip(ship, [0, 0]);

    gameboard.receiveAttack([0, 0]);
    expect(ship.hits).toBe(1);

    gameboard.receiveAttack([1, 1]);
    expect(gameboard.missedShots).toContainEqual([1, 1]);
})

test('allShipsSunk() return true is ships are sunk', () => {
    const gameboard = new Gameboard();
    const ship1 = new Ship(2);
    const ship2 = new Ship(3);

    gameboard.placeShip(ship1, [0, 0]);
    gameboard.placeShip(ship2, [1, 1]);

    gameboard.receiveAttack([0, 0]);
    gameboard.receiveAttack([1, 1]);
    gameboard.receiveAttack([1, 2]);
    gameboard.receiveAttack([1, 3]);

    expect(gameboard.allShipsSunk()).toBe(false);

    gameboard.receiveAttack([0, 1]);

    expect(gameboard.allShipsSunk()).toBe(true);
})