/**
 * 领导桌面-医疗卫生
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('LdzmTopicIndSzyljbqkController', LdzmTopicIndSzyljbqkController);

  /** @ngInject */
  function LdzmTopicIndSzyljbqkController($http, devUrl,$scope,SweetAlert,latestYear) {
    var vm = this;
    var time = new Date();
    //var yearNew = time.getFullYear();
    var yearNew = latestYear - 1 +'';
    var yearList = new Array();
    var yearList0 = new Array();
    var hospital = new Array();//医院
    var bedList = new Array();//床位
    var people = new Array();//人数
    var barTabData2 = new Array();
    var city = new Array();
    var city1 = new Array(); //医院选择前五城市or区县
    var city2 = new Array(); //床位选择前五城市or区县
    var city3 = new Array(); //人数选择前五城市or区县
    var hospital0 = new Array();//医院
    var hospital1 = new Array();//医院
    var hospital2 = new Array();//医院排序
    var hospital3 = new Array();//医院选择前五
    var bedList0 = new Array();//床位
    var bedList1 = new Array();//床位
    var bedList2 = new Array();//床位排序
    var bedList3 = new Array();//床位选择前五
    var people0 = new Array();//人数
    var people1 = new Array();//人数
    var people2 = new Array();//人数排序
    var people3 = new Array();//人数选择前五
    var topData = new Array();
    var maxData = new Array();
    var district_no = 0; //地域区号
    vm.dataList0 = new Array();
    vm.dataList1 = new Array();
    vm.dataList2 = new Array();
    vm.dataList3 = new Array();
    topData = hospital3;
    vm.hunanData = new Array();
    vm.tabColorNum = 1;
    vm.showCurYear = latestYear - 1 + '年';
    vm.dataComeFrom = "湖南省统计局";
    /*地图*/
    vm.curAreaName="湖南省";
    var mapData=[];
    var areaMap={};//地区地图
    vm.mapConfig = {
      theme: 'Donut',
      dataLoaded: false
    };
    vm.mapOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}<br/>{c} 家',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      visualMap: {
        min: 500,
        max: 5000,
        orient:'horizontal',
        left: 'center',
        top: 'bottom',
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
  vm.mapDataList = function(){
    //var url=devUrl + '/leader/medical/qryylwsjbqklist/1/'+(yearNew-1)+'_'+yearNew+'/3';----------没搞懂查2年的数据做什么
    var url=devUrl + '/leader/medical/qryylwsjbqklist/1/'+yearNew+'_'+yearNew+'/3';
    $http.get(url)
      .success(function (response) {
        if (angular.isUndefined(response)) {
          SweetAlert.swal("没有查到相关数据");
        }
        vm.dataList0 = response.data;
        sessionStorage.setItem("cacheYlwsszyljbqkDataList", JSON.stringify(vm.dataList0));
        for(var i=0;i<vm.dataList0.length;i++){
          mapData.push({seriesId:vm.dataList0[i].DISTRICT_NO,name:vm.dataList0[i].DISTRICT_NAME,value:vm.dataList0[i].INSTITUTIONS_NUM});
          areaMap[vm.dataList0[i].DISTRICT_NAME]=vm.dataList0[i].DISTRICT_NO;
        }
        vm.mapConfig.dataLoaded=true;
        vm.mapConfig.event = [{mapselectchanged:onMapSelectChanged}];
      }).error(function () {
      SweetAlert.swal("网络有问题，待会再试");
    });
  }
    //查询全省的各个图表数据
    //地图 end  Top5切换
    vm.tabTopNum = '卫生机构数';
    vm.tabTopClick = function(tabNum){
      vm.tabTopNum = tabNum;
      vm.loadBarChart($http, devUrl,district_no);
    }
  vm.loadBarChart=function($http, devUrl,district_no){ //第一个矩形图
    vm.ecConfig = {
        theme: 'Donut',
        dataLoaded: false
      };
      vm.ecOption = {
        color: ['#137ebd'],
        legend: {
          y:'5',
          data:['卫生机构数']
        },
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
          containLabel: true
        },
        xAxis : [
          {
            type : 'category',
            data : yearList0,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis : [
          {
            name:'单位:家',
            type : 'value'
          }
        ],
        series : [
          {
            name:'卫生机构数',
            type:'line',
            stack: '总量',
            smooth: true, //平滑的，弧形
            symbolSize: 8,//拐点大小
            itemStyle:{
              normal : {
                lineStyle:{
                  width:3,//折线宽度
                  color:'#30c6c7'
                }
              }
            },
            data:hospital0
          }
        ]
      };/*{
               color: ['#0c6bd9'],
               grid: {
                  left: 70,
                  right:50,
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
                        data: city1,
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
                        //barWidth: 22,
                        barGap: '-100%',
                        data: maxData //底层灰色柱子
                      },
                      {
                          type:'bar',
                          label: {
                            normal: {
                              formatter: '{c}万个',
                              position: ['220','12'],
                              show: true
                            }
                          },
                          z: 10,
                          barMaxHeight:220,
                          barCategoryGap:'50%',
                          data:topData
                      }
                ]
       }*/
       var url1 ='';
       if(district_no == 0){
         //url1 = devUrl +'/leader/medical/qryylwsjbqklist/1/'+(yearNew - 1)+'_'+yearNew+'/3';
         url1 = devUrl +'/leader/medical/qryylwsjbqklist/1/'+yearNew+'_'+yearNew+'/3';
       } else {
         //url1 = devUrl +'/leader/medical/qryylwsjbqklist/1/'+(yearNew - 1)+'_'+yearNew+'/4?districtNo='+district_no;
         url1 = devUrl +'/leader/medical/qryylwsjbqklist/1/'+yearNew+'_'+yearNew+'/4?districtNo='+district_no;
       }
     $http.get(url1)
      .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          vm.dataList1 = response.data;
          sessionStorage.setItem("dataListYlws1", JSON.stringify(vm.dataList1));
          hospital1 = [];
          hospital2 = [];
          hospital3 = [];
          bedList1 = [];
          bedList2 = [];
          bedList3 = [];
          people1 = [];
          people2 = [];
          people3 = [];
          maxData = [];
          city = [];
          city1 = [];
          city2 = [];
          city3 = [];
          for(var i = 0; i < vm.dataList1.length; i++) {
                 hospital1.push(vm.dataList1[i].INSTITUTIONS_NUM);
                 hospital2.push(vm.dataList1[i].INSTITUTIONS_NUM);
                 bedList1.push(vm.dataList1[i].BED_NUM);
                 bedList2.push(vm.dataList1[i].BED_NUM);
                 people1.push(vm.dataList1[i].PERSONEL_NUM);
                 people2.push(vm.dataList1[i].PERSONEL_NUM);
              }
            if(vm.tabTopNum == '床位数'){
                 //床位数排序
                 bedList1.sort(function(a,b){
                      return a-b});
                  for(var i=0;i<vm.dataList1.length;i++){
                     for(var j=0;j<vm.dataList1.length;j++){
                      if(bedList2[j] == bedList1[i]){
                         city.push(vm.dataList1[j].DISTRICT_NAME);
                      }
                    }
                  }
                  city2 = city.filter(function (element, index, self) {
                      return self.indexOf(element) === index;
                  })
                  //选择前五个
                  for(var i = 0;i<vm.dataList1.length;i++){
                      if(i==5){
                        break;
                      }
                     bedList3.push(bedList1[i]);
                     maxData.push(bedList1[vm.dataList1.length-1]);
                  }

                 //vm.ecOption.yAxis[0].data = city2;
                 //vm.ecOption.series[0].data = maxData;
                 //vm.ecOption.series[1].data = bedList3;

             } else if(vm.tabTopNum == '人员数'){
                   //人员数排序
                   people1.sort(function(a,b){
                        return a-b});
                   for(var i=0;i<vm.dataList1.length;i++){
                       for(var j=0;j<vm.dataList1.length;j++){
                        if(people2[j] == people1[i]){
                           city.push(vm.dataList1[j].DISTRICT_NAME);
                        }
                      }
                    }
                    city3 = city.filter(function (element, index, self) {
                      return self.indexOf(element) === index;
                   })
                    //选择前五个
                    for(var i = 0;i<vm.dataList1.length;i++){
                        if(i==5){
                          break;
                        }
                       people3.push(people1[i]);
                       maxData.push(people1[vm.dataList1.length-1]);
                    }
                 //vm.ecOption.yAxis[0].data = city3;
                 //vm.ecOption.series[0].data = maxData;
                 //vm.ecOption.series[1].data = people3;
             }else{
                 //卫生机构数排序
                 hospital1.sort(function(a,b){
                      return a-b});
                  for(var i=0;i<vm.dataList1.length;i++){
                     for(var j=0;j<vm.dataList1.length;j++){
                      if(hospital2[j] == hospital1[i]){
                         city.push(vm.dataList1[j].DISTRICT_NAME);
                      }
                    }
                  }
                  city1 = city.filter(function (element, index, self) {
                      return self.indexOf(element) === index;
                  })
                  //选择前五个
                  for(var i = 0;i<vm.dataList1.length;i++){
                    if(i==5){
                      break;
                    }
                    hospital3.push(hospital1[i]);
                    maxData.push(hospital1[vm.dataList1.length-1]);
                  }
                 //vm.ecOption.yAxis[0].data = city1;
                 //vm.ecOption.series[0].data = maxData;
                 //vm.ecOption.series[1].data = hospital3;
             }
             vm.ecConfig.dataLoaded = true;
      }).error(function () {
      SweetAlert.swal("网络有问题，待会再试");
    });
 }
      // Top5（第一个矩形图） end  近五年卫生机构数
    vm.tabColorClick = function(colorNum){
        vm.tabColorNum = colorNum;
        vm.loadBarChart2($http, devUrl,district_no);
    }
 vm.loadBarChart2=function($http, devUrl,district_no){
      vm.ecConfig2 = {
        theme: 'Donut',
        dataLoaded: false
      };
      vm.ecOption2 ={
        color: ['#137ebd','green'],
        legend: {
          y:'5',
          data:['床位数','人员数']
        },
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
          containLabel: true
        },
        xAxis : [
          {
            type : 'category',
            data : yearList0,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis : [
          {
            name:'单位:床',
            type : 'value',
            min: 0,
            max: 500000,
            axisLine: {
              show: true,  //隐藏X轴
              lineStyle:{
                color:"#8996a3"   //X轴颜色不起效果
              }
            },
            splitLine: {
              show: true
            },
          },
          {
            name:'单位:人',
            type : 'value',
            min: 0,
            max: 1000000,
            axisLine: {
              show: true,  //隐藏X轴
              lineStyle:{
                color:"#8996a3"   //X轴颜色不起效果
              }
            },
            splitLine: {
              show: false
            },
          }
        ],
        series : [
          {
            name:'床位数',
            type:'line',
            smooth: true, //平滑的，弧形
            symbolSize: 8,//拐点大小
            itemStyle:{
              normal : {
                lineStyle:{
                  width:3,//折线宽度
                  color:'#137ebd'
                }
              }
            },
            data:bedList0
          },
          {
            name:'人员数',
            type:'line',
            yAxisIndex: 1,
            smooth: true, //平滑的，弧形
            symbolSize: 8,//拐点大小
            itemStyle:{
              normal : {
                lineStyle:{
                  width:3,//折线宽度
                  color:'green'
                }
              }
            },
            data:people0
          }
        ]
      };
   /*{
                    legend: {
                      y:'5',
                      data:['总量','增长率']
                    },
                    color: ['#137ebd','#0075FF'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
                        }
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
                    yAxis: [{
                      name:'数量:亿元',
                      type: 'value',
                      min: 1000,
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
                      axisLabel: {
                        formatter: '{value}'
                      }
                    }
                    ],
                    series : [
                        {
                            name:'卫生机构数',
                            type:'line',
                            stack: '总量',
                            smooth: true, //平滑的，弧形
                            symbolSize: 8,//拐点大小
                            itemStyle:{
                              normal : {
                                    lineStyle:{
                                        width:3,//折线宽度
                                        color:'#30c6c7'
                                    }
                                }
                            },
                            data:barTabData2
                        },
                        {
                        name:'卫生机构数',
                        type:'line',
                        yAxisIndex: 1,
                        stack: '总量',
                        smooth: true, //平滑的，弧形
                        symbolSize: 8,//拐点大小
                        itemStyle:{
                          normal : {
                            lineStyle:{
                              width:3,//折线宽度
                              color:'#30c6c7'
                            }
                          }
                        },
                        data:barTabData2
                       }
                    ]
               }*/
           var url2 ='';
           if(district_no == 0){
             url2=devUrl + '/leader/medical/qryylwsjbqklist/1/'+(yearNew-5)+'_'+yearNew+'/2';
           } else {
             url2=devUrl + '/leader/medical/qryylwsjbqklist/1/'+(yearNew-5)+'_'+yearNew+'/3';
           }
            $http.get(url2)
              .success(function (response) {
                    if (angular.isUndefined(response)) {
                      SweetAlert.swal("没有查到相关数据");
                    }
                    vm.dataList2=response.data;
                     sessionStorage.setItem("dataListYlws2", JSON.stringify(vm.dataList2));
                     if(barTabData2.length > 0 ){
                         barTabData2 = [];
                         yearList = [];
                     }
                    yearList0.length = 0;
                    hospital0.length = 0;
                    bedList0.length = 0;
                    people0.length = 0;
                    if(district_no == 0){
                          for (var i = 0; i < vm.dataList2.length; i++) {
                             yearList.push(vm.dataList2[i].DATE_PERIOD);
                             hospital.push(vm.dataList2[i].INSTITUTIONS_NUM);
                             bedList.push(vm.dataList2[i].BED_NUM);
                             people.push(vm.dataList2[i].PERSONEL_NUM);
                          }
                         for(var i = yearNew-4; i <= yearNew; i++){
                          for (var j = 0; j < vm.dataList2.length; j++) {
                              if(i == vm.dataList2[j].DATE_PERIOD){
                                yearList0.push(vm.dataList2[j].DATE_PERIOD);
                                hospital0.push(vm.dataList2[j].INSTITUTIONS_NUM);
                                bedList0.push(vm.dataList2[j].BED_NUM);
                                people0.push(vm.dataList2[j].PERSONEL_NUM);
                              }
                          }
                        }


                     } else {
                        for (var i = 0; i < vm.dataList2.length; i++) {
                           if(vm.dataList2[i].DISTRICT_NO == district_no){
                                yearList.push(vm.dataList2[i].DATE_PERIOD);
                                hospital.push(vm.dataList2[i].INSTITUTIONS_NUM);
                                bedList.push(vm.dataList2[i].BED_NUM);
                                people.push(vm.dataList2[i].PERSONEL_NUM);
                           }
                        }

                      for(var i = yearNew-4; i <= yearNew; i++){
                        for (var j = 0; j < vm.dataList2.length; j++) {
                          if(i == vm.dataList2[j].DATE_PERIOD && vm.dataList2[j].DISTRICT_NO == district_no){
                            yearList0.push(vm.dataList2[j].DATE_PERIOD);
                            hospital0.push(vm.dataList2[j].INSTITUTIONS_NUM);
                            bedList0.push(vm.dataList2[j].BED_NUM);
                            people0.push(vm.dataList2[j].PERSONEL_NUM);
                          }
                        }
                      }

                     }
                      if(vm.tabColorNum == 2){
                        for(var i = 0; i < vm.dataList2.length; i++){
                          barTabData2.push(bedList[i]);
                        }
                      } else if(vm.tabColorNum ==3){
                        for(var i = 0; i < vm.dataList2.length; i++){
                          barTabData2.push(people[i]);
                        }
                      } else {
                        for(var i = 0; i < vm.dataList2.length; i++){
                          barTabData2.push(hospital[i]);
                        }
                      }
                      hospital = [];
                      bedList = [];
                      people = [];
                      //vm.ecOption2.series[0].data = barTabData2;
                      //vm.ecOption2.xAxis[0].data = yearList;
                      vm.ecConfig.dataLoaded = true;
                      vm.ecConfig2.dataLoaded = true;
                  }).error(function () {
                  SweetAlert.swal("网络有问题，待会再试");
                });
          }
          vm.loadColorChart=function($http, devUrl,district_no){
            //色块部分
            var url3 ='';
            if(district_no == 0){
              //url3=devUrl + '/leader/medical/qryylwsjbqklist/1/'+(yearNew-1)+'_'+yearNew+'/2';
              url3=devUrl + '/leader/medical/qryylwsjbqklist/1/'+yearNew+'_'+yearNew+'/2';
            } else {
             // url3=devUrl + '/leader/medical/qryylwsjbqklist/1/'+(yearNew-1)+'_'+yearNew+'/3';
              url3=devUrl + '/leader/medical/qryylwsjbqklist/1/'+yearNew+'_'+yearNew+'/3';
            }
            $http.get(url3)
              .success(function (response) {
                    if (angular.isUndefined(response)) {
                      SweetAlert.swal("没有查到相关数据");
                    }
                    vm.dataList3 = response.data;
                    sessionStorage.setItem("dataListYlws3", JSON.stringify(vm.dataList3));
                    if(district_no == 0){
                       vm.hunanData=vm.dataList3[0];
                    } else {
                       for(var i = 0;i<vm.dataList3.length;i++){
                           if(vm.dataList3[i].DISTRICT_NO==district_no){
                              vm.hunanData = vm.dataList3[i];
                           }
                       }
                    }
                  }).error(function () {
                  SweetAlert.swal("网络有问题，待会再试");
                });
             }
            //查询全省的各个图表数据 end




    //首次调用
    vm.loadBarChart($http, devUrl,0);
    vm.loadBarChart2($http, devUrl,0);
    vm.loadColorChart($http, devUrl,0);

    var onMapSelectChanged=function(params){
      params=params.batch[0];
      if(params.selected[params.name]){
        vm.curAreaName = params.name;
        district_no = areaMap[vm.curAreaName];
      } else {
        vm.curAreaName="湖南省";
        district_no = 0;
      }
      yearList =[];
      hospital =[];//医院
      bedList =[];//床位
      people =[];//人数
      hospital1 = [];
      hospital2 = [];
      hospital3 = [];
      bedList1 = [];
      bedList2 = [];
      bedList3 = [];
      people1 = [];
      people2 = [];
      people3 = [];
      city1 = [];
      city2 = [];
      city3 = [];
      vm.loadBarChart($http, devUrl,district_no);
      vm.loadBarChart2($http, devUrl,district_no);
      vm.loadColorChart($http, devUrl,district_no);

      //vm.ecConfig.dataLoaded = true;
      //vm.ecConfig2.dataLoaded = true;
    }

    //缓存
    if(sessionStorage.getItem("dataListYlws1") == null)
    {
      vm.loadBarChart($http, devUrl,district_no);
    }
    else{
          vm.dataList1 =  JSON.parse(sessionStorage.getItem("dataListYlws1"));
          hospital1 = [];
          hospital2 = [];
          hospital3 = [];
          bedList1 = [];
          bedList2 = [];
          bedList3 = [];
          people1 = [];
          people2 = [];
          people3 = [];
          maxData = [];
          city = [];
          city1 = [];
          city2 = [];
          city3 = [];
          for(var i = 0; i < vm.dataList1.length; i++) {
                 hospital1.push(vm.dataList1[i].INSTITUTIONS_NUM);
                 hospital2.push(vm.dataList1[i].INSTITUTIONS_NUM);
                 bedList1.push(vm.dataList1[i].BED_NUM);
                 bedList2.push(vm.dataList1[i].BED_NUM);
                 people1.push(vm.dataList1[i].PERSONEL_NUM);
                 people2.push(vm.dataList1[i].PERSONEL_NUM);
              }
            if(vm.tabTopNum == '床位数'){
                 //床位数排序
                 bedList1.sort(function(a,b){
                      return a-b});
                  for(var i=0;i<vm.dataList1.length;i++){
                     for(var j=0;j<vm.dataList1.length;j++){
                      if(bedList2[j] == bedList1[i]){
                         city.push(vm.dataList1[j].DISTRICT_NAME);
                      }
                    }
                  }
                  city2 = city.filter(function (element, index, self) {
                      return self.indexOf(element) === index;
                  })
                  //选择前五个
                  for(var i = 0;i<vm.dataList1.length;i++){
                      if(i==5){
                        break;
                      }
                     bedList3.push(bedList1[i]);
                     maxData.push(bedList1[vm.dataList1.length-1]);
                  }

                 //vm.ecOption.yAxis[0].data = city2;
                 //vm.ecOption.series[0].data = maxData;
                 //vm.ecOption.series[1].data = bedList3;

             } else if(vm.tabTopNum == '人员数'){
                   //人员数排序
                   people1.sort(function(a,b){
                        return a-b});
                   for(var i=0;i<vm.dataList1.length;i++){
                       for(var j=0;j<vm.dataList1.length;j++){
                        if(people2[j] == people1[i]){
                           city.push(vm.dataList1[j].DISTRICT_NAME);
                        }
                      }
                    }
                    city3 = city.filter(function (element, index, self) {
                      return self.indexOf(element) === index;
                   })
                    //选择前五个
                    for(var i = 0;i<vm.dataList1.length;i++){
                        if(i==5){
                          break;
                        }
                       people3.push(people1[i]);
                       maxData.push(people1[vm.dataList1.length-1]);
                    }
                 //vm.ecOption.yAxis[0].data = city3;
                 //vm.ecOption.series[0].data = maxData;
                 //vm.ecOption.series[1].data = people3;
             }else{
                 //卫生机构数排序
                 hospital1.sort(function(a,b){
                      return a-b});
                  for(var i=0;i<vm.dataList1.length;i++){
                     for(var j=0;j<vm.dataList1.length;j++){
                      if(hospital2[j] == hospital1[i]){
                         city.push(vm.dataList1[j].DISTRICT_NAME);
                      }
                    }
                  }
                  city1 = city.filter(function (element, index, self) {
                      return self.indexOf(element) === index;
                  })
                  //选择前五个
                  for(var i = 0;i<vm.dataList1.length;i++){
                    if(i==5){
                      break;
                    }
                    hospital3.push(hospital1[i]);
                    maxData.push(hospital1[vm.dataList1.length-1]);
                  }
                 //vm.ecOption.yAxis[0].data = city1;
                 //vm.ecOption.series[0].data = maxData;
                 //vm.ecOption.series[1].data = hospital3;
                 //vm.ecConfig.dataLoaded = true;
             }
    }//缓存
    if(sessionStorage.getItem("dataListYlws2") == null)
    {
       vm.loadBarChart2($http, devUrl,district_no);
    }
    else{
          vm.dataList2 =  JSON.parse(sessionStorage.getItem("dataListYlws2"));
           if(barTabData2.length > 0 ){
               barTabData2 = [];
               yearList = [];
           }
           yearList0.length = 0;
           hospital0.length = 0;
           bedList0.length = 0;
           people0.length = 0;
          if(district_no == 0){
                for (var i = 0; i < vm.dataList2.length; i++) {
                   yearList.push(vm.dataList2[i].DATE_PERIOD);
                   hospital.push(vm.dataList2[i].INSTITUTIONS_NUM);
                   bedList.push(vm.dataList2[i].BED_NUM);
                   people.push(vm.dataList2[i].PERSONEL_NUM);
                }
              for(var i = yearNew-4; i <= yearNew; i++) {
                for (var j = 0; j < vm.dataList2.length; j++) {
                  if (i == vm.dataList2[j].DATE_PERIOD) {
                    yearList0.push(vm.dataList2[j].DATE_PERIOD);
                    hospital0.push(vm.dataList2[j].INSTITUTIONS_NUM);
                    bedList0.push(vm.dataList2[j].BED_NUM);
                    people0.push(vm.dataList2[j].PERSONEL_NUM);
                  }
                }
              }
           } else {
              for (var i = 0; i < vm.dataList2.length; i++) {
                 if(vm.dataList2[i].DISTRICT_NO == district_no){
                      yearList.push(vm.dataList2[i].DATE_PERIOD);
                      hospital.push(vm.dataList2[i].INSTITUTIONS_NUM);
                      bedList.push(vm.dataList2[i].BED_NUM);
                      people.push(vm.dataList2[i].PERSONEL_NUM);
                 }
              }
            for(var i = yearNew-4; i <= yearNew; i++){
              for (var j = 0; j < vm.dataList2.length; j++) {
                if(i == vm.dataList2[j].DATE_PERIOD && vm.dataList2[j].DISTRICT_NO == district_no){
                  yearList0.push(vm.dataList2[j].DATE_PERIOD);
                  hospital0.push(vm.dataList2[j].INSTITUTIONS_NUM);
                  bedList0.push(vm.dataList2[j].BED_NUM);
                  people0.push(vm.dataList2[j].PERSONEL_NUM);
                }
              }
            }
           }
            if(vm.tabColorNum == 2){
              for(var i = 0; i < vm.dataList2.length; i++){
                barTabData2.push(bedList[i]);
              }
            } else if(vm.tabColorNum ==3){
              for(var i = 0; i < vm.dataList2.length; i++){
                barTabData2.push(people[i]);
              }
            } else {
              for(var i = 0; i < vm.dataList2.length; i++){
                barTabData2.push(hospital[i]);
              }
            }
            hospital = [];
            bedList = [];
            people = [];
            //vm.ecOption2.series[0].data = barTabData2;
            //vm.ecOption2.xAxis[0].data = yearList;
            vm.ecConfig.dataLoaded = true;
            vm.ecConfig2.dataLoaded = true;
    }
    //缓存
    if(sessionStorage.getItem("dataListYlws3") == null)
    {
       vm.loadColorChart($http, devUrl,district_no);
    }
    else{
          vm.dataList3 =  JSON.parse(sessionStorage.getItem("dataListYlws3"));
          if(district_no == 0){
             vm.hunanData=vm.dataList3[0];
          } else {
             for(var i = 0;i<vm.dataList3.length;i++){
                 if(vm.dataList3[i].DISTRICT_NO==district_no){
                    vm.hunanData = vm.dataList3[i];
                 }
             }
          }
    }
     //缓存
    if(sessionStorage.getItem("cacheYlwsszyljbqkDataList") == null)
    {
        vm.mapDataList();
    }
    else{
          vm.dataList0.length = 0;
          vm.dataList0 =  JSON.parse(sessionStorage.getItem("cacheYlwsszyljbqkDataList"));
          for(var i=0;i<vm.dataList0.length;i++){
            mapData.push({seriesId:vm.dataList0[i].DISTRICT_NO,name:vm.dataList0[i].DISTRICT_NAME,value:vm.dataList0[i].INSTITUTIONS_NUM});
            areaMap[vm.dataList0[i].DISTRICT_NAME]=vm.dataList0[i].DISTRICT_NO;
          }
          vm.mapConfig.dataLoaded=true;
          vm.mapConfig.event = [{mapselectchanged:onMapSelectChanged}];
    }


  }
})();


