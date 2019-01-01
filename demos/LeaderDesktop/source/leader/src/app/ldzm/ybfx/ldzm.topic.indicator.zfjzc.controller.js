/**
 * 领导桌面-医保分析-自费及支出
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('LdzmTopicIndZfjzcController', LdzmTopicIndZfjzcController);

  /** @ngInject */
  function LdzmTopicIndZfjzcController($http, devUrl,$scope) {
    var vm = this;
    var selectyear=null;vm.yearList=new Array();  vm.dataList = new Array();
    var xlengend  = new Array();//图一相关数据指标
    var ylengend  = new Array();
    var _ylengend  = new Array();
    var xyData  = new Array();
    var legendSelected={};
    vm.eduTypeList = new  Array();vm.list=new Array();vm.list2=new Array();
    vm.eduTypeList.push({type:1,name:'总费用',checked:true,color:'#574FBE'});
    vm.eduTypeList.push({type:2,name:'药品',checked:true,color:'#5db606'});
    vm.eduTypeList.push({type:3,name:'检查治疗',checked:true,color:'#0ac4b5'});
    vm.eduTypeList.push({type:4,name:'材料',checked:true,color:'#2d77f2'});
    vm.eduTypeList.push({type:5,name:'其他',checked:true,color:'#be64ce'});


    vm.selectChange1 = function (selectedSite) {//alert(selectedSite);
      console.info(vm.selectedSite);
      selectyear=selectedSite;

      vm.queryData();
     /* if(sessionStorage.getItem("zfjzcDataList2") == null)
      {
        vm.queryData();
      }
      else{
        vm.list2.length = 0;
        vm.list2 =  JSON.parse(sessionStorage.getItem("zfjzcDataList2"));

        //图2
        vm.ecConfig1 = {
          theme: 'Donut',
          dataLoaded: false
        };
        vm.ecOption1 = {
          color: ['#ffc928','#4e99ff','#0c6bd9','#574fbe'],
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          grid: {
            left: '3%',
            right: '5%',

            top: '-10%',
            containLabel: true
          },
          legend: {
            orient: 'horizontal',
            x: 'center',
            y: '0',
            data:['药品','检查治疗','材料','其他']
          },
          series : [
            {
              name: '医保分析-费用及支出',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                {value:vm.list2[0].YP_ZJ_FY, name:'药品'},
                {value:vm.list2[0].JCZL_ZJ_FY, name:'检查治疗'},
                {value:vm.list2[0].CL_ZJ_FY, name:'材料'},
                {value:vm.list2[0].QT_ZJ_FY, name:'其他'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]

        };
        vm.ecConfig1.dataLoaded=true;
      }*/
    }
    vm.queryData= function () {
      var url1=devUrl + 'leader/medical/ybfy/zfjzc/1/'+selectyear+'_'+selectyear;
      $http.get(url1)
        .success(function (response2) {
          if (angular.isUndefined(response2)) {
            SweetAlert.swal("没有查到相关数据");
          }
          vm.list2=response2.data;
          sessionStorage.setItem("zfjzcDataList2", JSON.stringify(vm.list2));
          //图2
          vm.ecConfig1 = {
            theme: 'Donut',
            dataLoaded: false
          };
          vm.ecOption1 = {
            color: ['#ffc928','#4e99ff','#0c6bd9','#574fbe'],
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            grid: {
              left: '3%',
              right: '5%',

              top: '-10%',
              containLabel: true
            },
            legend: {
              orient: 'horizontal',
              x: 'center',
              y: '0',
              data:['药品','检查治疗','材料','其他']
            },
            series : [
              {
                name: '医保分析-费用及支出',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                  {value:vm.list2[0].YP_ZJ_FY, name:'药品'},
                  {value:vm.list2[0].JCZL_ZJ_FY, name:'检查治疗'},
                  {value:vm.list2[0].CL_ZJ_FY, name:'材料'},
                  {value:vm.list2[0].QT_ZJ_FY, name:'其他'}
                ],
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]

          };
          vm.ecConfig1.dataLoaded=true;
        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });
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

    //图1
    vm.ecConfig = {
      theme: 'Donut',
      dataLoaded: false
    };

    vm.ecOption = {
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
        y: '0',
        data:['总费用','药品','检查治疗','材料','其他'],
        selected: legendSelected
      },
      xAxis: [{
        type : 'category',
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
        name:'费用：万元',
        type: 'value',
        min: 0,
        max: 50000,
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


    vm.queryData2= function () {
      var url=devUrl + 'leader/medical/ybfy/zfjzc/1/2012_2016';
      $http.get(url)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          vm.list=response.data;
          sessionStorage.setItem("zfjzcDataList1", JSON.stringify(vm.list));
          for(var i=0;i<vm.list.length;i++){
            vm.dataList.push({type:1,num:vm.list[i].ZJZF,year:vm.list[i].DATE_PERIOD});
            vm.dataList.push({type:2,num:vm.list[i].YP_ZJ_FY,year:vm.list[i].DATE_PERIOD});
            vm.dataList.push({type:3,num:vm.list[i].JCZL_ZJ_FY,year:vm.list[i].DATE_PERIOD});
            vm.dataList.push({type:4,num:vm.list[i].CL_ZJ_FY,year:vm.list[i].DATE_PERIOD});
            vm.dataList.push({type:5,num:vm.list[i].QT_ZJ_FY,year:vm.list[i].DATE_PERIOD});

          }
          vm.putLeftData();
          // vm.legendCheckboxClick("init",1);/** 调用复选框方法初始化 **/
          vm.ecConfig.dataLoaded=true;
          $scope.selectedSite=vm.list[0].DATE_PERIOD;
          vm.selectChange1(vm.list[0].DATE_PERIOD);

        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });
    }

    for(var i=2012;i<2017;i++)
    {
      vm.yearList.push({value:i,checked:true});
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

     // vm.ecConfig.dataLoaded = true;
      vm.ecConfig.event = [{legendselectchanged:onLegendSelectChanged}];
      vm.ecConfig.dataLoaded = true;
    }

    if(sessionStorage.getItem("zfjzcDataList1") == null)
    {
      vm.queryData2();
    }
    else{
      vm.list.length = 0;
      vm.list =  JSON.parse(sessionStorage.getItem("zfjzcDataList1"));

      sessionStorage.setItem("zfjzcDataList1", JSON.stringify(vm.list));
      for(var i=0;i<vm.list.length;i++){
        vm.dataList.push({type:1,num:vm.list[i].ZJZF,year:vm.list[i].DATE_PERIOD});
        vm.dataList.push({type:2,num:vm.list[i].YP_ZJ_FY,year:vm.list[i].DATE_PERIOD});
        vm.dataList.push({type:3,num:vm.list[i].JCZL_ZJ_FY,year:vm.list[i].DATE_PERIOD});
        vm.dataList.push({type:4,num:vm.list[i].CL_ZJ_FY,year:vm.list[i].DATE_PERIOD});
        vm.dataList.push({type:5,num:vm.list[i].QT_ZJ_FY,year:vm.list[i].DATE_PERIOD});

      }
      vm.putLeftData();
      // vm.legendCheckboxClick("init",1);/** 调用复选框方法初始化 **/
      vm.ecConfig.dataLoaded=true;
      $scope.selectedSite=vm.list[0].DATE_PERIOD;
      vm.selectChange1(vm.list[0].DATE_PERIOD);
    }
  }
})();


