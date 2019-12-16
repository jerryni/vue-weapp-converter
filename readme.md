## install

> npm i vue-weapp-converter -g

## usage

vwc [your vue file path]

## todo

- ok: text 和 view 转化的h5标签扩展；
- ok: 事件转化，包括click啥的； 也要扩展; 最简单的已经OK了
- OK sfc的解析 + 文件生成；
  OK vue-loader源码查看
- {}和[]的转化成3元表达式；

整体逻辑处理：
- 接入接收文件目录的参数
- 接入全局命令；

script里面做的事：
- 接入ast-parser
- export default这个对象直接提取出来；
- import 

项目规范：
- ts问题修复；
- eslint
