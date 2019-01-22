/**
 * Created by
 */(function() {
    'use strict';

    angular
        .module('starter')
        .controller('ThirdCtrl', ThirdCtrl);

    /** @ngInject */
    function ThirdCtrl($scope,$state,$rootScope,$ionicPopup,$ionicLoading,$timeout, $http, locals, $window,CommService,devUrl,md5) {
        var vm = this;
        vm.goback = function(){
            $state.go("enter");
        }
    }
})();
