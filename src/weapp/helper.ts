import { block, inline, closeSelf } from '../utils/html-parser';

/**
 * div, p => view
 * span => text
 * img => image
 * @param {*} tag
 */
export const transWeappTag = (tag) => {
  if (tag === 'img') {
    tag = 'image';
  }

  if (block[tag] || closeSelf[tag]) {
    tag = 'view';
  }

  if (inline[tag]) {
    tag = 'text';
  }

  return tag;
}

function isVueVar(name) {
  return /^:/.test(name);
}

function isVueEvent(name) {
  return /^@/.test(name);
}

function isObjectOrArrayStr(name) {
  return /^(\{|\[)/.test(name);
}

function isArrayStr(name) {
  return /^\[/.test(name);
}

function isObjectStr(name) {
  return /^\{/.test(name);
}

function wrapVar(v) {
  return `{{ ${v} }}`
}

// * v-if="xx" => wx:if="{{ xx }}"
//  * v-for="item in layoutTop" => wx:for="{{ layoutTop }}", + item
//  * wx:for-item="item" (上面的item)
// img => image :src => src="{{ }}"
export const transWeappAttr = ({
  name,
  value,
  ...rest,
}) => {
  let needsWrap = false;
  let _addStr = '';

  if (name === 'v-if') {
    name = 'wx:if'
    needsWrap = true;
  }

  if (name === 'v-for') {
    name = 'wx:for'
    // 解析成功的话就用解析的，否则返回原始值
    const [, forItem, traverseVar] = value.match(/([^\s]+)\s+in\s+([^\s]+)/) || ['' , '', value];

    if (forItem) {
      _addStr = `wx:for-item="${forItem}"`;
    }

    value = traverseVar;
    needsWrap = true;
  }

  if (isVueVar(name)) {
    name = name.replace(':', '');
    needsWrap = !isObjectOrArrayStr(value);

    // TODO: 把对象也解析失败
    if (isObjectStr(value)) {
      // const parsedValue = JSON.parse(value);

      // value = '';
      // Object.keys(parsedValue).forEach(key => {
      //   value += ` {{ ${parsedValue(key)} ? '${key}' : ''}}`;
      // })
    }

    // TODO：数组字符传解析失败
    if (isArrayStr) {
      // value = value.toString().replace(/'/g, '"');
      // const parsedValue = JSON.parse(value);

      // console.log('parsedValue', parsedValue)

      // value = '';
      // parsedValue.forEach(v => {
      //   if (typeof v === 'string') {
      //     value += ` ${v}`;
      //   } else {
      //     Object.keys(v).forEach(key => {
      //       value += ` {{ ${v(key)} ? '${key}' : ''}}`;
      //     })
      //   }
      // })
    }
  }

  if (isVueEvent(name)) {
    let [, eventName] = name.match(/^@([^@]+)/) || [ , ''];

    if (eventName === 'click') {
      eventName = 'tap';
    }

    name = `bind:${eventName}`;
  }

  return {
    ...rest,
    _addStr,
    name,
    value: needsWrap ? wrapVar(value) : value
  };
}
