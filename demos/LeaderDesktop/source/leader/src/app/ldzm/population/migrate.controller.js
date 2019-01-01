/**
 * 领导桌面-人口综合分析-迁移分析
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('PopulationMigrateController', PopulationMigrateController);

  /** @ngInject */
  function PopulationMigrateController($scope, $http, SweetAlert, devUrl, sessionCacheTTL) {
    var vm = this;

    //地理坐标，包含各省、自治州、直辖市数据，省、自治州的坐标采用该省的省会、首府城市坐标
    var geoCoordMap = {
      '上海': [121.4648,31.2891],
      '新疆': [87.9236,43.5883],
      '甘肃': [103.5901,36.3043],
      '北京': [116.4551,40.2539],
      '江苏': [118.8062,31.9208],
      '广西': [108.479,23.1152],
      '江西': [116.0046,28.6633],
      '安徽': [117.29,32.0581],
      '内蒙古': [111.4124,40.4901],
      '黑龙江': [127.9688,45.368],
      '天津': [117.4219,39.4189],
      '山西': [112.3352,37.9413],
      '广东': [113.5107,23.2196],
      '四川': [103.9526,30.7617],
      '西藏': [91.1865,30.1465],
      '云南': [102.9199,25.4663],
      '浙江': [119.5313,29.8773],
      '湖北': [114.3896,30.6628],
      '辽宁': [123.1238,42.1216],
      '山东': [117.1582,36.8701],
      '海南': [110.3893,19.8516],
      '河北': [114.4995,38.1006],
      '福建': [119.4543,25.9222],
      '青海': [101.4038,36.8207],
      '陕西': [109.1162,34.2004],
      '贵州': [106.6992,26.7682],
      '河南': [113.4668,34.6234],
      '重庆': [107.7539,30.1904],
      '宁夏': [106.3586,38.1775],
      '吉林': [125.8154,44.2584],
      '湖南': [113.0823,28.2568]
    };

    var migrateMapData = [];
    var migrateDistricts = [];

    //迁移地图
    vm.renderMigrateMap = function(migrateType){

      var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i];
          var fromCoord = geoCoordMap[dataItem[0].name];
          var toCoord = geoCoordMap[dataItem[1].name];
          if (fromCoord && toCoord) {
            res.push({
              fromName: dataItem[0].name,
              toName: dataItem[1].name,
              coords: [fromCoord, toCoord]
            });
          }
        }
        return res;
      };

      var series = [];
      [['湖南', migrateMapData]].forEach(function (item, i) {
        series.push({
            type: 'lines',
            zlevel: 1,
            effect: {
              show: true,
              period: 5,
              trailLength: 0.8,
              color: '#fff',
              symbolSize: 4
            },
            lineStyle: {
              normal: {
                color: '#6cb964',
                width: 0,
                curveness: 0.2
              }
            },
            data: convertData(item[1])
          },
          {
            type: 'lines',
            zlevel: 2,
            symbol: ['none', 'arrow'],
            symbolSize: 20,
            lineStyle: {
              normal: {
                color: '#6cb964',
                width: 2,
                opacity: 0.8,
                curveness: 0.2
              }
            },
            data: convertData(item[1])
          },
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
              brushType: 'stroke'
            },
            label: {
              normal: {
                show: true,
                position: 'right',
                formatter: '{b}'
              }
            },
            symbolSize: function (val) {

              var size = val[2] / 10000 / 3;

              //控制地图上气泡的大小
              if (size > 22) {
                size = 22
              } else if (size < 5) {
                size = 5;
              }

              return size;
            },
            itemStyle: {
              normal: {
                color: '#6cb964'
              }
            },
            data: item[1].map(function (dataItem) {

              if (migrateType == 1) {
                return {
                  name: dataItem[0].name,
                  value: geoCoordMap[dataItem[0].name].concat([dataItem[0].value])
                };
              } else {
                return {
                  name: dataItem[1].name,
                  value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                };
              }
            })
          });
      });

      vm.migrateConfig={
        dataLoaded: false
      };

      vm.migrateOption = {

        tooltip: {
          trigger: 'item',
          formatter: function(params) {

            if (!params.value) {
              return;
            }

            var population = (params.value[2]/10000).toFixed(2) + '万人';
            var prefix;
            if (migrateType == 1) {
              prefix = '从' + params.name + '迁入';
            } else {
              prefix = '向' + params.name + '迁出';
            }

            return prefix + population;
          },
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        geo: {  /* 地图数据属性 */
          map: 'china',
          top: 50,  /* 与顶部的距离 */
          zoom: 1.25,
          silent: true,
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#5f6faa',
              borderColor: '#fff'
            }
          }
        },
        series: series
      };

      vm.migrateConfig.dataLoaded = true;

    };


    //迁移排行
    vm.renderMigrateTopN = function () {

      var districtNames = [];
      var migratePopulations = [];
      var shadowValues = [];
      var tmpMax = 0;

      for(var i in migrateDistricts)
      {
        districtNames.push(migrateDistricts[i].name);
        migratePopulations.push(migrateDistricts[i].value);

        if (migrateDistricts[i].value > tmpMax) {
          tmpMax = migrateDistricts[i].value;
        }
      }

      tmpMax = Math.ceil(tmpMax * 1.1);
      for(var i in migrateDistricts) {
        shadowValues.push(tmpMax);
      }

      vm.migrateTopNConfig = {
        dataLoaded: false
      };
      vm.migrateTopNOption = {
        grid: {
          left: '3%',
          right: 70,
          bottom: '5%',
          top: '2%',
          containLabel: true
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
          },
          data: districtNames
        }
        ,
        series: [
          {
            type: 'bar',
            z: 10,
            itemStyle: {
              normal: {
                color: '#554fbe'
              }
            },
            label: {
              normal: {
                show: true,
                position: [390, 0],
                formatter: function(params) {
                  return (params.value/10000).toFixed(2) + '万人';
                },
                textStyle: {
                  fontSize: 16
                }
              }
            },
            barCategoryGap: '40%',
            barGap: '-100%',
            data: migratePopulations
          },
          {
            type: 'bar',
            z: 1,
            silent: true,
            itemStyle: {
              normal: {
                color: '#f5f5f5',
                opacity: 1
              }
            },
            barGap: '-100%',
            data: shadowValues
          }
        ]
      };

      vm.migrateTopNConfig.dataLoaded = true;
    };

    vm.loadMigrateTopN = function($http, devUrl, migrateType, manualRefresh)
    {
      //读取缓存
      var cacheData = loadMigrateData(migrateType);
      if (cacheData && ((new Date()).getTime() - cacheData.timestamp < sessionCacheTTL)) {
        migrateMapData = cacheData.migrateMapData;
        migrateDistricts = cacheData.migrateDistricts;

        vm.renderMigrateMap(migrateType);
        vm.renderMigrateTopN();

        //使用缓存数据，在图上切换迁移类型时，需要手动刷新
        if (manualRefresh) {
          try {
            $scope.$apply();
          } catch (e) {
          }
        }

        return;
      }

      var topN = 10;
      var qryYear = (new Date).getFullYear() - 1;
      var url=devUrl + 'leader/population/migrateDistrictTopN/1/' + migrateType + '/2/1/' + qryYear + '/' + topN;

      $http.get(url)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
            return;
          }

          migrateMapData = [];
          migrateDistricts = [];

          for(var i in response.data){
            var migrateDistrictData = {};
            migrateDistrictData.name = response.data[i].MIGRATE_DISTRICT_NAME;
            migrateDistrictData.value = response.data[i].POPULATION;

            //构造地图迁移数据
            /*
            * 格式
            * 迁出：
            * [
            *   [{name:'湖南'}, {name:'上海',value:95}],
            *   [{name:'湖南'}, {name:'广东',value:90}]
            * ]
            * 迁入:
            * [
            *   [{name:'上海',value:95},{name:'湖南'}],
            *   [{name:'广东',value:90},{name:'湖南'}]
            * ]
            * */
            var tmpArr = new Array();
            if (migrateType == 1)
            {
              tmpArr.push(migrateDistrictData);
              tmpArr.push({name:'湖南'});
            }
            else
            {
              tmpArr.push({name:'湖南'});
              tmpArr.push(migrateDistrictData);
            }
            migrateMapData.push(tmpArr);

            //构造迁移排行柱状图数据
            migrateDistricts.push(migrateDistrictData);

          }

          cacheMigrateData(migrateType);

          vm.renderMigrateMap(migrateType);
          vm.renderMigrateTopN();

        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });
    };

    function cacheMigrateData(migrateType) {
      var data = {};
      data.migrateMapData = migrateMapData;
      data.migrateDistricts = migrateDistricts;
      data.timestamp = (new Date()).getTime();

      sessionStorage.setItem("population.migrate.type" + migrateType, JSON.stringify(data));
    }

    function loadMigrateData(migrateType) {
      var data = JSON.parse(sessionStorage.getItem("population.migrate.type" + migrateType));

      return data;
    }

    //先使用空的迁移数据，仅渲染地图，避免迁移数据加载时间过长造成地图区域长时间空白
    $.get('/app/map/china.json', function (data) {
      echarts.registerMap('china', data);
      vm.renderMigrateMap(1);
    });

    //加载迁移数据并渲染图例
    vm.loadMigrateTopN($http, devUrl, 1);


    $(".toggle-btn a").click(function() {
      var self = $(this);
      if (self.hasClass("target")) {
        return;
      }
      $(".toggle-btn a.target").removeClass("target");
      self.addClass("target");
      var type = self.attr("migrateType");

      //console.log("migrateType: " + type);

      vm.loadMigrateTopN($http, devUrl, type, true);
    });


  }
})();


