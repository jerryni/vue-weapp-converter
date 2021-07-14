import { expect } from '@jest/globals';
import { transWeappAttr } from '../src/weapp/helper';

describe('transWeappAttr', () => {
  it('transform v-if to wx:if', () => {
    expect(transWeappAttr({ name: 'v-if', value: 'param' })).toEqual({
      name: 'wx:if',
      value: '{{ param }}',
      extraStr: ''
    })
  });
});
