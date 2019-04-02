## 浅谈Vue.use

> * 首先我使用官方脚手架新建一个项目vue init webpack vue-demo
> * 然后我创建两个文件index.js plugins.js.
> * 我将这两个文件放置在src/classes/vue-use目录下

接下来对这两个文件进行编写

```
// 文件:  src/classes/vue-use/plugins.js

const Plugin1 = {
    install(a, b, c) {
        console.log('Plugin1 第一个参数:', a);
        console.log('Plugin1 第二个参数:', b);
        console.log('Plugin1 第三个参数:', c);
    },
};

function Plugin2(a, b, c) {
    console.log('Plugin2 第一个参数:', a);
    console.log('Plugin2 第二个参数:', b);
    console.log('Plugin2 第三个参数:', c);
}

export { Plugin1, Plugin2 };
```

```
// 文件: src/classes/vue-use/index.js

import Vue from 'vue';

import { Plugin1, Plugin2 } from './plugins';

Vue.use(Plugin1, '参数1', '参数2');
Vue.use(Plugin2, '参数A', '参数B');
```

然后我们在入口文件main.js引用这段代码

```
// 文件: src/main.js

import Vue from 'vue';

import '@/classes/vue-use';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App),
});
```

从中可以发现我们在plugin1中的install方法编写的三个console都打印出来，第一个打印出来的是Vue对象，第二个跟第三个是我们传入的两个参数。
而plugin2没有install方法，它本身就是一个方法，也能打印三个参数，第一个是Vue对象，第二个跟第三个也是我们传入的两个参数。

直接上源码

```
// Vue源码文件路径：src/core/global-api/use.js

import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    const args = toArray(arguments, 1)
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
}
```
从源码中我们可以发现**vue首先判断这个插件是否被注册过，不允许重复注册。并且接收的plugin参数的限制是Function | Object两种类型**。对于这两种类型有不同的处理。首先将我们传入的参数整理成数组 => const args = toArray(arguments, 1)。

```
// Vue源码文件路径：src/core/shared/util.js

export function toArray (list: any, start?: number): Array<any> {
  start = start || 0
  let i = list.length - start
  const ret: Array<any> = new Array(i)
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}
```
再将Vue对象添加到这个数组的起始位置args.unshift(this),这里的this 指向Vue对象。如果我们传入的plugin(Vue.use的第一个参数)的install是一个方法。
也就是说如果我们**传入一个对象，对象中包含install方法**，那么我们就调用这个plugin的install方法并将整理好的数组当成参数传入install方法中。 => plugin.install.apply(plugin, args)

如果我们**传入的plugin就是一个函数**,那么我们就直接调用这个函数并将整理好的数组当成参数传入。 => plugin.apply(null, args)
之后给这个插件添加至已经添加过的插件数组中，标示已经注册过 => installedPlugins.push(plugin)
最后返回Vue对象。

### 小结

通过以上分析我们可以知道，在我们以后编写插件的时候可以有两种方式。

一种是将这个插件的逻辑封装成一个对象,最后将最后在install编写业务代码暴露给Vue对象。这样做的好处是可以添加任意参数在这个对象上,方便将install函数封装得更加精简，可拓展性也比较高。

还有一种则是将所有逻辑都编写成一个函数暴露给Vue。

其实两种方法原理都一样，无非第二种就是将这个插件直接当成install函数来处理。

用 axios时，就不需要用 Vue.use(axios)，就能直接使用。那这是为什么呐？因为 axios 没有 install。

axios如何全局注册？ 把 axios 加到 Vue 的原型中，这样就达到了全局注册了。在 .vue 文件中使用时，注意  axios 前要加  this。

```
Vue.prototype.axios = axios;
```

使用Vue.component()方法注册全局组件。
```
// 将loading注册为全局组件，在别的组件中通过<loading>标签使用Loading组件
Vue.component('loading', Loading);
```
使用Vue.use注册插件。
```
// Vue.use内部会调用plugin的install方法
Vue.use(plugin);
```

