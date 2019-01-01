/**
 * 领导桌面-人才供需-就业分析
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('LdzmTopicIndRcgxjyfxController', LdzmTopicIndRcgxjyfxController);

  /** @ngInject */
  function LdzmTopicIndRcgxjyfxController($http, devUrl,$scope,SweetAlert) {
    var vm = this;
    var selectyear=null;
    $scope.selectChange = function () {
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
      var url1=devUrl + 'leader/employment/employmentanalysis/1/'+selectyear+'_'+selectyear+'/2';
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
                name: selectyear+'年就业人数占比',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                  {value:response2.data[0].JYRS, name:'本科'},
                  {value:response2.data[1].JYRS, name:'硕士'},
                  {value:response2.data[2].JYRS, name:'博士'},
                  {value:response2.data[3].JYRS, name:'其他'},
                  {value:response2.data[4].JYRS, name:'小学'},
                  {value:response2.data[5].JYRS, name:'初中'},
                  {value:response2.data[6].JYRS, name:'高中'},
                  {value:response2.data[7].JYRS, name:'专科'}
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
    vm.title = "领导桌面-人才供需-就业分析";
    vm.breadcrumbs = [
      {title: '领导桌面', link: '/#/ldzm', icon: 'home'},
      {title: '人才供需', link: '/#/ldzm/topic/indicator/cjfy', icon: 'book'},
      {title: '就业分析', link: '/#/ldzm/topic/indicator/rcgxjyfx', icon: 'file'}
    ];

      var url=devUrl + 'leader/employment/employmentanalysis/1/2004_2017/1';

      var categories = new Array();
      var data1=new Array();
      var data2=new Array();
      var data3=new Array();

      vm.list=new Array();
      vm.list=new Array();vm.yearlist=new Array();
    vm.list1=new Array(); vm.list2=new Array(); vm.list3=new Array();

    //图1
      vm.ecConfig = {
        theme: 'Donut',
        dataLoaded: false
      };

      vm.ecOption = {
        color: ['#FF7445','#b446e2','#3ae632','#ffaec9','#99d9ea'],
        tooltip: {
          trigger: 'axis'
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
          name:'人数',
          type: 'value',
          min: 0,
          max: 550000,
          axisLabel: {
            formatter: '{value} 人'
          }
        }
        ],
        series: [{
          name: '20-22岁就业人数',
          type: 'bar',
          data: data1
        }, {
          name: '22-25岁就业人数',
          type: 'bar',
          data: data2
        }, {
          name: '25-30岁就业人数',
          type: 'bar',
          data: data3
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
          $scope.selectedSite=vm.list[0].DATE_PERIOD;//alert(vm.list[0].DATE_PERIOD);
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
      }  else {
        vm.isChecked[index] = isChecked;
      }
     // alert(index);
      /**清空数据**/
      categories.length = 0;
      data1.length = 0;
      data2.length = 0;
      data3.length = 0;
      /**根据勾选条件重填数据**/
      for(var i=0;i<vm.list.length;i++){
        vm.selectyear=categories[0];
        // if(vm.isChecked[i%3]){
        if(i%3==0)
        {
          vm.yearlist.push(vm.list[i].DATE_PERIOD);
          // categories.push(vm.list[i].DATE_PERIOD);
        }
        if(vm.list[i].AGE_GROUP_NO=='1')
        {
          vm.list1.push(vm.list[i].JYRS);
        }

        if(vm.list[i].AGE_GROUP_NO=='2')
        {
          vm.list2.push(vm.list[i].JYRS);
        }
        if(vm.list[i].AGE_GROUP_NO=='3')
        {
          vm.list3.push(vm.list[i].JYRS);
        }


//暂时不进行疾病的复选框操作，这里复选框有些不合逻辑
        //}
      }
      for(var j=0;j<vm.list.length/3;j++) {
        if (vm.isChecked[j])
          {
            categories.push( vm.yearlist[j]);
            if(vm.isItem1Checked) {
              data1.push(vm.list1[j]);
            }
            if(vm.isItem2Checked) {
              data2.push(vm.list2[j]);
            }
            if(vm.isItem3Checked) {
              data3.push(vm.list3[j]);
            }
          }
      }

    }
  }
})();


