/**
 * 领导桌面-人口综合分析-人口分布分析
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('PopulationDistributeController', PopulationDistributeController);

  /** @ngInject */
  function PopulationDistributeController($scope, $http, SweetAlert, devUrl, sessionCacheTTL,CommService,latestYear) {
    var vm = this;
    var myDate = new Date();
    //var latestYear=myDate.getFullYear()-2;
    vm.latestYear = latestYear-1;

    var latestTotalPopulation = 0;

    //年龄分布
    vm.loadAgeDistribution = function($http, devUrl){
      vm.ageConfig={
        dataLoaded: false
      };

      vm.ageOption={
        legend: {  /* 图例定义区域 */
          x : 'center',
          y : '25',
          data:['0-14岁','15-64岁','65岁及以上'],
          itemWidth: 14
        },
        color: ['#574fbe', '#0c6bd9', '#3ba9bd'],  /* 图例颜色设置 */
        grid: {
          left: '3%',
          right: '5%',
          bottom: '5%',
          containLabel: true
        },
        tooltip: {
          formatter: '{a}<br/> {c}万人',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis : [
          {
            type : 'category',
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
            name : '单位：万人',
            min: 0,
            max: 6000,
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
            },
            axisLabel: {textStyle:{ color: '#7F7F7F' }}
          }
        ],
        series : [
          {
            name:'0-14岁',
            barMaxWidth:20,
            type:'bar'
          },
          {
            name:'15-64岁',
            barMaxWidth:20,
            type:'bar'
          },
          {
            name:'65岁及以上',
            barMaxWidth:20,
            type:'bar'
          }
        ]
      };

      // var cacheData = loadAgeDistributionData();
      // if (cacheData && ((new Date()).getTime() - cacheData.timestamp) < sessionCacheTTL) {
      //   vm.ageOption.xAxis[0].data = cacheData.period;
      //   vm.ageOption.series[0].data = cacheData.age1;
      //   vm.ageOption.series[1].data = cacheData.age2;
      //   vm.ageOption.series[2].data = cacheData.age3;
      //
      //   vm.ageConfig.dataLoaded = true;
      //
      //   return;
      // }

      var loadCompletedFlag = 3;
      var loadStatus = 0;
      var ageGroupNo = 11;
      var periodSpan = 5;
      var url='leader/population/latestAgeDistribute/1/0/' + ageGroupNo + '/1/' + periodSpan;
      CommService.getHttpJsonItem(url, devUrl + url, function (response) {
        var populationValues = new Array();
        var years = new Array();
        for(var i in response.data){
          populationValues.push(response.data[i].POPULATION);
          years.push(response.data[i].DATE_PERIOD);
        }
        vm.ageOption.series[0].data = populationValues;
        vm.ageOption.xAxis[0].data = years;

      });

      ageGroupNo = 12;
      url = 'leader/population/latestAgeDistribute/1/0/' + ageGroupNo + '/1/' + periodSpan;
      CommService.getHttpJsonItem(url, devUrl + url, function (response) {
        var populationValues = new Array();
        for(var i in response.data){
          populationValues.push(response.data[i].POPULATION);
        }
        vm.ageOption.series[1].data = populationValues;
      })


      ageGroupNo = 13;
      url = 'leader/population/latestAgeDistribute/1/0/' + ageGroupNo + '/1/' + periodSpan;
      CommService.getHttpJsonItem(url, devUrl + url, function (response) {
        var populationValues = new Array();
        for(var i in response.data){
          populationValues.push(response.data[i].POPULATION);
        }
        vm.ageOption.series[2].data = populationValues;
      })

      vm.ageConfig.dataLoaded=true;
    };
    vm.loadAgeDistribution($http, devUrl);

    // function cacheAgeDistributionData() {
    //   var data = {};
    //   data.age1 = vm.ageOption.series[0].data;
    //   data.age2 = vm.ageOption.series[1].data;
    //   data.age3 = vm.ageOption.series[2].data;
    //   data.period = vm.ageOption.xAxis[0].data;
    //   data.timestamp = (new Date()).getTime();
    //
    //   sessionStorage.setItem("population.distribution.age", JSON.stringify(data));
    // }
    //
    // function loadAgeDistributionData() {
    //   var data = JSON.parse(sessionStorage.getItem("population.distribution.age"));
    //
    //   return data;
    // }

    //性别比例
    vm.renderMalePopulation = function() {
      vm.maleConfig = {
        dataLoaded: true
      };

      vm.maleOption = {
        grid: {
          left: 0,
          right: 160,
          top: 5,
          bottom: '3%'
        },
        xAxis: {
          type: 'value',
          show: false
        },
        yAxis: {
          type: 'category',
          data: [''],
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            type: 'bar',
            z: 10,
            data: [],
            label: {
              normal: {
                show: true,
                position: ['115%', 2],
                textStyle: {
                  fontSize: 14,
                  color: '#0c6bd8'
                },
                formatter: function (params) {
                  return (params.value/10000).toFixed(2) + '万人';
                }
              }
            },
            //barWidth:'40',
            barGap: '-100%'
          },
          {
            type: 'bar',
            z: 1,
            silent: true,
            data: [],
            itemStyle: {
              normal: {
                color: '#f5f5f5',
                opacity: 1
              }
            },
            label: {
              normal: {
                show: true,
                position: ['140%', 2],
                textStyle: {
                  fontSize: 14,
                  color: '#ff0000'
                },
                formatter: function (params) {
                  if (latestTotalPopulation > 0) {

                    //此处借用影子数据的标签，展示实际人数与总人数的比例
                    return (vm.maleOption.series[0].data[0] / latestTotalPopulation * 100).toFixed(1) + '%';
                  }
                }
              }
            },
            //barWidth:'40',
            barGap: '-100%'
          }
        ],
        color : ['#408bb7']
      };
    };

    vm.renderFemalePopulation = function() {
      vm.femaleConfig = {
        dataLoaded: true
      };

      vm.femaleOption = {
        grid: {
          left: 0,
          right: 160,
          top: 5,
          bottom: '3%'
        },
        xAxis: {
          type: 'value',
          show: false
        },
        yAxis: {
          type: 'category',
          data: [''],
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            type: 'bar',
            data: [],
            //barWidth:'40',
            label: {
              normal: {
                show: true,
                position: ['125%', 2],
                textStyle: {
                  fontSize: 14,
                  color: '#0c6bd8'
                },
                formatter: function (params) {
                  return (params.value/10000).toFixed(2) + '万人';
                }
              }
            }
          },
          {
            type: 'bar',
            z: 1,
            silent: true,
            data: [],
            //barWidth:'40',
            itemStyle: {
              normal: {
                color: '#f5f5f5',
                opacity: 1
              }
            },
            label: {
              normal: {
                show: true,
                position: ['140%', 2],
                textStyle: {
                  fontSize: 14,
                  color: '#ff0000'
                },
                formatter: function (params) {
                  if (latestTotalPopulation > 0) {
                    //此处借用影子数据的标签，展示实际人数与总人数的比例
                    return (vm.femaleOption.series[0].data[0] / latestTotalPopulation * 100).toFixed(1) + '%';
                  }
                }
              }
            },
            barGap: '-100%'
          }
        ],
        color : ['#cb64bb']
      };
    };

    vm.loadGenderPopulation = function($http, devUrl){

      // var cacheData = loadGenderData();
      // if (cacheData && ((new Date()).getTime() - cacheData.timestamp) < sessionCacheTTL) {
      //   vm.maleOption.series[0].data[0] = cacheData.male1;
      //   vm.maleOption.series[1].data[0] = cacheData.male2;
      //   vm.femaleOption.series[0].data[0] = cacheData.female1;
      //   vm.femaleOption.series[1].data[0] = cacheData.female2;
      //
      //   return;
      // }

      var url= 'leader/population/latestGenderPopulation/1/1';
      CommService.getHttpJsonItem(url, devUrl + url, function (response) {
        latestTotalPopulation = response.data[0].POPULATION;
        var tmpMax = Math.max(response.data[0].FEMALE_POPULATION, response.data[0].MALE_POPULATION) * 1.1;

        vm.maleOption.series[0].data[0] = response.data[0].MALE_POPULATION;
        vm.maleOption.series[1].data[0] = tmpMax;
        vm.femaleOption.series[0].data[0] = response.data[0].FEMALE_POPULATION;
        vm.femaleOption.series[1].data[0] = tmpMax;
      });

     };

    // function cacheGenderData() {
    //   var data = {};
    //   data.male1 = vm.maleOption.series[0].data[0];
    //   data.male2 = vm.maleOption.series[1].data[0];
    //   data.female1 = vm.femaleOption.series[0].data[0];
    //   data.female2 = vm.femaleOption.series[1].data[0];
    //   data.timestamp = (new Date()).getTime();
    //
    //   sessionStorage.setItem("population.distribution.gender", JSON.stringify(data));
    // }
    //
    // function loadGenderData() {
    //   var data = JSON.parse(sessionStorage.getItem("population.distribution.gender"));
    //
    //   return data;
    // }

    vm.renderMalePopulation();
    vm.renderFemalePopulation();
    vm.loadGenderPopulation($http, devUrl);

    //育龄妇女比例
    vm.loadFertileWoman = function($http, devUrl) {

      var totalPopulation;

      vm.fertileWomanConfig = {
        dataLoaded: false
      };

      vm.fertileWomanOption = {
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          orient: 'vertical',
          right: '20%',
          top: 'center',
          data: ['育龄妇女', '非育龄人口'],
          itemWidth: 14
        },
        tooltip: {
          formatter: function (params) {
            // if (params.name == '育龄妇女') {
              return params.name + ':'+ (params.value / 10000).toFixed(2) + '万人';
            // }
          },
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          // formatter:'{c}万人'
        },
        series: [
          {
            type: 'pie',
            center: ['40%', '52%'],
            radius: [0, '85%'],
            label: {
              normal: {
                show: true,
                position: 'inside',
                textStyle: {
                  fontSize: 12
                },
                formatter: fertileWomanFormat
              }
            },
            data: [
              {
                name: '育龄妇女',
                itemStyle: {
                  normal: {
                    color: '#394aa9'
                  }
                }
              },
              {
                name: '非育龄人口',
                itemStyle: {
                  normal: {
                    color: '#dddddd'
                  }
                }
              }
            ]
          }
        ]
      };

      function fertileWomanFormat(params)
      {
        var labelStr = "";

        if (params.dataIndex == 0 && totalPopulation > 0)
        {
          labelStr = (params.value / totalPopulation * 100).toFixed(2) + "%";
        }

        return labelStr;
      }
      //
      // var cacheData = loadFertileWomanData();
      // if (cacheData && ((new Date()).getTime() - cacheData.timestamp) < sessionCacheTTL) {
      //   vm.fertileWomanOption.series[0].data[0].value = cacheData.fertile1;
      //   vm.fertileWomanOption.series[0].data[1].value = cacheData.fertile2;
      //   totalPopulation = cacheData.totalPopulation;
      //
      //   vm.fertileWomanConfig.dataLoaded = true;
      //   return;
      // }

      var url = 'leader/population/latestPopulationStat/1/1';  //url最后两个部分固定为“湖南省”、“按年统计”
      CommService.getHttpJsonItem(url, devUrl + url, function (response) {
        vm.fertileWomanOption.series[0].data[0].value = response.data[0].FERTILE_WOMAN_POPULATION;
        vm.fertileWomanOption.series[0].data[1].value = response.data[0].POPULATION - response.data[0].FERTILE_WOMAN_POPULATION;

        totalPopulation = response.data[0].POPULATION;

        vm.fertileWomanConfig.dataLoaded = true;
      });
    }

    // function cacheFertileWomanData() {
    //   var data = {};
    //   data.fertile1 = vm.fertileWomanOption.series[0].data[0].value;
    //   data.fertile2 = vm.fertileWomanOption.series[0].data[1].value;
    //   data.totalPopulation = data.fertile1 + data.fertile2;
    //   data.timestamp = (new Date()).getTime();
    //
    //   sessionStorage.setItem("population.distribution.fertile", JSON.stringify(data));
    // }
    //
    // function loadFertileWomanData() {
    //   var data = JSON.parse(sessionStorage.getItem("population.distribution.fertile"));
    //
    //   return data;
    // }

    vm.loadFertileWoman($http, devUrl);



  }
})();


