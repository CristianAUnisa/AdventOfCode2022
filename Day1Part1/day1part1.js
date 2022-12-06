"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const input = (0, fs_1.readFileSync)("input", "utf8");
let i = 0;
let max = 0;
let elfMax = 0;
input.split("\n\n").forEach((group) => {
    let sum = 0;
    group.split("\n").forEach((line) => {
        sum += parseInt(line);
    });
    if (!sum)
        return;
    if (sum > max) {
        max = sum;
        elfMax = i;
    }
    console.log("Elf " + i + " Sum " + sum);
    i++;
});
console.log("MAX " + max + " Elf " + elfMax);
