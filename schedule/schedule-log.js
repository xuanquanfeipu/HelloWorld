var h = $(window).height();
$('#schedule-log').height(h-80);
setTimeout(selectInit,0);	
//selectInit();
dateInit();
timeInit();
getLogs(getParams());
initScroll() ;

function initScroll() {
    $('.schedule-log .tab_body').slimScroll({
        // color: '#ddd',
        // height: '700px',
        height: '100%',
        distance: '-10px',
        size: '5px',
        position: 'right',
        railVisible: false,
        alwaysVisible: true
    });
    $('.slimScrollDiv').css('overflow', 'initial');
};
$(window).on("resize", initScroll);
//var data = [{
//	date:'2018-06-26 10:45:00',
//	opt:'自动开机',
//	result:'成功',
//	desc:'自动开机成功',
//}];
//data = data.map(function(e,i){
//	return [e.date,e.opt||'',e.result==0?'成功':'失败','',e.desc||'']
//});
//showLogs(data);


function sprintf(text){
		var i=1,args = arguments;
		return text.replace(/s%/g,function(){
			return (i<args.length)?args[i++]:'';
		});
}
var optTypeList = [{
	id: -1,
	text: '全部'
	},{
	id: 1,
	text: '自动开机'
	},{
	id: 2,
	text: '自动切换'
	},{
	id: 3,
	text: '取消切换'
	},{
	id: 4,
	text: '自动关机'
	},{
	id: 5,
	text: '取消关机'
	}];
function getOptTypeText(id){
	return optTypeList.find(function(e,i){
		return e.id == id;
	}).text || '';
}
function selectInit(){
	
	$('#log-opttype-select').select2({
	    data: optTypeList,
	    width: '200px',
	    minimumResultsForSearch: -1, //去掉搜索框
	    escapeMarkup: function(m) {
	        return m;
	    },
	    placeholder: '请选择类型'
	});
	//$('#log-opttype-select').on('change', queryTypeChange);
	//$('#log-opttype-select').val(optTypeList[0].id).trigger("change");
}

$('.schedule-log-opt-back').on('click',function(){
	var url = 'assets/scripts/pages/iclass/schedule.html';
	Custom.getPage(url,'main-content');
});

$('.schedule-log-opt-search').on('click',search);

function search(){
	getLogs(getParams());
}
function getParams(){
	var ClassoperlogEntity = {};
	var opertype = $('#log-opttype-select').val();
	var startDate = $('.start_date').val();
	var startTime = $('.start_time').val();
	var endDate = $('.end_date').val();
	var endTime = $('.end_time').val();
	ClassoperlogEntity.opertype = opertype==-1?'':opertype;
	ClassoperlogEntity.startDate = new Date(startDate + ' ' + startTime).Format('yyyy-MM-dd hh:mm:00');
	ClassoperlogEntity.endDate = new Date(endDate + ' ' + endTime).Format('yyyy-MM-dd hh:mm:00');
//	var param = {ClassoperlogEntity}
	return ClassoperlogEntity;
}
function getLogs(data){
	var options = {
			url:gpath+'/classschedule/getClassoperlog',
			data:JSON.stringify(data),
			callback:function(result){
				result = JSON.parse(result);

				if (result.success && result.returnCode == "0") {
					var data = result.data;
					data = data.map(function(e,i){						
						return [e.opertime,getOptTypeText(e.opertype),e.result==0?'成功':'失败',e.description||'']
					});
					showLogs(data);
				}
			}
			
	};
	
	Custom.post(options);
}




