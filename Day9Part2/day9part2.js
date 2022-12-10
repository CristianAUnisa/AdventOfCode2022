"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const readline_1 = require("readline");
const rs = (0, fs_1.createReadStream)("input", { encoding: "utf-8" });
const lines = (0, readline_1.createInterface)({ input: rs });
const tailVisited = [[0, 0]];
let nodesPosition = Array.from({ length: 10 }).map(() => [
    0, 0,
]);
const tailNodeIndex = 1;
lines.on("line", (line) => {
    const direction = line.charAt(0);
    const times = +line.substring(2);
    const axisToEdit = direction == "L" || direction == "R" ? 0 : 1;
    for (let i = 0; i < times; i++) {
        let movement = [0, 0];
        nodesPosition.forEach((node, index) => {
            if (index == 0) {
                movement[axisToEdit] = directionToNum(direction);
                nodesPosition[0][axisToEdit] += directionToNum(direction);
            }
            else if (Math.abs(nodesPosition[index][0] - nodesPosition[index - 1][0]) > 1 ||
                Math.abs(nodesPosition[index][1] - nodesPosition[index - 1][1]) > 1) {
                nodesPosition[index][0] += Math.sign(nodesPosition[index - 1][0] - nodesPosition[index][0]);
                nodesPosition[index][1] += Math.sign(nodesPosition[index - 1][1] - nodesPosition[index][1]);
            }
        });
        if (!tailVisited.some((pos) => pos[0] == nodesPosition[9][0] && pos[1] == nodesPosition[9][1]))
            tailVisited.push([...nodesPosition[9]]);
    }
});
lines.on("close", () => {
    console.log(tailVisited.length);
});
function directionToNum(direction) {
    return direction == "L" || direction == "U" ? -1 : 1;
}
