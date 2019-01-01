/**
 * 领导桌面-就业情况-总体分析
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('LdzmTopicIndJyfxztfxController', LdzmTopicIndJyfxztfxController);

  /** @ngInject */
  function LdzmTopicIndJyfxztfxController($http, devUrl,$scope,SweetAlert,latestYear) {
    var vm = this;

    var categories = new Array();
    var data1=new Array();
    var data2=new Array();
    var data3=new Array();
    var rs_new=new Array();
    var rs_cs=new Array();
    var rs_nc=new Array();
    vm.list=[];
    vm.list1=[];
    vm.categories = [];
    var year_num=5;
    var myDate = new Date();
    var year = latestYear-1;
    var endDate=latestYear-1;
    var beginDate=endDate-year_num+1;vm.cyear=endDate;
    //beginDate="2011";endDate="2015";
    vm.jyfxztfx1=function () {
      var url=devUrl + 'leader/employment/cityjob/1/'+beginDate+'_'+endDate+'/0';
      $http.get(url)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          vm.list=response.data;
          sessionStorage.setItem('cacheJyfxztfxDataList', JSON.stringify(vm.list));
          vm.ecConfig.dataLoaded=true;
          for(var i=0;i<vm.list.length;i++){
            categories.push(vm.list[i].DATE_PERIOD);
            data1.push(vm.list[i].JYRS);
            rs_new.push(vm.list[i].XZJYZS);
            rs_cs.push(vm.list[i].CSJYRS);
            rs_nc.push(vm.list[i].NCJYRS);//alert(vm.list[i].NCJYRS);
          }
        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });
    };
    vm.jyfxztfx1();

    //图1
    vm.ecConfig = {
      theme: 'Donut',
      dataLoaded: false
    };
    //图1
    vm.ecOption = {
      color:['#574fbe','#0c6bd9','#137ebd'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: ['从业人员总数', '城镇从业人员数','农村从业人员数'],
        y:'25',
        align: 'left',
        right: 30
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
        min: 0,
        max: 4500,
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
        name: '从业人员总数',
        type: 'bar',
        barMaxWidth:'20',
        data: data1
      }, {
        name: '城镇从业人员数',
        type: 'bar',
        barMaxWidth:'20',
        data: rs_cs
      }, {
        name: '农村从业人员数',
        type: 'bar',
        barMaxWidth:'20',
        data: rs_nc
      }]
    };

    vm.jyfxztfx5 = function () {
      var url4=devUrl+'leader/employment/cityjob/1/'+endDate+'_'+endDate+'/0';
      $http.get(url4)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          vm.list1 =response.data;
          sessionStorage.setItem('cacheJyfxztfxDataList4', JSON.stringify(vm.list1));
          for(var i=0;i<vm.list1.length;i++){


            vm.jyData=[{JYRS:vm.list1[i].JYRS,XZRS:vm.list1[i].XZJYZS.toFixed(0),SYL:vm.list1[i].SYL}];
            //console.log(vm.jyData)
          }

        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });
    };
    vm.jyfxztfx5();

    //图2
    var industrylist=new Array();
    var industrydata=new Array();
    var result1 = new Array();
    // var barData=[];
    var bgData1=[];
    vm.ecConfig1 = {
      theme: 'Donut',
      dataLoaded: false
    };
    vm.ecOption1 = {
      // color: ['#564fbe'],
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: "{a}<br/>{b} : {c0}万"
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
          data : industrylist,
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
          type: 'value',
          name: '单位:(万人)',
          min: 0,
          max: 1800,
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
        }
      ],
      series : [
        {
          name:endDate,
          type:'bar',
          barMaxWidth: '20',
          itemStyle: {
            normal: {
              color: '#574FBE'
            }
          },
          tooltip:{
            formatter: "{b}(万人)",
            show:true
          },
          z: 10,
          data:industrydata
        }
      ]
    };
    vm.ecConfig1.dataLoaded=true;

    vm.jyfxztfx2 = function () {
      var url1=devUrl+'leader/employment/industryjob/1/0/'+endDate+'_'+endDate;
      $http.get(url1)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          result1=response.data;
          sessionStorage.setItem('cacheJyfxztfxDataList1', JSON.stringify(result1));
          for(var i=0;i<result1.length;i++){
            if(result1[i].INDUSTRY_CATEGORY_NAME.length > 5){
                industrylist.push(result1[i].INDUSTRY_CATEGORY_NAME.substring(0,5)+"\n"+result1[i].INDUSTRY_CATEGORY_NAME.substring(5));
            }else{
                industrylist.push(result1[i].INDUSTRY_CATEGORY_NAME);
            }
            industrydata.push(result1[i].JYRS);
          }
          var maxData=Math.max.apply(null, industrydata);
          for(var i in industrydata){
            bgData1.push(maxData);
          }
          //console.log(industrydata);
        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });
    };
    vm.jyfxztfx2();

    //图3
    var result2=new Array();
    var citylist=new Array();
    var barData1=[];
    var barData2=[];
    var maxData=0;      //设置最大值

    vm.jyfxztfx3 = function () {
      var url2=devUrl+'leader/employment/cityjob/1/'+endDate+'_'+endDate+'/1';
      $http.get(url2)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          result2 = response.data;
          sessionStorage.setItem('cacheJyfxztfxDataList2', JSON.stringify(result2));
          for(var i=0;i<result2.length;i++){
            if(i==5){
              break;
            }
            citylist.push(result2[i].DISTRICT_NAME);
            barData2.push({name:result2[i].DISTRICT_NAME,value:result2[i].JYRS});
            if(result2[i].JYRS>maxData){    //把当前获取到的就业人数与最大值进行比较判断
              maxData=result2[i].JYRS;
            }

			$("#czsr-top5-ze-list div:eq(" + i + ")").text(result2[i].JYRS + " 万");


          }
          for(var i in barData2){
            barData1.push(maxData);
          }

        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });
    };
    vm.jyfxztfx3();

    vm.ecConfig2 = {
      theme: 'Donut',
      dataLoaded: false
    };
    vm.ecOption2 = {
      tooltip: {
        show:true,
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '0%',
        right: '0%',
        bottom: '3%',
        containLabel: true,
        height: 260, //设置grid高度
        width:'265px',
        y:10,
        y2:20,
      },
      xAxis: {
        type: 'value',
        name:'',
        // nameLocation:'end',
        // boundaryGap: [0, 0],
        show: false,
        axisLabel:{
          interval:0,//横轴信息全部显示
          textStyle: { color: '#7F7F7F' }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'category',
        data: citylist,
        inverse:true,
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
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
          data: barData1 //底层灰色柱子
        },
        {
        name: endDate+'年',
        type: "bar",
        /*label: {
          normal: {
            position: ['210', '5'],
            formatter: '{c}万',
            show: true
          }
        },*/
        itemStyle: {
          normal: {
            color: '#137ebd'
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
    vm.ecConfig2.dataLoaded=true;

    var result3=new Array();
    var cylist=new Array();
    vm.jyfxztfx4 = function () {
      var url3=devUrl+'leader/employment/employmentanalysis/1/'+endDate+'_'+endDate+'/4?parentDistrictNo=0';
      $http.get(url3)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          result3=response.data;
          sessionStorage.setItem("cacheJyfxztfxDataList3", JSON.stringify(result3));
          for(var i=0;i<result3.length;i++){
            cylist.push(result3[result3.length-i-1].CYFL_NAME+"就业人数");
            data2.push(result3[result3.length-i-1].JYRS);
            //console.log(citylist);
          }
        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });
    };
    vm.jyfxztfx4();

    vm.ecConfig3 = {
      theme: 'Donut',
      dataLoaded: false
    };
    vm.ecOption3 = {
      tooltip: {
        show:false,
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: "{a} <br/>{b} : {c}万"
      },
      grid: {
        left: '0%',
        right: '4%',
        top: '5%',
        containLabel: true,
        height: 170 ,//设置grid高度
        width:220
      },
      xAxis: {
        type: 'value',
        name:'',
        nameLocation:'end',
        axisLabel: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'category',
        data: cylist,
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      series: [{
        name: endDate+'年',
        type: 'bar',
        barWidth:'30',
        itemStyle: {
          normal: {
            color: function(params) {
              // build a color map as your need.
              var colorList = [
                '#574FBE','#CB65BB','#52bfa0'
              ];
              return colorList[params.dataIndex]
            }
          }
        },
        label: {
          normal: {
            show: true,
            formatter: '{c}万',
            position: 'right'
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        data: data2
      }]
    };
    vm.ecConfig3.dataLoaded=true;

    //缓存
    // if(sessionStorage.getItem("cacheJyfxztfxDataList") == null)
    // {
    //   vm.jyfxztfx1();
    // }
    // else{
    //   vm.list.length = 0;
    //   vm.list = JSON.parse(sessionStorage.getItem("cacheJyfxztfxDataList"));
    //   vm.ecConfig.dataLoaded=true;
    //   for(var i=0;i<vm.list.length;i++){
    //     categories.push(vm.list[i].DATE_PERIOD);
    //     data1.push(vm.list[i].JYRS);
    //     rs_new.push(vm.list[i].XZJYZS);
    //   }
    // }
    //
    // if(sessionStorage.getItem("cacheJyfxztfxDataList1") == null)
    // {
    //   vm.jyfxztfx2();
    // }
    // else{
    //   result1.length = 0;
    //   result1 = JSON.parse(sessionStorage.getItem("cacheJyfxztfxDataList1"));
    //   for(var i=0;i<result1.length;i++){
    //     industrylist.push(result1[i].INDUSTRY_CATEGORY_NAME);
    //     industrydata.push(result1[i].JYRS);
    //   }
    //   var maxData=Math.max.apply(null, industrydata);
    //   for(var i in industrydata){
    //     bgData1.push(maxData);
    //   }
    // }
    //
    // if(sessionStorage.getItem("cacheJyfxztfxDataList2") == null)
    // {
    //   vm.jyfxztfx3();
    // }
    // else{
    //   result2.length = 0;
    //   result2 = JSON.parse(sessionStorage.getItem("cacheJyfxztfxDataList2"));
    //   for(var i=0;i<result2.length;i++){
    //     if(i==5){
    //       break;
    //     }
    //     citylist.push(result2[i].DISTRICT_NAME);
    //     barData2.push({name:result2[i].DISTRICT_NAME,value:result2[i].JYRS});
    //     if(result2[i].JYRS>maxData){    //把当前获取到的就业人数与最大值进行比较判断
    //       maxData=result2[i].JYRS;
    //     }
    //
    //   }
    //   for(var i in barData2){
    //     barData1.push(maxData);
    //   }
    // }
    //
    // if(sessionStorage.getItem("cacheJyfxztfxDataList3") == null)
    // {
    //   vm.jyfxztfx4();
    // }
    // else{
    //   result3.length = 0;
    //   result3 = JSON.parse(sessionStorage.getItem("cacheJyfxztfxDataList3"));
    //   for(var i=0;i<result3.length;i++){
    //     cylist.push(result3[i].CYFL_NAME);
    //     data2.push(result3[i].JYRS);
    //   }
    // }
    //
    // if(sessionStorage.getItem("cacheJyfxztfxDataList4") == null)
    // {
    //   vm.jyfxztfx5();
    // }
    // else{
    //   vm.list1.length = 0;
    //   vm.list1 = JSON.parse(sessionStorage.getItem("cacheJyfxztfxDataList4"));
    //   for(var i=0;i<vm.list1.length;i++){
    //     vm.jyData=[{JYRS:vm.list1[i].JYRS,XZRS:vm.list1[i].XZJYZS,SYL:vm.list1[i].SYL}];
    //     //console.log(vm.jyData)
    //   }
    // }

  }
})();


