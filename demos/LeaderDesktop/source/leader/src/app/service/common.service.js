/**
 * Created by tan on 2017/4/21.
 */

(function() {
  'use strict';

  angular
    .module('smartCore')
    .service('CommService', CommService);

  /** @ngInject */
  function CommService($http,SweetAlert) {
    this.setItem = function (key, value) {
      sessionStorage.setItem(key, value);
    };

    this.getItem = function (key) {
      return sessionStorage.getItem(key);
    };

    this.setJsonItem = function (key, value) {
      var jsonValue = JSON.stringify(value);
      sessionStorage.setItem(key, jsonValue);
    };

    this.getJsonItem = function (key) {
      return JSON.parse(sessionStorage.getItem(key));
    };
	this.resizeContentBoxHeight=function () {
      //$(".mysidebar").slimScroll({destroy: true}).height("auto");
      if (typeof $.fn.slimScroll != 'undefined') {
        $(".sidebar").slimScroll({destroy: true});
        $(".sidebar-box").slimScroll({destroy: true});
      }
      //Add slimscroll
    //  $(".sidebar-box").slimScroll({
    //    height: ($(window).height()-230) + "px",//$(window).height()-180
    //    color: '#fff',
    //    alwaysVisible: true
    //  });
      //console.log(1);
      var contentBoxHeight=$(window).height()-64;
      $('.content-box-wrapper').height(contentBoxHeight+'px');
      $('.wrapper').height($(window).height()+'px');
      //$('.content-wrapper').height($(window).height()+'px');
      //$('.content-wrapper').css('min-height','');
      var screenWidth=window.screen.width;
      if(screenWidth<1920){
        $('.content-box').css('min-width','1160px');
      }else{
        $('.content-box').css('min-width','1553px');
      }
      //console.log(window.screen.width);
    };
    this.getHttpJsonItem = function (key,url,callback) {
      if(sessionStorage.getItem(key)!=null){
        var jsonData = JSON.parse(sessionStorage.getItem(key));
        if (angular.isUndefined(jsonData)) {
          SweetAlert.swal("没有查到相关数据");
          return;
        }
        callback(jsonData);
      }else{
        $http.get(url).success(function (response) {
          if (angular.isUndefined(response)) {
            SweetAlert.swal("没有查到相关数据");
            return;
          }
          callback(response);
          var jsonValue = JSON.stringify(response);
          sessionStorage.setItem(key, jsonValue);
        }).error(function () {
          SweetAlert.swal("网络有问题，待会再试");
        });
      }
    };

    this.setArrItem = function (key, value) {
      var jsonValue = JSON.stringify(value);
      sessionStorage.setItem(key, jsonValue);
    };

    this.getArrItem = function (arr, key) {
      var item = JSON.parse(sessionStorage.getItem(key));
      for(var i=0; i<item.length; i++){
        arr.push(item[i]);
      }
      return arr;
    };
    this.getScreenSize=function(){
      var screenWidth=window.screen.width;
      var screenHeight=window.screen.height;
      if(screenWidth>1900){
        return {type:'L',size:[screenWidth,screenHeight]};
      }else{
        return {type:'M',size:[screenWidth,screenHeight]};
      }
    };

    this.getGrowth=function(val1, val2) {
      if (!val1 || !val2) {
        return null;
      } else {
        val1 = parseFloat(val1);
        val2 = parseFloat(val2);
        var growth = ((val2 - val1) / val1 * 100).toFixed(2);
        return Math.abs(growth);
      }
    };

    // 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
    this.colorToRgb = function(sColor){
      var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      var sColor = sColor.toLowerCase();
      if(sColor && reg.test(sColor)){
        if(sColor.length === 4){
          var sColorNew = "#";
          for(var i=1; i<4; i+=1){
            sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
          }
          sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for(var i=1; i<7; i+=2){
          sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));
        }
        return sColorChange;
      }else{
        return sColor;
      }
    };

// 将rgb表示方式转换为hex表示方式
    this.colorToHex=function(rgb){
      var _this = rgb;
      var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      if(/^(rgb|RGB)/.test(_this)){
        var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g,"").split(",");
        var strHex = "#";
        for(var i=0; i<aColor.length; i++){
          var hex = Number(aColor[i]).toString(16);
          hex = hex<10 ? 0+''+hex :hex;// 保证每个rgb的值为2位
          if(hex === "0"){
            hex += hex;
          }
          strHex += hex;
        }
        if(strHex.length !== 7){
          strHex = _this;
        }

        return strHex;
      }else if(reg.test(_this)){
        var aNum = _this.replace(/#/,"").split("");
        if(aNum.length === 6){
          return _this;
        }else if(aNum.length === 3){
          var numHex = "#";
          for(var i=0; i<aNum.length; i+=1){
            numHex += (aNum[i]+aNum[i]);
          }
          return numHex;
        }
      }else{
        return _this;
      }
    };
    /*
     // startColor：开始颜色hex
     // endColor：结束颜色hex
     // step:几个阶级（几步）
     */
    this.gradientColor=function(startColor,endColor,step){
      var startRGB = this.colorToRgb(startColor);//转换为rgb数组模式
      var startR = startRGB[0];
      var startG = startRGB[1];
      var startB = startRGB[2];

      var endRGB = this.colorToRgb(endColor);
      var endR = endRGB[0];
      var endG = endRGB[1];
      var endB = endRGB[2];

      var sR = (endR-startR)/step;//总差值
      var sG = (endG-startG)/step;
      var sB = (endB-startB)/step;

      var colorArr = [];
      for(var i=0;i<step;i++){
        //计算每一步的hex值
        var hex = this.colorToHex('rgb('+parseInt((sR*i+startR))+','+parseInt((sG*i+startG))+','+parseInt((sB*i+startB))+')');
        colorArr.push(hex);
      }
      return colorArr;
    };

    //查询相隔的月份（入参格式YYYYMM）
    this.monthSpan=function(date1,date2){
      var year1=parseInt(date1.toString().substring(0,4));
      var year2=parseInt(date2.toString().substring(0,4));
      var month1=parseInt(date1.toString().substring(4,6));
      var month2=parseInt(date2.toString().substring(4,6));
      return (year2-year1)*12 + (month2-month1);
    };

    this.getSign=function(value){
      if(value>0){
        return '↑'+value+'%';
      }else if(value<0){
        return '↓'+value+'%';
      }else{
        return value+'%';
      }
    };

    this.getSignColor=function(value){
      if(value>=0){
        return {color:'#d24660'};
      }else{
        return {color:'#66a154'};
      }
    };

    //返回当月有多少天(入参格式YYYYMM)
    this.getDaysNumByMonth=function(date){
      var year = date.substring(0,4);
      var month = date.substring(4,6);
      if(month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12){
        return 31;
      }else if(month==4 || month==6 || month==9 || month==11){
        return 30;
      }else if(month==2){
        if(year%4==0&&year%100!=0){
          return 29;
        }else{
          return 28;
        }
      }
    };

    //导出excel start
    this.datenum = function(v, date1904) {
      if(date1904) v+=1462;
      var epoch = Date.parse(v);
      return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
    };

    this.sheet_from_array_of_arrays =function(data, opts) {
      var ws = {};
      var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
      for(var R = 0; R != data.length; ++R) {
        for(var C = 0; C != data[R].length; ++C) {
          if(range.s.r > R) range.s.r = R;
          if(range.s.c > C) range.s.c = C;
          if(range.e.r < R) range.e.r = R;
          if(range.e.c < C) range.e.c = C;
          var cell = {v: data[R][C] };
          if(cell.v == null) continue;
          var cell_ref = XLSX.utils.encode_cell({c:C,r:R});

          if(typeof cell.v === 'number') cell.t = 'n';
          else if(typeof cell.v === 'boolean') cell.t = 'b';
          else if(cell.v instanceof Date) {
            cell.t = 'n'; cell.z = XLSX.SSF._table[14];
            cell.v = this.datenum(cell.v);
          }
          else cell.t = 's';

          ws[cell_ref] = cell;
        }
      }
      if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
      return ws;
    };

    this.downloadExl=function(filename,data, type) {
      var wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };//这里的数据是用来定义导出的格式类型
      var wb = { SheetNames: ['Sheet1'], Sheets: {}, Props: {} };
      //wb.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(data);//通过json_to_sheet转成单页(Sheet)数据
      var ws = this.sheet_from_array_of_arrays(data);
      wb.Sheets['Sheet1'] =ws;
      saveAs(new Blob([this.s2ab(XLSX.write(wb, wopts))], { type: "application/octet-stream" }), filename+ '.' + (wopts.bookType=="biff2"?"xls":wopts.bookType));
    };

    this.s2ab =function (s) {
      if (typeof ArrayBuffer !== 'undefined') {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
      } else {
        var buf = new Array(s.length);
        for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
        return buf;
      }
    };

    this.exportToExcel = function(filename,opt){
      var axisData = opt.xAxis.data;
      var series = opt.series;
      //var data = [['指标',2001,2002],['指标1', 123, "sheetjs"],["foo","bar",new Date("2014-02-19T14:30Z")], ["baz", null, "qux"]];
      var data=[];
      var title=['指标'];
      for(var t in axisData){
        title.push(axisData[t]);
      }
      data.push(title);
      for(var i in series){
        if(series[i].shadow){
          continue;
        }
        var row=[];
        row.push(series[i].name);
        for(var j in axisData){
          row.push(series[i].data[j]);
        }
        data.push(row);
      }
      //console.log(data);
      this.downloadExl(filename,data);
    };
    //导出excell end
    //保存图片
    this.downloadFile=function (filename,url) {
      var $a = document.createElement('a');
      $a.download = filename;
      $a.target = '_blank';
      $a.href = url;
      if (window.ActiveXObject || "ActiveXObject" in window){//IE
        if (window.navigator.msSaveOrOpenBlob) {
          var bstr = atob(url.split(',')[1]);
          var n = bstr.length;
          var u8arr = new Uint8Array(n);
          while(n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          var blob = new Blob([u8arr]);
          window.navigator.msSaveOrOpenBlob(blob, filename);
        }
        else {
          var lang = model.get('lang');
          var html = '' +
            '<body style="margin:0;">' +
            '<img src="' + url + '" style="max-width:100%;" title="' + ((lang && lang[0]) || '') + '" />' +
            '</body>';
          var tab = window.open();
          tab.document.write(html);
        }
      }else{//非IE
        var evt = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: false
        });
        $a.dispatchEvent(evt);
      }
      // Chrome and Firefox
      /*if (typeof MouseEvent === 'function' && !$.browser.msie) {
        var evt = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: false
        });
        $a.dispatchEvent(evt);
      }
      // IE
      else {
        if (window.navigator.msSaveOrOpenBlob) {
          var bstr = atob(url.split(',')[1]);
          var n = bstr.length;
          var u8arr = new Uint8Array(n);
          while(n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          var blob = new Blob([u8arr]);
          window.navigator.msSaveOrOpenBlob(blob, title + '.' + type);
        }
        else {
          var lang = model.get('lang');
          var html = '' +
            '<body style="margin:0;">' +
            '<img src="' + url + '" style="max-width:100%;" title="' + ((lang && lang[0]) || '') + '" />' +
            '</body>';
          var tab = window.open();
          tab.document.write(html);
        }
      }*/
    };

    this.canvasToImage=function(canvas,backgroundColor)
    {
      //cache height and width
      var w = canvas.width;
      var h = canvas.height;
      var context=canvas.getContext("2d");

      var data;

      if(backgroundColor)
      {
        //get the current ImageData for the canvas.
        data = context.getImageData(0, 0, w, h);

        //store the current globalCompositeOperation
        var compositeOperation = context.globalCompositeOperation;

        //set to draw behind current content
        context.globalCompositeOperation = "destination-over";

        //set background color
        context.fillStyle = backgroundColor;

        //draw background / rect on entire canvas
        context.fillRect(0,0,w,h);
      }

      //get the image data from the canvas
      var imageData = canvas.toDataURL("image/png");

      if(backgroundColor)
      {
        //clear the canvas
        context.clearRect (0,0,w,h);

        //restore it with original / cached ImageData
        context.putImageData(data, 0,0);

        //reset the globalCompositeOperation to what it was
        context.globalCompositeOperation = compositeOperation;
      }

      //return the Base64 encoded data url string
      return imageData;
    }
  }

})();
