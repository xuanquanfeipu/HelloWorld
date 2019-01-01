/**
 * 领导桌面-人才供需-市州分析
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('LdzmTopicIndRcgxszfxController', LdzmTopicIndRcgxszfxController);

  /** @ngInject */
  function LdzmTopicIndRcgxszfxController($http, devUrl,$scope,SweetAlert) {
    var vm = this;
    vm.result = new Array();
    vm.yearList = new Array();
    vm.wdList = new Array();
    vm.nnList = new Array();
    var pieData = new Array();
    var pieName = new Array();
    vm.yearList.push('2015');
    vm.yearList.push('2016');
    vm.wdList.push('年龄');
    vm.wdList.push('教育程度');
    vm.wdList.push('年薪');
    vm.nnList.push('20-22');
    vm.nnList.push('22-25');
    vm.nnList.push('25-30');
    var ageGroup = 1;
    var year = '2016';
    var aera = '100';

    vm.selectChange3 = function (selectedSite) {//alert(selectedSite);
      if(selectedSite == '20-22')
      {
        ageGroup =1;
      }
      else if(selectedSite == '22-25')
      {
        ageGroup =2;
      }
      else if(selectedSite == '25-30')
      {
        ageGroup =3;
      }
      vm.mapData.length = 0;
      for(var i=0;i<vm.result.length;i++){
          if(vm.result[i].AGE_GROUP_NO == ageGroup)
          {
            vm.mapData.push({name:vm.result[i].DISTRICT_NAME,value:vm.result[i].RS,BL:vm.result[i].BL});
          }
      }
      //vm.ecOption.series[0].data=vm.mapData;
      vm.ecConfig.dataLoaded=true;
    }

    vm.selectChange4 = function (selectedSite) {//alert(selectedSite);
      pieData.length=0;
      aera =selectedSite;
      for(var i=0;i<vm.list1.length;i++){
        if(vm.list1[i].DISTRICT_NO == selectedSite)
        {
            pieData.push({value:vm.list1[i].rs_group_1,name:'20-22'});
            pieData.push({value:vm.list1[i].rs_group_2,name:'22-25'});
            pieData.push({value:vm.list1[i].rs_group_3,name:'25-30'});
        }
      }
      vm.ecConfig1.dataLoaded=true;
    }

    vm.selectChange1 = function (selectedYear) {//alert(selectedSite);
        url=devUrl + 'leader/edu/qryrcdyList/1/'+selectedYear+'_'+selectedYear+'/1';
        $http.get(url)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          vm.result=response.data;
          vm.list1=response.data1;
          vm.mapData.length = 0;
          for(var i=0;i<vm.result.length;i++){
            if(vm.result[i].AGE_GROUP_NO == ageGroup)
            {
              vm.mapData.push({name:vm.result[i].DISTRICT_NAME,value:vm.result[i].RS,BL:vm.result[i].BL});
            }
          }
          vm.ecConfig.dataLoaded=true;
          //vm.ecConfig.event = [{mapselectchanged:onMapSelectChanged}];

          //饼图联动
          vm.selectChange4(aera)
          vm.ecConfig1.dataLoaded=true;
        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });
    }

    vm.title = "领导桌面-人才供需-市州分析";
    vm.breadcrumbs = [
      {title: '领导桌面', link: '/#/ldzm', icon: 'home'},
      {title: '人才供需', link: '', icon: 'book'},
      {title: '市州分析', link: '', icon: 'file'}
    ];
      var url=devUrl + 'leader/edu/qryrcdyList/1/2016_2016/1';
      var categories = new Array();
      vm.mapData=new Array();
      vm.list=new Array();
      vm.list1=new Array();
      //地图
      vm.ecConfig = {
        theme: 'Donut',
        dataLoaded: false
      };
    vm.ecOption = {
      color: ['#289A49', '#E2F4DC'],
      tooltip: {
        trigger: 'item',
        formatter: '{b}<br/>{c} 万'
      },
      visualMap: {
        min: 10,
        max: 2000,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'],           // 文本，默认为数值文本
        calculable: true,
        inRange: {
          color: ['#E2F4DC', '#289A49']
        }
      },
      series: [{
        name: '总人数',
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
        selectedMode: 'single',
        data: vm.mapData
      }]
    };
    vm.ecConfig1 = {
      theme: 'Donut',
      dataLoaded: false
    };
    vm.ecOption1= {

    };

    $http.get(url)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          vm.result=response.data;
          vm.list1=response.data1;
          for(var i=0;i<vm.result.length;i++){
            if(vm.result[i].AGE_GROUP_NO == ageGroup)
            {
              vm.mapData.push({name:vm.result[i].DISTRICT_NAME,value:vm.result[i].RS,BL:vm.result[i].BL});
            }
          }
          //console.log(vm.mapData);
          //vm.ecOption.series[0].data = vm.mapData;

          vm.ecConfig.dataLoaded=true;
          //vm.ecConfig.event = [{mapselectchanged:onMapSelectChanged}];
          vm.selectChange4('100');
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
              orient: 'vertical',
              left: 'right',
              top:'bottom',
              data: vm.nnList
            },
            series : [
              {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '35%'],
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
          vm.ecConfig1.dataLoaded=true;
        }).error(function () {
          SweetAlert.swal("网络有问题，待会再试");
        });

      var onMapSelectChanged=function(params){
        vm.ecConfig.dataLoaded=false;
        console.log('onMapSelectChanged');
        var city = params.name;
        console.log(params);
        console.log(city);
        vm.ecOption.series[0].map='changsha';
        console.log(vm.ecOption);
        //vm.ecConfig.dataLoaded=true;
      }
  }
})();


