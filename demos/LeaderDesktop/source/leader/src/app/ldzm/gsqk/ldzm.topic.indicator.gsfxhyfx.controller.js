/**
 * 领导桌面-工伤情况-行业分析
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('LdzmTopicIndGsfxhyfxController', LdzmTopicIndGsfxhyfxController);

  /** @ngInject */
  function LdzmTopicIndGsfxhyfxController($http, devUrl,SweetAlert) {
    var vm = this;

    vm.title = "领导桌面-工伤情况-行业分析";
    vm.breadcrumbs = [
      {title: '领导桌面', link: '/#/ldzm', icon: 'home'},
      {title: '工伤情况', link: '/#/ldzm/content', icon: 'book'},
      {title: '行业分析', link: '/#/ldzm/content/detail', icon: 'file'}
    ];

      var url=devUrl + 'leader/edu/qryhygsswllist/1/2014_2016';
      var categories = new Array();
      var data1=new Array();
      var data2=new Array();
      vm.list=new Array();
      vm.list1=new Array();
      vm.result1=new Array();
      //图1
      vm.ecConfig = {
        theme: 'Donut',
        dataLoaded: false
      };

    var years = ['2014', '2015','2016'];
    var industrys = new Array();

    var data = new Array();


      var chartx = function(_vm){
        _vm.ecOption = {
          title: {
            text: '不同行业工伤情况分析',
            link: ''
          },
          legend: {
            data: ['工伤死亡率（%）'],
            left: 'right'
          },
          tooltip: {
            position: 'top',
            formatter: function (params) {
              return  years[params.value[0]]+ '年'+industrys[params.value[1]]+'工伤死亡率 ' +  ': ' + params.value[2]+'% ';
            }
          },
          grid: {
            left: 2,
            bottom: 10,
            right: 10,
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: years,
            boundaryGap: true,
            splitLine: {
              show: true,
              lineStyle: {
                color: '#999',
                type: 'dashed'
              }
            },
            axisLine: {
              show: true
            }
          },
          yAxis: {
            type: 'category',
            data: industrys,
            axisLine: {
              show: true
            }
          },
          series: [{
            name: '工伤死亡率（%）',
            type: 'scatter',
            symbolSize: function (val) {
              return val[2] * 1.3;
            },
            data: data,
            animationDelay: function (idx) {
              return idx * 5;
            }
          }]
        };
      }
    chartx(vm);

      $http.get(url)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          vm.list=response.data;
          vm.list1=response.data1;
          vm.checkboxClick("init","init",true);/** 调用复选框方法初始化 **/
          vm.ecConfig.dataLoaded=true;

          //vm.ecConfig1.dataLoaded=true;
        }).error(function () {
          SweetAlert.swal("网络有问题，待会再试");
        });


    /**
     * 复选框单击绑定方法
     * @param index
     * @param isChecked
     */
    vm.checkboxClick = function (index,item,isChecked) {
      vm.result1.length=0;
      vm.result1.push(2014);
      vm.result1.push(2015);
      vm.result1.push(2016);
      if(item == "init"){ /**将所有复选框初始化为选中状态**/
        //vm.isItem1Checked = isChecked;
        vm.isItem1Checked = new Array();
        vm.isChecked = new Array();
        industrys.length = 0;
        years.length = 0;
        years.push('2014');
        years.push('2015');
        years.push('2016');
        vm.isChecked[0] = isChecked;
        vm.isChecked[1] = isChecked;
        vm.isChecked[2] = isChecked;
        for(var i=0;i<vm.list1.length;i++){
            vm.isItem1Checked[i] = isChecked;
            industrys.push(vm.list1[i].INDUSTRY_CATEGORY_NAME);
            var rate2014 = vm.list1[i].YEARRATE2014;
            var rate2015 = vm.list1[i].YEARRATE2015;
            var rate2016 = vm.list1[i].YEARRATE2016;
            var a2014 = new Array(0,i,rate2014);
            var a2015 = new Array(1,i,rate2015);
            var a2016 = new Array(2,i,rate2016);
            data.push(a2014);
            data.push(a2015);
            data.push(a2016);
        }

        data = data.map(function (item) {
          return [item[1], item[0], item[2]];
        });
      } else if(item == "item1"){
        //industrys.length = 0;
        vm.isItem1Checked[index] = isChecked;
        /*for(var i=0;i<vm.list1.length;i++){
          if(vm.isItem1Checked[i]){
            industrys.push(vm.list1[i].INDUSTRY_CATEGORY_NAME);
          }
        }*/
      } else  if(item == "item"){
        //years.length = 0;
        vm.isChecked[index] = isChecked;
        /*for(var i=0;i<vm.result1.length;i++){
          if(vm.isChecked[i]){
            years.push(2014+i);
          }
        }*/
      }

      if(item == "item1" || item == "item") {
        data.length=0;
        for(var i=0;i<vm.list1.length;i++){
          var rate2014 = vm.list1[i].YEARRATE2014;
          var rate2015 = vm.list1[i].YEARRATE2015;
          var rate2016 = vm.list1[i].YEARRATE2016;
          if(vm.isChecked[0])
          {
            if(vm.isItem1Checked[i])
            {
              var a2014 = new Array(0,i,rate2014);
              data.push(a2014);
            }

          }
          if(vm.isChecked[1])
          {
            if(vm.isItem1Checked[i]) {
              var a2015 = new Array(1, i, rate2015);
              data.push(a2015);
            }
          }
          if(vm.isChecked[2])
          {
            if(vm.isItem1Checked[i]) {
              var a2016 = new Array(2, i, rate2016);
              data.push(a2016);
            }
          }
        }
        data = data.map(function (item) {
          return [item[0], item[1], item[2]];
        });
        chartx(vm);
      }

    }
  }
})();


