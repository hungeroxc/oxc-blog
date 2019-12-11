## 介绍

-   前后端分离项目，[后端地址](https://github.com/hungeroxc/oxc-blog-server)
-   博客样式借鉴这位老哥的博客[郭大大](https://guodada.fun/)(已获得同意及其 star)
-   文章功能支持 markdown 方式编写及展示，并且支持简书式的边写边看，支持图片一键黏贴直传七牛 cdn
-   该博客虽然作为个人博客并且为单人编写，但是目的在于实践一个多人工作的环境，所以也含有多个团队合作时候使用的库

### 地址

-   博客地址: [大春春](https://blog.oxcblog.club/)
-   测试地址: [测试地址](http://blog-test.oxcblog.club/)

### 技术栈

-   前端:

    -   TypeScript
    -   React v16.9.11: hook，状态管理使用 useReducer + context
    -   Axios
    -   WebPack: 自定义的 WebPack 规则及打包规则
    -   Marked + hightlight.js + CodeMirror + react-codemirror2
    -   Sass: css-module

-   后端:

    -   TypeScript
    -   Koa2 + koa-router + koa-bodyparser
    -   TypeORM
    -   MySQL

-   代码规范:
    -   Commitlint
    -   ESlint
    -   Prettier
    -   Stylelint

## 预览

![](https://images.oxcblog.club/image_1576052340295.png)

## 项目结构

### 前端

```
oxc-blog
├─ .eslintrc.js           // eslint配置
├─ .prettierrc.js         // prettierrc配置
├─ .stylelintrc.js        // stylelint配置
├─ build                  // webpack相关
├─ commitlint.config.js   // commitlint配置
├─ deploy                 // 部署后直传七牛脚本
├─ src
│    ├─ assets            // 静态资源
│    ├─ constants         // 常量
│    ├─ containers        // 内涵shared和views两个文件夹，用于存放页面和组件
│    ├─ index.tsx         // 入口文件
│    ├─ services          // axios和相关api封装存放
│    ├─ store             // 状态管理，内含ts定义
│    ├─ styles            // 常用sass样式存放
│    ├─ types             // 全局接口ts定义
│    └─ utils             // 常用工具
└─ tsconfig.json
```

### 后端

```
oxc-blog-server
├─ .eslintrc.js        // eslint配置
├─ nodemon.json        // nodemon配置
├─ ormconfig.js        // typeorm数据库配置
├─ src
│    ├─ controller     // 业务逻辑
│    ├─ entity         // 数据库模型
│    ├─ index.ts       // 入口
│    ├─ middlewares    // 常用中间件
│    ├─ routes         // 路由表
│    ├─ types          // 针对数据库模型编写的类型
│    └─ utils          // 常用工具
└─ tsconfig.json
```

### 数据结构图

![](https://images.oxcblog.club/image_1576054768129.png)

## 协议

[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
