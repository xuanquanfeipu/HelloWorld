/**
 * 领导桌面-固定资产投资分析-地域分析
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('LdzmTopicIndDyfxController', LdzmTopicIndDyfxController);

  /** @ngInject */
  function LdzmTopicIndDyfxController($scope, $http, devUrl,$window,latestYear) {
    var vm = this;
    var myDate = new Date();
    var curYear=latestYear-1;
    vm.curYear=curYear+'年';
    vm.dataComeFrom = "湖南省统计局";
    //自适应的设置
    var bigScreenWidth = 1900;
    var chart2_w1 = 205;
    var chart2_w2 = 135;
    if($window.innerWidth > bigScreenWidth){
      chart2_w1 = 380;
      chart2_w2 = 290;
    }

    //湖南省固定资产投资地域分布情况地图
    vm.curAreaName="湖南省";
    var mapData=[];
    var areaMap={};
    vm.mapConfig = {
      theme: 'Donut',
      dataLoaded: false
      /*event:{
       click:function (params) {
       console.log('mapselectchanged');
       var city = params.name;
       console.log(params);
       console.log(city);
       }
       }*/
    };
    vm.mapOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}<br/>投资金额总量：{c} 亿元',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      visualMap: {
        min: 50,
        max: 7000,
        orient:'horizontal',
        left: 'center',
        top: 'bottom',
        text: ['高','低'],// 文本，默认为数值文本
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
    var myDate = new Date();
    var year=latestYear-1;
    var url=devUrl + '/leader/investment/qryInvestmentForArea/1/1/'+year+'_'+year;
    $http.get(url)
      .success(function (response) {
        if (angular.isUndefined(response)) {
          SweetAlert.swal("没有查到相关数据");
        }
        var result=response.data;
        for(var i=0;i<result.length;i++){
          mapData.push({seriesId:result[i].DISTRICT_NO,name:result[i].DISTRICT_NAME,value:result[i].TZZL,zzl:result[i].ZZL});
          // console.log(mapData);
          areaMap[result[i].DISTRICT_NAME]=result[i].DISTRICT_NO;
        }
        vm.mapConfig.dataLoaded=true;
        vm.mapConfig.event = [{mapselectchanged:onMapSelectChanged}];
      }).error(function () {
      SweetAlert.swal("网络有问题，待会再试");
    });


     //湖南省固定资产投资经济类型分布情况
    var pieData=[];
    vm.loadPieChart=function($http, devUrl,district_no){
      vm.pieConfig={
        theme: 'Donut',
        dataLoaded: false
      };
      var pieLegendData=[];
      var pieData=[];
      vm.pieOption={
        color: ['#394aa9','#cb64bb'],
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>总量{c} 亿元，占比{d}%',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          orient: 'vertical',
          right: 10,
          bottom: 15,
          data:['国有投资','非国有投资']
        },
        series: [{
          // name: 'GDP总量',
          type: 'pie',
          radius : '55%',
          center: ['50%', '40%'],
          data:pieData, //饼面积的数量[{value:355,name:'国有投资'},{value:555,name:'非国有投资'}]
          color: ['#394aa9','#cb64bb'],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },normal: {
              label:{
                show: true,
                //                              position:'inside',
                formatter: '{b}\n({d}%)'
              }
            }
          }
        }]
      };
      //湖南省固定资产投资经济类型分布情况接口
      var url=devUrl + 'leader/investment/qryInvestmentForAreaByDate/1/'+district_no+'/2015';
      $http.get(url)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          vm.alwaysData = response.data;//获取到这个数组对象
          pieData.push({name:'非国有投资',value:vm.alwaysData.FGY_TZL});//添加数据
          pieData.push({name:'国有投资',value:vm.alwaysData.GY_TZL});//添加数据
          vm.pieConfig.dataLoaded = true;

        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });
    }

    //湖南省固定资产投资市州排行
    vm.loadBarChart=function($http, devUrl,district_no){
      vm.barConfig={
        theme: 'Donut',
        dataLoaded: false
      };
      var barCategoryData=[];
      var barData1=[];
      var barData2=[];
      var barData3=[];
      vm.barOption={
        color: ['#0C6BD9'],
        calculable: true,
        grid: {
          left: 70,
          right:110,
          top:10,
          bottom:10
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
          inverse:true,
          data: barCategoryData,
          //offset:10,
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
            //barWidth: 22,
            barGap: '-100%',
            data: barData1
          }
          ,
          {
            type: "bar",
            silent: true,
            itemStyle: {
              normal: {
                color: '#f5f5f5'
              }
            },
            label: {
              normal: {
                formatter: '↑{c}%',
                position: [chart2_w1, '0'],
                show: true,
                textStyle:{
                  color:'red'
                }
              }
            },
            //barWidth: 22,
            barGap: '-100%',
            data: barData3
          }
          ,{
            name: "GDP总量",
            type: "bar",
            label: {
              normal: {
                formatter: '{c}亿元',
                position: [chart2_w2, '0'],
                show: true
              }
            },
            //barWidth: 22,
            barMaxHeight:220,
            barCategoryGap:'50%',
            z: 10,
            tooltip:{
              show:false
            },
            data: barData2
          }
        ]
      };
      var url=devUrl + '/leader/investment/qryInvestmentForArea/1/'+district_no+'/'+curYear+'_'+curYear;
      $http.get(url)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          var maxData=0;
          for(var i in response.data){
            if(i==5){
              break;
            }
            barCategoryData.push(response.data[i].DISTRICT_NAME);
            barData2.push({name:response.data[i].DISTRICT_NAME,value:response.data[i].TZZL});
            barData3.push(response.data[i].ZZL);
            if(response.data[i].TZZL>maxData){
              maxData=response.data[i].TZZL;
            }

          }
          for(var i in barData2){
            barData1.push(maxData);
          }
          //console.log(barData1);
          vm.barConfig.dataLoaded = true;
        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });
    }


    var chartCategories = [];
    var chartSeries=[];
    var legendData=[];
    var barCategory=[];
    var barData=[];
    vm.genSeries = function(data,title,type,yAxisIndex){
      for(var i in data){
        if(data[i].INDUSTRY_CATEGORY_NO > 0 && data[i].INDUSTRY_CATEGORY_NO < 13) {
          chartSeries.push({
            name: data[i].INDUSTRY_CATEGORY_NAME + title,
            type: type,
            yAxisIndex: yAxisIndex,
            data: []
          });
          legendData.push(data[i].INDUSTRY_CATEGORY_NAME + title);
        }
        // console.log(legendData,title);
      }
    }
    vm.loadBarChart1=function($http, devUrl,district_no){
      vm.barConfig1={
        theme: 'Donut',
        dataLoaded: false
      };
      vm.barOption1={
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b0}<br/>投资金额总量：{c0}亿元',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis : [
          {
            type : 'category',
            data : barCategory,
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
            axisLabel: {textStyle:{ color: '#7F7F7F' },interval: 0,
              formatter:function(val){
                /*var str='';
                for(var i=0;i<val.length;i++){
                  str+=val[i];
                  if((i+1)%3 == 0 && (i+1)/3 !=0)str+='\n';

                }*/
                if(val.length>3){
                  val = val.substring(0,3)+"...";
                }
                return val;
              }
            }
          }
        ],
        yAxis : [
          {
            name:'总额（亿元）',
            nameTextStyle:{
              color: '#7F7F7F'
            },
            type : 'value',
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
        series : [
          {
            // name:'GDP',
            type:'bar',
            barMaxWidth:20,
            itemStyle: {
              normal: {
                color: '#574FBE'
              }
            },
            tooltip:{
              formatter: "{b}(亿元)",
              show:true
            },
            z: 10,
            data:barData
          },
        ]
      };/*{
        color:['#cb64bb','#e28750','#6cb964','#6c6fef','#408bb7','#FF9743','#9BD134','#35C3DB','#FF5DBB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '0',
          bottom: '10%',
          top: '10%',
          containLabel: true
        },
        xAxis: [{
          data: chartCategories,
          axisTick : {  //去掉X轴小点
            inside: false,
            // length: 5,
            lineStyle: {
            color: '#ffffff',
            shadowColor: '#ffffff'
            // shadowOffsetY: -5
            }
            },
            // splitLine: {
            //   show: false//隐藏图标中横线
            // },
            axisLine: {
            show: true,  //是否隐藏X轴
            lineStyle:{
            color:"#8996a3"   //X轴颜色不起效果
                    }
            },
        }],
        yAxis: [{
            name: '总额(亿元)', //Y轴上方标题
            type: 'value',
            min: 0,
            max: 1000,
            axisTick: {
              show:false
            },
            axisLine: {
            show: true,        //是否隐藏Y轴
            lineStyle:{
            color:"#8996a3"   //X轴颜色不起效果
                    }
            },
            splitLine: {
              show: false     //是否隐藏图标中横线
            },
            axisLabel: {
              formatter: '{value} ' //Y轴数值后面带的名称
            }
        },{
          // name: '增长率',
          type: 'value',
          // min: 0,
          // max: 20,
          axisTick : {  //去掉X轴小点
            inside: false,
            // length: 5,
            lineStyle: {
            color: '#ffffff',
            shadowColor: '#ffffff'
            // shadowOffsetY: -5
              }
            },
            axisLine: {
                show: false ,       //隐藏右边Y轴
                lineStyle:{
                color:"#8996a3"   //X轴颜色不起效果
              }
            },
            splitLine: {
                show: false
            },
          axisLabel: {
              formatter: '{value} %',
              show: false       //隐藏Y轴右边数值
          }
        }],
        legend: {
          left: 'center',
          bottom: 0,
          data:legendData,
          selected: {}
        },
        series: chartSeries,
                barWidth:15
      };*/
      //查询行业分类
      var url=devUrl + 'common/qryIndustryList';
      $http.get(url)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          //console.log(response.data);
          vm.genSeries(response.data,'','bar',0);
          //console.log(chartSeries);
          vm.queryData($http, devUrl,district_no);

        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });
    }


    //湖南省固定资产投资行业分布
    vm.queryData=function($http, devUrl,district_no){
      var year_num=5;
      var myDate = new Date();
      var endDate=latestYear-1;
      var beginDate=latestYear-year_num;
      //左下角只展示一年的
      //var queryUrl=devUrl + '/leader/investment/qryInvestmentForTrade/1/'+district_no+'/'+beginDate+'_'+endDate;
      var queryUrl=devUrl + '/leader/investment/qryInvestmentForTrade/1/'+district_no+'/'+endDate+'_'+endDate;
      var maxBar;
      $http.get(queryUrl)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }

          var result = response.data;
          var year = '';
          for (var i in result) {
            if (result[i].DATE_PERIOD != year) {
              year = result[i].DATE_PERIOD;
              chartCategories.push(year);
            }
            chartSeries[result[i].INDUSTRY_CATEGORY_NO-1].data.push(result[i].TZZL);
            if(result[i].TZZL>maxBar){
              maxBar=result[i].TZZL;
            }
          }
          barCategory.length = 0
          barData.length = 0
          for (var i in result) {
            barCategory.push(result[i].INDUSTRY_CATEGORY_NAME);
            barData.push(result[i].TZZL);
          }

          //vm.barOption1.yAxis[0].max=maxBar;  //Y轴的数值
          vm.barConfig1.dataLoaded = true;

        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });
    };
    vm.loadPieChart($http, devUrl,1);
    vm.loadBarChart($http, devUrl,1);
    vm.loadBarChart1($http, devUrl,1);
    var onMapSelectChanged=function(params){
      params=params.batch[0];
      var district_no=1;
      if(params.selected[params.name]){
        vm.curAreaName = params.name;
        district_no=areaMap[vm.curAreaName];
      }else{
        vm.curAreaName="湖南省";
      }
      vm.loadPieChart($http, devUrl,district_no);
      vm.loadBarChart($http, devUrl,district_no);
      chartCategories = [];
      chartSeries=[];
      vm.loadBarChart1($http, devUrl,district_no);
    }
  }
})();



