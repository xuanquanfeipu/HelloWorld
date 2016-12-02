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
```
var a=0.1,b=0.2;
if（a+b==0.3）{
//do something
}
```
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
```
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
```
arguments与this
arguments的callee属性表示拥有该参数对象的函数
```
function factorial(num){
	if(num<=1){
		return 1;
	}else{
		return num*factorial(num-1);
	}
}
```
解决函数名耦合问题：
```
function factorial(num){
	if(num <= 1){
		return 1;
	}else{
		return num*arguments.callee(num-1);
	}
}
```
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
```
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
```
工厂模式虽然解决了创建多个相似对象的问题，但却没有解决对象识别的问题（即怎么知道一个对象的类型）

构造函数模式：
```
function Person(name,age,job){
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = function(){
		alert(this.name);
	}
}
```
没有显式地创建对象
直接将属性和方法赋给了this对象
没有return语句
主要问题：每个方法都要在每个实例上重新创建一遍（new Function()）
```
function Person(name,age,job){
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = Function("alert(this.name)");
}
```
1.函数构造函数可以当作普通函数调用（在全局作用域或在另一个对象上call、apply）

```
function Person(name,age,job){
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = sayName;
}

function sayName(){
	alert(this.name);
}
```
全局作用域定义的函数，却只能被对象调用，而且对于自定义类型而言，没有封装性。

原型模式

每个函数都有一个prototype（原型）属性，这个属性是一个指针，指向一个对象，这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。
就是通过调用构造函数而创建的那个对象实例的原型对象。

好处：可以让所有对象共享它所包含的属性和方法。
```
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
```
原型最初只包含constructor属性，而该属性也是共享的，隐藏可以通过对象实例访问。

虽然可以通过对象实例访问保存在原型中的值，但却不能通过对象实例重新原型中的值。
即为对象实例添加一个属性，只会阻止我们访问原型中的同名属性，不会修改那个属性。
即时将这个属性设置为null，也只会在实例中设置这个属性，不会恢复其指向原型的链接。
不过，可以使用delete操作符删除实例属性，从而重新访问原型中的属性。

检测一个属性是否存在于实例中使用hasOwnProperty()

Object.getOwnPropertyDescriptor()方法只能用于实例属性，要取得原型属性的描述符，必须直接在原型对象上调用Object.getOwnPropertyDescriptor()

in操作符的两个使用方式：
1.单独使用时，in操作符会在通过对象能够访问给定属性时返回true,无论该属性是在于实例中还是原型中。
```
alert("name" in person1)


function hasPrototypeProperty(obj,name){
	return !obj.hasOwnProperty(name) && (name in obj);
}
```
2.for-in
返回的是所有能够通过对象访问的、可枚举的属性（实例的、原型的）。屏蔽了原型中的不可枚举属性的实例属性也会返回。开发人员自定义的属性都可枚举。

Object.keys(person1);//只返回实例的可枚举属性

Object.keys(Person.prototype);//返回原型的可枚举属性

Object.getOwnPropertyNames()返回所有属性，无论是否可枚举。

对象字面量重写原型的语法：
```
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
```
constuctor属性不再指向Person了。此时，constructor指向Object构造函数了。

如果需要，可以将constructor重置如下：
```
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
```
注意，这种方式重置constructor属性会导致它的[[Enumerable]]特性变为true.而默认情况下，原生的constructor是不可枚举的。如果想兼容ECMAScript5,可以使用
```
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
```
原型动态性

我们对原型所做的修改会立即从实例上反映出来，即使先创建实例后修改原型。
```
var friend = new Person();
Person.prototype.sayHi = function(){
	alert("hi");
}
friend.sayHi();//hi
```
但是，重写了整个原型对象的话，情况就不一样了。

调用构造函数会
```
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
```
调用构造函数会为实例添加一个指向最初原型的[[prototype]]指针，而我们把原型对象修改为另一个对象就等于切断了构造函数与最初原型之间的联系。
__实例中的指针指向原型，而不是构造函数__

原生对象的原型

尽管我们可以修改原生对象的原型，但是不推荐。

原型对象的问题：原型中的所有属性被很多实例共享。 这对于函数来说比较合适，对于基本值属性也说得过去，毕竟通过在实例上添加同名属性，可以隐藏原型中的对应
属性。然而，对于包含引用类型值的属性来说，问题就比较突出了。

组合使用构造函数模式和原型模式

构造函数用于定义实例属性，原型用于定义方法和共享属性。
```
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
```
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

```
function Person(name, age, job) {
	var o = new Object();
	o.name = name;
	o.age = age;
	o.job = job;
	o.sayName = function() {
		alert(this.name);
	}
	return o;
}

var friend = new Person("hhy", 30, "Software Enginner");
friend.sayName(); //"hhy"
```
该函数的作用仅仅是封装创建对象的代码， 然后再返回创建的对象。 实际跟工厂模式一样。

该模式可以在特殊情况下为对象创建构造函数。 比如想创建一个具有额外方法的特殊数组。 不能直接修改
Array构造函数， 可以使用这个模式。

