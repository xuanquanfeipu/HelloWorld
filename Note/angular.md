##angular1 vs angular2/4##

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
