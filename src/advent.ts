import Puzzles from './puzzles';
import Data from './data';

const lb = () => {
  console.log('\n');
};

console.group('Day 1');
const day01 = Puzzles.day01(Data.day01);
console.log('Day 1:', day01);
console.groupEnd();
lb();

console.group('Day 2');
const day02 = Puzzles.day02(Data.day02);
console.log('Day 2:', day02);
console.groupEnd();
lb();