```
function SpecialArray() {

	//创建数组
	var values = new Array();
	//添加值
	values.push.apply(values, arguments);

	//添加方法
	values.toPipedString = function() {
		return this.join("|");
	}

	return values;
}

var colors = new SpecialArray("red", "blue", "green");
alert(colors.toPipedString()); //"red|blue|green"
```
__寄生构造函数有一点需要说明：返回的对象与构造函数或者构造函数原型没有关系，即构造函数内返回的
对象和在构造函数外创建的对象没有什么不同。因此，不能依赖instanceof来确定对象类型。__

稳妥构造函数模式

所谓稳妥对象，指的是没有公共属性，而且方法也不能引用this 的对象。适合在安全的环境中，或者
防止程序被其他应用程序改动。

稳妥共组函数与寄生构造函数类似，但有两点不同：
1、新创建的对象的实例方法不引用this；
2、不使用new操作符调用构造函数。

```

function Person(name, age, job) {
	var o = new Object();
	//可以在这里定义私有变量和函数
	//添加方法
	o.sayName = function() {
		alert(this.name);
	}
	return o;
}

var friend = new Person("hhy", 30, "Software Enginner");
friend.sayName(); //"hhy"
```

注意，这种模式创建的对象，除了使用sayName()方法外，没有其他办法访问name值。

与寄生构造函数类似，使用稳妥构造函数返回的对象与构造函数或者构造函数原型没有关系，
不能依赖instanceof来确定对象类型。

#继承

确定原型与实例的关系

1、instanceof操作符
2、isPrototypeOf
只要是原型链中出现过的原型，用这两个操作符测试都会返回true。

谨慎地定义方法

给子类添加方法或者重写父类方法时，一定要放在替换原型的语句之后。

还有，通过原型链继承时，不能使用对象字面量方式创建原型，这样会重写原型链。

原型链的问题
1.引用类型值的原型属性会被所有实例共享。
2.在创建子类型的实例时，不能向超类型的构造函数传递参数。实际应该说，没有办法在不影响所有对象实例的情况下，给超类型的构造函数传递参数。

#借用构造函数（也叫伪对象或经典继承）

基本思想：在子类构造函数内部调用超类构造函数。（apply、call）
```
function superType(){
	this.colors = ["red","blue","green"];	
}

function subType(){
	superType.call(this);//解决了引用值原型属性的问题
}
```
相对于原型链的优势：可以在子类型构造函数中向超类构造函数传递参数。

为确保超类构造函数不会重写子类的属性，可以在调用超类构造函数后，再添加应该在子类中定义的属性。

借用构造函数的问题：仅仅使用借用构造函数的话，也会存在与构造函数类似的问题，即方法在构造函数中定义，无法得到复用，而且超类中定义的方法，对子类不可见。

#组合继承（伪经典继承，即将原型链和借用构造函数技术组合）————javascript中最常用的继承

思路：使用原型链实现对原型属性和方法的继承，而使用借用构造函数实现对实例属性的继承。

缺点：总是会调用两次超类构造函数，一次是在创建子类型原型的时候，一次是子类型构造函数内部。

#原型式继承

该方法没有严格意义上的构造函数，思想是借助原型可以基于已有的对象创建新对象，而不必因此创建自定义类型。
```
function object(o){
	function F(){}
	F.prototype = o;
	return new F();
}
```
本质上，object对传入的对象进行了一次浅复制。
```
person = {
	name:"Nik",
	friends:["hh","hh2"]
}
var anotherPerson = object(person);
anotherPerson.name = "Gek",
anotherPerson.friends.push("Bob");

var yetAnotherPerson = object(person);
yetAnotherPerson.name = "Gek2",
yetAnotherPerson.friends.push("Bob2");

alert(persoon.friends);//hh,hh2,Bob,Bob2
```

引用类型的原型属性也会被共享。

ECMAScript5通过新增Object.create()方法规范化了原型式继承。它接收两个参数：一个用作新对象的原型的对象和（可选的）一个为新对象定义属性的对象。在传
入一个参数时，Object.create()与object方法的行为相同。
```
person = {
	name:"Nik",
	friends:["hh","hh2"]
}
var anotherPerson = Object.create(person);
anotherPerson.name = "Gek",
anotherPerson.friends.push("Bob");

var yetAnotherPerson = Object.create(person);
yetAnotherPerson.name = "Gek2",
yetAnotherPerson.friends.push("Bob2");

alert(persoon.friends);//hh,hh2,Bob,Bob2
```
Object.create()方法的第二个参数与Object.defineProperties()方法的第二个参数格式相同：每个属性都通过自己的描述符定义。这种方式定义的任何属性都会覆盖原型对象的同名属性。例如：

```
person = {
	name:"Nik",
	friends:["hh","hh2"]
}
var anotherPerson = Object.create(person{
	name:{
		value:"Greg"
	}
});

alert(anotherPerson.name);//Greg
```
如果只想让一个对象和另一个对象保持类似，可以使用原型式继承。不过，注意，引用类型属性的共享问题。

#寄生式继承

思路：与寄生构造函数和工厂模式类似，即创建一个仅用于封装继承过程的函数，该函数在内部以某种方式增强对象，最后像真地是它做了所有工作一样返回对象。

