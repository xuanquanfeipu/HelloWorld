/**
 * Created by
 */(function() {
    'use strict';

    angular
        .module('starter')
        .controller('noPowerCtrl', noPowerCtrl);

    /** @ngInject */
    function noPowerCtrl($scope,$state,$rootScope,$ionicPopup,$ionicLoading,$timeout, $http, locals, $window,CommService,devUrl,md5) {
        var vm = this;
        $scope.picwidth = $window.innerWidth + 'px';
        $scope.picheight = $window.innerHeight - 180 + 'px';
    }
})();
