var nav_arr;
$(document).ready(function(){
	//初始化菜单
	var nav_str=sessionStorage.getItem("nav_arr");
	nav_arr=nav_str!=null?JSON.parse(nav_str):
				[{id:"nav_home",href:"index.html",img:"images/index3/icon_home.png",name:"首页",isShow:true},
				{id:"nav_0",href:"indicator1.html",img:"images/index3/icon_economic.png",name:"总体经济分析",isShow:true},
				{id:"nav_1",href:"govfinance.html",img:"images/index3/icon_financial.png",name:"财政收支分析",isShow:true},
				{id:"nav_2",href:"education1.html",img:"images/index3/icon_education.png",name:"教育情况分析",isShow:true},
				{id:"nav_3",href:"shbz1.html",img:"images/index3/icon_social.png",name:"社会保障分析",isShow:true},
				{id:"nav_4",href:"indicator-ylfx-ylwsztfx.html",img:"images/index3/icon_medical.png",name:"医疗卫生分析",isShow:true},
				{id:"nav_5",href:"medicare1.html",img:"images/index3/icon_healthcare.png",name:"医保情况分析",isShow:true},
				//{id:"nav_6",href:"javascript:;",img:"images/index3/icon_talent.png",name:"人才供需分析",isShow:true},
				{id:"nav_6",href:"indicator_jy.html",img:"images/index3/icon_employment.png",name:"就业情况分析",isShow:true}];
	//console.log(nav_arr);
	loadNav();
	$("#"+curNav+" a").addClass("cur_nav");
	
	var $frame  = $('#frame');
	var $wrap   = $frame.parent();
	var options = {
		horizontal: 1,
		itemNav: 'basic',
		speed: 300,
		mouseDragging: 1,
		touchDragging: 1,
		prevPage: $wrap.find('.prev_btn'),
		nextPage: $wrap.find('.next_btn')
	};
	$frame.sly(options);

	//自定义
	if($("#nav_custom").length!=0){
		for(var i in nav_arr){
			if(nav_arr[i].id=='nav_home'){
				continue;
			}
			var html='<li><a href="javascript:;" ><img src="'+nav_arr[i].img+'"></img>'+nav_arr[i].name+'</a></li>';
			$(".custom_item_ul").append(html);
			if(!nav_arr[i].isShow){
				var index=nav_arr[i].id.split("_")[1];
				$(".custom_item_ul li:eq("+index+") a").addClass("unselect");
			}
		}
		$(".custom_item_ul li").each(function(index,element){
			if(index%4==3){
				$(element).css("margin-right","10px");
			}
			$(element).click(function(){
				if($(this).children().hasClass("unselect")){
					$(this).children().removeClass("unselect");
				}else{
					$(this).children().addClass("unselect");
				}
			});
			
		});
		$(".confirm-btn").click(function(){
			$(".custom_item_ul li a").each(function(index,element){
				if($(element).hasClass("unselect")){
					$("#nav_"+index).hide();
				}else{
					$("#nav_"+index).show();
				}
			});
			saveNavSetting();
			$('#myModal').modal('hide');
			$frame.sly('reload');
		});
	}
	
})

function saveNavSetting(){
	for(var i in nav_arr){
		if(nav_arr[i].id=='nav_home'){
			continue;
		}
		var index=nav_arr[i].id.split("_")[1];
		//console.log(index+","+".custom_item_ul li:eq("+index+") a"+","+$(".custom_item_ul li:eq("+index+") a").hasClass("unselect"));
		nav_arr[i].isShow=!$(".custom_item_ul li:eq("+index+") a").hasClass("unselect");
	}
	var json = JSON.stringify(nav_arr); 
	//console.log(json);
	sessionStorage.setItem("nav_arr",json); 
}
function updateNavArr(id,isShow){
	for(var i in nav_arr){
		if(id==nav_arr[i].id){
			nav_arr[i].isShow=isShow;
			break;
		}
	}
}
function loadNav(){
	for(var i in nav_arr){
		var html='<li id="'+nav_arr[i].id+'"><a href="'+nav_arr[i].href+'"><img src="'+nav_arr[i].img+'"></img><p>'+nav_arr[i].name+'</p></a></li>'
		if($("#nav_custom").length!=0){
			$("#nav_custom").before(html);
		}else{
			$("#navbar").append(html);
		}
		if(nav_arr[i].isShow){
			$("#"+nav_arr[i].id).show();
		}else{
			$("#"+nav_arr[i].id).hide();
		}
		
	}
	if($("#nav_custom").length!=0){
		$("#nav_custom").show();
	}
	//隐藏左右箭头
	$(".nav_btn").hide();	
}
