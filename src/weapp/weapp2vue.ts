import { SimpleHtmlParser } from '../utils/simplehtmlparser';

function transAttrToVue({
  name,
  value
}: VueAttr): VueAttr {
  let newName = name;
  let newValue = value;

  if (name === 'bind:tap') {
    newName = '@click';
  } else if (name.indexOf('wx:') > -1) {
    if (name === 'wx:elif') {
      newName = 'v-else-if'
    } else {
      newName = name.replace('wx:', 'v-');
    }

    if (value) {
      newValue = value.replace(/({{\s+)|(\s+}})/g, '');
    }
  }

  return {
    name: newName,
    value: newValue,
  }
}

export const parseWeappTpl: (tpl: string) => string = (tpl) => {
  /**
   * 1. weapp的属性 改成 vue的东西
   */
  // @ts-ignore
  const singleHtmlParser = new SimpleHtmlParser();

  let wxmlStr = "";
  singleHtmlParser.parse(tpl, {
    startElement: function (tag: HTMLElementTagName, attrs: Attr[], unary: string ) {
      wxmlStr += "<" + tag;
      for ( let i = 0; i < attrs.length; i++ ) {
        const { name, value } = transAttrToVue(attrs[i])

        wxmlStr += " " + name;

        if (value) {
          wxmlStr += '="' + value + '"'
        }
      }
      wxmlStr += (unary ? "/" : "") + ">";
    },
    endElement: function (tag: HTMLElementTagName) {
      wxmlStr += "</" + tag + ">";
    },
    characters: function (s: string) {
      wxmlStr += s;
    },
    comment: function (s: string) {
      wxmlStr += "<!--" + s + "-->";
    }
  })

  return wxmlStr;
}
