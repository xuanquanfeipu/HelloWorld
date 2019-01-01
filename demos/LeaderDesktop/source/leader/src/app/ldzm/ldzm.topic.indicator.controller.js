(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('LdzmTopicIndController', LdzmTopicIndController);

  /** @ngInject */
  function LdzmTopicIndController($state, $stateParams,$location, topics, SweetAlert,CommService) {
    var vm = this;
    vm.screenSizeType=CommService.getScreenSize().type;
    /** 设置当前指标tab为选中状态 */
    vm.resetActive = function (indicatorsKey) {
      if(topicKey != null) {
        for (var i = 0; i < vm.indicators.length; i++) {
          vm.indicators[i].isActive = vm.indicators[i].indicatorsKey == indicatorsKey;
        }
      }
    };
    /** 指标点击操作 */
    vm.indicator_click = function (indicatorsKey) {
      console.info("indicator_click:$state.go('ldzm.topic.indicator." + indicatorsKey + ", {topicKey:" + topicKey + ", indicatorsKey:" + indicatorsKey + "})");
      if(!$state.get('ldzm.topic.indicator.' + indicatorsKey)){
        SweetAlert.swal("啊嘢", "国里还冇搞呢，莫急喽，先看一哈子片哒地方喽！", "error");
      } else {
        $state.go('ldzm.topic.indicator.' + indicatorsKey, {topicKey: topicKey, indicatorsKey: indicatorsKey});
      }
    };

    var topicKey = $stateParams.topicKey==null?$location.search().topicKey:$stateParams.topicKey;
    for (var i = 0; i < topics.length; i++) {
      if (topicKey == topics[i].topicKey) {
        vm.indicators = topics[i].indicators;
        break;
      }
    }

    var indicatorsKey = $stateParams.indicatorsKey==null?$location.search().indicatorsKey:$stateParams.indicatorsKey;
    vm.resetActive(indicatorsKey);

  }
})();


