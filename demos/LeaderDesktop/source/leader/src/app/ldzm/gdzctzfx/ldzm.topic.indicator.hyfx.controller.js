/**
 * 领导桌面-总体经济分析-行业分析
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('LdzmTopicIndHyfxController', LdzmTopicIndHyfxController);

  /** @ngInject */
  function LdzmTopicIndHyfxController($scope, $http, devUrl,SweetAlert,latestYear,CommService) {
    var vm = this;

    // vm.title = "领导桌面-总体经济分析-行业分析";
    // vm.breadcrumbs = [
    //   {title: '领导桌面', link: '/#/ldzm', icon: 'home'},
    //   {title: '总体经济分析', link: '/#/ldzm/content', icon: 'book'},
    //   {title: '行业分析', link: '/#/ldzm/content/detail', icon: 'file'}
    // ];
    vm.dataComeFrom = "湖南省统计局";
    var myDate = new Date();
    //vm.curYear=myDate.getFullYear()-1;
    vm.curYear=latestYear-1;//只能写死 不要问为什么
    vm.years = [];//年份
    for(var i=vm.curYear-4;i<=vm.curYear;i++){
      vm.years.push(i);

    }
    vm.dataList=[];//行业

    var chartCategories = [];
    var chartSeries = [];
    vm.list = [];

    //上左-固定资产投资行业占比饼图
    var pieLegendData=[];
    var pieDataMap={};
    var pieLegendSelected={};
    vm.loadPieChart = function(year){
      vm.pieConfig={
        theme: 'Donut',
        dataLoaded: false
      };
      vm.pieOption={
        color:['#394aa9','#cb64bb','#6c6fef','#3295cf','#6cb964','#e28750','#a76cef','#2863db','#00c2a9','#c0e347','#b13df3','#48b143'], //饼图颜色
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c} 亿元',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          //orient: 'vertical',
          orient: 'horizontal',
          left: 'right',
          data:pieLegendData,
          selected: pieLegendSelected
        },
        series: [{
          name:'总数',
          type: 'pie',
          radius : '50%',
          center: ['58%', '52%'],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            normal: {
              label:{
                show: true,
                //                              position:'inside',
                formatter: '{b} : {c} ({d}%)'
              }
            },
            labelLine :{show:true}
          },
          data:pieDataMap[year]
        }]
      };
      vm.pieConfig.event = [{legendselectchanged:onLegendSelectChanged}];
      vm.pieConfig.dataLoaded = true;
    }

    //上右-固定资产投资行业发展情况柱状图
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
          left: '5%',
          right: '5%',
          bottom: '10',
          containLabel: true
        },
        xAxis: [{
          data: chartCategories,
          axisTick : {  //去掉Y轴小点
            inside: false,
            length: 5,
            lineStyle: {
            color: '#ffffff',
            shadowColor: '#ffffff'
            // shadowOffsetY: -5
              }
          },
          axisLine: {
            show: true,  //隐藏Y轴
            lineStyle:{
            color:"#8996a3"   //Y轴颜色不起效果
            }
          },
        }],
        yAxis: [{
          name: '单位:亿元',
          type: 'value',
          min: 0,
          max: 10000,
          axisTick : {  //去掉Y轴小点
            inside: false,
            length: 5,
            lineStyle: {
            color: '#ffffff',
            shadowColor: '#ffffff'
            // shadowOffsetY: -5
              }
          },
          splitLine: {
            show: true
          },
          axisLine: {
            show: false,  //隐藏Y轴
            lineStyle:{
            color:"#8996a3"   //Y轴颜色不起效果
            }
          },
          axisLabel: {
            formatter: '{value}',
            textStyle:{ color: '#7F7F7F' }
          }
        },{
          name: '增长率(%)',
          type: 'value',
          min: -20,
          max:80,
          axisTick: {
            show:false
          },
          splitLine:{
            show:false
          },
          axisLine: {
            show: false,  //隐藏Y轴
            lineStyle:{
            color:"#8996a3"   //Y轴颜色不起效果
            }
          },
          axisLabel: {
            formatter: '{value}',
            textStyle:{ color: '#8996a3' }
          }
        }],
        legend: {
          selected: {},
          x:'center',
          y:'28',
          data:['总量','增长率']
        },
        series: chartSeries
      };
      chartSeries.push({name: '总量', type: 'bar',  yAxisIndex:0,barMaxWidth:20,data: [],
        itemStyle: {
          normal: {
            color: '#137ebd'
          }
        }});
      chartSeries.push({name: '增长率', type: 'line',  yAxisIndex:1,data: [],
        itemStyle: {
          normal: {
            color: '#ff9f17'
          }
        }});
    }

    vm.initData = function($http, devUrl) {
      //查询行业分类
      var key= 'common/qryIndustryList';
      CommService.getHttpJsonItem(key,devUrl+key,function(response){
        var result1=response.data;
        vm.dataList.length=0;
        for(var i=0;i<result1.length;i++){
          if(result1[i].INDUSTRY_CATEGORY_NO > 0 && result1[i].INDUSTRY_CATEGORY_NO < 13){
            pieLegendData.push(result1[i].INDUSTRY_CATEGORY_NAME);
            pieLegendSelected[result1[i].INDUSTRY_CATEGORY_NAME]=true;
            vm.dataList.push({id:result1[i].INDUSTRY_CATEGORY_NO,name:result1[i].INDUSTRY_CATEGORY_NAME,TZZL:[],ZZL:[],checked:true})
          }

        }
        console.log(vm.dataList);
        vm.queryData($http, devUrl);
      });
    }

    /**
     * 选择行业
     * @param index
     */
    vm.switchBarChart = function(index){
      var tmp_tzzl = new Array();
      var tmp_zzl = new Array();
      for(var i=0;i<vm.dataList[index].TZZL.length;i++){
        if(i<5){
          tmp_tzzl.push(vm.dataList[index].TZZL[i]);
          tmp_zzl.push(vm.dataList[index].ZZL[i]);
        }
      }
      chartSeries[0].data = tmp_tzzl;
      chartSeries[1].data = tmp_zzl;
      //原来的代码 sochuo
      //chartSeries[0].data = vm.dataList[index].TZZL;
      //chartSeries[1].data = vm.dataList[index].ZZL;
      // vm.ecOption.yAxis[0].max=Math.max.apply(null, vm.dataList[index].TZZL);
      // vm.ecOption.yAxis[1].max=Math.max.apply(null, vm.dataList[index].ZZL);
    }

    vm.queryData = function($http, devUrl){
      var year_num=5;
      var endDate=latestYear-1;
      var beginDate=endDate-year_num;
      var key= '/leader/investment/qryInvestmentForTrade/1/1/'+beginDate+'_'+endDate;
      //var queryUrl=devUrl + '/leader/investment/qryInvestmentForTrade/1/1/2011_2015';
      CommService.getHttpJsonItem(key,devUrl+key,function(response){
        var result = response.data;
        var year = '';
        for (var i=0;i<result.length;i++) {
          if (result[i].DATE_PERIOD != year) {
            year = result[i].DATE_PERIOD;
            //vm.years.push(year);
            chartCategories.push(year);
          }
          for(var j in vm.dataList){
            if(vm.dataList[j].id==result[i].INDUSTRY_CATEGORY_NO){
              vm.dataList[j].TZZL.push(result[i].TZZL);
              vm.dataList[j].ZZL.push(result[i].ZZL);
            }
          }
        }

        //组装饼图数据
        for(var i in vm.years){
          pieDataMap[vm.years[i]]=[];
        }
        for(var i in result){
          pieDataMap[result[i].DATE_PERIOD].push({name:result[i].INDUSTRY_CATEGORY_NAME,value:result[i].TZZL});
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



  }
})();

