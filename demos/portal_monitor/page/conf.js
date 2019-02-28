$(function () {
    uploadRight = checkRightAll("ipeg.monitor.flow.upload", "#upload", 1)[0];
    configRight = checkRightAll("ipeg.monitor.flow.config", "#exProcess", 1)[0];
    startAndStopRight = checkRightAll("ipeg.monitor.flow.startstop", "#startProcess,#stopProcess", 1)[0];
    deleteRight = checkRightAll("ipeg.monitor.flow.delete", "#delete", 1)[0];
    serverS = getMode();
    if (serverS.ac != 1) {
        $("#upload").hide();
    }
    $("#exProcess").hide();
    $("#delete").hide();

    initdata();

    $("#file").on('change', function () {
        $.ajaxFileUpload({
            url: '/ipeg-web/requestDispatcher?commandCode=19000065',
            secureuri: false,
            fileElementId: 'file', //文件上传控件的id属性  <input type="file" id="file" name="file" /> 注意，这里一定要有name值
            dataType: 'json',
            complete: function () {
            },
            success: function (data) {
                var result = JSON.parse(data);
                if (result.status == 0) {
                    initdata();
                    $.messager.alert("提示", "导入成功");
                } else {
                    $.messager.alert("提示", "导入失败:" + result.errMsg);
                }
            },
            error: function (data, status, e) {
                $.messager.alert("提示", "网络错误");
            }
        });
    });

    $("#download").on('click', function () {
        var row = $('#processBrief').datagrid("getSelections");
        if (row.length == 0) {
            $.messager.alert("提示", "请选择需要下载的流程");
        } else {
            jQuery('<form action="/ipeg-web/requestDispatcher?flow=' + row[0].flow + '&commandCode=19000066" method="post"></form>').appendTo('body').submit().remove();

        }
    });

    $("#delete").on('click', function () {
        var row = $('#processBrief').datagrid("getSelections");
        if (row.length == 0) {
            $.messager.alert("提示", "请选择需要删除的流程");
            return;
        }
        if (row[0].flow == 'idc_switch_flow_main' || row[0].flow == 'idc_switch_flow_backup') {
            $.messager.alert("提示", "您选择的流程不允许删除！");
            return;
        }
        $.messager.confirm("警告", "确定删除所选流程？", function (a) {
            if (a) {
                deleteFlow(row[0].flow);
            }
        });
    });
});

/*$("#newProcess").click(function() {
 window.location.href="configEdit.html";
 });*/

$("#exProcess").click(function () {
    var row = $('#processBrief').datagrid("getSelections");
    if (row.length)
        addWin();
    else
        $.messager.alert("提示", "请选择一行进行配置");
});
$("#startProcess").click(function () {
    var row = $('#processBrief').datagrid("getSelections");
    if (row.length && row[0].taskStatus == 0)
        startAndStop(row[0].flow, 0);
    else
        $.messager.alert("提示", "请选择一行进行启动");
});

$("#stopProcess").click(function () {
    var row = $('#processBrief').datagrid("getSelections");
    if (row.length && row[0].taskStatus == 1)
        startAndStop(row[0].flow, -1);
    else
        $.messager.alert("提示", "请选择一行进行停止");
});

function deleteFlow(flow) {
    $.ajax({
        url: '/ipeg-web/requestDispatcher',
        type: 'post',
        data: {
            commandCode: 19000067,
            flow: flow
        },
        dataType: 'json',
        cache: false,
        success: function (result) {
            if (result.status == 0) {
                initdata();
                $.messager.alert("删除结果", "删除成功");
            } else {
                $.messager.alert("删除结果", "删除失败");
            }
        }
    });
}
//启动&停止按钮
function startAndStop(vflow, value) {
    $.ajax({
        url: '/ipeg-web/requestDispatcher',
        type: 'post',
        data: {
            commandCode: 19000060,
            flow: vflow,
            jobId: value
        },
        dataType: 'json',
        cache: false,
        success: function (result) {
            if (result.status == 0 || result.status == 1) {
                initdata();
                $.messager.alert("操作结果", "操作成功");
            } else {
                $.messager.alert("操作结果", "操作失败");
            }
        }
    });
}

