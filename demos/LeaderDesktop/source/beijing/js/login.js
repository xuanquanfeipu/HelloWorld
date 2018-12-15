/**
 * Created by FJ on 2017/4/7.
 */
 var speed=100;
   demo2.innerHTML=demo1.innerHTML;
   function Marquee(){
       if(demo2.offsetTop-demo.scrollTop<=0)
           demo.scrollTop-=demo1.offsetHeight;
       else{
           demo.scrollTop++
       }
   }
   var MyMar=setInterval(Marquee,speed);
   demo.onmouseover=function() {clearInterval(MyMar)};
   demo.onmouseout=function() {MyMar=setInterval(Marquee,speed)};
