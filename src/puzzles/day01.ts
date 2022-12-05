import {Solution} from '../types';

const getSums = (data: Array<number[]>): number[] => data.map((group: number[]) => group.reduce((a, b) => a + b));

const getLargest = (sums: number[]): number => Math.max(...sums);

const getNLargest = (sums: number[], n = 1): number[] => {
  const nLargest: number[] = [];
  let i = 0;
  while (i < n) {
    const max: number = Math.max(...sums);
    nLargest.push(max);
    sums.splice(sums.indexOf(max), 1);
    i++;
  }
  return nLargest;
};

export default (dataSet: string): Solution => {
  const data: Array<number[]> = dataSet.split('\n\n').map((numbers:string) => {
    return numbers.split('\n').map((number:string) => {
        return parseInt(number);
    });
  });
  const sums: number[] = getSums(data);
  const largest: number = getLargest(sums);
  const largest3: number[] = getNLargest(sums, 3);
  const sumLargest3: number = largest3.reduce((a, b) => a + b);

  return { puzzle1: largest, puzzle2: sumLargest3 };
}





