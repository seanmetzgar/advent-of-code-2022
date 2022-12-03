interface Day01 {
  puzzle1?: number;
  puzzle2?: number;
  data?: Array<number[]>;
  sums?: number[];
}

const getSums = (data: Array<number[]>): number[] => data.map((group: number[]) => group.reduce((a, b) => a + b));

const getLargest = (sums: number[]): number => Math.max(...sums);

const getNLargest = (sums: number[], n: number = 1): number[] => {
  let nLargest: number[] = [], i: number = 0;
  while (i < n) {
    let max: number = Math.max(...sums);
    nLargest.push(max);
    sums.splice(sums.indexOf(max), 1);
    i = i + 1;
  }
  return nLargest;
};

const getFirstIndex = (sums: number[], value: number): number => sums.indexOf(value);

const getAllIndexes = (sums: number[], value: number): number[] => {
  let indexes: number[] = [], currentIndex: number  = 0;
  do {
    let nextIndex: number = sums.indexOf(value, currentIndex);
    if (nextIndex === -1) break;
    indexes.push(nextIndex);
    currentIndex = currentIndex + 1;
  } while (currentIndex < sums.length)
  return indexes;
}

export default (dataSet: string): Day01 => {
  let data: Array<number[]> = dataSet.split('\n\n').map((numbers:string) => {
    return numbers.split('\n').map((number:string) => {
        return parseInt(number);
    });
  });
  let sums: number[] = getSums(data);
  let largest: number = getLargest(sums);
  let largest3: number[] = getNLargest(sums, 3);
  let sumLargest3: number = largest3.reduce((a, b) => a + b);

  return { puzzle1: largest, puzzle2: sumLargest3 };
}





