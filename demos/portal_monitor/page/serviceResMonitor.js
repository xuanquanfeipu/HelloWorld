$(function() {

    //    drawnodeMonitorPieChart('nodeMonitorReqPieChart');
    //    drawnodeMonitorPieChart('nodeMonitorFlowPieChart');
    nodeComboboxInit();
    timeBtnInit();
    nodeMonitorReq();

    $('#search').on('click', function() {
        nodeMonitorReq();
    });

    // var title = '节点监控';
    // var serieName = '请求次数';
    // var unit = '次';
    // var ydata = [{
    //     name: '成功',
    //     value: 13
    // }, {
    //     name: '失败',
    //     value: 25
    // }];
    // var ydata2 = [13, 25];
    // var sum = 38
    // //var color =["#BC8DEE", "#8693F3","#89C3F8","#F2A695","#FCC667","#AEB7F9","#748BFA"]
    // var color = ["#E18489", "#A9D89B", "#BC8DEE", "#8693F3", "#89C3F8", "#F2A695", "#FCC667", "#AEB7F9", "#748BFA"]
    // var xdata = ['成功', "失败"];
    // var data = {};
    // data = {
    //     title,
    //     serieName,
    //     unit,
    //     xdata,
    //     ydata,
    //     sum,
    //     color
    // };

    // drawnodeMonitorPieChart('nodeMonitorReqPieChart', data);

    // var inRequestCount = '268次';
    // var outRequestCount = '126次';

    // $(`<div id="nodeFlowTotal">
    //     <ul>
    //         <li>
    //             <dl>
    //             <dt class="outRequestCount">${outRequestCount}</dt>
    //             <dd>对外请求数</dd>
    //             </dl>
    //         </li>
    //         <li>
    //             <dl>
    //             <dt class="inRequestCount">${inRequestCount}</dt>
    //             <dd>被请求数</dd>
    //             </dl>
    //         </li>
    //     </ul>
    //     </div>`).appendTo('#nodeMonitorReqPieChart').css({
    //     // "background":'red',
    //     "position": 'absolute',
    //     "bottom": '20px',
    //     "right": '10px',
    //     "width": '150px',
    //     "height": '150px'
    // });
    // // $('#nodeFlowTotal li').eq(0).css('background','url()')

    // var title = '节点监控';
    // var serieName = '总流量';
    // var unit = 'M';
    // var ydata = [{
    //     name: '流入',
    //     value: 323
    // }, {
    //     name: '流出',
    //     value: 265
    // }];
    // var ydata2 = [323, 265];
    // var sum = 588
    // //var color =["#BC8DEE", "#8693F3","#89C3F8","#F2A695","#FCC667","#AEB7F9","#748BFA"]
    // var color = ["#B08593", "#DDD49E", "#BC8DEE", "#8693F3", "#89C3F8", "#F2A695", "#FCC667", "#AEB7F9", "#748BFA"]
    // var xdata = ['流入', "流出"];
    // data = {
    //     title,
    //     serieName,
    //     unit,
    //     xdata,
    //     ydata,
    //     sum,
    //     color
    // };

    // drawnodeMonitorPieChart('nodeMonitorFlowPieChart', data);


    // data = {
    //     rate: 78,
    //     color: ['#9DD28E', '#D8DEE5']
    // }
    // drawnodeMonitorOnlineRatePieChart('nodeMonitorOnlineRatePieChart', data);



});

function drawnodeMonitorPieChart(id, data) {
    var myChart = echarts.init(document.getElementById(id));
    myChart.setOption(getPieOption(myChart, data));
}

function drawnodeMonitorOnlineRatePieChart(id, data) {
    var myChart = echarts.init(document.getElementById(id));
    myChart.setOption(getHalfPieOption(data));
}

function nodeComboboxInit() {

    var nodeNames = [{
        "id": "0",
        "text": "中心节点",
        "selected": true
    }, {
        "id": "1",
        "text": "地方节点"
    }];

    $('#nodeName').combobox("loadData", nodeNames);


    // $('#nodeName').combobox({
    //     onChange: function(newValue, oldValue) {


    //     }
    // });
}

