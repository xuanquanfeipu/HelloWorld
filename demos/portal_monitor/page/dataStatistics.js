// 委办局数据统计

// $.extend($.fn.validatebox.defaults.rules, {
//     ip: {
//         validator: function (value, param) {
//             return /^((25[0-5]|2[0-4]\d|[01]?\d\d?)($|(?!\.$)\.)){4}$/.test(value);
//         },
//         message: '请输入正确的ip地址([0-255].[0-255].[0-255].[0-255])'
//     }
// });

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


var defaultPrompt = "没有查询到相关记录！";
var DataStatis = function(dataResMonitor) {
    return {
        init: function() {
            var dataStatisParams = dataResMonitor.getParameters("dataServ");
            dataResMonitor.createDataStatistics();
            dataResMonitor.getGridData(1, dataResMonitor.pageSize, dataStatisParams, "dataStatistics");
        },
        dataTimeInit: function(startDate, endDate) {
            // $("#dataStatisStartTime").datetimebox('setValue', startDate);
            // $("#dataStatisEndTime").datetimebox("setValue", endDate);
            $('#dataStatisStartTime').datebox().datebox('calendar').calendar({
                validator: function(date) {
                    var now = new Date();
                    var d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    return date <= d1;
                }
            });

            $('#dataStatisEndTime').datebox().datebox('calendar').calendar({
                validator: function(date) {
                    var now = new Date();
                    var d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    return date <= d1;
                }
            });

            $('#dataStatisStartTime').datebox({
                onHidePanel: function(date) {
                    validateDateTime('dataStatisStartTime', 'dataStatisEndTime', 'dataStatisStartTime');
                },
                onSelect: function(date) {
                    debugger
                }
            });
            $('#dataStatisEndTime').datebox({
                onHidePanel: function(date) {
                    validateDateTime('dataStatisStartTime', 'dataStatisEndTime', 'dataStatisEndTime');
                }
            });

        }
    }
}

var dateboxbuttons = $.extend([], $.fn.datebox.defaults.buttons);
dateboxbuttons.splice(2, 1, {
    text: '清除',
    handler: function(target) {
        $(target).combo('setValue', '').combo('setText', '');
        $(this).closest("div.combo-panel").panel("close");
    }
});


