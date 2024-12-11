const { test } = require("@jest/globals");
const { part1, part2 } = require("./day11");
const Input = require("./input");
const EXAMPLE_INPUT = "125 17";

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(55312);
});

test("Part 1", () => {
  const input = new Input(11).get();
  expect(part1(input)).toBe(183248);
});

test("Part 2", () => {
  const input = new Input(11).get();
  expect(part2(input)).toBe(218811774248729);
});
