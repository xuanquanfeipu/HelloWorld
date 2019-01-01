/**
 * 领导桌面-财政收入分析
 */
(function () {
  'use strict';

  // $(".content-wrapper .container").removeClass("container").addClass("container-fluid");

  var isDebug = true;

  function log(msg) {
    if (console && console.log && isDebug) {
      console.log(msg);
    }
  }

  angular
    .module('smartCore')
    .controller('LdzmTopicIndShbzfxZtfxController', LdzmTopicIndShbzfxZtfxController);

  /** @ngInject */
  function LdzmTopicIndShbzfxZtfxController($http, devUrl, CommService) {
    var vm = this;
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

    function parseDataWithYear(dataList, year, indicator) {
      var dataItem = dataList[dataList.curIdx];
      if (dataList) {
        while (dataList.curIdx < dataList.length && year > dataList[dataList.curIdx].datePeriod) {
          dataList.curIdx++;
        }
      }
      if (dataList && dataList.curIdx < dataList.length && year == dataList[dataList.curIdx].datePeriod) {
        var dataItem = dataList[dataList.curIdx];
        indicator.cbrsList.push(dataItem.cbrs);
        indicator.srList.push(dataItem.sr);
        indicator.zcList.push(dataItem.zc);
        indicator.xsdyrsList.push(dataItem.xsdyrs);
        indicator.ljjyList.push(dataItem.ljjy);
      } else {
        indicator.cbrsList.push(null);
        indicator.srList.push(null);
        indicator.zcList.push(null);
        indicator.xsdyrsList.push(null);
        indicator.ljjyList.push(null);
      }
    }

    loadStatData(devUrl + 'leader/socialinsurance/ztfx', function(data) {
      var startTime = new Date().getTime();
      //养老保险（城镇、企事业、城乡三者之和）
      vm.yalbx = {
        cbrsList: [],
        srList: [],
        zcList: [],
        xsdyrsList: [],
        ljjyList: []
      };
      vm.czqyYalbx = {
        cbrsList: [],
        srList: [],
        zcList: [],
        xsdyrsList: [],
        ljjyList: []
      };
      vm.jgsydwYalbx = {
        cbrsList: [],
        srList: [],
        zcList: [],
        xsdyrsList: [],
        ljjyList: []
      };
      vm.cxjmYalbx = {
        cbrsList: [],
        srList: [],
        zcList: [],
        xsdyrsList: [],
        ljjyList: []
      };
      vm.yilbx = {
        cbrsList: [],
        srList: [],
        zcList: [],
        xsdyrsList: [],
        ljjyList: []
      };
      vm.gsbx = {
        cbrsList: [],
        srList: [],
        zcList: [],
        xsdyrsList: [],
        ljjyList: []
      };
      vm.syubx = {
        cbrsList: [],
        srList: [],
        zcList: [],
        xsdyrsList: [],
        ljjyList: []
      };
      vm.syebx = {
        cbrsList: [],
        srList: [],
        zcList: [],
        xsdyrsList: [],
        ljjyList: []
      };

      vm.shbz = {
        srzeList: [],
        zczeList: []
      };

      vm.srze = 0;//收入总额
      vm.zcze = 0;//支出总额
      vm.srzeGrowthList = [];
      vm.zczeGrowthList = [];

      vm.years = data.years;

      data.czqyylbxDataList.curIdx = 0;
      data.jgsydwylbxDataList.curIdx = 0;
      data.cxjmylbxDataList.curIdx = 0;
      data.ylbxDataList.curIdx = 0;
      data.gsbxDataList.curIdx = 0;
      data.syubxDataList.curIdx = 0;
      data.syebxDataList.curIdx = 0;

      for (var i=0; i<vm.years.length; i++) {
        var year = vm.years[i];

        parseDataWithYear(data.czqyylbxDataList, year, vm.czqyYalbx);
        parseDataWithYear(data.jgsydwylbxDataList, year, vm.jgsydwYalbx);
        parseDataWithYear(data.cxjmylbxDataList, year, vm.cxjmYalbx);
        parseDataWithYear(data.ylbxDataList, year, vm.yilbx);
        parseDataWithYear(data.gsbxDataList, year, vm.gsbx);
        parseDataWithYear(data.syubxDataList, year, vm.syubx);
        parseDataWithYear(data.syebxDataList, year, vm.syebx);

        var ylbxCbrs = sum(vm.czqyYalbx.cbrsList[i], vm.jgsydwYalbx.cbrsList[i], vm.cxjmYalbx.cbrsList[i]);
        var ylbxSr = sum(vm.czqyYalbx.srList[i], vm.jgsydwYalbx.srList[i], vm.cxjmYalbx.srList[i]);
        var ylbxZc = sum(vm.czqyYalbx.zcList[i], vm.jgsydwYalbx.zcList[i], vm.cxjmYalbx.zcList[i]);
        var xsdyrsZc = sum(vm.czqyYalbx.xsdyrsList[i], vm.jgsydwYalbx.xsdyrsList[i], vm.cxjmYalbx.xsdyrsList[i]);
        var ljjyZc = sum(vm.czqyYalbx.ljjyList[i], vm.jgsydwYalbx.ljjyList[i], vm.cxjmYalbx.ljjyList[i]);
        vm.yalbx.cbrsList.push(ylbxCbrs);
        vm.yalbx.srList.push(ylbxSr);
        vm.yalbx.zcList.push(ylbxZc);
        vm.yalbx.xsdyrsList.push(xsdyrsZc);
        vm.yalbx.ljjyList.push(ljjyZc);

        var srze = sum(vm.yalbx.srList[i], vm.yilbx.srList[i], vm.gsbx.srList[i], vm.syubx.srList[i], vm.syebx.srList[i]);
        var zcze = sum(vm.yalbx.zcList[i], vm.yilbx.zcList[i], vm.gsbx.zcList[i], vm.syubx.zcList[i], vm.syebx.zcList[i]);
        vm.shbz.srzeList.push(srze);
        vm.shbz.zczeList.push(zcze);
        if (i > 0) {
          vm.srzeGrowthList.push(
            CommService.getGrowth(vm.shbz.srzeList[i-1], vm.shbz.srzeList[i])
          );
          vm.zczeGrowthList.push(
            CommService.getGrowth(vm.shbz.zczeList[i-1], vm.shbz.zczeList[i])
          );
        } else {
          vm.srzeGrowthList.push(null);
          vm.zczeGrowthList.push(null);
        }
      }

      var dataSize = vm.years.length;

      vm.srze = vm.shbz.srzeList[dataSize];
      vm.zcze = vm.shbz.zczeList[dataSize];

      var endTime = new Date().getTime();
      log("time ellapsed by compose data: " + (endTime - startTime));

      renderData();
    });

    function get145Option(optionIdx) {
      var listPropName = "";
      var yName = '';
      var legendArry = [];
      var seriesArry = [];
      var selectedData = {};
      var top = 50;
      if (optionIdx == 1) {
        top = 30;
        listPropName = "cbrsList";
        console.log(listPropName);
        console.log(vm.yalbx);
        console.log(vm.yalbx[listPropName].slice(0, dataSize));
        yName = '万人';
        legendArry = ["养老保险","工伤保险","失业保险","生育保险","医疗保险"];
        seriesArry = [
          {
            name:'养老保险',
            type:'bar',
            barMaxWidth:20,
            data:vm.yalbx[listPropName].slice(0, dataSize),
            itemStyle: {
              normal: {
                color: '#5db606'
              }
            }
          },
          {
            name:'工伤保险',
            type:'bar',
            barMaxWidth:20,
            data:vm.gsbx[listPropName].slice(0, dataSize),
            itemStyle: {
              normal: {
                color: '#2d77f2'
              }
            }
          },
          {
            name:'失业保险',
            type:'bar',
            barMaxWidth:20,
            data:vm.syebx[listPropName].slice(0, dataSize),
            itemStyle: {
              normal: {
                color: '#0ac4b5'
              }
            }
          },
          {
            name:'生育保险',
            type:'bar',
            barMaxWidth:20,
            data:vm.syubx[listPropName].slice(0, dataSize),
            itemStyle: {
              normal: {
                color: '#574FBE'
              }
            }
          },
          {
            name:'医疗保险',
            type:'bar',
            barMaxWidth:20,
            data:vm.yilbx[listPropName].slice(0, dataSize),
            itemStyle: {
              normal: {
                color: '#be64ce'
              }
            }
          }
        ];
      }else if (optionIdx == 3) {
        listPropName = "srList";
        yName = '亿元';
        legendArry = ["养老保险","工伤保险","失业保险","生育保险","医疗保险"];
        seriesArry = [
          {
            name:'养老保险',
            type:'bar',
            barMaxWidth:20,
            data:vm.yalbx[listPropName].slice(0, dataSize),
            itemStyle: {
              normal: {
                color: '#be64ce'
              }
            }
          },
          {
            name:'工伤保险',
            type:'bar',
            barMaxWidth:20,
            data:vm.gsbx[listPropName].slice(0, dataSize),
            itemStyle: {
              normal: {
                color: '#2d77f2'
              }
            }
          },
          {
            name:'失业保险',
            type:'bar',
            barMaxWidth:20,
            data:vm.syebx[listPropName].slice(0, dataSize),
            itemStyle: {
              normal: {
                color: '#0ac4b5'
              }
            }
          },
          {
            name:'生育保险',
            type:'bar',
            barMaxWidth:20,
            data:vm.syubx[listPropName].slice(0, dataSize),
            itemStyle: {
              normal: {
                color: '#574FBE'
              }
            }
          },
          {
            name:'医疗保险',
            type:'bar',
            barMaxWidth:20,
            data:vm.yilbx[listPropName].slice(0, dataSize),
            itemStyle: {
              normal: {
                color: '#5db606'
              }
            }
          }
        ];
      } else if (optionIdx == 4) {
        listPropName = "zcList";
        yName = '亿元';
        legendArry = ["养老保险","工伤保险","失业保险","生育保险","医疗保险"];
        seriesArry = [
          {
            name:'养老保险',
            type:'bar',
            barMaxWidth:20,
            data:vm.yalbx[listPropName].slice(0, dataSize),
            itemStyle: {
              normal: {
                color: '#574FBE'
              }
            }
          },
          {
            name:'工伤保险',
            type:'bar',
            barMaxWidth:20,
            data:vm.gsbx[listPropName].slice(0, dataSize),
            itemStyle: {
              normal: {
                color: '#2d77f2'
              }
            }
          },
          {
            name:'失业保险',
            type:'bar',
            barMaxWidth:20,
            data:vm.syebx[listPropName].slice(0, dataSize),
            itemStyle: {
              normal: {
                color: '#0ac4b5'
              }
            }
          },
          {
            name:'生育保险',
            type:'bar',
            barMaxWidth:20,
            data:vm.syubx[listPropName].slice(0, dataSize),
            itemStyle: {
              normal: {
                color: '#be64ce'
              }
            }
          },
          {
            name:'医疗保险',
            type:'bar',
            barMaxWidth:20,
            data:vm.yilbx[listPropName].slice(0, dataSize),
            itemStyle: {
              normal: {
                color: '#5db606'
              }
            }
          }
        ];
      }else if (optionIdx == 5) {
        listPropName = "ljjyList";
        console.log(listPropName);
        console.log(vm.yalbx);
        console.log(vm.yalbx[listPropName].slice(0, dataSize));
        yName = '亿元';
        legendArry = ["养老保险","工伤保险","失业保险","生育保险","医疗保险"];
        seriesArry = [
          {
            name:'养老保险',
            type:'bar',
            barMaxWidth:20,
            data:vm.yalbx[listPropName].slice(0, dataSize),
            itemStyle: {
              normal: {
                color: '#5db606'
              }
            }
          },
          {
            name:'工伤保险',
            type:'bar',
            barMaxWidth:20,
            data:vm.gsbx[listPropName].slice(0, dataSize),
            itemStyle: {
              normal: {
                color: '#2d77f2'
              }
            }
          },
          {
            name:'失业保险',
            type:'bar',
            barMaxWidth:20,
            data:vm.syebx[listPropName].slice(0, dataSize),
            itemStyle: {
              normal: {
                color: '#0ac4b5'
              }
            }
          },
          {
            name:'生育保险',
            type:'bar',
            barMaxWidth:20,
            data:vm.syubx[listPropName].slice(0, dataSize),
            itemStyle: {
              normal: {
                color: '#574FBE'
              }
            }
          },
          {
            name:'医疗保险',
            type:'bar',
            barMaxWidth:20,
            data:vm.yilbx[listPropName].slice(0, dataSize),
            itemStyle: {
              normal: {
                color: '#be64ce'
              }
            }
          }
        ];
      }
      var dataSize = vm.years.length;
      return {
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data:legendArry,
          y:-1,
          itemWidth:10,
          itemHeight:10,
          selected: selectedData
        },
        grid: {
          top: top,
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
            name:yName,
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
        series : seriesArry
      };
    }

    function get23Option(optionIdx) {
      var dataSize = vm.years.length;
      var dataList = null;
      if (optionIdx == 2) {
        dataList = vm.srzeGrowthList.slice(0, dataSize);
      } else {
        dataList = vm.zczeGrowthList.slice(0, dataSize);
      }
      // return {
      //   legend: {
      //     data:['增长率'],
      //     show: false
      //   },
      //   tooltip: {
      //     trigger: 'axis'
      //   },
      //   grid: {
      //     top: 30,
      //     left: -15,
      //     right: 15,
      //     bottom: -10,
      //     containLabel: true
      //   },
      //   xAxis: {
      //     type: 'category',
      //     boundaryGap: false,
      //     data:vm.years.slice(0, dataSize),
      //     splitLine: {
      //       show: false
      //     },
      //     axisLine: {
      //       lineStyle: {
      //         color: '#FFFFFF'
      //       }
      //     },
      //     axisLabel: {
      //       show: false
      //     },
      //     axisTick: {
      //       show: false
      //     }
      //   },
      //   yAxis: {
      //     type: 'value',
      //     min: 0,
      //     max: 100,
      //     name: '　　亿元',
      //     splitLine: {
      //       show: false
      //     },
      //     axisLine: {
      //       lineStyle: {
      //         color: '#FFFFFF'
      //       }
      //     },
      //     axisLabel: {
      //       show: false
      //     },
      //     axisTick: {
      //       show: false
      //     }
      //   },
      //   series: [
      //     {
      //       name:'增长率',
      //       type:'line',
      //       data:dataList,
      //       itemStyle: {
      //         normal: {
      //           color: '#FFFFFF'
      //         }
      //       },
      //       symbolSize: 8
      //     }
      //   ]
      // };
    }

    function getOption2() {
      var dataSize = vm.years.length;
      var index = dataSize - 1;
      var xsdyrsList = [vm.syubx.xsdyrsList[index], vm.syebx.xsdyrsList[index], vm.gsbx.xsdyrsList[index], vm.yalbx.xsdyrsList[index]];
      var xsdyrsValue = xsdyrsList[3]+"";
      $("#ylbx_xsdyrs").text(xsdyrsValue.substring(0,xsdyrsValue.indexOf(".")+3) + ' 万人');
      $("#gsbx_xsdyrs").text(xsdyrsList[2] + ' 万人');
      $("#syebx_xsdyrs").text(xsdyrsList[1] + ' 万人');
      $("#syubx_xsdyrs").text(xsdyrsList[0] + ' 万人');

      return {
        tooltip: {
          show:false,
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        // legend: {
        //   data: ['享受待遇人数'],
        //   right: 0
        // },
        grid: {
          top: 30,
          left: -25,
          right: 70,
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
          data: ['养老保险','工伤保险','失业保险','生育保险'],
          show: false
        },
        series: [
          {
            name: '享受待遇人数',
            type: 'bar',
            barMaxWidth:20,
            itemStyle: {
              normal: {
                color: '#6cb964'
              }
            },
            data: xsdyrsList,
            barGap: 0.1,
            barWidth: 16
          }
        ]
      };
    }

    function renderData() {
      vm.ecOption1 = get145Option(1);
      vm.ecOption2 = getOption2();
      vm.ecOption3 = get145Option(3);
      vm.ecOption4 = get145Option(4);
      vm.ecOption5 = get145Option(5);

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
      if (chart5Ins) chart5Ins.resize();
    });
  }
})();


