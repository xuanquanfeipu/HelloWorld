<template>
  <div class="page password-page">
    <el-row>
      <el-col :span="23" class="form_wrapper" style="margin-left:1%">
        <el-form ref="form" status-icon :model="form" :rules="rules" label-width="80px">
          <el-form-item class="form-title">
          </el-form-item>
          <el-form-item label="原密码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpassword">
            <el-input type="password" v-model="form.newpassword" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="repassword">
            <el-input type="password" v-model="form.repassword" placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item style="margin-bottom: 0px;">
            <el-button type="primary" :style="bgBtn" @click="onSubmit('form')">确认</el-button>
          </el-form-item>

        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import md5 from 'js-md5'
  export default {
    name: 'Password',
    data() {
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
      // var validatePass3 = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请再次输入密码'));
      //   } else {
      //     callback();
      //   }
      // };
      return {
          bgBtn: {
          backgroundImage: 'url(' + require('../../static/images/product/Api_btn.png') + ')'
        },
        form: {
          password: '',
          newpassword: '',
          repassword: ''
        },
         rules: {
           password: [{
             required: true,
              message: '请输入原密码',
              trigger: 'blur'
          }],
          newpassword: [{
            required: true,
            validator: validatePass,
            trigger: 'blur'
          }],
          repassword: [{
            required: true,
            validator: validatePass2,
            trigger: 'blur'
          }]
         }
      }
    },
    created(){
      if(!sessionStorage.getItem('accessToken')){
        this.$message.error('会话已过期，请重新登录！');
        this.$router.push(
            {path:'/login'}
        )
      }
    },
    methods: {
      onSubmit(formName) {
        var _this = this;
        var oldpassword = this.getMD5(_this.form.password)
        var newpassword = this.getMD5(_this.form.newpassword)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //设置请求路径
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        _this.$http({
            url: 'auth/password',
            method: 'put',
            headers: {
              'X-Access-Token': sessionStorage.getItem('accessToken')
            },
            data: {
              "newPassword": newpassword,
              "password": oldpassword
            }
          })
          .then(function (response) {
            if (0 == response.data.returnCode) {
              _this.$message(response.data.message || '密码修改成功！');
              _this.resetForm(formName)
            }else if(response.data.returnCode==1011){
            _this.$message.error('会话已过期，请重新登录！');
            _this.$router.push(
              {path:'/login'}
            )
          } else {
              _this.$message.error(response.data.message || '密码修改失败！');
              _this.resetForm(formName)
            }
          })
          .catch(function (error) {
            // _this.$message('密码修改失败！');
            // _this.$message('会话过期，请重新登录');
          });
             } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      //加密信息
      getMD5(pwd){
        // pwd = pwd.toUpperCase();
        pwd = md5(pwd);
        return pwd;
      },
      //重置表单
       resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    components: {}
  }

</script>
<style scoped>
  #app,
  .el-container,
  .el-main,
  .page {
    /* height: 100%; */
  }

  .page.password-page {
    /* height: 100%; */
    /* padding: 0 2% 2%; */
  }

  .password-page .el-menu--horizontal {
    border-bottom: solid 1px #5C6A7B;
  }

  .password-page .el-row {
    height: 60%;
  }

  .password-page .el-col {
    height: 100%;
  }

  .password-page .form_wrapper {
    padding: 10%;
    padding-top: 10%;
    background: #fff;
  }

  .password-page .el-form {
    width: 50%;
    margin-left: 25%;
  }

  .password-page .form-title {
    margin-bottom: 0;
  }

  .password-page h2 {
    text-align: left;
    font-weight: normal;
    margin-bottom: 34px;
    font-size: 24px;
    margin-left: 8%;
  }

  .password-page .form_wrapper input {
    border-radius: 0;
  }

  .password-page .el-button {
    background: #66b1ff;
    border-color: #66b1ff;
    width: 100%;
    font-size: 16px;
    width: 160px;
  }

  .password-page .form-title .el-form-item__content {
    margin: 0 !important;
  }

  .password-page .form_wrapper .el-menu--horizontal>.el-menu-item {
    float: right;
    line-height: 36px;
  }

  .password-page .form_wrapper .register.el-menu--horizontal>.el-menu-item {
    padding-left: 10px;
  }

  .password-page .el-menu--horizontal>.el-menu-item a,
  .password-page .el-menu--horizontal>.el-menu-item a:hover {
    text-decoration: none;
    color: #0084FF;
  }

  .password-page .fast-password .el-menu--horizontal>.el-menu-item:hover {
    background: none;
    border: 0;
  }

  .password-page .fast-password .el-menu-item {
    background: none;
    padding: 0;
    border: 0;
  }

  .password-page .copy-right {
    width: 80%;
    color: #fff;
    font-size: 14px;
    margin-left: 10%;
    margin-bottom: 20px;
    position: absolute;
    bottom: 0;
  }

  .password-page .img-bg {
    background: url(../../static/images/product.png) center center no-repeat;
  }

</style>
