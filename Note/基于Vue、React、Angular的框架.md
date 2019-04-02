## Vue开发使用的插件

Vux   https://doc.vux.li/zh-CN/   

    VUX（读音 [v’ju:z]，同 views）是基于WeUI和Vue(2.x)开发的移动端UI组件库，主要服务于微信页面。

基于webpack + vue-loader + vux可以快速开发移动端页面，配合vux-loader方便你在WeUI的基础上定制需要的样式。

vux-loader保证了组件按需使用，因此不用担心最终打包了整个vux的组件库代码。

VUX并不完全依赖于WeUI，VUX 在 WeUI 的基础上扩展了多个常用组件，但是尽量保持整体UI样式接近WeUI的设计规范。

mint-ui    http://mint-ui.github.io/docs/#/zh-cn2

    Mint UI 包含丰富的 CSS 和 JS 组件，能够满足日常的移动端开发需要。通过它，可以快速构建出风格统一的页面，提升开发效率。

真正意义上的按需加载组件。可以只加载声明过的组件及其样式文件，无需再纠结文件体积过大。

考虑到移动端的性能门槛，Mint UI 采用 CSS3 处理各种动效，避免浏览器进行不必要的重绘和重排，从而使用户获得流畅顺滑的体验。

依托 Vue.js 高效的组件化方案，Mint UI 做到了轻量化。即使全部引入，压缩后的文件体积也仅有 ~30kb (JS + CSS) gzip。

elementui   http://element.eleme.io

  Element-Ul是饿了么前端团队推出的一款基于Vue.js 2.0 的桌面端UI框架，手机端有对应框架是Mint UI 。

Iviewui    http://v1.iviewui.com/docs/guide/introduce

  iView 是一套基于 Vue.js 的开源 UI 组件库，主要服务于 PC 界面的中后台产品。

vant   https://www.youzanyun.com/zanui/vant#/zh-CN/badge

Vant ( ˈvænt ) 是有赞前端团队基于有赞统一的规范实现的 Vue 组件库，提供了一整套 UI 基础组件和业务组件。通过 Vant，可以快速搭建出风格统一的页面，提升开发效率。目前已有近50个组件，这些组件被广泛使用于有赞的各个移动端业务中。我们会在此基础上不断完善，开发更多实用的组件。

nuxt.js Vue.js Meta Framework to create complex, fast & universal web applications quickly.


## 推荐几款ReactJS最优秀的UI框架

使用优秀的UI框架来构建你的ReactJS应用。

Material-UI


一款React组件库来实现Google的MaterialDesign风格UI界面框架。也是首个React的UI工具集之一。Material-UI包含你需要的所有组件（甚至更多）。 Material-UI 预定义的调色板和 <MuiThemeProvider>  可配置性极高，允许为 APP 自定义颜色主题。 

Material-UI 之前的版本个人认为有一些性能问题，但从 3.0 版本的发布来看，性能有所改善。 

查看地址：https://github.com/callemall/material-ui

React Desktop


React-Desktop

一款面向MacOS Sierra和Windows10桌面风格的ReactUI组件库。我肯定作为前端开发人员，一定听说过Electron框架。它能帮助你使用HTML5-WEB方式来构建跨平台的桌面端应用程序。而React Desktop里面你可以同时找到关于MacOS和Windows10的所有UI组件。

React-Desktop 可与 NW.js 和 Electron.js 完美结合，也可用于任何 JavaScript 驱动的项目。 

查看地址：http://reactdesktop.js.org/

Semantic-UI-React


前端小号个人认为，这款是最优秀的ReactUI框架了。前端开发人员对Semantic-UI应该不会陌生，它有极为丰富切漂亮的UI组件库，并且结构化做得非常好。React版本为官方出版，所有React组件都具有非常简洁的API和简明的属性，并且不依赖与jQuery，操作虚拟DOM提高性能带来更完美的用户体验。

Semantic-UI-React 几乎拥有 Semantic-UI 中所有有用的组件，同时也有一个非常好的 Declarative API ，和用于 React 组件的 shorthand props ，并且 jQuery-Free。 

查看地址：https://github.com/Semantic-Org/Semantic-UI-React

Ant-design


Ant-design是阿里巴巴团队出品的ReactUI组件库。有自己独特的设计风格和理念。非常符合国人的审美需求。并且在支付宝、蚂蚁金服等多个阿里项目中投入使用。组件化质量非常高，开箱即用。支持浏览器、服务端渲染以及Electron环境。包括刚刚推出支付宝小程序也是这一套设计风格。可谓国人开发React应用必修科目。

