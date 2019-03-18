$(function() {

    // window.setInterval(refreshPage, 60000); 

    // var title = '资源上传TOP5';
    //drawResUploadBarChart(title);
    // title = '资源订阅TOP5';
    // drawResSubBarChart(title);
    // title = '数据变化量TOP5';
    // drawDataChangedBarChart(title)
    // title = '开放服务数TOP5';
    // title = '当前告警统计';
    // var data = {};
    // data.title = title;
    // drawServiceOpenNumChart(title);
    // drawCurrentAlarmBarChart(data);
    //    drawDeptDataChangedBarChart();
    // drawGlobalDataChangedBarChart({});
    getInitData();
    resUploadReq();
    resSubReq();
    dataChangedReq();
    // drawServiceOpenNumChart();
    serviceStatisTopReq();
    alramReq();
    globalDataChangedReq();


    // getSystemName('divName');

    function refreshPage() {
        window.location.reload();
    }

    function getInitData() {
        $.ajax({
            url: '/ipeg-web/requestDispatcher',
            type: 'post',
            data: {
                commandCode: 17000104
            },
            dataType: 'json',
            cache: false,
            success: function(result) {
                if (result.status == 0 && result.data.length) {
                    $('.subsystems_wrapper').height(80);
                    createBoxs(result.data);
                } else {
                    $('.subsystems_wrapper').height(0);
                }
            }
        });
    }

    function link(u, l) {
        $.ajax({
            url: '/ipeg-web/requestDispatcher',
            type: 'post',
            data: {
                commandCode: 17000015,
                ID: l,
                ip: u
            },
            dataType: 'json',
            cache: false,
            success: function(result) {
                if (result.name && result.sessionid) {
                    window.open(u + "?name=" + result.name.replace(/\+/g, "%2B") + "&sessionid=" + result.sessionid.replace(/\+/g, "%2B"));
                }
            }
        });
    };

    function createBoxs(result) {
        var sysObj = {
            'BEAS': 'BEAS数据交换平台',
            'DAP': 'DAP大数据管理系统',
            'ESB': 'ESB服务总线系统',
            'RDS': 'RDS目录管理系统',
            'MDM': 'MDM数据治理平台',
            'DSS': 'DSS基础库',
        }
        for (var i = 0; i < result.length; i++) {
            var sign = result[i].signature.substring(5);
            // var sysname = result[i].n || sysObj[sign];
            var sysname = sysObj[sign];
            var className = sign.toLowerCase();
            if ($('.' + className).length) continue;
            $(".box-content").append('<div class="box-item ' + className + '"><span></span><span class="sysname"></span></div>');
            var bid = result[i].signature;
            $(".box-content ." + className).attr("id", bid);
            $("#" + bid).find(".sysname").text(sysname);

            if (result[i].ct != "") {
                (function(i, bid) {
                    $("#" + bid).on('click', function() {
                        link(result[i].u, bid);
                    });
                })(i, bid);

            } else {
                $("#" + bid).addClass("disable");
            }


        }
    }


    function getSystemName(divName, onSuccess, onError) {
        $.ajax({
            url: '/ipeg-web/requestDispatcher',
            type: 'post',
            data: {
                commandCode: 17000115
            },
            dataType: 'json',
            cache: false,
            success: function(result) {
                if (result.status == 0) {
                    $('#' + divName).combobox({
                        onLoadSuccess: function() {
                            if (onSuccess && onSuccess instanceof Function)
                                onSuccess();
                        },
                        onLoadError: function() {
                            if (onError && onError instanceof Function)
                                onError();
                        }
                    });
                    var arr = result.data
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].text == "全部") {
                            var temp = arr[0];
                            arr[0] = arr[i];
                            arr[i] = temp;
                        }
                    }
                    result.data = arr
                    $('#' + divName).combobox("loadData", result.data);
                } else {
                    if (onError && onError instanceof Function)
                        onError();
                }
            }
        })
    }



    function resUploadReq() {

        $.ajax({
            url: '/ipeg-web/requestDispatcher',
            type: 'post',
            data: {
                commandCode: 19000307,
                top: 5,
                type: 0
            },
            dataType: 'json',
            cache: false,
            // async: false,
            success: function(result) {
                var data = {};
                data.values = [];
                data.sizes = {};
                data.title = '资源上传TOP5';
                data.legend = '上传数据量（条）';
                data.color = '#7E97B2';

                if (result.status == 0) {
                    data.values = result.data.map(function(e, i) {
                        return {
                            name: e.deptName,
                            value: e.strUploadInQuantity
                        };
                    });

                    result.data.forEach(function(e, i) {
                        return data.sizes[e.deptName] = e.strUploadInSize.toFixed(2);
                    });
                    // var names = data.map(function (e,i) {
                    //     return e.name;
                    //     // console.log(i,e)
                    // });
                    // data.names = names;

                    // drawResUploadBarChart(data);
                }
                drawResUploadBarChart(data);
            },
            error: function() {
                var data = {};
                data.values = [];
                data.sizes = {};
                data.title = '资源上传TOP5';
                data.legend = '上传数据量（条）';
                data.color = '#7E97B2';
                drawResUploadBarChart(data);
            }
        });

    }

    function resSubReq() {

        $.ajax({
            url: '/ipeg-web/requestDispatcher',
            type: 'post',
            data: {
                commandCode: 19000301,
                top: 5,
                type: 'user'
            },
            dataType: 'json',
            cache: false,
            // async: false,
            success: function(result) {
                var data = {};
                data.title = '资源订阅TOP5';
                data.legend = '资源订阅量（个）';
                data.color = '#A37786';
                if (result.status == 0) {
                    data.values = result.data;
                    // var names = data.map(function (e,i) {
                    //     return e.name;
                    // });
                    // data.names = names;

                    // drawResSubBarChart(data);
                }
                drawResSubBarChart(data);
            },
            error: function() {
                var data = {};
                data.title = '资源订阅TOP5';
                data.legend = '资源订阅量（个）';
                data.color = '#A37786';
                drawResSubBarChart(data);
            }
        });


    }

    function dataChangedReq() {

        $.ajax({
            url: '/ipeg-web/requestDispatcher',
            type: 'post',
            data: {
                commandCode: 19000308,
                top: 5,
                type: 'user'
            },
            dataType: 'json',
            cache: false,
            // async: false,
            success: function(result) {
                var data = {};
                data.title = '数据变化量TOP5';
                data.legend = '数据变化量（条）';
                data.color = '#E18489';
                data.values = [];
                // result = {
                //     "status": "0",
                //     "data": [{
                //         "name": "中心部门",
                //         "value": "5"
                //     }, {
                //         "name": "中联通",
                //         "value": "2"
                //     }, {
                //         "name": "中移动",
                //         "value": "1"
                //     }, {
                //         "name": "委办局",
                //         "value": "1"
                //     }, {
                //         "name": "原始库部",
                //         "value": "1"
                //     }]
                // };
                if (result.status == 0) {

                    data.values = result.data.map(function(e, i) {
                        return {
                            name: e.deptname,
                            value: e.dataSize
                        };
                    });
                    // var names = data.map(function (e,i) {
                    //     return e.name;
                    // });
                    // data.names = names;

                }
                drawDataChangedBarChart(data);
            },
            error: function() {
                var data = {};
                data.title = '数据变化量TOP5';
                data.legend = '数据变化量（条）';
                data.color = '#E18489';
                data.values = [];
                drawDataChangedBarChart(data);
            }
        });
    }


    function serviceStatisTopReq(params) {
        var startTime = moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss');
        var endTime = moment().format('YYYY-MM-DD HH:mm:ss');
        var params = params || {
            commandCode: 19000404,
            startDate: startTime,
            endDate: endTime
        };

        $.ajax({
            url: '/ipeg-web/requestDispatcher',
            type: 'post',
            data: params,
            dataType: 'json',
            cache: false,
            // async: false,
            success: function(result) {
                var serviceStatistic = [],
                    data = {},
                    y_data = [],
                    _max = 100,
                    _datamax = [],
                    _data1 = [],
                    _data2 = [],
                    _data3 = [];

                if (result.status == 0) {

                    serviceStatistic = result.serviceStatistic && result.serviceStatistic.sort(function(a, b) {
                        return +a.pulishServiceInfoCount > +b.pulishServiceInfoCount;
                    });
                    serviceStatistic.forEach(function(e, i) {
                        y_data.push(e.dept);
                        _data1.push(e.provideServiceCount);
                        _data2.push(e.pulishServiceInfoCount - e.provideServiceCount);
                        _data3.push(e.pulishServiceInfoCount);
                    });
                    var _max = Math.max(..._data3);
                    for (var i = serviceStatistic.length - 1; i >= 0; i--) {
                        _datamax.push(_max);
                    }

                } else {}

                data = {
                    y_data,
                    _data1,
                    _data2,
                    _data3,
                    _max,
                    _datamax
                }

                drawServiceOpenNumChart(data);
            },
            error: function() {
                var serviceStatistic = [],
                    y_data = [],
                    _max = 100,
                    _datamax = [],
                    _data1 = [],
                    _data2 = [],
                    _data3 = [];
                var data = {
                    y_data,
                    _data1,
                    _data2,
                    _data3,
                    _max,
                    _datamax
                }

                drawServiceOpenNumChart(data);
            }
        });


    }

    function alramReq() {

        $.ajax({
            url: '/ipeg-web/requestDispatcher',
            type: 'post',
            data: {
                commandCode: 17000027
            },
            dataType: 'json',
            cache: false,
            // async: false,
            success: function(result) {

                var data = {},
                    _datamax = [],
                    names = [],
                    critical = [],
                    major = [],
                    minor = [],
                    warning = [];
                data.names = [];
                data.critical = [];
                data.major = [];
                data.minor = [];
                data.warning = [];
                data.total = 0;
                data._max = 100;
                data._datamax = [];
                data.title = '当前告警统计';
                if (result.status == 0) {
                    critical = result.data.criticalAlarm;
                    major = result.data.majorAlarm;
                    minor = result.data.minorAlarm;
                    warning = result.data.warningAlarm;
                    var names = result.data.systems && result.data.systems.map(function(e, i) {
                        return e.substring(5);
                    });

                    function getSum(preValue, curValue, index, array) {
                        return preValue + curValue;
                    }
                    criticalTotal = critical.reduce(getSum, 0);
                    majorTotal = major.reduce(getSum, 0);
                    minorTotal = minor.reduce(getSum, 0);
                    warningTotal = warning.reduce(getSum, 0);
                    data.total = criticalTotal + majorTotal + minorTotal + warningTotal;
                    data.names = names;
                    data.critical = critical;
                    data.major = major;
                    data.minor = minor;
                    data.warning = warning;
                    for (var i = names.length - 1; i >= 0; i--) {
                        _datamax.push(criticalTotal[i] + majorTotal[i] + minorTotal[i] + warningTotal[i]);
                    }
                    data._datamax = _datamax;
                    data._max = Math.max(..._datamax);

                }
                drawCurrentAlarmBarChart(data);
            },
            error: function() {
                var data = {},
                    names = [],
                    critical = [],
                    major = [],
                    minor = [],
                    warning = [];
                data.names = [];
                data.critical = [];
                data.major = [];
                data.minor = [];
                data.warning = [];
                data.total = 0;
                data.title = '当前告警统计';
                drawCurrentAlarmBarChart(data);
            }
        });
    };

    function globalDataChangedReq() {

        $.ajax({
            url: '/ipeg-web/requestDispatcher',
            type: 'post',
            data: {
                commandCode: 19000313
            },
            dataType: 'json',
            cache: false,
            // async: false,
            success: function(result) {
                var data = {};
                data.dateTimes = [];
                data.dataSizes = [];
                data.title = '全局数据更新统计';
                if (result.status == 0) {
                    result.data.forEach(function(e, i) {
                        if (i == 0) {
                            data.dateTimes.push(moment(e.dateTime).format('YYYY.M.D'));

                        } else {
                            data.dateTimes.push(moment(e.dateTime).format('M.D'));
                        }
                        data.dataSizes.push(e.dataSize);
                    });

                }
                drawGlobalDataChangedBarChart(data);
            },
            error: function() {
                var data = {};
                data.dateTimes = [];
                data.dataSizes = [];
                data.title = '全局数据更新统计';
                drawGlobalDataChangedBarChart(data);
            }
        });
    };



});

