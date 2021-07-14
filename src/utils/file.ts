import * as fs from 'fs';
import * as path from 'path';
import signale from 'signale';

const indexJSON = `{
  "component": true,
  "usingComponents": {}
}
`;

export function writeFile(path: string, cnt: string, successMsg = ''): void {
  fs.writeFile(path, cnt, 'utf8', err => {
    if (err) throw err;

    successMsg && signale.success(successMsg);
  })
}

/**
 * 拿目标文件目录；
 * 4个文件
 */
export function generateWeappFiles(content: VueFileContent = {
  tpl: 'tpl',
  style: 'css',
  script: 'js',
}, file: string): void {
  const reg = file.match(/\/([\d\w]*)\.vue$/);
  const fileName = reg && reg[1];

  if (!fileName) {
    throw new Error('vue文件解析错误');
  }

  const folderPath = path.resolve(file, '../', fileName);
  try {
    fs.mkdirSync(folderPath);
  } catch (error) { }

  writeFile(path.join(folderPath, 'index.wxml'), content.tpl, 'save index.wxml');
  writeFile(path.join(folderPath, 'index.js'), content.script, 'save index.js');
  writeFile(path.join(folderPath, 'index.css'), content.style, 'save index.css');
  writeFile(path.join(folderPath, 'index.json'), indexJSON, 'save index.json');
}

export function checkFilePath(filePath = ''): Promise<string> {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(filePath)) {
      console.log('filePath:', filePath)
      resolve(filePath);
    } else {
      console.log('file doesn\'t exist');
      process.exit(1);
      reject(filePath);
    }
  })
}

