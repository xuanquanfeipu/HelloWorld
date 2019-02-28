var timesCond = {
    'current': moment().format('YYYY-MM-DD HH:mm:ss'),
    'oneday': moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
    'threeday': moment().subtract(3, 'days').format('YYYY-MM-DD HH:mm:ss'),
    'oneweek': moment().subtract(7, 'days').format('YYYY-MM-DD HH:mm:ss'),
    'onemonth': moment().subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss')
};

var topN = {
    top5: 5,
    top10: 10
};



$(function() {


    // $('#frontNumVal').text(40);
    // var data = {};
    // data.title = '资源订阅统计';
    // drawResSubPieChart(data);
    // drawResSubBarChart('1');
    // data.title = '资源查询统计';
    // drawResQueryPieChart(data);
    // drawResQueryBarChart(data);
    // drawDeptDataChangedBarChart(data);
    // drawDeptDataChangedLineChart(data);

    timeBtnInit();
    comboboxInit();
    breadcrumbInit();
    rebackInit();
    deptInit();
    deptReq();
    frontNumReq();
    resSubReq();
    resQueryReq()
    deptDataChangedReq();
    deptDataChangedTrendReq();
    queryDeptDataChangedTrendBtnInit();


    showDetail("#tableWrapper_deptDataChanged", '部门数据变化量统计详情');
    showDetail("#tableWrapper_resSubStatis", '资源订阅统计详情');
    showDetail("#tableWrapper_resQueryStatis", '资源查询统计详情');

});

function rebackInit() {
    $('.tableWrapper .fa-reply').on('click', function() {
        showMain();
    });

    $('#tableWrapper_deptDataChanged .fa-reply').on('click', function() {
        // $("#searchReset2").trigger('click');
        // $('#deptDataStatistics').datagrid("loadData", []);
        // var item = $('#deptDataStatistics').datagrid('getRows');
        // if (item) {
        //     for (var i = item.length - 1; i >= 0; i--) {
        //         var index = $('#deptDataStatistics').datagrid('getRowIndex', item[i]);
        //         $('#deptDataStatistics').datagrid('deleteRow', index);
        //     }
        // }

    });
}

function breadcrumbInit() {
    var breadcrumb_datares = $("#ipeg-data-resmonitor-submenu-infrastructure", window.parent.document);
    // parent.$("#ipeg-data-resmonitor-submenu-infrastructure",parent.doucment).on('click',function () {
    //     $('.page_wrapper').show();
    //     $('#tableWrapper_deptDataChanged').hide();
    // });
    // document.getElementById('iframe的id').contentWindow.document.getElementById('iframe里要获取的元素的id');
    // $("#page-mainIframe").contents().get(0).getElementById('ETLTask4-2999').click()  父窗口中触发子窗口中元素的事件

    parent.$(breadcrumb_datares).on('click', function() { //子窗口中定义或触发父窗口中元素的事件
        showMain();
    });
}

function comboboxInit() {
    $('#deptName1').combobox({
        onChange: function(newValue, oldValue) {
            var params = getResSubReqParams();
            params.type = newValue;
            resSubReq(params);

        }
    });

    $('#deptName2').combobox({
        onChange: function(newValue, oldValue) {
            var params = getResQueryReqParams();
            params.type = newValue;
            resQueryReq(params);

        }
    });
}

function showMain() {
    $('.page_wrapper').show();
    $('.tableWrapper_hide').hide();
    $(".breadcrumbUl .fa-append,.breadcrumbUl .title-append", window.parent.document).remove();
}

