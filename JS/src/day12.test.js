const { test } = require("@jest/globals");
const { part1, part2 } = require("./day12");
const Input = require("./input");
const EXAMPLE_1 = ["AAAA", "BBCD", "BBCC", "EEEC"];
const EXAMPLE_2 = ["OOOOO", "OXOXO", "OOOOO", "OXOXO", "OOOOO"];
const EXAMPLE_3 = [
  "RRRRIICCFF",
  "RRRRIICCCF",
  "VVRRRCCFFF",
  "VVRCCCJFFF",
  "VVVVCJJCFE",
  "VVIVCCJJEE",
  "VVIIICJJEE",
  "MIIIIIJJEE",
  "MIIISIJEEE",
  "MMMISSJEEE",
];
const EXAMPLE_4 = ["EEEEE", "EXXXX", "EEEEE", "EXXXX", "EEEEE"];
const EXAMPLE_5 = ["AAAAAA", "AAABBA", "AAABBA", "ABBAAA", "ABBAAA", "AAAAAA"];

test("Part 1 Examples", () => {
  expect(part1(EXAMPLE_1)).toBe(140);
  expect(part1(EXAMPLE_2)).toBe(772);
  expect(part1(EXAMPLE_3)).toBe(1930);
});

test("Part 1", () => {
  const input = new Input(12).fromLines().get();
  expect(part1(input)).toBe(1465968);
});

test("Part 2 Examples", () => {
  expect(part2(EXAMPLE_1)).toBe(80);
  expect(part2(EXAMPLE_2)).toBe(436);
  expect(part2(EXAMPLE_3)).toBe(1206);
  expect(part2(EXAMPLE_4)).toBe(236);
  expect(part2(EXAMPLE_5)).toBe(368);
});

test("Part 2", () => {
  const input = new Input(12).fromLines().get();
  expect(part2(input)).toBe(897702);
});
