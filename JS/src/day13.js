module.exports.part1 = (input) => {
  const machines = parse(input);
  return machines.reduce((acc, machine) => acc + play(machine), 0);
};

module.exports.part2 = (input) => {
  const machines = parse(input);
  return machines.reduce((acc, machine) => acc + play(machine, true), 0);
};

const parse = (input) => {
  const machines = [];
  let machine = {
    A: {},
    B: {},
    Prize: {},
  };
  for (const line of input) {
    if (line !== "") {
      const [a, b] = line.split(": ");
      const [x, y] = b.split(", ");
      switch (a) {
        case "Button A":
          machine["A"] = {
            x: parseInt(x.split("+")[1]),
            y: parseInt(y.split("+")[1]),
          };
          break;
        case "Button B":
          machine["B"] = {
            x: parseInt(x.split("+")[1]),
            y: parseInt(y.split("+")[1]),
          };
          break;
        case "Prize":
          machine["Prize"] = {
            x: parseInt(x.split("=")[1]),
            y: parseInt(y.split("=")[1]),
          };
          machines.push(machine);
          machine = {
            A: {},
            B: {},
            Prize: {},
          };
          break;
      }
    }
  }
  return machines;
};

const play = (machine, part2 = false) => {
  const part1 = !part2;

  const correction = part1 ? 0 : 10000000000000;

  const px = machine.Prize.x + correction;
  const py = machine.Prize.y + correction;

  const d = machine.A.x * machine.B.y - machine.A.y * machine.B.x;
  const dx = px * machine.B.y - py * machine.B.x;
  const dy = machine.A.x * py - machine.A.y * px;

  if (dx % d !== 0 || dy % d !== 0) {
    return 0;
  }

  const aPresses = dx / d;
  const bPresses = dy / d;

  if (part1 && (aPresses > 100 || bPresses > 100)) {
    return 0;
  }

  return aPresses * 3 + bPresses;
};