var dataOption = '';
var dataSel = "";
var DataResMonitor = function() {

    return {
        pageSize: 10, //autoPageSize
        init: function() {
            var _self = this;
            dataSel = this;
            _self.excClick();
            _self.resetClick();
            // _self.freshClick();
            _self.exportTotal();
        },
        createDataStatistics: function() {
            var _self = this;
            $('#dataStatistics').datagrid({
                pageSize: 10, //autoPageSize
                pageList: [10, 20, 30, 50, 100],
                striped: true,
                selectOnCheck: true,
                pagination: true,
                onLoadSuccess: function(data) {
                    dataOption = data;
                    _self.noRecordsProc(data, 5, "dataStatistics");
                },
                columns: [
                    [{
                            field: 'deptName',
                            title: '部门名称',
                            width: '25%',
                            align: 'center',
                            formatter: function(value, row, index) {
                                return value;
                            }
                        }, {
                            field: 'strUploadInQuantity',
                            title: '上传数据量（条）',
                            width: '20%',
                            align: 'center'
                        }, {
                            field: 'strProvided',
                            title: '被使用量（条）',
                            width: '20%',
                            align: 'center',
                            formatter: function(value, row, index) {
                                return value;
                            }
                        }, {
                            field: 'strUsed',
                            title: '使用量（条）',
                            width: '20%',
                            align: 'center'
                        },
                        /*{
                                               field: 'basicLib',
                                               title: '入基础库（项）',
                                               width: '15%',
                                               align: 'center'
                                           }, {
                                               field: 'themeLib',
                                               title: '入主题库（项）',
                                               width: '15%',
                                               align: 'center',
                                               formatter: function(value, row, index) {
                                                   return value;
                                               }
                                           },*/
                        {
                            field: 'ratio',
                            title: '数据准确率',
                            width: '17%',
                            align: 'center'
                        }
                    ]
                ]
            });
            var pager = $('#dataStatistics').datagrid('getPager');
            pager.pagination({
                onSelectPage: function(pageNum, pageSize) {
                    var dataStatisParams = _self.getParameters("dataServ");
                    _self.getGridData(pageNum, pageSize, dataStatisParams, "dataStatistics");
                }
            });
        },
        getGridData: function(pageNumber, pageSize, dataParams, gridName, callBack) {
            var _self = this;
            // dataParams.pagenumber = pageNumber;
            // dataParams.pagesize = pageSize;
            $.ajax({
                url: '/ipeg-web/requestDispatcher',
                type: 'post',
                data: dataParams,
                dataType: 'json',
                cache: false,
                success: function(result) {

                    if (result.status != 0) {
                        dataOption = data;
                        _self.noRecordsProc(data, 5, "dataStatistics");
                        //                        $("#dataServMsg")[0].innerHTML = "<div >查询结果错误，请重新尝试。</div>";
                        //                        alertInfoWindow('dataServMsgWin', '错误');
                        // result.data = [{
                        //     deptName: '云计算与大数据平台一部',
                        //     strUploadInQuantity: 300,
                        //     strProvided: 250,
                        //     strUsed: 200,
                        //     // basicLib: 100,
                        //     // themeLib: 200,
                        //     ratio: '90%'
                        // }]

                        // $('#' + gridName).datagrid("loadData", result.data);

                    } else {

                        $('#' + gridName).datagrid('getPager').pagination({
                            pageSize: pageSize,
                            displayMsg: '共 {total} 条记录'
                        });

                        // result.data = [{
                        //     deptName: '云计算与大数据平台一部',
                        //     strUploadInQuantity: 300,
                        //     strProvided: 250,
                        //     strUsed: 200,
                        //     // basicLib: 100,
                        //     // themeLib: 200,
                        //     ratio: '90%'
                        // }]

                        var deptName = $('#deptSearch').val();
                        var data = result.data;
                        // data.push(...data);
                        if (deptName.trim() != "") {
                            data = fuzzyQuery(result.data, 'deptName', deptName);
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
            $("#searchTotal1").on('click', function() {

                var grid = $(this).attr("grid") || 'dataStatistics';
                // var type = $(this).attr("log-type");
                handler.queryData(grid, '');
            })
        },
        freshClick: function() {
            var handler = this;
            // $(".operFresh").click(function() {
            //     var grid = $(this).attr("log-grid");
            //     var type = $(this).attr("log-type");
            //     $('#' + grid).datagrid('getPager').pagination('refresh', {
            //         pageNumber: 1
            //     });
            //     handler.queryData(grid, type);
            // })
        },
        queryData: function(grid, type) {
            var handler = this;
            var parm = handler.getParameters(type);
            if (parm == -1) {
                // $("#dataServMsg")[0].innerHTML = "<div >IP地址格式错误，请重新输入。</div>";
                // alertInfoWindow('dataServMsgWin', '错误');
            } else if (parm == -2) {
                // $("#dataServMsg")[0].innerHTML = "<div >日期选择错误,开始日期不能大于结束日期。</div>";
                // alertInfoWindow('dataServMsgWin', '错误');
            } else {
                handler.getGridData(1, 10, parm, grid); //autoPageSize
            }
        },
        resetClick: function() {
            var handler = this;
            $("#searchReset").on('click', function() {
                $('#deptSearch').val('');
                $("#dataStatisStartTime").datebox('setValue', '');
                $("#dataStatisEndTime").datebox("setValue", '');
                // getDefaultLogSrc("ServStatisSrc");
            });
        },
        exportTotal: function() {
            $('#exportTotal_dataStatistics').on('click', function() {
                // var fields = $('#dataStatistics').datagrid('getColumnFields');
                // var header = [];
                // var data = [];
                // var rows = $('#dataStatistics').datagrid('getRows');
                // for (var i in fields) {
                //     var option = $('#dataStatistics').datagrid('getColumnOption', fields[i]);
                //     header.push(option.title);
                // }

                // for (var i in rows) {
                //     var tmp = [];
                //     var row = rows[i];
                //     for (var j in fields) {
                //         var field = fields[j];
                //         var value = row[field];
                //         if (field === "ratio")
                //             value = (save4Point(value * 100));
                //         tmp.push(value);
                //     }
                //     data.push(tmp);
                // }

                // exportDataSources(header, data);

                var deptName = $('#deptSearch').val().trim();
                var startTime = $('#dataStatisStartTime').datebox('getValue');
                var endTime = $('#dataStatisEndTime').datebox('getValue');

                var exportParams = [
                    'commandCode=19000312',
                    'type=committee',
                    'departname=' + deptName,
                    'startTime=' + startTime,
                    'endTime=' + endTime
                ];


                exportDataSources(exportParams);
            });
        },
        noRecordsProc: function(data, colNum, gridName) {
            if (data && data.length == 0) {
                $('#' + gridName).datagrid('appendRow', {
                    deptName: '<div style="text-align:center;color:gray">' + defaultPrompt + '</div>'
                }).datagrid('mergeCells', {
                    index: 0,
                    field: 'deptName',
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
            return this.getDataParam();
        },
        getDataParam: function() {
            var param = {};
            var deptName = $('#deptSearch').val();
            // param.deptName = deptName;
            param.startTime = $('#dataStatisStartTime').datebox('getValue');
            param.endTime = $('#dataStatisEndTime').datebox('getValue');
            param.commandCode = 19000303;
            return param;
        },
        createdataServDetailTable: function(gridData) {
            // var _self = this;
            // var data = gridData;
            // var detailTableData = new Array(5);
            // var detailLogData = [];


            // //detailTableData转detailLogData，删除无效数据
            // for (var i = 0; i < detailTableData.length; i++) {
            //     if (detailTableData[i] != null && detailTableData[i] != undefined) {
            //         detailLogData.push(detailTableData[i]);
            //     }
            // }
            // return detailLogData;
        }
    }
}

var dataResMonitor = {};
$(function() {


    dataResMonitor = new DataResMonitor();
    var dataStatis = new DataStatis(dataResMonitor);


    dataStatis.dataTimeInit();
    dataStatis.init();
    dataResMonitor.init();
})
