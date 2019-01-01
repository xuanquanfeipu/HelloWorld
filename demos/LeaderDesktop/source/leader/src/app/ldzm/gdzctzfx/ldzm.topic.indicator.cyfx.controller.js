/**
 * 领导桌面-固定资产投资分析-房地产分析
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('LdzmTopicIndCyfxController', LdzmTopicIndCyfxController);

  /** @ngInject */
  function LdzmTopicIndCyfxController($scope,$http, devUrl,latestYear) {
    var vm = this;
    vm.dataComeFrom = "湖南省统计局";
    vm.title = "领导桌面-固定资产投资分析-产业分析";
    vm.breadcrumbs = [
      {title: '领导桌面', link: '/#/ldzm', icon: 'home'},
      {title: '固定资产投资分析', link: '/#/ldzm/content', icon: 'book'},
      {title: '产业分析', link: '/#/ldzm/content/detail', icon: 'file'}
    ];

      var year_num=5;
      var myDate = new Date();
      var endDate=latestYear-1;
      var beginDate=latestYear-year_num;
      // var url=devUrl + '/leader/investment/qryInvestmentForRealEstate/1/'+beginDate+'_'+endDate;
      var chartCategories = [];
      var chartCategories1=[];
      vm.list=[];
      vm.categories = [];
      var series=[];
      var series1=[];
      var legendSelected={};//指标空数组
      var legend=[];
      series1.push({name:"总量",type:"bar",barMaxWidth:20,data:[],itemStyle:{normal:{color:"#137ebd"}}});
      series1.push({name:"增长率",type:"line",yAxisIndex: 1,data:[],itemStyle : {  normal : {  color:'#ff9f17',lineStyle:{width:3}}},});
      series.push({name: '施工房屋面积', type: 'bar', data: [],itemStyle:{normal:{color:"#574fbe"}}});
      series.push({name: '竣工房屋面积', type: 'bar', data: [],itemStyle:{normal:{color:"#0c6bd9"}}});
      series.push({name: '商品房销售建筑面积', type: 'bar', data: [],itemStyle:{normal:{color:"#137ebd"}}});
      series.push({name: '商品房销售额', type: 'bar', data: [],itemStyle:{normal:{color:"#cb64bb"}}});
      series.push({name: '施工房屋面积增长率', type: 'line', yAxisIndex: 1,data: [],itemStyle:{normal:{color:"#FF9800"}}});
      series.push({name: '竣工房屋面积增长率', type: 'line', yAxisIndex: 1,data: [],itemStyle:{normal:{color:"#10BD5E"}}});
      series.push({name: '商品房销售建筑面积长率', type: 'line', yAxisIndex: 1,data: [],itemStyle:{normal:{color:"#2495ee"}}});
      //图1
      vm.ecConfig = {
        theme: 'Donut',
        dataLoaded: false
      };

      vm.ecOption = {
        legend: {
          data:['施工房屋面积','竣工房屋面积','商品房销售建筑面积','商品房销售额','施工房屋面积增长率','竣工房屋面积增长率','商品房销售建筑面积长率'],
          x:'center',
          y:'top',
          selected: legendSelected,//标题下面的柱子
          padding:0
        },
        color: ['#3b48a3', '#4e72ce', '#cb64bb',"#2097f4",'#FF9800', '#10BD5E', '#2495ee'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '5%',
          bottom: '5%',
          top: '20%',//图表距离定部的位置
          containLabel: true
        },
        xAxis: [{
          data: chartCategories,
          axisTick : {  //去掉X轴小点
            inside: false,
            lineStyle: {
            color: '#ffffff',
            shadowColor: '#ffffff'
              }
            },
            axisLine: {
            show: true,       //隐藏X轴
            lineStyle:{
            color:"#8996a3"   //X轴颜色不起效果
                    }
            },
        }],
        yAxis: [{
          name:'单位:万平方米',
          type: 'value',
          min: 0,
          max: 30000,
          axisTick : {  //去掉X轴小点
            inside: false,
            lineStyle: {
            color: '#ffffff',
            shadowColor: '#ffffff'
              }
            },
            axisLine: {
            show: false,  //隐藏X轴
            lineStyle:{
            color:"#8996a3"   //X轴颜色不起效果
                    }
            },
          splitLine: {
            show: true
          },
          axisLabel: {
            formatter: '{value}'
          }
        },{
          name:'增长率(%)',
          type: 'value',
          min: -30,
          max: 30,
          axisLabel: {
            formatter: '{value} '
          },
          axisTick: {
            show:false
          },
          splitLine:{
            show:false
          },
          axisLine: {
            show: false,
            lineStyle:{
              color:"#8996a3"   //X轴颜色不起效果
            }
          }
        }
        ],
        series: series
      };
      //图2
      vm.ecConfig1 = {
        theme: 'Donut',
        dataLoaded: false
      };

      var url=devUrl + '/leader/investment/qryInvestmentForRealEstate/1/'+beginDate+'_'+endDate;
      $http.get(url)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          var result=response.data;
          // sessionStorage.setItem("cacheYlwsNcjbfxDataList", JSON.stringify(result));//缓存
          var year='';
          var listdata = [[],[],[],[],[],[],[]];
          for(var i in result){
            if(result[i].DATE_PERIOD!=year){
              year=result[i].DATE_PERIOD;
              vm.categories.push({name:year,checked:true});
              chartCategories.push(year);
              chartCategories1.push(year);
            }
            if(result[i].DATE_PERIOD==2011){
              series[0].data.push(result[i].SGMJ);
              series[3].data.push(result[i].SPF_XSE);
              series[1].data.push(result[i].JGMJ);
              series[4].data.push(result[i].SGMJ_ZZL);
              series[2].data.push(result[i].SPF_XSMJ);
              series[5].data.push(result[i].JGMJ_ZZL);
              series[6].data.push(result[i].SPF_XSMJ_ZZL);
              series1[0].data.push(result[i].SPF_XSE);
              series1[1].data.push(result[i].SPF_ZZL);
              listdata[0].push(result[i].SGMJ);
              listdata[3].push(result[i].SPF_XSE);
              listdata[1].push(result[i].JGMJ);
              listdata[4].push(result[i].SGMJ_ZZL);
              listdata[2].push(result[i].SPF_XSMJ);
              listdata[5].push(result[i].JGMJ_ZZL);
              listdata[6].push(result[i].SPF_XSMJ_ZZL);
            }else if(result[i].DATE_PERIOD==2012){
              series[0].data.push(result[i].SGMJ);
              series[3].data.push(result[i].SPF_XSE);
              series[1].data.push(result[i].JGMJ);
              series[4].data.push(result[i].SGMJ_ZZL);
              series[2].data.push(result[i].SPF_XSMJ);
              series[5].data.push(result[i].JGMJ_ZZL);
              series[6].data.push(result[i].SPF_XSMJ_ZZL);
              series1[0].data.push(result[i].SPF_XSE);
              series1[1].data.push(result[i].SPF_ZZL);
              listdata[0].push(result[i].SGMJ);
              listdata[3].push(result[i].SPF_XSE);
              listdata[1].push(result[i].JGMJ);
              listdata[4].push(result[i].SGMJ_ZZL);
              listdata[2].push(result[i].SPF_XSMJ);
              listdata[5].push(result[i].JGMJ_ZZL);
              listdata[6].push(result[i].SPF_XSMJ_ZZL);
            }else if(result[i].DATE_PERIOD==2013){
             series[0].data.push(result[i].SGMJ);
              series[3].data.push(result[i].SPF_XSE);
              series[1].data.push(result[i].JGMJ);
              series[4].data.push(result[i].SGMJ_ZZL);
              series[2].data.push(result[i].SPF_XSMJ);
              series[5].data.push(result[i].JGMJ_ZZL);
              series[6].data.push(result[i].SPF_XSMJ_ZZL);
              series1[0].data.push(result[i].SPF_XSE);
              series1[1].data.push(result[i].SPF_ZZL);
              listdata[0].push(result[i].SGMJ);
              listdata[3].push(result[i].SPF_XSE);
              listdata[1].push(result[i].JGMJ);
              listdata[4].push(result[i].SGMJ_ZZL);
              listdata[2].push(result[i].SPF_XSMJ);
              listdata[5].push(result[i].JGMJ_ZZL);
              listdata[6].push(result[i].SPF_XSMJ_ZZL);
            }else if(result[i].DATE_PERIOD==2014){
            series[0].data.push(result[i].SGMJ);
              series[3].data.push(result[i].SPF_XSE);
              series[1].data.push(result[i].JGMJ);
              series[4].data.push(result[i].SGMJ_ZZL);
              series[2].data.push(result[i].SPF_XSMJ);
              series[5].data.push(result[i].JGMJ_ZZL);
              series[6].data.push(result[i].SPF_XSMJ_ZZL);
              series1[0].data.push(result[i].SPF_XSE);
              series1[1].data.push(result[i].SPF_ZZL);
              listdata[0].push(result[i].SGMJ);
              listdata[3].push(result[i].SPF_XSE);
              listdata[1].push(result[i].JGMJ);
              listdata[4].push(result[i].SGMJ_ZZL);
              listdata[2].push(result[i].SPF_XSMJ);
              listdata[5].push(result[i].JGMJ_ZZL);
              listdata[6].push(result[i].SPF_XSMJ_ZZL);
            }else if(result[i].DATE_PERIOD==2015){
              series[0].data.push(result[i].SGMJ);
              series[3].data.push(result[i].SPF_XSE);
              series[1].data.push(result[i].JGMJ);
              series[4].data.push(result[i].SGMJ_ZZL);
              series[2].data.push(result[i].SPF_XSMJ);
              series[5].data.push(result[i].JGMJ_ZZL);
              series[6].data.push(result[i].SPF_XSMJ_ZZL);
              series1[0].data.push(result[i].SPF_XSE);
              series1[1].data.push(result[i].SPF_ZZL);
              listdata[0].push(result[i].SGMJ);
              listdata[3].push(result[i].SPF_XSE);
              listdata[1].push(result[i].JGMJ);
              listdata[4].push(result[i].SGMJ_ZZL);
              listdata[2].push(result[i].SPF_XSMJ);
              listdata[5].push(result[i].JGMJ_ZZL);
              listdata[6].push(result[i].SPF_XSMJ_ZZL);
            }else if(result[i].DATE_PERIOD==2016){
              series[0].data.push(result[i].SGMJ);
              series[3].data.push(result[i].SPF_XSE);
              series[1].data.push(result[i].JGMJ);
              series[4].data.push(result[i].SGMJ_ZZL);
              series[2].data.push(result[i].SPF_XSMJ);
              series[5].data.push(result[i].JGMJ_ZZL);
              series[6].data.push(result[i].SPF_XSMJ_ZZL);
              series1[0].data.push(result[i].SPF_XSE);
              series1[1].data.push(result[i].SPF_ZZL);
              listdata[0].push(result[i].SGMJ);
              listdata[3].push(result[i].SPF_XSE);
              listdata[1].push(result[i].JGMJ);
              listdata[4].push(result[i].SGMJ_ZZL);
              listdata[2].push(result[i].SPF_XSMJ);
              listdata[5].push(result[i].JGMJ_ZZL);
              listdata[6].push(result[i].SPF_XSMJ_ZZL);
            }
          }
          for(var index in series){
            var ext=series[index].type=='bar'?'万平方米':'%';
            vm.list.push({name:series[index].name,ext:ext,data:listdata[index],checked:true});
          }
          vm.ecConfig.event = [{legendselectchanged:onLegendSelectChanged}];
          vm.ecConfig.dataLoaded=true;
          // var barData=[{name:'第一产业',value:listdata[0][0]},
          // {name:'第二产业',value:listdata[1][0]},
          // {name:'第三产业',value:listdata[2][0]},]
          vm.ecOption1 = {
        legend: {
          y:'5',
          data:['总量','增长率']
        },
        color: ['#137ebd','#0075FF'],
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
          top: '10%',
          containLabel: true
        },
        xAxis: [{
          data: chartCategories1,
          axisTick : {  //去掉X轴小点
            inside: false,
            length: 5,
            lineStyle: {
            color: '#ffffff',
            shadowColor: '#ffffff'
               }
            },
            axisLine: {
            show: false,  //隐藏X轴
            lineStyle:{
            color:"#8996a3"   //X轴颜色不起效果
                    }
            },
          splitLine: {
            show: false
          }
        }],
        yAxis: [{
          name:'单位:亿元',
          type: 'value',
          min: 0,
          max: 3500,
          axisTick : {  //去掉X轴小点
            inside: false,
            length: 5,
            lineStyle: {
            color: '#ffffff',
            shadowColor: '#ffffff'
              }
            },
            axisLine: {
            show: false,  //隐藏X轴
            lineStyle:{
            color:"#8996a3"   //X轴颜色不起效果
                    }
            },
          splitLine: {
            show: true,
          },
          axisLabel: {
            formatter: '{value}'
          }
        },{
          name:'增长率(%)',
          type: 'value',
          min: -20,
          max: 30,
          axisTick : {  //去掉X轴小点
            inside: false,
            length: 5,
            lineStyle: {
            color: '#ffffff',
            shadowColor: '#ffffff'
              }
            },
            axisLine: {
              show: false,  //隐藏X轴
              lineStyle:{
              color:"#8996a3"   //X轴颜色不起效果
                      }
            },
          splitLine: {
            show: false
          },
            axisLabel: {
            formatter: '{value}'
          }
        }
        ],
        // legend:{
        //   selected: {
        //     '第一产业总量':true
        //   }
        // },
        series: series1
      };
          vm.ecConfig1.dataLoaded=true;
        }).error(function () {
          SweetAlert.swal("网络有问题，待会再试");
        });

    /**
     * 复选框（指标）单击绑定方法
     * @param item
     */
    vm.legendCheckboxClick = function (item) {
      if(item.checked){
        item.checked = false;
      }else{
        item.checked = true;
      }
      legendSelected[item.name] = item.checked;
    };
    /**
     * 复选框（x轴）单击绑定方法
     * @param index
     * @param isChecked
     */
     vm.xCheckboxClick = function (item) {
      if(item.checked){
        item.checked = false;
      }else{
        item.checked = true;
      }
      chartCategories.length = 0;
      for (var index in vm.categories) {
        if (vm.categories[index].checked) {
          chartCategories.push(vm.categories[index].name);
        }
      }
      for (var i in vm.list) {
        series[i].data.length = 0;
        for (var j in vm.categories) {
          if (vm.categories[j].checked) {
            //console.log(vm.list[i].data[j]);
            series[i].data.push(vm.list[i].data[j]);
          }
        }
      }
    };
    var onLegendSelectChanged=function(params){
      //console.log(params.name+','+params.selected[params.name]);
      legendSelected[params.name] = params.selected[params.name];
      for(var i in vm.list){
        if(vm.list[i].name==params.name){
          vm.list[i].checked=params.selected[params.name];
          break;
        }
      }
      $scope.$apply();//需要手动刷新
    }
    /**
     * 下拉框（年份）单击绑定方法
     * @param item
     */
    // vm.selectYearChange = function (selectedIndex) {
    //   var barData=[{name:'第一产业',value:vm.list[0].data[selectedIndex]},
    //     {name:'第二产业',value:vm.list[1].data[selectedIndex]},
    //     {name:'第三产业',value:vm.list[2].data[selectedIndex]}];
    //   vm.ecOption1.series[0].data=barData;
    // };
  }
})();