function showDetail(id, title) {
    $(id + '_detail').on('click', function() {

        switch (id) {
            case '#tableWrapper_deptDataChanged':

                // dataChangedMonitor = new DataChangedMonitor();
                // deptDataStatis = new DeptDataStatis(dataChangedMonitor);

                // deptDataStatis.init();
                // dataChangedMonitor.init();

                deptDataChangedStatisticInit();

                break;
            case '#tableWrapper_resSubStatis':

                // $('#deptSearch_dataProviderDept').val('');
                // $('#deptSearch_dataSubDept').val('');

                // dataProviderMonitor = new DataProviderMonitor();
                // dataProviderDeptStatis = new DataProviderDeptStatis(dataProviderMonitor);
                // dataProviderDeptStatis.init();
                // dataProviderMonitor.init();

                // dataSubMonitor = new DataSubMonitor();
                // dataSubDeptStatis = new DataSubDeptStatis(dataSubMonitor);
                // dataSubDeptStatis.init();
                // dataSubMonitor.init();

                dataProviderDeptStatisInit();
                dataSubDeptStatisInit();

                break;

            case '#tableWrapper_resQueryStatis':

                // $('#deptSearch_resQueryProvider').val('');
                // $('#deptSearch_resQuerySubDept').val('');

                // dataQeruyProviderMonitor = new DataQeruyProviderMonitor();
                // dataQueryProviderDeptStatis = new DataQueryProviderDeptStatis(dataQeruyProviderMonitor);
                // dataQueryProviderDeptStatis.init();
                // dataQeruyProviderMonitor.init();

                // dataQuerySubMonitor = new DataQuerySubMonitor();
                // dataQuerySubDeptStatis = new DataQuerySubDeptStatis(dataQuerySubMonitor);
                // dataQuerySubDeptStatis.init();
                // dataQuerySubMonitor.init();
                dataQueryProviderDeptStatisInit();
                dataQuerySubDeptStatisInit();

                break;
            default:
                // statements_def
                break;
        }
        $('.page_wrapper').hide();
        $(id).show();
        var breadcrumb = $(".breadcrumbUl", window.parent.document);
        breadcrumb.append('<i class="fa fa-angle-right fa-append"></i>');
        breadcrumb.append('<a><span class="title title-append">' + title + '</span></a>');
    });

}


function deptInit() {
    var deptdata = [{
        "id": "provider",
        "text": "数据提供部门",
        "selected": true
    }, {
        "id": "user",
        "text": "数据订阅部门"
    }];
    $('#deptName1,#deptName2').combobox("loadData", deptdata);
}

function deptReq() {

    $.ajax({
        url: '/ipeg-web/requestDispatcher',
        type: 'post',
        data: {
            commandCode: 19000311
        },
        dataType: 'json',
        cache: false,
        async: false,
        success: function(result) {
            if (result.status == 0 && result.data.length) {
                var data = result.data.map(function(e, i) {
                    return {
                        id: e.departmentID,
                        text: e.name
                    }
                });
                data[0].selected = true;
                $('#deptName').combobox("loadData", data);
            }
        }
    });


}

function frontNumReq() {

    $.ajax({
        url: '/ipeg-web/requestDispatcher',
        type: 'post',
        data: {
            commandCode: 19000305
        },
        dataType: 'json',
        cache: false,
        async: false,
        success: function(result) {
            if (result.status == 0 && result.data.length) {
                $('#frontNumVal').text(result.data[0].value + '台');
            }
        }
    });


}


