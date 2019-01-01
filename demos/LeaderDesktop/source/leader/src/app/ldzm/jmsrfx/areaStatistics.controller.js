/**
 * 领导桌面-居民收入分析-地域居民收支分析
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('IncomeAreaStatController', IncomeAreaStatController);

  /** @ngInject */
  function IncomeAreaStatController($scope, $http, devUrl, CommService,latestYear) {
    var vm = this;
    var myDate = new Date();
    var curYear=latestYear-1;
    vm.lastYear = curYear + '年';
    //地图
    vm.curAreaName="湖南省";
    var areaMap={};
    vm.initMap = function($http, devUrl){
      var mapData=[];
      vm.mapConfig = {
        theme: 'Donut',
        dataLoaded: false
      };
      vm.mapOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}居民平均收入为<br/>{c} 元',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        visualMap: {
          min: 10000,
          max: 50000,
          orient:'horizontal',
          left: 'center',
          //top: 'bottom',
          bottom:'40',
          text: ['高','低'],           // 文本，默认为数值文本
          calculable: true,
          inRange: {
            color: ['#f1f3ff','#2e40a4']
          }
        },
        series: [{
          name: '总量',
          type: 'map',
          map: 'hunan',
          roam: false,
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
      // vm.mapConfig.dataLoaded=true;
      var url='leader/residents/qryHnjmsrfx';
      CommService.getHttpJsonItem(url, devUrl + url,function(response){
        var result=response.data;
        for(var i=0;i<result.length;i++){
          mapData.push({seriesId:result[i].DISTRICT_NO,name:result[i].DISTRICT_NAME,value:result[i].AVG_INCOME});
          areaMap[result[i].DISTRICT_NAME]=result[i].DISTRICT_NO;
        }
        //console.log(areaMap);
        vm.mapConfig.dataLoaded=true;
        vm.mapConfig.event = [{mapselectchanged:onMapSelectChanged}];
      });
    };

    //城市
    var citySr=[];
    var yearList=[];
    vm.barData1 = function($http, devUrl,district_no) {
      yearList=[];
      citySr= [];
      // citySr=[];
      // cityZc=[];
      yearList=[];
    	vm.barConfig1 = {
	      theme: 'Donut',
	      dataLoaded: false
	    };
	    vm.barOption1 = {
	      tooltip: {
	        trigger: 'axis',
	        axisPointer: { // 坐标轴指示器，坐标轴触发有效
	          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
	        }
	      },
	      legend: {
	        data:['收入'],
	        y : '25',
	        x : 'center'
	      },
	      xAxis: [
	        {
	          type: 'category',
	          data: yearList,
	          axisPointer: {
	            type: 'shadow'
	          },
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
	      yAxis: [
	        {
	          type: 'value',
	          name: '单位:元',
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
	      series:[{
	      	name:'收入',
	      	type:'bar',
	      	barMaxWidth:20,
	      	itemStyle: {
	      		normal: {
	      			color: '#574fbe'
	      		}
	      	},
	      	data:citySr
	      }
	      ]
	    };

      var url = 'leader/residents/qryDyjmsrfx/'+district_no;
      CommService.getHttpJsonItem(url, devUrl + url,function(response){
        var data = response.data;
        for(var i in data){
          if(data[i].RESIDENT_TYPE==2) {
            citySr.push(data[i].AVG_INCOME)
            yearList.push(data[i].DATE_PERIOD);
          }
        }
      });

      vm.barConfig1.dataLoaded = true;
    };
    vm.barData1($http, devUrl,1);



    //农村
    var countrysideSr=[];
    var yearList1=[];
    vm.barData2 = function($http, devUrl,district_no) {
      yearList1=[];
      countrysideSr = []
      // countrysideSr=[];
      // countrysideZc=[];
      yearList1=[];
    	vm.barConfig2 = {
	      theme: 'Donut',
	      dataLoaded: false
	    };
	    vm.barOption2 = {
	      tooltip: {
	        trigger: 'axis',
	        axisPointer: { // 坐标轴指示器，坐标轴触发有效
	          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
	        }
	      },
	      legend: {
	        data:['收入'],
	        y : '25',
	        x : 'center'
	      },
	      xAxis: [
	        {
	          type: 'category',
	          data: yearList1,
	          axisPointer: {
	            type: 'shadow'
	          },
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
	      yAxis: [
	        {
	          type: 'value',
	          name: '单位:元',
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
	      series:[{
	      	name:'收入',
	      	type:'bar',
	      	barMaxWidth:20,
	      	itemStyle: {
	      		normal: {
	      			color: '#137ebd'
	      		}
	      	},
	      	data:countrysideSr
	      }
	      ]
	    };

      var url = 'leader/residents/qryDyjmsrfx/'+district_no;
      CommService.getHttpJsonItem(url, devUrl + url,function(response){

        var data = response.data;
        for(var i in data){
          if(data[i].RESIDENT_TYPE==1){
            countrysideSr.push(data[i].AVG_INCOME)
            yearList1.push(data[i].DATE_PERIOD);
          }

        }
      });
      vm.barConfig2.dataLoaded = true;
    };
    vm.barData2($http, devUrl,1);

    var onMapSelectChanged=function(params){
      params=params.batch[0];
      var district_no=1;
      if(params.selected[params.name]){
        vm.curAreaName = params.name;
        district_no=areaMap[vm.curAreaName];
      }else{
        vm.curAreaName="湖南省";
      }

      vm.barData1($http, devUrl,district_no);
      vm.barData2($http, devUrl,district_no);
      $scope.$apply();//需要手动刷新
    };
    vm.initMap($http, devUrl);
  }
})();


