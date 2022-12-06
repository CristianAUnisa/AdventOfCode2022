import { createReadStream } from "fs";
import { createInterface } from "readline";

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const results: string[] = [];

const rs = createReadStream("input", { encoding: "utf-8" });
const lines = createInterface({ input: rs });
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
  console.log(
    results.reduce((acc, letter) => {
      return acc + alphabet.indexOf(letter) + 1;
    }, 0)
  );
  console.log(i);
});
