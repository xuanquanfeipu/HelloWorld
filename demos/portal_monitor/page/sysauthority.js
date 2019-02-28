$(function(){
	var pageSize = autoPageSize();	
	var request = function(param, success, failed, isAsync){
		$.ajax({
			url : '/ipeg-web/requestDispatcher',
			type : 'post' ,
			data : param,
			async : isAsync,
			dataType : 'json' ,
			cache : false ,
			success : function(result){
				if(result.status == 0 && success){					
					success(result.data);
				}else if(result.status ==100){					
					$("#msg")[0].innerHTML = "<div>当前用户无权限，请重新尝试。</div>";
					alertInfoWindow('msgWin','错误');
					$('#datagrid').datagrid("loadData", []);
				}else if(result.status != 0 && failed){					
					failed();
				}
			},
			error : function(){
				if(failed){
					failed();
				}
			}
		});
	}	
		
	var asyncRequest = function(param, success, failed){
		request(param, success, failed, true);
	};
	
	var syncRequest = function(param, success, failed){
		request(param, success, failed, false);
	};
	
	var template = "<div style='align:center;margin-top:10px;margin-left:100px;'><input class='sysSe' sysname='{name}' signature='${signature}' type='checkbox' ${check}><span style='margin-left:10px;'>{name}</span></div>";
	var columns = [[{field: 'id',hidden:true,align: 'left'},
					{field: 'username',title: '用户名',width: '10%',align: 'center',
					formatter:function(value){return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'dept',title: '所属部门',width: '12%',align: 'left',styler: function (){return "padding-left: 17px;";}},
					{field: 'roles',title: '角色',width: '25%',align: 'left',styler: function (){return "padding-left: 17px;";}},
					{field: 'permitSystem',title: '接入系统',width: '40%',align: 'left',styler: function (){return "padding-left: 17px;";},
					formatter: function (value) {return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'signature',hidden:true,align: 'left'},
					{field: 'op',title: '操作',width: '13%',align: 'center',formatter:function(value,row,index){if(row)return '<a href="#" class="modify-text-style">修改</a>'},styler:function(){return {style:'cursor:pointer'}}}
					]];
	var serverS = getMode();
	if(serverS.ac != 1){
		columns = [[{field: 'id',hidden:true,align: 'center'},
					{field: 'username',title: '用户名',width: '20%',align: 'center',
					formatter:function(value){return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'dept',title: '所属部门',width: '20%',align: 'left',styler: function (){return "padding-left: 17px;";}},
					{field: 'roles',title: '角色',width: '20%',align: 'left',styler: function (){return "padding-left: 17px;";}},
					{field: 'permitSystem',title: '接入系统',width: '40%',align: 'left',styler: function (){return "padding-left: 17px;";},
					formatter: function (value) {return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'signature',hidden:true,align: 'center', align: 'left'},					
				  ]]
	}
	$('#datagrid').datagrid({
		pageSize : autoPageSize(),
		pageList : [10, 20, 30, 50, 100], 
		striped : true,
		singleSelect: true,
		selectOnCheck : true,
		pagination : true,
		columns : columns,
		onClickCell : function(index,field,value){
			if(field == "op"){
				var currentRow = $("#datagrid").datagrid("getData")["rows"][index];
				var selectSys = currentRow["signature"].split(",");
				var temp = {};
				for(var i = 0; i < selectSys.length; i++){
					temp[selectSys[i]] = true;
				}
				
				syncRequest({
					commandCode:19000042					
				}, function(data){
					$("#system").empty();
					var html = "";
					for(var i = 0; i < data.length; i++){
						var row = template.replace(/{name}/g, data[i].name);
						row = row.replace("${signature}", data[i].signature);
						row = row.replace("${check}", temp[data[i].signature] ? "checked" : "");
						html += row;
					}
					$("#system").append(html);
					$("#system").attr("userid",currentRow.id);
					$("#system").attr("index",index);
					$("#system").attr("username",currentRow["username"]);
					$("#win").window("open");					
				});				
			}
		},
		onLoadSuccess: function (data) {
			$('.datagrid-header-row td[field="dept"] div').css("text-align", "center");
			$('.datagrid-header-row td[field="roles"] div').css("text-align", "center");
			$('.datagrid-header-row td[field="permitSystem"] div').css("text-align", "center");
			$('.datagrid-header-row td[field="signature"] div').css("text-align", "center");
			if (data.total == 0) {
				$('#datagrid').datagrid('appendRow', 
				{username: '<div style="text-align:center;color:gray">没有查询到相关记录！</div>' }).datagrid('mergeCells',{index: 0, field: 'username', colspan: 6 });
				var pager = $('#datagrid').datagrid('getPager'); 
				$(pager).pagination({ 
					pageSize: pageSize,
					displayMsg: '共 {total} 条记录'
				})
				$('.datagrid-td-merged td[field="username"]').css({"padding-right": "8px"});
			}else{
                $('.datagrid-header-row td[field="dept"]').css({"padding-left": "9px", "padding-right": "8px"});
				$('.datagrid-header-row td[field="roles"]').css({"padding-left": "9px", "padding-right": "8px"});
				$('.datagrid-header-row td[field="permitSystem"]').css({"padding-left": "9px", "padding-right": "8px"});
				$('.datagrid-header-row td[field="signature"]').css({"padding-left": "9px", "padding-right": "8px"});
			}
		}
	});
	
	$("#commit").click(function(){
		var tempSign = [];
		var tempNames = [];
		$(".sysSe:checked").each(function(index, value){
			tempSign.push($(value).attr("signature"));
			tempNames.push($(value).attr("sysname"));
		});
		var id = $("#system").attr("userid");
		var index = $("#system").attr("index");
		asyncRequest({
			commandCode:19000041,
			id : id,
			username:$("#system").attr("username"),
			signatures : tempSign.join(",")
		}, function(data){
			$("#datagrid").datagrid("updateRow", {
				index:index,
				row: {
					permitSystem: tempNames.join(","),
					signature:tempSign.join(",")
				}
			});
			$("#win").window("close");
		});
	});
	
	$("#query").click(function(){
		queryExecute();
	});
	
	$("#refresh").click(function(){
		$("#input_sn").val("");
		var pageOption = $('#datagrid').datagrid('getPager').pagination("options");
		asyncRequest({
			commandCode:19000040,
			start:1,
			count:pageOption.pageSize
		}, function(data){
			$('#datagrid').datagrid('getPager').pagination({
				pageSize: pageSize,
				displayMsg: '共 {total} 条记录'
			});
			$('#datagrid').datagrid("loadData", data);
		}, function(){
			getErrorMsg();
		})
	});
	
	$("#cancel").click(function(){
		$("#win").window("close");
	});
	
	$('#datagrid').datagrid('getPager').pagination({        
		onSelectPage: function (pageNum, pageSize) {
			var name = $("#input_sn").val();
			
			asyncRequest({
				commandCode:19000040,
				start:pageNum,
				count:pageSize,
				username:name.trim()
			}, function(data){
				$('#datagrid').datagrid('getPager').pagination({
					displayMsg: '共 {total} 条记录'
				});
				$('#datagrid').datagrid("loadData", data);
			}, function(){
				getErrorMsg();
			})
		}
	});
	
	asyncRequest({
		commandCode:19000040,
		start:1,
		count:autoPageSize(),
	}, function(data){
		$('#datagrid').datagrid('getPager').pagination({
			displayMsg: '共 {total} 条记录'
		});
		$('#datagrid').datagrid("loadData", data);
	}, function(){
		getErrorMsg();
	})	
		
	$("#win").show(); 
	$("#win").window({
		top: '25%',
		left: '35%',
		closed:true,
		collapsible: false, 
		minimizable: false, 
		maximizable: false,
		resizable: false, 
		shadow: false, 
		modal: true,
		width: 360,
		title: "请选择子系统"
	});	 

	function queryExecute(){
		var name = $("#input_sn").val();
		var pageOption = $('#datagrid').datagrid('getPager').pagination("options");
		asyncRequest({
			commandCode:19000040,
			start:1,
			count:pageOption.pageSize,
			username:name.trim()
		}, function(data){
			$('#datagrid').datagrid('getPager').pagination({
				pageSize: pageSize,
				displayMsg: '共 {total} 条记录'
			});
			$('#datagrid').datagrid("loadData", data);
		}, function(){
			getErrorMsg();
		})
	}
	
	
	$('#input_sn').on('keypress',function(event){
		if(event.keyCode==13){
			queryExecute();
			return;
		}
	});
})


function getErrorMsg(){
	$("#msg")[0].innerHTML = "<div '>查询结果错误，请重新尝试。</div>";
	alertInfoWindow('msgWin','错误');
}
