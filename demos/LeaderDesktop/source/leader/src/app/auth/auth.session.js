/**
 * Created by 10209757 on 2017/3/1.
 */

(function() {
  'use strict';

  angular
    .module('smartCore')
    .service('AuthSession', AuthSession)

  /** @ngInject */
  function AuthSession() {
    this.create =function (sessionId, userId, userRole) {
      this.id = sessionId;
      this.userId = userId;
      this.userRole = userRole;
    }

    this.destroy = function () {
      this.id = null;
      this.userId = null;
      this.userRole = null;
    }
  }

})();
