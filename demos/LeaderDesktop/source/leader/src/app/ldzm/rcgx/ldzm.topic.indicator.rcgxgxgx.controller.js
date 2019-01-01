/**
 * 领导桌面-供需关系
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('LdzmTopicIndRcgxgxgxController', LdzmTopicIndRcgxgxgxController);

  /** @ngInject */
  function LdzmTopicIndRcgxgxgxController($http, devUrl,$scope,SweetAlert) {
    var vm = this;
    vm.title = "领导桌面-人才供需-供需关系";
    vm.breadcrumbs = [
      {title: '领导桌面', link: '/#/ldzm', icon: 'home'},
      {title: '人才供需', link: '', icon: 'book'},
      {title: '供需关系', link: '', icon: 'file'}
    ];
    vm.activeTab = 1;
    vm.active1Tab = 1;
    vm.yearList = new Array();
    vm.ageGroupList = new Array();
    vm.eduList = new Array();
    vm.dataList = new Array();
    vm.data1List = new Array();
    var pieNames = new Array();
    var pieData = new Array();
    var selectY = '2016';

    var leftXList = new Array();
    var leftYList = new Array();
    var leftDList = new Array();

    for(var i=2007;i<2017;i++)
    {
      vm.yearList.push({value:i,checked:true});
    }
    vm.legendCheckboxClick= function (type,item) {
      vm.putLeftData();
    }
    vm.putLeftData = function () {
      //重置
      leftXList.length=0;
      leftYList.length=0;
      leftDList.length=0;
      //横轴
      for(var i=0;i<vm.yearList.length;i++){
          if(vm.yearList[i].checked){
            leftXList.push(vm.yearList[i].value)
          }
      }
      if(vm.activeTab == 1){
        //y轴
        for(var i=0;i<vm.ageGroupList.length;i++){
          if(vm.ageGroupList[i].checked){
            if(vm.ageGroupList[i].type == 0){
              leftYList.push(vm.ageGroupList[i].name+"供给人数");
            }
            else{
              leftYList.push(vm.ageGroupList[i].name+"需求人数");
            }
          }
        }
        //数据
        for(var i=0;i<leftYList.length;i++){
          var yName = leftYList[i];
          var type = 'bar';
          var stack = yName.substring(0,yName.length-4);
          var innerArray = new Array();
          for(var j=0;j<leftXList.length;j++){
            //innerArray.push(j+2000);
            var innerYear = leftXList[j];
            var count = 0;
            for(var k=0;k<vm.dataList.length;k++)
            {
              if(vm.dataList[k].ageGroup == stack && vm.dataList[k].year ==innerYear ){
                //alert(vm.dataList[k].data1)
                count = 1;
                if(yName.indexOf('供给') > -1){
                  innerArray.push(vm.dataList[k].data1);
                }else{
                  innerArray.push(-vm.dataList[k].data2);
                }

              }
            }
            if(count == 0){
              innerArray.push(0);
            }
          }
          leftDList.push({name:yName,type:type,stack:stack,data:innerArray});
        }
      }else{
        //y轴
        /*for(var i=0;i<vm.eduList.length;i++){
          if(vm.eduList[i].checked){
            if(vm.eduList[i].type == 0){
              leftYList.push(vm.eduList[i].name+"供给人数");
            }
            else{
              leftYList.push(vm.eduList[i].name+"需求人数");
            }
          }
        }
        //数据
        for(var i=0;i<leftYList.length;i++){
          var yName = leftYList[i];
          var type = 'bar';
          var stack = yName.substring(0,yName.length-4);
          var innerArray = new Array();
          for(var j=0;j<leftXList.length;j++){
            var innerYear = leftXList[j];
            var count = 0;
            for(var k=0;k<vm.data1List.length;k++)
            {
              if(vm.data1List[k].education == stack && vm.data1List[k].year ==innerYear ){
                //alert(vm.data1List[k].data1)
                count = 1;
                if(yName.indexOf('供给') > -1){
                  innerArray.push(vm.data1List[k].data1);
                }else{
                  innerArray.push(-vm.data1List[k].data2);
                }
              }
            }
            if(count == 0){
              innerArray.push(0);
            }
          }
          leftDList.push({name:yName,type:type,stack:stack,data:innerArray});
        }*/
      }

      vm.ecConfig.dataLoaded=true;
    }
    vm.tabClick = function (tabValue) {
      vm.activeTab =tabValue;
      vm.selectChange(selectY);
    }

    vm.tab1Click = function (tabValue) {
      vm.active1Tab =tabValue;
      vm.selectChange(selectY);
    }

    vm.selectChange = function (selectedYear) {
      selectY = selectedYear;
      pieNames.length = 0;
      pieData.length = 0;
      if(vm.activeTab == 1) {
        for (var i = 0; i < vm.dataList.length; i++) {
          if (vm.dataList[i].year == selectedYear) {
            //pieData.push({value1: vm.dataList[i].data1, value2: vm.dataList[i].data2, name: vm.dataList[i].ageGroup});
            if(vm.active1Tab == 1) {
              pieNames.push(vm.dataList[i].ageGroup);
              pieData.push({value: vm.dataList[i].data1, name: vm.dataList[i].ageGroup});
            }else{
              pieNames.push(vm.dataList[i].ageGroup);
              pieData.push({value: vm.dataList[i].data2, name: vm.dataList[i].ageGroup});
            }
          }
        }
      }else{
        for(var i=0;i<vm.data1List.length;i++){
          if(vm.data1List[i].year == selectedYear) {
            //pieData.push({value1:vm.data1List[i].data1,value2:vm.data1List[i].data2,name:vm.data1List[i].education});
            if(vm.active1Tab == 1) {
              pieNames.push(vm.data1List[i].ageGroup);
              pieData.push({value: vm.data1List[i].data1, name: vm.data1List[i].education});
            }else{
              pieNames.push(vm.data1List[i].ageGroup);
              pieData.push({value: vm.data1List[i].data2, name: vm.data1List[i].education});
            }
          }
        }
      }
      vm.ecConfig1.dataLoaded=true;
    }


    vm.ecConfig = {
      theme: 'Donut',
      dataLoaded: false
    };
    vm.ecOption = {
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data:leftYList
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
          data : leftXList
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : leftDList
    };
    vm.ecConfig1 = {
      theme: 'Donut',
      dataLoaded: false
    };
    vm.ecOption1 = {
      title : {
        text: '',
        subtext: '',
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        x : 'center',
        y : 'bottom',
        data: pieNames
      },
      series : [
        {
          name: '人数以及占比',
          type: 'pie',
          radius : '55%',
          center: ['40%', '40%'],
          data:pieData,
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

    //查询年龄段
    var url = devUrl + 'common/qryAgeGroup';
    $http.get(url)
      .success(function (response) {
        if (angular.isUndefined(response)) {
          SweetAlert.swal("没有查到相关数据");
        }
        var result = response.data;
        for (var i = 0; i < result.length; i++) {
          //vm.ageGroupList.push(result[i].AGE_GROUP_NAME);
          vm.ageGroupList.push({name:result[i].AGE_GROUP_NAME,type:0,checked:true});
          vm.ageGroupList.push({name:result[i].AGE_GROUP_NAME,type:1,checked:true});
        }
      }).error(function () {
      SweetAlert.swal("网络有问题，待会再试");
    });

    //查询年龄段
     url = devUrl + 'leader/edu/qryrcgxList/1/2007_2016/1';
    $http.get(url)
      .success(function (response) {
        if (angular.isUndefined(response)) {
          SweetAlert.swal("没有查到相关数据");
        }
        var result = response.data;
        for (var i = 0; i < result.length; i++) {
          vm.dataList.push({"year": result[i].DATE_PERIOD, "ageGroup": result[i].AGE_GROUP_NAME, "data1": result[i].GYSL,"data2": result[i].XQSL});
        }
          if(vm.activeTab == 1)
          {
            vm.selectChange('2016');
            vm.putLeftData();
          }
      }).error(function () {
      SweetAlert.swal("网络有问题，待会再试");
    });

    //查询年薪列表
    var url = devUrl + 'common/qryEducationLevelList';
    $http.get(url)
      .success(function (response) {
        if (angular.isUndefined(response)) {
          SweetAlert.swal("没有查到相关数据");
        }
        var result = response.data;
        for (var i = 0; i < result.length; i++) {
          //vm.eduList.push(result[i].EDUCATION_NAME);
          vm.eduList.push({name:result[i].EDUCATION_NAME,type:0,checked:true});
          vm.eduList.push({name:result[i].EDUCATION_NAME,type:1,checked:true});
        }
      }).error(function () {
      SweetAlert.swal("网络有问题，待会再试");
    });

    //查询年薪段
    url = devUrl + 'leader/edu/qryrcgxList/1/2007_2016/2';
    $http.get(url)
      .success(function (response) {
        if (angular.isUndefined(response)) {
          SweetAlert.swal("没有查到相关数据");
        }
        var result = response.data;
        for (var i = 0; i < result.length; i++) {
          vm.data1List.push({"year": result[i].DATE_PERIOD, "education": result[i].EDUCATION_NAME, "data1": result[i].GYSL,"data2": result[i].XQSL});
        }
          if(vm.activeTab == 2)
          {
            vm.selectChange('2016');
            vm.putLeftData();
          }

      }).error(function () {
      SweetAlert.swal("网络有问题，待会再试");
    });


    //加载图
    vm.ecConfig.dataLoaded=true;
    vm.ecConfig1.dataLoaded=true;
  }
})();


