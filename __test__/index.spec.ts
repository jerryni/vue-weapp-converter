import { expect } from '@jest/globals';
import { wrapVar, transWeappAttr } from '../src/weapp/helper';

test('wrapVar', () => {
  expect(wrapVar('1')).toEqual('{{ 1 }}');
})

test('transWeappAttr', () => {
  expect(transWeappAttr({ name: 'v-if', value: 'param' })).toEqual({
    name: 'wx:if',
    value: '{{ param }}',
    extraStr: ''
  })
});
