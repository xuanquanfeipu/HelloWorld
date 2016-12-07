var umapI18n;
function umapTranslate(regional)
{
	switch (regional){
		case "en_US":{
		_umapEn();
		break;
		}
		case "zh_CN":{
		_umapZh();
		break;
		}
		
		default:
			alert("Do not support this language");
	}

}
/*****************************************************************************en_US*************************************************************************************/
function _umapEn(){

umapI18n = {
//bootstrap3-validation.js
	 "pleaseInput": 'Please input.',
	 "pleaseInputIPv4":"Please input IPv4 address.",
	 "pleaseInputIPv6":"Please input IPv6 address.",
	 "pleaseInputInteger":"Please input integer.",
	 "errorEmail":"The email address is incorrect.",
	 "pleaseInputEnglish":"Please input English Character.",
	 "pleaseInputChinese":"Please input Chinese.",
	 "pleaseInputURL":"Please input URL.",
	 "formDateFormat":"The date format is XXXX-XX-XX.",
	 "noTargetSelected":"No object is selected.No return.",
	 "pleaseChooseFile":"Please choose a file.",
	 "inputLenNoLessThan":"The input length is no less than ",
	 "inputBetween_start":"The input value is between [",
	 "inputBetween_end":"]",
	 "inputRange":"The input range is: ",
	 "inputErrorReInput":"The input parameters are incorrect, please re-input.",
	 
	//dateTimePicker
	 "closeText":"Confirm",
	 "currentText":"Now",
	 "today":"Today",
	 "amNames":['AM', 'A'],
	 "pmNames":['PM', 'P'],
	 "timeFormat":'HH:mm',
	 "timeSuffix":"",
	 "timeOnlyTitle":'Choose Time',
	 "timeText": 'Time',
	 "hourText": 'Hour',
	 "minuteText": 'Minute',
	 "secondText": 'Second',
	 "millisecText": 'Millisecond',
	 "microsecText": 'Microsecond',
	 "timezoneText": 'Time Zone',
	 "prevText": "Prev",
	 "nextText": "Next",
	 "monthNames": ["January","February","March","April","May","June",
				"July","August","September","October","November","December"], // Names of months for drop-down and formatting
	 "monthNamesShort": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // For formatting
	 "dayNames": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], // For formatting
	 "dayNamesShort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], // For formatting
	 "dayNamesMin": ["Su","Mo","Tu","We","Th","Fr","Sa"], // Column headings for days starting at Sunday
	 "weekHeader": "Wk", // Column header for week of the year
	 "dateFormat": "mm/dd/yy", // See format options on parseDate
	 "firstDay": 0, // The first day of the week, Sun = 0, Mon = 1, ...
	 "yearSuffix": "" ,
	 
	 //table
	 "sZeroRecords":"No matching records found",
	 "displayStart":"Showing",
	 "to":" to ",
	 "tableRecords":"of",
	 "tableRecordsUnit":"entries",
	 "sInfoEmpty":"No records available",
	 "sInfoFiltered":"(filtered from _MAX_ total records)",
	 "sFirst": "First",
	 "sNext":"Next",
	 "sPrevious":"Previous",
	 "sLast":"Last",
	 "colVis":"Column visibility",
	 "tableToPage":"to Page",
	 "tablePage":"",
	 "jump":"Jump",
	 "tableTotal":"",
	 "tableUnit":" total records",
	 "tableFrom":"(filtered from ",
	 "tableRecordFilter":" total records)",
	 "tableStart":"page ",
	 "tablePageTotal":", total ",
	 "tablePage1":" pages",
	 "tableShow":"displaying pages ",
	 "tableRecordUnit":" records",
	 
	 //messager
	 "messagerConfirm":"Confirm",
	 "messagerCancel":"Cancel",
	 
	 //select
	 "selectNoResults":"No results match",
	 "selectNoneSelected":"Nothing selected",
	 "selectCountSelected":"{0} of {1} selected",
	 "selectMaxOptions":['Limit reached ({n} {var} max)', 'Group limit reached ({n} {var} max)', ['items','item']],
	 "selectAll":"Select All",
	 "deSelectAll":"Deselect All",
	 "addRepetition":"Adding option repeated, please edit again.",
	 "search":"Search: ",
	 "addOption":"Add an option: ",
	 
	 //select2side
	 "select2sideTop": 'Top',
	 "select2sideBottom": 'Bottom',
	 "select2sideUp": 'Up',
	 "select2sideDown": 'Down',
	 "select2sideSort": 'Sort',
	 "select2sideChoose": 'Available',
	 "select2sideChoosed": 'Selected',
	 "select2sideMoveTop":"Move on top selected option",
	 "select2sideMoveUp":"Move up selected option",
	 "select2sideMoveDown":"Move down selected option",
	 "select2sideMoveBottom":"Move on bottom selected option",
	 "select2sideAddOne":"Add selected",
	 "select2sideAddAll":"Add all",
	 "select2sideRemoveOne":"Remove selected",
	 "select2sideRemoveAll":"Remove all",
	 
	  //fileup
	 "fileDefaultText":"No file selected",
	 
	 //switchButton
	 "switchOn":"ON",
	 "switchOff":"OFF",
	 
	 //umapLoading
	 "waiting": "Please wait...",
	 
	 //menu
	 "menu_search":"Search in menu",
	 "menu_search_noresult":"No matches were found."
};

}



