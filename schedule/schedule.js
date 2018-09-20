var h = $(window).height();
$('#schedule').height(h-50);
var dates = [],scheduleNames=[], scheduleList = [];

getscheduletimes();
//getSchedules();
setTimeline();

initScroll() ;

function initScroll() {
    $('#panel-schedule .panel-body').slimScroll({
        // color: '#ddd',
        // height: '700px',
        height: '98%',
        distance: '-10px',
        size: '5px',
        position: 'right',
        railVisible: false,
        alwaysVisible: true
    });
    $('.slimScrollDiv').css('overflow', 'initial');
};
$(window).on("resize", initScroll);

$('.fa-angle-down').on('click',function(){
	$(this).hide();
	$('.fa-angle-up,.timeline-wrapper').show();
});
$('.fa-angle-up').on('click',function(){
	$(this).hide();
	$('.timeline-wrapper').hide();
$('.fa-angle-down').show();
});

function sprintf(text){
	var i=1,args = arguments;
	return text.replace(/s%/g,function(){
		return (i<args.length)?args[i++]:'';
	});
}

function isExcel(path){
	if(path!=''){
		var reg = '/^.*\.(?:xls|xlsx)$/i';
		if(!reg.test(path)){
			alert('请上传Excel格式的文件！');
			return false;
		}{
			return true;
		}
	}
	return false;
}

    

function getSchedules(){
	var options = {
			url:gpath+'/classschedule/getschedules/null',
			data:null,
			callback:function(result){
				result = JSON.parse(result);
				if (result.success) {
					var data = result.data&&result.data.classscheduledetails;
					for(var i = 0; i < data.length; i++){
						var date = data[i].startdate + ' - ' + data[i].enddate;
						dates.push(date);
						scheduleNames.push(data[i].schedulename);
//						scheduleList.push({id:data[i].scheduleid,text:data[i].schedulename});
//						scheduleList.push({id:data[i].scheduleid,text:date});
					}
//					scheduleSelectInit(scheduleList);
//					$('#schedule-select').val(scheduleList[0].id).trigger("change");
					showSchedule(data[0]);
//					scheduleChange(data);
					
				}
			}
			
	};
	
	Custom.get(options);
}

function getSelectedSchedule(scheduleid){
	var options = {
			url:gpath+'/classschedule/getschedules/'+scheduleid,
			data:null,
			callback:function(result){
				result = result&&JSON.parse(result);
				if (result.success) {
					var data = result.data&&result.data.classscheduledetails;
					showSchedule(data[0]);
					
				}
			}
			
	};
	
	Custom.get(options);
}

function getscheduletimes(){
	var options = {
			url:gpath+'/classschedule/getscheduletimes',
			data:null,
			callback:function(result){
				result = JSON.parse(result);
				if (result.success && result.returnCode == "0") {
					var data = result.data;
//					createScheduleBars(data);
					if(data.length==0){
						$('#panel-noschedule').show();
						$('#panel-schedule').hide();
					}else{
						$('#panel-noschedule').hide();
						$('#panel-schedule').show();
					}
					scheduleList = [];
					for(var i = 0; i < data.length; i++){
						scheduleList.push({id:data[i].scheduleid,text:data[i].validatetime+'('+data[i].schedulename+')'});
					}
					$('#schedule-select').empty();
					scheduleSelectInit(scheduleList);
					
					getschedulesnow();
					
				}else{
					swal({
                        title: "查询失败",
                        text: result.msg,
                        type: "error",
                        confirmButtonText: "确定"
                    });
				}
			}
			
	};
	
	Custom.get(options);
}

function getschedulesnow(){
	
	var options = {
			url:gpath+'/classschedule/getschedulesnow',
			data:null,
			callback:function(result){
				result = JSON.parse(result);
				if (result.success && result.returnCode == "0") {
					if(result.data.classscheduledetails.length==0){
						showCurrentSegmentNoScheduleTip();
					}
					var currentSchedule = result.data.classscheduledetails[0];
					var scheduleid = currentSchedule && currentSchedule.scheduleid;
					$('#schedule-select').val(scheduleid).trigger("change");
//					createCurrentScheduleBar(currentSchedule);
				}else{
					swal({
                        title: "查询失败",
                        text: result.msg,
                        type: "error",
                        confirmButtonText: "确定"
                    });
				}
			}
			
	};
	
	Custom.get(options);
}


function scheduleChange(data){
	var scheduleId = $('#schedule-select').val();
	if(scheduleId)
	getSelectedSchedule(scheduleId);
}

$('#schedule-select').on('change', scheduleChange);

