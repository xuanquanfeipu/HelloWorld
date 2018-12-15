/**
 * Created by tanxin on 2017/4/6.
 */
$(function(){
    var pendingList = ['ylbxfx', 'gsqkfx', 'rcgxfx'];
    var menuList = ['gdzctz', 'ztjjfx', 'rkzhfx', 'jmsrfx', 'jyqkfx', 'ylwsfx', 'czsrfx', 'shbzfx'];
    var tempMenuList = new Array();
    var tempPendingList = new Array();
    var menuDom, pendingDom;
    var page = 1;

    init();

    function init(){
        $(".project_two .li_piece, .project_two .li_piece").hover(function(){
            $(this).children(".li_piece_circle").css("background-size", "100% 100%");
        },function(){
            $(this).children(".li_piece_circle").css("background-size", "90% 90%");
        });
        //上一页按钮事件
        bindPreBtnListener();
        //下一页按钮事件
        bindNextBtnListener();

        //自定义按钮事件
        $("#customBtn").click(function(){
            tempMenuList = deepCopy(menuList);
            tempPendingList = deepCopy(pendingList);
            menuDom = $("#menuWrap").html();
            pendingDom = $("#pendingList").html();
            $(this).animate({top:'-300px'}, 'slow');
            $("#floatWindow").slideDown();
            $(" .project_two .li_piece:not(.zdy)").addClass("chunk_zdy");
            //删除按钮事件
            bindDeleteListener();
        });
        //取消按钮事件
        $("#cancelBtn").click(function(){
            $("#menuWrap").html(menuDom);
            $("#pendingList").html(pendingDom);
            $("#floatWindow").slideUp();
            $("#preBtn").unbind("click");
            $("#nextBtn").unbind("click");
            $("#customBtn").unbind("click");
            $("#cancelBtn").unbind("click");
            $("#okBtn").unbind("click");
            init();
            if(tempMenuList.length>5){
                $("#preBtn").addClass("tab_left").removeClass("tab_left_grey");
                $("#nextBtn").addClass("tab_right_grey").removeClass("tab_right");
                page = 2;
            }else{
                $("#preBtn").addClass("tab_left_grey").removeClass("tab_left");
                $("#nextBtn").addClass("tab_right_grey").removeClass("tab_right");
                page = 1;
            }
            menuList = tempMenuList;
            pendingList = tempPendingList;
            bindMenuClickListener();
        });
        //确认按钮事件
        $("#okBtn").click(function(){
            $(".chunk_zdy").unbind("click");
            $("#customBtn").animate({top:'0px'}, 'slow');
            $("#floatWindow").slideUp();
            $(" .project_two .li_piece:not(.zdy)").removeClass("chunk_zdy");
            bindMenuClickListener();
        });
        //待选列表点击事件
        bindInsertListener();
        //指标点击跳转到详情页事件
        bindMenuClickListener();
    }

    //绑定删除按钮事件
    function bindDeleteListener(){
        $(".chunk_zdy").unbind("click");
        $(".chunk_zdy").click(function(){
            $(this).unbind("click");
            var munuListId = $(this).parent().attr("id");
            var moduleName = $(this).children("p").html();
            var moduleClass = $(this).attr("class").split(" ")[2];
            $(this).animate({top:'-300px'}, 'slow', function(){
                $(this).remove();
                if(munuListId=="menuList1"){
                    $("#menuList1").append($("#menuList2").children().first());
                }
            });
            var html = '<li class="analyze_li '+moduleClass+'" style="display:none;top:120px">'+
                '<span class="shade"></span>'+
                '<p>'+moduleName+'</p>'+
                '</li>';
            $("#pendingList").append(html);
            $("#pendingList ."+moduleClass).show().animate({top: '0px'}, 'slow');
            if(menuList.length <= 6){
                $("#nextBtn").addClass("tab_right_grey").removeClass("tab_right").unbind("click");
            }
            bindInsertListener();
            menuList.removeByValue(moduleClass);
            pendingList.push(moduleClass);
            console.log(pendingList);
        });
    }

    //绑定添加按钮事件
    function bindInsertListener(){
        $("#pendingList li").unbind("click");
        $("#pendingList li").click(function(){
            $(this).unbind("click");
            var moduleName = $(this).children("p").html();
            var moduleClass = $(this).attr("class").split(" ")[1];
            $(this).animate({top:'120px'}, 'slow', function(){
                $(this).remove();
            });
            var leftAttr = '0%';
           if(page == 2){
                leftAttr = '-100%;';
            }
            var html =  '<li class="col-md-2 li_piece '+moduleClass+' chunk_zdy" style="left: '+leftAttr+'; top:-300px; display:none;">'+
                '<div class="li_piece_circle" style="background-size: 90% 90%;"></div>'+
                '<p>'+moduleName+'</p>'+
                '</li>';

            if(page == 1){
                if(menuList.length<5){
                    $("#customBtn").before(html);
                    $("#customBtn").prev().show().animate({top: '0px'}, 'slow');
                }else if(menuList.length==5){
                    $("#customBtn").before(html);
                    $("#menuList2").append($("#menuList1").children().last());
                    $("#menuList1").children().last().show().animate({top: '0px'}, 'slow');
                    $("#nextBtn").addClass("tab_right").removeClass("tab_right_grey");
                    bindNextBtnListener();
                }else{
                    $("#menuList2").prepend($("#menuList1").children().last());
                    $("#menuList1").append(html);
                    $("#menuList1").children().last().show().animate({top: '0px'}, 'slow');
                }
            }else{
                $("#customBtn").before(html);
                $("#customBtn").prev().show().animate({top: '0px'}, 'slow');
            }
            //删除按钮事件
            bindDeleteListener();

            pendingList.removeByValue(moduleClass);
            menuList.push(moduleClass);
            console.log(menuList);
        });
    }
    
    //指标点击跳转到详情页事件
    function bindMenuClickListener(){
    	$("#menuWrap li").not("#customBtn").unbind("click").click(function(){
        	window.location.href="indicator2-1.html";	
        });
    }

    //上一页按钮事件
    function bindPreBtnListener(){
        $("#preBtn").click(function(){
            if(page==2){
                page = 1;
                $(this).removeClass("tab_left").addClass("tab_left_grey");
                $("#nextBtn").removeClass("tab_right_grey").addClass("tab_right");
                $("#menuList1 li").animate({left:'0%'}, "slow");
                $("#menuList2 li").animate({left:'0%'}, "slow");
            }
        });
    }

    //下一页按钮事件
    function bindNextBtnListener() {
        $("#nextBtn").click(function () {
            if(page == 1 && menuList.length>5){
                page = 2;
                $(this).removeClass("tab_right").addClass("tab_right_grey");
                $("#preBtn").removeClass("tab_left_grey").addClass("tab_left");
                $("#menuList1 li").animate({left: '-100%'}, "slow");
                $("#menuList2 li").animate({left: '-100%'}, "slow");
            }
        });
    }
});

Array.prototype.removeByValue = function(val) {
    for(var i=0; i<this.length; i++) {
        if(this[i] == val) {
            this.splice(i, 1);
            break;
        }
    }
};

function deepCopy(arr) {
    var res = []
    for (var i = 0; i < arr.length; i++) {
        res.push(arr[i])
    }
    return res
}
