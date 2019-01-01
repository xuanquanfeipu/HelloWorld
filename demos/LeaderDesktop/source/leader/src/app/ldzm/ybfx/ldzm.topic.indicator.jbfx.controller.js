/**
 * 领导桌面-医保分析-
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('LdzmTopicIndJbfxController', LdzmTopicIndJbfxController);

  /** @ngInject */
  function LdzmTopicIndJbfxController($http, devUrl,$scope) {
    var vm = this;
    var selectyear=null;
    vm.curYear=2015;
    vm.list=new Array();vm.yearlist=new Array();
    vm.jblxNoList=new Array(); vm.jblxNameList=new Array(); vm.dataList=new Array();vm.chTypeList=new Array();vm.list3=new Array();vm.list6=new Array();
    var xlengend  = new Array();//图一相关数据指标
    var ylengend  = new Array();
    var _ylengend  = new Array();
    var xyData  = new Array();
    var csselected ={};
    var yearlength=null;
    var jblxlength=null;
    var url=devUrl + 'leader/medical/ybjbfy/1/2012_2017/1';


    /**
     * 单选框（年份）单击绑定方法
     * @param year年份
     */
    vm.yearRadioClick = function (year) {
      vm.curYear=year;
      //vm.loadPieChart(year);
      xlengend.length = 0;
      xlengend.push(year);
      selectyear=year;
      vm.legendCheckboxClick(11,year);
    };
    vm.legendCheckboxClick= function (type,item) {
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
      for (var i = 0; i < vm.chTypeList.length; i++)
      {
        ylengend.push(vm.chTypeList[i].name);
        _ylengend.push({type:vm.chTypeList[i].type,name:vm.chTypeList[i].name});
        if (vm.chTypeList[i].checked)
        {
          csselected[vm.chTypeList[i].name]=true;
        }else{
          csselected[vm.chTypeList[i].name]=false;
        }
      }

      for(var i=0;i<_ylengend.length;i++)
      {
        var yName = _ylengend[i].name;
        var yType = _ylengend[i].type;
        var count = 0;
        for(var k=0;k<vm.list.length;k++)
        {
          count = 1;//alert(vm.dataList[k].ZCZE);
          if(vm.list[k].DISEASE_NO == yType && vm.list[k].DATE_PERIOD ==xlengend[0])
          {
            xyData.push({value:vm.list[k].JB_YB_FY,name:yName});
          }
        }
        if(count == 0)
        {
          xyData.push(0);
        }

      }
      vm.ecConfig1.event = [{legendselectchanged:onLegendSelectChanged}];
      vm.ecConfig1.dataLoaded = true;
     // vm.ecConfig1.dataLoaded=true;

      var url2=devUrl + 'leader/medical/ybjbfy/1/'+selectyear+'_'+selectyear+'/2';
      $http.get(url2)
        .success(function (response3) {
          if (angular.isUndefined(response3)) {
            SweetAlert.swal("没有查到相关数据");
          }
          vm.list3=response3.data;
          var jibinglx=vm.list3.length;

          var jbnamelist=new Array();
          var xyData  = new Array();
          var fylist  = new Array();
          var barlist  = new Array();var maxBar=0;
          for(var i=0;i<vm.list3.length;i++)
          {
            jbnamelist.push(vm.list3[i].DESCRIPTION);
            xyData.push({value:vm.list3[i].JB_YB_FY,name:vm.list3[i].DESCRIPTION});
            fylist.push(vm.list3[i].JB_YB_FY);
            if(vm.list3[i].JB_YB_FY>maxBar){
              maxBar=vm.list3[i].JB_YB_FY;
            }
          }

          for(var i=0;i<vm.list3.length;i++)
          {
            barlist.push(maxBar);
          }

          vm.ecConfig4 = {
            theme: 'Donut',
            dataLoaded: false
          };
          vm.ecOption4 = {

            color: ['#0C6BD9'],
            calculable: true,
            grid: {
              left: 100,
              right:100,
              top:10,
              bottom:10
            },
            xAxis: [{
              type: "value",
              boundaryGap: [0, 0],
              show: false,
              axisLine: {
                show: false
              },
              splitLine: {
                show: false
              },
              axisTick: {
                show: false
              }

            }],
            yAxis: [{
              type: "category",
              inverse:true,
              data: jbnamelist,
              offset:5,
              axisLine: {
                show: false
              },
              splitLine: {
                show: false
              },
              axisTick: {
                show: false
              }
            }
            ],
            series: [
              {
                type: "bar",
                silent: true,
                itemStyle: {
                  normal: {
                    color: '#f5f5f5'
                  }
                },
                //barWidth: 22,
                barGap: '-100%',
                data: barlist
              }

              ,{
                name: "费用",
                type: "bar",
                label: {
                  normal: {
                    formatter: '{c}万元',
                    position: ['210', '0'],
                    show: true
                  }
                },
                //barWidth: 22,
                barMaxHeight:220,
                barCategoryGap:'50%',
                z: 10,
                tooltip:{
                  show:false
                },
                data: fylist
              }
            ]

          };
          vm.ecConfig4.dataLoaded=true;


        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });
    }

    vm.queryData= function () {
      $http.get(url)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          vm.list=response.data;
          vm.yearlist=response.timedata;
          vm.jblxNoList=response.jblxNoList;
          vm.jblxNameList=response.jblxNameList;

          sessionStorage.setItem("ybjbfxDataList1", JSON.stringify(vm.list));
          sessionStorage.setItem("ybjbfxDataList2", JSON.stringify(vm.yearlist));
          sessionStorage.setItem("ybjbfxDataList3", JSON.stringify(vm.jblxNoList));
          sessionStorage.setItem("ybjbfxDataList4", JSON.stringify(vm.jblxNameList));

          yearlength=vm.yearlist.length;
          jblxlength=vm.jblxNameList.length;
          //vm.checkboxClick("init",true);/** 调用复选框方法初始化 **/
          for(var i=0;i<jblxlength;i++)
          {
            vm.chTypeList.push({type:vm.jblxNoList[i],name:vm.jblxNameList[i],checked:true});
            csselected[vm.jblxNameList[i]]=true;
          }
          vm.yearRadioClick(2015);
          //vm.legendCheckboxClick(12,2015);

          xlengend.length = 0;
          xlengend.push(vm.yearlist[0]);

          $scope.isChecked2=vm.yearlist[0];



        }).error(function () {
        // SweetAlert.swal("网络有问题，待会再试");
      });
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

    //图2
    vm.ecConfig1 = {
      theme: 'Donut',
      dataLoaded: false
    };
    vm.ecOption1 = {
      color: ['#e91e63','#0c6bd8','#564fbe','#10bd5d','#ffca28','#81c400','#ff9800','#2196f3','#9c27b0'],
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}万元({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'right',
        y:'center',
        data: _ylengend,
        selected:csselected
      },
      grid: {
        left: '3%',
        right: '5%',
        bottom: '1%',
        top: '1%',
        containLabel: true
      },
      series : [
        {
          name: '医保分析-疾病分析',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:   xyData,
          label: {
            normal: {
              textStyle: {
                fontSize: 14
              },
              formatter: function(param) {
                return param.name + ':' + Math.round(param.percent) + '%';
              }
            }
          },
          labelLine: {
            normal: {
              smooth: true,
              lineStyle: {
                width: 2
              }
            }
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
             // shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]

    };




     /* var url1=devUrl + 'leader/medical/ybjbfy/1/'+selectyear+'_'+selectyear+'/2';
      $http.get(url1)
        .success(function (response2) {
          if (angular.isUndefined(response2)) {
            SweetAlert.swal("没有查到相关数据");
          }


        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });*/



    if(sessionStorage.getItem("ybjbfxDataList1") == null||sessionStorage.getItem("ybjbfxDataList2") == null||sessionStorage.getItem("ybjbfxDataList3") == null||sessionStorage.getItem("ybjbfxDataList4") == null)
    {
      vm.queryData();
    }
    else{
      vm.list.length = 0;vm.yearlist.length = 0;vm.jblxNoList.length = 0;vm.jblxNameList.length = 0;
      vm.list =  JSON.parse(sessionStorage.getItem("ybjbfxDataList1"));
      vm.yearlist =  JSON.parse(sessionStorage.getItem("ybjbfxDataList2"));
      vm.jblxNoList =  JSON.parse(sessionStorage.getItem("ybjbfxDataList3"));
      vm.jblxNameList =  JSON.parse(sessionStorage.getItem("ybjbfxDataList4"));
      yearlength=vm.yearlist.length;
      jblxlength=vm.jblxNameList.length;
      //vm.checkboxClick("init",true);/** 调用复选框方法初始化 **/
      for(var i=0;i<jblxlength;i++)
      {
        vm.chTypeList.push({type:vm.jblxNoList[i],name:vm.jblxNameList[i],checked:true});
        csselected[vm.jblxNameList[i]]=true;
      }
      vm.yearRadioClick(2015);
      //vm.legendCheckboxClick(12,2015);

      xlengend.length = 0;
      xlengend.push(vm.yearlist[0]);

      $scope.isChecked2=vm.yearlist[0];


    }


  }
})();


