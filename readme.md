## 简介

vue小程序转化器，vue文件转成对应的4个小程序文件

## 安装

> ynpm i @youzan/vue-weapp-converter -g

## 用法

vwc [your vue file path]

## todo

模板层：
- class变量，{}和[]的转化成3元表达式；
- v-else，还有v-else-if之类的;
- template改成block
- a 标签改成 navigator; href => path;
- for循环2个参数的时候(item, item)；
- :key => wx:key

style:
- @import 'mixins/index.scss';

script里面做的事：
- [x] props => properties; default => value
- [x] 顶部的变量赋值还是要保留
- [x] import 的东西放到顶部；
- [x] $emit => triggerEvent
- import + components字段转化成index.json里面的内容
  - [Icon.name]: Icon => "van-icon": "vant-weapp/dist/icon/index",
- data() => ready + this.setYZData(); + data {初始化的变量}


项目规范：
- ts问题修复；
- eslint

## Contribution

http://gitlab.qima-inc.com/nirizhe/vue-weapp-converter
