const { test } = require("@jest/globals");
const { part1, part2 } = require("./day08");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "............",
  "........0...",
  ".....0......",
  ".......0....",
  "....0.......",
  "......A.....",
  "............",
  "............",
  "........A...",
  ".........A..",
  "............",
  "............",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(14);
});

test("Part 1", () => {
  const input = new Input(8).fromLines().get();
  expect(part1(input)).toBe(341);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(34);
});

test("Part 2", () => {
  const input = new Input(8).fromLines().get();
  expect(part2(input)).toBe(1134);
});
