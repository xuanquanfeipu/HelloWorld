/**
 * 领导桌面-财政收入分析-财政支出及构成
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('LdzmTopicIndJmsrlyfxController', LdzmTopicIndJmsrlyfxController);

  /** @ngInject */
  function LdzmTopicIndJmsrlyfxController($http, devUrl,$scope,CommService,latestYear) {
    var vm = this;
    var selectyear=null;
    var categories = new Array();
    vm.lastYear =(latestYear-1)+ '年';
    var zedata=new Array();
    vm.list=new Array();
    vm.list1=new Array();
    vm.list2=new Array(); vm.list3=new Array();vm.dataList=new Array();vm.chTypeList=new Array();vm.yearList=new Array();
    vm.eduTypeList=new Array();
    var xlengend  = new Array();//图一相关数据指标
    var ylengend  = new Array();
    var _ylengend  = new Array();
    var xyData  = new Array();
    var czData  = new Array();
    var ncData  = new Array();
    var nczedata  = new Array();
    var csselected ={};
    var yearlength=null;
    var zclxlength=null;
    vm.eduTypeList.push({type:0,name:'工资性收入',checked:true,color:'#394aa9'});
    vm.eduTypeList.push({type:1,name:'经营净收入',checked:true,color:'#cb64bb'});
    vm.eduTypeList.push({type:3,name:'转移净收入',checked:true,color:'#3295cf'});
    vm.eduTypeList.push({type:2,name:'财产净收入',checked:true,color:'#6c6fef'});

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
      czData.length = 0;
      ncData.length = 0;
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
      for (var i = 0; i < vm.eduTypeList.length; i++) {
        ylengend.push(vm.eduTypeList[i].name);
        _ylengend.push({type:vm.eduTypeList[i].type,name:vm.eduTypeList[i].name,color:vm.eduTypeList[i].color});
        if (vm.eduTypeList[i].checked) {
          csselected[vm.eduTypeList[i].name]=true;

        }else{
          csselected[vm.eduTypeList[i].name]=false;
        }
      }
      //数据
      for(var i=0;i<_ylengend.length;i++){
        var yName = _ylengend[i].name;
        var yType = _ylengend[i].type;
        var color = _ylengend[i].color;//alert(color[i]);
        var innerArray = new Array();
        var innerZZLArray = new Array();
        for(var j=0;j<xlengend.length;j++){
          var xValue = xlengend[j];
          var count = 0;
          for(var k=0;k<vm.dataList.length;k++)
          {
            count = 1;
            if(vm.dataList[k].type == yType && vm.dataList[k].year ==xValue ){
              //innerArray.push(vm.dataList[k].num);
              if(vm.dataList[k].lb == 1) {
                czData.push({value: vm.dataList[k].num, name: yName});
              }else{
                ncData.push({value: vm.dataList[k].num, name: yName});
              }
            }
          }
          if(count == 0){
            innerArray.push(0);
          }
        }
        // xyData.push({name:yName,type:'bar',itemStyle: {normal: {areaStyle: {type: 'default'},color: color}},data:innerArray});
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
    vm.switchBarChart = function(index){
      chartSeries[0].data = vm.dataList[index].JJZL;
      chartSeries[1].data = vm.dataList[index].ZZL;
     // vm.ecOption.yAxis[0].max=Math.max.apply(null, vm.dataList[index].JJZL);
      //vm.ecOption.yAxis[1].max=Math.max.apply(null, vm.dataList[index].ZZL);
    }
    vm.selectChange1 = function (selectedSite) {
      //alert(selectedSite);
      //vm.ecConfig.dataLoaded=true;
      /**清空数据**/
      //categories.length = 0;
      zedata.length = 0;
      nczedata.length = 0;
      var maxBar=0;
      // var ttt=vm.list3.nzzcList.length;
      for(var c=0;c<vm.dataList.length;c++)
      {
        //categories.push(vm.list3.datePeriodList[c]);

        // var name=vm.dataList[c].name;alert(name);
        if(selectedSite==vm.dataList[c].type)
        {
          if(vm.dataList[c].lb == 1) {
            zedata.push(vm.dataList[c].num);
          }else {
            nczedata.push(vm.dataList[c].num);
          }
        }

        if(vm.dataList[c].num>maxBar){
          maxBar=vm.dataList[c].num;
        }
      }
    //  vm.ecOption.yAxis[0].max=Math.ceil(maxBar/100)*100;

      vm.ecConfig.dataLoaded = true;
    }

    vm.ecConfig1 = {
      theme: 'Donut',
      dataLoaded: true
    };
    vm.ecOption1 = {
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}元({d}%)"
      },
      color:['#394aa9','#cb64bb','#6c6fef','#3295cf','#6cb964'],
      legend: {
        orient: 'vertical',
        x: 'right',
        data:["工资性收入", "经营净收入", "转移净收入", "财产净收入"],
        selected:csselected
      },
      grid: {
        left: '3%',
        right: '5%',
        bottom: '5%',
        top: '15%',
        containLabel: true
      },
      series : [
        {
          name: '居民收入分析',
          type: 'pie',
          radius : ['40%', '65%'],
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
            normal: {
              label:{
                show: true,
                //	                            position:'inside',
                formatter: '{b} '
              }
            },
            labelLine :{show:true}
          }
        },{
          name: '居民收入分析',
          type: 'pie',
          radius : ['40%', '65%'],
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
            normal: {
              label:{
                show: true,
                //                              position:'inside',
                formatter: '{b} '
              }
            },
            labelLine :{show:true}
          }
        }
      ]

    };
    vm.ecConfig1.dataLoaded=true;
    var endYear=latestYear-1;
    var startYear=endYear-4;
    var url=devUrl + 'leader/residents/jmsr/jmsrly/1/'+startYear+'_'+endYear;
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
        },
        //formatter: "城镇{c}:农村{c}元"
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
        data: zedata,
        barMaxWidth:15,
        barCategoryGap : '4'
      },
        {
          name: '农村',
          type: 'bar',
          data: nczedata,
          barMaxWidth:15,
          barCategoryGap : '4'
        }]
    };


    vm.queryData= function () {
      CommService.getHttpJsonItem('1'+url,url,function(response){
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          vm.list=response.nc;
          vm.list1=response.cz;
          var lg= vm.list.length;//alert(lg);
          for(var k=0;k<lg;k++)
          {
            vm.yearList.push(vm.list[k].DATE_PERIOD);
//alert(vm.list[k].DATE_PERIOD);
            //nianfenfuzhi
          }//alert(vm.yearList.length);
          for(var k=0;k<vm.yearList.length;k++){
            categories.push(vm.yearList[k]);
          }
          for(var i=0;i<vm.list.length;i++){
            vm.dataList.push({type:0,num:vm.list[i].WAGE_INCOME,year:vm.list[i].DATE_PERIOD,lb:vm.list[i].RESIDENT_TYPE});
            vm.dataList.push({type:1,num:vm.list[i].NET_OPERATING_INCOME,year:vm.list[i].DATE_PERIOD,lb:vm.list[i].RESIDENT_TYPE});
            vm.dataList.push({type:2,num:vm.list[i].NET_PROPERTY_INCOME,year:vm.list[i].DATE_PERIOD,lb:vm.list[i].RESIDENT_TYPE});
            vm.dataList.push({type:3,num:vm.list[i].NET_TRANSFER_INCOME,year:vm.list[i].DATE_PERIOD,lb:vm.list[i].RESIDENT_TYPE});

            vm.dataList.push({type:0,num:vm.list1[i].WAGE_INCOME,year:vm.list1[i].DATE_PERIOD,lb:vm.list1[i].RESIDENT_TYPE});
            vm.dataList.push({type:1,num:vm.list1[i].NET_OPERATING_INCOME,year:vm.list1[i].DATE_PERIOD,lb:vm.list1[i].RESIDENT_TYPE});
            vm.dataList.push({type:2,num:vm.list1[i].NET_PROPERTY_INCOME,year:vm.list1[i].DATE_PERIOD,lb:vm.list1[i].RESIDENT_TYPE});
            vm.dataList.push({type:3,num:vm.list1[i].NET_TRANSFER_INCOME,year:vm.list1[i].DATE_PERIOD,lb:vm.list1[i].RESIDENT_TYPE});
          }

          yearlength=vm.yearList.length;
          zclxlength=vm.eduTypeList.length;
          for(var i=0;i<zclxlength;i++)
          {
            //vm.chTypeList.push({type:vm.list.zclxNoList[i],name:vm.list.zclxNameList[i],checked:true});
            csselected[vm.eduTypeList[i].name]=true;
          }
          vm.yearRadioClick(endYear);
         // vm.legendCheckboxClick(11,2016);

          xlengend.length = 0;
          xlengend.push(vm.yearList[0]);
          //alert(xlengend[0]);

          vm.ecConfig.dataLoaded=true;
          // $scope.selectedSite='地方税收收入总额';
          $scope.isChecked=vm.yearList[0];
          vm.selectChange1(0);
        })
    }
    vm.queryData()
    var onLegendSelectChanged=function(params){
      csselected[params.name] = params.selected[params.name];
      for(var i in vm.eduTypeList){
        if(vm.eduTypeList[i].name==params.name){
          vm.eduTypeList[i].checked=params.selected[params.name];
          break;
        }
      }
      $scope.$apply();//需要手动刷新
    }
    //vm.queryData();

    /**
     * 复选框单击绑定方法
     * @param index
     * @param isChecked
     */
    vm.checkboxClick = function (index,isChecked) {//alert(666);alert(index);alert(isChecked);
      var tt=vm.list.nzzcList.length;

      if(index == "init"){

        vm.isChecked = new Array();

        vm.isChecked[0] = true;

      }else {
        vm.isChecked[index] = true;
      }

      /**根据勾选条件重填数据**/
      for(var i=0;i<tt;i++){//alert(i);
        if(vm.isChecked[i]){
          //开始绘制第一幅图片


          var url2=devUrl + 'leader/govfinance/expenditure?dns=1&yf='+vm.list.datePeriodList[i]+'&yt='+vm.list.datePeriodList[i];
          $http.get(url2)
            .success(function (response2) {
              if (angular.isUndefined(response2)) {
                SweetAlert.swal("没有查到相关数据");
              }
              vm.list2=response2.data;


            }).error(function () {
            SweetAlert.swal("网络有问题，待会再试");
          });


        }
      }


    }
  }
})();


