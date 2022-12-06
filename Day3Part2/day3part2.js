"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const readline_1 = require("readline");
const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const results = [];
const helperArray = [];
const rs = (0, fs_1.createReadStream)("input", { encoding: "utf-8" });
const lines = (0, readline_1.createInterface)({ input: rs });
lines.on("line", (line) => {
    helperArray.push(line);
    if (helperArray.length != 0 && helperArray.length % 3 == 0) {
        const [first, second, third] = helperArray;
        for (const letter of first) {
            if (second.includes(letter) && third.includes(letter)) {
                results.push(letter);
                break;
            }
        }
        helperArray.length = 0;
    }
});
lines.on("close", () => {
    console.log(results.reduce((acc, letter) => {
        return acc + alphabet.indexOf(letter) + 1;
    }, 0));
});
