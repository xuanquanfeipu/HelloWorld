/**
 * 领导桌面-医疗卫生-城市居民疾病情况分析
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('LdzmTopicIndJyfxhyfxController', LdzmTopicIndJyfxhyfxController);

  /** @ngInject */
  function LdzmTopicIndJyfxhyfxController($http, devUrl,$scope,SweetAlert,latestYear) {
    var vm = this;
    vm.yearList = new Array();//年份
    vm.yearDescList = new Array();//年份
    vm.dataList = new Array();//数据
    vm.jbList = new Array();//数据

    vm.selectDease = '7';
    var maxrs=0;
    var maxzzl=0;var minzzl=0;
    var pieData = new Array();
    var pieNames = new Array();

    var zhuData = new Array();
    var zhuData1 = new Array();

    var zhuNames = new Array();
    var csselected ={};

	var year_num=4;
    var myDate = new Date();
    var year = latestYear-1;
    var endDate=latestYear-1;
    var beginDate=endDate-year_num+1;vm.cyear=endDate;

    for(var i=beginDate;i<=endDate;i++)
    {
      vm.yearList.push(i);
    }
    for(var i=beginDate;i<=endDate;i++)
    {
      if(i== endDate){
        vm.yearDescList.push({value:i,checked:true});
      }
      else{
        vm.yearDescList.push({value:i,checked:false});
      }

    }

    vm.legendCheckboxClick= function (type,item) {
      if(item.checked){
        csselected[item.INDUSTRY_CATEGORY_NAME]=false;
        item.checked = false;
      }else{
        csselected[item.INDUSTRY_CATEGORY_NAME]=true;
        item.checked = true;
      }
    }
    vm.selectDeaseChange= function (item) {
      zhuData.length=0;
      zhuNames.length=0;
      zhuData1.length=0;

      var selectDeaseNo = item;
      for(var i=0;i< vm.yearList.length;i++){
        for(var j=0;j<vm.dataList.length;j++){
          if(vm.yearList[i] == vm.dataList[j].DATE_PERIOD && selectDeaseNo == vm.dataList[j].INDUSTRY_CATEGORY_NO){
            zhuData.push(vm.dataList[j].JYRS);
            zhuData1.push(vm.dataList[j].JYRS_ZZL);
            if (vm.dataList[j].JYRS > maxrs) {
              maxrs = vm.dataList[j].JYRS;
            }
            if (vm.dataList[j].JYRS_ZZL > maxzzl) {
              maxzzl = vm.dataList[j].JYRS_ZZL;
            }
            if (vm.dataList[j].JYRS_ZZL < minzzl) {
              minzzl = vm.dataList[j].JYRS_ZZL;
            }
          }
        }
      }//alert(maxrs);
      //alert(maxzzl);alert(minzzl);
      vm.ecConfig.dataLoaded=true;
    }

    vm.clickRadio= function (item) {
      pieData.length=0;
      pieNames.length=0;
      var selectYear = item;
      for(var i=0;i<vm.dataList.length;i++){
        if(selectYear == vm.dataList[i].DATE_PERIOD){
          pieNames.push(vm.dataList[i].INDUSTRY_CATEGORY_NAME);
          pieData.push({value:vm.dataList[i].JYRS, name:vm.dataList[i].INDUSTRY_CATEGORY_NAME});
        }
      }
      vm.hyyear=selectYear;
      vm.ecConfig1.event = [{legendselectchanged:onLegendSelectChanged}];
      vm.ecConfig1.dataLoaded=true;
    }

    vm.ecConfig = {
      theme: 'Donut',
      dataLoaded: false
    };
    vm.ecOption = {
      tooltip: {
        show: true,
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data:['从业人数','从业增长率'],
        y:'28'
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
              color:'#7F7F7F'
            }
          },
          axisLabel: {textStyle:{ color: '#7F7F7F' }}
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '单位:万人',
          min: 0,
          max: 1800,
          axisLabel: {
            formatter: '{value}',
            textStyle:{ color: '#7F7F7F' }
          },
          nameTextStyle:{
            color: '#7F7F7F'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show:false
          }
        },{
          type: 'value',
          name: '增长率（%）',
          min: -55,
          max: 55,
          axisLabel: {
            formatter: '{value}',
            textStyle:{ color: '#7F7F7F' }
          },
          nameTextStyle:{
            color: '#7F7F7F'
          },
          axisTick: {
            show:false
          },
          splitLine:{
            show:false
          },
          axisLine: {
            show: false
          }
        }],
      series : [
        {
          "name":"从业人数",
          "type":"bar",
          barMaxWidth:20,
          "itemStyle": {"normal": {"color": '#137ebd'}},
          "data":zhuData
        },
        {
          "name":"从业增长率",
          "type":"line",
          "yAxisIndex": 1,
          "itemStyle": {"normal": {"color": '#ff9f17',"lineStyle":{"color":'#ff9f17'}}},
          "data":zhuData1
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
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        x : 'left',
        y : 'bottom',
        orient: 'horizontal',
        data: pieNames,
        selected:csselected
      },
      series : [
        {
          name: '年末从业人数占比',
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
      var url = devUrl + 'leader/employment/industryjob/1/0/'+beginDate+'_'+endDate+'?districtNo=1';//这个接口被人修改了，导致有问题
      $http.get(url)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          vm.dataList = response.data;
          sessionStorage.setItem("cacheJyfxhyfxDataList", JSON.stringify(vm.dataList));
          //加载图
          vm.clickRadio(endDate);vm.hyyear=endDate;
          vm.selectDeaseChange(vm.selectDease);
        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });
    }
    vm.queryDeaseData= function () {
      var url = devUrl + 'leader/employment/industryjob/1/0/'+endDate+'_'+endDate+'?districtNo=1';
      $http.get(url)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          var result = response.data;
          for(var i=0;i<result.length;i++){
            vm.jbList.push({INDUSTRY_CATEGORY_NAME:result[i].INDUSTRY_CATEGORY_NAME,INDUSTRY_CATEGORY_NO:result[i].INDUSTRY_CATEGORY_NO,checked:true});
          }

          sessionStorage.setItem("cacheJyfxhyfxData1List", JSON.stringify(vm.jbList));
        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });
    }

    var onLegendSelectChanged=function(params){
      csselected[params.name] = params.selected[params.name];
      for(var i in vm.jbList){
        if(vm.jbList[i].INDUSTRY_CATEGORY_NAME==params.name){
          vm.jbList[i].checked=params.selected[params.name];
          break;
        }
      }
      $scope.$apply();//需要手动刷新
    }

    if(sessionStorage.getItem("cacheJyfxhyfxDataList") == null)
    {
      vm.queryData();
    }
    else{
      vm.dataList.length = 0;
      vm.dataList =  JSON.parse(sessionStorage.getItem("cacheJyfxhyfxDataList"));
      vm.clickRadio(endDate);vm.hyyear=endDate;
      vm.selectDeaseChange(vm.selectDease);
    }

    if(sessionStorage.getItem("cacheJyfxhyfxData1List") == null)
    {
      vm.queryDeaseData();
    }
    else{
      vm.jbList.length = 0;
      vm.jbList =  JSON.parse(sessionStorage.getItem("cacheJyfxhyfxData1List"));
    }


  }
})();


