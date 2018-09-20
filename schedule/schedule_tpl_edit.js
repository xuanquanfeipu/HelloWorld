$(function(){
	var selectType = sessionStorage.getItem('selectType');
	var type =  sessionStorage.getItem('tpl.type');
	var curCourse = JSON.parse(sessionStorage.getItem('course-data'));
	if(selectType==1){
		gettemplate();
		
	}else{
		getCourses();
		
	}
	
	
	function setCourse(data){
		
		if(type=='add' || !curCourse){
			
		}else{
			$('#schedule-tpl-edit .schedule-tpl-edit-header input').val(data.coursename.trim());
			$('#template-select').val(data.templateid).trigger('change');	
			$('#schedule-tpl-edit .schedule-tpl-edit-header input').data('courseid',data.courseid);
		}
	}
		
	$('#staticModalConfirmBtn').unbind('click');
	$('#staticModalConfirmBtn').bind('click',confirmBtnHandle1);
	
	$('#schedule-tpl-edit .schedule-tpl-edit-header input').on('keyup',function(){
		var coursename = $(this).val();
		var isValid = isValidateName( coursename );
		validateCourseName(coursename,isValid);
		// if(coursename==''){
		// 	$('.course-validate').show().text('课程名称不能为空');
		// }else if(coursename.trim().length>30){
		// 	$('.course-validate').show().text('课程名称长度不能超过30个字符');
		// }else if(!isValid){
		// 	$('.course-validate').show().text('课程名称不能包含除了“中英文 数字 -()（）、”以外的字符')
			
		// }else{
		// 	$('.course-validate').hide()
		// }
	});
	function confirmBtnHandle1(){
		var course = {};
		var coursename = $('#schedule-tpl-edit .schedule-tpl-edit-header input').val();
		var isValid = isValidateName( coursename );
		var isValidOk = validateCourseName(coursename,isValid);
		if(!isValidOk) return;
		// if(coursename==''){
		// 	$('.course-validate').show().text('课程名称不能为空');
		// 	return;
		// }else if(coursename.trim().length>30){
		// 	$('.course-validate').show().text('课程名称长度不能超过30个字符');
		// 	return;
		// }else if(!isValid){
		// 	$('.course-validate').show().text('课程名称不能包含除了“中英文 数字 -()（）、”以外的字符')
			
		// }else{
		// 	$('.course-validate').hide()
		// }
		$(this).unbind('click');
		var templateid = $('#template-select').val();
		course = {coursename,templateid};
		var url = '';
		if(type=='add' ){
			url = '/classschedule/addcourse';
			updateCourse(url,course)
		}else if(type=='update'){
			course.courseid = $('#schedule-tpl-edit .schedule-tpl-edit-header input').data('courseid');
			url = '/classschedule/editcourse';
			updateCourse(url,course)
		}
	}

	function validateCourseName(coursename,isValid){
		if(coursename==''){
			$('.course-validate').show().text('课程名称不能为空');
			return false;
		}else if(coursename.trim().length>30){
			$('.course-validate').show().text('课程名称长度不能超过30个字符');
			return false;
		}else if(!isValid){
			$('.course-validate').show().text('课程名称不能包含除了“中英文 数字 -()（）、”以外的字符')
			return false;
		}else{
			$('.course-validate').hide();
			return true;
		}
		
	}

	function updateCourse(url,course){
//		$.param(course)
		var options = {
//				headers:{
//					contentType:'application/x-www-form-urlencoded; charset=UTF-8'
//				},
				url:gpath+url,
				data:JSON.stringify(course),
				callback:function(result){
					result = JSON.parse(result);
					if (result.success && result.returnCode == "0") {
						$('#static').modal('hide');
						$('#schedule-querytype-select').trigger('change');
						swal({
                            title: "操作成功",
                            text: result.msg,
                            type: "success",
                            confirmButtonText: "确定"
                        });
					}else{
						$('#staticModalConfirmBtn').bind('click',confirmBtnHandle1);
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

	
	function getCourses(){
		var options = {
				url:gpath+'/classschedule/getcourses',
				data:null,
				callback:function(result){
					result = JSON.parse(result);

					if (result.success && result.returnCode == "0") {
						var data = result.data;
						var list=[];
						for(var i = 0; i < data.length; i++){							
							list.push({id:data[i].courseeid,text:data[i].coursename});
						}
						selectInit('course',list);
//						setCourse(curCourse);
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
						var list=[];
						for(var i = 0; i < data.length; i++){							
							list.push({id:data[i].templateid,text:data[i].templatename});
						}
						selectInit('template',list);
						setCourse(curCourse);
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
	
	
	function selectInit(selectType,list){
		$('#'+selectType+'-select').prev().hide();
		$('#'+selectType+'-select').show();
		$('#'+selectType+'-select').select2({
		    data: list,
		    width: '280px',
		    minimumResultsForSearch: -1, //去掉搜索框
		    escapeMarkup: function(m) {
		        return m;
		    },
		    placeholder: '请选择'
		});
	}
	
});


function isValidateName( s ){
    var regu=/^[A-Za-z0-9_\-—\(\)（）、\u4E00-\u9FA5\uAC00-\uD7AF\u3130–\u318F]+$/;
    var re= new RegExp( regu );
    return re.test(s);
}
