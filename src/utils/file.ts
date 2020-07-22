import * as fs from 'fs';
import * as path from 'path';

/**
 * 拿目标文件目录；
 * 4个文件
 */

export function generateWeappFiles(content = {
  tpl: 'tpl',
  style: 'scss',
  script: 'js',
}, basePath = '') {
  writeFile(path.join(basePath, 'index.wxml'), content.tpl, 'save index.wxml ok');
  writeFile(path.join(basePath, 'index.js'), content.script, 'save index.js ok');
  writeFile(path.join(basePath, 'index.scss'), content.style, 'save index.scss ok');
  writeFile(path.join(basePath, 'index.json'), indexJSON, 'save index.json ok');
}

export function writeFile(path, cnt, successMsg = '') {
  fs.writeFile(path, cnt, 'utf8', err => {
    if (err) throw err;

    successMsg && console.log(successMsg);
  })
}

export function checkFilePath(filePath = '') {
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
const indexJSON = `{
  "component": true,
  "usingComponents": {}
}
`;
