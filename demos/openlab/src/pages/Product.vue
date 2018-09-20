<template>

  <div class="page">
    <!--banner开始-->
    <banner :banner-msg="bannerMsg"></banner>
    <!--banner结束-->

    <!--牟点菜单开始-->
    <b-card no-body ref="navContent">
      <b-nav justified pills slot="header" v-b-scrollspy>
        <b-nav-item active href="#one" @click="scrollIntoView" v-if="productSummery.flag">产品概述</b-nav-item>
        <b-nav-item href="#two" @click="scrollIntoView" v-if="characterFlag">功能特点</b-nav-item>
        <b-nav-item href="#three" @click="scrollIntoView" v-if="view.viewFlag">功能视图</b-nav-item>
        <b-nav-item href="#four" @click="scrollIntoView" v-if="apis.flag">接口/API体验</b-nav-item>
        <b-nav-item href="#five" @click="scrollIntoView" v-if="resource.flag">资源获取</b-nav-item>
        <b-nav-item href="#six" @click="scrollIntoView" v-if="learnFlag">在线学习</b-nav-item>
      </b-nav>

      <b-card-body style="background-color: #f7f8fa;padding: 0;">
        <!--产品概述开始-->
        <el-row id="one" v-if="productSummery.flag">
          <el-col :span="24">
            <div class="grid-title font-big" title="产品概述">产品概述</div>
            <div class="main">
              <div class="font-middle-bg font-middle" style="text-align: justify;">
                <pre>{{productSummery.desc}}</pre>
              </div>
              <!--  <div style="width: 372px;height:200px;float: right;position: relative;">
                    <video-player ref="videoPlayer"
                                  :playsinline="true"
                                  :options="playerOptions"
                                  style="position: absolute;right: 0;top:-50px;"
                                  @play="onPlayerPlay($event)"
                                  @pause="onPlayerPause($event)"
                    ></video-player>
                    <div class="video-title" v-show="playFlag">产品介绍</div>
                  </div>-->
              <!-- <div style="width: 372px;float: right;position: relative;">
                  <img class="grid-img" :src="productSummery.bgUrl"/>
                  <div class="btn-video video-small" :style="productSummery.bgBtn"></div>
                  <div class="video-title">产品介绍</div>
                </div>-->
            </div>
          </el-col>
        </el-row>
        <!--产品概述结束-->

        <!--功能特点开始-->
        <el-row id="two" v-if="characterFlag">
          <el-col :span="24">
            <div class="grid-title font-big">功能特点</div>
            <div class="content character">
              <div class="character-content" v-for="(item,index) in characterList" :class="{'character-border':(index!=characterList.length-1),'character-content-five':characterList.length>=5,'character-content-four':characterList.length == 3,'character-content-six':characterList.length == 4,}">
                <img :src="item.img" style="margin-top: 21px;width:48px;height:48px;" />
                <div class="font-middle character-title">{{item.title}}</div>
                <div class="desc font-normal font-middle-bg">{{item.desc}}
                </div>
              </div>
              <!--<el-row>
                  <el-col :span="6" class="character" v-for="(item,index) in characterList"
                          :class="{'character-border':((index+1)%4!=0)}">
                    &lt;!&ndash; <img :src="'static/images/product/Character_'+ (index+1) +'.png'" style="margin-top: 21px;"/>&ndash;&gt;
                    <img :src="item.img" style="margin-top: 21px;"/>
                    <div class="font-middle character-title">{{item.title}}</div>
                    <div class="desc font-normal font-middle-bg">
                      {{item.desc}}
                    </div>
                  </el-col>
                </el-row>-->
            </div>
          </el-col>
        </el-row>
        <!--功能特点结束-->

        <!--功能视图开始-->
        <el-row id="three" v-if="view.viewFlag">
          <el-col :span="24">
            <div class="grid-title font-big">功能视图</div>
            <div class="view">
              <div class="main">
                <el-row style="padding-bottom: 10px;">
                  <el-col :span="17" style="margin: 40px 0;">
                    <img :src="view.viewPng" />
                  </el-col>
                  <el-col :span="6" :offset="1" style="margin-top: 40px;text-align: left">
                    <div class="font-middle-b view-title">功能视图简介</div>
                    <div class="font-normal font-middle-bg" style="margin-bottom: 30px;max-height: 480px;overflow: hidden;text-align: justify"><pre>{{view.viewDesc}}</pre></div>
                    <a class="font-normal font-a" style="cursor: pointer;" @click="viewDetail">
                      查看视图详情
                      <img src="static/images/common/Up_icon.png" style="margin: 0 5px;" v-show="!view.viewDetailFlag" />
                      <img src="static/images/common/Down_icon.png" style="margin: 0 5px;" v-show="view.viewDetailFlag" />
                    </a>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
        </el-row>

        <!--功能视图详情结束-->
        <div id="seven" class="viewDetail font-normal font-middle-bg" :class="{'view-detail-show':view.viewDetailFlag}">
          <div class="main">
            <div class="title" style="font-weight: bold">{{productName}}功能视图详情：</div>
            <pre>{{view.viewDesc}}</pre>
          </div>
        </div>
        <!--功能视图详情结束-->

        <!--功能视图结束-->

        <!--接口/API体验开始-->
        <el-row id="four" v-if="apis.flag">
          <el-col :span="24">
            <div class="grid-title font-big">接口/API体验</div>
            <div class="content" style="height: 344px;">
              <img :src="apis.img" style="margin: 30px 0;" />
              <div class="desc font-normal font-middle-bg">
                <span v-if="apis">{{apis.apiDesc}}</span>
              </div>
              <el-button class="btn btn-middle" :style="apis.bgBtn" @click="toAPI">立即体验</el-button>
            </div>
          </el-col>
        </el-row>
        <!--接口/API体验结束-->

        <!--资源获取开始-->
        <el-row id="five" v-if="resource.flag">
          <el-col :span="24">
            <div class="grid-title font-big">资源获取</div>
            <div class="resource" :style="resource.bg">
              <img :src="resource.img" style="margin: 70px 0 40px 0;" />
              <div class="desc font-middle font-h1-bg"><pre id="layer">{{resource.resourceDesc}}</pre></div>
              <el-button class="btn btn-middle" :style="resource.bgBtn" @click="toDoucment">立即获取</el-button>
            </div>
          </el-col>
        </el-row>
        <!--资源获取结束-->

        <!--在线学习开始-->
        <el-row id="six" v-if="learnFlag">
          <el-col :span="24">
            <div class="grid-title font-big">在线学习</div>
            <div class="content">
              <el-row :gutter="0" style="display:flex;justify-content:center;">
                <el-col :span="8" v-for="(item) in courses" :key="item.courseId" style='flex:0 1 auto'>
                  <el-card style="margin: 40px 13px; position: relative;">
                    <div class="six-img" :style="item.bg" @click="toLearnDetail(item.courseId)">
                      <img :src="item.img" style="width: 372px;height: 208px;" />
                      <div class="six-desc font-normal font-h1-bg">{{item.courseDesc}}</div>
                      <div class="six-bottom clearfix">
                        <h2 class="six-title font-middle-b font-h1-bg">{{item.courseTitle}}</h2>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <!--在线学习结束-->
      </b-card-body>
    </b-card>
    <b-card no-body style="position: fixed;top: 0;width: 100%" v-show="navTopShow">
      <b-nav justified pills slot="header" v-b-scrollspy>
        <b-nav-item active href="#one" @click="scrollIntoView" v-if="productSummery.flag">产品概述</b-nav-item>
        <b-nav-item href="#two" @click="scrollIntoView" v-if="characterFlag">功能特点</b-nav-item>
        <b-nav-item href="#three" @click="scrollIntoView" v-if="view.viewFlag">功能视图</b-nav-item>
        <b-nav-item href="#four" @click="scrollIntoView" v-if="apis.flag">接口/API体验</b-nav-item>
        <b-nav-item href="#five" @click="scrollIntoView" v-if="resource.flag">资源获取</b-nav-item>
        <b-nav-item href="#six" @click="scrollIntoView" v-if="learnFlag">在线学习</b-nav-item>
      </b-nav>
    </b-card>
    <!--在线学习结束-->
  </div>
  <!--产品主要内容结束-->
