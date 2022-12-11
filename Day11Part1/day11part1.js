"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const readline_1 = require("readline");
const rs = (0, fs_1.createReadStream)("input", { encoding: "utf-8" });
const lines = (0, readline_1.createInterface)({ input: rs });
class Monkey {
    items = [];
    operator;
    operand;
    divisibleBy;
    whereToThrow = [];
    counter = 0;
    constructor() { }
    inspect() {
        const length = this.items.length;
        for (let i = 0; i < length; i++) {
            this.throwToMonkey(this.operation());
        }
    }
    setExpressionFromLine(line) {
        const [firstNumber, operator, secondNumber] = line
            .substring(line.indexOf("=") + 2)
            .split(" ");
        this.operator = operator;
        this.operand = secondNumber;
    }
    operation() {
        const old = this.items.shift();
        if (!old)
            return 0;
        let secondNumber;
        if (typeof this.operand === "string" && this.operand === "old")
            secondNumber = old;
        else
            secondNumber = +this.operand;
        let newWorry;
        switch (this.operator) {
            case "+":
                newWorry = old + secondNumber;
                break;
            case "*":
                newWorry = old * secondNumber;
                break;
            case "/":
                newWorry = old / secondNumber;
                break;
            case "-":
                newWorry = old - secondNumber;
                break;
            case "%":
                newWorry = old % secondNumber;
                break;
        }
        return Math.floor(newWorry / 3);
    }
    throwToMonkey(worryLevel) {
        this.counter++;
        this.whereToThrow[worryLevel % this.divisibleBy == 0 ? 0 : 1]?.items.push(worryLevel);
    }
}
const scimie = new Array();
const helperArray = new Array();
let i = 0;
lines.on("line", (line) => {
    const scimia = scimie[scimie.length - 1];
    const helper = helperArray[helperArray.length - 1];
    switch (i % 7) {
        case 0:
            scimie.push(new Monkey());
            helperArray.push([]);
            break;
        case 1:
            scimia.items = line.match(/\d+/g).map((num) => +num);
            break;
        case 2:
            scimia.setExpressionFromLine(line);
            break;
        case 3:
            scimia.divisibleBy = +line.match(/\d+/g)[0];
            break;
        case 4:
            helper[0] = +line.match(/\d+/g)[0];
            break;
        case 5:
            helper[1] = +line.match(/\d+/g)[0];
            break;
        case 6:
            break;
    }
    i++;
});
lines.on("close", () => {
    scimie.forEach((scimia, index) => {
        scimia.whereToThrow = [
            scimie[helperArray[index][0]],
            scimie[helperArray[index][1]],
        ];
    });
    for (let i = 0; i < 20; i++) {
        scimie.forEach((scimia) => scimia.inspect());
    }
    scimie.sort((a, b) => b.counter - a.counter);
    console.log(scimie[0].counter * scimie[1].counter);
});
