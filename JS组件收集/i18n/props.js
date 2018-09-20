// var username_noempty = $.i18n.prop('username_noempty');
// var password_noempty = $.i18n.prop('password_noempty');
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
	'excceedMaxTimes',
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
