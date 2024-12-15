const { test } = require("@jest/globals");
const { part1, part2 } = require("./day15");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "##########",
  "#..O..O.O#",
  "#......O.#",
  "#.OO..O.O#",
  "#..O@..O.#",
  "#O#..O...#",
  "#O..O..O.#",
  "#.OO.O.OO#",
  "#....O...#",
  "##########",
  "",
  "<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^",
  "vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v",
  "><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<",
  "<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^",
  "^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><",
  "^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^",
  ">^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^",
  "<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>",
  "^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>",
  "v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(10092);
});

test("Part 1", () => {
  const input = new Input(15).fromLines().get();
  expect(part1(input)).toBe(1421727);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(9021);
});

test("Part 2", () => {
  const input = new Input(15).fromLines().get();
  expect(part2(input)).toBe(1463160);
});
