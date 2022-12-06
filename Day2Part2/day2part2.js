"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const mapToVal = (letter) => {
    if (letter == "A" || letter == "X")
        return 0;
    else if (letter == "B" || letter == "Y")
        return 1;
    else
        return 2;
};
const input = (0, fs_1.readFileSync)("input", "utf-8");
const result = input
    .split("\n")
    .map((line) => {
    return {
        elf: line.charAt(0),
        player: line.charAt(2),
    };
})
    .reduce((acc, { elf, player }) => {
    let elfPoint = mapToVal(elf);
    let playerPoint;
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
        playerPoints: acc.playerPoints + playerPoint + 1,
    };
}, { elfPoints: 0, playerPoints: 0 });
console.log(result);
