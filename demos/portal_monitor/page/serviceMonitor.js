// $.extend($.fn.validatebox.defaults.rules, {
//     ip: {
//         validator: function (value, param) {
//             return /^((25[0-5]|2[0-4]\d|[01]?\d\d?)($|(?!\.$)\.)){4}$/.test(value);
//         },
//         message: '请输入正确的ip地址([0-255].[0-255].[0-255].[0-255])'
//     }
// });
var timesCond = {
    'current': moment().format('YYYY-MM-DD HH:mm:ss'),
    'oneday': moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
    'threeday': moment().subtract(3, 'days').format('YYYY-MM-DD HH:mm:ss'),
    'oneweek': moment().subtract(7, 'days').format('YYYY-MM-DD HH:mm:ss'),
    'onemonth': moment().subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss')
};
var startTime = timesCond['oneday'];
var endTime = timesCond['current'];

var defaultPrompt = "没有查询到相关记录！";
var ServiceMonitor = function(service) {
    return {
        init: function() {
            var servMonitorParams = service.getParameters("ServMonitor");
            service.createServiceMonitor();
            service.getGridData(1, service.pageSize, servMonitorParams, "serviceMonitor");
        },
        dataTimeInit: function(startDate, endDate) {


            $('#data_update_view_startTime4').datetimebox().datetimebox('calendar').calendar({
                validator: function(date) {
                    var now = new Date();
                    var d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    return date <= d1;
                }
            });

            $('#data_update_view_endTime4').datetimebox().datetimebox('calendar').calendar({
                validator: function(date) {
                    var now = new Date();
                    var d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    return date <= d1;
                }
            });

            $('#data_update_view_startTime4').datetimebox({
                onHidePanel: function(date) {
                    validateDateTime('data_update_view_startTime4', 'data_update_view_endTime4', 'data_update_view_startTime4');
                }
            });
            $('#data_update_view_endTime4').datetimebox({
                onHidePanel: function(date) {
                    validateDateTime('data_update_view_startTime4', 'data_update_view_endTime4', 'data_update_view_endTime4');
                }
            });

            $("#data_update_view_startTime4").datetimebox('setValue', startDate);
            $("#data_update_view_endTime4").datetimebox("setValue", endDate);
        }
    }
}

