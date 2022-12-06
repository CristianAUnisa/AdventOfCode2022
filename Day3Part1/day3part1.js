"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const readline_1 = require("readline");
const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const results = [];
const rs = (0, fs_1.createReadStream)("input", { encoding: "utf-8" });
const lines = (0, readline_1.createInterface)({ input: rs });
let i = 0;
lines.on("line", (line) => {
    const first = line.substring(0, line.length / 2);
    const second = line.substring(line.length / 2);
    for (const letter of first) {
        if (second.includes(letter)) {
            results.push(letter);
            break;
        }
    }
    i++;
});
lines.on("close", () => {
    console.log(results.reduce((acc, letter) => {
        return acc + alphabet.indexOf(letter) + 1;
    }, 0));
    console.log(i);
});
