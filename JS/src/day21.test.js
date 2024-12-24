const { test } = require("@jest/globals");
const { part1, part2 } = require("./day21");
const Input = require("./input");
const EXAMPLE_INPUT = ["029A", "980A", "179A", "456A", "379A"];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(126384);
});

test("Part 1", () => {
  const input = new Input(21).fromLines().get();
  expect(part1(input)).toBe(123096);
});

test("Part 2", () => {
  const input = new Input(21).fromLines().get();
  expect(part2(input)).toBe(154517692795352);
});
