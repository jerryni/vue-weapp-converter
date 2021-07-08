import * as fs from 'fs';
import * as path from 'path';

const indexJSON = `{
  "component": true,
  "usingComponents": {}
}
`;

export function writeFile(path: string, cnt: string, successMsg = ''): void {
  fs.writeFile(path, cnt, 'utf8', err => {
    if (err) throw err;

    successMsg && console.log(successMsg);
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
}, basePath = ''): void {
  writeFile(path.join(basePath, 'index.wxml'), content.tpl, 'save index.wxml ok');
  writeFile(path.join(basePath, 'index.js'), content.script, 'save index.js ok');
  writeFile(path.join(basePath, 'index.css'), content.style, 'save index.css ok');
  writeFile(path.join(basePath, 'index.json'), indexJSON, 'save index.json ok');
}

export function checkFilePath(filePath = ''): Promise<string> {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(filePath)) {
      console.log('your file:', filePath)
      resolve(filePath);
    } else {
      console.log('file doesn\'t exist');
      process.exit(1);
      reject(filePath);
    }
  })
}

