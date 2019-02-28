var defaultPrompt = "没有查询到相关记录！";
var dataChangedMonitor = {};
var deptDataStatis = {};
var DeptDataStatis = function(dataChangedMonitor) {
    return {
        init: function() {
            var deptDataStatisParams = dataChangedMonitor.getParameters("dataServ");
            dataChangedMonitor.createDeptDataStatistics();
            dataChangedMonitor.getGridData(1, dataChangedMonitor.pageSize, deptDataStatisParams, "deptDataStatistics");
        },
        dataTimeInit: function(startDate) {
            // $("#dataServStartTime").datetimebox('setValue', startDate);
            // $("#dataServEndTime").datetimebox("setValue", '9999');
            $('#data_update_view_startTime3').datetimebox().datetimebox('calendar').calendar({
                validator: function(date) {
                    var now = new Date();
                    var d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    return date <= d1;
                }
            });

            $('#data_update_view_endTime3').datetimebox().datetimebox('calendar').calendar({
                validator: function(date) {
                    var now = new Date();
                    var d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    return date <= d1;
                }
            });

            $('#data_update_view_startTime3').datetimebox({
                onHidePanel: function(date) {
                    validateDateTime('data_update_view_startTime3', 'data_update_view_endTime3', 'data_update_view_startTime3');
                }
            });
            $('#data_update_view_endTime3').datetimebox({
                onHidePanel: function(date) {
                    validateDateTime('data_update_view_startTime3', 'data_update_view_endTime3', 'data_update_view_endTime3');
                }
            });
        }
    }
}

