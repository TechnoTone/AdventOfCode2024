const { test, describe } = require("@jest/globals");
const { part1, part2, EXACT, AT_LEAST } = require("./day20");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "###############",
  "#...#...#.....#",
  "#.#.#.#.#.###.#",
  "#S#...#.#.#...#",
  "#######.#.#.###",
  "#######.#.#...#",
  "#######.#.###.#",
  "###..E#...#...#",
  "###.#######.###",
  "#...###...#...#",
  "#.#####.#.###.#",
  "#.#...#.#.#...#",
  "#.#.#.#.#.#.###",
  "#...#...#...###",
  "###############",
];

describe("Part 1 Examples", () => {
  test.each([
    [14, 2],
    [14, 4],
    [2, 6],
    [4, 8],
    [2, 10],
    [3, 12],
    [1, 20],
    [1, 36],
    [1, 38],
    [1, 40],
    [1, 64],
  ])("%p cheats saves %p picoseconds", (cheats, picosecondsSaved) => {
    expect(part1(EXAMPLE_INPUT, picosecondsSaved, EXACT)).toBe(cheats);
  });
});

test("Part 1", () => {
  const input = new Input(20).fromLines().get();
  expect(part1(input, 100, AT_LEAST)).toBe(1327);
});

describe("Part 2 Examples", () => {
  test.each([
    [32, 50],
    [31, 52],
    [29, 54],
    [39, 56],
    [25, 58],
    [23, 60],
    [20, 62],
    [19, 64],
    [12, 66],
    [14, 68],
    [12, 70],
    [22, 72],
    [4, 74],
    [3, 76],
  ])("%p cheats save %p picoseconds", (cheats, picosecondsSaved) => {
    expect(part2(EXAMPLE_INPUT, picosecondsSaved, EXACT)).toBe(cheats);
  });
});

test("Part 2", () => {
  const input = new Input(20).fromLines().get();
  expect(part2(input, 100, AT_LEAST)).toBe(985737);
});
