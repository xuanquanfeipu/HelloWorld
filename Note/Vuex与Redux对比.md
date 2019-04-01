# Vuex与Redux对比

*仅从设计理念、使用角度进行对比，不涉及实现原理。*


关闭
原
Vuex与Redux对比
2018年06月21日 09:40:22 hyupeng1006 阅读数：6032
 版权声明：本文为博主原创文章，未经博主允许不得转载。	https://blog.csdn.net/hyupeng1006/article/details/80755667
*仅从设计理念、使用角度进行对比，不涉及实现原理。*

尤大也说过VUEX是吸收了Redux的经验，放弃了一些特性并做了一些优化，代价就是VUEX只能和VUE配合。

而Redux则是一个纯粹的状态管理系统，React利用React-Redux将它与React框架结合起来。

VUEX与React-Redux：一个是针对VUE优化的状态管理系统，一个仅是常规的状态管理系统（Redux）与React框架的结合版本。它们必然在都具备常规的状态管理的功能之外，针对性地对各自所对应的框架还会有一些更优的特性，并且React-Redux还有一些衍生项目。DVA就是一个基于对React-Redux进行封装并提供了一些优化特性的框架，所以下文也会结合DVA进行对比。

#### 设计理念：
虽然很多文章都提到说不要为了用状态管理而用状态管理，但是状态管理对于前端单页应用的管理思想还是很精髓的：
- Web应用是一个状态机，视图与状态是一一对应的。