缺点：与构造函数类似，为对象添加的函数，不能做到函数复用。
```
function createAnother(original){
	var clone = object(original);//通过调用函数（任意能够返回新对象的函数）创建一个新对象
	clone.sayHi = function(){//以某种方式增强对象
		alert("hi");		
	}
	return clone;//返回对象
}
可以这样来使用：
person = {
	name:"Nik",
	friends:["hh","hh2"]
}

var anotherPerson = createAnother(person)
anotherPerson.sayHi();//hi
```

#寄生组合式继承 （引用类型最理想的的继承范式）

所谓寄生组合式继承，即通过借助构造函数来继承属性，通过原型链的混成形式来继承方法。

其背后的基本思路是：不必为了指定子类型的原型而调用超类型的构造函数，我们所需要的无非就是超类型原型的一个副本而已。

本质上，就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型。继承组合式继承基本模式如下所示：


function inheritPrototype(subType,superType){

	var prototype = object(superType.prototype);//创建对象 创建超类型原型的一个副本

	prototype.constructor = subType;//增强对象

	subType.prototype = prototype;//自定对象

}

只调用了一次超类构造函数，避免了在子类原型上创建多余的属性，原型链保持不变。

#函数表达式

函数声明的重要特征就是函数声明提升。

__函数表达式最常见形式：__
```
var functionName = function(arg1,arg2){//匿名函数（拉姆达函数）
//body
}

// 千万别这样做！
  // 因为有的浏览器会返回first的这个function，而有的浏览器返回的却是第二个

  if (true) {
    function foo() {
      return 'first';
    }
  }
  else {
    function foo() {
      return 'second';
    }
  }
  foo();

  // 相反，这样情况，我们要用函数表达式
  var foo;
  if (true) {
    foo = function() {
      return 'first';
    };
  }
  else {
    foo = function() {
      return 'second';
    };
  }
  foo();
```
__递归__

function f(x) {  
    if (x === 1) {  
        return 1;  
    } else {  
        return x * f(x - 1);  
    }  
};  
//Javascript中函数的巨大灵活性，导致在递归时使用函数名遇到困难，对于上面的变量式声明，f是一个变量，所以它的值很容易被替换

function f(x) {  
    if (x === 1) {  
        return 1;  
    } else {  
        return x * arguments.callee(x - 1);  
    }  
}
//Javascript函数内部的arguments对象，有一个callee属性，指向的是函数本身。因此也可以使用arguments.callee在内部调用函数

__闭包__
闭包就是能够读取其他函数内部变量的函数。

由于闭包会携带包含它的函数的作用域，所以会比其他函数占用更多的内存，请谨慎使用。

__闭包与变量__
作用域链这种配置机制引出了一个副作用：闭包只能取得包含函数中任何变量的最后一个值。
```
function creatFunctions(){
  var result=new Array();
  for(var i=0 i<10;i++){
   result[i]=function(){
    return i;
   }
  }
  return result;
 }
 var funcs=creatFunctions();
 //每个函数都输出10
 for(var i=0;i<funcs.length;i++){
  document.write(funcs[i]()+"<br />");
 }
 ```
 我们可以通过创建另一个匿名函数强制让闭包的行为符合预期，如下所示：
 ```
 function creatFunctions(){
  var result=new Array();
  for(var i=0 i<10;i++){
   result[i]=function(num){
    return function(){
     return num;
    };
   }(i);
  }
  return result;
 }
 var funcs=creatFunctions();
 //分别输出0、1、2……9
 for(var i=0;i<funcs.length;i++){
  document.write(funcs[i]()+"<br />");
 }
```

__闭包中的this__

在闭包中使用 this 对象也可能会导致一些问题。我们知道， this 对象是在运行时基于函数的执行环境绑定的，而匿名函数的执行环境具有全局性，因此其 this 对象通常指向 window（在通过 call()或 apply()改变函数执行环境的情况下， this 就会指向其他对象），如下：
```
var name = "The Window";
var object = {
    name : "My Object",
    getNameFunc : function(){
        return function(){
            return this.name;
        };
    }
};
alert(object.getNameFunc()()); //"The Window"（在非严格模式下）
```
把外部作用域中的 this 对象保存在一个闭包能够访问到的变量里，就可以让闭包访问该对象了，如下所示：

```
var name = "The Window";
var object = {
    name : "My Object",
    getNameFunc : function(){
        var that = this;
        return function(){
            return that.name;
        };
    }
};
alert(object.getNameFunc()()); //"My Object"
```

arguments 也存在同样的问题。如果想访问作用域中的 arguments 对象，必须将对该对象的引用保存到另一个闭包能够访问的变量中。

