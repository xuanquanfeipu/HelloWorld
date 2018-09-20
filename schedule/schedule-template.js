var h = $(window).height();
$('#schedule-template').height(h-80);
// initScroll() ;

function initScroll() {
    $('.schedule-template .tab_body').slimScroll({
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
function sprintf(text){
		var i=1,args = arguments;
		return text.replace(/s%/g,function(){
			return (i<args.length)?args[i++]:'';
		});
}

var queryTypeList = [{
	id: 1,
	text: '按课程查询模板'
	},{
	id: 2,
	text: '按模板查询课程'
	}];
$('#schedule-querytype-select').select2({
    data: queryTypeList,
    width: '200px',
    minimumResultsForSearch: -1, //去掉搜索框
    escapeMarkup: function(m) {
        return m;
    },
    placeholder: '请选择类型'
});
$('#schedule-querytype-select').on('change', queryTypeChange);
$('#schedule-querytype-select').val(queryTypeList[0].id).trigger("change");

$('.schedule-template-opt-back').on('click',function(){
	var url = 'assets/scripts/pages/iclass/schedule.html';
	Custom.getPage(url,'main-content');
});
function queryTypeChange(){
	var selected = $(this).val();
	sessionStorage.setItem('selectType',selected);
	if(selected == 1){
		$('.schedule-template-opt').show();
		getCourses();
	}else{
		$('.schedule-template-opt').hide();
		$('.schedule-template-opt').first().show();
		getTemplateAndCourse();
	}
}

function getCourses(){
	var options = {
			url:gpath+'/classschedule/getcourses',
			data:null,
			callback:function(result){
				result = JSON.parse(result);

				if (result.success && result.returnCode == "0") {
					var data = result.data;
					data = data.map(function(e,i){
						return [e.courseid,e.templateid||'',e.coursename||'',e.templatename||'',e.os||'','rgb('+ e.rgb +')']
					});
					showRelByCourse(data);
				}
			}
			
	};
	
	Custom.get(options);
}


function getTemplateAndCourse(){
	var options = {
			url:gpath+'/classschedule/getTemplateAndCourse',
			data:null,
			callback:function(result){
				result = JSON.parse(result);
				if (result.success && result.returnCode == "0") {
					var data = result.data;
					data = data.map(function(e,i){
						var courseStr = '';
						var cssStr='';
						var marginTop = '0px';
						var len = e.courses.length;
						var h =40;
						for(var j=0;j<len;j++){
							courseStr+='<li class="course-item">';
							courseStr+=e.courses[j].coursename;
							courseStr+='</li>';
							
						}
						len = len?len:1;
						cssStr='height:'+len*h+'px;'+'line-height:'+len*h+'px;';
//						marginTop = ( len*h - 14 )/2+'px';
						marginTop = '0px';
						return [e.templateid||'',cssStr,e.templatename||'',cssStr,e.os||'',cssStr,'rgb('+ e.rgb +')',marginTop,cssStr,courseStr]
					});
					showRelByTemplate(data);
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
function showRelByTemplate(data){
	var tpl_head = `<div class="tab_header"><ul class="kb_weeknav_ul ">
	<li class="kb_weeknav">
		<p class="weeknav_tex">模板名称</p>
	</li>
	<li class="kb_weeknav">
		<p class="weeknav_tex">模板操作系统</p>
	</li>
	<li class="kb_weeknav">
		<p class="weeknav_tex">模板对应颜色</p>
	</li>
	<li class="kb_weeknav">
		<p class="weeknav_tex">课程名称</p>
	</li>
</ul></div>`;

var tpl = `<ul class="kb_content clear" data-tplid=s%>	
    <li class="kb_course " style="s%">  
			<div name="schedule-template_cell">
				<a  href="#" class="">
           		<p class="kb_course_tex" title="">
           			s%
           		</p>
           	</a>               			
   		</div>
	</li>
	<li class="kb_course course_tpl" style="s%">  
			<div name="schedule-template_cell">
				<a  href="#" class="">
           		<p class="kb_course_tex" title="">s%</p>
           	</a>               			
   		</div>
	</li>
	<li class="kb_course " style="s%">  
		<div name="schedule-template_cell">
			<a  href="#" class="">
	   		<p class="kb_course_tex" title=""><div class="tempate-color" style="background:s%;margin-top:s%"></div></p>
	   	</a>               			
		</div>
	</li>	 
	<li class="kb_course " style="s%">  
		<ul class="course-lst">
			s%
		</ul>		
	</li>	 
	
</ul> `;
	var html="";
	html += tpl_head;
	$('#schedule-template .schedule-template').html(html);
	html = '<div class="tab_body">';
	for(var i =0;i<data.length;i++){		
		html += sprintf(tpl,...data[i]);
	}
	html+='</div>';
	$('#schedule-template .schedule-template').append(html);
	$('.schedule-template li.kb_weeknav,.schedule-template li.kb_course').css('width','25%');
	
	var rows = $('#schedule-template ul.kb_content');
	for(var i = 0; i < rows.length; i++){
		var cols = rows.eq(i).find('.course-lst');
		var h = 40,hArr = [h];
		for(var j = 0; j < cols.length; j++){
			hArr.push(cols.eq(j).height());
			var courses = cols.find('li');
			for(var k = 0; k < courses.length; k++){
				if(courses.eq(k).height()>41){
					courses.eq(k).css({
						'height':courses.eq(k).height(),
						'line-height':'20px',
						'padding':'0 6px'
					});
				}
			}
		}
		h = Math.max.apply(null,hArr);
		rows.eq(i).find('li.kb_course').height(h);
	}
	initScroll() ;
} 
function showRelByCourse(data){
	var tpl_head = `<div class="tab_header"><ul class="kb_weeknav_ul ">
		<li class="kb_weeknav">
			<p class="weeknav_tex checkbox checkbox-inline">
				<input id="opertator-checkAll" type="checkbox" style="display:none;">
			</p>
		</li>
		<li class="kb_weeknav">
			<p class="weeknav_tex">课程名称</p>
		</li>
		<li class="kb_weeknav">
			<p class="weeknav_tex">模板名称</p>
		</li>
		<li class="kb_weeknav">
			<p class="weeknav_tex">模板操作系统</p>
		</li>
		<li class="kb_weeknav">
			<p class="weeknav_tex">模板对应颜色</p>
		</li>
	</ul></div>`;
	
	var tpl = `<ul class="kb_content clear" data-id=s%  data-tplid=s%>
		 <li class="kb_course ">  
			<div name="schedule-template_cell">
				<a  href="#" class="">
		    		<p class="kb_course_tex " title="">
				        <input type="checkbox">
		    		</p>
		    	</a>               			
	    	</div>
		</li>
	    <li class="kb_course ">  
				<div name="schedule-template_cell">
					<a  href="#" class="">
	           		<p class="kb_course_tex" title="">
	           			s%
	           		</p>
	           	</a>               			
	   		</div>
		</li>
		<li class="kb_course course_tpl">  
				<div name="schedule-template_cell">
					<a  href="#" class="">
	           		<p class="kb_course_tex" title="">s%</p>
	           	</a>               			
	   		</div>
		</li>
		<li class="kb_course ">  
				<div name="schedule-template_cell">
					<a  href="#" class="">
	           		<p class="kb_course_tex" title="">s%</p>
	           	</a>               			
	   		</div>
		</li>	 
		<li class="kb_course ">  
				<div name="schedule-template_cell">
					<a  href="#" class="">
	           		<p class="kb_course_tex" title=""><div class="tempate-color" style="background:s%;"></div></p>
	           	</a>               			
	   		</div>
		</li>	 
	</ul> `;
	
	var html='';
	html += tpl_head;
	$('#schedule-template .schedule-template').html(html);
	html = '<div class="tab_body">';
	for(var i =0;i<data.length;i++){
		
		html += sprintf(tpl,...data[i]);
	}
	html+='</div>';
	$('#schedule-template .schedule-template').append(html);
	
	var rows = $('#schedule-template ul.kb_content');
	for(var i = 0; i < rows.length; i++){
		var cols = rows.eq(i).find('li');
		var h = 40,hArr = [];
		for(var j = 0; j < cols.length; j++){
			hArr.push(cols.eq(j).height());
		}
		h = Math.max.apply(null,hArr);
		cols.height(h);
	}
	initScroll() ;
}

function deletecourse(courseids){
	var options = {
			url:gpath+'/classschedule/deletecourse',
			data:JSON.stringify(courseids),
			callback:function(result){
				result = JSON.parse(result);
				if (result.success && result.returnCode == "0") {
					$('#schedule-querytype-select').trigger('change');
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
	
	Custom.post(options);
}

$('.schedule-template-opt-add').on('click', function() {
	sessionStorage.setItem('tpl.type', 'add');
    var url = 'assets/scripts/pages/iclass/schedule_tpl_edit.html';
    //Custom.getPage(url, 'main-content');
    Custom.getPage(url, '',function(result){
    	
    	Custom.easyModal({
    		width:600,
    		height:400,
    		title: "新增课程",
    	    content: result,
    	    callback: function() {
    	    }
    		
    	});
    });
});

$('.schedule-template-opt-modify').on('click', function() {
	
	var courses = $('p.kb_course_tex input[type=checkbox]:checked');
	if(courses.size()>1){
		swal({
            title: "提示",
            text: '一次只能修改一门课程',
            type: "warning",
            confirmButtonText: "确定"
        });
	}else if(courses.size()==0){
		swal({
            title: "提示",
            text: '请选择一门要修改的课程',
            type: "warning",
            confirmButtonText: "确定"
        });
	}else{
		sessionStorage.setItem('tpl.type', 'update');
		var course = courses.closest('ul');
		var courseid = course.data('id');
		var templateid = course.data('tplid');
		var coursename = course.find('.kb_course').eq(1).find('.kb_course_tex').text();
		var templatename = course.find('.kb_course').eq(2).find('.kb_course_tex').text();
		var courseData = {courseid,templateid,coursename,templatename};
		sessionStorage.setItem('course-data',JSON.stringify(courseData));
		
		var url = 'assets/scripts/pages/iclass/schedule_tpl_edit.html';
		//Custom.getPage(url, 'main-content');
		Custom.getPage(url, '',function(result){
			
			Custom.easyModal({
				width:600,
				height:400,
				title: "修改课程",
				content: result,
				callback: function() {
				}
			
			});
		});
	}
});

$('.schedule-template-opt-delete').on('click', function() {
	var courses = $('p.kb_course_tex input[type=checkbox]:checked');
	if(courses.size()==0){
		swal({
            title: "提示",
            text: '请至少选择一门要删除的课程',
            type: "warning",
            confirmButtonText: "确定"
        });
	}else{
        swal({
            title: "确认删除选中课程？",
            //text: "确认删除选中记录?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: false,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        },
        function(isConfirm) {
            if (isConfirm) {
            	var courseData=[];
        		for(var i=0;i<courses.length;i++){
        			var courseid = courses.eq(i).closest('ul').data('id');
        			var courseItem ={
        				courseid:courseid
        			}
        			courseData.push(courseItem);
        		}
        		deletecourse(courseData);               
            }
        });
		
	}
});

$('.schedule-template-opt-release').on('click', function() {
	var courses = $('p.kb_course_tex input[type=checkbox]:checked');
	var courseid = courses.closest('ul').data('id');
    var coursename = courses.closest('ul').find('.kb_course').eq(1).find('.kb_course_tex').text();
    var templatename = courses.closest('ul').find('.kb_course').eq(2).find('.kb_course_tex').text();
	if(templatename==''){

		swal({
            title: "提示",
            text: '你选择的课程的没有模板',
            type: "warning",
            confirmButtonText: "确定"
        });
        return;
	}
	if(courses.size()>1){
		swal({
            title: "提示",
            text: '一次只能解除一门课程的模板',
            type: "warning",
            confirmButtonText: "确定"
        });
	}else if(courses.size()==0){
		swal({
            title: "提示",
            text: '请选择一门要解除模板的课程',
            type: "warning",
            confirmButtonText: "确定"
        });
	}else{
		swal({
            title: "确认解除该课程的模板？",
            //text: "确认删除选中记录?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: false,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        },
        function(isConfirm) {
            if (isConfirm) {
        		
        		var url = '/classschedule/editcourse';
            	var course = {courseid,coursename};
        		course.templateid = '';
            	var options = {
					url:gpath+url,
					data:JSON.stringify(course),
					callback:function(result){
						result = JSON.parse(result);
						if (result.success && result.returnCode == "0") {
							$('#schedule-querytype-select').trigger('change');
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
			
				Custom.post(options);        
            }
        });
	}
});
