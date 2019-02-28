// $.extend($.fn.validatebox.defaults.rules, {
//     ip: {
//         validator: function (value, param) {
//             return /^((25[0-5]|2[0-4]\d|[01]?\d\d?)($|(?!\.$)\.)){4}$/.test(value);
//         },
//         message: '请输入正确的ip地址([0-255].[0-255].[0-255].[0-255])'
//     }
// });

var defaultPrompt = "没有查询到相关记录！";
var ServiceStatis = function(service) {
    return {
        init: function() {
            var servStatisParams = service.getParameters("ServStatis");
            service.createServiceStatistics();
            service.getGridData(1, service.pageSize, servStatisParams, "serviceStatistics");
        },
        dataTimeInit: function(startDate, endDate) {


            $('#data_update_view_startTime5').datetimebox().datetimebox('calendar').calendar({
                validator: function(date) {
                    var now = new Date();
                    var d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    return date <= d1;
                }
            });

            $('#data_update_view_endTime5').datetimebox().datetimebox('calendar').calendar({
                validator: function(date) {
                    var now = new Date();
                    var d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    return date <= d1;
                }
            });

            $('#data_update_view_startTime5').datetimebox({
                onHidePanel: function(date) {
                    validateDateTime('data_update_view_startTime5', 'data_update_view_endTime5', 'data_update_view_startTime5');
                }
            });
            $('#data_update_view_endTime5').datetimebox({
                onHidePanel: function(date) {
                    validateDateTime('data_update_view_startTime5', 'data_update_view_endTime5', 'data_update_view_endTime5');
                }
            });

            $("#data_update_view_startTime5").datetimebox('setValue', startDate);
            $("#data_update_view_endTime5").datetimebox("setValue", endDate);
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
var servDataOption = '';
var servSel = "";
var Service = function() {


    return {
        pageSize: 10,
        init: function() {
            var _self = this;
            servSel = this;
            _self.excClick();
            _self.resetClick();
            _self.freshClick();
            _self.exportTotal();
        },
        createServiceStatistics: function() {
            var _self = this;
            $('#serviceStatistics').datagrid({
                pageSize: 10,
                pageList: [10, 20, 30, 50, 100],
                remoteSort: true,
                striped: true,
                selectOnCheck: true,
                pagination: true,
                onLoadSuccess: function(data) {
                    servDataOption = data;
                    _self.noRecordsProc(data, 5, "serviceStatistics");
                },
                columns: [
                    [{
                        field: 'dept',
                        title: '部门名称',
                        width: '20%',
                        align: 'center',
                        formatter: function(value, row, index) {
                            return value;
                        }
                    }, {
                        field: 'pulishServiceInfoCount',
                        title: '开放服务数（个）',
                        sortable: true,
                        width: '20%',
                        align: 'center'
                    }, {
                        field: 'conumserServiceCount',
                        title: '使用服务数（个）',
                        sortable: true,
                        width: '20%',
                        align: 'center',
                        formatter: function(value, row, index) {
                            return value;
                        }
                    }, {
                        field: 'provideServiceCount',
                        title: '被使用服务数（个）',
                        sortable: true,
                        width: '20%',
                        align: 'center'
                    }, {
                        field: 'onlineRate',
                        title: '接口稳定率',
                        sortable: true,
                        width: '22%',
                        align: 'center'
                    }]
                ]
            });
            var pager = $('#serviceStatistics').datagrid('getPager');
            pager.pagination({
                total: 0,
                onSelectPage: function(pageNum, pageSize) {
                    var servStatisParams = _self.getParameters("ServStatis");
                    _self.getGridData(pageNum, pageSize, servStatisParams, "serviceStatistics");
                }
            });
        },
        getGridData: function(pageNumber, pageSize, servStatisParams, gridName, callBack) {
            _self = this;
            // servStatisParams.pagenumber = pageNumber;
            // servStatisParams.pagesize = pageSize;
            $.ajax({
                url: '/ipeg-web/requestDispatcher',
                type: 'post',
                data: servStatisParams,
                dataType: 'json',
                cache: false,
                success: function(result) {
                    if (result.status != 0) {
                        // _self.noRecordsProc(data, 5, "serviceStatistics");
                        // result.data = [{
                        //     dept: '云计算与大数据平台一部',
                        //     pulishServiceInfoCount: 300,
                        //     conumserServiceCount: 250,
                        //     provideServiceCount: 200,
                        //     onlineRate: 100
                        // }, {
                        //     dept: '政企一部',
                        //     pulishServiceInfoCount: 300,
                        //     conumserServiceCount: 250,
                        //     provideServiceCount: 200,
                        //     onlineRate: 100
                        // }]
                        // result.data.push(...result.data)
                        // result.data.push(...result.data)
                        // result.data.push(...result.data)
                        // result.data.push(...result.data)
                        // // $('#' + gridName).datagrid("loadData", result.data);
                        // var deptName = $('#deptSearch2').val();
                        // var fields = [],
                        //     keyWords = [];

                        // if (deptName.trim() != "") {
                        //     result.data = fuzzyQuery(result.data, 'dept', deptName);
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
                        //     pulishServiceInfoCount: 300,
                        //     conumserServiceCount: 250,
                        //     provideServiceCount: 200,
                        //     onlineRate: 100
                        // }]
                        // $('#' + gridName).datagrid("loadData", result.data);

                        var deptName = $('#deptSearch2').val();
                        var data = result.serviceStatistic;
                        // data.push(...data);
                        var fields = [],
                            keyWords = [];

                        if (deptName.trim() != "") {
                            data = fuzzyQuery(data, 'dept', deptName);
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
            $("#searchTotal2").click(function() {
                var grid = $(this).attr("grid") || 'serviceStatistics';
                var type = $(this).attr("type");
                handler.queryData(grid, type);
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
            if (parm == -1) {} else if (parm == -2) {} else {
                handler.getGridData(1, 10, parm, grid);
            }
        },
        resetClick: function() {
            var handler = this;
            $("#searchReset2").click(function() {
                $('#deptSearch2').val('');
                $("#data_update_view_startTime5").datetimebox('setValue', '');
                $("#data_update_view_endTime5").datetimebox("setValue", '');
            });
        },
        exportTotal: function() {
            $('#exportTotal').on('click', function() {


                var dept = $('#deptSearch').val().trim();
                var startTime = $('#data_update_view_startTime5').datebox('getValue');
                var endTime = $('#data_update_view_endTime5').datebox('getValue');

                var exportParams = [
                    'commandCode=19000312',
                    'type=committee',
                    'departname=' + dept,
                    'startTime=' + startTime,
                    'endTime=' + endTime
                ];


                // exportDataSources(exportParams);
            });
        },
        noRecordsProc: function(data, colNum, gridName) {
            if (data && data.total == 0) {
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
            var param = {};
            // var deptname = $('#deptSearch2').val();
            // if (deptname.trim() != "") {
            //     param.deptname = deptname;
            // }

            param.startTime = $('#data_update_view_startTime5').datebox('getValue');

            param.endTime = $('#data_update_view_endTime5').datebox('getValue');


            if (param.startTime > param.endTime) {
                return -2;
            }

            param.commandCode = 19000403;
            return param;
        }
    }
}

var service = {};
$(function() {


    service = new Service();
    var serviceStatis = new ServiceStatis(service);
    // var startTime = moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss');
    // var endTime = moment().format('YYYY-MM-DD HH:mm:ss');
    serviceStatis.dataTimeInit(startTime, endTime);

    serviceStatis.init();
    service.init();
})
