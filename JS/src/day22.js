const { repeat, sum } = require("./utils");

module.exports.part1 = (input) => {
  const solve = (secret) => {
    let result = secret;
    repeat(2000, () => {
      result = mixAndPrune(result * 64, result);
      result = mixAndPrune(Math.floor(result / 32), result);
      result = mixAndPrune(result * 2048, result);
    });

    return result;
  };

  return input.map(Number).map(solve).reduce(sum);
};

module.exports.part2 = (input) => {
  let largest = 0;
  const bananas = new Map();

  const solve = (secret) => {
    let result = secret;
    let diffs = [];

    repeat(2000, () => {
      const previousPrice = result % 10;
      result = mixAndPrune(result * 64, result);
      result = mixAndPrune(Math.floor(result / 32), result);
      result = mixAndPrune(result * 2048, result);
      const newPrice = result % 10;

      diffs.push(newPrice - previousPrice);
      if (diffs.length > 4) diffs.shift();
      if (diffs.length === 4) {
        let key = JSON.stringify(diffs);
        if (bananas.has(key)) {
          const sale = bananas.get(key);
          if (!sale.has(secret)) {
            const newTotal = sale.get("total") + newPrice;
            sale.set("total", newTotal);
            sale.set(secret, newPrice);
            if (newTotal > largest) largest = newTotal;
          }
        } else
          bananas.set(
            key,
            new Map([
              [secret, newPrice],
              ["total", newPrice],
            ])
          );
      }
    });
  };

  input.map(Number).forEach(solve);

  return largest;
};

const mixAndPrune = (value, secret) => {
  return secret ^ value % 16777216;
};
