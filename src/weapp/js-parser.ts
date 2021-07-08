import j from 'jscodeshift';
// const describe = require('jscodeshift-helper').describe;

export const getWeappJs = (content = '') => {
  let jsStr = '';

  const root = j(content);

  root.find(j.ExportDefaultDeclaration, {
    declaration: {
      type: 'ObjectExpression'
    }
  })
    // export => Compoent
    .replaceWith((path) => {
      return j.expressionStatement(
        j.callExpression(
          j.identifier('Component'),
          [j.objectExpression(
            // @ts-ignore hack
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
