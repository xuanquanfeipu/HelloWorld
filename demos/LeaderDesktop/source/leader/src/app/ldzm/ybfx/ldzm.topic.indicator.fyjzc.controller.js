/**
 * 领导桌面-医保分析-费用及支出
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('LdzmTopicIndFyjzcController', LdzmTopicIndFyjzcController);

  /** @ngInject */
  function LdzmTopicIndFyjzcController($http, devUrl,$scope) {
    var vm = this;
    var selectyear=null;
    $scope.selectChange = function () {alert(1);
      console.info($scope.selectedName);
      var tt=$scope.selectedName;
      //alert(tt);
    };
    vm.selectChange1 = function (selectedSite) {//alert(selectedSite);
      console.info(vm.selectedSite);
      selectyear=selectedSite;
      //图2
      vm.ecConfig1 = {
        theme: 'Donut',
        dataLoaded: false
      };
      var url1=devUrl + 'leader/medical/ybfy/fyjzc/1/'+selectyear+'_'+selectyear;
      $http.get(url1)
        .success(function (response2) {
          if (angular.isUndefined(response2)) {
            SweetAlert.swal("没有查到相关数据");
          }
          vm.ecOption1 = {
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            grid: {
              left: '3%',
              right: '5%',
              bottom: '5%',
              top: '10%',
              containLabel: true
            },
            series : [
              {
                name: '医保分析-费用及支出',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                  {value:response2.data[0].YP_FY, name:'药品'},
                  {value:response2.data[0].JCZL_FY, name:'检查治疗'},
                  {value:response2.data[0].CL_FY, name:'材料'},
                  {value:response2.data[0].QT_FY, name:'其他'}
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
      //var tt=$scope.selectedSite;
    //  alert(vm.selectedSite);
    }


      var url=devUrl + 'leader/medical/ybfy/fyjzc/1/2012_2017';

      var categories = new Array();
      var data1=new Array();
      var data2=new Array();
      var data3=new Array();
      var data4=new Array();
      var data5=new Array();
      vm.list=new Array();
      //图1
      vm.ecConfig = {
        theme: 'Donut',
        dataLoaded: false
      };

      vm.ecOption = {
        color: ['#FF7445','#b446e2','#3ae632','#ffaec9','#99d9ea'],
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
        xAxis: [{
          type : 'category',
          data: categories,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          name:'费用',
          type: 'value',
          min: 0,
          max: 20000,
          axisLabel: {
            formatter: '{value} 元'
          }
        }
        ],
        series: [{
          name: '总费用',
          type: 'bar',
          data: data1
        }, {
          name: '药品',
          type: 'bar',

          data: data2
        }, {
          name: '检查治疗',
          type: 'bar',

          data: data3
        }, {
          name: '材料',
          type: 'bar',

          data: data4
        }, {
          name: '其他',
          type: 'bar',

          data: data5
        }]
      };



      $http.get(url)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          vm.list=response.data;

          vm.checkboxClick("init",true);/** 调用复选框方法初始化 **/
          vm.ecConfig.dataLoaded=true;
          $scope.selectedSite=vm.list[0].DATE_PERIOD;
          vm.selectChange1(vm.list[0].DATE_PERIOD);
        }).error(function () {
          SweetAlert.swal("网络有问题，待会再试");
        });

    /**
     * 复选框单击绑定方法
     * @param index
     * @param isChecked
     */
    vm.checkboxClick = function (index,isChecked) {
      if(index == "init"){ /**将所有复选框初始化为选中状态**/
      vm.isItem1Checked = isChecked;
        vm.isItem2Checked = isChecked;
        vm.isItem3Checked = isChecked;
        vm.isItem4Checked = isChecked;
        vm.isItem5Checked = isChecked;
        vm.isChecked = new Array();
        for(var i=0;i<vm.list.length;i++){
          vm.isChecked[i] = isChecked;
        }
      } else if(index == "item1"){
        vm.isItem1Checked = isChecked;
      } else if(index == "item2"){
        vm.isItem2Checked = isChecked;
      } else if(index == "item3"){
        vm.isItem3Checked = isChecked;
      } else if(index == "item4"){
        vm.isItem4Checked = isChecked;
      } else if(index == "item5"){
        vm.isItem5Checked = isChecked;
      } else {
        vm.isChecked[index] = isChecked;
      }
      /**清空数据**/
      categories.length = 0;
      data1.length = 0;
      data2.length = 0;
      data3.length = 0;
      data4.length = 0;
      data5.length = 0;
      /**根据勾选条件重填数据**/
      for(var i=0;i<vm.list.length;i++){
        if(vm.isChecked[i]){
          categories.push(vm.list[i].DATE_PERIOD);
          vm.selectyear=categories[0];

          if(vm.isItem1Checked) {
            data1.push(vm.list[i].CJFY);
          }
          if(vm.isItem2Checked) {
            data2.push(vm.list[i].YP_FY);
          }
          if(vm.isItem3Checked) {
            data3.push(vm.list[i].JCZL_FY);
          }
          if(vm.isItem4Checked) {
            data4.push(vm.list[i].CL_FY);
          }
          if(vm.isItem5Checked) {
            data5.push(vm.list[i].QT_FY);
          }
        }
      }
    }
  }
})();


