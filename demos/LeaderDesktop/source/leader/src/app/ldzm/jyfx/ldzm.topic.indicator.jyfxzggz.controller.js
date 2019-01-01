/**
 * Created by zte on 2017/4/19.
 */
(function () {
  'use strict';

  angular.module('smartCore')
    .controller('LdzmTopicIndJyfxzggzController', LdzmTopicIndJyfxzggzController);

  //
  function LdzmTopicIndJyfxzggzController($http, $scope, devUrl, latestYear,CommService) {
    var vm = this;

    var year_num=5;
    var myDate = new Date();
    var endDate=latestYear-1;
    var beginDate=endDate-3;
    var yearData = new Array();        //年份
    var yearData2 = new Array();        //年份
    var totalData = new Array();       //工资总额
    var ze_growthData = new Array();      //总额增长率
    var averageData = new Array();       //平均工资
    var av_growthData = new Array();      //平均工资增长率
vm.cyear=endDate;

    vm.jyfxzggz1=function () {
      var key='leader/employment/employmentanalysis/1/'+beginDate+'_'+endDate+'/3?parentDistrictNo=0';
      //yearData.length=0;
      CommService.getHttpJsonItem(key,devUrl+key,function(response){
        var result = response.data;
        for(var i=0;i<result.length;i++){
          yearData.push(result[i].DATE_PERIOD);
          totalData.push(result[i].GZZE);
          ze_growthData.push(result[i].GZZE_ZZL);
          //console.log(totalData)
        }
        vm.ecConfig.dataLoaded = true;
      });
    }


    //图1 在岗职工工资总额发展情况
    vm.ecConfig = {
      theme: 'Donut',
      dataLoaded: false
    };
    vm.ecOption = {
      color:['#574fbe','#ffca28'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '3%',
        bottom: '5%',
        containLabel: true
      },
      legend: {
        data:['工资总额','增长率'],
        y:'28'
      },
      xAxis: [
        {
          type: 'category',
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
          axisLabel: {textStyle:{ color: '#7F7F7F' }},
          data: yearData
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '单位:亿元',
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
        {
          type: 'value',
          name: '增长率（%）',
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
          splitLine:{
            show:false
          },
          axisLine: {
            show: false
          }
        }
      ],
      series: [
        {
          name:'工资总额',
          type:'bar',
          barMaxWidth:20,
          data:totalData
        },
        {
          name:'增长率',
          type:'line',
          yAxisIndex: 1,
          data:ze_growthData
        }
      ]
    };

    vm.jyfxzggz2=function () {
      var key= 'leader/employment/employmentanalysis/1/'+beginDate+'_'+endDate+'/3?parentDistrictNo=0';
      //yearData.length=0;
      CommService.getHttpJsonItem(key,devUrl+key,function(response){
        var result1 = response.data;
        for(var i=0;i<result1.length;i++){
          yearData2.push(result1[i].DATE_PERIOD);
          averageData.push(result1[i].PJGZ);
          av_growthData.push(result1[i].PJGZ_ZZL);
        }
        vm.ecConfig1.dataLoaded = true;
      });
    }


    //图2 在岗职工平均工资发展情况
    vm.ecConfig1 = {
      theme: 'Donut',
      dataLoaded: false
    };
    vm.ecOption1 = {
      color:['#0c6bd9','#81c400'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data:['平均工资','增长率'],
        y:'28'
      },
      grid: {
        left: '3%',
        right: '3%',
        bottom: '5%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: yearData2,
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
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '单位:元' ,
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
        {
          type: 'value',
          name: '增长率（%）',
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
          splitLine:{
            show:false
          },
          axisLine: {
            show: false
          }
        }
      ],
      series: [
        {
          name:'平均工资',
          type:'bar',
          barMaxWidth:20,
          data:averageData
        },
        {
          name:'增长率',
          type:'line',
          yAxisIndex: 1,
          data:av_growthData
        }
      ]
    };

    vm.jyfxzggz1();
    vm.jyfxzggz2();

  }
})();