function showSchedule(data){
	$('.schedule').removeClass('schedule-bg');
	$('.schedule-opt').removeClass('schedule-opt-none');
	sessionStorage.setItem('schedule-data',JSON.stringify(data));
	
	var tpl_head = `<div class="schedule-header" >
	 		s%
	 		<img src="assets/img/iclass/schedule/tip.png" title="不同的颜色代表不同的模板">
	    </div>
		<ul class="kb_weeknav_ul ">		
			<li class="kb_weeknav">
				<p class="weeknav_tex">课节</p>
			</li>
		   	<li class="kb_weeknav">
		   		<p class="weeknav_tex">周一</p>
		   	</li>
		   	<li class="kb_weeknav">
		   		<p class="weeknav_tex">周二</p>
		   	</li>
		   	<li class="kb_weeknav">
		   		<p class="weeknav_tex">周三</p>
		   	</li>
		   	<li class="kb_weeknav">
		   		<p class="weeknav_tex">周四</p>
		   	</li>
		   	<li class="kb_weeknav">
		   		<p class="weeknav_tex">周五</p>
		   	</li>
		   	<li class="kb_weeknav">
		   		<p class="weeknav_tex">周六</p>
		   	</li>
		   	<li class="kb_weeknav">
		   		<p class="weeknav_tex">周日</p>
		   	</li>	                	
		 </ul>`;
		 
	 var tpl_order = `<li class="kb_course" >
		<div name="schedule_cell">
		<a  href="#" class="">
		<p class="kb_course_tex kb_course_order" >s%</p>
		<p class="kb_course_tex" >s%</p>
		</a>               			
		</div>
		</li>`;
	var tpl = `<li title="s%" class="kb_course s%" style="background:s%;">
	<div name="schedule_cell">
	<a  href="#" class="">
	<p class="kb_course_tex" title="s%">s%</p>
	</a>               			
	</div>
	</li>`;
	

	var html = '',courses=[];
	$('#schedule .schedule').html(html);
	html += sprintf(tpl_head,data.schedulename);
	
	for(var i = 0; i < data.scheduleTimeReq.length; i++){//行
		if(courses[i]==undefined){
			courses.push([]);
		}
		
		html+='<ul class="kb_content clear">';
		
			for(var k=0;k<8;k++){//列
				if(courses[i][k]==undefined){
					courses[i][k] = {};
					courses[i][k].order = '';
					courses[i][k].value = '';
					courses[i][k].templatename = '';
					courses[i][k].color = '';
					courses[i][k].isgray = '';
				}
				for(var j=0; j< data.scheduleTimeReq[i].classSchTemEntities.length; j++){
					
					if(data.scheduleTimeReq[i].classSchTemEntities[j].week==k){
						courses[i][k].value = data.scheduleTimeReq[i].classSchTemEntities[j].coursename||'';
						courses[i][k].templatename = data.scheduleTimeReq[i].classSchTemEntities[j].templatename?'当前使用的模板：'+data.scheduleTimeReq[i].classSchTemEntities[j].templatename:'';
						courses[i][k].color = data.scheduleTimeReq[i].classSchTemEntities[j].color;
						courses[i][k].isgray = data.scheduleTimeReq[i].classSchTemEntities[j].isgray=='1'?'isgray':'';
					}
				}
				if(k==0){
					courses[i][k].order = i+1;
					courses[i][k].value = data.scheduleTimeReq[i].starttime + ' - ' +data.scheduleTimeReq[i].endtime;
					html += sprintf(tpl_order,courses[i][k].order,courses[i][k].value);
				}else{
					
					html += sprintf(tpl,courses[i][k].templatename,courses[i][k].isgray,'rgb('+courses[i][k].color+')',courses[i][k].templatename,courses[i][k].value);
				}
				
			}
		html+='</ul>';
		if(data.scheduleTimeReq[i].num==1){
			html+='<div class="clear split"></div>';
		}
	}
	$('#schedule .schedule').append(html);
	
//	$('.schedule .schedule-header img').hover(function(){
//		
//	},function(){
//		
//	});
	
	var rows = $('#schedule ul.kb_content');
	for(var i = 0; i < rows.length; i++){
		var cols = rows.eq(i).find('li');
		var h = 70,hArr = [h];
		for(var j = 0; j < cols.length; j++){
			hArr.push(cols.eq(j).height());
		}
		h = Math.max.apply(null,hArr);
		cols.height(h);
	}

}



var elems = $('.status-switch');
elems.each(function(i, elem) {
    var switchery = new Switchery(elem, {
        size: 'small',
        disabled: false,
        disabledOpacity: 1,
        color: '#2ecc71',
        secondaryColor: '#bbbfc7',
        clickCallback: switchCallback
    });
    getclassinfo(switchery);
});

function switchCallback(obj){
	// obj.changeStatus();
	var tplStatus = $('#template-switch').prop('checked');
	var autoStatus = $('#auto-switch').prop('checked');
	var id = $(obj)[0].element.id;
	if(id=='template-switch'){
		tplStatus = tplStatus?0:2;
		switchtemplate(tplStatus,obj);
	}else{
		autoStatus = autoStatus?0:2;
		autovmpoweroff(autoStatus,obj)
	}
}

