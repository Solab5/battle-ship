const Player = require('../player');
const Gameboard = require('../gameboard');
const Ship = require('../ship')

describe("Player class", () => {
    test("Player class is defined", () => {
        const player = new Player();
        expect(player).toBeDefined();
    });

    test("Player initializes with the correct type and a gameboard", () => {
        const player = new Player("human");
        expect(player.getType()).toBe("human");
        expect(player.gameboard).toBeDefined();
      });
   
      test("Player can attack opponent gameboard", () => {
        const player1 = new Player("human");
        const player2 = new Player("human");
    
        const ship = new Ship(3);
        player2.gameboard.placeShip(ship, 0, 0, true);
    
        // Perform an attack that should hit
        player1.attack(player2, 0, 0);
        expect(player2.gameboard.board[0][0]).toBe("hit");
    
        // Perform an attack that should miss
        player1.attack(player2, 1, 1);
        expect(player2.gameboard.board[1][1]).toBe("miss");
      });

      test("Computer player performs random attack", () => {
        const computer = new Player("computer");
        const opponent = new Player("human");
        jest.spyOn(opponent.gameboard, "receiveAttack");
        computer.randomAttack(opponent);
        expect(opponent.gameboard.receiveAttack).toHaveBeenCalled();
      });

      test("randomAttack should reduce available positions by one after each attack", () => {
        const opponent = new Player("human");
        const player = new Player("computer");
        const initialAvailablePositions = player.availablePositions.length;
    
        // Perform a random attack
        player.randomAttack(opponent);
    
        // Expect the available positions to decrease by one
        expect(player.availablePositions.length).toBe(
          initialAvailablePositions - 1
        );
      });


})

