var defaultPrompt = "没有查询到相关记录！";
var DataQueryProviderDeptStatis = function(dataQeruyProviderMonitor) {
    return {
        init: function() {
            var dataQueryProviderDeptStatisParams = dataQeruyProviderMonitor.getParameters("dataServ");
            dataQeruyProviderMonitor.createDataQueryProviderDeptStatistics();
            dataQeruyProviderMonitor.getGridData(1, dataQeruyProviderMonitor.pageSize, dataQueryProviderDeptStatisParams, "dataQueryProviderDeptStatistics");
        },
        dataTimeInit: function(startDate) {
            $("#dataServStartTime").datetimebox('setValue', startDate);
            $("#dataServEndTime").datetimebox("setValue", '9999');
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
var dataQueryProviderDeptOption = '';
var dataQueryProviderSel = "";
var DataQeruyProviderMonitor = function() {


    return {
        pageSize: 10,
        init: function() {
            var _self = this;
            dataQueryProviderSel = this;
            _self.excClick();
            _self.resetClick();
            // _self.freshClick();
            _self.exportTotal();
        },
        createDataQueryProviderDeptStatistics: function() {
            var _self = this;
            $('#dataQueryProviderDeptStatistics').datagrid({
                pageSize: 10,
                pageList: [10, 20, 30, 50, 100],
                striped: true,
                selectOnCheck: true,
                pagination: true,
                onLoadSuccess: function(data) {
                    dataQueryProviderDeptOption = data;
                    _self.noRecordsProc(data, 2, "dataQueryProviderDeptStatistics");
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
                        title: '资源被查询量（条）',
                        width: '52%',
                        align: 'center'
                    }]
                ]
            });
            var pager = $('#dataQueryProviderDeptStatistics').datagrid('getPager');
            pager.pagination({
                total: 0,
                onSelectPage: function(pageNum, pageSize) {
                    var dataQueryProviderDeptStatisParams = _self.getParameters("dataServ");
                    _self.getGridData(pageNum, pageSize, dataQueryProviderDeptStatisParams, "dataQueryProviderDeptStatistics");
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
                        // $('#' + gridName).datagrid("loadData", result.data);

                        var deptName = $('#deptSearch_resQueryProvider').val()
                        var data = result.data;
                        if (deptName.trim() != "") {
                            data = fuzzyQuery(result.data, 'name', deptName);
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
            $("#searchTotal_resQueryProvider").click(function() {
                var grid = $(this).attr("grid") || 'dataQueryProviderDeptStatistics';
                var type = $(this).attr("type");
                handler.queryData(grid, type);
            })
        },
        freshClick: function() {
            // var handler = this;
            // $(".operFresh").click(function() {
            //     var grid = $(this).attr("grid") || 'dataQueryProviderDeptStatistics';
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
            $('#exportTotal_resQueryProvider').on('click', function() {
                var deptName = $('#deptSearch_resQueryProvider').val().trim();

                var exportParams = [
                    'commandCode=19000312',
                    'type=searchprovider',
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

            param.type = 'provider';
            param.commandCode = 19000306;
            return param;
        }
    }
}

var dataQeruyProviderMonitor = {};
var dataQueryProviderDeptStatis = {};
$(function() {
    $('.page_wrapper').show();
    $('.tableWrapper_hide').hide();
    // dataQeruyProviderMonitor = new DataQeruyProviderMonitor();
    // dataQueryProviderDeptStatis = new DataQueryProviderDeptStatis(dataQeruyProviderMonitor);


    // dataQueryProviderDeptStatis.init();
    // dataQeruyProviderMonitor.init();
});

function dataQueryProviderDeptStatisInit() {
    $('#deptSearch_resQueryProvider').val('');

    dataQeruyProviderMonitor = new DataQeruyProviderMonitor();
    dataQueryProviderDeptStatis = new DataQueryProviderDeptStatis(dataQeruyProviderMonitor);
    dataQueryProviderDeptStatis.init();
    dataQeruyProviderMonitor.init();
};
