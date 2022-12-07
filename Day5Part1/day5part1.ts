import { createReadStream } from "fs";
import { createInterface } from "readline";

const rs = createReadStream("input", { encoding: "utf-8" });
const lines = createInterface({ input: rs });

let i = 0;

lines.on("line", (line) => {
  const [firstPair, secondPair] = line
    .split(",")
    .map((pair) => [...pair.split("-").map(num => +num)]);
  if (
    (firstPair[0] <= secondPair[1] && firstPair[1] >= secondPair[0])
  )
    i++;
});

lines.on("close", () => console.log(i));
