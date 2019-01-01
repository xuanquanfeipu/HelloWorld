/**
 * 领导桌面-总体经济分析-产业分析
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('ZtjjCyfxController', ZtjjCyfxController);

  /** @ngInject */
  function ZtjjCyfxController($scope, $http, devUrl,SweetAlert, CommService,latestYear) {
    var vm = this;
    vm.title = "领导桌面-总体经济分析-产业分析";
    vm.breadcrumbs = [
      {title: '领导桌面', link: '/#/ldzm', icon: 'home'},
      {title: '总体经济分析', link: '/#/ldzm/content', icon: 'book'},
      {title: '产业分析', link: '/#/ldzm/content/detail', icon: 'file'}
    ];    /**表格中的thead行数据**/
    vm.categories = [];
    /**表格中的tbody行数据**/
    vm.list = [];
    /**柱状图中的x轴数据，会根据勾选情况变化**/
    var chartCategories = [];
    /**柱状图中的序列数据，会根据勾选情况变化**/
    var series = [];
    var yAxis = [];
    var legend=[];
    var legendSelected={};
    //图1
    vm.ecConfig = {
      theme: 'Donut',
      dataLoaded: false
    };
    vm.ecOption = {
      color: ['#52bfa0', '#CB65BB', '#574FBE','#FF9800', '#6c6fef', '#2495ee'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      /*grid: {
        left: '3%',
        right: '5%',
        bottom: '5%',
        top: '10%',
        containLabel: true
      },*/
      xAxis: [{
        data: chartCategories,
        type: 'category',
        axisTick: {
          show:false
        },
        splitLine:{
          show:false
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
          show:false
        },
        axisLine: {
          show: false
        }
      },{
        name: '增长率%',
        type: 'value',
        axisLabel: {
          formatter: '{value}',
          textStyle:{ color: '#7F7F7F' }
        },
        min: -5,
        max: 30,
        interval: 7,
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
        data:legend,
        y:'28',
        selected: legendSelected
      },
      series: series
    };
    //查询产业分类
    vm.genSeries = function(data,title,type,yAxisIndex){
      for(var i in data){
        legend.push(data[i].CYFL_NAME+title);
        //console.log(legend.push(data[i].CYFL_NAME+title));
        legendSelected[data[i].CYFL_NAME+title]=true;
        var statck = type == 'bar'?i:(parseInt(i)+3);
        series.push({name: data[i].CYFL_NAME+title, type: type, stack: statck, yAxisIndex:yAxisIndex,data: [],barMaxWidth:20});
      }
    }
    vm.queryData = function($http, devUrl){
      var year_num=5;
      //var myDate = new Date();
      var endDate=latestYear-1;
      var beginDate=endDate-year_num;
      var queryUrl=devUrl + 'leader/economy/qryEconomyForIndustry/1/1/'+beginDate+'_'+endDate;
      var maxBar=0;
      var maxLine=0;
      var onLegendSelectChanged=function(params){
        //console.log(params.name+','+params.selected[params.name]);
        legendSelected[params.name] = params.selected[params.name];
        for(var i in vm.list){
          if(vm.list[i].name==params.name){
            vm.list[i].checked=params.selected[params.name];
            break;
          }
        }
        $scope.$apply();//需要手动刷新
      }
      CommService.getHttpJsonItem("ztjjfx-cyfx-2-"+beginDate+'_'+endDate,queryUrl,function(response){
        var result = response.data;
        var year = '';
        var listdata = [[], [], [], [], [], []];
        for (var i in result) {
          if (result[i].DATE_PERIOD != year) {
            year = result[i].DATE_PERIOD;
            vm.categories.push({name: year, checked: true});
            chartCategories.push(year);
          }
          series[result[i].CYFL-1].data.push(result[i].JJZL);
          series[result[i].CYFL + 2].data.push(result[i].ZZL);
          listdata[result[i].CYFL - 1].push(result[i].JJZL);
          listdata[result[i].CYFL + 2].push(result[i].ZZL);
          if(result[i].JJZL>maxBar){
            maxBar=result[i].JJZL;
          }
          if(result[i].ZZL>maxLine){
            maxLine=result[i].ZZL;
          }
        }
        // vm.ecOption.yAxis[0].max=maxBar;
        // vm.ecOption.yAxis[1].max=maxLine;
        for(var index in series){
          var ext=series[index].type=='bar'?'亿元':'%';
          vm.list.push({name:series[index].name,ext:ext,data:listdata[index],checked:true});
        }
        vm.ecConfig.event = [{legendselectchanged:onLegendSelectChanged}];
        vm.ecConfig.dataLoaded = true;
      });
    };
    var url=devUrl + 'common/qryCyflList';
    var bgData=[];
    CommService.getHttpJsonItem("ztjjfx-cyfx-1",url,function(response){
      vm.genSeries(response.data,'总额','bar',0);
      vm.genSeries(response.data,'增长率','line',1);
      vm.queryData($http, devUrl);
    });
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
      legendSelected[item.name] = item.checked;
    };
    /**
     * 复选框（x轴）单击绑定方法
     * @param index
     * @param isChecked
     */
    vm.xCheckboxClick = function (item) {
      if(item.checked){
        item.checked = false;
      }else{
        item.checked = true;
      }
      chartCategories.length = 0;
      for (var index in vm.categories) {
        if (vm.categories[index].checked) {
          chartCategories.push(vm.categories[index].name);
        }
      }
      for (var i in vm.list) {
        series[i].data.length = 0;
        for (var j in vm.categories) {
          if (vm.categories[j].checked) {
            //console.log(vm.list[i].data[j]);
            series[i].data.push(vm.list[i].data[j]);
          }
        }
      }
    };
  }
})();


