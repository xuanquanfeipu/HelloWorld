/**
 * 领导桌面-医疗卫生-传染病情况分析
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('LdzmTopicIndYlwscrbfxController', LdzmTopicIndYlwscrbfxController);

  /** @ngInject */
  function LdzmTopicIndYlwscrbfxController($http, devUrl,$scope,SweetAlert,CommService,latestYear) {
    var vm = this;
    var time = new Date();
    var endDate=latestYear-1;
    var starDate=endDate-4;

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
    };
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
        //if (vm.eduTypeList[i].checked) {
          ylengend.push(vm.eduTypeList[i].name);
          _ylengend.push({type:vm.eduTypeList[i].type,name:vm.eduTypeList[i].name});
        legendSelected[vm.eduTypeList[i].name] = vm.eduTypeList[i].checked;
        //}
      }

      //数据
      for(var i=0;i<_ylengend.length;i++){
        var yName = _ylengend[i].name;
        var yType = _ylengend[i].type;
        var innerArray = new Array();
        var innerZZLArray = new Array();
        for(var j=0;j<xlengend.length;j++){
          var xValue = xlengend[j];
          var count = 0;
          for(var k=0;k<vm.dataList.length;k++)
          {
            count = 1;
            if(vm.dataList[k].type == yType && vm.dataList[k].year ==xValue ){
              // if(yType ==1 || yType ==3 ){
              //    innerArray.push(vm.dataList[k].num);
              // }
              // else{
              //    innerArray.push((vm.dataList[k].num)*100);
              // }
              innerArray.push(vm.dataList[k].num);
            }
          }
          if(count == 0){
            innerArray.push(0);
          }
        }
        if(yType ==1 || yType ==3 ){
          xyData.push({name:yName,type:'bar',barMaxWidth:20,data:innerArray});
        }
        else{
          xyData.push({name:yName,type:'line',yAxisIndex: 1,data:innerArray});
        }

      }
      vm.ecConfig.event = [{legendselectchanged:onLegendSelectChanged}];
      vm.ecConfig.dataLoaded = true;
    };


    for(var i=2015;i>2010;i--)
    {
         vm.yearList.push({value:i,checked:true});
    }

    vm.eduTypeList.push({type:1,name:'发病人数',checked:true});
    vm.eduTypeList.push({type:2,name:'发病率',checked:true});
    vm.eduTypeList.push({type:3,name:'死亡人数',checked:true});
    vm.eduTypeList.push({type:4,name:'死亡率',checked:true});

    vm.ecConfig = {
      theme: 'Donut',
      dataLoaded: false
    };
    vm.ecOption = {
      color:['#3a4aa9','green','#cb65bb','#fea412'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data:['发病人数','发病率','死亡人数','死亡率'],
        left: 'center',
        top:'5%',
        selected: legendSelected
      },
      grid:{
        left:'5%',
        right:'6%'
      },
      xAxis: [
        {
          type: 'category',
          data: xlengend,
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
          name: '单位:人',
          // min: 0,
          // max: 8000,
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
          name: '发病率及死亡率(1/10万)',
          // min: 0,
          // max: 100,
          // nameGap:'30',
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
      series: xyData
    };

    //
    vm.queryData= function () {
      var url = 'leader/medical/qryylwscrbqklist/1/'+starDate+'_'+endDate;
      CommService.getHttpJsonItem(url, devUrl + url, function (response) {
        var result = response.data;
        for(var i=0;i<result.length;i++){
          vm.dataList.push({type:1,num:result[i].DISEASE_HOLL,year:result[i].DATE_PERIOD});
          vm.dataList.push({type:2,num:(result[i].DISEASE_RATE).toFixed(2),year:result[i].DATE_PERIOD});
          vm.dataList.push({type:3,num:result[i].DISEASE_DEATH_HOLL,year:result[i].DATE_PERIOD});
          vm.dataList.push({type:4,num:(result[i].DISEASE_DEATH_RATE).toFixed(2),year:result[i].DATE_PERIOD});
        }
        // console.log(vm.dataList)
        vm.putLeftData();
      });
    };
    vm.queryData();

    var onLegendSelectChanged=function(params){
      legendSelected[params.name] = params.selected[params.name];
      for(var i in vm.eduTypeList){
        if(vm.eduTypeList[i].name==params.name){
          vm.eduTypeList[i].checked=params.selected[params.name];
          break;
        }
      }
      $scope.$apply();//需要手动刷新
    };

  }
})();


