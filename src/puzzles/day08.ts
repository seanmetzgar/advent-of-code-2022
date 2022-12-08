import { Solution } from '../types';

const isVisible = (map: string[][], x: number, y: number): boolean => {
  let visible = true;
  const height = map[y][x];

  // From Top
  for (let i = y - 1; i >= 0; i--) {
    if (map[i][x] >= height) {
      visible = false;
      break;
    }
  }

  if (visible === true) return true;
  visible = true;

  // From Bottom
  for (let i = y + 1; i < map.length; i++) {
    if (map[i][x] >= height) {
      visible = false;
      break;
    }
  }
  if (visible === true) return true;
  visible = true;

  // From Left
  for (let i = x - 1; i >= 0; i--) {
    if (map[y][i] >= height) {
      visible = false;
      break;
    }
  }
  if (visible === true) return true;
  visible = true;

  // From Right
  for (let i = x + 1; i < map[y].length; i++) {
    if (map[y][i] >= height) {
      visible = false;
      break;
    }
  }
  if (visible === true) return true;
  return false;
};

const scenicScore = (map: string[][], x: number, y: number): number => {
  const height = map[y][x];
  //distances
  let north = 0;
  let south = 0;
  let west = 0;
  let east = 0;

  // Looking North
  for (let i = y - 1; i >= 0; i--) {
    north++;
    if (map[i][x] >= height) break;
  }
  // Looking South
  for (let i = y + 1; i < map.length; i++) {
    south++;
    if (map[i][x] >= height) break;
  }
  // Looking West
  for (let i = x - 1; i >= 0; i--) {
    west++;
    if (map[y][i] >= height) break;
  }
  // Looking East
  for (let i = x + 1; i < map[y].length; i++) {
    east++;
    if (map[y][i] >= height) break;
  }

  return north * south * west * east;
};

export default (dataSet: string): Solution => {
  // Start Code
  const map: string[][] = dataSet.split('\n').map((line) => line.split(''));
  let puzzle1 = 0;
  let puzzle2 = 0;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      puzzle1 += isVisible(map, x, y) ? 1 : 0;
      const tempScore = scenicScore(map, x, y);
      puzzle2 = tempScore > puzzle2 ? tempScore : puzzle2;
    }
  }

  return { puzzle1: puzzle1, puzzle2: puzzle2 };
};
