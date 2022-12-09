//TODO: I'd like to have only one between children or parent, dunno if that's possible

import { createReadStream, Dir } from "fs";
import { createInterface } from "readline";

interface Resource {
  name: string;
}

interface File extends Resource {
  size: number;
}

interface Directory extends Resource {
  children: Array<File | Directory>;
  parent?: Directory;
}

interface Command {
  command: "cd" | "ls";
  parameter: string;
}

const rs = createReadStream("input", { encoding: "utf-8" });
const lines = createInterface({ input: rs });

const results: number[] = [];

const findTotalSize100000 = (res: Directory | File): number => {
  let result;
  if ("size" in res) {
    return res.size;
  } else {
    result = res.children.reduce((acc, child) => acc + findTotalSize100000(child), 0);
  }
  if (result <= 100000) results.push(result);
  return result;
};

const commands = new Array<Command>();
let root: Directory = { name: "/", children: [] };
let currentDir: Directory = root;
let first = true;

lines.on("line", (line) => {
  if (first) {
    first = false;
    return;
  }
  if (line.startsWith("$")) {
    const command = line.substring(2, 4) as "cd" | "ls";
    const parameter = line.substring(5);
    commands.push({ command, parameter });
    if (command == "cd") {
      currentDir =
        parameter == ".."
          ? currentDir.parent!
          : (currentDir.children.find(
              (res) => res.name == parameter
            )! as Directory);
    }
  } else if (line.startsWith("dir")) {
    currentDir.children.push({ name: line.substring(4), children: [], parent: currentDir});
  } else {
    currentDir.children.push({
      name: line.match(/[A-Za-z\.]+/g)![0],
      size: line.match(/\d+/g)!.map((char) => +char)[0],
    });
  }
});

lines.on("close", () => {
  findTotalSize100000(root);
  console.log(results.reduce((acc, res) => acc + res, 0));
});
