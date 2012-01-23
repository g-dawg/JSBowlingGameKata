/// <reference path="http://code.jquery.com/jquery-latest.js" />
/// <reference path="http://code.jquery.com/qunit/qunit-git.js" />

$(document).ready(function () {
    $("input").click(function () {
        location.reload();
    });
});

///////BowlingGame

var Game = function () {
    var rolls = new Array();

    this.roll = function (pins) {
        rolls.push(pins);
    };

    this.score = function () {
        var result = 0;
        var rollindex = 0;

        for (var frameindex = 0; frameindex < 10; frameindex++) {
            if (isStrike(rollindex)) {
                result += 10 + rolls[rollindex + 1] + rolls[rollindex + 2];
                rollindex++;
                continue;
            }

            if (isSpare(rollindex)) {
                result += 10 + rolls[rollindex + 2];
                rollindex += 2;
                continue;
            }

            result += rolls[rollindex] + rolls[rollindex + 1];
            rollindex += 2;
        }

        return result;
    };

    function isStrike(index) {
        return rolls[index] == 10;
    }

    function isSpare(index) {
        return rolls[index] + rolls[index + 1] == 10;
    }
};

///////Tests

function RollMany(game, pins, times) {
    for (var i = 0; i < times; i++) {
        game.roll(pins);
    }
};

test("score single frame", function () {
    var game = new Game();

    game.roll(1);
    game.roll(2);
    RollMany(game, 0, 18);

    equal(game.score(), 3, "ska vara 3");
});

test("test gutter game", function () {
    var game = new Game();

    RollMany(game, 0, 20);

    equal(game.score(), 0, "ska vara 0");

});

test("test Single Spare", function () {
    var game = new Game();

    game.roll(1);
    game.roll(9);
    game.roll(1);
    RollMany(game, 0, 17);

    equal(game.score(), 12, "ska vara 12");
});


test("test Single strike", function () {
    var game = new Game();

    game.roll(10);
    game.roll(3);
    game.roll(4);
    RollMany(game, 0, 17);

    equal(game.score(), 24, "ska vara 24");
});

test("test three strikes", function () {
    var game = new Game();

    game.roll(10);
    game.roll(10);
    game.roll(10);
    RollMany(game, 1, 14);

    equal(game.score(), 77, "ska vara 77");
});


test("test perfect game", function () {
    var game = new Game();

    RollMany(game, 10, 12);

    equal(game.score(), 300, "ska vara 300");
});




 
