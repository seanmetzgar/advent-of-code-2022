import { Solution } from '../types';

interface Monkey {
  items: number[];
  operator: string;
  operationA: string;
  operationB: string;
  testNumber: number;
  indexTrue: number;
  indexFalse: number;
  inspected: number;
}

const parseMonkey = (data: string): Monkey => {
  const monkeyRaw = data.split('\n');
  const items = monkeyRaw[1]
    .split('Starting items: ')[1]
    .split(', ')
    .map((item) => parseInt(item));
  const operation = monkeyRaw[2].split('Operation: new = ')[1].split(' ');
  const testNumber = parseInt(monkeyRaw[3].split('Test: divisible by ')[1]);
  const indexTrue = parseInt(
    monkeyRaw[4].split('If true: throw to monkey ')[1],
  );
  const indexFalse = parseInt(
    monkeyRaw[5].split('If false: throw to monkey ')[1],
  );

  return {
    items: items,
    operator: operation[1],
    operationA: operation[0],
    operationB: operation[2],
    testNumber: testNumber,
    indexTrue: indexTrue,
    indexFalse: indexFalse,
    inspected: 0,
  };
};

const doRound = (monkeys: Monkey[], acm = 0): void => {
  for (let i = 0; i < monkeys.length; i++) {
    const tempItems = monkeys[i].items;
    monkeys[i].items = [];

    for (let j = 0; j < tempItems.length; j++) {
      monkeys[i].inspected++;
      const a: number =
        monkeys[i].operationA === 'old'
          ? tempItems[j]
          : parseInt(monkeys[i].operationA);
      const b: number =
        monkeys[i].operationB === 'old'
          ? tempItems[j]
          : parseInt(monkeys[i].operationB);

      let tempValue = tempItems[j];

      if (monkeys[i].operator === '+') {
        tempValue = a + b;
      } else if (monkeys[i].operator === '-') {
        tempValue = a - b;
      } else if (monkeys[i].operator === '*') {
        tempValue = a * b;
      } else if (monkeys[i].operator === '/') {
        tempValue = a / b;
      }

      if (acm > 0) {
        tempValue = tempValue % acm;
      } else {
        tempValue = Math.floor(tempValue / 3);
      }

      if (tempValue % monkeys[i].testNumber === 0) {
        monkeys[monkeys[i].indexTrue].items.push(tempValue);
      } else {
        monkeys[monkeys[i].indexFalse].items.push(tempValue);
      }
    }
  }
};

export default (dataSet: string): Solution => {
  const monkeys = dataSet.split('\n\n').map((monkey) => parseMonkey(monkey));
  const monkeys2 = dataSet.split('\n\n').map((monkey) => parseMonkey(monkey));

  const acm = monkeys2
    .map((monkey) => monkey.testNumber)
    .reduce((a, b) => a * b);

  for (let round = 1; round <= 20; round++) {
    doRound(monkeys);
  }

  for (let round = 1; round <= 10000; round++) {
    doRound(monkeys2, acm);
  }

  // Get two largest monkey.inspected values
  const largest = monkeys.sort((a, b) => b.inspected - a.inspected).slice(0, 2);
  const largest2 = monkeys2
    .sort((a, b) => b.inspected - a.inspected)
    .slice(0, 2);

  const monkeyBusiness = largest[0].inspected * largest[1].inspected;
  const monkeyBusiness2 = largest2[0].inspected * largest2[1].inspected;

  return { puzzle1: monkeyBusiness, puzzle2: monkeyBusiness2 };
};