/*****************************************************************************zh_CN*************************************************************************************/
function _umapZh()
{
umapI18n = {
	//bootstrap3-validation.js
	 "pleaseInput": "请输入内容。",
	 "pleaseInputIPv4":"请输入IPv4格式的地址。",
	 "pleaseInputIPv6":"请输入IPv6格式的地址。",
	 "pleaseInputInteger":"请输入整数。",
	 "errorEmail":"输入的邮箱地址不正确。",
	 "pleaseInputEnglish":"请输入英文字符。",
	 "pleaseInputChinese":"请输入汉字。",
	 "pleaseInputURL":"请输入网址URL",
	 "formDateFormat":"日期格式XXXX-XX-XX。",
	 "noTargetSelected":"没有对象被选中，不能进行校验，无返回",
	 "pleaseChooseFile":"请选择文件。",
	 "inputLenNoLessThan":"输入长度大于等于",
	 "inputBetween_start":"输入值在[",
	 "inputBetween_end":"]之间。",
	 "inputRange":"输入值的范围：",
	 "inputErrorReInput":"输入参数不符合条件，请重新输入。",
	 
	//dateTimePicker
	 "closeText":"确定",
	 "currentText":"现在时间",
	 "today":"今天",
	 "amNames":['AM', 'A'],
	 "pmNames":['PM', 'P'],
	 "timeFormat":'HH:mm',
	 "timeSuffix":"",
	 "timeOnlyTitle":'选择时间',
	 "timeText": '时间',
	 "hourText": '小时',
	 "minuteText": '分钟',
	 "secondText": '秒钟',
	 "millisecText": '毫秒',
	 "microsecText": '微秒',
	 "timezoneText": '时区',
	 "prevText": "&#x3c;上月",
	 "nextText": "下月&#x3e;",
	 "monthNames": ['一月','二月','三月','四月','五月','六月',
		'七月','八月','九月','十月','十一月','十二月'], // Names of months for drop-down and formatting
	 "monthNamesShort": ['一','二','三','四','五','六',
		'七','八','九','十','十一','十二'], // For formatting
	 "dayNames": ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'], // For formatting
	 "dayNamesShort": ['周日','周一','周二','周三','周四','周五','周六'], // For formatting
	 "dayNamesMin":['日','一','二','三','四','五','六'], // Column headings for days starting at Sunday
	 "weekHeader": '周', // Column header for week of the year
	 "dateFormat": 'yy-mm-dd', // See format options on parseDate
	 "firstDay": 1, // The first day of the week, Sun = 0, Mon = 1, ...
	 "yearSuffix": '年' ,
	 
	 //table
	 "sZeroRecords":"没有匹配的记录。",
	 "displayStart":"显示第",
	 "to":"到",
	 "tableRecords":"项记录，共",
	 "tableRecordsUnit":"项",
	 "sInfoEmpty":"显示第 0 至 0 项记录，共 0 项",
	 "sInfoFiltered":"(由 _MAX_ 项记录过滤)",
	 "sFirst": "首页",
	 "sNext":"下一页",
	 "sPrevious":"上一页",
	 "sLast":"末页",
	 "colVis":"字段可见",
	 "tableToPage":"到",
	 "tablePage":"页",
	 "jump":"跳转",
	 "tableTotal":"共",
	 "tableUnit":"项记录",
	 "tableFrom":"(由",
	 "tableRecordFilter":"项记录过滤)",
	 "tableStart":"第",
	 "tablePageTotal":"页，共",
	 "tablePage1":"页",
	 "tableShow":"显示",
	 "tableRecordUnit":"项记录",
	 
	 //messager
	 "messagerConfirm":"确定",
	 "messagerCancel":"取消",
	 
	 //select
	 "selectNoResults":"没有选项匹配",
	 "selectNoneSelected":"请选择选项",
	 "selectCountSelected":"已选择{1}个中的{0}个",
	 "selectMaxOptions":['限制到达（最多选择{n}{var}）','分组限制到达（最多{n}{var}）',['个','个']],
	 "selectAll":"全部选中",
	 "deSelectAll":"全部取消",
	 "addRepetition":"增加的选项重复，请重新编辑",
	 "search":"搜索： ",
	 "addOption":"新增选项： ",
	 
	 //select2side
	 "select2sideTop": '顶部',
	 "select2sideBottom": '底部',
	 "select2sideUp": '向上',
	 "select2sideDown": '向下',
	 "select2sideSort": '排序',
	 "select2sideChoose": '可选项',
	 "select2sideChoosed": '已选项',
	 "select2sideMoveTop":"把已选项移到顶部",
	 "select2sideMoveUp":"把已选项上移",
	 "select2sideMoveDown":"把已选项下移",
	 "select2sideMoveBottom":"把已选项移到底部",
	 "select2sideAddOne":"增加一个选择项",
	 "select2sideAddAll":"增加所有",
	 "select2sideRemoveOne":"移除一个选择项",
	 "select2sideRemoveAll":"移除所有",
	 
	 //fileup
	 "fileDefaultText":"文件未选择",
	 
	  //switchButton
	 "switchOn":"开",
	 "switchOff":"关",
	 
	  //umapLoading
	 "waiting": "请稍候...",
	 
	 //menu
	 "menu_search":"在菜单中搜索",
	 "menu_search_noresult":"没有匹配的菜单"
	};

}