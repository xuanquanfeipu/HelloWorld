/**
 * 领导桌面-工伤情况-企业分析
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('LdzmTopicIndGsfxqyfxController', LdzmTopicIndGsfxqyfxController)
    .factory('CommonService', CommonService);

  function CommonService() {
    var factory = {};
    //返回数组元素下标
    factory.getElementIndex = function (arr,value) {
      var str = arr.toString();
      var index = str.indexOf(value);
      console.log(str+"======="+value);
      if (index >= 0) {
        //存在返回索引
        //"(^"+value+",)|(,"+value+",)|(,"+value+"$)"
        value = value.toString().replace(/(\[|\])/g, "\\$1");
        console.log(str+"-------"+value);
        var reg1 = new RegExp("((^|,)" + value + "(,|$))", "gi");
        return str.replace(reg1, "$2@$3").replace(/[^,@]/g, "").indexOf("@");
      } else {
        return -1;//不存在此项
      }
    };
    return factory;
  }

  /** @ngInject */
  function LdzmTopicIndGsfxqyfxController($http, devUrl, CommonService, $timeout,SweetAlert) {
    var vm = this;

    vm.title = "领导桌面-工伤情况-企业分析";
    vm.breadcrumbs = [
      {title: '领导桌面', link: '/#/ldzm', icon: 'home'},
      {title: '工伤情况', link: '/#/ldzm/content', icon: 'book'},
      {title: '企业分析', link: '/#/ldzm/content/detail', icon: 'file'}
    ];

    var companys = new Array();
    var companys1 = new Array();
    var companys2 = new Array();
    var resultxx = new Array();
    var deathCauses = new Array();
    var deathCauses1 = new Array();
    var deathCauses2 = new Array();
    var data = new Array();
    vm.list = new Array();
    vm.yearList = new Array();
    var selectyear = 2016;
    for(var i=2007;i<2017;i++)
    {
      vm.yearList.push(i);
    }
    vm.selectChange1 = function (selectedSite) {
      selectyear=selectedSite;
      $timeout(function () {
        url = devUrl + 'leader/edu/qryqygsswllist/1/'+selectyear;
        $http.get(url)
          .success(function (response) {
            if (angular.isUndefined(response)) {
              SweetAlert.swal("没有查到相关数据");
            }
            resultxx = response.data;
            vm.list.length=0
            for (var i = 0; i < resultxx.length; i++) {
              var companyIndex = CommonService.getElementIndex(companys1, resultxx[i].COMPANY_NAME);
              var deathCauseIndex = CommonService.getElementIndex(deathCauses1, resultxx[i].DEATH_CAUSE_NAME);
              data.push([companyIndex, deathCauseIndex, resultxx[i].QYSWL]);
              vm.list.push({"companyName": resultxx[i].COMPANY_NAME, "deathCauseName": resultxx[i].DEATH_CAUSE_NAME, "data": resultxx[i].QYSWL});
            }
            vm.legendCheckboxClick('x','');
          }).error(function () {
          SweetAlert.swal("网络有问题，待会再试");
        });
      }, 2000);


    }
    $.ajaxSetup({
      async: false
    });
    //查询公司名称
    var url = devUrl + 'common/qryCompany';
    $http.get(url)
      .success(function (response) {
        if (angular.isUndefined(response)) {
          SweetAlert.swal("没有查到相关数据");
        }
        var result = response.data;
        for (var i = 0; i < result.length; i++) {
          companys1.push(result[i].COMPANY_NAME);
          companys2.push(result[i].COMPANY_NAME);
          companys.push({name: result[i].COMPANY_NAME, checked: true});
        }

        vm.companys = companys;
        console.log(companys);
      }).error(function () {
      SweetAlert.swal("网络有问题，待会再试");
    });

    //查询死亡原因
    url = devUrl + 'common/qryDeathCause';
    $http.get(url)
      .success(function (response) {
        if (angular.isUndefined(response)) {
          SweetAlert.swal("没有查到相关数据");
        }
        var result = response.data;
        for (var i = 0; i < result.length; i++) {
          deathCauses1.push(result[i].DEATH_CAUSE_NAME);
          deathCauses2.push(result[i].DEATH_CAUSE_NAME);
          deathCauses.push({name: result[i].DEATH_CAUSE_NAME, checked: true});
        }

        vm.deathCauses = deathCauses;
        console.log(deathCauses);
      }).error(function () {
      SweetAlert.swal("网络有问题，待会再试");
    });

    //查询公司死亡数据
    $timeout(function () {
      url = devUrl + 'leader/edu/qryqygsswllist/1/'+selectyear;
      $http.get(url)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          resultxx = response.data;
          for (var i = 0; i < resultxx.length; i++) {
            console.log(resultxx[i].COMPANY_NAME+"|"+ resultxx[i].DEATH_CAUSE_NAME+"===");
            var companyIndex = CommonService.getElementIndex(companys1, resultxx[i].COMPANY_NAME);
            var deathCauseIndex = CommonService.getElementIndex(deathCauses1, resultxx[i].DEATH_CAUSE_NAME);
            console.log(companyIndex + "|" + deathCauseIndex);
            data.push([companyIndex, deathCauseIndex, resultxx[i].QYSWL]);
            vm.list.push({"companyName": resultxx[i].COMPANY_NAME, "deathCauseName": resultxx[i].DEATH_CAUSE_NAME, "data": resultxx[i].QYSWL});
          }
          data = data.map(function (item) {
            return [item[1], item[0], item[2] || '-'];
          });

          vm.ecConfig = {
            dataLoaded: true
          };

        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });
    }, 2000);
    //图1
    vm.ecConfig = {
      theme: 'Donut',
      dataLoaded: false
    };
    var chartx = function(_vm) {
      _vm.ecOption = {
        tooltip: {
          position: 'top'
        },
        animation: false,
        grid: {
          height: '80%',
          y: '10%'
        },
        xAxis: {
          type: 'category',
          data: companys2,
          splitArea: {
            show: true
          }
        },
        yAxis: {
          type: 'category',
          data: deathCauses2,
          splitArea: {
            show: true
          }
        },
        visualMap: {
          min: 0,
          max: 1,
          calculable: true,
          orient: 'vertical',
          right: '2%',
          bottom: '30%'
        },
        series: [{
          name: 'Punch Card',
          type: 'heatmap',
          data: data,
          label: {
            normal: {
              show: true
            }
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      };
    }

    vm.legendCheckboxClick = function(type,item){
      data.length = 0;
      deathCauses2.length=0;
      companys2.length=0;
        for(var i=0;i<deathCauses.length;i++){
          if(deathCauses[i].checked)
          {
            deathCauses2.push(deathCauses[i].name);
          }
        }
        for(var i=0;i<companys.length;i++){
          if(companys[i].checked)
          {
            companys2.push(companys[i].name);
          }
        }

      for (var i = 0; i < resultxx.length; i++) {
        var companyIndex = CommonService.getElementIndex(companys2, resultxx[i].COMPANY_NAME);
        var deathCauseIndex = CommonService.getElementIndex(deathCauses2, resultxx[i].DEATH_CAUSE_NAME);
        if(companyIndex != -1 && deathCauseIndex != -1)
        {
            data.push([companyIndex, deathCauseIndex, resultxx[i].QYSWL]);
        }
      }
      /*data = data.map(function (item) {
        return [item[1], item[0], item[2] || '-'];
      });*/
      chartx(vm);
    };
    chartx(vm);
  }
})();


