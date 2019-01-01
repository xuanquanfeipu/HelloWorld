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
    .controller('LdzmTopicIndShbzfxJgsyylbxfxController', LdzmTopicIndShbzfxJgsyylbxfxController);

  /** @ngInject */
  function LdzmTopicIndShbzfxJgsyylbxfxController($http, devUrl, CommService) {
    var vm = this;

    vm.title = "领导桌面-社会保障分析-机关事业养老保险分析";
    vm.breadcrumbs = [
      {title: '领导桌面', link: '/#/ldzm', icon: 'home'},
      {title: '社会保障分析', link: '/#/ldzm/shbzfx', icon: 'book'},
      {title: '机关事业养老保险分析', link: '/#/ldzm/shbzfx/jgsyylbxfx', icon: 'file'}
    ];

    //图1
    vm.ecConfig = {
      theme: 'Donut',
      dataLoaded: false
    };

    vm.ecOption = {};

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
            successCallback(response.dataList);
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

    loadStatData(devUrl + 'leader/socialinsurance/jgsydwylbx', function(dataList) {
      var startTime = new Date().getTime();
      vm.yearArr = [];
      vm.cbrsArr = [];  // 参保人数
      vm.zzzgArr = [];   // 在职职工人数
      vm.ltxrsArr = [];    // 离退休人员人数
      vm.srArr = [];    // 收入
      vm.zcArr = [];   // 支出

      vm.cbrsGrowth = [];
      vm.zzzgGrowth = [];
      vm.ltxrsGrowth = [];
      vm.srGrowth = [];
      vm.zcGrowth = [];

      for (var idx in dataList) {
        var item = dataList[idx];
        vm.yearArr.push(item.datePeriod);
        vm.cbrsArr.push(item.cbrs);
        vm.zzzgArr.push(item.zzzg);
        vm.ltxrsArr.push(item.ltxrs);
        vm.srArr.push(item.sr);
        vm.zcArr.push(item.zc);
        pushTheLastGrowth(vm.cbrsGrowth, vm.cbrsArr);
        pushTheLastGrowth(vm.zzzgGrowth, vm.zzzgArr);
        pushTheLastGrowth(vm.ltxrsGrowth, vm.ltxrsArr);
        pushTheLastGrowth(vm.srGrowth, vm.srArr);
        pushTheLastGrowth(vm.zcGrowth, vm.zcArr);
      }

      // 倒序数组
      vm.yearArrRV = vm.yearArr.slice(0).reverse();
      vm.cbrsArrRV = vm.cbrsArr.slice(0).reverse();  // 参保人数
      vm.zzzgArrRV = vm.zzzgArr.slice(0).reverse();   // 缴费人数
      vm.ltxrsArrRV = vm.ltxrsArr.slice(0).reverse();    // 退休人数
      vm.srArrRV = vm.srArr.slice(0).reverse();    // 收入
      vm.zcArrRV = vm.zcArr.slice(0).reverse();   // 支出

      vm.cbrsGrowthRV = vm.cbrsGrowth.slice(0).reverse();
      vm.zzzgGrowthRV = vm.zzzgGrowth.slice(0).reverse();
      vm.ltxrsGrowthRV = vm.ltxrsGrowth.slice(0).reverse();
      vm.srGrowthRV = vm.srGrowth.slice(0).reverse();
      vm.zcGrowthRV = vm.zcGrowth.slice(0).reverse();

      var endTime = new Date().getTime();
      log("time ellapsed by compose data: " + (endTime - startTime));

      // 初始化展示
      setShowDataInYears(vm.yearArr);

      vm.selectedItem = vm.statItems[0];
      vm.updateChart(vm.selectedItem);
    });

    function pushTheLastGrowth(growthArr, valArr) {
      if (valArr.length < 1) {
        growthArr.push(null);
      } else {
        var len = valArr.length;
        var val1 = valArr[len - 2];
        var val2 = valArr[len -1];
        var growth = CommService.getGrowth(val1, val2);
        growthArr.push(growth);
      }
    }

    function setShowDataInYears(years) {
      vm.yearShowArr = [];
      vm.cbrsShowArr = [];  // 参保人数
      vm.zzzgShowArr = [];   // 在职职工人数
      vm.ltxrsShowArr = [];    // 退休人数
      vm.srShowArr = [];    // 收入
      vm.zcShowArr = [];   // 支出

      vm.cbrsShowGrowth = [];
      vm.zzzgShowGrowth = [];
      vm.ltxrsShowGrowth = [];
      vm.srShowGrowth = [];
      vm.zcShowGrowth = [];
      for (var i=0; i<years.length; i++) {
        var targetYear = years[i];
        for (var j=0; j<vm.yearArr.length; j++) {
          if (vm.yearArr[j] == targetYear) {
            vm.yearShowArr.push(targetYear);
            vm.cbrsShowArr.push(vm.cbrsArr[j]);
            vm.zzzgShowArr.push(vm.zzzgArr[j]);
            vm.ltxrsShowArr.push(vm.ltxrsArr[j]);
            vm.srShowArr.push(vm.srArr[j]);
            vm.zcShowArr.push(vm.zcArr[j]);

            vm.cbrsShowGrowth.push(vm.cbrsGrowth[j]);
            vm.zzzgShowGrowth.push(vm.zzzgGrowth[j]);
            vm.ltxrsShowGrowth.push(vm.ltxrsGrowth[j]);
            vm.srShowGrowth.push(vm.srGrowth[j]);
            vm.zcShowGrowth.push(vm.zcGrowth[j]);
            break;
          }
        }
      }

      vm.selectedItem = vm.statItems[0];
      vm.updateChart(vm.selectedItem);
    }

    vm.statItems = [
      {name:'参保人数', value:'cbrs', yaxisUnit:'万人', tooltipFormatter:'{b}年参保人数: <br/>{c}万人', dataName:'cbrsShowArr', growthDataName:'cbrsShowGrowth'},
      {name:'在职职工人', value:'zzzg', yaxisUnit:'万人', tooltipFormatter:'{b}年在职职工人数: <br/>{c}万人', dataName:'zzzgShowArr', growthDataName:'zzzgShowGrowth'},
      {name:'离退休人员', value:'ltxrs', yaxisUnit:'万人', tooltipFormatter:'{b}年离退休人员: <br/>{c}万人', dataName:'ltxrsShowArr', growthDataName:'ltxrsShowGrowth'},
      {name:'收入', value:'sr', yaxisUnit:'亿元', tooltipFormatter:'{b}年收入: <br/>{c}亿元', dataName:'srShowArr', growthDataName:'srShowGrowth'},
      {name:'支出', value:'zc', yaxisUnit:'亿元', tooltipFormatter:'{b}年支出: <br/>{c}亿元', dataName:'zcShowArr', growthData:'zcShowGrowth'}
    ];

    vm.changeYears = function() {
      var years = [];
      $("#shbzfxTable .cbx-year:checked").each(function() {
        years.push($(this).val());
      });
      if (years && years.length > 0) {
        years.reverse();
        setShowDataInYears(years);
      }
    }

    function getStatItem(statItemValue) {
      var statItem = null;
      for (var i=0; i<vm.statItems.length; i++) {
        if (vm.statItems[i].value == statItemValue) {
          statItem = vm.statItems[i];
          break;
        }
      }
      return statItem;
    }

    vm.updateChart = function(statItem) {
      vm.ecConfig.dataLoaded = false;

      if (statItem == null) {
        return;
      }

      vm.ecOption = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          bottom: 10,
          data: [statItem.name, '增长率']
        },
        xAxis : [
          {
            type : 'category',
            data : vm.yearShowArr,
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis : [
          {
            type : 'value',
            name : statItem.name + ' (' + statItem.yaxisUnit + ')',
            axisLabel : {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: '增长率',
            axisLabel: {
              formatter: '{value}%'
            }
          }
        ],
        series : [
          {
            name: statItem.name,
            type:'bar',
            barMaxWidth:20,
            data: vm[statItem.dataName]
          },
          {
            name:'增长率',
            type:'line',
            yAxisIndex: 1,
            data: vm[statItem.growthDataName]
          }
        ]
      };
      vm.ecConfig.dataLoaded = true;
    }

    $(window).resize(function() {
      var ins = echarts.getInstanceByDom(document.getElementById("echart-1"));
      ins.resize();
    });
  }
})();


