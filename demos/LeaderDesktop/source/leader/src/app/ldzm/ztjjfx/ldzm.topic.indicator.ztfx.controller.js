/**
 * 领导桌面-总体经济分析-总体GDP分析
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('ZtjjZtfxController', ZtjjZtfxController);

  /** @ngInject */
  function ZtjjZtfxController($scope, $http, devUrl,SweetAlert, CommService,latestYear) {
    var vm = this;
    var widthW = $(body).width();
    if(widthW>1800){
      $('.echartsBox4 #echarts3').height(420);
    }
    var curYear=latestYear-1;
    vm.lastYear = curYear + '年';
    //上左-饼图 全省GDP及产业分布
    vm.loadPieChart = function($http, devUrl){
      vm.pieConfig={
        theme: 'Donut',
        dataLoaded: false
      };
      var pieLegendData=[];
      var pieData=[];
      vm.pieOption={
        //color: ['#52bfa0','#58E1E7','#B279E2'],
        tooltip: {
          trigger: 'item',
          formatter: "{b}<br/>{c}亿元"
        },
        legend: {
          orient: 'vertical',
          right: 10,
          bottom: 15,
          data:pieLegendData
        },
        series: [{
          name:'总数',
          type:'pie',
          avoidLabelOverlap: false,
          radius: ['45%', '65%'],
          center: ['45%', '45%'],
          label: {
            normal: {
              formatter: '{d}%'
            }
          },
          // labelLine: {
          //   normal: {
          //     show: false
          //   }
          // },
          color: ['#52bfa0', '#CB65BB', '#574FBE'],
          data:pieData
        }]
      };
      var url=devUrl + 'leader/economy/qryEconomyForIndustry/1/1/'+curYear+'_'+curYear;
      CommService.getHttpJsonItem("ztjjfx-ztfx-1-"+curYear+'_'+curYear,url,function(response){
        for(var i in response.data){
          pieLegendData.push(response.data[i].CYFL_NAME);
          pieData.push({name:response.data[i].CYFL_NAME,value:response.data[i].JJZL});
        }
        vm.pieConfig.dataLoaded = true;
      });
    }
    vm.loadPieChart($http, devUrl);
    //上中-柱状图 全省GDP发展情况
    vm.loadBarChart = function($http, devUrl,type){
      var chartCategories = [];
      var series = [];
      vm.ecConfig = {
        theme: 'Donut',
        dataLoaded: false
      };
      vm.ecOption = {
        color: ['#F64500', '#0075FF', '#005500'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '5%',
          bottom: '10',
          containLabel: true
        },
        xAxis: [{
            data: chartCategories,
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
        }],
        yAxis: [{
          name: '单位：亿元',
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
        },{
          name: '增长率%',
          type: 'value',
          axisLabel: {
            formatter: '{value}',
            textStyle:{ color: '#7F7F7F' }
          },
          min: 0,
          max: 24,
          interval: 4,
          nameTextStyle:{
            color: '#7F7F7F'
          },
          axisTick: {
            show:false
          },
          splitLine:{
            show:false
          },
          axisLine: {
            show: false
          }
        }],
        legend: {
          selected: {},
          x:'center',
          y:'28',
          data:['GDP总量','GDP增长率']
        },
        series: series
      };
      series.push({name: 'GDP总量', type: 'bar',barMaxWidth:20,  yAxisIndex:0,data: [],
        itemStyle: {
        normal: {
            color: '#137ebd'
          }
        }
      });
      series.push({name: 'GDP增长率', type: 'line',  yAxisIndex:1,data: [],
        itemStyle: {
          normal: {
              color: '#ff9f17'
            }
          }
        });
      var url=devUrl + 'leader/economy/qryEconomy/'+type+'/1/';
      var myDate = new Date();
      var yearExt="";
      if(type==1){
        var year_num=4;
        var endDate=latestYear;
        var beginDate=endDate-year_num;
        yearExt=(beginDate+'_'+endDate);
        url+=yearExt;
      }else{
        var endDate=latestYear-1;
        var beginDate=latestYear-2;
        yearExt=(beginDate+'1_'+endDate+'4');
        url+=yearExt;
      }
      console.log(url);
      CommService.getHttpJsonItem("ztjjfx-ztfx-2-"+type+"-"+yearExt,url,function(response){
        var result = response.data;
        var maxBar=0;
        var maxLine=0;
        for (var i in result) {
          chartCategories.push(result[i].DATE_PERIOD);
          series[0].data.push(result[i].GDP);
          series[1].data.push(result[i].ZZL);
          if(result[i].GDP>maxBar){
            maxBar=result[i].GDP;
          }
          if(result[i].ZZL>maxLine){
            maxLine=result[i].ZZL;
          }
        }
        // vm.ecOption.yAxis[0].max=maxBar+2500;
        // vm.ecOption.yAxis[1].max=maxLine+3.5;
        vm.ecConfig.dataLoaded = true;
      });
    }
    vm.loadBarChart($http, devUrl,1);
    $(".toggle-btn a").click(function() {
      var self = $(this);
      if (self.hasClass("target")) {
        return;
      }
      $(".toggle-btn a.target").removeClass("target");
      self.addClass("target");
      var type = self.attr("tp");
      //console.log(type);
      vm.loadBarChart($http, devUrl,type);
      $scope.$apply();//需要手动刷新
    });
    //上右
    vm.areaDataList=[];
    vm.areaMap={
      '1':'全省',
      '2':'长株潭',
      '3':'湘南',
      '4':'大湘西',
      '5':'洞庭湖'
    }
    vm.loadData = function($http, devUrl){
      var url=devUrl + 'leader/economy/qryEconomyByDate/1/'+curYear+'_'+curYear;
      CommService.getHttpJsonItem("ztjjfx-ztfx-3-"+curYear,url,function(response){
        vm.areaDataList=response.data;
      });
    }
    vm.loadData($http, devUrl);
    //左下 全省GDP市州排行
    vm.loadBarChart1=function($http, devUrl,district_no){
      vm.barConfig={
        theme: 'Donut',
        dataLoaded: false
      };
      var barCategoryData=[];
      var barData1=[];
      var barData2=[];
      var barData3=[];
      vm.barOption={
        color: ['#137ebd'],
        calculable: true,
        grid: {
          left: 80,
          right:100,
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
          offset:10,
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
            label: {
              normal: {
                formatter: '↑{c}%',
                position: ['300', '0'],
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
                position: ['225', '0'],
                show: true
              }
            },
            //barWidth: 22,
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
      CommService.getHttpJsonItem("ztjjfx-ztfx-4-"+district_no+"-"+curYear+'_'+curYear,url,function(response){
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
    vm.loadBarChart1($http, devUrl,1);
    //右下 全省GDP行业分布
    vm.loadBarChart2=function($http, devUrl){
      var barCategory=[];
      var barData=[];
      var barData1=[];
      vm.barConfig2={
        theme: 'Donut',
        dataLoaded: false
      };
      vm.barOption2={
        grid: {
          left: '3%',
          right: '5%',
          bottom: '5%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          //formatter: '{b0}<br/>GDP总量：{c0}亿元',
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
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },

        },
        xAxis : [
          {
            type : 'category',
            data : barCategory,
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
          }
        ],
        yAxis: [
          {
            type : 'value',
            name:'单位：亿元',
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
          }
        ],
        series : [
          {
            name:'GDP',
            type:'bar',
            barMaxWidth:20,
            itemStyle: {
              normal: {
                color: '#4f49a8'
              }
            },
            tooltip:{
              formatter: "{b}(亿元)",
              show:true
            },
            z: 10,
            data:barData
          }
        ]
      };
      var queryUrl=devUrl + 'leader/economy/qryEconomyForTrade/1/1/'+curYear+'_'+curYear;
      CommService.getHttpJsonItem("ztjjfx-ztfx-5-"+curYear+'_'+curYear,queryUrl,function(response){
        var result = response.data;
        for (var i in result) {
          if(result[i].INDUSTRY_CATEGORY_NAME.length > 8){
             barCategory.push(result[i].INDUSTRY_CATEGORY_NAME.substring(0,3)+"\n"+result[i].INDUSTRY_CATEGORY_NAME.substring(3,8)+"\n"+result[i].INDUSTRY_CATEGORY_NAME.substring(8));
          }else if(result[i].INDUSTRY_CATEGORY_NAME.length > 4){
             barCategory.push(result[i].INDUSTRY_CATEGORY_NAME.substring(0,4)+"\n"+result[i].INDUSTRY_CATEGORY_NAME.substring(4));
          }else{
            barCategory.push(result[i].INDUSTRY_CATEGORY_NAME);
          }
          barData.push(result[i].JJZL);
        }
        var maxData=Math.max.apply(null, barData);
        for(var i in barData){
          barData1.push(maxData);
        }
        vm.barConfig2.dataLoaded = true;
      });
    }
    vm.loadBarChart2($http, devUrl);
  }
})();


