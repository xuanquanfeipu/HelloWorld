$(function(){
	initScroll();
	var courseTempRel = {};
	getCourses();
	gettemplate();
	initEventHandler();
	function sprintf(text){
		var i=1,args = arguments;
		return text.replace(/s%/g,function(){
			return (i<args.length)?args[i++]:'';
		});
	}

function initScroll() {
    $('#panel-schedule-edit .panel-body').slimScroll({
        // color: '#ddd',
        // height: '700px',
        height: '476px',
        distance: '-10px',
        size: '5px',
        position: 'right',
        railVisible: false,
        alwaysVisible: false
    });
    $('.slimScrollDiv').css('overflow', 'initial');
};
$(window).on("resize", initScroll);

	var tpl = `<li class="kb_order">
		<div name="schedule_cell">
			<a  href="#" class="">
			<p class="kb_course_tex order" title="">
				<input readonly class="course_order" type="text" value="s%" placeholder="输入课节">
			</p>
	   		</a>               			
		</div>
	</li>`;

	var tpl_time = `<li class="kb_time">				           
	<div name="schedule_cell">
		<a  href="#" class="">
			<p class="kb_course_tex" title="">
	   	
	        <div class="input-append date form_datetime " style="width: 50px; ">
	            <input size="16" type="text" value="s%" class="start_time" >
	        </div>
	        
	        <span style="float: left;color:#808080;margin: 6px 1px 1px 2px;">-</span>
	        
	        <div class="input-append date form_datetime " style="width: 50px;">
	            <input size="16" type="text" value="s%" class="end_time">
	        </div>
		</p>
		</a>               			
	</div>
	</li>`;

	var tpl_course = ` <li class="kb_course" title="s%" style="background-color:s%;">  
		<div name="schedule_cell">
			<a  href="#" class="">
	   		<p class="kb_course_tex" title="">
	   			<input style="background-color:s%;" class="course_name" type="text" value="s%" data-templateid="s%" title="" data-title="s%" placeholder="课程名">
	   		</p>
	   	</a>               			
		</div>
		<div class="img" title="" style="display:s%;"></div>
	</li>`;//		<img class=".img" src="assets/img/iclass/schedule/edit_mould_blue.png">

	var data = [[1,'08:00 - 08:45','','','','','','',''],
	            [2,'08:55 - 09:40','','','','','','',''],
				[3,'09:50 - 10:35','','','','','','',''],
				[4,'02:00 - 02:45','','','','','','',''],
				[5,'02:55 - 03:40','','','','','','',''],
				[6,'03:50 - 04:35','','','','','','',''],
			   ];
	
	var type =  sessionStorage.getItem('type');
	var curSchedule = JSON.parse(sessionStorage.getItem('schedule-data'));
	if(type=='add' || !curSchedule){
		dateInit();
		createRow(data,0);
		$('.schedule-edit .schedule-edit-header').hide();
		timeInitSetting();
		
	}else{
		createSchedule(curSchedule);	
	}
	
	
	
	
	function createSchedule(data){
		dateInit();
		
		$('#schedule-edit').data('scheduleid',data.scheduleid);
		var dates = [data.startdate , data.enddate];
		var schedulename = data.schedulename;
		$('.start_date').val(dates[0]);
		$('.end_date').val(dates[1]);
		$('.schedule-edit-header input').val(schedulename);
		$('.schedule-edit .schedule-edit-header').show().text(schedulename);
//		var tpl = `<li class="kb_order">
//		<div name="schedule_cell">
//			<a  href="#" class="">
//			<p class="kb_course_tex order" title="">
//				<input readonly class="course_order" type="text" value="s%" placeholder="输入课节">
//			</p>
//	   		</a>               			
//		</div>
//	</li>`;
		

		var html = '',courses=[];
		for(var i = 0; i < data.scheduleTimeReq.length; i++){//行
			if(courses[i]==undefined){
				courses.push([]);
			}
			
			html+='<ul class="kb_content clear">';
			
				for(var k=0;k<9;k++){//列
					if(courses[i][k]==undefined){
						courses[i][k] = {};
						courses[i][k].value = '';
						courses[i][k].color = '';
						courses[i][k].templateid = '';
						courses[i][k].templatename = '';
					}
					for(var j=0; j< data.scheduleTimeReq[i].classSchTemEntities.length; j++){
						
						if(data.scheduleTimeReq[i].classSchTemEntities[j].week==(k-1)){
							courses[i][k].value = data.scheduleTimeReq[i].classSchTemEntities[j].coursename || '';
							courses[i][k].color = data.scheduleTimeReq[i].classSchTemEntities[j].color;
							courses[i][k].templateid = data.scheduleTimeReq[i].classSchTemEntities[j].templateid;
							var templatename = data.scheduleTimeReq[i].classSchTemEntities[j].templatename;
							courses[i][k].templatename = templatename?'当前使用模板：'+templatename :'';
							courses[i][k].display = courses[i][k].value==''?'none':'block';
						}
					}
					if(k==0){
						courses[i][k].value = i+1;
						html += sprintf(tpl,courses[i][k].value);
					}else if(k==1){
						var times = [data.scheduleTimeReq[i].starttime ,data.scheduleTimeReq[i].endtime];
						html += sprintf(tpl_time,...times);
					}else{
						
						html += sprintf(tpl_course,'','rgb('+courses[i][k].color+')','rgb('+courses[i][k].color+')',courses[i][k].value,courses[i][k].templateid,courses[i][k].templatename,courses[i][k].display);
					}
				}
			html+='<i class="fa fa-minus-circle"></i><i class="fa fa-plus-circle" title="往前插入"></i></ul>';
			if(data.scheduleTimeReq[i].num==1){
				html+='<div class="clear split"></div>';
			}
		}
		$('.fa.fa-minus-circle').remove();
		$('#schedule-edit .schedule-edit').append(html);
		var restDur = $('.rest-duration').val() || 10;
		var courseDur = $('.course-duration').val() || 45;
		var config = {restDur,courseDur};
		addInit(config);
		deleteInit(config);
		timeInit();
//		timeInitSetting();
		// initEventHandler();
		// timeValidate();
	}
	
	$('.course_add_btn').on('click',function(){
		var i = $('#schedule-edit .kb_content').size();		
		var restDur = $('.rest-duration').val() || 10;
		var courseDur = $('.course-duration').val() || 45;
		if(restDur<10){
			$('.duration-tip').text('课间休息不能小于10分钟').show();
			return;
		}else if(courseDur<25){
			$('.duration-tip').text('课程时长不能小于25分钟').show();
			return;
		}else{
			$('.duration-tip').hide();
		}
		var r = $('#schedule-edit .schedule-edit .kb_content').last();
		var start = r&&r.find('.start_time');
		var end = r&&r.find('.end_time');
		var st = start && start.val();
		var et = end && end.val();
		var config = {restDur,courseDur,st,et};
		createRow(data,i,config);
		var scrollTop = $('#panel-schedule-edit .panel-body').scrollTop();
		$('#panel-schedule-edit .panel-body').scrollTop(scrollTop+40);
	});

	function createRow(data,i,config){
		if(sessionStorage.getItem('timestart')){
			var dates = [sessionStorage.getItem('timestart'),sessionStorage.getItem('timeend')];
			$('.start_date').val(dates[0]);
			$('.end_date').val(dates[1]);
			sessionStorage.removeItem('timestart');
			sessionStorage.removeItem('timeend');
		}
		var html = '',st = '',et = '';
		st = config && config.st;
		et = config && config.et;
		st = st &&  moment(new Date('2018-01-01 '+st)).format('HH:mm');
		et = et && moment(new Date('2018-01-01 '+et)).format('HH:mm');
		var times = [st||'08:00',et||'08:45'];
		var restDur = config && config.restDur || 10;
		var courseDur = config && config.courseDur || 45;
		var startTime = moment('2018-01-01 '+times[1]).add(+restDur,'minute');
		var endTime = moment('2018-01-01 '+times[1]).add((+restDur+(+courseDur)),'minute');
		if($('#panel-schedule-edit .kb_content').length==0){
			startTime = moment('2018-01-01 '+times[0]);
			endTime = moment('2018-01-01 '+times[1]);
		}
		times = [startTime.format('H:mm'),endTime.format('H:mm')];
		if(moment(startTime).isBefore(moment(new Date('2018-01-01 6:00')))){
			swal({
                    title: "提示",
                    text: '课程开始时间不能早于早上6点',
                    type: "warning",
                    confirmButtonText: "确定"
                });
			return;
		}
		if(moment(endTime).isAfter(moment(new Date('2018-01-01 23:00')))){
			swal({
                    title: "提示",
                    text: '课程结束时间不能晚于晚上11点',
                    type: "warning",
                    confirmButtonText: "确定"
                });
			return;
		}
		html+='<ul class="kb_content clear">';
		html += sprintf(tpl,i+1);
		html += sprintf(tpl_time,...times);
		
		for(var j=2; j< data[0].length; j++){
			html += sprintf(tpl_course,'','','','',data[0][j],'','none');
		}
		html+='<i class="fa fa-minus-circle"></i><i class="fa fa-plus-circle" title="往前插入"></i></ul>';
//		$('.fa.fa-minus-circle').remove();
		$('#schedule-edit .schedule-edit').append(html);
		var restDur = $('.rest-duration').val() || 10;
		var courseDur = $('.course-duration').val() || 45;
		var config = {restDur,courseDur};
		addInit(config);
		timeInit();
		deleteInit(config);
		// initEventHandler();
		// timeValidate();
	}

	function initEventHandler(){
		$('#schedule-edit .schedule-edit ').off('mouseenter','input.course_name',enterHandler);
		$('#schedule-edit .schedule-edit ').on('mouseenter','input.course_name',enterHandler);
		$('#schedule-edit .schedule-edit ').off('mouseleave','input.course_name',leaveHandler);
		$('#schedule-edit .schedule-edit ').on('mouseleave','input.course_name',leaveHandler);
		$('#schedule-edit .schedule-edit ').off('focus','input.course_name',focusHandler);
		$('#schedule-edit .schedule-edit ').on('focus','input.course_name',focusHandler);
		$('#schedule-edit .schedule-edit ').off('blur','input.course_name',updateCourseSelect);
		$('#schedule-edit .schedule-edit ').on('blur','input.course_name',updateCourseSelect);
		$('#schedule-edit .schedule-edit ').off('click','input.course_name',courseSelect);
		$('#schedule-edit .schedule-edit ').on('click','input.course_name',courseSelect);
		$('#schedule-edit .schedule-edit ').off('click','.img',templateSelect);
		$('#schedule-edit .schedule-edit ').on('click','.img',templateSelect);
		$('#schedule-edit .schedule-edit ').off('keyup','input.course_name',courseChangeHandler);
		$('#schedule-edit .schedule-edit ').on('keyup','input.course_name',courseChangeHandler);
	}
	var t;
	function focusHandler(){
		// var title = $(this).attr('title');
		// $(this).data('title',title);
		// $(this).removeAttr('title');
		// $(this).attr('title','');
		// titileRemove();
		$('#schedule-edit .schedule-edit ').off('mouseenter','input.course_name',enterHandler);
		titleRemove();
		
	}
	function enterHandler(){
		var the = this;
		var title = $(this).data('title');
		if(!title) return;
		// $(this).attr('title',title);
		titleAdd(the,title);
		
	}
	function leaveHandler(){
		titleRemove();
		$('#schedule-edit .schedule-edit ').on('mouseenter','input.course_name',enterHandler);
	}
	function titleAdd(the,title){
		var left = $(the).offset().left - $('#schedule-edit .schedule-edit').offset().left+50 ;
		var top = $(the).offset().top - $('#schedule-edit .schedule-edit').offset().top;
		$('<div class="course-title">'+title+'</div>').css({
			'position':'absolute',
			'left':left,
			'top':top,
			'background':'#fff',
			'padding':'10px',
			'border':'1px solid #ddd'
		}).appendTo($('#schedule-edit .schedule-edit'));
	}
	function titleRemove(){
		$('.course-title').remove();
	}
	function initEventHandler1(){
		$('#schedule-edit .schedule-edit input.course_name').off('blur');
		$('#schedule-edit .schedule-edit input.course_name').on('blur',updateCourseSelect);
		$('#schedule-edit .schedule-edit input.course_name').off('click');
		$('#schedule-edit .schedule-edit input.course_name').on('click',courseSelect);
		$('#schedule-edit .schedule-edit .img').off('click');
		$('#schedule-edit .schedule-edit .img').on('click',templateSelect);
		$('#schedule-edit .schedule-edit input.course_name').off('keyup');
		$('#schedule-edit .schedule-edit input.course_name').on('keyup',courseChangeHandler);
	}

	function addInit(config){
		// var restDur = config && config.restDur || 10;
		// var courseDur = config && config.courseDur || 45;
		$('.schedule-edit ').off('click','i.fa.fa-plus-circle');
		$('.schedule-edit ').on('click','i.fa.fa-plus-circle',function(){
			var restDur = $('.rest-duration').val() || 10;
			var courseDur = $('.course-duration').val() || 45;
			var current = $(this).closest('ul.kb_content');
			var order = current.find('.course_order');
			var start = current.find('.start_time');
			var end = current.find('.end_time');
			var startTime = start.val();
			var endTime = end.val();
			var val = order.val();
			var prev = (current.prev() && current.prev().hasClass('kb_content'))?current.prev():current.prev().prev();
			var prevEndTime = prev.find('.end_time').val();
			var prevOrder = prev.find('.kb_order .course_order').val();
			if(prevOrder && prevEndTime!=''){
				var minutes = moment(new Date('2018-01-01 '+startTime)).diff(moment(new Date('2018-01-01 '+prevEndTime)),'minutes');
				if(+minutes && +minutes<((+restDur)*2+(+courseDur))){
					swal({
	                    title: "提示",
	                    text: '间隔时间过短，不够插入一节课程',
	                    type: "warning",
	                    confirmButtonText: "确定"
	                });
	                return;
				}
			}
			
			startTime = moment(new Date('2018-01-01 '+startTime)).subtract(+restDur+(+courseDur),'minute').format('H:mm');
			endTime = moment(new Date('2018-01-01 '+startTime)).add((+courseDur),'minute').format('H:mm');
			var valid = timeRangeValidate(startTime,endTime);
			if(!valid) return;


			var html='<ul class="kb_content clear">';
			html += sprintf(tpl,+val);
			html += sprintf(tpl_time,...[startTime,endTime]);
			
			for(var j=2; j< data[0].length; j++){
				html += sprintf(tpl_course,'','','','','','','none');
			}
			html+='<i class="fa fa-minus-circle"></i><i class="fa fa-plus-circle" title="往前插入"></i></ul>';
			current.before(html);
			timeInit();
			// addInit(config);
			// current.prev() && current.prev().find('.fa.fa-plus-circle').on('click',insertHandler);
			deleteInit(config);
			var next = current;
			while(next.length>0){
				var order = next.find('.course_order');
				var start = next.find('.start_time');
				var end = next.find('.end_time');
				var startTime = start.val();
				var endTime = end.val();				
				var val = order.val();
				order.val((+val)+1);
				
				next = $(next).next();
			}
			// initEventHandler();
			// if(!prev){
			// 	var next = current.next();
			// }else{

			// 	var next = current;
			// }
			
			// while(next.length>0){
			// 	var order = next.find('.course_order');
			// 	var start = next.find('.start_time');
			// 	var end = next.find('.end_time');
			// 	var startTime = start.val();
			// 	var endTime = end.val();				
			// 	var val = order.val();
			// 	order.val(+val+1);
			// 	if(type=='add'){
			// 		startTime = moment(new Date('2018-01-01 '+startTime)).add(+restDur+(+courseDur),'minute').format('H:mm');
			// 		endTime = moment(new Date('2018-01-01 '+endTime)).add(+restDur+(+courseDur),'minute').format('H:mm');
			// 		valid = timeRangeValidate($('.start_time').last().val(),$('.end_time').last().val());
			// 		if(!valid) return;
			// 		start.val(startTime);
			// 		end.val(endTime);
			// 	}
			// 	next = $(next).next();
			// }
			
		});
	
	}
	function timeRangeValidate(startTime,endTime){
		if(moment(new Date('2018-01-01 '+startTime)).isBefore(moment(new Date('2018-01-01 6:00')))){
			swal({
                    title: "提示",
                    text: '课程开始时间不能早于早上6点',
                    type: "warning",
                    confirmButtonText: "确定"
                });
			return false;
		}
		if(moment(new Date('2018-01-01 '+endTime)).isAfter(moment(new Date('2018-01-01 23:00')))){
			swal({
                    title: "提示",
                    text: '课程结束时间不能晚于晚上11点',
                    type: "warning",
                    confirmButtonText: "确定"
                });
			return false;
		}
		return true;
	}

	function deleteInit(config){
		$('.kb_content i.fa.fa-minus-circle').off('click');
		$('.kb_content i.fa.fa-minus-circle').on('click',function(){
			var next = $(this).closest('ul.kb_content').next();
			$(this).parent().remove();
			while(next.length>0){
				var order = next.find('.course_order');
				var start = next.find('.start_time');
				var end = next.find('.end_time');
				var startTime = start.val();
				var endTime = end.val();
				var restDur = config && config.restDur || 10;
				var courseDur = config && config.courseDur || 45;
				var val = order.val();
				order.val(+val-1);
				// if(type=='add'){
				// 	startTime = moment(new Date('2018-01-01 '+startTime)).subtract(+restDur+(+courseDur),'minute').format('H:mm');
				// 	endTime = moment(new Date('2018-01-01 '+endTime)).subtract(+restDur+(+courseDur),'minute').format('H:mm');
				// 	start.val(startTime);
				// 	end.val(endTime);
				// }
				next = $(next).next();
			}
			
		});
	}
	
	$('.rest-duration').on('blur',function(){
		if(+$(this).val()<10){
			$('.duration-tip').text('课间休息不能小于10分钟').show();
		}else{
			$('.duration-tip').hide();
		}
	});
	$('.course-duration').on('blur',function(){
		if(+$(this).val()<25){
			$('.duration-tip').text('课程时长不能小于25分钟').show();
		}else{
			$('.duration-tip').hide();
		}
	});
	
	function timeValidate(){
//		$('.start_time,.end_time').off('change');
//		$('.start_time,.end_time').on('change',function(){
//			var time = $(this).val();
//			var isBefore6 =  moment(new Date('2018-01-01 '+time)).isBefore(moment(new Date('2018-01-01 6:00')));
//			var isAfter23 =  moment(new Date('2018-01-01 '+time)).isAfter(moment(new Date('2018-01-01 23:00')));
//			if(isBefore6){
//				swal({
//                    title: "提示",
//                    text: '课程时间不能早于早上6点',
//                    type: "warning",
//                    confirmButtonText: "确定"
//                });
//			}else if(isAfter23){
//				swal({
//                    title: "提示",
//                    text: '课程时间不能晚于晚上11点',
//                    type: "warning",
//                    confirmButtonText: "确定"
//                });
//			}
//		});
	}
	//keyup
	function courseChangeHandler(){
		$(this).data('templateid','');
		$(this).closest('.kb_course').css('background-color','#fff');
		$(this).closest('.kb_course').find('input').css('background-color','#fff');
		if($(this).val()!=''){
			$('ul.course-list').hide()	
			// $(this).closest('.kb_course').find('.img').attr('title','').show();
		}else{			
			$('ul.course-list').children().length>0 && $('ul.course-list').show();
			// $(this).closest('.kb_course').find('.img').attr('title','').hide();
		}
		var coursename = $(this).val();
		var isValid = isValidateScheduleName( coursename );
		if(coursename.trim().length>30){
            $('#staticModalConfirmBtn').attr('disabled','disabled');
			swal({
                    title: "提示",
                    text: '课程名称不能超过30个字符',
                    type: "warning",
                    confirmButtonText: "确定"
            });
		}else if(coursename.trim()!='' && !isValid){
            $('#staticModalConfirmBtn').attr('disabled','disabled');
			swal({
                    title: "提示",
                    text: '课程名称不能包含除了“中英文 数字 -()（）、”以外的字符',
                    type: "warning",
                    confirmButtonText: "确定"
            });
		}else{

			$('#staticModalConfirmBtn').removeAttr('disabled');
		}
	}
	//blur
	function updateCourseSelect(){
		// $('.course-title').remove();
		var the = this;
		// var title = $(the).data('title');
		// $(the).attr('title',title);
		var isExist = false;
		var coursename = $(the).val();
			if(coursename=='')return;
		var courseList = $('ul.course-list');
		var courses = $('ul.course-list').children();
		for(var i=0;i<courses.length;i++){
			if(courses.eq(i).text()==coursename){
				isExist = true;
			}
		}
		if(!isExist){
			courseList.append('<li style="background-color:rgb(255,255,255)" class="course-item">'+coursename+'</li>');
		}
		$(the).closest('.kb_course').find('.img').show();
		// $('ul.course-list').closest('.slimScrollDiv').css({
		// 		'position':'absolute',
		// 		'top':'1000px',
		// 		'left':'1000px'
		// });
	}
	
	function showTemplateSelect(){
		if($(this).val()!=''){
			$(this).closest('.kb_course').find('.img').show();
			
		}else{
			$(this).closest('.kb_course').find('.img').hide();
		}
		
	}
	
	
	
	function courseNumReset(){
		var courseRows = $('#schedule-edit .kb_content');
		for(var i=0;i<courseRows.length;i++){
			courseRows.eq(i).find('#schedule-edit .kb_order .course_order').val(i+1);
		}
	}
	//click
	function courseSelect(){
		var the = this;
		// var title = $(the).attr('title');
		// $(the).data('title',title);
		// $(the).removeAttr('title');
		$('ul.course-list').children().length>0 && $('ul.course-list').show();
		var h = $('ul.course-list').height();
		var left = $(the).offset().left - $('#schedule-edit .schedule-edit').offset().left+30 ;
		var top = $(the).offset().top - $('#schedule-edit .schedule-edit').offset().top-$('#panel-schedule-edit .panel-body').scrollTop() + 150;
		if(left>500)left = 490;
		if(h>560){
			 top = 0;
		}else if(top+h>560){
			top=560-h;
		}
		$('ul.course-list').css('position','absolute');
		// $('ul.course-list').css('left',left);
		// $('ul.course-list').css('top',top);
		initScroll2('course',top,left,h);
		$('ul.course-list li').off('click');
		$('ul.course-list li').on('click',function(){
			$(the).closest('.kb_course').find('.img').show();
			var courseId = $(this).data('id');
			var templateid = $(this).data('templateid');
			var templatename = $(this).data('templatename')||'';
			var courseName = $(this).text();
			var color = $(this).css('background-color');
			$(the).data('courseId',courseId);
			$(the).data('templateid',templateid);
			// $(the).attr('title','当前使用模板：'+templatename);
			templatename && $(the).data('title','当前使用模板：'+templatename);
			// $(the).closest('li').attr('title','当前使用模板：'+templatename);
			$(the).val(courseName);
			$(the).css('background-color',color);
			$(the).closest('.kb_course').css('background-color',color);
			// $('ul.course-list').hide();
			// $('ul.course-list').closest('.slimScrollDiv').css({
			// 	'position':'absolute',
			// 	'top':'1000px',
			// 	'left':'1000px'
			// });
			 hideScrollDiv();
//			if(courseTempRel.courseName){
//				$(the).data('templateid',courseTempRel.courseName.templateid);
//				$(the).attr('title','当前使用模板：'+courseTempRel.courseName.templatename);
//				$(the).css('background',courseTempRel.courseName.color);
//			}
			return false;
		});
		
		return false;
	}
	function templateSelect(){
		var the = this;
		if($(the).prev().find('input').val()!=''){
//			$(the).removeAttr('title');
			$('ul.template-list').children().length>0 && $('ul.template-list').show();			
		}
//		var left = $(the).offset().left - $('#schedule-edit .schedule-edit').offset().left + $(the).parent().width()-$(the).width();
//		var top = $(the).offset().top - $('#schedule-edit .schedule-edit').offset().top + $('ul.template-list').height()+$(the).parent().height();
		var h = $('ul.template-list').height();
		var left = $(the).offset().left - $('#panel-schedule-edit').offset().left + 10 ;
		var top = $(the).offset().top - $('#panel-schedule-edit').offset().top+ 10;
		if(left>500)left = 490;
		if(h>560){
			 top = 0;
		}else if(top+h>560){
			top=560-h;
		}
		$('ul.template-list').css('position','absolute');
		// $('ul.template-list').css('left',left);
		// $('ul.template-list').css('top',top);

		initScroll2('template',top,left,h);	
		
		$('ul.template-list li').off('click');
		$('ul.template-list li').on('click',function(){
			var templatename = $(this).text();
			var templateid = $(this).data('id');
			var color = $(this).css('background-color');
//			$(the).prev().find('input').data('color',color);
//			$(the).attr('title','模板选择');
			
//			$(the).prev().find('input').data('templateid',templateid);
			// $(the).prev().find('input').attr('title','当前使用模板：'+templatename);
			templatename && $(the).prev().find('input').data('title','当前使用模板：'+templatename);
			// $(the).prev().find('input').closest('li').attr('title','当前使用模板：'+templatename);
//			$(the).parent().css('background',color);
//			$(the).parent().find('input').css('background',color);
			var coursename = $(the).prev().find('input').val();
			// $('ul.template-list').hide();
			// $('ul.template-list').closest('.slimScrollDiv').css({
			// 	'position':'absolute',
			// 	'top':'1000px',
			// 	'left':'1000px'
			// });
			 hideScrollDiv();
			var courses = $('#panel-schedule-edit .course_name');
			for(var i=0;i<courses.length;i++){
				if(courses.eq(i).val()==coursename){
					courses.eq(i).data('templateid',templateid);
					// courses.eq(i).attr('title','当前使用模板：'+templatename);
					templatename && courses.eq(i).data('title','当前使用模板：'+templatename);
					// courses.eq(i).closest('li').attr('title','当前使用模板：'+templatename);
					courses.eq(i).css('background-color',color);
					courses.eq(i).closest('.kb_course').css('background-color',color);
				}
			}
			
			var courseUl = $('ul.course-list');
			var courseList = $('ul.course-list').children();
			for(var i=0;i<courseList.length;i++){
				if(courseList.eq(i).text()==coursename){
					courseList.eq(i).data('templateid',templateid);
					courseList.eq(i).css('background-color',color);
				}
			}
			
		});
		return false;
	}
	$('ul.template-list,ul.course-list').hover(function(){
		$(this).show();
	},function(){
		$(this).hide();
		 hideScrollDiv();
	})
	$(document).on('click',function(){
		$('ul.template-list,ul.course-list').hide();
		hideScrollDiv();
	});

	function hideScrollDiv() {
		$('ul.template-list').parent().hasClass('slimScrollDiv') && $('ul.template-list').closest('.slimScrollDiv').css({
			'position':'absolute',
			'top':'1000px',
			'left':'1000px'
		});
		$('ul.course-list').parent().hasClass('slimScrollDiv') && $('ul.course-list').closest('.slimScrollDiv').css({
			'position':'absolute',
			'top':'1000px',
			'left':'1000px'
		});
	}
	$('#staticModalConfirmBtn').unbind('click');
	$('#staticModalConfirmBtn').bind('click',confirmBtnHandle)
	$('.schedule-edit-header input').on('keyup',function(){
		if($(this).val().trim().length>30){
			$('.schedulename-validate-tip').text('课表名称最大长度为30个字符').addClass('invalid').show();		
			$('#staticModalConfirmBtn').attr('disabled','disabled');	
		}else if($(this).val().trim().length==0){
			$('.schedulename-validate-tip').addClass('invalid').text('课表名称不能为空').show();
			$('#staticModalConfirmBtn').attr('disabled','disabled');
		}else{
			if(isValidateScheduleName( $(this).val().trim() )){
				$('.schedulename-validate-tip').removeClass('invalid').hide();
				$('#staticModalConfirmBtn').removeAttr('disabled');
				
			}else{
				$('.schedulename-validate-tip').addClass('invalid').text('课表名称不能含有除"中英文 数字 -()（）、"以外的特殊字符').show();
				$('#staticModalConfirmBtn').attr('disabled','disabled');
			}
		}
	});
	$(".start_date,.end_date").on('blur',function(){
		if($(this).val()==''){
			$('.date-validate-tip').text('日期不能为空').show();
			$('#staticModalConfirmBtn').attr('disabled','disabled');
		}else 
		if($(this).val()!=''&&!isDate($(this).val())){
			$('.date-validate-tip').text('不是有效的日期格式').show();
			$('#staticModalConfirmBtn').attr('disabled','disabled');
		}else{
			$('.date-validate-tip').hide();
			$('#staticModalConfirmBtn').removeAttr('disabled');
		}
	});
	function confirmBtnHandle(){
		if($('.schedule-edit-header input').trigger('keyup').next().hasClass('invalid')){			
			return ;
		}else{

		}
		if($('.start_date').val()=='' || $('.end_date').val()==''){
			$('.date-validate-tip').text('日期不能为空').show();
			return ;
		}else{

		}
		$(this).unbind('click');
		
		var data = {},classscheduledetails = [],schedule = {},scheduleTimeReq = [];
		data.classroomid = '';
		var scheduleId = $('#schedule-edit').data('scheduleid');
		schedule.schedulename = $('.schedule-edit-header input').val();
		schedule.startdate = moment($('.start_date').val()).format('YYYY-MM-DD');
		schedule.enddate = moment($('.end_date').val()).format('YYYY-MM-DD');
		schedule.scheduleid = scheduleId;
		var rows = $('#schedule-edit .kb_content');
		
		for(var i=0;i<rows.length;i++){
			var classSchTemEntities=[];
			var scheduleTime = {};
			var courses = rows.eq(i).find('li');
			var starttime = courses.eq(1).find('input').eq(0).val();
			var endtime = courses.eq(1).find('input').eq(1).val();
			scheduleTime.starttime = starttime;
			scheduleTime.endtime = endtime;			
			
			for(var j = 2;j<courses.length;j++){
				var course={}
				
				course.templateid = courses.eq(j).find('input').data('templateid');
				course.templatename = '';
				course.courseid = courses.eq(j).find('input').data('courseid');
				course.coursename = courses.eq(j).find('input').val();
				course.week = j-1;
				course.color = '';
				classSchTemEntities.push(course);
			}
			scheduleTime.classSchTemEntities = classSchTemEntities;
			scheduleTimeReq.push(scheduleTime);
			schedule.scheduleTimeReq = scheduleTimeReq;
		}
		classscheduledetails.push(schedule);
		data.classscheduledetails = classscheduledetails;
		var url = '';
		if(type=='add' || type=='copy'){
			url = '/classschedule/addschedule';
			data.classscheduledetails[0].scheduleid = '';
			beforeUpdateSchedule(url,data)
		}else if(type=='update'){
			url = '/classschedule/editschedule';
			beforeUpdateSchedule(url,data)
		}
	}

	function updateSchedule(url,schedule){
		
		var options = {
				url:gpath+url,
				data:JSON.stringify(schedule),
				callback:function(result){
					result = JSON.parse(result);
					if (result.success && result.returnCode == "0") {
						$('#static').modal('hide');
						// $('.schedule-edit-modal').hide();
						
						swal({
                            title: "操作成功",
                            text: result.msg,
                            type: "success",
                            confirmButtonText: "确定"
                        });
						setTimeout(getscheduletimes,200);
						var prev = $('.timeline .starttime').text();
						var next = $('.timeline .endtime').text();
						getScheduleScale(prev,next);
					}else{
						$('#staticModalConfirmBtn').bind('click',confirmBtnHandle);
						// $('.schedule-edit-modal').hide();

						swal({
                            title: "操作失败",
                            text: result.msg,
                            type: "error",
                            confirmButtonText: "确定"
                        });
						var period = (+result.extra.period)-1;
						$('#schedule-edit ul.kb_content').eq(period).css('border','1px solid red');

					}
					 hideModal();
				}
				
		};                                                                                                    
		
		Custom.post(options);
	}

$('#schedule-edit ul.kb_content input').on('change',function(){
	$('#schedule-edit ul.kb_content').css('border','none');
});
function hideModal(){
	$('#loadingid').hide();
	$('#staticModalConfirmBtn').removeAttr('disabled');
	$('.schedule-edit-modal').remove();
}
function showModal(){	
	$('#loadingid').show();
	$('#staticModalConfirmBtn').attr('disabled','disabled');
	$('<div class="modal schedule-edit-modal" style-"display:flex;"></div>').appendTo($('body')).css({
		'width':'100%',
		'height':'100%',
		'z-index':999999999,
		'color':'blue',
		'fontSize':'16px',
		'display':'flex',
		'justify-content':'center',
		'align-items': 'center'
	});
}
function beforeUpdateSchedule(url,data){
		var options = {
				url:gpath+'/classschedule/beforeaddSchedule',
				data:JSON.stringify(data),
				callback:function(result){
					result = JSON.parse(result);
					if (result.success && result.returnCode == "0") {
						showModal();
						updateSchedule(url,data);
						
					}else{
						var opt = type=='update'?'修改':'新增';
						var msg = opt+'该课程表可能影响当前正常教学（40分钟内有课程变动），确认'+opt+'请及时通知上课老师！';
						swal({
					        title: "确认"+opt+"该课表?",
					        text: msg,//result.msg,
					        type: "warning",
					        showCancelButton: true,
					        closeOnConfirm: false,
					        confirmButtonText: '确定',
					        cancelButtonText: '取消'
					    },
					    function(isConfirm) {
					        if (isConfirm) {
					        	showModal();
					        	updateSchedule(url,data);
					        }else{
					        	$('#staticModalConfirmBtn').bind('click',confirmBtnHandle);
					        }
					    });
					}
				}
				
		};
		
		Custom.post(options);
	}

	
	function getCourses(){
		var options = {
				url:gpath+'/classschedule/getcourses',
				data:null,
				callback:function(result){
					result = JSON.parse(result);

					if (result.success && result.returnCode == "0") {
						var data = result.data;
						//courseSelectInit(data);
						selectInit('course',data);
					}
				}
				
		};
		
		Custom.get(options);
	}
	
	function gettemplate(){
		var options = {
				url:gpath+'/classschedule/gettemplate',
				data:null,
				callback:function(result){
					result = JSON.parse(result);
					if (result.success && result.returnCode == "0") {
						var data = result.data;
						selectInit('template',data);
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
	
	function courseSelectInit(data){
		var tpl = '	<li class="course-item" data-id="s%">s%</li>';
		var html = '';
		for(var i=0;i<data.length;i++){			
			html += sprintf(tpl,data[i].courseid,data[i].coursename);
		}
		$('.course-list').html(html);
	}
	function templateSelectInit(data){
		var html = '';
		var tpl = '	<li class="course-item" data-id="s%">s%</li>';
		for(var i=0;i<data.length;i++){			
			html += sprintf(tpl,data[i].templateid,data[i].templatename);
		}
		$('.template-list').html(html);
	}
	function selectInit(type,data){
		var html = '';
		var tpl = '	<li style="background-color:s%" class="'+type+'-item" data-templateid="s%" data-templatename="s%" data-id="s%">s%</li>';
		for(var i=0;i<data.length;i++){			
			html += sprintf(tpl,'rgb('+(data[i].rgb||'255,255,255')+')',data[i]['templateid'],data[i]['templatename'],data[i][type+'id'],data[i][type+'name']);
		}
		$('.'+type+'-list').html(html);
		// initScroll2(type);
	}

	function initScroll2(type,top,left,h) {
		if(!$('ul.'+type+'-list').parent().hasClass('slimScrollDiv'))		
	    $('#schedule-edit ul.'+type+'-list').slimScroll({
	        // color: '#ddd',
	        // height: '700px',
	        width:'300px',
	        height: h,
	        distance: '0px',
	        size: '5px',
	        position: 'right',
	        railVisible: false,
	        alwaysVisible: false
	    });
	   $('ul.'+type+'-list').closest('.slimScrollDiv').css({
	    	'position':'absolute',
	    	'overflow':'initial',
	    	// 'height': h,
	    	'top':top,
	    	'left':left
	    });
	};

	function dateInit(){
		laydate.render({
		  elem: '.start_date',
		  value:new Date(),
		  // min:0,
		  theme: 'molv',
		  btns: ['confirm'],
		  done: function(value, date, endDate){
		    // console.log(value); //得到日期生成的值，如：2017-08-18
		    // console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
		    // console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
		    	var endDate = $(".end_date").val();
		    	if(new Date(value)>new Date(endDate)){
		    		$(".date-validate-tip").text('开始时间不能晚于结束时间').show();
		    	}else if(moment(new Date(value)).isBefore(moment(new Date().Format('yyyy-MM-dd')))){
		    		// $(".date-validate-tip").text('开始时间不能早于当前时间').show();
		    	}else{
		    		$(".date-validate-tip").hide();
		    		
		    	}
		  }
		});
		laydate.render({
		  elem: '.end_date',
		  value:new Date(),
		  // min:0,
		  theme: 'molv',
		  btns: ['confirm'],
		  done: function(value, date, endDate){
				var startDate = $(".start_date").val();
		    	if(new Date(value)<new Date(startDate)){
		    		$(".date-validate-tip").text('结束时间不能早于开始时间').show();
		    	}else if(moment(new Date(value)).isBefore(moment(new Date().Format('yyyy-MM-dd')))){
		    		// $(".date-validate-tip").text('结束时间不能早于当前时间').show();
		    	}else{
		    		$(".date-validate-tip").hide();
		    	}
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
//		    startDate:new Date(),
		    onSelect: function(date, inst) {
		    	var endDate = $(".end_date").val();
		    	if(new Date(date)>new Date(endDate)){
		    		$(".date-validate-tip").text('结束时间不能小于开始时间').show();
		    	}else if(new Date(date)<new Date()){
		    		// $(".date-validate-tip").text('开始时间不能小于当前时间').show();
		    	}else{
		    		$(".date-validate-tip").hide();
		    		
		    	}
		        $(".start_date").val(new Date(date).Format('yyyy-MM-dd'));
		    }
		
		});
		
		$(".end_date").datepicker({
		    dateFormat: 'yy-mm-dd',
		    onSelect: function(date, inst) {
		    	var startDate = $(".start_date").val();
		    	if(new Date(date)<new Date(startDate)){
		    		$(".date-validate-tip").text('结束时间不能小于开始时间').show();
		    	}else if(new Date(date)<new Date()){
		    		// $(".date-validate-tip").text('结束时间不能小于当前时间').show();
		    	}else{
		    		$(".date-validate-tip").hide();
		    	}
		        $(".end_date").val(new Date(date).Format('yyyy-MM-dd'));
		    }
		
		});
		
		$(".start_date").val(today);
		$(".end_date").val(today);
		
	}

	function timeInit(){
//		var startTime = moment().startOf('day').format('H:mm');
//		var endTime = moment().endOf('day').format('H:mm');
		
		$(".start_time").timepicker({
			defaultTime: '0:00',
			minuteStep:5,
			showMeridian: false
		});
		$(".end_time").timepicker({
			defaultTime: '0:00',
			minuteStep:5,
			showMeridian: false
		});
//		$(".start_time").val('8:00');
//		$(".end_time").val('8:45');
		
	}
	function timeInitSetting(){
		timeSetting($(".start_time"),'8:00')
		timeSetting($(".end_time"),'8:45')
	}
	function timeSetting(e,val){
		e.val(val);
	}
	
	
});


function isDate( value ) {
	return !/Invalid|NaN/.test(new Date(value).toString()) && /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(value);
}
//名称:中英韩文数字-()（）、
function isValidateScheduleName( s ){
    var regu=/^[A-Za-z0-9_\-—\(\)（）、\u4E00-\u9FA5\uAC00-\uD7AF\u3130–\u318F]+$/;
    var re= new RegExp( regu );
    return re.test(s);
}