function chartInit(id, data, callBack) {
    var myChart = echarts.init(document.getElementById(id));
    myChart.setOption(callBack(data));
}

function drawResUploadBarChart(data) {
    chartInit('resUploadBarChart', data, getSubBarOption);
}

function drawResSubBarChart(data) {
    chartInit('resSubBarChart', data, getSubBarOption);
}

function drawDataChangedBarChart(data) {
    chartInit('dataChangedBarChart', data, getSubBarOption);
}

function drawServiceOpenNumChart(data) {
    chartInit('serviceOpenNumBarChart', data, getServiceResBarOption);
}

function drawCurrentAlarmBarChart(data) {
    chartInit('currentAlarmBarChart', data, getAlarmOption);
}

function drawGlobalDataChangedBarChart(data) {
    chartInit('globalDataChangedStatistic', data, getGlobalDataChangedBarOption);
}

function drawDeptDataChangedBarChart(data) {
    chartInit('deptDataChangedStatistic', data, getDeptDataChangedBarOption);
}


function getGlobalDataChangedBarOption(data) {
    option = {
        backgroundColor: "rgba(255,255,255,1)",
        title: {
            text: '全局数据更新统计',
            textStyle: {
                color: '#757D8C'
            },
            left: '10',
            top: '10',
            //            textAlign: 'center'
        },
        grid: {
            containLabel: true,
            top: '20%',
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
            data: ['全局数据更新统计']
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
            minInterval: 1,
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
            name: '全局数据更新统计',
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


function getAlarmOption(data) {
    var spNum = 5,
        _max = 100,
        unit = '（条）',
        y_data = data.names, //['BEAS', 'DAP', 'ESB', 'DSS', 'MDM', 'RDS'];
        // _datamax = data._datamax, //[100, 100, 100, 100, 100, 100],
        // _max = data._max,
        _data1 = data.critical, //[10, 15, 10, 13, 15, 11],
        _data2 = data.major, //[19, 5, 40, 33, 15, 51],
        _data3 = data.minor, //[21, 55, 10, 13, 35, 11],
        _data4 = data.warning, //[21, 55, 10, 13, 35, 11],
        colors = ['#9DD28E', '#7E97B2', '#E18489'];
    var legendData = data.legend || ['严重', '主要', '次要', '一般'];
    // var y_data = data.names || ['BEAS', 'DAP', 'ESB', 'DSS', 'MDM', 'RDS'];
    // var _datamax = [100, 100, 100, 100, 100, 100],
    //     _data1 = [102, 15, 10, 13, 15, 11],
    //     _data2 = [201, 5, 40, 33, 15, 51],
    //     _data3 = [230, 535, 10, 13, 35, 11],
    //     _data4 = [533, 555, 20, 19, 35, 13];
    // var colors = ['#E18489', '#A37786', '#7E97B2', '#9DD28E']
    var fomatter_fn = function(v) {
        return (v.value / _max * 100).toFixed(0)
    }
    var _label = {
        normal: {
            show: false,
            position: 'inside',
            formatter: fomatter_fn,
            textStyle: {
                color: '#fff',
                fontSize: 16
            }
        }
    };
    option = {
        title: {
            text: data.title, //'资源查询统计',
            textStyle: {
                color: '#757D8C'
            },
            left: '10',
            top: '10'
        },
        //backgroundColor: '#091034',
        backgroundColor: "rgba(255,255,255,1)",
        legend: {
            top: "10%",
            right: '3%',
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
                return name; //name+unit;
            }
        },
        grid: {
            containLabel: true,
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
                // var _arr = p.seriesName.split('/'),
                //     idx = p.seriesIndex; //1，2，3
                return '名称：' + p.name + '<br>' + '告警级别：' + p.seriesName + '<br>' + '告警数：' + p.value + '<br>' + '占比：' + (p.value / data.total * 100).toFixed(0) + '%';
            },
            extraCssText: 'box-shadow: 0 0 5px rgba(0, 0, 0, 0.1)'
        },
        yAxis: {
            splitNumber: spNum,
            minInterval: 1,
            // interval: _max / spNum,
            // max: _max,
            // boundaryGap: ['0%', '20%'],
            axisLabel: {
                show: true,
                color: '#8D8D8D',
                formatter: function(v) {

                    return v;
                }
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#DADADA'
                }
            },
            axisTick: {
                show: true
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#E4E4E4'
                }

            }

        },
        xAxis: [{
            data: y_data,
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
            name: legendData[0],
            stack: '2',
            label: _label,
            legendHoverLink: false,
            barWidth: 20,
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
            name: legendData[1],
            stack: '2',
            legendHoverLink: false,
            barWidth: 20,
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
            name: legendData[2],
            legendHoverLink: false,
            barWidth: 20,
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
            name: legendData[3],
            legendHoverLink: false,
            barWidth: 20,
            label: _label,
            //            label: {
            //                normal: {
            //                    show: true,
            //                    position: 'insideLeft',
            //                    formatter: fomatter_fn,
            //                    textStyle: {
            //                        color: '#898989',
            //                        fontSize: 16
            //                    }
            //                }
            //            },
            itemStyle: {
                normal: {
                    color: colors[3]
                },
                emphasis: {
                    color: colors[3]
                }
            },
            data: _data4
        }]
    };
    return option;
}

