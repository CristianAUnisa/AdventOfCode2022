import { readFileSync } from "fs";

const mapToVal = (letter: string) => {
  if (letter == "A" || letter == "X") return 0;
  else if (letter == "B" || letter == "Y") return 1;
  else return 2;
};

const input = readFileSync("input", "utf-8");

const result = input
  .split("\n")
  .map((line) => {
    return {
      elf: mapToVal(line.charAt(0)),
      player: mapToVal(line.charAt(2)),
    };
  })
  .reduce(
    (acc, { elf, player }) => {
      if ((elf + 1) % 3 == player) player += 6;
      else if (player == elf) {
        player += 3;
        elf += 3;
      } else {
        elf += 6;
      }
      return {
        elfPoints: acc.elfPoints + elf + 1,
        playerPoints: acc.playerPoints + player + 1,
      };
    },
    { elfPoints: 0, playerPoints: 0 }
  );

console.log(result);
