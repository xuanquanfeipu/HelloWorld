/**
 * 领导桌面-固定资产投资分析-总体分析
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('LdzmTopicIndYbztfxController', LdzmTopicIndYbztfxController);

  /** @ngInject */
  function LdzmTopicIndYbztfxController($http, devUrl) {
    var vm = this;

    vm.title = "领导桌面-医保分析-总体分析";

      var year_num=5;
      var myDate = new Date();
      var endDate=myDate.getFullYear()-1;
      var beginDate=myDate.getFullYear()-year_num;
      var url=devUrl + 'leader/medical/ybfy/cjfyfx/1/2012_2016';//+beginDate+'_'+endDate;
      var categories = new Array();
      var data1=new Array();
      var data2=new Array();
      var data3 =new Array();
      vm.list=new Array();
      vm.list2=new Array();
      vm.list3=new Array();
      var ybzb=null;
      var zfzb=null;
      //图1
      vm.ecConfig = {
        theme: 'Donut',
        dataLoaded: false
      };

      vm.ecOption = {
        tooltip: {
          trigger: 'axis',
          formatter: "{c}(万元)",
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '5%',
          containLabel: true
        },
        xAxis : [
          {
            type : 'category',
            data :categories,
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
        yAxis : [
          {
            name:'总额（万元）',
            nameTextStyle: {
              color: '#7F7F7F'
            },
            type: 'value',
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
            },
            axisLabel: {textStyle:{ color: '#7F7F7F' }}
          }
        ],
        series : [
          {
            name:'费用',
            type:'bar',
            barMaxWidth:35,
            itemStyle: {
              normal: {
                color: '#574FBE'
              }
            },
            z: 6,
            data:data1
          }
        ]

      };

    vm.queryData= function () {
      $http.get(url)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          vm.list=response.data;
          sessionStorage.setItem("ztfxDataList1", JSON.stringify(vm.list));
          var ttt= vm.list.length;
          ybzb=vm.list[ttt-1].YBZB;
          zfzb=1-vm.list[ttt-1].YBZB;
          //医保基金支付金额占比
          vm.ecConfig3 = {
            theme: 'Donut',
            dataLoaded: false
          };
          vm.ecOption3 = {
            color: ['#fb5e6e','#02BFF6'],
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {d}%"
            },

            legend: {
              orient: 'vertical',
              right: 10,
              bottom: 15,
              data:['医保占比','自费占比']
            },
            grid: {
              left: '3%',
              right: '5%',
              top: '1%',
              containLabel: true
            },
            series : [
              {
                name: '医保占比',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                  {value:ybzb, name:'医保占比'},
                  {value:zfzb, name:'自费占比'},

                ],
                itemStyle : {
                  normal : {
                    label : {
                      show : false
                    },
                    labelLine : {
                      show : false
                    }
                  },
                  emphasis : {
                    label : {
                      show : true,
                      position : 'center',
                      textStyle : {
                        fontSize : '12',
                      }
                    }
                  }
                },
              }
            ]

          };
          vm.ecConfig3.dataLoaded=true;
          /**清空数据**/
          categories.length = 0;
          data1.length = 0;
          data2.length = 0;
          /**根据勾选条件重填数据**/
          for(var i=0;i<vm.list.length;i++){
            categories.push(vm.list[i].DATE_PERIOD);
            data1.push(vm.list[i].ZYCJFY);
            data2.push(vm.list[i].ZYYBFY);
            data3.push(vm.list[i].YBZB);
          }
           vm.ecConfig.dataLoaded=true;
        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });
    }
    var selectyear=2015;
    vm.queryData2= function () {

      var url1=devUrl + 'leader/medical/ybfy/zfjzc/1/'+selectyear+'_'+selectyear;
      $http.get(url1)
        .success(function (response2) {
          if (angular.isUndefined(response2)) {
            SweetAlert.swal("没有查到相关数据");
          }
          vm.list2=response2.data;
          sessionStorage.setItem("ztfxDataList2", JSON.stringify(vm.list2));

          var barData=[ {value: vm.list2[0].YP_ZJ_FY, name:'药品'},
            {value:vm.list2[0].JCZL_ZJ_FY, name:'检查治疗'},
            {value:vm.list2[0].CL_ZJ_FY, name:'材料'},
            {value:vm.list2[0].QT_ZJ_FY, name:'其他'}]
          vm.pieConfig={
            theme: 'Donut',
            dataLoaded: false
          };
          var pieLegendData=['药品','检查治疗','材料','其他'];

          vm.pieOption={
            color: ['#02BFF6','#58E1E7','#B279E2'],
            tooltip: {
              trigger: 'item',
              formatter: "{b}: {c}万元 ({d}%)",
              axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              left: '3%',
              right: '4%',

              containLabel: true
            },
            legend: {
              orient: 'vertical',
              right: 0,
              bottom: 15,
              data:pieLegendData
            },
            title: [{
              text: '自费费用\n',
              left: '49%',
              top: '40%',
              textAlign: 'center',
              textBaseline: 'middle',
              textStyle: {
                color: '#5a6e83',
                fontWeight: 'normal',
                fontSize: 14
              }
            }, {
              text:  vm.list2[0].ZJZF,
              left: '49%',
              top: '51%',
              textAlign: 'center',
              textBaseline: 'middle',
              textStyle: {
                color: '#3b53a2',
                fontWeight: 'normal',
                fontSize: 18
              }
            }],
            series: [{
              name:'总数',
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              center: ['50%', '45%'],
              label: {
                normal: {
                  position: 'inner',
                  formatter: '{d}%',
                  textStyle: {
                    color: '#fff',
                    fontSize: 10
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              color: ['#3BD8AB', '#CB65BB', '#574FBE','#1384de'],
              data:barData
            }]
          };
          vm.pieConfig.dataLoaded = true;



        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });
    }

    vm.queryData3= function () {
      var url2=devUrl + 'leader/medical/ybjbfy/1/'+selectyear+'_'+selectyear+'/2';
      $http.get(url2)
        .success(function (response3) {
          if (angular.isUndefined(response3)) {
            SweetAlert.swal("没有查到相关数据");
          }
          vm.list3=response3.data;
          var jibinglx=vm.list3.length;
          sessionStorage.setItem("ztfxDataList3", JSON.stringify(vm.list3));
          var jbnamelist=new Array();
          var xyData  = new Array();
          var fylist  = new Array(); var fyylist=new Array();
          var barlist  = new Array();var maxBar=0;
          for(var i=0;i<vm.list3.length;i++)
          {
            jbnamelist.push(vm.list3[i].DESCRIPTION);
            xyData.push({value:vm.list3[i].JB_YB_FY,name:vm.list3[i].DESCRIPTION});
            fylist.push(vm.list3[i].JB_YB_FY); //fyylist.push(i);

            if(vm.list3[i].JB_YB_FY>maxBar){
              maxBar=vm.list3[i].JB_YB_FY;
            }
          }

          for(var i=0;i<vm.list3.length;i++)
          {
            barlist.push(maxBar);
          }
          vm.ecConfig2 = {
            theme: 'Donut',
            dataLoaded: false
          };
          vm.ecOption2 = {
            color: ['#e91e63','#0c6bd8','#564fbe','#10bd5d','#ffca28','#a349a4'],
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c}万元 ({d}%)"
            },
            legend: {
              orient: 'vertical',
              left: 'right',
              y:'center',
              data: jbnamelist,

            },

            grid: {
              left: '3%',
              right: '5%',

              top: '1%',
              containLabel: true
            },
            series : [
              {
                name: '医保分析-疾病分析',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:xyData,
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
                    //shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]

          };
          vm.ecConfig2.dataLoaded=true;


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
                    formatter: '{c}元',
                    position: ['250', '0'],
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


    if(sessionStorage.getItem("ztfxDataList1") == null)
    {
      vm.queryData();
    }
    else{
      vm.list.length = 0;
      vm.list =  JSON.parse(sessionStorage.getItem("ztfxDataList1"));
      ybzb=null;zfzb=null;var ttt=vm.list.length;
      ybzb=vm.list[ttt-1].YBZB;
      zfzb=1-vm.list[ttt-1].YBZB;
      //医保基金支付金额占比
      vm.ecConfig3 = {
        theme: 'Donut',
        dataLoaded: false
      };
      vm.ecOption3 = {
        color: ['#CB65BB','#0C6BD9'],
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {d}%"
        },

        legend: {
          orient: 'vertical',
          right: 0,
          bottom: 15,
          data:['医保占比','自费占比']
        },
        grid: {
          left: '3%',
          right: '5%',
          top: '1%',
          containLabel: true
        },
        series : [
          {
            name: '医保占比分析',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
              {value:ybzb, name:'医保占比'},
              {value:zfzb, name:'自费占比'}

            ],
            itemStyle : {
              normal : {
                label : {
                  show : false
                },
                labelLine : {
                  show : false
                }
              },
              emphasis : {
                label : {
                  show : true,
                  position : 'center',
                  textStyle : {
                    fontSize : '12'
                  }
                }
              }
            }
          }
        ]

      };
      vm.ecConfig3.dataLoaded=true;
      /**清空数据**/
      categories.length = 0;
      data1.length = 0;
      data2.length = 0;
      /**根据勾选条件重填数据**/
      for(var i=0;i<vm.list.length;i++){
        categories.push(vm.list[i].DATE_PERIOD);
        data1.push(vm.list[i].ZYCJFY);
        data2.push(vm.list[i].ZYYBFY);
        data3.push(vm.list[i].YBZB);
      }

      vm.ecConfig.dataLoaded=true;
    }

    if(sessionStorage.getItem("ztfxDataList2") == null)
    {
      vm.queryData2();
    }
    else{
      vm.list2.length = 0;
      vm.list2 =  JSON.parse(sessionStorage.getItem("ztfxDataList2"));

      var barData=[ {value: vm.list2[0].YP_ZJ_FY, name:'药品'},
        {value:vm.list2[0].JCZL_ZJ_FY, name:'检查治疗'},
        {value:vm.list2[0].CL_ZJ_FY, name:'材料'},
        {value:vm.list2[0].QT_ZJ_FY, name:'其他'}]
      vm.pieConfig={
        theme: 'Donut',
        dataLoaded: false
      };
      var pieLegendData=['药品','检查治疗','材料','其他'];

      vm.pieOption={
        color: ['#02BFF6','#58E1E7','#B279E2'],
        tooltip: {
          trigger: 'item',
          formatter: "{b}: {c} ({d}%)",
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',

          containLabel: true
        },
        legend: {
          orient: 'vertical',
          right: 0,
          bottom: 15,
          data:pieLegendData
        },
        title: [{
          text: '自费费用\n',
          left: '49%',
          top: '40%',
          textAlign: 'center',
          textBaseline: 'middle',
          textStyle: {
            color: '#5a6e83',
            fontWeight: 'normal',
            fontSize: 14
          }
        }, {
          text:  vm.list2[0].ZJZF,
          left: '49%',
          top: '51%',
          textAlign: 'center',
          textBaseline: 'middle',
          textStyle: {
            color: '#3b53a2',
            fontWeight: 'normal',
            fontSize: 18
          }
        }],
        series: [{
          name:'总数',
          type:'pie',
          radius: ['45%', '70%'],
          avoidLabelOverlap: false,
          center: ['50%', '45%'],
          label: {
            normal: {
              position: 'inner',
              formatter: '{d}%',
              textStyle: {
                color: '#fff',
                fontSize: 10
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          color: ['#3BD8AB', '#CB65BB', '#574FBE','#1384de'],
          data:barData
        }]
      };
      vm.pieConfig.dataLoaded = true;
    }

    if(sessionStorage.getItem("ztfxDataList3") == null)
    {
      vm.queryData3();
    }
    else{
      vm.list3.length = 0;
      vm.list3 =  JSON.parse(sessionStorage.getItem("ztfxDataList3"));

      var jbnamelist=new Array();
      var xyData  = new Array();
      var fylist  = new Array(); var fyylist=new Array();
      var barlist  = new Array();var maxBar=0;
      for(var i=0;i<vm.list3.length;i++)
      {
        jbnamelist.push(vm.list3[i].DESCRIPTION);
        xyData.push({value:vm.list3[i].JB_YB_FY,name:vm.list3[i].DESCRIPTION});
        fylist.push(vm.list3[i].JB_YB_FY); //fyylist.push(i);

        if(vm.list3[i].JB_YB_FY>maxBar){
          maxBar=vm.list3[i].JB_YB_FY;
        }
      }

      for(var i=0;i<vm.list3.length;i++)
      {
        barlist.push(maxBar);
      }
      vm.ecConfig2 = {
        theme: 'Donut',
        dataLoaded: false
      };
      vm.ecOption2 = {
        color: ['#e91e63','#0c6bd8','#564fbe','#10bd5d','#ffca28','#a349a4'],
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'right',
          y:'center',
          data: jbnamelist
        },
        grid: {
          left: '3%',
          right: '5%',

          top: '1%',
          containLabel: true
        },
        series : [
          {
            name: '医保分析-疾病分析',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:xyData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                //shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]

      };
      vm.ecConfig2.dataLoaded=true;


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
                position: ['250', '0'],
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
    }

  }
})();