__内存泄露__
JS闭包循环引用导致内存泄漏之解决方法：
```
方法一、主动设置JS对象element为空，打破循环引用
function assignHandler()
{
   var element=document.getElementById("div1");
   var id=element.id;
   element.onclick=function() //element的onclick引用了函数funciton，function通过闭包引用了element，照成循环引用
   {
      alert(id+element+sex);
    }
 /*闭包可以监听外部变量的变化，所以这里把element=null，也就是说外部这个变量相当于不存在了,虽然赋值是在闭包后面，闭包也能够检测到！所以匿名函数不会有外部的DOM对象的引用，不会内存泄漏*/
  var sex="female";
  element=null;
}

方法二、通过添加另外一个闭包来避免JS对象和DOM对象之间的循环引用
 window.onload=function outerFunction()
{
  var anotherObj=function innerFunction()
   {
            alert("I have avoided the leak!");
   }
//通过另外一个闭包来避免JS对象和DOM对象之间的循环引用
  function anotherInnerFunction()
   {
        var obj=document.getElementById("div1");
 //DOM对象引用了anotherObj函数，但是anotherObj函数无法引用DOM对象
        obj.onclick=anotherObj;
  };
  anotherInnerFunction();
}
方法三、通过添加另一个函数来避免闭包本身，进而阻止内存泄漏
window.onload=function()
{
        var obj=document.getElementById("div1");
        obj.onclick=doesNotLeak;
}
//该函数无法访问上面匿名函数中间的obj对象，从而可以阻止内存泄漏！
function doesNotLeak()
{
   alert("我已经阻止内存泄漏了！");
}
```
__模仿块级作用域__

javascript中则没有块级作用域，首先来看一段代
```
function outputNumber(count){ 
  for(var i=0;i<1000;i++){ 
    alert(i); 
  } 
  alert(i);  //count 
}
```
即使重新声明同一个变量，也不会改变它的值。
```
function outputNumber(count){ 
  for(var i=0;i<1000;i++){ 
    alert(i); 
  } 
  var i;   //重新声明变量 
  alert(i);  //count 
}
```
匿名函数可以用来模仿块级作用域并避免这个问题，用作块级作用域(也称私有作用域)的匿名函数的语法如下：
```
(function(){ 
   //这是块级作用域 
})()
```
如果如下这样做就会报错：
```
function(){
    //块级作用域
}();//error 
```
因为在javascript中，function关键字表示一个函数声明的开始，而函数声明后面不能直接跟圆括号。而函数表达式后面可以跟圆括号，来表示函数调用。在函数声明外面加一对圆括号就可以转换成函数表达式，如下：
```
(function(){

    //块级作用域

})();
```
当匿名函数执行完毕，其作用域链立即销毁，从而可以减少闭包占用资源问题。

__私有变量__
有权访问私有变量和私有方法的公有方法称为特权方法。

有两种创建特权方法的方式：
一是在构造函数中定义.
```
function MyFunction(){  
    // 私有变量和函数  
    var privateNum = 1;  
    function privateFunction(){  
        return true;  
    }     
  
    // 特权方法  
    this.publicFunction = function(){  
        privateNum + 1;  
        return privateFunction();  
    };  
}  
```
私有和特权方法常用于隐藏不应该被直接修改的数据，如下例子：
```
function User(age){  
    this.getAge = function(){  
        return age;  
    }  
    this.setAge = function(value){  
        age = value;  
    }  
}  
  
var user = new User(18);  
alert(user.getAge());  // 18  
user.setAge(19);  
alert(user.getAge());  // 19  
```
缺点：在构造函数中定义特权方法的方式，会对每个实例都创建同一组新方法


二是使用静态私有变量实现。（使用原型模式）
```
(function(){  
    // 私有变量和函数  
    var privateNum = 1;  
    function privateFunction(){  
        return true;  
    }     
  
    // 构造函数  
    MyFunction = function(){};  
  
    // 特权方法(公有)  
    MyFunction.prototype.publicFunction = function(){  
        privateNum + 1;  
        return privateFunction();  
    };  
})();  
```

以上的特权方法是在原型上定义的，这里要注意的是在定义构造方法时不是使用函数声明的方式，而是使用函数表达式，因为函数声明只能创建局部函数，同理，在声明MyFunction也没有使用var关键字，因为初始化未经声明的变量，是创建一个全局变量。（注：如果是在严格模式下，给未经声明的变量赋值会导致错误）

使用私有变量和闭包会影响查找速度。

__模块模式__
前面的模式是为自定义类型创建私有变量和特权方法，而模块模式是为单例创建私有变量和特权方法。所谓单例，是指只有一个实例的对象。
```
var singleon = {
	name:value,
	method:function(){
	//code
	}
}
```
模块模式通过为单例添加变量和特权方法而使其得到增强。如：
```
var singleton = function(){
    //私有变量
    var privateVariable = 10;
    
    //私有函数
    function privateFunction(){
        return false;
    }

    //返回对象
    return {
        //公有属性
        publicProperty: true,
        
        //公有属性和公有方法
        publicMethod : function(){
            privateVariable++;
            return privateFunction();
        }
    };
}();
```

这种模式适合需要对单例进行一些初始化，又需要维护私有变量时。
```
var application = function () {
  //私有变量和函数
  var components = new Array();
  //初始化
  components.push(new BaseComponent());
  //公共
  return {
    getComponentCount: function () {
      return components.length;
    },
    registerComponent: function (component) {
      if (typeof component == 'object') {
        components.push(component);
      }
    }
  };
}();
```
__增强的模块模式__