var buttonArr = $.extend([], $.fn.datetimebox.defaults.buttons);
buttonArr.splice(2, 1, {
    text: '清除',
    handler: function(target) {
        $(target).combo('setValue', '').combo('setText', '');
        $(this).closest("div.combo-panel").panel("close");
    }
});
var servMonitorDataOption = '';
var servMonSel = "";
var ServiceRes = function() {


    return {
        pageSize: 10,
        init: function() {
            var _self = this;
            servMonSel = this;
            _self.excClick();
            _self.resetClick();
            _self.freshClick();
            _self.exportTotal();
        },
        createServiceMonitor: function() {
            var _self = this;
            $('#serviceMonitor').datagrid({
                pageSize: 10,
                pageList: [10, 20, 30, 50, 100],
                remoteSort: true,
                striped: true,
                selectOnCheck: true,
                pagination: true,
                onLoadSuccess: function(data) {
                    servMonitorDataOption = data;
                    _self.noRecordsProc(data, 4, "serviceMonitor");
                },
                columns: [
                    [{
                        field: 'dept',
                        title: '部门名称',
                        width: '8%',
                        align: 'center',
                        formatter: function(value, row, index) {
                            return value;
                        }
                    }, {
                        field: 'appName',
                        title: '应用名称',
                        width: '8%',
                        align: 'center'
                    }, {
                        field: 'serviceName',
                        title: '服务名称',
                        width: '8%',
                        align: 'center'
                    }, {
                        field: 'serviceId',
                        title: '服务ID',
                        width: '8%',
                        align: 'center'
                    }, {
                        field: 'serviceStatus',
                        title: '服务状态',
                        width: '7%',
                        align: 'center'
                    }, {
                        field: 'requestCount',
                        title: '请求次数',
                        sortable: true,
                        width: '7%',
                        align: 'center'
                    }, {
                        field: 'successCount',
                        title: '成功请求次数',
                        sortable: true,
                        width: '7%',
                        align: 'center',
                        formatter: function(value, row, index) {
                            return value;
                        }
                    }, {
                        field: 'failedCount',
                        title: '失败请求次数',
                        sortable: true,
                        width: '7%',
                        align: 'center'
                    }, {
                        field: 'inRequestCount',
                        title: '被请求次数',
                        sortable: true,
                        width: '7%',
                        align: 'center'
                    }, {
                        field: 'flowIn',
                        title: '流入流量（M）',
                        sortable: true,
                        width: '7%',
                        align: 'center'
                    }, {
                        field: 'flowOut',
                        title: '流出流量（M）',
                        sortable: true,
                        width: '7%',
                        align: 'center'
                    }, {
                        field: 'totalFlow',
                        title: '总流量（M）',
                        sortable: true,
                        width: '7%',
                        align: 'center'
                    }, {
                        field: 'timeConsume',
                        title: '调用时耗（ms）',
                        sortable: true,
                        width: '7%',
                        align: 'center'
                    }, {
                        field: 'onlineRate',
                        title: '在线率',
                        sortable: true,
                        width: '8%',
                        align: 'center'
                    }]
                ]
            });
            var pager = $('#serviceMonitor').datagrid('getPager');
            pager.pagination({
                total: 0,
                onSelectPage: function(pageNum, pageSize) {
                    var servMonitorParams = _self.getParameters("ServMonitor");
                    _self.getGridData(pageNum, pageSize, servMonitorParams, "serviceMonitor");
                }
            });
        },
        getGridData: function(pageNumber, pageSize, servMonitorParams, gridName, callBack) {
            // servMonitorParams.pagenumber = pageNumber;
            // servMonitorParams.pagesize = pageSize;
            $.ajax({
                url: '/ipeg-web/requestDispatcher',
                type: 'post',
                data: servMonitorParams,
                dataType: 'json',
                cache: false,
                success: function(result) {
                    if (result.status != 0) {
                        // result.data = [{
                        //     dept: '云计算与大数据平台一部',
                        //     appName: 'App1',
                        //     serviceName: '请求服务',
                        //     serviceId: 0948,
                        //     serviceStatus: '正常',
                        //     requestCount: 300,
                        //     successCount: 120,
                        //     failedCount: 180,
                        //     inRequestCount: 320,
                        //     flowIn: 100,
                        //     flowOut: 200,
                        //     totalFlow: 300,
                        //     timeConsume: 2,
                        //     onlineRate: '100%'
                        // }, {
                        //     dept: '政企一部',
                        //     appName: 'App2',
                        //     serviceName: '发送服务',
                        //     serviceId: 0948,
                        //     serviceStatus: '正常',
                        //     requestCount: 300,
                        //     successCount: 120,
                        //     failedCount: 180,
                        //     inRequestCount: 320,
                        //     flowIn: 100,
                        //     flowOut: 200,
                        //     totalFlow: 300,
                        //     timeConsume: 2,
                        //     onlineRate: '100%'
                        // }]
                        // result.data.push(...result.data)
                        // result.data.push(...result.data)
                        // result.data.push(...result.data)
                        // result.data.push(...result.data)
                        // // result.total = result.data.length;
                        // // $('#' + gridName).datagrid("loadData", result.data);
                        // var deptName = $('#deptSearch').val();
                        // var appName = $('#appSearch').val();
                        // var serviceName = $('#serviceSearch').val();
                        // var fields = [],
                        //     keyWords = [];
                        // if (deptName.trim() != "") {
                        //     fields.push('dept');
                        //     keyWords.push(deptName);
                        // }
                        // if (appName.trim() != "") {
                        //     fields.push('appName');
                        //     keyWords.push(appName);
                        // }
                        // if (serviceName.trim() != "") {
                        //     fields.push('serviceName');
                        //     keyWords.push(serviceName);
                        // }

                        // if (fields.length) {
                        //     result.data = fuzzyQueryMulti(result.data, fields, keyWords);
                        // }
                        // $('#' + gridName).datagrid({
                        //     loadFilter: pagerFilter
                        // }).datagrid("loadData", result.data);
                    } else {
                        $('#' + gridName).datagrid('getPager').pagination({
                            pageSize: pageSize,
                            displayMsg: '共 {total} 条记录'
                        });

                        // result.data = [{
                        //     dept: '云计算与大数据平台一部',
                        //     appName: 'App1',
                        //     serviceName: '请求服务',
                        //     serviceId: 0948,
                        //     serviceStatus: '正常',
                        //     requestCount: 300,
                        //     successCount: 120,
                        //     failedCount: 180,
                        //     inRequestCount: 320,
                        //     flowIn: 100,
                        //     flowOut: 200,
                        //     totalFlow: 300,
                        //     timeConsume: 2,
                        //     onlineRate: '100%'
                        // }]
                        // $('#' + gridName).datagrid("loadData", result.data);

                        var deptName = $('#deptSearch').val();
                        var appName = $('#appSearch').val();
                        var serviceName = $('#serviceSearch').val();
                        var data = result.serviceMonitorList;
                        // data.push(...data);
                        var fields = [],
                            keyWords = [];
                        if (deptName.trim() != "") {
                            fields.push('dept');
                            keyWords.push(deptName);
                        }
                        if (appName.trim() != "") {
                            fields.push('appName');
                            keyWords.push(appName);
                        }
                        if (serviceName.trim() != "") {
                            fields.push('serviceName');
                            keyWords.push(serviceName);
                        }

                        if (fields.length) {
                            data = fuzzyQueryMulti(data, fields, keyWords);
                        }
                        $('#' + gridName).datagrid({
                            loadFilter: pagerFilter
                        }).datagrid("loadData", data);
                    }
                }
            })
        },
        excClick: function() {
            var handler = this;
            $("#searchTotal").click(function() {
                var grid = $(this).attr("grid") || 'serviceMonitor';
                var type = $(this).attr("type");
                handler.queryData(grid, type);
            })
        },
        freshClick: function() {
            // var handler = this;
            // $(".operFresh").click(function() {
            //     var grid = $(this).attr("grid");
            //     var type = $(this).attr("type");
            //     $('#' + grid).datagrid('getPager').pagination('refresh', {
            //         pageNumber: 1
            //     });
            //     handler.queryData(grid, type);
            // })
        },
        queryData: function(grid, type) {
            var handler = this;
            var parm = handler.getParameters(type);
            if (parm == -1) {} else if (parm == -2) {} else {
                handler.getGridData(1, 10, parm, grid);
            }
        },
        resetClick: function() {
            var handler = this;
            $("#searchReset").click(function() {
                $('#deptSearch').val('');
                $('#appSearch').val('');
                $('#serviceSearch').val('');
                $("#data_update_view_startTime4").datetimebox('setValue', '');
                $("#data_update_view_endTime4").datetimebox("setValue", '');
            });
        },
        exportTotal: function() {
            $('#exportTotal').on('click', function() {


                var deptName = $('#deptSearch').val().trim();
                var startTime = $('#data_update_view_startTime4').datebox('getValue');
                var endTime = $('#data_update_view_endTime4').datebox('getValue');

                var exportParams = [
                    'commandCode=19000312',
                    'type=committee',
                    'departname=' + deptName,
                    'startTime=' + startTime,
                    'endTime=' + endTime
                ];


                // exportDataSources(exportParams);
            });
        },
        noRecordsProc: function(data, colNum, gridName) {
            if (data.total == 0) {
                $('#' + gridName).datagrid('appendRow', {
                    dept: '<div style="text-align:center;color:gray">' + defaultPrompt + '</div>'
                }).datagrid('mergeCells', {
                    index: 0,
                    field: 'dept',
                    colspan: colNum
                });
                var pager = $('#' + gridName).datagrid('getPager');
                $(pager).pagination({
                    displayMsg: '共 0 条记录',
                })
            } else {

            }
        },
        getParameters: function(type) {
            return this.getOperParam();
        },
        getOperParam: function() {
            var param = {
                commandCode: 19000402,
                startDate: '',
                endDate: ''
            };

            param.startDate = $('#data_update_view_startTime4').datebox('getValue');
            param.endDate = $('#data_update_view_endTime4').datebox('getValue');

            if (param.startDate > param.endDate) {
                return -2;
            }

            param.commandCode = 19000402;
            return param;
        }
    }
}

