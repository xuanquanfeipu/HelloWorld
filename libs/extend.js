var lang = i18nLanguage == 'zh' ? {
    "sProcessing": "正在加载中......",
    "sLengthMenu": "显示 _MENU_ 条",
    "sZeroRecords": "对不起，查询不到相关数据！",
    "sEmptyTable": "表中无数据存在！",
    // "sInfo": "页数  _PAGE_ / _PAGES_ 当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
    "sInfo": "页数  _PAGE_ / _PAGES_ &nbsp;&nbsp;&nbsp;&nbsp;共 _TOTAL_ 条记录",
    "sInfoEmpty": "页数  0 / 0 &nbsp;&nbsp;&nbsp;&nbsp;共 0 条记录",
    // "sInfoFiltered": "数据表中共为 _MAX_ 条记录",
    // "sSearch": "搜索",
    "oPaginate": {
        "sNext": "<i class='md page-next'></i>",
        "sPrevious": "<i class='md page-previous'></i>"
        // "sFirst": "首页",
        // "sPrevious": "上一页",
        // "sNext": "下一页",
        // "sLast": "末页"
    }
} : {
    "sEmptyTable": "No data available in table",
    "sInfo": "Showing _START_ to _END_ of _TOTAL_ entries",
    "sInfoEmpty": "Showing 0 to 0 of 0 entries",
    "sInfoFiltered": "(filtered from _MAX_ total entries)",
    "sInfoPostFix": "",
    "sInfoThousands": ",",
    "sLengthMenu": "Show _MENU_ entries",
    "sLoadingRecords": "Loading...",
    "sProcessing": "Processing...",
    "sSearch": "Search:",
    "sZeroRecords": "No matching records found",
    "oPaginate": {
        "sFirst": "First",
        "sLast": "Last",
        "sNext": "Next",
        "sPrevious": "Previous"
    },
    "oAria": {
        "sSortAscending": ": activate to sort column ascending",
        "sSortDescending": ": activate to sort column descending"
    }
};
/*
{
    "sProcessing":   "处理中...",
    "sLengthMenu":   "显示 _MENU_ 项结果",
    "sZeroRecords":  "没有匹配结果",
    "sInfo":         "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
    "sInfoEmpty":    "显示第 0 至 0 项结果，共 0 项",
    "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
    "sInfoPostFix":  "",
    "sSearch":       "搜索:",
    "sUrl":          "",
    "sEmptyTable":     "表中数据为空",
    "sLoadingRecords": "载入中...",
    "sInfoThousands":  ",",
    "oPaginate": {
        "sFirst":    "首页",
        "sPrevious": "上页",
        "sNext":     "下页",
        "sLast":     "末页"
    },
    "oAria": {
        "sSortAscending":  ": 以升序排列此列",
        "sSortDescending": ": 以降序排列此列"
    }
}
*/
$.fn.extend({
    datatables_options: {
        "bAutoWidth": false, //自动设置宽度关闭
        // "jQueryUI": false,
        "bScrollInfinite": true,
        "sScrollY": "1000px",
        "bScrollCollapse": true, //配合sScrollY，显示内容不满时，不产生空白
        "iDisplayLength": 20, //每页显示20条数据
        "lengthMenu": [10, 20, 50, 100], //条数选项
        "pagingType": "simple", //分页样式
        "bProcessing": false,
        "bServerSide": true,
        "aaSorting": [ //默认排序
            [2, "asc"]
        ],
        "oLanguage": lang,
        "dom": 'rt<"col-md-12 table-paginate"lip><"clear">'
    },
    datatables_oLanguage: lang,
    select2_defaults: {
        blankMsg: "请输入", //这里填写空选项时显示的文字   
        minLength: 0, //至少输入多少个字符后才会去调用ajax 
        maxLength: 0, //最多能输入多少个字符后才会去调用ajax
        url: '', //远程加载的url  
        params: null, //url参数 
        search: -1, //默认不带搜索框 -1，
        allowClear: false, //是否可消除已选值，false为不可以
        width: '100%', //选择框宽度  
        delay: 1000,
        dataType: "json",
        contentType: "application/json",
        timeout: "30000",
        valueField: 'id', //value名 对应id的属性名
        textField: 'text' //显示的text   
    },
    select2Remote: function(options) {
        var opts = $.extend({}, $.fn.select2_defaults, options);

        var _token = Custom.getToken();
        if (_token) {
            var token = {
                'X-Access-Token': _token
            };
            opts.headers = $.extend({}, opts.headers, token);
        }
        var _lang = Custom.getLanguage();
        if (_lang) {
            var headerLanguage = {
                "Accept-Language": _lang
            };
            opts.headers = $.extend({}, opts.headers, headerLanguage);
        }

        this.select2({
            placeholder: opts.blankMsg,
            escapeMarkup: function(markup) {
                return markup;
            },
            minimumResultsForSearch: opts.search,
            minimumInputLength: opts.minLength, //至少输入多少个字符后才会去调用ajax  
            maximumInputLength: opts.maxLength, //最多能输入多少个字符后才会去调用ajax
            allowClear: opts.allowClear,
            width: opts.width,
            id: function(obj) {
                return obj[opts.valueField];
            },
            templateResult: function(repo) {
                return repo[opts.textField];
            },
            templateSelection: function(repo) {
                var id = repo[opts.valueField];
                if (id == null || id == "") {
                    return opts.blankMsg;
                }
                return repo[opts.textField];
            },
            ajax: {
                url: opts.url,
                dataType: opts.dataType,
                delay: opts.delay,
                contentType: opts.contentType,
                headers: opts.headers,
                timeout: opts.timeout,
                data: function(params) {

                    var obj = {};
                    if (opts.params != null) {
                        $.each(opts.params, function(i, item) {
                            obj[item.name] = $('#' + item.id).val();
                        });
                    }
                    return obj;
                },
                processResults: function(result, page) {
                    if (opts.valueField != 'id') {
                        var datas = result.data;
                        if (datas) {
                            for (var i in datas) {
                                datas[i].id = datas[i][opts.valueField];
                            }
                        }
                    }
                    //ajax返回的对象 
                    return {
                        results: result.data
                    };
                },
                cache: true
            }
        });
    }

});

$.validator.addMethod("suffix", function(value, element, param) {
    var value = value.toLowerCase();
    var filepathsplit = value.split("\\");
    var filename = filepathsplit[filepathsplit.length - 1];
    var filenamesplit = filename.split("\.");
    var filesuffix = filenamesplit[filenamesplit.length - 1];
    var result = false;
    for (var i = 0; i < param.length; i++) {
        if (param[i].toLowerCase() == filesuffix) {
            result = true;
            break;
        }
    }
    return this.optional(element) || result;
}, $.validator.format("选择文件类型错误,请重新选择文件！"));