function timeBtnInit() {
    // var buttons2 = $.extend([], $.fn.datetimebox.defaults.buttons);
    // buttons2.splice(2, 1, {
    //     text: '清除',
    //     handler: function(target) {
    //         $(target).combo('setValue', '').combo('setText', '');
    //         $(this).closest("div.combo-panel").panel("close");
    //     }
    // });
    $('#data_update_view_startTime').datetimebox({
        onHidePanel: function(date) {
            validateDateTime('data_update_view_startTime', 'data_update_view_endTime', 'data_update_view_startTime');
        }
    });
    $('#data_update_view_endTime').datetimebox({
        onHidePanel: function(date) {
            validateDateTime('data_update_view_startTime', 'data_update_view_endTime', 'data_update_view_endTime');
        }
    });
    // $("#data_update_view_startTime").datetimebox().datetimebox('calendar').calendar({        
    //     validator: function(date){
    //         var nowdate=new Date();
    //         var startTime=new Date(nowdate.getFullYear(),nowdate.getMonth(),nowdate.getDate()-90);
    //         return startTime <= date;
    //     }
    // });
    // $("#data_update_view_endTime").datetimebox().datetimebox('calendar').calendar({        
    //     validator: function(date){
    //         var nowdate=new Date();
    //         var endTime=new Date(nowdate.getFullYear(),nowdate.getMonth(),nowdate.getDate()-90);
    //         return endTime <= date;
    //     }
    // });


    $("#data_update_view_startTime").datetimebox("setValue", moment().subtract(3, 'days').format('YYYY-MM-DD HH:mm:ss'));
    $("#data_update_view_endTime").datetimebox("setValue", moment().format('YYYY-MM-DD HH:mm:ss'));

    $('.btn-group .btn').on('click', function() {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        if ($(this).parent().hasClass('timeafter')) {
            $("#data_update_view_startTime").datetimebox("setValue", timesCond[$(this).attr('name')]);
            $("#data_update_view_endTime").datetimebox("setValue", moment().format('YYYY-MM-DD HH:mm:ss'));
        }

    });

    $('.chart_wrapper:eq(0) .btn-group:eq(0) .btn,.chart_wrapper:eq(0) .btn-group:eq(1) .btn').on('click', function() {
        // var topVal = $(this).text().toLowerCase();
        // var top = topN[topVal];

        deptDataChangedReq(getDeptDataChangedParams());
    });

    $('.chart_wrapper:eq(2) .btn-group:eq(0) .btn').on('click', function() {
        var params = getResSubReqParams();
        resSubReq(params);
    });

    $('.chart_wrapper:eq(2) .btn-group:eq(0) .btn').on('click', function() {
        var params = getResSubReqParams();
        resQueryReq(params);
    });

}

function queryDeptDataChangedTrendBtnInit() {
    $('#searchTotal').on('click', function() {
        deptDataChangedTrendReq();
    });
}

function getDeptDataChangedParams() {


    var timeVal = $('.chart_wrapper:first .btn-group .btn.active').eq(0).attr('name');
    var topVal = $('.chart_wrapper:first .btn-group .btn.active').eq(1).attr('name');

    var startTime = timesCond[timeVal] || timesCond['oneday'];
    var endTime = moment().format('YYYY-MM-DD HH:mm:ss') || moment().format('YYYY-MM-DD HH:mm:ss');
    var top = topN[topVal] || topN['top5'];

    var params = {
        commandCode: 19000304,
        top,
        startTime,
        endTime
    };
    // console.log(params);
    return params;
}

function getDeptDataChangedTrendParams() {


    var timeVal = $('.chart_wrapper:eq(1) .btn-group .btn.active').attr('name');
    var startDate = $("#data_update_view_startTime").datetimebox("getValue");
    var endDate = $("#data_update_view_endTime").datetimebox("getValue");
    var startTime = "";
    var endTime = "";
    if (startDate != "") {

        startTime = startDate || timesCond[timeVal] || moment().subtract(3, 'days').format('YYYY-MM-DD HH:mm:ss');
    }

    if (endDate != "") {

        endTime = endDate || moment().format('YYYY-MM-DD HH:mm:ss');
    }
    // var id = $('#deptName').combobox('getValue');
    var params = {
        // deptname: $('#deptName').combobox('getText'),
        commandCode: 19000309,
        startTime,
        endTime
    };
    // console.log(params);
    return params;
}

// $('#deptName').combobox({
//     onChange: function(newValue, oldValue) {
//         deptDataChangedReq();

//     }
// });

