import { Solution } from '../types';

interface Move {
  items: number;
  from: number;
  to: number;
}

const getMoves = (movesRaw: string): Move[] => {
  const moves: Move[] = movesRaw
    .split('\n')
    .map((move: string) => {
      const matches: string[] | null = move.match(
        /move (\d+) from (\d+) to (\d+)/,
      );
      if (matches) {
        return {
          items: parseInt(matches[1]),
          from: parseInt(matches[2]) - 1,
          to: parseInt(matches[3]) - 1,
        };
      } else {
        return null;
      }
    })
    .filter((move: Move | null) => move !== null) as Move[];

  return moves;
};
const getStacks = (stacksRaw: string): Array<string[]> => {
  const stacksData = stacksRaw.split('\n');
  stacksData.pop();
  const rows: Array<string[]> = [];
  if (stacksData) {
    for (let i = 0; i < stacksData.length; i++) {
      stacksData[i] += ' ';
      const rowMatches = stacksData[i].match(/((\[[A-Z]\]\s)|(\s{4}))/g);
      if (rowMatches) {
        //strip out the spaces and brackets from each item in the row
        const row = rowMatches.map((item) => item.replace(/\s|\[|\]/g, ''));
        rows.push(row);
      }
    }
  }

  //convert rows to columns
  const columns: Array<string[]> = [];
  for (let i = rows.length - 1; i >= 0; i--) {
    for (let j = 0; j < rows[i].length; j++) {
      if (columns[j]) {
        if (rows[i][j] != '') columns[j].push(rows[i][j]);
      } else {
        if (rows[i][j] != '') columns[j] = [rows[i][j]];
      }
    }
  }

  return columns;
};

const getSolution = (
  stacks: Array<string[]>,
  moves: Move[],
  puzzle2 = false,
): string => {
  moves.forEach((move: Move) => {
    const items = stacks[move.from].splice(
      stacks[move.from].length - move.items,
      move.items,
    );
    //reverse the items so they are in the correct order when added to the new stack
    if (puzzle2 !== true) items.reverse();
    //add the items to the new stack
    stacks[move.to].push(...items);
  });

  return stacks
    .map((stack: string[]) => stack[stack.length - 1] || ' ')
    .join('');
};

export default (dataSet: string): Solution => {
  const data = dataSet.split('\n\n');
  const stacks1 = getStacks(data[0]);
  const stacks2 = getStacks(data[0]);
  const moves = getMoves(data[1]);

  return {
    puzzle1: getSolution(stacks1, moves),
    puzzle2: getSolution(stacks2, moves, true),
  };
};