function switchtemplate(istemplateswitch,obj){
	var options = {
			url:gpath+'/classschedule/switchtemplate/'+istemplateswitch,
			data:null,
			callback:function(result){
				result = JSON.parse(result);
				if (result.success && result.returnCode == "0") {
					obj.changeStatus();
					swal({
                        title: "操作成功",
                        text: result.msg,
                        type: "success",
                        confirmButtonText: "确定"
                    });
				}else{
					swal({
                        title: "操作失败",
                        text: result.msg,
                        type: "error",
                        confirmButtonText: "确定"
                    });
				}
			}
			
	};
	
	Custom.get(options);
}

function autovmpoweroff(isvmpower,obj){
	var options = {
			url:gpath+'/classschedule/autovmpoweroff/'+isvmpower,
			data:null,
			callback:function(result){
				result = JSON.parse(result);
				if (result.success && result.returnCode == "0") {
					obj.changeStatus();
					swal({
                        title: "操作成功",
                        text: result.msg,
                        type: "success",
                        confirmButtonText: "确定"
                    });
				}else{
					swal({
                        title: "操作失败",
                        text: result.msg,
                        type: "error",
                        confirmButtonText: "确定"
                    });
				}
			}
			
	};
	
	Custom.get(options);
}

function getclassinfo(obj){
	var options = {
			url:gpath+'/template/getclassinfo',
			data:null,
			callback:function(result){
				if (result.retCode == "0") {
					var data = result.data;
					var istemplateswitch = data.istemplateswitch;
					var isvmpower = data.isvmpower;
					var id = $(obj)[0].element.id;
					if((id=='template-switch' && istemplateswitch==2) || (id=='auto-switch' && isvmpower==2) ){
						obj.changeStatus();
					}else{
						
					}
//					$('#template-switch').prop('checked',istemplateswitch==0?true:false);
//					$('#auto-switch').prop('checked',isvmpower==2?true:false);
				}else{
					swal({
                        title: "查询失败",
                        text: result.retMessage,
                        type: "error",
                        confirmButtonText: "确定"
                    });
				}
			}
			
	};
	
	Custom.get(options);
}

function scheduleSelectInit(scheduleList){
	$('#schedule-select').select2({
	    data: scheduleList,
	    width: '280px',
	    minimumResultsForSearch: -1, //去掉搜索框
	    escapeMarkup: function(m) {
	        return m;
	    },
	    placeholder: '请选择课表'
	});
}

$('.schedule-opt-add,.create-schedule').on('click', addSchedule);

function addSchedule() {
	sessionStorage.setItem('type', 'add');
    var url = 'assets/scripts/pages/iclass/schedule_edit.html';
    //Custom.getPage(url, 'main-content');
    Custom.getPage(url, '',function(result){
    	
    	Custom.easyModal({
    		width:820,
    		height:600,
    		title: "新增课程表",
    	    content: result,
    	    callback: function() {
//    	    	$('#schedule-edit').data('type', 'add');
    	    }
    		
    	});
    });
}
$('.schedule-opt-modify').on('click', function() {
	sessionStorage.setItem('type', 'update');
    var url = 'assets/scripts/pages/iclass/schedule_edit.html';
    //Custom.getPage(url, 'main-content');
    Custom.getPage(url, '',function(result){
    	
    	Custom.easyModal({
    		width:820,
    		height:600,
    		title: "修改课程表",
    	    content: result,
    	    callback: function() {
//    	    	$('#schedule-edit').data('type', 'update');
    	    }
    		
    	});
    });
});