function deptDataChangedReq(params) {

    var params = params || {
        commandCode: 19000304,
        top: 5,
        startTime: moment().subtract(3, 'days').format('YYYY-MM-DD HH:mm:ss'),
        endTime: moment().format('YYYY-MM-DD HH:mm:ss')
    };

    $.ajax({
        url: '/ipeg-web/requestDispatcher',
        type: 'post',
        data: params,
        dataType: 'json',
        cache: false,
        async: false,
        success: function(result) {

            // result = [{
            //     "total": [{
            //         "name": "中移动",
            //         "value": "106"
            //     }, {
            //         "name": "原始库部",
            //         "value": "55"
            //     }]
            // }, {
            //     "detail": [{
            //         "name": "新增",
            //         "value": "66"
            //     }, {
            //         "name": "修改",
            //         "value": "10"
            //     }, {
            //         "name": "删除",
            //         "value": "30"
            //     }, {
            //         "name": "新增",
            //         "value": "25"
            //     }, {
            //         "name": "修改",
            //         "value": "20"
            //     }, {
            //         "name": "删除",
            //         "value": "10"
            //     }]
            // }, {
            //     "status": 0
            // }]

            var data = {},
                deptNames = [],
                total = [],
                increase = [],
                change = [],
                deleted = [],
                _max = 100,
                _datamax = [];
            data.total = total;
            data.increase = increase;
            data.change = change;
            data.delete = deleted;
            data._max = _max;
            data._datamax = [];
            if (result[2] && result[2].status == 0) {

                result[0].total.forEach(function(e, i) {
                    deptNames.push(e.name);
                    total.push(+e.value);
                });
                result[1].detail.forEach(function(e, i) {
                    if (e.name == "新增") {
                        increase.push(+e.value);
                    } else if (e.name == "修改") {
                        change.push(+e.value);
                    } else {

                        deleted.push(+e.value);
                    }
                });
                data.deptNames = deptNames;
                data.total = total;
                data.increase = increase;
                data.change = change;
                data.delete = deleted;
                data._max = Math.max(...total) || _max;
                result[0].total.forEach(function(e, i) {
                    _datamax.push(data._max);
                });
                data._datamax = _datamax;

                // data.title = '资源订阅统计';
                // data.legend = '资源被订阅量（条）';
            }
            drawDeptDataChangedBarChart(data);
        },
        error: function() {
            var data = {},
                deptNames = [],
                total = [],
                increase = [],
                change = [],
                deleted = [],
                _max = 100,
                _datamax = [];
            data.total = total;
            data.increase = increase;
            data.change = change;
            data.delete = deleted;
            data._max = _max;
            data._datamax = [];
            drawDeptDataChangedBarChart(data);
        }
    });
}

function deptDataChangedTrendReq() {

    var params = getDeptDataChangedTrendParams() || {
        commandCode: 19000309,
        startTime: moment().subtract(3, 'days').format('YYYY-MM-DD HH:mm:ss'),
        endTime: moment().format('YYYY-MM-DD HH:mm:ss')
    };
    $.ajax({
        url: '/ipeg-web/requestDispatcher',
        type: 'post',
        data: params,
        dataType: 'json',
        cache: false,
        async: false,
        success: function(result) {
            var data = {};
            data.dateTimes = [];
            data.dataSizes = [];
            if (result.status == 0) {
                var odata = result.data;
                // var deptNames = result.data.map(function(e, i) {
                //     return {
                //         id: i + '',
                //         name: e.deptname
                //     };
                // });
                // $('#deptName').combobox("loadData", deptNames);

                // var adata = [{
                //     "dateTime": "2019-02-15",
                //     "dataSize": "60"
                // }, {
                //     "dateTime": "2019-02-16",
                //     "dataSize": "30"
                // }, {
                //     "dateTime": "2019-02-17",
                //     "dataSize": "50"
                // }, {
                //     "dateTime": "2019-02-18",
                //     "dataSize": "82"
                // }];

                var deptName = $('#deptName').combobox('getText');
                var adata = [];
                odata.forEach(function(e, i) {
                    if (e.deptname == deptName) {
                        adata = e.data;
                    }
                });


                adata.forEach(function(e, i) {
                    if (i == 0) {
                        data.dateTimes.push(moment(e.dateTime).format('YYYY.M.D'));

                    } else {
                        data.dateTimes.push(moment(e.dateTime).format('M.D'));
                    }
                    data.dataSizes.push(e.dataSize);
                });

                // data.title = '资源订阅统计';
                // data.legend = '资源被订阅量（条）';

            }
            drawDeptDataChangedLineChart(data);
        },
        error: function() {
            var data = {};
            data.dateTimes = [];
            data.dataSizes = [];
            drawDeptDataChangedLineChart(data);
        }
    });
}


function getResSubReqParams() {
    var params = {
        commandCode: 19000301,
        top: 5,
        type: 'provider'
    };

    var topVal = $('.chart_wrapper:eq(2) .btn-group .btn.active').eq(1).attr('name');
    params.top = topN[topVal] || 5;
    params.type = $('#deptName1').combobox('getValue') || params.type;

    return params;
}

