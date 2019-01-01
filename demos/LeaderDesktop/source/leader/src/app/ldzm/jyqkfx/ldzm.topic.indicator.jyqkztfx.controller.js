/**
 * 领导桌面-教育情况-总体分析
 */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('LdzmTopicIndJyqkztfxController', LdzmTopicIndJyqkztfxController);

  /** @ngInject */
  function LdzmTopicIndJyqkztfxController($http, devUrl,$scope,SweetAlert,CommService,latestYear) {
    var vm = this;
    var myDate = new Date();
    var curYear=latestYear-1;
    vm.lastYear = curYear + '年';
    vm.hignDataList = new Array();
    vm.baseDataList = new Array();
    vm.feeDataList = new Array();
    vm.ywDataList = new Array();
    var xlengend = new  Array();
    var xyData = new  Array();
    var xy3Data = new  Array();
    var pieNames = new  Array();
    var pieData = new  Array();
    var rsData = new  Array();
    xlengend.push('普通小学');//4
    xlengend.push('普通中学');//3
    xlengend.push('普通高中');//2
    xlengend.push('普通高等学校');//1
    vm.eduTypeList = new  Array();
    vm.eduTypeList.push({type:1,name:'适龄儿童入学率',checked:true});
    vm.eduTypeList.push({type:2,name:'小学升学率',checked:true});
    vm.eduTypeList.push({type:3,name:'初中升学率',checked:true});
    vm.eduTypeList.push({type:4,name:'高中升学率',checked:true});
    vm.ecConfig = {
      theme: 'Donut',
      dataLoaded: false
    };
    vm.ecOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data:['教师','学生','师生比'],
        y : '25'
      },
      xAxis: [
        {
          type: 'category',
          data: xlengend,
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
          name: '人数(人)',
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
        },
        {
          type: 'value',
          name: '比率',
          min:0,
          max:0.1,
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
        }
      ],
      series: xyData
    };
    vm.ecConfig2 = {
      theme: 'Donut',
      dataLoaded: false
    };
    vm.ecOption2 = {
      title : {
        text: '',
        subtext: '',
        x:'center'
      },
      color:['#394aa9','#cb64bb','#6c6fef','#3295cf','#6cb964','#e28750','#a76cef','#2863db','#00c2a9','#c0e347','#b13df3','#48b143'],
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}亿元 (占比{d}%)"
      },
      legend: {
        x : 'right',
        y : 'bottom',
        orient: 'vertical',
        data: pieNames
      },
      series : [
        {
          name: '教育经费及占比',
          type: 'pie',
          radius : '65%',
          center: ['40%', '50%'],
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
    vm.ecConfig3 = {
      theme: 'Donut',
      dataLoaded: false
    };
    vm.ecOption3 = {
      color:['#3b48a3', '#4e72ce', '#cb64bb', '#2097f4'],
      tooltip: {
        trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
      },
      legend: {
        data:['适龄儿童入学率','小学升学率','','初中升学率','高中升学率'],
        y : 'top',
        x: 'center'
      },
      xAxis: [
        {
          type: 'category',
          data: ['2011','2012','2013','2014','2015'],
          axisPointer: {
            type: 'shadow'
          },
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
          name: '升学率百分比',
          axisLabel: {
            formatter: '{value}% ',
            textStyle:{ color: '#7F7F7F' }
          },
          min:60,
          max:110,
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
        }
      ],
      series: xy3Data
    };

    vm.ecConfig4 = {
      theme: 'Donut',
      dataLoaded: false
    };
    vm.ecOption4 = {
      color: ['#0C6BD9'],
      calculable: true,
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
        data: ["预计毕业数", "毕业数", "在校数", "招生数"],
        offset:-1,
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel : {
          show:false,
          interval: 0,
          boundaryGap : false,
          margin:2,
          width:100
        }
      }],
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
          data: [1000000, 1000000, 1000000, 1000000]
        }
        ,{
          name: "GDP总量",
          type: "bar",
          //barWidth: 22,
          barMaxHeight:230,
          barCategoryGap:'50%',
          z: 10,
          tooltip:{
            show:false
          },
          data: rsData
        }
      ]
    };
    //查询高等教育数据
    vm.queryHignEduData= function (year) {
      var url = devUrl + 'leader/edu/qryjyqkgdjylist/1/'+year+'_'+year+'/2';
      CommService.getHttpJsonItem('qryjyqkgdjylist/1/'+year+'_'+year+'/2',url,function(response){
          vm.hignDataList = response.data;
          rsData.push(vm.hignDataList[0].PRE_GRADUATES_NUM);
          rsData.push(vm.hignDataList[0].GRADUATES_NUM);
          rsData.push(vm.hignDataList[0].UNDERGRAD_NUM);
          rsData.push(vm.hignDataList[0].ADMISSIONS_NUM);
          vm.ecConfig4.dataLoaded = true;
      });
    }
    //查询基本数据
    vm.queryBaseData= function (yearS,yearE) {
      var url = devUrl + 'leader/edu/qryjyqkztfxList/1/'+yearS+'_'+yearE+'/2';
      CommService.getHttpJsonItem('qryjyqkztfxList/1/'+yearS+'_'+yearE+'/2',url,function(response){
          vm.baseDataList = response.data;
          var innerTArray = new Array();
          var innerSArray = new Array();
          var innerRArray = new Array();
          for(var j=vm.baseDataList.length-1;j>=0;j--){
            if(vm.baseDataList[j].SCHOOL_LEVEL < 5){
              innerTArray.push(vm.baseDataList[j].TEACHER_NUM);
              innerSArray.push(vm.baseDataList[j].STU_NUM);
              innerRArray.push((vm.baseDataList[j].TEACHER_NUM/vm.baseDataList[j].STU_NUM).toFixed(2));
            }
          }
          xyData.push({name:'教师',type:'bar',barMaxWidth:20,itemStyle: {normal: {color: '#574fbe'}},data:innerTArray});
          xyData.push({name:'学生',type:'bar',barMaxWidth:20,itemStyle: {normal: {color: '#0c6bd9'}},data:innerSArray});
          xyData.push({name:'师生比',type:'line',yAxisIndex:1,itemStyle: {normal: {color: '#ff9f17',lineStyle:{color:'#ffc928'}}},data:innerRArray});
          vm.ecConfig.dataLoaded=true;
      });
    }

    //查询义务教育情况数据
    vm.queryFeeData= function (year) {
      var url = devUrl + 'leader/edu/qryjyqkjyjflist/1/'+year+'_'+year+'/2';
      CommService.getHttpJsonItem('qryjyqkjyjflist/1/'+year+'_'+year+'/2',url,function(response){
          vm.feeDataList = response.data;
          if(vm.feeDataList.length>0){
            pieNames.push("国家财政性教育经费");
            pieNames.push("民办学校中举办者投入");
            pieNames.push("其他教育经费");
            pieNames.push("事业收入");
            pieNames.push("社会捐赠经费");
            pieData.push({value:vm.feeDataList[0].STATE_BUDGETARY, name:'国家财政性教育经费'});
            pieData.push({value:vm.feeDataList[0].HOST_INVESTMENT, name:'民办学校中举办者投入'});
            pieData.push({value:vm.feeDataList[0].OTHER_FUNDS, name:'其他教育经费'});
            pieData.push({value:vm.feeDataList[0].UNDERTAKING_INCOME, name:'事业收入'});
            pieData.push({value:vm.feeDataList[0].SOCIAL_DONATION, name:'社会捐赠经费'});
          }
          vm.ecConfig2.dataLoaded=true;
      });
    }
    //查询义务教育情况数据
    vm.queryYwData= function (yearS,yearE) {
      var url = devUrl + 'leader/edu/qryjyqkywjylist/1/'+yearS+'_'+yearE+'/2';
      CommService.getHttpJsonItem('qryjyqkywjylist/1/'+yearS+'_'+yearE+'/2',url,function(response){
          var result = response.data;
          for(var i=0;i<result.length;i++){
            vm.ywDataList.push({type:1,num:result[i].SCHOOL_AGE_RATE,year:result[i].DATE_PERIOD});
            vm.ywDataList.push({type:2,num:result[i].PRIMARY_RATE,year:result[i].DATE_PERIOD});
            vm.ywDataList.push({type:3,num:result[i].MIDDLE_RATE,year:result[i].DATE_PERIOD});
            vm.ywDataList.push({type:4,num:result[i].HIGH_RATE,year:result[i].DATE_PERIOD});
          }
          vm.putYwData();
      });
    }
    vm.putYwData = function () {
      //数据
      for(var i=0;i<vm.eduTypeList.length;i++){
        var yName = vm.eduTypeList[i].name;
        var yType = vm.eduTypeList[i].type;
        var color = vm.eduTypeList[i].color;
        var innerArray = new Array();
        for(var j=2011;j<2016;j++){
          var xValue = j;
          var count = 0;
          for(var k=0;k<vm.ywDataList.length;k++)
          {
            count = 1;
            if(vm.ywDataList[k].type == yType && vm.ywDataList[k].year ==xValue ){
              innerArray.push(vm.ywDataList[k].num);
            }
          }
          if(count == 0){
            innerArray.push(0);
          }
        }
        xy3Data.push({name:yName,type:'line',itemStyle: {normal: {lineStyle:{color:color}}},data:innerArray});
      }
      vm.ecConfig3.dataLoaded = true;
    }
    //初次加载
     vm.queryHignEduData(curYear);
     vm.queryBaseData(curYear,curYear);
     vm.queryFeeData(curYear);
     vm.queryYwData(curYear-5,curYear);
  }
})();


