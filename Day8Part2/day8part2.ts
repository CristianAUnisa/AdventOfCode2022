import { createReadStream } from "fs";
import { createInterface } from "readline";

const rs = createReadStream("input", { encoding: "utf-8" });
const lines = createInterface({ input: rs });

const treeMatrix: Array<Array<number>> = [];

lines.on("line", (line) => {
  treeMatrix.push([...line.split("").map(c => +c)]);
});

lines.on("close", () => {
  const count = treeMatrix.reduce((acc, row, rowIndex) => {
    const reducedRow = row.reduce((acc, tree, columnIndex) => {
      const temp = calculateScenicPoints(treeMatrix, rowIndex, columnIndex);
      return acc > temp ? acc : temp;
    }, 0);
    return acc > reducedRow ? acc : reducedRow;
  }, 0);

  console.log(count);
});

function calculateScenicPoints(treeMatrix: Array<Array<number>>, rowIndex: number, columnIndex: number): number {
  let i;
  const results = [];
  const val = treeMatrix[rowIndex][columnIndex];
  if(rowIndex == 0 || columnIndex == 0 || rowIndex == treeMatrix.length - 1 || columnIndex == treeMatrix[0].length - 1) return 0;
  for (i = rowIndex -1; i > 0; i--) {
    if(treeMatrix[i][columnIndex] >= val)
      break;
  }
  results.push(rowIndex - i);
  for (i = rowIndex + 1; i < treeMatrix[0].length - 1; i++) {
    if(treeMatrix[i][columnIndex] >= val)
      break;
  }
  results.push(i - rowIndex);
  for (i = columnIndex - 1; i > 0; i--) {
    if(treeMatrix[rowIndex][i] >= val)
      break;
  }
  results.push(columnIndex - i);
  for (i = columnIndex + 1; i < treeMatrix[0].length - 1; i++) {
    if(treeMatrix[rowIndex][i] >= val)
      break;
  }
  results.push(i - columnIndex);
  return results.reduce((a, b) => a * b);
}