javascript是一种专为网页交互而设计的脚本语言，由三个不同部分组成：
1.ECMAScript，由ECMA-262定义，提供核心语言功能；
2.文档对象模型（DOM）,提供访问和操作网页内容的方法和接口；
3.浏览器对象模型（BOM），提供与浏览器交换的接口和方法。

嵌入代码与外部文件——外部文件的优点
1.可维护性
2.可缓存

ECMAScript中有五种基本数据类型：Undefined/Null/Boolean/Number/String。一种复杂类型Object。

对一个值使用typeof返回值可能是：

undefined
boolean
string
number
object(如果这个值是对象或null)
function

未声明的变量和声明但未初始化的变量 执行typeof都返回undefined 区别：前者只能使用typeof检测，不能用在其他地方，否则会报错

undefined == null //true

Float浮点数 精度问题

不要做这样的测试
var a=0.1,b=0.2;
if（a+b==0.3）{
//do something
}

最小值、最大值、无穷值
Number.MIN_VALUE/Number.MAX_VALUE/Number.NEGTIVE_INFINITY/Number.POSITIVE_INFINITY

判断一个值是否是无穷值 

isFinite（n）;

n/a或N/A（not applicable的缩写），表示不适用，对应的boolean值 true

NAN(not a number)两个特点：
1.任何涉及NaN的操作，都返回NaN
2.NaN与任何值都不等，包括NaN本身。   alert(NaN==NaN) //false

判断一个值是否是NaN 用 isNaN（n）

数值转换
Number（用于任何数据类型），parseInt、parseFloat将字符串转换为数值。

使用后面两个函数解析时，为了消除不同ECMAScript版本的分歧，转换不同的进制时，需要使用第二个参数：转换基数（指定进制）。

转换为字符串
1.toString（），还可以传递一个参数：输出数值的基数。null和undefined没有这个方法
2.String()转型函数

创建对象 
new Object()或new Object没有参数的情况下，可以省略圆括号，但是不推荐。

Object的实例所具有的属性和方法：
Constructor：保存着用于创建当前对象的函数。
hasOwenProperty（propertyName）：检查给定的属性在当前对象实例中（而不是原型中）是否存在。其中的参数必须以字符串形式指定。
isPrototypeOf（object）：用于检查传入的对象是否是另一个对象的原型。
propertyIsEnumerable（propertyName）：用于检查给定的属性是否可以使用for-in语句进行枚举。其中的参数必须以字符串形式指定。
toLocaleString（）：返回对象的字符串表示。与执行环境地区对应。
toString（）:返回对象的字符串表示。
valueOf（）：返回对象的字符串、数值、布尔值表示。

任何操作数与NaN用==比较都返回false，用!=比较都返回true NaN==NaN //false  NaN!==NaN //true
null==undefined
false==0

全等和不全等操作符：操作数未经转换就相等

for-in语句
for(property in expression) statement

label语句
label:statement
一般与for语句配合，将来由break或continue引用。

with语句
with（expression）statement 将代码的作用域限定到一个特定的对象中。

switch(expression)
case value:statement
break;
case value:statement
break;
defalut:statement

ECMAScript函数的一个特性：命名的参数只提供便利，而非必需。
函数无需指定返回值。
无函数签名的概念。
没有重载。
ECMAScript不能像传统的意义上那样实现重载。

非严格模式下
修改argument中的参数值，会同步到命名参数，即它的值是与命名参数同步的（如果传递了对应的参数值的话）。但是这两个值并不是存在相同的内存空间，
他们是空间独立的。反之，修改命名参数的值不会影响argument中的值，因为argument对象的长度是由传入的参数个数决定的，不是由命名的参数个数决定。

ECMAScript中的所有参数传递的都是值，不可能通过引用传递参数。

基本类型的变量不能像引用类型一样动态添加属性和方法。

基本类型变量的复制，复制的是值，引用类型的复制，复制的是引用。

类型检测
variable instanceof constructor

使用typeof检测函数时，返回“function”

延长作用域链的方式

try catch与catch块
with语句

无块级作用域

垃圾收集方式：标记清除、引用计数

创建Object实例的两种方式：new Object()、对象字面量 (方括号表示)

对象属性访问方式：点表示法和方括号表示法。

创建数组的两种方式：new Array()/数组字面量
可以传递长度 new Array(length)、可以传递包含项 new Array("item1","item2")

检测数组
value instanceof Array或者Array.isArray(value) 

join、push、pop、shift、unshift、sort、reverse、concat、slice(start,end)、splice（起始位置、要删除的项数、插入项）
indexOf/lastIndexOf/every/filter/forEach/map/some/reduce/reduceRight

new Date(ms)/Date.parse(datestr)/Date.UTC(year,month,date,hour/min/sec)
var d = new Date();返回是时间对象
console.log(Date.now())返回的是毫秒数
console.log(+new Date())返回的是毫秒数

