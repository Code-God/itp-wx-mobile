# vue-cli 微信项目
  介绍：采用vue-cli 作为项目的构建工具，引入mint-ui Ui组件库。

## 启动项目
  npm install;

  npm run dev;项目启动

  npm run build;项目构建


## 项目结构

- build: 构建过程
- config: 构建配置
- dist: 编译结果
- node_modules: 项目依赖
- src: 项目源代码
  - api: 接口
  - common: 公共库
  - components: 通用组件
    - common: 公用组件
    - hospital: 就诊情况
    - itp: 出血评分
    - pharmacy: 用药情况
    - regsiter: 注册
  - config: 应用全局配置
  - pages: 完整页面
  - router: Vue路由
  - plugins: vue扩展插件以及工具库
  - App.vue: 单页应用主组件
  - main.js: 单页应用入口
  - theme.styl: cube-ui主体配置
- static: 静态资源（绝对路径引用，将直接复制到 `/dist/static`）
- html: 独立页面（将直接复制到 `/dist/` 下）
- index.html: 主页
- package.json: 项目信息
- README.md: 本文件


### 参考文档与源代码

- cube-ui - [在线文档](https://didi.github.io/cube-ui/#/en-US)
- Vue.js - [代码](https://github.com/vuejs/vue)
- Vuex - [代码](https://github.com/vuejs/vuex)
- Axios - [代码](https://github.com/mzabriskie/axios)
