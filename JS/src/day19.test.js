const { test } = require("@jest/globals");
const { part1, part2 } = require("./day19");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "r, wr, b, g, bwu, rb, gb, br",
  "",
  "brwrr",
  "bggr",
  "gbbr",
  "rrbgbr",
  "ubwu",
  "bwurrg",
  "brgr",
  "bbrgwb",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(6);
});

test("Part 1", () => {
  const input = new Input(19).fromLines().get();
  expect(part1(input)).toBe(213);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(16);
});

test("Part 2", () => {
  const input = new Input(19).fromLines().get();
  expect(part2(input)).toBe(1016700771200474);
});
