/**
 * Created by
 */(function() {
    'use strict';

    angular
        .module('starter')
        .controller('accountCenterCtrl', accountCenterCtrl);

    /** @ngInject */
    function accountCenterCtrl($scope,$state,$rootScope,$ionicPopup,$ionicLoading,$timeout, $interval, $http, locals, $window,CommService,devUrl,md5) {

        $scope.timer = null;
        $scope.chkval = {aaa:true};
        $scope.fpSwitch = {checked:false};
        $scope.gestureSwitch = {checked:false};
        $scope.switchDisabled = false;
        $scope.hideFingerprint = true;
        $scope.fpDialogPromot = "请长按指纹键进行验证";

        var vm = this;
        var userInfo = JSON.parse(sessionStorage.getItem("user"));
        var ticket = userInfo.token;
        var username = userInfo.username;

        //注销
        vm.exit=function () {

            var confirmPopup = $ionicPopup.confirm({
                title: '提示',
                template: '<center>确定退出登录吗？</center>',
                cancelText: '<span class="positive">取消</span>',
                okText: '确定'
            });
            confirmPopup.then(function(res) {
                if(res) {
                    //如果是在数梦登陆 则需要调数梦注销接口
                    if(userInfo.validMode == 2){
                        var restUrl = devUrl + 'third/logout';
                        $http.post(restUrl, {
                            username: username,
                            ticket: ticket
                        }).success(function (response) {
                            if(response.success || response.success == 'true'){
                                $window.sessionStorage.removeItem("user");
                                location.href='index.html';
                            }else{
                                SweetAlert.swal("注销失败", "请联系管理员", "error");
                            }
                        }).error(function () {
                            SweetAlert.swal("注销失败", "网络有问题，待会再试", "error");
                        });
                    }else{
                        $ionicLoading.show({
                            content: '注销中...',
                            animation: 'fade-in',
                            showBackdrop: true,
                            showDelay: 100
                        });

                        var restUrl = devUrl + 'third/logout';
                        $http.post(restUrl, {
                            username: username,
                            ticket: '-1'
                        }).success(function (response) {
                            if(response.success || response.success == 'true'){
                                $window.sessionStorage.removeItem("user");
                                location.href='index.html';
                            }else{
                                $ionicLoading.hide();

                                SweetAlert.swal("注销失败", "请联系管理员", "error");
                            }
                        }).error(function () {
                            $ionicLoading.hide();

                            SweetAlert.swal("注销失败", "网络有问题，待会再试", "error");
                        });
                    }


                }
            });
        };

       vm.goEnter = function() {
            stopFpListen();
            $state.go("enter");
       };

       //指纹解锁开关响应函数
       vm.switchFpAuth = function($event) {

            //使开关按钮不可再响应点击时间
            $scope.switchDisabled = true;

            //未设置指纹，提示用户
            var fpSupport = js.isFingerPrintSupport();
            if (fpSupport == 2) {
                var alertPopup = $ionicPopup.alert({
                   title: '提示',
                   template: "尚未录入指纹，请进入设置录入指纹"
                });
                alertPopup.then(function() {
                     $scope.switchDisabled = false;
                });
            }

            if (!$scope.fpSwitch.checked) {

                //试图关闭指纹识别，在用户通过指纹验证前，先将界面开关控件状态置回打开状态
                $scope.fpSwitch.checked = true;

                //未设置指纹，终止操作
                if (fpSupport == 2) {
                    return;
                }

                // 自定义弹窗
               $scope.data = {};

               $scope.fpDialogPromot = "请长按指纹键进行验证";
               var myPopup = $ionicPopup.show({
                 template: '<center><img src="../../images/fp_promote.png" /></br><span ng-bind="fpDialogPromot"></span></center>',
                 scope: $scope,
                 buttons: [
                   { text: '取消',
                     type: 'button-clear button-positive'
                   }
                 ]
               });
               myPopup.then(function(res) {
                    //停止指纹识别的监听
                    stopFpListen();

                    $scope.switchDisabled = false;
               });

               //开启指纹监听，验证
               startFpAuth("disableFingerprint", myPopup);

            } else {
                //试图打开指纹识别，在用户通过密码验证前，先将界面开关控件状态置回关闭状态
                $scope.fpSwitch.checked = false;

                //未设置指纹，终止操作
                if (fpSupport == 2) {
                    return;
                }

                //如果设置了手势密码，则使用手势密码进行验证
                if (js.isAppAuth("Gesture")) {
                    $window.localStorage.setItem("authPurpose", "enableFingerprint");
                    $state.go("authGesture");
                } else {

                    //打开指纹识别时，先输入用户密码进行验证
                    var recentUser = js.getRecentUser();//从android SharedPreferences获取最近登录的用户
                    if(!recentUser){
                        alertInfo("没有用户信息，请退出后重新登录");
                        $scope.switchDisabled = false;
                        return;
                    }

                    // 自定义弹窗
                   $scope.data = {};

                   var myPopup = $ionicPopup.show({
                     template: '<input type="password" ng-model="data.tmpPassword">',
                     title: '请输入登录密码',
                     scope: $scope,
                     buttons: [
                       {
                         text: '<span class="positive">取消</span>'
                       },
                       {
                         text: '确定',
                         type: 'button-positive',
                         onTap: function(e) {
                           if (!$scope.data.tmpPassword) {
                             // 不允许用户关闭，除非输入 wifi 密码
                             e.preventDefault();
                           } else {
                             return $scope.data.tmpPassword;
                           }
                         }
                       },
                     ]
                   });
                   myPopup.then(function(res) {
                     if (res != undefined) {
                        recentUser = eval("(" + recentUser + ")");
                        if (recentUser.password == res) {
                            $scope.fpSwitch.checked = true;
                            js.setAppAuth('Fingerprint',true);
                            $scope.switchDisabled = false;
                        } else {
                            var alertPopup = $ionicPopup.alert({
                               title: '提示',
                               template: "密码不正确"
                            });
                            alertPopup.then(function(res) {
                                $scope.switchDisabled = false;
                            });
                        }
                     } else {
                        $scope.switchDisabled = false;
                     }
                   });

               }
            }

       };

       //手势密码解锁开关响应函数
       vm.switchGestureAuth = function($event) {

            //使开关按钮不可再响应点击时间
            $scope.switchDisabled = true;

            if (!$scope.gestureSwitch.checked) {

                //试图关闭手势解锁，在用户通过身份验证前，先将界面开关控件状态置回打开状态
                $scope.gestureSwitch.checked = true;

                //进行手势密码验证
                $window.localStorage.setItem("authPurpose", "disableGesture");
                $state.go("authGesture");

            } else {
                //试图打开手势密码，在用户通过密码验证前，先将界面开关控件状态置回关闭状态
                $scope.gestureSwitch.checked = false;

                //如果指纹解锁已打开，则要用户进行指纹识别以确认拥有关闭手势密码的权限
                if (js.isAppAuth('Fingerprint')) {
                    // 自定义弹窗
                   $scope.data = {};

                   $scope.fpDialogPromot = "请长按指纹键进行验证";
                   var myPopup = $ionicPopup.show({
                     template: '<center><img src="../../images/fp_promote.png" /></br><span ng-bind="fpDialogPromot"></span></center>',
                     scope: $scope,
                     buttons: [
                       { text: '取消',
                         type: 'button-clear button-positive'
                       }
                     ]
                   });
                   myPopup.then(function(res) {
                        //停止指纹识别的监听
                        stopFpListen();

                        $scope.switchDisabled = false;
                   });

                   //开启指纹监听，验证
                   startFpAuth("enableGesture", myPopup);

                } else {

                    //如果指纹解锁没打开，先输入用户密码进行验证
                    var recentUser = js.getRecentUser();//从android SharedPreferences获取最近登录的用户
                    if(!recentUser){
                        alertInfo("没有用户信息，请退出后重新登录");
                        $scope.switchDisabled = false;
                        return;
                    }

                    // 自定义弹窗
                   $scope.data = {};

                   var myPopup = $ionicPopup.show({
                     template: '<input type="password" ng-model="data.tmpPassword">',
                     title: '请输入登录密码',
                     scope: $scope,
                     buttons: [
                       {
                         text: '<span class="positive">取消</span>'
                       },
                       {
                         text: '确定',
                         type: 'button-positive',
                         onTap: function(e) {
                           if (!$scope.data.tmpPassword) {
                             // 不允许用户关闭，除非输入密码
                             e.preventDefault();
                           } else {
                             return $scope.data.tmpPassword;
                           }
                         }
                       },
                     ]
                   });
                   myPopup.then(function(res) {
                     if (res != undefined) {
                        recentUser = eval("(" + recentUser + ")");
                        if (recentUser.password == res) {

                            //转到创建手势密码页面
                            $window.localStorage.setItem("operType", "CREATE");
                            $state.go("setGesture");

                        } else {
                            var alertPopup = $ionicPopup.alert({
                               title: '提示',
                               template: "密码不正确"
                            });
                            alertPopup.then(function(res) {
                                $scope.switchDisabled = false;
                            });
                        }
                     } else {
                        $scope.switchDisabled = false;
                     }
                   });
               }
            }

       };

       //修改手势密码
       vm.editGesture = function() {
            $window.localStorage.setItem("authPurpose", "setGesture");
            $window.localStorage.setItem("operType", "EDIT");
            $state.go("authGesture");
       };

        function alertInfo(msg) {
             var alertPopup = $ionicPopup.alert({
               title: '提示',
               template: msg
             });
        };

        //启动指纹监听
        function startFpAuth(operType, popup) {

            js.startFingerPrint();

            var fpStatus = -1;

            $scope.timer=$interval(function(){

                var ret = js.getFingerprintStatus();

                if (ret == 0)
                {
                    js.stopFingerPrint();
                    $interval.cancel($scope.timer);
                    $scope.timer = null;

                    fpStatus = ret;

                    //关闭弹出窗口
                    if (popup) {
                        popup.close();
                    }

                    if (operType == "disableFingerprint") {
                        //关闭指纹验证
                        js.setAppAuth("Fingerprint", false);
                        $scope.fpSwitch.checked = false;
                        $scope.switchDisabled = false;
                    } else if (operType == "enableGesture") {
                        //打开手势验证
                        $window.localStorage.setItem("operType", "CREATE");
                        $state.go("setGesture");
                    }
                } else if (ret > 0 && fpStatus <= 0) {
                    $scope.fpDialogPromot = "指纹识别错误，请重试";
                    fpStatus = ret;
                }
            },50);

        }

        //页面跳转前，将指纹识别监听停止
        function stopFpListen() {
            if ($scope.timer != null)
            {
                $interval.cancel($scope.timer);
                $scope.timer = null;
            }

            js.stopFingerPrint();
        }

        //组件初始化
        function init() {
            if ($window.localStorage.getItem("browser_debug") == "NO") {

                $scope.gestureSwitch.checked = js.isAppAuth("Gesture");
                if ($scope.gestureSwitch.checked) {
                    $scope.hideEditGesture = false;
                } else {
                    $scope.hideEditGesture = true;
                }

                var fpSupport = js.isFingerPrintSupport();

                if (fpSupport == 0) {
                    //不支持指纹识别时，将指纹开关隐藏
                    $scope.hideFingerprint = true;
                } else {
                    $scope.hideFingerprint = false;
                }

                //手机不支持指纹，或者未设置指纹时，主动将指纹认证关闭
                if (fpSupport == 0 || fpSupport == 2)
                {
                    js.setAppAuth('Fingerprint',false);
                }

                //指纹解锁开关初始化
                $scope.fpSwitch.checked = js.isAppAuth('Fingerprint');
            } else {
                //调试分支
                $scope.hideFingerprint = true;
                $scope.fpSwitch.checked = false;
            }
        }


        //初始化
        init();
    }
})();
