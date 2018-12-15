$(document).ready(function() {

    var isDebug = true;

    function log(msg) {
      if (console && console.log && isDebug) {
        console.log(msg);
      }
    }

    var vm = {};

    function loadStatData(url, successCallback, errorCallback) {
    	var json = '{"ret":"0","data":{"srgcData":{"createBy":null,"createDate":null,"datePeriod":"2016","datePeriodType":1,"dffsssrze":824.27,"dfsssrze":1438.52,"districtNo":null,"qtsrze":925.54,"shzylssrze":875,"shzysdsze":704.67,"updateBy":null,"updateDate":null,"districtName":null,"districtNameList":null},"srzcZeDataList":[{"districtNo":null,"districtName":null,"datePeriod":"2011","datePeriodType":null,"srze":2523.49,"zcze":3520.76,"srGrowthRate":null,"zcGrowthRate":null,"czSrStatResult":null,"czZcStatResult":null},{"districtNo":null,"districtName":null,"datePeriod":"2012","datePeriodType":null,"srze":2937.95,"zcze":4119,"srGrowthRate":null,"zcGrowthRate":null,"czSrStatResult":null,"czZcStatResult":null},{"districtNo":null,"districtName":null,"datePeriod":"2013","datePeriodType":null,"srze":3315.02,"zcze":4690.89,"srGrowthRate":null,"zcGrowthRate":null,"czSrStatResult":null,"czZcStatResult":null},{"districtNo":null,"districtName":null,"datePeriod":"2014","datePeriodType":null,"srze":3636.07,"zcze":5017.38,"srGrowthRate":null,"zcGrowthRate":null,"czSrStatResult":null,"czZcStatResult":null},{"districtNo":null,"districtName":null,"datePeriod":"2015","datePeriodType":null,"srze":4158.58,"zcze":5578.54,"srGrowthRate":null,"zcGrowthRate":null,"czSrStatResult":null,"czZcStatResult":null},{"districtNo":null,"districtName":null,"datePeriod":"2016","datePeriodType":null,"srze":4252.1,"zcze":6337.0,"srGrowthRate":null,"zcGrowthRate":null,"czSrStatResult":null,"czZcStatResult":null}],"srTop5List":[{"DISTRICT_NAME":"长沙市","DATE_PERIOD":"2016","RATE":10.6,"DISTRICT_NO":100,"ZE":102.28},{"DISTRICT_NAME":"衡阳市","DATE_PERIOD":"2016","RATE":9.65,"DISTRICT_NO":103,"ZE":21.35},{"DISTRICT_NAME":"郴州市","DATE_PERIOD":"2016","RATE":8.47,"DISTRICT_NO":104,"ZE":21.17},{"DISTRICT_NAME":"株洲市","DATE_PERIOD":"2016","RATE":9.64,"DISTRICT_NO":101,"ZE":18.74},{"DISTRICT_NAME":"常德市","DATE_PERIOD":"2016","RATE":8.78,"DISTRICT_NO":102,"ZE":14.49}],"zcgcDataList":[{"DATE_PERIOD":"2016","DATE_PERIOD_TYPE":1,"ZCLX_NAME":"一般公共服务","ZCLX":1,"ZCZE":62.85},{"DATE_PERIOD":"2016","DATE_PERIOD_TYPE":1,"ZCLX_NAME":"外交、国防、公共安全","ZCLX":2,"ZCZE":28.47},{"DATE_PERIOD":"2016","DATE_PERIOD_TYPE":1,"ZCLX_NAME":"教育","ZCLX":3,"ZCZE":98.47},{"DATE_PERIOD":"2016","DATE_PERIOD_TYPE":1,"ZCLX_NAME":"科学技术","ZCLX":4,"ZCZE":55.46},{"DATE_PERIOD":"2016","DATE_PERIOD_TYPE":1,"ZCLX_NAME":"文化体育与传媒","ZCLX":5,"ZCZE":68.95},{"DATE_PERIOD":"2016","DATE_PERIOD_TYPE":1,"ZCLX_NAME":"社会保障和就业","ZCLX":6,"ZCZE":62.59},{"DATE_PERIOD":"2016","DATE_PERIOD_TYPE":1,"ZCLX_NAME":"医疗卫生","ZCLX":7,"ZCZE":34.25}],"zcTop5List":[{"DISTRICT_NAME":"长沙市","RATE":9.54,"DISTRICT_NO":100,"ZCZE":80.24},{"DISTRICT_NAME":"衡阳市","RATE":8.47,"DISTRICT_NO":102,"ZCZE":41.3},{"DISTRICT_NAME":"常德市","RATE":8.44,"DISTRICT_NO":101,"ZCZE":36.28},{"DISTRICT_NAME":"郴州市","RATE":7.86,"DISTRICT_NO":101,"ZCZE":35.16},{"DISTRICT_NAME":"邵阳市","RATE":6.44,"DISTRICT_NO":101,"ZCZE":34.64}],"years":["2011","2012","2013","2014","2015","2016"]}}';
		var data = JSON.parse(json);
		successCallback(data.data);
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

    function getGrowth(val1, val2) {
      if (!val1 || !val2) {
        return null;
      } else {
        val1 = parseFloat(val1);
        val2 = parseFloat(val2);
        var growth = ((val2 - val1) / val1 * 100).toFixed(2);
        return Math.abs(growth);
      }
    }

    var colors = ['#9B29B0','#5650BD','#0C6BD8','#2198F2','#0FBE5C',
                  '#80C500','#FFCA27','#FF9A01','#D32B3D','#E91F63'];

    loadStatData('leader/govfinance/ztfx', function(data) {
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

        var srGrowth = getGrowth(vm.srzcZeData.srzeList[i-1], vm.srzcZeData.srzeList[i]);
        var zcGrowth = getGrowth(vm.srzcZeData.zczeList[i-1], vm.srzcZeData.zczeList[i]);
        vm.srzcZeData.srzeGrowthList.push(srGrowth);
        vm.srzcZeData.zczeGrowthList.push(zcGrowth);
      }

      // 市州排行
      var maxZe = 0;
      for (var i=0; i<data.srTop5List.length; i++) {
        var item = data.srTop5List[i];
        vm.srTop5.districtList.push(item.DISTRICT_NAME);
        vm.srTop5.srList.push(item.ZE || 0);
        vm.srTop5.growthList.push(item.RATE || 0);
        if (item.ZE && parseFloat(item.ZE) > maxZe) {
          maxZe = item.ZE;
        }
        $("#czsr-top5-ze-list div:eq(" + i + ")").text(item.ZE + " 亿元");
        $("#czsr-top5-growth-list div:eq(" + i + ")").text(item.RATE + "%↑");
      }
      if (data.srTop5List.length < 5) {
        for (var i=data.srTop5List.length; i<5; i++) {
          vm.srTop5.districtList.push(null);
          vm.srTop5.srList.push(null);
          vm.srTop5.growthList.push(null);
          $("#czsr-top5-ze-list div:eq(" + i + ")").text(" 亿元");
          $("#czsr-top5-growth-list div:eq(" + i + ")").text("%↑");
        }
      }
      vm.srTop5.districtList.reverse();
      vm.srTop5.srList.reverse();
      vm.srTop5.growthList.reverse();
      vm.srTop5.maxZe = maxZe;

      maxZe = 0;
      for (var i=0; i<data.zcTop5List.length; i++) {
        var item = data.zcTop5List[i];
        vm.zcTop5.districtList.push(item.DISTRICT_NAME);
        vm.zcTop5.zcList.push(item.ZCZE || 0);
        vm.zcTop5.growthList.push(item.RATE || 0);
        if (item.ZCZE && parseFloat(item.ZCZE) > maxZe) {
          maxZe = item.ZCZE;
        }
        $("#czzc-top5-ze-list div:eq(" + i + ")").text(item.ZCZE + " 亿元");
        $("#czzc-top5-growth-list div:eq(" + i + ")").text(item.RATE + "%↑");
      }
      if (data.zcTop5List.length < 5) {
        for (var i=data.zcTop5List.length; i<5; i++) {
          vm.zcTop5.districtList.push(null);
          vm.zcTop5.zcList.push(null);
          vm.zcTop5.growthList.push(null);
          $("#czzc-top5-ze-list div:eq(" + i + ")").text(" 亿元");
          $("#czzc-top5-growth-list div:eq(" + i + ")").text("%↑");
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
            {name: '地方税收\n收入总额', value: srgcData.dfsssrze || null, itemStyle: {normal: {color: '#FFCA27'}}},
            {name: '地方非税收\n收入总额', value: srgcData.dffsssrze || null, itemStyle: {normal: {color: '#2198F2'}}},
            {name: '上划中央“两税”\n收入总额', value: srgcData.shzylssrze || null, itemStyle: {normal: {color: '#0C6BD8'}}},
            {name: '上划中央\n所得税总额', value: srgcData.shzysdsze || null, itemStyle: {normal: {color: '#5650BD'}}},
            {name: '其他收入总额', value: srgcData.qtsrze || null, itemStyle: {normal: {color: '#FF9A01'}}}
          ];
          vm.srgcData.legend = ['地方税收\n收入总额', '地方非税收\n收入总额', '上划中央“两税”\n收入总额', '上划中央\n所得税总额', '其他收入总额'];
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
      for (var i=0; i<zcgcDataList.length; i++) {
        var zcgcData = zcgcDataList[i];
        vm.zcgcData.push({
          name: zcgcData.ZCLX_NAME,
          value: zcgcData.ZCZE || 0,
          itemStyle:{
            normal:{
              color:colors[i % colorSize]
            }
          }
        });
        vm.zcgcData.legend.data.push(zcgcData.ZCLX_NAME);
        if (i >= 5) {
          vm.zcgcData.legend.selected[zcgcData.ZCLX_NAME] = false;
        }
      }

      var dataSize = vm.years.length;

      vm.srze = vm.srzcZeData.srzeList[dataSize];
      vm.zcze = vm.srzcZeData.zczeList[dataSize];

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
          data:["财政收入", "财政支出", "财政收入增长率", "财政支出增长率"]
        },
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
            data : vm.years.slice(1, dataSize),
            splitLine: {
              show: false
            }/*,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }*/
          }
        ],
        yAxis : [
          {
            type: 'value',
            name: '　　单位：亿元',
            axisLabel: {
              formatter: '{value}'
            },
            splitLine: {
              show: false
            }/*,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }*/
          }, {
            type: 'value',
            name: '增长率：%　　',
            axisLabel: {
              formatter: '{value} %'
            },
            splitLine: {
              show: false
            }/*,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }*/
          }
        ],
        series : [
          {
            name:'财政收入',
            type:'bar',
            data:vm.srzcZeData.srzeList.slice(1, dataSize),
            itemStyle: {
              normal: {
                color: '#FFCA27'
              }
            }
          },
          {
            name:'财政支出',
            type:'bar',
            data:vm.srzcZeData.zczeList.slice(1, dataSize),
            itemStyle: {
              normal: {
                color: '#5650BD'
              }
            }
          },
          {
            name: '财政收入增长率',
            type: 'line',
            yAxisIndex: 1,
            data: vm.srzcZeData.srzeGrowthList.slice(1, dataSize),
            itemStyle: {
              normal: {
                color: '#FF9800'
              }
            }
          },
          {
            name: '财政支出增长率',
            type: 'line',
            yAxisIndex: 1,
            data: vm.srzcZeData.zczeGrowthList.slice(1, dataSize),
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
          right: 130,
          bottom: -10,
          containLabel: true
        },
        xAxis: [{
          type: "value",
          boundaryGap: [0, 0],
          show: false,
          splitLine: {
            show: false
          },
          axisLine: {
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
          splitLine: {
            show: false
          },
          axisLine: {
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
                color: '#e1e1e1'
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
            itemStyle: {
              normal: {
                color: '#0C6BD8'
              }
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
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          right : 20,
          y : 'center',
          align: 'right',
          orient: 'vertical',
          data:vm.srgcData.legend
        },
        calculable : true,
        series : [
          {
            name:'财政收入构成',
            type:'pie',
            radius : [20, 110],
            center : ['38%', '50%'],
            roseType : 'area',
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
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
            data:vm.srgcData
          }
        ]
      };
    }

    function getOption5() {
      return {
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          right : 20,
          y : 'center',
          align: 'right',
          orient: 'vertical',
          data:vm.zcgcData.legend.data,
          selected:vm.zcgcData.legend.selected
        },
        calculable : true,
        series : [
          {
            name:'财政支出构成',
            type:'pie',
            radius : [20, 110],
            center : ['38%', '50%'],
            roseType : 'area',
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
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
            data:vm.zcgcData
          }
        ]
      };
    }

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
          var option = getOption23(idx);
          log(option);
          ins.setOption(option);
          self.addClass("active");
        }
    });

    var chart1Ins = null;
    var chart2Ins = null;
    var chart3Ins = null;
    var chart4Ins = null;
    var chart5Ins = null;

    function renderData() {
      vm.ecOption1 = getOption1();
      vm.ecOption2 = getOption23(2);
      vm.ecOption3 = getOption23(3);
      vm.ecOption4 = getOption4();
      vm.ecOption5 = getOption5();

      chart1Ins = echarts.init(document.getElementById("echart-1"));
      chart1Ins.setOption(vm.ecOption1);
      chart2Ins = echarts.init(document.getElementById("echart-2"));
      chart2Ins.setOption(vm.ecOption2);
      //chart3Ins = echarts.init(document.getElementById("echart-3"));
      chart4Ins = echarts.init(document.getElementById("echart-4"));
      chart4Ins.setOption(vm.ecOption4);
      chart5Ins = echarts.init(document.getElementById("echart-5"));
      chart5Ins.setOption(vm.ecOption5);
    }

    

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
});
