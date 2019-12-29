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

  if (tag === 'template') {
    tag = 'block';
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
  return /^\[[\s\S]+\]$/.test(name);
}

function isObject(o) {
  return Object.prototype.toString.call(o) === '[object Object]';
}
/**
 *
 "[ 'ass', { 'xxx': isLink } ]" => [ 'ass', { 'xxx': 'isLink' } ]
 * "ass {{ isLink ? 'xxx' : '' }}"
 */
function handleArrayStr(source) {
  source = source.replace(/[\s:](\w+)[\s:]/g, ' \'$1\'');
  const arr = new Function(`return ${source}`)();

  let result = '';
  arr.forEach(item => {
    if (typeof item === 'string') {
      result += item + ' ';
    }

    if (isObject(item)) {
      Object.keys(item).forEach(key => {
        result += `{{ ${item[key]} ? '${key}' : '' }}`;
      })
    }
  })

  return result;
}

function wrapVar(v) {
  return `{{ ${v} }}`
}

const replaceMap = {
  'v-if': {
    name: 'wx:if',
    needsWrap: true
  },
  'v-else-if': {
    name: 'wx:elif',
    needsWrap: true
  },
  'v-else': {
    name: 'wx:else',
    needsWrap: false
  },
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
  const replacement = replaceMap[name]

  if (replacement) {
    name = replacement.name;
    needsWrap = replacement.needsWrap;
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

    // TODO: 可能会遇到的对象字符串
    // if (isObjectStr(value)) { }

    if (isArrayStr(value)) {
      value = handleArrayStr(value);
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