一套企业级的前端设计语言和基于 React 的前端框架实现。 

官方文档介绍： 
* 一种用于 Web 应用的企业级 UI 设计语言
* 一套开箱即用的高质量 React 组件
* 使用 TypeScript 构建，提供完整的类型定义文件
* 基于 npm + webpack + babel 的工作流
* 它支持所有现代浏览器（IE9 以上），支持服务端渲染和 Electron 环境，拥有许多组件。

查看地址：https://github.com/ant-design/ant-design

Blueprint


blueprint

Blueprint是一款针对桌面应用程序构建复杂、数据密集的Web界面进行了优化的UI组件库。如果你严重厉害移动端互动，并且寻找移动端优先的UI工具包，这可能不适合您。

使用TypeScript编写，拥有不错的开发文档。包括了30多个React基础组件，如表单控件、按钮、提示框、树形控件等等。涵盖几乎所有的通用界面元素，从按钮到表单控件到工具提示等等。它还包括每个组件的CSS样式和使用Sass和Less变量设计自己的组件和应用的工具，以及一个优雅的调色板和两种尺寸的 300 多个 UI 图标，旨在让你专注于构建产品。 

查看地址：https://github.com/palantir/blueprint

React-Bootstrap


react-bootstrap

谈到组件库就不得不提Twitter公司开源的Bootstrap了，它帮助多少程序猿解决了WEB-UI界面开发的难题。React-Bootstrap是一款基于ReactJS对Bootstrap进行封装的库。

React 构建的 Bootstrap 3 组件。 

React-Bootstrap 是一个可重复使用的前端组件库。你可以通过 Facebook 的 React.js 框架获得 Twitter Bootstrap的体验，而且有更为清晰的代码。 

简而言之，这是老牌的 Bootstrap 组件，用 React 重新编写。

查看地址：https://github.com/react-bootstrap/react-bootstrap

React-Toolbox


React-toolbox

你是否听说过CSS Modules？React-Toolbox就是基于这个的。它允许你只需要引入CSS，而不需要使用像Purify-CSS这样的工具。另外React-toolbox还是包括了30多个开箱即用组件的高质量可自定义的库。

查看地址：https://github.com/react-toolbox/react-toolbox/

Grommet


前端小号认为这是一款针对企业应用开发的最高端的UX框架库。我甚至不能称Grommet是一个UX框架，它要大的多。Grommet = React 组件库 + 自己的cli脚手架 + 友好的入门指引 + 预购建的模板 + 专业的文档 + 设计用具Sketch的扩展

查看地址：https://grommet.github.io/

Fabric


Fabric是一款用于构建类似Office和Office 365风格的React组件库。过去几年，微软支持或推出了很多开源项目，像TypeScript，VS Code（基于Electron）等等，Fabric也是其中之一。Fabric是官方用TypeScript编写的Office库之一。有所有你能见到的Office组件，包括开发入门指南、博客、官方色调以及字体，以及构建项目所需的所有组件。 

查看地址：https://github.com/OfficeDev/office-ui-fabric-react

React-md 

又一个实现 Material Design 的库。React-md 可以轻松地根据自己的需要进行定制，拥有良好的文档和快速上手的“入门”指南，以及许多常见的 Material 组件。 

不过现状是，这个库只有一个人在进行维护和开发。如果你想为开源项目做贡献，React-md 可能是一个不错的选择。 


Angular

Angular Material

Component infrastructure and Material Design components for Angular https://material.angular.io

NG-ZORRO/ng-zorro-antd
An enterprise-class UI components based on Ant Design and Angular 7. ant https://ng.ant.design/docs/introduce/en


其他框架 

UI框架	Github Star	环境	团队
Vue Antd	1.4K	vue	国内
Vue-Blu	1.2K	vue	国内
N3	0.8K	vue	国内
AliTelecom UI	0.5K	vue	国内
Blueprint	8.9K	react	国外
React-Toolbox	7.8K	react	国外
React Desktop	7.3K	react	国外
Semantic-UI-React	6.5K	react	国外
Grommet	3.1K	react	国外
Fabric	2.4K	react	国外
React-md	1.6K	react	国外
OnsenUI	6.2K	Angular	国外
PrimeNG	3.9K	Angular	国外
Semantic UI	0.9K	Angular	国外
ng-lightning	0.6K	Angular	国外
Kendo UI	0.2K	Angular	国外

