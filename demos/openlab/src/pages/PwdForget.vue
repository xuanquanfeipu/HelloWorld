<template>
  <div class="page pwdforget-page">
    <!-- <login-head></login-head> -->
    <el-row>
      <div class="pwdforget-logo"></div>
      <el-col :span="20" :offset="2" class="form_wrapper">
        <div class="pwdforget-title">
          <h1>忘记密码</h1>

        </div>
        <el-form ref="form" :model="form" status-icon :rules="rules" label-width="80px">
          <el-form-item class="form-title">
          </el-form-item>
          <el-steps :active="form.active" finish-status="success">
            <el-step title="确认账号"></el-step>
            <el-step title="安全验证"></el-step>
            <el-step title="重置密码"></el-step>
          </el-steps>
          <div class="el-step-1" v-show="form.active==0">
            <el-form-item class="" style="text-align:left;margin-bottom:0;">
              <label for="">请输入你要找回密码的账号</label>
            </el-form-item>

            <el-form-item required prop="username">
              <el-input v-model="form.username" placeholder="请输入手机/邮箱"></el-input>
            </el-form-item>

            <el-form-item class="message" prop="inputCode">
              <el-input v-model="form.inputCode" placeholder="请输入验证码"></el-input>
              <!-- <img :src="form.code" alt=""> -->
              <!-- <el-input v-model="form.code" readonly placeholder="验证码"></el-input> -->
              <!-- <a type="primary" plain @click="getCode" style="cursor:pointer;">换一张</a> -->
              <s-identify :identifyCode="form.identifyCode"></s-identify>
              <a type="primary" plain @click="refreshCode" style="cursor:pointer;">换一张</a>
            </el-form-item>

            <el-form-item style="margin-bottom: 0px;">
              <el-button type="primary" style="margin-top: 12px;" @click="next">下一步</el-button>
            </el-form-item>
          </div>

          <div class="el-step-2" v-show="form.active==1">
            <el-form-item class="" style="text-align:left;margin-bottom:0;">
              <label for="">为了你的账号安全，请完成身份验证</label>
            </el-form-item>

            <el-form-item style="text-align:left;">
              <div>手机验证：
                <span>{{form.phone}}</span>
              </div>
            </el-form-item>

            <el-form-item class="message" prop="inputMsgCode">
              <el-input v-model="form.inputMsgCode" placeholder="请输入手机验证码"></el-input>
              <el-button type="primary" plain @click="getMsgCode">获取验证码</el-button>
            </el-form-item>

            <el-form-item style="margin-bottom: 0px;">
              <el-button type="primary" style="margin-top: 12px;" @click="next">下一步</el-button>
            </el-form-item>
          </div>

          <div class="el-step-3" v-show="form.active==2">
            <el-form-item class="" style="text-align:left;margin-bottom:0;">
              <label for="">请输入新的登录密码</label>
            </el-form-item>


            <el-form-item class="message" prop="newpassword">
              <el-input type="password" v-model="form.newpassword" placeholder="新的登录密码"></el-input>
            </el-form-item>

            <el-form-item class="message" prop="reNewpassword">
              <el-input type="password" v-model="form.reNewpassword" placeholder="确认新的登录密码"></el-input>
            </el-form-item>

            <el-form-item style="margin-bottom: 0px;">
              <el-button type="primary" style="margin-top: 12px;" @click="next">确认</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-col>
    </el-row>
    <copy-right class="copy-right"></copy-right>
  </div>
</template>

