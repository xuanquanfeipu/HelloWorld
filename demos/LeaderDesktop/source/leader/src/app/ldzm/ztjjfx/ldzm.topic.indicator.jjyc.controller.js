/**
 * Created by zte on 2017/8/9.
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('ZtjjJjycController', ZtjjJjycController);

  /** @ngInject */
  function ZtjjJjycController($scope, $http, devUrl, SweetAlert, CommService) {
    var vm = this;
    //左-上 折线图
    vm.lineData=function () {
      vm.lineConfig={
        theme: 'Donut',
        dataLoaded: false
      };
      vm.lineOption={
        color:['#52bfa0','#e08c07','#1286c3','#564fbe'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line'
          }
        },
        grid: {
          left: '20px',
          right: '10px',
          bottom: '10px',
          containLabel: true
        },
        legend: {
          // orient: '',
          top: '10px',
          itemHeight: 12,
          textStyle: {
            color: '#333',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontFamily: '微软雅黑',
            fontSize: 14
          },
          data: ['IMF预测值','世界银行预测值','经合组织预测值','联合国预测值']
        },
        xAxis: {
          type: 'category',
          data: ['2013','2014', '2015', '2016', '2017', '2018'],
          axisTick: {
            show: false
          },
          splitLine: {
            textStyle: { color: 'white' },
            show: false
          },
          axisLine: {
            lineStyle:{
              color:'#7F7F7F'
            }
          },
          axisLabel: {textStyle:{ color: '#7F7F7F' }}
        },
        yAxis: {
          name:'经济增长率：%',
          type: 'value',
          axisLabel: {
            formatter: '{value}',
            textStyle:{ color: '#7F7F7F' }
          },
          nameTextStyle:{
            color: '#7F7F7F'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show:false
          }
        },
        series: [{
          name: 'IMF预测值',
          type: 'line',
          data: [8.5, 6.2, 6.8, 6.3, 6.7, 6.4]
        }, {
          name: '世界银行预测值',
          type: 'line',
          data: [7.758, 7.298, 6.9, 6.7, 6.5, 6.3]
        }, {
          name: '经合组织预测值',
          type: 'line',
          data: [7.76, 7.31, 6.92, 6.7, 6.64, 6.39]
        }, {
          name: '联合国预测值',
          type: 'line',
          data: [8.5, 7.5, 7.3, 6.4, 6.5, 6.5]
        }]
      };
      vm.lineConfig.dataLoaded=true;
    };
    vm.lineData();

    //左-右 数据
    vm.sjzData=function () {
      vm.sjzConfig = {
        theme: 'Donut',
        dataLoaded: false
      };
      vm.sjzOption = {
        baseOption:{
          timeline: {
            axisType: 'category',
            symbol:'diamond',
            autoPlay: true,
            playInterval: 4000,
            controlStyle: {
              itemSize:16,
              normal:{
                borderColor:'#A0A0A0'
              },
              emphasis:{
                borderColor:'#2863DB'
              }
            },
            data: ['2010', '2011', '2012', '2013', '2014', '2015'],
            left:0,
            right:0,
            bottom:0,
            itemStyle: {
              normal: {
                color: '#fff',
                borderColor:'#A0A0A0',
              },
              emphasis:{
                color: '#fff',
                borderColor:'#2863DB'
              }
            },
            lineStyle: {
              color: '#A0A0A0',
              type:'dashed'
            },
            checkpointStyle: {
              symbol:'diamond',
              symbolSize:10,
              color: '#2863DB',
              borderWidth:1,
              borderColor: '#2863DB'
            },
            label: {
              normal:{
                interval:0
              }
            }
          },
          // title:{
          //   show:true,
          //   text:'2015年\n中国实际值',
          //   left:'50px',
          //   top:'0px'
          // },
          grid: {
            top:'0',
            left: '-80px',
            right: '50px',
            bottom: '10%',
            containLabel: true,
            height: 140 ,//设置grid高度
            width:90
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
            data: ['IMF','世界银行预测值','经合组织预测值','联合国预测值'],
            inverse:true,
            axisLabel:{
              show:true,
              textStyle:{
                align:'left'
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
            }
          },
          series: [{
            name: '',
            type: 'bar',
            barMaxWidth:20,
            itemStyle: {
              normal: {
                color:'transparent'
              }
            },
            label: {
              normal: {
                show: true,
                position: ['130','-8'],
                textStyle:{
                  color:'#3366cc'
                }
              }
            },
            barCategoryGap: '50%',
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            // data: ['111','222','333']
          },
            {
              name:'',
              type:'bar',
              barMaxWidth:20,
              barGap: '-100%',
              itemStyle: {
                normal: {
                  color:'transparent'
                }
              },
              label: {
                normal: {
                  show: true,
                  position: ['200','-8'],
                  textStyle:{
                    color:'#333'
                  }
                }
              },
            },
            {
              name:'',
              type:'bar',
              barMaxWidth:20,
              barGap: '-100%',
              itemStyle: {
                normal: {
                  color:'transparent'
                }
              },
              label: {
                normal: {
                  show: true,
                  position: ['255','-8'],
                  textStyle:{
                    color:'#333'
                  }
                }
              },
            }]
        },
        options:[
          {
            series: [{
              'data':['10.6','10.6','10.6','10.6']
            },{
              'data':['10.5','10.636','10.64','9.2']
            },{
              'data':['-0.1','0.036','0.04','5.9']
            }]
          }, {
            series: [{
              'data':['9.5','9.5','9.5','9.5']
            },{
              'data':['9.6','9.536','9.54','8.9']
            },{
              'data':['0.1','0.036','0.04','6']
            }]
          }, {
            series: [{
              'data':['7.9','7.9','7.9','7.9']
            },{
              'data':['8','7.856','7.86','8.7']
            },{
              'data':['0.1','-0.044','-0.04','6.7']
            }]
          }, {
            series: [{
              'data':['7.8','7.8','7.8','7.8']
            },{
              'data':['8.5','7.585','7.76','8.5']
            },{
              'data':['0.7','-0.042','-0.04','6.2']
            }]
          }, {
            series: [{
              'data':['7.3','7.3','7.3','7.3']
            },{
              'data':['6.2','7.298','7.31','7.5']
            },{
              'data':['-1.1','-0.002','0.01','4.9']
            }]

          }, {
            series: [{
              'data':['6.9','6.9','6.9','6.9']
            },{
              'data':['6.8','6.9','6.92','7.3']
            },{
              'data':['-0.1','0','0.02','4.8']
            }]

          } ]
      };
      vm.sjzConfig.dataLoaded=true;
      var widthW = $(body).width();
      if(widthW>1800){
        vm.sjzOption.baseOption.grid.height = 240;
        vm.sjzOption.baseOption.series[0].label.normal.position = ['200','0'];
        vm.sjzOption.baseOption.series[1].label.normal.position = ['300','0'];
        vm.sjzOption.baseOption.series[2].label.normal.position = ['370','0'];
      }
    };
    vm.sjzData();

    //下图
    var colors = ['#564fbe', '#b83fe0'];
    vm.barData=function () {
      vm.barConfig={
        theme: 'Donut',
        dataLoaded: false
      };
      vm.barOption={
        baseOption:{
          timeline: {
            axisType: 'category',
            symbol:'diamond',
            autoPlay: true,
            playInterval: 4000,
            controlStyle: {
              itemSize:16,
              normal:{
                borderColor:'#A0A0A0'
              },
              emphasis:{
                borderColor:'#2863DB'
              }
            },
            data: ['2013','2014', '2015', '2016', '2017', '2018'],
            left:0,
            right:0,
            bottom:0,
            itemStyle: {
              normal: {
                color: '#fff',
                borderColor:'#A0A0A0',
              },
              emphasis:{
                color: '#fff',
                borderColor:'#2863DB'
              }
            },
            lineStyle: {
              color: '#A0A0A0',
              type:'dashed'
            },
            checkpointStyle: {
              symbol:'diamond',
              symbolSize:10,
              color: '#2863DB',
              borderWidth:1,
              borderColor: '#2863DB'
            },
            label: {
              normal:{
                interval:0
              }
            }
          },
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter:'{b}<br>{a} : {c}%'
          },
          grid: {
            top: 40,
            left:40,
            right:30,
            bottom: 80
          },
          yAxis: {
            name:'经济增长率：%',
            type : 'value',
            // min:'-8',
            // max:'8',
            position: 'top',
            nameTextStyle:{
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
          },
          xAxis: {
            type : 'category',
            data : ['美国', '欧元区', '日本', '中国', '印度', '俄罗斯', '巴西', '南非'],
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
          },
          series : [
            {
              name:'预测值',
              type:'bar',
              barMaxWidth:20,
              stack: '',
              itemStyle: {
                normal: {
                  color: function(params) {
                    console.log(params.value);
                    if (params.value < 0)
                      return colors[1];
                    else
                      return colors[0]
                  }
                }
              }
            }
          ]
        },
        options:[
          {
            series: [{
              'data':[2.3,0.7,1.5,8.5,6.5,3.9,4.6,3.3]
            }]
          }, {
            series: [{
              'data':[2.6,1,1.2,6.2,5.1,3,2.5,2.9]
            }]
          }, {
            series: [{
              'data':[2.5,1.5,0.8,6.8,7.5,-3.4,-1.5,2]
            }]
          }, {
            series: [{
              'data':[3,1.7,1.2,6.3,7.5,0.2,0.7,2.1]
            }]
          }, {
            series: [{
              'data':[2.1,1.9,1.3,6.7,7.2,1.4,0.3,1]
            }]

          }, {
            series: [{
              'data':[2.1,1.7,0.6,6.4,7.7,1.4,1.3,1.2]
            }]

          } ]
      };
      vm.barConfig.dataLoaded=true;
    };
    vm.barData();
  }

})();