function resSubReq(params) {

    var params = params || {
        commandCode: 19000301,
        top: 5,
        type: 'provider'
    };

    $.ajax({
        url: '/ipeg-web/requestDispatcher',
        type: 'post',
        data: params,
        dataType: 'json',
        cache: false,
        async: false,
        success: function(result) {
            var data = {};
            data.title = '资源订阅统计';
            data.legend = '资源被订阅量（条）';
            if (result.status == 0) {
                data.values = result.data;
            }
            drawResSubPieChart(data);
            drawResSubBarChart(data);
        },
        error: function() {
            var data = {};
            data.title = '资源订阅统计';
            data.legend = '资源被订阅量（条）';
            drawResSubPieChart(data);
            drawResSubBarChart(data);
        }
    });
};

function getResQueryReqParams() {
    var params = {
        commandCode: 19000306,
        top: 5,
        type: 'provider'
    };

    var topVal = $('.chart_wrapper:eq(3) .btn-group .btn.active').eq(1).attr('name');
    params.top = topN[topVal] || 5;
    return params;
}

function resQueryReq(params) {
    var params = params || {
        commandCode: 19000306,
        top: 5,
        type: 'provider'
    };

    // var topVal = $('.chart_wrapper:eq(3) .btn-group .btn.active').eq(1).attr('name');
    // params.top = topN[topVal] || 5;
    // params.type = newValue || $('#deptName2').combobox('getValue') || params.type;

    $.ajax({
        url: '/ipeg-web/requestDispatcher',
        type: 'post',
        data: params,
        dataType: 'json',
        cache: false,
        async: false,
        success: function(result) {
            var data = {};
            data.title = '资源查询统计';
            data.legend = '资源被查询量（条）';
            data.values = [];
            if (result.status == 0) {
                data.values = result.data;
            }
            drawResQueryPieChart(data);
            drawResQueryBarChart(data);

        },
        error: function() {
            var data = {};
            data.title = '资源查询统计';
            data.legend = '资源被查询量（条）';
            data.values = [];

            drawResQueryPieChart(data);
            drawResQueryBarChart(data);
        }
    });
};


function barChartInit(id, data, callBack) {
    var myChart = echarts.init(document.getElementById(id));
    myChart.setOption(callBack(data));
};

function pieChartInit(id, data, callBack) {
    var myChart = echarts.init(document.getElementById(id));
    myChart.setOption(callBack(myChart, data));
};

function drawResSubPieChart(data) {
    pieChartInit('resSubPieChart', data, getSubPieOption);
    // var myChart1 = echarts.init(document.getElementById('resSubPieChart'));
    // myChart1.setOption(getSubPieOption(myChart1,data));
};

function drawResSubBarChart(data) {
    barChartInit('resSubBarChart', data, getSubBarOption);
    // var myChart2 = echarts.init(document.getElementById('resSubBarChart'));
    //       myChart2.setOption(getSubBarOption(data));
};

function drawResQueryPieChart(data) {
    pieChartInit('resQueryPieChart', data, getSubPieOption);
};

function drawResQueryBarChart(data) {
    barChartInit('resQueryBarChart', data, getSubBarOption);
};

function drawDeptDataChangedBarChart(data) {
    barChartInit('deptDataChangedStatistic', data, getDeptDataChangedBarOption);
};

function drawDeptDataChangedLineChart(data) {
    barChartInit('deptDataChangedLineChart', data, getDeptDataChangedLineOption);
};