// var buttons = $.extend([], $.fn.datetimebox.defaults.buttons);
// buttons.splice(2, 1, {
//     text: '清除',
//     handler: function(target) {
//         $(target).combo('setValue', '').combo('setText', '');
//         $(this).closest("div.combo-panel").panel("close");
//     }
// });
var dataChangedOption = '';
var dataChangedSel = "";
var DataChangedMonitor = function() {


    return {
        pageSize: 10,
        init: function() {
            var _self = this;
            dataChangedSel = this;
            _self.excClick();
            _self.resetClick();
            // _self.freshClick();
            _self.exportTotal();
        },
        createDeptDataStatistics: function() {
            var _self = this;
            $('#deptDataStatistics').datagrid({
                //title:'菜单列表', //标题    
                // rownumbers:true,
                // method: 'post',
                // iconCls: 'icon-edit', //图标    
                // singleSelect: false, //多选    
                // width: 'auto',
                // height: inHeight, //高度    
                // fitColumns: true, //自动调整各列，用了这个属性，下面各列的宽度值就只是一个比例。    
                // collapsible:true,//可折叠    
                // url: "http://", //数据来源    
                // sortName: 'id', //默认排序的列    
                // sortOrder: 'desc', //倒序    
                // idField: 'id', //主键字段    
                // queryParams: {}, //查询条件      
                remoteSort: true, //服务器端排序  
                striped: true, //奇偶行颜色不同  
                pageSize: 10,
                pageNumber: 1,
                fitColumns: true,
                pageList: [10, 20, 30, 50, 100],
                selectOnCheck: true,
                pagination: true,
                onLoadSuccess: function(data) {
                    dataChangedOption = data;
                    _self.noRecordsProc(data, 6, "deptDataStatistics");
                },
                columns: [
                    [{
                        field: 'deptName',
                        title: '部门名称',
                        width: '23%',
                        align: 'center',
                        formatter: function(value, row, index) {
                            return value;
                        }
                    }, {
                        field: 'newCount',
                        title: '新增（条）',
                        width: '15%',
                        align: 'center'
                    }, {
                        field: 'changeCount',
                        title: '修改（条）',
                        width: '15%',
                        align: 'center',
                        formatter: function(value, row, index) {
                            return value;
                        }
                    }, {
                        field: 'deleteCount',
                        title: '删除（条）',
                        width: '15%',
                        align: 'center'
                    }, {
                        field: 'incremental_count',
                        title: '总数（条）',
                        width: '15%',
                        align: 'center'
                    }, {
                        field: 'create_date',
                        title: '最后更新时间',
                        width: '15%',
                        align: 'center',
                        formatter: function(value, row, index) {
                            return value;
                        }
                    }]
                ]
            });
            var pager = $('#deptDataStatistics').datagrid('getPager');
            pager.pagination({
                total: 0,
                // pageSize: 10,
                onSelectPage: function(pageNum, pageSize) {
                    var deptDataStatisParams = _self.getParameters("dataServ");
                    _self.getGridData(pageNum, pageSize, deptDataStatisParams, "deptDataStatistics");
                }
            });
        },
        getGridData: function(pageNumber, pageSize, dataParams, gridName, callBack) {
            _self = this;
            dataParams.page = pageNumber;
            dataParams.rows = pageSize;
            $.ajax({
                url: '/ipeg-web/requestDispatcher',
                type: 'post',
                data: dataParams,
                dataType: 'json',
                cache: false,
                success: function(result) {

                    if (result.status != 0) {
                        result.total = 0;
                        result.data = [];
                        $('#' + gridName).datagrid('getPager').pagination({
                            pageSize: pageSize,
                            displayMsg: '共 0 条记录'
                        });

                        // result.data = [{
                        //     deptName: '云计算与大数据平台一部',
                        //     addNum: 300,
                        //     modifyNum: 250,
                        //     delNum: 200,
                        //     totalNum: 100,
                        //     lastUpdate: '2019-01-31',
                        // }]

                        // $('#' + gridName).datagrid("loadData", result.data);
                        // _self.noRecordsProc(result.data, 6, "deptDataStatistics");

                    } else {
                        $('#' + gridName).datagrid('getPager').pagination({
                            pageSize: pageSize,
                            displayMsg: '共 {total} 条记录'
                        });

                        // result.data = [{
                        //     deptName: '云计算与大数据平台一部',
                        //     addNum: 300,
                        //     modifyNum: 250,
                        //     delNum: 200,
                        //     totalNum: 100,
                        //     lastUpdate: '2019-01-31',
                        // }, {
                        //     deptName: '云计算政企二部',
                        //     addNum: 300,
                        //     modifyNum: 250,
                        //     delNum: 200,
                        //     totalNum: 100,
                        //     lastUpdate: '2019-01-31',
                        // }]
                        var data = result.rows;
                        // result.total = 15;

                        $('#' + gridName).datagrid("loadData", result);
                    }
                }
            })
        },
        excClick: function() {
            var handler = this;
            $("#searchTotal2").click(function() {
                var grid = $(this).attr("grid") || 'deptDataStatistics';
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
            $("#searchReset2").on('click', function() {
                $('#deptSearch_deptDataChanged').val('');
                $("#data_update_view_startTime3").datetimebox('setValue', '');
                $("#data_update_view_endTime3").datetimebox("setValue", '');
            });

        },
        exportTotal: function() {
            $('#exportTotal2').on('click', function() {
                var deptName = $('#deptSearch_deptDataChanged').val().trim();
                var startDate = $('#data_update_view_startTime3').datetimebox('getValue');
                var endDate = $('#data_update_view_endTime3').datetimebox('getValue');
                var startTime = startDate == "" ? "" : startDate;
                var endTime = endDate == "" ? "" : endDate;

                var exportParams = [
                    'commandCode=19000312',
                    'type=departchange',
                    'departname=' + deptName,
                    'startTime=' + startTime,
                    'endTime=' + endTime
                ];

                exportDataSources(exportParams);
            });
        },
        noRecordsProc: function(data, colNum, gridName) {
            if (data.total == 0) {
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

            var param = {
                deptName: 'All'
            };

            param.deptName = $('#deptSearch_deptDataChanged').val() || param.deptName;
            // param.startTime = $('#data_update_view_startTime3').datebox('getValue') + ' 00:00:00';
            // param.endTime = $('#data_update_view_endTime3').datebox('getValue') + ' 23:59:59';
            var startDate = $('#data_update_view_startTime3').datebox('getValue');
            var endDate = $('#data_update_view_endTime3').datebox('getValue');
            param.startTime = startDate == "" ? "" : startDate;
            param.endTime = endDate == "" ? "" : endDate;


            if (param.startTime > param.endTime) {
                return -2;
            }

            param.commandCode = 19000310;
            return param;
        }
    }
}


$(function() {
    $('.page_wrapper').show();
    $('.tableWrapper_hide').hide();
    // dataChangedMonitor = new DataChangedMonitor();
    // deptDataStatis = new DeptDataStatis(dataChangedMonitor);

    // // var startTime = getLastWeekDate();
    // // deptDataStatis.dataTimeInit(startTime);

    // deptDataStatis.init();
    // dataChangedMonitor.init();
});

function deptDataChangedStatisticInit() {
    $("#searchReset2").trigger('click');
    dataChangedMonitor = new DataChangedMonitor();
    deptDataStatis = new DeptDataStatis(dataChangedMonitor);

    deptDataStatis.dataTimeInit();
    deptDataStatis.init();
    dataChangedMonitor.init();
}
