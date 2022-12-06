"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const input = (0, fs_1.readFileSync)("input", "utf8");
let i = 0;
let max = [{ sum: 0, elf: 0 }, { sum: 0, elf: 1 }, { sum: 0, elf: 2 }];
input.split("\n\n").forEach((group) => {
    let sum = 0;
    group.split("\n").forEach((line) => {
        sum += parseInt(line);
    });
    if (!sum)
        return;
    if (sum > max[0].sum) {
        max[0].sum = sum;
        max[0].elf = i;
        max.sort((a, b) => a.sum - b.sum);
    }
    console.log("Elf " + i + " Sum " + sum);
    i++;
});
console.log("SUM IS " + max.reduce((a, b) => a + b.sum, 0));