Date还有很多方法：getTime、getFullYear、getDate、getDay、getHour等等

RegExp类型
var expression = /pattern/ flags;

flags取值：g/i/m  分别表示全局、是否忽略大小写、多行模式

RegExp实例属性：
global、ignoreCase、lastIndex、multiline、source

var pattern1= /\[bc\]at/i;或者 var pattern2 = new RegExp("\\[bc\\]at","i");

实例方法：
exec：返回包含第一个匹配项信息的数组
test：在参数与模式匹配时，返回true

RegExp的构造器属性（静态属性）：input、lastMatch、lastParen、leftContext、multiline、rightContext

函数定义方式：
1.声明语法
2.表达式语法
3.Function构造函数

函数声明会被解析器提升，而表达式不会。

function createComparisonFunction(propertyName){
	return function(object1,object2){
		var value1= object1[(propertyName)];
		var value2= object2[(propertyName)];
		if(value1<value2){
			return -1;
		}else if(value1>value2){
			return 1;
		}else{
			return 0;
		}
	}
}

arguments与this
arguments的callee属性表示拥有该参数对象的函数

function factorial(num){
	if(num<=1){
		return 1;
	}else{
		return num*factorial(num-1);
	}
}

解决函数名耦合问题：
function factorial(num){
	if(num<=1){
		return 1;
	}else{
		return num*arguments.callee(num-1);
	}
}

函数的caller属性 表示该调用该函数的函数
也可以使用arguments.callee.caller

函数属性：length（命名参数个数）、prototype

函数方法：apply(this,arguments)、call(this,arg1,arg2,...)
fun.bind(obj) 创建 创建函数fun的实例，并将其this指向obj

typeof Number(value) //转型函数  返回number
typeof (new Number(value))//构造函数 返回 Object

typeof falseValue //基本类型 返回boolean
typeof  falseObject //包装类型 返回 Object
falseValue  instanceof  Boolean  //返回false
falseObject instanceof  Boolean  //返回true

num.toFixed(精度)

字符方法：
charAt返回指定位置字符/charCodeAt返回指定位置字符的编码
concat、slice(s,e)、substr(s,l)、substring(s,e)
indexOf/lastIndexOf
trim
toLowerCase/toUpperCase

字符串的模式匹配方法：
str.match(正则表达式/RegExp对象) 与pattern.exec(str)相同 返回数组，第一项是与整个模式匹配的字符串，后面是与每个捕获组匹配的值。
str.search(正则表达式/RegExp对象)返回第一个匹配项的位置
str.replace(RegExp对象/字符串,字符串/函数)
str.split(delimitor,length)  //length数组长度可选
str.localCompre(str2) 字符串比较
fromCharCode(code1,code2,code3)  字符编码转换为字符串
encodeURI对整个URI进行编码、encodeURIComponent用于对URI某一段进行编码
前者不会对本身属于URI的特殊字符进行编码，后者会对它发现的任何非标准字符编码
与之对应 decodeURI/decodeURIComponent

eval方法

Math的方法：
min、max、ceil、floor、round、random

属性类型

1.数据属性
[[Configurable]]:delete
[[Enumerable]]:for-in
[[Writable]]:修改
[[Value]]:读写位置

修改属性默认特性：
Object.defineProperty(属性所在对象,属性名,描述符对象)

2.访问器属性
[[Configurable]]:delete
[[Enumerable]]:for-in
[[Get]]:
[[Set]]:
访问器属性不能直接定义，必须使用Object.defineProperty来定义。

创建对象

工厂模式：
function createPerson(name,age,job){
	var o = new Object();
	o.name = name;
	o.age = age;
	o.job = job;
	o.sayName = function(){
		alert(this.name);
	}
	return o;
}

工厂模式虽然解决了创建多个相似对象的问题，但却没有解决对象识别的问题（即怎么知道一个对象的类型）

构造函数模式：

function Person(name,age,job){
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = function(){
		alert(this.name);
	}
}

没有显式地创建对象
直接将属性和方法赋给了this对象
没有return语句
主要问题：每个方法都要在每个实例上重新创建一遍（new Function()）

function Person(name,age,job){
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = Function("alert(this.name)");
}

1.函数构造函数可以当作普通函数调用（在全局作用域或在另一个对象上call、apply）


function Person(name,age,job){
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = sayName;
}

function sayName(){
	alert(this.name);
}

全局作用域定义的函数，却只能被对象调用，而且对于自定义类型而言，没有封装性。

原型模式

每个函数都有一个prototype（原型）属性，这个属性是一个指针，指向一个对象，这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。
就是通过调用构造函数而创建的那个对象实例的原型对象。

好处：可以让所有对象共享它所包含的属性和方法。

