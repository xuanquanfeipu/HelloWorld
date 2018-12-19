# angular1 vs angular2/4

架构：基于MVC vs 基于组件、引入了 NativeScript 技术

性能：后者更快（精简了核心模块）

对 Mobile app 的支持：响应式网页、双向数据绑定的Web应用  vs 很好地支持 mobile app、解决了 mobile app 跨平台的问题

语言：JavaScript vs TypeScript

代码重用方法：$scope vs directive 和 controller, 通过对 component 组件的split（分割）

HTML5 允许扩展的（自制的）属性，以 data- 开头。

AngularJS 属性以 ng- 开头，但是您可以使用 data-ng- 来让网页对 HTML5 有效。

ng-for vs *ngFor

app.directive('myPane', function () {
	return {
		// 指定必须有myTabs对象，若对象不存在则会报错，见下面的图1
		require: '^myTabs',  // ^ 表示将在父级的范围内查找该对象， 没有 ^ 表示在Directive内查找该对象， 若范围指定错误无法找到myTabs，js则会报错，使用？可以在myTabs指令不存在的情况下不报错
		restrict: 'ACEM',//attr,class,element,comment
		transclude: true,
		scope: {
			title: '@'
		},
		link: function (scope, element, attrs, tabsCtrl) {
			tabsCtrl.addPane(scope);
		},
		templateUrl: 'my-pane.html'
	};
}); 

scope: {
     // `myName` 就是原来元素中的`my-name`属性
    name: '@myName', //如果变量名也是name 这里@后的变量名可省略
    age: '=',//
    // `changeMyAge`就是原来元素中的`change-my-age`属性
    changeAge: '&changeMyAge' 
 }
 
 <div class="my-directive" my-directive my-name="{{name}}" age="age" change-my-age="changeAge()"></div>
 
 @ 当指令编译到模板的name时，就会到scope中寻找是否含有name的键值对，如果存在，就像上面那样，看到@就知道这是一个单向的数据绑定，然后寻找原来的那个使用指令的元素上（或者是指令元素本身）含有这个值的属性即my-name={{name}}，然后在父作用域查找{{name}}的值，得到之后传递给模板中的name。
=和&与@差不多，只不过=进行的是双向的数据绑定，不论模板还是父作用域上的属性的值发生改变都会使另一个值发生改变，而&是绑定函数而已。

## 编译器
编译器是 Angular 提供的一项服务，用来遍历DOM节点，查找特定的属性。编译过程分为两个阶段：
编译：遍历DOM节点，收集所有的指令，返回一个连接函数（link func）
连接：将上一步收集到的每个指令与其所在的作用域（scope）连接生成一个实时视图。任何作用域中的模型改变都会实时在视图中反映出来，同时任何用户与视图的交互则会映射到作用域的模型中。这样，作用域中的数据模型就成了唯一的数据源。
一些如 ng-repeat 这样的指令，会为集合中的每个项目克隆一次DOM元素。由于克隆的模板只需要被编译一次，然后为每个克隆实例做一次连接，这样将编译分成编译和连接两个阶段就有效地提升了性能（译注：不用为每个克隆的实例都编译一次，只需对模板进行统一的一次编译，然后在连接阶段单独为每个实例进行到 scope 的连接即可）。

## 编译指令
知道 Angular 的编译是在DOM节点上发生而非字符串上是很重要的。通常，你不会注意到这个约束，因为当一个页面加载时，浏览器自动将HTML解析为DOM树了。
然而，如果你自己手动调用 $compile 时，则需要注意上面说的注意点了。因为如果你传给它一个字符串，显然是要报错的。所以，在你传值给 $compile 之前，用 angular.element 将字符串转化为DOM。
HTML 编译可以细分为三个阶段：
$compile 遍历DOM节点，匹配指令。
如果编译器发现某个元素匹配一个指令，那么这个指令就被添加到指令列表中（该列表与DOM元素对应）。一个元素可能匹配到多个指令（译注：也就是一个元素里面可能有多个指令）。
当所有指令都匹配到相应的元素时，编译器按照指令的 priority 属性来排列指令的编译顺序。
然后依次执行每个指令的 compile 函数。每个 compile 函数有一次更改该指令所对应的DOM模板的机会。然后，每个 compile 函数返回一个 link 函数。这些函数构成一个“合并的”连接函数，它会调用每个指令返回的 link 函数。
之后，$compile 调用第二步返回的连接函数，将模板和对应的作用域连接。而这又会依次调用连接函数中包含的每个指令对应的 link 函数，进而在各个DOM元素上注册监听器以及在相应的 scope 中设置对应的 $watchs。
经过这三个阶段之后，结果是我们得到了一个作用域和DOM绑定的实时视图。所以在这之后，任一发生在已经经过编译的作用域上的数据模型的变化都会反映在DOM之中。

下面是使用 $compile 服务的相关代码。它应该能帮你理解 Angular 内部在做些什么（译注：下面代码中的注释就不翻译了，因为有一些如 compile 和 link 翻译效果反而不好）：

'''
var $compile = ...; // injected into your code
  var scope = ...;
  var parent = ...; // DOM element where the compiled template can be appended
 
  var html = '<div ng-bind="exp"></div>';
 
  // Step 1: parse HTML into DOM element
  var template = angular.element(html);
 
  // Step 2: compile the template
  var linkFn = $compile(template);
 
  // Step 3: link the compiled template with the scope.
  var element = linkFn(scope);
  
  // Step 4: Append to DOM (optional)
  parent.appendChild(element);
  '''
  
##  compile 和 link 的区别

这会儿，我想你该很疑惑为什么编译过程被分成了编译和连接两个阶段（译注：这里其实用英文会更好的，compile 和 link，就可以免去歧义了）。（译注：按现在知乎流行的说法，每个问题都有个短答案和长答案两种版本）简短地回答呢，那就是任何时候任一数据模型的改变引起的DOM结构的改变都需要这种两阶段编译的支持。

指令有 compile function 是不多见的，因为大部分指令通常只关心如何操作特定的DOM元素实例，而不是去改变它的整体结构。
指令通常有 link function。连接函数让指令能够往特定的DOM元素实例的克隆对象上注册监听器，同时可以将作用域中的内容复制到DOM中去。

最佳实践：任何能够在指令实例中共享的操作，为了性能考虑，最好是都移到指令的 compile function 中去。

注意： 连接 意味着在DOM上设置监听器以及在相关的作用域中设置 $watch 以保证二者（译注：DOM和作用域）的同步。

'''
transclude: true,
scope: {
    title: '@',             // the title uses the data-binding from the parent scope
    onOk: '&',              // create a delegate onOk function
    onCancel: '&',          // create a delegate onCancel function
    visible: '='            // set up visible to accept data-binding
},
restrict: 'E',
replace: true
'''
