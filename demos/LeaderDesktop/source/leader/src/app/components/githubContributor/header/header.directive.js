(function() {
  'use strict';

  angular
    .module('smartCore')
    .directive('myHeader', myHeader);

  /** @ngInject */
  function myHeader() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/header/header.html',
      scope: {},
      controller: MyHeaderController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function MyHeaderController($window, $state) {

      if ( !$window.sessionStorage.getItem('user') ) {
        $state.go('auth');
      }

      var vm = this;
      //vm.user = {'name': '大桥', 'username': 'admin', 'photo': 'assets/images/yeoman.png', 'role': '系统管理员', 'user_id': '1'};
      vm.user = JSON.parse($window.sessionStorage.getItem('user'));
      if(vm.user){
        vm.user.photo = "assets/images/yeoman.png";
      }

      vm.logout = function () {
        //$window.sessionStorage.removeItem("logined");
        $window.sessionStorage.removeItem("user");
        $state.go('auth');
      }

    }
  }

})();
