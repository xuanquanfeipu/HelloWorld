var defaultPrompt = "没有查询到相关记录！";
var DataProviderDeptStatis = function(dataProviderMonitor) {
    return {
        init: function() {
            var dataProviderDeptStatisParams = dataProviderMonitor.getParameters("dataServ");
            dataProviderMonitor.createDataProviderDeptStatistics();
            dataProviderMonitor.getGridData(1, dataProviderMonitor.pageSize, dataProviderDeptStatisParams, "dataProviderDeptStatistics");
        },
        dataTimeInit: function(startDate) {
            // $("#dataServStartTime").datetimebox('setValue', startDate);
            // $("#dataServEndTime").datetimebox("setValue", '9999');
        }
    }
}

// var buttons = $.extend([], $.fn.datetimebox.defaults.buttons);
// buttons.splice(2, 1,
//     {
//         text: '清除',
//         handler: function (target) {
//             $(target).combo('setValue', '').combo('setText', '');
//             $(this).closest("div.combo-panel").panel("close");
//         }
//     }
// );
var dataProviderDeptOption = '';
var dataProviderSel = "";
var DataProviderMonitor = function() {


    return {
        pageSize: 10,
        init: function() {
            var _self = this;
            dataProviderSel = this;
            _self.excClick();
            _self.resetClick();
            // _self.freshClick();
            _self.exportTotal();
        },
        createDataProviderDeptStatistics: function() {
            var _self = this;
            $('#dataProviderDeptStatistics').datagrid({
                pageSize: 10,
                pageList: [10, 20, 30, 50, 100],
                striped: true,
                selectOnCheck: true,
                pagination: true,
                onLoadSuccess: function(data) {
                    dataProviderDeptOption = data;
                    _self.noRecordsProc(data, 2, "dataProviderDeptStatistics");
                },
                columns: [
                    [{
                        field: 'name',
                        title: '部门名称',
                        width: '52%',
                        align: 'center',
                        formatter: function(value, row, index) {
                            return value;
                        }
                    }, {
                        field: 'value',
                        title: '资源被订阅量（条）',
                        width: '52%',
                        align: 'center'
                    }]
                ]
            });
            var pager = $('#dataProviderDeptStatistics').datagrid('getPager');
            pager.pagination({
                total: 0,
                onSelectPage: function(pageNum, pageSize) {
                    var dataProviderDeptStatisParams = _self.getParameters("dataServ");
                    _self.getGridData(pageNum, pageSize, dataProviderDeptStatisParams, "dataProviderDeptStatistics");
                }
            });
        },
        getGridData: function(pageNumber, pageSize, dataParams, gridName, callBack) {
            dataParams.pagenumber = pageNumber;
            dataParams.pagesize = pageSize;
            $.ajax({
                url: '/ipeg-web/requestDispatcher',
                type: 'post',
                data: dataParams,
                dataType: 'json',
                cache: false,
                success: function(result) {
                    if (result.status != 0) {
                        // result.data = [{
                        //     name: '云计算与大数据平台一部',
                        //     value: 300,
                        // }]
                        // $('#' + gridName).datagrid("loadData", result.data);
                    } else {
                        $('#' + gridName).datagrid('getPager').pagination({
                            pageSize: pageSize,
                            displayMsg: '共 {total} 条记录'
                        });

                        // result.data = [{
                        //     name: '云计算与大数据平台一部',
                        //     value: 300,
                        // }]
                        var deptName = $('#deptSearch_dataProviderDept').val()
                        var data = result.data;
                        if (deptName.trim() != "") {
                            data = fuzzyQuery(result.data, 'name', deptName);
                        }
                        $('#' + gridName).datagrid({
                            loadFilter: pagerFilter
                        }).datagrid("loadData", data);

                        $('#' + gridName).datagrid('reload');
                    }
                }
            })
        },
        excClick: function() {
            var handler = this;
            $("#searchTotal_dataProviderDept").click(function() {
                var grid = $(this).attr("grid") || 'dataProviderDeptStatistics';
                var type = $(this).attr("type");
                handler.queryData(grid, type);
            })
        },
        freshClick: function() {
            // var handler = this;
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

            } else if (parm == -2) {

            } else {
                handler.getGridData(1, 10, parm, grid);
            }
        },
        resetClick: function() {
            var handler = this;
            //            $("#operResetBtn").click(function () {
            //                $('#dataServUserName').textbox('setText', '');
            //                $('#dataServHostName').textbox('setText', '');
            //                $('#dataServSeverity').combobox('setValue', 0);
            //                $("#dataServStartTime").datetimebox('setValue', getLastWeekDate());
            //                $("#dataServEndTime").datetimebox("setValue", '9999');
            //                getDefaultLogSrc("dataServSrc");
            //                $(".operFresh").click();
            //            });
        },
        exportTotal: function() {
            $('#exportTotal3').on('click', function() {
                var deptName = $('#deptSearch_dataProviderDept').val().trim();

                var exportParams = [
                    'commandCode=19000312',
                    'type=subscribeprovider',
                    'departname=' + deptName
                ];

                exportDataSources(exportParams);
            });
        },
        noRecordsProc: function(data, colNum, gridName) {
            if (data.total == 0) {
                $('#' + gridName).datagrid('appendRow', {
                    name: '<div style="text-align:center;color:gray">' + defaultPrompt + '</div>'
                }).datagrid('mergeCells', {
                    index: 0,
                    field: 'name',
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
            // param.deptName = $('#deptSearch_dataProviderDept').val() || param.deptName;
            param.type = 'provider';
            param.commandCode = 19000301;
            return param;
        }
    }
}

var dataProviderMonitor = {};
var dataProviderDeptStatis = {};
$(function() {
    $('.page_wrapper').show();
    $('.tableWrapper_hide').hide();
    // dataProviderMonitor = new DataProviderMonitor();
    // dataProviderDeptStatis = new DataProviderDeptStatis(dataProviderMonitor);


    // dataProviderDeptStatis.init();
    // dataProviderMonitor.init();
});

function dataProviderDeptStatisInit() {
    $('#deptSearch_dataProviderDept').val('');
    dataProviderMonitor = new DataProviderMonitor();
    dataProviderDeptStatis = new DataProviderDeptStatis(dataProviderMonitor);
    dataProviderDeptStatis.init();
    dataProviderMonitor.init();
}
