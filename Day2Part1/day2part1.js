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
        elf: mapToVal(line.charAt(0)),
        player: mapToVal(line.charAt(2))
    };
})
    .reduce(function (acc, _a) {
    var elf = _a.elf, player = _a.player;
    if ((elf + 1) % 3 == player)
        player += 6;
    else if (player == elf) {
        player += 3;
        elf += 3;
    }
    else {
        elf += 6;
    }
    return {
        elfPoints: acc.elfPoints + elf + 1,
        playerPoints: acc.playerPoints + player + 1
    };
}, { elfPoints: 0, playerPoints: 0 });
console.log(result);