</template>

<!--产品与解决方案js-->
<script>
  import Banner from '../components/Banner'

  /*import { videoPlayer } from 'vue-video-player'
  import 'video.js/dist/video-js.css'*/
  export default {
    name: "Product",
    data() {
      return {
        navTopShow: false,
        /*playerOptions: {
          height: '200',
          muted: true,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: "video/mp4",
            src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
          }],
          poster: "poster.jpg", //你的封面地址
          poster: "static/images/product/B_06.png",
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        },*/
        //playFlag:true,//监听视频开始或者结束
        tabPosition: "left", //资源获取tab的展示方式
        bannerMsg: {
          bgBtn: {
            backgroundImage: 'url(' + this.GLOBAL.BASE_URL + 'product/banner/' + this.$route.params.pid + ')',
            backgroundPosition: 'center',
            backgroundColor: '#026aca',
            height: '400px'
          },
          title: '',
          desc: '',
          textAlign: {
            'text-align': "left"
          },
          hWidth: {
            width: '546px'
          }
        },
        productName: "", //存储产品名称
        productSummery: { //产品概述
          flag: false,
          desc: "",
          bgUrl: "static/images/product/B_06.png",
          bgBtn: {
            backgroundImage: 'url(' + require('../../static/images/common/Btn_video.png') + ')'
          },
        },
        characterFlag: false,
        characterList: [], //功能特点
        view: {
          // viewPng: this.GLOBAL.BASE_URL + "product/view/" + this.$route.params.pid,
          viewDesc: "", //功能视图简介
          viewFlag: false, //初始化功能视图是否展示
          viewDetailFlag: false,
          viewList: [],
        },
        apis: {
          flag: false,
          img: "static/images/product/api.png",
          apiDesc: "",
          bgBtn: {
            backgroundImage: 'url(' + require('../../static/images/product/Api_btn.png') + ')'
          }
        },
        resource: { //资源获取
          flag: false,
          img: "static/images/product/Resource_icon.png",
          resourceDesc: "", //API体验描述
          bg: {
            backgroundImage: 'url(' + require('../../static/images/product/Resource_bg.png') + ')'
          },
          bgBtn: {
            backgroundImage: 'url(' + require('../../static/images/product/Resource_btn.png') + ')'
          }
        },
        learnFlag: false,
        courses: []
      };
    },
    components: {
      Banner
      //videoPlayer
    },
    mounted: function () { //钩子函数
      // 添加页面滚动监听
      window.addEventListener('scroll', this.scrollListener);
      this.getProductDetail();
      // this.getProductArea();
      window.scrollTo(0, 0); //初始化页面在最顶部
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.scrollListener)
    },
    methods: {
      toDoucment: function () { //资源文档立即体验
        this.$router.push({
          path: '/document',
          query: {
            name: this.productName,
            id: this.$route.params.pid
          }
        });
      },
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

      toAPI: function () { //API立即体验
        this.$router.push({
          path: '/api',
          query: {
            id: this.$route.params.pid
          }
        });

      },
      viewDetail: function () {
        this.view.viewDetailFlag = !this.view.viewDetailFlag;
      },
      toLearnDetail(courseId) {
        this.$router.push("/learnDetail/" + courseId);
      },
      /*player() {
        return this.$refs.videoPlayer.player
      },
      // listen event
      onPlayerPlay(player) {
        this.playFlag = false;
      },
      onPlayerPause(player) {
        this.playFlag = true;
      },*/
      getProductArea: function () {
        let _this = this;
        _this.$http({
          url: "product/area/" + _this.$route.params.pid,
          method: 'get'
        }).then(function (response) {
          console.log(response)
          if (0 == response.data.returnCode && response.data.data) {
            var data = response.data.data;
            for (let i = 0; i < data.length; i++) {
              switch (data[i].areaCode) {
                case 'introduction':
                  _this.productSummery.flag = true;
                  _this.productSummery.desc = data[i].units && data[i].units[0] && data[i].units[0].desc||'';
                  break;
                case 'fun_character':
                  _this.characterFlag = true;
                  _this.characterList = data[i].units ? data[i].units.map((item, index) => {
                    return {
                      // img: item.attachment,
                      img: _this.GLOBAL.BASE_URL + 'product/unitlogo/' + item.unitId ,
                      title: item.title,
                      desc: item.desc
                    }
                  }) : [];
                  break;
                case 'fun_view':
                  // _this.view.viewFlag = true;
                  // _this.view.viewDesc = data[i].units && data[i].units[0] && data[i].units[0].desc||'';
                  // _this.view.viewPng = 'url(' + _this.GLOBAL.BASE_URL + 'product/unitlogo/' + (data[i].units && data[i].units[0] && data[i].units[0].unitId) + ')';
                  _this.view = {
                    viewFlag:true,
                    viewDesc:data[i].units && data[i].units[0] && data[i].units[0].desc||'',
                    viewPng: data[i].units && (_this.GLOBAL.BASE_URL + 'product/unitlogo/' + ( data[i].units[0] && data[i].units[0].unitId)),
                    viewDetailFlag:_this.view.viewDetailFlag
                  }
                  break;
                case 'api_experience':
                  _this.apis.flag = true;
                  _this.apis.apiDesc = data[i].units && data[i].units[0] && data[i].units[0].desc ||'';
                  break;
                case 'resource':
                  _this.resource.flag = true;
                  _this.resource.resourceDesc = data[i].units && data[i].units[0] && data[i].units[0].desc||'';
                  break;
                case 'learn':
                  _this.learnFlag = true;
                  _this.$http({
                    url: "product/course/" + _this.$route.params.pid,
                    method: 'get'
                  }).then(function (response) {
                    _this.courses = response.data.data.map(function(item, index){
                      return {
                        courseId:item.courseId,
                        courseTitle:item.courseTitle,
                        courseDesc:item.courseDesc,
                        img:_this.GLOBAL.BASE_URL+'course/logo/'+item.courseId
                   
                      }
                    });

                  }).catch(function (error) {

                  });
                  break;

              }
            }
          }
        }).catch(function (error) {});
      },
      getProductDetail: function () { //获取产品详情数据
        let _this = this;
        _this.getProductArea();
        _this.$http({
          url: "product/" + _this.$route.params.pid,
          method: 'get'
        }).then(function (response) {
          if (0 == response.data.returnCode && response.data.data) {
            var data = response.data.data;
            _this.productName = data.productName;
            var logos = [
              'static/images/product/Character_1.png',
              'static/images/product/Character_2.png',
              'static/images/product/Character_3.png',
              'static/images/product/Character_0.png'
            ];
            _this.bannerMsg["title"] = _this.resource.resourceDesc = _this.apis.apiDesc = data.productName ? data
              .productName : "";
            _this.bannerMsg["desc"] = data.summary ? data.summary : "";

            // _this.productSummery.desc = data.summary ? data.summary : "";//产品概述

            // _this.characterList = data.characterList ? data.characterList.map((item, index) => {
            //   return {
            //     img: logos[index%4],
            //     title: item.title,
            //     desc: item.desc
            //   }
            // }) : [];

            // _this.view.viewDesc = data.viewDesc ? data.viewDesc.trim(): "";//视图描述

            // _this.resource.resourceDesc += "可获取的资源内容包括：";//资源获取描述

            // for(var i=0 ;i<data.docs.length;i++){
            //   if(data.docs[i].docList.length>0){
            //     if(data.docs[0].docList.length>0){
            //       _this.resource.flag = true;
            //     }else{
            //       _this.resource.flag = false;
            //     }
            //     for(var j=0 ;j<data.docs[i].docList.length;j++){
            //         _this.resource.resourceDesc += data.docs[i].docList[j].docTitle+"、";
            //     }
            //   }
            // };
            // _this.apis.apiDesc += "接口包括：";//api描述
            // if( data.apis.length >0){
            //   _this.apis.flag = true;
            // }else{
            //   _this.apis.flag = false;
            // }
            // for(var i=0 ;i<data.apis.length;i++){
            //     if(i <data.apis.length-1){
            //       _this.apis.apiDesc += data.apis[i].apiTitle +"、";
            //     }else{
            //       _this.apis.apiDesc += data.apis[i].apiTitle;
            //     }
            // };

            // _this.courses = data.courses ? data.courses.map((item, index) => {//课程列表
            //   return {
            //     courseId: item.courseId,
            //     bg: {
            //       backgroundImage: 'url(' + require('../../static/images/product/Study_'+(index+1)+'.png') + ')'
            //     },
            //     courseTitle: item.courseTitle,
            //     courseDesc: item.courseDesc
            //   }
            // }) : [];
          } else {
            _this.$message('获取产品详情失败！');
          }
        }).catch(function (response) {});
      }
    },
    watch: {
      '$route' (to, from) {
        if (to.name === 'Product') {
          let _this = this;
          //this.bannerMsg['img'] =  _this.GLOBAL.BASE_URL+"product/banner/"+to.params.pid;
          this.getProductDetail(to.params.pid);
          this.bannerMsg.bgBtn.backgroundImage = 'url(' + this.GLOBAL.BASE_URL + 'product/banner/' + to.params.pid +
            ')';
          // this.view.viewPng = _this.GLOBAL.BASE_URL + "product/view/" + to.params.pid;
          this.productSummery.flag =false;
          this.characterFlag=false;
          this.view.viewFlag = false;
          this.resource.flag = false;
          this.apis.flag = false;
          this.learnFlag = false;
        }
      }
    }
  }

