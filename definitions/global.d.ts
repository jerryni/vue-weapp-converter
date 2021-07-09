interface VueFileContent {
  tpl: string;
  script: string;
  style: string;
}

interface VueAttr {
  name: string;
  value: string;
  [key: string]: any;
}

type PlainObj = { [key: string]: any };

type HTMLElementTagName = keyof HTMLElementTagNameMap;
