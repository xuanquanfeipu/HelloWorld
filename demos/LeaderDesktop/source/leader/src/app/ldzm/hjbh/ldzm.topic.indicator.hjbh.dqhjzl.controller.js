/**
 * 领导桌面-环保情况分析
 */
(function () {
  'use strict';

  $(".content-wrapper .container").removeClass("container").addClass("container-fluid");

  angular
    .module('smartCore')
    .controller('LdzmTopicIndHjbhDqhjzlController', LdzmTopicIndHjbhDqhjzlController);

  /** @ngInject */
  function LdzmTopicIndHjbhDqhjzlController($scope, devUrl, CommService, $window) {
    var vm = this;
    vm.title = "领导桌面-环保情况分析-大气环境质量";
    vm.screenSizeType=CommService.getScreenSize().type;
    vm.months=[];
    vm.recentMonth='';
    vm.selectedType=3;//1-优良天数，2-综合指数，3-PM2.5
    vm.selectedAreaNo = 1;

    //地图
    vm.curAreaName="湖南省";
    var areaMap={};
    var mapData=[];
    var onMapSelectChanged=function(params){
      params=params.batch[0];
      if(params.selected[params.name]){
        vm.curAreaName = params.name;
        for(var i=0; i<mapData.length; i++) {
          if(params.name == mapData[i].name) {
            vm.loadGauge(mapData[i].value);
            vm.selectedAreaNo = mapData[i].seriesId;
            vm.ylts = mapData[i].ylts;
            vm.ylts_zzl = CommService.getSign(mapData[i].ylts_zzl);
            vm.zhzs_zzl = CommService.getSign(mapData[i].zzl);
            vm.color1 = CommService.getSignColor(mapData[i].ylts_zzl);
            vm.color2 = CommService.getSignColor(mapData[i].zzl);
            vm.loadBar1(vm.minMonth,vm.maxMonth,vm.selectedAreaNo,vm.selectedType);
          }
        }
      }else{
        vm.curAreaName="湖南省";
        for(var i=0; i<mapData.length; i++) {
          if('湖南省' == mapData[i].name){
            vm.loadGauge(vm.hunanValue.zhzs);
            vm.selectedAreaNo = 1;
            vm.ylts =  vm.hunanValue.ylts;
            vm.ylts_zzl = CommService.getSign(vm.hunanValue.ylts_zzl);
            vm.zhzs_zzl = CommService.getSign(vm.hunanValue.zhzs_zzl);
            vm.color1 = CommService.getSignColor(vm.hunanValue.ylts_zzl);
            vm.color2 = CommService.getSignColor(vm.hunanValue.zhzs_zzl);
            vm.loadBar1(vm.minMonth,vm.maxMonth,1,vm.selectedType);
          }
        }
      }
      $("#barWidth").css('width',(vm.ylts/vm.daysTotal)*100+'%');
      $scope.$apply();//手动刷新
    };

    vm.loadMap=function(month){
      vm.mapConfig1 = {
        theme: 'Donut',
        dataLoaded: false
      };
      vm.mapOption1 = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>综合指数 : {c}',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        title: {
          text: '区域环境空气质量状况分析',
          x:'center',
          y:'93%',
          subtextStyle:{
            color:'#564FBE',
            fontSize: 20,
            fontWeight: 'bolder'
          },
          textStyle:{
            fontSize: 14,
            // fontWeight: 'bolder',
            color: '#525164'
          }
        },
        visualMap: {
          min: 0,
          max: 5,
          orient:'horizontal',
          left: 'center',
          y: '83%',
          text: ['高','低'],           // 文本，默认为数值文本
          calculable: true,
          inRange: {
            color: ['#f1f3ff','#2e40a4']
          },
          itemHeight:'150%'
        },
        series: [{
          title:'xxx',
          name: '总量',
          type: 'map',
          map: 'hunan',
          roam: false,
          aspectScale:0.9,
          zoom: 1.0,
          left: 'center',
          top: '1%',
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              borderWidth:1,
              borderColor:'#fff'
            }
          },
          selectedMode : 'single',
          data:mapData
        }]
      };
      //查询各地区的空气质量综合指数
      var key='leader/envprotect/qrydqhjzl?datePeriodType=3&areaNo=1&includeChildArea=true&startDate='+month+'&endDate='+month;
      CommService.getHttpJsonItem(key,devUrl+key,function(response){
        var result=response.data;
        for(var i=0;i<result.length;i++){
          mapData.push({seriesId:result[i].DISTRICT_NO,name:result[i].DISTRICT_NAME,value:result[i].ZHZS,zzl:result[i].ZHZS_ZZL,
            ylts:result[i].YLTS,ylts_zzl:result[i].YLTS_ZZL});
          areaMap[result[i].DISTRICT_NAME]=result[i].DISTRICT_NO;
          if(result[i].DISTRICT_NO==1){
            vm.hunanValue = {zhzs:result[i].ZHZS,zhzs_zzl:result[i].ZHZS_ZZL,ylts:result[i].YLTS,ylts_zzl:result[i].YLTS_ZZL};
          }
        }
        vm.mapConfig1.dataLoaded=true;
        vm.loadGauge(vm.hunanValue.zhzs);
        vm.ylts = vm.hunanValue.ylts;
        vm.ylts_zzl = CommService.getSign(vm.hunanValue.ylts_zzl);
        vm.zhzs_zzl = CommService.getSign(vm.hunanValue.zhzs_zzl);
        vm.color1 = CommService.getSignColor(vm.hunanValue.ylts_zzl);
        vm.color2 = CommService.getSignColor(vm.hunanValue.zhzs_zzl);
        vm.mapConfig1.event = [{mapselectchanged:onMapSelectChanged}];
        $("#barWidth").css('width',(vm.ylts/vm.daysTotal)*100+'%');
      });
    };

    vm.loadGauge = function(value){
      vm.gaugeConfig={
        theme: 'Donut',
        dataLoaded: false
      };
      vm.gaugeOption={
        title: {
          text: "综合指数",
          x: "center",
          top: '63%',
          textStyle: {
            color: "#666"
          }
        },
        series: [
          {
            name: '业务指标',
            type: 'gauge',
            radius: '110%',
            center: ["50%", "60%"],
            detail: {
              formatter:'{value}',
              color:'#333',
              fontWeight:'bold'
            },
            axisLine: {
              show: true,
              lineStyle: {
                width: 20,
                shadowBlur: 0,
                color: [[0.25, '#59BC59'],[0.5, '#2D7BE6'],[0.75, '#FFA133'],[1, '#ED4A5A']]
              }
            },
            data: [{value: value, name: ''}],
            min:0,
            max:8,
            splitNumber:8,
            startAngle:200,
            endAngle:-20,
            pointer: {
              width: "3%",
              length:'30%',
              color: "#333"
            },
            itemStyle: {
              normal: {
                color: "#333",
                shadowBlur: 3
              }
            },
            axisTick: {
              show: false
            }
          }
        ]
      };
      vm.gaugeConfig.dataLoaded = true;
    };

    vm.loadBar1 = function(minMonth, maxMonth, areaNo, type){
      var chartCategories = [], chartSeries = [];
      vm.unit = '';
      vm.typeName = 'PM2.5';
      vm.legendData = ['PM2.5','同期变化率'];
      vm.bar1Config = {
        theme: 'Donut',
        dataLoaded: false
      };
      vm.bar1Option = {
        color: ['#137ebd', '#ff9f17'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '1%',
          right: '1%',
          bottom: '10',
          top:'20%',
          containLabel: true
        },
        xAxis: [{
          data: chartCategories,
          axisTick : {  //去掉Y轴小点
            inside: false,
            length: 5,
            lineStyle: {
              color: '#ffffff',
              shadowColor: '#ffffff'
              // shadowOffsetY: -5
            }
          },
          axisLine: {
            show: true,  //隐藏Y轴
            lineStyle:{
              color:"#8996a3"   //Y轴颜色不起效果
            }
          }
        }],
        yAxis: [{
          name: '',
          type: 'value',
          axisTick : {  //去掉Y轴小点
            inside: false,
            length: 5,
            lineStyle: {
              color: '#ffffff',
              shadowColor: '#ffffff'
            }
          },
          splitLine: {
            show: true
          },
          axisLine: {
            show: true,  //隐藏Y轴
            lineStyle:{
              color:"#8996a3"   //Y轴颜色不起效果
            }
          },
          axisLabel: {
            formatter: '{value}',
            textStyle:{ color: '#7F7F7F' }
          }
        },{
          name: '单位 : %',
          type: 'value',
          axisTick: {
            show:false
          },
          splitLine:{
            show:false
          },
          axisLine: {
            show: true,  //隐藏Y轴
            lineStyle:{
              color:"#8996a3"   //Y轴颜色不起效果
            }
          },
          axisLabel: {
            formatter: '{value}',
            textStyle:{ color: '#8996a3' }
          }
        }],
        legend: {
          selected: {},
          x:'center',
          y:'28',
          top:'1%',
          data:vm.legendData
        },
        series: chartSeries
      };


      var key='leader/envprotect/qrydqhjzl?datePeriodType=3&areaNo='+areaNo+'&includeChildArea=false&startDate='+minMonth+'&endDate='+maxMonth;
      CommService.getHttpJsonItem(key,devUrl+key,function(response) {
        vm.bar1Config.dataLoaded=false;
        var result = response.data;
        var valueArr = [], zzlArr = [];

        if(type==1){
          chartSeries.push({name: '优良天数', type: 'bar',  yAxisIndex:0,barWidth:21,data: [],
            itemStyle: {
              normal: {
                color: '#564fbe'
              }
            }});
        }else if(type==2){
          chartSeries.push({name: '综合指数', type: 'bar',  yAxisIndex:0,barWidth:21,data: [],
            itemStyle: {
              normal: {
                color: '#564fbe'
              }
            }});
        }else if(type==3){
          chartSeries.push({name: 'PM2.5', type: 'bar',  yAxisIndex:0,barWidth:21,data: [],
            itemStyle: {
              normal: {
                color: '#564fbe'
              }
            }});
        }
        chartSeries.push({name: '同期变化率', type: 'line',  yAxisIndex:1,data: [],
          itemStyle: {
            normal: {
              color: '#c95de0'
            }
          }});

        for(var i=0;i<result.length;i++){
          chartCategories.push(result[i].DATE_PERIOD);
          if(type==1){
            valueArr.push(result[i].YLTS);
            zzlArr.push(result[i].YLTS_ZZL);
            vm.bar1Option.legend.data=['优良天数','同期变化率'];
            vm.bar1Option.yAxis[0].name='单位 : 天';
          }else if(type==2){
            valueArr.push(result[i].ZHZS);
            zzlArr.push(result[i].ZHZS_ZZL);
            vm.bar1Option.legend.data=['综合指数','同期变化率'];
            vm.bar1Option.yAxis[0].name='';
          }else if(type==3){
            valueArr.push(result[i].PM2D5);
            zzlArr.push(result[i].PM2D5_ZZL);
            vm.bar1Option.legend.data=['PM2.5','同期变化率'];
            vm.bar1Option.yAxis[0].name='';
          }
        }
        chartSeries[0].data = valueArr;
        chartSeries[1].data = zzlArr;
        vm.bar1Config.dataLoaded=true;
      });
    };

    vm.loadBar2=function(type,month){
      var barData = [];
      var axisData = [];
      var backData = [];
      vm.bar2Config = {
        theme: 'Donut',
        dataLoaded: false
      };
      vm.bar2Option = {
        title: {
          text: ''
        },
        color: ['#3697FF'],
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c}'
        },
        grid:{
          top:40,
          left:0,
          right:0,
          bottom:0,
          containLabel: true
        },
        xAxis: [
          {
            splitLine:{show: false},//去除网格线
            type: 'category',
            axisLabel:{
              //interval:1,
              textStyle: {  //X轴字体颜色
                color: '#8996a3',
                fontSize:12	 //X轴字体大小
              }
              // formatter:function(val){
              //   if(val.length>3){
              //     val = val.substring(0,3)+"...";
              //   }
              //   return val;
              // }
            },
            axisTick:{
              show:false
            },
            nameTextStyle:{
              fontSize:11  //字体大小
            },
            axisLine:{
              lineStyle:{
                color:'#eeedff' //字体颜色
              }
            },
            data: axisData
          }
        ],
        yAxis: [
          {
            // axisLine: {show: false},//去掉Y轴线
            splitLine:{show: false},//去除网格线
            type: 'value',
            // name: '单位：亿元',
            nameTextStyle:{
              color:"#8C98A5", //总额的颜色值
              fontSize:12
            },
            axisLine:{
              lineStyle:{
                color:'#eeedff'
              }
            },
            axisTick:{
              show:false
            },
            //min: 0,
            // max: axisMax,
            axisLabel: {
              formatter: '{value} ',
              textStyle: {
                fontSize:14,	//Y轴字体大小
                color: '#8996a3'  //Y轴字体颜色
              }
            }
          }],
        series: [
          {
            tooltip:{
              showContent:false //隐藏灰色区域气泡
            },
            type: 'bar',
            itemStyle: {
              normal: {color: 'rgba(0,0,0,0.05)'}  //灰色区域背景颜色
            },
            // borderColor:"red",
            barGap:'-100%',
            //barCategoryGap:'40%',
            // data: dataShadow,
            // itemStyle: {normal: {color:'#F5F5F5'}},
            barWidth:21,  //背景颜色的宽度
            // data:[10000,10000,10000,10000,10000,10000,10000,10000,10000,10000],//data填你需要的背景的值
            data:backData,
            animation: false
          },
          {
            barWidth:21,
            name:'总额',
            type:'bar',
            // data:[9079.12, 3651.92, 3539.62, 1800.94, 1270.61,1116.75,926.00, 690.03, 626.75, 552.93],
            data:barData,
            itemStyle:{normal:{color:'#564FBE'}}
          }]
      };

      var datePeriodType=3;
      if(month.length==8){
        datePeriodType=6;
      }
      var key='leader/envprotect/qrydqhjzl?datePeriodType='+datePeriodType
        +'&areaNo=1&includeChildArea=true&startDate='+month+'&endDate='+month;
      console.log(devUrl+key)
      CommService.getHttpJsonItem(key,devUrl+key,function(response) {
        vm.bar2Config.dataLoaded=false;
        var result = response.data;
        var max = 0;
        for(var i=0;i<result.length;i++){
          if(result[i].DISTRICT_NO!=1){
            var value;
            if(type==1){
              value = result[i].PM2D5;
            }else if(type==2){
              value = result[i].PM10;
            }else if(type==3){
              value = result[i].SO2;
            }else if(type==4){
              value = result[i].NO2;
            }else if(type==5){
              value = result[i].CO;
            }else if(type==6){
              value = result[i].O3;
            }
            barData.push(value);
            axisData.push(result[i].DISTRICT_NAME);
            if(value>max){
              max=value;
            }
          }
        }
        for(var j in barData){
          backData.push(max);
        }
        vm.bar2Config.dataLoaded=true;
      });
    };

    vm.switchBar1=function(type){
      $("#btnDivHorizon div").removeClass('envBtnHorizon1_selected');
      $("#btnDivHorizon div").eq(type-1).addClass('envBtnHorizon1_selected');
      vm.selectedType = type;
      vm.loadBar1(vm.minMonth,vm.maxMonth,vm.selectedAreaNo,type);
    };

    vm.queryType = 1;

    vm.switchBar2=function(type){
      $("#btnDivHorizon2 div").removeClass('envBtnHorizon1_selected');
      $("#btnDivHorizon2 div").eq(type-1).addClass('envBtnHorizon1_selected');
      if(type==1){
        $("#monthSelect").show();
        $("#daySelect").hide();
        vm.switchBarChart(0);
        $(".envBtn").removeClass("envBtn_selected");
        $(".envBtn:eq(0)").addClass("envBtn_selected");
        vm.queryType=1;
        $("#monthSelect").val(0);
      }else{
        $("#monthSelect").hide();
        $("#daySelect").show();
        vm.switchBarChartByDay(0);
        $(".envBtn").removeClass("envBtn_selected");
        $(".envBtn:eq(0)").addClass("envBtn_selected");
        vm.queryType=2;
        $("#daySelect").val(0)
      }

      // vm.selectedType = type;
      // vm.loadBar1(vm.minMonth,vm.maxMonth,vm.selectedAreaNo,type);
    };

    vm.switchBarChart = function(selectedIndex){
      var selectedMonth=$("#monthSelect option:eq("+selectedIndex+")").html();
      selectedMonth = vm.formateDate(selectedMonth);
      vm.loadBar2($(".envBtn_selected").attr("value"),selectedMonth);
    };

    vm.switchBarChartByDay = function(selectedIndex){
      var selectedDay=$("#daySelect option:eq("+selectedIndex+")").html();
      selectedDay=vm.formateDate(selectedDay);
      vm.loadBar2($(".envBtn_selected").attr("value"),selectedDay);
    };

    vm.switchTab = function(type,selectedIndex){
      var selected=$("#monthSelect option:eq("+selectedIndex+")").html();
      if(vm.queryType==2){
        var selected=$("#daySelect option:eq("+selectedIndex+")").html();
      }
      selected=vm.formateDate(selected);
      vm.loadBar2(type,selected);
    };

    vm.formateDate = function(dateStr){ //2017年07月07日
      var year = dateStr.substring(0,4);
      var month = dateStr.substring(5,dateStr.indexOf('月'));
      if(month.length==1){
        month = "0" + month;
      }
      var day = "";
      if(dateStr.indexOf("日")>-1){
        day = dateStr.substring(dateStr.indexOf('月')+1,dateStr.indexOf('日'));
        if(day.length==1){
          day = "0" + day;
        }
      }
      return year + month + day;
    };

    // vm.switchBarChart = function(selectedMonth){
    //   vm.loadBar2($(".envBtn_selected").attr("value"),selectedMonth);
    // };

    vm.queryRecentMonth=function(){
      var key='leader/envprotect/qryRecentMonth';
      CommService.getHttpJsonItem(key,devUrl+key,function(response) {
        var result = response.data;
        vm.maxMonth = 0, vm.minMonth = 999999;
        if(result.length>0){
          vm.recentMonth=result[0].DATE_PERIOD;
          var month = vm.recentMonth.toString().substring(4,6);
          if(month.substring(0,1)=="0"){
            month = month.substring(1,2);
          }
          vm.recentMonthFormatted = vm.recentMonth.substring(0,4)+'年'+ month+'月';
        }
        vm.daysTotal = CommService.getDaysNumByMonth(vm.recentMonth);
        vm.months=[];
        for(var i=0;i<result.length;i++){
          var month = result[i].DATE_PERIOD.toString().substring(4,6);
          if(month.substring(0,1)=="0"){
            month = month.substring(1,2);
          }
          vm.months.push({'value':result[i].DATE_PERIOD,
            'name':result[i].DATE_PERIOD.toString().substring(0,4)+"年"+month+"月"}
          );
          if(vm.maxMonth<parseInt(result[i].DATE_PERIOD)){
            vm.maxMonth = parseInt(result[i].DATE_PERIOD);
          }
          if(vm.minMonth>parseInt(result[i].DATE_PERIOD)){
            vm.minMonth = parseInt(result[i].DATE_PERIOD);
          }
        }
        vm.loadMap(vm.recentMonth);
        vm.loadBar1(vm.minMonth, vm.maxMonth, 1, 3);
        vm.loadBar2(1,vm.recentMonth);
      });
    };

    vm.queryRecentDay=function(){
      var key='leader/envprotect/qryRecentDay';
      CommService.getHttpJsonItem(key,devUrl+key,function(response) {
        var result = response.data;
        vm.maxDay = 0, vm.minDay = 999999;
        if (result.length > 0) {
          vm.recentDay = result[0].DATE_PERIOD;
          var month = vm.recentDay.toString().substring(4, 6);
          if (month.substring(0, 1) == "0") {
            month = month.substring(1, 2);
          }
          var day = vm.recentDay.toString().substring(6, 8);
          if (day.substring(0, 1) == "0") {
            day = day.substring(1, 2);
          }
          vm.recentDayFormatted = vm.recentDay.substring(0, 4) + '年' + month + '月' + day + '日';
        }
        vm.days = [];
        for (var i = 0; i < result.length; i++) {
          var month = result[i].DATE_PERIOD.toString().substring(4, 6);
          if (month.substring(0, 1) == "0") {
            month = month.substring(1, 2);
          }
          var day = result[i].DATE_PERIOD.toString().substring(6, 8);
          if (day.substring(0, 1) == "0") {
            day = day.substring(1, 2);
          }
          vm.days.push({
              'value': result[i].DATE_PERIOD,
              'name': result[i].DATE_PERIOD.toString().substring(0, 4) + "年" + month + "月" + day + '日'
            }
          );
          if (vm.maxDay < parseInt(result[i].DATE_PERIOD)) {
            vm.maxDay = parseInt(result[i].DATE_PERIOD);
          }
          if (vm.minDay > parseInt(result[i].DATE_PERIOD)) {
            vm.minDay = parseInt(result[i].DATE_PERIOD);
          }
        }
      })
    };

    vm.queryRecentMonth();
    vm.queryRecentDay();

    $("#btnDiv div").click(function(){
      $(this).parent().children().removeClass("envBtn_selected");
      $(this).addClass("envBtn_selected");
    });

    $("#btnDivHorizon div").click(function(){
      $(this).parent().children().removeClass("envBtnHorizon1_selected");
      $(this).addClass("envBtnHorizon1_selected");
    });
  }
})();


