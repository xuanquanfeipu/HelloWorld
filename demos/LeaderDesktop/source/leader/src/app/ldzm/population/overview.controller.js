/**
 * 领导桌面-人口综合分析-人口总体分析
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('PopulationOverviewController', PopulationOverviewController);

  /** @ngInject */
  function PopulationOverviewController($scope, $http, devUrl, SweetAlert, sessionCacheTTL,CommService,latestYear) {
    var vm = this;
    var myDate = new Date();
    vm.latestYear = latestYear-1;

    //城乡人口分布
    vm.loadUrbanRuralDistribution = function ($http, devUrl) {
      vm.urbanRuralConfig = {
        dataLoaded: false
      };
      vm.urbanRuralOption = {
        legend: {
          /* 图例定义区域 */
          x: 'center',
          y: '25',
          data: ['总人口', '城镇人口', '农村人口'],
          itemWidth: 14
        },
        color: ['#574fbe', '#137ebd', '#3ba9bd'], /* 图例颜色设置 */
        grid: {
          left: '3%',
          right: '3%',
          bottom: '5%',
          containLabel: true
        },
        tooltip: {
          formatter: distributeFormatter,
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis:
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
                color:'#d8dde2'
              }
            },
            axisLabel: {textStyle:{ color: '#7F7F7F' }}
          },
        yAxis:
          {
            name: '单位：万人',
            type: 'value',
            // min: 0,
            // max: 8000,
            nameTextStyle: {
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
            },
            axisLabel: {textStyle:{ color: '#7F7F7F' }}
          },
        series: [
          {
            name: '总人口',
            type: 'bar',
            barWidth: 20,
            label: {
              normal: {
                show: false,
                position: 'top'
              }
            },
          },
          {
            name: '城镇人口',
            type: 'bar',
            barWidth: 6,
            stack: '总人口',
            label: {
              normal: {
                show: false,
                position: 'top'
              }
            }
          },
          {
            name: '农村人口',
            type: 'bar',
            barWidth: 6,
            stack: '总人口',
            label: {
              normal: {
                show: false,
                position: 'top'
              }
            }
          }
        ]
      };
      vm.urbanRuralConfig.dataLoaded = true;

      function distributeFormatter(params) {
        var labelStr;

        labelStr = params.seriesName;
        labelStr += '<br/>';
        labelStr += (params.value).toFixed(2);
        labelStr += '万人';

        return labelStr;
      }

      // function yAixsFormatter(value, index)
      // {
      //   var labelStr;
      //   labelStr = (value/10000);
      //
      //   return labelStr;
      // }


      var loadCompletedFlag = 2;
      var loadStatus = 0;
      var urbanRuralType = 1;
      var periodSpan = 5;
      var url = 'leader/population/latestStatistics/1/' + urbanRuralType + '/0/1/' + periodSpan;
      //将总人口数初始化
      var populationTemps = new Array();
      for (var i = 0; i < periodSpan; i++)
      {
        populationTemps.push(null);
      }
      vm.urbanRuralOption.series[0].data = populationTemps;
      CommService.getHttpJsonItem(url, devUrl + url, function (response) {
        var populationValues = new Array();
        var years = new Array();
        for (var i in response.data) {
          populationValues.push(response.data[i].POPULATION);
          years.push(response.data[i].DATE_PERIOD);

          vm.urbanRuralOption.series[0].data[i] += (response.data[i].POPULATION);
        }

        vm.urbanRuralOption.series[1].data = populationValues;
        vm.urbanRuralOption.xAxis.data = years;
        // vm.urbanRuralConfig.dataLoaded = true;
      });


      urbanRuralType = 2;
      var url1 = 'leader/population/latestStatistics/1/' + urbanRuralType + '/0/1/' + periodSpan;
      CommService.getHttpJsonItem(url1, devUrl + url1, function (response) {
        var populationValues = new Array();
        for (var i in response.data) {
          populationValues.push(response.data[i].POPULATION);
          vm.urbanRuralOption.series[0].data[i] += (response.data[i].POPULATION);
        }
        vm.urbanRuralOption.series[2].data = populationValues;

      });


    };
    vm.loadUrbanRuralDistribution($http, devUrl);


    //年龄分布
    vm.loadAgeDistribution = function ($http, devUrl) {
      vm.ageConfig = {
        dataLoaded: false
      };
      vm.ageOption = {
        legend: {
          orient: 'vertical',
          right: '1%',
          bottom: '2%',
          data: ['0-14岁', '15-64岁', '65岁及以上'],
          itemWidth: 14
        },
        color: ['#394aa9','#cb64bb','#6c6fef'], /* 图例颜色设置 */
        grid: {
          left: '3%',
          right: '8%',
          bottom: '5%',
          containLabel: true
        },
        tooltip: {
          formatter: '{b}</br> {c}万人',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        series: [
          {
            type: 'pie',
            center: ['40%', '46%'],
            radius: [0, '75%'],
            label: {
              normal: {
                show: true,
                position: 'inside',
                textStyle: {
                  fontSize: 12
                },
                formatter: ageFormat
              }
            },
            data: [
              {
                name: '0-14岁'
              },
              {
                name: '15-64岁'
              },
              {
                name: '65岁及以上'
              }
            ]
          }
        ]
      };

      var totalPopulation = 0;

      function ageFormat(params) {
        var labelStr = "";

        if (totalPopulation > 0) {
          labelStr = (params.value / totalPopulation * 100).toFixed(1) + "%";
        }

        return labelStr;
      }

      // var cacheData = loadAgeData();
      // if (cacheData && ((new Date()).getTime() - cacheData.timestamp < sessionCacheTTL)) {
      //   vm.ageOption.series[0].data[0].value = cacheData.age1;
      //   vm.ageOption.series[0].data[1].value = cacheData.age2;
      //   vm.ageOption.series[0].data[2].value = cacheData.age3;
      //   totalPopulation = cacheData.totalPopulation;
      //
      //   vm.ageConfig.dataLoaded = true;
      //
      //   return;
      // }

      var loadCompletedFlag = 3;
      var loadStatus = 0;
      var ageGroupNo = 11;
      var periodSpan = 1;
      var url = 'leader/population/latestAgeDistribute/1/0/' + ageGroupNo + '/1/' + periodSpan;
      CommService.getHttpJsonItem(url, devUrl + url, function (response){
        vm.ageOption.series[0].data[0].value = response.data[0].POPULATION;
        totalPopulation += response.data[0].POPULATION ;
      });


      ageGroupNo = 12;
      url = 'leader/population/latestAgeDistribute/1/0/' + ageGroupNo + '/1/' + periodSpan;
      CommService.getHttpJsonItem(url, devUrl + url, function (response){
        vm.ageOption.series[0].data[1].value = response.data[0].POPULATION ;
        totalPopulation += response.data[0].POPULATION ;
      });


      ageGroupNo = 13;
      url = 'leader/population/latestAgeDistribute/1/0/' + ageGroupNo + '/1/' + periodSpan;
      CommService.getHttpJsonItem(url, devUrl + url, function (response){
        vm.ageOption.series[0].data[2].value = response.data[0].POPULATION ;
        totalPopulation += response.data[0].POPULATION ;
      });

      vm.ageConfig.dataLoaded=true;
    };
    vm.loadAgeDistribution($http, devUrl);

    // function cacheAgeData() {
    //   var data = {};
    //   data.age1 = vm.ageOption.series[0].data[0].value;
    //   data.age2 = vm.ageOption.series[0].data[1].value;
    //   data.age3 = vm.ageOption.series[0].data[2].value;
    //   data.totalPopulation = parseFloat(data.age1) + parseFloat(data.age2) + parseFloat(data.age3);
    //   data.timestamp = (new Date()).getTime();
    //
    //   sessionStorage.setItem("population.overview.age", JSON.stringify(data));
    // }
    //
    // function loadAgeData() {
    //   var data = JSON.parse(sessionStorage.getItem("population.overview.age"));
    //   return data;
    // }

    //市州人口排行
    var populationValues = [];
    var city = [];
    vm.loadPopulationTopN = function ($http, devUrl) {
      vm.populationTopNConfig = {
        dataLoaded: false
      };
      vm.populationTopNOption = {
        //color: ['#408bb7'], /* 图例颜色设置 */
        grid: {
          left: '3%',
          right: 90,
          bottom: '0%',
          top: '2%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'value',
            axisLabel: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#000000'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            type: 'bar',
            z: 10,
            itemStyle: {
              normal: {
                color: '#408bb7'
              }
            },
            label: {
              normal: {
                show: true,
                position: [250, 0],
                formatter: '{c}万人',
                textStyle: {
                  color: '#333'
                }
              }
            },
            barCategoryGap: '50%',
            barGap: '-100%'
          },
          {
            type: 'bar',
            z: 1,
            silent: true,
            barGap: '-100%',
            barCategoryGap: '50%',
            itemStyle: {
              normal: {
                color: '#f5f5f5'
              }
            },
            tooltip: {
              show: false
            }
          }
        ]
      };

      var topN = 5;
      var tmpMax = 0;
      populationValues = [];
      city = [];
      var url = 'leader/population/populationTopN/3/1/1/' + topN;
      CommService.getHttpJsonItem(url, devUrl + url, function (response) {
        for (var i in response.data) {
          populationValues.push((response.data[i].POPULATION / 10000).toFixed(2));
          city.push(response.data[i].DISTRICT_NAME);
          if (response.data[i].POPULATION / 10000 > tmpMax) {
            tmpMax = response.data[i].POPULATION / 10000;
          }
        }
        vm.populationTopNOption.series[0].data = populationValues;
        vm.populationTopNOption.yAxis[0].data = city;
        tmpMax = Math.ceil(tmpMax * 1.1);
        var shadowValues = new Array();
        for (var i in populationValues) {
          shadowValues.push(tmpMax);
        }
        vm.populationTopNOption.series[1].data = shadowValues;
        vm.populationTopNConfig.dataLoaded = true;
      });
    };
    vm.loadPopulationTopN($http, devUrl);


    //文化素质分析
    vm.loadEduDistribution = function ($http, devUrl) {
      vm.eduConfig = {
        dataLoaded: false
      };
      vm.eduOption = {
        legend: {
          orient: 'horizontal',
          top: 'bottom',
          data: [  '初中','小学', '高中', '大学'],
          padding: 2,
          itemWidth: 10,
          itemHeight: 10
        },
        grid: {
          left: '0%',
          right: '0%',
          bottom: '1%',
          top: '1%',
          containLabel: true
        },
        tooltip: {
          formatter: '{b}</br> {c}万人 </br>{d}%',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        //'#394aa9','#cb64bb','#6c6fef','#3295cf','#6cb964','#e28750','#a76cef','#2863db','#00c2a9','#c0e347','#b13df3','#48b143'
        series: [
          {
            type: 'pie',
            roseType: 'area',
            labelLine: {
              normal: {
                show: true,
                length: 2
              }
            },
            data: [
              {
                name: '初中',
                itemStyle: {
                  normal: {
                    color: '#394aa9'
                  }
                }
              },
              {
                name: '小学',
                itemStyle: {
                  normal: {
                    color: '#cb64bb'
                  }
                }
              },
              {
                name: '高中',
                itemStyle: {
                  normal: {
                    color: '#6c6fef'
                  }
                }
              },
              {
                name: '大学',
                itemStyle: {
                  normal: {
                    color: '#3295cf'
                  }
                }
              }

            ]
          }
        ]
      };

      var curYear = (new Date).getFullYear();
      var periodSpan = (curYear - 1) + '_' + (curYear - 1);
      var url = 'leader/population/populationEduBg';
      CommService.getHttpJsonItem(url, devUrl + url, function (response) {
        for (var i in response.data) {
          if(response.data[i].EDU_BG_NO==6){
            vm.eduOption.series[0].data[1].value=(response.data[i].PRIMARY_NUM/10000).toFixed(2);
            vm.eduOption.series[0].data[0].value=(response.data[i].MIDDLE_NUM/10000).toFixed(2);
            vm.eduOption.series[0].data[2].value=(response.data[i].SENIOR_NUM/10000).toFixed(2);
            vm.eduOption.series[0].data[3].value=(response.data[i].UNIVERSITY_NUM/10000).toFixed(2);
          }

        }
        vm.eduConfig.dataLoaded = true;
      });
    };
    vm.loadEduDistribution($http, devUrl);


    //最近全省统计数据
    vm.loadLatestStatistics = function ($http, devUrl) {

      // var cacheData = loadLatestStat();
      // if (cacheData && ((new Date()).getTime() - cacheData.timestamp < sessionCacheTTL)) {
      //   $scope.totalPopulationStr = cacheData.totalPopulationStr;
      //   $scope.totalHouseholdStr = cacheData.totalHouseholdStr;
      //   $scope.birthRate = cacheData.birthRate;
      //   $scope.deathRate = cacheData.deathRate;
      //   $scope.growthRate = cacheData.growthRate;
      //
      //   return;
      // }

      $scope.totalPopulationStr = "";
      $scope.totalHouseholdStr = "";
      $scope.birthRate = "";
      $scope.deathRate = "";
      $scope.growthRate = "";

      var url =  'leader/population/latestStatistics/1/0/0/1/1';
      CommService.getHttpJsonItem(url, devUrl + url, function (response) {
        $scope.totalPopulationStr = (response.data[0].POPULATION).toFixed(2) + "万人";
        $scope.totalHouseholdStr = (response.data[0].HOUSEHOLD_NUMBER/10000).toFixed(2) + "万户";
        $scope.birthRate = response.data[0].BIRTH_RATE + "%";
        $scope.deathRate = response.data[0].DEATH_RATE + "%";
        $scope.growthRate = response.data[0].NATURAL_GROWTH_RATE + "%";
      });

    };
    vm.loadLatestStatistics($http, devUrl);

    // function cacheLatestStat() {
    //   var data = {};
    //   data.totalPopulationStr = $scope.totalPopulationStr;
    //   data.totalHouseholdStr = $scope.totalHouseholdStr;
    //   data.birthRate = $scope.birthRate;
    //   data.deathRate = $scope.deathRate;
    //   data.growthRate = $scope.growthRate;
    //   data.timestamp = (new Date()).getTime();
    //
    //   sessionStorage.setItem("population.overview.lateststat", JSON.stringify(data));
    // }
    //
    // function loadLatestStat() {
    //   var data = JSON.parse(sessionStorage.getItem("population.overview.lateststat"));
    //   return data;
    // }

    //最近城乡人口
    vm.loadLatestULPopulation = function ($http, devUrl) {

      // var cacheData = loadLatestURData();
      // if (cacheData && ((new Date()).getTime() - cacheData.timestamp < sessionCacheTTL)) {
      //   vm.urbanPopulationOption.series[0].data[0] = cacheData.urbanPopulation;
      //   vm.urbanPopulationOption.series[1].data[0] = cacheData.urbanShadow;
      //   vm.ruralPopulationOption.series[0].data[0] = cacheData.ruralPopulation;
      //   vm.ruralPopulationOption.series[1].data[0] = cacheData.ruralShadow;
      //   $scope.urbanRatio = cacheData.urbanRatio;
      //
      //   vm.ruralPopulationConfig.dataLoaded = true;
      //   vm.urbanPopulationConfig.dataLoaded = true;
      //
      //   return;
      // }

      $scope.urbanRatio = "";

      var totalPopulation = 0;
      var urbanRuralType = 2;
      var url =  'leader/population/latestStatistics/1/' + urbanRuralType + '/0/1/1';
      CommService.getHttpJsonItem(url, devUrl + url, function (response) {
        vm.ruralPopulationOption.series[0].data[0] = response.data[0].POPULATION;
        totalPopulation += response.data[0].POPULATION;
        // console.log(vm.ruralPopulationOption.series[0].data[0]);

        //城镇人口数已获取时，与人口和值相关计算才能进行
        if (vm.urbanPopulationOption.series[0].data[0])
        {
          $scope.urbanRatio = (vm.urbanPopulationOption.series[0].data[0] / totalPopulation * 100).toFixed(1) + "%";

          var shadow = Math.max(vm.ruralPopulationOption.series[0].data[0], vm.urbanPopulationOption.series[0].data[0]) * 1.1;
          vm.ruralPopulationOption.series[1].data[0] = shadow;
          vm.urbanPopulationOption.series[1].data[0] = shadow;
          //cacheLatestURData();
        }

        vm.ruralPopulationConfig.dataLoaded = true;
      });


      urbanRuralType = 1;
      url = 'leader/population/latestStatistics/1/' + urbanRuralType + '/0/1/1';
      CommService.getHttpJsonItem(url, devUrl + url, function (response) {
        vm.urbanPopulationOption.series[0].data[0] = response.data[0].POPULATION;
        totalPopulation += response.data[0].POPULATION;
        // console.log(vm.urbanPopulationOption.series[0].data[0]);
        //农村人口数已获取时，与人口和值相关计算才能进行
        if (vm.ruralPopulationOption.series[0].data[0])
        {
          $scope.urbanRatio = (response.data[0].POPULATION / totalPopulation * 100).toFixed(1) + "%";

          var shadow = Math.max(vm.ruralPopulationOption.series[0].data[0], vm.urbanPopulationOption.series[0].data[0]) * 1.1;
          vm.ruralPopulationOption.series[1].data[0] = shadow;
          vm.urbanPopulationOption.series[1].data[0] = shadow;

          //cacheLatestURData();
        }

        vm.urbanPopulationConfig.dataLoaded = true;
      });


    };

    // function cacheLatestURData() {
    //   var data = {};
    //   data.urbanPopulation = vm.urbanPopulationOption.series[0].data[0];
    //   data.urbanShadow = vm.urbanPopulationOption.series[1].data[0];
    //   data.ruralPopulation = vm.ruralPopulationOption.series[0].data[0];
    //   data.ruralShadow = vm.ruralPopulationOption.series[1].data[0];
    //   data.urbanRatio = $scope.urbanRatio;
    //   data.timestamp = (new Date()).getTime();
    //
    //   sessionStorage.setItem("population.overview.latesturdata", JSON.stringify(data));
    // }
    //
    // function loadLatestURData() {
    //   var data = JSON.parse(sessionStorage.getItem("population.overview.latesturdata"));
    //   return data;
    // }

    vm.renderUrbanPopulation = function(){
      vm.urbanPopulationConfig = {
        dataLoaded: false
      };
      vm.urbanPopulationOption = {
        grid: {
          left: -8,
          right: 75,
          bottom: '5%',
          top: '2%',
          containLabel: true
        },
        itemStyle: {
          normal: {
            barBorderRadius: 5
          }
        },
        xAxis:
        {
          type: 'value',
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        }
        ,
        yAxis:
        {
          type: 'category',
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          data: ['']
        }
        ,
        series: [
          {
            type: 'bar',
            z: 10,
            itemStyle: {
              normal: {
                color: '#408bb7'
              }
            },
            label: {
              normal: {
                show: true,
                position: [110, -3],
                formatter: function(params) {
                  return (params.value).toFixed(2) + '万人';
                },
                textStyle: {
                  fontSize: 13,
                  color:'#333'
                }
              }
            },
            barCategoryGap: '50%',
            barGap: '-100%',
            data: [0]
          },
          {
            type: 'bar',
            z: 2,
            silent: true,
            itemStyle: {
              normal: {
                color: '#f5f5f5'
              }
            },
            barGap: '-100%',
            data: [0]
          }
        ]
      };

      vm.urbanPopulationConfig.dataLoaded = true;
    };

    vm.renderRuralPopulation = function(){
      vm.ruralPopulationConfig = {
        dataLoaded: false
      };
      vm.ruralPopulationOption = {
        grid: {
          left: -8,
          right: 75,
          bottom: '5%',
          top: '2%',
          containLabel: true
        },
        itemStyle: {
          normal: {
            barBorderRadius: 5
          }
        },
        xAxis:
        {
          type: 'value',
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        }
        ,
        yAxis:
        {
          type: 'category',
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          data: ['']
        }
        ,
        series: [
          {
            type: 'bar',
            z: 10,
            itemStyle: {
              normal: {
                color: '#6cb964'
              }
            },
            label: {
              normal: {
                show: true,
                position: [110, -3],
                formatter: function(params) {
                  return (params.value).toFixed(2) + '万人';
                },
                textStyle: {
                  fontSize: 13,
                  color:'#333'
                }
              }
            },
            barCategoryGap: '50%',
            data: [0]
          },
          {
            type: 'bar',
            z: 2,
            silent: true,
            itemStyle: {
              normal: {
                color: '#f5f5f5',
                opacity: 1
              }
            },
            barGap: '-100%',
            data: [0]
          }
        ]
      };

      vm.ruralPopulationConfig.dataLoaded = true;
    };

    vm.renderUrbanPopulation();
    vm.renderRuralPopulation();
    vm.loadLatestULPopulation($http, devUrl);
  }

})();


