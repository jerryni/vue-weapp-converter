export const mockData = `
<div
  :class="[ 'ass', { 'xxx': isLink } ]"
>
  <span>sdfsdf</span>
  <div v-if="xxx" class="module-top">
    <component
      v-for="item in layoutTop"
      :key="item.type"
      :is="item.type"
      v-bind="item.extra"
    >
      <slot v-for="slotItem in item.slots" :name="slotItem" />
    </component>
  </div>
  <div ref="goodsMain" class="module-main">
    <div class="module-unit">
      <component
        v-for="item in layoutPic"
        :key="item.type"
        :is="item.type"
        v-bind="item.extra"
      >
        <slot v-for="slotItem in item.slots" :name="slotItem" />
      </component>
    </div>
    <component
      v-for="item in layoutMain"
      :key="item.type"
      :is="item.type"
      v-bind="item.extra"
    >
      <slot v-for="slotItem in item.slots" :name="slotItem" />
    </component>
  </div>
  <div
    ref="moduleBottom"
    :class="displayPop.maskShow ? 'module-bottom-upper' : ''"
    class="module-bottom"
  >
    <component
      v-for="item in layoutBottom"
      :key="item.type"
      :is="item.type"
      v-bind="item.extra"
    >
      <slot v-for="slotItem in item.slots" :name="slotItem" />
    </component>
  </div>
  <div :style="{ paddingBottom: bottomFixedHeight }" />
<!-- 公众号关注模块 -->
  <follow-block />
  <div v-if="displayPop.maskShow" class="module-mask" @click="$dispatch('hideRecommendBottom')"/>
  <div id="module-popup" />
  <login-dialog
    v-model="loginStatus"
    :on-success="ticket => $dispatch('afterLogin', ticket)"
  />
  <wish-action-sheet v-if="wish.isOpen" />
</div>
`
