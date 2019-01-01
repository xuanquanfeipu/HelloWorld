/**
 * Created by 6005001630 on 2017/10/9.
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('ZblsZtfxController', ZblsZtfxController);

  /** @ngInject */
  function ZblsZtfxController($scope, $http, devUrl, SweetAlert, CommService,latestYear) {
    var vm = this;
    var myDate = new Date();
    var curYear=parseInt(latestYear)+1;
    vm.lastYear = curYear + '年12';
    vm.lastYear1 = curYear + '年12';
    vm.province = '湖南省';
    vm.pieDataCount = 0;
    vm.provinceScale = 0;
    var xData = [];//X轴的数据
    var xData01 = [];//X轴的数据
    var xData02 = [];//X轴的数据
    var xData03 = [];//X轴的数据
    var xData04 = [];//X轴的数据
    var gdpData = [];//GDP增速
    var gdpDataMax = [];//GDP增速最大值
    var jckData = [];//进出口数据
    var jkData = [];//进口数据
    var ckData = [];//进口数据
    var gmgyzjzzsData = [];//规模工业增加值增速数据
    var gmgyzjzzsDataMax = [];//规模工业最大值
    var gdzctzjdzData = [];//固定资产投资绝对值数据
    var shxfplszezsData = [];//社会消费品零售总额增速数据
    var shxfplszezsDataMax = [];//社会消费品零售总额增速数据最大值
    var czsrData = [];//财政收入数据
    var czsrzsData = [];//财政收入增速数据
    var jgzsData = [];//价格指数数据
    vm.tabNub = 1;
    $('#liyear1').show();
    vm.tabClick = function(numb){
      if(numb == 2){
          vm.tabNub = 2;
          $('#activeTab2').addClass('active');
          $('#activeTab1').removeClass('active');
          $('#echarts7').hide();
          $('#echarts5').show();
          $('#liyear1').hide();
          $('#liyear2').show();
        } else{
          vm.tabNub = 1;
          $('#activeTab1').addClass('active');
          $('#activeTab2').removeClass('active');
          $('#liyear2').hide();
          $('#liyear1').show();
          $('#echarts5').hide();
          $('#echarts7').show();
        }
    }
     //计时器部分
    vm.initTimeClock = function(){
      var widthDiv = $('#banner01').width();
      //var oimg = document.querySelectorAll('#tab_con aside');//获取aside元素
      var oli =  document.querySelectorAll('#banner01 #zblsTab div');//获取li
      var banner = document.getElementById('banner01');//获取盒子
      var timer = null;
      $('#echarts7').width(widthDiv);
      $('#echarts5').width(widthDiv);
      banner.onmouseover = function(){
        clearInterval(timer);           //移入停止计时器
      };
      banner.onmouseout = function(){
        timer = setInterval(auto,3500); //移出启动计时器
      };
      timer = setInterval(auto,3500);
      function auto(){
        if(vm.tabNub ==1){
          vm.tabNub = 2;
          $('#activeTab2').addClass('active');
          $('#activeTab1').removeClass('active');
          $('#echarts7').hide();
          $('#echarts5').show();
          $('#liyear1').hide();
          $('#liyear2').show();
        } else{
          vm.tabNub = 1;
          $('#activeTab1').addClass('active');
          $('#activeTab2').removeClass('active');
          $('#echarts5').hide();
          $('#echarts7').show();
          $('#liyear2').hide();
          $('#liyear1').show();
        }
      }
    };
    var widthW = $(body).width();
    vm.loadBarChart1 = function($http, devUrl){
      vm.barConfig1 = {
        theme: 'Donut',
        dataLoaded: false
      };
      vm.barOption1 = {
        tooltip: {
          show:false
        },
        grid: {
          left: '3%',
          right: '10%',
          bottom: '0',
          y:10,
          y2:0,
          containLabel: true
        },
        xAxis: [{
           type: 'value',
            axisLabel: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            }
        }],
        yAxis: [{
          type: 'category',
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#000000'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            data:xData02
        }],
        series: [{
            name: 'GDP增速',
            type: 'bar',
            z: 0,
            silent: true,
            barGap: '-100%',
            //barCategoryGap: '50%',
            barMaxWidth:15,
            itemStyle: {
              normal: {
                color: '#f5f5f5'
              }
            },
            tooltip: {
              show: false
            },
            data: gdpDataMax
          },{
            name: 'GDP增速',
            type: 'bar',
              z: 1,
              silent: true,
              barGap: '-100%',
             // barCategoryGap: '50%',
              barMaxWidth:15,
              itemStyle: {
                normal: {
                  color: '#574fbe'
                }
              },
            label: {
              normal: {
                show: true,
                position: [245, 0],
                formatter: '{c}%',
                textStyle: {
                  color: '#333'
                }
              }
            },
            tooltip: {
              show: false
            },
            data: gdpData
          }
        ]
      };
      if(widthW>1800){
        vm.barOption1.series[1].label.normal.position = [385, 0];
      }
    }
    vm.loadBarChart1($http, devUrl);
    vm.loadBarChart2 = function($http, devUrl){
      vm.barConfig2 = {
        theme: 'Donut',
        dataLoaded: false
      };
      vm.barOption2 = {
        color: ['#344cac','#478bb2','#b566b5'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '2%',
          right: '3%',
          bottom: '10',
          y:40,
          containLabel: true
        },
        xAxis: [{
            data: xData,
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
        }],
        yAxis: [{
          name: '单位：亿元',
          type: 'value',
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
        }],
        legend: {
          x:'center',
          y:'8',
          itemWidth:12,
          itemHeight:12,
          data:['进出口','进口','出口']
        },
        series: [{
        	name: '进出口',
        	type: 'bar',
        	barMaxWidth:10,
        	yAxisIndex:0,
        	data: jckData
	      },{
        	name: '进口',
        	type: 'bar',
        	barMaxWidth:10,
        	yAxisIndex:0,
        	data: jkData
	      },{
        	name: '出口',
        	type: 'bar',
        	barMaxWidth:10,
        	yAxisIndex:0,
        	data: ckData
	      }
        ]
      };
    }
    vm.loadBarChart2($http, devUrl);
    vm.loadBarChart3 = function($http, devUrl){
      vm.barConfig3 = {
        theme: 'Donut',
        dataLoaded: false
      };
      vm.barOption3 = {
        tooltip: {
          show:false
        },
        grid: {
          left: '3%',
          right: '15%',
          bottom: '0',
          y:10,
          y2:20,
          containLabel: true
        },
        xAxis: [{
           type: 'value',
            axisLabel: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            }
        }],
        yAxis: [{
          type: 'category',
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#000000'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            data:xData04
        }],
        series: [{
            name: '规模工业增加值增速',
            type: 'bar',
            z: 0,
            silent: true,
            barGap: '-100%',
            //barCategoryGap: '50%',
            barMaxWidth:15,
            itemStyle: {
              normal: {
                color: '#f5f5f5'
              }
            },
            tooltip: {
              show: false
            },
            data: gmgyzjzzsDataMax
          },{
          	name: '规模工业增加值增速',
          	type: 'bar',
              z: 1,
              silent: true,
              barGap: '-100%',
             // barCategoryGap: '50%',
              barMaxWidth:15,
              itemStyle: {
                normal: {
                  color: '#0c6bd9'
                }
              },
            label: {
              normal: {
                show: true,
                position: [255, 0],
                formatter: '{c}%',
                textStyle: {
                  color: '#333'
                }
              }
            },
              tooltip: {
                show: false
              },
            	data: gmgyzjzzsData
  	      }
        ]
      };
      if(widthW>1800){
        vm.barOption3.series[1].label.normal.position = [385, 0];
      }
    }
    vm.loadBarChart3($http, devUrl);
    vm.loadBarChart4 = function($http, devUrl){
      vm.barConfig4 = {
        theme: 'Donut',
        dataLoaded: false
      };
      vm.barOption4 = {
        color: ['#394aa9','#cb64bb','#6c6fef','#3295cf','#6cb964','#e28750','#a76cef','#2863db','#00c2a9','#c0e347','#b13df3','#48b143'],
        tooltip: {
           trigger: 'item',
           formatter: "{a} <br/>{b}: {c}亿元 ({d}%)"
        },
        legend: {
          orient: 'vertical',
          x:'80%',
          y:'center',
          itemWidth:12,
          itemHeight:12,
          itemGap:20,
          data:xData01
        },
        series: [{
        	name: '固定资产投资绝对值',
        	type: 'pie',
          center: ['40%', '50%'],
          radius: ['58%', '80%'],
          label: {
              normal: {
                  show: false,
                  position: 'center'
              }
          },
          labelLine: {
              normal: {
                  show: false
              }
          },
        	data: gdzctzjdzData
	      }
        ]
      };
    }
    vm.loadBarChart4($http, devUrl);
    vm.loadBarChart5 = function($http, devUrl){
      vm.barConfig5 = {
        theme: 'Donut',
        dataLoaded: false
      };
      vm.barOption5 = {
        color: ['#0c6bd9'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '5%',
          bottom: '10',
          y:40,
          containLabel: true
        },
        xAxis: [{
            data: xData03,
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
        }],
        yAxis: [{
          name: '单位：%',
          type: 'value',
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
        }],
        legend: {
          x:'center',
          y:'8',
          itemWidth:12,
          itemHeight:12,
          data:['零售总额增速']
        },
        series: [{
          name: '零售总额增速',
          type: 'bar',
          barMaxWidth:15,
          yAxisIndex:0,
          data: shxfplszezsData
        }]
      };
      // if(widthW>1800){
      //   vm.barOption5.series[1].label.normal.position = [475, 0];
      // }
    }
    vm.loadBarChart5($http, devUrl);
    vm.loadBarChart6 = function($http, devUrl){
      vm.barConfig6 = {
        theme: 'Donut',
        dataLoaded: false
      };
      vm.barOption6 = {
        color: ['#574fbe','#3f68e4'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '5%',
          bottom: '10',
          y:40,
          containLabel: true
        },
        xAxis: [{
            data: xData,
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
        }],
        yAxis: [{
          name: '单位：亿元',
          type: 'value',
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
        // ,{
        //   name: '增速：%',
        //   type: 'value',
        //     nameTextStyle:{
        //       color: '#7F7F7F'
        //     },
        //     splitLine: {
        //       show: false
        //     },
        //     axisTick: {
        //       show: false
        //     },
        //     axisLine: {
        //       lineStyle:{
        //         color:'#d8dde2'
        //       }
        //     },
        //     axisLabel: {textStyle:{ color: '#7F7F7F' }}
        // }
        ],
        legend: {
          x:'center',
          y:'8',
          itemWidth:12,
          itemHeight:12,
          data:['财政收入']
        },
        series: [{
        	name: '财政收入',
        	type: 'bar',
        	barMaxWidth:15,
        	yAxisIndex:0,
        	data: czsrData
	      }
       //  ,{
       //  	name: '增速',
       //  	type: 'bar',
       //  	yAxisIndex: 1,
       //  	barMaxWidth:15,
       //  	data: czsrzsData
	      // }
        ]
      };
    }
    vm.loadBarChart6($http, devUrl);
    vm.loadBarChart7 = function($http, devUrl){
      vm.barConfig7 = {
        theme: 'Donut',
        dataLoaded: false
      };
      vm.barOption7 = {
        color: ['#0c6bd9'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '5%',
          bottom: '10',
          y:40,
          containLabel: true
        },
        xAxis: [{
            data: xData,
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
        }],
        yAxis: [{
          name: '单位：%',
          type: 'value',
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
        }],
        legend: {
          x:'center',
          y:'8',
          itemWidth:12,
          itemHeight:12,
          data:['价格指数']
        },
        series: [{
        	name: '价格指数',
        	type: 'bar',
        	barMaxWidth:15,
        	yAxisIndex:0,
        	data: jgzsData
	      }]
      };
    }
    vm.loadBarChart7($http, devUrl);
    vm.urlData = function($http, devUrl){
        var urlMonth='leader/economy/qryZBLS/5/'+(curYear-1)+'01_'+curYear+'12';
	    CommService.getHttpJsonItem(urlMonth,devUrl + urlMonth,function(response){
	    	var dataLength = response.data.length - 6;
        var gdzctzjdzDataArr = [];
        var gmgyzjzzsDataArr = [];
	    	for (var i = dataLength; i < response.data.length; i++) {
	    		xData.push(response.data[i].DISTRICT_NAME);
	    		jckData.push(response.data[i].JCKJDZ);
	    		jkData.push(response.data[i].JKJDZ);
	    		ckData.push(response.data[i].CKJDZ);
          gmgyzjzzsDataArr.push(response.data[i].GMGYZJZZS);
	    		gdzctzjdzDataArr.push(response.data[i].GDZCTZ);
	    		czsrData.push(response.data[i].DFCZSRZE);
	    		czsrzsData.push(response.data[i].DFCZSRZS);
	    		jgzsData.push(response.data[i].JMXFJGZS);
	    	}
        //排序
        gdzctzjdzDataArr.sort(function (x, y) {
            if (x < y) {
                return 1;
            }
            if (x > y) {
                return -1;
            }
            return 0;
        });
        for (var j = 0; j <6 ; j++) {
          for (var i = dataLength; i < response.data.length; i++) {
            if(gdzctzjdzDataArr[j] == response.data[i].GDZCTZ){
                xData01.push(response.data[i].DISTRICT_NAME);
                gdzctzjdzData.push({value:response.data[i].GDZCTZ,name:response.data[i].DISTRICT_NAME});
            }
          }
        }
       //规模工业增加值增速排序
        gmgyzjzzsDataArr.sort(function (x, y) {
            if (x < y) {
                return -1;
            }
            if (x > y) {
                return 1;
            }
            return 0;
        });
        for (var j = 0; j <6 ; j++) {
          for (var i = dataLength; i < response.data.length; i++) {
            if(gmgyzjzzsDataArr[j] == response.data[i].GMGYZJZZS && gmgyzjzzsDataArr[j] != gmgyzjzzsDataArr[j-1]){
                xData04.push(response.data[i].DISTRICT_NAME);
                gmgyzjzzsData.push(response.data[i].GMGYZJZZS);
                gmgyzjzzsDataMax.push(Math.ceil(gmgyzjzzsDataArr[5]));
            }
          }
        }
        var provinceSum = 0;
        for(var i = 0 ;i < 6;i++){
          if(gdzctzjdzData[i].name == '湖南省'){
            vm.province = gdzctzjdzData[i].name;
            vm.pieDataCount = gdzctzjdzData[i].value;
          }
          provinceSum += gdzctzjdzData[i].value;
        }
        vm.provinceScale = ((vm.pieDataCount/provinceSum)*100).toFixed(2);
        if(response.data[dataLength+5].DATE_PERIOD.substring(4,5) =='0'){
          vm.lastYear = response.data[dataLength+5].DATE_PERIOD.substring(0,4)+'年'+response.data[dataLength+5].DATE_PERIOD.substring(5);
        }else{
          vm.lastYear = response.data[dataLength+5].DATE_PERIOD.substring(0,4)+'年'+response.data[dataLength+5].DATE_PERIOD.substring(4);
        }
        vm.barConfig2.dataLoaded = true;
        vm.barConfig3.dataLoaded = true;
        vm.barConfig4.dataLoaded = true;
        vm.barConfig6.dataLoaded = true;
        vm.barConfig7.dataLoaded = true;
	    });
	    var urlQuarterly='leader/economy/qryZBLS/4/'+(curYear-2)+'01_'+curYear+'12';
	    CommService.getHttpJsonItem(urlQuarterly,devUrl + urlQuarterly,function(response){
	    	var dataLength = response.data.length - 6;
        var gdpDataArr = [];
        var shxfplszezsDataArr = [];
	    	for (var i = dataLength; i < response.data.length; i++) {
	    		gdpDataArr.push(response.data[i].GDPZS);
	    		shxfplszezsDataArr.push(response.data[i].SHXFPLSZEZS);
	    	}
        //gdp增速排序
        gdpDataArr.sort(function (x, y) {
            if (x < y) {
                return -1;
            }
            if (x > y) {
                return 1;
            }
            return 0;
        });
        for (var j = 0; j <6 ; j++) {
          for (var i = dataLength; i < response.data.length; i++) {
            if(gdpDataArr[j] == response.data[i].GDPZS && gdpDataArr[j] != gdpDataArr[j-1]){
                xData02.push(response.data[i].DISTRICT_NAME);
                gdpData.push(response.data[i].GDPZS);
                gdpDataMax.push(Math.ceil(gdpDataArr[5]));
            }
          }
        }
        //社会消费品零售总额增速排序
        shxfplszezsDataArr.sort(function (x, y) {
            if (x < y) {
                return -1;
            }
            if (x > y) {
                return 1;
            }
            return 0;
        });
        for (var j = 0; j <6 ; j++) {
          for (var i = dataLength; i < response.data.length; i++) {
            if(shxfplszezsDataArr[j] == response.data[i].SHXFPLSZEZS && shxfplszezsDataArr[j] != shxfplszezsDataArr[j-1]){
                xData03.push(response.data[i].DISTRICT_NAME);
                shxfplszezsData.push(response.data[i].SHXFPLSZEZS);
                shxfplszezsDataMax.push(Math.ceil(shxfplszezsDataArr[5]));
            }
          }
        }

        if(response.data[dataLength+5].DATE_PERIOD.substring(4,5) =='0'){
          vm.lastYear1 = response.data[dataLength+5].DATE_PERIOD.substring(0,4)+'年'+response.data[dataLength+5].DATE_PERIOD.substring(5);
        }else{
          vm.lastYear1 = response.data[dataLength+5].DATE_PERIOD.substring(0,4)+'年'+response.data[dataLength+5].DATE_PERIOD.substring(4);
        }
            vm.barConfig1.dataLoaded = true;
            vm.barConfig5.dataLoaded = true;
	    });
    }
    vm.urlData($http, devUrl);
    vm.initTimeClock();
  }
})();
