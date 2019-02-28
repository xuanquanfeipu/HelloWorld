function showModel(){
	$(".model_color").height($(window).height());
	$(".model_color").show();
}

function closeModel(){
	$(".model_color").hide();	
}

function getMode(){
	var mode = -1;
	$.ajax({
        url: '/ipeg-web/requestDispatcher',
        type: 'post',
        data: {commandCode: 19000083},
        dataType: 'json',
        cache: false,
		async:false,
        success: function (result) {
			mode = result
        }
    });
	return mode;
}

/*过滤面板的展开&收起*/
function flexFilterPanel(showBtn,filterPanelName){
	var $expand = $("#" + filterPanelName);
	var $btn = $("#"+showBtn);
	var height = $expand.height();	
	if($btn.text().trim() == "展开筛选"){
		$expand.height(0);
		$expand.show();
		$expand.animate({height:height}, 50);
		$btn.html("<div class='show_filter_condition'>收起筛选&nbsp&nbsp&nbsp<i style='margin-left:20px;margin-top:5px;position:absolute;' class='fa fa-angle-up'></i></div>");
	}else{
		$btn.html("<div class='show_filter_condition'>展开筛选&nbsp&nbsp&nbsp<i style='margin-left:20px;margin-top:5px;position:absolute;' class='fa fa-angle-down'></i></div>");
		$expand.animate({height:"0px"}, 50, function(){
			$expand.hide();
			$expand.height(height);
		});
	}
}

/*关闭详情查看面板*/
function closeDetailWin(winName){
	$("#"+winName).window('close');
}

/*打开详情查看面板*/
function detailWindowOpen(detailWindowName,windowTitleName, winHeight, top){
	var window = $("#"+detailWindowName);
	$("#"+detailWindowName).css('display','block');
	var option = winHeight ? {
		left: ($(document).width()-760)/2,
		collapsible: false,
		minimizable: false,
		maximizable: false,
		resizable: false,
		shadow: false,
		modal: true,
		width: 760,
		height: winHeight,
		title: windowTitleName
	} : {
		left: ($(document).width()-760)/2,
		collapsible: false,
		minimizable: false,
		maximizable: false,
		resizable: false,
		shadow: false,
		modal: true,
		width: 760,
		title: windowTitleName
	}
	window.window(option);
	if(top){
		window.window({top: top});
	}else if(winHeight > 550){
		window.window({top: '5%'});
	}else {
		window.window({top: '10%'});
	}
	window.show();
}

/*详情查看面板数据加载*/
function detailDataLoad(detailTableName,doubleColNum,dataArr){
	$("#"+detailTableName)[0].innerHTML = "";
	var content1 = "", content2 = "";
	if(detailTableName == "alarmDetail" || detailTableName == "frontlogDetail"){
		for(var i=0,length=doubleColNum/2;i<length;i++){
			content1 += "<tr><td valign='top' class='alarm_detail_td_left_title_double'>"+dataArr[2*i].key+"<label style='padding-left:5px;'>:</label></td>"+
					"<td valign='top' class='alarm_detail_td_right_result_double'>"+dealWithMutliLine(dataArr[2*i].value)+"</td>"+
					"<td valign='top' class='alarm_detail_td_left_title_double'>"+dataArr[2*i+1].key+"<label style='padding-left:5px;'>:</label></td>"+
					"<td valign='top' class='alarm_detail_td_right_result_double'>"+dealWithMutliLine(dataArr[2*i+1].value)+"</td>"+
					"</tr>";
		}
		for(var i=doubleColNum,length=dataArr.length;i<length;i++){
			content2 += "<tr><td valign='top' class='alarm_detail_td_left_title_signle'>"+dataArr[i].key+"<label style='padding-left:5px;'>:</label></td>"+
						"<td valign='top' class='alarm_detail_td_right_result_signle' colspan='3'>"+dealWithMutliLine(dataArr[i].value)+"</td>"+
						"</tr>";
		}
	}else{
		for(var i=0,length=doubleColNum/2;i<length;i++){
			content1 += "<tr><td valign='top' class='log_detail_td_left_title_double'>"+dataArr[2*i].key+"<label style='padding-left:5px;'>:</label></td>"+
					"<td valign='top' class='log_detail_td_right_result_double'>"+dealWithMutliLine(dataArr[2*i].value)+"</td>"+
					"<td valign='top' class='log_detail_td_left_title_double'>"+dataArr[2*i+1].key+"<label style='padding-left:5px;'>:</label></td>"+
					"<td valign='top' class='log_detail_td_right_result_double'>"+dealWithMutliLine(dataArr[2*i+1].value)+"</td>"+
					"</tr>";
		}
		for(var i=doubleColNum,length=dataArr.length;i<length;i++){
			content2 += "<tr><td valign='top' class='log_detail_td_left_title_signle'>"+dataArr[i].key+"<label style='padding-left:5px;'>:</label></td>"+
						"<td valign='top' class='log_detail_td_right_result_signle' colspan='3'>"+dealWithMutliLine(dataArr[i].value)+"</td>"+
						"</tr>";
		}
	}

	$("#"+detailTableName).append(content1.concat(content2));
}

