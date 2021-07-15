import fs from 'fs';
import * as path from 'path';
import { writeFile } from './utils/file'
import { parseWeappTpl } from './weapp/weapp2vue'

const supportFileExt = ['.wxml', '.js', '.json', '.scss', '.css'];

function handleFile(files: string[]): VueFileContent {
  const result = {
    tpl: '',
    script: '',
    style: ''
  };

  files.forEach(file => {
    const data = fs.readFileSync(file, 'utf8');
    switch (path.extname(file)) {
      case '.wxml':
        result.tpl = parseWeappTpl(data);
        break;
      case '.js':
        result.script = data;
        break;
      case '.scss':
      case '.css':
          result.style = data;
          break;
      default:
        break;
    }
  });

  return result;
}

function genVueFile(filePath: string, vueFile: VueFileContent): void {
  const str = `<template>
  ${vueFile.tpl}
</template>
<script>
  export default
  ${vueFile.script}
</script>
<style>
  ${vueFile.style}
</style>
`;
  const _filePath = path.join(filePath, 'index.vue');
  writeFile(_filePath, str, `save ${_filePath} ok`);
}

export const parseWeapp: (filePath: string) => void = (filePath) => {
  const targetFiles: string[] = [];
  fs.readdir(filePath, (err, files) => {
    if (err) {
      throw err;
    }

    files.forEach((file) => {
      if (supportFileExt.indexOf(path.extname(file)) > -1) {
        const fullPath = path.join(filePath, file);

        targetFiles.push(fullPath);
      }
    })

    const result = handleFile(targetFiles);
    genVueFile(filePath, result);
  })
}
