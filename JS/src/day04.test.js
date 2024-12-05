const { test } = require("@jest/globals");
const { part1, part2 } = require("./day04");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "MMMSXXMASM",
  "MSAMXMSMSA",
  "AMXSXMAAMM",
  "MSAMASMSMX",
  "XMASAMXAMM",
  "XXAMMXXAMA",
  "SMSMSASXSS",
  "SAXAMASAAA",
  "MAMMMXMMMM",
  "MXMXAXMASX",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(18);
});

test("Part 1", () => {
  const input = new Input(4).fromLines().get();
  expect(part1(input)).toBe(2547);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(9);
});

test("Part 2", () => {
  const input = new Input(4).fromLines().get();
  expect(part2(input)).toBe(1939);
});