var serviceRes = {};
$(function() {
    serviceMonitorInit();

    // serviceRes = new ServiceRes();
    // var serviceMonitor = ServiceMonitor(serviceRes);


    // serviceMonitor.dataTimeInit();
    // serviceMonitor.init();
    // serviceRes.init();
});

function serviceMonitorInit() {
    serviceRes = new ServiceRes();
    var serviceMonitor = ServiceMonitor(serviceRes);

    // var startTime = moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss');
    // var endTime = moment().format('YYYY-MM-DD HH:mm:ss');
    serviceMonitor.dataTimeInit(startTime, endTime);
    serviceMonitor.init();
    serviceRes.init();
}


function validateDateTime(beginTimeId, endTimeId, whichTimeId) {
    var v1 = $('#' + beginTimeId).datetimebox("getValue");
    var date1 = new Date(v1);
    var v2 = $('#' + endTimeId).datetimebox("getValue");
    var date2 = new Date(v2);
    var cur = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));

    if (v1 == '' || v2 == '') {
        return true;
    }


    if (date1 > date2) {
        $.messager.alert('提示', '开始时间要小于结束时间！');
        msgRePos();
        datetimeboxReset(whichTimeId);
        return false;
    }
    if (date1 > cur) {
        $.messager.alert('提示', '开始时间要小于当前时间！');
        msgRePos();
        datetimeboxReset(whichTimeId);
        return false;
    }
    if (date2 > cur) {
        $.messager.alert('提示', '结束时间要小于等于当前时间！');
        msgRePos();
        datetimeboxReset(whichTimeId);
        return false;
    }

    if (date1 <= date2) {
        return true;
    }
    return false;
}

