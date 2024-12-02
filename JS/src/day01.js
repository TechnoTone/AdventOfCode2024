module.exports.part1 = (input) => {
  const [listA, listB] = parseInput(input);
  listA.sort();
  listB.sort();
  let distance = 0;

  for (let i = 0; i < listA.length; i++) {
    distance += Math.abs(listA[i] - listB[i]);
  }

  return distance;
};

module.exports.part2 = (input) => {
  const [listA, listB] = parseInput(input);
  const scores = {};

  listA.forEach((b) => {
    if (!scores[b]) {
      scores[b] = 1;
    } else {
      scores[b]++;
    }
  });

  return listB.reduce((acc, a) => {
    if (scores[a]) return acc + scores[a] * a;
    return acc;
  }, 0);
};

function parseInput(input) {
  return input.reduce(
    (acc, line) => {
      const [a, b] = line.split(/\s+/).map(Number);
      acc[0].push(a);
      acc[1].push(b);
      return acc;
    },
    [[], []]
  );
}
