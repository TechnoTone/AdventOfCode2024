module.exports.part1 = (input) => {
  const height = input.length;
  const width = input[0].length;
  let count = 0;

  function readLetters(x, y, dx, dy) {
    let letters = "";
    while (letters.length < 4 && x >= 0 && x < width && y >= 0 && y < height) {
      letters += input[y][x];
      x += dx;
      y += dy;
    }
    return letters;
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const hWord = readLetters(x, y, 1, 0);
      const vWord = readLetters(x, y, 0, 1);
      const ddWord = readLetters(x, y, 1, 1);
      const duWord = readLetters(x, y, 1, -1);

      if (hWord === "XMAS") count++;
      if (hWord === "SAMX") count++;
      if (vWord === "XMAS") count++;
      if (vWord === "SAMX") count++;
      if (ddWord === "XMAS") count++;
      if (ddWord === "SAMX") count++;
      if (duWord === "XMAS") count++;
      if (duWord === "SAMX") count++;
    }
  }

  return count;
};

module.exports.part2 = (input) => {
  const height = input.length;
  const width = input[0].length;
  let count = 0;

  readMiddle = (x, y) => input[y + 1][x + 1];
  readCorners = (x, y) =>
    input[y][x] + input[y + 2][x + 2] + input[y][x + 2] + input[y + 2][x];

  const validCorners = new Set(["MSMS", "MSSM", "SMMS", "SMSM"]);

  for (let y = 0; y < height - 2; y++) {
    for (let x = 0; x < width - 2; x++) {
      if (readMiddle(x, y) === "A" && validCorners.has(readCorners(x, y)))
        count++;
    }
  }

  return count;
};
