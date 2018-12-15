/**
 * Created by 10209757 on 2017/2/28.
 */

(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('LoginController', LoginController);

  /** @ngInject */

  function LoginController($window, $state, SweetAlert, $http, devUrl, md5,CommService,$timeout) {
    var vm = this;

    vm.screenWidth=CommService.getScreenSize().size[0];
    vm.login_bg='bg.png';
    if(CommService.getScreenSize().type=='L'){
      vm.login_bg='bg.jpg';
    }
    vm.credentials = {
      'username': '',
      'password': ''
    };

    vm.login = function () {

      var restUrl = devUrl + 'user/login';
      $http.post(restUrl, {
        username: vm.credentials.username,
        password: md5.createHash(vm.credentials.password)
      }).success(function (response) {
        if (angular.isUndefined(response)) {
          SweetAlert.swal("登录异常", "请联系管理员", "error");
        } else if (!response.data) {
          SweetAlert.swal("登录失败", "用户名或密码不正确", "error");
        } else {
          //SweetAlert.close();
          if(response.code == '0000'){
            SweetAlert.close();
            $window.sessionStorage.user = JSON.stringify(response.data);
            //$window.sessionStorage.logined = true;
            $state.go('ldzm.topic.home');
          }else{
            SweetAlert.swal("登录失败", "用户名或密码不正确", "error");
          }

        }
      }).error(function () {
        SweetAlert.swal("登录失败", "网络有问题，待会再试", "error");
      });

      SweetAlert.swal({
        title: "登录中...",
        imageUrl: "/assets/images/loading.gif",
        showConfirmButton: false
      });

      // AuthService.login(vm.credentials).then(function (user) {
      //   $rootScope.$broadcast(authEvents.loginSuccess);
      //   $rootScope.currentUser = user;
      //
      //
      // }, function () {
      //   $rootScope.$broadcast(authEvents.loginFailed);
      // });
    };

    var speed=100;
    var demo = document.getElementById('demo');
    var demo1 = document.getElementById('demo1');
    var demo2 = document.getElementById('demo2');
    demo2.innerHTML=demo1.innerHTML;
    function Marquee(){
      if(demo2.offsetTop-demo.scrollTop<=0) {
        demo.scrollTop -= demo1.offsetHeight;
      }else{
        demo.scrollTop++;
      }
    }
    var MyMar=setInterval(Marquee,speed);
    demo.onmouseover=function() {clearInterval(MyMar)};
    demo.onmouseout=function() {MyMar=setInterval(Marquee,speed)};

  }



})();
