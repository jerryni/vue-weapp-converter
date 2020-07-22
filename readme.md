## 简介

vue小程序转化器，vue文件转成对应的4个小程序文件

## 功能简介

script层xxx
template xxx
css不动；
xx转化；

## 安装

> ynpm i @youzan/vue-weapp-converter -g

## 用法

vwc [vue-file path]

## todo

goodsComponent的提取；
代码review一下；

模板层：
- :ballot_box_with_check: v-else，还有v-else-if之类的;
- :ballot_box_with_check: template改成block
- :ballot_box_with_check: for循环替换，并提取参数
- :ballot_box_with_check: class变量，{}和[]的转化成3元表达式；
- for循环2个参数的时候(item, item)；
- a 标签改成 navigator; href => path;
- 去掉模板层的

style:
- @import 'mixins/index.scss'; 替换

script里面做的事：
- :ballot_box_with_check: props => properties; default => value
- :ballot_box_with_check: 顶部的变量赋值还是要保留
- :ballot_box_with_check: import 的东西放到顶部；
- :ballot_box_with_check: $emit => triggerEvent
- import + components字段转化成index.json里面的内容
  - [Icon.name]: Icon => "van-icon": "vant-weapp/dist/icon/index",
- data() => ready + this.setYZData(); + data {初始化的变量}

其他：
- :ballot_box_with_check: compiler.parseComponent里出来的内容 开头回车符的问题；
- 一些固定的模板内容提取出来，比如goodsComponents这种

项目规范：
- 添加单侧 jest + coverage
- :ballot_box_with_check: ts问题修复；
- :ballot_box_with_check: eslint

## Contribution

http://gitlab.qima-inc.com/nirizhe/vue-weapp-converter
