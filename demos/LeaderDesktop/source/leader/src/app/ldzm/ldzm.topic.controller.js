(function () {
  'use strict';

  angular
    .module('smartCore')
    .controller('LdzmTopicController', LdzmTopicController)
    .controller('ModalInstanceCtrl', ModalInstanceCtrl);

  /** @ngInject */
  function LdzmTopicController($window, $location, $http, $state, $stateParams, $timeout, $scope, devUrl, topics, SweetAlert, $uibModal, $document,CommService) {
    var vm = this;
    if ( !$window.sessionStorage.getItem('user') ) {
      $state.go('auth');
    }
    vm.user = JSON.parse($window.sessionStorage.getItem('user'));
    if(vm.user){
      vm.user.photo = "assets/images/yeoman.png";
    }
    //console.log('$stateParams:',$stateParams);
    vm.logout = function () {
      SweetAlert.swal({title:'提示',
          text:"确定注销吗？",
          showCancelButton: true,
          closeOnConfirm: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消' },
        function (isConfirm) {
          if(isConfirm){
            $window.sessionStorage.removeItem("user");
            $state.go('auth');
          }
        });
    }

    vm.screenSizeType=CommService.getScreenSize().type;
    //vm.allTopics = topics;

    /** 设置当前主题tab为选中状态 */
    vm.resetActive = function (topicKey) {
      if(topicKey != null){
        for (var i = 0; i < vm.topics.length; i++) {
          vm.topics[i].isActive = vm.topics[i].topicKey == topicKey;
        }
        $("#homePage").removeClass("cur_nav");
      }
    };
    vm.goHome = function() {
      vm.resetActive('home');
      $("#homePage").addClass("cur_nav");
    };

    /** 专题tab点击操作，默认显示第一个指标的数据 */
    vm.topic_click = function (topicKey) {
      var indicatorsKey = null;
      for (var i = 0; i < vm.topics.length; i++) {
        if (vm.topics[i].topicKey == topicKey) {
          indicatorsKey = vm.topics[i].indicators[0].indicatorsKey;
          break;
        }
      }
      console.info("topic_click:$state.go('ldzm.topic.indicator." + indicatorsKey + ", {topicKey:" + topicKey + ", indicatorsKey:" + indicatorsKey + "})");
      $state.go('ldzm.topic.indicator.' + indicatorsKey, {topicKey: topicKey, indicatorsKey: indicatorsKey},{reload:true});
    };

    /**
     * 菜单滑动效果
     */
    vm.sly = function(){
      $timeout(function () {
        var $frame  = $('#frame');
        var $wrap   = $frame.parent();
        // $frame.sly(false);
        var options = {
          horizontal: 1,
          itemNav: 'basic',
          speed: 100,
          mouseDragging: 1,
          touchDragging: 1,
          prevPage: $wrap.find('.prev_btn'),
          nextPage: $wrap.find('.next_btn')
        };
        // $frame.sly(options);
        var sly = new Sly($frame, options).init();

        $("#navbar li a").each(function(i){
          if($(this).attr('class')=='cur_nav'){
            if(i>8){
              sly.toEnd();
            }
          }
        });

        $("#navbar").css('width', '2000px');
      }, 1000);
    };

    var topicKey = $stateParams.topicKey==null?$location.search().topicKey:$stateParams.topicKey;

    /**
     * 查询用户菜单
     */
    vm.queryTopics = function(){
      vm.user = JSON.parse($window.sessionStorage.user);
      var userInfo = JSON.parse(sessionStorage.getItem("user"));
      vm.ticket = userInfo.token;
      // vm.ticket = "b798374ec2ae4b51baac90b713e6b8ef"//userInfo.token;
      vm.username = userInfo.username;
      //首先查询有权限的菜单
      var url = devUrl + 'common/qryUserAppModulesList/'+ vm.ticket+'/'+vm.username+'/1';
      //alert(url);
      $http.get(url)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          // alert(response.ret);
          if("0000"==response.ret)
          {
            $window.sessionStorage.removeItem("userTopics");
            vm.cdallqxTopics = response.data;
            var url=devUrl+'leader/topic/qry/' + vm.user.id + '/false?parentAppsNo=1';
            CommService.getHttpJsonItem('userTopics',url,function(response3){
              var userTopics = response3.data;
              console.log('userTopics');
              console.log(userTopics);
              for(var i in userTopics)
              {
                userTopics[i].unlock=false;
              }
              for(var i in userTopics)
              {
                for(var j in  vm.cdallqxTopics)
                {
                  if(userTopics[i].TOPICID == vm.cdallqxTopics[j].APPS_NO)
                  {
                    userTopics[i].unlock=true;
                  }
                }
              }
              console.log('cdallqxTopics');
              console.log(vm.cdallqxTopics);

              console.log('topics');
              console.log(topics);
              for (var i = 0; i < userTopics.length; i++) {
                if(userTopics[i].unlock)
                {
                  for (var j = 0; j < topics.length; j++) {
                    if (userTopics[i].TOPICURL == topics[j].topicKey) {
                      userTopics[i] = topics[j];
                      userTopics[i].unlock=true;
                      continue;
                    }
                  }
                }

              }
              vm.topics = userTopics;
              console.log('*****');
              console.log(vm.topics);
             // console.log(vm.cdallqxTopics);console.log('*****')
             // console.log(vm.topics);console.log('*****')
              // $("#navbar").css("width", "2000px");
              vm.sly();
              vm.resetActive(topicKey);

            });
          }
          else if("9999"==response.ret)
          {
            //SweetAlert.swal("ticket失效,请重新登陆");
            $state.go('auth');
          }

        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });


    };

    vm.queryTopics();
    var getTopicKey=function (list,indicatorsKey) {//getTopicKey
      for(var i in list){
        for(var j in list[i].indicators){
          if(list[i].indicators[j].indicatorsKey==indicatorsKey){
            return list[i].topicKey
          }
        }
      }
      return '';
    }
    var getTopicInfo=function (indicatorsKey) {
      var topickey=getTopicKey(topics,indicatorsKey);
      for(var i in vm.allTopics){
        if(vm.allTopics[i].TOPICURL==topickey){
          return {id:vm.allTopics[i].TOPICID,name:vm.allTopics[i].TOPICNAME};
        }
      }
      return null;
    }
    var insertHistory=function (item) {
      for(var i in vm.searchHistoryList){
        if(vm.searchHistoryList[i].name==item.name){
          vm.searchHistoryList.splice(i, 1);
          break;
        }
      }
      vm.searchHistoryList.unshift(item);
      while(vm.searchHistoryList.length>3){
        vm.searchHistoryList.pop();
      }
      var jsonValue = JSON.stringify(vm.searchHistoryList);
      $window.localStorage.setItem(searchHistoryListCachekey, jsonValue);
    };
    /**
     * 添加用户菜单
     * @param topicId
     */
    vm.addTopic = function (topicId) {
      var url = devUrl + 'leader/topic/add/'+vm.user.id+"/"+topicId;
      $http.get(url)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("提交请求失败！");
          }
          $window.sessionStorage.removeItem("userTopics");
          location.href="#/ldzm/topic/home";
          window.location.reload();
        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });
    };
    /**
     * 查询用户菜单
     */
    vm.qryAllTopic = function () {
      var url = devUrl + 'leader/topic/qry/'+vm.user.id+'/true?parentAppsNo=1';
      $http.get(url)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          vm.allTopics = response.data;
          //为菜单添加选中、取消选中效果
          $timeout(function () {
            $(".custom_item_ul li a").click(function(){
              if($(this).hasClass("unselect")){
                $(this).removeClass("unselect");
              }else{
                $(this).addClass("unselect");
              }
            });
          }, 500);
        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });
    };
    vm.qryAllTopic();

    vm.animationsEnabled = true;
    var modalInstance;
    /**
     * 打开自定义弹出框
     * @param size
     * @param parentSelector
     */
    vm.open = function (size,index, parentSelector) {
      var userInfo = JSON.parse(sessionStorage.getItem("user"));
      vm.ticket = userInfo.token;
      // vm.ticket = "b798374ec2ae4b51baac90b713e6b8ef"//userInfo.token;
      vm.username = userInfo.username;

      var url = devUrl + 'common/qryUserAppModulesList/'+ vm.ticket+'/'+vm.username+'/1';
      //alert(url);
      $http.get(url)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
          // alert(response.ret);
          if("0000"==response.ret)
          {
            var parentElem = parentSelector ?
              angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            modalInstance = $uibModal.open({
              animation: vm.animationsEnabled,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'myModalContent.html',
              controller: 'ModalInstanceCtrl',
              controllerAs: 'vm',
              // index:index,
              size: size,
              appendTo: parentElem,
              resolve: {
                items: function () {
                  return vm.items;
                }
              }
            });
            $timeout(function(){
              $('.modal').css('z-index',10);
              $('.modal-backdrop').css('z-index',9);
            },500);
          }
          else if("9999"==response.ret)
          {
            //SweetAlert.swal("ticket失效,请重新登陆");
            $state.go('auth');
          }

        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });




    };

    vm.toggleAnimation = function () {
      vm.animationsEnabled = !vm.animationsEnabled;
    };

    /*$scope.$on("queryTopics", function(){
      alert(1);
    });*/


  }

  /**
   * 模态框Controller
   * @param $window
   * @param $http
   * @param $uibModalInstance
   * @param $timeout
   * @param devUrl
   * @constructor
   */
  function ModalInstanceCtrl ($window, $http, $uibModalInstance, $timeout, $scope, devUrl,SweetAlert,$state) {
    var vm = this;
    vm.user = JSON.parse($window.sessionStorage.getItem('user'));

    /**
     * 删除用户菜单
     * @param topicId
     */
    vm.delTopic = function (topicId) {
      var url = devUrl + 'leader/topic/del/'+vm.user.id+"/"+topicId;
      $http.get(url)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("提交请求失败！");
          }
          $window.sessionStorage.removeItem("userTopics");
          vm.qryTopic();
        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });
    };
    /**
     * 提交用户菜单
     */
    vm.submit = function(){
      var selectedIds = new Array();
      $("#customMenu li a:not('.unselect')").each(function(){
        selectedIds.push($(this).attr("topicId"));
      });
      $http.get(devUrl + 'leader/topic/delTopicsByUserid/'+vm.user.id+'/1')
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("提交请求失败！");
          } else {
            var ids = selectedIds.toString();
            if(ids==''){
              ids=',';
            }
            $http.get(devUrl + 'leader/topic/add/'+vm.user.id+"/"+ids)
              .success(function (response) {
                if (angular.isUndefined(response)) {
                  SweetAlert.swal("提交请求失败！");
                }
                $window.sessionStorage.removeItem("userTopics");
                location.href="#/ldzm/topic/home";
                window.location.reload();
                //$scope.$emit("queryTopics");
                // vm.queryTopics();
              }).error(function () {
              SweetAlert.swal("网络有问题，待会再试");
            });
          }
        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });
      $uibModalInstance.dismiss();
    };

    /**
     * 关闭弹出框
     */
    vm.close = function(){
      $uibModalInstance.dismiss();
    };
    /**
     * 查询用户菜单
     */
    vm.qryAllTopic = function () {
      var userInfo = JSON.parse(sessionStorage.getItem("user"));
      vm.ticket = userInfo.token;
     // vm.ticket = "b798374ec2ae4b51baac90b713e6b8ef"//userInfo.token;
      vm.username = userInfo.username;
      //首先查询有权限的菜单
      var url = devUrl + 'common/qryUserAppModulesList/'+ vm.ticket+'/'+vm.username+'/1';
      //alert(url);
      $http.get(url)
        .success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
          }
         // alert(response.ret);
          if("0000"==response.ret)
          {
            vm.allqxTopics = response.data;//console.log('*****')
          //  console.log(vm.allqxTopics);console.log('*****')
            var url = devUrl + 'leader/topic/qry/'+vm.user.id+'/true?parentAppsNo=1';
            $http.get(url)
              .success(function (response2) {
                if (angular.isUndefined(response2)) {
                  SweetAlert.swal("没有查到相关数据");
                }
                vm.allTopics = response2.data;

                for(var i in vm.allTopics)
                {
                  vm.allTopics[i].unlock=false;
                }
                for(var i in vm.allTopics)
                {
                  for(var j in  vm.allqxTopics)
                  {
                    if(vm.allTopics[i].TOPICID == vm.allqxTopics[j].APPS_NO)
                    {
                      vm.allTopics[i].unlock=true;
                    }
                  }
                }

                console.log(vm.allTopics);
                for(var i in vm.allTopics)
                {
                  if( vm.allTopics[i].unlock && vm.allTopics[i].USERID!=null)
                  {
                    vm.allTopics[i].tbselect=true;
                  }else{
                    vm.allTopics[i].tbselect=false;
                  }
                }
               console.log(vm.allTopics);
                //为菜单添加选中、取消选中效果
                $timeout(function () {
                  $(".custom_item_ul li a").click(function(){
                    var tid= $(this).attr("id");
                    for(var i in  vm.allTopics)
                    {
                      if(vm.allTopics[i].TOPICID == tid)
                      {
                        if(vm.allTopics[i].unlock){
                          if($(this).hasClass("unselect")){
                            $(this).removeClass("unselect");
                          }else{
                            $(this).addClass("unselect");
                          }
                        }else{
                          SweetAlert.swal("抱歉，您无权访问此模块");
                        }
                      }
                    }

                  });
                }, 500);

              }).error(function () {
              SweetAlert.swal("网络有问题，待会再试");
            });
          }
          else if("9999"==response.ret)
          {
            //SweetAlert.swal("ticket失效,请重新登陆");
            $state.go('auth');
          }

        }).error(function () {
        SweetAlert.swal("网络有问题，待会再试");
      });





    };
    vm.qryAllTopic();
   /* vm.key_click=function (unclock,topicid) {
      alert(unclock);
      if(unclock)
      { alert(1);

      }else{alert(2);
        SweetAlert.swal("抱歉，您无权访问此模块2");
      }

    }*/
  }
})();
