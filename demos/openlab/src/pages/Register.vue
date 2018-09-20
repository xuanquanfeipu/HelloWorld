<template>
  <div class="page register-page">
    <!-- <login-head></login-head> -->
    <el-row>
      <div class="register-logo"></div>
      <el-col :span="20" :offset="2" class="form_wrapper">
        <div class="register-title">
          <h1>账号注册</h1>
          <el-menu class="el-menu-demo" mode="horizontal" style="background: none;border: none;">
            <el-menu-item index="7">
              <router-link to="/login">快捷登录>></router-link>
            </el-menu-item>
            <span style="float:right;outline: none;position: relative;top: 20px;">已有账号？</span>
          </el-menu>
        </div>
        <el-form ref="form" :model="form" status-icon :rules="rules" label-width="80px">
          <el-form-item class="form-title">
          </el-form-item>
          <el-form-item  prop="userName">
            <el-input v-model="form.userName" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item  prop="username">
            <el-input v-model="form.username" @blur="checkEmail" placeholder="邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="password" >
            <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item prop="repassword" >
            <el-input type="password" v-model="form.repassword" placeholder="确认密码"></el-input>
          </el-form-item>
          <el-form-item label="+86" class="phone" prop="phone" >
            <el-input v-model="form.phone" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item class="message" prop="message" >
            <el-input v-model="form.message" placeholder="短信验证"></el-input>
            <el-button type="primary" plain @click="getMessage">获取验证码</el-button>
          </el-form-item>
          <el-form-item style="text-align: left;">
            <!-- <el-checkbox v-model="form.checked">我已阅读并同意
              <a href="#">服务协议</a>和
              <a href="#">隐私声明</a>
            </el-checkbox> -->
            <el-checkbox v-model="form.checked">提交此表格表明你同意接受中兴的
              <router-link to="/private">隐私保护条款.</router-link>
            </el-checkbox>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px;">
            <el-button style="" type="primary" :disabled="!form.checked" @click="submitForm('form')">同意协议并注册</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <copy-right class="copy-right"></copy-right>
  </div>
</template>

