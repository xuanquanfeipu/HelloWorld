
(function() {
  'use strict';

  angular
    .module('smartCore')
    .service('InputValidateService', InputValidateService);


      function InputValidateService($http,SweetAlert,CommService) {

        //检查输入是否合法，检出出所有不合法的字符
        this.CheckInputStrnew=function(Sender,strName)
        {
          var tiperror = "";
          var invalidchar="";
          if( arguments.length==3) tiperror = arguments[2];
          var i = 0;
          var sValue = Sender;
          for( i = 0; i < sValue.length;  i++)
          {
            var sChar = sValue.charAt(i);
            if (((sChar < 'A') || (sChar > 'Z')) && ((sChar < 'a') || (sChar > 'z')) &&
              ((sChar < '0') || (sChar > '9')) && (sChar != '_') && (sChar != '@') && (sChar != '-')&& (sChar != '(')&& (sChar != ')')&& (sChar != '[')&& (sChar != ']') && (sChar != '*')&& (sChar != '$')&& (sChar != '{')&& (sChar != '}')&& (sChar != '!')&& (sChar != '#') && (sChar != '/')
              && (sChar != '.') &&(sChar!=' ') && (sValue.charCodeAt(i)>0) && (sValue.charCodeAt(i)<255) )
            {
              invalidchar=invalidchar.concat(sChar);
            }
          }
          if(invalidchar!="")
          {
            SweetAlert.swal({
              title:'警告',
              text:strName +  tiperror +"  " +invalidchar+"  ",
              closeOnConfirm: true,
              confirmButtonText: '确定',
              type:'warning'
            });

            return false;
          }
          return true;
        };
       this.isNumber=function(str){
         var value=str.toString().replace(/(^\s*)|(\s*$)/g, "");
         if( value==""||value==undefined)
           return false;
         var allValid = true;
         for (var i = 0;i<value.length;i++)
         {
           var  ch = value.charAt(i);
           if((ch<='9' && ch >= '0')){

           }else{
             allValid = false;
           }
         }
         if (!allValid) return (false);
         else return (true);
       };
        function strHasNumber(pwd)
        {
          for( var i=0; i< pwd.length; i++)
          {
            var  ch = pwd.charAt(i);
            if( ch<='9' && ch>='0') return true;
          }
          return false;
        }
        function strHasCapLetter(pwd)
        {
          for(var  i=0; i< pwd.length; i++)
          {
            var ch = pwd.charAt(i);
            if( ch<='Z' && ch>='A') return true;
          }
          return false;
        }
        function strHasNonCapLetter(pwd)
        {
          for( var i=0; i< pwd.length; i++)
          {
            var ch = pwd.charAt(i);
            if( ch<='z' && ch>='a') return true;
          }
        }

        function checkComplexPassword(cpwd) {
          var i = 0;
          if (strHasNumber(cpwd)) {
            i++;
          }
          if (strHasNonCapLetter(cpwd)) {
            i++;
          }
          if (strHasCapLetter(cpwd)) {
            i++;
          }
          if (strHasSpecialLetter(cpwd)) {
            i++;
          }
          if (i < 4) {
            return false;
          } else {
            return true;
          }
        }

        function strHasSpecialLetter(str) {
          var SpecialCharacters = "~!@#$%^&*()_+{}|:\"<>?-=[]\;',./";
          var i = 0;
          for (i = 0; i < SpecialCharacters.length - 1; i++) {
            if (str.indexOf(SpecialCharacters.charAt(i)) != -1) {
              return true;
            }
          }
          return false;
        }
       this.hasNumAndLetter=function(chrtype, pwd) {
          chrtype = chrtype.replace(/(^\s*)|(\s*$)/g, "");
          pwd = pwd.replace(/(^\s*)|(\s*$)/g, "");
          if (chrtype == "1")
          {
            if (!strHasNumber(pwd))
            {
              CommService.showWarnInfo("默认密码应该包含数字");
              return false;
            }
          }
          else if (chrtype == "2")
          {

            if (!strHasCapLetter(pwd)||!strHasNonCapLetter(pwd))
            {
              CommService.showWarnInfo("默认密码应该包含小写字母");
              return false;
            }
          }
          else if (chrtype == "3")
          {
            if (!strHasNumber(pwd)||!strHasCapLetter(pwd)||!strHasNonCapLetter(pwd))
            {
              CommService.showWarnInfo("默认密码应该同时包含大小写英文字母以及数字");
              return false;
            }
          }
          else if (chrtype == "4")
          {
            if (!checkComplexPassword(pwd))
            {
              CommService.showWarnInfo("默认密码必须包含数字、字母大小写和特殊符号四种类型。");
              return false;
            }
          }
          return true;
        };





      }




  })();
