import { createReadStream } from "fs";
import { createInterface } from "readline";

const rs = createReadStream("input", { encoding: "utf-8" });
const lines = createInterface({ input: rs });

let i = 0;

lines.on("line", (line) => {
  const [fp, sp] = line
    .split(",")
    .map((pair) => [...pair.split("-").map(num => +num)]);
  if (
    (fp[0] <= sp[1] && fp[1] >= sp[0])
  )
    i++;
});

lines.on("close", () => console.log(i));

console.log("Salve");