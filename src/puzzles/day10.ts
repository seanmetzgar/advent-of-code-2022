import { Solution } from '../types';

export default (dataSet: string): Solution => {
  const cycleValues: number[] = [1];
  const row = '                                        ';
  const screen: string[][] = [
    row.split(''),
    row.split(''),
    row.split(''),
    row.split(''),
    row.split(''),
    row.split(''),
  ];

  let screenPos = 1;
  let toAdd = 0;
  dataSet.split('\n').forEach((line) => {
    const currentX = cycleValues[cycleValues.length - 1] + toAdd;
    if (line === 'noop') {
      cycleValues.push(currentX);
      if (screenPos <= 240) {
        if (
          currentX <= ((screenPos - 1) % 40) + 1 &&
          currentX >= ((screenPos - 1) % 40) - 1
        ) {
          screen[Math.floor((screenPos - 1) / 40)][(screenPos - 1) % 40] = '#';
        }
      }
      screenPos++;
      toAdd = 0;
    } else {
      const temp = line.split(' ');
      cycleValues.push(...[currentX, currentX]);
      if (screenPos <= 240) {
        if (
          currentX <= ((screenPos - 1) % 40) + 1 &&
          currentX >= ((screenPos - 1) % 40) - 1
        ) {
          screen[Math.floor((screenPos - 1) / 40)][(screenPos - 1) % 40] = '#';
        }
      }
      screenPos++;
      if (screenPos <= 240) {
        if (
          currentX <= ((screenPos - 1) % 40) + 1 &&
          currentX >= ((screenPos - 1) % 40) - 1
        ) {
          screen[Math.floor((screenPos - 1) / 40)][(screenPos - 1) % 40] = '#';
        }
      }
      screenPos++;
      toAdd = parseInt(temp[1]);
    }
  });

  const strengths: number[] = [];
  const startIndex = 20;
  const endIndex = 220;
  const incIndex = 40;
  for (let i = startIndex; i <= endIndex; i += incIndex) {
    strengths.push(cycleValues[i] * i);
  }

  // sum of all strengths
  const puzzle1 = strengths.reduce((a, b) => a + b, 0);

  for (const currentRow of screen) {
    console.log(currentRow.join(''));
  }

  return { puzzle1: puzzle1, puzzle2: 'see above' };
};
