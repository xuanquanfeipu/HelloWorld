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
    .controller('LdzmTopicIndShbzfxYilbxfxController', LdzmTopicIndShbzfxYilbxfxController);

  /** @ngInject */
  function LdzmTopicIndShbzfxYilbxfxController($http, devUrl, CommService) {
    var vm = this;

    vm.title = "领导桌面-社会保障分析-医疗保险分析";
    vm.screenSizeType=CommService.getScreenSize().type;
    //图1
    vm.ecConfig1 = {
      theme: 'Donut',
      dataLoaded: false
    };
    vm.ecConfig2 = {
      theme: 'Donut',
      dataLoaded: false
    };
    vm.ecConfig3 = {
      theme: 'Donut',
      dataLoaded: false
    };
    vm.ecConfig4 = {
      theme: 'Donut',
      dataLoaded: false
    };
    vm.ecConfig5 = {
      theme: 'Donut',
      dataLoaded: false
    };
    vm.ecConfig6 = {
      theme: 'Donut',
      dataLoaded: false
    };

    vm.ecOption1 = {};
    vm.ecOption2 = {};
    vm.ecOption3 = {};
    vm.ecOption4 = {};
    vm.ecOption5 = {};
    vm.ecOption6 = {};

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

    function sum() {
      var sum = 0;
      for (var i=0; i<arguments.length; i++) {
        if (arguments[i]) {
          sum += parseFloat(arguments[i]);
        }
      }
      return sum;
    }

    function parseDataWithYear(dataList, year, indicator, propList) {
      var dataItem = dataList[dataList.curIdx];
      if (dataList) {
        while (dataList.curIdx < dataList.length && year > dataList[dataList.curIdx].datePeriod) {
          dataList.curIdx++;
        }
      }
      if (dataList && dataList.curIdx < dataList.length && year == dataList[dataList.curIdx].datePeriod) {
        var dataItem = dataList[dataList.curIdx];
        for (var i=0; i<propList.length; i++) {
          indicator[propList[i] + 'List'].push(dataItem[propList[i]]);
        }
      } else {
        for (var i=0; i<propList.length; i++) {
          indicator[propList[i] + 'List'].push(null);
        }
      }
    }

    loadStatData(devUrl + 'leader/socialinsurance/yilbxxx', function(data) {
      var startTime = new Date().getTime();
      vm.yilbx = {
        cbrsList: [],
        jfrsList: [],
        jjzf_1List: [],
        grzf_1List: [],
        zje_1List: [],
        jjzf_2List: [],
        grzf_2List: [],
        zje_2List: [],
        jjzf_3List: [],
        grzf_3List: [],
        zje_3List: [],
        jjzf_4List: [],
        grzf_4List: [],
        zje_4List: [],
        jjzf_5List: [],
        grzf_5List: [],
        zje_5List: [],
        zyrcList: [],
        mzdbrcList: []
      };

      vm.years = data.years;
      var dataSize = vm.years.length;
      vm.latestYear = vm.years[dataSize-1];

      data.ylbxDataList.curIdx = 0;

      for (var i=0; i<vm.years.length; i++) {
        var year = vm.years[i];
        parseDataWithYear(data.ylbxDataList, year, vm.yilbx, ['cbrs','jfrs','jjzf_1','grzf_1','zje_1','jjzf_2','grzf_2','zje_2',
          'jjzf_3','grzf_3','zje_3','jjzf_4','grzf_4','zje_4','jjzf_5','grzf_5','zje_5','zyrc','mzdbrc']);
      }

      var endTime = new Date().getTime();
      log("time ellapsed by compose data: " + (endTime - startTime));

      renderData();
    });

    function getOption1() {
      return {
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data:["参保人数", "缴费人数"],
          itemWidth:10,
          itemHeight:10,
          top:10
        },
        grid: {
          top: 50,
          left: 35,
          right: 35,
          bottom: 20,
          containLabel: true
        },
        xAxis : [
          {
            type : 'category',
            data : vm.years,
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
            type : 'value',
            name: '单位 : 万人',
            nameGap: 25,
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
            name:'参保人数',
            type:'bar',
            barMaxWidth:15,
            data:vm.yilbx.cbrsList,
            itemStyle: {
              normal: {
                color: '#574fbe'
              }
            }
          },
          {
            name:'缴费人数',
            type:'bar',
            barMaxWidth:15,
            data:vm.yilbx.jfrsList,
            itemStyle: {
              normal: {
                color: '#0c6bd9'
              }
            }
          }
        ]
      };
    }

    function getOption2(fund,personal,totalMoney,yAxis,centerTitle,part1,part2) {
      var pieLegendData=[part1,part2];
      var pieData=[
        {name:part1,value:fund},
        {name:part2,value:personal}];
      totalMoney = totalMoney + '亿元';
      return {
        title:
        {
          text:centerTitle,
          subtext: totalMoney,
          x:'39%',
          y:yAxis+'%',
          textAlign: "center",
          subtextStyle:{
            color: '#333',
            fontSize: '22'
          },
          textStyle:{
            color: '#666',
            fontSize: '14'
          }
        },
        grid: {
          left: 10
        },
        color: ['#394aa9','#cb64bb'],
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c} 亿元'
        },
        legend: {
          orient: 'vertical',
          // x:'right',
          y:yAxis+'%',
          right:30,
          textStyle:{
            fontSize:10
          },
          itemWidth:10,
          itemHeight:10,
          itemGap:16,
          width:50,
          data:pieLegendData
        },
        series: [{
          name:'总数',
          type:'pie',
          center:['40%', (yAxis+10)+'%'],
          radius: ['57%', '70%'],
          label: {
            normal: {
              show:false
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data:pieData
        }]
      };
    }

    function renderData() {
      vm.zyrc = vm.yilbx.zyrcList[vm.years.length-1];
      vm.mzdbrc = vm.yilbx.mzdbrcList[vm.years.length-1];

      vm.ecOption1 = getOption1();
      vm.ecOption2 = getOption2(vm.yilbx.jjzf_1List[vm.years.length-1], vm.yilbx.grzf_1List[vm.years.length-1], vm.yilbx.zje_1List[vm.years.length-1],30,'住院总费用','基金支付','个人支付');
      vm.ecOption3 = getOption2(vm.yilbx.jjzf_2List[vm.years.length-1], vm.yilbx.grzf_2List[vm.years.length-1], vm.yilbx.zje_2List[vm.years.length-1],30,'发生门诊费用','基金支付','个人支付');
      vm.ecOption4 = getOption2(vm.yilbx.jjzf_3List[vm.years.length-1], vm.yilbx.grzf_3List[vm.years.length-1], vm.yilbx.zje_3List[vm.years.length-1],40,'医疗保险基金总收入','统筹基金收入','个人基金收入');
      vm.ecOption5 = getOption2(vm.yilbx.jjzf_4List[vm.years.length-1], vm.yilbx.grzf_4List[vm.years.length-1], vm.yilbx.zje_4List[vm.years.length-1],40,'医疗保险基金总支出','统筹基金支出','个人基金支出');
      vm.ecOption6 = getOption2(vm.yilbx.jjzf_5List[vm.years.length-1], vm.yilbx.grzf_5List[vm.years.length-1], vm.yilbx.zje_5List[vm.years.length-1],40,'医疗保险基金累计结余','统筹基金结余','个人基金结余');

      vm.ecConfig1.dataLoaded = true;
      vm.ecConfig2.dataLoaded = true;
      vm.ecConfig3.dataLoaded = true;
      vm.ecConfig4.dataLoaded = true;
      vm.ecConfig5.dataLoaded = true;
      vm.ecConfig6.dataLoaded = true;
    }

    var chart1Ins = null;
    var chart2Ins = null;

    $(window).resize(function() {
      if (chart1Ins == null) {
        chart1Ins = echarts.getInstanceByDom(document.getElementById("echart-1"));
      }
      if (chart2Ins == null) {
        chart2Ins = echarts.getInstanceByDom(document.getElementById("echart-2"));
      }
      if (chart1Ins) chart1Ins.resize();
      if (chart2Ins) chart2Ins.resize();
    });
  }
})();


