javascript常用函数实现的收集

收集了一些比较常用的javascript函数。

1、字符串长度截取



function cutstr(str, len) {
    var temp,
        icount = 0,
        patrn = /[^\x00-\xff]/，
        strre = "";
    for (var i = 0; i < str.length; i++) {
        if (icount < len - 1) {
            temp = str.substr(i, 1);
                if (patrn.exec(temp) == null) {
                   icount = icount + 1
            } else {
                icount = icount + 2
            }
            strre += temp
            } else {
            break;
        }
    }
    return strre + "..."
}


2、替换全部

String.prototype.replaceAll = function(s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2)
}
3、清除空格

String.prototype.trim = function() {
    var reExtraSpace = /^\s*(.*?)\s+$/;
    return this.replace(reExtraSpace, "$1")
}
4、清除左空格/右空格

function ltrim(s){ return s.replace( /^(\s*|　*)/, ""); } 
function rtrim(s){ return s.replace( /(\s*|　*)$/, ""); }
5、判断是否以某个字符串开头

String.prototype.startWith = function (s) {
    return this.indexOf(s) == 0
}
6、判断是否以某个字符串结束

String.prototype.endWith = function (s) {
    var d = this.length - s.length;
    return (d >= 0 && this.lastIndexOf(s) == d)
}
7、转义html标签

function HtmlEncode(text) {
    return text.replace(/&/g, '&').replace(/\"/g, '"').replace(/</g, '<').replace(/>/g, '>')
}
8、时间日期格式转换



Date.prototype.Format = function(formatStr) {
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    str = str.replace(/yyyy|YYYY/, this.getFullYear());
    str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
    str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
    str = str.replace(/M/g, (this.getMonth() + 1));
    str = str.replace(/w|W/g, Week[this.getDay()]);
    str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    str = str.replace(/d|D/g, this.getDate());
    str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
    str = str.replace(/h|H/g, this.getHours());
    str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
    str = str.replace(/m/g, this.getMinutes());
    str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
    str = str.replace(/s|S/g, this.getSeconds());
    return str
}


9、判断是否为数字类型



function isDigit(value) {
    var patrn = /^[0-9]*$/;
    if (patrn.exec(value) == null || value == "") {
        return false
    } else {
        return true
    }
}


10、设置cookie值



function setCookie(name, value, Hours) {
    var d = new Date();
    var offset = 8;
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var nd = utc + (3600000 * offset);
    var exp = new Date(nd);
    exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString() + ";domain=360doc.com;"
}


11、获取cookie值

function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null
}
12、加入收藏夹



function AddFavorite(sURL, sTitle) {
    try {
        window.external.addFavorite(sURL, sTitle)
    } catch(e) {
        try {
            window.sidebar.addPanel(sTitle, sURL, "")
        } catch(e) {
            alert("加入收藏失败，请使用Ctrl+D进行添加")
        }
    }
}


13、设为首页



function setHomepage() {
    if (document.all) {
        document.body.style.behavior = 'url(#default#homepage)';
        document.body.setHomePage('http://w3cboy.com')
    } else if (window.sidebar) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
            } catch(e) {
                alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true")
                }
        }
        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
        prefs.setCharPref('browser.startup.homepage', 'http://w3cboy.com')
    }
}


14、加载样式文件



function LoadStyle(url) {
    try {
        document.createStyleSheet(url)
    } catch(e) {
        var cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.type = 'text/css';
        cssLink.href = url;
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(cssLink)
    }
}


15、返回脚本内容



function evalscript(s) {
    if(s.indexOf('<script') == -1) return s;
    var p = /<script[^\>]*?>([^\x00]*?)<\/script>/ig;
    var arr = [];
    while(arr = p.exec(s)) {
        var p1 = /<script[^\>]*?src=\"([^\>]*?)\"[^\>]*?(reload=\"1\")?(?:charset=\"([\w\-]+?)\")?><\/script>/i;
        var arr1 = [];
        arr1 = p1.exec(arr[0]);
        if(arr1) {
            appendscript(arr1[1], '', arr1[2], arr1[3]);
        } else {
            p1 = /<script(.*?)>([^\x00]+?)<\/script>/i;
            arr1 = p1.exec(arr[0]);
            appendscript('', arr1[2], arr1[1].indexOf('reload=') != -1);
        }
    }
    return s;
}


16、清除脚本内容

function stripscript(s) {
    return s.replace(/<script.*?>.*?<\/script>/ig, '');
}
17、动态加载脚本文件



