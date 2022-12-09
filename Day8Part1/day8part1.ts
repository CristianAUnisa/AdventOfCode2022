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
    return acc + row.reduce((acc, tree, columnIndex) => {
      return acc + +isTreeVisibleFromOneEdge(treeMatrix, rowIndex, columnIndex);
    }, 0);
  }, 0);

  console.log(count);
});

function isTreeVisibleFromOneEdge(treeMatrix: Array<Array<number>>, rowIndex: number, columnIndex: number): boolean {
  let i;
  const val = treeMatrix[rowIndex][columnIndex];
  if(rowIndex == 0 || columnIndex == 0 || rowIndex == treeMatrix.length - 1 || columnIndex == treeMatrix[0].length - 1) return true;
  for (i = rowIndex -1; i >= 0; i--) {
    if(treeMatrix[i][columnIndex] >= val)
      break;
  }
  if (i < 0) return true;
  for (i = rowIndex + 1; i < treeMatrix[0].length; i++) {
    if(treeMatrix[i][columnIndex] >= val)
      break;
  }
  if (i >= treeMatrix[0].length) return true;
  for (i = columnIndex - 1; i >= 0; i--) {
    if(treeMatrix[rowIndex][i] >= val)
      break;
  }
  if (i < 0) return true;
  for (i = columnIndex + 1; i < treeMatrix[0].length; i++) {
    if(treeMatrix[rowIndex][i] >= val)
      break;
  }
  if (i >= treeMatrix[0].length) return true;
  return false;
}