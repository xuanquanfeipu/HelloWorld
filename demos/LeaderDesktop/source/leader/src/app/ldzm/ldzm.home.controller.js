/**
 * Created by 10209757 on 2016/12/8.
 */(function() {
  'use strict';

  angular
    .module('smartCore')
    .controller('LdzmHomeController', LdzmHomeController);

  /** @ngInject */
  function LdzmHomeController($window, $state, $http, devUrl, topics, SweetAlert) {
    var vm = this;

    // vm.addTopic = function (topicId) {
    //   var url = devUrl + 'leader/topic/add/'+vm.user.id+"/"+topicId;
    //   $http.get(url)
    //     .success(function (response) {
    //       if (angular.isUndefined(response)) {
    //         SweetAlert.swal("提交请求失败！");
    //       }
    //       $window.sessionStorage.removeItem("userTopics");
    //       vm.qryTopic();
    //     }).error(function () {
    //     SweetAlert.swal("网络有问题，待会再试");
    //   });
    // };
    //
    // vm.delTopic = function (topicId) {
    //   var url = devUrl + 'leader/topic/del/'+vm.user.id+"/"+topicId;
    //   $http.get(url)
    //     .success(function (response) {
    //       if (angular.isUndefined(response)) {
    //         SweetAlert.swal("提交请求失败！");
    //       }
    //       $window.sessionStorage.removeItem("userTopics");
    //       vm.qryTopic();
    //     }).error(function () {
    //     SweetAlert.swal("网络有问题，待会再试");
    //   });
    // };
    //
    // vm.qryTopic = function () {
    //   var url = devUrl + 'leader/topic/qry/'+vm.user.id+'/true';
    //   $http.get(url)
    //     .success(function (response) {
    //       if (angular.isUndefined(response)) {
    //         SweetAlert.swal("没有查到相关数据");
    //       }
    //       vm.topics = response.data;
    //     }).error(function () {
    //     SweetAlert.swal("网络有问题，待会再试");
    //   });
    // };
    //
    // vm.goTopic = function (topicKey) {
    //   var indicatorsKey = null;
    //   for(var i=0;i<topics.length;i++){
    //     if(topicKey == topics[i].topicKey){
    //       indicatorsKey = topics[i].indicators[0].indicatorsKey;
    //       break;
    //     }
    //   }
    //   if(!$state.get('ldzm.topic.indicator.' + indicatorsKey)){
    //     SweetAlert.swal("啊嘢", "国里还冇搞呢，莫急喽，先看一哈子片哒地方喽！", "error");
    //   } else {
    //     $state.go('ldzm.topic.indicator.' + indicatorsKey, {topicKey: topicKey, indicatorsKey: indicatorsKey});
    //   }
    //   //$state.go('ldzm.topic.indicator.' + indicatorsKey, {topicKey: topicKey,indicatorsKey: indicatorsKey});
    // };
    //
    // vm.user = JSON.parse($window.sessionStorage.getItem('user'));
    // vm.qryTopic();

    vm.ecConfig = {
      theme: 'Donut',
      dataLoaded: true
    };

    vm.ecOption = {
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '5%',
        top: '5%',
        containLabel: true
      },
      xAxis: [{
        data: ['城市体征指数', '生态环境指数', '基础设施指数', '交通出行指数', '公共安全指数']
      }],
      yAxis: [{
        type: 'value'
      }],
      series: [{
        name: '直接访问',
        type: 'bar',
        barWidth: '50%',
        data: [9, 8, 8.5, 9, 9.5]
      }, {
        name: '直接访问',
        type: 'line',
        data: [9, 8, 8.5, 9, 9.5]
      }]
    };

  }
})();


