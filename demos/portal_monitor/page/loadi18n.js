var lang = window.top.getLanguage();
//lang = 'en-US';

//加载主页面head部分国际化
function loadProperties(lang) {
	jQuery.i18n.properties({
		language: lang,
		name: 'web-framework-i18n',
		path: 'i18n/', // 资源文件路径
		mode: 'map', // 用 Map 的方式使用资源文件中的值
		callback: function() { // 加载成功后设置显示内容
			var i18nItems = $('[name_i18n=com_zte_ums_ict_framework_ui_i18n]');
			for (var i = 0; i < i18nItems.length; i++) {
				var $item = $(i18nItems.eq(i));
				var itemId = $item.attr('id');
				if (typeof($item.attr("title")) != "undefined") {
					$item.attr("title", $.i18n.prop(itemId));
				} else {
					$item.text($.i18n.prop(itemId));
				}
			}
		}
	});
}

function loadi18n_WebFramework_1() {
	$.getScript("/web/res/web-common/comp/tools.js", function() {
		var lang = window.top.getLanguage();
		loadProperties(lang);
	});
}

function loadi18n_WebFramework() {
	loadProperties(lang);
}

/*
function loadPropertiesSideMenu(lang){
    jQuery.i18n.properties({
        language:lang,
        name:'web-framework-i18n',
        path:'i18n/', // 资源文件路径
        mode:'map', // 用 Map 的方式使用资源文件中的值
        callback: function() {// 加载成功后设置显示内容
			var i18nItems = $('[name=com_zte_ums_ict_framework_ui_i18n]');
			for(var i=0;i<i18nItems.length;i++){
			    var $item = $(i18nItems.eq(i));
			    var itemId = $item.attr('id');
				if(typeof($item.attr("placeholder"))=="undefined"){
					$item.text($.i18n.prop(itemId));
				}else{
					$item.attr("placeholder", $.i18n.prop(itemId));
				}
			}
        }
    });
}*/

/**
 * 国际化资源文件加载函数；
 * 相应参数为当前语言（由框架从后端取得），国际化资源文件名前缀，资源文件所在路径。
 */
function loadPropertiesSideMenu(lang, propertiesFileNamePrefix, propertiesFilePath) {
	jQuery.i18n.properties({
		language: lang,
		name: propertiesFileNamePrefix,
		path: propertiesFilePath, // 资源文件路径
		mode: 'map', // 用 Map 的方式使用资源文件中的值
		callback: function() { // 加载成功后设置显示内容

			setItemLabel();
		}
	});
}


function setItemLabel() {
	var i18nItems = $('[name_i18n=com_zte_ums_ict_framework_ui_i18n_sideMenu]');
	for (var i = 0; i < i18nItems.length; i++) {
		var $item = $(i18nItems.eq(i));
		var itemId = $item.attr('id');
		if (typeof($item.attr("placeholder")) == "undefined") {
			$item.text($.i18n.prop(itemId));
		} else {
			$item.attr("placeholder", $.i18n.prop(itemId));
		}
	}

	var newi18nItems = $('[i18n]');
	for (var j = 0; j < newi18nItems.length; j++) {
		var $item = $(newi18nItems.eq(j));
		var itemId = $item.attr('i18n');
		if (typeof($item.attr("title")) == "undefined") {
			$item.text($.i18n.prop(itemId));
		} else {
			$item.attr("title", $.i18n.prop(itemId));
		}
	}
}

function loadi18n_WebFramework_sideMenu() {
	//默认0场景菜单资源文件
	//loadPropertiesSideMenu(lang, 'web-framework-i18n', 'i18n/');
	//加载各应用菜单资源文件
	loadAppPropertiesSideMenu(lang);
}


/**
 * 获取对应的id的国际化
 * @param v
 */
function geti18nPropVal(v) {
	return $.i18n.prop(v);
}

String.prototype.formati18n = function() {
	if (arguments.length == 0) return this;
	for (var s = this, i = 0; i < arguments.length; i++)
		s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
	return s;
}
