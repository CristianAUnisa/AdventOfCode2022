import { createReadStream, writeFileSync } from "fs";
import { createInterface } from "readline";

const rs = createReadStream("input", { encoding: "utf-8" });
const lines = createInterface({ input: rs });

let crt = "";

let cycle = {
  _cycle: 1,
  startListeners: new Array<(cycle: number) => any>(),
  increment() {
    this.startListeners.forEach((listener) => listener(this._cycle));
    this._cycle++;
  },
  get cycle(): number {
    return this._cycle;
  },
  subscribeBeforeChange(func: (cycle: number) => any) {
    this.startListeners.push(func);
  },
};
let register = 1;
let sum = 0;

cycle.subscribeBeforeChange(renderCrt);

lines.on("line", (line) => {
  cycle.increment();
  if (line.startsWith("noop")) return;
  else {
    cycle.increment();
    register += +line.substring(5);
  }
});

lines.on("close", () => {
  console.log(crt);
});

function renderCrt(cycle: number) {
  const column = (cycle - 1) % 40;
  crt += column >= register - 1 && column <= register + 1 ? "#" : ".";
  if (column == 39) crt += "\n";
}
