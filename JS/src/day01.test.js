const { test } = require("@jest/globals");
const { part1, part2 } = require("./day01");
const Input = require("./input");
const EXAMPLE_INPUT = ["3   4", "4   3", "2   5", "1   3", "3   9", "3   3"];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(11);
});

test("Part 1", () => {
  const input = new Input(1).fromLines().get();
  expect(part1(input)).toBe(2285373);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(31);
});

test("Part 2", () => {
  const input = new Input(1).fromLines().get();
  expect(part2(input)).toBe(21142653);
});
