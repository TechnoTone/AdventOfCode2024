const { test } = require("@jest/globals");
const { part1, part2 } = require("./day10");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "89010123",
  "78121874",
  "87430965",
  "96549874",
  "45678903",
  "32019012",
  "01329801",
  "10456732",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(36);
});

test("Part 1", () => {
  const input = new Input(10).fromLines().get();
  expect(part1(input)).toBe(820);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(81);
});

test("Part 2", () => {
  const input = new Input(10).fromLines().get();
  expect(part2(input)).toBe(1786);
});
