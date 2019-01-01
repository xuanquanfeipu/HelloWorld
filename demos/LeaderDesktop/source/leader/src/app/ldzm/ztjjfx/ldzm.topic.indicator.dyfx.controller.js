/**
 * 领导桌面-总体经济分析-地域分析
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('ZtjjDyfxController', ZtjjDyfxController);

  /** @ngInject */
  function ZtjjDyfxController($scope, $http, devUrl,SweetAlert, CommService,latestYear) {
    var vm = this;
    var myDate = new Date();
    var curYear=latestYear-1;
    vm.lastYear = curYear + '年';
    //地图
    vm.curAreaName="湖南省";
    vm.areaName="市州";
    var areaMap={};
    vm.initMap = function($http, devUr){
      var mapData=[];
      vm.mapConfig = {
        theme: 'Donut',
        dataLoaded: false
      };
      vm.mapOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}GDP总额<br/>{c} 亿元',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        visualMap: {
          min: 500,
          max: 9000,
          orient:'horizontal',
          left: 'center',
          //top: 'bottom',
          bottom:'30',
          text: ['高','低'],           // 文本，默认为数值文本
          calculable: true,
          inRange: {
            color: ['#f1f3ff','#2e40a4']
          }
        },
        series: [{
          name: '总量',
          type: 'map',
          map: 'hunan',
          roam: false,
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              borderWidth:1,
              borderColor:'#fff'
            }
          },
          selectedMode : 'single',
          data:mapData
        }]
      };
      var url=devUrl + 'leader/economy/qryEconomyForArea/1/1/'+curYear+'_'+curYear;
      CommService.getHttpJsonItem("ztjjfx-dyfx-1-"+curYear+'_'+curYear,url,function(response){
        var result=response.data;
        for(var i=0;i<result.length;i++){
          mapData.push({seriesId:result[i].DISTRICT_NO,name:result[i].DISTRICT_NAME,value:result[i].JJZL,zzl:result[i].ZZL});
          areaMap[result[i].DISTRICT_NAME]=result[i].DISTRICT_NO;
        }
        //console.log(areaMap);
        vm.mapConfig.dataLoaded=true;
        vm.mapConfig.event = [{mapselectchanged:onMapSelectChanged}];
      });
    }
    vm.loadPieChart=function($http, devUrl,district_no){
      vm.pieConfig={
        theme: 'Donut',
        dataLoaded: false
      };
      var pieLegendData=[];
      var pieData=[];
      vm.pieOption={
        color: ['#02BFF6','#58E1E7','#B279E2'],
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c} 亿元',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          bottom: 15,
          data:pieLegendData
        },
        series: [{
          name: 'GDP总量',
          type: 'pie',
          radius : '55%',
          center: ['50%', '40%'],
          data:pieData,
          color: ['#52bfa0', '#CB65BB', '#574FBE'],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      };
      var url=devUrl + 'leader/economy/qryEconomyForIndustry/1/'+district_no+'/'+curYear+'_'+curYear;
      CommService.getHttpJsonItem("ztjjfx-dyfx-2-"+district_no+"-"+curYear+'_'+curYear,url,function(response){
        for(var i in response.data){
          pieLegendData.push(response.data[i].CYFL_NAME);
          pieData.push({name:response.data[i].CYFL_NAME,value:response.data[i].JJZL});
          //console.log(response.data[i].CYFL_NAME);
        }
        vm.pieConfig.dataLoaded = true;
      });
    }

    //dgp市州排行
    vm.loadBarChart=function($http, devUrl,district_no){
      vm.barConfig={
        theme: 'Donut',
        dataLoaded: false
      };
      var barCategoryData=[];
      var barData1=[];
      var barData2=[];
      var barData3=[];
      vm.barOption={
        color: ['#0C6BD9'],
        calculable: true,
        grid: {
          left: 45,
          right:125,
          top:10,
          bottom:10
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
        yAxis: [{
          type: "category",
          inverse:true,
          data: barCategoryData,
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
            type: "bar",
            silent: true,
            barMaxWidth:35,
            itemStyle: {
              normal: {
                color: '#f5f5f5'
              }
            },
            //barWidth: 22,
            barGap: '-100%',
            data: barData1
          }
          ,
          {
            type: "bar",
            silent: true,
            itemStyle: {
              normal: {
                color: '#f5f5f5'
              }
            },
            barMaxWidth:35,
            label: {
              normal: {
                formatter: '↑{c}%',
                position: ['200', '0'],
                show: true,
                textStyle:{
                  color:'red'
                }
              }
            },
            //barWidth: 22,
            barGap: '-100%',
            data: barData3
          }
          ,{
            name: "GDP总量",
            type: "bar",
            label: {
              normal: {
                formatter: '{c}亿元',
                position: ['120', '0'],
                show: true
              }
            },
            //barWidth: 22,
            barMaxWidth:35,
            barMaxHeight:220,
            barCategoryGap:'50%',
            z: 10,
            tooltip:{
              show:false
            },
            data: barData2
          }
        ]
      };
      var url=devUrl + 'leader/economy/qryEconomyForArea/1/'+district_no+'/'+curYear+'_'+curYear;
      CommService.getHttpJsonItem("ztjjfx-dyfx-3-"+district_no+"-"+curYear+'_'+curYear,url,function(response){
        var maxData=0;
        for(var i in response.data){
          if(i==5){
            break;
          }
          barCategoryData.push(response.data[i].DISTRICT_NAME);
          barData2.push({name:response.data[i].DISTRICT_NAME,value:response.data[i].JJZL});
          barData3.push(response.data[i].ZZL);
          if(response.data[i].JJZL>maxData){
            maxData=response.data[i].JJZL;
          }

        }
        for(var i in barData2){
          barData1.push(maxData);
        }
        //console.log(barData1);
        vm.barConfig.dataLoaded = true;
      });
    }

    var chartCategories = [];
    var chartSeries=[];
    // vm.genSeries = function(data,title,type,yAxisIndex){
    //   var industryList = [7,0,14,5,4,16,2];
    //   for(var i in data){
    //     for (var j in industryList) {
    //       if(data[i].INDUSTRY_CATEGORY_NO ==industryList[j]){
    //           chartSeries.push({name: data[i].INDUSTRY_CATEGORY_NAME+title, type: type,  yAxisIndex:yAxisIndex,data: [],barMaxWidth:15,});
    //       }
    //     }
    //   }
    // }
    vm.loadBarChart1=function($http, devUrl,district_no){
      vm.barConfig1={
        theme: 'Donut',
        dataLoaded: false
      };
      vm.barOption1={
        color:['#4f49a8'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
            if(params[0].name.length > 8){
               params[0].name=params[0].name.substring(0,3)+params[0].name.substring(4,9)+params[0].name.substring(10);
            }else if(params[0].name.length > 4){
               params[0].name=params[0].name.substring(0,4)+params[0].name.substring(5);
            }else{
              params[0].name=params[0].name;
            }
            return params[0].name.replace(" ","")+'<br/>GDP总量：'+ params[0].value+'亿元';
          },
        },
        grid: {
          left: '3%',
          right: '5%',
          bottom: '10%',
          top: '10%',
          containLabel: true
        },
        xAxis: [{
          data: chartCategories,
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
        yAxis: [{
          name: '单位：亿元',
          nameTextStyle:{
            color: '#7F7F7F'
          },
          type: 'value',
          axisLabel: {
            formatter: '{value}',
            textStyle:{ color: '#7F7F7F' }
          },
          offset:10,
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
          }
        }],
        series:[
            {
                name:'行业分类',
                type:'bar',
                barMaxWidth:20,
                data:chartSeries
            }
        ]
      };
      //查询行业分类
      var url=devUrl + 'common/qryIndustryList';
      CommService.getHttpJsonItem("ztjjfx-dyfx-4",url,function(response){
        //vm.genSeries(response.data,'','bar',0);
        vm.queryData($http, devUrl,district_no);
      });

    }

    vm.queryData=function($http, devUrl,district_no){
      var year_num=4;
      var myDate = new Date();
      var endDate=latestYear-1;
      var beginDate= endDate-year_num;
      var queryUrl=devUrl + 'leader/economy/qryEconomyForTrade/1/'+district_no+'/'+endDate+'_'+endDate;
      console.log(queryUrl);
      var maxBar;
      CommService.getHttpJsonItem("ztjjfx-dyfx-5-"+district_no+"-"+endDate+'_'+endDate,queryUrl,function(response){
        var result = response.data;
        for (var i in result) {
            if(result[i].INDUSTRY_CATEGORY_NAME.length > 8){
               chartCategories.push(result[i].INDUSTRY_CATEGORY_NAME.substring(0,3)+"\n"+result[i].INDUSTRY_CATEGORY_NAME.substring(3,8)+"\n"+result[i].INDUSTRY_CATEGORY_NAME.substring(8));
            }else if(result[i].INDUSTRY_CATEGORY_NAME.length > 4){
               chartCategories.push(result[i].INDUSTRY_CATEGORY_NAME.substring(0,4)+"\n"+result[i].INDUSTRY_CATEGORY_NAME.substring(4));
            }else{
              chartCategories.push(result[i].INDUSTRY_CATEGORY_NAME);
            }
            chartSeries.push(result[i].JJZL);
          if(result[i].JJZL>maxBar){
            maxBar=result[i].JJZL;
          }
        }
        //vm.barOption1.yAxis[0].max=maxBar;
        vm.barConfig1.dataLoaded = true;
      });
    };
    var onMapSelectChanged=function(params){
      //vm.mapConfig.dataLoaded=false;
      //vm.mapOption.series[0].map='changsha';
      //console.log(vm.mapOption);
      //vm.ecConfig.dataLoaded=true;
      console.log('onMapSelectChanged:');
      params=params.batch[0];
      var district_no=1;
      if(params.selected[params.name]){
        vm.curAreaName = params.name;
        vm.areaName="区县";
        district_no=areaMap[vm.curAreaName];
      }else{
        vm.curAreaName="湖南省";
        vm.areaName="市州";
      }
      //console.log(vm.curAreaName+","+district_no);
      vm.loadPieChart($http, devUrl,district_no);
      vm.loadBarChart($http, devUrl,district_no);
      chartCategories = [];
      chartSeries=[];
      vm.loadBarChart1($http, devUrl,district_no);
      $scope.$apply();//需要手动刷新
    }
    vm.initMap($http, devUrl);
    vm.loadPieChart($http, devUrl,1);
    vm.loadBarChart($http, devUrl,1);
    vm.loadBarChart1($http, devUrl,1);
  }
})();


