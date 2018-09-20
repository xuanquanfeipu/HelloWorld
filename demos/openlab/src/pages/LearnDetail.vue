<template>
  <div class="page">
    <!--面包屑开始-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/learn' }">在线学习</el-breadcrumb-item>
      <el-breadcrumb-item><span style="color: #008fd5;">{{courses.courseTitle}}</span></el-breadcrumb-item>
    </el-breadcrumb>
    <!--面包屑结束-->

    <!--learn内容-->
    <div class="learn-source learn-bg">
        <div class="case-item">
          <el-row :gutter="0">
            <el-col :span="12">
              <div class="grid-content">
                <img :src="GLOBAL.BASE_URL+'course/logo/'+courses.courseId"  style="float:left;"/>
              </div>
            </el-col>
            <el-col :span="11">
              <div class="grid-content font-normal-bg">
                <div class="font-big font-normal-bg" style="margin: 32px 0;">{{courses.courseTitle}}</div>
                <div class="font-normal course-margin"><span class="learn-content">访问人数：</span>{{courses.visitors}}</div>
                <div class="font-normal course-margin"><span class="learn-content">上线时间：</span>{{courses.createTime&&courses.createTime.substring(0,10)}}</div>
                <div class="font-normal course-margin"><span class="learn-content">课程类型：</span>{{courses.productName}}</div>
                <div class="font-normal course-margin learn-content-desc">
                  <span class="learn-content">课程介绍：</span>{{courses.courseDesc}}
                </div>
              </div>
            </el-col>
          </el-row>
      </div>

      <!--learn课程列表start-->
      <div class="courses" v-show="isSecond">
        <div class="title font-big font-normal-bg">课程列表</div>
        <el-row :gutter="20" class="course">
          <el-col :span="6" v-for="item in courses.children" :key="item.courseId">
            <div class="grid-content">
              <div class="title">{{item.docName}}</div>
              <div class="desc">{{item.docDesc}}</div>
              <el-button type="primary" @click="isDownload(item)">下载学习</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <!--learn课程列表end-->
    </div>
    <!--learn内容end-->
  </div>
</template>

<script type="text/javascript">
  export default {
    name:'LearnDetail',
    data() {
      return {
        isSecond:false,
        learnList:[],
        courses:{
          courseId:this.$route.params.courseId
        }
      }
    },
    mounted:function () {
      this.getLearnList();
      window.scrollTo(0,0);//初始化页面在最顶部
    },
    methods:{
      getLearnList:function () {
        let _this = this;
        this.$http.get('course/learn/'+_this.$route.params.courseId, {
        }).then(function (response) {
            if(0 == response.data.returnCode && response.data) {
              _this.courses = response.data.data;
              if(_this.courses.children) {
                _this.isSecond = true;
              }
            }else{
              _this.$message('获取课程详情失败！');
            }
        }).catch(function (error) {});
      },
      isDownload(item){
        let _this = this;
        if(sessionStorage.getItem('accessToken')){
          this.$http.get('course/download/check/'+_this.$route.params.courseId,{
            headers: {
              'X-Access-Token': sessionStorage.getItem('accessToken')
            },
          }).then(function(response){
            if(0 == response.data.returnCode){
              console.log(response)
              _this.downLoad(item)
            }else{
              _this.$message(response.data.message || '下载资源失败！');
            }
          })
        }else{
           _this.$message('请先登录！');
           return;
        }
      },
      downLoad:function (item) {//下载课程
        let _this = this;
        if(sessionStorage.getItem('accessToken')){
          this.$http.get('course/download/'+item.docId,{
              headers: {
                'X-Access-Token': sessionStorage.getItem('accessToken')
              },
             responseType: "blob"
        }).then(function (response) {
           if (response.data) {
              var filename = decodeURI(response.headers['content-disposition'].split(';')[1]);
              var blob = new Blob([response.data]);
              if (window.navigator.msSaveOrOpenBlob) {
                navigator.msSaveBlob(blob, filename.match(/"(\S*)"/)[1]);
              } else {
                var a = document.createElement("a");
                a.download = filename.match(/"(\S*)"/)[1];
                a.href = window.URL.createObjectURL(blob);
                a.click();
              }
            } else if (1011 == response.data.returnCode) {
              _this.$message.error('会话已过期，请重新登录！');
            } else {
              _this.$message(response.data.message || '下载资源失败！');
            }

          }).catch(function (error) {});
        } else {
          _this.$message('您还没有登录,没有下载权限,请先登录账号。');
        }
      }
    }
  }
</script>

<style scoped>
  .page {
    padding-bottom: 40px;
  }
  .el-breadcrumb{
    width:1200px;
    margin: 20px auto;
    font-size: 14px;
    text-align:left ;
  }

  .title {
    text-align:left ;
    margin: 40px;
  }

  .learn-bg {
    width:1200px;
    margin: 18px auto;
    transition: .2s;
    border: 1px solid #e5e5e5;
    background-color: #ffffff;
    padding-bottom: 40px;
  }

  .learn-source {
    height:auto;
  }

  .el-card {
    height: 120px;
    color:#373d41;
  }
  .el-card__body>div .bottom{
    font-size: 12px;
    margin-top: 14px;
  }
  .learn-content {
    margin-right: 16px;
  }
  .learn-content-desc {
    height: 80px;
    overflow: hidden;
  }
  .learn-source .grid-content{
    text-align: left;
  }

  .case-item {
    width: 1140px;
    margin: 0 auto;
    border-bottom: 1px solid #ddd;
    padding: 40px 0;
  }

  .learn-source img {
    height: 280px;
    width: 520px;
  }

 .el-button {
    margin-top: 20px;
    width: 206px;
    height: 50px;
    border: 1px solid #409EFF;
  }
   .el-button a {
    text-decoration: none;
  }
  .course {
    width: 1140px;
    margin: 0 auto!important;
  }

  .course .grid-content {
    height: 340px;
    margin-bottom: 20px;
    padding: 30px;
    text-align: center;
    border: 1px solid #dcdcdc;
  }
  .course .title {
    font-size: 16px;
    color: #373d41;
    margin: 0 auto;
    height: 80px;
    overflow: hidden;
    font-weight: bold;
  }
  .course .desc {
    font-size: 14px;
    color: #6d7880;
    text-align: justify;
    margin: 15px auto;
    height: 170px;
    overflow: hidden;
  }
  .course .el-button {
    border: 0;
    background-color: #0084ff;
    margin:15px auto;
  }

  .course-margin {
    margin-bottom: 8px;
  }
</style>
