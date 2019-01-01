 /**
 * 领导桌面-固定资产投资分析-总体投资分析
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('LdzmTopicIndZtfxController', LdzmTopicIndZtfxController);

  /** @ngInject */
  function LdzmTopicIndZtfxController($scope, $http, devUrl,SweetAlert,CommService,$window,latestYear) {
    var vm = this;
    //alert($window.innerWidth)
    //没有时间的页面都是获取最新一年的数据
    var time = new Date();
    var yearNew = time.getFullYear();
    vm.alwaysData = new Array();
    vm.showCurYear = latestYear - 1 +"年";
    vm.dataComeFrom = "湖南省统计局";
    //用于缓存
    vm.hignDataList = new Array();
    vm.baseDataList = new Array();
    vm.feeDataList = new Array();
    vm.ywDataList = new Array();

    var myDate = new Date();
    var curYear=latestYear-1;

    //自适应的设置
    var bigScreenWidth = 1900;
    var chart2_w1 = 220;
    var chart2_w2 = 135;
    var chart2_w3 = 230;
    var chart2_w4 = 145;
    if($window.innerWidth > bigScreenWidth){
      chart2_w1 = 330;
      chart2_w2 = 250;
      chart2_w3 = 360;
      chart2_w4 = 270;
    }

    //左图-柱状图-全省该固定资产投资发展情况
    // vm.loadBarChart = function($http, devUrl){
      var chartCategories = []; //年份
      var series = []; //值
      vm.ecConfig = {
        theme: 'Donut',
        dataLoaded: false
      };
      vm.ecOption = {
        // color: ['#F64500', '#0075FF', '#005500'],
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
          // borderWidth:10,
          containLabel: true
        },
        xAxis: [{
          data: chartCategories, //年份
          axisTick : {          //去掉X轴小点
            inside: false,
            length: 5,
            lineStyle: {      //X轴样式
            color: '#ffffff',//x轴旁边小点
            shadowColor: '#ffffff'
                }
            },
          axisLine: {
            show: true,     //隐藏X轴
            lineStyle:{
            color:"#8996a3" //X轴颜色不起效果
              }
          },
        }],
        yAxis: [{
          name: '单位:亿元',
          type: 'value',
          min: 0,
          max: 40000,
          axisTick : {      //去掉X轴小点
            // inside: false,
            // length: 5,
            lineStyle: {  //线条样式
            color: '#ffffff',
            shadowColor: '#ffffff'
            }
              },
          axisLine: {
            show: false,        //隐藏Y轴
            lineStyle:{        //线条样式
            color:"#8996a3"   //使Y轴颜色不起效果
              }
          },
          splitLine: {
            show: true
          },
          axisLabel: {
            formatter: '{value}'
          }
        },{
          name: '增长率(%)',
          type: 'value',
          min: 0,
          max: 40,
          axisTick : {  //去掉X轴小点
            inside: false,
            // length: 5,
            lineStyle: {
            color: '#ffffff',
            shadowColor: '#ffffff'
            }
              },
          axisLine: {
            show: false,  //隐藏Y轴
            lineStyle:{
            color:"#8996a3"   //Y轴颜色不起效果
              }
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            formatter: '{value}'
          }
        }],
        legend: {  //标题
          selected: {},
          x:'center',
          y:'28',
          data:['总量','增长率']
        },
        series: series
      };
      //柱状颜色及提示
      series.push({name: '总量', type: 'bar', barMaxWidth:20,yAxisIndex:0,data: [],
        itemStyle: {
        normal: {
          color: '#137ebd'
        }
      }});
      //折线颜色
      series.push({name: '增长率', type: 'line',yAxisIndex:1,data: [],
        itemStyle: {
          normal: {
            color: '#FF9F17', //折线原点颜色
            lineStyle:{
            width:3,
            color:'#ff9f17'  //折线条颜色
            }
          },
        }});
      var year_num=5;
      var myDate = new Date();
      var endDate=myDate.getFullYear()-1;
      var beginDate=myDate.getFullYear()-year_num;

      //全省固定资产投资发展情况缓存
      var result=new Array();
      var maxBar=0;
      var maxLine=0;
      vm.jyfxztfx1=function ($http, devUrl) {

        //查询2011-2015
        //var key = '/leader/investment/qryInvestment/1/1/' + beginDate + '_' + endDate;
        var key = '/leader/investment/qryInvestment/1/1/' + 2011 + '_' + 2015;
        CommService.getHttpJsonItem(key, devUrl + key, function (response) {
          result = response.data;
          //sessionStorage.setItem('cacheJyfxztfxDataList6', JSON.stringify(result));
          for (var i = 0; i < result.length; i++) {
            chartCategories.push(result[i].DATE_PERIOD);
            series[0].data.push(result[i].TZZL);
            series[1].data.push(result[i].ZZL);
            if (result[i].TZZL > maxBar) {
              maxBar = result[i].TZZL;
            }
            if (result[i].ZZL > maxLine) {
              maxLine = result[i].ZZL;
            }
          }
          vm.ecConfig.dataLoaded = true;
        });
      }
        //全省固定资产投资发展情况
        vm.jyfxztfx1($http, devUrl);


      //上右-饼图 全省固定资产完成情况及区域分布
    // vm.loadPieChart = function($http, devUrl){
      vm.pieConfig={
        theme: 'Donut',
        dataLoaded: false
      };
      var pieLegendData=[];
      var pieData=[];
    var pieCategoryData=[];
    var pieData1=[];
    var pieData2=[];
    var pieData3=[];

      vm.pieOption= {
        color: ['#0C6BD9'],
        calculable: true,
        grid: {
          left: 100,
          right:130, //数值距离右边的间距
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
          data: pieCategoryData,
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
            data: pieData1
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
                formatter: '占{c}%',
                position: [chart2_w1, '0'],
                show: true,
                textStyle:{
                  color:'red'
                }
              }
            },
            //barWidth: 22,
            barGap: '-100%',
            data: pieData3
          }
          ,{
            name: "投资总量",
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
            data: pieData2
          }
        ]
      };/*{
          color:['#E64054','#574FBE','#9C28B1','#0B6DDA','#46C668'],
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              x : 'center',
              y : 'bottom'
              // data:pieLegendData
          },
          toolbox: {
              show : false,//隐藏辅助工具
              feature : {
                  mark : {show: true},
                  dataView : {show: true, readOnly: false},
                  magicType : {
                      show: true,
                      type: ['pie', 'funnel']
                  },
                  restore : {show: true},
                  saveAsImage : {show: true}
              }
          },
          calculable : true,
          series : [
              {
                  name:'区域分布',//鼠标移入的提示语
                  type:'pie',
                  radius : [20, 90],
                  center : ['50%', '40%'],//饼图的上下左右位置
                  roseType : 'area',
                  data:pieData
              }
          ]
      };*/

      //全省固定投资完成情况及区域分布缓存
      var result2=new Array();
      vm.jyfxztfx2=function ($http, devUrl){
      //var url='leader/investment/qryInvestmentByDate/1/'+curYear;
        //现在展示的是2015年的
      var url='leader/investment/qryInvestmentByDate/1/' + curYear;
       CommService.getHttpJsonItem(url,devUrl+url,function(response){
         result2 = response.data;

         var maxData=0;

         for(var i=0;i<result2.length;i++){   //循环判断对象并修改加入数组当中
           //把湖南省的去掉
           if(result2[i].DQLX!=1){
             if(result2[i].DQLX==1){
               pieLegendData.push("全湖南省");
               pieCategoryData.push("全湖南省");
               pieData2.push({name:'全湖南省',value:result2[i].TZZL});
             }else if(result2[i].DQLX==2){
               pieLegendData.push("长株潭地区");
               pieCategoryData.push("长株潭地区");
               pieData2.push({name:'长株潭地区',value:result2[i].TZZL});
             }else if(result2[i].DQLX==3){
               pieLegendData.push("湘南地区");
               pieCategoryData.push("湘南地区");
               pieData2.push({name:'湘南地区',value:result2[i].TZZL});
             }else if(result2[i].DQLX==4){
               pieLegendData.push("大湘西地区");
               pieCategoryData.push("大湘西地区");
               pieData2.push({name:'大湘西地区',value:result2[i].TZZL});
             }else if(result2[i].DQLX==5){
               pieLegendData.push("洞庭湖地区");
               pieCategoryData.push("洞庭湖地区");
               pieData2.push({name:'洞庭湖地区',value:result2[i].TZZL});
             }else if(result2[i].DQLX==6){
               pieLegendData.push("环长株潭城市群 ");
               pieCategoryData.push("环长株潭城市群 ");
               pieData2.push({name:'环长株潭城市群 ',value:result2[i].TZZL});
             }
             pieData.push({name:pieLegendData[i],value:result2[i].TZZL});
             pieData3.push(result2[i].ZZL);
             if(result2[i].TZZL>maxData){
               maxData=result2[i].TZZL;
             }
           }

         }
         for(var i in pieData2){
           pieData1.push(maxData);
         }
         vm.pieConfig.dataLoaded = true;
        });
    }
    //全省固定投资完成情况及区域分布缓存
    vm.jyfxztfx2($http, devUrl);

    //右上角缓存
    vm.queryDeaseData= function(){

      //var key= '/leader/investment/qryInvestmentForRealEstate/1/'+curYear+'_'+curYear;
      var key= '/leader/investment/qryInvestmentForRealEstate/1/'+curYear+'_'+curYear;
      CommService.getHttpJsonItem(key,devUrl+key,function(response){
        vm.alwaysData = response.data;
      });
    }
    vm.queryDeaseData();


    //左下 全省固定资产市州排行
   // vm.loadBarChart1=function($http, devUrl,district_no){
      vm.barConfig={
        theme: 'Donut',
        dataLoaded: false
      };
      var barCategoryData=[];
      var barData11=[];
      var barData2=[];
      var barData3=[];
      vm.barOption={
        color: ['#0C6BD9'],
        calculable: true,
        grid: {
          left: 70,
          right:130, //数值距离右边的间距
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
            data: barData11
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
                position: [chart2_w3, '0'],
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
            name: "投资总量",
            type: "bar",
            label: {
              normal: {
                formatter: '{c}亿元',
                position: [chart2_w4, '0'],
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

      //全省固定资产投资市州排行
      var result3=new Array();
      var maxData=0;
      vm.loadBarChart1=function($http, devUrl,district_no){
        //curYear = '2015'
        var key= '/leader/investment/qryInvestmentForArea/1/'+district_no+'/'+curYear+'_'+curYear;
        CommService.getHttpJsonItem(key,devUrl+key,function(response){
          result3=response.data;
          var maxData=0;
          for(var i=0;i<result3.length;i++){
            if(i==5){
              break;
            }
            barCategoryData.push(result3[i].DISTRICT_NAME);
            barData2.push({name:result3.DISTRICT_NAME,value:result3[i].TZZL});
            barData3.push(result3[i].ZZL);
            if(result3[i].TZZL>maxData){
              maxData=result3[i].TZZL;
            }
          }
          for(var i in barData2){
            barData11.push(maxData);
          }
          //console.log(barData1);
          vm.barConfig.dataLoaded = true;
        });
     }
    vm.loadBarChart1($http, devUrl,1);//只需调用一次

    //右下 全省固定资产投资行业分布
    // vm.loadBarChart2=function($http, devUrl){
      var barCategory=[];
      var barData=[];
      var barData1=[];
      vm.barConfig2={
        theme: 'Donut',
        dataLoaded: false
      };
      vm.barOption2={
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b0}<br/>总量：{c0}亿元',
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

              }
              //return val.split("").join("\n");
                return str;*/
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
            name:'总量（亿元）',
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
          // {
          //   type: "bar",
          //   silent: true,
          //   // name:"投资总量",
          //   barCategoryGap:'50%',
          //   itemStyle: {
          //     normal: {
          //       color: '#dddddd'
          //     }
          //   },
          //   tooltip:{
          //     show:false
          //   },
          //   barGap: '-100%',
          //   data: barData1
          // }
        ]
      };

      //全省固定资产投资行业分布缓存
      var result5=new Array();
      vm.loadBarChart2=function($http, devUrl){
        //var key= '/leader/investment/qryInvestmentForTrade/1/1/'+curYear+'_'+curYear;
        //curYear = '2015';
        var key= '/leader/investment/qryInvestmentForTrade/1/1/'+curYear+'_'+curYear;
        CommService.getHttpJsonItem(key,devUrl+key,function(response){
          result5 = response.data;
          for (var i in result5) {
            barCategory.push(result5[i].INDUSTRY_CATEGORY_NAME);
            barData.push(result5[i].TZZL);
          }
          var maxData=Math.max.apply(null, barData);
          for(var i in barData){
            barData1.push(maxData);
          }
          vm.barConfig2.dataLoaded = true;
        });
    }
    vm.loadBarChart2($http, devUrl);//只需调用一次
  }
})();


