/**
 * Created by 10209757 on 2016/12/8.
 */

(function() {
  'use strict';

  angular
    .module('smartCore')
    .directive('scSidebar', scSidebar);

  /** @ngInject */
  function scSidebar($http, SweetAlert, devUrl) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/sidebar/sidebar.html',
      scope: {
        'breadcrumbs': '='
      },
      controller: SidebarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function SidebarController($state,managementtopics,SweetAlert,CommService) {
      var vm = this;
      var menuUrl;
      vm.menus = managementtopics;
      var topicKey='';

      //console.log("$state.current.name",$state.current.name);
      vm.isHomeActive=false;
      var stateName=$state.current.templateUrl.split('/');
      if(stateName.length==4||stateName.length==3){
        //var keyName=stateName[1].split("-");
        // topicKey=keyName[0];
        // indicatorKey=keyName[1];
        // var keyName=stateName[2];
        topicKey=stateName[2];
      }
      if(topicKey=="home"||topicKey=="home.html"){
        //$("#topicHome").removeClass("active");
        //alert(1234);
        vm.isHomeActive=true;
      }
      vm.goHome=function(){
        // location.href="#/market/home";
        $state.go('management.home' , { topicKey:'home',title:null});
        //location.reload();
        //$state.go('complaint.home');
        $("#topicHome").addClass("active").siblings().removeClass("active");
        $(".treeview-menu").each(function () {
          var checkElement=$(this);
          checkElement.slideUp(500, function () {
            checkElement.removeClass('menu-open');
            checkElement.find('li.active').removeClass('active');
            //Fix the layout in case the sidebar stretches over the height of the window
            //_this.layout.fix();
          });
        })
        vm.breadcrumbs.topicName='首页';vm.breadcrumbs.topickey="home";
        vm.breadcrumbs.indicatorsName='';
      };
      vm.indicator_click = function ($event,topicKey) {
        //alert(topicKey);//alert(indicatorsKey);
        console.info("indicator_click:$state.go('management." + topicKey + ", {indicatorsKey:" + topicKey + "})");
        //  $($event.target).parent().addClass("active").siblings().removeClass("active");
        for(var i in managementtopics){
          managementtopics[i].active=false;

        }
        if(!$state.get('management.' + topicKey)){
          SweetAlert.swal("啊嘢", "国里还冇搞呢，莫急喽，先看一哈子片哒地方喽！", "error");
        } else {
          $state.go('management.' + topicKey, { topicKey:topicKey,title:null});
          $("#topicHome").removeClass("active");//vm.isHomeActive=false;
          for(var i in managementtopics){
            if(managementtopics[i].topicKey==topicKey){
              vm.breadcrumbs.topicName=managementtopics[i].title;//alert(topics[i].title);
              managementtopics[i].active=true;managementtopics[i].isActive=true; vm.breadcrumbs.topickey=managementtopics[i].topicKey;
              // debugger;
              // alert(i);alert(topics[i].active);
              /* for(var j in topics[i].indicators){
               if(topics[i].indicators[j].indicatorsKey==indicatorsKey){
               vm.breadcrumbs.indicatorsName=topics[i].indicators[j].name;
               topics[i].indicators[j].active=true;
               break;
               }
               }*/
              break;
            }

          }
          vm.menus = managementtopics;
        }

        $('body').scrollTop(0);
        $('html').scrollTop(0);
        CommService.resizeContentBoxHeight();
        $('.content-box-wrapper').scrollTop(0);
      };

    }
  }

})();
