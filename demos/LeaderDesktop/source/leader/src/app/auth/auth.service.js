/**
 * Created by 10209757 on 2017/3/1.
 */

(function() {
  'use strict';

  angular
    .module('smartCore')
    .factory('AuthService', AuthService)

  /** @ngInject */
  function AuthService($resource, AuthSession) {
    var authService = {};

    authService.login = function (credentials) {
      var api = $resource('http://10.41.168.25:5000/user/1');

      return api.save(credentials).$promise.then(function (res) {
        AuthSession.create(res.id, res.user_id, res.role);
        return res;
      })
    };

    authService.isAuthenticated = function () {
      return !!AuthSession.userId;
    };

    authService.isAuthorized = function (authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }

      return (authService.isAuthenticated() && authorizedRoles.indexOf(AuthSession.role) !== -1);
    };

    return authService;
  }

})();
