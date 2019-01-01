/**
 * Created by zte on 2017/4/12.
 */
/**
 * 领导桌面-就业情况分析-产业分析
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('LdzmTopicIndJyfxcyfxController', LdzmTopicIndJyfxcyfxController);

  /** @ngInject */
  function LdzmTopicIndJyfxcyfxController($scope, $http, devUrl) {
    var vm = this;

    /**表格中的thead行数据**/
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

    vm.ecConfig = {
      theme: 'Donut',
      dataLoaded: false
    };
    vm.ecOption = {
      color:['#3ad8ab','#cb64bb','#564fbe'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      xAxis: [
        {
          type: 'category',
          data: chartCategories,
          splitLine: {
            show: false
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '（人数）万人',
          axisLabel: {
            formatter: '{value}'
          },
          splitLine: {
            show: false
          }
        },
        {
          type: 'value',
          name: '增长率',
          axisLabel: {
            formatter: '{value} %'
          },
          splitLine: {
            show: false
          }
        }
      ],
      legend: {
        data:legend,
        y:'25',
        selected: legendSelected
      },
      series: series
    };

    //查询产业分类
    var url=devUrl + 'common/qryCyflList';
    $http.get(url)
      .success(function (response) {
        if (angular.isUndefined(response)) {
          SweetAlert.swal("没有查到相关数据");
        }
        //console.log(response.data);
        vm.genSeries(response.data,'总额','bar',0);
        vm.genSeries(response.data,'增长率','line',1);
        vm.queryData($http, devUrl);

      }).error(function () {
      SweetAlert.swal("网络有问题，待会再试");
    });

    vm.genSeries = function(data,title,type,yAxisIndex){
      for(var i in data){
        legend.push(data[i].CYFL_NAME+title);
        legendSelected[data[i].CYFL_NAME+title]=true;
        series.push({name: data[i].CYFL_NAME+title, type: type,  yAxisIndex:yAxisIndex,data: []});
      }
    }

    vm.queryData = function($http, devUrl){
      var year_num=5;
      var myDate = new Date();
      var endDate=myDate.getFullYear()-1;
      var beginDate=myDate.getFullYear()-year_num;beginDate="2011";endDate="2015";
      var queryUrl=devUrl + 'leader/employment/employmentanalysis/1/'+beginDate+'_'+endDate+'/4?parentDistrictNo=0';
      var maxBar;
      var maxLine;
      $http.get(queryUrl)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          var result = response.data;
          var year = '';
          var listdata = [[], [], [], [], [], []];
          for (var i in result) {
            if (result[i].DATE_PERIOD != year) {
              year = result[i].DATE_PERIOD;
              vm.categories.push({name: year, checked: true});
              chartCategories.push(year);
            }
              series[result[i].CYFL - 1].data.push(result[i].JYRS);
              series[result[i].CYFL + 2].data.push(result[i].JYRS_ZZL);
              listdata[result[i].CYFL - 1].push(result[i].JYRS);
              listdata[result[i].CYFL + 2].push(result[i].JYRS_ZZL);
            if(result[i].JYRS>maxBar){
              maxBar=result[i].JYRS;
            }
            if(result[i].JYRS_ZZL>maxLine){
              maxLine=result[i].JYRS_ZZL;
            }
          }
          //console.log(maxBar+","+maxLine);
          vm.ecOption.yAxis[0].max=maxBar;
          vm.ecOption.yAxis[1].max=maxLine;
          for(var index in series){
            var ext=series[index].type=='bar'?'亿元':'%';
            vm.list.push({name:series[index].name,ext:ext,data:listdata[index],checked:true});
          }
          vm.ecConfig.event = [{legendselectchanged:onLegendSelectChanged}];
          vm.ecConfig.dataLoaded = true;

        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });
    };

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
    vm.xCheckboxClick = function (index, isChecked,item) {
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

  }
})();


