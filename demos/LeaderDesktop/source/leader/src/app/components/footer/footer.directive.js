/**
 * Created by 10209757 on 2016/12/6.
 */

(function() {
  'use strict';

  angular
    .module('smartCore')
    .directive('scFooter', scFooter);

  /** @ngInject */
  function scFooter() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/footer/footer.html',
      scope: {},
      controller: FooterController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function FooterController(appVersion) {
      var vm = this;

      vm.appversion = appVersion;
    }
  }


  angular
    .module('smartCore')
    .directive('myFooter', scFooter);

})();
