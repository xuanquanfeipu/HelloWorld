<%@page language="java" import="java.util.*" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@page import="java.net.InetAddress"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="sp" uri="http://www.springframework.org/tags" %>  
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<!-- saved from url=(0022)https://172.16.100.68/ -->
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

	<title></title>
	<meta id="i18n_pagename" content="index-common">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta content="width=device-width, initial-scale=1.0" name="viewport" />
	<meta name="MobileOptimized" content="320">
	<!-- BEGIN GLOBAL MANDATORY STYLES -->        
	<!-- <link href="assets/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>   -->       
	<!-- END THEME STYLES -->
	<link rel="shortcut icon" href="favicon.ico" />
	<link href="http://hovertree.com/texiao/jquery/34/css/normalize.css" rel="stylesheet" type="text/css">  
    <link rel="stylesheet" href="http://hovertree.com/texiao/jquery/34/css/animate.min.css">  
    <link rel="stylesheet" href="assets/plugins/jquery-file-upload/css/jquery.fileupload-ui.css">
	<style>
		.login .logo{
			margin-top :0px;
		}
	</style>
	<!--[if lt IE 9]>
	<script src="assets/plugins/html5shiv.min.js"></script> 
	<script src="assets/plugins/respond.min.js"></script>
	<script src="assets/plugins/excanvas.min.js"></script> 
	<![endif]--> 
<link href="assets/css/pages/gw/skin.css" rel="stylesheet" type="text/css">
<style type="text/css">
<!--
.STYLE5 {
	font-size: 11px
}
-->
</style>
<style>
body {
	margin:0;
	padding:0;
	/*background:#cecece;*/
	background: #fff;
	font-family: '微软雅黑';
	overflow: hidden;
}
body div.login-banner{
	background: url(assets/img/iclass/login_pic.png) center top no-repeat;
	height: 250px;
	position: relative;

}

div.login-banner-icon{
	background: url(assets/img/hotel/login-banner-icon.png) center center no-repeat;
	/* height: 94px; */
	position: absolute;
	bottom: 120px;
	width: 100%;
}

#warningBox{
	width:406px;
	margin:30px auto 0 auto;
	color:#ff0000;
	font-weight:bold;
	text-align:center;
}

#loginForm {
	position:absolute;
	text-align:center;
	border:0px solid #000;
	/*width:406px;
	height:292px;*/
	width:445px;
	height:263px;
	top:254px;
	/*top:50%;*/
	left:50%;
	margin:0px 0 0 -224px;
	/*background:url(assets/img/gw/denglu.gif) no-repeat center;*/
/*	margin:-146px 0 0 -203px;
	background:url(images/new_login.png) no-repeat center;
*/}

#logo2{
	position:absolute;
	left:0;
	/*top:0;*/
	top:10px;
}

#field{
	/*margin:100px auto auto auto;*/
/*	margin:90px auto auto auto;
*/	text-align:left;
	/*width:310px;*/
	height:125px;
	border:0px solid #000000;
	position:relative;
}

#field div{
	/*height:24px;
	line-height:24px;*/
}

#field label{
	display:inline-block;
	width:70px;
	text-align:right;
}

#field .lang{
	margin:8px 8px 8px 0;
}

#name{
	width:150px;
	height:15px;
}



#login{
	margin-left:91px;
}

#user_name,#password{
	/*width:140px;
	height:18px;*/
	width:276px;
	height:46px;
	border: 1px solid #909090;
	color: #8a8f99;
    font-size: 12px;
    padding-left: 64px;
    box-sizing: border-box;
}
#user_name:focus,#password:focus{
	border-color: #0085cb;
}

#user_name.error,#password.error{
	border-color: #f9594a;
}

.alignCenter label.user_p {
    background: url(assets/img/iclass/login-user.png) 12px center no-repeat;
}
.alignCenter label.user_p,.alignCenter label.pass_p{
	display:block; 
	 position: absolute;
	 left: 0px;
	width: 48px;
	height: 48px;
	text-align:left;
	/*-moz-border-radius: 6px;
	border-radius: 6px;*/
	text-indent: -9999px;
}

