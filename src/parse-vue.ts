import { getWXML } from './weapp/template-parser';
import { getWeappJs } from './weapp/js-parser';
import { generateWeappFiles } from './utils/file';
import { formatVueStr } from './utils';
import fs from 'fs';
import * as compiler from 'vue-template-compiler';

/**
 * 1. parse vue
 * 2. gen weapp files
 */
export const parseVue: (file: string) => void = (file) => {
  const content = fs.readFileSync(file, 'utf8');
  const vueContent = compiler.parseComponent(content);
  const templateCnt = formatVueStr(vueContent?.template?.content);
  const jsCnt = formatVueStr(vueContent?.script?.content);
  const styleCnt = formatVueStr(vueContent.styles[0]?.content);

  generateWeappFiles({
    tpl: getWXML(templateCnt),
    script: getWeappJs(jsCnt),
    style: styleCnt
  }, file);
}
