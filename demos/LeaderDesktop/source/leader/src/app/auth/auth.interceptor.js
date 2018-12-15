/**
 * Created by 10209757 on 2017/2/28.
 */

(function() {
  'use strict';

  angular
    .module('smartCore')
    .factory('AuthInterceptor', AuthInterceptor)

  /** @ngInject */
  function AuthInterceptor($q, $rootScope) {
    return {
      'request': function (config) {
        // config.headers["TOKEN"] = $rootScope.user.token;
        return config;
      },
      'responseError': function (response) {
        var data = response.data;
        // 判断错误码，如果是未登录
        // if (data["errorCode"] == "500999") {
        //   // 清空用户本地token存储的信息，如果
        //   $rootScope.user = {token: ""};
        //   // 全局事件，方便其他view获取该事件，并给以相应的提示或处理
        //   $rootScope.$emit("authIntercepted", "notLogin", response);
        // }
        // // 如果是登录超时
        // if (data["errorCode"] == "500998") {
        //   $rootScope.$emit("authIntercepted", "sessionOut", response);
        // }
        return $q.reject(response);
      }
    };
  }

})();
