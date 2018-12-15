/**
 * Created by tanxin on 2017/4/24.
 */
var curNav = "nav_4";
$(function(){
    var data = [];
    var Chart1 = function() {
        this.getOption = function () {
            return {
                color:['#3bd8ab'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data:['诊疗人次']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : [2011,2012,2013,2014,2015],
                        axisLine: {
                            lineStyle:{
                                color:'#8995a1',
                                width: 1,
                                type: 'solid'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel:{
                            textStyle:{
                                color:"#8995a1"
                            }
                        },
                        splitLine: {           // 分隔线
                            show: true,        // 默认显示，属性show控制显示与否
                            // onGap: null,
                            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                color: ['#ccc'],
                                width: 1,
                                type: 'solid'
                            }
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name:'总量(万次)',
                        axisLine: {
                            lineStyle:{
                                color:'#8995a1',
                                width: 1,
                                type: 'solid'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel:{
                            textStyle:{
                                color:"#8995a1"
                            }
                        },
                    }
                ],
                series : [
                    {
                        name:'诊疗人次',
                        type:'line',
                        stack: '总量',
                        smooth: true, //平滑的，弧形
                        areaStyle: {normal: {}},
                        data:[21697.4578,23119.0119,24405.2884,25050.8528,25695.5015]
                    }
                ]
            }
        };

        this.chart = echarts.init(document.getElementById("Chart1"));
        this.chart.setOption(this.getOption());
    };


    var Chart2 = function(){
        this.getOption = function () {
            return {
                color: ['#574fbe'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data:['病床周转次数']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : [2011,2012,2013,2014,2015],
                        axisTick:{ //刻度消失
                            show:false
                        },
                        axisLabel:{
                            textStyle:{
                                color:"#8995a1"
                            }
                        },
                        axisLine: {
                            lineStyle:{
                                color:'#8995a1',
                                width: 1,
                                type: 'solid'
                            }
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name : '总量(万次)',
                        splitLine:{
                            show:false
                        },
                        axisTick:{ //刻度消失
                            show:false
                        },
                        axisLabel:{
                            textStyle:{
                                color:"#8995a1"
                            }
                        },
                        axisLine: {
                            lineStyle:{
                                color:'#8995a1',
                                width: 1,
                                type: 'solid'
                            }
                        }
                    }
                ],
                series : [
                   
                    {
                        name:'病床周转次数',
                        type:'bar',
                        barWidth: '40',
                        data:[36.6,39.3,38.4,36.2,34.7]
                    }
                ]
            }
        };

        this.chart = echarts.init(document.getElementById("Chart2"));
        this.chart.setOption(this.getOption());
    };

    var Chart3 = function(){
        this.getOption = function () {
            return {
                tooltip: {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    selected: {
                        '病床使用率' : false
                    },
                    data:['病床工作日','医院平均住院日','病床使用率']
                },
                xAxis: [
                    {
                        type: 'category',
                        data: [2011,2012,2013,2014,2015],
                        axisTick:{
                            show:false
                        },
                        axisPointer: {
                            type: 'shadow'
                        },
                        splitLine:{           // 分隔线
                            show: true,        // 默认显示，属性show控制显示与否
                            // onGap: null,
                            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                color: ['#ccc'],
                                width: 1,
                                type: 'solid'
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '总量:日',
                        axisLabel: {
                            formatter: '{value}'
                        },
                        axisTick:{
                            show:false
                        }
                    },
                    {
                        type: 'value',
                        name: '病床使用率(%)',
                        axisLabel: {
                            formatter: '{value}'
                        },
                        splitLine:{
                            show:false
                        },
                        axisTick:{
                            show:false
                        }
                    }
                ],
                series: [
                    {
                        name:'病床工作日',
                        type:'bar',
                        data:[314.6,325.2,323,307.4,297.6],
                        barWidth:30
                    },
                    {
                        name:'医院平均住院日',
                        type:'bar',
                        data:[6.32,5.88,7.94,5.78,4.66],
                        barWidth:30
                    },
                    {
                        name:'病床使用率',
                        type:'line',
                        yAxisIndex: 1,
                        data:[86.20,88.84,88.26,84.22,81.5]
                    }
                ],
                color:['#3a4aa9','#cb65bb','#fea412']
            }
        };

        this.chart = echarts.init(document.getElementById("Chart3"));
        this.chart.setOption(this.getOption());
    };

    new Chart1();
    new Chart2();
    new Chart3();
});
