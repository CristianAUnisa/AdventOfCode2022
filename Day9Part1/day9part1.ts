import { createReadStream } from "fs";
import { createInterface } from "readline";

const rs = createReadStream("input", { encoding: "utf-8" });
const lines = createInterface({ input: rs });

const tailVisited: [number, number][] = [[0, 0]];
let headCurrentPosition: [number, number] = [0, 0];
let tailCurrentPosition: [number, number] = [0, 0];

lines.on("line", (line) => {
    const direction = line.charAt(0);
    const times = +line.substring(2);
    const axisToEdit = direction == "L" || direction == "R" ? 0 : 1;
    for(let i = 0; i < times; i++) {
        const oldHeadPos: [number, number] = [...headCurrentPosition];
        headCurrentPosition[axisToEdit] += directionToNum(direction);
        if(Math.abs(tailCurrentPosition[0] - headCurrentPosition[0]) > 1 || Math.abs(tailCurrentPosition[1] - headCurrentPosition[1]) > 1) {
            tailCurrentPosition = [...oldHeadPos];
            if (!tailVisited.some((pos) => pos[0] == tailCurrentPosition[0] && pos[1] == tailCurrentPosition[1]))
                tailVisited.push([...tailCurrentPosition]);
        }

    }
});

lines.on("close", () => {
    console.log(tailVisited.length);
});

function directionToNum(direction: string): number {
    return direction == "L" || direction == "U" ? -1 : 1;
}