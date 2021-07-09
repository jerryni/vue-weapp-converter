## 简介

vue小程序转化器

## 功能简介

vue能转成4个微信小程序文件，4个文件也能转成一个tee-vue文件

## 全局安装

> ynpm i vue-weapp-converter -g

## 用法

1. 可以把vue转成4个微信小程序文件，传入vue文件地址
> vwc [vue-file path]

2. 可以把weapp的4个文件转成tee-vue文件，传入4个weapp文件夹路径
> vwc -r [file folder path]

## vue转weapp已完成功能
- v-else，还有v-else-if之类的;
- template改成block
- for循环替换，并提取参数
- class变量，{}和[]的转化成3元表达式；

- props => properties; default => value
- 顶部的变量赋值还是要保留
- import 的东西放到顶部；
- $emit => triggerEvent

## weapp转tee-vue已完成功能

- 4个文件合成一个vue文件

## TODO

模板层：
- for循环2个参数的时候(item, item)；
- a 标签改成 navigator; href => path;
- 去掉模板层的

style:
- @import 'mixins/index.scss'; 替换

script里面做的事：
- goodsComponent的提取；
- import + components字段转化成index.json里面的内容
  - [Icon.name]: Icon => "van-icon": "vant-weapp/dist/icon/index",
- data() => ready + this.setYZData(); + data {初始化的变量}

其他：
- 一些固定的模板内容提取出来，比如goodsComponents这种

项目规范：
- 添加单侧 jest + coverage
- ts问题修复；
- eslint

## Contribution

http://gitlab.qima-inc.com/nirizhe/vue-weapp-converter
