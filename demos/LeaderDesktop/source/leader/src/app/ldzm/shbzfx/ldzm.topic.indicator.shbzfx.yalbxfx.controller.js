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
    .controller('LdzmTopicIndShbzfxYalbxfxController', LdzmTopicIndShbzfxYalbxfxController);

  /** @ngInject */
  function LdzmTopicIndShbzfxYalbxfxController($http, devUrl, CommService) {
    var vm = this;

    vm.title = "领导桌面-社会保障分析-养老保险分析";
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

    vm.ecOption1 = {};
    vm.ecOption2 = {};
    vm.ecOption3 = {};
    vm.ecOption4 = {};
    vm.ecOption5 = {};

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

    loadStatData(devUrl + 'leader/socialinsurance/yalbxfx', function(data) {
      var startTime = new Date().getTime();
      vm.czqyYalbx = {
        cbdwsList: [],
        cbrsList: [],
        jfrsList: [],
        txrsList: [],
        srList: [],
        zcList: [],
        xsdyrsList : [],
        rjyljList : [],
        ljjyList : []
      };
      vm.jgsydwYalbx = {
        cbrsList: [],
        zzzgList: [],
        ltxrsList: [],
        srList: [],
        zcList: [],
        xsdyrsList : [],
        ljjyList : []
      };
      vm.cxjmYalbx = {
        cbrsList: [],
        srList: [],
        zcList: [],
        xsdyrsList : [],
        rjyljList : [],
        ljjyList : []
      };

      vm.years = data.years;

      data.czqyylbxDataList.curIdx = 0;
      data.jgsydwylbxDataList.curIdx = 0;
      data.cxjmylbxDataList.curIdx = 0;

      for (var i=0; i<vm.years.length; i++) {
        var year = vm.years[i];
        parseDataWithYear(data.czqyylbxDataList, year, vm.czqyYalbx, ['cbdws','cbrs','jfrs','txrs','sr','zc','xsdyrs','rjylj','ljjy']);
        parseDataWithYear(data.jgsydwylbxDataList, year, vm.jgsydwYalbx, ['cbrs','zzzg','ltxrs','sr','zc','xsdyrs','ljjy']);
        parseDataWithYear(data.cxjmylbxDataList, year, vm.cxjmYalbx, ['cbrs','sr','zc','xsdyrs','rjylj','ljjy']);
      }

      var dataSize = vm.years.length;
      vm.latestYear = vm.years[dataSize-1];
      vm.cbdws = vm.czqyYalbx.cbdwsList[dataSize - 1];

      $("#shbz-cbrs").text(vm.cbdws);

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
          data:["城镇企业职工基本养老保险", "机关事业单位养老保险", "城乡居民社会养老保险"],
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
            name: '单位 : 万人',
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
            name:'城镇企业职工基本养老保险',
            type:'bar',
            barMaxWidth:20,
            data:vm.czqyYalbx.cbrsList.slice(0, dataSize),
            itemStyle: {
              normal: {
                color: '#cb64bb'
              }
            }
          },
          {
            name:'机关事业单位养老保险',
            type:'bar',
            barMaxWidth:20,
            data:vm.jgsydwYalbx.cbrsList.slice(0, dataSize),
            itemStyle: {
              normal: {
                color: '#0c6bd9'
              }
            }
          },
          {
            name:'城乡居民社会养老保险',
            type:'bar',
            barMaxWidth:20,
            data:vm.cxjmYalbx.cbrsList.slice(0, dataSize),
            itemStyle: {
              normal: {
                color: '#574fbe'
              }
            }
          }
        ]
      };
    }

    function getOption2() {
      var dataSize = vm.years.length;
      var index = dataSize - 1;
      var czqyList = [vm.czqyYalbx.srList[index], vm.czqyYalbx.rjyljList[index], vm.czqyYalbx.xsdyrsList[index]];
      var cxjmList = [vm.cxjmYalbx.srList[index], vm.cxjmYalbx.rjyljList[index], vm.cxjmYalbx.xsdyrsList[index]];

      $("#czqy-sr").text(czqyList[2] + ' 万人');
      $("#czqy-zc").text(cxjmList[2] + ' 万人');
      $("#jgsydw-sr").text(czqyList[1] + ' 元/月');
      $("#jgsydw-zc").text(cxjmList[1] + ' 元/月');
      $("#cxjm-sr").text(czqyList[0] + ' 亿元');
      $("#cxjm-zc").text(cxjmList[0] + ' 亿元');

      var max1=czqyList[0]>cxjmList[0]?czqyList[0]:cxjmList[0];
      var max2=czqyList[1]>cxjmList[1]?czqyList[1]:cxjmList[1];
      var max3=czqyList[2]>cxjmList[2]?czqyList[2]:cxjmList[2];

      var max=max1>max2?max1:max2>max3?max2:max3;
      if(czqyList[0]==max1){
        cxjmList[0] = cxjmList[0]*(max/max1);
        czqyList[0] = max;
      }else{
        czqyList[0] = czqyList[0]*(max/max1);
        cxjmList[0] = max;
      }
      if(czqyList[1]==max2){
        cxjmList[1] = cxjmList[1]*(max/max2);
        czqyList[1] = max;
      }else{
        czqyList[1] = czqyList[1]*(max/max2);
        cxjmList[1] = max;
      }
      if(czqyList[2]==max3){
        cxjmList[2] = cxjmList[2]*(max/max3);
        czqyList[2] = max;
      }else{
        czqyList[2] = czqyList[2]*(max/max3);
        cxjmList[2] = max;
      }

      return {
        tooltip: {
          show:false,
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['城镇企业职工', '城乡居民'],
          selectedMode: false
          // right: 0
        },
        grid: {
          top: 30,
          left: -90,
          right: 60,
          bottom: -20,
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          show: false
        },
        yAxis: {
          type: 'category',
          data: ['省本级享受待遇人数','省本级享受月均养老金','省本级养老金收入'],
          show: false
        },
        series: [
          {
            name: '城镇企业职工',
            type: 'bar',
            barMaxWidth:15,
            itemStyle: {
              normal: {
                color: '#574fbe'
              }
            },
            data: czqyList,
            barGap: 0.1,
          },
          {
            name: '城乡居民',
            type: 'bar',
            barMaxWidth:15,
            itemStyle: {
              normal: {
                color: '#137ebd'
              }
            },
            data: cxjmList,
            barGap: 0.1,
          }
        ]
      };
    }

    function getOption3() {
      var dataSize = vm.years.length;
      return {
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data:["总收入", "总支出", "累计结余"],
          itemWidth:10,
          itemHeight:10,
          right:50,
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
            name:'总收入',
            type:'bar',
            barMaxWidth:15,
            data:vm.czqyYalbx.srList,
            itemStyle: {
              normal: {
                color: '#cb64bb'
              }
            }
          },
          {
            name:'总支出',
            type:'bar',
            barMaxWidth:15,
            data:vm.czqyYalbx.zcList,
            itemStyle: {
              normal: {
                color: '#0c6bd9'
              }
            }
          },
          {
            name:'累计结余',
            type:'bar',
            barMaxWidth:15,
            data:vm.czqyYalbx.ljjyList,
            itemStyle: {
              normal: {
                color: '#574fbe'
              }
            }
          }
        ]
      };
    }

    function getOption4() {
      var dataSize = vm.years.length;
      return {
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data:["总收入","总支出"],
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
            name:'总收入',
            type:'bar',
            barMaxWidth:15,
            data:vm.jgsydwYalbx.srList,
            itemStyle: {
              normal: {
                color: '#574fbe'
              }
            }
          },
          {
            name:'总支出',
            type:'bar',
            barMaxWidth:15,
            data:vm.jgsydwYalbx.zcList,
            itemStyle: {
              normal: {
                color: '#0c6bd9'
              }
            }
          }
        ]
      };
    }

    function getOption5() {
      var dataSize = vm.years.length;
      return {
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data:["总收入", "总支出", "累计结余"],
          itemWidth:10,
          itemHeight:10,
          right:50,
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
            name:'总收入',
            type:'bar',
            barMaxWidth:15,
            data:vm.cxjmYalbx.srList,
            itemStyle: {
              normal: {
                color: '#cb64bb'
              }
            }
          },
          {
            name:'总支出',
            type:'bar',
            barMaxWidth:15,
            data:vm.cxjmYalbx.zcList,
            itemStyle: {
              normal: {
                color: '#0c6bd9'
              }
            }
          },
          {
            name:'累计结余',
            type:'bar',
            barMaxWidth:15,
            data:vm.cxjmYalbx.ljjyList,
            itemStyle: {
              normal: {
                color: '#574fbe'
              }
            }
          }
        ]
      };
    }

    function renderData() {
      vm.ecOption1 = getOption1();
      vm.ecOption2 = getOption2();
      vm.ecOption3 = getOption3();
      vm.ecOption4 = getOption4();
      vm.ecOption5 = getOption5();

      vm.ecConfig1.dataLoaded = true;
      vm.ecConfig2.dataLoaded = true;
      vm.ecConfig3.dataLoaded = true;
      vm.ecConfig4.dataLoaded = true;
      vm.ecConfig5.dataLoaded = true;
    }

    var chart1Ins = null;
    var chart2Ins = null;
    var chart3Ins = null;
    var chart4Ins = null;
    var chart5Ins = null;

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
      if (chart5Ins == null) {
        chart5Ins = echarts.getInstanceByDom(document.getElementById("echart-5"));
      }
      if (chart1Ins) chart1Ins.resize();
      if (chart2Ins) chart2Ins.resize();
      if (chart3Ins) chart3Ins.resize();
      if (chart4Ins) chart4Ins.resize();
      if (chart5Ins) chart4Ins.resize();
    });
  }
})();


