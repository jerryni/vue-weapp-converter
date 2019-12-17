## 简介

vue小程序转化器，vue文件转成对应的4个小程序文件

## 安装

> ynpm i @youzan/vue-weapp-converter -g

## 用法

vwc [your vue file path]

## todo

模板层：
- class变量，{}和[]的转化成3元表达式；

script里面做的事：
- 接入ast-parser
- export default这个对象直接提取出来；
- import + components字段转化成index.json里面的内容

项目规范：
- ts问题修复；
- eslint

## Contribution

http://gitlab.qima-inc.com/nirizhe/vue-weapp-converter
