// I don't like this solution, something interface-based and state immutability should be nicer

import { createReadStream } from "fs";
import { createInterface } from "readline";

const rs = createReadStream("input", { encoding: "utf-8" });
const lines = createInterface({ input: rs });

class Monkey {
  items: number[] = [];
  operator!: string;
  operand!: string | number;
  divisibleBy!: number;
  whereToThrow: [Monkey?, Monkey?] = [];
  counter = 0;

  constructor() {}

  inspect(): void {
    const length = this.items.length;
    for (let i = 0; i < length; i++) {
      this.throwToMonkey(this.operation());
    }
  }

  setExpressionFromLine(line: string) {
    const [firstNumber, operator, secondNumber] = line
      .substring(line.indexOf("=") + 2)
      .split(" ");
    this.operator = operator;
    this.operand = secondNumber;
  }

  private operation(): number {
    const old = this.items.shift();
    if (!old) return 0;
    let secondNumber;
    if(typeof this.operand === "string" && this.operand === "old")
        secondNumber = old;
    else secondNumber = +this.operand as number;
    let newWorry: number;
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
    return Math.floor(newWorry! / 3);
  }

  private throwToMonkey(worryLevel: number): void {
    this.counter++;
    this.whereToThrow[worryLevel % this.divisibleBy == 0 ? 0 : 1]?.items.push(
      worryLevel
    );
  }
}

const monkeyList = new Array<Monkey>();
const helperArray = new Array<[number?, number?]>();
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
      monkey.items = line.match(/\d+/g)!.map((num) => +num);
      break;
    case 2:
      monkey.setExpressionFromLine(line);
      break;
    case 3:
      monkey.divisibleBy = +line.match(/\d+/g)![0];
      break;
    case 4:
      helper[0] = +line.match(/\d+/g)![0];
      break;
    case 5:
      helper[1] = +line.match(/\d+/g)![0];
      break;
    case 6:
      break;
  }
  i++;
});

lines.on("close", () => {
  monkeyList.forEach((monkey, index) => {
    monkey.whereToThrow = [
      monkeyList[helperArray[index][0]!],
      monkeyList[helperArray[index][1]!],
    ];
  });

  for (let i = 0; i < 20; i++) {
    monkeyList.forEach((monkey) => monkey.inspect());
  }
  monkeyList.sort((a, b) => b.counter - a.counter);
  console.log(monkeyList[0].counter * monkeyList[1].counter);
});
