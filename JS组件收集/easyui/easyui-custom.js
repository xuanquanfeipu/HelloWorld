$.fn.pagination.defaults = {
    total: 1,
    pageNumber: 1,
    striped: true,
    pageList: [10, 15, 20, 30, 50, 100],
    loading: false,
    buttons: null,
    showPageList: true,
    showRefresh: false,
    links: 10,
    layout: ["sep", "sep", "first", "prev", "manual", "next", "last", "sep", "list"],
    onSelectPage: function (_c4, _c5) {
    },
    onBeforeRefresh: function (_c6, _c7) {
    },
    onRefresh: function (_c8, _c9) {
    },
    onChangePageSize: function (_ca) {
    },
    beforePageText: " ",
    afterPageText: " / {pages} 页",
    displayMsg: " 共 {total} 条记录",
    nav: {
        first: {
            iconCls: "pagination-first",
            handler: function () {
                var _cb = $(this).pagination("options");
                if (_cb.pageNumber > 1) {
                    $(this).pagination("select", 1);
                }
            }
        },
        prev: {
            iconCls: "pagination-prev",
            handler: function () {
                var _cc = $(this).pagination("options");
                if (_cc.pageNumber > 1) {
                    $(this).pagination("select", _cc.pageNumber - 1);
                }
            }
        },
        next: {
            iconCls: "pagination-next",
            handler: function () {
                var _cd = $(this).pagination("options");
                var _ce = Math.ceil(_cd.total / _cd.pageSize);
                if (_cd.pageNumber < _ce) {
                    $(this).pagination("select", _cd.pageNumber + 1);
                }
            }
        },
        last: {
            iconCls: "pagination-last",
            handler: function () {
                var _cf = $(this).pagination("options");
                var _d0 = Math.ceil(_cf.total / _cf.pageSize);
                if (_cf.pageNumber < _d0) {
                    $(this).pagination("select", _d0);
                }
            }
        },
        refresh: {
            iconCls: "pagination-refresh",
            handler: function () {
                var _d1 = $(this).pagination("options");
                if (_d1.onBeforeRefresh.call(this, _d1.pageNumber, _d1.pageSize) != false) {
                    $(this).pagination("select", _d1.pageNumber);
                    _d1.onRefresh.call(this, _d1.pageNumber, _d1.pageSize);
                }
            }
        }
    }
};
$(function () {
//    $.fn.datagrid.defaults.height = $(document).height() * 0.65;
    $.fn.datagrid.defaults.width =  $(document).width()*0.9;
    $.fn.datagrid.defaults.singleSelect = true;
    $.fn.window.defaults.shadow = false;
});
function autoPageSize() {
    var tableHeight = $(document).height() * 0.45;
    var rowHeight = 35; //默认行高35px
    var rowCount = parseInt(tableHeight / 35); //总高度/行高=总的行数（包括表头和分页显示行），取整数部分
    var dataRowCount = rowCount - 2; //每页记录数=总行数-（表头+分页行）
    var finalCount = 0;
    if (dataRowCount > 50) {
        finalCount = 100; //dataRowCount ＞ 50，每页100条
    } else if (dataRowCount > 30) {
        finalCount = 50; //30 ＜ dataRowCount ＜= 50，每页50条
    } else if (dataRowCount > 20) {
        finalCount = 30; //20 ＜ dataRowCount ＜= 30，每页30条
    } else if (dataRowCount > 10) {
        finalCount = 20; //15 ＜ dataRowCount ＜= 20，每页20条
    } else {
        finalCount = 10; //默认每页10条
    }
    return finalCount;
}
