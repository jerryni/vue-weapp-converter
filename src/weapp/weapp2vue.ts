import { SimpleHtmlParser } from '../utils/simplehtmlparser';

function transAttrToVue({
  name,
  value
}) {
  let newName = name;
  let newValue = value;

  if (name === 'bind:tap') {
    newName = '@click';
  } else if (name.indexOf('wx:') > -1) {
    if (name === 'wx:elif') {
      name = 'v-else-if'
    } else {
      newName = name.replace('wx:', 'v-');
    }

    if (value) {
      newValue = value.replace(/({{\s+)|(\s+}})/g, '');
    }
  }

  return {
    newName,
    newValue,
  }
}

export const parseWeappTpl = (tpl) => {
  /**
   * 1. weapp的属性 改成 vue的东西
   */
  const singleHtmlParser = new SimpleHtmlParser();

  let wxmlStr = "";
  singleHtmlParser.parse(tpl, {
    startElement: function (tag, attrs, unary) {
      wxmlStr += "<" + tag;
      for ( let i = 0; i < attrs.length; i++ ) {
        const { newName, newValue } = transAttrToVue(attrs[i])

        wxmlStr += " " + newName;

        if (newValue) {
          wxmlStr += '="' + newValue + '"'
        }
      }
      wxmlStr += (unary ? "/" : "") + ">";
    },
    endElement: function (tag) {
      wxmlStr += "</" + tag + ">";
    },
    characters: function (s) {
      wxmlStr += s;
    },
    comment: function (s) {
      wxmlStr += "<!--" + s + "-->";
    }
  })

  return wxmlStr;
}
