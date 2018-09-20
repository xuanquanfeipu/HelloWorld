<template>
  <div class="page">
      <!-- 面包屑导航开始 -->
    <div class="page-accountmodification-title">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/account' }">子账户管理</el-breadcrumb-item>
            <el-breadcrumb-item>修改</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <!-- 面包屑导航结束 -->
    <!-- table表格开始 -->
    <div class="page-accountmodification-content">
        <div class="page-accountmodification-bg"></div>
            <el-form :model="form" ref="form" :rules="rules" status-icon label-width="100px" class="demo-ruleForm page-accountmodification-form">
                <el-form-item
                    label="账号"
                    required>
                    <el-input v-model="form.userId" :disabled="form.hasId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item
                    label="新密码"
                    type='password'
                    prop="userPassword"
                    >
                    <el-input type="password" v-model="form.userPassword" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item
                    label="确认密码"
                    type='password'
                    prop="repassword"
                    >
                    <el-input type="password" v-model="form.repassword" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.userName"></el-input>
                </el-form-item>
                <el-form-item label="公司">
                    <el-input v-model="form.company"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')" class="btnSave">保存</el-button>
                    <el-button @click="resetForm" class="btnReset">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import md5 from 'js-md5'
export default {
  name:'AccountModification',
  data(){
      //匹配输入密码规则
      var validatePass = (rule, value, callback) => {
          if(value ==''){
            callback()
          }else {
            if(!/(?!^(\d+|[a-zA-Z]+|[%&',;=?$\x22]+)$)^[\s\S]{8,20}$/.test(value)){
            callback(new Error('输入的密码至少包括字母数字特殊字符中任意2种，且至少为8位'))
            }else{
                callback()
            } 
          }
      };
      var revalidatePass = (rule, value, callback) => {
        if (value !== this.form.userPassword) {
          callback(new Error('两次输入密码不一致！'));
        } else {
          callback();
        }
      };
      return {
          form: {
          userId: this.$route.query.userId,
          userName:this.$route.query.userName,
          company:this.$route.query.company,
          checked:true,
          hasId:true,
          repassword:'',
          userPassword:''
        },
        rules:{
            userPassword:[{
                validator: validatePass,
                trigger: 'blur'
            }],
            repassword:[{
                validator: revalidatePass,
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
      submitForm(formName) {
        var _this = this;//记录当前vm实例
        // console.log(this.form.userPassword)
        if(_this.form.userPassword != ''){
            var password = this.getMD5(_this.form.userPassword)
        }else{
            var password = _this.form.userPassword
        }
        

        //密码为空时保存失败
        if(this.form.userPassword.match(/^[ ]+$/)){
             _this.$message({
                message: '输入的密码不能全部为空格',
                type: 'error'
            });
            return;
        } 
        if (!_this.form.checked) return;
        var qs = require('qs');
        var params = {
        "userId": _this.form.userId,
        "password": password,
        "userName": _this.form.userName,
        "company": _this.form.company
        };
        var url = 'user/subaccount/update'+'?date='+new Date().getTime();
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post(url, qs.stringify(params), {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                  'X-Access-Token': sessionStorage.getItem('accessToken')
                }
              }).then(function(response){
                  if (0 == response.data.returnCode) {
                   _this.$message({
                    message: response.data.message || '恭喜,修改成功!',
                    type: 'success'
                  });
                  _this.$router.push({
                    path:'/peopleCenter/account'
                  });
                } else if(1011 == response.data.returnCode){
                    _this.$message.error('会话已过期，请重新登录！');
                    _this.$router.push(
                        {path:'/login'}
                    )
                } else {
                  _this.$message({
                    message: response.data.message || '抱歉，修改失败!',
                    type: 'error'
                  });
                }
              })
          } else {
            return false;
          }
        });
      },
      resetForm() {
        this.$router.push({
          path:'/peopleCenter/account'
        })
      },
       //加密信息
      getMD5(pwd){
        // pwd = pwd.toUpperCase();
        pwd = md5(pwd);
        return pwd;
      }
    }
}
</script>
<style scoped>
.page {
    height: auto;
    padding: 2% 2%;
}
.page-accountmodification-title {
    width: 84%;
    margin: 20px 0 20px 8%;
    text-align: left;
    color: #333333;
}
.page-accountmodification-content {
    width: 80%;
    margin: 0 auto;
    padding: 24px;
    transition: .2s;
    border: 1px solid #e5e5e5;
    background-color: #ffffff;
    position: relative;
    box-shadow: 0px 4px 4px #e5e5e5;
    /* overflow: hidden; */
}
.page-accountmodification-bg {
    width: 456px;
    height: 190px;
    position: absolute;
    bottom: 0;
    right: 0;
    opacity: 1;
}
.page-accountmodification-form {
    margin: 50px 258px 50px 254px;
}
.btnSave {
    height: 36px;
    width: 140px;
    color: #ffffff;
    padding:13px 20px;
}
.btnReset {
    height: 36px;
    width: 140px;
    border: 1px solid #409eff;
    color: #409eff
}
</style>


