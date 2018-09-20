<template>
  <div class="page">
    <!--banner开始-->
    <banner :banner-msg="bannerMsg"></banner>
    <!--banner结束-->

    <!--牟点菜单开始-->
    <b-card no-body ref="navContent">
      <b-nav justified pills slot="header" v-b-scrollspy>
        <b-nav-item active href="#one" @click="scrollIntoView">功能介绍</b-nav-item>
        <b-nav-item href="#two" @click="scrollIntoView">云上实验室列表</b-nav-item>
        <b-nav-item href="#three" @click="scrollIntoView">预约流程</b-nav-item>
        <b-nav-item href="#four" @click="scrollIntoView">使用指导</b-nav-item>
      </b-nav>
      <b-card-body style="background-color: #f7f8fa;padding: 0;">
    <!--开发内容start-->
        <div id="one" class="grid-title font-big title">{{clouds.title}}</div>
        <div class="develop main">
          <!--功能介绍start-->
          <el-row :gutter="20" class="functions">
            <el-col :span="24">
              <div class="grid-content">
                <div class="video">
                  <video-player ref="videoPlayer"
                                :playsinline="true"
                                :options="playerOptions"
                                style="position: absolute;right: 0;top:0;"
                                @play="onPlayerPlay($event)"
                                @pause="onPlayerPause($event)"
                  ></video-player>
                  <div class="video-title" v-show="!playFlag">功能介绍</div>
                </div>
              </div>
            </el-col>
            <el-col :span="24" class="functions-desc">
                <div class="font-middle-bg font-middle">
                  {{clouds.desc}}
                </div>
            </el-col>
          </el-row>
          <!--功能介绍end-->
        </div>
        <!--开发内容end-->

        <!--云化实验室列表start-->
        <div class="font-big" style="padding: 60px 0 50px 0;">云上实验室列表</div>
        <div class="clouds" id="two">
          <div class="main">
          <el-row :gutter="0">
            <el-col :span="6" v-for="(item,index) in  cloudList" :key="index">
              <el-card style="margin:0 auto; position: relative;margin-bottom: 20px">
                <div class="clouds-img">
                  <div class="clouds-bottom clearfix">
                    <img :src="item.logo" class="clouds-logo">
                    <div class="clouds-title font-middle-b">{{item.name}}</div>
                    <img src="static/images/develop/49.png" class="clouds-bottom-line">
                  </div>
                  <div class="clouds-hover">
                    <div class="clouds-title clouds-hover-title font-middle-b">{{item.name}}</div>
                    <div class="clouds-desc font-normal">{{item.summary}}</div>
                    <el-button @click="toApply(item)" style="margin-top: 20px">
                      立即体验
                    </el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          </div>
        </div>
        <!--云化实验室列表end-->

        <!--4步快速进入云化实验室start-->
        <div class="guide" id="three" :style="bgGuide">
          <div class="font-big font-h1-bg" style="padding: 60px 0 20px 0;">4步快速进入云上实验室</div>
          <div class="font-h1-bg">通过四个步骤的指引，帮助您了解并快速的使用中兴远程实验室</div>
          <div style="width: 1078px;margin: 72px auto;">
            <div v-for="(item,index) in guideList">
              <div class="guide-icon" >
                <img :src="item.path"/>
                <div class="font-h1-bg font-middle-b" style="margin: 20px 0;">{{item.title}}</div>
              </div>
              <div class="guide-icon-r" v-show="index<guideList.length-1">
                <img src="static/images/develop/r.png"/>
              </div>
            </div>
          </div>
        </div>
        <!--4步快速进入云化实验室end-->

        <!--使用指导开始-->
        <div class="useGuide" id="four">
          <div class="font-big" style="padding: 60px 0 50px 0;">使用指导</div>
          <el-tabs :tab-position="tabPosition" class="useGuide-content">
            <el-tab-pane v-bind:label="item.title"  v-for="(item,index) in docs">
              <div class="title font-middle-bg" style="margin: 30px 0;font-size: 20px;">{{item.title}}</div>
              <div v-for="em in item.desc">
                <div class="font-normal font-middle-bg" style="margin: 10px 0;">{{em.info}}</div>
              </div>
              <el-button :style="detailBg" @click="showDetail">查看详情</el-button>
            </el-tab-pane>
          </el-tabs>
        </div>
      </b-card-body>
    </b-card>
    <b-card no-body style="position: fixed;top: 0;width: 100%" v-show="navTopShow">
      <b-nav justified pills slot="header" v-b-scrollspy>
        <b-nav-item active href="#one" @click="scrollIntoView">功能介绍</b-nav-item>
        <b-nav-item href="#two" @click="scrollIntoView">云上实验室列表</b-nav-item>
        <b-nav-item href="#three" @click="scrollIntoView">预约流程</b-nav-item>
        <b-nav-item href="#four" @click="scrollIntoView">使用指导</b-nav-item>
      </b-nav>
    </b-card>
    <!--使用指导结束-->
  </div>
