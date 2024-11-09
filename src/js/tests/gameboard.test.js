const Gameboard = require('../gameboard');
const Ship = require('../ship');

describe('Gameboard class', () => {
    let gameboard;
    let ship;

    beforeEach(() => {
        gameboard = new Gameboard();
        ship = new Ship(3);
    }) 

    test("Gameboard class is defined", () => {
        expect(gameboard).toBeDefined();
    })

    test("Gameboard places ships horizontally on the board", () => {
        gameboard.placeShip(ship, 0,0,horizontal=true);
        expect(gameboard.board[0][0]).toBe(ship);
        expect(gameboard.board[0][1]).toBe(ship);
        expect(gameboard.board[0][2]).toBe(ship);
    });

    test("Gameboard places ships vertically on the board", () => {
        gameboard.placeShip(ship, 0,0,horizontal=false);
        expect(gameboard.board[0][0]).toBe(ship);
        expect(gameboard.board[1][0]).toBe(ship);
        expect(gameboard.board[2][0]).toBe(ship);
    });

    test("Game board throws an error when placing a ship outside of bounds horizontally", () => {
        expect(() => gameboard.placeShip(ship, 1,8, true)).toThrow("Not a valid position");
    });

    test("Game board throws an error when placing a ship outside of bounds vertically", () => {
        expect(() => gameboard.placeShip(ship, 8,1, false)).toThrow("Not a valid position");
    });

    test("Gameboard throws Error when placing ship on an already occupied cell horizontally", () => {
        const ship2 = new Ship(2);
        gameboard.placeShip(ship, 1, 1, true);
        expect(() => gameboard.placeShip(ship2, 1, 1, true)).toThrow("Not a valid position")
    });

    test("Gameboard throws Error when placing ship on an already occupied cell vertically", () => {
        const ship2 = new Ship(2);
        gameboard.placeShip(ship, 1, 1, true);
        expect(() => gameboard.placeShip(ship2, 1, 1, false)).toThrow("Not a valid position")
    });

    test("Game keeps track of ships placed on board", () => {
        gameboard.placeShip(ship, 1, 1, false);
        expect(gameboard.ships).toEqual([ship]);
    });

    // ReceiveAttack
    test("Gameboard receiveAttack misses a ship", () => {
        gameboard.placeShip(ship, 1,1, true);
        gameboard.receiveAttack(0, 1);
        expect(ship.hits).toBe(0);
        expect(gameboard.board[0][1]).toBe("miss");
    });
})

// test('places a ship at specific cordinates', () => {
//     const gameboard = new Gameboard();
//     const ship = new Ship(3);
//     gameboard.placeShip(ship, [0, 0]);

//     expect(gameboard.board[0][0]).toBe(ship);
//     expect(gameboard.board[0][1]).toBe(ship);
//     expect(gameboard.board[0][2]).toBe(ship);
// })

// test('receiveAttack() registers a hit or a miss', () => {
//     const gameboard = new Gameboard();
//     const ship = new Ship(3);
//     gameboard.placeShip(ship, [0, 0]);

//     gameboard.receiveAttack([0, 0]);
//     expect(ship.hits).toBe(1);

//     gameboard.receiveAttack([1, 1]);
//     expect(gameboard.missedShots).toContainEqual([1, 1]);
// })

// test('allShipsSunk() return true is ships are sunk', () => {
//     const gameboard = new Gameboard();
//     const ship1 = new Ship(2);
//     const ship2 = new Ship(3);

//     gameboard.placeShip(ship1, [0, 0]);
//     gameboard.placeShip(ship2, [1, 1]);

//     gameboard.receiveAttack([0, 0]);
//     gameboard.receiveAttack([1, 1]);
//     gameboard.receiveAttack([1, 2]);
//     gameboard.receiveAttack([1, 3]);

//     expect(gameboard.allShipsSunk()).toBe(false);

//     gameboard.receiveAttack([0, 1]);

//     expect(gameboard.allShipsSunk()).toBe(true);
// })