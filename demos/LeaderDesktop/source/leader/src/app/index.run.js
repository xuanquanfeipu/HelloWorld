(function() {
  'use strict';

  angular
    .module('smartCore')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
