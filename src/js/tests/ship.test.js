const Ship = require('../ship');

test('creates a ship with the correct length and zero hits', () => {
    const ship = new Ship(3);
    expect(ship.length).toBe(3);
    expect(ship.hits).toBe(0);
});

test('hit() increments the number of hits', () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.hits).toBe(1);
    ship.hit();
    expect(ship.hits).toBe(2);
});

test('isSunk() returns true if the ship is sunk', () => {
    const ship = new Ship(2);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
});