<script>
import md5 from 'js-md5'
  import CopyRight from '../components/CopyRight'
  import SIdentify from '../components/Identify'

  export default {
    name: 'Pwdforget',
    data() {
      // var validatePass = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请输入密码'));
      //   } else {
      //     if (this.form.reNewpassword !== '') {
      //       this.$refs.form.validateField('reNewpassword');
      //     }
      //     callback();
      //   }
      // };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(!/(?!^(\d+|[a-zA-Z]+|[%&',;=?$\x22]+)$)^[\s\S]{8,20}$/.test(value)){
           callback(new Error('输入的密码至少包括字母数字特殊字符中任意2种，且至少为8位！'));
        }else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.newpassword) {
          callback(new Error('两次输入密码不一致!'));
        } else if(value.trim()===''){
           callback(new Error('密码不能是空白字符！'));
        }
        else {
          callback();
        }
      };
      // var validatePass2 = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请再次输入密码'));
      //   } else if (value !== this.form.newpassword) {
      //     callback(new Error('两次输入密码不一致!'));
      //   } else {
      //     callback();
      //   }
      // };
      var validateImgCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));
        } else if (!this.checkImgCode()) {
          callback(new Error('验证码输入错误!'));
        } else {
          callback();
        }
      };

      return {
        form: {
          userId: '',
          username: '',
          inputCode: '',
          code: 'user/imageCode',
          phone: '',
          inputMsgCode: '',
          msgCode: '',
          newpassword: '',
          reNewpassword: '',
          active: 0,
          identifyCode: "",
          valid: false
        },
        rules: {
          username: [{
              required: true,
              message: '请输入手机/邮箱',
              trigger: 'blur,change'
            },
            // {
            //   type: 'email',
            //   message: '请输入正确的邮箱地址',
            //   trigger: 'blur'
            // }
          ],
          inputCode: [{
            required: true,
            message: '请输入验证码',
            trigger: 'blur,change'
          },{
            validator: validateImgCode,
            trigger: 'blur'
          }],
          inputMsgCode: [{
            required: true,
            message: '请输入验证码',
            trigger: 'blur,change'
          }],
          newpassword: [{
            validator: validatePass,
            trigger: 'blur'
          }],
          reNewpassword: [{
            validator: validatePass2,
            trigger: 'blur'
          }]
        },
        identifyCodes: "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      }
    },
    mounted() {
      // this.getCode();
      this.form.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    methods: {
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },
      refreshCode() {
        this.form.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
      },
      makeCode(o, l) {
        for (let i = 0; i < l; i++) {
          this.form.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
          ];
        }
      },
      next() {
        if (this.form.active == 0) {
          if (this.checkImgCode()) {
            this.checkUser();
          } else {
            this.form.active = 0;
          }
        } else if (this.form.active == 1) {
          this.checkMsgCode()
        } else if (this.form.active == 2) {
          this.resetPassword('form');
        } else {
          if (this.form.active++ > 2) this.form.active = 0;
        }
      },
      checkUser() {
        var _this = this;
        //设置请求路径
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        this.$http.get('user/checkUser?account=' + _this.form.username + '&code=' + _this.form.inputCode, {})
          .then(function (response) {
            if (0 == response.data.returnCode) {
              _this.form.phone = response.data.data;
              _this.form.active = 1;
            } else {
              _this.form.active = 0;
              _this.$message.error(response.data.message || '用户校验失败！');
            }
          })
          .catch(function (error) {
            // _this.$message.error('获取验证码失败！');
          });
      },
      getCode() {
        var _this = this;
        // _this.form.code = 'http://10.47.202.98:8181/isvportal/user/imageCode?d='+Math.random();

      },
      getMsgCode() {
        var _this = this;
        //设置请求路径
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        this.$http.get('user/sendMscode?phone=' + _this.form.phone, {})
          .then(function (response) {
            if (0 == response.data.returnCode) {
              _this.$message(response.data.message || '已发送验证码！');
            } else {
              _this.$message.error(response.data.message || '获取验证码失败！');
            }
          })
          .catch(function (error) {
            // _this.$message.error('获取验证码失败！');
          });
      },
      checkImgCode() {
        var _this = this;
        if (_this.form.inputCode.toLowerCase() == _this.form.identifyCode.toLowerCase()) {
          return true;
        } else {
          _this.$message.error('验证码校验失败！');
          return false;
        }
      },
      checkMsgCode() {
        var _this = this;
        //设置请求路径
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        _this.$http.get('user/checkMscode?phone=' + _this.form.phone + '&mscode=' + _this.form.inputMsgCode, {
            // phone:_this.form.username,
            // mscode:_this.form.inputMsgCode
          })
          .then(function (response) {
            if (0 == response.data.returnCode) {
              _this.form.userId = response.data.data;
              if (_this.form.active++ > 2) _this.form.active = 0;
              _this.$message(response.data.message || '验证码校验成功！');
            } else {
              // if (_this.form.active++ > 2) _this.active = 0;
              _this.$message.error(response.data.message || '验证码校验失败！');
            }
          })
          .catch(function (error) {
            // _this.$message.error('验证码校验失败！');
          });
      },
      resetPassword(formName) {
        var _this = this;
        var newpassword = this.getMD5(_this.form.newpassword)
        this.$refs[formName].validate((valid) => {
          if (valid) {

            //设置请求路径
            // 发送请求:将数据返回到一个回到函数中
            // 并且响应成功以后会执行then方法中的回调函数
            _this.$http.get('user/resetpassword?userId=' + _this.form.userId + '&password=' + newpassword, {
                // phone:_this.form.username,
                // mscode:_this.form.inputMsgCode
              })
              .then(function (response) {
                if (0 == response.data.returnCode) {
                  if (_this.form.active++ > 2) _this.form.active = 0;
                  _this.$message(response.data.message || '密码重置成功！');
                  _this.$router.push('/login')
                } else {
                  if (_this.form.active++ > 2) _this.form.active = 0;
                  _this.$message.error(response.data.message || '密码重置失败！');
                }
              })
              .catch(function (error) {
                // _this.$message.error('密码重置失败！');
              });
          }
        });
      },
       //加密信息
      getMD5(pwd){
        // pwd = pwd.toUpperCase();
        pwd = md5(pwd);
        return pwd;
      }
    },
    components: {
      CopyRight,
      SIdentify
    }
  }

