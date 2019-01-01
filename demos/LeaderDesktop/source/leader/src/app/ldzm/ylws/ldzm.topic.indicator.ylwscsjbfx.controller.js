/**
 * 领导桌面-医疗卫生-城市居民疾病情况分析
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('LdzmTopicIndYlwscsjbfxController', LdzmTopicIndYlwscsjbfxController);

  /** @ngInject */
  function LdzmTopicIndYlwscsjbfxController($http, devUrl,$scope,SweetAlert,latestYear) {
    var vm = this;
    vm.title = "领导桌面-医疗卫生-城市居民疾病情况分析";
    vm.breadcrumbs = [
      {title: '领导桌面', link: '/#/ldzm', icon: 'home'},
      {title: '医疗卫生', link: '', icon: 'book'},
      {title: '城市居民疾病情况分析', link: '', icon: 'file'}
    ];
    vm.yearList = new Array();//年份
    vm.yearDescList = new Array();//年份
    vm.dataList = new Array();//数据
    vm.jbList = new Array();//数据
    var csselected ={};
    vm.selectDease = '1';
    vm.showCurYear = latestYear - 1 +'年';
    vm.dataComeFrom = "湖南省统计局";
     var pieData = new Array();
     var pieNames = new Array();

    var zhuData = new Array();
    var zhuNames = new Array();


    for(var i=latestYear-5;i<latestYear;i++)
    {
         vm.yearList.push(i);
    }
    for(var i=latestYear-1;i>latestYear-6;i--)
    {
      if(i== latestYear-1+''){
        vm.yearDescList.push({value:i,checked:true});
      }
      else{
        vm.yearDescList.push({value:i,checked:false});
      }

    }

    vm.legendCheckboxClick= function (type,item) {
      if(item.checked){
        csselected[item.DESCRIPTION]=false;
        item.checked = false;
      }else{
        csselected[item.DESCRIPTION]=true;
        item.checked = true;
      }
    }

    vm.selectDeaseChange= function (item) {
      zhuData.length=0;
      zhuNames.length=0;
      var selectDeaseNo = item;
      for(var i=0;i< vm.yearList.length;i++){
        for(var j=0;j<vm.dataList.length;j++){
          if(vm.yearList[i] == vm.dataList[j].DATE_PERIOD && selectDeaseNo == vm.dataList[j].DISEASE_NO){
            zhuData.push(vm.dataList[j].DISEASE_DEATH_RATE);
          }
        }
      }
      vm.ecConfig.dataLoaded=true;
    }

    vm.clickRadio= function (item) {
       pieData.length=0;
       pieNames.length=0;
       var selectYear = item;
       vm.showCurYear= item+"年";
       for(var i=0;i<vm.dataList.length;i++){

         if(selectYear == vm.dataList[i].DATE_PERIOD){
           pieNames.push(vm.dataList[i].DESCRIPTION);
           pieData.push({value:vm.dataList[i].DISEASE_DEATH_RATE, name:vm.dataList[i].DESCRIPTION});
         }
       }
      vm.ecConfig1.event = [{legendselectchanged:onLegendSelectChanged}];
      vm.ecConfig1.dataLoaded=true;
    }


    vm.ecConfig = {
      theme: 'Donut',
      dataLoaded: false
    };
    vm.ecOption = {
      color:['#fd9f19'],
      tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
      },
      legend: {
        data:['增长率']
      },
      xAxis : [
        {
          type : 'category',
          data : vm.yearList,
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
      yAxis: [
        {
          type: 'value',
          name: '     死亡率(1/10万)',
          axisLabel: {
            formatter: '{value}',
            textStyle:{ color: '#7F7F7F' }
          },
          nameTextStyle:{
            color: '#7F7F7F'
          },
          splitLine: {
            show: true
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show:false
          }
        }],
      series : [
        {
          "name":"死亡率",
          "type":"line",
          "data":zhuData,
          symbolSize: 8,//拐点大小
          itemStyle:{
            normal : {
                  lineStyle:{
                      width:3,//折线宽度
                      color:'#4ba3d1'
                  }
              }
          }
        }
      ]
    };

    vm.ecConfig1 = {
      theme: 'Donut',
      dataLoaded: false
    };
    vm.ecOption1 = {
      color:['#394aa9','#cb64bb','#6c6fef','#3295cf','#6cb964','#e28750','#a76cef','#2863db','#00c2a9','#c0e347','#b13df3','#48b143'],
      title : {
        text: '',
        subtext: '',
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}(1/10万) ({d}%)"
      },
      legend: {
        x : 'right',
        y : 'bottom',
        orient: 'vertical',
        data: pieNames,
        selected:csselected
      },
      series : [
        {
          name: '发病率及占比',
          type: 'pie',
          radius : '55%',
          center: ['50%', '40%'],
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

    //查询疾病数据
    vm.queryData= function () {
      var url = devUrl + 'leader/medical/qryylwsswfxlist/1/'+(latestYear-5)+'_'+(latestYear-1)+'/1';
      $http.get(url)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          vm.dataList = response.data;
          sessionStorage.setItem("cacheYlwsCsjbfxDataList", JSON.stringify(vm.dataList));
          //加载图
          vm.clickRadio('2015');
          vm.selectDeaseChange(vm.selectDease);
        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });
  }
    vm.queryDeaseData= function () {
      var url = devUrl + 'common/qryJbList';
      $http.get(url)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          var result = response.data;
          for(var i=0;i<result.length;i++){
            vm.jbList.push({DESCRIPTION:result[i].DESCRIPTION,DISEASE_NO:result[i].DISEASE_NO,checked:true});
          }
          sessionStorage.setItem("cacheYlwsCsjbfxData1List", JSON.stringify(vm.jbList));

        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });
    }

    var onLegendSelectChanged=function(params){
      csselected[params.name] = params.selected[params.name];
      for(var i in vm.jbList){
        if(vm.jbList[i].DESCRIPTION==params.name){
          vm.jbList[i].checked=params.selected[params.name];
          break;
        }
      }
      $scope.$apply();//需要手动刷新
    }

    if(sessionStorage.getItem("cacheYlwsCsjbfxDataList") == null)
    {
      vm.queryData();
    }
    else{
      vm.dataList.length = 0;
      vm.dataList =  JSON.parse(sessionStorage.getItem("cacheYlwsCsjbfxDataList"));
      vm.clickRadio('2015');
      vm.selectDeaseChange(vm.selectDease);
    }

    if(sessionStorage.getItem("cacheYlwsCsjbfxData1List") == null)
    {
      vm.queryDeaseData();
    }
    else{
      vm.jbList.length = 0;
      vm.jbList =  JSON.parse(sessionStorage.getItem("cacheYlwsCsjbfxData1List"));
    }

  }
})();