function timeBtnInit() {
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


    // $("#data_update_view_startTime").datetimebox("setValue", moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'));
    // $("#data_update_view_endTime").datetimebox("setValue", moment().format('YYYY-MM-DD HH:mm:ss'));
    $("#data_update_view_startTime").datetimebox("setValue", startTime);
    $("#data_update_view_endTime").datetimebox("setValue", endTime);

    $('.btn-group .btn').on('click', function() {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        if ($(this).parent().hasClass('timeafter')) {
            $("#data_update_view_startTime").datetimebox("setValue", timesCond[$(this).attr('name')]);
            $("#data_update_view_endTime").datetimebox("setValue", timesCond['current']);
        }

    });

    // $('.chart_wrapper:eq(0) .btn-group:eq(0) .btn,.chart_wrapper:eq(0) .btn-group:eq(1) .btn').on('click', function() {

    //     nodeMonitorReq(getnodeMonitorReqParams());
    // });



}

function getnodeMonitorReqParams() {


    var timeVal = $('.chart_wrapper:eq(1) .btn-group .btn.active').attr('name');
    var startDate = $("#data_update_view_startTime").datetimebox("getValue");
    var endDate = $("#data_update_view_endTime").datetimebox("getValue");

    if (startDate != "") {

        startDate = startDate || timesCond[timeVal] || moment().subtract(3, 'days').format('YYYY-MM-DD HH:mm:ss');
    }

    if (endDate != "") {

        endDate = endDate || moment().format('YYYY-MM-DD HH:mm:ss');
    }
    // var id = $('#deptName').combobox('getValue');
    var params = {
        // deptname: $('#deptName').combobox('getText'),
        commandCode: 19000401,
        startDate,
        endDate
    };
    // console.log(params);
    return params;
}


function nodeMonitorReq(params) {
    var params = params || getnodeMonitorReqParams() || {
        commandCode: 19000401,
        startDate: '2018-12-13 12:00:00',
        endDate: '2019-02-13 12:05:00'
    };

    $.ajax({
        url: '/ipeg-web/requestDispatcher',
        type: 'post',
        data: params,
        dataType: 'json',
        cache: false,
        async: false,
        success: function(result) {
            var nodeMonitors;
            if (result.status == 0) {
                nodeMonitors = result.nodeMonitor;
            } else {
                nodeMonitors = [{
                    "failedCount": "0",
                    "flowIn": "0",
                    "flowOut": "0",
                    "inRequestCount": "0",
                    "nodeName": "中心节点",
                    "nodeStatus": "",
                    "onlineRate": "0",
                    "outRequestCount": "0",
                    "requestCount": "0",
                    "startTime": null,
                    "successCount": "0",
                    "totalFlow": "0"
                }];
            }
            drawnodeMonitorCharts(nodeMonitors);
        },
        error: function() {
            var nodeMonitors = [{
                "failedCount": "0",
                "flowIn": "0",
                "flowOut": "0",
                "inRequestCount": "0",
                "nodeName": "中心节点",
                "nodeStatus": "",
                "onlineRate": "0",
                "outRequestCount": "0",
                "requestCount": "0",
                "startTime": null,
                "successCount": "0",
                "totalFlow": "0"
            }];
            drawnodeMonitorCharts(nodeMonitors);
        }
    });


}

