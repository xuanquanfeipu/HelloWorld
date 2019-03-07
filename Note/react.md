
### React 安装

使用react，我们需要引入三个库： react.min.js 、react-dom.min.js 和 babel.min.js：  

- react.min.js - React 的核心库  
- react-dom.min.js - 提供与 DOM 相关的功能  
- babel.min.js - Babel 可以将 ES6 代码转为 ES5 代码，这样我们就能在目前不支持 ES6 浏览器上执行 React 代码。Babel 内嵌了对 JSX 的支持。通过将 Babel 和 babel-sublime 包（package）一同使用可以让源码的语法渲染上升到一个全新的水平。  

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

元素是构成 React 应用的最小单位，JSX 就是用来声明 React 当中的元素。  
与浏览器的 DOM 元素不同，React 当中的元素事实上是普通的对象，React DOM 可以确保 浏览器 DOM 的数据内容与 React 元素保持一致。  

***注意:***

*由于 JSX 就是 JavaScript，一些标识符像 class 和 for 不建议作为 XML 属性名。作为替代，React DOM 使用 className 和 htmlFor 来做对应的属性。*

元素中可以嵌套多个 HTML 标签，需要使用一个 div 元素包裹它，元素添加自定义属性需要使用 data- 前缀。

### 独立文件

你的 React JSX 代码可以放在一个独立文件上，然后在 HTML 文件中引入该 JS 文件：

```
<body>
  <div id="example"></div>
<script type="text/babel" src="helloworld_react.js"></script>
</body>
```

### JavaScript 表达式

可以在 JSX 中使用 JavaScript 表达式。表达式写在花括号 {} 中。  
在 JSX 中不能使用 if else 语句，但可以使用 conditional (三元运算) 表达式来替代。  

### 样式

React 推荐使用内联样式。我们可以使用 camelCase 语法来设置内联样式. React 会在指定元素数字后自动添加 px 。  

```
var myStyle = {
    fontSize: 100,
    color: '#FF0000'
};
ReactDOM.render(
    <h1 style = {myStyle}>菜鸟教程</h1>,//此处如果加了引号就只能做字符串原样输出，不加引号是jsx语法
    document.getElementById('example')
);
```

### 注释
注释需要写在花括号中，实例如下：  

```
ReactDOM.render(
    <div>
    <h1>菜鸟教程</h1>
    {/*注释...*/}
     </div>,
    document.getElementById('example')
);
```
### 数组
JSX 允许在模板中插入数组，数组会自动展开所有成员：  

```
var arr = [
  <h1>菜鸟教程</h1>,
  <h2>学的不仅是技术，更是梦想！</h2>,
];
ReactDOM.render(
  <div>{arr}</div>,
  document.getElementById('example')
);
```

### React 组件

我们封装一个输出 "Hello World！" 的组件，组件名为 HelloMessage：  

```
function HelloMessage(props) {
    return <h1>Hello World!</h1>;
}
 
const element = <HelloMessage />;
 
ReactDOM.render(
    element,
    document.getElementById('example')
);
```
### 实例解析：

1、我们可以使用函数定义了一个组件：
```
function HelloMessage(props) {
    return <h1>Hello World!</h1>;
}
```
也可以使用 ES6 class 来定义一个组件:
```
class Welcome extends React.Component {
  render() {
    return <h1>Hello World!</h1>;
  }
}
```

2、const element = <HelloMessage /> 为用户自定义的组件。

*注意，原生 HTML 元素名以小写字母开头，而自定义的 React 类名以大写字母开头，比如 HelloMessage 不能写成 helloMessage。除此之外还需要注意组件类只能包含一个顶层标签，否则也会报错。*

### 复合组件

我们可以通过创建多个组件来合成一个组件，即把组件的不同功能点进行分离。


### React State(状态)

React 把组件看成是一个状态机（State Machines）。通过与用户的交互，实现不同状态，然后渲染 UI，让用户界面和数据保持一致。

React 里，只需更新组件的 state，然后根据新的 state 重新渲染用户界面（不要操作 DOM）

### 数据自顶向下流动

父组件或子组件都不能知道某个组件是有状态还是无状态，并且它们不应该关心某组件是被定义为一个函数还是一个类。  

这就是为什么状态通常被称为局部或封装。 除了拥有并设置它的组件外，其它组件不可访问。  


### React Props

state 和 props 主要的区别在于 props 是不可变的，而 state 可以根据与用户交互来改变。这就是为什么有些容器组件需要定义 state 来更新和修改数据。 而子组件只能通过 props 来传递数据。

### 默认 Props

