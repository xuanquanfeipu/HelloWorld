/**
 * Created by 6005001630 on 2017/10/9.
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('ZblsSxfxController', ZblsSxfxController);

  /** @ngInject */
  function ZblsSxfxController($scope, $http, devUrl, SweetAlert, CommService,latestYear) {
    var vm = this;
    var myDate=new Date();
    var curYear=parseInt(latestYear)+1;
    vm.year='';
    var total=0;

    var chartSeries = [];
    var chartSeries1 = [];
    var maxData=0;
    var xAxisDatas=[];
    var yAxisDatas=[];
    var bgData=[];
    vm.unit='增速: %';
    vm.unit1='';
    var legendData=['地区生产总值增速'];
    vm.provinces=[
      {index:1,value:'湖南省',districtNo:1},
      {index:2,value:'湖北省',districtNo:2},
      {index:3,value:'山西省',districtNo:6},
      {index:4,value:'安徽省',districtNo:14},
      {index:5,value:'江西省',districtNo:16},
      {index:6,value:'河南省',districtNo:18}
      ];


    //指标初始化
    vm.dropOrder = 1;
    vm.dropOrderTxt = '地区生产总值增速';
    vm.title='';
    vm.percent='';

    //点击事件
    var onBarClick=function (params) {
      // console.log(params);
      vm.dataList.length = 0;
      vm.title=params.name;
      vm.percent='';
      vm.year=(params.name).substring(0,4)+(params.name).substring(7,9);
      vm.pieData(vm.year);
      vm.pieChart();
      $scope.$apply();
    };

    //柱形图
    var data1=[];
    var dateType=5;
    var district_no=1;
    vm.barData=function () {
      var url = '';
      if(vm.dropOrder==1 || vm.dropOrder==4 ){
        dateType=4;
        url = 'leader/economy/qryZBLSbyDistrict/'+dateType+'/'+district_no+'/'+(curYear-2)+'03'+'_'+''+curYear+'06';
      }else{
        dateType=5;
        url = 'leader/economy/qryZBLSbyDistrict/'+dateType+'/'+district_no+'/'+(curYear-1)+'06'+'_'+''+curYear+'06';
      }
      CommService.getHttpJsonItem(url,devUrl+url,function(response){
        var result=response.data;
        for(var i in result){
          if(vm.dropOrder==1){
            chartSeries.push(result[i].GDPZS);
            data1.push({dqId:result[i].DISTRICT_NO,value:result[i].GDPZS});
            if(result[i].GDPZS>maxData){
              maxData=result[i].GDPZS
            }
          }else if(vm.dropOrder==2){
            chartSeries.push(result[i].GMGYZJZZS);
            data1.push({dqId:result[i].DISTRICT_NO,value:result[i].GMGYZJZZS});
            if(result[i].GMGYZJZZS>maxData){
              maxData=result[i].GMGYZJZZS
            }
          }else if(vm.dropOrder==3){
            chartSeries.push(result[i].GDZCTZ);
            data1.push({dqId:result[i].DISTRICT_NO,value:result[i].GDZCTZ});
            chartSeries1.push(result[i].GDZCTZZS);
            if(result[i].GDZCTZ>maxData){
              maxData=result[i].GDZCTZ
            }
          }else if(vm.dropOrder==4){
            chartSeries.push(result[i].SHXFPLSZEZS);
            data1.push({dqId:result[i].DISTRICT_NO,value:result[i].SHXFPLSZEZS});
            if(result[i].SHXFPLSZEZS>maxData){
              maxData=result[i].SHXFPLSZEZS
            }
          }else if(vm.dropOrder==5){
            chartSeries.push(result[i].JCKJDZ);
            data1.push({dqId:result[i].DISTRICT_NO,value:result[i].JCKJDZ});
            chartSeries1.push(result[i].JCKZS);
            if(result[i].JCKJDZ>maxData){
              maxData=result[i].JCKJDZ
            }
          }else if(vm.dropOrder==6){
            chartSeries.push(result[i].JKJDZ);
            data1.push({dqId:result[i].DISTRICT_NO,value:result[i].JKJDZ});
            if(result[i].JKJDZ>maxData){
              maxData=result[i].JKJDZ
            }
          }else if(vm.dropOrder==7){
            chartSeries.push(result[i].CKJDZ);
            data1.push({dqId:result[i].DISTRICT_NO,value:result[i].CKJDZ});
            if(result[i].CKJDZ>maxData){
              maxData=result[i].CKJDZ
            }
          }else if(vm.dropOrder==8){
            chartSeries.push(result[i].DFCZSRZE);
            data1.push({dqId:result[i].DISTRICT_NO,value:result[i].DFCZSRZE});
            chartSeries1.push(result[i].DFCZSRZS);
            if(result[i].DFCZSRZE>maxData){
              maxData=result[i].DFCZSRZE
            }
          }else if(vm.dropOrder==9){
            chartSeries.push(result[i].JMXFJGZS);
            data1.push({dqId:result[i].DISTRICT_NO,value:result[i].JMXFJGZS});
            if(result[i].JMXFJGZS>maxData){
              maxData=result[i].JMXFJGZS
            }
          }
          xAxisDatas.push((result[i].DATE_PERIOD).substring(0,4)+'年1-'+(result[i].DATE_PERIOD).substring(4)+'月');
        }
        for (var i in result) {
          bgData.push(maxData);
        }
      })
    };
    vm.loadBarChart = function() {
      /*if(vm.dropOrder==9){
        yAxis[0].min=100;
      }*/
      vm.barConfig = {
        dataLoaded: false
      };
      vm.barOption = {
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            if(vm.dropOrder==3 || vm.dropOrder==5 || vm.dropOrder==8){
              return params[0].name + '</br>' +params[0].seriesName +': '+params[0].value +'</br>'
                +params[1].seriesName +': '+params[1].value ;
            }else{
              return params[0].name + '</br>' +params[0].seriesName +': '+params[0].value;
            }
          },
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        color: ['#4f49a8'],
        grid: {
          left: '15',
          right: '15',
          bottom: '30',
          top:'24%',
          containLabel: true
        },
        legend:{
          data:legendData,
          top:'10%',
          left:'center'
        },
        xAxis: [{
          type: 'category',
          data: xAxisDatas,
          axisTick: {
            show: false
          },
          splitLine: {
            textStyle: {color: 'white'},
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#d8dde2'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#7F7F7F',
              align:'center'
            },
            interval:0,
            margin:24,
            rotate:30
          }
        }],
        yAxis: [{
          name: vm.unit,
          nameGap:'60', 
          axisLabel: {
            textStyle:{color: '#7F7F7F'}
          },
          nameTextStyle:{color: '#7F7F7F'},
          type: 'value', 
          splitLine:{show: false}, 
          axisTick: {show: false}, 
          axisLine: {lineStyle: {color: '#d8dde2'}}
        },{
          name: vm.unit1, 
          show: false, 
          nameGap:'60', 
          axisLabel: {show:false}, 
          type: 'value', 
          splitLine: {show: false},
          axisTick: {show: false}, 
          axisLine: {show: false}
        }],
        series: [{
          name: legendData[0],
          type: 'bar',
          yAxisIndex: 0,
          data: chartSeries,
          barMaxWidth: 18,
          z:10,
          itemStyle: {
            normal: {
              color: '#4f49a8'
            },
            emphasis: {
              color: '#fcbb00'
            }
          }
        },{
          show:false,
          name: legendData[1],
          type: 'line',
          yAxisIndex: 1,
          data: chartSeries1,
          barMaxWidth: 18,
          z:10,
          itemStyle: {
            normal: {
              color: '#b863bb'
            }
          }
        },{
          name: '',
          type: 'bar',
          yAxisIndex: 0,
          data: bgData,
          barGap:'-100%',
          barMaxWidth: 18,
          itemStyle: {
            normal: {
              color: '#e1e1e1'
            }
          }
        }]
      };
      vm.barConfig.dataLoaded=true;
      vm.barConfig.event = [{click:onBarClick}];
      vm.barConfig1 = {
        dataLoaded: false
      };
      vm.barOption1 = {
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            if(vm.dropOrder==3 || vm.dropOrder==5 || vm.dropOrder==8){
              return params[0].name + '</br>' +params[0].seriesName +': '+params[0].value +'</br>'
                +params[1].seriesName +': '+params[1].value ;
            }else{
              return params[0].name + '</br>' +params[0].seriesName +': '+params[0].value;
            }
          },
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        color: ['#4f49a8'],
        grid: {
          left: '15',
          right: '15',
          bottom: '30',
          top:'24%',
          containLabel: true
        },
        legend:{
          data:legendData,
          top:'10%',
          left:'center'
        },
        xAxis: [{
          type: 'category',
          data: xAxisDatas,
          axisTick: {
            show: false
          },
          splitLine: {
            textStyle: {color: 'white'},
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#d8dde2'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#7F7F7F',
              align:'center'
            },
            interval:0,
            margin:24,
            rotate:30
          }
        }],
        yAxis: [{
          name: vm.unit, 
          nameGap:'60', 
          axisLabel: {
            textStyle: {color: '#7F7F7F'}
          }, 
          nameTextStyle: {color: '#7F7F7F'},
          type: 'value', 
          splitLine: {show: false}, 
          axisTick: {show: false}, 
          axisLine: {
            lineStyle: {color: '#d8dde2'}
          }
        }, {
          name: vm.unit1, 
          show: true, 
          nameGap:'60', 
          axisLabel: {
            textStyle: {color: '#7F7F7F'}
          }, 
          nameTextStyle: {color: '#7F7F7F'},
          type: 'value', 
          splitLine: {show: false}, 
          axisTick: {show: false}, 
          axisLine: {
            lineStyle: {color: '#d8dde2'}
          }
        }],
        series: [{
          name: legendData[0],
          type: 'bar',
          yAxisIndex: 0,
          data: chartSeries,
          barMaxWidth: 18,
          z:10,
          itemStyle: {
            normal: {
              color: '#4f49a8'
            },
            emphasis: {
              color: '#fcbb00'
            }
          }
        },{
          show:false,
          name: legendData[1],
          type: 'line',
          yAxisIndex: 1,
          data: chartSeries1,
          barMaxWidth: 18,
          z:10,
          itemStyle: {
            normal: {
              color: '#b863bb'
            }
          }
        },{
          name: '',
          type: 'bar',
          yAxisIndex: 0,
          data: bgData,
          barGap:'-100%',
          barMaxWidth: 18,
          itemStyle: {
            normal: {
              color: '#e1e1e1'
            }
          }
        }]
      };
      vm.barConfig1.dataLoaded=true;
      vm.barConfig1.event = [{click:onBarClick}];
    };

    //饼图
    vm.pieData=function (Year) {
      var url = '';
      if(vm.dropOrder==1 || vm.dropOrder==4){
        url = 'leader/economy/qryZBLS/4/'+Year+'_'+Year;
      }else {
        url = 'leader/economy/qryZBLS/5/'+Year+'_'+Year;
      }
      // console.log(url)
      CommService.getHttpJsonItem(url,devUrl+url,function(response){
        vm.dataList.length=0;
        var result=response.data;
        for(var i in result){
          if(vm.dropOrder == 1){
            vm.dataList.push({Id:result[i].DISTRICT_NO,name:result[i].DISTRICT_NAME,value:result[i].GDPZS})
          }else if(vm.dropOrder == 2){
            vm.dataList.push({Id:result[i].DISTRICT_NO,name:result[i].DISTRICT_NAME,value:result[i].GMGYZJZZS})
          }else if(vm.dropOrder == 3){
            vm.dataList.push({Id:result[i].DISTRICT_NO,name:result[i].DISTRICT_NAME,value:result[i].GDZCTZ})
          }else if(vm.dropOrder == 4){
            vm.dataList.push({Id:result[i].DISTRICT_NO,name:result[i].DISTRICT_NAME,value:result[i].SHXFPLSZEZS})
          }else if(vm.dropOrder == 5){
            vm.dataList.push({Id:result[i].DISTRICT_NO,name:result[i].DISTRICT_NAME,value:result[i].JCKJDZ})
          }else if(vm.dropOrder == 6){
            vm.dataList.push({Id:result[i].DISTRICT_NO,name:result[i].DISTRICT_NAME,value:result[i].JKJDZ})
          }else if(vm.dropOrder == 7){
            vm.dataList.push({Id:result[i].DISTRICT_NO,name:result[i].DISTRICT_NAME,value:result[i].CKJDZ})
          }else if(vm.dropOrder == 8){
            vm.dataList.push({Id:result[i].DISTRICT_NO,name:result[i].DISTRICT_NAME,value:result[i].DFCZSRZE})
          }else if(vm.dropOrder == 9){
            vm.dataList.push({Id:result[i].DISTRICT_NO,name:result[i].DISTRICT_NAME,value:result[i].JMXFJGZS})
          }
        }
        total=0;
        if(vm.dropOrder==1){
          for(var i in vm.dataList){
            total += vm.dataList[i].value
          }
        }else if(vm.dropOrder==2){
          for(var i in vm.dataList){
            total += vm.dataList[i].value
          }
        }else if(vm.dropOrder==3){
          for(var i in vm.dataList){
            total += vm.dataList[i].value
          }
        }else if(vm.dropOrder==4){
          for(var i in vm.dataList){
            total += vm.dataList[i].value
          }
        }else if(vm.dropOrder==5){
          for(var i in vm.dataList){
            total += vm.dataList[i].value
          }
        }else if(vm.dropOrder==6){
          for(var i in vm.dataList){
            total += vm.dataList[i].value
          }
        }else if(vm.dropOrder==7){
          for(var i in vm.dataList){
            total += vm.dataList[i].value
          }
        }else if(vm.dropOrder==8){
          for(var i in vm.dataList){
            total += vm.dataList[i].value
          }
        }else if(vm.dropOrder==9){
          for(var i in vm.dataList){
            total += vm.dataList[i].value
          }
        }
      })
    };

    vm.dataList=[];
    vm.titleTxt='地区生产总值增速';
    vm.pieChart=function () {
      vm.pieConfig = {
        dataLoaded: false
      };
      vm.pieOption = {
        color:['#394aa9','#cb64bb','#6c6fef','#3295cf','#6cb964','#e28750','#a76cef','#2863db','#00c2a9','#c0e347','#b13df3','#48b143'], //饼图颜色
        title: {
          text: vm.title,
          subtext: vm.percent,
          x: 'center',
          y: 'center',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            return params.name +'占比' + '</br>'
              + params.seriesName + ': ' + params.value+'('+params.percent+'%'+')';
          }
        },
        series: [
          {
            name:vm.titleTxt,
            type:'pie',
            radius: ['40%', '55%'],
            data:vm.dataList
          }
        ]
      };
      vm.pieConfig.dataLoaded=true;
    };

    //计算各省每年不同指标的占比
    vm.perData=function (item,year) {
      if(year==vm.year){
        if(vm.dropOrder==1){
          for(var j in vm.dataList){
            for(var k in vm.provinces){
              if(item==vm.provinces[k].index && vm.dataList[j].Id == vm.provinces[k].districtNo){
                vm.percent=(vm.dataList[j].value/total*100).toFixed(2)+'%';
              }
            }
          }
        }else if(vm.dropOrder==2){
          for(var j in vm.dataList){
            for(var k in vm.provinces){
              if(item==vm.provinces[k].index && vm.dataList[j].Id == vm.provinces[k].districtNo){
                vm.percent=(vm.dataList[j].value/total*100).toFixed(2)+'%';
              }
            }
          }
        }else if(vm.dropOrder==3){
          for(var j in vm.dataList){
            for(var k in vm.provinces){
              if(item==vm.provinces[k].index && vm.dataList[j].Id == vm.provinces[k].districtNo){
                vm.percent=(vm.dataList[j].value/total*100).toFixed(2)+'%';
              }
            }
          }
        }else if(vm.dropOrder==4){
          for(var j in vm.dataList){
            for(var k in vm.provinces){
              if(item==vm.provinces[k].index && vm.dataList[j].Id == vm.provinces[k].districtNo){
                vm.percent=(vm.dataList[j].value/total*100).toFixed(2)+'%';
              }
            }
          }
        }else if(vm.dropOrder==5){
          for(var j in vm.dataList){
            for(var k in vm.provinces){
              if(item==vm.provinces[k].index && vm.dataList[j].Id == vm.provinces[k].districtNo){
                vm.percent=(vm.dataList[j].value/total*100).toFixed(2)+'%';
              }
            }
          }
        }else if(vm.dropOrder==6){
          for(var j in vm.dataList){
            for(var k in vm.provinces){
              if(item==vm.provinces[k].index && vm.dataList[j].Id == vm.provinces[k].districtNo){
                vm.percent=(vm.dataList[j].value/total*100).toFixed(2)+'%';
              }
            }
          }
        }else if(vm.dropOrder==7){
          for(var j in vm.dataList){
            for(var k in vm.provinces){
              if(item==vm.provinces[k].index && vm.dataList[j].Id == vm.provinces[k].districtNo){
                vm.percent=(vm.dataList[j].value/total*100).toFixed(2)+'%';
              }
            }
          }
        }else if(vm.dropOrder==8){
          for(var j in vm.dataList){
            for(var k in vm.provinces){
              if(item==vm.provinces[k].index && vm.dataList[j].Id == vm.provinces[k].districtNo){
                vm.percent=(vm.dataList[j].value/total*100).toFixed(2)+'%';
              }
            }
          }
        }else if(vm.dropOrder==9){
          for(var j in vm.dataList){
            for(var k in vm.provinces){
              if(item==vm.provinces[k].index && vm.dataList[j].Id == vm.provinces[k].districtNo){
                vm.percent=(vm.dataList[j].value/total*100).toFixed(2)+'%';
              }
            }
          }
        }
      }
    };

    //初始化
    vm.barData();
    vm.loadBarChart();

    //选择指标
    vm.dropBtn=function(dropNo,dropTxt){
      chartSeries = [];
      chartSeries1=[];
      xAxisDatas=[];
      maxData=[];
      bgData=[];
      vm.dropOrder = dropNo;
      vm.dropOrderTxt = dropTxt;
      switch (dropNo){
        case 1:
          vm.unit='增速: %';
          vm.unit1='';
          legendData=['地区生产总值增速'];
          vm.titleTxt='地区生产总值增速';
          break;
        case 2:
          vm.unit='增速: %';
          vm.unit1='';
          legendData=['规模工业增加值增速'];
          vm.titleTxt='规模工业增加值增速';
          break;
        case 3:
          vm.unit='单位: 亿元';
          vm.unit1='增速: %';
          legendData=['固定资产投资绝对值','固定资产投资增速'];
          vm.titleTxt='固定资产投资绝对值';
          break;
        case 4:
          vm.unit='增速: %';
          vm.unit1='';
          legendData=['社会消费品零售总额增速'];
          vm.titleTxt='社会消费品零售总额增速';
          break;
        case 5:
          vm.unit='单位: 亿元';
          vm.unit1='增速: %';
          legendData=['进出口绝对值','进出口绝对值增速'];
          vm.titleTxt='进出口绝对值';
          break;
        case 6:
          vm.unit='单位: 亿元';
          vm.unit1='';
          legendData=['出口绝对值'];
          vm.titleTxt='出口绝对值';
          break;
        case 7:
          vm.unit='单位: 亿元';
          vm.unit1='';
          legendData=['进口绝对值'];
          vm.titleTxt='进口绝对值';
          break;
        case 8:
          vm.unit='单位: 亿元';
          vm.unit1='增速: %';
          legendData=['地方财政收入绝对值','地方财政收入绝对值增速'];
          vm.titleTxt='地方财政收入绝对值';
          break;
        case 9:
          vm.unit='单位: %';
          vm.unit1='';
          legendData=['居民消费价格指数'];
          vm.titleTxt='居民消费价格指数';
          break;
      }
      vm.barData();
      vm.loadBarChart();
      if(vm.dropOrder ==1 || vm.dropOrder==2 || vm.dropOrder==4 || vm.dropOrder==9){
        $('#pieChartBox').hide();
      }else if(vm.dropOrder ==3 || vm.dropOrder==5 || vm.dropOrder==6 || vm.dropOrder==7|| vm.dropOrder==8 ) {
        $('#pieChartBox').show();
        if (vm.year == '') {
          vm.pieData('201704');
          vm.title='2017年1-04月';
        } else {
          vm.pieData(vm.year);
          vm.title=vm.year.substring(0,4)+'年'+'1-'+vm.year.substring(4,6)+'月';
        }
      }
      vm.percent=0;
      // vm.title='';
      vm.pieChart();
    };
    $('.textBox').click(function () {
      $('.textList').toggle();
    });
    $(document).click(function (e) {
      var target = $(e.target);
      if($(target.closest(".textBox")).length==0){
        $('.textList').hide()
      }
    });


    //选择省份
    vm.switchBarChart = function(item){
      // console.log(item);
      chartSeries = [];
      chartSeries1=[];
      xAxisDatas=[];
      maxData=[];
      bgData=[];
      for(var i in vm.provinces){
        if(item==vm.provinces[i].index){
          district_no=vm.provinces[i].districtNo;
          vm.title=vm.provinces[i].value+'占比';
        }
      }
      vm.barData();
      vm.loadBarChart();
      if(vm.dropOrder ==1 || vm.dropOrder==2 || vm.dropOrder==4 || vm.dropOrder==9){
        $('#pieChartBox').hide();
      }else if(vm.dropOrder ==3 || vm.dropOrder==5 || vm.dropOrder==6 || vm.dropOrder==7|| vm.dropOrder==8 ) {
        $('#pieChartBox').show();
        if (vm.year == '') {
          vm.pieData('201704');
        } else {
          vm.pieData(vm.year);
        }
      }
      vm.perData(item,vm.year);
      vm.pieChart();
    };


  }
})();
