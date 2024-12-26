const { combinations } = require("./utils");

module.exports.part1 = (input) => {
  const { wires, gates } = parse(input);

  const run = () => {
    const queue = [...gates];
    while (queue.length) {
      const { a, op, b, output } = queue.shift();
      if (wires.has(a) && wires.has(b)) {
        switch (op) {
          case "AND":
            wires.set(output, wires.get(a) & wires.get(b));
            break;
          case "OR":
            wires.set(output, wires.get(a) | wires.get(b));
            break;
          case "XOR":
            wires.set(output, wires.get(a) ^ wires.get(b));
            break;
        }
      } else {
        queue.push({ a, op, b, output });
      }
    }
  };

  const getZOutput = () => {
    let output = 0;

    for (const [wire, value] of wires) {
      if (wire.startsWith("z")) {
        if (value) {
          wireNumber = parseInt(wire.slice(1));
          output += Math.pow(2, wireNumber);
        }
      }
    }

    return output;
  };

  run();
  return getZOutput();
};

module.exports.part2 = (input) => {
  const { gates } = parse(input);

  const dodgyGates = new Set();
  const isDodgyGate = (gate) => dodgyGates.add(gate.output);

  //  A XOR B   -> t1
  //  A AND B   -> t2
  // t1 AND CIN -> t3
  // t1 XOR CIN -> OUTPUT
  // t2 OR  t3  -> COUT

  const inputXORGates = gates.filter(isInputGate).filter(hasOp("XOR"));
  const otherXORGates = gates.filter(notInputGate).filter(hasOp("XOR"));
  const outputGates = gates.filter(isOutputGate);

  otherXORGates.filter(notOutputGate).forEach(isDodgyGate);
  outputGates.filter(notLastGate).filter(notOp("XOR")).forEach(isDodgyGate);
  outputGates.filter(isLastGate).filter(notOp("OR")).forEach(isDodgyGate);

  inputXORGates
    .filter(
      ({ output }) =>
        output !== "z00" &&
        !dodgyGates.has(output) &&
        !otherXORGates.some(hasInput(output))
    )
    .forEach(({ a, output }) => {
      dodgyGates.add(output);

      const intendedResult = `z${a.slice(1)}`;
      const target = otherXORGates.find(hasOutput(intendedResult));

      const orMatch = gates
        .filter(hasOp("OR"))
        .find((gate) => [target.a, target.b].includes(gate.output));

      if (target.a !== orMatch.output) dodgyGates.add(target.a);
      if (target.b !== orMatch.output) dodgyGates.add(target.b);
    });

  return [...dodgyGates].toSorted().join(",");
};

const parse = (input) => {
  const wires = new Map();
  const gates = [];

  for (const line of input) {
    if (line.includes(":")) {
      const [wire, value] = line.split(": ");
      wires.set(wire, Number(value));
    } else if (line.includes("->")) {
      const [a, op, b, _, output] = line.split(" ");
      gates.push({ a, op, b, output });
    }
  }

  return { wires, gates };
};

const isInputGate = (gate) =>
  gate.a.startsWith("x") ||
  gate.b.startsWith("x") ||
  gate.a.startsWith("y") ||
  gate.b.startsWith("y");
const notInputGate = (gate) => !isInputGate(gate);
const isOutputGate = (gate) => gate.output.startsWith("z");
const notOutputGate = (gate) => !gate.output.startsWith("z");
const hasOp = (op) => (gate) => gate.op === op;
const notOp = (op) => (gate) => gate.op !== op;
const hasInput = (input) => (gate) => gate.a === input || gate.b === input;
const hasOutput = (output) => (gate) => gate.output === output;
const isLastGate = (gate) => gate.output === "z45";
const notLastGate = (gate) => gate.output !== "z45";