function datetimeboxReset(whichTimeId) {
    try {
        $('#' + whichTimeId).datetimebox("setValue", "");
    } catch (e) {}
    try {
        $('#' + whichTimeId).datebox("setValue", "");
    } catch (e) {}
}

function msgRePos() {
    $('.messager-window').css({
        top: $(window.top).scrollTop() + 100
    });
}

/**
 * 使用spilt方法实现模糊查询
 * @param  {Array}  list     进行查询的数组
 * @param  {String} field    查询的每个成员的字段
 * @param  {String} keyWord  查询的关键词
 * @return {Array}           查询的结果
 */
function fuzzyQuery(list, field, keyWord) {
    var arr = [];
    for (var i = 0; i < list.length; i++) {
        if (list[i][field].split(keyWord).length > 1) {
            arr.push(list[i]);
        }
    }
    return arr;
}


/**
 * 使用spilt方法实现模糊查询
 * @param  {Array}  list     进行查询的数组
 * @param  {String} field    查询的每个成员的字段
 * @param  {String} keyWord  查询的关键词
 * @return {Array}           查询的结果
 */
function fuzzyQueryMulti(list, fields, keyWords) {
    var arr = [];
    for (var i = 0; i < list.length; i++) {
        if ((fields.length == 3) &&
            (list[i][fields[0]].split(keyWords[0]).length > 1) &&
            (list[i][fields[1]].split(keyWords[1]).length > 1) &&
            (list[i][fields[2]].split(keyWords[2]).length > 1)) {
            arr.push(list[i]);
        } else if ((fields.length == 2) &&
            (list[i][fields[0]].split(keyWords[0]).length > 1) &&
            (list[i][fields[1]].split(keyWords[1]).length > 1)) {
            arr.push(list[i]);
        } else if ((fields.length == 1) &&
            (list[i][fields[0]].split(keyWords[0]).length > 1)) {
            arr.push(list[i]);

        }
    }
    return arr;
}

function pagerFilter(data) {
    if (typeof data.length == 'number' && typeof data.splice == 'function') { // is array
        data = {
            total: data.length,
            rows: data
        }
    }
    var dg = $(this);
    var opts = dg.datagrid('options');
    var pager = dg.datagrid('getPager');
    pager.pagination({
        onSelectPage: function(pageNum, pageSize) {
            opts.pageNumber = pageNum;
            opts.pageSize = pageSize;
            pager.pagination('refresh', {
                pageNumber: pageNum,
                pageSize: pageSize
            });
            dg.datagrid('loadData', data);
        }
    });
    if (!data.originalRows) {
        data.originalRows = (data.rows);
    }
    var start = (opts.pageNumber - 1) * parseInt(opts.pageSize);
    start = start < 0 ? 0 : start;
    var end = start + parseInt(opts.pageSize);
    data.rows = (data.originalRows.slice(start, end));
    return data;
}



function save4Point(num) {
    if (num == null || num == 0)
        return num;
    var strNum = "" + num;
    var index = strNum.indexOf(".");
    if (index > 0) {
        return strNum.substring(0, index + 5);
    }
    return num;
}

function exportDataSources(exportParams) { //(header, data, params) {
    var exportIFrame = document.createElement("iframe");
    // var exportParams = [
    //     'commandCode=19000312',
    //     'type=committee',
    //     'departname=',
    //     'startTime=2019-01-01',
    //     'endTime=2019-02-01',
    //     // 'header=' + JSON.stringify(header),
    //     // 'data=' + JSON.stringify(data),
    //     'fileName='
    // ];
    exportIFrame.src = "/ipeg-web/requestDispatcher?" + exportParams.join("&");
    exportIFrame.style.display = "none";
    window.top.document.body.appendChild(exportIFrame);
};