function getDeptDataChangedLineOption(data) {

    option = {
        backgroundColor: "rgba(255,255,255,1)",
        title: {
            text: '部门数据变化趋势统计',
            textStyle: {
                color: '#757D8C'
            },
            left: '10',
            top: '10',
            //            textAlign: 'center'
        },
        grid: {
            containLabel: true,
            top: '30%',
            left: '3%',
            right: '5%',
            bottom: '3%'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#ddd'
                }
            },
            backgroundColor: 'rgba(255,255,255,1)',
            padding: [5, 10],
            textStyle: {
                color: '#7588E4',
            },
            extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
        },
        legend: {
            show: false,
            right: 20,
            orient: 'vertical',
            data: ['部门数据变化量']
        },
        xAxis: {
            type: 'category',
            data: data.dateTimes, //['2019.1.1', '1.5', '1.10', '1.15', '1.20', '1.25', '1.30'],
            boundaryGap: false,
            splitLine: {
                show: false,
                interval: 'auto',
                lineStyle: {
                    color: ['#D4DFF5']
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#B7B7B7'
                }
            },
            axisLabel: {
                margin: 10,
                textStyle: {
                    fontSize: 14
                }
            }
        },
        yAxis: {
            type: 'value',
            name: '(条)',
            splitLine: {
                lineStyle: {
                    color: ['#D7D7D7']
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#B7B7B7'
                }
            },
            axisLabel: {
                margin: 10,
                textStyle: {
                    fontSize: 14
                }
            }
        },
        series: [{
            name: '部门数据变化量',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            data: data.dataSizes, //['200', '1400', '808', '811', '626', '488', '1600'],
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(226, 242, 221,1)'
                    }, {
                        offset: 1,
                        color: 'rgba(226, 242, 221,1)'
                    }], false)
                }
            },
            itemStyle: {
                normal: {
                    color: '#A2D494'
                }
            },
            lineStyle: {
                normal: {
                    width: 2
                }
            }
        }]
    };

    return option;
}

function getDeptDataChangedBarOption(data) {
    var spNum = 5,
        _max = data._max, //100,
        unit = '（条）',
        legendData = ['新增', '修改', '删除'],
        y_data = data.deptNames, //['部门1', '部门2', '部门3', '部门4', '部门5', '部门6'];
        _datamax = data._datamax, //[100, 100, 100, 100, 100, 100],
        _data1 = data.increase, //[10, 15, 10, 13, 15, 11],
        _data2 = data.change, //[19, 5, 40, 33, 15, 51],
        _data3 = data.delete, //[21, 55, 10, 13, 35, 11],
        _data4 = data.total, //[50, 75, 60, 59, 65, 73];
        colors = ['#9DD28E', '#7E97B2', '#E18489'];

    var fomatter_fn = function(v) {
        return v.value ? (v.value / _max * 100).toFixed(0) : ''
    }
    var _label = {
        normal: {
            show: true,
            position: 'inside',
            formatter: fomatter_fn,
            textStyle: {
                color: '#fff',
                fontSize: 14
            }
        }
    };
    option = {
        backgroundColor: '#fff',
        title: {
            text: '部门数据变化量统计',
            textStyle: {
                color: '#757D8C'
            },
            left: '10',
            top: '10'
        },
        legend: {
            x: "left",
            top: "10%",
            left: "10%",
            bottom: "0%",
            data: legendData.map(function(item) {
                return {
                    name: item,
                    icon: 'circle'
                }
            }),
            textStyle: {
                color: '#A2A2A2'
            },
            // 使用字符串模板，模板变量为图例名称 {name}
            //formatter: 'Legend {name}'
            // 使用回调函数
            formatter: function(name) {
                return name + unit;
            }
        },
        grid: {
            containLabel: true,
            top: '30%',
            left: '3%',
            right: '3%',
            bottom: '3%'
        },
        tooltip: {
            show: true,
            backgroundColor: '#fff',
            borderColor: '#ddd',
            borderWidth: 1,
            textStyle: {
                color: '#3c3c3c',
                fontSize: 16
            },
            formatter: function(p) {
                // console.log(p);
                var _arr = p.seriesName.split('/'),
                    idx = p.seriesIndex; //1，2，3
                return '名称：' + p.seriesName + '<br>' + '完成：' + p.value + '<br>' + '占比：' + (p.value / _max * 100).toFixed(0) + '%';
            },
            extraCssText: 'box-shadow: 0 0 5px rgba(0, 0, 0, 0.1)'
        },
        xAxis: {
            splitNumber: spNum,
            interval: _max / spNum,
            max: _max,
            axisLabel: {
                show: false,
                formatter: function(v) {
                    var _v = (v / _max * 100).toFixed(0);
                    return _v == 0 ? _v : _v + '%';
                }
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#E4E4E4'
                }

            }

        },
        yAxis: [{
            data: y_data,
            boundaryGap: false,
            axisLabel: {
                fontSize: 16,
                color: '#8D8D8D'

            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            }
        }, {
            show: false,
            data: y_data,
            axisLine: {
                show: false
            }
        }],
        series: [{
            type: 'bar',
            name: '新增',
            stack: '2',
            label: _label,
            legendHoverLink: false,
            barWidth: 30,
            itemStyle: {
                normal: {
                    color: colors[0]
                },
                emphasis: {
                    color: colors[0]
                }
            },
            data: _data1
        }, {
            type: 'bar',
            name: '修改',
            stack: '2',
            legendHoverLink: false,
            barWidth: 40,
            label: _label,
            itemStyle: {
                normal: {
                    color: colors[1]
                },
                emphasis: {
                    color: colors[1]
                }
            },
            data: _data2
        }, {
            type: 'bar',
            stack: '2',
            name: '删除',
            legendHoverLink: false,
            barWidth: 40,
            label: _label,
            itemStyle: {
                normal: {
                    color: colors[2]
                },
                emphasis: {
                    color: colors[2]
                }
            },
            data: _data3
        }, {
            type: 'bar',
            stack: '2',
            name: '总量',
            legendHoverLink: false,
            barWidth: 40,
            label: {
                normal: {
                    show: true,
                    position: 'insideLeft',
                    formatter: fomatter_fn,
                    textStyle: {
                        color: '#898989',
                        fontSize: 16
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: 'transparent'
                },
                emphasis: {
                    color: 'transparent'
                }
            },
            data: _data4
        }]
    };
    return option;
}