![image](https://vuex.vuejs.org/flow.png)

我认为，一旦认同这种模式并在项目组使用了状态管理，就要严格的在整个应用中都采用这种模式。因此，基于这种特性，我们需要一种机制或者框架：使得我们能够管理状态，感知变化，并将状态映射为页面表现。

**Redux**，本身就是一个单纯的状态管理者，我们不追溯它的历史，从使用角度来说：它提供一个全局的对象store，store中包含state对象用以包含所有应用数据，并且store提供了一些reducer方法。这些方法可以自定义，使用调用者得以改变state的值。state的值仅为只读，如果需要更改则必须只能通过reducer。

有了状态保存，有了读写机制，Redux这一套状态管理的框架对于web应用的状态机管理的思想就是可用的。

**React-Redux**，简单来说，它提供了一些接口，用于Redux的状态和React的组件展示结合起来，以用于实现状态与视图的一一对应。

**VUEX**，吸收了Redux的思想，并且针对web应用的开发模式和VUE框架做了优化。所以它在实现了全量Redux的思想以外，为了与VUE框架结合，它也具备了类似React-Redux中的与框架结合的功能（尽管具体使用方式可能有差异），此外还一些更好用的特性，下文会说到。

**DVA**，则是对React-Redux进行了封装，并结合了Redux-Saga等中间件，而且使用了model概念，也相当于在React-Redux的基础上针对web应用开发做了优化。（个人认为DVA框架的开发者可能是对VUEX有所借鉴的）

所以说，看起来VUE家族的一个VUEX，就可以匹敌React家族的这些封装封装再封装……

###### VUEX数据流向图


![image](https://vuex.vuejs.org/vuex.png)



###### DVA数据流向图

![image](https://zos.alipayobjects.com/rmsportal/PPrerEAKbIoDZYr.png)


#### 对比：
因为VUEX可以以一敌多，接下来将对以下三方面进行分析
- Redux vs VUEX
- React-Redux vs VUEX
- DVA vs VUEX

#### I

###### Redux
- 核心对象：store
- 数据存储：state
- 状态更新提交接口：==dispatch==
- 状态更新提交参数：带type和payload的==Action==
- 状态更新计算：==reducer==
- 限制：reducer必须是纯函数，不支持异步
- 特性：支持中间件

###### VUEX
- 核心对象：store
- 数据存储：state
- 状态更新提交接口：==commit==
- 状态更新提交参数：带type和payload的mutation==提交对象/参数==
- 状态更新计算：==mutation handler==
- 限制：mutation handler必须是非异步方法
- 特性：支持带缓存的getter，用于获取state经过某些计算后的值

###### Redux vs VUEX 对比分析
store和state是最基本的概念，VUEX没有做出改变。其实VUEX对整个框架思想并没有任何改变，只是某些内容变化了名称或者叫法，通过改名，以图在一些细节概念上有所区分。
- **VUEX弱化了dispatch的存在感**。VUEX认为状态变更的触发是一次“提交”而已，而调用方式则是框架提供一个提交的commit API接口。
- **VUEX取消了Redux中Action的概念**。不同于Redux认为状态变更必须是由一次"行为"触发，VUEX仅仅认为在任何时候触发状态变化只需要进行mutation即可。Redux的Action必须是一个对象，而VUEX认为只要传递必要的参数即可，形式不做要求。
- **VUEX也弱化了Redux中的reducer的概念**。reducer在计算机领域语义应该是"规约"，在这里意思应该是根据旧的state和Action的传入参数，"规约"出新的state。在VUEX中，对应的是mutation，即"转变"，只是根据入参对旧state进行"转变"而已。

总的来说，VUEX通过弱化概念，在任何东西都没做实质性削减的基础上，使得整套框架更易于理解了。

另外VUEX支持getter，运行中是带缓存的，算是对提升性能方面做了些优化工作，言外之意也是鼓励大家多使用getter。

#### II

###### React-Redux
- 状态注入组件：==<Provider/>组件结合connect方法==
- ==容器组件：通过connect关联了state的组件，并被传入dispatch接口==
- 展示组件：不与state或dispatch直接产生关系
- 特性：connect支持mapStatesToProps方法，用于自定义映射

###### VUEX
- 状态注入组件：==Vue.use(Vuex)将Vuex应用为全局的plugin，再将store对象传入根VUE实例==
- ==容器组件：没有这个概念==
- 展示组件：在组件中可以获取this.$store.state.*，也进行this.$store.commit()等等
- 特性：VUEX提供mapState，mapGetter，mapMutation等方法，用于生成store内部属性对组件内部属性的映射

###### React-Redux vs VUEX 对比分析
通过使用方式上的较大差异，也可以看出理念上的不同。
- **和组件结合方式的差异**。VUE通过VUEX全局插件的使用，结合将store传入根实例的过程，就可以使得store对象在运行时存在于任何vue组件中。而React-Redux则除了需要在较外层组件结构中使用<Provider/>以拿到store之外，还需要显式指定容器组件，即用connect包装一下该组件。这样看来我认为VUE是更推荐在使用了VUEX的框架中的每个组件内部都使用store，而React-Redux则提供了自由选择性。而VUEX即不需要使用外层组件，也不需要类似connect方式将组件做一次包装，我认为出发点应该是可能是为了避免啰嗦。
- **容器组件的差异**。React-Redux提倡容器组件和表现组件分离的最佳实践，而VUEX框架下不做区分，全都是表现（展示）组件。我觉得不分优劣，React-Redux的做法更清晰、更具有强制性和规范性，而VUEX的方式更加简化和易于理解。

总的来说，就是谁包谁，谁插谁的问题。Redux毕竟是独立于React的状态管理，它与React的结合则需要对React组件进行一下外包装。而VUEX就是为VUE定制，作为插件、以及使用插入的方式就可以生效，而且提供了很大的灵活性。

#### III

###### DVA
- 划分模块：提供了model的概念，一个model相当于是store的一个小块，DVA负责将这些小块整合成全局store而不需开发者关心。每个model提供配置namespace便于使用。
- 异步方法调用：==effect==。由于包装了Redux-Saga，DVA支持将配置的effect方法做为model的一部分。每个effect方法是一个Generator函数，将异步方法（Promise）调用同步化，框架提供迭代器，执行时串行执行。通过包装，开发者可以通过dispatch调用Action，以和调用reducer一样的方式调用effect方法。而effect内部提供API，用户获取参数、获取state、调用其他reducer等等。

###### VUEX
- 划分模块：允许将store分割成module，概念与DVA中的类似。与DVA一样，它也提供访问自身state和全局state的方法，也提供通过namespace/module名的方式供组件使用的办法，也提供动态注册、模块重用等。
- 异步方法调用：==Action==。Action类似于mutation，但是它内部支持异步调用。它无法直接更改state，但是可以使用context.commit()方式调用mutation。而对于开发者来说，不像DVA将effects和reducers的调用方式搞的相同，VUEX中的Action需要使用另一个API--dispatch接口来调用。它可以返回Promise对象，供调用者进行后续处理。
- 特性：支持双向绑定

###### DVA vs VUEX 对比分析
它们将store拆分成模块的出发点是相同的，这也是大型应用开发所必备的。并且模块化的思路都是一样的。但是异步方法调用方面有所不同：
- **DVA更倾向于支持同步化的代码写法与执行方式**。这样的好处是开发者使用effects和reducers时感觉是一样的。开发者可以适当规避使用Promise从而几乎不用接触异步概念，但是却需要接受Generator方法这种新事物。我认为学习成本并没有降低，可能好处就是最终代码比较简化，出错率较低吧。当然这对于框架本身来说会带来一定的复杂性。
- **VUEX倾向于将异步方法区分开**。Action就是异步方法，而mutation就是非异步方法。声明方式、调用方式、入参等等，都是有明显区别的。这样的好处是时刻在提醒开发者需要将异步方法加以区分注意，并且可以很常规地使用Promise，使用异步特性。

*VUEX还有个特性就是它的表单类组件的双向绑定。和VUEX结合之后，也是支持绑定到VUEX中的state上的。*

VUEX的异步方法的提交方式，注意是“dispatch一个Action”。这在概念上是和Redux中的状态更新提交是一致的。从VUEX数据流向图也能看出，VUEX也是建议只向外部暴露Action供调用。这样一来，VUEX在使用上更加接近Redux了。

总的来说，DVA和VUEX我认为肯定是有借鉴学习的成分在里面的，对异步的使用方面也没有孰优孰劣。我们也完全可以找到或者封装一个React-Redux中间件，以在React中使用类似的纯异步方法；也可以基于VUE与VUEX做开发，使得它可以支持Generator甚至async函数方式将异步代码写法同步化。




## Flux架构

Flux是为了解决在前端模块化开发后，组件之间的频繁数据交互导致的项目维护复杂的问题。

一般的组件传值，会在组件之间造成强关联，这种传值在项目比较小的时候还可控，一旦项目变得庞大，将会导致整个项目逻辑变得十分复杂，数据交互变得冗长且不可控，
Flux应运而生。

Flux架构下，拆分成了View，Actions，Store三部分，在View中的交互操作将会触发到actions，actions中对store进行改变，当store进行改变后，相应的反过来去更新视图，这就是单向数据流。

单向数据流解决了组件相互传值不可控的问题，所有数据的改变统一都流向了store。

## Redux
Redux是flux的一种实现，Redux不单单可以用在react上面。用于react的redux的package名称叫做react-redux。

基于flux的架构思想，redux分为action、reducer和state三部分:

1. action用于定义函数，定义更新的数据
2. reducer用来实际的操作数据，对传来的数据进行操作
3. state即为reducer return的部分，state可以设置默认值

    tips:在redux的原则当中，
        state应当是只读的，要改变state，应当触发action然后触发reducer去改变;

        reducer的操作应当是纯函数，在reducer中，reducer应该单纯只执行计算功能。（取自API文档）
            不应当操作传入的参数；  
            不应当执行有副作用的操作，例如ajax，路由跳转；  
            不应当调用非纯函数，如Date.now()和Math.random();  
            
引入Redux

import { createStore, bindActionCreators } from "redux";

createStore用于将定义好的actions和reducer对象写入redux;bindActionCreators用于将redux的actions对组件进行映射.
eg:
```
    // 1、引入state中的变量，映射state
    function mapStateToProps(state){
      return {text:state.text}
    }

    // 2、引入reducer中的function，映射actions
    function mapDispatchToProps(dispatch){
      return {
        actions:bindActionCreators({
          changeText:changeText,
          buttonClick:buttonClick
        },dispatch)
      }
    }
    //connect ，将mapState和Dispatch与组件进行关联，完成映射
    App = connect(mapStateToProps,mapDispatchToProps)(App)
```
这里注意，
1. 
```
    bindActionCreators
      {
        actions:bindActionCreators({
          changeText:changeText,
          buttonClick:buttonClick
        },dispatch)
      }
```      
    等同于
    ```
      {
        actions:{
          changeText:()=>dispatch(changeText()),
          buttonClick:(a)=>dispatch(buttonClick(a))
        }
      }
```      
    其中，如果不使用bindActionCreators，需要映射的函数调用的时候带有形参，那么就必须在dispatch时加入形参。        
    例如buttonClick这个函数就有形参    

    2. connect
    
      connect用于视图组件和store的关联，
      connect会指定两个参数，第一个参数是state的映射
                            第二个参数是actions的映射
### Action
Actions主要用来传递事件的触发，只做事件的描述和传递，不进行计算，事件触发后，state应该如何变化，不由actions来进行，actions将传递给reducer进行详细处理。
```
eg:
    function buttonClick(inputText){
      return {
        type:"BUTTON_CLICK",
        data:inputText
      }
    }
```    
Tips:在这里，Actions表现为一个一个的函数，函数return的是一个对象，对象带有一个type用来判断当前的操作类型，data为自定义的值，可以更改，可以自己定义带有其他的属性值。

### 如何触发actions？
    在组件内部，使用this.props.actions.buttonClick(inputText);
### Reducer
还是那句话，Actions只做了事件的描述和数据的传递，没有进行计算，计算都放到了reducer中进行，
```
eg:
    function myApp(state = initialState , action){
      switch(action.type){
        case "CHANGE_TEXT":
          return {
            text:state.text == "Hello"?"Stark":"Hello"
          }
        case "BUTTON_CLICK":
          return {
            text:action.data || "You just click button"
          }
        defaultkey: "value", 
          return{
            text:"hello!!"
          }
      }
    }
```    
一般地，reducer会接收两个参数，   
    第一个参数为state，state可以定义默认值，  
    第二个参数为action。   
    通过switch来定义针对不同actions传递过来的actions.type，对数据进行不同的操作。

定义actions和reducer都是定义的一个函数，
定义好之后，需要将二者注册给redux对象。

    let store = createStore(myApp);
Component呈递
一般情况下，redux只有一个state，因此state是全局作用的，component之间需要共享的数据，直接操作state即可。

vuex store的结构

var store=new Vuex({
modules:{
  modulesA:{
    state:{},
    getters:{},
    mutations:{},
    actions:{}  异步
   }
  }
})  

mapState、mapMutations、mapAction

1. mutation

　　The only way to actually change state in a Vuex store is by committing a mutation, 在vue 中，只有mutation 才能改变state.  mutation 类似事件，每一个mutation都有一个类型和一个处理函数，因为只有mutation 才能改变state, 所以处理函数自动会获得一个默认参数 state. 所谓的类型其实就是名字，action去comit 一个mutation, 它要指定去commit哪个mutation, 所以mutation至少需要一个名字，commit mutation 之后， 要做什么事情，那就需要给它指定一个处理函数， 类型(名字) + 处理函数就构成了mutation. 现在store.js添加mutation.
```
const store = new Vuex.Store({
    state: {
        count:0
    },
    mutations: {
        // 加1
        increment(state) {
            state.count++;
        },
        // 减1
        decrement(state) {
            state.count--
        }
    }
})
```

Vue 建议我们mutation 类型用大写常量表示，修改一下，把mutation 类型改为大写

```
mutations: {
	// 加1
	INCREMENT(state) {
		state.count++;
	},
	// 减1
	DECREMENT(state) {
		state.count--
	}
}
```	
2. action

action去commit mutations, 所以还要定义action. store.js 里面添加actions.

```
const store = new Vuex.Store({
    state: {
        count:0
    },
    mutations: {
        // 加1
        INCREMENT(state) {
            state.count++;
        },
        // 减1
        DECREMENT(state) {
            state.count--
        }
    },
    actions: {
        increment(context) {
            context.commit("INCREMENT");
        },
        decrement(context) {
            context.commit("DECREMENT");
        }
    }
})
```

action 和mutions 的定义方法是类似的，我们要dispatch 一个action, 所以actions 肯定有一个名字，dispatch action 之后它要做事情，就是commit mutation, 所以还要给它指定一个函数。因为要commit mutation ,所以 函数也会自动获得一个默认参数context,  它是一个store 实例，通过它可以获取到store 实例的属性和方法,如 context.state 就会获取到 state 属性， context.commit 就会执行commit命令。

其实actions 还可以简写一下， 因为函数的参数是一个对象，函数中用的是对象中一个方法，我们可以通过对象的解构赋值直接获取到该方法。修改一下 actions

```
actions: {
	increment({commit}){
		commit("INCREMENT")
	},
	decrement({commit}){
		commit("DECREMENT")
	}
}
```	

3. dispatch  action

　现在就剩下dispatch action 了。什么时候dispatch action 呢？ 只有当我们点击按钮的时候. 给按钮添加click 事件,在click 事件处理函数的中dispatch action.

打开increment.vue 组件，给两个按钮添加click 事件。

```
<template>
    <div>
        <button @click="increment">+1</button>
        <button @click="decrement">-1</button>
    </div>
</template>

<script>
    export default {
        methods: {
            increment(){
                this.$store.dispatch("increment");
            },
            decrement() {
                this.$store.dispatch("decrement")
            }
        }
    }
</script>
```

其实像上面dispatch action 比较麻烦，如果有10 个按钮，我们要写10 个函数，且存在大量的重复，并且我们的事件处理函数名字和action的名字是一样的，这时vue  提供了mapAction 函数，它和mapState  是一样的，把我们的 action 直接映射到store 里面的action中。


当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性。

```
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'
 
export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练，es6的箭头函数，传入参数是state，返回值是state.count。然后把返回值映射给count，此时调用this.count就是store里的count值
    count: state => state.count,
 
    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',
 
    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
```
当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组

```
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
```
mapMutations和mapActions:

```
methods:{
	...mapMutation([
		'project_onCancel',
		'remoteMethod'
	]),
	...mapActions([
		'project_edit_ok'
	])
}
```
mapMutations/mapActions只是把mutation/action函数绑定到methods里面，调里面的方法时正常传参数。

*注意：映射都是映射到当前对象，使用时需要用this来调用。*

像这种组件中的事件处理函数名字和action的名字是相同的，直接把 事件处理函数名字放到一个数组中。组件中的methods 修改如下：

```
<script>
    import {mapActions} from "vuex";
    export default {
        methods: {
            ...mapActions(["increment", "decrement"])
        }
    }
</script>
```

如果事件处理函数名字和action的名字不同，给mapActions 提供一个对象，对象的属性是事件处理函数名字, 属性值是 对应的dispatch 的action 的名字。

我们把 +1 按钮的事件处理函数变改为 add，代码如下： 

```
<template>
    <div>
        <button @click="add">+1</button>    <!-- 事件处理函数变为add -->
        <button @click="decrement">-1</button>
    </div>
</template>

<script>
    import {mapActions} from "vuex";
    export default {
        methods: {
            ...mapActions(["decrement"]),

　　　　　　　// mapActions 对应做出改变
            ...mapActions({
                add: "increment"
            })
        }
    }
```

这时候我们单击按钮，就可以看到count 发生变化。

通过vuex 传递参数

　　很多时候，组件和组件之间还要传递参数，这些都要经过vuex。 在increment 组件内部增加一个输入框和一个按钮，点击按钮的时候，count 增加输入框内的值。

```
<template>
    <div>
        <div>
            <button @click="increment">+1</button>
            <button @click="decrement">-1</button>
        </div>
　　　　// 增加内容
        <div>
            <input type="text" v-model="incrementValue">
            <button @click="incrementWithValue">increment</button>
        </div>
    </div>
</template>
```

在组件内部dispatch action 的时候，它可以自定义参数，只要参数在它dispatch 的action名称 后面，依次列出来就可以了。 在这里，我们点击按钮的时候，触发一个incrementWithValue  action, 并且带一个参数，就可以这样写 this.$store.dispatch(“incrementWithValue”, value)， 整个increment.vue 组件如下：

```
<template>
    <div>
        <div>
            <button @click="increment">+1</button>
            <button @click="decrement">-1</button>
        </div>
        <div>
            <input type="text" v-model="incrementValue">
            <button @click="incrementWithValue">increment</button>
        </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex";
    export default {
        data() {
            return {
                incrementValue: 0
            }
        },
        methods: {
            ...mapActions(["increment","decrement"]),
            incrementWithValue() {
                this.$store.dispatch("incrementWithValue", this.incrementValue)
            }
        }
    }
</script>
```

同样，actions 和mutations 中的处理函数也是一样，它除了可以得到默认参数外，还可以接受自定义的参数，我们自定义的参数，依次在默认参数后面列出来就可以了。 在store.js中分加增加incrementWithValue action和 INCREMENT_WITH_VALUE mutation 

```
const store = new Vuex.Store({
    state: {
        count:0
    },
    mutations: {
        // 加1
        INCREMENT(state) {
            state.count++;
        },
        // 减1
        DECREMENT(state) {
            state.count--
        },
        INCREMENT_WITH_VALUE(state, value){
            state.count +=value;
        }
    },
    actions: {
        increment({commit}){
            commit("INCREMENT")
        },
        decrement({commit}){
            commit("DECREMENT")
        },
        incrementWithValue({commit}, value){
            commit("INCREMENT_WITH_VALUE",  parseInt(value))
        }
    }
})
```	

**错误处理**

　　当我们给vuex 传参的时候，我们要检测参数的正确性，如果有错误需要进行处理

action 中如果是同步操作，就用try..catch 语句，组件中使用try…catch, 捕获action中抛出的错误。Increment.vue组件中，incrementWithValue() 方法中修改如下：

```
methods: {
            ...mapActions(["increment","decrement"]),
            incrementWithValue() {
                 try {
                     this.$store.dispatch("incrementWithValue", this.incrementValue)
                 }catch(error) {
                     alert(error)
                 }
            }
        }
```		

同时store.js 中的action 也进行如下修改：

```
incrementWithValue({commit}, value){
    let intValue = parseInt(value);
    if(isNaN(intValue)){
        throw "Not an Interger"
    }else {
        commit("INCREMENT_WITH_VALUE",  intValue)
    }
}
```

如果action 中进行的是异步操作，那就需要在回调函数中进行错误处理。

```
incrementWithValue({commit}, value){
      let intValue = parseInt(value)
            setTimeout(function() {

                if(isNaN(intValue)) {
                    alert("Not an Interger")
                }else {    
                    commit("INCREMENT_WITH_VALUE", intValue)
                }
            }, 2000)
        }

```

**异步操作给出用户提示信息**

　　首先，在我们的increment.vue中添加一个提示信息，简单给一个div 进行提示。用户提示信息的显示和隐藏，又涉及到一个状态，我们设为waiting, 需要在state 中进行添加。默认为false, 同时我们组件需要从state 中获取到初始状态。increment.vue 组件修改如下：

```
<template>
    <div>
        <div>
            <button @click="increment">+1</button>
            <button @click="decrement">-1</button>
        </div>
        <div>
            <input type="text" v-model="incrementValue">
            <button @click="incrementWithValue">increment</button>
        </div>
        <!-- 展示信息 -->
        <div v-if ="show">
            waiting 
        </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex";
    export default {
        data() {
            return {
                incrementValue: 0
            }
        },
　　　　// computed 从state 中获取初始状态
        computed: {
            show: function() {
                return this.$store.state.waiting;
            }
        },
        methods: {
            ...mapActions(["increment","decrement"]),
            incrementWithValue() {
                this.$store.dispatch("incrementWithValue", this.incrementValue)
            }
        }
    }
</script>

```

mutation 去操作状态，所以增加两个muatation， 用于显示和隐藏waiting. action 中去触发这两个mutation. 整个state 如下：

```
const store = new Vuex.Store({
    state: {
        count:0,
        // 新增waiting  状态
        waiting: false
    },
    mutations: {
        // 加1
        INCREMENT(state) {
            state.count++;
        },
        // 减1
        DECREMENT(state) {
            state.count--
        },
        INCREMENT_WITH_VALUE(state, value){
            state.count +=value;
        },
        // 显示和隐藏waiting
        SHOW_WAITING_MESSAGE(state){
            state.waiting = true;
        },
        HIDE_WAITING_MESSAGE(state){
            state.waiting = false;
        }
    },
    actions: {
        increment({commit}){
            commit("INCREMENT")
        },
        decrement({commit}){
            commit("DECREMENT")
        },
        incrementWithValue({commit}, value){
            commit("SHOW_WAITING_MESSAGE");
            let intValue = parseInt(value)
            setTimeout(function() {
                if(isNaN(intValue)) {
                    alert("Not an Interger")
                }else {    
                    commit("HIDE_WAITING_MESSAGE");
                    commit("INCREMENT_WITH_VALUE", intValue)
                }
            }, 2000)
        }
    }
})
```

**注意：**

　　*mutation是同步的,只要commit mutation, 它就会立即改变state , 这有利于我们追踪 状态的改变。如果 mutation 之后，五分钟才改变state, 那就真不知道state 到底是哪个state了。*

　　action 是异步的，还有的错误处理也都在这里操作。
		
##redux和vuex的区别对比

vuex的流向：view——>commit——>mutations——>state变化——>view变化（同步操作）

            view——>dispatch——>actions——>mutations——>state变化——>view变化（异步操作）

redux的流向：view——>actions——>reducer——>state变化——>view变化（同步异步一样）

vue vuex
react redux react-redux  redux-thunk redux-saga  dva
