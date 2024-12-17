const { test } = require("@jest/globals");
const { part1, part2 } = require("./day16");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "###############",
  "#.......#....E#",
  "#.#.###.#.###.#",
  "#.....#.#...#.#",
  "#.###.#####.#.#",
  "#.#.#.......#.#",
  "#.#.#####.###.#",
  "#...........#.#",
  "###.#.#####.#.#",
  "#...#.....#.#.#",
  "#.#.#.###.#.#.#",
  "#.....#...#.#.#",
  "#.###.#.#.#.#.#",
  "#S..#.....#...#",
  "###############",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(7036);
});

test("Part 1", () => {
  const input = new Input(16).fromLines().get();
  expect(part1(input)).toBe(102504);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(45);
});

test("Part 2", () => {
  const input = new Input(16).fromLines().get();
  expect(part2(input)).toBe(535);
});
