## React.createClass 、React.createElement、Component

```
var  Info = React.createClass({  //创建一个react模板
      render:function(){
        return <p>createClass----{this.props.you}</p>
      }
});
var eleC = React.createClass({ //创建一个react模板
      render:function(){
      return <div>createElement---{this.props.name}</div>
      }
});
 
var eleProps = {name:"eleC"};
var ele = React.createElement(eleC,eleProps); //创建一个react元素；第一个参数为模板，第二个参数为模板的props
 
/*ReactDOM.render是React的最基本方法用于将模板转为HTML语言，并插入指定的DOM节点。ReactDOM.render(template,targetDOM),
该方法接收两个参数：第一个是创建的模板，多个dom元素外层需使用一个标签进行包裹*/
ReactDOM.render(
  <div>
    <Info  you="createClass" />
    {ele}
  </div>,
  document.getElementById('app')
);
```
**React.createClass  是创建了一个react模板，使用的时候，像html标签一样，比如上面的info**

**React.createElement 是创建了一个react元素，相当于把模板具体化，使用的时候，是当做js变量，直接写入，比如上面的 {ele}**

**ES5创建组件时，调用React.createClass()即可. ES6中使用class myComponent extends React.Component, 其实内部还是调用createClass创建组件。**

createClass主要做的事情有:

1. 定义构造方法Constructor，构造方法中进行props，refs等的初始化，并调用getInitialState来初始化state
2. 调用getDefaultProps，并放在defaultProps类变量上。这个变量不属于某个单独的对象。可理解为static 变量
3. 将React中暴露给应用，但应用中没有设置的方法，设置为null。

**JSX中创建React元素最终会被babel转译为createElement(type, config, children), babel根据JSX中标签的首字母来判断是原生DOM组件，还是自定义React组件。如果首字母大写，则为React组件。这也是为什么ES6中React组件类名必须大写的原因。**



```
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
 
class App extends Component {
  
  render() {
    return (
      <div className="App">
        这里是app
      </div>
    );
  }
}
 
class Info extends Comment{
    render(){
        return (
            <div>
                info
            </div>
        )
    }
}
 
class Ele extends Comment{
    render(){
        return (
            <div>
                ele
            </div>
        )
    }
}
var myProps ={
 
};
var ele = React.createElement(Ele,myProps);
 
 
 
ReactDOM.render(<App>
    <Info></Info>
    {ele}
</App>,document.getElementById('root'));
```
**ES6写法**
```
const element =<h1>Hello, world!</h1>;
const container = document.getElementById('root');
ReactDOM.render(element, container);
```
**会经过babel转换成**
```
"use strict";

var element = React.createElement("h1", null, "Hello, world!");
var container = document.getElementById('root');
ReactDOM.render(element, container);
```
