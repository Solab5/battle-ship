const Player = require('./player');
const Gameboard = require('./gameboard');

test('create a player with a gameboard', () => {
    const  player = new Player('human');
    expect(player.board).toBeInstanceOf(Gameboard);
});

test('player can attack an opponent`s gameboard', () => {
    const player = new Player('human');
    const opponent = new Player('computer');

    player.attack(opponent, [0, 0]);
    expect(opponent.board.missedShots).toContainEqual([0, 0])
})