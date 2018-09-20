<template>
  <!--banner开始-->
  <el-row :gutter="0" class="banner">
    <div class="img" :style="bannerMsg.bgBtn">
      <div class="banner-msg" :style="bannerMsg.textAlign">
        <div class="grid-content" :style="bannerMsg.hWidth">
          <h1>{{bannerMsg.title}}</h1>
          <h2 class="font-normal" style="color: rgba(255,255,255,0.85)">
              {{bannerMsg.desc}}
          </h2>
          <h2 class="file font-normal" style="cursor: pointer">
            <div @click="toSupport(bannerMsg.fileUrl)"
                 v-if="bannerMsg.fileUrl ">
              {{bannerMsg.file}}
            </div>
            <div v-if="!bannerMsg.fileUrl ">{{bannerMsg.file}}</div>
          </h2>
          <router-link :to="bannerMsg.btnUrl" v-if="bannerMsg.btnText && bannerMsg.btnUrl">
            <el-button>
              {{bannerMsg.btnText}}
            </el-button>
          </router-link>
        </div>
      </div>
    </div>
  </el-row>
</template>
<script>
  export default {
    props: ['bannerMsg'],
    methods:{
      toSupport(url){
        this.$router.push(url);
      }
    }
  }

</script>
<style scoped>
  .banner {
    width:100%;
    display: flex;
  }

  .banner .img {
    width:1920px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .banner .file {
    margin-top: 40px;
    color: #0084FF;
  }

  .banner-msg {
    width:1200px;
    height: auto;
    overflow: auto;
    float:none;
  }

  .banner h1 {
    font-weight: normal;
    font-size: 42px;
    font-family:"PingFang SC";
    color: #ffffff;
    margin: 30px 0;
  }

  .banner h2 {
    font-size: 16px;
    font-weight: normal;
    line-height: 25px;
  }

  .el-button {
    background: transparent;
    margin: 30px 0;
    width: 200px;
    font-size: 14px;
    border: 1px solid #e5e5e5;
    color:#ffffff;
  }

  .el-button a {
    color:#ffffff;
    text-decoration: none;
  }
</style>
