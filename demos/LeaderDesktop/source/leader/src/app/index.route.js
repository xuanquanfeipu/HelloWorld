(function () {
  'use strict';

  angular
    .module('smartCore')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('auth', {
        url: '/auth',
        templateUrl: 'app/auth/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .state('ldzm', {
        url: '/ldzm',
        templateUrl: 'app/ldzm/ldzm.html'
      })
      .state('ldzm.home', {
        url: '/home',
        templateUrl: 'app/ldzm/ldzm.home.html',
        controller: 'LdzmHomeController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.home', {
      url: '/home',
      templateUrl: 'app/ldzm/ldzm.topic.home.html',
      controller: 'LdzmTopicHomeController',
      controllerAs: 'vm'
      })
      .state('ldzm.topic', {
        url: '/topic',
        params:{topicKey:null},
        templateUrl: 'app/ldzm/ldzm.topic.html',
        controller: 'LdzmTopicController',
        controllerAs: 'vm'
      })
      .state('ldzm.search', {
        url: '/search',
        params:{topicKey:null,searchKey:null},
        templateUrl: 'app/ldzm/ldzm.search.html',
        controller: 'LdzmSearchController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator', {
        url: '/indicator',
        params:{topicKey:null,indicatorsKey:null},
        templateUrl: 'app/ldzm/ldzm.topic.indicator.html',
        controller: 'LdzmTopicIndController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.ztfx', {
        url: '/ztfx',
        templateUrl: 'app/ldzm/gdzctzfx/ldzm.topic.indicator.ztfx.html',
        controller: 'LdzmTopicIndZtfxController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.cyfx', {
        url: '/cyfx',
        templateUrl: 'app/ldzm/gdzctzfx/ldzm.topic.indicator.cyfx.html',
        controller: 'LdzmTopicIndCyfxController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.hyfx', {
        url: '/hyfx',
        templateUrl: 'app/ldzm/gdzctzfx/ldzm.topic.indicator.hyfx.html',
        controller: 'LdzmTopicIndHyfxController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.dyfx-sz', {
        url: '/dyfx-sz',
        templateUrl: 'app/ldzm/gdzctzfx/ldzm.topic.indicator.dyfx-sz.html',
        controller: 'LdzmTopicIndDyfxController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.ztjj-ztfx', {
        url: '/ztjj-ztfx',
        templateUrl: 'app/ldzm/ztjjfx/ldzm.topic.indicator.ztfx.html',
        controller: 'ZtjjZtfxController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.ztjj-cyfx', {
        url: '/ztjj-cyfx',
        templateUrl: 'app/ldzm/ztjjfx/ldzm.topic.indicator.cyfx.html',
        controller: 'ZtjjCyfxController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.ztjj-hyfx', {
        url: '/ztjj-hyfx',
        templateUrl: 'app/ldzm/ztjjfx/ldzm.topic.indicator.hyfx.html',
        controller: 'ZtjjHyfxController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.ztjj-dyfx', {
        url: '/ztjj-dyfx',
        templateUrl: 'app/ldzm/ztjjfx/ldzm.topic.indicator.dyfx.html',
        controller: 'ZtjjDyfxController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.ybztfx', {
        url: '/ybztfx',
        templateUrl: 'app/ldzm/ybfx/ldzm.topic.indicator.ybztfx.html',
        controller: 'LdzmTopicIndYbztfxController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.cjfyfx', {
        url: '/cjfyfx',
        templateUrl: 'app/ldzm/ybfx/ldzm.topic.indicator.cjfyfx.html',
        controller: 'LdzmTopicIndCjfyfxController',
        controllerAs: 'vm'
      })

      .state('ldzm.topic.indicator.fyjzc', {
        url: '/fyjzc',
        templateUrl: 'app/ldzm/ybfx/ldzm.topic.indicator.fyjzc.html',
        controller: 'LdzmTopicIndFyjzcController',
        controllerAs: 'vm'
      })

      .state('ldzm.topic.indicator.zfjzc', {
        url: '/zfjzc',
        templateUrl: 'app/ldzm/ybfx/ldzm.topic.indicator.zfjzc.html',
        controller: 'LdzmTopicIndZfjzcController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.jbfx', {
        url: '/jbfx',
        templateUrl: 'app/ldzm/ybfx/ldzm.topic.indicator.jbfx.html',
        controller: 'LdzmTopicIndJbfxController',
        controllerAs: 'vm'
      })

      .state('ldzm.topic.indicator.jmsrfxztfx', {
        url: '/jmsrfx/ztfx',
        templateUrl: 'app/ldzm/jmsrfx/ldzm.topic.indicator.jmsrztfx.html',
        controller: 'LdzmTopicIndJmsrfxZtfxController',
        controllerAs: 'vm'
      })

      .state('ldzm.topic.indicator.jmsrlyfx', {
        url: '/jmsrlyfx',
        templateUrl: 'app/ldzm/jmsrfx/ldzm.topic.indicator.jmsrlyfx.html',
        controller: 'LdzmTopicIndJmsrlyfxController',
        controllerAs: 'vm'
      })


      .state('ldzm.topic.indicator.jmxflxfx', {
        url: '/jmxflxfx',
        templateUrl: 'app/ldzm/jmsrfx/ldzm.topic.indicator.jmxflxfx.html',
        controller: 'LdzmTopicIndJmxflxfxController',
        controllerAs: 'vm'
      })

      .state('ldzm.topic.indicator.jmsrfx-areaIEStat', {
        url: '/jmsrfx/areaIEStat',
        templateUrl: 'app/ldzm/jmsrfx/areaStatistics.html',
        controller: 'IncomeAreaStatController',
        controllerAs: 'vm'
      })


      .state('ldzm.topic.indicator.gsfxhyfx', {
        url: '/gsfxhyfx',
        templateUrl: 'app/ldzm/gsqk/ldzm.topic.indicator.gsfxhyfx.html',
        controller: 'LdzmTopicIndGsfxhyfxController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.gsfxqyfx', {
        url: '/gsfxqyfx',
        templateUrl: 'app/ldzm/gsqk/ldzm.topic.indicator.gsfxqyfx.html',
        controller: 'LdzmTopicIndGsfxqyfxController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.czsrfx', {
        url: '/czsrfx',
        templateUrl: 'app/ldzm/czsrfx/ldzm.topic.indicator.czsrfx.html',
        controller: 'LdzmTopicIndCzsrfxController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.czsrfx-ztfx', {
        url: '/czsrfx/ztfx',
        templateUrl: 'app/ldzm/czsrfx/ldzm.topic.indicator.czsrfx.ztfx.html',
        controller: 'LdzmTopicIndCzsrfxZtfxController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.czsrfx-szdyfx', {
        url: '/czsrfx/szdyfx',
        templateUrl: 'app/ldzm/czsrfx/ldzm.topic.indicator.czsrfx.szdyfx.html',
        controller: 'LdzmTopicIndCzsrfxSzdyfxController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.czsrfx-srjgc', {
        url: '/czsrfx/srjgc',
        templateUrl: 'app/ldzm/czsrfx/ldzm.topic.indicator.czsrfx.srjgc.html',
        controller: 'LdzmTopicIndCzsrfxSrjgcController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.czsrfx-zcjgc', {
        url: '/czsrfx/zcjgc',
        templateUrl: 'app/ldzm/czsrfx/ldzm.topic.indicator.czsrfx.zcjgc.html',
        controller: 'LdzmTopicIndCzsrfxZcjgcController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.czsrfx-srgcfx', {
        url: '/czsrfx/srgcfx',
        templateUrl: 'app/ldzm/czsrfx/ldzm.topic.indicator.srgcfx.html',
        controller: 'LdzmTopicIndCzsrfxSrgcfxController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.rcgxrcgc', {
        url: '/rcgxrcgc',
        templateUrl: 'app/ldzm/rcgx/ldzm.topic.indicator.rcgxrcgc.html',
        controller: 'LdzmTopicIndRcgcController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.rcgxjyfx', {
        url: '/rcgxjyfx',
        templateUrl: 'app/ldzm/rcgx/ldzm.topic.indicator.rcgxjyfx.html',
        controller: 'LdzmTopicIndRcgxjyfxController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.rcgxszfx', {
        url: '/rcgxszfx',
        templateUrl: 'app/ldzm/rcgx/ldzm.topic.indicator.rcgxszfx.html',
        controller: 'LdzmTopicIndRcgxszfxController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.rcgxgxgx', {
        url: '/rcgxgxgx',
        templateUrl: 'app/ldzm/rcgx/ldzm.topic.indicator.rcgxgxgx.html',
        controller: 'LdzmTopicIndRcgxgxgxController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.shbzfx-ztfx', {
        url: '/shbzfx/ztfx',
        templateUrl: 'app/ldzm/shbzfx/ldzm.topic.indicator.shbzfx.ztfx.html',
        controller: 'LdzmTopicIndShbzfxZtfxController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.shbzfx-yalbxfx', {
        url: '/shbzfx/yalbxfx',
        templateUrl: 'app/ldzm/shbzfx/ldzm.topic.indicator.shbzfx.yalbxfx.html',
        controller: 'LdzmTopicIndShbzfxYalbxfxController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.shbzfx-yilbxfx', {
        url: '/shbzfx/yilbxfx',
        templateUrl: 'app/ldzm/shbzfx/ldzm.topic.indicator.shbzfx.yilbxfx.html',
        controller: 'LdzmTopicIndShbzfxYilbxfxController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.shbzfx-gsbxfx', {
        url: '/shbzfx/gsbxfx',
        templateUrl: 'app/ldzm/shbzfx/ldzm.topic.indicator.shbzfx.gsbxfx.html',
        controller: 'LdzmTopicIndShbzfxGsbxfxController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.shbzfx-syubxfx', {
        url: '/shbzfx/syubxfx',
        templateUrl: 'app/ldzm/shbzfx/ldzm.topic.indicator.shbzfx.syubxfx.html',
        controller: 'LdzmTopicIndShbzfxSyubxfxController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.shbzfx-syebxfx', {
        url: '/shbzfx/syebxfx',
        templateUrl: 'app/ldzm/shbzfx/ldzm.topic.indicator.shbzfx.syebxfx.html',
        controller: 'LdzmTopicIndShbzfxSyebxfxController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.rcgxsyfx', {
        url: '/rcgxsyfx',
        templateUrl: 'app/ldzm/rcgx/ldzm.topic.indicator.rcgxsyfx.html',
        controller: 'LdzmTopicIndRcgxsyfxController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.rcgxhyfx', {
        url: '/rcgxhyfx',
        templateUrl: 'app/ldzm/rcgx/ldzm.topic.indicator.rcgxhyfx.html',
        controller: 'LdzmTopicIndRcgxhyfxController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.jyqkztfx', {
        url: '/jyqkztfx',
        templateUrl: 'app/ldzm/jyqkfx/ldzm.topic.indicator.jyqkztfx.html',
        controller: 'LdzmTopicIndJyqkztfxController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.jyqkgdjy', {
        url: '/jyqkgdjy',
        templateUrl: 'app/ldzm/jyqkfx/ldzm.topic.indicator.jyqkgdjy.html',
        controller: 'LdzmTopicIndJyqkgdjyController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.jyqkywjy', {
        url: '/jyqkywjy',
        templateUrl: 'app/ldzm/jyqkfx/ldzm.topic.indicator.jyqkywjy.html',
        controller: 'LdzmTopicIndJyqkywjyController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.jyqkjyjf', {
        url: '/jyqkjyjf',
        templateUrl: 'app/ldzm/jyqkfx/ldzm.topic.indicator.jyqkjyjf.html',
        controller: 'LdzmTopicIndJyqkjyjfController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.jyfxztfx', {
        url: '/jyfxztfx',
        templateUrl: 'app/ldzm/jyfx/ldzm.topic.indicator.jyfxztfx.html',
        controller: 'LdzmTopicIndJyfxztfxController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.jyfxhyfx', {
        url: '/jyfxhyfx',
        templateUrl: 'app/ldzm/jyfx/ldzm.topic.indicator.jyfxhyfx.html',
        controller: 'LdzmTopicIndJyfxhyfxController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.jyfxcyfx', {
        url: '/jyfxcyfx',
        templateUrl: 'app/ldzm/jyfx/ldzm.topic.indicator.jyfxcyfx.html',
        controller: 'LdzmTopicIndJyfxcyfxController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.jyfxcyfx1', {
        url: '/jyfxcyfx1',
        templateUrl: 'app/ldzm/jyfx/ldzm.topic.indicator.jyfxcyfx1.html',
        controller: 'LdzmTopicIndJyfxcyfx1Controller',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.jyfxszfx', {
        url: '/jyfxszfx',
        templateUrl: 'app/ldzm/jyfx/ldzm.topic.indicator.jyfxszfx.html',
        controller: 'LdzmTopicIndJyfxszfxController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.jyfxzggz', {
        url: '/jyfxzggz',
        templateUrl: 'app/ldzm/jyfx/ldzm.topic.indicator.jyfxzggz.html',
        controller: 'LdzmTopicIndJyfxzggzController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.ylwsjbqk', {
        url: 'ylwsfx/ylwsjbqk',
        templateUrl: 'app/ldzm/ylws/ldzm.topic.indicator.ylwsjbqk.html',
        controller: 'LdzmTopicIndYlwsjbqkController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.szyljbqk', {
        url: '/ylwsfx/szyljbqk',
        templateUrl: 'app/ldzm/ylws/ldzm.topic.indicator.szyljbqk.html',
        controller: 'LdzmTopicIndSzyljbqkController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.ylwsjgyxqk', {
        url: '/ylwsfx/ylwsjgyxqk',
        templateUrl: 'app/ldzm/ylws/ldzm.topic.indicator.ylwsjgyxqk.html',
        controller: 'LdzmTopicIndYlwsjgyxqkController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.crbqkfx', {
        url: '/ylwsfx/crbqkfx',
        templateUrl: 'app/ldzm/ylws/ldzm.topic.indicator.ylwscrbfx.html',
        controller: 'LdzmTopicIndYlwscrbfxController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.csjbfx', {
        url: '/ylwsfx/csjbfx',
        templateUrl: 'app/ldzm/ylws/ldzm.topic.indicator.ylwscsjbfx.html',
        controller: 'LdzmTopicIndYlwscsjbfxController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.ncjbfx', {
        url: '/ylwsfx/ncjbfx',
        templateUrl: 'app/ldzm/ylws/ldzm.topic.indicator.ylwsncjbfx.html',
        controller: 'LdzmTopicIndYlwsncjbfxController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.population-overview', {
        url: '/population/overview',
        templateUrl: 'app/ldzm/population/overview.html',
        controller: 'PopulationOverviewController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.population-distribution', {
        url: '/population/distribution',
        templateUrl: 'app/ldzm/population/distribution.html',
        controller: 'PopulationDistributeController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.population-migrate', {
        url: '/population/migrate',
        templateUrl: 'app/ldzm/population/migrate.html',
        controller: 'PopulationMigrateController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.population-edu', {
        url: '/population/edu',
        templateUrl: 'app/ldzm/population/edu.html',
        controller: 'PopulationEduController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.population-areastat', {
        url: '/population/areaStatistics',
        templateUrl: 'app/ldzm/population/areaStatistics.html',
        controller: 'AreaStatisticsController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.ztjj-jjyc', {
        url: '/ztjj-jjyc',
        templateUrl: 'app/ldzm/ztjjfx/ldzm.topic.indicator.jjyc.html',
        controller: 'ZtjjJjycController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.zbls', {
        url: '/zbls',
        templateUrl: 'app/ldzm/zbls/ztfx.html',
        controller: 'ZblsZtfxController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.zbls-sxfx', {
        url: '/zbls-sxfx',
        templateUrl: 'app/ldzm/zbls/sxfx.html',
        controller: 'ZblsSxfxController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.hjbh-dqhjzl', {
        url: '/hjbh/dqhjzl',
        templateUrl: 'app/ldzm/hjbh/ldzm.topic.indicator.hjbh.dqhjzl.html',
        controller: 'LdzmTopicIndHjbhDqhjzlController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.hjbh-shjzl', {
        url: '/hjbh/shjzl',
        templateUrl: 'app/ldzm/hjbh/ldzm.topic.indicator.hjbh.shjzl.html',
        controller: 'LdzmTopicIndHjbhShjzlController',
        controllerAs: 'vm'
      })
      .state('ldzm.topic.indicator.hjbh-zsjc', {
        url: '/hjbh/zsjc',
        templateUrl: 'app/ldzm/hjbh/ldzm.topic.indicator.hjbh.zsjc.html',
        controller: 'LdzmTopicIndHjbhZsjcController',
        controllerAs: 'vm'
      })
    ;

    $urlRouterProvider.otherwise('/auth');
  }

})();
