/**
 * Created by zte on 2017/4/12.
 */
(function () {
  'use strict';

  angular.module('smartCore')
    .controller('LdzmTopicIndJyfxszfxController',LdzmTopicIndJyfxszfxController);

  //
  function LdzmTopicIndJyfxszfxController($http,$scope,devUrl,SweetAlert,latestYear) {
    var vm = this;

    var myDate = new Date();     //Date对象会自动把当前日期和时间保存为其初始值
    var year = myDate.getFullYear() - 2;     //getFullYear()方法返回一个年份
    //var starDate=myDate.getFullYear() - 5;
    var endDate=latestYear-1;vm.cyear=endDate;
    var starDate=endDate - 2;
    //endDate=2015;
    var categories = new Array();
    var categories2 = new Array();
    vm.list = new Array();
    var empRs = new Array();
    var empWages = new Array();
    var empAve = new Array();
    var city1 = new Array();
    var city2 = new Array();
    var city3 = new Array();
    var empRs1 = new Array();
    var empRs2 = new Array();
    var empRs3 = new Array();
    var empWages1 = new Array();
    var empWages2 = new Array();
    var empWages3 = new Array();
    var empAve1 = new Array();
    var empAve2 = new Array();
    var empAve3 = new Array();
    var maxData1 = new Array();
    var maxData2 = new Array();
    var maxData3 = new Array();
    var rs_zzl = new Array();
    var wage_zzl = new Array();
    var ave_zzl = new Array();
    var district_no = 1; //地域区号
    var result = new Array();
    var result1 = new Array();
    var result2 = new Array();
    var result3 = new Array();
    var result4 = new Array();
    var result5 = new Array();
    var result6 = new Array();
    var data1=new Array();
	  var legendata=new Array();
    var rs_cs=new Array();
    var njrs_cs=new Array();
    var datagz=new Array();
    vm.categories = [];
    var maxBar=0;
    vm.hunanData = new Array();
    vm.tabColorNum = 1;
    //地图
    vm.curAreaName = "湖南省";
    var mapData = [];
    var areaMap = {};
    vm.mapConfig = {
      theme: 'Donut',
      dataLoaded: false
    };
    vm.mapOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}<br/>在岗职工总量：{c} 万人',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      visualMap: {
        min: 5,
        max: 200,
        orient: 'horizontal',
        left: 'center',
        top: 'bottom',
        text: ['高', '低'],           // 文本，默认为数值文本
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
            borderWidth: 1,
            borderColor: '#fff'
          }
        },
        selectedMode: 'single',
        data: mapData
      }]
    };
    // vm.mapDataList=function () {
    year=endDate;
    var url = devUrl + 'leader/employment/cityjob/1/' + year + '_' + year + '/1';
    $http.get(url)
      .success(function (response) {
        if (angular.isUndefined(response)) {
          SweetAlert.swal("没有查到相关数据");
        }
        result = response.data;
        // sessionStorage.setItem("cacheJyfxszfxDataList", JSON.stringify(result));
        for (var i = 0; i < result.length; i++) {
          mapData.push({seriesId: result[i].DISTRICT_NO, name: result[i].DISTRICT_NAME, value: result[i].JYRS});
          areaMap[result[i].DISTRICT_NAME] = result[i].DISTRICT_NO;
        }
        //console.log(areaMap);
        vm.mapConfig.dataLoaded = true;
        vm.mapConfig.event = [{mapselectchanged: onMapSelectChanged}];
      }).error(function () {
      SweetAlert.swal("网络有问题，待会再试");
    });
    // }

    var pieLegendData = [];
    var pieData = [];
    vm.loadPieChart = function ($http, devUrl, district_no) {
      categories = [];
      rs_cs = [];
      data1 = [];
      result1=[];
      //图1
      vm.ecConfig11 = {
        theme: 'Donut',
        dataLoaded: false
      };
      //图1
      vm.ecOption11 = {
        color:['#574fbe','#0c6bd9'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['在岗职工人员总数', '城镇单位从业人员数'],
          y:'5',
          align: 'left'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: categories,
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
        }],
        yAxis: [{
          type: 'value',
          name: '单位:万人',

          nameTextStyle: {
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
        }],
        series: [{
          name: '在岗职工人员总数',
          type: 'bar',
          barMaxWidth:'20',
          data: data1
        }, {
          name: '城镇单位从业人员数',
          type: 'bar',
          barMaxWidth:'20',
          data: rs_cs
        }]
      };
      var url = '';
      if (district_no == 1) {
        url = devUrl + 'leader/employment/selectbyCityTrend/1/'+starDate+'_'+endDate+'/'+district_no;
      } else {
        url = devUrl + 'leader/employment/selectbyCityTrend/1/'+starDate+'_'+endDate+'/'+district_no;
      }
      $http.get(url)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          result1 = response.data;
          //sessionStorage.setItem("cacheJyfxszfxDataList1", JSON.stringify(result1));
           maxBar=0;
          for(var i=0;i<result1.length;i++){
            categories.push(result1[i].DATE_PERIOD);
            data1.push(result1[i].JYRS);

            rs_cs.push(result1[i].CSJYRS);
            if(result1[i].JYRS>maxBar){
              maxBar=result1[i].JYRS;
            }
          }
         // vm.ecConfig11.yAxis.max=maxBar;
          vm.ecConfig11.dataLoaded=true;
        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });

    };

	 vm.loadPieChartQS = function ($http, devUrl, district_no) {
      categories = [];
      rs_cs = [];
      data1 = [];
      result1=[];
      //图1
      vm.ecConfig11 = {
        theme: 'Donut',
        dataLoaded: false
      };
      //图1
      vm.ecOption11 = {
        color:['#574fbe','#0c6bd9'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['从业人员数', '城镇从业人员数'],
          y:'5',
          align: 'left'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: categories,
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
        }],
        yAxis: [{
          type: 'value',
          name: '单位:万人',

          nameTextStyle: {
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
        }],
        series: [{
          name: '从业人员数',
          type: 'bar',
          barMaxWidth:'20',
          data: data1
        }, {
          name: '城镇从业人员数',
          type: 'bar',
          barMaxWidth:'20',
          data: rs_cs
        }]
      };
      var url = '';
      if (district_no == 1) {
        url = devUrl + 'leader/employment/selectbyCityTrend/1/'+starDate+'_'+endDate+'/'+district_no;
      } else {
        url = devUrl + 'leader/employment/selectbyCityTrend/1/'+starDate+'_'+endDate+'/'+district_no;
      }
      $http.get(url)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          result1 = response.data;
          //sessionStorage.setItem("cacheJyfxszfxDataList1", JSON.stringify(result1));
           maxBar=0;
          for(var i=0;i<result1.length;i++){
            categories.push(result1[i].DATE_PERIOD);
            data1.push(result1[i].JYRS);

            rs_cs.push(result1[i].CSJYRS);
            if(result1[i].JYRS>maxBar){
              maxBar=result1[i].JYRS;
            }
          }
         // vm.ecConfig11.yAxis.max=maxBar;
          vm.ecConfig11.dataLoaded=true;
        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });

    };

    //年末就业人数
    // vm.loadPieChart2 = function ($http, devUrl, district_no) {
    //   var url3 = '';
    //   if (district_no == 1) {
    //     url3 = devUrl + 'leader/employment/cityjob/1/'+endDate+'_'+endDate+'/0';
    //   } else {
    //     url3 = devUrl + 'leader/employment/cityjob/1/'+endDate+'_'+endDate+'/1';
    //   }
    //   $http.get(url3)
    //     .success(function (response) {
    //       if (angular.isUndefined(response)) {
    //         SweetAlert.swal("没有查到相关数据");
    //       }
    //       result2 = response.data;
    //       sessionStorage.setItem("cacheJyfxszfxDataList2", JSON.stringify(result2));
    //       for (var i = 0; i < result2.length; i++) {
    //         if (result2[i].DISTRICT_NAME == '湖南') {
    //           vm.empData = result2[i].JYRS;
    //         }
    //         if (result2[i].DISTRICT_NAME == vm.curAreaName) {
    //           vm.empData = result2[i].JYRS;
    //         }
    //       }
    //     }).error(function () {
    //     SweetAlert.swal("网络有问题，待会再试");
    //   });
    // };

    vm.initTimeClock = function () {
      var oimg = document.querySelectorAll('#tab_con aside');//获取aside元素
      var oli = document.querySelectorAll('#tabNav ul li');//获取li
      var tabNav = document.getElementById('tabNav');//获取盒子
      var length = oimg.length;
      var index = 0;
      for (var i = 0; i < length; i++) {  //循环获取aside元素
        oli[i].goudan = i;
        oli[i].onclick = function () {   //给li点击事件
          for (var j = 0; j < length; j++) { //循环获取aside个数
            oimg[j].className = '';  //所有的aside元素的className都不给样式
            oli[j].className = '';   //所有的li元素的className都不给样式
          }
          this.className = 'on';     //当前点击的元素className给on属性
          oimg[this.goudan].className = 'on';  //当前下标的aside元素给on元素
          index = this.goudan;
         // alert(index);
          for(var k=0;k<5;k++)
          {
            $("#pjgz-top5-ze-list div:eq(" + i + ")").text("");
            $("#pjgz-top5-growth-list div:eq(" + i + ")").text("");
            $("#czsr-top5-ze-list div:eq(" + i + ")").text("");
            $("#czsr-top5-growth-list div:eq(" + i + ")").text("");
            $("#czzc-top5-ze-list div:eq(" + i + ")").text("");
            $("#czzc-top5-growth-list div:eq(" + i + ")").text("");

          }
          if(index==0)
          {
            vm.empRs($http, devUrl,district_no);
            // vm.empAve($http, devUrl, district_no);
			 $("#czsr-top5-ze-list").show();
            $("#czsr-top5-growth-list").show();
            $("#czzc-top5-ze-list").hide();
            $("#czzc-top5-growth-list").hide();
			 $("#pjgz-top5-ze-list").hide();
            $("#pjgz-top5-growth-list").hide();

          }
          if(index==1)
          {
            vm.empWages($http, devUrl, district_no);
            // vm.empAve($http, devUrl, district_no);

			  $("#czsr-top5-ze-list").hide();
            $("#czsr-top5-growth-list").hide();
            $("#czzc-top5-ze-list").show();
            $("#czzc-top5-growth-list").show();
			 $("#pjgz-top5-ze-list").hide();
            $("#pjgz-top5-growth-list").hide();
          }
          if(index==2)
          {
            // vm.empWages($http, devUrl, district_no);
            vm.empAve($http, devUrl, district_no);
			$("#czzc-top5-ze-list").hide();
            $("#czzc-top5-growth-list").hide();
			 $("#pjgz-top5-growth-list").show();
            $("#pjgz-top5-ze-list").show();
			  $("#czsr-top5-ze-list").hide();
            $("#czsr-top5-growth-list").hide();
          }

        };

      }
    };

    //就业人数Top5
    vm.empRs = function ($http, devUrl, district_no) {
      city1=[];
      empRs1=[];
      empRs2=[];
      rs_zzl=[];
      result3=[];
      vm.barConfig1 = {
        theme: 'Donut',
        dataLoaded: false
      };
      vm.barOption1 = {
        color: ['#137ebd'],
        calculable: true,
        grid: {
          top: 20,
          left: '18%',
          height: 220, //设置grid高度
          width: '46.7%'
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
          data: city1,
          inverse:true,
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
            //barMaxWidth: 22,
            barGap: '-100%',
            data: empRs2
          }
         /* ,
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
                formatter: '{c}%',
                position: ['195', '0'],
                show: true,
                textStyle: {
                  color: 'red'
                }
              }
            },
            //barMaxWidth: 22,
            barGap: '-100%',
            data: rs_zzl
          }*/
          , {
            name: "",
            type: "bar",
           /* label: {
              normal: {
                formatter: '{c}万',
                position: ['133', '0'],
                show: true,
                textStyle: {
                  color: '#4e99ff'
                }
              }
            },*/
            //barMaxWidth: 22,
            barMaxHeight: '80%',
            barCategoryGap: '50%',
            z: 10,
            tooltip: {
              show: false
            },
            data: empRs1
          }
        ]
      };
      var url11 = '';
      if (district_no == 1) {
        url11 = devUrl + 'leader/employment/cityjob/1/'+endDate+'_'+endDate+'/1';
      } else {
        url11 = devUrl + 'leader/employment/cityjob/1/'+endDate+'_'+endDate+'/' + district_no;
      }

      $http.get(url11)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          result3 = response.data;
          //sessionStorage.setItem("cacheJyfxszfxDataList3", JSON.stringify(result3));
          maxData1 = 0;      //设置最大值
          for (var i = 0; i < result3.length; i++) {
            if (i == 5) {
              break;
            }
            city1.push(result3[i].DISTRICT_NAME);
            empRs1.push({name: result3[i].DISTRICT_NAME, value: result3[i].JYRS});
            rs_zzl.push(result3[i].JYL);//alert(result3[i].JYL);
            if (result3[i].JYRS > maxData1) {    //把当前获取到的就业人数与最大值进行比较判断
              maxData1 = result3[i].JYRS;
            }
			       $("#czsr-top5-ze-list div:eq(" + i + ")").text(result3[i].JYRS + " 万人");
            if(district_no==111)
            {
              $("#czsr-top5-ze-list div:eq(" + i + ")").css('top',i*61+'px');
              $("#czsr-top5-growth-list div:eq(" + i + ")").css('top',i*61+'px');
            }else{
              $("#czsr-top5-ze-list div:eq(" + i + ")").css('top',i*46+'px');
              $("#czsr-top5-growth-list div:eq(" + i + ")").css('top',i*46+'px');
            }
            if(result3[i].JYL < 0){
              $("#czsr-top5-growth-list div:eq(" + i + ")").text('↓'+result3[i].JYL + "%");
              $("#czsr-top5-growth-list div:eq(" + i + ")").css('color','green')
            } else {
              $("#czsr-top5-growth-list div:eq(" + i + ")").text('↑'+result3[i].JYL + "%");
            }
          }
          for (var i in empRs1) {
            empRs2.push(maxData1);
          }

        if(district_no==111)
        {
         var k=4;
          $("#czsr-top5-growth-list div:eq(" + k + ")").text(" ");
          $("#czsr-top5-ze-list div:eq(" + k + ")").text(" ");
        }


          vm.barConfig1.dataLoaded = true;
        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });

    };

    //总体工资Top5
    vm.empWages = function ($http, devUrl, district_no) {
      city2=[];
      empWages1=[];
      empWages2=[];
      wage_zzl=[];
      result4=[];
      vm.barConfig2 = {
        theme: 'Donut',
        dataLoaded: false
      };
      vm.barOption2 = {
        color: ['#ffb644'],
        calculable: true,
        grid: {
          top: 20,
          left: '18%',
          height: '70%', //设置grid高度
          width: '33%'
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
          data: city2,
          inverse:true,
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
            //barMaxWidth: 22,
            barGap: '-100%',
            data: empWages2
          }
         /* ,
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
                formatter: '{c}%',
                position: ['185', '0'],
                show: true,
                textStyle: {
                  color: 'red'
                }
              }
            },
            //barMaxWidth: 22,
            barGap: '-100%',
            data: wage_zzl
          }*/
          , {
            name: "",
            type: "bar",
          /* label: {
              normal: {
                formatter: '{c}亿',
                position: ['110', '0'],
                show: true,
                textStyle: {
                  color: '#4e99ff'
                }
              }
            },*/
            //barMaxWidth: 22,
            barMaxHeight: 220,
            barCategoryGap: '50%',
            z: 10,
            tooltip: {
              show: false
            },
            data: empWages1
          }
        ]
      };
      var url12 = '';
      if (district_no == 1) {
        url12 = devUrl + 'leader/employment/employmentgzanalysis/1/'+endDate+'_'+endDate+'/1?parentDistrictNo=1';
      } else {
        url12 = devUrl + 'leader/employment/employmentgzanalysis/1/'+endDate+'_'+endDate+'/1?parentDistrictNo=' + district_no;
      }

      $http.get(url12)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          result4 = response.data;
          //sessionStorage.setItem("cacheJyfxszfxDataList4", JSON.stringify(result4));
          maxData2 = 0;      //设置最大值
          for (var i = 0; i < result4.length; i++) {
            if (i == 5) {
              break;
            }
            city2.push(result4[i].DISTRICT_NAME);
            empWages1.push({name: result4[i].DISTRICT_NAME, value: result4[i].GZZE});
            wage_zzl.push(result4[i].GZZE_ZZL);
            if (result4[i].GZZE > maxData2) {    //把当前获取到的就业人数与最大值进行比较判断
              maxData2 = result4[i].GZZE;
            }
		 if (district_no == 1)
		 {
			 $("#czzc-top5-ze-list div:eq(" + i + ")").text(result4[i].GZZE + " 亿元");
		 }
		else{
	 $("#czzc-top5-ze-list div:eq(" + i + ")").text(result4[i].GZZE + " 万元");
			}

            if(district_no==111)
            {
              $("#czzc-top5-ze-list div:eq(" + i + ")").css('top',i*61+'px');
              $("#czzc-top5-growth-list div:eq(" + i + ")").css('top',i*61+'px');
            }else{
              $("#czzc-top5-ze-list div:eq(" + i + ")").css('top',i*46+'px');
              $("#czzc-top5-growth-list div:eq(" + i + ")").css('top',i*46+'px');
            }
         if(result4[i].GZZE_ZZL < 0){
          $("#czzc-top5-growth-list div:eq(" + i + ")").text('↓'+result4[i].GZZE_ZZL + "%");
          $("#czzc-top5-growth-list div:eq(" + i + ")").css('color','green')
        } else {
          $("#czzc-top5-growth-list div:eq(" + i + ")").text('↑'+result4[i].GZZE_ZZL + "%");
        }
          }
          for (var i in empWages1) {
            empWages2.push(maxData2);
          }
          if(district_no==111)
          {
            var k=4;
            $("#czzc-top5-growth-list div:eq(" + k + ")").text(" ");
            $("#czzc-top5-ze-list div:eq(" + k + ")").text(" ");
          }
          vm.barConfig2.dataLoaded = true;
        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });
    };

    //平均工资Top5
    vm.empAve = function ($http, devUrl, district_no) {
      city3=[];
      empAve1=[];
      empAve2=[];
      ave_zzl=[];
      result5=[];
      vm.barConfig3 = {
        theme: 'Donut',
        dataLoaded: false
      };
      vm.barOption3 = {
        color: ['#ffb644'],
        calculable: true,
        grid: {
          top: 20,
          left: '18%',
          height: 220, //设置grid高度
          width: '40%'
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
          data: city3,
          offset:5,
          inverse:true,
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
            //barMaxWidth: 22,
            barGap: '-100%',
            barMaxWidth: 19,
            data: empAve2
          }
          ,
         /* {
            type: "bar",
            silent: true,
            itemStyle: {
              normal: {
                color: '#f5f5f5'
              }
            },
            label: {
              normal: {
                formatter: '{c}%',
                position: ['200', '0'],
                show: true,
                textStyle: {
                  color: 'red'
                }
              }
            },
            //barMaxWidth: 22,
            barGap: '-100%',
            data: ave_zzl
          }
          , */
		  {
            name: "",
            type: "bar",
         /*   label: {
              normal: {
                formatter: '{c}元',
                position: ['132', '0'],
                show: true,
                textStyle: {
                  color: '#4e99ff'
                }
              }
            },*/
            //barMaxWidth: 22,
            barMaxHeight: 220,
            barCategoryGap: '50%',
            barMaxWidth: 19,
            z: 10,
            tooltip: {
              show: false
            },
            data: empAve1
          }
        ]
      };
      var url13 = '';
      if (district_no == 1) {
        url13 = devUrl + 'leader/employment/employmentgzanalysis/1/'+endDate+'_'+endDate+'/2?parentDistrictNo=1';
      } else {
        url13 = devUrl + 'leader/employment/employmentgzanalysis/1/'+endDate+'_'+endDate+'/2?parentDistrictNo=' + district_no;
      }
      $http.get(url13)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          result5 = response.data;
          //sessionStorage.setItem("cacheJyfxszfxDataList5", JSON.stringify(result5));
          maxData3 = 0;      //设置最大值


          for (var i = 0; i < result5.length; i++) {
            if (i == 5) {
              break;
            }
            city3.push(result5[i].DISTRICT_NAME);
            empAve1.push({name: result5[i].DISTRICT_NAME, value: result5[i].PJGZ});
            ave_zzl.push(result5[i].PJGZ_ZZL);
            if (result5[i].PJGZ > maxData3) {    //把当前获取到的就业人数与最大值进行比较判断
              maxData3 = result5[i].PJGZ;
            }

			     $("#pjgz-top5-ze-list div:eq(" + i + ")").text(result5[i].PJGZ + " 元");
            if(district_no==111)
            {
              $("#pjgz-top5-ze-list div:eq(" + i + ")").css('top',i*61+'px');
              $("#pjgz-top5-growth-list div:eq(" + i + ")").css('top',i*61+'px');
            }else{
              $("#pjgz-top5-ze-list div:eq(" + i + ")").css('top',i*46+'px');
              $("#pjgz-top5-growth-list div:eq(" + i + ")").css('top',i*46+'px');
            }

			if(result5[i].PJGZ_ZZL < 0){
			  $("#pjgz-top5-growth-list div:eq(" + i + ")").text('↓'+result5[i].PJGZ_ZZL + "%");
			  $("#pjgz-top5-growth-list div:eq(" + i + ")").css('color','green')
			} else {
			  $("#pjgz-top5-growth-list div:eq(" + i + ")").text('↑'+result5[i].PJGZ_ZZL + "%");
			}

          }
          for (var i in empAve1) {
            empAve2.push(maxData3);
          }
          if(district_no==111)
          {
            var k=4;
            $("#pjgz-top5-growth-list div:eq(" + k + ")").text(" ");
            $("#pjgz-top5-ze-list div:eq(" + k + ")").text(" ");
          }
          vm.barConfig3.dataLoaded = true;
        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });
    };

    //行业就业人数占比
    var pieLegendData1 = [];
    var pieData1 = [];
    vm.loadPieChart1 = function ($http, devUrl, district_no) {

      categories2= [];
      datagz= [];

      njrs_cs= [];
      result6=[];
      result6=[];
      //图1
      vm.ecConfig22 = {
        theme: 'Donut',
        dataLoaded: false
      };
      //图1
      vm.ecOption22 = {
        color:['#0c6bd9','#3ba9bd'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['在岗职工工资总额', '年平均工资'],
          y:'25',
          align: 'left',
          right: 200
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: categories2,
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
        }],
        yAxis: [{
          type: 'value',
          name: '单位:亿元',

          nameTextStyle: {
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
          {
            type: 'value',
            name: '单位:元',

            nameTextStyle: {
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
          }],
        series: [{
          name: '在岗职工工资总额',
          type: 'bar',
          barMaxWidth:'20',
          data: datagz
        }, {
          name: '年平均工资',
          type: 'bar',
          barMaxWidth:'20',
          "yAxisIndex": 1,
          data: njrs_cs
        }]
      };
      var url2 = '';
      if (district_no == 1) {
        url2 = devUrl + 'leader/employment/employmentanalysis/1/'+starDate+'_'+endDate+'/3?districtNo=' + district_no;
      } else {
        url2 = devUrl + 'leader/employment/employmentanalysis/1/'+starDate+'_'+endDate+'/3?districtNo=' + district_no;
      }

      $http.get(url2)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          result6 = response.data;
          //sessionStorage.setItem("cacheJyfxszfxDataList6", JSON.stringify(result6));
          for (var i = 0; i < response.data.length; i++) {
            categories2.push(result6[i].DATE_PERIOD);
            datagz.push(result6[i].GZZE);

            njrs_cs.push(result6[i].PJGZ);
          }
          vm.ecConfig22.dataLoaded = true;
        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });
    };

    //缓存
    // if (sessionStorage.getItem("cacheJyfxszfxDataList1") == null) {
    //   vm.loadPieChart($http, devUrl, district_no);
    // }
    // else {
    //   result1.length = 0;
    //   result1 = JSON.parse(sessionStorage.getItem("cacheJyfxszfxDataList1"));
    //   for (var i = 0; i < result1.length; i++) {
    //     pieLegendData.push(result1[i].CYFL_NAME);
    //     pieData.push({name: result1[i].CYFL_NAME, value: result1[i].JYRS});
    //     vm.pieConfig.dataLoaded = true;
    //   }
    // }
    // if (sessionStorage.getItem("cacheJyfxszfxDataList2") == null) {
    //   vm.loadPieChart2($http, devUrl, district_no);
    // }
    // else {
    //   result2.length = 0;
    //   result2 = JSON.parse(sessionStorage.getItem("cacheJyfxszfxDataList2"));
    //   for (var i = 0; i < result2.length; i++) {
    //     if (result2[i].DISTRICT_NAME == '湖南') {
    //       vm.empData = result2[i].JYRS;
    //     }
    //     if (result2[i].DISTRICT_NAME == vm.curAreaName) {
    //       vm.empData = result2[i].JYRS;
    //     }
    //   }
    // }
    //
    // if (sessionStorage.getItem("cacheJyfxszfxDataList3") == null) {
    //   vm.empRs($http, devUrl, district_no);
    // }
    // else {
    //   result3.length = 0;
    //   result3 = JSON.parse(sessionStorage.getItem("cacheJyfxszfxDataList3"));
    //   maxData1 = 0;      //设置最大值
    //   for (var i = 0; i < result3.length; i++) {
    //     if (i == 5) {
    //       break;
    //     }
    //     city1.push(result3[i].DISTRICT_NAME);
    //     empRs1.push({name: result3[i].DISTRICT_NAME, value: result3[i].JYRS});
    //     rs_zzl.push(result3[i].JYL);
    //     if (result3[i].JYRS > maxData1) {    //把当前获取到的就业人数与最大值进行比较判断
    //       maxData1 = result3[i].JYRS;
    //     }
    //
    //   }
    //   for (var i in empRs1) {
    //     empRs2.push(maxData1);
    //   }
    //   vm.barConfig1.dataLoaded = true;
    // }
    // if (sessionStorage.getItem("cacheJyfxszfxDataList4") == null) {
    //   vm.empWages($http, devUrl, district_no);
    // }
    // else {
    //   result4.length = 0;
    //   result4 = JSON.parse(sessionStorage.getItem("cacheJyfxszfxDataList4"));
    //   maxData2 = 0;      //设置最大值
    //   for (var i = 0; i < result4.length; i++) {
    //     if (i == 5) {
    //       break;
    //     }
    //     city2.push(result4[i].DISTRICT_NAME);
    //     empWages1.push({name: result4[i].DISTRICT_NAME, value: result4[i].GZZE});
    //     wage_zzl.push(result4[i].GZZE_ZZL);
    //     if (result4[i].GZZE > maxData2) {    //把当前获取到的就业人数与最大值进行比较判断
    //       maxData2 = result4[i].GZZE;
    //     }
    //
    //   }
    //   for (var i in empWages1) {
    //     empWages2.push(maxData2);
    //   }
    //
    //   vm.barConfig2.dataLoaded = true;
    // }
    // if (sessionStorage.getItem("cacheJyfxszfxDataList5") == null) {
    //   vm.empAve($http, devUrl, district_no);
    // }
    // else {
    //   result5.length = 0;
    //   result5 = JSON.parse(sessionStorage.getItem("cacheJyfxszfxDataList5"));
    //   maxData3 = 0;      //设置最大值
    //   for (var i = 0; i < result5.length; i++) {
    //     if (i == 5) {
    //       break;
    //     }
    //     city3.push(result5[i].DISTRICT_NAME);
    //     empAve1.push({name: result5[i].DISTRICT_NAME, value: result5[i].PJGZ});
    //     ave_zzl.push(result5[i].PJGZ_ZZL);
    //     if (result5[i].PJGZ > maxData3) {    //把当前获取到的就业人数与最大值进行比较判断
    //       maxData2 = result5[i].PJGZ;
    //     }
    //
    //   }
    //   for (var i in empAve1) {
    //     empAve2.push(maxData3);
    //   }
    //   vm.barConfig3.dataLoaded = true;
    // }
    // if (sessionStorage.getItem("cacheJyfxszfxDataList6") == null) {
    //   vm.loadPieChart1($http, devUrl, district_no);
    // }
    // else {
    //   result6.length = 0;
    //   result6 = JSON.parse(sessionStorage.getItem("cacheJyfxszfxDataList6"));
    //   for (var i = 0; i < result6.length; i++) {
    //     pieLegendData1.push(result6[i].INDUSTRY_CATEGORY_NAME);
    //     pieData1.push({name: result6[i].INDUSTRY_CATEGORY_NAME, value: result6[i].JYRS});
    //   }
    //   vm.pieConfig1.dataLoaded = true;
    // }

    //函数调用
   // vm.loadPieChart($http, devUrl,1);
	vm.loadPieChartQS($http, devUrl, 1);
    vm.loadPieChart1($http, devUrl,1);
    // vm.loadPieChart2($http, devUrl,1);

    vm.empRs($http, devUrl,1);
    //vm.empWages($http, devUrl,1);
   // vm.empAve($http, devUrl,1);
    vm.initTimeClock();

    var onMapSelectChanged = function (params) {
      //console.log('onMapSelectChanged:');
      params=params.batch[0];
      if (params.selected[params.name]) {
        vm.curAreaName = params.name;
        district_no = areaMap[vm.curAreaName];
      } else {
        vm.curAreaName = "湖南省";
		district_no=1;
      }
      console.log(vm.curAreaName+","+params);
	  if(district_no==1)
	  {
		  vm.loadPieChartQS($http, devUrl, district_no);
	  }else{
		   vm.loadPieChart($http, devUrl, district_no);
	  }

      vm.loadPieChart1($http, devUrl, district_no);
      // vm.loadPieChart2($http, devUrl, district_no);

      vm.empRs($http, devUrl, district_no);
      vm.empWages($http, devUrl, district_no);
      vm.empAve($http, devUrl, district_no);
    };

    //缓存
    // if(sessionStorage.getItem("cacheJyfxszfxDataList") == null)
    // {
    //   vm.mapDataList();
    // }
    // else{
    //   result.length = 0;
    //   result =  JSON.parse(sessionStorage.getItem("cacheJyfxszfxDataList"));
    //   for(var i=0;i<result.length;i++){
    //     mapData.push({seriesId:result[i].DISTRICT_NO,name:result[i].DISTRICT_NAME,value:result[i].JYRS});
    //     areaMap[result[i].DISTRICT_NAME]=result[i].DISTRICT_NO;
    //   }
    //   vm.mapConfig.dataLoaded=true;
    //   vm.mapConfig.event = [{mapselectchanged:onMapSelectChanged}];
    //   //console.log(33333)
    // }

  }
})();
