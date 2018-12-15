                // 基于准备好的dom，初始化echarts图表
                var myChart = echarts.init(document.getElementById('main')); 
                var myChart1 = echarts.init(document.getElementById('main1'));
                var myChart2 = echarts.init(document.getElementById('main2'));
                var myChart3 = echarts.init(document.getElementById('main3'));
                var myChart4 = echarts.init(document.getElementById('main4'));

                //GDP
                var option =   {
                  tooltip: {
                      trigger: 'axis'
                  },
                  grid:{
                      x:48,
                      y:30,
                      x2:40,
                      y2:60,
                      // borderColor:"#ffffff", //X和Y轴两边的线条
                      borderWidth:1
                  },
                  xAxis:{
                      type: 'value',
                      // axisTick: {alignWithLabel: true},
                      axisTick : {  //去掉X轴小点
                          inside: false,
                          length: 5,
                          lineStyle: {
                              color: '#ffffff',
                              shadowColor: '#ffffff'
                              // shadowOffsetY: -5
                          }
                      },
                      axisLine: {    
                        show: false,  //隐藏X轴
                        lineStyle:{
                          color:"#8996a3"   //X轴颜色不起效果
                        }
                      },
                      type: 'category',
                      axisLabel:{
                        // show:false,
                        'interval':0,
                         textStyle: {  //X轴字体颜色
                         color: '#8996a3',
                         fontSize:12   //X轴字体大小
                      }
                      //rotate: 30
                      },
                      // boundaryGap: false,
                      splitLine:{  
                        　show:false  
                      },
                      data: ['2011','2012','2013','2014','2015']
                  },
                  yAxis: {
                      axisLine: {
                        show: true,
                        lineStyle:{
                          color:"#ffffff"
                        }
                      },
                      // axisLine: {show: true},
                      nameTextStyle:{
                        color:"#8C98A5"
                      },
                      axisTick : {  //去掉Y轴小点
                          inside: false,
                          length: 5,
                          lineStyle: {
                              color: '#ffffff',
                              shadowColor: '#ffffff'
                              // shadowOffsetY: -5
                          }
                      },
                      type: 'value',
                      name: '数量:亿元',
                      nameLocation:'end',//Y轴名称位置
                      // splitNumber: 4,
                      boundaryGap: [0.5, 0.5],// 坐标轴两端空白策略，数组内数值代表百分比
                      axisLabel: {
                          formatter: '{value}',
                          textStyle: {  //X轴字体颜色
                           color: '#8996a3',
                           fontSize:12   //X轴字体大小
                          }
                      }
                  },
                  series: [
                      {   
                          center:[100,100],
                          name:'GDP总量',
                          type:'line',
                          //data:[19669.56, 22154.23, 24621.67, 27037.32,28902.21],
						  data:[20187.65, 23005.52, 25550.08, 28084.33, 30426.92],
                          itemStyle : {  
                                normal : {  
                                    color:'#FFA72A',  //折线原点颜色
                                    lineStyle:{  
                                        width:3,
                                        color:'#1587C4'  //折线条颜色
                                    }  
                                }  
                            },  
                      }
                  ]
              };

              //规模工业
              var option1 =   {
                  tooltip: {
                      trigger: 'axis'
                  },
                  grid:{
                      x:48,
                      y:30,
                      x2:40,
                      y2:60,
                      borderColor:"#ffffff", //X和Y轴两边的线条
                      borderWidth:1
                  },
                  xAxis:{
                      axisTick : {   //去掉X轴小点
                          inside: false,
                          length: 5,
                          lineStyle: {
                              color: '#ffffff',
                              shadowColor: '#ffffff'
                              // shadowOffsetY: -5
                          }
                      },
                      axisLine: {show: false},
                      type: 'category',
                      boundaryGap: false,
                      splitLine:{  
                        　show:false  
                      },
                      axisLabel:{
                        'interval':0,
                         textStyle: {  //X轴字体颜色
                         color: '#8996a3',
                         fontSize:12   //X轴字体大小
                      }
                      //rotate: 30
                      },
                      data: ['2011','2012','2013','2014','2015']
                  },
                  yAxis: {
                      axisLine: {   //去掉Y轴线条
                        show: true,
                        lineStyle:{
                          color:"#ffffff"
                        }
                      },
                      nameTextStyle:{
                        color:"#8C98A5"
                      },
                      axisTick : {  //去掉Y轴小点
                          inside: false,
                          length: 5,
                          lineStyle: {
                              color: '#ffffff',
                              shadowColor: '#ffffff'
                              // shadowOffsetY: -5
                          }
                      },
                      type: 'value',
                      name: '数量:亿元',
                      boundaryGap: [2, 2],
                      axisLabel: {
                         formatter: '{value}',
                         textStyle: {  //X轴字体颜色
                         color: '#8996a3',
                         fontSize:12   //X轴字体大小
                        }
                      }
                  },
                  series: [
                      {
                          name:'规模工业',
                          type:'line',
                          data:[8122.8, 9138.5, 10001.0, 10749.9, 11090.8],
                          itemStyle : {  
                                normal : {  
                                    color:'#FFA72A',  
                                    lineStyle:{  
                                        width:3,
                                        color:'#1587C4'  
                                    }  
                                }  
                            },
                      }
                  ]
              };

              //固定资产
              var option2 =   {
                  tooltip: {
                      trigger: 'axis'
                  },
                  grid:{
                      x:48,
                      y:30,
                      x2:40,
                      y2:60,
                      borderColor:"#ffffff", //X和Y轴两边的线条
                      borderWidth:1
                  },
                  xAxis:{
                      axisTick : {
                          inside: false,
                          length: 5,
                          lineStyle: {
                              color: '#ffffff',
                              shadowColor: '#ffffff'
                              // shadowOffsetY: -5
                          }
                      },
                      axisLine: {show: false},
                      type: 'category',
                      boundaryGap: false,
                      splitLine:{  
                        　show:false  
                      },
                      axisLabel:{
                        'interval':0,
                         textStyle: {  //X轴字体颜色
                         color: '#8996a3',
                         fontSize:12   //X轴字体大小
                      }
                      //rotate: 30
                      },
                      data: ['2011','2012','2013','2014','2015']
                  },
                  yAxis: {
                     axisLine: {
                        show: true,
                        lineStyle:{
                          color:"#ffffff"
                        }
                      },
                      nameTextStyle:{
                        color:"#8C98A5"
                      },
                      axisTick : {  //去掉Y轴小点
                          inside: false,
                          length: 5,
                          lineStyle: {
                              color: '#ffffff',
                              shadowColor: '#ffffff'
                              // shadowOffsetY: -5
                          }
                      },
                      type: 'value',
                      name: '数量:亿元',
                      boundaryGap: [0.5, 0.5],
                      axisLabel: {
                          formatter: '{value}',
                           textStyle: {  //X轴字体颜色
                         color: '#8996a3',
                         fontSize:12   //X轴字体大小
                      }
                      }
                  },
                  series: [
                      {
                          name:'固定资产',
                          type:'line',
                          data:[11431.48,14576.61, 18381.44, 21950.77, 25954.27],
                          itemStyle : {  
                                normal : {  
                                    color:'#FFA72A',  
                                    lineStyle:{ 
                                        width:3, 
                                        color:'#1587C4'  
                                    }  
                                }  
                            },
                      }
                  ]
              };

              //居民消费
              var option3 =   {
                  tooltip: {
                      trigger: 'axis'
                  },
                  grid:{
                      x:48,
                      y:30,
                      x2:40,
                      y2:60,
                      borderColor:"#ffffff", //X和Y轴两边的线条
                      borderWidth:1
                  },
                  xAxis:{
                      axisTick : {
                          inside: false,
                          length: 5,
                          lineStyle: {
                              color: '#ffffff',
                              shadowColor: '#ffffff'
                              // shadowOffsetY: -5
                          }
                      },
                      splitLine:{show: false},//去除网格线
                      axisLine: {show: false},
                      type: 'category',
                      boundaryGap: false,
                      axisLabel:{
                        'interval':0,
                         textStyle: {  //X轴字体颜色
                         color: '#8996a3',
                         fontSize:12   //X轴字体大小
                      }
                      //rotate: 30
                      },
                      data: ['2011','2012','2013','2014','2015']
                  },
                  yAxis: {
                      // splitLine:{show: false},//去除网格线
                      axisLine: {
                        show: true,
                        lineStyle:{
                          color:"#ffffff"
                        }
                      },
                      axisTick : {  //去掉Y轴小点
                          inside: false,
                          length: 5,
                          lineStyle: {
                              color: '#ffffff',
                              shadowColor: '#ffffff'
                              // shadowOffsetY: -5
                          }
                      },
                      nameTextStyle:{
                        color:"#8C98A5"
                      },
                      type: 'value',
                      name: '数量:元',
                      axisLabel: {
                          formatter: '{value}',
                           textStyle: {  //X轴字体颜色
                         color: '#8996a3',
                         fontSize:12   //X轴字体大小
                      }
                      }
                  },
                  series: [
                      {
                          name:'居民消费',
                          type:'line',
                          data:[13403, 14609, 16867, 18335, 19501],
                          itemStyle : {  
                                normal : {  
                                    color:'#FFA72A',  
                                    lineStyle:{  
                                        width:3,
                                        color:'#1587C4'  
                                    }  
                                }  
                            },
                      }
                  ]
              };
              //进出口额
              var option4 =   {
                  tooltip: {
                      trigger: 'axis'
                  },
                  grid:{
                     x:48,
                      y:30,
                      x2:40,
                      y2:60,
                      borderColor:"#ffffff", //X和Y轴两边的线条
                      borderWidth:1
                  },
                  xAxis:{
                      axisTick : {
                          inside: false,
                          length: 5,
                          lineStyle: {
                              color: '#ffffff',
                              shadowColor: '#ffffff'
                              // shadowOffsetY: -5
                          }
                      },
                      axisLine: {show: false},
                      type: 'category',
                      boundaryGap: false,
                      splitLine:{  
                        　show:false  
                      },
                      axisLabel:{
                        'interval':0,
                         textStyle: {  //X轴字体颜色
                         color: '#8996a3',
                         fontSize:12   //X轴字体大小
                      }
                      //rotate: 30
                      },
                      data: ['2011','2012','2013','2014','2015']
                  },
                  yAxis: {
                      axisLine: {
                        show: true,
                        lineStyle:{
                          color:"#ffffff"
                        }
                      },
                      nameTextStyle:{
                        color:"#8C98A5"
                      },
                      axisTick : {  //去掉Y轴小点
                          inside: false,
                          length: 5,
                          lineStyle: {
                              color: '#ffffff',
                              shadowColor: '#ffffff'
                              // shadowOffsetY: -5
                          }
                      },
                      type: 'value',
                      name: '数量:亿美元',
                      axisLabel: {
                          formatter: '{value}',
                          textStyle: {  //X轴字体颜色
                         color: '#8996a3',
                         fontSize:12   //X轴字体大小
                        }
                      }
                  },
                  series: [
                      {
                        name:'进出口额',
                        type:'line',
                        data:[190.00, 219.41, 251.64, 310.27, 293.67],
                        itemStyle : {  
                                normal : {  
                                    color:'#FFA72A',  
                                    lineStyle:{ 
                                        width:3, 
                                        color:'#1587C4'  
                                    }  
                                }  
                            },
                      }
                  ]
              };
                // 为echarts对象加载数据 
                myChart.setOption(option); 
                myChart1.setOption(option1);
                myChart2.setOption(option2);
                myChart3.setOption(option3);
                myChart4.setOption(option4);

    //计时器部分
    var oimg = document.querySelectorAll('#tab_con aside');//获取aside元素
    var oli =  document.querySelectorAll('#banner #tab li');//获取li
    var banner = document.getElementById('banner');//获取盒子
    var length = oimg.length;
    var index = 0;
    var timer = null;
    for (var i = 0; i < length; i++) {  //循环获取aside元素
     oli[i].goudan = i
       oli[i].onclick = function(){   //给li点击事件
             for (var j = 0; j < length; j++) { //循环获取aside个数
                  oimg[j].className = '';  //所有的aside元素的className都不给样式
                  oli[j].className = '';   //所有的li元素的className都不给样式
                }
                this.className = 'on';     //当前点击的元素className给on属性
                oimg[this.goudan].className = 'on';  //当前下标的aside元素给on元素
                index = this.goudan;
       };
  }
    //Tab计时器
    banner.onmouseover = function(){
       clearInterval(timer);           //移入停止计时器
	}
    banner.onmouseout = function(){
       timer = setInterval(auto,2000); //移出启动计时器
    }
	   timer = setInterval(auto,2000);
    function auto(){
     index ++;
     index %=length;
     for (var i = 0; i < length; i++) { //循环aside元素
       oimg[i].className = '';          
       oli[i].className = '';
     }
       oimg[index].className = 'on';
       oli[index].className = 'on';
  }

