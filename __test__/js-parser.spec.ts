import { expect } from '@jest/globals';
import { getWeappJs } from '../src/weapp/js-parser';

it ('parse weapp js', () => {
  const jsStr = `import { Sku, Toast, Button } from 'vwc';

  export default {
    name: 'mockname',

    props: {
      show: Boolean,
      sku: {
        type: Object,
        default: () => ({
          tree: [],
          list: [],
          messages: [],
        }),
      },
    },

    data() {
      return {
        messageConfig: {
          uploadImg: this.uploadImg,
          uploadMaxSize: 15,
        },
      };
    },

    computed: {
      customBtnText() {
        if (this.isAddWish) return '下一步';
        if (this.showAddCartOnly) return this.addCarText;

        return this.buyBtnText || '立即购买';
      },
    },

    watch: {
      sku() {
        // 每次打开新 sku 都先置空 propPrice，不然不同商品会串掉展示的价格
        this.propPrice = '';
      },
    },

    created() {
      this.debouncedCalcPrice = debounce(this.calcPrice, 300);
    },

    methods: {
      test() {
        this.$emit('xx');
      }
    },
  };`

  expect(getWeappJs(jsStr)).toEqual(`import { Sku, Toast, Button } from 'vwc';

Component({
  name: 'mockname',

  properties: {
    show: Boolean,
    sku: {
      type: Object,
      value: () => ({
        tree: [],
        list: [],
        messages: [],
      }),
    },
  },

  data() {
    return {
      messageConfig: {
        uploadImg: this.uploadImg,
        uploadMaxSize: 15,
      },
    };
  },

  computed: {
    customBtnText() {
      if (this.isAddWish) return '下一步';
      if (this.showAddCartOnly) return this.addCarText;

      return this.buyBtnText || '立即购买';
    },
  },

  watch: {
    sku() {
      // 每次打开新 sku 都先置空 propPrice，不然不同商品会串掉展示的价格
      this.propPrice = '';
    },
  },

  created() {
    this.debouncedCalcPrice = debounce(this.calcPrice, 300);
  },

  methods: {
    test() {
      this.triggerEvent('xx');
    }
  }
});`);

});
