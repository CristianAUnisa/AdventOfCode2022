// Guide: https://dev.to/codesphere/pathfinding-with-javascript-the-a-algorithm-3jlb
// Thank you Saji Wang!
// TODO: use a different algorithm

import { createReadStream } from "fs";

const rs = createReadStream("input", { encoding: "utf-8" });
const parserString = "SabcdefghijklmnopqrstuvwxyzE";

const matrix: Node[][] = [[]];
let startingPoints: Node[] = [];
let endingPoint: Node;

rs.on("readable", () => {
  let char = rs.read(1);

  while (char !== null) {
    if (char === "\r" || char === "\n") matrix.push([]);
    else {
      const node: Node = {
        value: parserString.indexOf(char),
        neighbors: new Array<Node>(),
        position: [matrix.length - 1, matrix[matrix.length - 1].length],
        totalCostFunction: 0,
        estimatedCostFunction: 0,
        startCostFunction: 0,
      };
      if (char === "S" || char === "a") startingPoints.push(node);
      else if (char === "E") endingPoint = node;
      matrix[matrix.length - 1].push(node);
    }
    char = rs.read(1);
  }
  rs.close();
});

rs.on("close", () => {
  matrix.flat().forEach((node) => {
    node.neighbors = getNeighbors(node.position);
  });
  console.log(
    startingPoints.reduce((acc, node) => {
      const result: number = searchAStar(node, matrix).length - 1;
      return result < acc && result != -1 ? result : acc;
    }, Number.MAX_VALUE)
  );
});

function getNeighbors(point: number[]): Node[] {
  const neighbors: Node[] = [];
  const [row, column] = point;
  const node = matrix[row][column];
  if (row > 0 && matrix[row - 1][column].value - node.value <= 1)
    neighbors.push(matrix[row - 1][column]);
  if (
    row < matrix.length - 1 &&
    matrix[row + 1][column].value - node.value <= 1
  )
    neighbors.push(matrix[row + 1][column]);
  if (column > 0 && matrix[row][column - 1].value - node.value <= 1)
    neighbors.push(matrix[row][column - 1]);
  if (
    column < matrix[0].length - 1 &&
    matrix[row][column + 1].value - node.value <= 1
  )
    neighbors.push(matrix[row][column + 1]);
  return neighbors;
}

function manhattanDistance(start: Node, end: Node) {
  let d1 = Math.abs(end.position[0] - start.position[0]);
  let d2 = Math.abs(end.position[1] - start.position[1]);

  return d1 + d2;
}

function searchAStar(startingPoint: Node, matrix: Node[][]): Node[] {
  matrix.flat().forEach((node) => (node.parent = undefined));
  const toVisit: Node[] = [];
  const visited: Node[] = [];
  const path = <any>[];
  toVisit.push(startingPoint);
  while (toVisit.length > 0) {
    let lowestIndex = 0;
    for (let i = 0; i < toVisit.length; i++) {
      if (
        toVisit[i].totalCostFunction < toVisit[lowestIndex].totalCostFunction
      ) {
        lowestIndex = i;
      }
    }
    let current = toVisit[lowestIndex];

    if (current === endingPoint) {
      let temp = current;
      path.push(temp);
      while (temp.parent) {
        path.push(temp.parent);
        temp = temp.parent;
      }
      return path.reverse();
    }

    toVisit.splice(lowestIndex, 1);
    visited.push(current);

    let neighbors = current.neighbors;

    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];

      if (!visited.includes(neighbor)) {
        let possibleG = current.startCostFunction + 1;

        if (!toVisit.includes(neighbor)) {
          toVisit.push(neighbor);
        } else if (possibleG >= neighbor.startCostFunction) {
          continue;
        }

        neighbor.startCostFunction = possibleG;
        neighbor.estimatedCostFunction = manhattanDistance(
          neighbor,
          endingPoint
        );
        neighbor.totalCostFunction =
          neighbor.startCostFunction + neighbor.estimatedCostFunction;
        neighbor.parent = current;
      }
    }
  }
  return [];
}

interface Node {
  value: number;
  position: number[];
  neighbors: Node[];
  totalCostFunction: number;
  startCostFunction: number;
  estimatedCostFunction: number;
  parent?: Node;
}
