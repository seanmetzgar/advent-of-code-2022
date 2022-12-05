import fs from 'fs';
import { Data } from './types';
const files: string[] = fs.readdirSync('./data');
const data: Data = {};

files.forEach((file: string) => {
  if (file.endsWith('.txt')) {
    const day: string = file.replace('.txt', '');
    data[day] = fs.readFileSync('./data/' + file, 'utf-8');
  }
});

export default data;
