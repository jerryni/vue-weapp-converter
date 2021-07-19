import { expect } from '@jest/globals';
import { parseWeappTpl } from '../../src/weapp/weapp2vue';
import { weappTpl } from '../../src/weapp/mock';

it ('parse template parser', () => {
  expect(parseWeappTpl(weappTpl)).toEqual(`<view class=\"container\">
  <view @click=\"foo\"></view>
  <view v-if=\"p1\"></view>
  <view v-else-if=\"p1\"></view>
</view>
`);
});
