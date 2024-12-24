const { test } = require("@jest/globals");
const { part1, part2 } = require("./day23");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "kh-tc",
  "qp-kh",
  "de-cg",
  "ka-co",
  "yn-aq",
  "qp-ub",
  "cg-tb",
  "vc-aq",
  "tb-ka",
  "wh-tc",
  "yn-cg",
  "kh-ub",
  "ta-co",
  "de-co",
  "tc-td",
  "tb-wq",
  "wh-td",
  "ta-ka",
  "td-qp",
  "aq-cg",
  "wq-ub",
  "ub-vc",
  "de-ta",
  "wq-aq",
  "wq-vc",
  "wh-yn",
  "ka-de",
  "kh-ta",
  "co-tc",
  "wh-qp",
  "tb-vc",
  "td-yn",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(7);
});

test("Part 1", () => {
  const input = new Input(23).fromLines().get();
  expect(part1(input)).toBe(1308);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe("co,de,ka,ta");
});

test("Part 2", () => {
  const input = new Input(23).fromLines().get();
  expect(part2(input)).toBe("bu,fq,fz,pn,rr,st,sv,tr,un,uy,zf,zi,zy");
});
