"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const readline_1 = require("readline");
const rs = (0, fs_1.createReadStream)("input", { encoding: "utf-8" });
const lines = (0, readline_1.createInterface)({ input: rs });
const tailVisited = [[0, 0]];
let headCurrentPosition = [0, 0];
let tailCurrentPosition = [0, 0];
lines.on("line", (line) => {
    const direction = line.charAt(0);
    const times = +line.substring(2);
    const axisToEdit = direction == "L" || direction == "R" ? 0 : 1;
    for (let i = 0; i < times; i++) {
        const oldHeadPos = [...headCurrentPosition];
        headCurrentPosition[axisToEdit] += directionToNum(direction);
        if (Math.abs(tailCurrentPosition[0] - headCurrentPosition[0]) > 1 || Math.abs(tailCurrentPosition[1] - headCurrentPosition[1]) > 1) {
            tailCurrentPosition = [...oldHeadPos];
            if (!tailVisited.some((pos) => pos[0] == tailCurrentPosition[0] && pos[1] == tailCurrentPosition[1]))
                tailVisited.push([...tailCurrentPosition]);
        }
    }
});
lines.on("close", () => {
    console.log(tailVisited.length);
});
function directionToNum(direction) {
    return direction == "L" || direction == "U" ? -1 : 1;
}
