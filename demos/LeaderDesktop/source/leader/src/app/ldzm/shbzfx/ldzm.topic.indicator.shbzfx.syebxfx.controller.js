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
    .controller('LdzmTopicIndShbzfxSyebxfxController', LdzmTopicIndShbzfxSyebxfxController);

  /** @ngInject */
  function LdzmTopicIndShbzfxSyebxfxController($http, devUrl,CommService) {
    var vm = this;

    vm.title = "领导桌面-社会保障分析-失业保险分析";
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

    vm.ecOption1 = {};
    vm.ecOption2 = {};
    vm.ecOption3 = {};
    vm.ecOption4 = {};

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

    loadStatData(devUrl + 'leader/socialinsurance/syebxxx', function(data) {
      var startTime = new Date().getTime();
      vm.dataList = {
        cbrsList: [],
        jfrsList: [],
        srList: [],
        zcList: [],
        xsdyrsList: [],
        ljjyList: [],
        jjzjsrList: [],
        cbdwsList: [],
        ffsybxjrsList: [],
        ffsybxjbzList: []
      };

      vm.years = data.years;
      vm.latestYear = vm.years[vm.years.length-1];

      data.syebxDataList.curIdx = 0;

      for (var i=0; i<vm.years.length; i++) {
        var year = vm.years[i];
        parseDataWithYear(data.syebxDataList, year, vm.dataList, ['cbrs','jfrs','sr','zc','xsdyrs','ljjy','jjzjsr',
          'cbdws','ffsybxjrs','ffsybxjbz']);
      }

      var endTime = new Date().getTime();
      log("time ellapsed by compose data: " + (endTime - startTime));

      renderData();
    });

    function getOption1() {
      var dataSize = vm.years.length;
      return {
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data:["基金收入", "基金支出", "基金结余"],
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
            data : vm.years.slice(0, dataSize),
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
            name: '单位 : 亿元',
            type : 'value',
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
            name:'基金收入',
            type:'bar',
            barMaxWidth:20,
            data:vm.dataList.srList,
            itemStyle: {
              normal: {
                color: '#cb64bb'
              }
            }
          },
          {
            name:'基金支出',
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
            name:'基金结余',
            type:'bar',
            barMaxWidth:20,
            data:vm.dataList.ljjyList,
            itemStyle: {
              normal: {
                color: '#574fbe'
              }
            }
          }
        ]
      };
    }

    function getOption2(yAxis) {
      // var pieLegendData=['基金征缴收入','基金总收入'];
      var otherValue = vm.dataList.srList[vm.years.length-1]-vm.dataList.jjzjsrList[vm.years.length-1] + "";
      otherValue = otherValue.substring(0,otherValue.indexOf('.')+3);
      var pieData=[
        {name:'基金征缴收入',value:vm.dataList.jjzjsrList[vm.years.length-1]},
        {name:'其他基金收入',value:otherValue}];
      return {
        title:
          {
            text:'基金总收入',
            subtext: vm.dataList.srList[vm.years.length-1] + '亿元',
            x:'49%',
            y:yAxis+10+'%',
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
        // #e8ebf0
        color: ['#394aa9', '#d7dae0'],
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c} 亿元'
        },
        series: [{
          name:'总数',
          type:'pie',
          center:['50%', (yAxis+20)+'%'],
          radius: ['55%', '75%'],
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
          data:["参保人数", "参保单位"],

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
                color:'#d8dde2'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {textStyle:{ color: '#7F7F7F' }}
          }
        ],
        yAxis : [
          {
            type : 'value',
            name: '单位 : 万人',
            axisLabel: {
              textStyle:{ color: '#7F7F7F' }
            },
            nameGap: 25,
            splitLine: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle:{
                color:'#d8dde2'
              }
            },
            nameTextStyle:{
              color: '#7F7F7F'
            },
            axisTick: {
              show: false
            }
          },
          {
            type : 'value',
            name: '总量 : 家',
            axisLabel: {
              textStyle:{ color: '#7F7F7F' }
            },
            nameGap: 25,
            splitLine: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle:{
                color:'#d8dde2'
              }
            },
            nameTextStyle:{
              color: '#7F7F7F'
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
            barMaxWidth:20,
            data:vm.dataList.cbrsList,
            itemStyle: {
              normal: {
                color: '#574fbe'
              }
            },
            yAxisIndex:0
          },
          {
            name:'参保单位',
            type:'bar',
            barMaxWidth:20,
            data:vm.dataList.cbdwsList,
            itemStyle: {
              normal: {
                color: '#0c6bd9'
              }
            },
            yAxisIndex:1
          }
        ]
      };
    }

    function getOption4() {
      return {
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data:["人数", "保险金"],
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
                color:'#d8dde2'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {textStyle:{ color: '#7F7F7F' }}
          }
        ],
        yAxis : [
          {
            type : 'value',
            name: '单位 : 人',
            axisLabel: {
              textStyle:{ color: '#7F7F7F' }
            },
            nameGap: 25,
            splitLine: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle:{
                color:'#d8dde2'
              }
            },
            nameTextStyle:{
              color: '#7F7F7F'
            },
            axisTick: {
              show: false
            }
          },
          {
            type : 'value',
            name: '总量 : 元/月',
            axisLabel: {
              textStyle:{ color: '#7F7F7F' }
            },
            nameGap: 25,
            splitLine: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle:{
                color:'#d8dde2'
              }
            },
            nameTextStyle:{
              color: '#7F7F7F'
            },
            axisTick: {
              show: false
            }
          }
        ],
        series : [
          {
            name:'人数',
            type:'bar',
            barMaxWidth:20,
            data:vm.dataList.ffsybxjrsList,
            itemStyle: {
              normal: {
                color: '#574fbe'
              }
            },
            yAxisIndex:0
          },
          {
            name:'保险金',
            type:'bar',
            barMaxWidth:20,
            data:vm.dataList.ffsybxjbzList,
            itemStyle: {
              normal: {
                color: '#0c6bd9'
              }
            },
            yAxisIndex:1
          }
        ]
      };
    }

    function renderData() {
      vm.ecOption1 = getOption1();
      vm.ecOption2 = getOption2(30);
      vm.ecOption3 = getOption3();
      vm.ecOption4 = getOption4();

      vm.ecConfig1.dataLoaded = true;
      vm.ecConfig2.dataLoaded = true;
      vm.ecConfig3.dataLoaded = true;
      vm.ecConfig4.dataLoaded = true;
    }

    var chart1Ins = null;
    var chart2Ins = null;
    var chart3Ins = null;
    var chart4Ins = null;

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
      if (chart4Ins == null) {
        chart4Ins = echarts.getInstanceByDom(document.getElementById("echart-4"));
      }
      if (chart1Ins) chart1Ins.resize();
      if (chart2Ins) chart2Ins.resize();
      if (chart3Ins) chart3Ins.resize();
      if (chart4Ins) chart4Ins.resize();
    });
  }
})();