// /**
//  * 领导桌面-固定资产投资分析-地域分析
//  */
// (function () {
//   'use strict';

//   angular
//     .module('smartCore')
//     .controller('LdzmTopicIndDyfxController', LdzmTopicIndDyfxController);

//   /** @ngInject */
//   function LdzmTopicIndDyfxController($http, devUrl) {
//     var vm = this;

//     vm.title = "领导桌面-固定资产投资分析-地域分析";
//     vm.breadcrumbs = [
//       {title: '领导桌面', link: '/#/ldzm', icon: 'home'},
//       {title: '固定资产投资分析', link: '/#/ldzm/content', icon: 'book'},
//       {title: '地域分析', link: '/#/ldzm/content/detail', icon: 'file'}
//     ];

//       var myDate = new Date();
//       var year=myDate.getFullYear()-1;
//       var url=devUrl + 'leader/investment/qryInvestmentForArea/1/1/'+year+'_'+year;
//       var categories = new Array();
//       vm.mapData=new Array();
//       vm.list=new Array();
//       //地图
//       vm.ecConfig = {
//         theme: 'Donut',
//         dataLoaded: false
//         /*event:{
//           click:function (params) {
//             console.log('mapselectchanged');
//             var city = params.name;
//             console.log(params);
//             console.log(city);
//           }
//         }*/
//       };
//     vm.ecOption = {
//       color: ['#289A49','#E2F4DC'],
//       title: {
//         text: year+'年各市州固定投资总量分布',
//         subtext: ''
//       },
//       tooltip: {
//         trigger: 'item',
//         formatter: '{b}<br/>{c} 亿元'
//       },
//       visualMap: {
//         min: 90,
//         max: 800,
//         left: 'left',
//         top: 'bottom',
//         text: ['高','低'],           // 文本，默认为数值文本
//         calculable: true,
//         inRange: {
//           color: ['#E2F4DC','#289A49']
//         }
//       },
//       series: [{
//         name: '总量',
//         type: 'map',
//         map: 'hunan',
//         roam: false,
//         label: {
//           normal: {
//             show: true
//           },
//           emphasis: {
//             show: true
//           }
//         },
//         selectedMode : 'single',
//         data:vm.mapData
//       }]
//     };

//       $http.get(url)
//         .success(function (response) {
//           if (angular.isUndefined(response)) {
//             SweetAlert.swal("没有查到相关数据");
//           }
//           var result=response.data;
//           for(var i=0;i<result.length;i++){
//             vm.mapData.push({name:result[i].DISTRICT_NAME,value:result[i].TZZL,zzl:result[i].ZZL});
//           }
//           //console.log(vm.mapData);
//           //vm.ecOption.series[0].data = vm.mapData;

//           vm.ecConfig.dataLoaded=true;
//           vm.ecConfig.event = [{mapselectchanged:onMapSelectChanged}];

//         }).error(function () {
//           SweetAlert.swal("网络有问题，待会再试");
//         });

//       var onMapSelectChanged=function(params){
//         vm.ecConfig.dataLoaded=false;
//         console.log('onMapSelectChanged');
//         var city = params.name;
//         console.log(params);
//         console.log(city);
//         vm.ecOption.series[0].map='changsha';
//         console.log(vm.ecOption);
//         //vm.ecConfig.dataLoaded=true;
//       }
//   }
// })();


