/**
 * 领导桌面-总体经济分析-行业分析
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('ZtjjHyfxController', ZtjjHyfxController);

  /** @ngInject */
  function ZtjjHyfxController($scope, $http, devUrl,SweetAlert, CommService,latestYear) {
    var vm = this;
    var myDate = new Date();
    vm.curYear=latestYear-1;
    vm.lastYear = vm.curYear + '年';
    vm.years = [];//年份
    vm.dataList=[];//行业
    var chartCategories = [];
    var chartSeries = [];
    vm.list = [];
    //上左-饼图
    var pieLegendData=[];
    var pieDataMap={};
    var pieLegendSelected={};
    var onLegendSelectChanged=function(params){
      //console.log(params.name+','+params.selected[params.name]);
      pieLegendSelected[params.name] = params.selected[params.name];
      for(var i in vm.dataList){
        if(vm.dataList[i].name==params.name){
          vm.dataList[i].checked=params.selected[params.name];
          break;
        }
      }
      $scope.$apply();//需要手动刷新
      //console.log(vm.dataList);
    }
    vm.loadPieChart = function(year){
      vm.lastYear = year + '年';
      vm.pieConfig={
        theme: 'Donut',
        dataLoaded: false
      };
      vm.pieOption={
        color:['#394aa9','#cb64bb','#6c6fef','#3295cf','#6cb964','#e28750','#a76cef','#2863db','#00c2a9'],
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c}亿元({d}%)',
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
        legend: {
          orient: 'vertical',
          left: 'right',
          //right:'30',
          data:pieLegendData,
          selected: pieLegendSelected
        },
        series: [{
          name:'总数',
          type: 'pie',
          radius : '55%',
          center: ['40%', '50%'],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            normal: {
              label:{
                show: true,
                //	                            position:'inside',
                formatter: '{b}'
              }
            },
            labelLine :{show:true}
          },
          data:pieDataMap[year]
        }]
      };
      //vm.pieConfig.event = [{legendselectchanged:onLegendSelectChanged}];
      vm.pieConfig.dataLoaded = true;
    }

    //上右-柱状图
    vm.loadBarChart = function(){
      vm.ecConfig = {
        theme: 'Donut',
        dataLoaded: false
      };
      vm.ecOption = {
        color: ['#137ebd', '#ff9f17'],
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
            show:false
          },
          splitLine:{
            show:false
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
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          },
          axisTick: {
            show:false
          },
          axisLine: {
            show: false
          }
        },{
          name: '增长率%',
          type: 'value',
          axisLabel: {
            formatter: '{value}'
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
        series: chartSeries
      };
      chartSeries.push({name: 'GDP总量', type: 'bar',  yAxisIndex:0,data: [],
            barMaxWidth:20,
            itemStyle: {
              normal: {
                color: '#137ebd'
              }
            }
      });
      chartSeries.push({name: 'GDP增长率', type: 'line',  yAxisIndex:1,data: [],
            barMaxWidth:20,
            itemStyle: {
              normal: {
                color: '#ff9f17'
              }
            }
      });
    }

    vm.initData = function($http, devUrl) {
      var industryList = [7,0,14,5,4,16,2];
      //查询行业分类
      var url=devUrl + 'common/qryIndustryList';
      CommService.getHttpJsonItem("ztjjfx-hyfx-1",url,function(response){
        for(var i in response.data){
          for (var j in industryList) {
            if(response.data[i].INDUSTRY_CATEGORY_NO == industryList[j]){
              pieLegendData.push(response.data[i].INDUSTRY_CATEGORY_NAME);
              pieLegendSelected[response.data[i].INDUSTRY_CATEGORY_NAME]=true;
              vm.dataList.push({id:response.data[i].INDUSTRY_CATEGORY_NO,name:response.data[i].INDUSTRY_CATEGORY_NAME,JJZL:[],ZZL:[],checked:true})
            }
          }
         }
        vm.queryData($http, devUrl);
      });
    }

    /**
     * 选择行业
     * @param index
     */
    vm.switchBarChart = function(index){
      chartSeries[0].data = vm.dataList[index].JJZL;
      chartSeries[1].data = vm.dataList[index].ZZL;
      // vm.ecOption.yAxis[0].max=Math.max.apply(null, vm.dataList[index].JJZL);
      // vm.ecOption.yAxis[1].max=Math.max.apply(null, vm.dataList[index].ZZL);
    }

    vm.queryData = function($http, devUrl){
      var year_num=5;
      var endDate=latestYear-1;
      var beginDate=endDate-year_num;
      var queryUrl=devUrl + 'leader/economy/qryEconomyForTrade/1/1/'+beginDate+'_'+endDate;
      CommService.getHttpJsonItem("ztjjfx-hyfx-2-"+beginDate+'_'+endDate,queryUrl,function(response){
        var result = response.data;
        var year = '';
        var order = [];//排序
        for (var i in result) {
          if (result[i].DATE_PERIOD != year) {
            year = result[i].DATE_PERIOD;
            vm.years.push(year);
            chartCategories.push(year);
          }
          for(var j in vm.dataList){
            if(vm.dataList[j].id==result[i].INDUSTRY_CATEGORY_NO){
              vm.dataList[j].JJZL.push(result[i].JJZL);
              vm.dataList[j].ZZL.push(result[i].ZZL);
            }
          }
          order.push(result[i].JJZL);
        }
        order.sort(function (x, y) {
            if (x < y) {
                return 1;
            }
            if (x > y) {
                return -1;
            }
            return 0;
        });
        //组装饼图数据
        for(var i in vm.years){
          pieDataMap[vm.years[i]]=[];
        }
        for(var j = 0;j < result.length;j++){
          for(var i in result){
            if(result[i].JJZL == order[j]){
              pieDataMap[result[i].DATE_PERIOD].push({name:result[i].INDUSTRY_CATEGORY_NAME,value:result[i].JJZL});
            }
          }
        }
        vm.loadPieChart(vm.curYear);
        vm.switchBarChart(0);
        vm.ecConfig.dataLoaded = true;
      });
    };

    vm.loadBarChart();
    vm.initData($http, devUrl);

    /**
     * 复选框（指标）单击绑定方法
     * @param item
     */
    vm.legendCheckboxClick = function (item) {
      if(item.checked){
        item.checked = false;
      }else{
        item.checked = true;
      }
      pieLegendSelected[item.name] = item.checked;
    };
    /**
     * 单选框（年份）单击绑定方法
     * @param year年份
     */
    vm.yearRadioClick = function (year) {
      vm.curYear=year;
      vm.loadPieChart(year);
    };
  }
})();