function drawnodeMonitorCharts(nodeMonitors) {
    var nodeName = $('#nodeName').combobox('getText')
    var nodeMonitor = nodeMonitors.filter(function(e, i) {
        return e.nodeName == nodeName;
    })[0];
    var requestCount = nodeMonitor.requestCount;
    var successCount = nodeMonitor.successCount;
    var failedCount = nodeMonitor.failedCount;
    var inRequestCount = nodeMonitor.inRequestCount;
    var outRequestCount = nodeMonitor.outRequestCount;
    var totalFlow = nodeMonitor.totalFlow;
    var flowIn = nodeMonitor.flowIn;
    var flowOut = nodeMonitor.flowOut;
    var onlineRate = nodeMonitor.onlineRate;
    inRequestCount = inRequestCount ? inRequestCount + '次' : '';
    outRequestCount = outRequestCount ? outRequestCount + '次' : '';

    var title = '节点监控';
    var serieName = '请求次数';
    var unit = '次';
    var ydata = [{
        name: '成功',
        value: successCount //13
    }, {
        name: '失败',
        value: failedCount //25
    }];
    var ydata2 = [successCount, failedCount] //[13, 25];
    var sum = requestCount;
    var color = ["#E18489", "#A9D89B", "#BC8DEE", "#8693F3", "#89C3F8", "#F2A695", "#FCC667", "#AEB7F9", "#748BFA"]
    var xdata = ['成功', "失败"];
    var data = {};
    data = {
        title,
        serieName,
        unit,
        xdata,
        ydata,
        sum,
        color
    };

    $(`<div id="nodeFlowTotal">
                    <ul>
                        <li>
                            <dl>
                            <dt class="outRequestCount">${outRequestCount}</dt>
                            <dd>对外请求数</dd>
                            </dl>
                        </li>
                        <li>
                            <dl>
                            <dt class="inRequestCount">${inRequestCount}</dt>
                            <dd>被请求数</dd>
                            </dl>
                        </li>
                    </ul>
                    </div>`).appendTo('#nodeMonitorReqPieChart').css({
        // "background":'red',
        "position": 'absolute',
        "bottom": '20px',
        "right": '10px',
        "width": '150px',
        "height": '150px'
    });

    drawnodeMonitorPieChart('nodeMonitorReqPieChart', data);

    serieName = '总流量';
    unit = 'M';
    ydata = [{
        name: '流入',
        value: flowIn //323
    }, {
        name: '流出',
        value: flowOut //265
    }];
    ydata2 = [flowIn, flowOut]; // [323, 265];
    sum = totalFlow; //588
    color = ["#B08593", "#DDD49E", "#BC8DEE", "#8693F3", "#89C3F8", "#F2A695", "#FCC667", "#AEB7F9", "#748BFA"]
    xdata = ['流入', "流出"];
    data = {
        title,
        serieName,
        unit,
        xdata,
        ydata,
        sum,
        color
    };

    drawnodeMonitorPieChart('nodeMonitorFlowPieChart', data);


    data = {
        rate: onlineRate, //78,
        color: ['#9DD28E', '#D8DEE5']
    }
    drawnodeMonitorOnlineRatePieChart('nodeMonitorOnlineRatePieChart', data);
}


function getHalfPieOption(data) {
    var rate = 50;
    var option = {
        title: {
            "text": data.rate + '%',
            "subtext": '在线率',
            "x": '50%',
            "y": '55%',
            textAlign: "center",
            "textStyle": {
                "fontWeight": 'bold',
                "fontSize": 24
            },
            "subtextStyle": {

                "fontSize": 18,
                "color": '#3ea1ff'
            }
        },
        backgroundColor: "rgba(255,255,255,1)",
        series: [{
                "name": ' ',
                "type": 'pie',
                "radius": ['50%', '66%'],
                "center": ["50%", "65%"],
                "avoidLabelOverlap": false,
                "startAngle": 200,
                "color": [data.color[0], "transparent"],
                "hoverAnimation": false,
                "legendHoverLink": false,
                "label": {
                    "normal": {
                        "show": false,
                        "position": 'center'
                    },
                    "emphasis": {
                        "show": true,
                        "textStyle": {
                            "fontSize": '30',
                            "fontWeight": 'bold'
                        }
                    }
                },
                "labelLine": {
                    "normal": {
                        "show": false
                    }
                },
                "data": [{
                    "value": 50,
                    "name": '1'
                }, {
                    "value": 50,
                    "name": '2'
                }]
            }, {
                "name": '',
                "type": 'pie',
                "radius": ['50%', '66%'],
                "center": ["50%", "65%"],
                "avoidLabelOverlap": false,
                "startAngle": -20,
                "color": [data.color[1], "transparent"],
                "hoverAnimation": false,
                "legendHoverLink": false,
                "clockwise": false,
                "itemStyle": {
                    "normal": {
                        "borderColor": "#fff",
                        "borderWidth": "10"
                    },
                    "emphasis": {
                        "borderColor": "transparent",
                        "borderWidth": "0"
                    }
                },
                "z": 10,
                "label": {
                    "normal": {
                        "show": false,
                        "position": 'center'
                    },
                    "emphasis": {
                        "show": true,
                        "textStyle": {
                            "fontSize": '30',
                            "fontWeight": 'bold'
                        }
                    }
                },
                "labelLine": {
                    "normal": {
                        "show": false
                    }
                },
                "data": [{
                    "value": (100 - data.rate) * 220 / 360,
                    "name": ''
                }, {
                    "value": 100 - (100 - data.rate) * 220 / 360,
                    "name": ''
                }]
            }

        ]
    };



    return option;
}



