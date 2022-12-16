import { createReadStream } from "fs";
import { createInterface } from "readline";

interface NestedArray<T> extends Array<T | NestedArray<T>> {}

const helper: NestedArray<number>[] = [];
let indexSum = 0;
let i = 0;

const rs = createReadStream("input", { encoding: "utf-8" });
const lines = createInterface({ input: rs });

lines.on("line", (line) => {
  if (i % 3 == 2 && i != 0) {
    indexSum += calculate(helper[0], helper[1]) < 0 ? Math.round(i / 3) : 0;
    helper.length = 0;
  } else {
    helper.push(parseLine(line));
  }
  i++;
});

lines.once("close", () => {
  i++;
  indexSum += calculate(helper[0], helper[1]) <= 0 ? Math.round(i / 3) : 0;
  helper.length = 0;
  rs.close();
  console.log(indexSum);
});

function calculate(
  first: NestedArray<number>,
  second: NestedArray<number>
): number {
  if (typeof first == "number" && typeof second == "number") {
    return Math.sign(first - second);
  } else if (first instanceof Array && second instanceof Array) {
    for (let i = 0; i < Math.max(first.length, second.length); i++) {
      if (first[i] == null) return -1;
      else if (second[i] == null) return 1;
      const res = calculate(
        first[i] as NestedArray<number>,
        second[i] as NestedArray<number>
      );
      if (res != 0) return res;
    }
    return 0;
  } else if (first instanceof Array) {
    return calculate(first as NestedArray<number>, [second]);
  } else if (second instanceof Array) {
    return calculate([first], second as NestedArray<number>);
  }
  return 0;
}

function parseLine(line: string): NestedArray<number> {
  
  return JSON.parse(line);
}
