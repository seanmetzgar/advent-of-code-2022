import { Solution } from '../types';

interface FileSystem {
  [key: string]: number;
}

const solve = (dataSet: string): Solution => {
  const data = dataSet.split('\n');
  let totalSpace = 0;
  let freedSpace = 0;
  const needed = 30000000;
  let diskSpace = 70000000;
  const directories: string[] = [];
  const dirMap: FileSystem = {};

  for (const line of data) {
    if (/^\$ cd/.test(line)) {
      const cd = line.substring(5);
      cd === '..' ? directories.pop() : directories.push(cd);
    } else if (/^\d/.test(line)) {
      const file = line.split(' ');
      let path = '';
      for (let i = 0; i < directories.length; i++) {
        path += directories[i] !== '/' ? directories[i] + '/' : directories[i];
        let innerSize = parseInt(file[0]);
        if (path in dirMap) {
          innerSize += dirMap[path];
        }
        dirMap[path] = innerSize;
      }
    }
  }
  diskSpace -= dirMap['/'];

  //iterate through each item in dirMap
  Object.values(dirMap).forEach((size) => {
    // For Solution 1
    totalSpace += size <= 100000 ? size : 0;

    // For Solution 2
    const diffFreed = Math.abs(freedSpace - needed);
    const diffSize = Math.abs(diskSpace + size - needed);
    if (diskSpace + size >= needed && diffSize < diffFreed) {
      if (freedSpace === 0 || size < freedSpace) freedSpace = size;
    }
  });

  return { puzzle1: totalSpace, puzzle2: freedSpace };
};

export default (dataSet: string): Solution => {
  return solve(dataSet);
};
