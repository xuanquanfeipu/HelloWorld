function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var dataURL = canvas.toDataURL("image/png");  // 可选其他值 image/jpeg
    return dataURL;
}

function main(src, cb) {
    var image = new Image();
    image.src = src + '?v=' + Math.random(); // 处理缓存
    image.crossOrigin = "*";  // 支持跨域图片
    image.onload = function(){
        var base64 = getBase64Image(image);
        cb && cb(base64);
    }
}

main('http://wwww.test/test.png', function(base64){
    console.log(base64);
});

/*
目前，Data URI scheme支持的类型有：
data:,文本数据
data:text/plain,文本数据
data:text/html,HTML代码
data:text/html;base64,base64编码的HTML代码
data:text/css,CSS代码
data:text/css;base64,base64编码的CSS代码
data:text/javascript,Javascript代码
data:text/javascript;base64,base64编码的Javascript代码
data:image/gif;base64,base64编码的gif图片数据
data:image/png;base64,base64编码的png图片数据
data:image/jpeg;base64,base64编码的jpeg图片数据
data:image/x-icon;base64,base64编码的icon图片数据
*/


/*
场景一：将用户本地上传的资源转化，即用户通过浏览器点击文件上传时，将图片资源转化成base64：

<input type="file" id="image"><br/>
*/
var reader = new FileReader();
        var AllowImgFileSize = 2100000; //上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败
        var file = $("#image")[0].files[0];
        var imgUrlBase64;
        if (file) {
            //将文件以Data URL形式读入页面  
            imgUrlBase64 = reader.readAsDataURL(file);
            reader.onload = function (e) {
              //var ImgFileSize = reader.result.substring(reader.result.indexOf(",") + 1).length;//截取base64码部分（可选可不选，需要与后台沟通）
              if (AllowImgFileSize != 0 && AllowImgFileSize < reader.result.length) {
                    alert( '上传失败，请上传不大于2M的图片！');
                    return;
                }else{
                    //执行上传操作
                    alert(reader.result);
                }
            }
         }

//场景二：将本项目中的图片资源转化成base64,（我还没有用到过此场景，感觉场景二也可以通过场景三来实现）

function(){
       var url = "static/img/js1.jpg";//这是站内的一张图片资源，采用的相对路径
       convertImgToBase64(url, function(base64Img){
        //转化后的base64
        alert(base64Img);
       });             
    }

    //实现将项目的图片转化成base64
    function convertImgToBase64(url, callback, outputFormat){
       var canvas = document.createElement('CANVAS'),
    　　ctx = canvas.getContext('2d'),
    　　img = new Image;
    　　img.crossOrigin = 'Anonymous';
    　　img.onload = function(){
        　　canvas.height = img.height;
        　　canvas.width = img.width;
        　　ctx.drawImage(img,0,0);
        　　var dataURL = canvas.toDataURL(outputFormat || 'image/png');
        　　callback.call(this, dataURL);
        　　canvas = null; 
        };
    　　img.src = url;
    }

//场景三：将网络图片资源转化为base64，（感觉场景二中的资源换成绝对路径即可使用在场景三中）

function(){
    　　 //这是网上的一张图片链接
    　　 var url="http://p1.pstatp.com/large/435d000085555bd8de10";
        getBase64(url)
            .then(function(base64){
                  console.log(base64);//处理成功打印在控制台
            },function(err){
                  console.log(err);//打印异常信息
            });                        
    }    

    //传入图片路径，返回base64
    function getBase64(img){
        function getBase64Image(img,width,height) {//width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
          var canvas = document.createElement("canvas");
          canvas.width = width ? width : img.width;
          canvas.height = height ? height : img.height;
 
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          var dataURL = canvas.toDataURL();
          return dataURL;
        }
        var image = new Image();
        image.crossOrigin = '';
        image.src = img;
        var deferred=$.Deferred();
        if(img){
          image.onload =function (){
            deferred.resolve(getBase64Image(image));//将base64传给done上传处理
          }
          return deferred.promise();//问题要让onload完成后再return sessionStorage['imgTest']
        }
      }

//拓展一：后台需要以纯字符串的形式上传（即去掉data:image/png;base64，截取字符串即可）
