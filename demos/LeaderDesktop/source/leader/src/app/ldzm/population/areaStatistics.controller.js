/**
 * 领导桌面-人口综合分析-地域人口分析
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('AreaStatisticsController', AreaStatisticsController);

  /** @ngInject */
  function AreaStatisticsController($scope, $http, devUrl, SweetAlert, sessionCacheTTL,CommService,latestYear) {
    var vm = this;
    var myDate = new Date();
    //var latestYear=myDate.getFullYear()-3;
    vm.latestYear = latestYear-1;

    $scope.cityName = '湖南省';
    var defaultCityNo = 1; //默认湖南省
    var selectedDistrictNo = defaultCityNo;

    //市州常规统计数据Map
    var districtGeneralStatMap = {};
    var districtPopulationArr = [];  //专用于地图展示人口数的数组

    var targetYear = latestYear-1;  //将去年作为获取统计数据的查询时间

    //湖南省市州地图坐标数据
    var districtCoordinateMap = [
      {name: '长沙市', value: [113, 28.27]},
      {name: '湘潭市', value: [112.3, 27.76]},
      {name: '株洲市', value: [113.19, 27.06]},
      {name: '张家界市', value: [110.2, 29.4]},
      {name: '常德市', value: [111.39, 29.2]},
      {name: '益阳市', value: [111.35, 28.43]},
      {name: '岳阳市', value: [113.09, 29]},
      {name: '湘西州', value: [109.45, 28.855]},
      {name: '怀化市', value: [109.8, 27.65]},
      {name: '娄底市', value: [111.1, 27.82]},
      {name: '邵阳市', value: [110.5, 27]},
      {name: '衡阳市', value: [112.25, 26.8]},
      {name: '永州市', value: [111.48, 26.02]},
      {name: '郴州市', value: [112.9, 25.79]}
    ];


    var onMapSelectChanged=function(params) {
      // console.log(params);
      params=params.batch[0];
      if (districtGeneralStatMap[params.name] == undefined) {
        //没有数据的市州不设为选中状态
        var echartsInstance = echarts.getInstanceByDom(document.getElementById('populationDistribute'));
        echartsInstance.dispatchAction({
          type: 'mapUnselect',
          name: params.name
        });

        return;
      }

      //判断地图区域是选中还是取消选中状态
      if(params.selected[params.name]){
        $scope.cityName = params.name;
        $scope.totalPopulationStr = (districtGeneralStatMap[$scope.cityName].POPULATION/10000).toFixed(2) + '万人';
      } else {
        $scope.cityName = '湖南省';
        $scope.totalPopulationStr = (districtGeneralStatMap[$scope.cityName].POPULATION).toFixed(2) + '万人';
      }

      // $scope.totalPopulationStr = (districtGeneralStatMap[$scope.cityName].POPULATION/10000).toFixed(2) + '万人';
      $scope.totalHouseholdStr = (districtGeneralStatMap[$scope.cityName].HOUSEHOLD_NUMBER/10000).toFixed(2) + '万户';
      $scope.maleRatio = 1;
      if (districtGeneralStatMap[$scope.cityName].MALE_POPULATION > 0) {
        $scope.femaleRatio = (districtGeneralStatMap[$scope.cityName].FEMALE_POPULATION/districtGeneralStatMap[$scope.cityName].MALE_POPULATION).toFixed(2);
      } else {
        $scope.femaleRatio = 1;
      }

      //后续还有会自动触发$apply方法的操作，所以此处可以注释掉

      selectedDistrictNo = districtGeneralStatMap[$scope.cityName].DISTRICT_NO;

      vm.loadUrbanRuralDistribution($http, devUrl, true);

      vm.loadAgeDistribution($http, devUrl, true);
      $scope.$apply();

    };

    vm.renderMap = function($http, devUrl) {
      vm.mapConfig = {
        dataLoaded: false
      };

      vm.mapOption = {
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            //第一个系列数据，即泡泡数据，不展示tooltip
            if (params.seriesIndex == 0) {
              return '';
            }

            return '总人数: ' + params.value + '万人';
          }
        },
        visualMap: {
          /* 用于数据与图形的映射 */
          name: "总人数",
          text: ['高', '低'],
          min: 0,
          max: 800,
          left: 'center',
          bottom: 50,
          orient: 'horizontal',
          calculable: true,
          color: ['#2e40a4','#f1f3ff'],
          seriesIndex: 1,
          inverse: true
        },
        geo: {
          /* 地图数据属性 */
          map: 'hunan',
          top: 20, /* 与顶部的距离 */
          zoom: 1,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          }
        },
        series: [
          {
            /* 泡泡系列数据，此系列数据的作用是在地图的合适位置标出各市州的名称，没有其它更多作用 */
            type: 'scatter',
            name:'总人数',
            coordinateSystem: 'geo', /* 采用地图数据作为坐标系统 */
            silent: true, //不响应鼠标
            symbolSize: 0.01,  //泡泡图的点无法完全消除，只能将尺寸调到一个很小的值
            itemStyle: {
              normal: {
                color: '#000',
                opacity: 1
              }
            },
            label: {
              normal: {
                position: 'right',
                color: '#000000',
                show: true,
                textStyle: {
                  color: '#000'
                },
                formatter: function (val) {
                  return val['name'];
                }
              }
            },
            data: districtCoordinateMap
          },
          {
            /* 地图系列数据，此系列数据主要用于将人口数采用不同的颜色在地图上展示 */
            type: 'map',
            map: 'hunan',
            coordinateSystem: 'geo', /* 采用地图数据作为坐标系统 */
            top: 20,
            zoom: 1,
            label: {

              normal: {
                position: 'right',
                show: false,
                color: '#000000',
                formatter: function (val) {
                  return val['name'];
                }
              },
              emphasis: {
                show: false
              }

            },
            itemStyle: {
              normal: {
                color: '#000000',
                position: 'right',
                show: true
              }
            },
            data: districtPopulationArr,
            selectedMode : 'single'
          }
        ]
      };

      // vm.mapConfig.dataLoaded = true;
      vm.mapConfig.event = [{mapselectchanged:onMapSelectChanged}];


    };

    //查询湖南省以及各市州的人口总体情况
    vm.qryDistrictGeneralStat = function($http, devUrl) {

      districtGeneralStatMap = {};
      var qryStatus = 0;
      var qryCompletedFlag = 2;

      //加载湖南省数据
      var url = 'leader/population/latestStatistics/1/0/0/1/1';
      CommService.getHttpJsonItem(url,devUrl+url,function(response){
        var districtName = response.data[0].DISTRICT_NAME;
        districtGeneralStatMap[districtName] = response.data[0];

        //更新页面右上角统计数据，页面初始化时，默认统计数据来自湖南省
        $scope.totalPopulationStr = (districtGeneralStatMap[$scope.cityName].POPULATION).toFixed(2) + '万人';
        $scope.totalHouseholdStr = (districtGeneralStatMap[$scope.cityName].HOUSEHOLD_NUMBER/10000).toFixed(2) + '万户';
        $scope.maleRatio = 1;
        if (districtGeneralStatMap[$scope.cityName].MALE_POPULATION > 0) {
          $scope.femaleRatio = (districtGeneralStatMap[$scope.cityName].FEMALE_POPULATION/districtGeneralStatMap[$scope.cityName].MALE_POPULATION).toFixed(2);
        } else {
          $scope.femaleRatio = 1;
        }

        qryStatus++;
        if (qryStatus == qryCompletedFlag) {
          //cacheDistrictGeneralStat();
          vm.mapConfig.dataLoaded = true;
        }
      });


      //加载各市州数据
      var url1 = 'leader/population/jurisdictionDistrictStat/1/1/' + targetYear;
      CommService.getHttpJsonItem(url1,devUrl+url1,function(response){
        //将查询数据装入市州统计数据map
        var maxPopulation = 0;
        for (var i in response.data) {
          var districtName = response.data[i].DISTRICT_NAME;
          districtGeneralStatMap[districtName] = response.data[i];

          if (response.data[i].POPULATION > maxPopulation) {
            maxPopulation = response.data[i].POPULATION;
          }
        }

        if (maxPopulation > 0) {
          //向上取整，单位为万人
          maxPopulation = Math.ceil(maxPopulation/10000);

          vm.mapOption.visualMap.max = maxPopulation;
        }

        //根据完整的市州信息，在地图显示用数组中装入人数数据
        for (var i in districtCoordinateMap)
        {
          var districtName = districtCoordinateMap[i].name;
          if (districtName.indexOf('\n') >= 0)
          { //对于名字中包含换行符的处理，去掉换行符，是市州名与原始地图数据中的市州名保持一致
            districtName = districtName.replace('\n', '');
          }

          var population;
          if (districtGeneralStatMap[districtName] == undefined) {
            population = 0;
          } else {
            population = (districtGeneralStatMap[districtName].POPULATION/10000).toFixed(2);
          }

          districtPopulationArr.push({
            'name': districtName,
            'value': population
          });
        }
        qryStatus++;
        if (qryStatus == qryCompletedFlag) {
          //cacheDistrictGeneralStat();
          vm.mapConfig.dataLoaded = true;
        }
      });

    };

    // function cacheDistrictGeneralStat() {
    //   var data = {};
    //   data.generalStatMap = districtGeneralStatMap;
    //   data.districtPopulationArr = districtPopulationArr;
    //   data.maxPopulation = vm.mapOption.visualMap.max;
    //   data.timestamp = (new Date()).getTime();
    //
    //   sessionStorage.setItem("population.areastat.generalStatMap", JSON.stringify(data));
    // }
    //
    // function loadDistrictGeneralStat() {
    //   var data = JSON.parse(sessionStorage.getItem("population.areastat.generalStatMap"));
    //   return data;
    // }

    //人口发展情况
    var peopleNum=[];
    var households=[];
    var yearList1=[];

    vm.loadUrbanRuralDistribution = function ($http, devUrl, triggerByMapChange) {
      peopleNum=[];
      households=[];
      yearList1=[];
      vm.urbanRuralConfig = {
        dataLoaded: false
      };
      vm.urbanRuralOption = {
        color: ['#408bb7', '#4f49a8'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {type: 'line'}
        },
        grid: {
          left:'10%',
          right: '10%',
          bottom:'10%'
        },
        legend: {
          data:['人数','户数']
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              show:false,
              // alignWithLabel: true
            },
            data: yearList1
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '人数(万人)',
            min: 0,
            max: 8000,
            interval:2000,
            axisLine:{
              show:false
            },
            axisTick:{
              show:false
            },
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: '户数(万户)',
            min: 0,
            max: 4000,
            interval:1000,
            splitLine:{
              show:false
            },
            axisLine:{
              show:false
            },
            axisTick:{
              show:false
            },
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name:'人数',
            type:'line',
            yAxisIndex: 0,
            data:peopleNum
          },
          {
            name:'户数',
            type:'line',
            yAxisIndex: 1,
            data:households
          }
        ]
      };
      vm.urbanRuralConfig.dataLoaded = true;

      var url2='leader/population/latestStatistics/' + selectedDistrictNo + '/0/0/1/5';
      CommService.getHttpJsonItem(url2,devUrl+url2,function(response){
        for(var i in response.data){
          yearList1.push(response.data[i].DATE_PERIOD);
          peopleNum.push((response.data[i].POPULATION).toFixed(2));
          households.push((response.data[i].HOUSEHOLD_NUMBER/10000).toFixed(2));
          if(response.data[i].DISTRICT_NO!=1){
            vm.urbanRuralOption.yAxis[0].max=800;
            vm.urbanRuralOption.yAxis[0].interval=200;
            vm.urbanRuralOption.yAxis[1].max=400;
            vm.urbanRuralOption.yAxis[1].interval=100;
          }
        }

      });
    };


    //城镇化
    var yearList=[];
    var townDatas=[];
    var village=[];
    var Urban_rate=[];
    var totalPopulation = [];
    vm.loadAgeDistribution = function($http, devUrl, triggerByMapChange){
      yearList=[];
      townDatas=[];
      village=[];
      Urban_rate=[];
      totalPopulation = [];
      vm.ageConfig={
        dataLoaded: false
      };
      vm.ageOption={
        color:['#4F49A8', '#1371BD', '#CB64BB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {type: 'line'}
        },
        grid: {
          left:'10%',
          right: '10%',
          bottom:'15%'
        },
        legend: {
          data:['城镇','农村','城镇化率']
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              show:false,
              //alignWithLabel: true
            },
            data: yearList
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '人数(万人)',
            min: 0,
            max: 4000,
            interval:1000,
            axisLine: {
              show:false
            },
            axisTick: {
              show:false
            },
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: '城镇化率(%)',
            min: 0,
            max: 80,
            interval:20,
            splitLine:{
              show:false
            },
            axisLine: {
              show:false
            },
            axisTick: {
              show:false
            },
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name:'城镇',
            type:'bar',
            //yAxisIndex: 0,
            barMaxWidth:20,
            data:townDatas
          },
          {
            name:'农村',
            type:'bar',
            //yAxisIndex: 0,
            barMaxWidth:20,
            data:village
          },
          {
            name:'城镇化率',
            type:'line',
            yAxisIndex: 1,
            data:Urban_rate
          }
        ]
      };
      vm.ageConfig.dataLoaded = true;

      var periodSpan = 5;
      //城镇化率
      var urbanRuralType2 = 0;
      vm.urbanRate=function () {
        var url2='leader/population/latestStatistics/' + selectedDistrictNo + '/' + urbanRuralType2 + '/0/1/'+periodSpan ;
        CommService.getHttpJsonItem(url2,devUrl+url2,function(response){
          for(var i in response.data){
            totalPopulation.push((response.data[i].POPULATION).toFixed(2));
          }
          for(var i in totalPopulation){
            Urban_rate.push((townDatas[i]/totalPopulation[i]*100).toFixed(2));
          }
          console.log(Urban_rate)
        });
      };

      var urbanRuralType = 1;
      var url3='leader/population/latestStatistics/' + selectedDistrictNo + '/' + urbanRuralType + '/0/1/' + periodSpan;
      CommService.getHttpJsonItem(url3,devUrl+url3,function(response){
        // console.log(url3)
        for(var i in response.data){
          yearList.push(response.data[i].DATE_PERIOD);
          townDatas.push((response.data[i].POPULATION).toFixed(2));
        }
        vm.urbanRate();
      });

      var urbanRuralType1 = 2;
      var url4='leader/population/latestStatistics/' + selectedDistrictNo + '/' + urbanRuralType1 + '/0/1/' + periodSpan;
      CommService.getHttpJsonItem(url4,devUrl+url4,function(response){
        for(var i in response.data){
          village.push((response.data[i].POPULATION).toFixed(2));
          if(response.data[i].DISTRICT_NO!=1){
            vm.ageOption.yAxis[0].max=800;
            vm.ageOption.yAxis[0].interval=200;
            vm.ageOption.yAxis[1].max=100;
            vm.ageOption.yAxis[1].interval=25;
          }
        }

      });

    };


    // function refreshURPopulation(urbanPopulation, ruralPopulation) {
    //   var shadow = Math.max(urbanPopulation, ruralPopulation) * 1.1;
    //
    //   vm.urbanPopulationOption.series[0].data[0] = urbanPopulation;
    //   vm.urbanPopulationOption.series[1].data[0] = shadow;
    //
    //   vm.ruralPopulationOption.series[0].data[0] = ruralPopulation;
    //   vm.ruralPopulationOption.series[1].data[0] = shadow;
    // }

    //页面初始化
    function init() {
      vm.renderMap($http, devUrl);
      // vm.renderRuralPopulation();
      // vm.renderUrbanPopulation();

      vm.qryDistrictGeneralStat($http, devUrl);
      vm.loadUrbanRuralDistribution($http, devUrl);
      vm.loadAgeDistribution($http, devUrl);
    }

    init();

  }

})();