function getSubPieOption(myChart, data) {
    // var values = data.values.sort(function (a,b) {
    //     return a.value > b.value;
    // });
    // xdata = [{
    //     name: data.legend, //'资源被订阅量（条）',
    //     icon: 'circle',
    //     textStyle: {
    //         fontSize: '12',
    //         color: '#898989'
    //     },
    // }];


    // var ydata = [{
    //     name: '部门1',
    //     value: 13
    // }, {
    //     name: '部门2',
    //     value: 25
    // }, {
    //     name: '部门3',
    //     value: 27
    // }, {
    //     name: '部门4',
    //     value: 30
    // }, {
    //     name: '部门5',
    //     value: 20
    // }];
    ydata = data.values;
    // var xdata = ['部门1', "部门2", "部门3", "部门4", '部门5'];
    xdata = data.values && data.values.map(function(e, i) {
        return e.name;
    });
    // ydata2 = [13, 25, 27, 30, 20];
    ydata2 = data.values && data.values.map(function(e, i) {
        return e.value;
    });
    //var color =["#BC8DEE", "#8693F3","#89C3F8","#F2A695","#FCC667","#AEB7F9","#748BFA"]
    var color = ["#BC8DEE", "#8693F3", "#89C3F8", "#F2A695", "#FCC667", "#AEB7F9", "#748BFA"]
    option = {
        title: {
            text: data.title, //'资源订阅统计',
            textStyle: {
                color: '#757D8C'
            },
            left: '10',
            top: '10'
        },
        backgroundColor: "rgba(255,255,255,1)",
        color: color,
        tooltip: {
            trigger: 'item',
            //formatter: "{b}被订阅占比 : {d}% <br/> 数据条数 : {c}条"
            formatter: "被订阅占比 : {d}% <br/> 数据条数 : {c}条"
        },
        legend: {
            orient: "vartical",
            x: "left",
            top: "40%",
            left: "70%",
            bottom: "0%",
            data: xdata,
            itemWidth: 8,
            itemHeight: 8,
            itemGap: 15,
            // formatter: '{text|{b}}\n{value|{d}%}',
            //formatter: '{c|{c}}\n{hr|}\n{d|{d}%}',
            // formatter:'{b} : {value|{d}%}'
            formatter: function(name) {
                var v = ydata[xdata.indexOf(name)].value;
                var sum = ydata2.reduce(function(a, b) {
                    return +a + +b;
                });
                v = ((v / sum) * 100).toFixed(2);
                return '   ' + name + ' : ' + v + '%';
            },
        },
        series: [{
            name: '违规次数',
            type: 'pie',
            clockwise: false, //饼图的扇区是否是顺时针排布
            minAngle: 20, //最小的扇区角度（0 ~ 360）
            radius: ["40%", "58%"],
            center: ["45%", "55%"],
            avoidLabelOverlap: false,
            itemStyle: { //图形样式
                normal: {
                    borderColor: '#ffffff',
                    borderWidth: 10,
                },
            },
            label: {
                normal: {
                    show: false,
                    position: 'center',
                    //formatter: '{text|{b}}\n{value|{d}%}',
                    formatter: '{b}',
                    rich: {
                        text: {
                            color: "#666",
                            fontSize: 14,
                            align: 'center',
                            verticalAlign: 'middle',
                            padding: 5
                        },
                        value: {
                            color: "#8693F3",
                            fontSize: 24,
                            align: 'center',
                            verticalAlign: 'middle',
                        },
                    }
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: 24,
                    }
                }
            },
            data: ydata
        }]
    };
    myChart.setOption(option);

    // setTimeout(function() {
    //     myChart.dispatchAction({
    //         type: 'highlight',
    //         seriesIndex: 0,
    //         dataIndex: 0
    //     });

    //     myChart.on('mouseover', function(params) {
    //         if (params.name == ydata[0].name) {
    //             myChart.dispatchAction({
    //                 type: 'highlight',
    //                 seriesIndex: 0,
    //                 dataIndex: 0
    //             });
    //         } else {
    //             myChart.dispatchAction({
    //                 type: 'downplay',
    //                 seriesIndex: 0,
    //                 dataIndex: 0
    //             });
    //         }
    //     });

    //     myChart.on('mouseout', function(params) {
    //         myChart.dispatchAction({
    //             type: 'highlight',
    //             seriesIndex: 0,
    //             dataIndex: 0
    //         });
    //     });
    // }, 1000);



    return option;
}

