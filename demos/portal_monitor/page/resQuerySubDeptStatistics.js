var defaultPrompt = "没有查询到相关记录！";
var DataQuerySubDeptStatis = function(dataQuerySubMonitor) {
    return {
        init: function() {
            var dataQuerySubDeptStatisParams = dataQuerySubMonitor.getParameters("dataServ");
            dataQuerySubMonitor.createDataQuerySubDeptStatistics();
            dataQuerySubMonitor.getGridData(1, dataQuerySubMonitor.pageSize, dataQuerySubDeptStatisParams, "dataQuerySubDeptStatistics");
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
var dataQuerySubDeptOption = '';
var dataQuerySubSel = "";
var DataQuerySubMonitor = function() {


    return {
        pageSize: 10,
        init: function() {
            var _self = this;
            dataQuerySubSel = this;
            _self.excClick();
            _self.resetClick();
            _self.freshClick();
            _self.exportTotal();
        },
        createDataQuerySubDeptStatistics: function() {
            var _self = this;
            $('#dataQuerySubDeptStatistics').datagrid({
                pageSize: 10,
                pageList: [10, 20, 30, 50, 100],
                striped: true,
                selectOnCheck: true,
                pagination: true,
                onLoadSuccess: function(data) {
                    dataQuerySubDeptOption = data;
                    _self.noRecordsProc(data, 2, "dataQuerySubDeptStatistics");
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
                        title: '资源查询量（条）',
                        width: '52%',
                        align: 'center'
                    }]
                ]
            });
            var pager = $('#dataQuerySubDeptStatistics').datagrid('getPager');
            pager.pagination({
                total: 0,
                onSelectPage: function(pageNum, pageSize) {
                    var dataQuerySubDeptStatisParams = _self.getParameters("dataServ");
                    _self.getGridData(pageNum, pageSize, dataQuerySubDeptStatisParams, "dataQuerySubDeptStatistics");
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

                        var deptName = $('#deptSearch_resQuerySubDept').val()
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
            $("#searchTotal_resQuerySubDept").click(function() {
                var grid = $(this).attr("grid") || 'dataQuerySubDeptStatistics';
                var type = $(this).attr("type");
                handler.queryData(grid, type);
            })
        },
        freshClick: function() {
            var handler = this;
            $(".operFresh").click(function() {
                var grid = $(this).attr("grid") || 'dataQuerySubDeptStatistics';
                var type = $(this).attr("type");
                $('#' + grid).datagrid('getPager').pagination('refresh', {
                    pageNumber: 1
                });
                handler.queryData(grid, type);
            })
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
            $('#exportTotal_resQuerySubDept').on('click', function() {
                debugger
                var deptName = $('#deptSearch_resQuerySubDept').val().trim();

                var exportParams = [
                    'commandCode=19000312',
                    'type=searchdep',
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
            param.type = 'user';
            param.commandCode = 19000306;
            return param;
        },
        createDataServDetailTable: function(gridData) {
            var _self = this;
            var data = gridData;
            var detailTableData = new Array(2);
            var detailStatisData = [];


            //detailTableData转detailStatisData，删除无效数据
            for (var i = 0; i < detailTableData.length; i++) {
                if (detailTableData[i] != null && detailTableData[i] != undefined) {
                    detailStatisData.push(detailTableData[i]);
                }
            }
            return detailStatisData;
        }
    }
}

var dataQuerySubMonitor = {};
var dataQuerySubDeptStatis = {};
$(function() {
    $('.page_wrapper').show();
    $('.tableWrapper_hide').hide();
    // dataQuerySubMonitor = new DataQuerySubMonitor();
    // dataQuerySubDeptStatis = new DataQuerySubDeptStatis(dataQuerySubMonitor);
    // dataQuerySubDeptStatis.init();
    // dataQuerySubMonitor.init();
});

function dataQuerySubDeptStatisInit() {
    $('#deptSearch_resQuerySubDept').val('');

    dataQuerySubMonitor = new DataQuerySubMonitor();
    dataQuerySubDeptStatis = new DataQuerySubDeptStatis(dataQuerySubMonitor);
    dataQuerySubDeptStatis.init();
    dataQuerySubMonitor.init();
};
