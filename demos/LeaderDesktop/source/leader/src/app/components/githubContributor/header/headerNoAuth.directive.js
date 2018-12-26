(function() {
  'use strict';

  angular
    .module('smartCore')
    .directive('myHeaderNoAuth', myHeaderNoAuth);

  /** @ngInject */
  function myHeaderNoAuth() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/header/headerNoAuth.html',
      scope: {},
      controller: MyHeaderNoAuthController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function MyHeaderNoAuthController($window, $state) {
      var vm = this;
      console.log("xxx");
    }
  }
})();
