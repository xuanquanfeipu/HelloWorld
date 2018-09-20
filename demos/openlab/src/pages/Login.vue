<template>
  <div class="login-page" @keyup.enter="login()" :style="login_page_height" style="min-width:800px;">
    <login-head></login-head>
    <el-row>
      <el-col :span="7"  class="img-bg" style="margin-left: calc( 50% - 400px );">
        <img src="../../static/images/common/login.png" class="img-png">
      </el-col>
      <el-col :span="7" class="form_wrapper">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item class="form-title">
            <h2 for="">登录</h2>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.username" placeholder="手机/邮箱"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px;">
            <el-button type="primary" @click="login" >
              <router-link :to="form.location" style="text-decoration: none;color:#fff;">登录</router-link>
            </el-button>
          </el-form-item>
          <el-form-item style="margin-bottom: 0;">
            <el-menu class="el-menu-demo register" mode="horizontal" style="border-bottom-color: #DEE3E9;position: relative;top: 20px;border: 0;">
              <el-menu-item index="9" style="padding-right:0;">
                <router-link to="/pwdforget">忘记密码</router-link>
              </el-menu-item>
              <el-menu-item index="8">
                <router-link to="/register">立即注册</router-link>
              </el-menu-item>
            </el-menu>
          </el-form-item>
          <el-form-item style="margin-bottom:0;position: relative;top:20px;visibility: hidden;">
            <div class="fast-login">
              <span style="float:left;">已有账号？</span>
              <el-menu class="el-menu-demo" mode="horizontal" style="background: none;border: none;">
                <el-menu-item index="7">
                  <router-link to="/login">快捷登录>></router-link>
                </el-menu-item>
              </el-menu>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="copy-right"><a>©1998-2018中兴通讯股份有限公司 版权所有</a><a href="http://www.miibeian.gov.cn/publish/query/indexFirst.action">粤ICP备11108162</a><a style="text-decoration: none" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030502000445">粤公网安备44030502000445</a></div>
  </div>
</template>

<script>
import md5 from 'js-md5'
  import LoginHead from '../components/LoginHead'
  import store from '@/vuex/store'
  export default {
    name: 'Login',
    data() {
      return {
        form: {
          username: '',
          password: '',
          accessToken: '',
          location: ''
        },
        login_page_height:{
          height:""
        }
      }
    },
    store,
    mounted(){
      var _this = this;
      _this.login_page_height.height = document.body.scrollHeight+"px";
    },
    methods: {
      login() {
        var _this = this;
        //设置请求路径
        var url = "auth";
        var password = this.getMD5(_this.form.password)
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        var params = {
          username: _this.form.username,
          password: password
        };
        var qs = require('qs');
        this.$http.post(url, qs.stringify(params), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
          })
          .then(function (response) {
            if (0 == response.data.returnCode && response.data.data) {
              console.log(response)
              var accessToken = '';
              var data = response.data.data;
              var userId = data.extra.userId;
              var userType = data.extra.userType;
              //用户登录,记录moderator的状态
              var moderator = JSON.parse(data.extra.moderator);
              // console.log(moderator)
              var customerId = data.extra.customerId;
              //为true时,表示该用户是版块管理员,并用moderatorids记录该用户管理的是哪个论坛版块
              // JSON.parse(moderator)
              if(true == JSON.parse(moderator)){
                var moduleIds = data.extra.moduleIds
                sessionStorage.setItem('moduleIds',moduleIds)
              }
              accessToken = _this.form.accessToken = data.accessToken;
              sessionStorage.setItem('userId', userId);
              sessionStorage.setItem('moderator', moderator);
              sessionStorage.setItem('customerId',customerId)
              sessionStorage.setItem('accessToken', accessToken);
              sessionStorage.setItem('username', _this.form.username);
              // sessionStorage.setItem('password', _this.form.password);
              if(sessionStorage.getItem('userType')){
                sessionStorage.removeItem('userType');
              }
              sessionStorage.setItem('userType',userType)
              _this.form.location = accessToken ? '/' : '/login';
              //_this.$message(response.data.message || '登录成功！');
              _this.$router.push(_this.form.location)
            } else {
              _this.$message.error(response.data.message || '登录失败！');
            }
          }).catch(function (error) {});

      },
      //加密信息
      getMD5(pwd){
        // pwd = pwd.toUpperCase();
        pwd = md5(pwd);
        return pwd;
      }
    },
    components: {
      LoginHead,
    }
  }

</script>
<style>
  .el-main {
    overflow: hidden;
  }
  .login-page .copy-right {
    padding: 176px 0 55px 0;
  }

  .login-page {
    background: #2C3B4C;
  }

  .login-page .el-menu--horizontal {
    border-bottom: solid 1px #5C6A7B;
  }

  .login-page .el-row {
    margin-top: 5% !important;
  }

  .login-page .el-col {
    height: 100%;
  }

  .login-page .form_wrapper {
    padding: 18px 40px 40px 40px;
    background: #fff;
    height: 380px;
    width: 400px;
  }

  .login-page .form-title {
    margin-bottom: 0;
  }

  .login-page h2 {
    text-align: left;
    font-weight: bold;
    margin-bottom: 0;
    font-size: 20px;
    color: #373d41;
    margin-bottom: 20px;
  }

  .login-page .form_wrapper input {
    border-radius: 0;
  }

  .login-page .form_wrapper .el-form {
    margin: 0;
  }

  .login-page .el-button {
    background: #0084ff;
    border-color: #0084ff;
    width: 100%;
    font-size: 16px;
  }

  .login-page .el-form-item__content {
    margin: 0 !important;
  }

  .login-page .form_wrapper .el-menu--horizontal>.el-menu-item {
    float: right;
    line-height: 36px;
  }

  .login-page .form_wrapper .register.el-menu--horizontal>.el-menu-item {
    padding-left: 10px!important;
    border: 0;
  }

  .login-page .el-menu--horizontal>.el-menu-item a,
  .login-page .el-menu--horizontal>.el-menu-item a:hover {
    text-decoration: none;
    color: #0084FF;
    font-size: 14px;
  }

  .login-page .fast-login .el-menu--horizontal>.el-menu-item:hover {
    background: none;
    border: 0;
  }

  .login-page .fast-login .el-menu-item {
    background: none;
    padding: 0;
    border: 0;
  }

  .login-page .img-bg {
    height: 380px;
    width: 400px;
    background: url(../../static/images/common/login.png) center center no-repeat;
  }
  .login-page .img-png {
    width:100%;
    height: 100%;
  }
  .login-page .copy-right span,
  .login-page .copy-right a {
    color: #ffffff!important;
    text-decoration: none;
    font-size: 14px;
    margin-left: 10px;
  }

  .form_wrapper .el-menu--horizontal>.el-menu-item {
    height: 40px;
  }

</style>
