"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var mapToVal = function (letter) {
    if (letter == "A" || letter == "X")
        return 0;
    else if (letter == "B" || letter == "Y")
        return 1;
    else
        return 2;
};
var input = (0, fs_1.readFileSync)("input", "utf-8");
var result = input
    .split("\n")
    .map(function (line) {
    return {
        elf: line.charAt(0),
        player: line.charAt(2)
    };
})
    .reduce(function (acc, _a) {
    var elf = _a.elf, player = _a.player;
    var elfPoint = mapToVal(elf);
    var playerPoint;
    if (player == "X") {
        playerPoint = (elfPoint + 2) % 3;
    }
    else if (player == "Y") {
        playerPoint = elfPoint;
    }
    else {
        playerPoint = (elfPoint + 1) % 3;
    }
    if ((elfPoint + 1) % 3 == playerPoint)
        playerPoint += 6;
    else if (playerPoint == elfPoint) {
        playerPoint += 3;
        elfPoint += 3;
    }
    else {
        elfPoint += 6;
    }
    return {
        elfPoints: acc.elfPoints + elfPoint + 1,
        playerPoints: acc.playerPoints + playerPoint + 1
    };
}, { elfPoints: 0, playerPoints: 0 });
console.log(result);