</script>

<!--产品与解决方案css-->
<style lang="css" scoped>
  @import 'bootstrap-vue/dist/bootstrap-vue.css';
  @import 'bootstrap/dist/css/bootstrap.css';
  .ecosphere {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card {
    border: 0;
  }

  .card-header {
    height: 50px;
    background-color: #ffffff;
    box-shadow: 0 0 5px #e5e5e5;
    padding: 0;
  }

  .nav {
    width: 900px;
    margin: 0 auto;
  }

  .nav-link {
    padding: 10px 0;
    color: #333333;
  }

  .nav-pills .nav-link.active,
  .nav-pills .show>.nav-link {
    color: #0084ff;
    background-color: #ffffff;
    border-radius: 0;
    border-bottom: 3px solid #0084ff;
  }

  .main .grid-content {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .grid-title {
    font-weight: normal;
    margin: 70px 0 40px 0;
  }

  .grid-img {
    width: 372px;
    height: 208px;
  }

  .btn-video {
    width: 36px;
    height: 36px;
    display: inline-block;
  }

  .video-small {
    position: absolute;
    top: 50px;
    left: 166px;
    background-position: 0 0;
    /*对应小图标的坐标*/
  }

  .video-title {
    position: absolute;
    top: 110px;
    left: 135px;
    font-size: 24px;
    color: #ffffff;
  }

  .character {
    padding-bottom: 20px;
    background-color: #ffffff;
    min-height: 258px;
  }

  .character-content {
    float: left;
    margin-top: 30px;
  }

  .character-content-four {
    width: 33.3333%;
  }

  .character-content-five {
    width: 239px;
  }
  .character-content-six {
    width: 25%;
  }
  .character-title {
    margin: 26px;
    font-weight: bold;
    color: #333333;
  }

  .character-border {
    border-right: 1px solid #e5e5e5;
  }

  .character .desc {
    text-align: justify;
    width: 200px;
    margin: 0 auto;
    max-height: 55px;
    overflow: hidden;
  }

  .view {
    width: 100%;
    background-color: #ffffff;
    box-shadow: 12px 2px 12px 0 #e5e5e5;
  }

  .view-title {
    border-left: 3px solid #0084ff;
    padding: 0 10px;
    margin-bottom: 30px;
  }

  .viewDetail {
    background-color: #fcfeff;
    padding-bottom: 30px;
    text-align: left;
    opacity: 0;
    display: none;
    transition: all 0.5s ease 0s;
    margin-top: -35px;
  }

  .viewDetail .title {
    padding: 40px 0 30px 0;
  }

  pre {
    color: #666666;
    font-size: 14px;
    font-family: 'Microsoft YaHei';
    line-height: 35px;
    white-space: pre-wrap;
    /*css-3*/
    white-space: -moz-pre-wrap;
    /*Mozilla,since1999*/
    white-space: -pre-wrap;
    /*Opera4-6*/
    white-space: -o-pre-wrap;
    /*Opera7*/
    word-wrap: break-word;
    /*InternetExplorer5.5+*/
  }

  .view-line {
    margin-bottom: 30px;
  }

  .view-detail-show {
    display: block;
    opacity: 1;
  }

  #four .desc {
    width: 938px;
    margin: 0 auto;
    text-align: center;
  }

  #four .btn {
    font-size: 16px;
    color: #ffffff;
    margin: 40px 0;
    border: 0;
    border-radius: unset;
  }

  .resource {
    position: relative;
    width: 1200px;
    margin: 0 auto;
    height: 406px;
  }

  .resource .icon {
    position: absolute;
  }

  .resource .desc {
    width: 646px;
    margin: 0 auto;
    text-align: center;
  }

  .resource .btn {
    font-size: 16px;
    color: #ffffff;
    margin: 40px 0;
    border: 0;
    border-radius: unset;
  }

  .six-img {
    cursor: pointer;
    width: 372px;
    height: 208px;
  }

  .six-img:after {
    width: 374px;
    height: 208px;
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    transition: all 0.5s ease 0s;
  }

  .six-img:hover:after {
    background-color: #0c2959;
    opacity: 0.75;
    pointer-events: none;
  }

  .six-img:hover>.six-desc {
    z-index: 999;
    opacity: 1;
  }

  .six-desc {
    top: 50px;
    left: 60px;
    position: absolute;
    width: 252px;
    text-align: justify;
    opacity: 0;
  }

  .six-title {
    line-height: 50px;
    height: 50px;
    font-size: 18px;
    color: #ffffff;
  }

  .six-bottom {
    width: 372px;
    height: 50px;
    background-color: #1157d1;
    opacity: 0.85;
    position: absolute;
    bottom: 0;
  }
  pre {
    font-size: 14px !important;
  }
  pre.layer{
    font-size: 15px !important;
  }
  pre#layer {
    color: #fff !important;
    font-size: 16px !important;
  }
</style>
