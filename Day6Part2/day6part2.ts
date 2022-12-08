//TODO: I don't really like this solution, maybe I'll revisit it later

import { createReadStream } from "fs";

const rs = createReadStream("input", { encoding: "utf-8" });

const helper: string[] = [];

rs.on("readable", () => {
  let char = rs.read(1);
  let i = 1;

  while (char !== null) {
    const index = helper.indexOf(char);
    if (index != -1) {
      helper.splice(0, index + 1);
    } else if (helper.length == 14) helper.shift();
    if (helper.length == 13 && !helper.includes(char)) break;
    helper.push(char);
    i++;
    char = rs.read(1);
  }
  console.log(i);
  rs.close();
});
