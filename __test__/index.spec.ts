import { expect } from '@jest/globals';
import { wrapVar } from '../src/weapp/helper';

test('', () => {
  expect(wrapVar('1')).toEqual('{{ 1 }}');
})
