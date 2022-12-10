"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const readline_1 = require("readline");
const rs = (0, fs_1.createReadStream)("input", { encoding: "utf-8" });
const lines = (0, readline_1.createInterface)({ input: rs });
let cycle = {
    _cycle: 1,
    listeners: new Array(),
    increment() {
        this._cycle++;
        this.listeners.forEach((listener) => listener(this._cycle));
    },
    get cycle() {
        return this._cycle;
    },
    subscribe(func) {
        this.listeners.push(func);
    }
};
let register = 1;
let sum = 0;
cycle.subscribe((cycle) => {
    if (cycle % 40 == 20 && cycle <= 220)
        sum += cycle * register;
});
lines.on("line", (line) => {
    cycle.increment();
    if (line.startsWith("noop"))
        return;
    else {
        register += +line.substring(5);
        cycle.increment();
    }
});
lines.on("close", () => {
    console.log(sum);
});
