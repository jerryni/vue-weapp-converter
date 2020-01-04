import { getWXML } from './weapp/template-parser';
import { getWeappJs } from './weapp/js-parser';
import { generateWeappFiles } from './utils/file';
import fs from 'fs-extra';
import * as path from 'path';
import * as compiler from 'vue-template-compiler';

/**
 * 1. parse vue
 * 2. gen weapp files
 */
export const parseVue = (file) => {
  const content = fs.readFileSync(file, 'utf8');
  const vueContent = compiler.parseComponent(content);
  const templateCnt = vueContent?.template?.content?.toString() || '';
  const jsCnt = vueContent?.script?.content?.toString() || '';
  const styleCnt = vueContent.styles[0].content.toString();

  generateWeappFiles({
    tpl: getWXML(templateCnt),
    script: getWeappJs(jsCnt),
    style: styleCnt
  }, path.dirname(file));
}
