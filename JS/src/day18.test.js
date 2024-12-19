const { test } = require("@jest/globals");
const { part1, part2 } = require("./day18");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "5,4",
  "4,2",
  "4,5",
  "3,0",
  "2,1",
  "6,3",
  "2,4",
  "1,5",
  "0,6",
  "3,3",
  "2,6",
  "5,1",
  "1,2",
  "5,5",
  "2,5",
  "6,5",
  "1,4",
  "0,4",
  "6,4",
  "1,1",
  "6,1",
  "1,0",
  "0,5",
  "1,6",
  "2,0",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT, 6, 12)).toBe(22);
});

test("Part 1", () => {
  const input = new Input(18).fromLines().get();
  expect(part1(input, 70, 1024)).toBe(260);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT, 6)).toBe("6,1");
});

test("Part 2", () => {
  const input = new Input(18).fromLines().get();
  expect(part2(input, 70)).toBe("24,48");
});
