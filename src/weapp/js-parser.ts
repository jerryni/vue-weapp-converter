import j from 'jscodeshift';
// const describe = require('jscodeshift-helper').describe;

export const getWeappJs = (content: string = '') => {
  let jsStr = '';

  const root = j(content);

  root.get().node.program.body.unshift(`import { VanxComponent } from 'shared/common/base/wsc-component';`)

  root.find(j.ExportDefaultDeclaration, {
    declaration: {
      type: 'ObjectExpression'
    }
  })
    // export => goodsCompoents
    .replaceWith((path) => {
      return j.expressionStatement(
        j.callExpression(
          j.identifier('GoodsComponent'),
          [j.objectExpression(
            path.node.declaration.properties,
          )]
        )
      )
    })

  root.find(j.Identifier, { name: 'props' })
    .replaceWith(j.identifier('properties'))

  root.find(j.Identifier, { name: 'default' })
    .replaceWith(j.identifier('value'));

  root.find(j.Identifier, { name: '$emit' })
    .replaceWith(j.identifier('triggerEvent'))

  jsStr = root.toSource();

  return jsStr;
}
