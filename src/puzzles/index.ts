import fs from 'fs';
const files: string[] = fs.readdirSync(__dirname);
const exporter: any = {};

files.forEach((file: string) => {
  if (file.endsWith('.js') && file !== 'index.js') {
    file = file.replace('.js', '');
    exporter[file] = require(`./${file}`).default;
  }
})

export default exporter;