function Person(name,age,job){
	
}
Person.prototype.name = "hhy"
Person.prototype.age = age;
Person.prototype.job = job;
Person.prototype.sayName = function sayName(){
	alert(this.name);
};

Person.prototype指向Person的原型对象，而Person.prototype.constructor又指回Person
Person实例person1包含一个内部属性[[prototype]]指向Person.prototype
Person.prototype.isPrototypeOf(person1);//true
Object.getPrototypeOf(person1) == Person.prototype;//true

原型最初只包含constructor属性，而该属性也是共享的，隐藏可以通过对象实例访问。

虽然可以通过对象实例访问保存在原型中的值，但却不能通过对象实例重新原型中的值。
即为对象实例添加一个属性，只会阻止我们访问原型中的同名属性，不会修改那个属性。
即时将这个属性设置为null，也只会在实例中设置这个属性，不会恢复其指向原型的链接。
不过，可以使用delete操作符删除实例属性，从而重新访问原型中的属性。

检测一个属性是否存在于实例中使用hasOwnProperty()

Object.getOwnPropertyDescriptor()方法只能用于实例属性，要取得原型属性的描述符，必须直接在原型对象上调用Object.getOwnPropertyDescriptor()

in操作符的两个使用方式：
1.单独使用时，in操作符会在通过对象能够访问给定属性时返回true,无论该属性是在于实例中还是原型中。
alert("name" in person1)


function hasPrototypeProperty(obj,name){
	return !obj.hasOwnProperty(name) && (name in obj);
}

2.for-in
返回的是所有能够通过对象访问的、可枚举的属性（实例的、原型的）。屏蔽了原型中的不可枚举属性的实例属性也会返回。开发人员自定义的属性都可枚举。

Object.keys(person1);//只返回实例的可枚举属性

Object.keys(Person.prototype);//返回原型的可枚举属性

Object.getOwnPropertyNames()返回所有属性，无论是否可枚举。

对象字面量重写原型的语法：

function Person(){
}

Person.prototype={
	name:'hhh',
	age:30,
	job:'software enginner',
	sayName:function(){
		alert(this.name);
	}
}

constuctor属性不再指向Person了。此时，constructor指向Object构造函数了。

如果需要，可以将constructor重置如下：
function Person(){
}

Person.prototype = {
	constructor:Person,
	name:'hhh',
	age:30,
	job:'software enginner',
	sayName:function(){
		alert(this.name);
	}
}

注意，这种方式重置constructor属性会导致它的[[Enumerable]]特性变为true.而默认情况下，原生的constructor是不可枚举的。如果想兼容ECMAScript5,可以使用
Object.defineProperty().

function Person(){
}

Person.prototype = {
	name:'hhh',
	age:30,
	job:'software enginner',
	sayName:function(){
		alert(this.name);
	}
}
//重置构造器，适用于兼容ECMAScript5的浏览器
Object.defineProperty(Person.prototype, "constructor",{
	enumerable:false,
	value:Person
});

原型动态性

我们对原型所做的修改会立即从实例上反映出来，即使先创建实例后修改原型。
var friend = new Person();
Person.prototype.sayHi = function(){
	alert("hi");
}
friend.sayHi();//hi

但是，重写了整个原型对象的话，情况就不一样了。

调用构造函数会
function Person(){
}

var friend = new Person();

Person.prototype = {
	constructor:Person,
	name:'hhh',
	age:30,
	job:'software enginner',
	sayName:function(){
		alert(this.name);
	}
}

friend.sayName();//error
调用构造函数会为实例添加一个指向最初原型的[[prototype]]指针，而我们把原型对象修改为另一个对象就等于切断了构造函数与最初原型之间的联系。
__实例中的指针指向原型，而不是构造函数__

原生对象的原型

尽管我们可以修改原生对象的原型，但是不推荐。

原型对象的问题：原型中的所有属性被很多实例共享。 这对于函数来说比较合适，对于基本值属性也说得过去，毕竟通过在实例上添加同名属性，可以隐藏原型中的对应
属性。然而，对于包含引用类型值的属性来说，问题就比较突出了。

组合使用构造函数模式和原型模式

构造函数用于定义实例属性，原型用于定义方法和共享属性。

function Person(){
	name:'hhh',
	age:30,
	job:'software enginner',
	this.friend = ["aa","bb"]
}

Person.prototype = {
	constructor:Person,	
	sayName:function(){
		alert(this.name);
	}
}

#动态原型模式

所有信息封装在构造函数中，而通过构造函数中的初始化原型（仅在必要情况下），又保持了同时使用构造函数和原型的优点。即通过检测某个应该存在的方法是否有效，
来决定是否需要初始化原型。

```
function Person(name,age,job){
	this.name=name;
	this.age = age;
	this.job = job;
	if(typeof this.sayName !="function"){
		Person.prototype.sayName = sayName:function(){
			alert(this.name);
		}
	}
}
```

#寄生构造函数模式



