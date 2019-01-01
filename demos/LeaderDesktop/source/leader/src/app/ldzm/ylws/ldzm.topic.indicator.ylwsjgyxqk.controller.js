/**
 * 领导桌面-医疗卫生
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('LdzmTopicIndYlwsjgyxqkController', LdzmTopicIndYlwsjgyxqkController);

  /** @ngInject */
  function LdzmTopicIndYlwsjgyxqkController($http, devUrl,$scope,SweetAlert,CommService,latestYear) {
      var vm = this;
      var time = new Date();
      // var yearNew = time.getFullYear();
      //var starDate=time.getFullYear()-6;
      var endDate=latestYear-1;
      var starDate=endDate-4;

      var yearList = new Array();
      var hospitalBed = new Array();
      var workdayBed = new Array();
      var hospitalTime = new Array();
      var bedUse = new Array();
      var personelW = new Array();
      var maxData1 = new Array();
      //缓存
      vm.cahceYlws =new Array();
      vm.ecConfig0 = {
        theme: 'Donut',
        dataLoaded: false
      };
      vm.ecOption0 = {
                  color:['#137ebd'],
                  tooltip : {
                      trigger: 'axis',
                      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                          type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
                      }
                  },
                  legend: {
                      data:['诊疗人次'],
                      y:'25'
                  },
                  grid: {
                      left: '3%',
                      right: '4%',
                      bottom: '3%',
                      containLabel: true
                  },
                  xAxis : [

                      {
                          type : 'category',
                          boundaryGap : false,
                          data : yearList,
                          axisLine: {
                            lineStyle:{
                              color:'#8995a1',
                              width: 1,
                              type: 'solid'
                            }
                          },
                          axisTick: {
                              show: false
                          },
                          axisLabel:{
                             textStyle:{
                              color:"#8995a1"
                            }
                          },
                          splitLine: {           // 分隔线
                            show: true,        // 默认显示，属性show控制显示与否
                            // onGap: null,
                            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                color: ['#ccc'],
                                width: 1,
                                type: 'solid'
                            }
                        }
                      }
                  ],
                  yAxis : [
                      {
                          type : 'value',
                          name:'单位:万次',
                          axisLine: {
                              lineStyle:{
                                color:'#8995a1',
                                width: 1,
                                type: 'solid'
                              }
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel:{
                               textStyle:{
                                color:"#8995a1"
                              }
                            }
                      }
                  ],
                  series : [
                      {
                          name:'诊疗人次',
                          type:'line',
                          stack: '总量',
                          smooth: true, //平滑的，弧形
                          areaStyle: {normal: {}},
                          data:personelW
                      }
                  ]
       };
      vm.ecConfig0.dataLoaded = true;
      vm.ecConfig1 = {
        theme: 'Donut',
        dataLoaded: false
      };
      vm.ecOption1 = {
                color: ['#574fbe'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data:['病床周转次数'],
                    y:'25'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : yearList,
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
                        type : 'value',
                        name : '单位:万次',
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
                series : [
                    // {
                    //   type: "bar",
                    //   silent: true,
                    //   itemStyle: {
                    //     normal: {
                    //       color: '#f5f5f5'
                    //     }
                    //   },
                    //   barWidth: '50%',
                    //   barGap: '-100%',
                    //   data: maxData1 //底层灰色柱子
                    // },
                    {
                        name:'病床周转次数',
                        type:'bar',
                        barMaxWidth:20,
                        data:hospitalBed
                    }
                ]
       };
       vm.ecConfig1.dataLoaded = true;
       vm.ecConfig2 = {
        theme: 'Donut',
        dataLoaded: false
      };
      vm.ecOption2 = {
                 tooltip: {
                      trigger: 'axis',
                      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                      }
                  },
                  legend: {
                      selected: {
                          '病床使用率' : false
                      },
                      data:['病床工作日','医院平均住院日','病床使用率'],
                      y:'25'
                  },
                  grid:{
                    left:'5%',
                    right:'5%',
                    bottom:'15%'
                  },
                  xAxis: [
                      {
                          type: 'category',
                          data: yearList,
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
                  yAxis: [
                      {
                          type: 'value',
                          name: '单位:日',
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
                      },
                      {
                          type: 'value',
                          name: '病床使用率(%)',
                          min: 0,
                          max: 100,
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
                  series: [
                      {
                          name:'病床工作日',
                          type:'bar',
                          data:workdayBed,
                          barMaxWidth:20,
                      },
                      {
                          name:'医院平均住院日',
                          type:'bar',
                          data:hospitalTime,
                          barMaxWidth:20,
                      },
                      {
                          name:'病床使用率',
                          type:'line',
                          yAxisIndex: 1,
                          data:bedUse
                      }
                  ],
                  color:['#3a4aa9','#cb65bb','#fea412']
       };
      vm.ecConfig2.dataLoaded = true;
      vm.structure = function(){
       var url1 = '/leader/medical/qryylwsyljglist/1/'+starDate+'_'+endDate;
        CommService.getHttpJsonItem(url1, devUrl + url1, function (response) {
          vm.cahceYlws = response.data;
          //sessionStorage.setItem("cacheYlwsjguxDataList", JSON.stringify(vm.cahceYlws));
          for (var i = 0; i < vm.cahceYlws.length; i++) {
            yearList.push(vm.cahceYlws[i].DATE_PERIOD);
            hospitalBed.push(vm.cahceYlws[i].BED_TURNOVER);
            workdayBed.push(vm.cahceYlws[i].BED_WORKING_DAY);
            hospitalTime.push(vm.cahceYlws[i].ALOS);
            bedUse.push(vm.cahceYlws[i].BED_USAGE);
            personelW.push(vm.cahceYlws[i].TREATMENT_COUNT);
          }
          var max=hospitalBed.reduce(function(a,b){
            if(a>b){
              return a;
            } else{
              return b;
            }
          });
          vm.ecOption1.yAxis[0].max = max;
          for (var i = 0; i < vm.cahceYlws.length; i++) {
            maxData1.push(max);
          }
        });
      };
      vm.structure();

   }
})();


