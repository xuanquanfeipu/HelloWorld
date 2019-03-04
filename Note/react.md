
### React 安装

使用react，我们需要引入三个库： react.min.js 、react-dom.min.js 和 babel.min.js：  

react.min.js - React 的核心库  
react-dom.min.js - 提供与 DOM 相关的功能  
babel.min.js - Babel 可以将 ES6 代码转为 ES5 代码，这样我们就能在目前不支持 ES6 浏览器上执行 React 代码。Babel 内嵌了对 JSX 的支持。通过将 Babel 和 babel-sublime 包（package）一同使用可以让源码的语法渲染上升到一个全新的水平。  

注意：

如果我们需要使用 JSX，则 <script> 标签的 type 属性需要设置为 text/babel。
  
### 通过 npm 使用 React

```
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
$ npm config set registry https://registry.npm.taobao.org
```

### 使用 create-react-app 快速构建 React 开发环境

create-react-app 自动创建的项目是基于 Webpack + ES6 。  

执行以下命令创建项目：  
```
$ cnpm install -g create-react-app
$ create-react-app my-app
$ cd my-app/
$ npm start
```
manifest.json 指定了开始页面 index.html，一切的开始都从这里开始，所以这个是代码执行的源头。    