function showLogs(data){
	var tpl_head = `<div class="tab_header"><ul class="kb_weeknav_ul ">
		<li class="kb_weeknav">
			<p class="weeknav_tex">时间</p>
		</li>
		<li class="kb_weeknav">
			<p class="weeknav_tex">操作</p>
		</li>
		<li class="kb_weeknav">
			<p class="weeknav_tex">操作结果</p>
		</li>
		<li class="kb_weeknav">
			<p class="weeknav_tex">描述</p>
		</li>
	</ul></div>`;
	
	var tpl = `<ul class="kb_content clear"  >
	    <li class="kb_course ">  
				<div name="schedule-log_cell">
					<a  href="#" class="">
	           		<p class="kb_course_tex" title="">
	           			s%
	           		</p>
	           	</a>               			
	   		</div>
		</li>
		<li class="kb_course course_tpl">  
				<div name="schedule-log_cell">
					<a  href="#" class="">
	           		<p class="kb_course_tex" title="">s%</p>
	           	</a>               			
	   		</div>
		</li>
		<li class="kb_course ">  
				<div name="schedule-log_cell">
					<a  href="#" class="">
	           		<p class="kb_course_tex" title="">s%</p>
	           	</a>               			
	   		</div>
		</li>	 
		<li class="kb_course ">  
				<div name="schedule-log_cell">
					<a  href="#" class="">
	           		<p class="kb_course_tex" title="">s%</p>
	           	</a>               			
	   		</div>
		</li>	 
	</ul> `;
	
	var html='';
	html += tpl_head;
	$('#schedule-log .schedule-log').html(html);
	html='<div class="tab_body">';
	for(var i =0;i<data.length;i++){
		html += sprintf(tpl,...data[i]);
	}
	html+='</div>';
	$('#schedule-log .schedule-log').append(html);
}
function dateInit() {
	laydate.render({
		  elem: '.start_date',
		  value:new Date(),
		  theme: 'molv',
		  done: function(value, date, endDate){
		    // console.log(value); //得到日期生成的值，如：2017-08-18
		    // console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
		    // console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
		    	// var endDate = $(".end_date").val();
		    	// if(new Date(value)>new Date(endDate)){
		    	// 	$(".date-validate-tip").text('开始时间不能晚于结束时间').show();
		    	// }else if(new Date(value)<new Date()){
		    	// 	$(".date-validate-tip").text('开始时间不能早于当前时间').show();
		    	// }else{
		    	// 	$(".date-validate-tip").hide();
		    		
		    	// }
		  }
		});
	laydate.render({
		  elem: '.end_date',
		  value:new Date(),
		  theme: 'molv',
		  done: function(value, date, endDate){
				// var startDate = $(".start_date").val();
		  //   	if(new Date(value)<new Date(startDate)){
		  //   		$(".date-validate-tip").text('结束时间不能早于开始时间').show();
		  //   	}else if(new Date(value)<new Date()){
		  //   		$(".date-validate-tip").text('开始时间不能早于当前时间').show();
		  //   	}else{
		  //   		$(".date-validate-tip").hide();
		  //   	}
		  }
		});
}
/**日期初始化
 * [dateInit description]
 * @return {[type]} [description]
 */
function dateInit1() {

    var yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
	var today = moment().format('YYYY-MM-DD');
	$(".start_date").datepicker({
	    dateFormat: 'yy-mm-dd',
	    onSelect: function(date, inst) {
	        $(".start_date").val(new Date(date).Format('yyyy-MM-dd'));
	    }
	
	});
	
	
	$(".start_date").val(yesterday);
	
	$(".end_date").datepicker({
	    dateFormat: 'yy-mm-dd',
	    onSelect: function(date, inst) {
	        $(".end_date").val(new Date(date).Format('yyyy-MM-dd'));
	    }
	
	});
	
	
	$(".end_date").val(today);
	
}

function timeInit(){
//	var startTime = moment().startOf('day').format('H:mm');
//	var endTime = moment().endOf('day').format('H:mm');
	
	$(".start_time").timepicker({
		defaultTime: '0:00',
//		minuteStep:5,
		showMeridian: false
	});
	$(".end_time").timepicker({
//		defaultTime: '0:00',
//		minuteStep:5,
		showMeridian: false
	});
//	$(".start_time").val('8:00');
//	$(".end_time").val('8:45');
	
}
