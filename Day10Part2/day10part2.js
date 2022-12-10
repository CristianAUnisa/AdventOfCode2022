"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const readline_1 = require("readline");
const rs = (0, fs_1.createReadStream)("input", { encoding: "utf-8" });
const lines = (0, readline_1.createInterface)({ input: rs });
let crt = "";
let cycle = {
    _cycle: 1,
    startListeners: new Array(),
    increment() {
        this.startListeners.forEach((listener) => listener(this._cycle));
        this._cycle++;
    },
    get cycle() {
        return this._cycle;
    },
    subscribeBeforeChange(func) {
        this.startListeners.push(func);
    },
};
let register = 1;
let sum = 0;
cycle.subscribeBeforeChange(renderCrt);
lines.on("line", (line) => {
    cycle.increment();
    if (line.startsWith("noop"))
        return;
    else {
        cycle.increment();
        register += +line.substring(5);
    }
});
lines.on("close", () => {
    console.log(crt);
});
function renderCrt(cycle) {
    const column = (cycle - 1) % 40;
    crt += column >= register - 1 && column <= register + 1 ? "#" : ".";
    if (column == 39)
        crt += "\n";
}
