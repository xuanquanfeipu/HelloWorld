/**
 * 领导桌面-就业分析-产业分析
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('LdzmTopicIndJyfxcyfx1Controller', LdzmTopicIndJyfxcyfx1Controller);

  /** @ngInject */
  function LdzmTopicIndJyfxcyfx1Controller($http, devUrl,$scope,SweetAlert,latestYear) {
    var vm = this;
    vm.yearList = new Array();//年份
    vm.dataList = new Array();//数据
    vm.eduTypeList = new Array();//教育程度
    var xlengend  = new Array();//图一相关数据指标
    var ylengend  = new Array();
    var _ylengend  = new Array();
    var xyData  = new Array();
    var legendSelected={};
	var year_num=4;
    var myDate = new Date();
    var year = latestYear-1;
    var endDate=latestYear-1;
    var beginDate=endDate-year_num+1;vm.cyear=endDate;

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
        //if (vm.eduTypeList[i].checked) {
          ylengend.push(vm.eduTypeList[i].name);
          _ylengend.push({type:vm.eduTypeList[i].type,name:vm.eduTypeList[i].name});
        legendSelected[vm.eduTypeList[i].name] = vm.eduTypeList[i].checked;
       // }
      }

      var color = new Array();
      color.push('#52bfa0');
      color.push('#CB65BB');
      color.push('#574FBE');
      color.push('#FF9800');
      color.push('#6c6fef');
      color.push('#2495ee');
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
            if(vm.dataList[k].type == yType && vm.dataList[k].year ==xValue ){
                count = 1;
                innerArray.push(vm.dataList[k].num);
            }
          }
          if(count == 0){
            innerArray.push(0);
          }
        }
        if(yType <4){
          xyData.push({name:yName,type:'bar',barMaxWidth:20,itemStyle: {normal: {color: color[i]}},data:innerArray});
        }
        else{
          xyData.push({name:yName,type:'line',yAxisIndex: 1,itemStyle: {normal: {color: color[i]}},data:innerArray});
        }
      }
      vm.ecConfig.event = [{legendselectchanged:onLegendSelectChanged}];
      vm.ecConfig.dataLoaded = true;
    }


    for(var i=beginDate;i<=endDate;i++)
    {
         vm.yearList.push({value:i,checked:true});
    }

    vm.eduTypeList.push({type:1,name:'第一产业人员',checked:true});
    vm.eduTypeList.push({type:2,name:'第二产业人员',checked:true});
    vm.eduTypeList.push({type:3,name:'第三产业人员',checked:true});
    vm.eduTypeList.push({type:11,name:'第一产业增长率',checked:false});
    vm.eduTypeList.push({type:22,name:'第二产业增长率',checked:false});
    vm.eduTypeList.push({type:33,name:'第三产业增长率',checked:false});


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
        data:['第一产业人员','第二产业人员','第三产业人员','第一产业增长率','第二产业增长率','第三产业增长率'],
        y : '25',
        x : 'center',
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
              color:'#7F7F7F'
            }
          },
          axisLabel: {textStyle:{ color: '#7F7F7F' }}
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '单位：万人',
          min: 0,
          max: 2000,
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
            show:true
          }
        },
        {
          type: 'value',
          name: '增长率(%)',
          min:-3,
          max:3,
		  interval: 1.5,
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
            show: true
          }
        }
      ],
      series: xyData
    };

    //查询年份数据
    vm.queryData= function () {
      var url = devUrl + 'leader/employment/employmentanalysis/1/'+beginDate+'_'+endDate+'/4?parentDistrictNo=0';
      $http.get(url)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          var result = response.data;
          for(var i=0;i<result.length;i++){
            if(result[i].CYFL  == 1){//alert(result[i].JYRS_ZZL);
              vm.dataList.push({type:1,num:result[i].JYRS,year:result[i].DATE_PERIOD});
              vm.dataList.push({type:11,num:result[i].JYRS_ZZL,year:result[i].DATE_PERIOD});
            }
            else if(result[i].CYFL  == 2){
              vm.dataList.push({type:2,num:result[i].JYRS,year:result[i].DATE_PERIOD});
              vm.dataList.push({type:22,num:result[i].JYRS_ZZL,year:result[i].DATE_PERIOD});
            }
            else if(result[i].CYFL  == 3){
              vm.dataList.push({type:3,num:result[i].JYRS,year:result[i].DATE_PERIOD});
              vm.dataList.push({type:33,num:result[i].JYRS_ZZL,year:result[i].DATE_PERIOD});
            }
          }
          sessionStorage.setItem("jyfxcyfxDataList", JSON.stringify(vm.dataList));
          vm.putLeftData();
          vm.ecConfig.dataLoaded=true;
        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
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
      $scope.$apply();//需要手动刷新
    }

    if(sessionStorage.getItem("jyfxcyfxDataList") == null)
    {
      vm.queryData();
    }
    else{
      vm.dataList.length = 0;
      vm.dataList =  JSON.parse(sessionStorage.getItem("jyfxcyfxDataList"));
      vm.putLeftData();
      vm.ecConfig.dataLoaded=true;
    }

  }
})();


