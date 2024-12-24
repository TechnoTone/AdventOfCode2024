const { test } = require("@jest/globals");
const { part1, part2 } = require("./day22");
const Input = require("./input");
const EXAMPLE_INPUT = ["1", "10", "100", "2024"];
const EXAMPLE_INPUT_2 = ["1", "2", "3", "2024"];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(37327623);
});

test("Part 1", () => {
  const input = new Input(22).fromLines().get();
  expect(part1(input)).toBe(13234715490);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT_2)).toBe(23);
});

test("Part 2", () => {
  const input = new Input(22).fromLines().get();
  expect(part2(input)).toBe(1490);
});
