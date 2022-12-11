"use strict";
// I don't like this solution, something interface-based and state immutability should be nicer
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const readline_1 = require("readline");
const rs = (0, fs_1.createReadStream)("input", { encoding: "utf-8" });
const lines = (0, readline_1.createInterface)({ input: rs });
class Monkey {
    static productOfDividers = 1;
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
                newWorry = (old + secondNumber) % Monkey.productOfDividers;
                break;
            case "*":
                newWorry = (old * secondNumber) % Monkey.productOfDividers;
                break;
            case "/":
                newWorry = (old / secondNumber) % Monkey.productOfDividers;
                break;
            case "-":
                newWorry = (old - secondNumber) % Monkey.productOfDividers;
                break;
            case "%":
                newWorry = (old % secondNumber) % Monkey.productOfDividers;
                break;
        }
        return newWorry;
    }
    throwToMonkey(worryLevel) {
        this.counter++;
        this.whereToThrow[worryLevel % this.divisibleBy == 0 ? 0 : 1]?.items.push(worryLevel);
    }
}
const monkeyList = new Array();
const helperArray = new Array();
let i = 0;
lines.on("line", (line) => {
    const monkey = monkeyList[monkeyList.length - 1];
    const helper = helperArray[helperArray.length - 1];
    switch (i % 7) {
        case 0:
            monkeyList.push(new Monkey());
            helperArray.push([]);
            break;
        case 1:
            monkey.items = line.match(/\d+/g).map((num) => +num);
            break;
        case 2:
            monkey.setExpressionFromLine(line);
            break;
        case 3:
            monkey.divisibleBy = +line.match(/\d+/g)[0];
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
    Monkey.productOfDividers = monkeyList.reduce((acc, monkey) => acc * monkey.divisibleBy, 1);
    monkeyList.forEach((monkey, index) => {
        monkey.whereToThrow = [
            monkeyList[helperArray[index][0]],
            monkeyList[helperArray[index][1]],
        ];
    });
    for (let i = 0; i < 10000; i++) {
        monkeyList.forEach((monkey) => {
            monkey.inspect();
            // console.log(monkey.counter);
        });
        // console.log("_");
    }
    monkeyList.sort((a, b) => b.counter - a.counter);
    console.log(monkeyList[0].counter * monkeyList[1].counter);
});
