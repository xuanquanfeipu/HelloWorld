function addHoverEvent(element,_top,_left){
	$("."+element).hover(function(){
	    
	    //停止当前所有动画
		$(".detail").stop(true).animate({
		  left:'0%',
		  top:'0%',
		  opacity: 'hide',
		},100);
		
		/*$(".detail").stop(true);
		$(".detail").addClass('hidden');
		$(".detail").css('left','0%');
		$(".detail").css('left','0%');*/
		
		//$("."+element+" .detail").removeClass('hidden');
		$("."+element+" .detail").animate({
		  left:_left,
		  top:_top,
		  opacity: 'show',
		},800);
	},function(){
		$("."+element+" .detail").animate({
		  left:'0%',
		  top:'0%',
		  opacity: 'hide',
		},500);
	});
}

function removeHoverEvent(element){
	$("."+element).unbind('mouseenter').unbind('mouseleave');
}

function customClick(){
    $(".detail").css('display','none');
    $(".detail").addClass('hidden');
	$(".btn_box").removeClass('hidden');
	
	//所有的图标都显示
	for(var i=0;i<elementStatusArray.length;i++){
	   var name = elementStatusArray[i].name;
	   var ischoosed = elementStatusArray[i].ischoosed;
	   $("."+name).css('visibility','visible');
	   $("."+name +" .check").addClass('hidden');
	   $("."+name +" .close").addClass('hidden');
	   if(!ischoosed){
	     $("."+name +" .check").removeClass('hidden');
	     $("."+name).addClass('noCheck');
         //$("."+name +" .close").addClass('hidden');
	   }
	   else
	   {
	     $("."+name).removeClass('noCheck');
	     $("."+name +" .close").removeClass('hidden');
	   }
	   
	}
	//$(".close").removeClass('hidden');
	removeAllHoverEvents()
}

function del(index){

   elementStatusTmpArray[index].ischoosed = false;
   var name = elementStatusArray[index].name;
   $("."+name).addClass('noCheck');
   $("."+name +" .close").addClass('hidden');
   $("."+name +" .check").removeClass('hidden');
  
}

function add(index){
  
   elementStatusTmpArray[index].ischoosed = true;
   var name = elementStatusArray[index].name;
   $("."+name).removeClass('noCheck');
   $("."+name +" .check").addClass('hidden');
   $("."+name +" .close").removeClass('hidden');
}

function cancel(){
   $(".detail").addClass('hidden');
   $(".btn_box").addClass('hidden');
   $(".close").addClass('hidden');
   $(".check").addClass('hidden');
   $(".noCheck").removeClass('hidden');
   $(".noCheck").removeClass('noCheck');
   addAllHoverEvents();
   //根据数组内容展示非隐藏的
   showApplyEvent()
}

function ok(){
  $(".close").addClass('hidden');
  $(".detail").addClass('hidden');
  $(".btn_box").addClass('hidden');
  addAllHoverEvents();
  
  for(var i=0;i<elementStatusTmpArray.length;i++)
  {
	   var ischoosed = elementStatusTmpArray[i].ischoosed;
	   elementStatusArray[i].ischoosed = ischoosed;
  }
  showApplyEvent()
}

function showApplyEvent(){
    for(var i=0;i<elementStatusArray.length;i++)
	{
	   var element = elementStatusArray[i].name;
	   var ischoosed = elementStatusArray[i].ischoosed;
	   if(!ischoosed)
	   {
	     $("."+element).css('visibility','hidden');
	   }
	}
}

function removeAllHoverEvents(){
    removeHoverEvent('gdzc');
	removeHoverEvent('custom');
	removeHoverEvent('eduqk');
	removeHoverEvent('ztjj');
	removeHoverEvent('rkzh');
	removeHoverEvent('jmsr');
	removeHoverEvent('ylws');
	removeHoverEvent('czsr');
	removeHoverEvent('shbz');
	removeHoverEvent('ybqk');
	removeHoverEvent('gsqk');
	removeHoverEvent('rcgx');
	removeHoverEvent('jyqk');
}


function addAllHoverEvents(){
	addHoverEvent('ztjj','0%','100%');
	addHoverEvent('custom','0%','-100%');
	addHoverEvent('eduqk','0%','-100%');
	addHoverEvent('gdzc','0%','-100%');
	addHoverEvent('rkzh','100%','0%');
	addHoverEvent('jmsr','-100%','0%');
	addHoverEvent('ylws','100%','0%');
	addHoverEvent('czsr','-100%','0%');
	addHoverEvent('shbz','100%','0%');
	addHoverEvent('ybqk','-100%','0%');
	addHoverEvent('gsqk','0%','-100%');
	addHoverEvent('rcgx','0%','-100%');
	addHoverEvent('jyqk','-100%','0%');
}
