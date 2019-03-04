
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

### React 元素渲染

要将React元素渲染到根DOM节点中，我们通过把它们都传递给 ReactDOM.render() 的方法来将其渲染到页面上：  

ReactDOM.render() 方法接收两个参数：内容和渲染目标 js 对象。
内容就是要在渲染目标中显示的东西，可以是一个React 部件，也可以是一段HTML或TEXT文本。渲染目标JS对象，就是一个DIV或TABEL,或TD 等HTML的节点对象。

### 更新元素渲染

React 元素都是不可变的。当元素被创建之后，你是无法改变其内容或属性的。

目前更新界面的唯一办法是创建一个新的元素，然后将它传入 ReactDOM.render() 方法：

可以使用函数封装要展示的部分，也可以React.Component 的 ES6 类，该类封装了要展示的元素，需要注意的是在 render() 方法中，需要使用 this.props 替换 函数中的props，使用class需要实现render方法，使用函数不需要。

***React 只会更新必要的部分***

*值得注意的是 React DOM 首先会比较元素内容先后的不同，而在渲染过程中只会更新改变了的部分。*


### React JSX

React 使用 JSX 来替代常规的 JavaScript。  

JSX 是一个看起来很像 XML 的 JavaScript 语法扩展。  

我们不需要一定使用 JSX，但它有以下优点：  

- JSX 执行更快，因为它在编译为 JavaScript 代码后进行了优化。
- 它是类型安全的，在编译过程中就能发现错误。
- 使用 JSX 编写模板更加简单快速。


