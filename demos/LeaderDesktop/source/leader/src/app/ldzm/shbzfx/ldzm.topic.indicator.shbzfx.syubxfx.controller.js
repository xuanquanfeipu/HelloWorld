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
    .controller('LdzmTopicIndShbzfxSyubxfxController', LdzmTopicIndShbzfxSyubxfxController);

  /** @ngInject */
  function LdzmTopicIndShbzfxSyubxfxController($http, devUrl, CommService) {
    var vm = this;

    vm.title = "领导桌面-社会保障分析-生育保险分析";
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

    vm.ecOption1 = {};
    vm.ecOption2 = {};
    vm.ecOption3 = {};

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

    loadStatData(devUrl + 'leader/socialinsurance/syubxxx', function(data) {
      var startTime = new Date().getTime();
      vm.dataList = {
        cbrsList: [],
        jfrsList: [],
        srList: [],
        zcList: [],
        yldyList: [],
        yldyrsList: [],
        jtdyList: [],
        jtdyrsList: [],
        cbdwsList: [],
        xsdyrsList: [],
        dqjyList: [],
        ljjyList: []
      };

      vm.years = data.years;
      var dataSize = vm.years.length;
      vm.latestYear = vm.years[dataSize-1];

      data.syubxDataList.curIdx = 0;

      for (var i=0; i<vm.years.length; i++) {
        var year = vm.years[i];
        parseDataWithYear(data.syubxDataList, year, vm.dataList, ['cbrs','jfrs','sr','zc','yldy','yldyrs','jtdy',
          'jtdyrs','cbdws','xsdyrs','dqjy','ljjy']);
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
            splitLine: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle:{
                color:'#8996a3'
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis : [
          {
            type : 'value',
            name: '单位 : 万人',
            nameGap: 25,
            splitLine: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle:{
                color:'#8996a3'
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series : [
          {
            name:'参保人数',
            type:'bar',
            barMaxWidth:15,
            data:vm.dataList.cbrsList,
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
            data:vm.dataList.jfrsList,
            itemStyle: {
              normal: {
                color: '#0c6bd9'
              }
            }
          }
        ]
      };
    }

    function getOption2(yAxis) {
      var pieLegendData=['医疗待遇','津贴待遇'];
      var pieData=[
        {name:'医疗待遇',value:vm.dataList.yldyrsList[vm.years.length-1]},
        {name:'津贴待遇',value:vm.dataList.jtdyrsList[vm.years.length-1]}];
      return {
        title:
          {
            text:'享受待遇总人次',
            subtext: vm.dataList.xsdyrsList[vm.years.length-1]+'万次',
            x:'49%',
            y:yAxis+'%',
            textAlign: "center",
            subtextStyle:{
              color: '#3b53a2',
              fontSize: '24',
              fontWeight: 'bold'
            },
            textStyle:{
              color: '#5a6e83',
              fontSize: '16',
              fontWeight: 'lighter'
            }
          },
        grid: {
          left: 10
        },
        color: ['#394aa9','#cb64bb','#6c6fef'],
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c} 万人次'
        },
        legend: {
          orient: 'horizontal',
          // x:'right',
          y:yAxis+50+'%',
          x:'28%',
          textStyle:{
            fontSize:10
          },
          itemWidth:10,
          itemHeight:10,
          itemGap:20,
          width:250,
          data:pieLegendData
        },
        series: [{
          name:'总数',
          type:'pie',
          center:['50%', (yAxis+10)+'%'],
          radius: ['47%', '70%'],
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

    function getOption3() {
      return {
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data:["总收入", "总支出", "当期结余", "累计结余"],
          itemWidth:10,
          itemHeight:10,
          top:10
        },
        grid: {
          top: 40,
          left: 35,
          right: 35,
          bottom: 20,
          containLabel: true
        },
        xAxis : [
          {
            type : 'category',
            data : vm.years,
            splitLine: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle:{
                color:'#8996a3'
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis : [
          {
            type : 'value',
            name: '单位 : 亿元',
            nameGap: 25,
            splitLine: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle:{
                color:'#8996a3'
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series : [
          {
            name:'总收入',
            type:'bar',
            barMaxWidth:20,
            data:vm.dataList.srList,
            itemStyle: {
              normal: {
                color: '#574fbe'
              }
            },
            barGap:1
          },
          {
            name:'总支出',
            type:'bar',
            barMaxWidth:20,
            data:vm.dataList.zcList,
            itemStyle: {
              normal: {
                color: '#0c6bd9'
              }
            }
          },
          {
            name:'当期结余',
            type:'bar',
            barMaxWidth:20,
            data:vm.dataList.dqjyList,
            itemStyle: {
              normal: {
                color: '#cb64bb'
              }
            }
          },
          {
            name:'累计结余',
            type:'bar',
            barMaxWidth:20,
            data:vm.dataList.ljjyList,
            itemStyle: {
              normal: {
                color: '#3ba9bd'
              }
            }
          }
        ]
      };
    }

    function renderData() {
      vm.cbdws = vm.dataList.cbdwsList[vm.years.length-1];
      vm.yldy = vm.dataList.yldyList[vm.years.length-1];
      vm.jtdy = vm.dataList.jtdyList[vm.years.length-1];

      vm.ecOption1 = getOption1();
      vm.ecOption2 = getOption2(30);
      vm.ecOption3 = getOption3();

      vm.ecConfig1.dataLoaded = true;
      vm.ecConfig2.dataLoaded = true;
      vm.ecConfig3.dataLoaded = true;
    }

    var chart1Ins = null;
    var chart2Ins = null;
    var chart3Ins = null;

    $(window).resize(function() {
      if (chart1Ins == null) {
        chart1Ins = echarts.getInstanceByDom(document.getElementById("echart-1"));
      }
      if (chart2Ins == null) {
        chart2Ins = echarts.getInstanceByDom(document.getElementById("echart-2"));
      }
      if (chart3Ins == null) {
        chart3Ins = echarts.getInstanceByDom(document.getElementById("echart-3"));
      }
      if (chart1Ins) chart1Ins.resize();
      if (chart2Ins) chart2Ins.resize();
      if (chart3Ins) chart3Ins.resize();
    });
  }
})();


