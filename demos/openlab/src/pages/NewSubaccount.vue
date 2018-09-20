<template>
  <div class="page">
      <!-- 面包屑导航开始 -->
    <div class="page-accountmodification-title">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/account' }">子账户管理</el-breadcrumb-item>
            <el-breadcrumb-item>新增子账户</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <!-- 面包屑导航结束 -->
    <!-- table表格开始 -->
    <div class="page-accountmodification-content">
        <div class="page-accountmodification-bg"></div>
            <el-form :model="form" ref="form" status-icon :rules="rules" class="demo-ruleForm page-accountmodification-form" label-width="100px">
                <el-form-item label="账号"  prop="userId">
                    <el-input placeholder="请输入" v-model="form.userId" auto-complete="off" @blur="checkUserId"></el-input>
                </el-form-item>
                <el-form-item label="密码"  prop="password">
                    <el-input placeholder="请输入" type='password' v-model="form.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input placeholder="请输入" v-model="form.userName"></el-input>
                </el-form-item>
                <el-form-item label="公司名称">
                    <el-input placeholder="请输入" v-model="form.company"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')" class="btnSave">创建</el-button>
                    <el-button @click="resetForm" class="btnReset">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import md5 from 'js-md5'
export default {
  name:'NewSubaccount',
  

  data(){
      //匹配用户id规则
      var validateUserIdFun = (rule,value,callback) => {
          if(value === ''){
              callback(new Error('请输入子账户名称'));
          }else if(!/^[0-9a-zA-Z]+$/.test(value)){
              callback(new Error('只能输入字母和数字'));
          }else{
              callback()
          }
      }
      //匹配密码规则
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(!/(?!^(\d+|[a-zA-Z]+|[%&',;=?$\x22]+)$)^[\s\S]{8,20}$/.test(value)){
            callback(new Error('输入的密码至少包括字母数字特殊字符中任意2种，且至少为8位'));
        }else{
            callback()
        }
      };
      return {
        form :{
            userId:'',
            password:'',
            userName:'',
            company:'',
            labelPosition:'right',
            checked:true,
            invalidUserId: false,
        },
        //配置表单匹配规则
        rules:{
            userId:[{
                required:true,
                validator: validateUserIdFun,
                trigger:'blur'
            }],
            password:[{
                required:true,
                validator: validatePass,
                trigger: 'blur'
            }]
        }
      }
  },
//   mounted(){
// this.userId = '';
//   },
//   updated(){
// this.userId = '';
//   },
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
          var password = this.getMD5(_this.form.password)
          //密码为空时保存失败
        if(this.form.password.match(/^[ ]+$/)){
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
        var url = 'user/subaccount/add'+'?date='+new Date().getTime();
        this.$refs[formName].validate((valid) => {
            if (valid) {
            //设置请求路径
            // 发送请求:将数据返回到一个回到函数中
            // 并且响应成功以后会执行then方法中的回调函数
            this.$http.post(url, qs.stringify(params), {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                  'X-Access-Token': sessionStorage.getItem('accessToken')
                }
              })
              .then(function (response) {
                if (0 == response.data.returnCode) {
                //   sessionStorage.setItem('userId', _this.form.username);
                //   sessionStorage.setItem('userPassword', _this.form.password);
                //   sessionStorage.setItem('userName', _this.form.username);
                //   sessionStorage.setItem('company', _this.form.password);
                   _this.$message({
                    message: response.data.message || '恭喜,创建成功!',
                    type: 'success'
                  });
                  _this.$router.push({
                    path:'/peopleCenter/account'
                  });
                } else {
                  _this.$message({
                    message: response.data.message || '抱歉，创建失败!',
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
        })
      },
      resetForm() {
        this.$router.push({
          path:'/peopleCenter/account'
        })
      },
      checkUserId(){
          var _this = this;
          if(!this.form.userId||!/^[0-9a-zA-Z]+$/.test(this.form.userId)){
              return;
          }
          this.$http.get('user/checkAccount?account='+this.form.userId,{}).then(function(res){
             if (0 == res.data.returnCode) {
              _this.$message({
                message: res.data.message || '恭喜你，该账号没有使用过',
                type: 'success'
              });
            } else if(1011 == res.data.returnCode){
                _this.$message.error('会话已过期，请重新登录！');
                _this.$router.push(
                    {path:'/login'}
                )
            } else {
              _this.$message({
                message: res.data.message || '抱歉，该账号已被使用',
                type: 'warning'
              });
            } 
          }).catch(function (error) {
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


