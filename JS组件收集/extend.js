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
    "bProcessing": true,
    "bServerSide": true,
    "aaSorting": [ //默认排序
      [2, "asc"]
    ],
    "oLanguage": {
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
    },
    "dom": 'rt<"col-md-12 table-paginate"lip><"clear">'
  },
  datatables_oLanguage: {
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
  },
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
    valueField: 'id', //value名 对应id的属性名
    textField: 'text' //显示的text   
  },
  select2Remote: function(options) {
    var opts = $.extend({}, $.fn.select2_defaults, options);
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
        dataType: 'json',
        delay: opts.delay,
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