const { test } = require("@jest/globals");
const { part1, part2 } = require("./day17");
const Input = require("./input");
const EXAMPLE_INPUT_1 = [
  "Register A: 729",
  "Register B: 0",
  "Register C: 0",
  "",
  "Program: 0,1,5,4,3,0",
];
const EXAMPLE_INPUT_2 = [
  "Register A: 2024",
  "Register B: 0",
  "Register C: 0",
  "",
  "Program: 0,3,5,4,3,0",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT_1)).toBe("4,6,3,5,6,3,5,2,1,0");
});

test("Part 1", () => {
  const input = new Input(17).fromLines().get();
  expect(part1(input)).toBe("3,6,3,7,0,7,0,3,0");
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT_2)).toBe(117440);
});

test("Part 2", () => {
  const input = new Input(17).fromLines().get();
  expect(part2(input)).toBe(136904920099226);
});
