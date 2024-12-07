const { test } = require("@jest/globals");
const { part1, part2 } = require("./day07");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "190: 10 19",
  "3267: 81 40 27",
  "83: 17 5",
  "156: 15 6",
  "7290: 6 8 6 15",
  "161011: 16 10 13",
  "192: 17 8 14",
  "21037: 9 7 18 13",
  "292: 11 6 16 20",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(3749);
});

test("Part 1", () => {
  const input = new Input(7).fromLines().get();
  expect(part1(input)).toBe(850435817339);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(11387);
});

test("Part 2", () => {
  const input = new Input(7).fromLines().get();
  expect(part2(input)).toBe(104824810233437);
});
