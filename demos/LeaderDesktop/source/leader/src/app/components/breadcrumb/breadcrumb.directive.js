/**
 * Created by 10209757 on 2016/12/8.
 */

(function() {
  'use strict';

  angular
    .module('smartCore')
    .directive('scBreadcrumb', scBreadcrumb);

  /** @ngInject */
  function scBreadcrumb() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/breadcrumb/breadcrumb.html',
      scope: {
        'breadcrumbs': '='
      },
      controller: BreadcrumbController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function BreadcrumbController() {

    }
  }

})();
