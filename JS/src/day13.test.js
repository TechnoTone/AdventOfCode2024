const { test } = require("@jest/globals");
const { part1, part2 } = require("./day13");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "Button A: X+94, Y+34",
  "Button B: X+22, Y+67",
  "Prize: X=8400, Y=5400",
  "",
  "Button A: X+26, Y+66",
  "Button B: X+67, Y+21",
  "Prize: X=12748, Y=12176",
  "",
  "Button A: X+17, Y+86",
  "Button B: X+84, Y+37",
  "Prize: X=7870, Y=6450",
  "",
  "Button A: X+69, Y+23",
  "Button B: X+27, Y+71",
  "Prize: X=18641, Y=10279",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(480);
});

test("Part 1", () => {
  const input = new Input(13).fromLines().get();
  expect(part1(input)).toBe(31897);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(875318608908);
});

test("Part 2", () => {
  const input = new Input(13).fromLines().get();
  expect(part2(input)).toBe(87596249540359);
});
