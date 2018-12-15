/**
 * Created by 00137822
 */

(function() {
  'use strict';

  angular
    .module('smartCore')
    .directive('scBasebarchart', scBasebarchart);

  /** @ngInject */
  function scBasebarchart($http, SweetAlert, devUrl) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/baseComponent/baseBarChart.html',
      scope: {
        'height':'=',//必填
        'color':'=',
        'xdata':'=',//必填
        'yname':'=',//必填
        'series':'=',//必填
        'onLoad':'=',//必填
        'datazoom':'=',
        'onClick':'=',
        'boundarygap':'=',
        'legendleft':'=',
        'gridtop':'=',
        'autoshadow':'=',//自动生成柱状图阴影，默认为true，但不支持使用了stack的柱状图
        'model':'=',
        'toolbox':'=',
        'ctitle':'='
      },
      controller: BasebarchartController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function BasebarchartController($scope) {
      var vm = this;
      var chartColor=[];
      var chartYAxis=[];
      var legendData=[];
      var barColor=[ '#574fbe','#0c6bd9','#137ebd','#cb64bb','#3ba9bd','#ca8622'];//默认bar颜色
      var lineColor=['#ff9800','#10bd5e','#3ed0c4','#1c91eb','#5d68ff','#DE515A'];//默认line颜色
      var legendLeft=vm.legendleft==null?'center':vm.legendleft;
      var boundaryGap=vm.boundarygap==null?true:vm.boundarygap;
      var gridTop=vm.gridtop==null?40:vm.gridtop;
      vm.baseBarChartConfig= {
        theme: 'Donut',
        dataLoaded: false
      };

      for(var j in vm.series){
        legendData.push(vm.series[j].name);
        if(vm.color==null){
          if(vm.series[j].type=='bar'){
            chartColor.push(barColor.shift());
          }
          if(vm.series[j].type=='line'){
            chartColor.push(lineColor.shift());
          }
        }
      }

      for(var i in vm.yname){
        chartYAxis.push({
          name:vm.yname[i],
          nameTextStyle:{
            color:"#666"
          },
          type: 'value',
          splitLine:{
            show:false
          },
          axisTick:{//刻度消失
            show:false
          },
          axisLabel:{
            textStyle:{
              color:"#666"
            }
          },
          axisLine: {
            lineStyle:{
              color:'#e1e1e1'
            }
          }
        })
      };
      for(var i in vm.series){
        if(vm.series[i].type=='line' && !vm.series[i].hasOwnProperty("areaStyle")){
          vm.series[i].symbol='circle';
          vm.series[i].symbolSize=9;
          vm.series[i].itemStyle={
            normal:{
              borderColor:'#fff',
              borderWidth:2
            }
          };
          /*vm.series[i].lineStyle={
            normal:{width:2}
          };*/
        }
      }
      var legendSelected={};
      vm.baseBarChartOption = {
        color:vm.color==null?chartColor:vm.color,
        legend: {
          left:legendLeft,
          width:'70%',
          top:8,
          itemWidth:10,
          itemHeight:10,
          textStyle:{
            fontSize:12
          },
          data:legendData,
          selected: legendSelected
        },
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter:function (params) {
            //console.log(params);
            var curname=params[0].name+'';
            var tip=curname.replace(/[\r\n]/g,"")+'<br />';
            for(var i in params){
              if(!vm.series[params[i].seriesIndex].hasOwnProperty('shadow')||!vm.series[params[i].seriesIndex].shadow){
                tip+='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + params[i].color + '"></span>'+
                  params[i].seriesName+' : '+params[i].data;
                tip+='<br />';
                /*var dw='';
                if(!vm.series[params[i].seriesIndex].hasOwnProperty('yAxisIndex')){
                  dw=vm.yname[0].replace('单位：','');
                }else{
                  dw=vm.yname[vm.series[params[i].seriesIndex].yAxisIndex].replace('单位：','');
                }
                tip+=' '+dw+'<br />';*/
              }
            }
            return tip;
          }
        },
        grid: {
          left: vm.datazoom==null?15:20,
          right: vm.datazoom==null?15:50,
          top:gridTop,
          bottom: vm.datazoom==null?10:50,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap : boundaryGap,
          splitLine:{
            show:false
          },
          axisTick:{//刻度消失
            show:false
          },
          axisLine: {
            lineStyle:{
              color:'#e1e1e1'
            }
          },
          axisLabel:{
            textStyle:{
              color:"#666"
            }
          },
          data:vm.xdata
        },
        yAxis: chartYAxis,
        series: vm.series
      };
      if(vm.datazoom!=null){
        vm.baseBarChartOption.dataZoom=vm.datazoom;
      }
      if(vm.toolbox!=null){
        vm.baseBarChartOption.toolbox=vm.toolbox;
      }
      if(vm.ctitle!=null){
        vm.baseBarChartOption.title=vm.ctitle;
      }
      var onBaseBarChartClick=function (params) {
        vm.onClick(params);
      };
      var onLegendselectchanged=function (params) {
        //console.log(params);
        legendSelected[params.name] = params.selected[params.name];
        legendSelected[params.name+'_shadow']=params.selected[params.name];
        //console.log(legendSelected);
        $scope.$apply();//需要手动刷新
      };
      vm.baseBarChartConfig.event = [{click:onBaseBarChartClick},
        {legendselectchanged:onLegendselectchanged}];
      var callback=function () {
        //console.log(vm.baseBarChartOption);
        legendData.length=0;
        chartColor.length=0;
        barColor=[ '#574fbe','#0c6bd9','#137ebd','#cb64bb','#3ba9bd','#ca8622'];//默认bar颜色
        lineColor=['#ff9800','#10bd5e','#3ed0c4','#1c91eb','#5d68ff','#DE515A'];//默认line颜色
        for(var j in vm.series){
          legendData.push(vm.series[j].name);
          if(vm.color==null){
            if(vm.series[j].type=='bar'){
              chartColor.push(barColor.shift());
            }
            if(vm.series[j].type=='line'){
              chartColor.push(lineColor.shift());
            }
          }
        }
        //自动生成阴影
        if(vm.autoshadow==null || vm.autoshadow){
          var barMax=0;
          var shadowSeries=[];
          var rawData=[];
          var barMaxValue=[];
          for(var i in chartYAxis){
            barMaxValue.push(0);
          }
          for(var i in vm.series) {
            if (vm.series[i].type == 'bar') {
              var yIndex=vm.series[i].hasOwnProperty("yAxisIndex")?vm.series[i].yAxisIndex:0;
              var curMax = Math.max.apply(null, vm.series[i].data);
              if (curMax > barMaxValue[yIndex]) {
                barMaxValue[yIndex] = curMax;
              }
              rawData.push(vm.series[i].data);
              var stack = '_stack_' + i;
              if (vm.series[i].hasOwnProperty("stack")) {
                stack = vm.series[i].stack;
              }else{
                vm.series[i].stack=stack;
              }
              var shadowBar = {
                name:vm.series[i].name+'_shadow',
                type: 'bar',
                stack: stack,
                //silent: true,
                shadow:true,
                itemStyle: {
                  normal: {
                    color: '#F3F3F3'
                  }
                },
                data: []
              };
              if(vm.series[i].hasOwnProperty("barWidth")){
                shadowBar.barWidth=vm.series[i].barWidth
              }
              if(vm.series[i].hasOwnProperty("yAxisIndex")){
                shadowBar.yAxisIndex=vm.series[i].yAxisIndex
              }
              if(vm.series[i].hasOwnProperty("cursor")){
                shadowBar.cursor=vm.series[i].cursor
              }
              shadowSeries.push(shadowBar);
            }
          }
          for(var i in chartYAxis){
            if(barMaxValue[i]!=0){
              chartYAxis[i].max=barMaxValue[i];
            }
          }
          //console.log(barMaxValue);
          for(var i in shadowSeries){
            var yIndex=shadowSeries[i].hasOwnProperty("yAxisIndex")?shadowSeries[i].yAxisIndex:0;
            for(var j=0;j<rawData[i].length;j++){
              shadowSeries[i].data.push(parseFloat(barMaxValue[yIndex])-parseFloat(rawData[i][j]));
            }
            vm.series.push(shadowSeries[i]);
          }
        }
        //console.log(vm.series);
        for(var i in vm.series){
          legendSelected[vm.series[i].name]=true;
        }
        vm.baseBarChartConfig.dataLoaded=true;
      }

      var clearShadow=function () {
        for(var i=0,flag=true,len=vm.series.length;i<len;flag ? i++ : i){
          if(vm.series[i] && vm.series[i].shadow){
            vm.series.splice(i,1);
            flag = false;
          } else {
            flag = true;
          }
        }
      };
      vm.onLoad(callback);
      if(vm.model!=null){
        vm.model.option=vm.baseBarChartOption;
        vm.model.refreshChart=function (onload) {
          vm.baseBarChartConfig.dataLoaded=false;
          clearShadow();
          onload(callback);
          //vm.baseBarChartConfig.dataLoaded=true;
        };
      }
    }

  }

})();