```
var singleton = function(){
    //私有变量
    var privateVariable = 10;
    
    //私有函数
    function privateFunction(){
        return false;
    }
    var obj = new CustomType();
    //公有属性
    obj.publicProperty = true;
    //公有属性和公有方法
    obj.publicMethod = function(){
            privateVariable++;
            return privateFunction();
        }
    //返回对象
    return obj;
}();

var application = function () {
  //私有变量和函数
  var components = new Array();
  //初始化
  components.push(new BaseComponent());
  var app = new BaseComponent();
  
  app.getComponentCount = function () {
      return components.length;
    };
  app.registerComponent = function (component) {
      if (typeof component == 'object') {
        components.push(component);
      }
    };  
  //公共
  return app;
}();
```

#BOM

定义全局变量与在window对象上定义属性的区别：
全局变量不能通过delete操作符删除，而window的属性可以。

直接访问未声明的变量会抛出错误，但是通过查询window对象，可以知道某个可能未声明的变量是否存在。

var newValue = oldValue;//error

var newValue = window.oldValue;//newValue的值为undefined

__窗口关系及框架__

如果网页中包含框架，那么每个框架都有自己的window对象，并且保存在frames集合中。可以通过索引（从0开始，从左至右，从上到下）或者框架名来访问window对象。top指向最高（最外）层的框架，即浏览器窗口。parent对象始终指向当前框架的直接上层框架。self始终指向window。

注意：除非最高层窗口是通过window.open()打开的，否则其他window对象是name属性不会包含任何值。

__窗口位置__

screenLeft，screenTop  浏览器（IE/Chrome/Safari/Opera）页面可见区域离屏幕左边和上边的距离（浏览器工具栏高度）。
screenTop，screenY 整个浏览器（Firefox、Safari）窗口相对于屏幕的坐标值。

var leftPos = (typeof screenLeft == "number") ? window.screenLeft : window.screenX;
var topPos = (typeof screenTop == "number") ? window.screenTop : window.screenY;

moveTo(newX,newY);//接收新的坐标值
moveBy(offsetX,offsetY);//接收移动像素数

注意：这两个方法可能会被浏览器禁用，而且只适用于最外层window，不适用于框架。

__窗口大小__

innerWidth、innerHeight、outerWidth、outerHeight（IE9+/Chrome/Safari/Opera/Firefox均支持这些属性）

outerWidth、outerHeight返回浏览器窗口本身尺寸（IE9+/Safari/Firefox)

outerWidth、outerHeight返回页面视图容器大小（Opera），即单个标签页对应的浏览器窗口。

innerWidth、innerHeight表示页面视图区大小（减去边框宽度）（Chrome中等于outerWidth、outerHeight的返回值）
即视口（viewport）大小而非浏览器窗口大小。

document.documentElement.clientWidth、document.documentElement.clientHeight保存了页面视口信息（IE9/Chrome/Safari/Opera/Firefox）

document.body.clientWidth、 document.body.clientHeight 保存了页面视口信息（IE6）

document.documentElement.clientWidth、document.documentElement.clientHeight和document.body.clientWidth、 document.body.clientHeight返回相同信息，都是视口大小（Chrome）

虽然无法确定浏览器窗口大小，却可以获得页面视口大小：

var pageWidth = window.innerWidth, pageHeight = window.innerHeight;

if(typeof pageWidth != "number"){
	if(document.compatMode == "CSS1Compat"){
		pageWidth = document.documentElement.clientWidth;
		pageHeight = document.documentElement.clientHeight;
	}else{
		pageWidth = document.body.clientWidth;
		pageHeight = document.body.clientHeight;
	}
}

window.innerWidth、window.innerHeight保存着可见视口、即屏幕上可见页面区域大小。（移动非IE浏览器）
document.documentElement.clientWidth、document.documentElement.clientHeight保存着可见视口（IE）

document.documentElement度量的是布局视口，即渲染后页面的实际大小（可见视口是这个页面的一小部分）（非IE）
document.body.clientWidth、document.body.clientHeight保存布局视口（IE）不会随着页面缩放变化。

使用resizeTo(newX,newY)和resizeBy(offsetX,offsetY)方法可以调整浏览器窗口大小。


__导航和打开窗口__

window.open()方法既可以导航到一个特定的URL,也可以打开一个新的浏览器窗口，这个方法可以接收4个参数：
要加载的URL、窗口目标、一个特性字符串及一个表示新页面是否取代浏览器历史记录中当前加载页面的布尔值。

window.open(要加载的URL,窗口目标,特性字符串,新页面是否取代浏览器历史记录中当前加载页面)

如：window.open("http://www.wrox.com/","topFrame");
//等价于 <a href="http:/www.wrox.com" target="topFrame"></a>

第二个参数可以取值 _self、_parent、_top、_blank或者是一个窗口或者框架名，如果不是，则会新建一个以此命名的新窗口。

第三个参数中的选项：

fullscreen/height/left/location/menubar/resizable/scrollbars/status/toolbar/top/wigth

如：var wroxWin = window.open("http://www.wrox.com/","wroxWindow","height=400,width=400,top=10,left=10,resizable=yes");

