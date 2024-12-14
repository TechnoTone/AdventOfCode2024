const { test } = require("@jest/globals");
const { part1, part2 } = require("./day14");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "p=0,4 v=3,-3",
  "p=6,3 v=-1,-3",
  "p=10,3 v=-1,2",
  "p=2,0 v=2,-1",
  "p=0,0 v=1,3",
  "p=3,0 v=-2,-2",
  "p=7,6 v=-1,-3",
  "p=3,0 v=-1,-2",
  "p=9,3 v=2,3",
  "p=7,3 v=-1,2",
  "p=2,4 v=2,-3",
  "p=9,5 v=-3,-3",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT, 11, 7)).toBe(12);
});

test("Part 1", () => {
  const input = new Input(14).fromLines().get();
  expect(part1(input, 101, 103)).toBe(232253028);
});

test("Part 2", () => {
  const input = new Input(14).fromLines().get();
  expect(part2(input, 101, 103)).toBe(8179);
});