$('.schedule-opt-delete').on('click', function() {
    swal({
        title: "确认删除选中课表",
        //text: "确认删除选中记录?",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    },
    function(isConfirm) {
        if (isConfirm) {
        	deleteScheduleConfirm();            
        }
    });
	
});

function deleteScheduleConfirm(){
	var scheduleid = $('#schedule-select').val();
	var options = {
			url:gpath+'/classschedule/beforedeleteschedule/'+scheduleid,
			data:null,
			callback:function(result){
				result = JSON.parse(result);
				if (result.success && result.returnCode == "0") {
					
					deleteSchedule(scheduleid);
					
				}else{
					swal({
				        title: "确认删除选中课表?",
				        text: '删除该课表可能影响当前正常教学（40分钟内有课程变动），确认删除请及时通知上课老师！',//result.msg,
				        type: "warning",
				        showCancelButton: true,
				        closeOnConfirm: false,
				        confirmButtonText: '确定',
				        cancelButtonText: '取消'
				    },
				    function(isConfirm) {
				        if (isConfirm) {
				        	deleteSchedule(scheduleid);     
				        }
				    });
					
				}
			}
			
	};
	
	Custom.get(options);
}

function deleteSchedule(scheduleid){

	var options = {
			url:gpath+'/classschedule/deleteschedule/'+scheduleid,
			data:null,
			callback:function(result){
				result = JSON.parse(result);
				if (result.success && result.returnCode == "0") {
					
					swal({
                        title: "操作成功",
                        text: result.msg,
                        type: "success",
                        confirmButtonText: "确定"
                    });
					var url = 'assets/scripts/pages/iclass/schedule.html';
					Custom.getPage(url,'main-content');
				}else{
					swal({
                        title: "操作失败",
                        text: result.msg,
                        type: "error",
                        confirmButtonText: "确定"
                    });
				}
			}
			
	};
	
	Custom.get(options);
}

$('.schedule-opt-copy').on('click', function() {
	sessionStorage.setItem('type', 'copy');
    var url = 'assets/scripts/pages/iclass/schedule_edit.html';
    //Custom.getPage(url, 'main-content');
    Custom.getPage(url, '',function(result){
    	
    	Custom.easyModal({
    		width:820,
    		height:600,
    		title: "复制课程表",
    	    content: result,
    	    callback: function() {
//    	    	$('#schedule-edit').data('type', 'copy');
    	    }
    		
    	});
    });
});
function importSchedules(){

	$('#myFile').change(function(){
		var fReader = new FileReader();
		var file = $(this).get(0).files[0];	
		fReader.readAsDataURL(file);
		$('#uploadModal').modal('show');
	}).fileupload({
//		autoUpload:false,
		url:gpath+'/classschedule/upload',
	    maxChunkSize:4194304, 
	    dataType: 'json',
	    done: function (e, result) {
	    	result = JSON.parse(result.result);
	    	if(result.returnCode==0){
	    		$('#myModal,#uploadModal').modal('hide');
	    		swal({
	                title: "提示",
	                text: result.msg||'导入成功',
	                type: "success",
	                confirmButtonText: "确定"
	            });
	            var url = 'assets/scripts/pages/iclass/schedule.html';
				Custom.getPage(url,'main-content');
	    		
	    	}else{
	    		swal({
	                title: "提示",
	                text: result.msg || '导入失败',
	                type: "error",
	                confirmButtonText: "确定"
	            });
	    	}
	    	$('#uploadModal').modal('hide');
	    
	    }
	})
	.prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');
}
importSchedules();
$('.import-schedules').on('click',function(){
});
$('.schedule-opt-import').on('click',function(){
	$('.download-tpl').attr('href',gpath+'/classschedule/download');
//	importSchedules();
});

$('.schedule-opt-export').on('click',function(){
	$(this).attr('href',gpath+'/classschedule/export');
//	exportSchedules();
});

$('.schedule-opt-course,.create-course-template').on('click',function(){
	var url = 'assets/scripts/pages/iclass/schedule_template.html';
	Custom.getPage(url,'main-content');
});


$('.schedule-opt-log').on('click',function(){
	var url = 'assets/scripts/pages/iclass/schedule_log.html';
	Custom.getPage(url,'main-content');
});

function exportSchedules(){
	var options = {
//			headers:{
//				contentType:'application/x-www-form-urlencoded; charset=UTF-8'
//			},
			url:gpath+'/classschedule/export',
			data:null,
//			dataType:'blob',
			callback:function(result){
				if(result.data){
		              var filename = decodeURIComponent(result.headers['content-disposition'].split(';')[1]);
		              var blob = new Blob([result.data]);
		              if (window.navigator.msSaveOrOpenBlob) {
		                navigator.msSaveBlob(blob, filename.match(/"(\S*)"/)[1]);
		              } else {
		                var a = document.createElement('a');
		                a.download = filename.match(/"(\S*)"/)[1];
		                a.href=window.URL.createObjectURL(blob);
		                a.click();
		              }
		            }

			}
			
	};
	
	Custom.get(options);
}

function getScheduleScale(start,end){
	var options = {
			url:gpath+'/classschedule/getScheduleScale/'+start+'/'+end,
			data:null,
			callback:function(result){
				result = JSON.parse(result);
				if (result.success && result.returnCode == "0") {
		             var data = result.data.classscheduledetails;
		             createScheduleBars(data,start,end);
		        }

			}
			
	};
	
	Custom.get(options);
}

function setTimeline(){
	var now = moment().format('MM/DD');
	var start = moment().subtract(6, 'M');
	var end = moment().add(6, 'M');
	var prevHalfYear = start.format('YYYY-MM-DD');
	var nextHalfYear = end.format('YYYY-MM-DD');
	var days = end.diff(start,'days');
	var unit = 1/days;
//	moment('2018-06-27').isBetween(moment('2018-06-26'),moment('2018-06-28'),'days')
	
	$('.timeline .starttime').text(prevHalfYear);
	$('.timeline .endtime').text(nextHalfYear);
	$('.tippop.now').text(now);
	
	getScheduleScale(prevHalfYear,nextHalfYear);
	
	$('.prev').on('click',function(){
		var prevOld = $('.timeline .starttime').text();
		var nextOld = $('.timeline .endtime').text();
		var prevNew = moment(prevOld).subtract(1, 'Y').subtract(1,'days').format('YYYY-MM-DD');
		var nextNew = moment(nextOld).subtract(1, 'Y').subtract(1,'days').format('YYYY-MM-DD');
		var midNew = moment(prevNew).add(6, 'M').format('MM/DD');
		$('.timeline .starttime').text(prevNew);
		$('.timeline .endtime').text(nextNew);
		$('.tippop.now').text(midNew);
		getScheduleScale(prevNew,nextNew);
		return false;
	});
	$('.next').on('click',function(){
		var prevOld = $('.timeline .starttime').text();
		var nextOld = $('.timeline .endtime').text();
		var prevNew = moment(prevOld).add(1, 'Y').add(1,'days').format('YYYY-MM-DD');
		var nextNew = moment(nextOld).add(1, 'Y').add(1,'days').format('YYYY-MM-DD');
		var midNew = moment(prevNew).add(6, 'M').format('MM/DD');
		$('.timeline .starttime').text(prevNew);
		$('.timeline .endtime').text(nextNew);
		$('.tippop.now').text(midNew);
		getScheduleScale(prevNew,nextNew);
		return false;
	});
}

var compare = function(obj1, obj2) {
    var val1 = obj1.startdate;
    var val2 = obj2.startdate;
    if (val1 < val2) {
        return -1;
    } else if (val1 > val2) {
        return 1;
    } else {
        return 0;
    }
}

var barsLeftRight = [],barsTimes = [];
function createScheduleBars(data,prevHalfYear,nextHalfYear){
	data = data.sort(compare);
	$('.tippop,.progress,.timebefore,.timeafter,.empty').remove();
	barsLeftRight.length = 0;
	barsTimes.length = 0;
//	var start = moment().subtract(6, 'M');
//	var end = moment().add(6, 'M');
//	var prevHalfYear = start.format('YYYY-MM-DD');
//	var nextHalfYear = end.format('YYYY-MM-DD');
	var start = moment(prevHalfYear);
	var end = moment(nextHalfYear);
	var nowDate = moment();
	var now =  moment().format('MM/DD');
	var days = end.diff(start,'days');
	var unit = 1/days;
	var rate = 1;
	var w = $('.timeline').width();
	var [prevstarttime,prevendtime] = ['',''];
	var tpl_bar = `<div class="progress" style="left: s%;width:s%;" data-scheduleid=s% data-schedulename="s%" data-startdate="s%" data-enddate="s%">
	<div class="progress-bar" >
		</div>
	</div>`;
	var tpl_bar_now = `<div class="progress now" style="left: s%;width:s%;" data-scheduleid=s% data-schedulename="s%" data-startdate="s%" data-enddate="s%">
	<div class="progress-bar" style="width:100%;">
		</div>
	</div>`;
	var tippop_schedule_time = `<div class="tippop schedulename time" style="left: s%;" data-scheduleid=s%>s%<br>s%至s%</div>`;
	
	var tpl_now = `<div class="tippop now">s%</div>`;
	
	var tip_schedule_now = `<div class="tippop start" style="left: s%;">s%</div>
	<div class="tippop schedulename current" style="left: s%;">s%</div>
	<div class="tippop end" style="left: s%;">s%</div>`;
	
	var timeslade = `<div class="timebefore"></div>
	<div class="timeafter"></div>`;
	
	var emptybar = `<div class="empty" style="left:s%;width:s%;" data-startdate="s%" data-enddate="s%"></div>`;
	
	$('.timeline').append(sprintf(tpl_now,now));
	if(nowDate.isBetween(start,end)){
		$('.tippop.now').show();
	}else{
		$('.tippop.now').hide();
	}
	
	if(data.length==0){
		$('.timeline').append(sprintf(emptybar,0,'100%',prevHalfYear,nextHalfYear));
	}
	
	for(var i=0;i<data.length;i++){
		var barhtml = '',tiphtml = '',emptyhtml='';
		var scheduleid = data[i].scheduleid;
		var schedulename = data[i].schedulename;
//		var validatetime = data[i].validatetime;
//		var [starttime,endtime] = validatetime.split('~');
		var [starttime,endtime] = [data[i].startdate,data[i].enddate];		
		var isvalid = data[i].isvalid; 				
		var isBetween = moment().isBetween(moment(starttime),moment(endtime),'seconds');
		var left = (moment(starttime).diff(start,'days')) * unit * 100 * rate;
		var width = (moment(endtime).diff(moment(starttime),'days') + 1)* unit * 100 * rate;
		if(moment(starttime).isBefore(moment(prevHalfYear))){
//			starttime = prevHalfYear;
			left = 0;
			width = (moment(endtime).diff(moment(prevHalfYear),'days') + 1)* unit * 100 * rate;
		}
		if(moment(endtime).isAfter(moment(nextHalfYear))){
//			endtime = nextHalfYear;
			width = (moment(nextHalfYear).diff(moment(starttime),'days') + 1)* unit * 100 * rate;
		}
		var barLeft = left +'%';
		var barWidth = width +'%';
//		var barNowLeft = 'calc(' + (50 - width * 1/2 ) + '% )'; 
		var barNowLeft = barLeft;
		var tipWidth = Math.max(calStringWidth(schedulename,'12px'),calStringWidth(moment(starttime).format('YYYY-M-D')+'至'+moment(endtime).format('YYYY-M-D'),'12px'))+12;
		var tip_left = tip_now_schedule_left = 'calc( ' + (left + width * 1/2 ) + '% - '+tipWidth/2+'px )'; 
		var tip_now_start = 'calc( ' + left + '% - 37px )'; 
		var tip_now_end = 'calc( ' + (left + width) + '% - 37px )'; //left + width + '%'; 
		var timebeforeLeft = tip_now_start;
		var timeafterLeft = 'calc( ' + (left + width) + '% )';
		barsLeftRight.push([left,left+width]);
		barsTimes.push([starttime,endtime]);
		if((left + width * 1/2 ) * w/100-tipWidth/2<0){
			tip_left = '0%';
		}else if((left + width * 1/2 )*w/100-tipWidth/2>w-tipWidth){
			tip_left = (w-tipWidth)+'px'; 
		}
		
 		
 		if(i==0 &&  i==(data.length-1)){
			if(!moment(starttime).isAfter(moment(prevHalfYear))&&moment(endtime).isBefore(moment(nextHalfYear))){
				var [emptystarttime,emptyendtime] = [moment(endtime).add(1,'days').format('YYYY-MM-DD'),nextHalfYear];	
				var emptybarLeft = (moment(emptystarttime).diff(start,'days') + 1) * unit * 100 * rate+'%';
 				var emptybarWidth = (moment(emptyendtime).diff(moment(emptystarttime),'days') + 1)* unit * 100 * rate+'%';
 				emptyhtml = sprintf(emptybar,emptybarLeft,emptybarWidth,emptystarttime,emptyendtime);
 				$(emptyhtml).appendTo($('.timeline'));
			}else if(moment(starttime).isAfter(moment(prevHalfYear))&&moment(endtime).isBefore(moment(nextHalfYear))){
 				var [emptystarttime,emptyendtime] = [prevHalfYear,moment(starttime).subtract(1,'days').format('YYYY-MM-DD')];
 				var emptybarLeft = '0%';
 				var emptybarWidth = (moment(emptyendtime).diff(moment(emptystarttime),'days') + 1)* unit * 100 * rate+'%';
 				
 				emptyhtml += sprintf(emptybar,emptybarLeft,emptybarWidth,emptystarttime,emptyendtime);
 				$(emptyhtml).appendTo($('.timeline'));

 				var [emptystarttime,emptyendtime] = [moment(endtime).add(1,'days').format('YYYY-MM-DD'),nextHalfYear];	
				var emptybarLeft = (moment(emptystarttime).diff(start,'days') + 1) * unit * 100 * rate+'%';
 				var emptybarWidth = (moment(emptyendtime).diff(moment(emptystarttime),'days') + 1)* unit * 100 * rate+'%';
 				emptyhtml = sprintf(emptybar,emptybarLeft,emptybarWidth,emptystarttime,emptyendtime);
 				$(emptyhtml).appendTo($('.timeline'));
 			}else if(moment(starttime).isAfter(moment(prevHalfYear)) && !moment(endtime).isBefore(moment(nextHalfYear))){
 				var [emptystarttime,emptyendtime] = [prevHalfYear,moment(starttime).subtract(1,'days').format('YYYY-MM-DD')];
 				var emptybarLeft = '0%';
 				var emptybarWidth = (moment(emptyendtime).diff(moment(emptystarttime),'days') + 1)* unit * 100 * rate+'%';
 				
 				emptyhtml += sprintf(emptybar,emptybarLeft,emptybarWidth,emptystarttime,emptyendtime);
 				$(emptyhtml).appendTo($('.timeline'));
 			}
 			
		}else if(i==0 &&  i<(data.length-1)){
			if(moment(starttime).isAfter(moment(prevHalfYear))&&moment(endtime).isBefore(moment(nextHalfYear))){
 				var [emptystarttime,emptyendtime] = [prevHalfYear,moment(starttime).subtract(1,'days').format('YYYY-MM-DD')];
 				var emptybarLeft = '0%';
 				var emptybarWidth = (moment(emptyendtime).diff(moment(emptystarttime),'days') + 1)* unit * 100 * rate+'%';
 				
 				emptyhtml += sprintf(emptybar,emptybarLeft,emptybarWidth,emptystarttime,emptyendtime);
 				$(emptyhtml).appendTo($('.timeline'));
 			}
		}else if(i>0 &&  i<(data.length-1)){
			if(moment(starttime).diff(moment(prevendtime),'days')>1){
				var [emptystarttime,emptyendtime] = [moment(prevendtime).add(1,'days').format('YYYY-MM-DD'),moment(starttime).subtract(1,'days').format('YYYY-MM-DD')];
				var emptybarLeft = (moment(emptystarttime).diff(start,'days') + 1) * unit * 100 * rate+'%';
 				var emptybarWidth = (moment(emptyendtime).diff(moment(emptystarttime),'days') + 1)* unit * 100 * rate+'%';
 				emptyhtml += sprintf(emptybar,emptybarLeft,emptybarWidth,emptystarttime,emptyendtime);
 				$(emptyhtml).appendTo($('.timeline'));
				
			}
		} else if(i>0 && i==(data.length-1)){
			if(moment(starttime).diff(moment(prevendtime),'days')>1){
				var [emptystarttime,emptyendtime] = [moment(prevendtime).add(1,'days').format('YYYY-MM-DD'),moment(starttime).subtract(1,'days').format('YYYY-MM-DD')];
				var emptybarLeft = (moment(emptystarttime).diff(start,'days') + 1) * unit * 100 * rate+'%';
 				var emptybarWidth = (moment(emptyendtime).diff(moment(emptystarttime),'days') + 1)* unit * 100 * rate+'%';
 				emptyhtml = sprintf(emptybar,emptybarLeft,emptybarWidth,emptystarttime,emptyendtime);
 				$(emptyhtml).appendTo($('.timeline'));
			}
//			if(!moment(endtime).isSame(moment(nextHalfYear))){
			if(moment(endtime).isBefore(moment(nextHalfYear))){
				var [emptystarttime,emptyendtime] = [moment(endtime).add(1,'days').format('YYYY-MM-DD'),nextHalfYear];	
				var emptybarLeft = (moment(emptystarttime).diff(start,'days') + 1) * unit * 100 * rate+'%';
 				var emptybarWidth = (moment(emptyendtime).diff(moment(emptystarttime),'days') + 1)* unit * 100 * rate+'%';
 				emptyhtml = sprintf(emptybar,emptybarLeft,emptybarWidth,emptystarttime,emptyendtime);
 				$(emptyhtml).appendTo($('.timeline'));
			}
		}
 		[prevstarttime,prevendtime] = [starttime,endtime];

 		if(isvalid==1){//isBetween
// 			$('.timeline').append(timeslade);
 			
 			$('.timebefore').css('left',timebeforeLeft);
 			$('.timeafter').css('left',timeafterLeft);
 			barhtml += sprintf(tpl_bar_now,barNowLeft,barWidth,scheduleid,schedulename,starttime,endtime);
 			
 			starttime = moment(starttime).format('YYYY/MM/DD');
 			endtime = moment(endtime).format('YYYY/MM/DD');
 			tiphtml += sprintf(tip_schedule_now,tip_now_start,starttime,tip_now_schedule_left,schedulename,tip_now_end,endtime);
 		}else{
 			barhtml += sprintf(tpl_bar,barLeft,barWidth,scheduleid,schedulename,starttime,endtime);
 			
 			starttime = moment(starttime).format('YYYY-M-D');
 			endtime = moment(endtime).format('YYYY-M-D');
 			tiphtml += sprintf(tippop_schedule_time,tip_left,scheduleid,schedulename,starttime,endtime);
 		}
 		$('.timeline').append(barhtml);
 		$('.timeline').append(tiphtml);
// 		$('#panel-schedule .panel-body').prepend(tiphtml);
	}
	

	$('.progress').hover(function(e){
		var scheduleid = $(this).data('scheduleid');
		var schedulename = $(this).data('schedulename');
		var startDate = $(this).data('startdate');
		var endDate = $(this).data('enddate');
		if($(this).hasClass('now')){
//			$('.start,.current,.end').show();
			$('.current').show();
		}else{
			
			$('.tippop[data-scheduleid='+scheduleid+']').show();
		}
		return false;
	},function(e){
		var scheduleid = $(this).data('scheduleid');
		if($(this).hasClass('now')){
//			$('.start,.current,.end').hide();
			$('.current').hide();
		}else{
			
			$('.tippop[data-scheduleid='+scheduleid+']').hide();
		}
		
	});

	$('.progress').on('click',function(){
		var scheduleid = $(this).data('scheduleid');
		$('#schedule-select').val(scheduleid).trigger('change');
		return false;
	});
	
	function getSheduleTimestart1(e){
		var left = e.offsetX;
		
		var time = moment(prevHalfYear).add(Math.round((left/w)/unit),'days').format('YYYY-MM-DD');
		var min = prevHalfYear;
		var max = nextHalfYear;
		var barLeft = min,barRight = max;
		var timestart = min,timeend = max;
		//moment().isBefore(moment('2018-07-01'));
		for(var i=0;i<data.length;i++){
			var [starttime,endtime] = [data[i].startdate,data[i].enddate];
			if(moment(time).diff(starttime)<moment(time).diff(timestart) && moment(starttime).isAfter(moment(time))){
				timeend = starttime;
			}
			if(moment(time).diff(endtime)<moment(time).diff(timestart) && moment(endtime).isBefore(moment(time))){
				timestart = endtime;
			}
		}
		timestart = moment(timestart).isSame(moment(prevHalfYear))?prevHalfYear:moment(timestart).add(1,'days').format('YYYY-MM-DD');
		timeend = moment(timeend).isSame(moment(nextHalfYear))?nextHalfYear:moment(timeend).subtract(1,'days').format('YYYY-MM-DD');
		sessionStorage.setItem('timestart',timestart);
		sessionStorage.setItem('timeend',timeend);
		console.log(timestart,timeend)
	}
	function getSheduleTimestart(e){
		var the = e.target;
		timestart = $(the).data('startdate');
		timeend = $(the).data('enddate');
		sessionStorage.setItem('timestart',timestart);
		sessionStorage.setItem('timeend',timeend);
		// console.log(timestart,timeend)
	}
	
	$('.timeline .empty').click(function(e){
		showCurrentSegmentNoScheduleTip()
		getSheduleTimestart(e);
		return false;
	});
	
	$('.timeline .empty').hover(function(e){
//		alert('timeline:clientX:'+e.clientX+',clientY:'+e.clientY+' offsetX:'+e.offsetX+',offsetY:'+e.offsetY);
		$(this).append('<div class="plus-icon"></div>');
		$('.plus-icon').css({
			'postion':'aboslute',
			'left':e.offsetX+5,
			'top':e.offsetY-5,
			'width':'15px',
			'height':'15px'
		}).on('click',function(ev){
			getSheduleTimestart(e);
			$('.schedule-opt-add').trigger('click');
			return false;
		});
	},function(e){
		$('.plus-icon').remove();
	});
	
} 

function showCurrentSegmentNoScheduleTip(){
	var html = `<div class="noschedule-tip">当前时间段没有课表！</div>               
    <div class="noschedule-tip">你可以：<a class="create-schedule" href="#">创建课程表</a></div>`;
	$('.schedule').addClass('schedule-bg').html(html);
	$('#schedule-select').val(-1).trigger("change");
	$('.schedule .create-schedule').on('click',addSchedule);
	$('.schedule-opt').not('.schedule-opt-add,.schedule-opt-log,.schedule-opt-course,.schedule-opt-import').addClass('schedule-opt-none');
} 

function calcStringPixelsCount(str, strFontSize) {
    // 字符串字符个数
    var stringCharsCount = str.length;

    // 字符串像素个数
    var stringPixelsCount = 0;

    // JS 创建HTML元素：span
    var elementPixelsLengthRuler = document.createElement("span");
    elementPixelsLengthRuler.style.fontSize = strFontSize;  // 设置span的fontsize
    elementPixelsLengthRuler.style.visibility = "hidden";  // 设置span不可见
    elementPixelsLengthRuler.style.display = "inline-block";
    elementPixelsLengthRuler.style.wordBreak = "break-all !important";  // 打断单词

    // 添加span
    document.body.appendChild(elementPixelsLengthRuler);

    for (var i =0; i < stringCharsCount; i++) {
        // 判断字符是否为空格，如果是用&nbsp;替代，原因如下：
        // 1）span计算单个空格字符（ ），其像素长度为0
        // 2）空格字符在字符串的开头或者结果，计算时会忽略字符串
        if (str[i] == " ") {
            elementPixelsLengthRuler.innerHTML = "&nbsp;";
        } else {
            elementPixelsLengthRuler.innerHTML = str[i];
        }

        stringPixelsCount += elementPixelsLengthRuler.offsetWidth;
    }

    return stringPixelsCount;
}

function calStringWidth(str,fontSize){
	$("<div id='labelText' style='color:black;line-height:1.2;white-space:nowrap;top:0px;left:0px;position:fixed;display:block;visibility:hidden;'></div>").appendTo(document.body);
	// var str="黄海洋黄海洋黄海洋黄海洋黄海洋黄海洋黄海洋黄海洋黄海洋黄海洋";
    str = str.substring(0,str.length);
    $("#labelText").css({
      "font-size": fontSize,//"12px",
      "font-family": "Microsoft YaHei"
    }).html(str);
    var width = $("#labelText").width();
    // console.log(width);
    return width;
}

