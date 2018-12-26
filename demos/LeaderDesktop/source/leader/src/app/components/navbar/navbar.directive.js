(function() {
  'use strict';

  angular
    .module('smartCore')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {},
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController($window, $state) {
      var vm = this;
      vm.user = {'fname': '大桥', 'lname': '张', 'username': 'admin', 'avatar': 'assets/images/yeoman.png', 'role': '系统管理员', 'user_id': '1'};

      if ($window.sessionStorage.getItem('logined') == 'false') {
        $state.go('auth');
      }

      vm.logout = function () {
        $window.sessionStorage.logined = false;

        $state.go('auth');
      }
    }
  }

})();