function appendscript(src, text, reload, charset) {
    var id = hash(src + text);
    if(!reload && in_array(id, evalscripts)) return;
    if(reload && $(id)) {
        $(id).parentNode.removeChild($(id));
    }
 
    evalscripts.push(id);
    var scriptNode = document.createElement("script");
    scriptNode.type = "text/javascript";
    scriptNode.id = id;
    scriptNode.charset = charset ? charset : (BROWSER.firefox ? document.characterSet : document.charset);
    try {
        if(src) {
            scriptNode.src = src;
            scriptNode.onloadDone = false;
            scriptNode.onload = function () {
                scriptNode.onloadDone = true;
                JSLOADED[src] = 1;
             };
             scriptNode.onreadystatechange = function () {
                 if((scriptNode.readyState == 'loaded' || scriptNode.readyState == 'complete') && !scriptNode.onloadDone) {
                    scriptNode.onloadDone = true;
                    JSLOADED[src] = 1;
                }
             };
        } else if(text){
            scriptNode.text = text;
        }
        document.getElementsByTagName('head')[0].appendChild(scriptNode);
    } catch(e) {}
}


18、返回按ID检索的元素对象

function $(id) {
    return !id ? null : document.getElementById(id);
}
19、跨浏览器绑定事件



function addEventSamp(obj,evt,fn){ 
    if(!oTarget){return;}
    if (obj.addEventListener) { 
        obj.addEventListener(evt, fn, false); 
    }else if(obj.attachEvent){ 
        obj.attachEvent('on'+evt,fn); 
    }else{
        oTarget["on" + sEvtType] = fn;
    } 
}


20、跨浏览器删除事件



function delEvt(obj,evt,fn){
    if(!obj){return;}
    if(obj.addEventListener){
        obj.addEventListener(evt,fn,false);
    }else if(oTarget.attachEvent){
        obj.attachEvent("on" + evt,fn);
    }else{
        obj["on" + evt] = fn;
    }
}


21、为元素添加on方法



Element.prototype.on = Element.prototype.addEventListener;
 
NodeList.prototype.on = function (event, fn) {、
    []['forEach'].call(this, function (el) {
        el.on(event, fn);
    });
    return this;
};


22、为元素添加trigger方法



Element.prototype.trigger = function (type, data) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent(type, true, true);
    event.data = data || {};
    event.eventName = type;
    event.target = this;
    this.dispatchEvent(event);
    return this;
};
 
NodeList.prototype.trigger = function (event) {
    []['forEach'].call(this, function (el) {
        el['trigger'](event);
    });
    return this;
};


23、检验URL链接是否有效



function getUrlState(URL){ 
    var xmlhttp = new ActiveXObject("microsoft.xmlhttp"); 
    xmlhttp.Open("GET",URL, false);  
    try{  
            xmlhttp.Send(); 
    }catch(e){
    }finally{ 
        var result = xmlhttp.responseText; 
        if(result){
            if(xmlhttp.Status==200){ 
                return(true); 
             }else{ 
                   return(false); 
             } 
         }else{ 
             return(false); 
         } 
    }
}


24、格式化CSS样式代码



