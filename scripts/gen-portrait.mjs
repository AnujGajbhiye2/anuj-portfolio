import { readFileSync, writeFileSync } from 'fs';

const raw = readFileSync('C:/Users/anujg/Downloads/banner.txt', 'utf8');
const escaped = raw
  .replace(/\\/g, '\\\\')
  .replace(/`/g, '\\`')
  .replace(/\$\{/g, '\\${');

const ts = 'const PORTRAIT = `' + escaped + '`;\n\nexport default PORTRAIT;\n';
writeFileSync('D:/jobhunt/anuj-portfolio/src/data/portrait.ts', ts);
console.log('done, lines:', raw.split('\n').length);
