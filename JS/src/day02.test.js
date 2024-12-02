const { test } = require("@jest/globals");
const { part1, part2 } = require("./day02");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "7 6 4 2 1",
  "1 2 7 8 9",
  "9 7 6 2 1",
  "1 3 2 4 5",
  "8 6 4 4 1",
  "1 3 6 7 9",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(2);
});

test("Part 1", () => {
  const input = new Input(2).fromLines().get();
  expect(part1(input)).toBe(631);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(4);
});

test("Part 2", () => {
  const input = new Input(2).fromLines().get();
  expect(part2(input)).toBe(665);
});