.alignCenter label.pass_p {
    background: url(assets/img/hotel/login-password.png) 12px center no-repeat;
}

#field .btnBox{
	height:48px;
	line-height:30px;
	_margin-top:5px;
}
.client_download{
	margin-top: 60px;
}
.client_download a{
	text-align: right;
    display: inline-block;
	width: 90px;
	background: url(assets/img/iclass/login_download.png) left center no-repeat;
}
#lang{
	width:140px;
}
.display-none,
.display-hide {
  display: none;
}
.alert{
	padding: 15px 0;
    margin-bottom: 20px;
    border: 1px solid transparent; 
    /*border-radius: 4px;*/
}
.alert h4{margin-top:0;color:inherit}
.alert .alert-link{font-weight:bold}.alert>p,.alert>ul{margin-bottom:0}.alert>p+p{margin-top:5px}.alert-dismissable{padding-right:35px}.alert-dismissable .close{position:relative;top:-2px;right:-21px;color:inherit}.alert-success{color:#468847;background-color:#dff0d8;border-color:#d6e9c6}.alert-success hr{border-top-color:#c9e2b3}.alert-success .alert-link{color:#356635}.alert-info{color:#3a87ad;background-color:#d9edf7;border-color:#bce8f1}.alert-info hr{border-top-color:#a6e1ec}.alert-info .alert-link{color:#2d6987}.alert-warning{color:#c09853;background-color:#fcf8e3;border-color:#faebcc}.alert-warning hr{border-top-color:#f7e1b5}
.alert-warning .alert-link{color:#a47e3c}
.alert-danger{color:#191818;background-color:#f2dede;border-color:#ebccd1;
 /* position: absolute;
  width: 89%;
  top: 80px;
  left: 8px;
  	color: #b94a48;
	background-color: #f2dede;
	border-color: #ebccd1;	*/
	color: #333;
	background-color: #f8d0d0;
	border-color: #f00;
	position: absolute;
	width: 454px;
	top: -57px;
	left: 0px;
}
.alert-danger hr{border-top-color:#e4b9c0}
.alert-danger .alert-link{color:#953b39}
.alert button.close
{
  color: #b94a48;
  background-color: #f2dede;
  border-color: #ebccd1;
  float:right;
  right:5px;
}
input:-webkit-autofill {
 -webkit-box-shadow: 0 0 0px 1000px white inset;
}

#loginSubmitBtn{
	margin-top: 26px;
    width: 220px;
    height: 46px;
    background: url(assets/img/hotel/login-button-normal.png);
    border-radius: 3px;
    color: #fff;
    font-size: 14px;
    font-family: '微软雅黑';
}
#loginSubmitBtn:hover{
	 background: url(assets/img/hotel/login-button-hover.png);
}
.file {
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
}
.file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
}


</style>

<style type="text/css" adt="123"></style>
<style type="text/css">
	object,embed{-webkit-animation-duration:.001s;-webkit-animation-name:playerInserted;                
	-ms-animation-duration:.001s;-ms-animation-name:playerInserted;                
	-o-animation-duration:.001s;-o-animation-name:playerInserted;                
	animation-duration:.001s;animation-name:playerInserted;}                
	@-webkit-keyframes playerInserted{from{opacity:0.99;}to{opacity:1;}}                
	@-ms-keyframes playerInserted{from{opacity:0.99;}to{opacity:1;}}                
	@-o-keyframes playerInserted{from{opacity:0.99;}to{opacity:1;}}                
	@keyframes playerInserted{from{opacity:0.99;}to{opacity:1;}}
</style>


</head>


<body onload="document.getElementById(&#39;user_name&#39;).focus();">
<div class="login-banner">
	<div class="login-banner-icon"></div>
</div>
<div id="warningBox">
	</div>
<form class="login-form" id="loginForm" onsubmit="return false" name="loginForm" method="post" action="">
	<!--<img id="logo2" src="/images/logo3.gif" />-->
		
	<div id="field">
		<br>
		<div class="alignCenter" style="visibility: hidden;">
			<!-- <label for="lang">语言</label>
			<select name="lang" id="lang" onchange="setLanguage()">
							<option value="en_US">English</option>
							<option value="zh_CN" selected="">简体中文</option>
						</select> -->
		</div>
		<div class="alignCenter" style="margin-bottom:28px;">
			<label class="user_p" style="margin-left: 89px;"></label>
			<input type="text" name="username" id="user_name" class="i18n-input" selectname="username"  selectattr="placeholder" placeholder="" autocomplete="off">
		</div>
		<div>
			<span id="usernametext" style="margin-left: 88px; color: #F70606;"></span>
		</div>
		<div class="alignCenter" style="margin-bottom:10px;" id='passwordInputDiv'>
			<label class="pass_p" style="margin-left: 89px;"></label>
			<input  class="form-control placeholder-no-fix i18n-input"  type="text" id="password" name="password" autocomplete="off" placeholder="" selectname="password"  selectattr="placeholder">
		</div>
		<div style="text-align: center;">
			<span id="passwordtext" style="color: #F70606;"></span><a id = "licenseImportButton"></a>
		</div>
		<div class="remember-password" style="display: none;">
			<input type="checkbox" class="remember" style="float: left;margin-right:10px;"/>
			<span>记住密码</span>
		</div>
		<div class="alignCenter" style="margin-left:20px;display:none;">
            <input type="checkbox" id="dkey_login" name="dkey_login" onclick="dkeyCheck()"> 使用Dkey登录 | 
        <a href="https://172.16.100.68/dkey_activex_download.php">下载ActiveX控件</a>
		</div>
		
		<div class="alignCenter btnBox">
			<input class="btn_4 i18n-input" type="submit" selectname="login"  selectattr="value" value="" id='loginSubmitBtn'> 
            <input class="btn_4" type="reset" style="display: none;" value="清空">&nbsp;
		</div>

		<div class="alignCenter client_download" >
			<a id = "downloadId" href="" class="i18n" name="terminaldownload" ></a><!-- 客户端下载 -->
		</div>
	</div>
</form>

 <div id="licenseImport" 
        style="display:none;position:absolute;left:0px;top:0px;width:106%;height:100%;filter:Alpha(Opacity=30);opacity:0.3;background-color:#000000;z-index:101;">
      </div> 
    <div id="dialog" style="display:none;z-index:9999;border:#000000 0px solid; width:500px; position: absolute;">
        <div id="title" style="width: 106%; height: 30px; background-color: #1A8FE2;">
            <a href='javascript:void(0);' onclick='hideDialog();'
                style="text-decoration:none; color:#ffffff; font-weight:bold; float:right; margin-right:10px; margin-top:5px;" class="i18n" name="close"></a>
        </div>
        <div style="background-color: #ffffff;width: 106%; height: 128px;" >
        	<span class="i18n" name="MacIPTip"></span>
        <span id="modmac">
        </span>
        <a href="javascript:;" class="file" style="margin-left: 205px;margin-top: 23px;">选择license文件
            <input id="myFile" type="file" name="myFile" multiple> 
        </a>
        </div>
    </div>

<span id="activespan"></span>
	<script src="assets/plugins/jquery-1.10.2.min.js" type="text/javascript"></script>
	<script src="assets/plugins/jquery.i18n.properties.js" type="text/javascript"></script>
	<script src="assets/scripts/language.js" type="text/javascript"></script>
	
	<script src="assets/plugins/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>
	<script src="assets/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script src="assets/plugins/bootstrap-hover-dropdown/twitter-bootstrap-hover-dropdown.min.js" type="text/javascript" ></script>
	<script src="assets/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
	<script src="assets/plugins/jquery.blockui.min.js" type="text/javascript"></script>  
	
	<script src="assets/plugins/jquery.cookie.min.js" type="text/javascript"></script>
	<script src="assets/plugins/uniform/jquery.uniform.min.js" type="text/javascript" ></script>
	<!-- END CORE PLUGINS -->
	<!-- BEGIN PAGE LEVEL PLUGINS -->
	<script src="assets/plugins/jquery-validation/dist/jquery.validate.min.js" type="text/javascript"></script>
	<!-- <script src="assets/plugins/backstretch/jquery.backstretch.min.js" type="text/javascript"></script> -->
	<script type="text/javascript" src="assets/plugins/select2/select2.min.js"></script>
	<!-- END PAGE LEVEL PLUGINS -->
	<!-- BEGIN PAGE LEVEL SCRIPTS -->
	<script src="assets/scripts/app.js" type="text/javascript"></script>
	<script src="assets/scripts/login-soft.js" type="text/javascript"></script>    
	<script src="assets/plugins/jquery.serializeJson.js" type="text/javascript" ></script>
	<script src="assets/plugins/jquery-file-upload/js/vendor/jquery.ui.widget.js" type="text/javascript"></script>
	<script src="assets/plugins/jquery-file-upload/js/jquery.iframe-transport.js" type="text/javascript"></script>
	<script src="assets/plugins/jquery-file-upload/js/jquery.fileupload.js" type="text/javascript"></script>
	<script src="assets/plugins/jquery-file-upload/js/jquery.fileupload-validate.js" type="text/javascript"></script>
	<script src="assets/scripts/xxtea.min.js" type="text/javascript"></script>
	<!-- <script src="assets/scripts/props.js" type="text/javascript"></script> -->
<script type="text/javascript">
	var props = [
	'username_noempty',
	'password_noempty',
	'loginfailed',
	'systemException',
	'usernameOrPasswordError',
	'userHasNoPower',
	'licenseExpired',
	'licenseImport',
	'paramError',
	'runtimeException',
	'userNotExist',
	'userLocked',
	'excceedMaxTimes'
];


$(function() {
	// var props = [
	// 	'username_noempty',
	// 	'password_noempty'
	// ];
	for (var i = 0; i < props.length; i++) {
		window[props[i]] = $.i18n.prop(props[i]);
	}

});
	<%  
	    String ip=request.getRemoteHost();   
	    pageContext.setAttribute("ip",ip);   
	%>  
	var ip = '<%=ip%>';
	var addIp = window.location.host;

	var ssdratioKey = "${ssdratioKey}";

	$('#downloadId').attr("href","http://"+addIp); 
	jQuery(document).ready(function() {
		if(isIE() || isNN() || isOpera()){
			location.href = "${pageContext.request.contextPath}/browsers";
		}
		var h = $(window).height();
		$('body').height(h);
		  if($.browser.msie){
			  $('#password').remove();
			  $('#passwordInputDiv').append('<input class="form-control placeholder-no-fix" type="password" autocomplete="off" id="password" placeholder="<sp:message code="cloud.voi.ts.login.form.pwd"></sp:message>" name="password"/>')
		  }else{
			  $('#password').one('focus', function(){
				  $(this).attr('type','password');
			  })
		  }
		  App.init();
		  var validateMessage = {
				passwordRequeired : '<sp:message code="cloud.voi.ts.login.front.password.required"></sp:message>'
				}
		  Login.init(validateMessage);

		 
		  var g_name = localStorage.getItem('g_name');
		  var username = localStorage.getItem('username-'+g_name);
		  var password = localStorage.getItem('password-'+g_name);
		  if(username!=null && username!=''){
		  	$('.remember').attr('checked',true);
		  	$('#password').attr('type','password');
		  	$('#loginForm input[type=text]').val(username);
		  	$('#password').val(password);

		  }else {
		  	
		  	$('#password').attr('type','password');
		  	$('#loginForm input[type=text]').val(g_name);
		  	$('.remember').attr('checked',false);		
		  }

		$('#user_name').on('keyup',function () {
			var username = $(this).val();
			username = localStorage.getItem('username-'+username);
			var password = localStorage.getItem('password-'+username);
			if(password){
				$('#password').attr('type','password');
				$('#password').val(password);
				$('.remember').attr('checked',true);
			}else {
				$('#password').val('');
				$('.remember').attr('checked',false);
			}
		});

		  $('#password').on('focus',function () {
		  	var username = $('#loginForm input[type=text]').val();
		  	var password = localStorage.getItem('password-'+username);
		  	if(password!=null && password!='' ){
		  		$('.remember').attr('checked',true);
		  		$('#password').val(password);
		  	}else{
		  		$('#password').val('');
		  		$('.remember').attr('checked',false);
		  	}
		  });

		  $.ajax({
            contentType: 'application/json',
            type: 'GET',
            dataType: 'text',
            url: 'auth/getMacInfo',
            success: function(res) {
                $('#modmac').text(res);
                sessionStorage.setItem('Mac',res);
            },
        });

		$('#myFile').fileupload({
		url: "auth/uploadlicense",
        maxChunkSize:4194304, 
        dataType: 'json',
        done: function (e, data) {
	        alert(data.result.msg);
		    if(data.result.success != false){
		        $('#licenseImport').hide();
		        $('#dialog').hide();
		        $('#licenseImportButton').text("");  
		        $('#passwordtext').text('');
		    }
        }
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
		

    	$('#licenseImportButton').click(function(){
        	$('#licenseImport').show();
        	//显示在屏幕中间
        	$('#dialog').css('left', $(window).width() / 2 - $('#dialog').width() / 2);
        	$('#dialog').css('top', $(window).height() / 2 - $('#dialog').height() / 2);
        	$('#dialog').show();
    	});

		  // $('.remember').on('click',function () {
		  // 	if(!$(this).attr('checked')){
		  // 		localStorage.clear();
		  // 	}
		  // });

		  function valid() {
		  	var username = $('#loginForm input[type=text]').val();
			  var password = $('#password').val();
			  if($.trim(username)==""){
			  	$('#passwordtext').text(username_noempty);
			  	
			  	return false;
			  }
			  if($.trim(password)==""){
				  	$('#passwordtext').text(password_noempty);
				  	return false;
			  }
			  return true;
		  }

		  $('#loginForm input:visible').on('keydown', function(e){
			  var isEnter = false;
			  if(e.keyCode){
				  isEnter = e.keyCode == 13;
			  }else{
				  isEnter =  e.which==13;
			  }
			  
			  if(!isEnter){
			  	$('#passwordtext').text('');
				  return;
			  }
			  
			  
			  var input = $('#loginForm input:visible').each(function(){
				  this.value=$.trim(this.value);
			  }).filter(function(){
				  return !this.value;
			  });
			  
			  if(input.length){
				  input.first().focus();
				  // $('#loginForm').valid();
				  valid();				  
			  }else{
				  $('#loginSubmitBtn').click();
			  }
		  })


		  
		  $('#loginSubmitBtn').click(function(event){
			  if(!valid()){
				  return false;
			  }
			  
			  
			  var data = $('#loginForm').serializeJson();
			  data = $.parseJSON(data);
			  var username = data.username;
			  var password = data.password;
			  data.username = username;			  
			  data.password = encodePwd(password);
			  data.userip = ip;
			  
			  var blockContent = $('#loginForm');
	          App.blockUI(blockContent, false);
			  $.ajax({
				  contentType : 'application/json',
				  type : 'POST',
				  dataType : 'json',
				  data : JSON.stringify(data),
				  // url : '${pageContext.request.contextPath}/loginPost',
				  url : '${pageContext.request.contextPath}/auth',
				  success : function(result){
				  	result = result && JSON.parse(result);
					  var unblockUI = true;
					  
					  if(!result){
						  $('#passwordtext').text(loginfailed);//系统异常,登录失败,请联系IT管理员
						  resetPwdAndCaptcha();
						   App.unblockUI(blockContent);
						  return;
					  }
					  

					  if(result.errorCode=='500'){
							$('#passwordtext').text(systemException);//系统异常！
					  }else if(result.returnCode=='10000005'){
							$('#passwordtext').text(usernameOrPasswordError);//用户名或密码输入错误！
					  }else if(result.returnCode=='10000008'){
							$('#passwordtext').text(userHasNoPower);//该用户没有相应权限！
					  }else if(result.returnCode=='10000004'){
							$('#passwordtext').text(licenseExpired);
							$('#licenseImportButton').text(licenseImport);
					  }else if(result.returnCode=='10000002'){
							$('#passwordtext').text(paramError);
					  }else if(result.returnCode=='10000006'){
							$('#passwordtext').text(runtimeException);
					  }else if(result.returnCode=='10000003'){
							$('#passwordtext').text(userNotExist);
					  }else if(result.returnCode=='10000009'){
							$('#passwordtext').text(userLocked);
					  }else if(result.returnCode=='10000010'){
							$('#passwordtext').text(result.msg);
					  }else if(result.returnCode=='10000015'){
							$('#passwordtext').text(excceedMaxTimes);
					  }else if(result.returnCode=='10000016'){
							$('#passwordtext').text(result.msg);
					  }
					  else if(result.returnCode == '0'){
					  	if($('.remember').attr('checked')=='checked'){
						  	localStorage.setItem('g_name',username);
						  	localStorage.setItem('username-'+username,username);
						  	localStorage.setItem('password-'+username,password);
						  }else{
						  	localStorage.setItem('g_name',username);
						  	localStorage.removeItem('username-'+username);
						  	localStorage.removeItem('password-'+username);

						  }
						  	var token = result.data.accessToken;
						  	var licenseState = result.data.licenseState;
						  	var ssdspacsurplussize = result.data.ssdspacsurplussize;
					  		var ssdspacusingsize = result.data.ssdspacusingsize;
					  		var ssdspactotalsize = result.data.ssdspactotalsize;
					  		var ssdratio = (parseFloat(parseFloat(ssdspacusingsize)/parseFloat(ssdspactotalsize)*100).toFixed(2))== 0.00?0.01:parseFloat(parseFloat(ssdspacusingsize)/parseFloat(ssdspactotalsize)*100).toFixed(2);
						  	sessionStorage.setItem('token',token);
						  	sessionStorage.setItem('licenseState',licenseState);
						  	sessionStorage.setItem('username', data.username);
						  	if(parseInt(ssdratio) < parseInt(ssdratioKey)){
							  location.href = "${pageContext.request.contextPath}/first";
							}else if (parseInt(ssdratio) >= parseInt(ssdratioKey)){
								location.href = "${pageContext.request.contextPath}/firstdisk";
							}
							unblockUI = false;
					  }
					  else if(result.returnCode == '10000001'){
						  resetPwdAndCaptcha();
					  }else{
						  $('#passwordtext').text(result.retMessage);
						  resetPwdAndCaptcha();
					  }
					  if (false)
					  {
					  	location.href = "${pageContext.request.contextPath}/first";
						unblockUI = false; 
					  }
					  if(unblockUI){
						  App.unblockUI(blockContent);
					  }
					  return false;
				  },
				  error : function(result){
				  	
					  $('#passwordtext').text(loginfailed);
					  resetPwdAndCaptcha();
					  App.unblockUI(blockContent);
					  return false;
				  }
			  });
			  
			  stopBubble(event);
			  return false;
		  });


		});
		
		function resetPwdAndCaptcha(){
			$('#password').val('');
		}
		function encodePwd(pwd)
		{
			var xt = new Xxtea('${passwordKey}');
            return xt.xxtea_encrypt(pwd);
		}
		
		function stopBubble(e)
        {
            if (e && e.stopPropagation)
                e.stopPropagation();
            else{
                window.event.cancelBubble=true
            }
        }

        function isIE(){
		    return navigator.appName.indexOf("Microsoft Internet Explorer")!=-1 && document.all;
		}
		function isIE6() {
		    return navigator.userAgent.split(";")[1].toLowerCase().indexOf("msie 6.0")=="-1"?false:true;
		}
		function isIE7(){
		    return navigator.userAgent.split(";")[1].toLowerCase().indexOf("msie 7.0")=="-1"?false:true;
		}
		function isIE8(){
		    return navigator.userAgent.split(";")[1].toLowerCase().indexOf("msie 8.0")=="-1"?false:true;
		}
		function isNN(){
		    return navigator.userAgent.indexOf("Netscape")!=-1;
		}
		function isOpera(){
		    return navigator.appName.indexOf("Opera")!=-1;
		}
		function isFF(){
		    return navigator.userAgent.indexOf("Firefox")!=-1;
		}
		function isChrome(){
		    return navigator.userAgent.indexOf("Chrome") > -1;
		}

		function hideDialog(){
        	$('#licenseImport').hide();
        	$('#dialog').hide();
    	}
</script>

</body></html>
