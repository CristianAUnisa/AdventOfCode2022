"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const readline_1 = require("readline");
const rs = (0, fs_1.createReadStream)("input", { encoding: "utf-8" });
const lines = (0, readline_1.createInterface)({ input: rs });
const columns = [];
const moves = [];
lines.on("line", (line) => {
    if (line.length == 1) {
        return;
    }
    else if (line.startsWith("move")) {
        const [quantity, start, end] = line.match(/\d+/g).map((char) => +char);
        moves.push({ quantity, start, end });
    }
    else {
        if (columns.length == 0) {
            columns.push(...Array.from({ length: (line.length / 4) + 1 }).map(() => []));
        }
        for (let i = 1; i < line.length; i += 4) {
            const char = line.charAt(i);
            if ("[] ".indexOf(char) == -1 && isNaN(+char)) {
                columns[(i - 1) / 4].push(char);
            }
        }
    }
});
let a = 0;
lines.on("close", () => {
    moves.forEach((move) => {
        columns[move.end - 1].unshift(...columns[move.start - 1].splice(0, move.quantity).reverse());
    });
    console.log(columns.map((column) => column[0]).join(""));
});
