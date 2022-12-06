import { Solution } from '../types';

const solve = (input: string, length = 4): number => {
  for (let i = 0; i < input.length - length; i++) {
    if (!input.substring(i, i + length).match(/(.).*\1/)) return i + length;
  }
  return 0;
};

export default (dataSet: string): Solution => {
  return { puzzle1: solve(dataSet), puzzle2: solve(dataSet, 14) };
};