function dealWithMutliLine(value){
	var res = value;
	if(value.replace){
		var temp = dealWithESC(value);
		if(temp.indexOf && temp.indexOf(";") > 0){
		    
			var result = [];
			result.push("<ol>");
			var lines = temp.split(";");
			for(var i = 0; i < lines.length; i++){
			    if(lines[i].length){
                    result.push("<li>", recoveryESC(lines[i]), "</li>");
			    }
			}
			result.push("<ol>");
			res = result.join("");
		}
	} 
	return res;
}

function recoveryESC(value){
    var dst = ["&lt;","&gt;","&amp;","&quot;","&#039;"];
    var src = ["&lt@","&gt@","&amp@","&quot@","&#039@"];
    return dealWithText(value, src, dst);
}

function dealWithESC(value){
    var src = ["&lt;","&gt;","&amp;","&quot;","&#039;"];
    var dst = ["&lt@","&gt@","&amp@","&quot@","&#039@"];
    return dealWithText(value, src, dst);
}

function dealWithText(value, src, dst){
    var temp = value;
    for(var i = 0; i < src.length; i++){
        while (temp.indexOf(src[i]) > 0){
            temp = temp.replace(src[i], dst[i]);
        }
    }
    return temp;
}

/*日期格式*/
function dateFormat(data, format){
	var o = {
		"M+": data.getMonth() + 1, //月份
		"d+": data.getDate(), //日
		"h+": data.getHours(), //小时
		"m+": data.getMinutes(), //分
		"s+": data.getSeconds(), //秒
		"q+": Math.floor((data.getMonth() + 3) / 3), //季度
		"S": data.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (data.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
	if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return format;
}

/*获取上周时间*/
function getLastWeekDate(){
	var date = new Date();
	date.setDate(date.getDate() - 7);
	var y = date.getFullYear();
	var m = date.getMonth()+1; 
	var d = date.getDate();
	var h = date.getHours();
	var min = date.getMinutes();
	var sec = date.getSeconds();
	var startTime = y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d)+' '+(h<10?('0'+h):h)+':'+(min<10?('0'+min):min)+':'+(sec<10?('0'+sec):sec);
	return startTime;
}

function complexDatagridLoad(datagridId,doubleColNum,dataArr){
	$("#"+datagridId)[0].innerHTML = "";
	var content1 = "", content2 = "";
	if(dataArr[3].value==0){
    	        dataArr[3].value="密钥加密"
    	    }else{
    	        dataArr[3].value="token加密"  
    	    }
	for(var i=0,length=doubleColNum/3;i<length;i++){
		content1 += "<tr><td class='panel_detail_td_left_title_triple'>"+dataArr[3*i].key+"<label style='padding-left:5px;'>:</label> </td>"+
				"<td class='panel_detail_td_right_result_triple'>"+dataArr[3*i].value+"</td>"+
				"<td class='panel_detail_td_left_title_triple'>"+dataArr[3*i+1].key+"<label style='padding-left:5px;'>:</label> </td></td>"+
				"<td class='panel_detail_td_right_result_triple'>"+dataArr[3*i+1].value+"</td>"+
				"<td class='panel_detail_td_left_title_triple'>"+dataArr[3*i+2].key+"<label style='padding-left:5px;'>:</label> </td></td>"+
				"<td class='panel_detail_td_right_result_triple'>"+dataArr[3*i+2].value+"</td>"+
				"</tr>";
	}
	for(var i=doubleColNum,length=dataArr.length;i<length;i++){
        content2 += "<tr><td class='panel_detail_td_left_title_triple'>"+dataArr[i].key+"<label style='padding-left:5px;'>:</label> </td> </td>"+
                    "<td class='panel_detail_td_right_result_double' colspan='5'>"+dataArr[i].value+"</td>"+
                    "</tr>";
    }  
    $("#"+datagridId).append(content1.concat(content2));
}


/*消息提示框*/
function alertInfoWindow(windowName, windowTitleName){
	$(".util-comfirm").hide();
	$(".util-alert").show();
	var window = $("#"+windowName);
	$("#"+windowName).css('display','block');
	window.window({
		left: ($(document).width()-400)/2,
		top: '30%',
		collapsible: false,
		minimizable: false,
		maximizable: false,
		resizable: false,
		shadow: false,
		modal: true,
		width: 400,
		height: 215,
		title: windowTitleName
	});
	window.show();
}

var CommonUtil = {};
CommonUtil.prompt = {};

function promptInfoWindow(windowId, infoId, windowTitleName, message,  callBack){
	$(".util-alert").hide();
	$(".util-comfirm").show();
	CommonUtil.prompt.callback = callBack;
	$("#" + infoId).html(message);
	var window = $("#" + windowId);
	$("#" + windowId).css('display', 'block');
	window.window({
		left: ($(document).width()-400)/2,
		top: '30%',
		collapsible: false,
		minimizable: false,
		maximizable: false,
		resizable: false,
		shadow: false,
		modal: true,
		width: 400,
		height: 215,
		title: windowTitleName
	});
	window.show();
}

function confirmAlertInfoWin(windowId){
	if(CommonUtil.prompt.callback){
		CommonUtil.prompt.callback(true);
		delete CommonUtil.prompt.callback;
	}
	$("#"+windowId).window('close');
}

function cancelAlertInfoWin(windowId){
	if(CommonUtil.prompt.callback){
		CommonUtil.prompt.callback(false);
		delete CommonUtil.prompt.callback;
	}
	$("#"+windowId).window('close');
}

/*关闭消息提示框*/
function closeAlertInfoWin(winName){
	$("#"+winName).window('close');
}

/*获取日志来源对应的系统名称（不使用用户手动配置的描述名称）*/
function getDefaultLogSrc(divName){
    var portalObj = {};
    portalObj.id="UNIFY_PORTAL";
    portalObj.text="统一运维管理系统";
    $.ajax({
        url : '/ipeg-web/requestDispatcher',
        type : 'post',
        data : {commandCode:17000115},
        dataType : 'json',
        cache : false,
        async:false,
        success : function(result){
        	if(result.status == 0 && divName !="system"){
                result.data.push(portalObj);
            }
            var arr = mapUserSignedNameToDefaultName(result.data);
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].text == "全部") {
                    var temp = arr[0];
                    arr[0] = arr[i];
                    arr[i] = temp;
                }
            }
            $('#'+divName).combobox('loadData', arr);
        }
    });
}

function mapUserSignedNameToDefaultName(arr){
    var defaultNameMap ={"IPEG_BEAS":"共享交换平台","DAP_MANAGER":"大数据平台","AUDAQUE_ETL":"清洗融合平台","AUDAQUE_DSP":"应用展示平台","RES_ICM":"配置管理中心","RES_SMC":"服务监控中心","IPEG_MDM":"主数据管理","IPEG_RDS":"资源目录系统","IPEG_DSS":"决策支撑系统"};
    for(var i=0; i<arr.length; i++){
        for(var j in defaultNameMap){
            if(arr[i].id == j){
                arr[i].text = defaultNameMap[j];
            }
        }
    }
    return arr;
}
