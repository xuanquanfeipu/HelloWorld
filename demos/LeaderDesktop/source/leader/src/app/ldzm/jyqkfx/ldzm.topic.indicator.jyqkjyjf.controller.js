/**
 * 领导桌面-教育情况-教育经费
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('LdzmTopicIndJyqkjyjfController', LdzmTopicIndJyqkjyjfController);

  /** @ngInject */
  function LdzmTopicIndJyqkjyjfController($http, devUrl,$scope,SweetAlert,CommService,latestYear) {
    var vm = this;
    var myDate = new Date();
    var curYear=latestYear-1;
    vm.yearList = new Array();//年份
    vm.dataList = new Array();//数据
    vm.eduTypeList = new Array();//教育程度
    var xlengend  = new Array();//图一相关数据指标
    var ylengend  = new Array();
    var _ylengend  = new Array();
    var xyData  = new Array();
    var legendSelected={};
    vm.legendCheckboxClick= function (type,item) {
      if(item.checked){
        item.checked = false;
      }else{
        item.checked = true;
      }
      vm.putLeftData();
    }
    vm.putLeftData = function () {
      //重置
      xlengend.length = 0;
      ylengend.length = 0;_ylengend.length = 0;
      xyData.length = 0;
      //x轴
      for (var i = 0; i < vm.yearList.length; i++) {
        if (vm.yearList[i].checked) {
          xlengend.push(vm.yearList[i].value);
        }
      }
      //y轴
      for (var i = 0; i < vm.eduTypeList.length; i++) {
        ylengend.push(vm.eduTypeList[i].name);
        _ylengend.push({type:vm.eduTypeList[i].type,name:vm.eduTypeList[i].name,color:vm.eduTypeList[i].color});
        legendSelected[vm.eduTypeList[i].name] = vm.eduTypeList[i].checked;
      }

      //数据
      for(var i=0;i<_ylengend.length;i++){
        var yName = _ylengend[i].name;
        var yType = _ylengend[i].type;
        var color = _ylengend[i].color;
        var innerArray = new Array();
        var innerZZLArray = new Array();
        for(var j=0;j<xlengend.length;j++){
          var xValue = xlengend[j];
          var count = 0;
          for(var k=0;k<vm.dataList.length;k++)
          {
            count = 1;
            if(vm.dataList[k].type == yType && vm.dataList[k].year ==xValue ){
              innerArray.push(vm.dataList[k].num);
            }
          }
          if(count == 0){
            innerArray.push(0);
          }
        }
         xyData.push({name:yName,type:'bar',barMaxWidth:20,itemStyle:{normal: {color: color}},data:innerArray});
      }
      vm.ecConfig.event = [{legendselectchanged:onLegendSelectChanged}];
      vm.ecConfig.dataLoaded = true;
    }

    for(var i=2011;i<2016;i++)
    {
      vm.yearList.push({value:i,checked:true});
    }
    vm.eduTypeList.push({type:1,name:'国家财政性教育经费',checked:true,color:'#574fbe'});
    vm.eduTypeList.push({type:2,name:'民办学校中举办者投入',checked:true,color:'#0c6bd9'});
    vm.eduTypeList.push({type:3,name:'社会捐赠经费',checked:true,color:'#3ba9bd'});
    vm.eduTypeList.push({type:4,name:'事业收入',checked:false,color:'#cb64bb'});
    vm.eduTypeList.push({type:5,name:'其他教育经费',checked:false,color:'#137ebd'});

    vm.ecConfig = {
      theme: 'Donut',
      dataLoaded: false
    };
    vm.ecOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data:['国家财政性教育经费','民办学校中举办者投入','社会捐赠经费','事业收入','其他教育经费'],
        y : '25',
        x:'center',
        selected: legendSelected
      },
      xAxis: [
        {
          type: 'category',
          data: xlengend,
          axisPointer: {
            type: 'shadow'
          },
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
          type: 'value',
          name: '费用（万元）',
          axisLabel: {
            formatter: '{value}',
            textStyle:{ color: '#7F7F7F' }
          },
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
          }
        }
      ],
      series: xyData
    };
    //查询义务教育情况数据
    vm.queryData= function () {
      var url = devUrl + 'leader/edu/qryjyqkjyjflist/1/'+(curYear - 5)+'_'+curYear+'/2';
      CommService.getHttpJsonItem('qryjyqkjyjflist/1/'+(curYear - 5)+'_'+curYear+'/2',url,function(response){
          var result = response.data;
          for(var i=0;i<result.length;i++){
            vm.dataList.push({type:1,num:result[i].STATE_BUDGETARY,year:result[i].DATE_PERIOD});
            vm.dataList.push({type:2,num:result[i].HOST_INVESTMENT,year:result[i].DATE_PERIOD});
            vm.dataList.push({type:3,num:result[i].SOCIAL_DONATION,year:result[i].DATE_PERIOD});
            vm.dataList.push({type:4,num:result[i].UNDERTAKING_INCOME,year:result[i].DATE_PERIOD});
            vm.dataList.push({type:5,num:result[i].OTHER_FUNDS,year:result[i].DATE_PERIOD});
          }
          vm.putLeftData();
          //加载图
          vm.ecConfig.dataLoaded=true;
      });
    }
    var onLegendSelectChanged=function(params){
      legendSelected[params.name] = params.selected[params.name];
      for(var i in vm.eduTypeList){
        if(vm.eduTypeList[i].name==params.name){
          vm.eduTypeList[i].checked=params.selected[params.name];
          break;
        }
      }
      //需要手动刷新
      $scope.$apply();
    }
    vm.queryData();
  }
})();


