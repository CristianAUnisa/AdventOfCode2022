"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const readline_1 = require("readline");
const rs = (0, fs_1.createReadStream)("input", { encoding: "utf-8" });
const lines = (0, readline_1.createInterface)({ input: rs });
const treeMatrix = [];
lines.on("line", (line) => {
    treeMatrix.push([...line.split("").map(c => +c)]);
});
lines.on("close", () => {
    const count = treeMatrix.reduce((acc, row, rowIndex) => {
        return acc + row.reduce((acc, tree, columnIndex) => {
            return acc + +isTreeVisibleFromOneEdge(treeMatrix, rowIndex, columnIndex);
        }, 0);
    }, 0);
    console.log(count);
});
function isTreeVisibleFromOneEdge(treeMatrix, rowIndex, columnIndex) {
    let i;
    const val = treeMatrix[rowIndex][columnIndex];
    if (rowIndex == 0 || columnIndex == 0 || rowIndex == treeMatrix.length - 1 || columnIndex == treeMatrix[0].length - 1)
        return true;
    for (i = rowIndex - 1; i >= 0; i--) {
        if (treeMatrix[i][columnIndex] >= val)
            break;
    }
    if (i < 0)
        return true;
    for (i = rowIndex + 1; i < treeMatrix[0].length; i++) {
        if (treeMatrix[i][columnIndex] >= val)
            break;
    }
    if (i >= treeMatrix[0].length)
        return true;
    for (i = columnIndex - 1; i >= 0; i--) {
        if (treeMatrix[rowIndex][i] >= val)
            break;
    }
    if (i < 0)
        return true;
    for (i = columnIndex + 1; i < treeMatrix[0].length; i++) {
        if (treeMatrix[rowIndex][i] >= val)
            break;
    }
    if (i >= treeMatrix[0].length)
        return true;
    return false;
}