function getPieOption(myChart, data) {
    //    var title = '节点监控';
    //    var serieName = '请求次数';
    //    var unit = '次';
    //	var ydata = [{
    //            name: '成功',
    //            value: 13
    //        },
    //        {
    //            name: '失败',
    //            value: 25
    //        }
    //    ];
    //    var ydata2 = [13,25];
    //    var  sum = 38
    //    //var color =["#BC8DEE", "#8693F3","#89C3F8","#F2A695","#FCC667","#AEB7F9","#748BFA"]
    //    var color = ["#BC8DEE", "#8693F3","#89C3F8","#F2A695","#FCC667","#AEB7F9","#748BFA"]
    //    var xdata = ['成功', "失败"];

    option = {
        //        title:{
        //            text:'资源订阅统计',
        //            textStyle:{
        //                color:'#757D8C'
        //            },
        //            left:'10',
        //            top:'10'
        //        },
        title: {
            text: data.sum + data.unit,
            //        subtext:'次',
            textAlign: "center",
            textStyle: {
                color: '#999',
                fontSize: 20,
                fontWeight: 'normal'
            },
            "subtextStyle": {
                "fontWeight": 'bold',
                "fontSize": 18,
                "color": '#3ea1ff'
            },
            left: 'center',
            bottom: '45%',

            // itemGap: 60,
        },
        backgroundColor: "rgba(255,255,255,1)",
        color: data.color,
        tooltip: {
            trigger: 'item',
            //formatter: "{b}被订阅占比 : {d}% <br/> 数据条数 : {c}条"
            formatter: "{b}请求次数 : {c}次"
        },
        legend: {
            orient: "horizontal",
            left: "20%",
            bottom: "10%",
            data: data.xdata,
            itemWidth: 8,
            itemHeight: 8,
            itemGap: 15,
            // formatter: '{text|{b}}\n{value|{d}%}',
            //formatter: '{c|{c}}\n{hr|}\n{d|{d}%}',
            // formatter:'{b} : {value|{d}%}'
            formatter: function(name) {
                var v = data.ydata[data.xdata.indexOf(name)].value;
                //                var sum = ydata2.reduce(function(a,b){
                //                    return +a + +b;
                //                });
                //                v = ((v/sum)*100).toFixed(2);
                return '   ' + name + ' : ' + v + data.unit;
            },
        },
        series: [{
            name: data.serieName,
            type: 'pie',
            clockwise: false, //饼图的扇区是否是顺时针排布
            minAngle: 20, //最小的扇区角度（0 ~ 360）
            radius: ["40%", "56%"],
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
                    formatter: function() {
                        //                        var sum = ydata2.reduce(function(a,b){
                        //                            return +a + +b;
                        //                        });
                        return data.serieName
                    },
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
                        color: "#666",
                        fontSize: 16,
                    }
                }
            },
            data: data.ydata
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
            if (params.name == data.ydata[0] && data.ydata[0].name) {
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