</template>

<script>
  import Banner from '../components/Banner'
  import { videoPlayer } from 'vue-video-player'
  import 'video.js/dist/video-js.css'
  export default {
   name:'Develop',
    data(){
     return {
       navTopShow: false,
       bannerMsg:{
         bgBtn:{
           backgroundImage:'url(' + require('../../static/images/develop/banner.png') + ')',
           backgroundPosition:'center',
           height: '300px'
         },
         title:'云上实验室',
         desc:'提供7x24小时的云上对接测试环境，高效便捷的远程接入',
         btnText:"自助申请",
         btnUrl:"/apply",
         textAlign:{
           'text-align':"left"
         },
         hWidth:{
           width:'546px'
         }
       },
       clouds:{
         title:"功能介绍",
         desc:"为开创业务，获取技术、资源、实现更快速成长."
       },
       playerOptions: {
         height: '180',
         width:'372',
         muted: false,
         language: 'en',
         playbackRates: [0.7, 1.0, 1.5, 2.0],
         sources: [{
           type: "video/mp4",
           src: "https://cdnysq.babybang123.com/test/cloudlab.mp4"
         }],
         poster: "static/images/develop/video.png",
         notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
       },
       playFlag:"",
       activeIndex: "1",//二级牟点菜单默认选中第一个
       cloudList:[],
       docs:[{
            title:"测试预约",
            desc:[
              {info:"1）访问云上实验室cloudlab.zte.com.cn，在查看相关内容；"},
              {info:"2）完成用户注册，并登录；"},
              {info:"3）选择需要进行测试产品，点击进入预约页面；"},
              {info:"4）填写预约相关内容，并提交预约申请。"}
             ]
          },{
            title:"对接测试VPN接入",
            desc:[
              {info:"1）在云上实验室下载对应VPN客户端；"},
              {info:"2）解压并安装VPN客户端；"},
              {info:"3）登录VPN客户端，接入云上实验室。"}
              ]
          },{
            title:"产品测试对接",
            desc:[
              {info:"1）阅读产品服务接口说明，完成环境对接；"},
              {info:"2）根据产品资料及对接样例，修改配置，启动对接测试；"},
              {info:"3）登录VPN客户端，接入云上实验室；"},
              {info:"4）在有效时间内完成对接测试；"},
              {info:"5）完成测试后，联系管理员进行资源释放。"}]
          },{
             title:"产品对接测试报告及证书获取",
             desc:[{info:"1）测试完成后联系管理员获取对接测试报告及认证证书。"}]
          }],
       tabPosition:"left",//资源获取tab的展示方式
       bgGuide:{
         backgroundImage:'url(' + require('../../static/images/develop/banner2.png') + ')'
       },
       detailBg:{
         backgroundImage:'url(' + require('../../static/images/develop/140.png') + ')'
       },
       guideList:[{
         path:"static/images/develop/g.png",
         title:"自动预约"
       },{
         path:"static/images/develop/b.png",
         title:"自动接入"
       },{
         path:"static/images/develop/v.png",
         title:"开发对接"
       },{
         path:"static/images/develop/o.png",
         title:"资源释放"
       }]
     }
    },
    components:{
      Banner,
      videoPlayer
    },
    mounted:function() { //钩子函数
      this.getList();//云化实验室列表
      window.addEventListener('scroll', this.scrollListener);
      window.scrollTo(0,0);//初始化页面在最顶部
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.scrollListener)
    },
    methods: {
      scrollIntoView(evt) {
        let _this = this;
        evt.preventDefault();
        const href = evt.target.getAttribute('href');
        const el = href ? document.querySelector(href) : null;
        if (el) {
          window.scrollTo(0, el.offsetTop + _this.$refs.navContent.offsetTop);
        }
      },

      scrollListener() {
        let _this = this;
        let scrollTop = document.body.scrollTop == 0 ? document.documentElement.scrollTop : document.body.scrollTop;
        if (scrollTop > _this.$refs.navContent.offsetTop) {
          _this.navTopShow = true;
        } else {
          _this.navTopShow = false;
        }
      },
      player() {
        return this.$refs.videoPlayer.player
      },
      onPlayerPlay(player) {
        this.playFlag = true;
      },
      onPlayerPause(player) {
        this.playFlag = false;
      },
      getList:function() {
        var _this= this;
        // this.$http.get('product/listbytype?category=-1',
        this.$http.get('reservation/products?category=-1', {
        }).then(function (response) {
          if(0 == response.data.returnCode && response.data.data) {
            _this.cloudList = response.data.data?response.data.data.slice(0,4).map((item,index) => {
              
                return {
                  logo: "static/images/develop/jpg_"+(index+1)+".png",
                  id: item.productId,
                  category:item.productType,
                  name: item.productName,
                  summary:item.summary
                }
            }):[];
          }else{
            _this.$message('获取产品列表失败！');
          }
        });
      },
      showDetail:function () {
        this.$router.push('/GuideDetial')
      },
      toApply:function (item) {
        
        this.$router.push({
          path: '/apply/',
          query: {
            categoryId: item.category,
            id: item.id
          }
        });
       /* this.$router.push('/apply/'+id)*/
      }
    }
  }
