"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const readline_1 = require("readline");
const rs = (0, fs_1.createReadStream)("input", { encoding: "utf-8" });
const lines = (0, readline_1.createInterface)({ input: rs });
const results = [];
const findTotalSize100000 = (res) => {
    let result;
    if ("size" in res) {
        return res.size;
    }
    else {
        result = res.children.reduce((acc, child) => acc + findTotalSize100000(child), 0);
    }
    if (result <= 100000)
        results.push(result);
    return result;
};
const commands = new Array();
const directories = new Array();
const files = new Array();
let root = { name: "/", children: [] };
let currentDir = root;
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
        currentDir.children.push({ name: line.substring(4), children: [], parent: currentDir });
    }
    else {
        currentDir.children.push({
            name: line.match(/[A-Za-z\.]+/g)[0],
            size: line.match(/\d+/g).map((char) => +char)[0],
        });
    }
});
lines.on("close", () => {
    findTotalSize100000(root);
    console.log(results.reduce((acc, res) => acc + res, 0));
});
