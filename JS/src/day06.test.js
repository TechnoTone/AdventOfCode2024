const { test } = require("@jest/globals");
const { part1, part2 } = require("./day06");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "....#.....",
  ".........#",
  "..........",
  "..#.......",
  ".......#..",
  "..........",
  ".#..^.....",
  "........#.",
  "#.........",
  "......#...",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(41);
});

test("Part 1", () => {
  const input = new Input(6).fromLines().get();
  expect(part1(input)).toBe(4647);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(6);
});

test("Part 2", () => {
  const input = new Input(6).fromLines().get();
  expect(part2(input)).toBe(1723);
});
