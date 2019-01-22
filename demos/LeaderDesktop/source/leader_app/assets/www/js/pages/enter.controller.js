/**
 * Created by
 */(function() {
    'use strict';

    angular
        .module('starter')
        .controller('BigDataEnterCtrl', BigDataEnterCtrl);

    /** @ngInject */
    function BigDataEnterCtrl($scope,$state,$rootScope,$ionicPopup,$ionicLoading,$timeout, $http, locals, $window,CommService,devUrl,md5) {
        var vm = this;
        var userInfo = JSON.parse(sessionStorage.getItem("user"));
        var ticket = userInfo.token;
        var username = userInfo.username;

        vm.ldzm_app_no = 2;
        vm.jjyx_app_no = 4;
        vm.xfdc_app_no = 6;
        vm.scjg_app_no = 8;
        vm.tshd_app_no = 10;
        vm.third1_app_no = 16;
        vm.third2_app_no = 12;
        vm.third3_app_no = 14;
        vm.ldzm_lock = true;
        vm.jjyx_lock = true;
        vm.xfdc_lock = true;
        vm.scjg_lock = true;
        vm.tshd_lock = true;
        vm.third1_lock = true;
        vm.third2_lock = true;
        vm.third3_lock = true;
        vm.third1Url="#";
        vm.third2Url="#";
        vm.third3Url="#";
        vm.showNopoweMsg = "抱歉，您无权访问此模块";
        //注销
        vm.exit=function () {
            var confirmPopup = $ionicPopup.confirm({
                title: '提示',
                template: '<center>确定注销吗？</center>',
                cancelText: '取消',
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
                        var restUrl = devUrl + 'third/logout';
                        $http.post(restUrl, {
                            username: username,
                            ticket: '-1'
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
                        //$window.sessionStorage.removeItem("user");
                        // $state.go("login",{reload:true});
                        //location.href='index.html';
                    }


                }
            });
        };

        vm.accountCenter = function() {
//            alert("account center");

            $state.go("accountCenter");
        };

       vm.loadIng = function(){
         $ionicLoading.show({
                         content: '跳转中...',
                         animation: 'fade-in',
                         showBackdrop: true,
                         //maxWidth: 200,
                         showDelay: 100});
        };

        $scope.onTouch=function(appno){
            $("#div_app_"+appno).css("background-color","#e8ecfb");
        }
        $scope.onRelease=function(appno){
            $("#div_app_"+appno).css("background-color","#ffffff");
        }

        vm.toLdzm = function (lock){
            if(lock){
                CommService.showAlert(vm.showNopoweMsg);
                return;
            }
            //vm.loadIng();
            $state.go("tab.index");
        }
        vm.toJJYX = function (lock){
            if(lock){
                CommService.showAlert(vm.showNopoweMsg);
                return;
            }
            //vm.loadIng();
            location.href="../../../economy/pages/economy/index.html";
        }
        vm.toXFDC = function (lock){
            if(lock){
                CommService.showAlert(vm.showNopoweMsg);
                return;
            }
            //vm.loadIng();
            location.href="../../../consumer/pages/consumer/welcome.html";
        }
        vm.toSCJG = function (lock){
            if(lock){
                CommService.showAlert(vm.showNopoweMsg);
                return;
            }
            //vm.loadIng();
            location.href="../../../market/pages/scjg/index.html";
        }
        vm.toTSHD = function (lock){
            if(lock){
                CommService.showAlert(vm.showNopoweMsg);
                return;
            }
            //vm.loadIng();
            location.href="../../../complaint/pages/complaint/index.html";
        }

        //林业监管
        vm.toThird1= function (lock){
           if(lock){
                CommService.showAlert(vm.showNopoweMsg);
                return;
            }
            vm.loadIng();
           // $state.go("third");
            //location.href=third1Url + '?appid=12&ticket=' + ticket;
            if(vm.third1Url.indexOf('?') != -1){
                location.href=vm.third1Url + '&username='+username+'&ticket=' + ticket;
            }else{
                location.href=vm.third1Url + '?username='+username+'&ticket=' + ticket;
            }

        }
        //绩效考核
        vm.toThird2= function (lock){
            if(lock){
                CommService.showAlert(vm.showNopoweMsg);
                return;
            }
            vm.loadIng();
            //location.href=third2Url + '?appid=14&ticket=' + ticket;
            if(vm.third2Url.indexOf('?') != -1){
                location.href=vm.third2Url + '&username='+username+'&ticket=' + ticket;
            }else{
                location.href=vm.third2Url + '?username='+username+'&ticket=' + ticket;
            }
        }
        //精准扶贫
        vm.toThird3= function (lock){
            if(lock){
                CommService.showAlert(vm.showNopoweMsg);
                return;
            }
            vm.loadIng();
            //location.href=third3Url + '?appid=16&ticket=' + ticket;
            if(vm.third3Url.indexOf('?') != -1){
                location.href=vm.third3Url + '&username='+username+'&ticket=' + ticket;
            }else{
                location.href=vm.third3Url + '?username='+username+'&ticket=' + ticket;
            }
        }

        vm.querModulesList = function() {
            var key= 'common/qryUserAppModulesByusList/'+username+'/'+ticket+'/2/-1';
            CommService.getHttpJsonItem(key,devUrl+key,function(response){
                var result = response.data;
                 var ret = response.ret;
                if(ret == '0000'){
                 var ldzm_modules = [];var jjyx_modules = [];var xfdc_modules = [];var scjg_modules = [];var tshd_modules = [];
                        for(var i=0;i<result.length;i++){
                            var app_no = parseInt(result[i].APPS_NO);
                            var app_name = result[i].APP_NAME;
                            var app_url = result[i].APP_URL;
                            var parent_app_no = parseInt(result[i].PARENT_APPS_NO);
                            if(app_no == vm.ldzm_app_no){
                                vm.ldzm_lock =  false;
                            }else if(app_no == vm.jjyx_app_no){
                                vm.jjyx_lock =  false;
                            }else if(app_no == vm.xfdc_app_no){
                                vm.xfdc_lock =  false;
                            }else if(app_no == vm.scjg_app_no){
                                vm.scjg_lock =  false;
                            }else if(app_no == vm.tshd_app_no){
                                vm.tshd_lock =  false;
                            }else if(app_no == vm.third1_app_no){
                                vm.third1_lock =  false;
                                vm.third1Url = app_url;
                            }else if(app_no == vm.third2_app_no){
                                vm.third2_lock =  false;
                                vm.third2Url = app_url;
                            }else if(app_no == vm.third3_app_no){
                                vm.third3_lock =  false;
                                vm.third3Url = app_url;
                            }

                            if(parent_app_no == vm.ldzm_app_no){
                                ldzm_modules.push({'app_no':app_no,'app_name':app_name});
                            }else if(parent_app_no == vm.jjyx_app_no){
                                jjyx_modules.push({'app_no':app_no,'app_name':app_name});
                            }else if(parent_app_no == vm.xfdc_app_no){
                                xfdc_modules.push({'app_no':app_no,'app_name':app_name});
                            }else if(parent_app_no == vm.scjg_app_no){
                                scjg_modules.push({'app_no':app_no,'app_name':app_name});
                            }else if(parent_app_no == vm.tshd_app_no){
                                tshd_modules.push({'app_no':app_no,'app_name':app_name});
                            }
                        }

                        sessionStorage.setItem("ldzm_modules",JSON.stringify(ldzm_modules));
                        sessionStorage.setItem("jjyx_modules",JSON.stringify(jjyx_modules));
                        sessionStorage.setItem("xfdc_modules",JSON.stringify(xfdc_modules));
                        sessionStorage.setItem("scjg_modules",JSON.stringify(scjg_modules));
                        sessionStorage.setItem("tshd_modules",JSON.stringify(tshd_modules));
                }else{
                   $window.sessionStorage.removeItem("user");
                   $state.go("login",{reload:true});
                }

            });
        }
        $ionicLoading.hide();
        vm.querModulesList();
    }
})();
