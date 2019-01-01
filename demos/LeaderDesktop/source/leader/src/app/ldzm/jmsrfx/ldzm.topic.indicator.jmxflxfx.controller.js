/**
 * 领导桌面-财政收入分析-财政支出及构成
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('LdzmTopicIndJmxflxfxController', LdzmTopicIndJmxflxfxController);

  /** @ngInject */
  function LdzmTopicIndJmxflxfxController($http, devUrl,$scope,CommService,latestYear) {
    var vm = this;
    var selectyear=null;
    var categories = new Array();
     vm.lastYear = (latestYear-1)+ '年';
    var zedata=new Array();
    var czzedata=new Array();
    var nczedata=new Array();
    vm.list=new Array();
    vm.list2=new Array(); vm.list3=new Array();vm.dataList=new Array();vm.chTypeList=new Array();vm.yearList=new Array();
    vm.datePeriodList=new Array();vm.xflxNoList=new Array();vm.dxdatePeriodList=new Array();
    vm.xflxNameList= ['食品烟酒','衣着','居住','生活用品及服务','交通通信','教育文化娱乐','医疗保健','其他']
    var xlengend  = new Array();//图一相关数据指标
    var ylengend  = new Array();
    var _ylengend  = new Array();
    var xyData  = new Array();
    var ncData  = new Array();
    var czData  = new Array();
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
      ncData.length = 0;
      czData.length = 0;
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

        var count = 0;//alert(yType);
        //alert(xlengend[0]);
        for(var k=0;k<vm.dataList.length;k++)
        {
          count = 1;//alert(vm.dataList[k].ZCZE);
          if(vm.dataList[k].CONSUME_TYPE == yType && vm.dataList[k].DATE_PERIOD ==xlengend[0]){
            if(vm.dataList[k].RESIDENT_TYPE == 1) {
              czData.push({value: vm.dataList[k].CONSUME_AMOUNT, name: yName});
            }else{
              ncData.push({value: vm.dataList[k].CONSUME_AMOUNT, name: yName});
            }
          }
        }
        if(count == 0){
          xyData.push(0);
          czData.push(0);
          ncData.push(0);
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


    vm.selectChange1 = function (selectedSite) {

      zedata.length = 0;
      czzedata.length = 0;
      nczedata.length = 0;
      var maxBar=0;
      // var ttt=vm.list3.nzzcList.length;
      for(var c=0;c<vm.dataList.length;c++)
      {
        //categories.push(vm.list3.datePeriodList[c]);

        // var name=vm.dataList[c].name;alert(name);
        if(selectedSite==vm.dataList[c].CONSUME_NAME)
        {
          if(vm.dataList[c].RESIDENT_TYPE == 1) {
            czzedata.push(vm.dataList[c].CONSUME_AMOUNT);
          }else{
            nczedata.push(vm.dataList[c].CONSUME_AMOUNT);
          }
        }

        if(vm.dataList[c].CONSUME_AMOUNT>maxBar){
          maxBar=vm.dataList[c].CONSUME_AMOUNT;
        }
      }
      //vm.ecOption.yAxis[0].max=Math.ceil(maxBar/100)*100;
      /*var url2=devUrl + 'leader/residents/jmxf/jmxfly/1/2012_2016/{lx}?lx='+selectedSite;//alert(url2);
      $http.get(url2)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          vm.list3=response.data;
          vm.dxdatePeriodList=response.timedata;

          categories.length = 0;
          zedata.length = 0;
          var maxBar=0;
          var ttt=vm.list3.length;
          for(var c=0;c<ttt;c++)
          {
            categories.push(vm.dxdatePeriodList[c]);
            zedata.push(vm.list3[c].CONSUME_AMOUNT);
            if(vm.list3[c].CONSUME_AMOUNT>maxBar){
              maxBar=vm.list3[c].CONSUME_AMOUNT;
            }
          }
          vm.ecOption.yAxis[0].max=Math.ceil(maxBar/100)*100;

        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });*/


    }

    vm.ecConfig1 = {
      theme: 'Donut',
      dataLoaded: true
    };
    vm.ecOption1 = {
      color:['#394aa9','#cb64bb','#6c6fef','#3295cf','#6cb964','#e28750','#a76cef','#2863db','#00c2a9','#c0e347','#b13df3','#48b143'],
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}元 ({d}%)"
      },
      legend: {
        orient: 'vertical',
        x: 'right',
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
          name: '居民消费类型',
          type: 'pie',
          radius : ['40%', '65%'],
         // roseType : 'radius',
          center: ['25%', '50%'],
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          data:czData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              //shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            normal: {
              label:{
                show: true,
                //	                            position:'inside',
                formatter: '{b} '
              }
            },labelLine :{show:true}
          }
        },{
          name: '居民消费类型',
          type: 'pie',
          radius : ['40%', '65%'],
         // roseType : 'radius',
          center: ['65%', '50%'],
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          data:ncData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              //shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            normal: {
              label:{
                show: true,
                //                              position:'inside',
                formatter: '{b} '
              }
            },labelLine :{show:true}
          }
        }
      ]

    };
    vm.ecConfig1.dataLoaded=true;
    var endYear=latestYear-1;
    var startYear=endYear-4;
      var url=devUrl + 'leader/residents/jmxf/jmxfly/1/'+startYear+'_'+endYear+'/{lx}';
   //图1
      vm.ecConfig = {
        theme: 'Donut',
        dataLoaded: false
      };

    vm.ecOption = {
      color: ['#137ebd','#cb64bb'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '7%',
        right: '5%',
        bottom: '5%',
        top: '15%',
        containLabel: true
      },
      legend:{
        data:["城镇", "农村"],
        y:'5'
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
        name:'数量:元',
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
      }
      ],
      series: [{
        name: '城镇',
        type: 'bar',
        data: czzedata,
        barMaxWidth:15,
        barCategoryGap : '4'
      },{
        name: '农村',
        type: 'bar',
        data: nczedata,
        barMaxWidth:15,
        barCategoryGap : '4'
      }]
    };


    vm.queryData= function () {
      CommService.getHttpJsonItem('1'+url,url,function(response){
          vm.list=response.data;
          vm.dataList=vm.list;
          //vm.checkboxClick("init",true);/** 调用复选框方法初始化 **/
          yearlength=response.timedata.length;
          zclxlength=response.xflxNameList.length;

          vm.datePeriodList=response.timedata;
          for(var i in vm.datePeriodList){
            categories.push(vm.datePeriodList[i]);
          }
          vm.xflxNoList=response.xflxNoList;
          //vm.xflxNameList=response.xflxNameList;
          for(var i=0;i<zclxlength;i++)
          {
           // vm.xflxNoList.push(vm.list.xflxNoList[i]);
            //vm.xflxNameList.push(vm.list.xflxNameList[i]);
            vm.chTypeList.push({type:vm.xflxNoList[i],name:vm.xflxNameList[i],checked:true});
            csselected[vm.xflxNameList[i]]=true;
          }
          vm.yearRadioClick(2015);
         // vm.legendCheckboxClick(12,2016);
          xlengend.length = 0;
          xlengend.push(vm.datePeriodList[0]);
          //alert(xlengend[0]);

          vm.ecConfig.dataLoaded=true;
          $scope.selectedSite=vm.xflxNameList[0];
          $scope.isChecked=vm.datePeriodList[0];//alert(vm.xflxNameList[0]);
          vm.selectChange1(vm.xflxNameList[0]);
        })
    }
    vm.queryData();
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
    //vm.queryData()


  }
})();