wroxWin.resizeTo(500,500);

wroxWin.moveTo(500,500);

wroxWin.close();//只针对window.open()打开的窗口

alert(wroxWin.closed);//true

alert(wroxWin.opener==winodw);//true

创建的window对象有个opener属性，保存着打开它的原始窗口对象。这个属性只在弹出窗口的最外层window
对象（top）中有定义，而且执行调用window.open()的窗口或框架。

chrome中，如果将新创建的标签页的opener属性设置为null，即表示在单独是进程中运行新标签页，这样新标签也和打开它的标签页之间就不能进行通信了。

__间歇调用和超时调用__

setTimeout(要执行js代码字符串或函数, 超时时间毫秒数);

//不推荐传递字符串，导致性能损失
setTimeout("alert('Hello world!')", 1000);

//推荐的调用方式
```
var timeoutid = setTimeout(function(){
	alert("hello world");
},1000);
```
//注销，只要是在指定时间尚未过去之前调用，就可以完全取消超时调用

clearTimeout(timeoutid);

注：超时调用代码都是在全局作用域中执行的，因此函数中的this在非严格模式下指向window对象，严格模式下指向undefined。
```
setInterval（）与setTimeout类似。

var num = 0;
var max = 10;
var intervalId = null;

function incrementNumber(){
	num++
	
	if(num==max){
		clearInterval(intervalId);
		alert("Done");
	}
}

intervalId = setInterval(incrementNumber,500);
```
也可以通过setTimeout来实现：
```
var num = 0;
var max = 10;

function incrementNumber(){
	num++
	
	if(num < max){
		setTimeout(incrementNumber,500);
		
	}else{
		alert("Done");
	}
}

setTimeout(incrementNumber,500);
```
一般认为，使用setTimeout来模拟setInterval是一种最佳模式。实际开发中很少使用setInterval，因为后一个调用可能会在前一次调用结束之前启动。

__系统对话框__

alert()、confirm()、prompt()

#location对象

属性：
hash、host、hostname、pathname、port、protocol、search
```
function getQueryStringArgs(){
	var qs = (location.search.length>0)?location.search.substring(1):""),
	args={},
	items = qs.length?qs.split("&"):[],
	item = null,
	name = null,
	value = null,
	i = 0,
	len = items.length;
	
	for(i=0, i < len; i++){
		item=item[i].split("=");
		name = decodeURIComponent(item[0]);
		value = decodeURIComponent(item[1]);
		if(name.length){
			args[name] = value;
		}
	}
	return args;
}
```
__位置操作__
使用location可以通过很多方式改变浏览器位置。首先，最常用的是assign(url)方法：

location.assign("http://www.wrox.com");

//下面两句代码也会调用assign方法，与显式调用assign效果一样。
window.location = "http://www.wrox.com";
location.href = "http://www.wrox.com";//  最常用

另外，修改location对象的其他属性（hash、search、hostname、pathname、port等）也可以改变当前加载的页面。

通过以上任何一种方式修改URL，浏览器都会生成一条历史记录，可以单间后退按钮导航到前一个页面。要禁用这种行为，可以使用
replace(url)方法

reload()，重新加载当前显示的页面。
无参数时，会从缓存中重新加载，参数为true时，会强制从服务器重新加载。

location.reload();//从缓存中重新加载
location.reload(true);//从服务器重新加载

#navigator对象

属性和方法：（各个浏览器支持不同）
appCodeName：浏览器名称
appMinorVersion：次版本信息
APPName：完整的浏览器名称
APPVersion：浏览器版本
buildID：浏览器编译版本
cookieEnabled：表示cookie是否启用。
cpuClass：客户端计算机中使用的CPU类型。
JavaEnabled()：表示定期浏览器中是否启用了java
language：浏览器的主语言
mimeTypes：在浏览器中注册的MIME类型数组
onLine：表示浏览器是否连接到了因特网
opsProfile：不用了
oscpu：客户端计算机的操作系统或使用的CPU
Platform：浏览器所在的系统平台
plugins：浏览器中安装的插件信息数组
preference():设置用户的首选项
product：产品名称
productSub：关于产品的次要信息
registerContentHandler：针对特定的MIME类型将一个站点注册为处理程序
registerProtocolHandler：针对特定的协议将一个站点注册为处理程序
securityPolicy：已经废弃。安全策略名称
systemLanguage：操作系统的语言。
taintEnabled()：已经废弃。是否允许变量被修改
userAgent:浏览器的用户代理字符串
userLanguage：操作系统的默认语言。
userProfile：借以访问用户个人信息的对象。
vendor：浏览器的品牌。
vendorSub：有关供应商的次要信息。

__检测插件__

非IE浏览器使用plugins数组来达到目的。数组中的每项包含的属性：
name：插件名。
description：描述。
filename：插件文件名。
length：插件所处理的MIME类型数量。