function getServiceResBarOption(data) {
    var spNum = 5,
        // _max = 100,
        unit = '（个）',
        legendData = ['被使用服务数', '未被使用服务数'],
        y_data = data.y_data, // ['部门1', '部门2', '部门3', '部门4', '部门5', '部门6'],
        _datamax = data._datamax, // [100, 100, 100, 100, 100, 100],
        _max = data._max || 100,
        _data1 = data._data1, // [10, 15, 10, 13, 15, 11],
        _data2 = data._data2, //[19, 5, 40, 33, 15, 51],
        _data3 = data._data3, // [29, 20, 50, 46, 30, 62],
        // _data4 = [50, 75, 60, 59, 35, 73];
        colors = ['#E18489', '#A37786', '#E18489'];
    var fomatter_fn = function(v) {
        return (v.value / _max * 100).toFixed(0)
    }
    var _label = {
        normal: {
            show: true,
            position: 'inside',
            formatter: fomatter_fn,
            textStyle: {
                color: '#fff',
                fontSize: 12
            }
        }
    };
    option = {
        backgroundColor: '#fff',
        title: {
            text: '开放服务数TOP5', //'部门数据变化量统计',
            textStyle: {
                color: '#757D8C'
            },
            left: '10',
            top: '10'
        },
        legend: {
            x: "right",
            top: "10%",
            right: '3%',
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
            top: '20%',
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
                console.log(p);
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
            name: legendData[0],
            stack: '2',
            label: _label,
            legendHoverLink: false,
            barWidth: 20,
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
            name: legendData[1],
            stack: '2',
            legendHoverLink: false,
            barWidth: 20,
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
            name: '总量',
            legendHoverLink: false,
            barWidth: 20,
            label: {
                normal: {
                    show: true,
                    position: 'insideLeft',
                    formatter: fomatter_fn,
                    textStyle: {
                        color: '#898989',
                        fontSize: 12
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
            data: _data3
        }]
    };
    return option;
}

function getDeptDataChangedBarOption(data) {
    var spNum = 5,
        _max = 100,
        unit = '（条）';
    var legendData = ['新增', '修改', '删除'];
    var y_data = ['部门1', '部门2', '部门3', '部门4', '部门5', '部门6'];
    var _datamax = [100, 100, 100, 100, 100, 100],
        _data1 = [10, 15, 10, 13, 15, 11],
        _data2 = [19, 5, 40, 33, 15, 51],
        _data3 = [21, 55, 10, 13, 35, 11],
        _data4 = [50, 75, 60, 59, 35, 73];
    var colors = ['#9DD28E', '#7E97B2', '#E18489']
    var fomatter_fn = function(v) {
        return (v.value / _max * 100).toFixed(0)
    }
    var _label = {
        normal: {
            show: true,
            position: 'inside',
            formatter: fomatter_fn,
            textStyle: {
                color: '#fff',
                fontSize: 16
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
            x: "right",
            top: "10%",
            right: '3%',
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
            top: '20%',
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
                console.log(p);
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
            barWidth: 20,
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
            barWidth: 20,
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
            barWidth: 20,
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
            barWidth: 20,
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

    var ydata = [{
        name: '部门1',
        value: 13
    }, {
        name: '部门2',
        value: 25
    }, {
        name: '部门3',
        value: 27
    }, {
        name: '部门4',
        value: 30
    }, {
        name: '部门5',
        value: 20
    }];
    ydata2 = [13, 25, 27, 30, 20]
    //var color =["#BC8DEE", "#8693F3","#89C3F8","#F2A695","#FCC667","#AEB7F9","#748BFA"]
    var color = ["#BC8DEE", "#8693F3", "#89C3F8", "#F2A695", "#FCC667", "#AEB7F9", "#748BFA"]
    var xdata = ['部门1', "部门2", "部门3", "部门4", '部门5'];
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
            x: "right",
            top: "40%",
            right: '3%',
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

    setTimeout(function() {
        myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: 0
        });

        myChart.on('mouseover', function(params) {
            if (params.name == ydata[0].name) {
                myChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: 0
                });
            } else {
                myChart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                    dataIndex: 0
                });
            }
        });

        myChart.on('mouseout', function(params) {
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: 0
            });
        });
    }, 1000);



    return option;
}

