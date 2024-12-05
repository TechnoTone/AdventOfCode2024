module.exports.part1 = (input) => {
  const [rules, updates] = parse(input);
  return updates
    .filter((update) => isValidUpdate(update, rules))
    .reduce((acc, n) => acc + getMiddleNumber(n), 0);
};

module.exports.part2 = (input) => {
  const [rules, updates] = parse(input);
  const invalidUpdates = updates.filter(
    (update) => !isValidUpdate(update, rules)
  );

  const fixedUpdates = invalidUpdates.map((update) => fixUpdate(update, rules));
  return fixedUpdates.reduce((acc, n) => acc + getMiddleNumber(n), 0);
};

parse = (input) => {
  const parsed = input.reduce(
    (acc, line) =>
      line.includes("|")
        ? [[...acc[0], line.split("|").map(Number)], acc[1]]
        : line.includes(",")
        ? [acc[0], [...acc[1], line.split(",").map(Number)]]
        : acc,
    [[], []]
  );

  const rules = getRules(parsed[0]);
  return [rules, parsed[1]];
};

getRules = (rules) =>
  rules.reduce((acc, rule) => {
    if (acc[rule[0]]) {
      acc[rule[0]].add(rule[1]);
    } else {
      acc[rule[0]] = new Set([rule[1]]);
    }
    if (!acc[rule[1]]) {
      acc[rule[1]] = new Set();
    }
    return acc;
  }, {});

isValidUpdate = (update, rules) => {
  if (update.length <= 1) return true;

  for (let i = 1; i < update.length; i++) {
    if (!rules[update[0]].has(update[i])) {
      return false;
    }
  }

  return isValidUpdate(update.slice(1), rules);
};

fixUpdate = (update, rules) => {
  if (update.length <= 1) return update;

  if (update.slice(1).every((n) => rules[update[0]].has(n))) {
    return [update[0]].concat(fixUpdate(update.slice(1), rules));
  } else {
    return fixUpdate(update.slice(1).concat(update[0]), rules);
  }
};

getMiddleNumber = (update) => update[(update.length - 1) / 2];
