/**
 * 领导桌面-财政收入分析
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('LdzmTopicIndCzsrfxSrgcfxController', LdzmTopicIndCzsrfxSrgcfxController);

  /** @ngInject */
  function LdzmTopicIndCzsrfxSrgcfxController($http, devUrl) {
    var vm = this;

    vm.title = "领导桌面-财政收入分析-收入构成分析";
    vm.breadcrumbs = [
      {title: '领导桌面', link: '/#/ldzm', icon: 'home'},
      {title: '财政收入分析', link: '/#/ldzm/czsrfx', icon: 'book'},
      {title: '收入构成分析', link: '/#/ldzm/czsrfx/srgcfx', icon: 'file'}
    ];

    //图1
    vm.ecConfig = {
      theme: 'Donut',
      dataLoaded: false
    };

    vm.ec1Config = {
      theme: 'Donut',
      dataLoaded: false
    };

    vm.ecOption = {};
    vm.ec1Option = {};

    function loadStatData(url, successCallback, errorCallback) {
      $http.get(url)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
            return;
          }
          if (response.ret == '1') {
            SweetAlert.swal("查询数据发生错误");
            return;
          }
          if (!angular.isUndefined(successCallback)) {
            successCallback(response.data);
          }
        })
        .error(function () {
          if (!angular.isUndefined(errorCallback)) {
            errorCallback();
          } else {
            SweetAlert.swal("网络有问题，待会再试");
          }
        });
    }

    loadStatData(devUrl + 'leader/govfinance/czsrgc', function(data) {
      var yearArr = [];
      var zsrArr = [];     // 总量
      var dfczsrArr = [];    // 地方财政收入
      var shzylssrArr = [];  // 上划中央两税收入
      var shzysdsArr = [];   // 上划中央所得税
      var qtsrArr = [];    // 其他收入
      var sssrArr = [];    // 税收收入
      var fsssrArr = [];   // 非税收收入

      var zsr = 0;
      for (var idx in data.dataList) {
        var item = data.dataList[idx];
        yearArr.push(item.datePeriod);
        zsrArr.push(item.dffsssrze + item.dfsssrze + item.qtsrze + item.shzylssrze + item.shzysdsze);
        dfczsrArr.push(item.dffsssrze + item.dfsssrze);
        shzylssrArr.push(item.shzylssrze);
        shzysdsArr.push(item.shzysdsze);
        qtsrArr.push(item.qtsrze);
        sssrArr.push(item.dfsssrze);
        fsssrArr.push(item.dffsssrze);
      }
      vm.zsrArr = zsrArr;
      vm.dfczsrArr = dfczsrArr;
      vm.ggczsrArr = zsrArr;

      vm.ecOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          bottom: 10,
          data:['总量','地方财政收入','上划中央两税收入','上划中央所得税', '其他收入', '税收收入', '非税收收入']
        },
        xAxis : [
          {
            type : 'category',
            data : yearArr,
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
          }
        ],
        yAxis : [
          {
            type : 'value',
            axisLabel: {
              formatter: '{value} %',
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
        series : [
          {
            name:'总量',
            type:'bar',
            data:zsrArr
          },
          {
            name:'地方财政收入',
            type:'bar',
            stack: '公共财政收入',
            data: dfczsrArr
          },
          {
            name:'上划中央两税收入',
            type:'bar',
            stack: '公共财政收入',
            data: shzylssrArr
          },
          {
            name:'上划中央所得税',
            type:'bar',
            stack: '公共财政收入',
            data: shzysdsArr
          },
          {
            name:'其他收入',
            type:'bar',
            stack: '公共财政收入',
            data: qtsrArr
          },
          {
            name:'税收收入',
            type:'bar',
            stack: '地方财政收入',
            data: sssrArr
          },
          {
            name:'非税收收入',
            type:'bar',
            stack: '地方财政收入',
            data: fsssrArr
          }
        ]
      };
      vm.ecConfig.dataLoaded = true;
    });

    vm.loadEc1Data = function(year) {
      var url = devUrl + 'leader/govfinance/czsrgc?yf=' + year + '&yt=' + year;
      loadStatData(url, function(data) {
        var stat = data.dataList[0];
        //item.dffsssrze + item.dfsssrze + item.qtsrze + item.shzylssrze + item.shzysdsze
        vm.ec1Option = {
          center: ['35%', '20%'],
          series : [
            {
              name: '财政收入构成',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                {value:stat.dfsssrze, name:'税收收入'},
                {value:stat.dffsssrze, name:'非税收收入'},
                {value:stat.shzylssrze, name:'上划中央两税收入'},
                {value:stat.shzysdsze, name:'上划中央所得税'},
                {value:stat.qtsrze, name:'其他收入'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };

        vm.ec1Config.dataLoaded = true;
      });
    }

    vm.years = ['2013', '2014', '2015'];
    vm.selectedYear = '2013';
    vm.loadEc1Data(vm.selectedYear);

  }
})();


