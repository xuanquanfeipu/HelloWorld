/**
 * 领导桌面-财政收入分析
 */
(function () {
  'use strict';

  $(".content-wrapper .container").removeClass("container").addClass("container-fluid");

  var isDebug = false;

  function log(msg) {
    if (console && console.log && isDebug) {
      console.log(msg);
    }
  }

  angular
    .module('smartCore')
    .controller('LdzmTopicIndJmsrfxZtfxController', LdzmTopicIndJmsrfxZtfxController);

  /** @ngInject */
  function LdzmTopicIndJmsrfxZtfxController($http, devUrl, CommService,latestYear) {
    var vm = this;
    var myDate = new Date();
    var curYear=latestYear-1;
    vm.lastYear = curYear + '年';
    vm.title = "领导桌面-居民收入分析-总体居民收支分析";
    vm.breadcrumbs = [
      {title: '领导桌面', link: '/#/ldzm', icon: 'home'},
      {title: '居民收入分析', link: '/#/ldzm/jmsrfx/ztfx', icon: 'book'},
      {title: '总体居民收支分析', link: '/#/ldzm/jmsrfx/ztfx', icon: 'file'}
    ];

    //图1
    vm.ecConfig1 = {
      theme: 'Donut',
      dataLoaded: false
    };
    vm.ecConfig2 = {
      theme: 'Donut',
      dataLoaded: false
    };
    vm.ecConfig4 = {
      theme: 'Donut',
      dataLoaded: false
    };

    vm.ecOption1 = {};
    vm.ecOption2 = {};
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
        while (dataList.curIdx < dataList.length && year > dataList[dataList.curIdx].DATE_PERIOD) {
          dataList.curIdx++;
        }
      }
      if (dataList && dataList.curIdx < dataList.length && year == dataList[dataList.curIdx].DATE_PERIOD) {
        var dataItem = dataList[dataList.curIdx];
        for (var i=0; i<propList.length; i++) {
          indicator[propList[i][1] + 'List'].push(dataItem[propList[i][0]]);
        }
      } else {
        for (var i=0; i<propList.length; i++) {
          indicator[propList[i][1] + 'List'].push(null);
        }
      }
    }

    loadStatData(devUrl + 'leader/residents/ztfx', function(data) {
      var startTime = new Date().getTime();
      vm.srzcData = {
        srList: [],
        zcList: [],
        srGrowthList: [],
        zcGrowthList: []
      };
      vm.xflxData = {
        czjmSr: [],
        ncjmSr: [],
        max: 0
      };
      vm.srTop5 = {
        districtList: [],
        srList: [],
        growthList: [],
        max: 0
      };
      vm.zcTop5 = {
        districtList: [],
        zcList: [],
        growthList: [],
        max: 0
      };
      vm.rjsr = 0;
      vm.rjxf = 0;
      vm.dqfx = {
        // cztSr: null,
        // dthSr: null,
        // xxSr: null,
        // xnSr: null
      }

      vm.years = data.years;

      data.srzcDataList.curIdx = 0;

      for (var i=0; i<vm.years.length; i++) {
        var year = vm.years[i];

        parseDataWithYear(data.srzcDataList, year, vm.srzcData, [['INCOME', 'sr'], ['CONSUME_AMOUNT','zc']]);

        var srGrowth = CommService.getGrowth(vm.srzcData.srList[i-1], vm.srzcData.srList[i]);
        var zcGrowth = CommService.getGrowth(vm.srzcData.zcList[i-1], vm.srzcData.zcList[i]);
        vm.srzcData.srGrowthList.push(srGrowth);
        vm.srzcData.zcGrowthList.push(zcGrowth);
      }
      vm.rjsr = vm.srzcData.srList[vm.srzcData.srList.length - 1];
      vm.rjxf = vm.srzcData.zcList[vm.srzcData.zcList.length - 1];
      $("#rjsr").text(vm.rjsr);
      $("#rjxf").text(vm.rjxf);

      var maxXfje = 0;
      var czjmSr=[];
      var ncjmSr=[];
      for (var i=0; i<data.xzsr.length; i++) {
        var item = data.xzsr[i];
        console.log(item);
        if(item.RESIDENT_TYPE==1){
          console.log(1);
          vm.xflxData.czjmSr.push(item.NET_OPERATING_INCOME);
          vm.xflxData.czjmSr.push(item.NET_PROPERTY_INCOME);
          vm.xflxData.czjmSr.push(item.NET_TRANSFER_INCOME);
          vm.xflxData.czjmSr.push(item.WAGE_INCOME);
        }else if(item.RESIDENT_TYPE==2){
          vm.xflxData.ncjmSr.push(item.NET_OPERATING_INCOME);
          vm.xflxData.ncjmSr.push(item.NET_PROPERTY_INCOME);
          vm.xflxData.ncjmSr.push(item.NET_TRANSFER_INCOME);
          vm.xflxData.ncjmSr.push(item.WAGE_INCOME);
        }
        // if(item.CONSUME_NAME.length > 3){
        //   vm.xflxData.xflxList.push(item['CONSUME_NAME'].substring(0,3)+"\n"+item['CONSUME_NAME'].substring(3));
        // }else{
        //   vm.xflxData.xflxList.push(item && item['CONSUME_NAME']);
        // }
        // vm.xflxData.xfjeList.push(item && item['CONSUME_AMOUNT']);
        // var xfje = item && item['CONSUME_AMOUNT'];
        // if (xfje > maxXfje) {
        //   maxXfje = xfje;
        // }
      }
      // vm.xflxData.max = maxXfje;

      // 市州排行
      var maxZe = 0;
      for (var i=0; i<data.jmzcTop5.length; i++) {
        if(i==5){
          break;
        }
        var item = data.jmzcTop5[i];
        vm.zcTop5.districtList.push(item.DISTRICT_NAME);
        vm.zcTop5.zcList.push(item.AVG_INCOME || 0);
        vm.zcTop5.growthList.push(item.GROWTH || 0);
        if (item.AVG_INCOME && parseFloat(item.AVG_INCOME) > maxZe) {
          maxZe = item.AVG_INCOME;
        }
        $("#jmsr-top5-ze-list div:eq(" + i + ")").text(item.AVG_INCOME + " 元");
        $("#jmsr-top5-growth-list div:eq(" + i + ")").text(item.GROWTH + "%↑");
      }
      // for(var i=0; i<data.jmzcTop5.length; i++) {
      //   if(i==5){
      //     break;
      //   }
      //     vm.zcTop5.districtList.push(null);
      //     vm.zcTop5.zcList.push(null);
      //     vm.zcTop5.growthList.push(null);
      //     $("#jmsr-top5-ze-list div:eq(" + i + ")").text(" 元");
      //     $("#jmsr-top5-growth-list div:eq(" + i + ")").text("%↑");
      //
      // }
      vm.zcTop5.districtList.reverse();
      vm.zcTop5.zcList.reverse();
      vm.zcTop5.growthList.reverse();
      vm.zcTop5.max = maxZe;

      maxZe = 0;
      for (var i=0; i<data.jmsrTop5.length; i++) {
        if(i==5){
          break;
        }
        var item = data.jmsrTop5[i];
        vm.srTop5.districtList.push(item.DISTRICT_NAME);
        vm.srTop5.srList.push(item.AVG_INCOME || 0);
        vm.srTop5.growthList.push(item.GROWTH || 0);
        if (item.AVG_INCOME && parseFloat(item.AVG_INCOME) > maxZe) {
          maxZe = item.AVG_INCOME;
        }
        $("#jmxf-top5-ze-list div:eq(" + i + ")").text(item.AVG_INCOME + " 元");
        $("#jmxf-top5-growth-list div:eq(" + i + ")").text(item.GROWTH + "%↑");
      }
      // for (var i=0; i<data.jmsrTop5.length; i++) {
      //   if(i==5){
      //     break;
      //   }
      //     vm.srTop5.districtList.push(null);
      //     vm.srTop5.srList.push(null);
      //     vm.srTop5.growthList.push(null);
      //     $("#jmxf-top5-ze-list div:eq(" + i + ")").text(" 元");
      //     $("#jmxf-top5-growth-list div:eq(" + i + ")").text("%↑");
      //
      // }
      vm.srTop5.districtList.reverse();
      vm.srTop5.srList.reverse();
      vm.srTop5.growthList.reverse();
      vm.srTop5.max = maxZe;

      // 区域收入
      vm.dqfx = data.dqfx;
      for(var i in vm.dqfx){
        // console.log(1);
        if(vm.dqfx[i].AREA_NO == 1){
          $('#jmsr-czt').text((vm.dqfx[i] && vm.dqfx[i].AVG_INCOME) || "");
          $('#jmsrzs-czt').text((vm.dqfx[i] && vm.dqfx[i].AVG_ZZL &&  vm.dqfx[i].AVG_ZZL+'%') || "");
        }else if(vm.dqfx[i].AREA_NO == 2){
          $('#jmsr-dxx').text((vm.dqfx[i] && vm.dqfx[i].AVG_INCOME) || "");
          $('#jmsrzs-dxx').text((vm.dqfx[i] && vm.dqfx[i].AVG_ZZL && vm.dqfx[i].AVG_ZZL+'%') || "");
        }else if(vm.dqfx[i].AREA_NO == 3){
          $('#jmsr-xn').text((vm.dqfx[i] && vm.dqfx[i].AVG_INCOME) || "");
          $('#jmsrzs-xn').text((vm.dqfx[i] && vm.dqfx[i].AVG_ZZL && vm.dqfx[i].AVG_ZZL+'%') || "");
        }else{
          $('#jmsr-dth').text((vm.dqfx[i] && vm.dqfx[i].AVG_INCOME) || "");
          $('#jmsrzs-dth').text((vm.dqfx[i] && vm.dqfx[i].AVG_ZZL && vm.dqfx[i].AVG_ZZL+'%') || "");
        }
      }

      var dataSize = vm.years.length;

      vm.srze = vm.srzcData.srList[dataSize];
      vm.zcze = vm.srzcData.zcList[dataSize];

      $('#jmsrze-text').text(vm.srze);
      $('#jmxfze-text').text(vm.zcze);

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
          y:'23',
          data:["居民人均可支配收入", "居民人均消费支出", "居民人均可支配收入增长率", "居民人均消费支出增长率"]
        },
        grid: {
          top: 55,
          left: 15,
          right: 15,
          bottom: 20,
          containLabel: true
        },
        xAxis : [
          {
            type : 'category',
            data : vm.years.slice(1, dataSize),
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
            name: '　　单位：元',
            min: 0,
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
            name: '增长率：%　　',
            min: 0,
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
            name:'居民人均可支配收入',
            type:'bar',
            barMaxWidth:20,
            data:vm.srzcData.srList.slice(1, dataSize),
            itemStyle: {
              normal: {
                color: '#574fbe'
              }
            }
          },
          {
            name:'居民人均消费支出',
            type:'bar',
            barMaxWidth:20,
            data:vm.srzcData.zcList.slice(1, dataSize),
            itemStyle: {
              normal: {
                color: '#0c6bd9'
              }
            }
          },
          {
            name: '居民人均可支配收入增长率',
            type: 'line',
            yAxisIndex: 1,
            data: vm.srzcData.srGrowthList.slice(1, dataSize),
            itemStyle: {
              normal: {
                color: '#FF9800'
              }
            }
          },
          {
            name: '居民人均消费支出增长率',
            type: 'line',
            yAxisIndex: 1,
            data: vm.srzcData.zcGrowthList.slice(1, dataSize),
            itemStyle: {
              normal: {
                color: '#10BD5E'
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
        districtList = vm.zcTop5.districtList;
        zeList = vm.zcTop5.zcList;
        growthList = vm.zcTop5.growthList;
        maxZe = vm.zcTop5.max;
      } else {
        districtList = vm.srTop5.districtList;
        zeList = vm.srTop5.srList;
        growthList = vm.srTop5.growthList;
        maxZe = vm.srTop5.max;
      }
      // console.log(zeList);
      var maxZeList = [];
      for (var i=0; i<zeList.length; i++) {
        maxZeList.push(maxZe);
      }
      return {
        color: ['#0C6BD9'],
        calculable: true,
        grid: {
          top:'5%',
          left: '3%',
          right: '35%',
          bottom: '5%',
          y2:0,
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
            barMaxWidth:20,
            barGap: 0,
            data: maxZeList
          }
          ,{
            type: "bar",
            barMaxWidth:20,
            barGap: -1,
            z: 10,
            itemStyle: {
              normal: {
                color: '#0C6BD8'
              }
            },
            tooltip:{
              show:false
            },
            data: zeList
          }
        ]
      };
    }

    function getOption4() {
      // var dataSize = vm.xflxData.xfjeList.length;
      // var maxZeList = [];
      // for (var i=0; i<dataSize; i++) {
      //   maxZeList.push(vm.xflxData.max);
      // }
      return {
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data:['城镇','农村']
        },
        color:['#137ebd','#cb64bb'],
        grid: {
          top: 55,
          left: 35,
          right: 35,
          bottom: 20,
          containLabel: true
        },
        xAxis : [
          {
            type : 'category',
            data : ['经营净收入','财产净收入','转移净收入','工资性收入'],
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
            type: 'value',
            name: '单位：元',
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
            },
            axisLabel: {textStyle:{ color: '#7F7F7F' }}
          }
        ],
        series: [
          {
            type: "bar",
            name:'城镇',
            silent: true,
            barMaxWidth:20,
            // itemStyle: {
            //   normal: {
            //     color: '#ddd'
            //   }
            // },
            // barGap: 0,
            data: vm.xflxData.czjmSr
          },
          {
            type: "bar",
            name:'农村',
            barMaxWidth:20,
            // barGap: -1,
            z: 10,
            data: vm.xflxData.ncjmSr
          }
        ]
      };
    }

    //城镇可支配收入top5切换
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
            $("#jmsr-top5-ze-list").show();
            $("#jmsr-top5-growth-list").show();
            $("#jmxf-top5-ze-list").hide();
            $("#jmxf-top5-growth-list").hide();
          } else {
            $("#jmsr-top5-ze-list").hide();
            $("#jmsr-top5-growth-list").hide();
            $("#jmxf-top5-ze-list").show();
            $("#jmxf-top5-growth-list").show();
          }
          var ins = echarts.getInstanceByDom(document.getElementById("echart-2"));
          ins.clear();
          ins.setOption(getOption23(idx));
          self.addClass("active");
        }
      });
    });

    function renderData() {
      vm.ecOption1 = getOption1();  log("option1:"); log(vm.ecOption1);
      vm.ecOption2 = getOption23(2);  log("option2:"); log(vm.ecOption2);
      vm.ecOption4 = getOption4();  log("option4:"); log(vm.ecOption4);

      vm.ecConfig1.dataLoaded = true;
      vm.ecConfig2.dataLoaded = true;
      vm.ecConfig4.dataLoaded = true;
    }

    var chart1Ins = null;
    var chart4Ins = null;

    $(window).resize(function() {
      if (chart1Ins == null) {
        chart1Ins = echarts.getInstanceByDom(document.getElementById("echart-1"));
      }
      if (chart4Ins == null) {
        chart4Ins = echarts.getInstanceByDom(document.getElementById("echart-4"));
      }
      if (chart1Ins) chart1Ins.resize();
      if (chart4Ins) chart4Ins.resize();
    });

    //

  }
})();