//检测插件（非IE）
function hasPlugin(name){
	name = name.toLowerCase();
	for(var i=0; i < navigator.plugins.length; i++){
		if(navigator.plugins[i].name.toLowerCase().indexOf(name){
			return true;
		}		
	}
	return false;
}

alert(hasPlugin("Flash"));
alert(hasPlugin("QuickTime"));

//检测IE中的插件

function hasIEPlugin(name){
	try{
		new ActiveXObject(name);
		return true;
	}catch(ex){
		return false;
	}
}

//检测Flash
alert(hasIEPlugin("ShockwaveFlash.ShockwaveFlash"));//Flash的COM对象标识符是ShockwaveFlash.ShockwaveFlash
alert(hasIEPlugin("QuickTime.QuickTime"));

//检测所有浏览器中的Flash

functionhasFlash(){
	var result = hasPlugin("Flash");
	if(!result){
		result = hasIEPlugin("ShockwaveFlash.ShockwaveFlash");
	}
	return result;
}

plugins集合有个refresh(isReload)方法:如果参数值为true会加载包含插件的所有页面，否则，只更新plugins集合，不重新加载页面。

__注册处理程序__

Firefox2为navigator对象新增了registerContentHandler()和registerProtocolHandler()方法。

registerContentHandler(要处理的MIME类型, 处理该MIME类型的页面的URL, 应用程序名称)，如：
navigator.registerContentHandler("appliction/rss+xml","http://www.somereader.com?feed=%s", "SomeReader");//%s表示RSS源URL

registerProtocolHandler(要处理的协议, 处理该协议的页面的URL, 应用程序名称)
navigator.registerProtocolHandler("mailto","http://www.somemailclient.com?cmd=%s","Some Mail Client");//%s表示原始的请求

#Screen对象

属性：（各个浏览器支持不同）

availHeight：屏幕的像素高度减去系统部件高度之后的值（只读）
availLeft：未被系统部件占用的最左侧的像素值（只读）
availTop：未被系统部件占用的最上方的像素值（只读）
availWidth：屏幕的像素宽度减去系统部件宽度之后的值（只读）
bufferDepth：读、写用于呈现屏外位图的位数
colorDepth：用于表现颜色的位数，多少系统都是32（只读）
deviceXDPI:屏幕实际水平DPI（只读）
deviceyDPI:屏幕实际的垂直DPI（只读）
fontSmoothingEnabled：表示上方启用了字体平滑（只读）
height：屏幕的像素高度
left：当前屏幕距左边的像素距离
logicalXDPI：屏幕逻辑水平DPI（只读）
logicalYDPI：屏幕逻辑垂直DPI（只读）
pixelDepth：屏幕的位深（只读）
top：当前屏幕距上边的像素距离
updateInterval：读、写以毫秒表示的屏幕刷新时间间隔
width：屏幕像素宽度

window.resizeTo(screen.availWidth, screen.avvailHeight);

#history对象

每个浏览器窗口、每个标签页乃至每个框架都有自己的history对象与特定的window对象关联。

使用go()方法可以在用户的历史记录中任意的跳转，先后或者向前。

//后退一页
history.go(-1);

//向前一页
history.go(1);

history.go("wrox.com");//跳转到包含该字符串的最近的历史页面
back()/forward()方法可以代替go()方法。
history.back();
history.forward();
history.length;//保存这历史记录的数量

#客户端检测

__能力检测__(特性检测)

function getElement(id){
	if(document.getElementById){
		return document.getElementById(id);
	}else if(document.all){
		return document.all[id];
	}else{
		throw new Error("No way to retrieve element!");
	}
}

//不要这样做,不是能力检测，只检测了是否存在相应的方法
funtion isSortable(object){
	return !!object.sort;
}

//这样更好：检查sort是不是函数
funtion isSortable(object){
	return typeof object.sort == "function";
}

更靠谱的方法(但并非100%可靠)：

function isHostMethod(object, property){
	var t = typeof object[property];
	return t == 'function' ||
	(!!(t == 'object' && object[property])) ||
	t == 'unknown';
}

__能力检测,而不是浏览器检测__

根据浏览器不同将能力组合起来更可取。

#怪癖检测

#用户代理检测

#DOM

__节点类型__

NodeType	Named Constant
1	ELEMENT_NODE
2	ATTRIBUTE_NODE
3	TEXT_NODE
4	CDATA_SECTION_NODE
5	ENTITY_REFERENCE_NODE
6	ENTITY_NODE
7	PROCESSING_INSTRUCTION_NODE
8	COMMENT_NODE
9	DOCUMENT_NODE
10	DOCUMENT_TYPE_NODE
11	DOCUMENT_FRAGMENT_NODE
12	NOTATION_NODE

通过比较这些常量，可以很容易确定节点的类型，如：
```
if(someNode.nodeType == Node.ELEMENT_NODE){//IE中无效
	alert('Node is an element.');
}
```
然而，这种方式有兼容性问题。所以最好将nodeType属性与数字值进行比较。如：
```
if(someNode.nodeType == 1){//适用与所以浏览器
	alert('Node is an element.');
}
```
__1.nodeName和nodeValue属性__

这两个属性的值完全取决于节点的类型。
```
if(someNode.nodeType == 1){
	value = someNode.nodeName; //nodeName的值是元素的标签名
}
```
对于元素节点，nodeName中保存的始终都是元素的标签名，而nodeValue的值始终都是null。

__2.节点关系__

每个节点都有一个childNodes属性，其中保存着一个NodeList对象。NodeList是一个类数组对象。

访问NodeList中的节点————可以通过方括号，也可以使用item()方法。

var firstChild = someNode.childNodes[0];
var secondChild = someNode.childNodes.item(1);
var count = someNode.childNodes.length;

使用Array.prototype.slice()方法可以将arguments和NodeList这样的类数组对象转换为数组。
```
var arrayOfNodes = Array.prototype.slice.call(someNode.childNodes,0);//IE8及以前版本中无效

function convertToArray(nodes){//通用方法
	var array = null;
	try{
		array = Array.prototype.slice.call(someNode.childNodes,0);
	} catch(ex){
		array = new Array();
		for(var i=0,len = nodes.length;i<len;i++){
			array.push(nodes[i]);
		}
	}
	return array;
}
```

每个节点都有一个parentNode属性，该属性指向该文档树中的父节点。

访问同胞节点使用previousSibling和nextSibling属性。

firstChild和lastChild属性分布指向childNodes列表中的第一个和最后一个节点。

hasChildNodes()方法判断一个节点是否有子节点。

所有节点都有的一个属性ownerDocument，该属性指向表示整个文档的文档节点。

__3.操作节点__

appendChild()：向childNodes列表末尾添加一个节点。如果传入的节点已经是文档的一部分，那该节点会从原来的位置转移到新位置。
如：
var returnNode = someNode.appendChild(newNode);
alert(returnNode == newNode);//true
alert(someNode.lastChild == newNode);//true

insertBefore(要插入的节点,参照节点)：在某个节点前插入新节点并返回该节点。

//插入后成为最后一个节点，等价于appendChild
var returnNode = insertBefore(newNode,null);
alert(returnNode == someNode.lastChild);//true

replaceChild(要插入的节点, 要替换的节点)：插入新节点，替换并返回已有的节点。
var returnNode = someNode.repalceChild(newNode,someNode.firstChild);//替换第一个子节点

removeChild(要移除的节点)：移除某个节点。

__4.其他方法__

所有类型的节点都有的两个方法：
cloneNode(boolean):参数表示是否执行深复制。false时，只复制节点本身；true时，复制节点及其整个子节点树。
复制后的节点副本属于文档所有，并没有为它指定父节点。这个节点副本就是一个孤儿。需要通过前面的方法将其添加到文档中。
该方法不会复制添加到DOM节点中的javascript属性。

normalize()：删除空的文本节点，或者合并相邻的文本节点。

#Document类型

在浏览器中，document对象是HTMLDocument(继续自Document类型)的一个实例，且是window对象的一个属性。

__1.文档的子节点__

document.documentElement == document.childNodes[0] == document.firstChild;//true

document.body;//指向body元素

document.doctype;//指向<!DOCTYPE>的引用 是一个DocumentType节点

__2.文档信息__

document.title;//文档标题

document.URL;//取得完整的URL
document.domain;//页面的域名，可以设置，但是只能设置为来源页面URL中包含的域（一开始是松散的，不能再设置为紧绷的）
document.referrer;//(链接到当前页面的那个页面)来源页面的URL

__3.查找元素__

getElementById
getElementByTagName()：返回一个HTMLCollection对象，与NodeList类似，使用方括号语法或item()方法来访问。

HTMLCollection对象还有一个namedItem()方法，该方法可以通过元素的name特性取得集合中的项。

getElementByName()

__4.特殊集合__
```
document.anchors:包含文档中所有带name特性的<a>元素。
document.applets:包含文档中所有的<applet>元素。
document.forms:包含文档中所有的<form>元素。
document.images:包含文档中所有的<img>元素。
document.links:包含文档中所有带href特性的<a>元素。
```
__5.DOM一致性检测__

document.implimentation的hasFeature(功能名称, 版本号)方法

__6.文档写入__

document有四个写入文档相关的方法：write()、writeln()、open()、close().

#Element类型
nodeType：1
nodeName == tagName
nodeValue:null

__1.HTML元素__
HTMLElement类型继承自Element并添加了一些所有HTML元素共有的特性：
id：
title：
lang：
dir：语言的方向。ltr：left-to-right或rtl：right-to-left
className：与元素的class特性对应，即为元素指定的CSS类。

__2.取得特性__
操作DOM特性的三个方法：getAttribute/setAttribute/removeAttribute  可以操作共有属性和自定义属性。
注意：获取className时，应该传入class //element.getAttribute("class")
特性名不区分大小写
另外，自定义特性最好加上 data- 前缀以便验证
__只有非自定义的属性才会以属性的形式添加到DOM对象中。所以不能通过属性访问自定义属性__

getAttribute(特性名)
有两类特性，虽然有对应的属性名，但是属性的值与通过getAttribute返回的值并不相同。
1.style： getAttribute返回的是包含CSS的文本，属性返回的是对象。
2.类似onclick的事件处理程序：getAttribute返回的是代码字符串，属性返回javascript函数。

setAttribute(特性名,特性值)




















