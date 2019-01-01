/**
 * 领导桌面-环保情况分析
 */
(function () {
  'use strict';

  $(".content-wrapper .container").removeClass("container").addClass("container-fluid");

  angular
    .module('smartCore')
    .controller('LdzmTopicIndHjbhZsjcController', LdzmTopicIndHjbhZsjcController);

  /** @ngInject */
  function LdzmTopicIndHjbhZsjcController($http, devUrl, CommService,latestYear) {
    var vm = this;
    vm.title = "领导桌面-环保情况分析-噪声监测";
    vm.screenSizeType=CommService.getScreenSize().type;
    var myDate = new Date();
    //var curYear=myDate.getFullYear()-1;
    var curYear=parseInt(latestYear)+1;
    vm.activeNo = "0";
    //全省城市各类功能区噪声昼/夜达标点次
    vm.barData=function (){
      var xData01 = [];
      var seriesData = [];
      vm.barConfig1={
        theme: 'Donut',
        dataLoaded: false
      };
      vm.barOption1={
        baseOption:{
          timeline: {
            axisType: 'category',
            symbol:'diamond',
            autoPlay: true,
            playInterval: 4000,
            controlStyle: {
              itemSize:16,
              normal:{
                borderColor:'#A0A0A0'
              },
              emphasis:{
                borderColor:'#2863DB'
              }
            },
            data :xData01,
            left:0,
            right:0,
            bottom:0,
            itemStyle: {
              normal: {
                color: '#fff',
                borderColor:'#A0A0A0',
              },
              emphasis:{
                color: '#fff',
                borderColor:'#2863DB'
              }
            },
            lineStyle: {
              color: '#A0A0A0',
              type:'dashed'
            },
            checkpointStyle: {
              symbol:'diamond',
              symbolSize:10,
              color: '#2863DB',
              borderWidth:1,
              borderColor: '#2863DB'
            },
            label: {
              normal:{
                interval:0
              }
            }
          },
          color:['#3f69e4','#394aa9','#b863bb'],
          legend: {
            data: ['监测点次', '昼达标', '夜达标'],
            y:'8',
            itemWidth:12,
            itemHeight:12,
          },
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            top:40,
            left:40,
            right:30,
            bottom: 80
          },
          yAxis: {
            name:'数量：点次',
            type : 'value',
            position: 'top',
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
          },
          xAxis: {
            type : 'category',
            data : ['0类', '1类', '2类', '3类', '4a类', '4b类'],
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
          },
          series : [
            {
              name:'预测值',
              type:'bar',
              barWidth:'15'
            }
          ]
        },
        options:seriesData
      };
      var url= 'leader/envprotect/qryzsjc?datePeriodType=2&startDate='+(curYear-1)+'-1&endDate='+curYear+'-4';
      CommService.getHttpJsonItem(url,devUrl + url,function(response){
        var seriesDataJcdc = [];
        var seriesDataZdb = [];
        var seriesDataYdb = [];
        for (var i = (response.data.length-36); i < response.data.length; i++) {
           if(response.data[i].ZSLB.trim() == vm.activeNo){
             xData01.push(response.data[i].DATE_PERIOD.substring(0,5)+'Q'+response.data[i].DATE_PERIOD.substring(5));
           }
           if(i > (response.data.length-36)){
                if(response.data[i].DATE_PERIOD != response.data[i-1].DATE_PERIOD){
                    seriesData.push({series: [{
                        name:'监测点次',
                        type:'bar',
                        barWidth:'15',
                        data:seriesDataJcdc
                      } ,{
                        name:'昼达标',
                        type:'bar',
                        barWidth:'15',
                        data:seriesDataZdb
                      },
                      {
                        name:'夜达标',
                        type:'bar',
                        barWidth:'15',
                        data:seriesDataYdb
                      }]});
                      seriesDataJcdc = [];
                      seriesDataZdb = [];
                      seriesDataYdb = [];
                      seriesDataJcdc.push(response.data[i].JCDC);
                      seriesDataZdb.push(response.data[i].ZDBCS);//字段少了，待会儿改
                      seriesDataYdb.push(response.data[i].YDBCS);
                 } else if(response.data[i].DATE_PERIOD == response.data[response.data.length-1].DATE_PERIOD && response.data[i].ZSLB.trim()=='4b'){
                      seriesDataJcdc.push(response.data[i].JCDC);
                      seriesDataZdb.push(response.data[i].ZDBCS);//字段少了，待会儿改
                      seriesDataYdb.push(response.data[i].YDBCS);
                      seriesData.push({series: [{
                        name:'监测点次',
                        type:'bar',
                        barWidth:'15',
                        data:seriesDataJcdc
                      } ,{
                        name:'昼达标',
                        type:'bar',
                        barWidth:'15',
                        data:seriesDataZdb
                      },
                      {
                        name:'夜达标',
                        type:'bar',
                        barWidth:'15',
                        data:seriesDataYdb
                      }]});
                 } else {
                    seriesDataJcdc.push(response.data[i].JCDC);
                    seriesDataZdb.push(response.data[i].ZDBCS);//字段少了，待会儿改
                    seriesDataYdb.push(response.data[i].YDBCS);
                 }
           } else {
              seriesDataJcdc.push(response.data[i].JCDC);
              seriesDataZdb.push(response.data[i].ZDBCS);//字段少了，待会儿改
              seriesDataYdb.push(response.data[i].YDBCS);
           }
        }
         vm.barConfig1.dataLoaded=true;
      });
    };
    vm.barData();
    //全省城市声环境功能区噪声等效声级
    var loadChart=function () {
      var xData02 = [];
      var shadowArr = [];//阴影
      var dayTimeArr = [];//白天总数据
      var dayTimeBZ = [];
      var atNightArr = [];//晚上总数据
      var atNightBZ = [];
      var optionsData = [];
      vm.barConfig2= {
        theme: 'Donut',
        dataLoaded: false
      };
      vm.barOption2 = {
        baseOption:{
          timeline: {
            axisType: 'category',
            symbol:'diamond',
            autoPlay: true,
            playInterval: 4000,
            controlStyle: {
              itemSize:20,
              normal:{
                borderColor:'#A0A0A0'
              },
              emphasis:{
                borderColor:'#2863DB'
              }
            },
            data: xData02,
            left:0,
            right:0,
            bottom:10,
            itemStyle: {
              normal: {
                color: '#fff',
                borderColor:'#A0A0A0',
              },
              emphasis:{
                color: '#fff',
                borderColor:'#2863DB'
              }
            },
            lineStyle: {
              color: '#A0A0A0',
              type:'dashed'
            },
            checkpointStyle: {
              symbol:'diamond',
              symbolSize:10,
              color: '#2863DB',
              borderWidth:1,
              borderColor: '#2863DB'
            },
            label: {
              normal:{
                interval:0,
                textStyle:{
                  fontSize:10
                }
              }
            }
          },
          tooltip: {
            show:false,
            backgroundColor:'rgba(0,0,0,1)'
          },
          color:['#3E67E4','#3549A1','red'],
          legend: {
            show:false
          },
          grid: [{//左右布局
            top: 30,
            width: '40%',
            bottom: 60,
            left: 10,
            containLabel: true
          }, {
            top: 30,
            width: '40%',
            bottom: 60,
            left: '50%',
            containLabel: true
          }],
          xAxis: [{
            type: 'value',
            show:false
          }, {
            type: 'value',
            gridIndex: 1,
            show:false
          }],
          yAxis: [{
            type: 'category',
            data: ['0类区','1类区','2类区','3类区','4a类区','4b类区'],
            axisLabel: {
              interval: 0
            },
            axisTick:{//刻度消失
              show:false
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            }
          }, {
            gridIndex: 1,
            type: 'category',
            data: ['0类区','1类区','2类区','3类区','4a类区','4b类区'],
            show:false
          }],
          series: [
            {
              type: 'bar',
              barGap:'-100%',
              silent: true,
              barWidth:15,
              itemStyle: {
                normal: {
                  color: '#eee'
                }
              }
            },
            {name:'白昼',type:'bar',barWidth:15,silent: true,
              label: {
                normal: {
                  show: true,
                  position: 'inside'
                }
              }
            },
            {
              type: 'bar',
              barGap:'-100%',
              silent: true,
              barWidth:15,
              xAxisIndex: 1,
              yAxisIndex: 1,
              itemStyle: {
                normal: {
                  color: '#eee'
                }
              }
            },
            {name:'夜间',type:'bar',barWidth:15,silent: true, xAxisIndex: 1, yAxisIndex: 1,
            label: {
              normal: {
                show: true,
                  position: 'inside'
              }
            }}]
        },
        options:optionsData
    };
      var url= 'leader/envprotect/qryzsjc?datePeriodType=2&startDate='+(curYear-1)+'-1&endDate='+curYear+'-4';
      CommService.getHttpJsonItem(url,devUrl + url,function(response){
          var dayTimeMaxArr = [];
          var dayTimeSmallData = [];
          var atNightSmallData = [];
          var xAxisArr = ['0类区','1类区','2类区','3类区','4a类区','4b类区'];
        for (var i = (response.data.length-24); i < response.data.length; i++) {
          if(response.data[i].ZSLB.trim() == vm.activeNo){
             xData02.push(response.data[i].DATE_PERIOD.substring(0,5)+'Q'+response.data[i].DATE_PERIOD.substring(5));
            }
            if(i > (response.data.length-24)){
                if(response.data[i].DATE_PERIOD != response.data[i-1].DATE_PERIOD){
                    dayTimeArr.push(dayTimeSmallData);
                    atNightArr.push(atNightSmallData);
                    dayTimeSmallData = [];
                    atNightSmallData = [];
                    if(response.data[i].ZFB < response.data[i].ZGJBZZ){
                       dayTimeSmallData.push({value:response.data[i].ZFB});
                    } else {
                       dayTimeSmallData.push({value:response.data[i].ZFB,itemStyle:{normal:{color:'red'}}});
                    }
                    if(response.data[i].YFB < response.data[i].YGJBZZ){
                       atNightSmallData.push({value:response.data[i].YFB});
                    } else {
                       atNightSmallData.push({value:response.data[i].YFB,itemStyle:{normal:{color:'red'}}});
                    }
                 } else if(response.data[i].DATE_PERIOD == response.data[response.data.length-1].DATE_PERIOD && response.data[i].ZSLB.trim()=='4b'){
                    if(response.data[i].ZFB < response.data[i].ZGJBZZ){
                       dayTimeSmallData.push({value:response.data[i].ZFB});
                    } else {
                       dayTimeSmallData.push({value:response.data[i].ZFB,itemStyle:{normal:{color:'red'}}});
                    }
                    if(response.data[i].YFB < response.data[i].YGJBZZ){
                       atNightSmallData.push({value:response.data[i].YFB});
                    } else {
                       atNightSmallData.push({value:response.data[i].YFB,itemStyle:{normal:{color:'red'}}});
                    }
                    dayTimeArr.push(dayTimeSmallData);
                    atNightArr.push(atNightSmallData);
                 } else {
                      if(response.data[i].ZFB < response.data[i].ZGJBZZ){
                         dayTimeSmallData.push({value:response.data[i].ZFB});
                      } else {
                         dayTimeSmallData.push({value:response.data[i].ZFB,itemStyle:{normal:{color:'red'}}});
                      }
                      if(response.data[i].YFB < response.data[i].YGJBZZ){
                         atNightSmallData.push({value:response.data[i].YFB});
                      } else {
                         atNightSmallData.push({value:response.data[i].YFB,itemStyle:{normal:{color:'red'}}});
                      }
                 }
           } else {
              if(response.data[i].ZFB < response.data[i].ZGJBZZ){
                 dayTimeSmallData.push({value:response.data[i].ZFB});
              } else {
                 dayTimeSmallData.push({value:response.data[i].ZFB,itemStyle:{normal:{color:'red'}}});
              }
              if(response.data[i].YFB < response.data[i].YGJBZZ){
                 atNightSmallData.push({value:response.data[i].YFB});
              } else {
                 atNightSmallData.push({value:response.data[i].YFB,itemStyle:{normal:{color:'red'}}});
              }
           }
          dayTimeMaxArr.push(response.data[i].ZFB);
        }
         dayTimeMaxArr.sort(function (x, y) {
            if (x < y) {
                return 1;
            }
            if (x > y) {
                return -1;
            }
            return 0;
        });
        //阴影
        for (var i = 0; i < 6; i++) {
          shadowArr.push((dayTimeMaxArr[0]/10 + 1) *10);
          dayTimeBZ.push({name: '国家标准',yAxis:xAxisArr[i],xAxis:response.data[i].ZGJBZZ});
          atNightBZ.push({name: '国家标准',yAxis:xAxisArr[i],xAxis:response.data[i].YGJBZZ});
        }
        for (var i = 0; i < 4; i++) {
          optionsData.push({
            series:[
              {data:shadowArr},//左边阴影数据
              {data:dayTimeArr[i],
               markPoint : {//位置
                  symbol:'image://assets/images/icon_norm.png',
                  symbolSize:[7,20],
                  label:{normal:{show:false}},
                  data : dayTimeBZ
                }
              },
              {data:shadowArr},//右边阴影数据
              {data:atNightArr[i],
               markPoint : {//位置
                  symbol:'image://assets/images/icon_norm.png',
                  symbolSize:[7,20],
                  label:{normal:{show:false}},
                  data : atNightBZ
                }
              }]
          });
        }
        vm.barConfig2.dataLoaded=true;
      });
    };
    loadChart();
    //全省城市各类功能区噪声昼/夜达标率
    vm.loadRadarChart=function(){
      var zDbl = [0,0,0,0,0,0];
      var yDbl = [0,0,0,0,0,0];
      vm.radarConfig={
        theme: 'Donut',
        dataLoaded: false
      };
      vm.RadarOption={
        tooltip: {},
        legend: {
          data:['昼达标率','夜达标率'],
          icon:'roundRect',
          top:10,
          left:10,
          itemGap:10,
          orient:'vertical'
        },
        radar: {
          splitArea: {
            show: true
          },
          // shape: 'circle',
          indicator: [
            { name: '0类区', max: 100},
            { name: '1类区', max: 100},
            { name: '2类区', max: 100},
            { name: '3类区', max: 100},
            { name: '4a类区', max: 100},
            { name: '4b类区', max: 100}
          ]
        },
        series: [{
          name: '预算 vs 开销（Budget vs spending）',
          type: 'radar',
          // areaStyle: {normal: {}},
          data : [
            {
              value : zDbl,
              name : '昼达标率'
            },{
              value : yDbl,
              name : '夜达标率'
            }
          ]
        }]
      };
      var url= 'leader/envprotect/qryzsjc?datePeriodType=2&startDate='+(curYear-1)+'-1&endDate='+curYear+'-4';
      CommService.getHttpJsonItem(url,devUrl + url,function(response){
        var maxTime = 0;
        for (var i = 0; i < response.data.length; i++) {
          var time = response.data[i].DATE_PERIOD;
          var year = time.substring(0,4);
          var month = time.substring(5,time.length);
          if(maxTime==0){
            maxTime=time;
          }else{
            var maxYear = maxTime.substring(0,4);
            var maxMonth = maxTime.substring(5,maxTime.length);
            if(year>maxYear||(year==maxYear&&month>maxMonth)){
              maxTime = time;
            }
          }
        }
        for (var i = 0; i < response.data.length; i++) {
          if(maxTime==response.data[i].DATE_PERIOD){
            var type = response.data[i].ZSLB.trim();
            if(type=='0'){
              zDbl[0]=response.data[i].ZDBL;
              yDbl[0]=response.data[i].YDBL;
            }else if(type=='1'){
              zDbl[1]=response.data[i].ZDBL;
              yDbl[1]=response.data[i].YDBL;
            }else if(type=='2'){
              zDbl[2]=response.data[i].ZDBL;
              yDbl[2]=response.data[i].YDBL;
            }else if(type=='3'){
              zDbl[3]=response.data[i].ZDBL;
              yDbl[3]=response.data[i].YDBL;
            }else if(type=='4a'){
              zDbl[4]=response.data[i].ZDBL;
              yDbl[4]=response.data[i].YDBL;
            }else if(type=='4b'){
              zDbl[5]=response.data[i].ZDBL;
              yDbl[5]=response.data[i].YDBL;
            }
          }
        }
        vm.radarConfig.dataLoaded = true;
      });
    };
    vm.loadRadarChart();

    // vm.loadLineChart=function(date){
    //   vm.time=[],vm.val=[],vm.max=[],vm.min=[];
    //   vm.lineConfig=null;
    //   vm.lineOption=null;
    //   vm.lineConfig={
    //     theme: 'Donut',
    //     dataLoaded: false
    //   };
    //   vm.lineOption={
    //     legend:{
    //       data:['最小声级','最大声级','平均声级'],
    //       icon:'roundRect',
    //       top:20,
    //       itemGap:30
    //     },
    //     tooltip: {
    //       trigger: 'axis',
    //       axisPointer: { // 坐标轴指示器，坐标轴触发有效
    //         type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    //       }
    //     },
    //     xAxis: {
    //       type: 'category',
    //       data: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
    //     },
    //     yAxis: {
    //       type: 'value',
    //       name: '声级（分贝）'
    //     },
    //     series: [{
    //       symbol: 'circle',
    //       symbolSize: 2,
    //       lineStyle: {
    //         normal: {
    //           width: 2
    //         }
    //       },
    //       name:'平均声级',
    //       data: [],
    //       type: 'line',
    //       smooth: true
    //     },{
    //       symbol: 'circle',
    //       symbolSize: 2,
    //       lineStyle: {
    //         normal: {
    //           width: 2
    //         }
    //       },
    //       name:'最大声级',
    //       data: [],
    //       type: 'line',
    //       smooth: true
    //     },{
    //       symbol: 'circle',
    //       symbolSize: 2,
    //       lineStyle: {
    //         normal: {
    //           width: 2
    //         }
    //       },
    //       name:'最小声级',
    //       data: [],
    //       type: 'line',
    //       smooth: true
    //     }]
    //   };
    //   var url= 'leader/envprotect/qryZsjcList?stationId='+vm.selectedArea3.id+'&date='+date;
    //   CommService.getHttpJsonItem(url,devUrl + url,function(response){
    //     var data = response.data;
    //
    //     console.log(data)
    //     for(var i=0; i<data.length; i++){
    //       // vm.time.push(data[i].FLDHOUR);
    //       vm.val.push(data[i].FLDLEQA);
    //       vm.max.push(data[i].FLDLMAX);
    //       vm.min.push(data[i].FLDLMIN);
    //       vm.lineOption.series[0].data = vm.val;
    //       vm.lineOption.series[1].data = vm.max;
    //       vm.lineOption.series[2].data = vm.min;
    //     }
    //     console.log(vm.time)
    //     vm.lineConfig.dataLoaded = true;
    //   });
    //
    // };

    vm.loadLineChart=function(date){
      vm.time=[],vm.val=[],vm.max=[],vm.min=[];
      vm.lineConfig=null;
      vm.lineOption=null;
      vm.lineConfig={
        theme: 'Donut',
        dataLoaded: false
      };
      var myChart = echarts.init(document.getElementById('lineChart'));
      var lineOption={
        legend:{
          data:['最小声级','最大声级','平均声级'],
          icon:'roundRect',
          top:20,
          itemGap:30
        },
        areaStyle: {normal: {
          color:"#123daa",
          opacity :"0.5"
        }},
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
        },
        yAxis: {
          type: 'value',
          name: '声级（分贝）'
        },
        series: [{
          symbol: 'circle',
          symbolSize: 2,
          lineStyle: {
            normal: {
              width: 2
            }
          },
          name:'平均声级',
          data: [],
          type: 'line',
          smooth: true
        },{
          symbol: 'circle',
          symbolSize: 2,
          lineStyle: {
            normal: {
              width: 2
            }
          },
          name:'最大声级',
          data: [],
          type: 'line',
          smooth: true
        },{
          symbol: 'circle',
          symbolSize: 2,
          lineStyle: {
            normal: {
              width: 2
            }
          },
          name:'最小声级',
          data: [],
          type: 'line',
          smooth: true
        }]
      };
      var url= 'leader/envprotect/qryZsjcList?stationId='+vm.selectedArea3.id+'&date='+date;
      CommService.getHttpJsonItem(url,devUrl + url,function(response){
        var data = response.data;
        for(var i=0; i<data.length; i++){
          vm.val.push(data[i].FLDLEQA);
          vm.max.push(data[i].FLDLMAX);
          vm.min.push(data[i].FLDLMIN);
          lineOption.series[0].data = vm.val;
          lineOption.series[1].data = vm.max;
          lineOption.series[2].data = vm.min;
        }
        if(vm.screenSizeType=='M'){
          $("#lineChart").css('width','702px');
        }else if(vm.screenSizeType=='L'){
          $("#lineChart").css('width','940');
        }
        myChart.resize();
        myChart.setOption(lineOption);
      });

    };

    vm.loadSelect1=function(){
      var url= 'leader/envprotect/qryAreaByParentId?parentId=430000';
      CommService.getHttpJsonItem(url,devUrl + url,function(response){
        vm.areaList1=[];
        var data=response.data;
        for(var i=0;i<data.length;i++){
          vm.areaList1.push({'id':data[i].DISTRICT_NO,'name':data[i].DISTRICT_NAME})
        }
        vm.selectedArea1 = vm.areaList1[0];
      });
    };

    vm.loadSelect3=function(parentId){
      var url= 'leader/envprotect/qryStationByParentId?parentId='+parentId;
      CommService.getHttpJsonItem(url,devUrl + url,function(response){
        vm.areaList3=[];
        var data=response.data;
        for(var i=0;i<data.length;i++){
          vm.areaList3.push({'id':data[i].FLDPCODE,'name':data[i].FLDPNAME})
        }
        vm.selectedArea3 = vm.areaList3[0];
        //查询最近的日期
        var url= 'leader/envprotect/qryZsjcRecentTimeByStation?stationId='+vm.selectedArea3.id;
        CommService.getHttpJsonItem(url,devUrl + url,function(response){
          var data = response.data;
          var month = data.FLDMONTH.toString().length==2?data.FLDMONTH.toString():"0"+data.FLDMONTH.toString();
          var day = data.FLDDAY.toString().length==2?data.FLDDAY.toString():"0"+data.FLDDAY.toString();
          $("#queryTime").val(data.FLDYEAR+"-"+month+"-"+day);
          console.log("---"+data.FLDYEAR+month+day);
          vm.loadLineChart(data.FLDYEAR+month+day);
        });
      });
    };

    vm.loadSelect2=function(parentId){
      var url= 'leader/envprotect/qryExistDataAreaByParentId?parentId='+parentId;
      CommService.getHttpJsonItem(url,devUrl + url,function(response){
        vm.areaList2=[];
        var data=response.data;
        for(var i=0;i<data.length;i++){
          vm.areaList2.push({'id':data[i].FLDSTCODE,'name':data[i].FLDSTNAME})
        }
        vm.selectedArea2 = vm.areaList2[0];
        vm.loadSelect3(vm.areaList2[0].id);
      });
    };

    vm.loadSelect1();
    vm.loadSelect2(430100);

    vm.selectChanged1=function(){
      vm.loadSelect2(vm.selectedArea1.id);
    };

    vm.selectChanged2=function(){
      vm.loadSelect3(vm.selectedArea2.id);
    };

    vm.selectChanged3=function(){
      //查询最近的日期
      var url= 'leader/envprotect/qryZsjcRecentTimeByStation?stationId='+vm.selectedArea3.id;
      CommService.getHttpJsonItem(url,devUrl + url,function(response){
        var data = response.data;
        var month = data.FLDMONTH.toString().length==2?data.FLDMONTH.toString():"0"+data.FLDMONTH.toString();
        var day = data.FLDDAY.toString().length==2?data.FLDDAY.toString():"0"+data.FLDDAY.toString();
        $("#queryTime").val(data.FLDYEAR+"-"+month+"-"+day);
        console.log("---"+data.FLDYEAR+month+day);
        vm.loadLineChart(data.FLDYEAR+month+day);
      });
    };



    $('.datepicker').datepicker({
      maxDate: 0, // 当前日期的 0 天，就是当天
      onSelect: function(dateText,inst){
        console.log(dateText)
        var date = dateText.replace("-","").replace("-","");
        vm.loadLineChart(date);
      }
    });

  }
})();


