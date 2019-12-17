import j from 'jscodeshift';
// const describe = require('jscodeshift-helper').describe;

export const getWeappJs = (content: string = '') => {
  let jsStr = '';

  const root = j(content);
  const collection = root.find(j.ExportDefaultDeclaration, {
    declaration: {
      type: 'ObjectExpression'
    }
  }).nodes()[0].declaration;

  jsStr = j(collection).toSource() || '';

  return jsStr;
}
