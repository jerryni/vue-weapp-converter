// import * as fs from 'fs';
// const HTMLParser = require('./html-parser');
import { getWXML } from './weapp/template-parser';
import { generateWeappFiles } from './utils/file';
import fs from 'fs-extra';
import * as path from 'path';

/**
 * 1. parse vue
 * 2. gen weapp files
 */
export const parseVue = (file) => {
  const compiler = require('vue-template-compiler')
  const content = fs.readFileSync(file, 'utf8');

  const vueContent = compiler.parseComponent(content);

  const templateCnt = vueContent.template.content.toString();
  const jsCnt = vueContent.script.content.toString();
  const styleCnt = vueContent.styles[0].content.toString();

  generateWeappFiles({
    tpl: getWXML(templateCnt),
    script: jsCnt,
    style: styleCnt
  }, path.dirname(file));
}
