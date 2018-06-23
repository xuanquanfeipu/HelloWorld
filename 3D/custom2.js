/**
Custom module for you to write your own javascript functions
**/
var lg = console.log.bind(console);
/**兼容IE8以下浏览器
 * [description]
 * @param  {[type]} context [description]
 * @return {[type]}         [description]
 */
Function.prototype.bind = Function.prototype.bind || function(context) {
    var _this = this;

    return function() {
        _this.apply(context, arguments);
    };
};
/**
 * 日期格式化工具函数
 * @param {[type]} format [description]
 */
Date.prototype.Format = function(format) {

    var o = {
        "M+": this.getMonth() + 1, //month 
        "d+": this.getDate(), //day 
        "h+": this.getHours(), //hour 
        "m+": this.getMinutes(), //minute 
        "s+": this.getSeconds(), //second 
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
        "S": this.getMilliseconds() //millisecond 
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

function getCurrentTime() {
    var date = new Date();
    var currentTime = date.Format("yyyy-MM-dd hh:mm:ss");
    return currentTime;
}

var compare = function(obj1, obj2) {
    var val1 = obj1.timeString;
    var val2 = obj2.timeString;
    if (val1 < val2) {
        return -1;
    } else if (val1 > val2) {
        return 1;
    } else {
        return 0;
    }
}

function GetLength(str) {
    ///<summary>获得字符串实际长度，中文2，英文1</summary>
    ///<param name="str">要获得长度的字符串</param>
    var realLength = 0,
        len = str && str.length,
        charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;
};

function parseURL(url) {
    var a = document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function() {
            var ret = {},
                seg = a.search.replace(/^\?/, '').split('&'),
                len = seg.length,
                i = 0,
                s;
            for (; i < len; i++) {
                if (!seg[i]) {
                    continue;
                }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
        hash: a.hash.replace('#', ''),
        path: a.pathname.replace(/^([^\/])/, '/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
        segments: a.pathname.replace(/^\//, '').split('/')
    };
}

//js截取字符串，中英文都能用  
//如果给定的字符串大于指定长度，截取指定长度返回，否者返回源字符串。  
//字符串，长度  

/** 
 * js截取字符串，中英文都能用 
 * @param str：需要截取的字符串 
 * @param len: 需要截取的长度 
 */
function cutstr(str, len) {
    var str_length = 0;
    var str_len = 0;
    str_cut = new String();
    str_len = str && str.length;
    for (var i = 0; i < str_len; i++) {
        a = str.charAt(i);
        str_length++;
        if (escape(a).length > 4) {
            //中文字符的长度经编码之后大于4  
            str_length++;
        }
        str_cut = str_cut.concat(a);
        if (str_length >= len) {
            str_cut = str_cut.concat("...");
            return str_cut;
        }
    }
    //如果给定字符串小于指定长度，则返回源字符串；  
    if (str_length < len) {
        return str;
    }
}

/**从尾部截取
 * [reverseCut description]
 * @param  {[type]} str [description]
 * @param  {[type]} len [description]
 * @return {[type]}     [description]
 */
function reverseCut(str, len) {
    var str_length = 0;
    var str_len = 0;
    str_cut = new String();
    str_len = str && str.length;
    for (var i = str_len; i > 0; i--) {
        a = str.charAt(i);
        str_length++;
        if (escape(a).length > 4) {
            //中文字符的长度经编码之后大于4  
            str_length++;
        }
        str_cut = a.concat(str_cut);
        if (str_length >= len) {
            str_cut = "...".concat(str_cut);
            return str_cut;
        }
    }
    //如果给定字符串小于指定长度，则返回源字符串；  
    if (str_length < len) {
        return str;
    }
}

function getContextPath() {
    var contextPath = document.location.pathname;
    var index = contextPath.substr(1).indexOf("/"); //这个地方可能有问题，要根据具体项目适当修改
    contextPath = contextPath.substr(0, index + 1) + '/';
    delete index;
    return contextPath;
}

var Custom = function() {
    var empty = {};

    var _contextPath = '';

    var _lang = 'zh_CN';

    var ajaxSubmitOpts = {
        dataType: 'json',
        type: ' POST ',
        blockel: '.modal'
    };

    var log = function(str) {
        if (console) {
            console.log(str);
        } else {
            alert(str);
        }
    }

    var trimObj = function(obj) {
        for (var i in obj) {
            if (typeof obj[i] === 'string') {
                obj[i] = $.trim(obj[i]);
            }
        }
    }
    var notNull = function(str, msg) {
        if (!str) {
            log(msg);
            return true;
        }
        return false;
    }

    var modalOpts = {
        width: '500',
        title: '提示',
        height: 65
    };

    var customModal = function(opts) {
        var options = $.extend(empty, modalOpts, opts);
        trimObj(options);

        if (options.body) {
            //      if(options.body.length<=200 && options.body.indexOf("10000002")!=-1){
            //  try
            //  {
            //    var obj = $.parseJSON(options.body);
            //    location.href=obj.loginUrl;
            //    return;
            //  }catch(e){
            //  }
            // }

            $('#' + options.modalId + 'ModalBody').html(options.body);
        }

        $('#' + options.modalId + 'ModalTitle').text(options.title);
        //Custom.resetModalMaxHeigt(opts.height);

        $('#' + options.modalId).modal({
            'width': options.width,
            'show': true
        });
    }

    var defaultValidateOpts = {
        errorElement: 'span', //default input error message container
        errorClass: 'help-block', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "",
        errorPlacement: function(error, element) { // render error placement for each input type
            if (element.parent(".input-group").size() > 0) {
                error.insertAfter(element.parent(".input-group"));
            } else if (element.attr("data-error-container")) {
                error.appendTo(element.attr("data-error-container"));
            } else if (element.parents('.radio-list').size() > 0) {
                error.appendTo(element.parents('.radio-list').attr("data-error-container"));
            } else if (element.parents('.radio-inline').size() > 0) {
                error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
            } else if (element.parents('.checkbox-list').size() > 0) {
                error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
            } else if (element.parents('.checkbox-inline').size() > 0) {
                error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
            } else {
                error.insertAfter(element);
            }
        },

        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },

        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },

        success: function(label) {
            label.closest('.form-group').removeClass('has-error');
        }
    };

    /**
     * 获取校验对象，如果没有分配校验对象则新建一个默认校验对象
     */
    var getValidate = function(opts) {

        if (!opts.validate) {
            return false;
        }

        var validator = $('#' + opts.formId).validate();
        if (validator) {
            return validator;
        } else {
            return $('#' + opts.formId).validate(defaultValidateOpts);
        }
    }

    var showValidateErrors = function(form, validate, name, message) {
        var element = $('[name=' + name + ']', form)[0];
        validate.showLabel(element, message);
        validate.settings.highlight(element);
    }

    // ajaxOpts 设置公共属性
    var ajaxOpts = {
        dataType: "json",
        contentType: "application/json",
        timeout: "30000"
    };
    var ajax = function(options) {
        var opts = $.extend({}, ajaxOpts, options);

        if ($.isEmptyObject(opts.headers)) {
            opts.headers = {};
        }
        if (_token) {
            var token = {
                'X-Access-Token': _token
            };
            opts.headers = $.extend({}, opts.headers, token);
        }

        if (_lang) {
            var headerLanguage = {
                "Accept-Language": _lang
            };
            opts.headers = $.extend({}, opts.headers, headerLanguage);
        }

        var callback = opts.callback;
        $.ajax({
            type: opts.type,
            url: opts.url,
            data: opts.data,
            dataType: opts.dataType,
            contentType: opts.contentType,
            headers: opts.headers,
            timeout: opts.timeout,
            success: function(data) {
                successFunction(opts, data, callback);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                // TODO
                errorFunction(XMLHttpRequest, textStatus, errorThrown);
            }
        });
    };
    //success处理方法
    var successFunction = function(options, data, callback) {
        if (data == null) {
            if (callback && $.isFunction(callback)) {
                callback(data);
            }
            return;
        }
        if (data.returnCode == '1') {
            swal({
                title: "操作异常",
                text: data.message,
                type: "error",
                confirmButtonText: "确定"
            });
            return;
        } else if (data.returnCode == '3') { //token过期
            var storage = window.localStorage;
            _token = storage.removeItem("uniportal.token");
            location.href = getContextPath() + "login.html";
            return;
        } else if (data.returnCode == '2') { //校验失败
            var form = $('#' + options.formId);
            var validate = getValidate(options);
            if (validate) {
                for (var i in data.validate) {
                    showValidateErrors(form, validate, i, data.validate[i]);
                }
            }
        }
        if (callback && $.isFunction(callback)) {
            callback(data);
        } else {
            if (data.success) {

            } else {

                swal({
                    title: "操作异常",
                    text: data.message,
                    type: "error",
                    confirmButtonText: "确定"
                });
                return;
            }
        }
    };
    var errorFunction = function(XMLHttpRequest, textStatus, errorThrown) {
        if (textStatus == 'timeout') {
            swal({
                title: "请求异常",
                text: "请求超时",
                type: "error",
                confirmButtonText: "确定"
            });

        }

        return;
    };
    var leftMenuClick = function() {
        $('#sidebar-menu ').on('click', 'ul li a[data-href*=".html"]', function(e) {
            //切换菜单时，关闭打开的modal
            if ($('.modal.in').length) {
                $('.modal.in').modal('hide');
            }
            //切换菜单时，清空缓存
            var storage = window.localStorage;
            var session = window.sessionStorage;
            var token = storage.getItem('uniportal.token');
            var _tempalteId = storage.getItem('unify.tempalteId');
            storage.clear();
            // session.clear();
            storage.setItem('uniportal.token', token);
            storage.setItem('unify.tempalteId', _tempalteId);
            var url = $(this).data("href");
            var myurl = parseURL(url);
            var query = myurl.query;
            url = url.replace(query, '');
            var params = myurl.params;
            var oasId = params.oasId;
            if (oasId != null) {
                session.setItem('oasId', oasId);

            }
            // Custom.easyLoad(url);
            Custom.getPage(url, 'mainPageContent');

            Custom.stopBubble(e);
            Custom.stopDefault(e);
        });
    }



    //加载国际化资源文件
    function loadProperties(filename, path) {
        jQuery.i18n.properties({
            name: filename,
            path: path,
            mode: 'both',
            language: _lang,
            callback: function() {
                var i18n = $.i18n;

                $('*[data-i18n-text-s]').each(function(i, e) {
                    var $e = $(e);
                    var type = $e.attr("data-i18n-text-s");
                    if (!$e.data('i18n')) {
                        $e.attr('data-i18n', true);
                        $e.text(i18n.prop(type));
                    }

                });

                $('*[data-i18n-text]').each(function(i, e) {
                    var $e = $(e);
                    var type = $e.attr("data-i18n-text");
                    if (!$e.data('i18n')) {
                        $e.attr('data-i18n', true);
                        $e.prepend($('<span>' + i18n.prop(type) + '</span>'));
                    }

                });

                $('*[data-i18n-title]').each(function(i, e) {
                    var $e = $(e);
                    if (!$e.data('i18n')) {
                        $e.attr('data-i18n', true);
                        $e.attr("title", i18n.prop($e.attr("data-i18n-title")));
                    }
                });

                $('*[data-i18n-placeholder]').each(function(i, e) {
                    var $e = $(e);
                    if (!$e.data('i18n')) {
                        $e.attr('data-i18n', true);
                        $e.attr("placeholder", i18n.prop($e.attr("data-i18n-placeholder")));
                    }
                });
            }
        });
    }

    // 缓存token
    var _token = "";

    var _functions = {};

    var addChildMenu = function(menus) {
        if ($.isEmptyObject(menus)) {
            return "";
        }

        var html = "";
        var length = menus.length;

        for (var i = 0; i < length; i++) {
            var menu = menus[i];
            if (menu.hasChild) {
                html += '<li class="has_sub">';
                html += '<a href="javascript:void(0)" class="waves-effect waves-light">';
                if (menu.icon) {
                    html += '<i class="' + topMenu.icon + '"></i>';
                }
                html += '<span>' + menu.name + '</span>';
                html += '<span class="pull-right">';
                html += '<i class="menu-bar md-add"></i>';
                html += '</span>';
                html += '</a>';
                html += '<ul class="list-unstyled">';
                html += addChildMenu(menu.childs);
                html += '</ul>';
                html += '</li>';
            } else {
                html += "<li>";
                html += '<a href="javascript:void(0)" data-href="' + menu.url + '">';
                if (menu.icon) {
                    html += '<i class="' + topMenu.icon + '"></i>';
                }
                html += '<span>' + menu.name + '</span>';
                html += '</a>';
                html += '</li>';
            }
        }
        return html;
    };

    var initSiderBarMenu = function(menus) {
        if ($.isEmptyObject(menus)) {
            return;
        }

        var topLength = menus.length;

        var html = '';
        for (var i = 0; i < topLength; i++) {
            var topMenu = menus[i];
            if (topMenu.hasChild) {
                html += '<li class="has_sub">';
                html += '<a href="javascript:void(0)" class="waves-effect waves-light">';
                if (topMenu.icon) {
                    html += '<i class="' + topMenu.icon + '"></i>';

                }
                html += '<span>' + topMenu.name + '</span>';
                html += '<span class="pull-right">';
                html += '<i class="menu-bar md-add"></i>';
                html += '</span>';
                html += '</a>';
                html += '<ul class="list-unstyled">';
                html += addChildMenu(topMenu.childs);
                html += '</ul>';
                html += '</li>';
            } else {
                html += "<li>";
                html += '<a href="javascript:void(0)" data-href="' + topMenu.url + '" class="waves-effect waves-light">';
                if (topMenu.icon) {
                    html += '<i class="' + topMenu.icon + '"></i>';
                }
                html += '<span>' + topMenu.name + '</span>';
                html += '</a>';
                html += '</li>'
            }
        }

        $('ul', '#sidebar-menu').html(html);
    };

    var initFunctions = function(functions) {
        if ($.isEmptyObject(functions)) {
            return;
        }

        for (var i in functions) {
            var funcs = functions[i];
            for (var j = 0; j < funcs.length; j++) {
                _functions[funcs[j].menuId] = funcs[j].menuId;
            }
        }
    };

    var loadingRights = function() {
        var option = {
            url: "unify-auth/rights/" + _lang,
            callback: function(result) {
                initSiderBarMenu(result.data.menus);
                initFunctions(result.data.functions);

                $.MoltranApp.init();

                leftMenuClick();

                //默认显示菜单页
                var initUrl = $('#sidebar-menu ul>li:first>a').data('href');
                if (initUrl) {
                    $('#sidebar-menu ul>li:first>a').addClass('subdrop');
                    Custom.getPage(initUrl, 'mainPageContent');
                } else {
                    initUrl = $('#sidebar-menu ul>li:first>ul>li:first>a').data('href');
                    if (initUrl) {
                        // $('#sidebar-menu ul>li:first>a').addClass('subdrop');
                        // $('#sidebar-menu ul>li:first>a>.pull-right>i').removeClass('md-add').addClass('md-remove');
                        // $('#sidebar-menu ul>li:first>ul').show();

                        $('#sidebar-menu ul>li:first>a').trigger('click');
                        Custom.getPage(initUrl, 'mainPageContent');
                    }
                }
            }
        };
        Custom.get(option);
    };
    var loadLanguage = function(filename, path, type) {
        var lang = 'zh_CN';
        var option = {
            url: 'unify-sys/language',
            callback: function(result) {
                if (result.success == true) {
                    lang = result.data;
                    lang = lang.toLowerCase();
                    if (lang.indexOf("zh") == 0) {
                        _lang = 'zh_CN';
                    } else {
                        _lang = 'en';
                    }
                    if (type == 'mainpage') {
                        //加载权限
                        loadingRights();
                    }
                    loadProperties(filename, path, _lang);
                }
            }
        }
        Custom.get(option);
    };

    // public functions
    return {
        init: function(contentPath) {

            _contextPath = contentPath;

            //设置AJAX的全局默认选项
            $.ajaxSetup({
                cache: false
            });
            //对script类型的预先处理
            $.ajaxPrefilter('script', function(options) {
                options.cache = true;
            });

            var storage = window.localStorage;
            _token = storage.getItem("uniportal.token");

            var username = sessionStorage.getItem('user.name');
            $('.login-user').text(username);
        },
        initPage: function() {
            $('.btn').each(function() {
                var $this = $(this);
                var functionId = $this.data('unify-right');
                if (functionId) {
                    if (!_functions[functionId]) {
                        $this.remove();
                    }
                }
            });
        },
        /**
         * [getLanguage 获取当前缓存语言]
         * @return {[type]} [description]
         */
        getLanguage: function() {
            return _lang;
        },
        /**
         * [getToken 获取当前缓存token]
         * @return {[type]} [description]
         */
        getToken: function() {
            return _token;
        },
        /**
         * [encodePwd 密码加密]
         * @param  {[type]} pwd [description]
         * @return {[type]}     [description]
         */
        encodePwd: function(pwd) {
            var xt = new Xxtea('uniportal');
            return xt.xxtea_encrypt(pwd);
        },
        /**
         * [loadI18n 加载国际化资源文件]
         * @param  {[type]} filename [资源文件前缀]
         * @param  {[type]} path     [资源文件路径]
         * @return {[type]}          [description]
         */
        loadI18n: function(filename, path, type) {
            if (type == null) {
                loadProperties(filename, path, _lang);
            } else {
                loadLanguage(filename, path, type);
            }
        },
        /**
         *
         * @param options contains properties
         * url : url must
         * formId : the submit form id must
         * type : not must default is POST
         * dataType : default is json. if is not json, you must setting refresh id.
         * @returns {Boolean}
         */
        ajaxSubmit: function(options) {

            var opts = $.extend({}, ajaxOpts, options);
            trimObj(opts);

            if (notNull(opts.url, 'url can not be null')) {
                return false;
            }
            if (notNull(opts.formId, 'formId can not be null.')) {
                return false;
            }

            var form = $('#' + opts.formId);

            if ($.isEmptyObject(opts.headers)) {
                opts.headers = {};
            }
            if (_token) {
                var token = {
                    'X-Access-Token': _token
                };
                opts.headers = $.extend({}, opts.headers, token);
            }

            if (_lang) {
                var headerLanguage = {
                    "Accept-Language": _lang
                };
                opts.headers = $.extend({}, opts.headers, headerLanguage);
            }

            var callback = opts.callback;
            if ($('#' + opts.formId).valid()) {
                form.ajaxSubmit({
                    type: opts.type,
                    url: opts.url,
                    dataType: opts.dataType,
                    contentType: opts.contentType,
                    headers: opts.headers,
                    timeout: opts.timeout,
                    success: function(data) {
                        successFunction(opts, data, callback);
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        errorFunction(XMLHttpRequest, textStatus, errorThrown);
                    }
                });
            }
        },
        xhrSubmit: function(options) {

            var opts = $.extend({}, ajaxOpts, options);
            trimObj(opts);

            if (notNull(opts.url, 'url can not be null')) {
                return false;
            }
            if (notNull(opts.formId, 'formId can not be null.')) {
                return false;
            }
            var fd;
            if (opts.data) {
                fd = opts.data;
            } else {
                var formElement = document.getElementById(opts.formId);
                fd = new FormData(formElement);
            }


            var xhr = new XMLHttpRequest();

            if (opts.progressId != null) {
                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                        $('#' + opts.progressId).css({
                            'width': percentComplete.toString() + '%'
                        }).find('span').html(percentComplete.toString() + '%');
                    }
                }, false);
            }

            xhr.open('POST', opts.url, true);

            xhr.setRequestHeader('X-Access-Token', _token);
            xhr.setRequestHeader('Accept-Language', _lang);

            var callback = opts.callback;

            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {

                    var data = eval("(" + xhr.responseText + ")");
                    //success处理方法
                    successFunction(opts, data, callback);
                } else {
                    errorFunction();
                }
            };
            xhr.send(fd);

        },
        fileSize: function(ele) {
            var filesize = '';
            var size = ele.files[0].size;
            if (size >= 1024 && size < 1024 * 1024) {
                filesize = (size / 1024).toFixed(2) + "K";
            } else if (size >= 1024 * 1024 && size < 1024 * 1024 * 1024) {
                filesize = (size / 1024 / 1024).toFixed(2) + "M";
            } else if (size >= 1024 * 1024 * 1024) {
                filesize = (size / 1024 / 1024 / 1024).toFixed(2) + "G";
            } else {
                filesize = size + "B";
            }
            return filesize;
        },
        easyModal: function(option) {
            var opts = $.extend({
                'hideBtn': true,
                'modalId': 'static',
                'body': option.content
            }, option);
            if (!opts.width) {
                opts.width = 500;
            }
            if (opts.height > 600) {
                opts.height = 600;
            }


            //垂直居中
            // var top = ($('.content-page .content').height() - opts.height) / 2;
            var top = ($(window).height() - opts.height - 70) / 2;
            $('#static .modal-content').css({
                'max-height': '600px',
                'height': opts.height,
                'margin': 'auto',
                'width': opts.width,
                'position': 'absolute',
                'top': top + 'px',
                'overflow-y': "hidden"

            });
            $('#static div.modal-dialog').css({
                'width': opts.width
            });

            //可拖动
            //$("#static").draggable({
            //  handle: ".modal-header",
            //  cursor: 'move',
            //   refreshPositions: false
            //});

            customModal(opts);
            var callback = opts.callback;
            if (callback && $.isFunction(callback)) {
                callback();
            }
        },
        //二次弹出框
        secondModal: function(options) {

            options.body = options.content
            $('#secondModalTitle').text(options.title);
            if (options.body) {
                $('#secondModalBody').html(options.body);
            }
            $('#secondModal').css({
                'margin': 'auto'
            });
            $('#secondModal>div.modal-dialog').css({
                'width': options.width
            });
            var callback = options.callback;
            if (callback && $.isFunction(callback)) {
                $('#secondModalConfirmBtn').unbind('click').click(callback);
            } else {
                $('#secondModalConfirmBtn').unbind('click');
            }
            //可拖动
            $("#secondModal").draggable({
                handle: ".modal-header",
                cursor: 'move',
                refreshPositions: false
            });

            $('#secondModal').modal('show').on('shown.bs.modal', function(e) {
                //$('.modal-backdrop.fade.in:gt(0)').remove(); //二次弹框去掉遮罩
                $('.modal-backdrop.fade.in').css('z-index', '1210');
            });
        },
        //右侧弹出modal
        rightModal: function(options) {
            options.body = options.content;
            // title, content, width, height
            // var options = {
            //   'body': content,
            //   'title': title,
            //   'width': width,
            //   'height': height
            // };
            //$('#rightModalBody').css('padding-top', '0px');

            if (options.body) {
                $('#rightModalBody').html(options.body);
            }
            $('#rightModal').css({
                'width': options.width
            });
            $('#rightModal .modal-dialog').css({
                'width': options.width
            });
            $('#rightModal').modal('show').on('shown.bs.modal', function(e) {
                $('.modal-backdrop.fade.in').remove();
            });

        },
        //提示框
        alertModal: function(msg, title, callback) {
            var options = {
                'body': msg,
                'title': title,
                width: 600
            };
            $('#alertModalTitle').text(options.title);
            if (options.body) {
                $('#alertModalBody').html(options.body);
            }
            $('#alertModal').css({
                'width': options.width,
                'margin': 'auto'
            });

            if (callback && $.isFunction(callback)) {
                $('#alertModalBtn').unbind('click').click(callback);
            } else {
                $('#alertModalBtn').unbind('click');
            }

            $('#alertModal').modal('show');
        },
        //确认框
        confirmModal: function(msg, title, width, callback) {
            var options = {
                'body': msg,
                'title': title,
                'width': width
            };

            $('#confirmModalTitle').text(options.title);
            if (options.body) {
                $('#confirmModalBody').html(options.body);
            }
            $('#confirmModal').css({
                'width': options.width,
                'margin': 'auto'
            });

            if (callback && $.isFunction(callback)) {
                $('#confirmModalConfirmBtn').unbind('click').click(callback);
            } else {
                $('#confirmModalConfirmBtn').unbind('click');
            }

            $('#confirmModal').modal('show');
        },
        //创建带校验的导航表单
        createValidatorForm: function($form_container, stepsOpt, callback) {
            // validate signup form on keyup and submit
            $form_container.children("div").steps({
                headerTag: stepsOpt.headerTag, //步骤按钮标记,如 h3
                bodyTag: stepsOpt.bodyTag, //步骤内容标记,如section
                transitionEffect: stepsOpt.transitionEffect, //步骤转换的动画效果
                stepsOrientation: stepsOpt.stepsOrientation, //Default value: 水平：horizontal or 0,垂直：vertical or 1
                onStepChanging: function(event, currentIndex, newIndex) {
                    $form_container.validate().settings.ignore = ":disabled,:hidden";
                    return $form_container.valid();
                },
                onFinishing: function(event, currentIndex) {
                    $form_container.validate().settings.ignore = ":disabled";
                    return $form_container.valid();
                },
                onFinished: function(event, currentIndex) {
                    if (callback && $.isFunction(callback)) {
                        callback();
                    } else {

                    }
                },
                /* Templates */
                titleTemplate: stepsOpt.titleTemplate,
                clearFixCssClass: stepsOpt.clearFixCssClass,
                /* Labels */
                labels: {
                    cancel: "取消",
                    current: "当前步:",
                    pagination: "Pagination",
                    finish: "提交",
                    next: "下一步",
                    previous: "上一步",
                    loading: "加载中 ..."
                }
            });
        },
        easyModal2: function(title, content, width, height) {
            var opts = {
                'title': title,
                'body': content,
                'hideBtn': true,
                'modalId': 'static2'
            };
            opts.height = height;
            if (width) {
                opts.width = width;
            } else {
                opts.width = 500;
            }
            customModal(opts);
        },
        easyAlert: function(msg, callback, title) {
            var opts = {
                'body': msg,
                'title': title
            }
            if (callback && $.isFunction(callback)) {
                opts.click = callback;
            } else {
                opts.click = null;
            }

            var options = $.extend(empty, modalOpts, opts);
            trimObj(options);

            $('#staticAlertModalTitle').text(options.title);

            if (options.body) {
                $('#staticAlertModalBody').html(options.body);
            }

            $('#staticAlertModalBtn').unbind('click')
            if (options.click && $.isFunction(options.click)) {
                $('#staticAlertModalBtn').unbind('click').click(options.click);
            }

            $('#staticAlert').modal('show');
            setTimeout(function() {
                $('#staticAlert').css({
                    'width': options.width
                });
            }, 200);
        },
        getDefaultValidateOpts: function() {
            return defaultValidateOpts;
        },
        easyConfirm: function(msg, callback, title, width) {
            if (notNull(msg, 'msg can not be null')) {
                return false;
            }

            var opts = {
                'body': msg
            };
            if (title) {
                opts.title = title;
            }
            if (width) {
                opts.width = width;
            }
            if (callback && $.isFunction(callback)) {
                opts.click = callback;
            } else {
                opts.click = null;
            }

            var confirm = $('#staticConfirm');

            var options = $.extend(empty, modalOpts, opts);
            trimObj(options);

            confirm.find('#staticConfirmModalTitle').text(options.title);

            if (options.body) {
                confirm.find('#staticConfirmModalBody').html(options.body);
            }

            if (options.click && $.isFunction(options.click)) {
                confirm.find('#staticConfirmModalConfirmBtn').unbind('click').click(options.click);
            }

            confirm.modal('show');

            setTimeout(function() {
                $('#staticConfirm').css({
                    'width': options.width
                });
            }, 200)
        },
        /**
         * url:加载数据的Url
         * callback : 处理data数据的回调函数 无参默认加载contentId数据
         * contentId : 无参则默认加载到page-content-body div中，如果是id选择器需要自带#，css选择器需要自带.
         */
        easyLoad: function(url, callback, contentId) {
            $.get(url, function(data) {
                if (callback && $.isFunction(callback)) {
                    callback(data);
                } else {
                    Custom.easyFreshContent(data, contentId);
                }
            });
        },
        easyFreshContent: function(data, contentId) {
            if (contentId) {
                $(contentId).html(data);
            } else {
                $('#mainPageContent').html(data);
            }
        },
        stopBubble: function(e) {
            if (e && e.stopPropagation) {
                e.stopPropagation();
            } else {
                window.event.cancelBubble = true
            }
        },
        stopDefault: function(e) {
            //阻止默认浏览器动作(W3C)
            if (e && e.preventDefault)
                e.preventDefault();
            //IE中阻止函数器默认动作的方式
            else
                window.event.returnValue = false;
            return false;
        },
        getJson: function(option) {
            $.getJSON(option.url, function(data) {
                if (data.retCode == '10000002') {
                    location.href = result.loginUrl;
                };
                if (option.callback && $.isFunction(option.callback)) {
                    option.callback(data)
                }
            })
        },
        getContentPath: function() {
            return _contextPath;
        },
        get: function(option) {
            var opts = $.extend({
                type: "GET"
            }, option);
            ajax(opts);
        },
        post: function(option) {
            var opts = $.extend({
                type: "POST"
            }, option);
            ajax(opts);
        },
        put: function(option) {
            var opts = $.extend({
                type: "PUT"
            }, option);
            ajax(opts);
        },
        del: function(option) {
            var opts = $.extend({
                type: "DELETE"
            }, option);
            ajax(opts);
        },
        export: function(option) {
            var opts = $.extend({
                type: "POST"
            }, option);
            ajax(opts);
        },
        getPage: function(url, contentId, callback, errorCallback) {

            $.ajax({
                type: "GET",
                cache: false,
                url: url,
                dataType: "html",
                async: false,
                success: function(data) {
                    if (callback && $.isFunction(callback)) {
                        callback(data);
                    } else {
                        $('#' + contentId + '').html(data);
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {

                    if (errorCallback && $.isFunction(errorCallback)) {
                        errorCallback(errorThrown);
                    } else {
                        $('#' + contentId + '').html('<h4>' + $.i18n.prop('load_page_failed') + '</h4>');
                    }
                }
            });
        },
        blockUI: function(el, centerY) {
            var el = jQuery(el);
            if (el.height() <= 400) {
                centerY = true;
            }
            el.block({
                message: '<img src="./pages/common/images/ajax-loading.gif" align="">',
                centerY: centerY != undefined ? centerY : true,
                css: {
                    top: '30%',
                    border: 'none',
                    padding: '2px',
                    backgroundColor: 'none'
                },
                overlayCSS: {
                    backgroundColor: '#000',
                    opacity: 0.5,
                    cursor: 'wait'
                }
            });
        },

        // wrapper function to  un-block element(finish loading)
        unblockUI: function(el, clean) {
            jQuery(el).unblock({
                onUnblock: function() {
                    jQuery(el).css('position', '');
                    jQuery(el).css('zoom', '');
                }
            });
        },
        serializeJson: function(selector) {
            var serializeObj = {};
            var $this = $(selector);
            var array = $this.serializeArray();
            $(array).each(function() {
                if (serializeObj[this.name]) {
                    if ($.isArray(serializeObj[this.name])) {
                        serializeObj[this.name].push(this.value);
                    } else {
                        serializeObj[this.name] = [serializeObj[this.name], this.value];
                    }
                } else {
                    serializeObj[this.name] = this.value;
                }
            });
            return JSON.stringify(serializeObj);
        },
        /**
         * [tableHeightResize description]表格高度自适应调整
         * @param  {[type]} settings [description] 
         * @return {[type]}          [description]
         */
        tableHeightResize: function(settings, type) {
            var scrollBody = settings.nScrollBody;
            var wrapper = settings.nTableWrapper;
            var wrapperHeight = wrapper.clientHeight;
            var scroll = wrapper.getElementsByClassName('dataTables_scroll')[0];

            var scrollBodyHeight = scrollBody.clientHeight;
            var tableHeight = settings.nTable.clientHeight;
            var tableHeadHeight = settings.nTHead.clientHeight;
            if (type == 1) { //树结构 表格
                if (tableHeight + tableHeadHeight + 68 <= wrapperHeight) {
                    scrollBody.style.height = tableHeight + 18 + 'px';
                    scroll.style.height = tableHeight + tableHeadHeight + 18 + 'px';
                } else {
                    scrollBody.style.height = wrapperHeight - 95 + 'px';
                    scroll.style.height = wrapperHeight - 47 + 'px';
                }
            }
            if (type == 2) { //弹出框 table
                if (tableHeight + 42 <= wrapperHeight) {
                    scrollBody.style.height = tableHeight - tableHeadHeight + 42 + 'px';
                    scroll.style.height = tableHeight + 42 + 'px';
                } else {
                    scrollBody.style.height = wrapperHeight - 115 + 'px';
                    scroll.style.height = wrapperHeight - 37 + 'px';
                }
            } else { //简单页面 table
                if (tableHeight + 42 <= wrapperHeight) {
                    scrollBody.style.height = tableHeight - tableHeadHeight + 42 + 'px';
                    scroll.style.height = tableHeight + 42 + 'px';
                } else {
                    scrollBody.style.height = wrapperHeight - 85 + 'px';
                    scroll.style.height = wrapperHeight - 37 + 'px';
                }
            }

            //隐藏滚动条
            scrollBody.style.overflow = "hidden";
            //滚动条
            $(scrollBody).niceScroll({
                height: 'auto',
                cursorcolor: '#9d9ea5',
                size: "10px",
                cursorborderradius: '0px',
                // horizrailenabled: false,
                cursoropacitymax: 0.8
            });
        },
        /**
         * [moveData description] 左右表格选中数据移动
         * @param  {[type]} from      [description]
         * @param  {[type]} to        [description]
         * @param  {[type]} selecteds [description]
         * @return {[type]}           [description]
         */
        moveData: function(option) {
            var from = option.from;
            var to = option.to;
            var selecteds = option.selecteds;
            if (selecteds.length > 0) {
                var datas = [];
                for (var i = 0; i < selecteds.length; i++) {
                    datas.push(from.fnGetData(selecteds[i]));
                }
                to.fnAddData(datas);
                from.fnDeleteRow(selecteds);

            }
        },
        /**
         * [dataFilter description] 表格左右移，左侧表格过滤已选数据
         * @param  {[type]} leftData  [description]
         * @param  {[type]} rightData [description]
         * @return {[type]}           [description]
         */
        dataFilter: function(option) {
            var leftData = option.leftData;
            var rightData = option.rightData;
            var ID = option.ID;

            var result = [];
            var flag = true;
            for (var i = 0; i < leftData.length; i++) {
                flag = true;
                for (var j = 0; j < rightData.length; j++) {
                    if (rightData[j][ID] == leftData[i][ID]) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    result.push(leftData[i]);
                }

            }
            return result;

        },
        sprintf: function(text) {
            var i = 1,
                args = arguments;
            return text.replace(/%s/g, function() {
                return (i < args.length) ? args[i++] : "";
            });
        }
    };
}();