function getSubBarOption(data) {
    // var data = [110, 20, 36, 10, 50, 80, 100, 60].sort(function(a, b) {
    //     return a > b;
    // });
    var values = data.values && data.values.sort(function(a, b) {
        return +a.value > +b.value;
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
    // var ydata = names ;// ['部门1', '部门2', '部门3', '部门4', '部门5', '部门6', '部门7', '部门8'];
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
            text: data.title, //'资源查询统计',
            textStyle: {
                color: '#757D8C'
            },
            left: '10',
            top: '10'
        },
        backgroundColor: "rgba(255,255,255,1)",
        color: ['#9DD28E'],
        // tooltip : {
        //     trigger: 'item',
        //     formatter: function (params) {
        //         return  params.seriesName+'</br>'+
        //         params.name+':'+  (params.data+MAX)+'</br>';
        //     }
        // },
        // tooltip : {
        //     trigger: 'axis',
        //     axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        //         type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
        //     }, 
        //     formatter: function (params) {
        //         return  params[0].name+'</br>'+
        //         params[0].seriesName+':'+  (params[0].data+MAX)+'</br>'+
        //         params[1].seriesName+':'+  (params[1].data+MAX);
        //     }
        // },
        grid: {
            left: '8%',
            right: '18%',
            top: '20%',
            bottom: '18%',
            containLabel: true
        },
        legend: {
            orient: "vartical",
            //                          x: "center",
            top: "10%",
            right: '3%',
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
            data: ydata,
            boundaryGap: false,
            // min: 0,
            // max: 'dataMax',
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
            name: data.legend, //'资源被订阅量（条）',
            type: 'bar',
            barWidth: 20, //'55%',
            itemStyle: {
                normal: {
                    //barBorderRadius: [0, 30, 30, 0],
                    color: data.color,
                    //每个柱子的颜色即为colorList数组里的每一项,如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                    //                         color: new echarts.graphic.LinearGradient(
                    //                             0, 0, 0, 1,
                    //                             [{
                    //                                     offset: 0,
                    //                                     color: '#23cf99'
                    //                                 },
                    //                                 {
                    //                                     offset: 0.5,
                    //                                     color: '#12dfc9'
                    //                                 },
                    //                                 {
                    //                                     offset: 1,
                    //                                     color: '#12dfc9'
                    //                                 }
                    //                             ]
                    //                         )
                }
            },
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
            data: values //percentdata
        }]
    };

    var serie = {
        name: '上传数据大小(KB)',
        type: 'bar',
        stack: '资源上传',
        barWidth: 0, //'55%',
        itemStyle: {
            normal: {
                color: 'transparent',

            }
        },
        label: {
            normal: {
                show: false,
                position: 'right',
                // formatter: '{c}', //'{c}%',
                textStyle: {
                    color: '#9B9B9B'
                }
            }
        },
        data: data.sizes //percentdata
    };

    var tooltip = {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function(params) {
            console.log(params);
            console.log(data.sizes);

            // return  params[0].name+'</br>'+
            // params[0].seriesName+':'+  (params[0].value)+'</br>'+
            // params[1].seriesName+':'+  (params[1].value);

            return (params[0].value) + '（条）/' + data.sizes[params[0].name] + '（KB）';
        }
    };


    if (data.sizes) {
        // option.series[0].stack = '资源上传';
        // option.series.push(serie);
        option.tooltip = tooltip;
        // option.series[0].itemStyle.emphasis = {
        //     show: true,
        //     formatter:function (params) {
        //         return (params[0].value) + '（条）/' + data.sizes[params[0].name]+'（M）';
        //     }
        // }
    }

    return option;


}
