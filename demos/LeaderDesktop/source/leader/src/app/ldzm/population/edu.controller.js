/**
 * 领导桌面-人口综合分析-人口文化分析
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('PopulationEduController', PopulationEduController);

  /** @ngInject */
  function PopulationEduController($scope, $http, devUrl, sessionCacheTTL,CommService,latestYear) {
    var vm = this;
    var myDate = new Date();
    //var latestYear=myDate.getFullYear()-2;
    vm.latestYear = latestYear-1;

    vm.years = [5,6];
    vm.curYear=vm.years[1];
    vm.dataList=[];

    var chartCategories = [];
    var chartSeries = [];
    vm.list = [];

    var schoolNames = [ '初中', '小学', '高中','大学'];
    vm.dataList = [
      {name:'初中',id:1,eduData:[],checked:true},
      {name:'小学',id:2,eduData:[],checked:true},
      {name:'高中',id:3,eduData:[],checked:true},
      {name:'大学',id:4,eduData:[],checked:true}];

    //上左-饼图
    var pieLegendData=[];
    var pieDataMap={};
    var pieLegendSelected={};
    vm.queryData = function($http, devUrl,index){
      vm.eduDatas5=[];
      vm.eduDatas6=[];
      var queryUrl = 'leader/population/populationEduBg';
      CommService.getHttpJsonItem(queryUrl, devUrl + queryUrl, function (response) {
        var result = response.data;

        for(var i in result){
          if(result[i].EDU_BG_NO == index){
            vm.pieOption.series[0].data[3].value=result[i].UNIVERSITY_NUM;
            vm.pieOption.series[0].data[2].value=result[i].SENIOR_NUM;
            vm.pieOption.series[0].data[0].value=result[i].MIDDLE_NUM;
            vm.pieOption.series[0].data[1].value=result[i].PRIMARY_NUM;
          }
        }
        vm.eduDatas=[];
        for(var i in result){
          if(result[i].EDU_BG_NO==5){
            vm.eduDatas5=result[i];
          }else if(result[i].EDU_BG_NO==6){
            vm.eduDatas6=result[i];
          }
        }

      });

    };
    vm.loadPieChart = function(year){
      vm.pieConfig={
        dataLoaded: false
      };
      vm.pieOption={
        color:['#394aa9','#cb64bb','#6c6fef','#3295cf'],
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            return params.name + "<br/>" + (params.value/10000).toFixed(2) + '万人';
          },
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          orient: 'vertical',
          right: 30,
          top: 'center',
          itemWidth: 14,
          itemHeight: 14,
          data:pieLegendData,
          selected: pieLegendSelected
        },
        series: [{
          name:'总数',
          type: 'pie',
          radius : '75%',
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
                formatter: '{b} : {d}%'
              }
            },
            labelLine :{show:true}
          },
          data:[
            {name:'初中'},
            {name:'小学'},
            {name:'高中'},
            {name:'大学'}
          ]
        }]
      };
      vm.pieConfig.event = [{legendselectchanged:onLegendSelectChanged}];
      vm.queryData($http, devUrl,year);
      vm.pieConfig.dataLoaded=true;
    };

    vm.loadPieChart(vm.curYear);

    //上右-柱状图
    vm.loadBarChart = function(index){
      chartSeries = [];
      vm.ecConfig = {
        dataLoaded: false
      };
      vm.ecOption = {
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            return (params.value/10000).toFixed(2) + '万人';
          },
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        color: ['#137ebd'],
        grid: {
          left: '3%',
          right: '3%',
          bottom: '10',
          containLabel: true
        },
        xAxis: [{
          type : 'category',
          data: ['第5次人口普查','第6次人口普查'],
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
          name: '数量: 万人',
          // min: 0,
          // max: 3000000,
          axisLabel: {
            formatter: function(value, index) {
              return value/10000;
            },
            textStyle:{ color: '#7F7F7F' }
          },
          nameTextStyle:{
            color: '#7F7F7F'
          },
          type : 'value',
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
        series: {
          name: '人数',
          type: 'bar',
          yAxisIndex:0,
          data: chartSeries,
          barMaxWidth:20,
          itemStyle: {
            normal: {
              color: '#137ebd'
            }
          }}
      };
      var queryUrl = 'leader/population/populationEduBg';
      CommService.getHttpJsonItem(queryUrl, devUrl + queryUrl, function (response) {
        for(var i in response.data){
          if(index == 1){
            chartSeries.push(response.data[i].MIDDLE_NUM);
          }else if(index == 2){
            chartSeries.push(response.data[i].PRIMARY_NUM);
          }else if(index == 3){
            chartSeries.push(response.data[i].SENIOR_NUM);
          }else if(index == 4){
            chartSeries.push(response.data[i].UNIVERSITY_NUM);
          }
        }
        vm.ecConfig.dataLoaded = true;

      })

    };

    vm.initData = function($http, devUrl) {

          for(var i in schoolNames){
            pieLegendData.push(schoolNames[i]);
            pieLegendSelected[schoolNames[i]]=true;
            //vm.dataList.push({id:parseInt(i) + 1, name:schoolNames[i], STU_NUM:[], checked:true});
          }

          vm.queryData($http, devUrl,6);

    };

    vm.tabFn=function () {
      //var eduData=[];

      var queryUrl = 'leader/population/populationEduBg';
      CommService.getHttpJsonItem(queryUrl, devUrl + queryUrl, function (response) {
        for(var i in response.data){
          for(var j in vm.dataList){
            if(vm.dataList[j].id==1) {
              vm.dataList[j].eduData.push(response.data[i].MIDDLE_NUM);
            }else if(vm.dataList[j].id==2){
              vm.dataList[j].eduData.push(response.data[i].PRIMARY_NUM);
            }else if(vm.dataList[j].id==3){
              vm.dataList[j].eduData.push(response.data[i].SENIOR_NUM)
            }else if(vm.dataList[j].id==4){
              vm.dataList[j].eduData.push(response.data[i].UNIVERSITY_NUM)
            }
          }
        }
        console.log(vm.dataList)
      })

    };
    vm.tabFn();

    /**
     * 选择文化程度
     * @param index
     */
    vm.switchBarChart =function(index){
      vm.loadBarChart(index)
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

    var onLegendSelectChanged=function(params){
      pieLegendSelected[params.name] = params.selected[params.name];
      for(var i in vm.dataList){
        if(vm.dataList[i].name==params.name){
          vm.dataList[i].checked=params.selected[params.name];
          break;
        }
      }
      $scope.$apply();//需要手动刷新
    };

    vm.loadBarChart(1);
    vm.initData($http, devUrl);

  }
})();


