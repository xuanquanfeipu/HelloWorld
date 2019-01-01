/**
 * 领导桌面-医保分析-次均费用
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('LdzmTopicIndCjfyfxController', LdzmTopicIndCjfyfxController);

  /** @ngInject */
  function LdzmTopicIndCjfyfxController($http, devUrl,$scope) {
    var vm = this;



      var url=devUrl + 'leader/medical/ybfy/cjfyfx/1/2012_2016';
      var categories = new Array();
      var data1=new Array();
      var data2=new Array();
      var data3=new Array();
      vm.list=new Array();vm.list2=new Array();vm.yearList=new Array();  vm.dataList = new Array();
      var xlengend  = new Array();//图一相关数据指标
      var ylengend  = new Array();
      var _ylengend  = new Array();
      var xyData  = new Array();
      var legendSelected={};
      vm.eduTypeList = new  Array();
      vm.eduTypeList.push({type:1,name:'次均费用',checked:true,color:'#CB65BB'});
      vm.eduTypeList.push({type:2,name:'自费费用',checked:true,color:'#0c6bd8'});
      vm.eduTypeList.push({type:3,name:'医保费用',checked:true,color:'#5650bd'});

      //图1
      vm.ecConfig = {
        theme: 'Donut',
        dataLoaded: false
      };

      vm.ecOption = {
        color: ['#CB65BB','#0c6bd8','#5650bd'],
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
          top: '10%',
          containLabel: true
        },
        legend: {
          orient: 'horizontal',
          x: 'center',
          y: '-4',
          selected: legendSelected,
          data:['次均费用','自费费用','医保费用']
        },
        xAxis: [{
            data: xlengend,
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
          name:'总量：元',
          type: 'value',
          min: 0,
          max: 7000,
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
        series: xyData
      };
      //图2

    vm.queryData= function () {
      $http.get(url)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          vm.list=response.data;
          for(var i=0;i<vm.list.length;i++){
            vm.dataList.push({type:1,num:vm.list[i].ZYCJFY,year:vm.list[i].DATE_PERIOD});
            vm.dataList.push({type:2,num:vm.list[i].ZYZJFY,year:vm.list[i].DATE_PERIOD});
            vm.dataList.push({type:3,num:vm.list[i].ZYYBFY,year:vm.list[i].DATE_PERIOD});

          }
          sessionStorage.setItem("cjfyDataList1", JSON.stringify(vm.list));
          vm.putLeftData();
          vm.ecConfig.dataLoaded=true;
          var lg=vm.list.length;

          $scope.selectedSite=vm.list[lg-1].DATE_PERIOD;
          vm.selectChange1(vm.list[0].DATE_PERIOD);
        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });
    }
    for(var i=2012;i<2017;i++)
    {
      vm.yearList.push({value:i,checked:true});
    }

    var onLegendSelectChanged=function(params){
      legendSelected[params.name] = params.selected[params.name];
      for(var i in vm.eduTypeList){
        if(vm.eduTypeList[i].name==params.name){
          vm.eduTypeList[i].checked=params.selected[params.name];
          break;
        }
      }
      $scope.$apply();//需要手动刷新
    }





    vm.legendCheckboxClick= function (type,item) {

      if(item.checked){
        item.checked = false;
      }else{
        item.checked = true;
      }
      vm.putLeftData();
     }
    vm.putLeftData = function () {
      //重置
      xlengend.length = 0;
      ylengend.length = 0;_ylengend.length = 0;
      xyData.length = 0;
      //x轴
      for (var i = 0; i < vm.yearList.length; i++) {
        if (vm.yearList[i].checked) {
          xlengend.push(vm.yearList[i].value);
        }
      }
      //y轴
      for (var i = 0; i < vm.eduTypeList.length; i++) {
        if (vm.eduTypeList[i].checked) {
          ylengend.push(vm.eduTypeList[i].name);
          _ylengend.push({type:vm.eduTypeList[i].type,name:vm.eduTypeList[i].name,color:vm.eduTypeList[i].color});
          legendSelected[vm.eduTypeList[i].name] = vm.eduTypeList[i].checked;
        }
      }
      //数据
      for(var i=0;i<_ylengend.length;i++){
        var yName = _ylengend[i].name;
        var yType = _ylengend[i].type;
        var color = _ylengend[i].color;
        var innerArray = new Array();
        var innerZZLArray = new Array();
        for(var j=0;j<xlengend.length;j++){
          var xValue = xlengend[j];
          var count = 0;
          for(var k=0;k<vm.dataList.length;k++)
          {
            count = 1;
            if(vm.dataList[k].type == yType && vm.dataList[k].year ==xValue ){
              innerArray.push(vm.dataList[k].num);
            }
          }
          if(count == 0){
            innerArray.push(0);
          }
        }
        xyData.push({name:yName,type:'bar',barMaxWidth:35,itemStyle: {normal: {areaStyle: {type: 'default'},color: color}},data:innerArray});
      }

      vm.ecConfig.event = [{legendselectchanged:onLegendSelectChanged}];
      vm.ecConfig.dataLoaded = true;
    }


    vm.selectChange1 = function (selectedSite) {//alert(selectedSite);
      console.info(vm.selectedSite);
      //图2
      var url2=devUrl + 'leader/medical/ybfy/cjfyfx/1/'+selectedSite+'_'+selectedSite;
      $http.get(url2)
        .success(function (response2) {
          if (angular.isUndefined(response2)) {
            SweetAlert.swal("没有查到相关数据");
          }
          vm.list2=response2.data;

          //医保基金支付金额占比
          vm.ecConfig3 = {
            theme: 'Donut',
            dataLoaded: false
          };
          vm.ecOption3 = {
            color: ['#CB65BB','#0C6BD9'],
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} :{d}%"
            },
            legend: {
              orient: 'horizontal',
              x: 'center',
              y: '5',
              data:['医保占比','自费占比']
            },
            grid: {
              left: '3%',
              right: '5%',
              top: '1%',
              containLabel: true
            },
            series : [
              {
                name: '医保占比分析',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                  {value:response2.data[0].YBZB, name:'医保占比'},
                  {value:1-response2.data[0].YBZB, name:'自费占比'},

                ],
                itemStyle : {
                  normal : {
                    label : {
                      show : false
                    },
                    labelLine : {
                      show : false
                    }
                  },
                  emphasis : {
                    label : {
                      show : true,
                      position : 'center',
                      textStyle : {
                        fontSize : '12',
                      }
                    }
                  }
                },
              }
            ]

          };
          vm.ecConfig3.dataLoaded=true;
        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });
    }
    if(sessionStorage.getItem("cjfyDataList1") == null)
    {
      vm.queryData();
    }
    else{
      vm.list.length = 0;
      vm.list =  JSON.parse(sessionStorage.getItem("cjfyDataList1"));

      for(var i=0;i<vm.list.length;i++){
        vm.dataList.push({type:1,num:vm.list[i].ZYCJFY,year:vm.list[i].DATE_PERIOD});
        vm.dataList.push({type:2,num:vm.list[i].ZYZJFY,year:vm.list[i].DATE_PERIOD});
        vm.dataList.push({type:3,num:vm.list[i].ZYYBFY,year:vm.list[i].DATE_PERIOD});

      }

      vm.putLeftData();
      vm.ecConfig.dataLoaded=true;
      var lg=vm.list.length;

      $scope.selectedSite=vm.list[lg-1].DATE_PERIOD;
      vm.selectChange1(vm.list[0].DATE_PERIOD);
    }

  }
})();


