"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const readline_1 = require("readline");
const rs = (0, fs_1.createReadStream)("input", { encoding: "utf-8" });
const lines = (0, readline_1.createInterface)({ input: rs });
let i = 0;
lines.on("line", (line) => {
    const [firstPair, secondPair] = line
        .split(",")
        .map((pair) => [...pair.split("-").map(num => +num)]);
    if ((firstPair[0] <= secondPair[1] && firstPair[1] >= secondPair[0]))
        i++;
});
lines.on("close", () => console.log(i));
