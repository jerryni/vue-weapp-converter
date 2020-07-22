import fs from 'fs-extra';
import * as path from 'path';
import { writeFile } from './utils/file'
import { parseWeappTpl } from './weapp/weapp2vue'

const supportFileExt = ['.wxml', '.js', '.json', '.scss', '.css'];

function handleFile(files) {
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

function genVueFile(filePath, vueObj) {
  const str = `<template>
  ${vueObj.tpl}
</template>
<script>
  export default
  ${vueObj.script}
</script>
<style lang="scss">
  ${vueObj.style}
</style>
`;
  const _filePath = path.join(filePath, 'index.vue');
  writeFile(_filePath, str, `save ${_filePath} ok`);
}

export const parseWeapp = (filePath) => {
  const targetfiles: string[] = [];
  fs.readdir(filePath, (err, files) => {
    if (err) {
      throw err;
    }

    files.forEach((file) => {
      if (supportFileExt.indexOf(path.extname(file)) > -1) {
        const fullPath = path.join(filePath, file);

        targetfiles.push(fullPath);
      }
    })

    const result = handleFile(targetfiles);
    genVueFile(filePath, result);
  })
}
