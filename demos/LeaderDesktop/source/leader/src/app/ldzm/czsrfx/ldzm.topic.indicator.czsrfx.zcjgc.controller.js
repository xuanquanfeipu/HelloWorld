/**
 * 领导桌面-财政收入分析-财政支出及构成
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('LdzmTopicIndCzsrfxZcjgcController', LdzmTopicIndCzsrfxZcjgcController);

  /** @ngInject */
  function LdzmTopicIndCzsrfxZcjgcController($http, devUrl,$scope,CommService,latestYear) {
    var vm = this;
    var selectyear=null;
    var categories = new Array();
    var endYear=latestYear-1;
    var beginYear=endYear-3;
    vm.lastYear = endYear+'年';
    var zedata=new Array();
    vm.list=new Array();
    vm.list2=new Array(); vm.list3=new Array();vm.dataList=new Array();vm.chTypeList=new Array();vm.yearList=new Array();
    vm.datePeriodList=new Array();vm.zclxNameList=new Array();;vm.zclxNoList=new Array();vm.srzcTypeList=new Array();
    vm.listLx=new Array();
    var xlengend  = new Array();//图一相关数据指标
    var ylengend  = new Array();
    var _ylengend  = new Array();
    var xyData  = new Array();
    var csselected ={};
    var yearlength=null;
    var zclxlength=null;
    /**
     * 单选框（年份）单击绑定方法
     * @param year年份
     */
    vm.yearRadioClick = function (year) {
      vm.curYear=year;
      vm.lastYear = vm.curYear +'年';
      //vm.loadPieChart(year);
      xlengend.length = 0;
      xlengend.push(year);
      selectyear=year;
      vm.legendCheckboxClick(11,year);
    };
    vm.legendCheckboxClick= function (type,item) {
      //alert(type);alert(item);
      //重置

      ylengend.length = 0;_ylengend.length = 0;
      xyData.length = 0;
      var innerArray = new Array();
      //x轴
      if(type==11)
      {
        xlengend.length = 0;
        xlengend.push(item);
        selectyear=item;
      }else{
        if(item.checked){
          item.checked = false;
        }else{
          item.checked = true;
        }
      }


      //y轴
      for (var i = 0; i < vm.chTypeList.length; i++) {
        ylengend.push(vm.chTypeList[i].name);
        _ylengend.push({type:vm.chTypeList[i].type,name:vm.chTypeList[i].name});
        if (vm.chTypeList[i].checked) {
          csselected[vm.chTypeList[i].name]=true;

        }else{
          //csselected.push({vm.chTypeList[i].name:false});
          csselected[vm.chTypeList[i].name]=false;
        }
      }

      for(var i=0;i<_ylengend.length;i++)
      {
        // alert(_ylengend.length);
        var yName = _ylengend[i].name;
        var yType = _ylengend[i].type;

        var count = 0;
        for(var k=0;k<vm.dataList.length;k++)
        {
          count = 1;//alert(vm.dataList[k].ZCZE);
          if(vm.dataList[k].ZCLX == yType && vm.dataList[k].DATE_PERIOD ==xlengend[0]){

            xyData.push({value:vm.dataList[k].ZCZE,name:yName});
          }
        }
        if(count == 0){
          xyData.push(0);
        }

      }
      vm.ecConfig1.event = [{legendselectchanged:onLegendSelectChanged}];
      vm.ecConfig1.dataLoaded = true;
      vm.ecConfig.dataLoaded = true;
    }




    $scope.selectChange = function () {//alert(1);
      console.info($scope.selectedName);
      var tt=$scope.selectedName;
      //alert(tt);
    };


    vm.selectChange1 = function (item) {
      console.log(item)
      zedata.length = 0;
      var maxBar=0;
      // var ttt=vm.list3.nzzcList.length;
      for(var c=0;c<vm.dataList.length;c++)
      {

        if(vm.zclxNameList[item]==vm.dataList[c].ZCLX_NAME)
        {
          zedata.push(vm.dataList[c].ZCZE);
        }

        if(vm.dataList[c].ZCZE>maxBar){
          maxBar=vm.dataList[c].ZCZE;
        }


      }


    }

    vm.ecConfig1 = {
      theme: 'Donut',
      dataLoaded: true
    };
    vm.ecOption1 = {
      color:['#394aa9','#cb64bb','#6c6fef','#3295cf','#6cb964','#e28750','#a76cef','#2863db','#00c2a9','#c0e347','#b13df3','#48b143'],
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}万元 ({d}%)"
      },
      legend: {
        right : 20,
        itemGap:5,
        y : 'center',
        align: 'right',
        orient: 'vertical',
        data:ylengend,
        selected:csselected
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
          name: '财政支出构成',
          type: 'pie',
          roseType : 'radius',
          radius : [20, 110],
          center : ['38%', '50%'],
          //roseType : 'area',
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: true
            }
          },
          lableLine: {
            normal: {
              show: true
            },
            emphasis: {
              show: true
            }
          },
          data:xyData,
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
    var url='leader/govfinance/expenditure?dns=1&yf='+beginYear+'&yt='+endYear;
    //图1
    vm.ecConfig = {
      theme: 'Donut',
      dataLoaded: false
    };

    vm.ecOption = {
      color: ['#5650bd'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '0',
        right: '5%',
        bottom: '5%',
        top: '15%',
        containLabel: true
      },
      xAxis: [{
        data:categories ,
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
        name:'数量:万元',
        type: 'value',
        min: 0,
        axisLabel: {
          formatter: '{value}',
          textStyle:{ color: '#7F7F7F' }
        },
        nameTextStyle:{
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
        }
      }],
      series: [{
        name: '支出总额',
        type: 'bar',
        data: zedata,
        barWidth: 22,
        barCategoryGap : '4'
      }]
    };


    vm.queryData= function () {
      CommService.getHttpJsonItem(url,devUrl+url,function(response){
          vm.list=response.data;
          vm.dataList1=vm.list.zcList;
          //vm.checkboxClick("init",true);/** 调用复选框方法初始化 **/
          yearlength=vm.list.datePeriodList.length;
          zclxlength=vm.list.zclxNameList.length;
          // for(var i in vm.list.datePeriodList){
          //   for(var j in vm.list.zcList){
          //     if(vm.list.zcList[j].datePeriod == vm.list.datePeriodList[i])
          //   }
          // }
          vm.dataList1.sort(function(a,b){
            return b.ZCZE - a.ZCZE;
          });
          var n;
          var qt;
          for(var i in vm.list.datePeriodList){
            n = 1
            qt = 0;
            for(var j in vm.dataList1){
              if(vm.list.datePeriodList[i] == vm.dataList1[j].DATE_PERIOD){
                if(n<12){
                  vm.dataList.push(vm.dataList1[j])
                }else {
                  qt+=vm.dataList1[j].ZCZE;
                }
                n++
              }
            }
            vm.dataList.push({DATE_PERIOD:vm.list.datePeriodList[i],ZCZE:qt,ZCLX:99,ZCLX_NAME:'其他'})
          }
          for(var i in vm.dataList){
            if(vm.dataList[i].DATE_PERIOD == endYear){
              vm.listLx.push(vm.dataList[i])
            }
          }
          console.log(vm.listLx)
          for(var i=0;i<yearlength;i++)
          {
            vm.datePeriodList.push(vm.list.datePeriodList[i]);
            categories.push(vm.list.datePeriodList[i]);
          }
          for(var i=0;i<vm.listLx.length;i++)
          {
            vm.zclxNoList.push(vm.list.zclxNoList[i]);
            vm.zclxNameList.push(vm.listLx[i].ZCLX_NAME);
            vm.chTypeList.push({type:vm.listLx[i].ZCLX,name:vm.listLx[i].ZCLX_NAME,checked:true});
            vm.srzcTypeList.push({type:i,name:vm.listLx[i].ZCLX_NAME,checked:true});

            csselected[vm.list.zclxNameList[i]]=true;
          }
          console.log(vm.dataList)
          console.log(vm.chTypeList)
          console.log(vm.srzcTypeList)
          vm.yearRadioClick(endYear);

          xlengend.length = 0;
          xlengend.push(vm.list.datePeriodList[0]);

          vm.selectChange1('0');
          vm.ecConfig.dataLoaded=true;
          $scope.selectedSite='0';
          $scope.isChecked=vm.list.datePeriodList[0];

        })
    }
    var onLegendSelectChanged=function(params){
      csselected[params.name] = params.selected[params.name];
      for(var i in vm.chTypeList){
        if(vm.chTypeList[i].name==params.name){
          vm.chTypeList[i].checked=params.selected[params.name];
          break;
        }
      }
      $scope.$apply();//需要手动刷新
    }

    vm.queryData()

  }
})();


