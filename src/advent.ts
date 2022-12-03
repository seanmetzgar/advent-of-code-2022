import Puzzles from './puzzles';
import Data from './data';

const lb = () => {
  console.log('\n');
};

// Get number of keys in object Puzzle

// Loop through each day
for (let day = 1; day <= Object.keys(Puzzles).length; day++) {
  console.group('Day ' + day);
  let dayString = 'day' + ('00' + day).slice(-2);
  if (Data.hasOwnProperty(dayString) && Puzzles.hasOwnProperty(dayString)) {
    let data = Data[dayString];
    let puzzle = Puzzles[dayString](data);
    console.log('Results: ', puzzle);
  } else {
    console.warn('No data or puzzle for day ' + day);
  }
  console.groupEnd();
  lb();
}
