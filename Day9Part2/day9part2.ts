/*
  This is a mess, but previously the rope was moving like in the "Snake" game.
  I don't want to touch this ever again :D
*/
import { createReadStream } from "fs";
import { createInterface } from "readline";

const rs = createReadStream("input", { encoding: "utf-8" });
const lines = createInterface({ input: rs });

const tailVisited: [number, number][] = [[0, 0]];
let nodesPosition: [number, number][] = Array.from({ length: 10 }).map(() => [
  0, 0,
]);

lines.on("line", (line) => {
  const direction = line.charAt(0);
  const times = +line.substring(2);
  const axisToEdit = direction == "L" || direction == "R" ? 0 : 1;
  for (let i = 0; i < times; i++) {
    let movement: [number, number] = [0, 0];
    nodesPosition.forEach((node, index) => {
      if (index == 0) {
        movement[axisToEdit] = directionToNum(direction);
        nodesPosition[0][axisToEdit] += directionToNum(direction);
      } else if (
        Math.abs(nodesPosition[index][0] - nodesPosition[index - 1][0]) > 1 ||
        Math.abs(nodesPosition[index][1] - nodesPosition[index - 1][1]) > 1
      ) {
        nodesPosition[index][0] += Math.sign(nodesPosition[index - 1][0] - nodesPosition[index][0]);
        nodesPosition[index][1] += Math.sign(nodesPosition[index - 1][1] - nodesPosition[index][1]);
      }
    });
    if (
      !tailVisited.some(
        (pos) => pos[0] == nodesPosition[9][0] && pos[1] == nodesPosition[9][1]
      )
    )
      tailVisited.push([...nodesPosition[9]]);
  }
});

lines.on("close", () => {
  console.log(tailVisited.length);
});

function directionToNum(direction: string): number {
  return direction == "L" || direction == "U" ? -1 : 1;
}
