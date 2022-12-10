import { createReadStream } from "fs";
import { createInterface } from "readline";

const rs = createReadStream("input", { encoding: "utf-8" });
const lines = createInterface({ input: rs });

let cycle = {
    _cycle: 1,
    listeners: new Array<(cycle: number) => any>(),
    increment() {
        this._cycle++;
        this.listeners.forEach((listener) => listener(this._cycle));
    },
    get cycle(): number {
        return this._cycle;
    },
    subscribe(func: (cycle: number) => any) {
        this.listeners.push(func);
    }
};
let register = 1;
let sum = 0;

cycle.subscribe((cycle) => {
    if(cycle % 40 == 20 && cycle <= 220)
        sum += cycle * register;
});

lines.on("line", (line) => {
    cycle.increment();
    if(line.startsWith("noop")) return;
    else {
        register += +line.substring(5);
        cycle.increment();
    }
});

lines.on("close", () => {
    console.log(sum);
});