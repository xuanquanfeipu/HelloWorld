/**
 * 领导桌面-财政收入分析
 */
(function () {
  'use strict';

  $(".content-wrapper .container").removeClass("container").addClass("container-fluid");

  var isDebug = true;

  function log(msg) {
    if (console && console.log && isDebug) {
      console.log(msg);
    }
  }

  angular
    .module('smartCore')
    .controller('LdzmTopicIndCzsrfxSzdyfxController', LdzmTopicIndCzsrfxSzdyfxController);

  /** @ngInject */
  function LdzmTopicIndCzsrfxSzdyfxController($scope,$http, devUrl, CommService,latestYear) {
    var vm = this;
      vm.curAreaName="湖南省";
      var areaMap={};
      vm.mapData = [];
      var myDate = new Date();
      var curYear=latestYear-1;
      vm.lastYear = curYear + '年';
      vm.mapDataFunction = function(){
        vm.ecConfig1 = {
          theme: 'Donut',
          dataLoaded: false
        };
        vm.ecOption1 = {
           tooltip: {
              trigger: 'item',
              formatter: '{b}财政收入<br/>{c} 亿元',
              axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
           },
           visualMap: {
              min: 0,
              left: 'center',
              bottom: 30,
              orient: 'horizontal',
              itemWidth: 15,
              itemHeight: 160,
              text: ['高','低'], // 文本，默认为数值文本
              calculable: true,
              inRange: {
                color: ['#f1f3ff','#2e40a4']
              }
            },
            series: [{
              type: 'map',
              map: 'hunan',
              roam: false,
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  borderWidth: 1,
                  borderColor: '#CFCFCF'
                }
              },
              // top: 20,
              selectedMode: 'single',
              data: vm.mapData
            }]
        }
        var url=devUrl + 'leader/govfinance/querySrdyfx/-1';
        var newTime = new Date();
        CommService.getHttpJsonItem("querySrdyfx/-1"+newTime,url,function(response){
          var result = response.data;
          for (var i in response.data) {
            vm.mapData.push({seriesId:result[i].DISTRICT_NO,name:result[i].DISTRICT_NAME,value:(result[i].SYSRZE/10000).toFixed(2)});
            areaMap[result[i].DISTRICT_NAME]=result[i].DISTRICT_NO;
          }
          console.log(vm.mapData)
          vm.ecConfig1.dataLoaded = true;
          vm.ecConfig1.event = [{mapselectchanged:onMapSelectChanged}];
        });
      }
      var onMapSelectChanged = function (params) {
        params=params.batch[0];
        var district_no = 1;
          if(params.selected[params.name]){
            vm.curAreaName = params.name;
            district_no=areaMap[vm.curAreaName];
          }else{
            vm.curAreaName="湖南省";
          }
          vm.barDataFunction($http,devUrl,district_no);
          $scope.$apply();//需要手动刷新
      }
      vm.barDataFunction = function($http,devUrl,district_no){
          var srData =[];
          var zcData =[];
          var timeData = [];
          vm.ecConfig2 = {
            theme: 'Donut',
            dataLoaded: false
          }
          vm.ecOption2 = {
           tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            legend: {
              data:["财政收入", "财政支出"],
              y:'25'
            },
            grid: {
              top: 55,
              left: 35,
              right: 35,
              bottom: 20,
              containLabel: true
            },
            xAxis : [
              {
                type : 'category',
                data : timeData,
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
            yAxis : [
              {
                type: 'value',
                name: '　　单位：亿元',
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
            series : [
              {
                name:'财政收入',
                type:'bar',
                barMaxWidth:20,
                data:srData,
                itemStyle: {
                  normal: {
                    color: '#574fbe'
                  }
                }
              },
              {
                name:'财政支出',
                type:'bar',
                barMaxWidth:20,
                data:zcData,
                itemStyle: {
                  normal: {
                    color: '#0c6bd9'
                  }
                }
              }
            ]
          }
          var url=devUrl + 'leader/govfinance/querySrdyfx/'+district_no;
          CommService.getHttpJsonItem("querySrdyfx/"+district_no,url,function(response){
            var result = response.data;
            console.log(result)
            for (var i in response.data) {
              timeData.push(result[i].DATE_PERIOD);
              srData.push((result[i].SYSRZE/10000).toFixed(2));
              zcData.push((result[i].ZCZE/10000).toFixed(2));
            }
            vm.ecConfig2.dataLoaded = true;
          });
      }
      vm.mapDataFunction();
      vm.barDataFunction($http,devUrl,1);
  }
})();


