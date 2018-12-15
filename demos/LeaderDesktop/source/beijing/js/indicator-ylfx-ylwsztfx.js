/**
 * Created by tanxin on 2017/4/24.
 */
var curNav = "nav_4";
$(function(){
    var data = [];
    var Chart1 = function() {
        this.getOption = function () {
            return {
                color: ['#0c6bd9'],
                grid: {
                    left: 70,
                    right: 40,
                    top: 10,
                    bottom: 10
                },
                xAxis: [{
                    type: "value",
                    boundaryGap: [0, 0],
                    show: false,
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                }],
                yAxis: [
                    {
                        type: 'category',
                        data: ['昌平区','宣武区','海淀区','平谷区','朝阳区'],
                        //offset:10,
                        axisLine: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        }
                    }
                ],
                series: [
                    
                    {
                        type: 'bar',
                        // label: {
                        //     normal: {
                        //         formatter: '{c}万个',
                        //         position: ['275', '16'],
                        //         show: true
                        //     }
                        // },
                        z: 10,
                        barMaxHeight: 220,
                        barCategoryGap: '50%',
                        data: [4820,5106,5210,5869,6003]
                    }
                ]
            }
        };

        this.chart = echarts.init(document.getElementById("Chart1"));
        this.chart.setOption(this.getOption());
    };


    var Chart2 = function(data1){
        this.getOption = function () {
            return {
                color: ['#2ec8ca'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
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
                        axisLine: {
                            lineStyle:{
                                color:'#f5f5f5',
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
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        splitLine: {
                            lineStyle:{
                                color:'#f2f3f4',
                                width: 1,
                                type: 'solid'
                            }
                        },
                        axisLine: {
                            show:false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel:{
                            textStyle:{
                                color:"#8995a1"
                            }
                        }
                    }
                ],
                series : [
                    {
                        name:'总量:',
                        type:'bar',
                        barWidth: '30',
                        data:data1
                    }
                ]
            }
        };

        // data = [3232,2231,2101,2142,20121];
        this.chart = echarts.init(document.getElementById("Chart2"));
        this.chart.setOption(this.getOption());
    };

    var Chart3 = function(){
        this.getOption = function () {
            return {
                color: ['#574fbe'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [ {
                    type : 'category',
                    data : ["传染病","恶性肿瘤","心脏病","脑血管病", "呼吸系统疾病", "内分泌代谢疾病", "消化系统疾病"],
                    axisTick:{//刻度消失
                        show:false
                    },
                    axisLine: {
                        lineStyle:{
                            color:'#8995a1',
                            width: 1,
                            type: 'solid'
                        }
                    },
                    axisLabel: {
                        interval: 0,
                        formatter:function(value)
                        {
                            var ret = "";//拼接加\n返回的类目项
                            var maxLength = 4;//每项显示文字个数
                            var valLength = value.length;//X轴类目项的文字个数
                            var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                            if (rowN > 1)//如果类目项的文字大于3,
                            {
                                for (var i = 0; i < rowN; i++) {
                                    var temp = "";//每次截取的字符串
                                    var start = i * maxLength;//开始截取的位置
                                    var end = start + maxLength;//结束截取的位置
                                    //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                                    temp = value.substring(start, end) + "\n";
                                    ret += temp; //凭借最终的字符串
                                }
                                return ret;
                            }
                            else {
                                return value;
                            }
                        },
                        textStyle:{
                            color:"#8995a1"
                        }

                    }
                }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name : '总量(万例)',
                        splitLine:{
                            show:false
                        },
                        axisTick:{//刻度消失
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
                        name:'总量',
                        type:'bar',
                        barWidth: '30',
                        data:[36.90,13.69,16.10,5.96,161.70,98.25,319.03]
                    }
                ]
            }
        };

        this.chart = echarts.init(document.getElementById("Chart3"));
        this.chart.setOption(this.getOption());
    };

    var Chart4 = function(){
        this.getOption = function () {
            return {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    left: 'center',
                    data: ["传染病","恶心肿瘤","心脏病","脑血管病", "呼吸系统疾病", "内分泌代谢疾病", "消化系统疾病"],
                    top:'10',
                    itemWidth:10,
                    itemHeight:10
                },
                series : [
                    {
                        name: '疾病分类(1/10万)',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[{"name":"传染病",value:10.63},{"name":"恶性肿瘤",value:124.53},{"name":"心脏病",value:159.58},{"name":"脑血管病",value:120.48},
                            {"name":"呼吸系统疾病",value:81.90},{"name":"内分泌代谢疾病",value:17.25},{"name":"消化系统疾病",value:13.60}],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        //color:['#fb5c6e','#4e99ff','#6c6ff0','#46c667','#ffda4b','#eb1d65','#982ab1','#0c6bd9']
                    }
                ]
            }
        };

        this.chart = echarts.init(document.getElementById("Chart4"));
        this.chart.setOption(this.getOption());
    };


    new Chart1();
    new Chart2([5.9681,5.8598,6.2293,6.1571,6.2646]);
    new Chart3();
    new Chart4();

    $("#select").change(function(){
        if($(this).val()==1){
            new Chart2([5.9681,5.8598,6.2293,6.1571,6.2646]);
			$('#type2Div').html('卫生机构数');
        }else if($(this).val()==2){
            new Chart2([26.1353,29.4419,31.7027,35.5485,39.654]);
			$('#type2Div').html('床位数');
        }else if($(this).val()==3){
            new Chart2([40.3788,41.6715,44.2864,46.2699,49.4176]);
			$('#type2Div').html('人员数');
        }

    })
});
