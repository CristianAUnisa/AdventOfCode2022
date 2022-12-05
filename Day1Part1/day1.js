"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var input = (0, fs_1.readFileSync)("input", "utf8");
var i = 0;
var max = 0;
var elfMax = 0;
input.split("\n\n").forEach(function (group) {
    var sum = 0;
    group.split("\n").forEach(function (line) {
        sum += parseInt(line);
    });
    if (!sum)
        return;
    if (sum > max) {
        max = sum;
        elfMax = i;
    }
    console.log("Elf " + i + " Sum " + sum);
    i++;
});
console.log("MAX " + max + " Elf " + elfMax);
