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
    .controller('LdzmTopicIndCzsrfxZtfxController', LdzmTopicIndCzsrfxZtfxController);

  /** @ngInject */
  function LdzmTopicIndCzsrfxZtfxController($http, devUrl, CommService,latestYear) {
    var vm = this;
    var myDate = new Date();
    var curYear=latestYear-1;
    vm.lastYear = curYear + '年';
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
      CommService.getHttpJsonItem('1'+url,url,function(response){
        successCallback(response.data);
      });
      // $http.get(url)
      //   .success(function (response) {
      //     if (angular.isUndefined(response)) {
      //       SweetAlert.swal("没有查到相关数据");
      //       return;
      //     }
      //     if (response.ret == '1') {
      //       SweetAlert.swal("查询数据发生错误");
      //       return;
      //     }
      //     if (!angular.isUndefined(successCallback)) {
      //       successCallback(response.data);
      //     }
      //   })
      //   .error(function () {
      //     if (!angular.isUndefined(errorCallback)) {
      //       errorCallback();
      //     } else {
      //       SweetAlert.swal("网络有问题，待会再试");
      //     }
      //   });
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

    var colors = ['#394aa9','#cb64bb','#6c6fef','#3295cf','#6cb964','#e28750','#a76cef','#2863db','#00c2a9','#c0e347','#b13df3','#48b143'];

    loadStatData(devUrl + 'leader/govfinance/ztfx', function(data) {
      var startTime = new Date().getTime();
      vm.srzcZeData = {
        srzeList: [],
        zczeList: [],
        srzeGrowthList: [],
        zczeGrowthList: []
      };
      vm.srgcData = [];
      vm.zcgcData = [];
      vm.srTop5 = {
        districtList: [],
        srList: [],
        growthList: [],
        maxZe: 0
      };
      vm.zcTop5 = {
        districtList: [],
        zcList: [],
        growthList: [],
        maxZe: 0
      };

      vm.srze = 0;
      vm.zcze = 0;

      vm.years = data.years;

      data.srzcZeDataList.curIdx = 0;

      for (var i=0; i<vm.years.length; i++) {
        var year = vm.years[i];

        parseDataWithYear(data.srzcZeDataList, year, vm.srzcZeData, ['srze','zcze']);

        var srGrowth = CommService.getGrowth(vm.srzcZeData.srzeList[i-1], vm.srzcZeData.srzeList[i]);
        var zcGrowth = CommService.getGrowth(vm.srzcZeData.zczeList[i-1], vm.srzcZeData.zczeList[i]);
        vm.srzcZeData.srzeGrowthList.push(srGrowth);
        vm.srzcZeData.zczeGrowthList.push(zcGrowth);
      }

      // 市州排行
      var maxZe = 0;
      for (var i=0; i<5; i++) {
        if(data.srTop5List.length > 0){
            var item = data.srTop5List[i];
            vm.srTop5.districtList.push(item.DISTRICT_NAME);
            vm.srTop5.srList.push(item.ZE || 0);
            vm.srTop5.growthList.push(item.RATE || 0);
            if (item.ZE && parseFloat(item.ZE) > maxZe) {
              maxZe = item.ZE;
            }
            $("#czsr-top5-ze-list div:eq(" + i + ")").text(item.ZE + " 万元");
            if(item.RATE < 0){
              $("#czsr-top5-growth-list div:eq(" + i + ")").text('↓'+item.RATE + "%");
              $("#czsr-top5-growth-list div:eq(" + i + ")").css('color','green')
            } else {
              $("#czsr-top5-growth-list div:eq(" + i + ")").text('↑'+item.RATE + "%");
            }
        }
      }
      if (data.srTop5List.length < 5) {
        for (var i=data.srTop5List.length; i<5; i++) {
          vm.srTop5.districtList.push(null);
          vm.srTop5.srList.push(null);
          vm.srTop5.growthList.push(null);
          $("#czsr-top5-ze-list div:eq(" + i + ")").text(" 万元");
          $("#czsr-top5-growth-list div:eq(" + i + ")").text("↑%");
        }
      }
      vm.srTop5.districtList.reverse();
      vm.srTop5.srList.reverse();
      vm.srTop5.growthList.reverse();
      vm.srTop5.maxZe = maxZe;

      maxZe = 0;
      for (var i=0; i<5; i++) {
         if(data.zcTop5List.length > 0){
            var item = data.zcTop5List[i];
            vm.zcTop5.districtList.push(item.DISTRICT_NAME);
            vm.zcTop5.zcList.push(item.ZCZE || 0);
            vm.zcTop5.growthList.push(item.RATE || 0);
            if (item.ZCZE && parseFloat(item.ZCZE) > maxZe) {
              maxZe = item.ZCZE;
            }
            $("#czzc-top5-ze-list div:eq(" + i + ")").text(item.ZCZE + " 万元");
             if(item.RATE < 0){
              $("#czzc-top5-growth-list div:eq(" + i + ")").text('↓'+item.RATE + "%");
              $("#czzc-top5-growth-list div:eq(" + i + ")").css('color','green')
            } else {
              $("#czzc-top5-growth-list div:eq(" + i + ")").text('↑'+item.RATE + "%");
            }
         }
        //$("#czzc-top5-growth-list div:eq(" + i + ")").text('↑'+item.RATE + "%");
      }
      if (data.zcTop5List.length < 5) {
        for (var i=data.zcTop5List.length; i<5; i++) {
          vm.zcTop5.districtList.push(null);
          vm.zcTop5.zcList.push(null);
          vm.zcTop5.growthList.push(null);
          $("#czzc-top5-ze-list div:eq(" + i + ")").text(" 万元");
          $("#czzc-top5-growth-list div:eq(" + i + ")").text("↑%");
        }
      }
      vm.zcTop5.districtList.reverse();
      vm.zcTop5.zcList.reverse();
      vm.zcTop5.growthList.reverse();
      vm.zcTop5.maxZe = maxZe;


      if (data.srgcData) {
        var srgcData = data.srgcData;
        if (srgcData.dfsssrze || srgcData.dffsssrze || srgcData.shzylssrze || srgcData.shzysdsze || srgcData.qtsrze) {
          vm.srgcData = [
            {name: '地方非税收\n收入总额', value: srgcData.dffsssrze || null, itemStyle: {normal: {color: '#394aa9'}}},
            {name: '地方税收\n收入总额', value: srgcData.dfsssrze || null, itemStyle: {normal: {color: '#cb64bb'}}},
            {name: '上划中央“两税”\n收入总额', value: srgcData.shzylssrze || null, itemStyle: {normal: {color: '#6c6fef'}}},
            {name: '上划中央\n所得税总额', value: srgcData.shzysdsze || null, itemStyle: {normal: {color: '#3295cf'}}},
            {name: '其他收入总额', value: srgcData.qtsrze || null, itemStyle: {normal: {color: '#FF9A01'}}}
          ];
          vm.srgcData.legend = [ '地方非税收\n收入总额','地方税收\n收入总额', '上划中央“两税”\n收入总额', '上划中央\n所得税总额', '其他收入总额'];
        }
      }
      if (!vm.srgcData) {
        vm.srgcData = [];
        vm.srgcData.legend = [];
      }

      var colorSize = colors.length;
      var zcgcDataList = data.zcgcDataList || [];
      vm.zcgcData.legend = {
        data: [],
        selected: {}
      };
      var sortArr = [];
      for (var i=0; i<zcgcDataList.length; i++) {
        sortArr.push(zcgcDataList[i].ZCZE);
      }
      sortArr.sort(function (x, y) {
            if (x < y) {
                return 1;
            }
            if (x > y) {
                return -1;
            }
            return 0;
        });
      var qiT = 0;
      for (var j = 0;j < zcgcDataList.length;j++) {
        for (var i=0; i<zcgcDataList.length; i++) {
          if(zcgcDataList[i].ZCZE == sortArr[j] && j < 11 && zcgcDataList[i].ZCLX_NAME!='其他'){
            var zcgcData = zcgcDataList[i];
            vm.zcgcData.push({
              name: zcgcData.ZCLX_NAME,
              value: zcgcData.ZCZE || 0,
              itemStyle:{
                normal:{
                  color:colors[j]
                }
              }
            });
            vm.zcgcData.legend.data.push(zcgcData.ZCLX_NAME);
            if (j >= 5) {
              vm.zcgcData.legend.selected[zcgcData.ZCLX_NAME] = false;
            }
          } else if(zcgcDataList[i].ZCZE == sortArr[j]) {
             qiT += zcgcDataList[i].ZCZE;
          }
        }
      }
      vm.zcgcData.push({
              name: '其他',
              value: qiT || 0,
              itemStyle:{
                normal:{
                  color:colors[12]
                }
              }
            });
      vm.zcgcData.legend.data.push('其他');
      vm.zcgcData.legend.selected['其他'] = false;


      var dataSize = vm.years.length;
//alert(dataSize);
      vm.srze = vm.srzcZeData.srzeList[dataSize-1];//alert(vm.srzcZeData.srzeList[dataSize-1]);
      vm.zcze = vm.srzcZeData.zczeList[dataSize-1];

      $('#czsrze-text').text(vm.srze);
      $('#czzcze-text').text(vm.zcze);

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
          data:["地方财政收入","地方财政收入增长率","","公共财政支出", "公共财政支出增长率"]
        },
        grid: {
          top: 55,
          left: 0,
          right: 10,
          bottom: 20,
          containLabel: true
        },
        xAxis : [
          {
            type : 'category',
            data : vm.years.slice(2, dataSize),
            axisTick: {
              show: false
            },
            splitLine: {
              textStyle: { color: 'white' },
              show: false
            },
            axisLine: {
              lineStyle:{
                color:'#7F7F7F'
              }
            },
            axisLabel: {textStyle:{ color: '#7F7F7F' }}
          }
        ],
        yAxis : [
          {
            type: 'value',
            name: '单位：万元',
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
          }, {
            type: 'value',
            name: '增长率：%',
            axisLabel: {
              formatter: '{value}',
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
            name:'地方财政收入',
            type:'bar',
            barMaxWidth:20,
            data:vm.srzcZeData.srzeList.slice(2, dataSize),
            itemStyle: {
              normal: {
                color: '#574fbe'
              }
            }
          },
          {
            name:'公共财政支出',
            type:'bar',
            barMaxWidth:20,
            data:vm.srzcZeData.zczeList.slice(2, dataSize),
            itemStyle: {
              normal: {
                color: '#0c6bd9'
              }
            }
          },
          {
            name: '地方财政收入增长率',
            type: 'line',
            yAxisIndex: 1,
            data: vm.srzcZeData.srzeGrowthList.slice(2, dataSize),
            itemStyle: {
              normal: {
                color: '#10BD5E'
              }
            }
          },
          {
            name: '公共财政支出增长率',
            type: 'line',
            yAxisIndex: 1,
            data: vm.srzcZeData.zczeGrowthList.slice(2, dataSize),
            itemStyle: {
              normal: {
                color: '#FF9800'
              }
            }
          }
        ]
      };
    }

    function getOption23(optionIdx) {
      var districtList = null;
      var zeList = null;
      var growthList = null;
      var maxZe = 0;
      if (optionIdx == 2) {
        districtList = vm.srTop5.districtList;
        zeList = vm.srTop5.srList;
        growthList = vm.srTop5.growthList;
        maxZe = vm.srTop5.maxZe;
      } else {
        districtList = vm.zcTop5.districtList;
        zeList = vm.zcTop5.zcList;
        growthList = vm.zcTop5.growthList;
        maxZe = vm.zcTop5.maxZe;
      }
      var maxZeList = [];
      for (var i=0; i<zeList.length; i++) {
        maxZeList.push(maxZe);
      }
      return {
        color: ['#0C6BD9'],
        calculable: true,
        grid: {
          top: 10,
          left: 35,
          right: 160,
          bottom: -10,
          containLabel: true
        },
        xAxis: [{
          type: "value",
          boundaryGap: [0, 0],
          show: false,
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          }

        }],
        yAxis: [{
          type: "category",
          data: districtList,
          offset:5,
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        }
        ],
        series: [
          {
            type: "bar",
            silent: true,
            itemStyle: {
              normal: {
                color: '#f5f5f5'
              }
            },
            barWidth: 16,
            barGap: 0,
            data: maxZeList
          }
          ,{
            type: "bar",
            barWidth: 16,
            barGap: -1,
            z: 10,
            tooltip:{
              show:false
            },
            data: zeList
          }
        ]
      };
    }

    function getOption4() {
      return {
        tooltip : {
          trigger: 'item',
          formatter: function (params) {
           return  params.seriesName + '<br/>' + params.name.replace(/\s/g,'')+'：'+ params.value+'万元 ('+params.percent+'%)';
          }
        },
        legend: {
          right : 20,
          y : 'center',
          align: 'right',
          orient: 'vertical',
          data:vm.srgcData.legend.slice(0,2)
        },
        calculable : true,
        series : [
          {
            name:'地方财政收入构成',
            type:'pie',
            radius : [20, 110],
            center : ['38%', '50%'],
            roseType : 'area',
            label: {
              normal: {
                show: true,
                formatter: "{d}%"
              }
            },
            lableLine: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
              }
            },
            data:vm.srgcData.slice(0,2)
          }
        ]
      };
    }

    function getOption5() {
      return {
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c}万元 ({d}%)"
        },
        legend: {
          right : 20,
          itemGap:3,
          y : 'center',
          align: 'right',
          orient: 'vertical',
          data:vm.zcgcData.legend.data,
          selected:vm.zcgcData.legend.selected
        },
        calculable : true,
        series : [
          {
            name:'公共财政支出构成',
            type:'pie',
            radius : [20, 110],
            center : ['38%', '50%'],
            roseType : 'area',
            label: {
              normal: {
                show: true,
                formatter: "{d}%"
              }
            },
            lableLine: {
              normal: {
                show: true
              }
            },
            data:vm.zcgcData
          }
        ]
      };
    }

    $(document).ready(function() {
      $("#echart23-tabs .box-tab-title").click(function() {
        var self = $(this);
        if (self.hasClass("active")) {
          return;
        } else {
          $("#echart23-tabs .active").each(function() {
            $(this).removeClass("active");
          });
          var idx = self.attr("idx");
          if (idx == "2") {
            $("#czsr-top5-ze-list").show();
            $("#czsr-top5-growth-list").show();
            $("#czzc-top5-ze-list").hide();
            $("#czzc-top5-growth-list").hide();
          } else {
            $("#czsr-top5-ze-list").hide();
            $("#czsr-top5-growth-list").hide();
            $("#czzc-top5-ze-list").show();
            $("#czzc-top5-growth-list").show();
          }
          var ins = echarts.getInstanceByDom(document.getElementById("echart-2"));
          ins.clear();
          ins.setOption(getOption23(idx));
          self.addClass("active");
        }
      });
    });

    function renderData() {
      vm.ecOption1 = getOption1();
      vm.ecOption2 = getOption23(2);
      vm.ecOption3 = getOption23(3);
      vm.ecOption4 = getOption4();
      vm.ecOption5 = getOption5();

      vm.ecConfig1.dataLoaded = true;
      vm.ecConfig2.dataLoaded = true;
      vm.ecConfig4.dataLoaded = true;
      vm.ecConfig5.dataLoaded = true;
    }

    var chart1Ins = null;
    var chart4Ins = null;
    var chart5Ins = null;

    $(window).resize(function() {
      if (chart1Ins == null) {
        chart1Ins = echarts.getInstanceByDom(document.getElementById("echart-1"));
      }
      if (chart4Ins == null) {
        chart4Ins = echarts.getInstanceByDom(document.getElementById("echart-4"));
      }
      if (chart5Ins == null) {
        chart5Ins = echarts.getInstanceByDom(document.getElementById("echart-5"));
      }
      if (chart1Ins) chart1Ins.resize();
      if (chart4Ins) chart4Ins.resize();
      if (chart5Ins) chart5Ins.resize();
    });
  }
})();


