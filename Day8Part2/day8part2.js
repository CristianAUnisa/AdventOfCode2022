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
        const reducedRow = row.reduce((acc, tree, columnIndex) => {
            const temp = calculateScenicPoints(treeMatrix, rowIndex, columnIndex);
            return acc > temp ? acc : temp;
        }, 0);
        return acc > reducedRow ? acc : reducedRow;
    }, 0);
    console.log(count);
});
function calculateScenicPoints(treeMatrix, rowIndex, columnIndex) {
    let i;
    const results = [];
    const val = treeMatrix[rowIndex][columnIndex];
    if (rowIndex == 0 || columnIndex == 0 || rowIndex == treeMatrix.length - 1 || columnIndex == treeMatrix[0].length - 1)
        return 0;
    for (i = rowIndex - 1; i > 0; i--) {
        if (treeMatrix[i][columnIndex] >= val)
            break;
    }
    results.push(rowIndex - i);
    for (i = rowIndex + 1; i < treeMatrix[0].length - 1; i++) {
        if (treeMatrix[i][columnIndex] >= val)
            break;
    }
    results.push(i - rowIndex);
    for (i = columnIndex - 1; i > 0; i--) {
        if (treeMatrix[rowIndex][i] >= val)
            break;
    }
    results.push(columnIndex - i);
    for (i = columnIndex + 1; i < treeMatrix[0].length - 1; i++) {
        if (treeMatrix[rowIndex][i] >= val)
            break;
    }
    results.push(i - columnIndex);
    return results.reduce((a, b) => a * b);
}
