"use strict";
//TODO: I don't really like this solution, maybe I'll revisit it later
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const rs = (0, fs_1.createReadStream)("input", { encoding: "utf-8" });
const helper = [];
rs.on("readable", () => {
    let char = rs.read(1);
    let i = 1;
    while (char !== null) {
        if (helper.includes(char)) {
            helper.length = 0;
        }
        else if (helper.length == 4)
            helper.shift();
        if (helper.length == 3 && !helper.includes(char))
            break;
        helper.push(char);
        i++;
        char = rs.read(1);
    }
    console.log(i);
    rs.close();
});
