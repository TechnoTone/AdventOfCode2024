module.exports.part1 = (input) => {
  const { program, aRegister } = parse(input);
  return runProgram(program, aRegister).join(",");
};

module.exports.part2 = (input) => {
  const { program } = parse(input);

  const queue = [{ a: 0, length: 0 }];

  while (queue.length) {
    const current = queue.shift();
    if (current.length === program.length) return current.a;

    for (let n = 0; n < 8; n++) {
      const a = n + current.a * 8;
      const output = runProgram(program, a);
      if (
        output.length === current.length + 1 &&
        program.slice((current.length + 1) * -1).join(",") === output.join(",")
      ) {
        queue.push({ a, length: current.length + 1 });
      }
    }
  }
};

const parse = (input) => {
  const result = {
    program: [],
    aRegister: 0,
  };
  input.forEach((line) => {
    switch (line.split(":")[0]) {
      case "Register A":
        result.aRegister = parseInt(line.split(": ")[1]);
        break;
      case "Program":
        result.program = line
          .split(": ")[1]
          .split(",")
          .map((x) => parseInt(x));
        break;
    }
  });
  return result;
};

const runProgram = (program, aRegister) => {
  const output = [];
  let [a, b, c] = [aRegister, 0, 0];

  const combo = (operand) => {
    if (operand <= 3) return operand;
    if (operand === 4) return a;
    if (operand === 5) return b;
    if (operand === 6) return c;
    if (operand === 7) throw new Error("Invalid combo operand");
  };

  let pointer = 0;
  while (pointer < program.length) {
    const opcode = program[pointer];
    const operand = program[pointer + 1];

    switch (opcode) {
      case 0:
        a = Math.floor(a / Math.pow(2, combo(operand)));
        pointer += 2;
        break;
      case 1:
        b = (b ^ operand) >>> 0;
        pointer += 2;
        break;
      case 2:
        b = combo(operand) % 8;
        pointer += 2;
        break;
      case 3:
        if (a > 0) {
          pointer = operand;
        } else {
          pointer += 2;
        }
        break;
      case 4:
        b = (b ^ c) >>> 0;
        pointer += 2;
        break;
      case 5:
        output.push(combo(operand) % 8);
        pointer += 2;
        break;
      case 6:
        b = Math.floor(a / Math.pow(2, combo(operand)));
        pointer += 2;
        break;
      case 7:
        c = Math.floor(a / Math.pow(2, combo(operand)));
        pointer += 2;
        break;
      default:
        throw new Error("Invalid opcode");
    }
  }

  return output;
};
