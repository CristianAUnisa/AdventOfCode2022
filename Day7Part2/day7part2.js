"use strict";
//TODO: I'd like to have only one between children or parent, dunno if that's possible
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const readline_1 = require("readline");
const rs = (0, fs_1.createReadStream)("input", { encoding: "utf-8" });
const lines = (0, readline_1.createInterface)({ input: rs });
const diskSize = 70000000;
const updateSpaceNeeded = 30000000;
const results = [];
const freeMinSpaceForUpdate = (res, diskSize, updateSpace, spaceUsed) => {
    let minSpace = diskSize;
    const findMin = (res) => {
        let result;
        if ("size" in res) {
            return res.size;
        }
        else {
            result = res.children.reduce((acc, child) => acc + findMin(child), 0);
        }
        if (diskSize - spaceUsed + result >= updateSpace && result < minSpace)
            minSpace = result;
        return result;
    };
    findMin(res);
    return minSpace;
};
const commands = new Array();
let root = { name: "/", children: [] };
let currentDir = root;
let spaceUsed = 0;
let first = true;
lines.on("line", (line) => {
    if (first) {
        first = false;
        return;
    }
    if (line.startsWith("$")) {
        const command = line.substring(2, 4);
        const parameter = line.substring(5);
        commands.push({ command, parameter });
        if (command == "cd") {
            currentDir =
                parameter == ".."
                    ? currentDir.parent
                    : currentDir.children.find((res) => res.name == parameter);
        }
    }
    else if (line.startsWith("dir")) {
        currentDir.children.push({
            name: line.substring(4),
            children: [],
            parent: currentDir,
        });
    }
    else {
        const file = {
            name: line.match(/[A-Za-z\.]+/g)[0],
            size: line.match(/\d+/g).map((char) => +char)[0],
        };
        currentDir.children.push(file);
        spaceUsed += file.size;
    }
});
lines.on("close", () => {
    console.log(freeMinSpaceForUpdate(root, diskSize, updateSpaceNeeded, spaceUsed));
    console.log(results.reduce((acc, res) => acc + res, 0));
});
