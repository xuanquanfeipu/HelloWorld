/**
 * Created by zte on 2017/4/24.
 */
 var curNav="nav_6";
$(document).ready(function () {
    //var devUrl = 'http://10.118.15.217:8088/webservice/';
    var devUrl = 'http://10.118.15.214:8102/webservice/';
    var latestYear = 2016;
    var categories = [];
    var data1 = [];
    var data2 = [];
    var data3 = [];
    var rs_new = [];
    var rs_cs = [];
    var rs_nc = [];
    var list = [];
    var list1 = [];
    var categories = [];
    var year_num = 5;
    var myDate = new Date();
    var year = latestYear-1;
    var endDate = latestYear-1;
    var beginDate = endDate-year_num+1;
    var cyear=endDate;
    var jyfxztfx1 = function () {
        //var url = devUrl + 'leader/employment/cityjob/1/'+beginDate+'_'+endDate+'/0';
        var url = devUrl + 'leader/employment/cityjobRecent/1/5/0';
        $.get(url,function (response) {            
            list=response.data;
            for(var i = list.length - 1;i > -1;i--){
              categories.push(list[i].DATE_PERIOD);
              data1.push(list[i].JYRS);
              rs_new.push(list[i].XZJYZS);
              rs_cs.push(list[i].CSJYRS);
              rs_nc.push(list[i].NCJYRS);
            }
            new Chart1();
          });
    }
    jyfxztfx1();
    //全市就业人员发展情况
    var Chart1 = function() { 
        this.getOption = function() {
            return {
                color:['#574fbe','#0c6bd9','#137ebd'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: ['从业人员总数', '城镇从业人员数','农村从业人员数'],
                    y:'25',
                    align: 'left',
                    right: 30
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: categories,
                    axisTick: {
                      show: false
                    },
                    splitLine: {
                      textStyle: { color: 'white' },
                      show: false
                    },
                    axisLine: {
                      lineStyle:{
                        color:'#d8dde2'
                      }
                    },
                    axisLabel: {textStyle:{ color: '#7F7F7F' }}
                }],
                yAxis: [{
                    type: 'value',
                    name: '单位:万人',
                    nameTextStyle: {
                      color: '#7F7F7F'
                    },
                    splitLine: {
                      show: false
                    },
                    axisTick: {
                      show: false
                    },
                    axisLine: {
                      lineStyle:{
                        color:'#d8dde2'
                      }
                    },
                    axisLabel: {textStyle:{ color: '#7F7F7F' }}
                }],
                series: [{
                    name: '从业人员总数',
                    type: 'bar',
                    barMaxWidth:'20',
                    data: data1
                  }, {
                    name: '城镇从业人员数',
                    type: 'bar',
                    barMaxWidth:'20',
                    data: rs_cs
                  }, {
                    name: '农村从业人员数',
                    type: 'bar',
                    barMaxWidth:'20',
                    data: rs_nc
                }]
            }
        };
        this.chart = echarts.init(document.getElementById("chart1"));
        this.chart.setOption(this.getOption());
    };

    var Chart2 = function() {
        this.getOption = function() {
            return {
                grid: {
                    left: '3%',
                    right: '14%',
                    bottom: '2%',
                    top:'2%',
                    containLabel: true,
                    height: 192 //设置grid高度
                },
                xAxis: {
                    type: 'value',
                    name:'',
                    nameLocation:'end',
                    axisLabel: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'category',
                    data: ['第一产业','第二产业','第三产业'],
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                },
                series: [
                    {
                    name: '2016年',
                    type: 'bar',
					barWidth:28,
                    barGap: 0,
                    z: 10,
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                // build a color map as your need.
                                var colorList = [
                                    '#3ab8ab','#cb64bb','#564fbe'
                                ];
                                return colorList[params.dataIndex]
                            }
                        }
                    },
                    label: {
                        normal: {
                            show: false,
                            formatter: '{c}万',
                            position: [200,7]
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    data: ['1618.71','935.84','1425.75']
                    }
                ]
            }
        };
        this.chart = echarts.init(document.getElementById("chart2"));
        this.chart.setOption(this.getOption());
    };
    //全市就业人员分布
    var industrylist = [];
    var industrydata = [];
    var result1 = [];
    // var barData=[];
    var bgData1=[];
    var jyfxztfx2 = function () {
      //var url1=devUrl+'leader/employment/industryjob/1/0/'+endDate+'_'+endDate;
      var url1=devUrl+'leader/employment/industryjobRecent/1/0/';
      $.get(url1,function (response) {
            result1=response.data;
            if(result1[result1.length-1].DATE_PERIOD){
                $('.yearVal1').text(result1[result1.length-1].DATE_PERIOD+'年');
            } else {
                $('.yearVal1').text('');
            }
            for(var i=0;i<result1.length;i++){
                if(result1[i].INDUSTRY_CATEGORY_NAME.length > 5){
                    industrylist.push(result1[i].INDUSTRY_CATEGORY_NAME.substring(0,5)+"\n"+result1[i].INDUSTRY_CATEGORY_NAME.substring(5));
                }else{
                    industrylist.push(result1[i].INDUSTRY_CATEGORY_NAME);
                }
                industrydata.push(result1[i].JYRS);
            }
            var maxData=Math.max.apply(null, industrydata);
            for(var i in industrydata){
                bgData1.push(maxData);
            }          
            new Chart3();
        });
    };
    jyfxztfx2();
    var Chart3 = function() {
        this.getOption = function() {
            return {
                // color: ['#564fbe'],
                  tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                      type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: "{a}<br/>{b} : {c0}万"
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
                      data : industrylist,
                      axisTick: {
                        show: false
                      },
                      splitLine: {
                        textStyle: { color: 'white' },
                        show: false
                      },
                      axisLine: {
                        lineStyle:{
                          color:'#d8dde2'
                        }
                      },
                      axisLabel: {textStyle:{ color: '#7F7F7F' },interval: 0,
                          formatter:function(val){
                            if(val.length>3){
                              val = val.substring(0,3)+"...";
                            }
                            return val;
                          }
                        }

                    }
                  ],
                  yAxis : [
                    {
                      type: 'value',
                      name: '单位:(万人)',
                      min: 0,
                      max: 1800,
                      nameTextStyle: {
                        color: '#7F7F7F'
                      },
                      splitLine: {
                        show: false
                      },
                      axisTick: {
                        show: false
                      },
                      axisLine: {
                        lineStyle:{
                          color:'#d8dde2'
                        }
                      },
                      axisLabel: {textStyle:{ color: '#7F7F7F' }}
                    }
                  ],
                  series : [
                    {
                      name:endDate,
                      type:'bar',
                      barMaxWidth: '20',
                      itemStyle: {
                        normal: {
                          color: '#574FBE'
                        }
                      },
                      tooltip:{
                        formatter: "{b}(万人)",
                        show:true
                      },
                      z: 10,
                      data:industrydata
                    }
                  ]
            }
               
        };
        this.chart = echarts.init(document.getElementById("chart3"));
        this.chart.setOption(this.getOption());
    };
    //全市就业人数市州排行
    var result2 = [];
    var citylist = [];
    var barData1 = [];
    var barData2 = [];
    var maxData = 0; 
    var jyfxztfx3 = function () {
        //var url2 = devUrl+'leader/employment/cityjob/1/'+endDate+'_'+endDate+'/1';
        var url2 = devUrl + 'leader/employment/cityjobRecent/1/1/1';
        $.get(url2,function (response) {
            result2 = response.data;
            if(result2[0].DATE_PERIOD){
                $('.yearVal2').text(result2[0].DATE_PERIOD+'年');
            } else {
                $('.yearVal2').text('');
            }
            for(var i=0;i<result2.length;i++){
                if(i==5){
                  break;
                }
                citylist.push(result2[i].DISTRICT_NAME);
                barData2.push({name:result2[i].DISTRICT_NAME,value:result2[i].JYRS});
                if(result2[i].JYRS>maxData){    //把当前获取到的就业人数与最大值进行比较判断
                  maxData=result2[i].JYRS;
                }
                $("#czsr-top5-ze-list div:eq(" + i + ")").text(result2[i].JYRS + " 万");
            }
            for(var i in barData2){
                barData1.push(maxData);
            }
            new Chart4();
        });
    }
    jyfxztfx3();
    var Chart4 = function() {
        this.getOption = function() {
            return {
                tooltip: {
                    show:true,
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '5%',
                    right: '5%',
                    bottom: '0%',
                    containLabel: true,
                    height: 300, //设置grid高度
                    width:'355px',
                    y:10,
                    y2:20,
                },
                xAxis: {
                    type: 'value',
                    name:'',
                    show: false,
                    axisLabel:{
                      interval:0,//横轴信息全部显示
                      textStyle: { color: '#7F7F7F' }
                    },
                    axisTick: {
                      show: false
                    },
                    axisLine: {
                      show: false
                    },
                    splitLine: {
                      show: false
                    }
                },
                yAxis: {
                    type: 'category',
                    data: citylist,
                    inverse:true,
                    axisTick: {
                      show: false
                    },
                    axisLine: {
                      show: false
                    },
                    splitLine: {
                      show: false
                    }
                },
                series: [
                    {
                     type: "bar",
                      silent: true,
                      itemStyle: {
                        normal: {
                          color: '#f5f5f5'
                        }
                      },
                      barGap: '-100%',
                      data: barData1 //底层灰色柱子
                    },
                    {
                        name: endDate+'年',
                        type: "bar",
                        itemStyle: {
                          normal: {
                            color: '#137ebd'
                          }
                        },
                        barMaxHeight:220,
                        barCategoryGap:'50%',
                        z: 10,
                        tooltip:{
                          show:false
                        },
                        data: barData2
                    }
                ]
            }
        };
        this.chart = echarts.init(document.getElementById("chart4"));
        this.chart.setOption(this.getOption());
    };
    new Chart2();
});
