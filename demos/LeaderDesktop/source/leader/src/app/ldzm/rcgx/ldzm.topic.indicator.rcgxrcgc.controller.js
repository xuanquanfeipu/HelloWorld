/**
 * 领导桌面-医保分析-费用及支出
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('LdzmTopicIndRcgcController', LdzmTopicIndRcgcController);

  /** @ngInject */
  function LdzmTopicIndRcgcController($http, devUrl,$scope,SweetAlert) {
    var vm = this;
    var selectyear=null;
    //$scope.selectedSite= '2014';
    var xueli = new Array();
    var blArray = new Array();
    var result =  new Array();
    var result11=  new Array();
    var result22=  new Array();
    vm.yearList = new Array();
    vm.eduList = new Array();
    vm.comeList = new Array();


    vm.ageGroupList = new Array();

    for(var i=2007;i<2017;i++)
    {
      vm.yearList.push(i);
    }
    vm.activeTab = 1;
    vm.tabClick = function (tabValue) {//alert(selectedSite);
      vm.activeTab =tabValue;
      blArray.length=0;
      if(selectyear == null){
        selectyear = 2016;
      }
      vm.selectChange1(selectyear);
      vm.ecConfig.dataLoaded=true;
    }

    vm.ecConfig = {
      theme: 'Donut',
      dataLoaded: false
    };
    vm.ecOption = {
      title : {
        text: '',
        subtext: '',
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} %"
      },
      legend: {
        x : 'center',
        y : 'bottom',
        data:xueli
      },
      calculable : true,
      series : [
        {
          name:'人才占比',
          type:'pie',
          radius : [30, 110],
          center : ['50%', '50%'],
          roseType : 'area',
          data:blArray
        }
      ]
    };
    vm.selectChange1 = function (selectedSite) {//alert(selectedSite);
      selectyear=selectedSite;
       //图2
       blArray.length=0;
       if(vm.activeTab == 1)
       {
         for(var i=0;i<result.length;i++)
         {
           var yearTmp = result[i].DATE_PERIOD;
           var name = result[i].AGE_GROUP_NAME;
           var bl = result[i].BL;
           if(selectedSite == yearTmp)
           {
             blArray.push({value:bl, name:name});
             xueli.push(name);
           }
         }
       }
      else if(vm.activeTab == 2)
      {
        for(var i=0;i<result11.length;i++)
        {
          var yearTmp = result11[i].DATE_PERIOD;
          var name = result11[i].EDUCATION_NAME;
          var bl = result11[i].BL;
          if(selectedSite == yearTmp)
          {
            blArray.push({value:bl, name:name});
            xueli.push(name);
          }
        }
      }
       else if(vm.activeTab == 3)
       {
         for(var i=0;i<result22.length;i++)
         {
           var yearTmp = result22[i].DATE_PERIOD;
           var name = result22[i].DISTRICT_NAME;
           var bl = result22[i].BL;
           if(selectedSite == yearTmp)
           {
             blArray.push({value:bl, name:name});
             xueli.push(name);
           }
         }
       }


        vm.ecConfig.dataLoaded=true;
    }
    vm.title = "领导桌面-人才供需-人才构成";
    vm.breadcrumbs = [
      {title: '领导桌面', link: '/#/ldzm', icon: 'home'},
      {title: '人才供需', link: '', icon: 'book'},
      {title: '人才构成', link: '', icon: 'file'}
    ];



      var categories = new Array();

      vm.list=new Array();
      vm.list0=new Array();
      vm.list1=new Array();
      vm.list2=new Array();

      vm.result1=new Array();
      vm.result1.push('2015');
      vm.result1.push('2016');

      //图1
      vm.ecConfig = {
        theme: 'Donut',
        dataLoaded: false
      };


      //按教育程度
      var url=devUrl + 'leader/edu/qryrcgcList/1/2007_2016/2';
      $http.get(url)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          vm.list=response.data1;
          result11=response.data;
          for (var i = 0; i < result11.length; i++) {
            vm.list1.push({"year": result11[i].DATE_PERIOD, "educationLevel": result11[i].EDUCATION_NAME, "data1": result11[i].RS,"data2": result11[i].BL});
          }
          if(vm.activeTab == 2){
            vm.selectChange1("2016");
            vm.ecConfig.dataLoaded=true;
          }
        }).error(function () {
          SweetAlert.swal("网络有问题，待会再试");
        });
     //查询年龄段
     url = devUrl + 'common/qryAgeGroup';
    $http.get(url)
      .success(function (response) {
        if (angular.isUndefined(response)) {
          SweetAlert.swal("没有查到相关数据");
        }
        var resultNND = response.data;
        for (var i = 0; i < resultNND.length; i++) {
          vm.ageGroupList.push(resultNND[i].AGE_GROUP_NAME);
        }
      }).error(function () {
      SweetAlert.swal("网络有问题，待会再试");
    });
     url = devUrl + 'common/qryEducationLevelList';
    $http.get(url)
      .success(function (response) {
        if (angular.isUndefined(response)) {
          SweetAlert.swal("没有查到相关数据");
        }
        var resultXLD = response.data;
        for (var i = 0; i < resultXLD.length; i++) {
          vm.eduList.push(resultXLD[i].EDUCATION_NAME);
        }
      }).error(function () {
      SweetAlert.swal("网络有问题，待会再试");
    });
    //按年龄
    url=devUrl + 'leader/edu/qryrcgcList/1/2007_2016/1';
    $http.get(url)
      .success(function (response) {
        if (angular.isUndefined(response)) {
          SweetAlert.swal("没有查到相关数据");
        }
        result = response.data;
        for (var i = 0; i < result.length; i++) {
          vm.list0.push({"year": result[i].DATE_PERIOD, "ageGroup": result[i].AGE_GROUP_NAME, "data1": result[i].RS,"data2": result[i].BL});
        }
        if(vm.activeTab == 1){
          vm.selectChange1("2016");
          vm.ecConfig.dataLoaded=true;
        }

      }).error(function () {
      SweetAlert.swal("网络有问题，待会再试");
    });
    //人才来源
    url = devUrl + 'common/qryAreaList/2';
    $http.get(url)
      .success(function (response) {
        if (angular.isUndefined(response)) {
          SweetAlert.swal("没有查到相关数据");
        }
        var resultRCLY = response.data;
        for (var i = 0; i < resultRCLY.length; i++) {
          vm.comeList.push(resultRCLY[i].DISTRICT_NAME);
        }
      }).error(function () {
      SweetAlert.swal("网络有问题，待会再试");
    });

    //人才来源
    url=devUrl + 'leader/edu/qryrcgcList/1/2007_2016/3';
    $http.get(url)
      .success(function (response) {
        if (angular.isUndefined(response)) {
          SweetAlert.swal("没有查到相关数据");
        }
        result22 = response.data;
        for (var i = 0; i < result22.length; i++) {
          vm.list2.push({"year": result22[i].DATE_PERIOD, "district": result22[i].DISTRICT_NAME, "data1": result22[i].RS,"data2": result22[i].BL});
        }
        if(vm.activeTab == 3){
          vm.selectChange1("2016");
          vm.ecConfig.dataLoaded=true;
        }
      }).error(function () {
      SweetAlert.swal("网络有问题，待会再试");
    });

    vm.tabClick(1)
  }
})();


