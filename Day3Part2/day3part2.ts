import { createReadStream } from "fs";
import { createInterface } from "readline";

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const results: string[] = [];
const helperArray: string[] = [];

const rs = createReadStream("input", { encoding: "utf-8" });
const lines = createInterface({ input: rs });

lines.on("line", (line) => {
  helperArray.push(line);
  if(helperArray.length != 0 && helperArray.length % 3 == 0) {
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
  console.log(
    results.reduce((acc, letter) => {
      return acc + alphabet.indexOf(letter) + 1;
    }, 0)
  );
});