<script>
  import md5 from 'js-md5'
  import CopyRight from '../components/CopyRight'

  export default {
    name: 'Register',
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }else if(!/(?!^(\d+|[a-zA-Z]+|[%&',;=?$\x22]+)$)^[\s\S]{8,20}$/.test(value)){
          callback(new Error('输入的密码至少包括字母数字特殊字符中任意2种，且至少为8位'))
        } else {
          if (this.form.repassword !== '') {
            this.$refs.form.validateField('repassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致！'));
        } else {
          callback();
        }
      };

      var validatePhone = (rule, value, callback) => {
        if (value === '') {
          this.form.invalidPhone = true
          callback(new Error('请输入手机号'));
        } else if (!/^1\d{10}$/.test(value)) {
          this.form.invalidPhone = true
          callback(new Error('请输入正确的手机号!'));
        } else if (this.form.exsitPhone) {
          this.form.invalidPhone = true
          callback(new Error('该手机号已被注册!'));
          this.form.exsitPhone = false;
        } else {
          this.form.invalidPhone = false;
          callback();
        }
      };
      var validateEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱地址'));
        } else if (!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)) {
          callback(new Error('请输入正确的邮箱地址!'));
        } else {
          callback();
        }
      };
      var validateUser = (rule, value, callback) => {
        if(value === '') {
          callback(new Error('请输入用户名'));
        }else if (/\s/.test(value) || value.match(/^[]*$/)){
          callback(new Error('用户名不能有空格'));
        }else if( value.length >30){
          callback(new Error('用户名不能超过30个字符'))
        }else{
          callback()
        }
      }
      return {
        form: {
          userName:'',
          userId: '',
          username: '',
          password: '',
          repassword: '',
          phone: '',
          message: '',
          checked: false,
          isError: false,
          invalidPhone: false,
          exsitPhone: false
        },
        rules: {
          username: [{
              required: true,
              message: '请输入邮箱地址',
              trigger: 'blur,change',
            },
            {
              validator: validateEmail,
              trigger: 'blur'
            }
            // {
            //   type: 'email',
            //   message: '请输入正确的邮箱地址',
            //   trigger: 'blur'
            // }
          ],
          message: [{
            required: true,
            message: '请输入验证码',
            trigger: 'blur,change'
          }],
          password: [{
            validator: validatePass,
            trigger: 'blur'
          }],
          repassword: [{
            validator: validatePass2,
            trigger: 'blur'
          }],
          phone: [{
              required: true,
              message: '请输入手机号',
              trigger: 'blur,change'
            },
            {
              validator: validatePhone,
              trigger: 'blur'
            }
          ],
          userName: [{
            required:true,
            message:'请输入用户名',
            trigger:'blur,change'
          },{
              validator: validateUser,
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        var _this = this;
        if (!_this.form.checked) return;
        var qs = require('qs');
        var password = this.getMD5(_this.form.password)
        var params = {
          "checkCode": _this.form.message,
          "email": _this.form.username,
          "phone": _this.form.phone,
          "userPassword": password,
          "userName":_this.form.userName
        };
        var url = 'user/register';

        this.$refs[formName].validate((valid) => {
          if (valid) {
            //设置请求路径
            // 发送请求:将数据返回到一个回到函数中
            // 并且响应成功以后会执行then方法中的回调函数
            this.$http.post(url, qs.stringify(params), {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
              })
              .then(function (response) {
                if (0 == response.data.returnCode) {
                  sessionStorage.setItem('username', _this.form.username);
                  // sessionStorage.setItem('password', _this.form.password);
                  var param = {
                    username: _this.form.username,
                    password: password
                  };
                  _this.login(param);
                } else {
                  _this.$message({
                    message: response.data.message || '抱歉，账号注册失败!',
                    type: 'error'
                  });
                }
              })
              .catch(function (error) {
                // _this.$message({
                //   message: '抱歉，账号注册失败!',
                //   type: 'error'
                // });
              });
          } else {
            return false;
          }
        });
      },
      login(params){
        var _this = this;
        var qs = require('qs');
        var url = "auth";
        this.$http.post(url, qs.stringify(params), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        })
          .then(function (response) {
            if (0 == response.data.returnCode && response.data.data) {
              var accessToken = '';
              var data = response.data.data;
              var userId = data.extra.userId;
              var moderator = JSON.parse(data.extra.moderator);
              var customerId = data.extra.customerId;
               if(true == JSON.parse(moderator)){
                var moduleIds = data.extra.moduleIds
                sessionStorage.setItem('moduleIds',moduleIds)
              }
              accessToken = data.accessToken;
              sessionStorage.setItem('userId', userId);
              sessionStorage.setItem('accessToken', accessToken);
              sessionStorage.setItem('username', _this.form.username);
              // sessionStorage.setItem('password', _this.form.password);
              sessionStorage.setItem('moderator', moderator);
              sessionStorage.setItem('customerId',customerId)
              _this.$message({
                message: response.data.message || '恭喜你，账号注册成功！',
                type: 'success'
              });

              _this.$router.push('/profileedit?phone=' + _this.form.phone + '&email=' + _this.form.username +
                '&userId=' + response.data.data);
            } else {
              _this.$message.error(response.data.message || '注册失败！');
            }
          }).catch(function (error) {});
      },
      getMessage() {
        var _this = this;
        //设置请求路径
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        if (_this.form.invalidPhone) {
          return;
        }
        if (!_this.form.phone) {
          _this.$message.error('请输入手机号！');
          return;
        }
        this.$http.get('user/checkcode?phone=' + _this.form.phone, {})
          .then(function (response) {
            if (0 == response.data.returnCode) {
              _this.form.exsitPhone = false;
              _this.$message(response.data.message || '已发送验证码！');
            } else if (1002 == response.data.returnCode) {
              _this.form.exsitPhone = true;
              _this.$refs.form.validateField('phone');
              // _this.$message.error('该手机号已被注册!');
            } else {
              _this.$message.error(response.data.message || '获取验证码失败！');
            }
          })
          .catch(function (error) {
            _this.$message.error('获取验证码失败！');
          });
      },
      checkEmail() {
        var _this = this;
        //设置请求路径
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        if (!_this.form.username || !/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(_this.form.username)) {
          // _this.$message({
          //   message: '账号不能为空!',
          //   type: 'warning'
          // });
          return;
        }
        this.$http.get('user/checkemail?email=' + _this.form.username, {})
          .then(function (response) {
            if (0 == response.data.returnCode) {
              // _this.form.isError = false;
              _this.$message({
                message: response.data.message || '恭喜你，该账号没有使用过',
                type: 'success'
              });
            } else {
              // _this.form.isError = true;
              _this.$message({
                message: response.data.message || '抱歉，该账号已被使用',
                type: 'warning'
              });
            }
          })
          .catch(function (error) {
            _this.$message({
              message: '抱歉，该账号已被使用',
              type: 'warning'
            });
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
      CopyRight
    }
  }

</script>
<style>

  .page.register-page {
    height: 70%;
    padding-bottom: 55px;
  }

  .register-logo {
    height: 66px;
    margin-bottom: 10px;
    background: url(../../static/images/common/logo-register.png) center center no-repeat;
  }

  .register-title {
    border-bottom: 1px solid #D4D6D9;
    height: 50px;
  }

  .register-title h1 {
    text-align: left;
    float: left;
  }

  .register-title span {
    font-size: 14px;
  }

  .register-page .el-menu--horizontal {
    border-bottom: solid 1px #5C6A7B;
  }

  .register-page .el-row {
    height: 100%;
    margin-top: 4% !important;
  }

  .register-page .el-col {
    height: 100%;
  }

  .register-page .form_wrapper {
    padding: 5%;
    padding-top: 2%;
    background: #fff;
    width: 60%;
    margin-left: 20%;
    border: 1px solid #D5D7DA;
  }

  .register-page .form_wrapper .el-form {
    margin: 0;
  }

  .register-page .form_wrapper .el-form-item {
    width: 50%;
    margin-left: 25%;

  }

  .register-page .form_wrapper .el-form-item.phone label {
    width: 40px !important;
    text-align: center;
    padding: 0;
    display: inline-block;
    border: 1px solid #ddd;
    line-height: 38px;
    border-right: 0;
  }

  .register-page .form_wrapper .el-form-item.phone>div {
    display: inline-block;
    float: left;
    width: calc( 100% - 40px);
  }

  .register-page .form_wrapper .el-form-item.message .el-input {
    width: 60%;
    float: left;
  }

  .register-page .form_wrapper .el-form-item.message .el-button {
    width: 36%;
    float: right;
    border: 0;
    font-size: 14px;
  }

  .register-page .form-title {
    margin-bottom: 0;
  }

  .register-page h2 {
    text-align: left;
    font-weight: bold;
    margin-bottom: 0;
  }

  .register-page .form_wrapper input {
    border-radius: 0;
  }

  .register-page .el-form-item.is-required .el-form-item__label:before {
    content: '';
    margin-right: 0;
  }

  .register-page .el-button {
    background: #66b1ff;
    border-color: #66b1ff;
    width: 100%;
    font-size: 16px;
    cursor: pointer;
  }

  .register-page .el-button.is-plain {
    background: #C6E4FF;
  }

  .register-page .el-form-item__content {
    margin: 0 !important;
  }

  .register-page .form_wrapper .el-menu--horizontal>.el-menu-item {
    float: right;
    line-height: 60px;
    border: none;
  }

  .register-page .form_wrapper .register.el-menu--horizontal>.el-menu-item {
    padding-left: 10px;
  }

  .register-page .el-menu--horizontal>.el-menu-item a,
  .register-page .el-menu--horizontal>.el-menu-item a:hover {
    text-decoration: none;
    color: #0084FF;
  }

  .register-page .register-title .el-menu--horizontal>.el-menu-item:hover {
    background: none;
    border: 0;
    padding-right: 0;
  }

  .register-page .fast-register .el-menu-item {
    background: none;
    padding: 0;
    border: 0;
  }

  .register-page .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #8A8A8A;
  }

  .register-page .el-checkbox__input.is-checked+.el-checkbox__label a {
    color: #409EFF;
    padding: 0 2px;
    text-decoration: none;
  }

  .register-page .copy-right {
    width: 80%;
    font-size: 14px;
    margin-left: 10%;
    position: relative;
    bottom: 0px;
    box-shadow: none;
    color: #666;
    clear: both;
  }

  .register-page .img-bg {
    background: url(../../static/images/product.png) center center no-repeat;
  }

  .register-page .copy-right span,
  .register-page .copy-right a {
    color: #666;
  }

</style>
