import { Solution } from '../types';

type CompareItem = number | undefined | CompareItem[];

const compare = (a: CompareItem, b: CompareItem): boolean | undefined => {
	if (typeof a === 'number' && typeof b === 'number') {
		return a > b ? false : a < b ? true : undefined;
	} else if (Array.isArray(a) !== Array.isArray(b)) {
    if (!Array.isArray(a)) { a = [a]; }
    if (!Array.isArray(b)) { b = [b]; }
    return compare(a, b);
	}

  if (Array.isArray(a) && Array.isArray(b)) {
    for (let i = 0, end = Math.max(a.length, b.length); i < end; i++) {
      if (a[i] === undefined) return true;
      if (b[i] === undefined) return false;
      const result = compare(a[i], b[i]);
      if (result !== undefined) return result;
    }
  }

	return undefined;
}

const puzzle1 = (group1: CompareItem[], group2: CompareItem[]): number => {
  let count = 0;
  for (let i: number = 0; i < Math.max(group1.length, group2.length); i++) {
    count += compare(group1[i], group2[i]) ? i + 1 : 0;

  }

  return count;
}

export default (dataSet: string): Solution => {
  const group1: CompareItem[] = [];
  const group2: CompareItem[] = [];

  dataSet.split('\n\n').forEach((group: string) => {
    const parts = group.split('\n');
    group1.push(JSON.parse(parts[0]));
    group2.push(JSON.parse(parts[1]));
  });

  return { puzzle1: puzzle1(group1, group2), puzzle2: 0 };
};