module.exports.part1 = (input) => {
  return getReports(input).reduce(
    (acc, report) => (isValid(report) ? acc + 1 : acc),
    0
  );
};

module.exports.part2 = (input) => {
  return getReports(input).reduce(
    (acc, report) => (isValid2(report) ? acc + 1 : acc),
    0
  );
};

function getReports(input) {
  return input.map((line) => line.split(" ").map(Number));
}

function isValid(report) {
  const direction = Math.sign(report[1] - report[0]);

  for (let i = 1; i < report.length; i++) {
    const diff = report[i] - report[i - 1];
    if (diff === 0) return false;
    if (Math.sign(diff) !== direction) return false;
    if (Math.abs(diff) > 3) return false;
  }
  return true;
}

function isValid2(report) {
  if (isValid(report)) return true;

  for (let i = 0; i < report.length; i++) {
    if (isValid(report.toSpliced(i, 1))) return true;
  }

  return false;
}
