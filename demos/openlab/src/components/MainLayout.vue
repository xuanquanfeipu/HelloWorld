<template>
  <el-container>

    <el-header v-show="headerShow">
      <nav-bar :isLogin="isLogin" :username="username" :routePath="routePath"></nav-bar>
    </el-header>

    <el-main :class="registerBg">
      <router-view/>
    </el-main>

    <el-footer height="500" v-show="headerShow">
      <el-row :gutter="0" class="footer-links">
        <el-col :span="6" v-for="(item,index) in footerLinks" :key="item.id">
          <div class="grid-content ">
            <footer-link :footer-msg="item" :footer-index="index"></footer-link>
          </div>
        </el-col>
      </el-row>
      <img src="static/images/common/footer_line.png"/>
      <el-row style="margin-bottom: 25px!important;">
        <copy-right></copy-right>
      </el-row>
    </el-footer>

  </el-container>
</template>
<script>
  import NavBar from '@/components/NavBar'
  import FooterLink from './FooterLink'
  import CopyRight from './CopyRight'

  export default {
    name: 'MainLayout',
    data() {
      return {
        footerLinks: [{
          id: 1,
          title: '快速入口',
          list: [
            {name: '学习中心', url: '/learn'},
            {name: '开发与体验', url: '/develop'},
            {name: '服务中心', url: '/support'},
            {name: '案例中心', url: '/cases'}]
        }, {
          id: 2,
          title: '常用链接',
          list: [{name: '中兴通讯股份有限公司', url: 'http://www.zte.com.cn'}]
        }, {
          id: 3,
          title: '友情链接',
          list: [
            {name: 'ZTE | 渠道合作伙伴', url: 'http://ichannel.zte.com.cn'},
            {name: 'ZTE开放实验室', url: 'http://openlab.zte.com.cn'}]
        }, {
          id: 4,
          title: '关注中兴云上实验室',
          img: 'static/images/common/QRCode.png',
          list: []
        }],
        isLogin: false,
        headerShow: true,
        username: '',
        registerBg: this.isLogin ? 'register-bg' : '',
        routePath:""
      }
    },
    computed: {
    },
    methods: {},
    created: function () {
      this.routePath = sessionStorage.getItem('routePath');
      this.username = sessionStorage.getItem('username');
      this.isLogin = this.username ? true : false;
      if (this.$route.path == '/register' || this.$route.path == '/pwdforget' || this.$route.path == '/login') {
        this.headerShow = false;
      }
    },
    watch: {
      '$route'(to, from) {
        let index = to.path.substring(1,to.path.length-1).indexOf("/")
        if(index>0){
          sessionStorage.setItem('routePath',to.path.substring(0,index+1));
        }else{
          sessionStorage.setItem('routePath',to.path);
        }
        this.routePath = sessionStorage.getItem('routePath');
        this.username = sessionStorage.getItem('username');
        this.isLogin = this.username ? true : false;
        if (to.path == '/register' || to.path == '/pwdforget' || to.path == '/login') {
            this.headerShow = false;
        } else {
          this.headerShow = true;
        }
      }
    },
    components: {
      NavBar,
      FooterLink,
      CopyRight
    }
  }
</script>
<style>
  .el-header {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-footer {
    background-color: #2d2f33;
    color: #fff;
    padding: 60px 288px 0 288px;
    text-align: left;
  }

  .el-main {
    background-color: #F7F8FA;
    color: #333;
    text-align: center;
    padding: 0px;
  }

  .register-bg {
    background: #E6E6EB;
  }
</style>
