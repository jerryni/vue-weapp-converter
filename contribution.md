## 环境安装

> npm i

> npm run dev

> npm link

## 单测

> npm run test

## 后续要做的事

文档：
- [x] 可视化的演示方式

项目规范：
- [x] 单测完善

badge处理：
- [x] 单测覆盖率
- [x] ts覆盖率

本地自动化：
- [ ] 发布打包优化
- [ ] 根据commit自动生成changelog

功能：
- [ ] 完善转换的语法

## 功能列表
### vue转weapp
- [x] 4个文件导出到一个中划线命名的文件夹里
- [x] v-else，还有v-else-if之类的;
- [x] template改成block
- [x] for循环替换，并提取参数
- [x] class变量，{}和[]的转化成3元表达式；

- [x] props => properties; default => value
- [x] 顶部的变量赋值还是要保留
- [x] import 的东西放到顶部；
- [x] $emit => triggerEvent

### weapp转vue

- [x] 4个小程序文件合成一个vue文件

## 后期规划

- 小程序转化扩展到多个平台
