/**
 * 领导桌面-环境保护
 */
(function () {
  'use strict';

  $(".content-wrapper .container").removeClass("container").addClass("container-fluid");

  angular
    .module('smartCore')
    .controller('LdzmTopicIndHjbhShjzlController', LdzmTopicIndHjbhShjzlController);

  /** @ngInject */
  function LdzmTopicIndHjbhShjzlController($http, devUrl, CommService,latestYear) {
    var vm = this;
    vm.title = "领导桌面-环境保护-水环境质量";
    vm.screenSizeType=CommService.getScreenSize().type;
    var myDate = new Date();
    //var curYear=myDate.getFullYear();
    var curYear=parseInt(latestYear)+1;
    vm.city = '益阳';
    vm.cityNorm = '锑';
    //地表水环境质量状况
    vm.barData=function (){
      var xData01 = [];
      var seriesData = [];
      vm.barConfig={
        theme: 'Donut',
        dataLoaded: false
      };
      vm.barOption={
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
            data: xData01,
            left:0,
            right:0,
            bottom:0,
            height:45,
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
          color:['#6cb964','#3f69e4','#b863bb','#ff0000'],
          legend: {
            data: ['I~III类', 'IV类', 'V类', '劣V类'],
            y:'48',
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
            top:80,
            left:40,
            right:30,
            bottom:80
          },
          yAxis: {
            name:'单位：%',
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
            data : ['湘江流域', '资江流域', '沅江流域', '澧水流域', '长江湖南段', '环洞庭湖河流', '珠江流域', '洞庭湖水质'],
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
              barWidth:'15',
              stack: ''
            }
          ]
        },
        options:seriesData
      };
      var url= 'leader/envprotect/qrydpshj?datePeriodType=3&startDate='+(curYear-1)+'01&endDate='+curYear+'12';
      CommService.getHttpJsonItem(url,devUrl + url,function(response){
        var seriesDataIII = [];
        var seriesDataIV = [];
        var seriesDataV = [];
        var seriesDataWV = [];
        for (var i = 0; i < response.data.length; i++) {
           if(response.data[i].LYMC == 1){
             xData01.push(response.data[i].DATE_PERIOD.substring(0,4)+'年\n'+response.data[i].DATE_PERIOD.substring(4)+'月');
           }
           if(i > 0){
                if(response.data[i].DATE_PERIOD != response.data[i-1].DATE_PERIOD){
                    seriesData.push({series: [{
                        name:'I~III类',
                        type:'bar',
                        stack: '水流',
                        data:seriesDataIII
                      } ,{
                        name:'IV类',
                        type:'bar',
                        stack: '水流',
                        data:seriesDataIV
                      },
                      {
                        name:'V类',
                        type:'bar',
                        stack: '水流',
                        data:seriesDataV
                      },
                      {
                        name:'劣V类',
                        type:'bar',
                        stack: '水流',
                        data:seriesDataWV
                      }]});
                      seriesDataIII = [];
                      seriesDataIV = [];
                      seriesDataV = [];
                      seriesDataWV = [];
                      seriesDataIII.push(response.data[i].YDSLBFB);
                      seriesDataIV.push(response.data[i].SLBFB);//字段少了，待会儿改
                      seriesDataV.push(response.data[i].WLBFB);
                      seriesDataWV.push(response.data[i].LWLBFB);
                 } else if(response.data[i].DATE_PERIOD == response.data[response.data.length-1].DATE_PERIOD && response.data[i].LYMC==8){
                      seriesDataIII.push(response.data[i].YDSLBFB);
                      seriesDataIV.push(response.data[i].SLBFB);//字段少了，待会儿改
                      seriesDataV.push(response.data[i].WLBFB);
                      seriesDataWV.push(response.data[i].LWLBFB);
                      seriesData.push({series: [{
                        name:'I~III类',
                        type:'bar',
                        stack: '水流',
                        data:seriesDataIII
                      } ,{
                        name:'IV类',
                        type:'bar',
                        stack: '水流',
                        data:seriesDataIV
                      },
                      {
                        name:'V类',
                        type:'bar',
                        stack: '水流',
                        data:seriesDataV
                      },
                      {
                        name:'劣V类',
                        type:'bar',
                        stack: '水流',
                        data:seriesDataWV
                      }]});
                 } else {
                    seriesDataIII.push(response.data[i].YDSLBFB);
                    seriesDataIV.push(response.data[i].SLBFB);//字段少了，待会儿改
                    seriesDataV.push(response.data[i].WLBFB);
                    seriesDataWV.push(response.data[i].LWLBFB);
                 }
           } else {
              seriesDataIII.push(response.data[i].YDSLBFB);
              seriesDataIV.push(response.data[i].SLBFB);//字段少了，待会儿改
              seriesDataV.push(response.data[i].WLBFB);
              seriesDataWV.push(response.data[i].LWLBFB);
           }
        }
         vm.barConfig.dataLoaded=true;
      });
    };
    vm.barData();
    //切换文字
    var currentArr = [];
    var oddArr = [] ;
    var onTimelineChanged=function(prom){
        oddArr.push(prom.from);
        var oddLength = oddArr.length;
        if(oddArr[oddLength-1] == oddArr[1]){
           if(currentArr[prom.currentIndex].name != null){
             vm.city = currentArr[prom.currentIndex].name;
             vm.cityNorm = currentArr[prom.currentIndex].value;
             $('#city').text("“"+vm.city+"”");
             $('#cityNorm').text("“"+vm.cityNorm+"”");
             $('#cityHide').hide();
             $('#cityShow').show();
           } else {
             vm.city = "";
             vm.cityNorm = "";
             $('#city').text("“"+vm.city+"”");
             $('#cityNorm').text("“"+vm.cityNorm+"”");
             $('#cityShow').hide();
             $('#cityHide').show();
           }
        }
    }
    vm.pieData=function (){
      var xData02 = [];
      var seriesData01 = [];
      vm.pieConfig={
        theme: 'Donut',
        dataLoaded: false
      };
      vm.pieOption={
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
            dispatchAction:({
                type: 'timelineChange',
                // 时间点的 index
                currentIndex: 1
            }),
            data: xData02,
            left:0,
            right:0,
            bottom:0,
            height:45,
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
              //rotate:90
            }
          },
          color:['#394aa9','#eff1f9'],
          title:{
              textAlign:'center',
              textStyle:{
                fontSize: 22,
                fontWeight: 'bolder',
                color: '#333'
              },
              x:'49%',
              y:'32%',
              itemGap:0,
              subtext:'湖南省达标率',
              subtextStyle:{
                fontSize: 14,
                color: '#666',
              },
            },
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            top:60,
            left:40,
            right:30,
            bottom: 80
          },
          series : [
            {
              name:'预测值',
              type:'pie',
              center: ['50%', '35%'],
              radius: ['45%', '60%'],
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
            }
          ]
        },
        options:seriesData01
      };
      var url= 'leader/envprotect/qryyyshj?datePeriodType=3&startDate='+(curYear-1)+'01&endDate='+curYear+'12';
      CommService.getHttpJsonItem(url,devUrl + url,function(response){
        for (var i = 0; i < response.data.length; i++) {
          // if(response.data[i].DATE_PERIOD.substring(4,5)=='0'){
          //   xData02.push(response.data[i].DATE_PERIOD.substring(0,4)+'-'+response.data[i].DATE_PERIOD.substring(5));
          // } else {
          //   xData02.push(response.data[i].DATE_PERIOD.substring(0,4)+'-'+response.data[i].DATE_PERIOD.substring(4));
          // }
          xData02.push(response.data[i].DATE_PERIOD.substring(0,4)+'年\n'+response.data[i].DATE_PERIOD.substring(4)+'月');
          seriesData01.push({
            title:{text:response.data[i].DBL+ '%'},
            series: [{
               data:[
                {value:response.data[i].DBL, name:'达标率'},
                {value:100 - response.data[i].DBL, name:'未达标率'}]
              }]
          });
          currentArr.push({name:response.data[i].CBCSMC,value:response.data[i].CBWZM})
        }
        vm.city = currentArr[0].name;
        vm.cityNorm = currentArr[0].value;
        if(currentArr[0].name != null){
           $('#cityHide').hide();
           $('#cityShow').show();
        } else {
           $('#cityShow').hide();
           $('#cityHide').show();
        }
        vm.pieConfig.dataLoaded=true;
        vm.pieConfig.event = [{timelinechanged:onTimelineChanged}];
      });
    };
    vm.pieData();
    // var m = new Map([
    //   ['pH', '6-9'],
    //   ['溶解氧', '≥5mg/L'],
    //   ['高锰酸盐指数'	,'≤6mg/L'],
    //   ['氨氮', '≤1mg/L'],
    //   ['总磷', '≤0.2mg/L'],
    //   ['铅', '≤0.05mg/L'],
    //   ['镉', '≤0.005mg/L'],
    //   ['砷', '≤0.05mg/L'],
    //   ['电导率', ''],
    //   ['水温', ''],
    //   ['锰', ''],
    //   ['锑', ''],
    //   ['铁', '']
    // ]);

    vm.getValue = function(key){
      if(key=='pH'){ return '6-9';}
      else if(key=='溶解氧'){return '≥5mg/L';}
      else if(key=='高锰酸盐指数'){return '≤6mg/L';}
      else if(key=='氨氮'){return '≤1mg/L';}
      else if(key=='总磷'){return '≤0.2mg/L';}
      else if(key=='铅'){return '≤0.05mg/L';}
      else if(key=='镉'){return '≤0.005mg/L';}
      else if(key=='砷'){return '≤0.05mg/L';}
      else if(key=='电导率'){return '';}
      else if(key=='水温'){return '';}
      else if(key=='锰'){return '';}
      else if(key=='锑'){return '';}
      else if(key=='铁'){return '';}
    };

    vm.loadData=function(name){
      var url= 'leader/envprotect/qryWaterQuality?name='+ encodeURI(name);
      CommService.getHttpJsonItem(url,devUrl + url,function(response){
        var data = response.data;
        var res1 = data.res1;
        var res2 = data.res2;
        $('#clsj').html(res1.SJ);
        $('#dengji').html(res1.SZLB);
        $('#zdqk').html(res1.ZDQK);
        var tableHtml = '';
        for(var i=0;i<res2.length;i++){
          console.log(res2[i])
          var dw = res2[i].DW==null?'':res2[i].DW;
          var szlb = res2[i].SZLB==null?'':res2[i].SZLB;
          tableHtml+='<tr>'+
                        '<th>'+res2[i].JCYZ+'</th>'+
                        '<td>'+res2[i].JCJG+dw+'</td>'+
                        '<td>'+szlb+'</td>'+
                        '<td>'+vm.getValue(res2[i].JCYZ)+'</td>'+
                      '</tr>';
        }
        $('#table').html(tableHtml);
      });
    };

    $(".nomala, .activea").click(function(){
      $(this).siblings().removeClass("activea").addClass("nomala");
      $(this).siblings().children("span").removeClass("label-danger").addClass("label-primary").css("opacity","0.3");
      $(this).siblings().children("img").attr("src","../../../assets/images/p.png");
      $(this).removeClass("nomala").addClass("activea");
      $(this).children("span").addClass("label-danger").removeClass("label-primary").css("opacity","1");
      $(this).children("img").attr("src","../../../assets/images/a.gif");
      // $("#stationName").html($(this).children("span").html());
      $("#areaName").html($(this).children("label").html());
      $("#dmName").html($(this).children("div").html());
      vm.loadData($(this).children("label").html());
    });
    vm.loadData('湖南长沙坪塘地表水自动监测站');
  }
})();


