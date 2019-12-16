import { VueHTMLParser } from '../utils/vue-html-parser';
import { transWeappTag, transWeappAttr } from './helper';

export const getWXML = (content: string = '') => {
  let wxmlStr = "";
  VueHTMLParser(content, {
    start: function( tag, attrs, unary ) {
      // console.log('tag:', tag);
      // console.log('attrs', attrs)
      // console.log('unary', unary)

      tag = transWeappTag(tag);
      wxmlStr += "<" + tag;
      for ( var i = 0; i < attrs.length; i++ ) {
        const newAttr = transWeappAttr(attrs[i])

        wxmlStr += " " + newAttr.name + '="' + newAttr.value + '"';

        // 有些属性要拆成2个属性；
        if (newAttr._addStr) {
          wxmlStr += " " + newAttr._addStr;
        }
      }

      wxmlStr += (unary ? "/" : "") + ">";
    },
    end: function( tag ) {
      tag = transWeappTag(tag);
      wxmlStr += "</" + tag + ">";
    },
    chars: function( text ) {
      wxmlStr += text;
    },
    comment: function( text ) {
      wxmlStr += "<!--" + text + "-->";
    }
  })

  return wxmlStr;
}