function formatCss(s){//格式化代码
    s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
    s = s.replace(/;\s*;/g, ";"); //清除连续分号
    s = s.replace(/\,[\s\.\#\d]*{/g, "{");
    s = s.replace(/([^\s])\{([^\s])/g, "$1 {\n\t$2");
    s = s.replace(/([^\s])\}([^\n]*)/g, "$1\n}\n$2");
    s = s.replace(/([^\s]);([^\s\}])/g, "$1;\n\t$2");
    return s;
}


25、压缩CSS样式代码



function compressCss (s) {//压缩代码
    s = s.replace(/\/\*(.|\n)*?\*\//g, ""); //删除注释
    s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
    s = s.replace(/\,[\s\.\#\d]*\{/g, "{"); //容错处理
    s = s.replace(/;\s*;/g, ";"); //清除连续分号
    s = s.match(/^\s*(\S+(\s+\S+)*)\s*$/); //去掉首尾空白
    return (s == null) ? "" : s[1];
}


26、获取当前路径


var currentPageUrl = "";
if (typeof this.href === "undefined") {
    currentPageUrl = document.location.toString().toLowerCase();
}else {
    currentPageUrl = this.href.toString().toLowerCase();
}

27、判断是否移动设备



function isMobile(){
    if (typeof this._isMobile === 'boolean'){
        return this._isMobile;
    }
    var screenWidth = this.getScreenWidth();
    var fixViewPortsExperiment = rendererModel.runningExperiments.FixViewport ||rendererModel.runningExperiments.fixviewport;
    var fixViewPortsExperimentRunning = fixViewPortsExperiment && (fixViewPortsExperiment.toLowerCase() === "new");
    if(!fixViewPortsExperiment){
        if(!this.isAppleMobileDevice()){
            screenWidth = screenWidth/window.devicePixelRatio;
        }
    }
    var isMobileScreenSize = screenWidth < 600;
    var isMobileUserAgent = false;
    this._isMobile = isMobileScreenSize && this.isTouchScreen();
    return this._isMobile;
}


28、判断是否移动设备访问

function isMobileUserAgent(){
    return (/iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(window.navigator.userAgent.toLowerCase()));
}
29、判断是否苹果移动设备访问

function isAppleMobileDevice(){
    return (/iphone|ipod|ipad|Macintosh/i.test(navigator.userAgent.toLowerCase()));
}
30、判断是否安卓移动设备访问

function isAndroidMobileDevice(){
    return (/android/i.test(navigator.userAgent.toLowerCase()));
}
31、判断是否Touch屏幕

function isTouchScreen(){
    return (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
}
32、判断是否打开视窗

function isViewportOpen() {
    return !!document.getElementById('wixMobileViewport');
}
33、获取移动设备初始化大小



function getInitZoom(){
    if(!this._initZoom){
        var screenWidth = Math.min(screen.height, screen.width);
        if(this.isAndroidMobileDevice() && !this.isNewChromeOnAndroid()){
            screenWidth = screenWidth/window.devicePixelRatio;
        }
            this._initZoom = screenWidth /document.body.offsetWidth;
        }
    return this._initZoom;
}


34、获取移动设备最大化大小



function getZoom(){
    var screenWidth = (Math.abs(window.orientation) === 90) ? Math.max(screen.height, screen.width) : Math.min(screen.height, screen.width);
    if(this.isAndroidMobileDevice() && !this.isNewChromeOnAndroid()){
        screenWidth = screenWidth/window.devicePixelRatio;
    }
    var FixViewPortsExperiment = rendererModel.runningExperiments.FixViewport || rendererModel.runningExperiments.fixviewport;
    var FixViewPortsExperimentRunning = FixViewPortsExperiment && (FixViewPortsExperiment === "New" || FixViewPortsExperiment === "new");
    if(FixViewPortsExperimentRunning){
        return screenWidth / window.innerWidth;
    }else{
        return screenWidth / document.body.offsetWidth;
    }
}


35、获取移动设备屏幕宽度



function getScreenWidth(){
    var smallerSide = Math.min(screen.width, screen.height);
    var fixViewPortsExperiment = rendererModel.runningExperiments.FixViewport || rendererModel.runningExperiments.fixviewport;
    var fixViewPortsExperimentRunning = fixViewPortsExperiment && (fixViewPortsExperiment.toLowerCase() === "new");
    if(fixViewPortsExperiment){
        if(this.isAndroidMobileDevice() && !this.isNewChromeOnAndroid()){
            smallerSide = smallerSide/window.devicePixelRatio;
        }
    }
    return smallerSide;
}


36、完美判断是否为网址



function IsURL(strUrl) {
    var regular = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i
    if (regular.test(strUrl)) {
        return true;
    }else {
        return false;
    }
}


37、去掉url前缀



function removeUrlPrefix(a){
    a=a.replace(/：/g,":").replace(/．/g,".").replace(/／/g,"/");
    while(trim(a).toLowerCase().indexOf("http://")==0){
        a=trim(a.replace(/http:\/\//i,""));
    }
    return a;
}


38、随机数时间戳

function uniqueId(){
    var a=Math.random,b=parseInt;
    return Number(new Date()).toString()+b(10*a())+b(10*a())+b(10*a());
}
39、时间个性化输出功能



 1 /*
 2 1、< 60s, 显示为“刚刚”
 3 2、>= 1min && < 60 min, 显示与当前时间差“XX分钟前”
 4 3、>= 60min && < 1day, 显示与当前时间差“今天 XX:XX”
 5 4、>= 1day && < 1year, 显示日期“XX月XX日 XX:XX”
 6 5、>= 1year, 显示具体日期“XXXX年XX月XX日 XX:XX”
 7 */
 8 function timeFormat(time){
 9     var date = new Date(time),
10         curDate = new Date(),
11         year = date.getFullYear(),
12         month = date.getMonth() + 10,
13         day = date.getDate(),
14         hour = date.getHours(),
15         minute = date.getMinutes(),
16         curYear = curDate.getFullYear(),
17         curHour = curDate.getHours(),
18         timeStr;
19  
20     if(year < curYear){
21         timeStr = year +'年'+ month +'月'+ day +'日 '+ hour +':'+ minute;
22     }else{
23         var pastTime = curDate - date,
24             pastH = pastTime/3600000;
25  
26         if(pastH > curHour){
27               timeStr = month +'月'+ day +'日 '+ hour +':'+ minute;
28         }else if(pastH >= 1){
29               timeStr = '今天 ' + hour +':'+ minute +'分';
30         }else{
31               var pastM = curDate.getMinutes() - minute;
32               if(pastM > 1){
33                 timeStr = pastM +'分钟前';
34               }else{
35                 timeStr = '刚刚';
36               }
37         }
38     }
39     return timeStr;
40 }


40、常用的正则表达式



 1 //正整数
 2 /^[0-9]*[1-9][0-9]*$/;
 3 //负整数
 4 /^-[0-9]*[1-9][0-9]*$/;
 5 //正浮点数
 6 /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;   
 7 //负浮点数
 8 /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;  
 9 //浮点数
10 /^(-?\d+)(\.\d+)?$/;
11 //email地址
12 /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
13 //url地址
14 /^[a-zA-z]+://(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\S*)?$/;
15 或：^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$ 
16 //年/月/日（年-月-日、年.月.日）
17 /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;
18 //匹配中文字符
19 /[\u4e00-\u9fa5]/;
20 //匹配帐号是否合法(字母开头，允许5-10字节，允许字母数字下划线)
21 /^[a-zA-Z][a-zA-Z0-9_]{4,9}$/;
22 //匹配空白行的正则表达式
23 /\n\s*\r/;
24 //匹配中国邮政编码
25 /[1-9]\d{5}(?!\d)/;
26 //匹配身份证
27 /\d{15}|\d{18}/;
28 //匹配国内电话号码
29 /(\d{3}-|\d{4}-)?(\d{8}|\d{7})?/;
30 //匹配IP地址
31 /((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/;
32 //匹配首尾空白字符的正则表达式
33 /^\s*|\s*$/;
34 //匹配HTML标记的正则表达式
35 < (\S*?)[^>]*>.*?|< .*? />;
36 //sql 语句
37 ^(select|drop|delete|create|update|insert).*$
38 //提取信息中的网络链接
39 (h|H)(r|R)(e|E)(f|F) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)? 
40 //提取信息中的邮件地址
41 \w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)* 
42 //提取信息中的图片链接
43 (s|S)(r|R)(c|C) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)? 
44 //提取信息中的 IP 地址
45 (\d+)\.(\d+)\.(\d+)\.(\d+)
46 //取信息中的中国手机号码
47 (86)*0*13\d{9} 
48 //提取信息中的中国邮政编码
49 [1-9]{1}(\d+){5} 
50 //提取信息中的浮点数（即小数）
51 (-?\d*)\.?\d+ 
52 //提取信息中的任何数字
53 (-?\d*)(\.\d+)?
54 //电话区号
55 ^0\d{2,3}$
56 //腾讯 QQ 号
57 ^[1-9]*[1-9][0-9]*$ 
58 //帐号（字母开头，允许 5-16 字节，允许字母数字下划线）
59 ^[a-zA-Z][a-zA-Z0-9_]{4,15}$ 
60 //中文、英文、数字及下划线
61 ^[\u4e00-\u9fa5_a-zA-Z0-9]+$


41、返回顶部的通用方法



 1 function backTop(btnId) {
 2     var btn = document.getElementById(btnId);
 3     var d = document.documentElement;
 4     var b = document.body;
 5     window.onscroll = set;
 6     btn.style.display = "none";
 7     btn.onclick = function() {
 8         btn.style.display = "none";
 9         window.onscroll = null;
10         this.timer = setInterval(function() {
11             d.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
12             b.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
13             if ((d.scrollTop + b.scrollTop) == 0) clearInterval(btn.timer, window.onscroll = set);
14             }, 10);
15     };
16     function set() {
17         btn.style.display = (d.scrollTop + b.scrollTop > 100) ? 'block': "none"
18     }
19 };
20 backTop('goTop');


42、获得URL中GET参数值



 1 // 用法：如果地址是 test.htm?t1=1&t2=2&t3=3, 那么能取得：GET["t1"], GET["t2"], GET["t3"]
 2 function get_get(){ 
 3     querystr = window.location.href.split("?")
 4     if(querystr[1]){
 5         GETs = querystr[1].split("&");
 6         GET = [];
 7         for(i=0;i<GETs.length;i++){
 8               tmp_arr = GETs.split("=")
 9               key=tmp_arr[0]
10               GET[key] = tmp_arr[1]
11         }
12     }
13     return querystr[1];
14 }


43、清除相同的数组



 1 String.prototype.unique=function(){
 2     var x=this.split(/[\r\n]+/);
 3     var y='';
 4     for(var i=0;i<x.length;i++){
 5         if(!new RegExp("^"+x.replace(/([^\w])/ig,"\\$1")+"$","igm").test(y)){
 6             y+=x+"\r\n"
 7         }
 8     }
 9     return y
10 };


44、按字母排序，对每行进行数组排序

1 function SetSort(){
2     var text=K1.value.split(/[\r\n]/).sort().join("\r\n");//顺序
3     var test=K1.value.split(/[\r\n]/).sort().reverse().join("\r\n");//反序
4     K1.value=K1.value!=text?text:test;
5 }
45、字符串反序

function IsReverse(text){
    return text.split('').reverse().join('');
}
46、清除html代码中的脚本



 1 function clear_script(){
 2     K1.value=K1.value.replace(/<script.*?>[\s\S]*?<\/script>|\s+on[a-zA-Z]{3,16}\s?=\s?"[\s\S]*?"|\s+on[a-zA-Z]{3,16}\s?=\s?'[\s\S]*?'|\s+on[a-zA-Z]{3,16}\s?=[^ >]+/ig,"");
 3 }
 4 动态执行JavaScript脚本
 5  
 6 function javascript(){
 7     try{
 8       eval(K1.value);
 9     }catch(e){
10       alert(e.message);
11     }
12 }


47、金额大写转换函数



 1 function transform(tranvalue) {
 2     try {
 3         var i = 1;
 4         var dw2 = new Array("", "万", "亿"); //大单位
 5         var dw1 = new Array("拾", "佰", "仟"); //小单位
 6         var dw = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); //整数部分用
 7         //以下是小写转换成大写显示在合计大写的文本框中     
 8         //分离整数与小数
 9         var source = splits(tranvalue);
10         var num = source[0];
11         var dig = source[1];
12         //转换整数部分
13         var k1 = 0; //计小单位
14         var k2 = 0; //计大单位
15         var sum = 0;
16         var str = "";
17         var len = source[0].length; //整数的长度
18         for (i = 1; i <= len; i++) {
19               var n = source[0].charAt(len - i); //取得某个位数上的数字
20               var bn = 0;
21               if (len - i - 1 >= 0) {
22                 bn = source[0].charAt(len - i - 1); //取得某个位数前一位上的数字
23               }
24               sum = sum + Number(n);
25               if (sum != 0) {
26                 str = dw[Number(n)].concat(str); //取得该数字对应的大写数字，并插入到str字符串的前面
27                 if (n == '0') sum = 0;
28               }
29               if (len - i - 1 >= 0) { //在数字范围内
30                 if (k1 != 3) { //加小单位
31                       if (bn != 0) {
32                         str = dw1[k1].concat(str);
33                       }
34                       k1++;
35                 } else { //不加小单位，加大单位
36                       k1 = 0;
37                       var temp = str.charAt(0);
38                       if (temp == "万" || temp == "亿") //若大单位前没有数字则舍去大单位
39                       str = str.substr(1, str.length - 1);
40                       str = dw2[k2].concat(str);
41                       sum = 0;
42                 }
43               }
44               if (k1 == 3){ //小单位到千则大单位进一
45                 k2++;
46               }
47         }
48         //转换小数部分
49         var strdig = "";
50         if (dig != "") {
51               var n = dig.charAt(0);
52               if (n != 0) {
53                 strdig += dw[Number(n)] + "角"; //加数字
54               }
55               var n = dig.charAt(1);
56               if (n != 0) {
57                 strdig += dw[Number(n)] + "分"; //加数字
58               }
59         }
60         str += "元" + strdig;
61     } catch(e) {
62         return "0元";
63     }
64     return str;
65 }
66 //拆分整数与小数
67 function splits(tranvalue) {
68     var value = new Array('', '');
69     temp = tranvalue.split(".");
70     for (var i = 0; i < temp.length; i++) {
71         value = temp;
72     }
73     return value;
74 }


48、实现base64解码



 1 function base64_decode(data){
 2     var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
 3     var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,ac = 0,dec = "",tmp_arr = [];
 4     if (!data) { return data; }
 5     data += '';
 6     do { 
 7             h1 = b64.indexOf(data.charAt(i++));
 8             h2 = b64.indexOf(data.charAt(i++));
 9             h3 = b64.indexOf(data.charAt(i++));
10             h4 = b64.indexOf(data.charAt(i++));
11             bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
12             o1 = bits >> 16 & 0xff;
13             o2 = bits >> 8 & 0xff;
14             o3 = bits & 0xff;
15             if (h3 == 64) {
16                     tmp_arr[ac++] = String.fromCharCode(o1);
17             } else if (h4 == 64) {
18                     tmp_arr[ac++] = String.fromCharCode(o1, o2);
19             } else {
20                     tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
21             }
22     } while (i < data.length);
23     dec = tmp_arr.join('');
24     dec = utf8_decode(dec);
25     return dec;
26 }


49、实现utf8解码



 1 function utf8_decode(str_data){
 2     var tmp_arr = [],i = 0,ac = 0,c1 = 0,c2 = 0,c3 = 0;str_data += '';
 3     while (i < str_data.length) {
 4             c1 = str_data.charCodeAt(i);
 5             if (c1 < 128) {
 6                     tmp_arr[ac++] = String.fromCharCode(c1);
 7                     i++;
 8             } else if (c1 > 191 && c1 < 224) {       
 9                     c2 = str_data.charCodeAt(i + 1);
10                     tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
11                     i += 2;
12             } else {
13                     c2 = str_data.charCodeAt(i + 1);
14                     c3 = str_data.charCodeAt(i + 2);
15                     tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
16                     i += 3;
17             }
18     } 
19     return tmp_arr.join('');
20 }


50、获取窗体可见范围的宽与高



function getViewSize(){
    var de=document.documentElement;
    var db=document.body;
    var viewW=de.clientWidth==0 ?  db.clientWidth : de.clientWidth;
    var viewH=de.clientHeight==0 ?  db.clientHeight : de.clientHeight;
    return Array(viewW ,viewH);
}


51、判断鼠标是否移出事件



function isMouseOut(e, handler) {
    if (e.type !== 'mouseout') {
            return false;
    }
    var reltg = e.relatedTarget ? e.relatedTarget : e.type === 'mouseout' ? e.toElement : e.fromElement;
    while (reltg && reltg !== handler) {
            reltg = reltg.parentNode;
    }
    return (reltg !== handler);
}


52、半角转换为全角函数



function ToDBC(str){
    var result = '';
    for(var i=0; i < str.length; i++){
        code = str.charCodeAt(i);
        if(code >= 33 && code <= 126){
              result += String.fromCharCode(str.charCodeAt(i) + 65248);
        }else if (code == 32){
              result += String.fromCharCode(str.charCodeAt(i) + 12288 - 32);
        }else{
              result += str.charAt(i);
        }
    }
    return result;
}


53、全角转换为半角函数



function ToCDB(str){
    var result = '';
    for(var i=0; i < str.length; i++){
        code = str.charCodeAt(i);
        if(code >= 65281 && code <= 65374){
              result += String.fromCharCode(str.charCodeAt(i) - 65248);
        }else if (code == 12288){
              result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
        }else{
              result += str.charAt(i);
        }
    }
    return result;
}

/*
getComputedStyle 和 element.style 的相同点就是二者返回的都是 CSSStyleDeclaration 对象，取相应属性值得时候都是采用的 CSS 驼峰式写法，均需要注意 float 属性。
而不同点就是：
element.style 读取的只是元素的内联样式，即写在元素的 style 属性上的样式；而 getComputedStyle 读取的样式是最终样式，包括了内联样式、嵌入样式和外部样式。
element.style 既支持读也支持写，我们通过 element.style 即可改写元素的样式。而 getComputedStyle 仅支持读并不支持写入。我们可以通过使用 getComputedStyle 读取样式，通过 element.style 修改样式
我们可以通过使用 getComputedStyle 读取样式，通过 element.style 修改样式。

关于 getComputedStyle 的兼容性问题，在 Chrome 和 Firefox 是支持该属性的，同时 IE 9 10 11 也是支持相同的特性的，IE 8并不支持这个特性。 IE 8 支持的是 element.currentStyle 这个属性，这个属性返回的值和 getComputedStyle 的返回基本一致，只是在 float 的支持上，IE 8 支持的是 styleFloat,这点需要注意。
		*/
            function getBackgroundColor() {
                var oDiv = document.getElementById("div1");
                alert(document.defaultView.getComputedStyle(oDiv, null).backgroundColor);//document.defaultView 多数情况下可以用window代替，这里为了兼容Firefox3.6和IE8，需要注意 float 属性,该使用 cssFloat, IE 8 中仅支持 styleFloat 
            }
			
/*
dom2级在Document类型中定义了 createRange()方法；

创建range对象很简单 var range = document.createRange() 

操作range对象，有两个步骤，1选择节点，2,操作节点

选择节点：

最简单的选择节点方法：

 selectNode() :选择整个节点，包括子节点

 selectNodeContents()  选择节点的子节点

区别就是 例如这样一段html代码中 <p id="p1"><b>Hello</b> world!</p> 

var range1 = document.createRange(),
    range2 = document.createRange(),
    p1 = document.getElementById("p1");
range1.selectNode(p1);
range2.selectNodeContents(p1);


以上2个方法只能选择节点集合，需要精细选择节点，要用到的是 setStart()  和  setEnd() 个方法都接受两个参数：一个参照节点，一个节点偏移量

例如

 <p id="p1">Hello world!</p> 

 

range = document.createRange();
p1 = document.getElementById("p1").childNodes[0];
range.setStart(p1,2);
range.setEnd(p1,8);

选中的将会是 llo wo（注意！以0为基数，空格也算一个文本字符，占1个偏移量）

 2.操作节点

 deleteContents() 这个方法能够从文档中删除范围所包含的内容

 extractContents() 会删除并返回文档片段

 CloneContents() 创建范围对象的一个副本，不会影响原来的节点

 insertNode() 向范围选区的开始处插入一个节点

 surroundContents() 环绕范围插入内容 

 

其他：

复制 DOM 范围  ： 可以使用 cloneRange()方法复制范围。这个方法会创建调用它的范围的一个副本。

 var newRange = range.cloneRange();  

清理 DOM 范围 ：

在使用完范围之后，最好是调用 detach() 方法，以便从创建范围的文档中分离出该范围。调用
detach()之后，就可以放心地解除对范围的引用，从而让垃圾回收机制回收其内存了。来看下面的
例子

range.detach(); //从文档中分离
range = null; //解除引用 
推荐在使用范围的最后再执行这两个步骤。一旦分离范围，就不能再恢复使用了。 
*/

/*
			var oBtn = document.getElementById("button");
			oBtn.onclick = function() {
				var userSelection, text;
				if (window.getSelection) { 
					//现代浏览器
					userSelection = window.getSelection();
				} else if (document.selection) { 
					//IE浏览器 考虑到Opera，应该放在后面
					userSelection = document.selection.createRange();
				}
				if (!(text = userSelection.text)) {
					text = userSelection;
				}
				alert(text);
			};
			*/
/*
word-break: keep-all;

word-wrap: break-word;

white-space: pre-wrap;

1. word-break:break-all;只对英文起作用，以字母作为换行依据

2. word-wrap:break-word; 只对英文起作用，以单词作为换行依据

3.{white-space:pre-wrap; 只对中文起作用，强制换行

4.{white-space:nowrap; 强制不换行，都起作用

5.{white-space:nowrap; overflow:hidden; text-overflow:ellipsis;不换行，超出部分隐藏且以省略号形式出现

注意，一定要指定容器的宽度，不然的话是没有用的。
*/

在js中，不可以通过div.style.top 来获取这个div距离父级元素的距离，但是可以通过div.style.top来赋值。
clientLeft: 这两个返回的是元素周围边框的厚度
style.left: 定位元素与包含它的矩形左边界的偏移量
style.pixelLeft: 返回定位元素左边界偏移量的整数像素值.
style:posLetf: 返回定位元素左边界偏移量的数量值,不管相应的样式表元素指定什么单位.
offsetLeft:返回对象相对于父级对象的布局或坐标的left值，就是以父级对象左上角为坐标原点，向右和向下为X、Y轴正方向的x坐标


//关于height、offsetHeight、clientHeight、scrollHeight、innerHeight、outerHeight的区别一览

height:元素内容的高度 content
offsetHeight:内容高+padding+边框
clientHeight:内容的可视高度（不包括边框，边距或滚动条）,可以通过 CSS height + CSS padding - 水平滚动条高度 (如果存在)来计算.
scrollHeight:整个元素的高度（包括带滚动条的隐蔽的地方）内容的实际高度+上下padding（height自适应时scrollHeight==clientHeight）

在Safari和Firefox中，outerWidth和outerHeight返回浏览器窗口本身的尺寸（无论是从最外层的window对象还是从某个框架访问）。
Opera中，这两个属性的值表示页面视图容器①的大小。而innerWidth和innerHeight则表示该容器中页面视图区的大小（减去边框宽度）。
Chrome中，outerWidth，outerHeight与innerWidth，innerHeight返回相同的值，即视口(viewport)大小而非浏览器窗口大小。

//jQuery中的height()、innerheight()、outerheight()的区别总结

height():其高度范围是所匹配元素的高度height；

innerheight():其高度范围是所匹配元素的高度height+padding；

outerheight():其高度范围是所匹配元素的高度height+padding+border；

outerheight(true)其高度范围是所匹配元素的高度height+padding+border+margin；



6个常用的浏览器窗体属性:

document.documentElement.clientWidth

document.documentElement.clientHeight

document.documentElement.scrollWidth

document.documentElement.scrollHeight

document.body.scrollTop

document.body.scrollLeft

6个常用的屏幕对象属性：

window.screen.width

window.screen.height

window.screenTop

window.screenLeft

window.screen.availHeight

window.screen.availWidth

/*视口的大小，部分移动设备浏览器对innerWidth的兼容性不好，需要
 *document.documentElement.clientWidth或者document.body.clientWidth
 *来兼容（混杂模式下对document.documentElement.clientWidth不支持）。
 *使用方法 ： getViewPort().width;
 */

function getViewPort () {
    if(document.compatMode == "BackCompat") {   //浏览器嗅探，混杂模式
        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        };
    } else {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        };
    }
}

//获得文档的大小（区别与视口）,与上面获取视口大小的方法如出一辙
function getDocumentPort () {
    if(document.compatMode == "BackCompat") {
        return {
            width: document.body.scrollWidth,
            height: document.body.scrollHeight
        };
    } else {
        return {
            width: Math.max(document.documentElement.scrollWidth,document.documentElement.clientWidth),
            height: Math.max(document.documentElement.scrollHeight,document.documentElement.clientHeight)
        }
    }
}

function pageX(elem) {
    var p = 0;

    // We need to add up all of the offsets for every parent
    while ( elem.offsetParent ) {
        // Add the offset to the current count
        p += elem.offsetLeft;

        // and continue on to the next parent
        elem = elem.offsetParent;
    }

    return p;
}

function pageX(elem) {
   //递归
    return  elem.offsetParent ? elem.offsetLeft += pageX(elem.offsetParent) : 
        elem.offsetLeft;
    }

}

/*
克隆一个元素节点会拷贝它所有的属性以及属性值,当然也就包括了属性上绑定的事件(比如onclick="alert(1)"),但不会拷贝那些使用addEventListener()方法或者node.onclick = fn这种用JavaScript动态绑定的事件.

在使用Node.appendChild()或其他类似的方法将拷贝的节点添加到文档中之前,那个拷贝节点并不属于当前文档树的一部分,也就是说,它没有父节点.

如果deep参数设为false,则不克隆它的任何子节点.该节点所包含的所有文本也不会被克隆,因为文本本身也是一个或多个的Text节点.

如果deep参数设为true,则会复制整棵DOM子树(包括那些可能存在的Text子节点).对于空结点(例如<img>和<input>元素),则deep参数无论设为true还是设为false,都没有关系,但是仍然需要为它指定一个值.

注意:为了防止一个文档中出现两个ID重复的元素,使用cloneNode()方法克隆的节点在需要时应该指定另外一个与原ID值不同的ID
如果原始节点设置了ID，并且克隆节点会被插入到相同的文档中，那么应该更新克隆节点的ID以保证唯一性。name属性可能也需要进行修改，取决于你是否希望有相同名称的节点存在于文档中。

想要克隆一个节点来添加到另外一个文档中,请使用Document.importNode()代替本方法.

链接到章节Specifications
*/
