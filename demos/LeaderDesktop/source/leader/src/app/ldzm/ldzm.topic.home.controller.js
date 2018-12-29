/**
 * Created by 10209757 on 2016/12/8.
 */(function() {
  'use strict';

  angular
    .module('smartCore')
    .controller('LdzmTopicHomeController', LdzmTopicHomeController);

  /** @ngInject */
  function LdzmTopicHomeController($scope,$window, $timeout, $http, devUrl, SweetAlert, CommService,latestYear) {
    var vm = this;
    vm.screenSizeType=CommService.getScreenSize().type;
    var session = $window.sessionStorage;

    var myDate = new Date();
    var latestYear= latestYear - 1;
    vm.latestYear = latestYear;
    //每个地区的固定投资总量
    var investmentMap=[];
    //sessionStorage.setItem("website", "W3Cfuns.com");
    //sessionStorage.getItem("website");

    //鲜活常量
    var instituteYear=latestYear;

    vm.seasonList = [];
    vm.seasonList1 = [];
    vm.seasonList2 = [];
    vm.month_00_List = [];
    vm.month_01_List = [];//不是累计月份显示
    vm.month_02_List = [];//累计月份显示
    vm.gdzc_data_List= [];
    vm.calMonthAndSearson = function(){
      if(vm.currentMonth.substring(4,5) == '0'){
        vm.showCurrentMonth = vm.currentMonth.substring(0,4) +"年"+vm.currentMonth.substring(5)+"月";
        if(vm.currentMonth.substring(4) != '01'){
          vm.showCurrentMonth1 = vm.currentMonth.substring(0,4) +"年1-"+vm.currentMonth.substring(5)+"月";
        }
        else{
          vm.showCurrentMonth1 = vm.currentMonth.substring(0,4) +"年1月";
        }
      }
      else{
        vm.showCurrentMonth = vm.currentMonth.substring(0,4) +"年"+vm.currentMonth.substring(4)+"月";
        if(vm.currentMonth.substring(4) != '01'){
          vm.showCurrentMonth1 = vm.currentMonth.substring(0,4) +"年1-"+vm.currentMonth.substring(4)+"月";
        }
        else{
          vm.showCurrentMonth1 = vm.currentMonth.substring(0,4) +"年1月";
        }
      }

      vm.showCurrentSeason = vm.currentSeason.substring(0,4) +"Q"+vm.currentSeason.substring(5);

      if(vm.currentSeason.substring(5)=="1"){
        vm.showCurrentSeason1 = vm.currentSeason.substring(0,4) +"Q"+vm.currentSeason.substring(5);
      }else{
        vm.showCurrentSeason1 = vm.currentSeason.substring(0,4) +"Q1-Q"+vm.currentSeason.substring(5);
      }


      var searsonYear = parseInt(vm.showCurrentSeason.substring(0,4));
      if(vm.showCurrentSeason.substring(5) == '4'){
        vm.seasonList = [searsonYear-1 + "04",searsonYear + "01",searsonYear + "02",searsonYear + "03",searsonYear + "04"]
        vm.seasonList1 = [searsonYear-1 + "Q4",searsonYear + "Q1",searsonYear + "Q2",searsonYear + "Q3",searsonYear + "Q4"]
        vm.seasonList2 = [searsonYear-1 + "Q1-Q4",searsonYear + "Q1", "Q1-Q2", "Q1-Q3","Q1-Q4"]
      }else if(vm.showCurrentSeason.substring(5) == '3'){
        vm.seasonList = [searsonYear-1 + "03",searsonYear-1 + "04",searsonYear + "01",searsonYear + "02",searsonYear + "03"]
        vm.seasonList1 = [searsonYear-1 + "Q3",searsonYear-1 + "Q4",searsonYear + "Q1",searsonYear + "Q2",searsonYear + "Q3"]
        vm.seasonList2 = [searsonYear-1 + "Q1-Q3", "Q1-Q4", searsonYear+"Q1", "Q1-Q2","Q1-Q3"]
      }else if(vm.showCurrentSeason.substring(5) == '2'){
        vm.seasonList = [searsonYear-1 + "02",searsonYear-1 + "03",searsonYear-1 + "04",searsonYear + "01",searsonYear + "02"]
        vm.seasonList1 = [searsonYear-1 + "Q2",searsonYear-1 + "Q3",searsonYear-1 + "Q4",searsonYear + "Q1",searsonYear + "Q2"]
        vm.seasonList2 = [searsonYear-1 + "Q1-Q2", "Q1-Q3","Q1-Q4", searsonYear+"Q1", "Q1-Q2"]
      }else if(vm.showCurrentSeason.substring(5) == '1'){
        vm.seasonList = [searsonYear-1 + "01",searsonYear-1 + "02",searsonYear-1 + "03",searsonYear-1 + "04",searsonYear + "01"]
        vm.seasonList1 = [searsonYear-1 + "Q1",searsonYear-1 + "Q2",searsonYear-1 + "Q3",searsonYear-1 + "Q4",searsonYear + "Q1"]
        vm.seasonList2 = [searsonYear-1 + "Q1", "Q1-Q2","Q1-Q3","Q1-Q4",searsonYear+"Q1"]
      }
      var monthYear = parseInt(vm.currentMonth.substring(0,4));
      if(vm.currentMonth.substring(4) == '12'){
        vm.month_00_List = [monthYear+ "08",monthYear + "09",monthYear + "10",monthYear + "11",monthYear + "12"]
        vm.month_01_List = [monthYear+ "年8月",monthYear + "年9月",monthYear + "年10月",monthYear + "年11月",monthYear + "年12月"]//不是累计月份显示
        vm.month_02_List = [monthYear+ "年1-8月","1-9月","1-10月","1-11月","1-12月"]//累计月份显示
      }else if(vm.currentMonth.substring(4) == '11'){
        vm.month_00_List = [monthYear+ "07",monthYear + "08",monthYear + "09",monthYear + "10",monthYear + "11"]
        vm.month_01_List = [monthYear+ "年7月",monthYear + "年8月",monthYear + "年9月",monthYear + "年10月",monthYear + "年11月"]//不是累计月份显示
        vm.month_02_List = [monthYear+ "年1-7月","1-8月","1-9月","1-10月", "1-11月"]//累计月份显示
      }else if(vm.currentMonth.substring(4) == '10'){
        vm.month_00_List = [monthYear+ "06",monthYear + "07",monthYear + "08",monthYear + "09",monthYear + "10"]
        vm.month_01_List = [monthYear+ "年6月",monthYear + "年7月",monthYear + "年8月",monthYear + "年9月",monthYear + "年10月"]//不是累计月份显示
        vm.month_02_List = [monthYear+ "年1-6月","1-7月","1-8月","1-9月","1-10月"]//累计月份显示
      }else if(vm.currentMonth.substring(4) == '09'){
        vm.month_00_List = [monthYear + "05",monthYear+ "06",monthYear + "07",monthYear + "08",monthYear + "09"]
        vm.month_01_List = [monthYear + "年5月",monthYear+ "年6月",monthYear + "年7月",monthYear + "年8月",monthYear + "年9月"]//不是累计月份显示
        vm.month_02_List = [monthYear + "年1-5月","1-6月","1-7月","1-8月","1-9月"]//累计月份显示
      }else if(vm.currentMonth.substring(4) == '08'){
        vm.month_00_List = [monthYear + "04",monthYear + "05",monthYear+ "06",monthYear + "07",monthYear + "08"]
        vm.month_01_List = [monthYear + "年4月",monthYear + "年5月",monthYear+ "年6月",monthYear + "年7月",monthYear + "年8月"]//不是累计月份显示
        vm.month_02_List = [monthYear + "年1-4月","1-5月","1-6月","1-7月","1-8月"]//累计月份显示
      }else if(vm.currentMonth.substring(4) == '07'){
        vm.month_00_List = [monthYear + "03",monthYear + "04",monthYear + "05",monthYear+ "06",monthYear + "07"]
        vm.month_01_List = [monthYear + "年3月",monthYear + "年4月",monthYear + "年5月",monthYear+ "年6月",monthYear + "年7月"]//不是累计月份显示
        vm.month_02_List = [monthYear + "年1-3月","1-4月","1-5月","1-6月","1-7月"]//累计月份显示
      }else if(vm.currentMonth.substring(4) == '06'){
        vm.month_00_List = [monthYear + "02",monthYear + "03",monthYear + "04",monthYear + "05",monthYear+ "06"]
        vm.month_01_List = [monthYear + "年2月",monthYear + "年3月",monthYear + "年4月",monthYear+ "年5月",monthYear + "年6月"]//不是累计月份显示
        vm.month_02_List = [monthYear + "年1-2月","1-3月","1-4月","1-5月","1-6月"]//累计月份显示
      }else if(vm.currentMonth.substring(4) == '05'){
        vm.month_00_List = [monthYear + "01",monthYear + "02",monthYear + "03",monthYear + "04",monthYear+ "05"]
        vm.month_01_List = [monthYear + "年1月",monthYear + "年2月",monthYear + "年3月",monthYear+ "年4月",monthYear + "年5月"]//不是累计月份显示
        vm.month_02_List = [monthYear + "年1月","1-2月","1-3月","1-4月","1-5月"]//累计月份显示
      }else if(vm.currentMonth.substring(4) == '04'){
        vm.month_00_List = [(monthYear-1)+ "12",monthYear + "01",monthYear + "02",monthYear + "03",monthYear + "04"]
        vm.month_01_List = [(monthYear-1) + "年12月",monthYear + "年1月",monthYear + "年2月",monthYear + "年3月",monthYear+ "年4月"]//不是累计月份显示
        vm.month_02_List = [(monthYear-1) +"年1-12月",monthYear + "1月","1-2月","1-3月","1-4月"]//累计月份显示
      }else if(vm.currentMonth.substring(4) == '04'){
        vm.month_00_List = [(monthYear-1)+ "11",(monthYear-1)+ "12",monthYear + "01",monthYear + "02",monthYear + "03"]
        vm.month_01_List = [(monthYear-1) + "年11月",(monthYear-1) + "年12月",monthYear + "年1月",monthYear + "年2月",monthYear + "年3月"]//不是累计月份显示
        vm.month_02_List = [(monthYear-1) +"1-11月","1-12月",monthYear + "1月","1-2月","1-3月"]//累计月份显示
      }else if(vm.currentMonth.substring(4) == '03'){
        vm.month_00_List = [(monthYear-1)+ "10",(monthYear-1)+ "11",(monthYear-1)+ "12",monthYear + "01",monthYear + "02"]
        vm.month_01_List = [(monthYear-1) + "年10月",(monthYear-1) + "年11月",(monthYear-1) + "年12月",monthYear + "年1月",monthYear + "年2月"]//不是累计月份显示
        vm.month_02_List = [(monthYear-1) +"年1-10月","1-11月","1-12月",monthYear + "1月","1-2月"]//累计月份显示
      }else if(vm.currentMonth.substring(4) == '02'){
        vm.month_00_List = [(monthYear-1)+ "09",(monthYear-1)+ "10",(monthYear-1)+ "11",(monthYear-1)+ "12",monthYear + "01"]
        vm.month_01_List = [(monthYear-1) + "年9月",(monthYear-1) + "年10月",(monthYear-1) + "年11月",(monthYear-1) + "年12月",monthYear + "年1月"]//不是累计月份显示
        vm.month_02_List = [(monthYear-1) +"年1-9月","1-10月","1-11月","1-12月",monthYear + "1月"]//累计月份显示
      }else if(vm.currentMonth.substring(4) == '01'){
        vm.month_00_List = [(monthYear-1)+ "08",(monthYear-1)+ "09",(monthYear-1)+ "10",(monthYear-1)+ "11",(monthYear-1)+ "12"]
        vm.month_01_List = [(monthYear-1) + "年8月",(monthYear-1) + "年9月",(monthYear-1) + "年10月",(monthYear-1) + "年11月",(monthYear-1) + "年12月"]//不是累计月份显示
        vm.month_02_List = [(monthYear-1) +"年1-8月","1-9月","1-10月","1-11月","1-12月"]//累计月份显示
      }
      vm.startMonth = vm.month_00_List[0];//"201704";
      vm.startSeason = vm.seasonList[0];
    }


    vm.mapMax = 6000;

    var hunanGDPArr = new Array();
    vm.gygmData = [];
    vm.inverstData = [];
    vm.societyData  = [];
    vm.importData = [];
    vm.showGDP = '';
    vm.showGDPZL = '';
    //自适应的设置
    var bigScreenWidth = 1900;
    var chart2_w1 = 490;
    var chart2_w2 = 440;
    var bar_w = 250;
    if($window.innerWidth > bigScreenWidth){
      chart2_w1 = 680;
      chart2_w2 = 620;
      bar_w = 320;
    }

    //地图
    vm.curAreaName="湖南省";
    var areaMap={};
    var mapData=[];
    var onMapSelectChanged=function(params){
      params=params.batch[0];
      var district_no=1;
      if(params.selected[params.name]){
        // if(params.name=='湘西土家族苗族自治州'){
        //   vm.curAreaName = '湘西州';
        // }else{
        vm.curAreaName = params.name;
        // }
        district_no=areaMap[vm.curAreaName];
        for(var i=0; i<mapData.length; i++) {
          if(params.name == mapData[i].name) {
            vm.economicTotal = mapData[i].value;
            var economicIncreasePercent = mapData[i].zzl;
            if(economicIncreasePercent>0){
              vm.economicIncreasePercent = '↑' + mapData[i].zzl + '%';
            }else{
              vm.economicIncreasePercent = mapData[i].zzl + '%';
            }
          }
        }
      }else{
        vm.curAreaName="湖南省";
        for(var i=0; i<mapData.length; i++) {
          if('湖南省' == mapData[i].name){
            vm.economicTotal = mapData[i].value;
            var economicIncreasePercent = mapData[i].zzl;
            if(economicIncreasePercent>0){
              vm.economicIncreasePercent = '↑' + mapData[i].zzl + '%';
            }else{
              vm.economicIncreasePercent = mapData[i].zzl + '%';
            }
          }
        }
      }
      //console.log(vm.curAreaName+","+district_no);
      vm.loadPieChart($http, devUrl,district_no);
      //vm.loadBarChart($http, devUrl,district_no);
      vm.personsStat(district_no);


      //中间下面时序数据更新
      vm.loadGDPTime(district_no);//GDP
      vm.loadGygmTime(district_no);//工业规模
      vm.investTime(district_no);//固定资产
      vm.societyTime(district_no);//社会消费评零售
      vm.importAndExportTime(district_no);//进出口
      vm.FinancialStat(district_no);//财政收入

      $scope.$apply();//手动刷新
    }

    vm.importAndExportTime = function(district_no) {
        var key = 'economy/consume/qryIncomeOutcomeForArea?datePeriodType=5&startDate=' + vm.startMonth + '&endDate=' + vm.currentMonth + '&needGoodsType=0&districtNo='+district_no;
        CommService.getHttpJsonItem(key, devUrl + key, function (response) {
          var result = response.data;
          vm.importData.length = 0;
          if (result.length > 0) {
            for (var i = 0; i < result.length; i++) {
              vm.importData.push((parseFloat(result[i].JKE) + parseFloat(result[i].CKE)).toFixed(2));
              if (result[i].DATE_PERIOD == vm.currentMonth) {
                vm.ImportAndExport = (parseFloat(result[i].JKE) + parseFloat(result[i].CKE)).toFixed(2);
                vm.ImportAndExportRate = result[i].JCKZCL;
                //vm.ImportAndExportRate = ((parseFloat(result[i].JKE + result[i].CKE) - parseFloat(result[i - 1].JKE - result[i - 1].CKE)) * 100 / parseFloat(result[i - 1].JKE + result[i - 1].CKE)).toFixed(1);
              }
            }
          }
          vm.ImportAndExportConfig.dataLoaded = true;
        });
    }
   vm.societyTime = function(district_no){
      var key='leader/investment/qrySocietyConsume/4/'+district_no+'/'+vm.startSeason+'_'+vm.currentSeason;
      CommService.getHttpJsonItem(key,devUrl+key,function(response){
        var result=response.data;
        vm.societyData.length=0;
        if(result.length>0) {
          for (var i = 0; i < result.length; i++) {
            vm.societyData.push(result[i].LSZE);
            if (result[i].DATE_PERIOD == vm.currentSeason) {
              vm.society = result[i].LSZE;
              vm.societyRate= result[i].LSZE_ZZL;
            }
          }
        }
        vm.residentConsumptionConfig.dataLoaded=true;
      });
    }
    //固定资产投资
    vm.investTime = function(district_no){
          var key='leader/investment/qryInvestmentForAreaByDatePeriod/5/'+district_no+'/'+vm.startMonth+'_'+vm.currentMonth;
          CommService.getHttpJsonItem(key,devUrl+key,function(response){
            var result=response.data;
            vm.inverstData.length = 0;
            if(result.length>0){
              for(var i=0; i<result.length; i++){
                  vm.inverstData.push(result[i].TZZL);
                  if (result[i].DATE_PERIOD == vm.currentMonth) {
                    vm.hunanInvestment_1 = result[i].TZZL;
                    vm.hunanInvestmentRate_1 = result[i].ZZL;
                  }
              }
            }
            vm.investmentConfig.dataLoaded=true;
         });
    }

    vm.loadGygmTime = function(district_no){
      var key='leader/investment/qryScaleIndustryByArea/3/'+district_no+'/' + vm.startMonth + '_' + vm.currentMonth;//湖南省的工业规模近5个月的
      //http://10.118.20.29/webservice/leader/investment/qryScaleIndustryByArea/3/100/201704_201708
      CommService.getHttpJsonItem(key,devUrl+key,function(response){
        var result = response.data;
        vm.gygmData.length = 0;
        if (result.length > 0) {
          for (var i = 0; i < result.length; i++) {
            vm.gygmData.push(result[i].SR);
            if (result[i].DATE_PERIOD == vm.currentMonth) {
              vm.scaleIndustry = result[i].SR;
            }
          }
        }
        vm.scaleIndustryConfig.dataLoaded = true;
      });
    }
    vm.loadGDPTime = function(district_no){
      if(district_no == 1){
        var key='leader/economy/qryEconomy/4/1/'+vm.startSeason+'_'+vm.currentSeason;//查询近五个季度的湖南省的GDP
        CommService.getHttpJsonItem(key,devUrl+key,function(response){
          var result=response.data;
          hunanGDPArr.length=0;
          if(result.length>0){
            for(var i=0;i<vm.seasonList.length;i++){
              for(var j=0; j<result.length; j++){
                if(vm.seasonList[i]==result[j].DATE_PERIOD){
                  hunanGDPArr.push(result[j].GDP);
                }
                if(vm.currentSeason==result[j].DATE_PERIOD){
                  vm.showGDP = result[j].GDP;
                  vm.showGDPZL = result[j].ZZL;
                }
              }
            }
          }
          vm.GDPConfig.dataLoaded=true;
        });
      }else{
        var key='leader/economy/qryEconomyForArea2/4/'+district_no+'/'+vm.startSeason+'_'+vm.currentSeason;//GDP查询季度
        CommService.getHttpJsonItem(key,devUrl+key,function(response){
          var result=response.data;
          hunanGDPArr.length = 0;
          if(result.length>0){
            for(var i=0;i<vm.seasonList.length;i++){
              for(var j=0; j<result.length; j++){
                if(vm.seasonList[i]==result[j].DATE_PERIOD){
                  hunanGDPArr.push(result[j].JJZL);
                }
                if(vm.currentSeason==result[j].DATE_PERIOD){
                  vm.showGDP = result[j].JJZL;
                  vm.showGDPZL = result[j].ZZL;
                }
              }
            }

          }
          vm.GDPConfig.dataLoaded=true;
        });
      }
    }

    vm.loadMap=function(){
      vm.mapConfig = {
        theme: 'Donut',
        dataLoaded: false
      };
      vm.mapOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>GDP总额 : {c} 亿元',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        title: {
          text: '湖南省经济发展分布情况',
          x:'center',
          y:chart2_w1,
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
          min: 100,
          max: vm.mapMax,
          orient:'horizontal',
          left: 'center',
          y: chart2_w2,
          text: ['高','低'],           // 文本，默认为数值文本
          calculable: true,
          inRange: {
            color: ['#f1f3ff','#2e40a4']
          }
        },
        series: [{
          title:'xxx',
          name: '总量',
          type: 'map',
          map: 'hunan',
          roam: false,
          zoom: 1.1,
          left: 'center',
          top: '9%',
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
      //查询各地区的GDP
      //var key='leader/economy/qryEconomyForArea/1/1/'+latestYear+'_'+latestYear;
      var key='leader/economy/qryEconomyForArea/4/1/'+vm.currentSeason+'_'+vm.currentSeason;//GDP查询季度
      CommService.getHttpJsonItem(key,devUrl+key,function(response){
        var result=response.data;
        for(var i=0;i<result.length;i++){
          mapData.push({seriesId:result[i].DISTRICT_NO,name:result[i].DISTRICT_NAME,value:result[i].JJZL,zzl:result[i].ZZL});
          areaMap[result[i].DISTRICT_NAME]=result[i].DISTRICT_NO;
        }
        vm.mapConfig.dataLoaded=true;
        vm.mapConfig.event = [{mapselectchanged:onMapSelectChanged}];
      });
      //查询湖南省的GDP
      //var key1='leader/economy/qryEconomy/1/1/'+latestYear+'_'+latestYear;
      var key1='leader/economy/qryEconomy/4/1/'+vm.currentSeason+'_'+vm.currentSeason;//GDP查询季度
      CommService.getHttpJsonItem(key1,devUrl+key1,function(response){
        var result=response.data;
        if(result.length>0){
          mapData.push({seriesId:1,name:'湖南省',value:result[0].GDP,zzl:result[0].ZZL});
          areaMap[result[0].DISTRICT_NAME]=result[0].DISTRICT_NO;
          vm.economicTotal = result[0].GDP;
          vm.hunanGDP = result[0].GDP;
          if(result[0].ZZL>0){
            vm.economicIncreasePercent = '↑' + result[0].ZZL + '%';
            vm.hunanGDPIncreasePercent = '↑' + result[0].ZZL + '%';
            vm.hunanGDPIncreaseStyle = {"color":"#ff3b67"};
          }else{
            vm.economicIncreasePercent = result[0].ZZL + '%';
            vm.hunanGDPIncreasePercent = result[0].ZZL + '%';
            vm.hunanGDPIncreaseStyle = {"color":"#339900"};
          }
        }else{
          vm.economicTotal = 暂无数据;
          vm.economicIncreasePercent = '';
        }
      });
      if(vm.screenSizeType=='L'){
        vm.mapHeight = {'height':'705px'};
      }else{
        vm.mapHeight = {'height':'560px'};
      }
    };

    vm.loadPieChart=function($http, devUrl,district_no){
      vm.pieConfig={
        theme: 'Donut',
        dataLoaded: false
      };
      var pieLegendData=[];
      var pieData=[];
      vm.pieOption={
        grid: {
          left: 10
        },
        color: ['#52bfa0', '#CB65BB', '#574FBE'],
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c} 亿元'
        },
        legend: {
          x:'center',
          y:'bottom',
          textStyle:{
            fontSize:10
          },
          itemWidth:10,
          itemHeight:10,
          padding:[0,0,5,0],
          width:bar_w,
          data:pieLegendData

        },
        series: [{
          name:'总数',
          type:'pie',
          center:['50%', '45%'],
          radius: ['65%', '90%'],
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
      //var key='leader/economy/qryEconomyForIndustry/1/'+district_no+'/'+latestYear+'_'+latestYear;
      var key='leader/economy/qryEconomyForIndustry/4/'+district_no+'/'+vm.currentSeason+'_'+vm.currentSeason;//按季度查询饼图三大产业
      CommService.getHttpJsonItem(key,devUrl+key,function(response){
        for(var i in response.data){
          pieLegendData.push(response.data[i].CYFL_NAME);
          pieData.push({name:response.data[i].CYFL_NAME,value:response.data[i].JJZL});
        }
        vm.pieConfig.dataLoaded = true;
      });
    };

    //查询各地区的固定投资总量及增长率
    $http.get(devUrl + 'leader/investment/qryInvestmentForArea/1/1/'+latestYear+'_'+latestYear)
      .success(function (response) {
        if (angular.isUndefined(response)) {
          SweetAlert.swal("没有查到相关数据");
        }
        var data = response.data;
        if(data.length>0){
          for(var i=0; i<data.length; i++){
            investmentMap.push({areaNo:data[i].DISTRICT_NO, areaName:data[i].DISTRICT_NAME, value:data[i].TZZL, rate:data[i].ZZL});
          }
        }
      }).error(function () {
      SweetAlert.swal("网络有问题，待会再试");
    });

    //查询湖南省的固定投资总量及增长率
    $http.get(devUrl + 'leader/investment/qryInvestmentForAreaByDate/5/1/'+vm.currentMonth)
      .success(function (response) {
        if (angular.isUndefined(response)) {
          SweetAlert.swal("没有查到相关数据");
        }
        var data = response.data;
        if(data!=null){
          investmentMap.push({areaNo:1,areaName:'湖南省',value:data.TZZL,rate:data.ZZL});
          // mapData.push({seriesId:1,name:'湖南省',value:data.GDP,zzl:data.ZZL});
          vm.investmentTotal = data.TZZL;
          vm.hunanInvestment = data.TZZL;
          var rate = data.ZZL;
          if(rate>0){
            rate = '↑' + rate;
          }
          vm.hunanInvestmentRate = rate;
        }
      }).error(function () {
      SweetAlert.swal("网络有问题，待会再试");
    });

    vm.loadBarChart=function($http, devUrl,district_no){
      var barData = [];
      var axisData = [];
      var backData = [];
      var axisMax;
      for(var i=0; i<investmentMap.length; i++){
        if(investmentMap[i].areaNo==district_no){
          axisMax = investmentMap[i].value;
          vm.investmentRate = investmentMap[i].rate;
        }
      }
      vm.investmentTotal = axisMax;
      vm.barConfig = {
        theme: 'Donut',
        dataLoaded: false
      };
      vm.barOption = {
        title: {
          text: ''
        },
        color: ['#3697FF'],
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c} 亿元'
        },
        grid:{
          top:30,
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
              },
              formatter:function(val){
                if(val.length>3){
                  val = val.substring(0,3)+"...";
                }
                return val;
              }
              //rotate: 30
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
            // data: ['制造业','房地产','水利\n环境\n公共设施\n管理业','交通运输\n仓储\n邮政业','批发\n零售业','农林\n牧渔业',
            //   '电力\n燃气\n水的生产\n供应业','公共管\n理社会\n组织','采矿业','租赁\n商务\n服务业']
            data: axisData
          }
        ],
        yAxis: [
          {
            // axisLine: {show: false},//去掉Y轴线
            splitLine:{show: false},//去除网格线
            type: 'value',
            name: '单位：亿元',
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
          /*{
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
          },*/
          {
            barWidth:21,
            name:'总额',
            type:'bar',
            // data:[9079.12, 3651.92, 3539.62, 1800.94, 1270.61,1116.75,926.00, 690.03, 626.75, 552.93],
            data:barData,
            itemStyle:{normal:{color:'#564FBE'}}
          }]
      };

      var keyM = "leader/investment/qryInvestmentForIndustryByDate/1";
      CommService.getHttpJsonItem(keyM,devUrl+keyM,function(response){
        var data = response.data;
        //var key='leader/investment/qryInvestmentForTrade/5/'+district_no+'/'+vm.currentMonth+'_'+vm.currentMonth;
        vm.GDZCHY_DATE = data.MAXDATE;
        var key='leader/investment/qryInvestmentForTrade/1/'+district_no+'/'+data.MAXDATE+'_'+data.MAXDATE;
        CommService.getHttpJsonItem(key,devUrl+key,function(response){
          var data = response.data;
          var max=0;
          barData.length= 0;
          backData.length= 0;
          if(data.length>0) {

            for(var i=0; i<data.length; i++){
              if(i>9){
                break;
              }
              if(data[i].TZZL>max){
                max=data[i].TZZL;
              }
              barData.push(data[i].TZZL);
              axisData.push(data[i].INDUSTRY_CATEGORY_NAME);

            }
            for(var j in barData){
              backData.push(max);
            }
            //vm.barOption.yAxis.max=max;
          }
          vm.barConfig.dataLoaded = true;
        });
      });

    };

    //查询农村人口
    function qryCountryside(district_no){
      $http.get(devUrl + '/leader/population/generalStat/'+district_no+'/1/'+latestYear+'_'+latestYear+'/2/0')
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          var data = response.data;
          if(data.length>0){
            vm.ruralPopulation = data[0].POPULATION/10000;
            //计算总人口
            var populationTotal = vm.ruralPopulation + vm.urbanPopulation + "";
            var ruralPopulation = vm.ruralPopulation + "";
            var urbanPopulation = vm.urbanPopulation + "";
            //计算农村人口和城镇人口占比
            var ruralPercent = vm.ruralPopulation / vm.populationTotal * 100;
            var urbanPercent = vm.urbanPopulation / vm.populationTotal * 100;
            if(ruralPopulation.indexOf('.')>-1){
              //ruralPopulation = ruralPopulation.substring(0, ruralPopulation.indexOf('.'));
              ruralPopulation = parseFloat(ruralPopulation).toFixed(2);
            }
            if(urbanPopulation.indexOf('.')>-1){
              //urbanPopulation = urbanPopulation.substring(0, urbanPopulation.indexOf('.'));
              urbanPopulation =  parseFloat(urbanPopulation).toFixed(2);
            }
            vm.ruralPopulation = ruralPopulation + '万';
            vm.urbanPopulation = urbanPopulation + '万';
            if(populationTotal.indexOf('.')>-1){
              //populationTotal = populationTotal.substring(0, populationTotal.indexOf('.'));
              populationTotal =  parseFloat(populationTotal).toFixed(2);
            }
            vm.populationTotal = populationTotal + '万';
            vm.ruralPopulation1 = ruralPopulation;
            vm.urbanPopulation1 = urbanPopulation;
            vm.populationTotal1 = populationTotal;
            $('head').append("<style>.jdt:after{ width:"+ ruralPercent+"px }</style>");
            $('head').append("<style>.czrk:after{ width:"+ urbanPercent+"px }</style>");
          }else{
            vm.ruralPopulation = '暂无数据';
            vm.urbanPopulation = '暂无数据';
            vm.populationTotal = '暂无数据';
            $('head').append("<style>.jdt:after{ width:0px }</style>");
            $('head').append("<style>.czrk:after{ width:0px }</style>");
          }
        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });
    }

    //查询人口数
    vm.personsStat = function(district_no){
      //查询城镇人口
      $http.get(devUrl + '/leader/population/generalStat/'+district_no+'/1/'+latestYear+'_'+latestYear+'/1/0')
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          var data = response.data;
          if(data.length>0){
            vm.urbanPopulation = data[0].POPULATION/10000;
            qryCountryside(district_no);
          }else{
            vm.ruralPopulation = '暂无数据';
            vm.urbanPopulation = '暂无数据';
            vm.populationTotal = '暂无数据';
            $('head').append("<style>.jdt:after{ width:0px }</style>");
            $('head').append("<style>.czrk:after{ width:0px }</style>");
          }
        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });
    };

    //查询财政收支
    vm.FinancialStat = function(district_no){
      //财政支出
      var key='leader/govfinance/querySrdyfx/'+district_no;//回归理性
      //var key='leader/govfinance/querySrdyfxBymonth/'+district_no+'/'+vm.currentMonth+"_"+vm.currentMonth;//财政收入首页按月度查询
      CommService.getHttpJsonItem(key,devUrl+key,function(response){
        var data = response.data;
        if(data.length>0){
          var item=data[data.length-1];
          vm.expenditureInt = parseFloat(item.ZCZE)*0.0001;
          vm.expenditure = vm.expenditureInt.toFixed(2) + '亿元';
          vm.revenueInt = parseFloat(item.SYSRZE)*0.0001;
          vm.revenue = vm.revenueInt.toFixed(2) + '亿元';
        }else{
          vm.expenditureInt = 0;
          vm.expenditure = '暂无数据';
          vm.revenueInt = 0;
          vm.revenue = '暂无数据';
        }
      });
    };

    //查询教育经费
    vm.loadFund = function(){
      var key='leader/edu/qryjyqkjyjflist/1/'+(latestYear-1)+'_'+latestYear+'/2';
      CommService.getHttpJsonItem(key,devUrl+key,function(response){
        var data = response.data;
        if(data.length>0){
          var fundInt = 0;
          var lastFundInt = 0;
          for(var i=0; i<data.length; i++){
            if(data[i].DATE_PERIOD==latestYear){
              fundInt = data[i].HOST_INVESTMENT + data[i].OTHER_FUNDS + data[i].SOCIAL_DONATION + data[i].STATE_BUDGETARY + data[i].UNDERTAKING_INCOME;
              vm.fund = fundInt + '万元';
              session.fund = vm.fund;
            }else if(data[i].DATE_PERIOD==(latestYear-1)){
              lastFundInt = data[i].HOST_INVESTMENT + data[i].OTHER_FUNDS + data[i].SOCIAL_DONATION + data[i].STATE_BUDGETARY + data[i].UNDERTAKING_INCOME;
            }
          }
          vm.fundIncreasePercent = (fundInt-lastFundInt)/lastFundInt *100;
          if(vm.fundIncreasePercent>0){
            vm.fundSign = '↑';
            vm.fundStyle = {"color":"#ff3b67"};
          }else{
            vm.fundSign = '↓';
            vm.fundStyle = {"color":"#339900"};
          }
        }else{
          vm.fund = '暂无数据';
        }
      });
    };

    //查询床位数
    vm.loadbedNum = function(){
      var key='leader/medical/qryylwsjbqklist/1/'+instituteYear+'_'+instituteYear+'/2?districtNo=0';
      CommService.getHttpJsonItem(key,devUrl+key,function(response){
        var data = response.data;
        if(data.length>0){
          var bedNumInt = 0;
          var lastBedNumInt = 0;
          for(var i=0; i<data.length; i++){
            if(data[i].DATE_PERIOD==instituteYear){
              bedNumInt = data[i].INSTITUTIONS_NUM;
              vm.bedNum = bedNumInt + '张';
              vm.bedNumRate = data[i].INSTITUTIONS_NUM_ZZL;
            }
          }

        }else{
          vm.bedNum = '暂无数据';
        }
      });

    };

    //查询居民可支配收入
    vm.loadDisposablIncome = function(){
      //var key='economy/tax/qryDisposablIncome?datePeriodType=1&startDate='+latestYear+'&endDate='+latestYear;
      var key='economy/tax/qryDisposablIncome?datePeriodType=4&startDate='+vm.currentSeason+'&endDate='+vm.currentSeason;
      CommService.getHttpJsonItem(key,devUrl+key,function(response){
        var data = response.data;
        if(data.length>0){
          vm.disposablIncome = data[0].RJKZPSR + '元';
          vm.disposablIncomeIncreasePercent = data[0].RJKZPSR_ZZL;
        }else{
          vm.disposablIncome = '暂无数据';
        }
      });

    };

    //查询失业率
    vm.loadUmempRate = function(){
      var key='leader/employment/cityjob/1/'+(latestYear-1)+'_'+latestYear+'/0';
      CommService.getHttpJsonItem(key,devUrl+key,function(response){
        var data=response.data;
        if(data.length>0){
          var umempRateInt = 0;
          var lastUmempRateInt = 0;
          for(var i=0; i<data.length; i++){
            if(data[i].DISTRICT_NO==1){
              if(data[i].DATE_PERIOD==latestYear){
                umempRateInt = data[i].SYL;
                vm.unempRate = umempRateInt + '%';
              }else if(data[i].DATE_PERIOD==(latestYear-1)){
                lastUmempRateInt = data[i].SYL;
              }
            }
          }
          vm.umempRateIncreasePercent = (umempRateInt-lastUmempRateInt)/lastUmempRateInt *100;
          if(vm.umempRateIncreasePercent>0){
            vm.unempSign = '↑';
            vm.unempRateStyle = {"color":"#ff3b67"};
          }else{
            vm.unempSign = '↓';
            vm.unempRateStyle = {"color":"#339900"};
            vm.umempRateIncreasePercent=Math.abs(vm.umempRateIncreasePercent);
          }
        }else{
          vm.unempRate = 暂无数据;
          vm.unempRateIncreasePercent = '';
        }
      });

    };

    vm.tmpWeatherMonth = '201708';
    vm.tmpWeatherShowMonth = '2017年8月';
    //查询空气质量达标天数
    vm.loadAirQuality = function(){
      //var key='leader/envprotect/qrydqhjzl?datePeriodType=3&areaNo=1&includeChildArea=false&startDate='+vm.currentMonth+'&endDate='+vm.currentMonth;
      var key='leader/envprotect/qrydqhjzl?datePeriodType=3&areaNo=1&includeChildArea=false&startDate='+vm.tmpWeatherMonth+'&endDate='+vm.tmpWeatherMonth;
      CommService.getHttpJsonItem(key,devUrl+key,function(response){
        var data = response.data;
        if(data.length>0){
          vm.hjbh = data[0].YLTS + '天';
          vm.hjbhRate = data[0].YLTS_ZZL;
        }else{
          //vm.disposablIncome = '暂无数据';
        }
      });
    };

    //计时器部分
    vm.initTimeClock = function(){
      var oimg = document.querySelectorAll('#tab_con aside');//获取aside元素
      var oli =  document.querySelectorAll('#banner #hometab li');//获取li
      var banner = document.getElementById('banner');//获取盒子
      var length = oimg.length;
      var index = 0;
      var timer = null;
      for (var i = 0; i < length; i++) {  //循环获取aside元素
        oli[i].goudan = i;
        oli[i].onclick = function(){   //给li点击事件
          for (var j = 0; j < length; j++) { //循环获取aside个数
            oimg[j].className = '';  //所有的aside元素的className都不给样式
            oli[j].className = '';   //所有的li元素的className都不给样式
          }
          this.className = 'on';     //当前点击的元素className给on属性
          oimg[this.goudan].className = 'on';  //当前下标的aside元素给on元素
          index = this.goudan;
        };
      }
      banner.onmouseover = function(){
        clearInterval(timer);           //移入停止计时器
      };
      banner.onmouseout = function(){
        timer = setInterval(auto,3500); //移出启动计时器
      };
      timer = setInterval(auto,3500);
      function auto(){
        index ++;
        index %=length;
        for (var i = 0; i < length; i++) { //循环aside元素
          oimg[i].className = '';
          oli[i].className = '';
        }
        oimg[index].className = 'on';
        oli[index].className = 'on';
      }
    };

    //查询近5年湖南省的GDP
    vm.loadHnGDP = function(){
      vm.GDPConfig={
        theme: 'Donut',
        dataLoaded: false
      };
      vm.GDPOption = {
        tooltip: {
          trigger: 'axis'
        },
        grid:{
          x:48,
          y:30,
          x2:40,
          y2:60,
          // borderColor:"#ffffff", //X和Y轴两边的线条
          borderWidth:1
        },
        xAxis:{
          // axisTick: {alignWithLabel: true},
          axisTick : {  //去掉X轴小点
            inside: false,
            length: 5,
            lineStyle: {
              color: '#ffffff',
              shadowColor: '#ffffff'
              // shadowOffsetY: -5
            }
          },
          axisLine: {
            show: false,  //隐藏X轴
            lineStyle:{
              color:"#8996a3"   //X轴颜色不起效果
            }
          },
          type: 'category',
          axisLabel:{
            // show:false,
            'interval':0,
            textStyle: {  //X轴字体颜色
              color: '#8996a3',
              fontSize:12   //X轴字体大小
            }
            //rotate: 30
          },
          boundaryGap: false,
          splitLine:{
            show:false
          },
          data: vm.seasonList2
        },
        yAxis: {
          axisLine: {
            show: true,
            lineStyle:{
              color:"#ffffff"
            }
          },
          min: 0,
          // axisLine: {show: true},
          nameTextStyle:{
            color:"#8C98A5"
          },
          axisTick : {  //去掉Y轴小点
            inside: false,
            length: 5,
            lineStyle: {
              color: '#ffffff',
              shadowColor: '#ffffff'
              // shadowOffsetY: -5
            }
          },
          type: 'value',
          name: '单位：亿元',
          nameLocation:'end',//Y轴名称位置
          // splitNumber: 4,
          boundaryGap: [0.5, 0.5],// 坐标轴两端空白策略，数组内数值代表百分比
          axisLabel: {
            formatter: '{value}',
            textStyle: {  //X轴字体颜色
              color: '#8996a3',
              fontSize:12   //X轴字体大小
            }
          }
        },
        series: [
          {
            center:[100,100],
            name:'GDP总量',
            type:'line',
            data:hunanGDPArr,
            itemStyle : {
              normal : {
                color:'#FFA72A',  //折线原点颜色
                lineStyle:{
                  width:3,
                  color:'#1587C4'  //折线条颜色
                }
              }
            }
          }
        ]
      };
      //var key='leader/economy/qryEconomy/1/1/'+(latestYear-4)+'_'+latestYear;
      var key='leader/economy/qryEconomy/4/1/'+vm.startSeason+'_'+vm.currentSeason;//查询近五个季度的湖南省的GDP
      CommService.getHttpJsonItem(key,devUrl+key,function(response){
        var result=response.data;
        if(result.length>0){
          for(var i=0;i<vm.seasonList.length;i++){
            for(var j=0; j<result.length; j++){
              if(vm.seasonList[i]==result[j].DATE_PERIOD){
                hunanGDPArr.push(result[j].GDP);
              }
              if(vm.currentSeason==result[j].DATE_PERIOD){
                vm.showGDP = result[j].GDP;
                vm.showGDPZL = result[j].ZZL;
              }
            }
          }
        }
        vm.GDPConfig.dataLoaded=true;
      });
    };

    //查询近5年规模以上工业相关数据
    vm.loadScaleIndustry = function(){
      var data = [];
      vm.scaleIndustryConfig={
        theme: 'Donut',
        dataLoaded: false
      };
      vm.scaleIndustryOption = {
        tooltip: {
          trigger: 'axis'
        },
        grid:{
          x:48,
          y:30,
          x2:40,
          y2:60,
          borderColor:"#ffffff", //X和Y轴两边的线条
          borderWidth:1
        },
        xAxis:{
          axisTick : {   //去掉X轴小点
            inside: false,
            length: 5,
            lineStyle: {
              color: '#ffffff',
              shadowColor: '#ffffff'
              // shadowOffsetY: -5
            }
          },
          axisLine: {show: false},
          type: 'category',
          boundaryGap: false,
          splitLine:{
            show:false
          },
          axisLabel:{
            'interval':0,
            textStyle: {  //X轴字体颜色
              color: '#8996a3',
              fontSize:12   //X轴字体大小
            }
            //rotate: 30
          },
          data: vm.month_01_List
        },
        yAxis: {
          axisLine: {   //去掉Y轴线条
            show: true,
            lineStyle:{
              color:"#ffffff"
            }
          },
          min:'0',
          nameTextStyle:{
            color:"#8C98A5"
          },
          axisTick : {  //去掉Y轴小点
            inside: false,
            length: 5,
            lineStyle: {
              color: '#ffffff',
              shadowColor: '#ffffff'
              // shadowOffsetY: -5
            }
          },
          type: 'value',
          name: '单位：%',
          boundaryGap: [2, 2],
          axisLabel: {
            formatter: '{value}',
            textStyle: {  //X轴字体颜色
              color: '#8996a3',
              fontSize:12   //X轴字体大小
            }
          }
        },
        series: [
          {
            name:'规模工业',
            type:'line',
            data:vm.gygmData,
            itemStyle : {
              normal : {
                color:'#FFA72A',
                lineStyle:{
                  width:3,
                  color:'#1587C4'
                }
              }
            }
          }
        ]
      };

      //var key='leader/investment/qryScaleIndustry/1/' + (latestYear - 4) + '_' + latestYear;
      var key='leader/investment/qryScaleIndustryByArea/3/1/' + vm.startMonth + '_' + vm.currentMonth;//湖南省的工业规模近5个月的
      //http://10.118.20.29/webservice/leader/investment/qryScaleIndustryByArea/3/100/201704_201708
      CommService.getHttpJsonItem(key,devUrl+key,function(response){
        var result = response.data;
        if (result.length > 0) {
          var curYearTotal = 0;
          var preYearTotal = 0;
          for (var i = 0; i < result.length; i++) {
            vm.gygmData.push(result[i].SR);
            if (result[i].DATE_PERIOD == vm.currentMonth) {
              vm.scaleIndustry = result[i].SR;
              curYearTotal = result[i].SR;
            }
          }
          var increaseRate = (curYearTotal - preYearTotal) / preYearTotal * 100;
          vm.scaleIndustryRate = increaseRate;
          if (increaseRate > 0) {
            vm.scaleIndustrySign = '↑';
          } else {
            vm.scaleIndustrySign = '';
          }
        }
        vm.scaleIndustryConfig.dataLoaded = true;
      });

    };

    //查询近5年固定投资总量
    vm.loadInvestment = function(){
      var data = [];
      vm.investmentConfig={
        theme: 'Donut',
        dataLoaded: false
      };
      vm.investmentOption = {
        tooltip: {
          trigger: 'axis'
        },
        grid:{
          x:48,
          y:30,
          x2:40,
          y2:60,
          borderColor:"#ffffff", //X和Y轴两边的线条
          borderWidth:1
        },
        xAxis:{
          axisTick : {
            inside: false,
            length: 5,
            lineStyle: {
              color: '#ffffff',
              shadowColor: '#ffffff'
              // shadowOffsetY: -5
            }
          },
          axisLine: {show: false},
          type: 'category',
          boundaryGap: false,
          splitLine:{
            show:false
          },
          axisLabel:{
            'interval':0,
            textStyle: {  //X轴字体颜色
              color: '#8996a3',
              fontSize:12   //X轴字体大小
            }
            //rotate: 30
          },
          //data: vm.month_02_List
          data: vm.gdzc_data_List
        },
        yAxis: {
          axisLine: {
            show: true,
            lineStyle:{
              color:"#ffffff"
            }
          },
          nameTextStyle:{
            color:"#8C98A5"
          },
          axisTick : {  //去掉Y轴小点
            inside: false,
            length: 5,
            lineStyle: {
              color: '#ffffff',
              shadowColor: '#ffffff'
              // shadowOffsetY: -5
            }
          },
          type: 'value',
          name: '单位：亿元',
          boundaryGap: [0.5, 0.5],
          axisLabel: {
            formatter: '{value}',
            textStyle: {  //X轴字体颜色
              color: '#8996a3',
              fontSize:12   //X轴字体大小
            }
          }
        },
        series: [
          {
            name:'固定资产',
            type:'line',
            data:vm.inverstData,
            itemStyle : {
              normal : {
                color:'#FFA72A',
                lineStyle:{
                  width:3,
                  color:'#1587C4'
                }
              }
            }
          }
        ]
      };


      var keym='leader/investment/qryInvestmentForAreaMaxDate/1';
      CommService.getHttpJsonItem(keym,devUrl+keym,function(response){
        var data = response.data;
        vm.GDZCQY_DATE = data.MAXDATE;
        var startYear = parseInt(data.MAXDATE)-4;
        var key='leader/investment/qryInvestmentForAreaByDatePeriod/1/1/'+startYear+'_'+data.MAXDATE;
        CommService.getHttpJsonItem(key,devUrl+key,function(response){
          var result=response.data;
          vm.gdzc_data_List.length=0;
          if(result.length>0){
            for(var i=0; i<result.length; i++){
              if(result[i].DISTRICT_NO==1){
                vm.inverstData.push(result[i].TZZL);
                vm.gdzc_data_List.push(result[i].DATE_PERIOD);
                if (result[i].DATE_PERIOD == vm.GDZCQY_DATE) {
                  vm.hunanInvestment_1 = result[i].TZZL;
                  vm.hunanInvestmentRate_1= result[i].ZZL;
                }

              }
            }
          }
          vm.investmentConfig.dataLoaded=true;
        });
      });




    };

    //查询近5年居民消费
    vm.loadResidentConsumption = function(){
      var data = [];
      vm.residentConsumptionConfig={
        theme: 'Donut',
        dataLoaded: false
      };
      vm.residentConsumptionOption = {
        tooltip: {
          trigger: 'axis'
        },
        grid:{
          x:48,
          y:30,
          x2:40,
          y2:60,
          borderColor:"#ffffff", //X和Y轴两边的线条
          borderWidth:1
        },
        xAxis:{
          axisTick : {
            inside: false,
            length: 5,
            lineStyle: {
              color: '#ffffff',
              shadowColor: '#ffffff'
              // shadowOffsetY: -5
            }
          },
          splitLine:{show: false},//去除网格线
          axisLine: {show: false},
          type: 'category',
          boundaryGap: false,
          axisLabel:{
            'interval':0,
            textStyle: {  //X轴字体颜色
              color: '#8996a3',
              fontSize:12   //X轴字体大小
            }
            //rotate: 30
          },
          data: vm.seasonList2
        },
        yAxis: {
          // splitLine:{show: false},//去除网格线
          axisLine: {
            show: true,
            lineStyle:{
              color:"#ffffff"
            }
          },
          axisTick : {  //去掉Y轴小点
            inside: false,
            length: 5,
            lineStyle: {
              color: '#ffffff',
              shadowColor: '#ffffff'
              // shadowOffsetY: -5
            }
          },
          nameTextStyle:{
            color:"#8C98A5"
          },
          type: 'value',
          name: '单位：亿元',
          axisLabel: {
            formatter: '{value}',
            textStyle: {  //X轴字体颜色
              color: '#8996a3',
              fontSize:12   //X轴字体大小
            }
          }
        },
        series: [
          {
            name:'社会消费品零售额',
            type:'line',
            data:vm.societyData,
            itemStyle : {
              normal : {
                color:'#FFA72A',
                lineStyle:{
                  width:3,
                  color:'#1587C4'
                }
              }
            }
          }
        ]
      };
      //var key='leader/residents/jmsr/qryConsumeOverall/1/1/'+(latestYear-4)+'_'+latestYear;
      var key='leader/investment/qrySocietyConsume/4/1/'+vm.startSeason+'_'+vm.currentSeason;
      CommService.getHttpJsonItem(key,devUrl+key,function(response){
        var result=response.data;
        if(result.length>0) {
          for (var i = 0; i < result.length; i++) {
            vm.societyData.push(result[i].LSZE);
            if (result[i].DATE_PERIOD == vm.currentSeason) {
              vm.society = result[i].LSZE;
              vm.societyRate= result[i].LSZE_ZZL;
              vm.society_r = result[i].LSZE;
              vm.societyRate_r= result[i].LSZE_ZZL;
            }
          }
        }
        vm.residentConsumptionConfig.dataLoaded=true;
      });
    };

    //查询近5年进出口额
    vm.loadImportAndExport = function(){
      var data = [];
      vm.ImportAndExportConfig = {
        theme: 'Donut',
        dataLoaded: false
      };
      vm.ImportAndExportOption = {
        tooltip: {
          trigger: 'axis'
        },
        grid:{
          x:40,
          y:30,
          x2:40,
          y2:60,
          borderColor:"#ffffff", //X和Y轴两边的线条
          borderWidth:1
        },
        xAxis:{
          axisTick : {
            inside: false,
            length: 5,
            lineStyle: {
              color: '#ffffff',
              shadowColor: '#ffffff'
              // shadowOffsetY: -5
            }
          },
          axisLine: {show: false},
          type: 'category',
          boundaryGap: false,
          splitLine:{
            show:false
          },
          axisLabel:{
            'interval':0,
            textStyle: {  //X轴字体颜色
              color: '#8996a3',
              fontSize:12   //X轴字体大小
            }
            //rotate: 30
          },
          data: vm.month_02_List
        },
        yAxis: {
          axisLine: {
            show: true,
            lineStyle:{
              color:"#ffffff"
            }
          },
          nameTextStyle:{
            color:"#8C98A5"
          },
          axisTick : {  //去掉Y轴小点
            inside: false,
            length: 5,
            lineStyle: {
              color: '#ffffff',
              shadowColor: '#ffffff'
              // shadowOffsetY: -5
            }
          },
          type: 'value',
          name: '单位：亿元',
          axisLabel: {
            formatter: '{value}',
            textStyle: {  //X轴字体颜色
              color: '#8996a3',
              fontSize:12   //X轴字体大小
            }
          }
        },
        series: [
          {
            name:'房地产投资金额',
            type:'line',
            data:vm.importData,
            itemStyle : {
              normal : {
                color:'#FFA72A',
                lineStyle:{
                  width:3,
                  color:'#1587C4'
                }
              }
            }
          }
        ]
      };
      //var key='economy/consume/qryIncomeOutcome?datePeriodType=1&startDate='+(latestYear-4)+'&endDate='+latestYear+'&needGoodsType=0';
      var key='economy/consume/qryIncomeOutcomeForArea?datePeriodType=5&startDate='+vm.startMonth+'&endDate='+vm.currentMonth+'&needGoodsType=0&districtNo=1';
      CommService.getHttpJsonItem(key,devUrl+key,function(response){
        var result=response.data;
        if(result.length>0){
          for(var i=0; i<result.length; i++){
            vm.importData.push((parseFloat(result[i].JKE) + parseFloat(result[i].CKE)).toFixed(2));
            if(result[i].DATE_PERIOD==vm.currentMonth){
              vm.ImportAndExport = (parseFloat(result[i].JKE) + parseFloat(result[i].CKE)).toFixed(2);
              vm.ImportAndExportRate = result[i].JCKZCL;
              //vm.ImportAndExportRate = ((parseFloat(result[i].JKE+result[i].CKE) -parseFloat(result[i-1].JKE-result[i-1].CKE))*100/parseFloat(result[i-1].JKE + result[i-1].CKE)).toFixed(1);
            }
          }

        }
        vm.ImportAndExportConfig.dataLoaded=true;
      });
    };

    vm.loadHuInvest =function(){
      $http.get(devUrl + 'leader/investment/qryInvestmentForAreaByDate/5/1/'+vm.currentMonth)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          var data = response.data;
          if(data!=null){
            investmentMap.push({areaNo:1,areaName:'湖南省',value:data.TZZL,rate:data.ZZL});
            // mapData.push({seriesId:1,name:'湖南省',value:data.GDP,zzl:data.ZZL});
            vm.investmentTotal = data.TZZL;
            vm.hunanInvestment = data.TZZL;
            var rate = data.ZZL;
            if(rate>0){
              rate = '↑' + rate;
            }
            vm.hunanInvestmentRate = rate;
          }
        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });
    }
    vm.loadAll =function(){
      var key='leader/economy/indexNewestDate';
      CommService.getHttpJsonItem(key,devUrl+key,function(response){
        var result=response.data;
        //vm.currentMonth = '201708';
        //vm.currentSeason = '201702';
        vm.currentSeason = result[0].SEASON;
        vm.currentMonth = result[1].MONTH;
        vm.calMonthAndSearson();
        //左边部分
        vm.loadPieChart($http, devUrl,1);
        $timeout(function(){ //防止第一次加载时，异步加载“查询各地区的固定投资总量及增长率”还未完成时的情况
          vm.loadBarChart($http, devUrl,1);
        },1500);

        vm.loadMap();
        vm.personsStat(1);
        vm.FinancialStat(1);
        //右上部分
        vm.loadFund();
        vm.loadbedNum();
        vm.loadDisposablIncome();
        vm.loadUmempRate();
        vm.loadAirQuality();
        //右下部分
        vm.initTimeClock();
        vm.loadHnGDP();
        vm.loadScaleIndustry();
        vm.loadInvestment();
        vm.loadImportAndExport();
        vm.loadResidentConsumption();
        vm.loadHuInvest();
      });
    }

    vm.loadAll();

  }
})();
