import { VueHTMLParser } from '../utils/vue-html-parser';
import { transWeappTag, transWeappAttr } from './helper';

export const getWXML = (content = ''): string => {
  let wxmlStr = "";
  VueHTMLParser(content, {
    start: function( tag: HTMLElementTagName, attrs: Attr[], unary: string ) {
      const weappTag = transWeappTag(tag);
      wxmlStr += "<" + weappTag;
      for ( let i = 0; i < attrs.length; i++ ) {
        const newAttr = transWeappAttr(attrs[i])

        wxmlStr += " " + newAttr.name;

        if (newAttr.value) {
          wxmlStr += '="' + newAttr.value + '"'
        }

        // 有些属性要拆成2个属性；
        if (newAttr.extraStr) {
          wxmlStr += " " + newAttr.extraStr;
        }
      }

      wxmlStr += (unary ? "/" : "") + ">";
    },
    end: function( tag: HTMLElementTagName ) {
      wxmlStr += "</" + transWeappTag(tag) + ">";
    },
    chars: function( text: string ) {
      wxmlStr += text;
    },
    comment: function( text: string ) {
      wxmlStr += "<!--" + text + "-->";
    }
  })

  return wxmlStr;
}
