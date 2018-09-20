

/**
 * 获取浏览器语言类型
 * @return {string} 浏览器国家语言
 */
var getNavLanguage = function(){
    if(navigator.appName == "Netscape"){
        var navLanguage = navigator.language;
        if(!navLanguage){//判断IE浏览器使用语言
        	navLanguage = navigator.browserLanguage;
        }
        return navLanguage.substr(0,2);
    }
    return false;
}

/**
 * 设置语言类型： 默认为中文
 */
var i18nLanguage = "zh-CN";


/**
 * 执行页面i18n方法
 * @return
 */ 
var execI18n = function(){
    /*
    	获取一下资源文件名
     */
    var optionEle = $("#i18n_pagename");
    if (optionEle.length < 1) {
        console.log("未找到页面名称元素，请在页面写入\n <meta id=\"i18n_pagename\" content=\"页面名(对应语言包的语言文件名)\">");
        return false;
    };
    var sourceName = optionEle.attr('content');
    sourceName = sourceName.split('-');
    
	i18nLanguage = getNavLanguage();
	/* 需要引入 i18n 文件*/
	if ($.i18n == undefined) {
	    console.log("请引入i18n js 文件")
	    return false;
	};
	
	/*
		这里需要进行i18n的翻译
	 */
	jQuery.i18n.properties({
	    name : sourceName, //资源文件名称
	    path : 'assets/i18n/' + i18nLanguage +'/', //资源文件路径
	    mode : 'map', //用Map的方式使用资源文件中的值
	    language : i18nLanguage,
	    callback : function() {//加载成功后设置显示内容
	        var insertEle = $(".i18n");
	        console.log(".i18n 写入中...");
	        insertEle.each(function() {
	            // 根据i18n元素的 name 获取内容写入
	            $(this).html($.i18n.prop($(this).attr('name')));
	        });
	        console.log("写入完毕");
	
	        console.log(".i18n-input 写入中...");
	        var insertInputEle = $(".i18n-input");
	        insertInputEle.each(function() {
	            var selectAttr = $(this).attr('selectattr');
	            if (!selectAttr) {
	                selectAttr = "value";
	            };
	            $(this).attr(selectAttr, $.i18n.prop($(this).attr('selectname')));
	        });
	        console.log("写入完毕");
	    }
	});
}

/*页面执行加载执行*/
$(function(){

    /*执行I18n翻译*/
    execI18n();

    
});
