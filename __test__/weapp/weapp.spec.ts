import { expect } from '@jest/globals';
import { transWeappAttr, transWeappTag } from '../../src/weapp/helper';

describe('transWeappAttr', () => {
  it('transform v-if to wx:if', () => {
    expect(transWeappAttr({ name: 'v-if', value: 'param' })).toEqual({
      name: 'wx:if',
      value: '{{ param }}',
      extraStr: ''
    })
  });

  it('transform v-for to wx:for', () => {
    expect(transWeappAttr({ name: 'v-for', value: 'item in layoutTop' })).toEqual({
      name: 'wx:for',
      value: '{{ layoutTop }}',
      extraStr: 'wx:for-item="item"'
    })
  });

  it('transform :src to src="{{ }}"', () => {
    expect(transWeappAttr({ name: ':src', value: 'param' })).toEqual({
      name: 'src',
      value: '{{ param }}',
      extraStr: ''
    })
  });

  it('transform :class array value', () => {
    expect(transWeappAttr({ name: ':class', value: "[ 'ass', { 'xxx': isLink } ]" })).toEqual({
      name: 'class',
      value: "ass {{ isLink ? 'xxx' : '' }}",
      extraStr: ''
    })
  });

  it('transform click to tap', () => {
    expect(transWeappAttr({ name: '@click', value: "foo" })).toEqual({
      name: 'bind:tap',
      value: "foo",
      extraStr: ''
    })
  });
});

describe('transWeappTag', () => {
  it('transform div,p to view', () => {
    expect(transWeappTag('div')).toEqual('view');
    expect(transWeappTag('p')).toEqual('view');
  });

  it('transform span to view', () => {
    expect(transWeappTag('span')).toEqual('view');
  });

  it('transform template to block', () => {
    expect(transWeappTag('template')).toEqual('block');
  });

  it('transform img to image', () => {
    expect(transWeappTag('img')).toEqual('image');
  });
})
