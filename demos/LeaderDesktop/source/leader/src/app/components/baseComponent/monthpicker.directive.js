/**
 * Created by 10209757 on 2016/12/8.
 */

(function() {
  'use strict';

  angular
    .module('smartCore')
    .directive('scMonthpicker', scMonthpicker);

  /** @ngInject */
  function scMonthpicker($http, SweetAlert, devUrl) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/baseComponent/monthpicker.html',
      scope: {
        'model':'=',
        'onChange':'=',
        'mindate':'=',
        'maxdate':'='
      },
      controller: MonthpickerController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function MonthpickerController($scope) {
      var vm = this;
      var myDate = new Date();
      var month=myDate.getMonth()+1;
      month =(month<10 ? "0"+month:month);
      var defaultDate={year:myDate.getFullYear(),month:month};//默认当前时间
      if(vm.model==null){
        vm.model=defaultDate;
      }
      vm.curYear=vm.model.year;
      vm.maxYear=defaultDate.year;
      vm.maxMonth=defaultDate.month;
      vm.minYear,vm.minMonth;
      if(vm.maxdate!=null){
        vm.maxYear=parseInt((vm.maxdate+'').substring(0,4));
        vm.maxMonth=parseInt((vm.maxdate+'').substring(0,4));
      }
      if(vm.mindate!=null){
        vm.minYear=parseInt((vm.mindate+'').substring(0,4));
        vm.minMonth=parseInt((vm.mindate+'').substring(4,6));
      }
      vm.monthList=[{name:'一月',value:'01'},
        {name:'二月',value:'02'},
        {name:'三月',value:'03'},
        {name:'四月',value:'04'},
        {name:'五月',value:'05'},
        {name:'六月',value:'06'},
        {name:'七月',value:'07'},
        {name:'八月',value:'08'},
        {name:'九月',value:'09'},
        {name:'十月',value:'10'},
        {name:'十一月',value:'11'},
        {name:'十二月',value:'12'}];
      var refreshMonth=function () {
        for(var j in vm.monthList){
          vm.monthList[j].select=false;
          vm.monthList[j].clickable=true;
        }
        for(var i in vm.monthList){
          if(vm.curYear==vm.model.year && vm.model.month==vm.monthList[i].value){
            vm.monthList[i].select=true;
            vm.model.month=vm.monthList[i].value;
          }
          if(vm.curYear==vm.minYear && vm.monthList[i].value<vm.minMonth){
            vm.monthList[i].clickable=false;
          }
          if(vm.curYear==vm.maxYear && vm.monthList[i].value>vm.maxMonth){
            vm.monthList[i].clickable=false;
          }
        }
      }
      refreshMonth();
      vm.changeMonth=function($event,item){
        if(!item.clickable){
          return;
        }
        vm.model.month=item.value;
        for(var i in vm.monthList){
          vm.monthList[i].select=false;
        }
        item.select=true;
        vm.model.year=vm.curYear;
        $($event.target).parents('.sc-monthpicker').find(".dropdown-menu").toggle();
        if(vm.onChange!=null){
          vm.onChange(vm.model);
        }
      }

      vm.preYear=function ($event) {
        if(vm.curYear<=vm.minYear){
          return;
        }
        vm.curYear--;
        refreshMonth();
      };
      vm.nextYear=function ($event) {
        if(vm.curYear>=vm.maxYear){
          return;
        }
        vm.curYear++;
        refreshMonth();
      };
      /*console.log(vm.default);
       if (angular.isUndefined(vm.default)){
       vm.default=vm.data[0].name;
       }*/
      /*vm.model.update=function(){
       vm.selectedItem=vm.data[0];
       //console.log('updated default value.');
       }*/
      //console.log(vm.onChange);
      vm.expandDropdown=function ($event) {
        $($event.target).parent('.sc-monthpicker').find(".dropdown-menu").toggle();
      };
      vm.clickDropdownItem=function($event,item){
        /*vm.defaultItem=item;
        $($event.target).parent().parent().hide();
        vm.onChange(item);*/
      };
      $(document).bind("click",function(e){
        var target = $(e.target);
        if(target.closest(".btn-group").length == 0){
          $(".dropdown-menu").hide();
        }
      });
    }
  }

})();