你可以通过组件类的 defaultProps 属性为 props 设置默认值。

### State 和 Props

我们可以在应用中组合使用 state 和 props 。可以在父组件中设置 state， 并通过在子组件上使用 props 将其传递到子组件上。  

### Props 验证

React.PropTypes 在 React v15.5 版本后已经移到了 prop-types 库。

Props 验证使用 propTypes，它可以保证我们的应用组件被正确使用，React.PropTypes 提供很多验证器 (validator) 来验证传入数据是否有效。当向 props 传入无效数据时，JavaScript 控制台会抛出警告。

**React 16.4 实例:**      

```
MyTitle.propTypes = {
  title: PropTypes.string
};
```
**React 15.4 实例:**    

```
var title = "菜鸟教程";
// var title = 123;
var MyTitle = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
  },
 
  render: function() {
     return <h1> {this.props.title} </h1>;
   }
});
```

更多验证器说明如下：

```
MyComponent.propTypes = {
    // 可以声明 prop 为指定的 JS 基本数据类型，默认情况，这些数据是可选的
   optionalArray: React.PropTypes.array,
    optionalBool: React.PropTypes.bool,
    optionalFunc: React.PropTypes.func,
    optionalNumber: React.PropTypes.number,
    optionalObject: React.PropTypes.object,
    optionalString: React.PropTypes.string,
 
    // 可以被渲染的对象 numbers, strings, elements 或 array
    optionalNode: React.PropTypes.node,
 
    //  React 元素
    optionalElement: React.PropTypes.element,
 
    // 用 JS 的 instanceof 操作符声明 prop 为类的实例。
    optionalMessage: React.PropTypes.instanceOf(Message),
 
    // 用 enum 来限制 prop 只接受指定的值。
    optionalEnum: React.PropTypes.oneOf(['News', 'Photos']),
 
    // 可以是多个对象类型中的一个
    optionalUnion: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.instanceOf(Message)
    ]),
 
    // 指定类型组成的数组
    optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),
 
    // 指定类型的属性构成的对象
    optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),
 
    // 特定 shape 参数的对象
    optionalObjectWithShape: React.PropTypes.shape({
      color: React.PropTypes.string,
      fontSize: React.PropTypes.number
    }),
 
    // 任意类型加上 `isRequired` 来使 prop 不可空。
    requiredFunc: React.PropTypes.func.isRequired,
 
    // 不可空的任意类型
    requiredAny: React.PropTypes.any.isRequired,
 
    // 自定义验证器。如果验证失败需要返回一个 Error 对象。不要直接使用 `console.warn` 或抛异常，因为这样 `oneOfType` 会失效。
    customProp: function(props, propName, componentName) {
      if (!/matchme/.test(props[propName])) {
        return new Error('Validation failed!');
      }
    }
  }
}
```

### React 事件处理

React 元素的事件处理和 DOM 元素类似。但是有一点语法上的不同:

- React 事件绑定属性的命名采用驼峰式写法，而不是小写。
- 如果采用 JSX 的语法你需要传入一个函数作为事件处理函数，而不是一个字符串(DOM 元素的写法)

React 中写法为：

```
<button onClick={activateLasers}>
  激活按钮
</button>
```

在 React 中另一个不同是你不能使用返回 false 的方式阻止默认行为， 你必须明确的使用 **preventDefault**。

你必须谨慎对待 JSX 回调函数中的 this，类的方法默认是不会绑定 this 的。
```
// 这边绑定是必要的，这样 `this` 才能在回调函数中使用
    this.handleClick = this.handleClick.bind(this);
```
如果使用 bind 让你很烦，这里有两种方式可以解决。如果你正在使用实验性的属性初始化器语法，你可以使用属性初始化器来正确的绑定回调函数：
```
handleClick = () => {
    console.log('this is:', this);
  }
```

使用这个语法有个问题就是每次组件渲染的时候都会创建一个不同的回调函数。在大多数情况下，这没有问题。然而如果这个回调函数作为一个属性值传入低阶组件，这些组件可能会进行额外的重新渲染。我们通常建议在构造函数中绑定或使用属性初始化器语法来避免这类性能问题。  

### 向事件处理程序传递参数

通常我们会为事件处理程序传递额外的参数。例如，若是 id 是你要删除那一行的 id，以下两种方式都可以向事件处理程序传递参数：

```
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```
上述两种方式是等价的。
上面两个例子中，参数 e 作为 React 事件对象将会被作为第二个参数进行传递。通过箭头函数的方式，事件对象必须显式的进行传递，但是通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。

