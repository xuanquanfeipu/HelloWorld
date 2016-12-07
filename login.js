$(document).ready(function() {

	//加载国际化资源文件
	Custom.loadI18n('unify_i18n', 'pages/unify/i18n/', 'login');

	$('#loginFrom').on('submit', function(e) {
		var alertDanger = $('.alert-warning');
		alertDanger.hide();
		var data = Custom.serializeJson(this);
		data = $.parseJSON(data);
		data.password = encodePwd(data.password);

		var blockContent = $('#loginForm');
		Custom.blockUI(blockContent, false);
		$.ajax({
			contentType: 'application/json',
			type: 'POST',
			dataType: 'json',
			data: JSON.stringify(data),
			url: 'unify-auth',
			success: function(result) {
				var unblockUI = true;
				if (!result) {
					alertDanger.show().text($.i18n.prop('login_failed_retry')); //"登陆失败，请重试");
				}
				if (result.success) {
					var storage = window.localStorage;
					storage.setItem('uniportal.token', result.data.accessToken);
					unblockUI = false;
					 location.href = "mainpage.html";
				} else {
					alertDanger.show().text(result.message);
				}
				if (unblockUI) {
					Custom.unblockUI(blockContent);
				}
				return false;
			},
			error: function(result) {
				alertDanger.show().text($.i18n.prop('login_failed')); //"登陆失败");
				Custom.unblockUI(blockContent);
				return false;
			}
		});
	});

});


function encodePwd(pwd) {
	var xt = new Xxtea('uniportal');
	return xt.xxtea_encrypt(pwd);
}