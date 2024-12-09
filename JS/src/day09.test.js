const { test } = require("@jest/globals");
const { part1, part2 } = require("./day09");
const Input = require("./input");
const EXAMPLE_INPUT = "2333133121414131402".split("").map(Number);

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(1928);
});

test("Part 1", () => {
  const input = new Input(9).asIntArray();
  expect(part1(input)).toBe(6390180901651);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(2858);
});

test("Part 2", () => {
  const input = new Input(9).asIntArray();
  expect(part2(input)).toBe(6412390114238);
});