值得注意的是，通过 bind 方式向监听函数传参，在类组件中定义的监听函数，事件对象 e 要排在所传递参数的后面。  

### React 条件渲染

在 React 中，你可以创建不同的组件来封装各种你需要的行为。然后还可以根据应用的状态变化只渲染其中的一部分。
React 中的条件渲染和 JavaScript 中的一致，使用 JavaScript 操作符 if 或条件运算符来创建表示当前状态的元素，然后让 React 根据它们来更新 UI。

### 与运算符 &&
你可以通过用花括号包裹代码在 JSX 中嵌入任何表达式 ，也包括 JavaScript 的逻辑与 &&，它可以方便地条件渲染一个元素。

```
      {unreadMessages.length > 0 &&
        <h2>
          您有 {unreadMessages.length} 条未读信息。
        </h2>
      }
```

### 三目运算符

条件渲染的另一种方法是使用 JavaScript 的条件运算符:
```
condition ? true : false。
```

```
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      )}
    </div>
  );
}
```

### 阻止组件渲染

在极少数情况下，你可能希望隐藏组件，即使它被其他组件渲染。让 render 方法返回 null 而不是它的渲染结果即可实现。


### React 列表 & Keys

可以使用 JavaScript 的 map() 方法来创建列表。

### Keys

Keys 可以在 DOM 中的某些元素被增加或删除的时候帮助 React 识别哪些元素发生了变化。因此你应当给数组中的每一个元素赋予一个确定的标识。

### 用keys提取组件

元素的 key 只有在它和它的兄弟节点对比时才有意义。  
比方说，如果你提取出一个 ListItem 组件，你应该把 key 保存在数组中的这个 <ListItem /> 元素上，而不是放在 ListItem 组件中的 `<li>` 元素上。
  
### 元素的 key 在他的兄弟元素之间应该唯一

数组元素中使用的 key 在其兄弟之间应该是独一无二的。然而，它们不需要是全局唯一的。当我们生成两个不同的数组时，我们可以使用相同的键。 

key 会作为给 React 的提示，但不会传递给你的组件。

### React 组件 API

- 设置状态：setState
- 替换状态：replaceState
- 设置属性：setProps
- 替换属性：replaceProps
- 强制更新：forceUpdate
- 获取DOM节点：findDOMNode
- 判断组件挂载状态：isMounted

### React 组件生命周期

组件的生命周期可分成三个状态：

- Mounting：已插入真实 DOM
- Updating：正在被重新渲染
- Unmounting：已移出真实 DOM
生命周期的方法有：

- componentWillMount 在渲染前调用,在客户端也在服务端。

- componentDidMount : 在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。 如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作(防止异步操作阻塞UI)。

- componentWillReceiveProps 在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用。

- shouldComponentUpdate 返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用。 
可以在你确认不需要更新组件时使用。

- componentWillUpdate在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。

- componentDidUpdate 在组件完成更新后立即调用。在初始化时不会被调用。

- componentWillUnmount在组件从 DOM 中移除之前立刻被调用。

### React AJAX


React 组件的数据可以通过 componentDidMount 方法中的 Ajax 来获取，当从服务端获取数据时可以将数据存储在 state 中，再用 this.setState 方法重新渲染 UI。   

当使用异步加载数据时，在组件卸载前使用 componentWillUnmount 来取消未完成的请求。  


### React 表单与事件


HTML 表单元素与 React 中的其他 DOM 元素有所不同,因为表单元素生来就保留一些内部状态。    


在 HTML 当中，像` <input>`, `<textarea>`, 和 `<select>` 这类表单元素会维持自身状态，并根据用户输入进行更新。但在React中，可变的状态通常保存在组件的状态属性中，并且只能用 setState() 方法进行更新。   
  

在 React 中，不使用 selected 属性，而在根 select 标签上用 value 属性来表示选中项。  


当你有处理多个 input 元素时，你可以通过给每个元素添加一个 name 属性，来让处理函数根据 event.target.name 的值来选择做什么。 

  
*当你需要从子组件中更新父组件的 state 时，你需要在父组件通过创建事件句柄 (handleChange) ，并作为 prop (updateStateProp) 传递到你的子组件上。*


### React Refs


React 支持一种非常特殊的属性 Ref ，你可以用来绑定到 render() 输出的任何组件上。  


这个特殊的属性允许你引用 render() 返回的相应的支撑实例（ backing instance ）。这样就可以确保在任何时间总是拿到正确的实例。  


使用方式：

```
this.refs.myInput;
```

我们也可以使用 getDOMNode()方法获取DOM元素


