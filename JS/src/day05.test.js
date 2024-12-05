const { test } = require("@jest/globals");
const { part1, part2 } = require("./day05");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "47|53",
  "97|13",
  "97|61",
  "97|47",
  "75|29",
  "61|13",
  "75|53",
  "29|13",
  "97|29",
  "53|29",
  "61|53",
  "97|53",
  "61|29",
  "47|13",
  "75|47",
  "97|75",
  "47|61",
  "75|61",
  "47|29",
  "75|13",
  "53|13",
  "",
  "75,47,61,53,29",
  "97,61,53,29,13",
  "75,29,13",
  "75,97,47,61,53",
  "61,13,29",
  "97,13,75,29,47",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(143);
});

test("Part 1", () => {
  const input = new Input(5).fromLines().get();
  expect(part1(input)).toBe(5275);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(123);
});

test("Part 2", () => {
  const input = new Input(5).fromLines().get();
  expect(part2(input)).toBe(6191);
});
