"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var input = (0, fs_1.readFileSync)("input", "utf8");
var i = 0;
var max = [{ sum: 0, elf: 0 }, { sum: 0, elf: 1 }, { sum: 0, elf: 2 }];
input.split("\n\n").forEach(function (group) {
    var sum = 0;
    group.split("\n").forEach(function (line) {
        sum += parseInt(line);
    });
    if (!sum)
        return;
    if (sum > max[0].sum) {
        max[0].sum = sum;
        max[0].elf = i;
        max.sort(function (a, b) { return a.sum - b.sum; });
    }
    console.log("Elf " + i + " Sum " + sum);
    i++;
});
console.log("SUM IS " + max.reduce(function (a, b) { return a + b.sum; }, 0));
