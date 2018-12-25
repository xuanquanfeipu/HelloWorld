/**
 * Created by 10209757 on 2016/12/8.
 */

(function() {
  'use strict';

  angular
    .module('smartCore')
    .directive('scDropdown', scDropdown);

  /** @ngInject */
  function scDropdown($http, SweetAlert, devUrl) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/baseComponent/dropdown.html',
      scope: {
        'data':'=',
        'onChange':'=',
        'defaultItem':'='
      },
      controller: DropdownController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function DropdownController($scope) {
      var vm = this;
      /*console.log(vm.default);
       if (angular.isUndefined(vm.default)){
       vm.default=vm.data[0].name;
       }*/
      /*vm.model.update=function(){
       vm.selectedItem=vm.data[0];
       //console.log('updated default value.');
       }*/
      //console.log(vm.onChange);
      vm.expandDropdown=function ($event) {
        $($event.target).parent().find(".dropdown-menu").toggle();
      };
      vm.clickDropdownItem=function($event,item){
        vm.defaultItem=item;
        $($event.target).parent().parent().hide();
        vm.onChange(item);
      };
      $(document).bind("click",function(e){
        var target = $(e.target);
        if(target.closest(".btn-group").length == 0){
          $(".dropdown-menu").hide();
        }
      });
    }
  }

})();