function getSubBarOption(data) {

    var values = data.values && data.values.sort(function(a, b) {
        return a.value > b.value;
    });
    xdata = [{
        name: data.legend, //'资源被订阅量（条）',
        icon: 'circle',
        textStyle: {
            fontSize: '12',
            color: '#898989'
        },
    }];
    var ydata = values && values.map(function(e, i) {
        return e.name;
        // console.log(i,e)
    });
    var sum = 0;
    var percentdata = [];
    for (var i = 0; i < data.length; i++) {
        sum += data[i];
    };
    for (var j = 0; j < data.length; j++) {
        percentdata.push((((data[j] / sum) * 100).toFixed(2)));
    };
    // console.log(percentdata);
    option = {
        title: {
            //text:'资源查询统计',
            textStyle: {
                color: '#757D8C'
            },
            left: '10',
            top: '10'
        },
        backgroundColor: "rgba(255,255,255,1)",
        color: ['#9DD28E'],
        grid: {
            left: '8%',
            right: '10%',
            top: '30%',
            bottom: '18%',
            containLabel: true
        },
        legend: {
            orient: "vartical",
            x: "center",
            top: "10%",
            //left: "50%",
            bottom: "0%",
            data: xdata,
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 15,
            formatter: function(name) {
                return name;
            },
        },
        yAxis: {
            data: ydata, //['部门1', '部门2', '部门3', '部门4', '部门5', '部门6', '部门7', '部门8'],
            boundaryGap: false,
            axisTick: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    //type: 'dashed',
                    color: '#E6E6E6'
                }
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#909396',

                }
            },
            axisLabel: {
                color: '#929292'
            },

        },

        xAxis: [{
            type: 'value',
            // max: 100,
            splitNumber: 5,
            axisLabel: {
                show: false
                //   formatter: '{value}%'
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#909396',

                }
            },
            // axisLabel: {
            //     formatter: function (value, index) {
            //         return value + '%';
            //     },
            //     color: '#303439'
            // },
            axisTick: {
                show: false,
            }
        }],
        series: [{
            name: data.legend,
            type: 'bar',
            barWidth: 20,
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    formatter: '{c}', //'{c}%',
                    textStyle: {
                        color: '#9B9B9B'
                    }
                }
            },
            data: data.values //percentdata
        }]
    };


    return option;


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
