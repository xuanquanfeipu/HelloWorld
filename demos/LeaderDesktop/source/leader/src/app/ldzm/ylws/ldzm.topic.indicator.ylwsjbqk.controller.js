/**
 * 领导桌面-医疗卫生-基本情况
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('LdzmTopicIndYlwsjbqkController', LdzmTopicIndYlwsjbqkController);

  /** @ngInject */
  function LdzmTopicIndYlwsjbqkController($http, devUrl,$scope,SweetAlert,CommService,latestYear) {
    var vm = this;
    //没有时间的页面都是获取最新一年的数据
    var time = new Date();
    // var yearNew = time.getFullYear();
    //var starDate=time.getFullYear()-6;
    var endDate=latestYear-1;
    var starDate=endDate-3;
    vm.latestYear = endDate;

    vm.alwaysData = new Array();
    //城市
    var city = new Array();
    var hospital = new Array();//医院
    var bedList = new Array();//床位
    var people = new Array();//人数
    var hospital1 = new Array();//医院
    var hospital2 = new Array();//医院排序
    var bedList1 = new Array();//床位
    var people1 = new Array();//人数
    var yearYlws = new Array();
    var basicData = new Array();
    //疾病
    var ailment = new Array();
    var ailmentX = new Array();
    var ailmentY = new Array();
    var hospital3 = new Array();
    var city1 = new Array();
    var maxData = new Array();
    var maxData1 = new Array();
    //用于缓存
    vm.dataList1 = new Array();
    vm.dataList2 = new Array();
    vm.dataList5 = new Array();
    basicData = hospital1;
    //医疗卫生基本情况 切换
    vm.basicVal = '卫生机构数';
    vm.basicTabClick = function (basicTabNum){
       vm.basicVal = basicTabNum ;
       if(basicTabNum=='床位数'){
            vm.ecOption5.series[0].data = bedList1;
       } else if(basicTabNum=='人员数'){
            vm.ecOption5.series[0].data = people1;
       }else{
            vm.ecOption5.series[0].data = hospital1;
       }
    };
    /*卫生机构市州排行*/
    vm.ecConfig = {
      theme: 'Donut',
      dataLoaded: false
    };
    vm.ecOption = {
             color: ['#0c6bd9'],
               grid: {
                  left: 70,
                  right:70,
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
              yAxis : [
                  {
                      type : 'category',
                      data : city1,
                      inverse:true,
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
              series : [
                 {
                    type: "bar",
                    silent: true,
                    itemStyle: {
                      normal: {
                        color: '#f5f5f5'
                      }
                    },
                    // barWidth: 30,
                    barGap: '-100%',
                    data: maxData //底层灰色柱子
                  },
                  {
                      type:'bar',
                      label: {
                          normal: {
                              formatter: '{c}家',
                              position: ['290','5'],
                              show: true
                          }
                      },
                      z: 10,
                      // barWidth: 30,
                      barMaxHeight:220,
                      barCategoryGap:'50%',
                      data:hospital3
                  }
              ]
     };
     vm.ecConfig.dataLoaded = true;
    vm.methodJbqk1 = function(){
     var url1 = '/leader/medical/qryylwsjbqklist/1/'+endDate+'_'+endDate+'/3';
    CommService.getHttpJsonItem(url1, devUrl + url1, function (response) {
      vm.dataList1 = response.data;
      // sessionStorage.setItem("cacheYlwsjbqkDataList1", JSON.stringify(vm.dataList1));
      for (var i = 0; i < vm.dataList1.length; i++) {
        hospital.push(vm.dataList1[i].INSTITUTIONS_NUM);
        hospital2.push(vm.dataList1[i].INSTITUTIONS_NUM);
        bedList.push(vm.dataList1[i].BED_NUM);
        people.push(vm.dataList1[i].PERSONEL_NUM);
      }
      //排序
      hospital.sort(function(a,b){
        return b-a});            //降序
      for(var i=0;i<hospital2.length;i++){
        for(var j=0;j<hospital2.length;j++){
          if(hospital2[j] == hospital[i]){
            city.push(vm.dataList1[j].DISTRICT_NAME);
          }
        }
      }
      // console.log(hospital)
      //选择前五个
      for(var i = 0;i<hospital.length;i++){
        if(i==5){
          break;
        }
        hospital3.push(hospital[i]);
        city1.push(city[i]);
        maxData.push(hospital[0]);
      }

    });
  };

            //医疗卫生基本情况
            vm.ecConfig5 = {
              theme: 'Donut',
              dataLoaded: false
            };
             vm.ecOption5 = {
                    color: ['#137ebd'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        top:'-10',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : yearYlws,
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
                            // min: 0,
                            // max: 30000,
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
                        {
                            name:'总量:',
                            type:'bar',
                            barMaxWidth:20,
                            data:basicData
                        }
                    ]
           };
           vm.ecConfig5.dataLoaded = true;
           vm.wsjg=0;
           vm.cws=0;
           vm.rys=0;
      vm.methodJbqk2 = function(){
        var url2 = '/leader/medical/qryylwsjbqklist/1/'+starDate+'_'+endDate+'/2';
        CommService.getHttpJsonItem(url2, devUrl + url2, function (response) {
          vm.dataList2 = response.data;
          for (var i = 0; i < vm.dataList2.length; i++) {
            yearYlws.push(vm.dataList2[i].DATE_PERIOD);
          }
          yearYlws.sort(function(a,b){
            return a-b});
          for(var i in yearYlws){
            for(var j in vm.dataList2){
              if(yearYlws[i]==vm.dataList2[j].DATE_PERIOD){
                hospital1.push(vm.dataList2[j].INSTITUTIONS_NUM);
                bedList1.push(vm.dataList2[j].BED_NUM);
                people1.push(vm.dataList2[j].PERSONEL_NUM);
                // vm.wsjg=vm.dataList2[1].INSTITUTIONS_NUM;
                // vm.cws=vm.dataList2[1].BED_NUM;
                // vm.rys=vm.dataList2[1].PERSONEL_NUM;
              }
            }
          }
          for(var i in hospital1){
            vm.wsjg=hospital1[4];
          }
          for(var i in bedList1){
            vm.cws=bedList1[4];
          }
          for(var i in people1){
            vm.rys=people1[4];
          }
          console.log(vm.wsjg)
        });
      };
      //色块的数据
    vm.methodJbqk3 = function(){
      var url3 = '/leader/medical/qryylwsyljglist/1/'+endDate+'_'+endDate;
      CommService.getHttpJsonItem(url3, devUrl + url3, function (response) {
        vm.alwaysData = response.data;
      });
     };

     vm.methodJbqk4 = function(){
       var url6 = '/leader/medical/qryylwscrbqklist/1/'+endDate+'_'+endDate;
       CommService.getHttpJsonItem(url6, devUrl + url6, function (response) {
         vm.alwaysData1 = response.data;
       });
     };

      //全省主要疾病情况分析 全省主要疾病死因构成
        vm.ecConfig3 = {
            theme: 'Donut',
            dataLoaded: false
          };
          vm.ecOption3 = {
                    color: ['#574fbe'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend:{
                      show:true,
                      left:'center',
                      top:'5%',
                      data:['疾病总量']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [ {
                            type : 'category',
                            data : ailmentX,
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
                            axisLabel: {
                                     interval: 0,
                                     formatter:function(value)
                                     {
                                         var ret = "";//拼接加\n返回的类目项
                                         var maxLength = 4;//每项显示文字个数
                                         var valLength = value.length;//X轴类目项的文字个数
                                         var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                                         if (rowN > 1)//如果类目项的文字大于3,
                                         {
                                             for (var i = 0; i < rowN; i++) {
                                                 var temp = "";//每次截取的字符串
                                                 var start = i * maxLength;//开始截取的位置
                                                 var end = start + maxLength;//结束截取的位置
                                                 //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                                                 temp = value.substring(start, end) + "\n";
                                                 ret += temp; //凭借最终的字符串
                                             }
                                             return ret;
                                         }
                                         else {
                                             return value;
                                         }
                                     },
                                     textStyle:{
                                       color:"#7F7F7F"
                                    }

                               }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            name : '单位:例',
                            // min: 0,
                            // max: 400,
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
                        {
                            name:'疾病总量',
                            type:'bar',
                            barMaxWidth:20,
                            data:ailmentY
                        }
                    ]
           };
           vm.ecConfig3.dataLoaded = true;

           //全省主要疾病死因构成
            vm.ecConfig4 = {
            theme: 'Donut',
            dataLoaded: false
          };
          vm.ecOption4 = {
                   tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c}(1/10万) ({d}%)"
                    },
                    legend: {
                        left: 'center',
                        data: ailmentX,
                        top:'0',
                        itemWidth:20,
                        itemHeight:10
                    },
                    series : [
                        {
                            name: '疾病分类',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:ailment,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            color:['#394aa9','#cb64bb','#6c6fef','#3295cf','#6cb964','#e28750','#a76cef','#2863db','#00c2a9','#c0e347','#b13df3','#48b143']
                        }
                    ]
           }
           vm.ecConfig4.dataLoaded = true;
        vm.methodJbqk5 = function(){
           var url4 = '/leader/medical/qryylwsswfxlist/1/'+endDate+'_'+endDate+'/1';
          CommService.getHttpJsonItem(url4, devUrl + url4, function (response) {
            console.log(devUrl + url4);
            console.log(response.data);
            for (var i in response.data) {
              ailmentX.push(response.data[i].DESCRIPTION);
              ailmentY.push(response.data[i].BLS);
              ailment.push({value:response.data[i].DISEASE_DEATH_RATE,name:response.data[i].DESCRIPTION});
            }
            console.log(ailmentY);
            // var max=ailmentY.reduce(function(a,b){
            //   if(a>b){
            //     return a;
            //   } else{
            //     return b;
            //   }
            // });
            // //vm.ecOption3.yAxis[0].max = max;
            // for (var i = 0; i < vm.dataList5.length; i++) {
            //   maxData1.push(max);
            // }
          });
        };

    //加载数据
    vm.methodJbqk1();
    vm.methodJbqk2();
    vm.methodJbqk3();
    vm.methodJbqk4();
    vm.methodJbqk5();

    //大屏适配 -- IE10
    if(window.screen.width>=1800){
      // console.log(1);
      // console.log(window.width());
      $('.lie_three').css('width','286px');
      $('.yl_jbqk_box1').css('width','51.2%');
    }


  }

})();


