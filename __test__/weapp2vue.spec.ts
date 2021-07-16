import { expect } from '@jest/globals';
import { getWXML } from '../src/weapp/template-parser';
import { mockData } from '../src/weapp/mock';

it ('parse template parser', () => {
  expect(getWXML(mockData)).toEqual(`
<view class=\"ass {{ isLink ? 'xxx' : '' }}\">
  <view>sdfsdf</view>
  <view wx:if=\"{{ xxx }}\" class=\"module-top\">
    <component wx:for=\"{{ layoutTop }}\" wx:for-item=\"item\" key=\"{{ item.type }}\" is=\"{{ item.type }}\" v-bind=\"item.extra\">
      <slot wx:for=\"{{ item.slots }}\" wx:for-item=\"slotItem\" name=\"{{ slotItem }}\"/>
    </component>
  </view>
  <view ref=\"goodsMain\" class=\"module-main\">
    <view class=\"module-unit\">
      <component wx:for=\"{{ layoutPic }}\" wx:for-item=\"item\" key=\"{{ item.type }}\" is=\"{{ item.type }}\" v-bind=\"item.extra\">
        <slot wx:for=\"{{ item.slots }}\" wx:for-item=\"slotItem\" name=\"{{ slotItem }}\"/>
      </component>
    </view>
    <component wx:for=\"{{ layoutMain }}\" wx:for-item=\"item\" key=\"{{ item.type }}\" is=\"{{ item.type }}\" v-bind=\"item.extra\">
      <slot wx:for=\"{{ item.slots }}\" wx:for-item=\"slotItem\" name=\"{{ slotItem }}\"/>
    </component>
  </view>
  <view ref=\"moduleBottom\" class=\"{{ displayPop.maskShow ? 'module-bottom-upper' : '' }}\" class=\"module-bottom\">
    <component wx:for=\"{{ layoutBottom }}\" wx:for-item=\"item\" key=\"{{ item.type }}\" is=\"{{ item.type }}\" v-bind=\"item.extra\">
      <slot wx:for=\"{{ item.slots }}\" wx:for-item=\"slotItem\" name=\"{{ slotItem }}\"/>
    </component>
  </view>
  <view style=\"{ paddingBottom: bottomFixedHeight }\"/>

  <follow-block/>
  <view wx:if=\"{{ displayPop.maskShow }}\" class=\"module-mask\" bind:tap=\"$dispatch('hideRecommendBottom')\"/>
  <view id=\"module-popup\"/>
  <login-dialog v-model=\"loginStatus\" on-success=\"{{ ticket => $dispatch('afterLogin', ticket) }}\"/>
  <wish-action-sheet wx:if=\"{{ wish.isOpen }}\"/>
</view>
`);
});