</script>
<style>
html,
body,
  #app
 {
    height: 100%;
  }

  .page.pwdforget-page {
    height: 70%;
    padding-bottom: 150px;
  }

  .pwdforget-logo {
    height: 66px;
    margin-bottom: 10px;
    background: url(../../static/images/common/logo-register.png) center center no-repeat;
  }

  .pwdforget-title {
    border-bottom: 1px solid #D4D6D9;
    height: 50px;
  }

  .pwdforget-title h1 {
    text-align: left;
    float: left;
  }

  .pwdforget-title span {
    font-size: 14px;
  }

  .pwdforget-page .el-menu--horizontal {
    border-bottom: solid 1px #5C6A7B;
  }

  .pwdforget-page .el-row {
    height: 100%;
    margin-top: 4% !important;
  }

  .pwdforget-page .el-col {
    height: 100%;
  }

  .pwdforget-page .form_wrapper {
    padding: 5%;
    padding-top: 2%;
    background: #fff;
    width: 60%;
    margin-left: 20%;
  }

  .pwdforget-page .form_wrapper .el-form-item {
    width: 50%;
    margin-left: 25%;

  }

  .pwdforget-page .form_wrapper .el-steps {
    text-align: left;
    width: 80%;
    margin-left: 10%;
    margin-top: 10px;
    margin: 20px 10%;
  }

  .pwdforget-page .form_wrapper .el-step__title {
    font-size: 14px;
  }

  .pwdforget-page .form_wrapper .el-form-item.message .el-input:nth-child(2) {
    width: 80px;
    margin-left: 10px;

  }

  .pwdforget-page .form_wrapper .el-form-item.phone label {
    width: 40px !important;
    text-align: center;
    padding: 0;
    display: inline-block;
    border: 1px solid #ddd;
    line-height: 38px;
    border-right: 0;
  }

  .pwdforget-page .form_wrapper .el-form-item.phone>div {
    display: inline-block;
    float: left;
    width: calc( 100% - 40px);
  }

  .pwdforget-page .form_wrapper .el-form-item.message .el-input {
    width: 50%;
    float: left;
  }

  .pwdforget-page .form_wrapper .el-form-item.message .el-button {
    width: 36%;
    float: right;
    border: 0;
    font-size: 14px;
  }

  .pwdforget-page .form-title {
    margin-bottom: 0;
  }

  .pwdforget-page h2 {
    text-align: left;
    font-weight: bold;
    margin-bottom: 0;
  }

  .pwdforget-page .form_wrapper input {
    border-radius: 0;
  }

  .pwdforget-page .el-button {
    background: #66b1ff;
    border-color: #66b1ff;
    width: 100%;
    font-size: 16px;
  }

  .pwdforget-page .el-button.is-plain {
    background: #C6E4FF;
  }

  .pwdforget-page .el-form-item__content {
    margin: 0 !important;
  }

  .pwdforget-page .form_wrapper .el-menu--horizontal>.el-menu-item {
    float: right;
    line-height: 60px;
    border: none;
  }

  .pwdforget-page .form_wrapper .pwdforget.el-menu--horizontal>.el-menu-item {
    padding-left: 10px;
  }

  .pwdforget-page .el-menu--horizontal>.el-menu-item a,
  .pwdforget-page .el-menu--horizontal>.el-menu-item a:hover {
    text-decoration: none;
    color: #0084FF;
  }

  .pwdforget-page .pwdforget-title .el-menu--horizontal>.el-menu-item:hover {
    background: none;
    border: 0;
    padding-right: 0;
  }

  .pwdforget-page .fast-pwdforget .el-menu-item {
    background: none;
    padding: 0;
    border: 0;
  }

  .pwdforget-page .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #8A8A8A;
  }

  .pwdforget-page .el-checkbox__input.is-checked+.el-checkbox__label a {
    color: #409EFF;
    padding: 0 2px;
    text-decoration: none;
  }

  .pwdforget-page .copy-right {
    width: 80%;
    font-size: 14px;
    margin-left: 10%;
    /* margin-bottom: 50px; */
    position: absolute;
    box-shadow: none;
     color: #666;
  }
.pwdforget-page .copy-right a{
      color: #666;
}
  .pwdforget-page .img-bg {
    background: url(../../static/images/product.png) center center no-repeat;
  }

  .s-canvas {
    width: 35%;
    display: inline;
    float: left;
    margin-left: 1%;
  }

</style>