</script>
<style scoped>
  @import 'bootstrap-vue/dist/bootstrap-vue.css';
  @import 'bootstrap/dist/css/bootstrap.css';
  .page {
    padding: 0;
  }
  .card {
    border: 0;
  }
  .el-tab-pane {
    text-align: left;
    padding: 0 60px
  }
  .card-header {
    height: 50px;
    background-color: #ffffff;
    box-shadow:  0 0 5px #e5e5e5;
    padding: 0;
    z-index:999;
    opacity: 1;
  }
  .nav {
    width:900px;
    margin: 0 auto;
  }
  .nav-link {
    padding: 10px 0;
    color: #333333;
  }

  .nav-pills .nav-link.active, .nav-pills .show > .nav-link {
    color: #0084ff;
    background-color: #ffffff;
    border-radius:0;
    border-bottom: 3px solid #0084ff;
  }
  .ecosphere {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .el-menu--horizontal>.el-menu-item {
    height: 50px;
    line-height: 50px;
    padding: 0;
    margin: 0 40px;
  }

  .develop {
    border: 1px solid #e5e5e5;
    background-color: #ffffff;
  }

  .develop .grid-content {
    text-align: left;
    position: relative;
  }

  .title {
    font-size: 24px;
    margin: 70px 0 40px 0;
  }

  .functions .video {
    width: 372px;
    height: 208px;
    margin: 40px auto;
    position: relative;
  }
  .functions-desc {
    margin-bottom: 70px;
  }
  .video-small {
    position: absolute;
    top: 0;
    left:166px;
    background-position: 0 4px;/*对应小图标的坐标*/
  }

  .video-title {
    position: absolute;
    top: 110px;
    left: 37%;
    font-size: 24px;
    color: #ffffff;
  }

  .clouds{
    padding-bottom: 52px;
  }

  .el-card {
    height: 200px;
    width: 290px;
    border: 1px solid #e5e5e5;
    margin: 20px 0;
  }

  .clouds-img {
    cursor: pointer;
    width: 290px;
    height: 200px;
  }

  .clouds-img:after {
    width: 290px;
    height: 200px;
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
  .clouds-img:hover:after {
    opacity: 1;
    z-index: 3;
    background-color: #4a21ef;
    /*background:-ms-linear-gradient(top, #4a21ef,#2bd5d5);
    background:-moz-linear-gradient(top,#4a21ef,#2bd5d5);
    background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(#4a21ef), to(#2bd5d5));*/
  }

  .clouds-hover {
    position: absolute;
    opacity: 0;
    width: 200px;
    left: 45px;
    top: 10px;
    text-align: center;
  }
  .clouds-img:hover > .clouds-hover{
    opacity: 1;
    z-index: 99;
    color: #ffffff;
  }
  .clouds-logo {
    margin-top: 30px;
  }
  .clouds-bottom-line {
    width:30px;
  }
  .clouds-title,.clouds-hover-title {
    width: 200px;
    height: 30px;
    margin: 20px auto;
    font-size: 18px;
    overflow: hidden;
  }
  .clouds-hover-title:after {
    content: '';
    height: 1px;
    background: #ffffff;
    position: absolute;
    top: 60px;
    left: 80px;
    width: 38px;
  }

  .clouds-desc {
    width: 200px;
    margin: 0 auto;
    height: 50px;
    overflow: hidden;
    text-align: center;
    font-size: 14px;
    color: rgba(255,255,255,0.8);
  }
  .clouds-bottom {
    width: 290px;
    height: 30px;
    opacity: 0.85;
  }
  .margin-left {
    margin-left:334px ;
  }

  .guide {
    height: 468px;
    margin:0 auto;
  }

  .guide-icon {
    float: left;
    width: 74px;
    margin: 40px;
  }

  .guide-icon-r {
    float: left;
    width: 40px;
    margin: 60px 40px;
  }

  .el-icon-arrow-right {
    line-height: 74px;
  }
  .useGuide {
    padding-bottom: 60px;
  }

  .el-button {
    margin: 40px 0 120px 0;
    width: 140px;
    height: 36px;
    color: #409EFF;
    padding: 0;
    font-size: 14px;
  }
  .clouds-hover .el-button {
    background: transparent;
    margin: 10px 0;
    width: 80px;
    height: 28px;
    font-size: 14px;
    border: 1px solid #e5e5e5;
    color:#ffffff;
  }

  .clouds-hover .el-button a {
    color:#ffffff;
    text-decoration: none;
  }
  .useGuide-content {
    width: 1200px;
    background-color: #ffffff;
    border: 1px solid #e5e5e5;
    height: 358px;
    margin: 0 auto;
  }
</style>
