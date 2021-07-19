import { expect } from '@jest/globals';
import { formatVueStr } from '../../src/utils/index';

it('formatVueStr ', () => {
  expect(formatVueStr(`<div><p></p></div>`)).toEqual(`<div><p></p></div>`);
})