function initdata() {
    if (startAndStopRight) {
        $('#startProcess').show();
        $('#stopProcess').show();
    }
    var data = {};
    $.ajax({
        url: '/ipeg-web/requestDispatcher',
        type: 'post',
        data: {commandCode: 19000061},
        dataType: 'json',
        cache: false,
        success: function (result) {
            if (result.status == 0) {
                data.rows = result.data;
                initTab(data);
            }
        }
    })
}
function initTab(data) {
    $('#processBrief').datagrid({
        data: data,
        singleSelect: true,
        fitColumns: true,
        height: $(document).height() * 0.8,
        striped: true,
        //checkOnSelect: true,
        pagination: false,
        onLoadSuccess: function (data) {
            if (data.total == 0) {
                $('#processBrief').datagrid('appendRow',
                    {name: '<div style="text-align:center;color:gray">没有查询到相关记录！</div>'}).datagrid('mergeCells', {
                    index: 0,
                    field: 'name',
                    colspan: 7
                });
                var pager = $('#processBrief').datagrid('getPager');
                $(pager).pagination({
                    displayMsg: '当前显示 0 条记录   共 0 条记录'
                })
            }
        },
        onSelect: function (index, rowData) {
            checkStatus(rowData);
        },
        columns: [
            [
                {
                    field: 'name',
                    title: '任务名称',
                    width: '19%',
                    align: 'left'
                },
                {
                    field: 'createTime',
                    title: '创建时间',
                    width: '14%',
                    align: 'left'
                },
                {
                    field: 'createUser',
                    title: '创建人',
                    width: '14%',
                    align: 'left'
                },
                {
                    field: 'period',
                    title: '执行间隔',
                    width: '14%',
                    align: 'left',
                    formatter: function (value, row, index) {
                        if (value == -1) {
                            return "手工执行";
                        } else {
                            return transPostData(value);
                        }
                    }
                },
                {
                    field: 'taskStatus',
                    title: '任务状态',
                    width: '12%',
                    align: 'left',
                    formatter: function (value, row, index) {
                        if (value == 1) {
                            return "已启动";
                        }
                        else if (value == 0) {
                            return "已停止";
                        }
                    }
                },
                {
                    field: 'lastResult',
                    title: '最后执行结果',
                    width: "10%",
                    sortable: true,
                    formatter: function (value, row, index) {
                        if (value == 1) return "运行中";
                        else if (value == 2) return "成功";
                        else if (value == 3) return "失败";
                        else if (value == 4) return "停止";
                    }
                },
                {
                    field: 'operation',
                    title: '操作',
                    align: 'center',
                    width: '16%',
                    formatter: function (value, row, index) {
                        return "<a href='javascript:void(0);' style='text-decoration:none;color: #3366cc;' onclick='$.openNewWindow(\"" + row.flow + "\")'>流程</a>&nbsp; &nbsp; &nbsp;<a href='javascript:void(0);' style='text-decoration:none;color: #3366cc;' onclick='queryProcess(\"" + escape(row.name) + "\")' >执行日志</a>"
                    }
                }
            ]
        ]
    });
}

function transPostData(formInfo) {
    var isDuplicateDesc, selectTypeDesc;
    var formStr = formInfo.split(",");
    if (formStr[0] == "true") {
        isDuplicateDesc = "重复";
    } else {
        isDuplicateDesc = "";
    }

    if (formStr[1] == "0") {
        selectTypeDesc = "手动执行";
    }
    if (formStr[1] == "1") {
        selectTypeDesc = formStr[2] + "分 " + formStr[3] + "秒";
    } else if (formStr[1] == "2") {
        if (formStr[4] < 10) {
            formStr[4] = "0" + formStr[4];
        }
        if (formStr[5] < 10) {
            formStr[5] = "0" + formStr[5];
        }
        selectTypeDesc = "每天 " + formStr[4] + ":" + formStr[5];
    }
    if (isDuplicateDesc != "") {
        return [isDuplicateDesc, selectTypeDesc].join(",");
    } else {
        return [selectTypeDesc].join(",");
    }
}

//checkbox状态设置
function checkStatus(rowData) {
    if (serverS.ac == 1) {
        if (configRight)
            $("#exProcess").show();
        if (deleteRight)
            $("#delete").show();
    }

    if (rowData.taskStatus == 1 || rowData.taskStatus == "已启动") {
        if (startAndStopRight) {
            $('#startProcess').hide();
            $('#stopProcess').show();
        }
    } else if (rowData.taskStatus == 0 || rowData.taskStatus == "已停止") {
        if (startAndStopRight) {
            $('#startProcess').show();
            $('#stopProcess').hide();
        }
    }
}

//浏览界面
$.openNewWindow = function (flow) {
    $("#newframe").attr("src", "query_view.html?type=1&flow=" + flow);
    $('#newdiv').dialog({
        title: "&nbsp&nbsp流程图",
        onClose: function () {
            $("#newframe").attr("src", "");
        }
    });
    $("#newdiv").dialog('maximize');
    $("#newdiv").dialog('open');
}

function queryProcess(flow) {
    $("#page-mainIframe", parent.document).attr("src", "/ipeg-web/res/monitor/page/query.html?flow=" + flow);
    $(".breadcrumbUl #ipeg-monitor-configuration-i18n", parent.document).html("流程查询");
}

//执行策略
function addWin() {
    var selected = $('#processBrief').datagrid("getSelected");
    location.href = "config_task.html?flow=" + selected.flow + "&period=" + selected.period + "&param=" + selected.param
        + "&name=" + selected.name;
}




