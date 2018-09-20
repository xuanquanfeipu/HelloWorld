<template>
  <div class="page profile-page">
      <el-row>
        <el-col :span="23" class="form_wrapper profileform" style="margin-left:1%">
        <div class="sectionBody">
          <div class="sectionblock">
              <div class="sectionhead-portrait">
                  <span class="imgbg" >
                    <img :src="ImgUrl" style="margin-right:10px">
                  </span>
                  <div class="two">
                    <div class="upfile">
                        <span>编辑</span>
                        <input type="file" id="file" @change="getFile($event)">
                    </div>
                  </div>
              </div>
          </div>
          <!-- 帖子主题 -->
          <div class="sectiontheme">
              <h4>{{userInfo.realName}}<span class="shutup" v-if="userInfo.topic == 1">账号已禁言</span><span v-if="userInfo.topic == 1" class="blueBtn" @click.stop="toPath('/support')">申诉</span></h4>
              <div class="userbody">
                  <span class="border"><i>{{userInfo.topicCount}}</i><br/>发帖</span>
                  <span><i>{{userInfo.topicPostCount}}</i><br/>回复</span>
              </div>
              <p><span class="distance">个性签名：</span><span>{{userInfo.signature}}</span><span class="blueBtn" @click="dialogFormVisible = true">编辑签名</span></p>
              <span class="distance">最后访问时间：</span>
              <span >{{userInfo.lastLoginTime}}</span>
              <span class="distance">上次发表时间：</span>
              <span >{{userInfo.lastTopicTime}}</span>                                   
          </div> 
                    
        </div>
        </el-col>     
        </el-row>
        <el-dialog title="编辑个性签名" :visible.sync="dialogFormVisible" center width="40%" style="height:500px!important;">
              <el-form :model="form">
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.reason">
                  </el-input>
              </el-form>
              <div slot="footer" class="dialog-footer">
                  <el-button id="sure" type="primary" @click="signature()">确 定</el-button>
                  <el-button id="cancel" @click="dialogFormVisible = false">取 消</el-button>
              </div>
          </el-dialog>
      <el-row>
      <el-col :span="23" class="form_wrapper profileform" style="margin-top:20px;margin-left:1%">
        <div  class="form-title">个人信息</div>
        <el-button @click="edit">编辑</el-button>
        <div class="gap"></div>
        <el-form id="form" ref="form" :model="form"  label-width="90px">
         
         <el-form-item label="姓名：">
            <div v-text="form.name"></div>
          </el-form-item>
          <!-- <el-form-item label="姓名:" prop="name">
            <div v-text="form.name"></div>
          </el-form-item> -->
          <!-- <el-form-item label="状态" prop="statusCn">
            <div v-text="form.statusCn" :class="{'abnormal':'正常'!=form.statusCn}"></div>
          </el-form-item> -->
          <el-form-item label="手机号：">
            <div v-text="form.phone"></div>
          </el-form-item>
          <el-form-item label="邮箱：" >
            <div v-text="form.email"></div>
          </el-form-item>
          <el-form-item label="性别：">
            <div v-text="form.gender"></div>
          </el-form-item>
          <!-- <el-form-item label="地区：">
             <div v-text="form.areaValue"></div>
          </el-form-item>
          <el-form-item label="行业：">
             <div v-text="form.jobValue"></div>
          </el-form-item> -->
          <el-form-item label="公司名称：">
            <div v-text="form.company"></div>
          </el-form-item>
          <!-- <el-form-item label="职位：">
            <div v-text="form.position"></div>
          </el-form-item>
          <el-form-item label="工作年限：">
            <div v-text="form.workingLife"></div>
          </el-form-item>
          <el-form-item label="擅长语言：">
            <div v-text="form.langValue"></div>
            
          </el-form-item>
          <el-form-item label="关注领域：">
            <div v-text="form.domain"></div>
          </el-form-item> -->

        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'Profile',
    data() {

      var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else if (!/^1\d{10}$/.test(value)) {
          callback(new Error('请输入正确的手机号!'));
        } else {
          callback();
        }
      };
      var validateEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱地址'));
        } else if (!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)) {
          callback(new Error('请输入正确的邮箱地址!'));
        } else if (this.form.isError) {
          callback(new Error('该邮箱地址已被注册!'));
        } else {
          callback();
        }
      };

      return {
        userInfo:{},
        customid:sessionStorage.getItem('customerId'),
        file:'',
        ImgUrl:'../../static/images/forum/user.png',
        dialogFormVisible:false,
        formLabelWidth: '168px',
        form:{
              reason:""
          },
        bgBtn: {
          backgroundImage: 'url(' + require('../../static/images/product/Api_btn.png') + ')'
        },
        bbsform:{

        },
        form: {
          userId: '',
          userPassword: '',
          name: '',
          statusCn:'',
          phone: '',
          hasPhone: true,
          gender: '1',
          email: '',
          isError: false,
          areas: [{
            value: '1',
            label: '南京 雨花区'
          }, {
            value: '2',
            label: '深圳 南山区'
          }, {
            value: '3',
            label: '北京 朝阳区'
          }, {
            value: '4',
            label: '海南 三亚'
          }, {
            value: '5',
            label: '上海 浦东'
          }],
          areaValue: '',
          jobs: [{
            value: '1',
            label: 'IT技术'
          }, {
            value: '2',
            label: 'HR人事'
          }, {
            value: '3',
            label: '行政管理'
          }, {
            value: '4',
            label: '金融理财'
          }, {
            value: '5',
            label: '销售'
          }],
          jobValue: '',
          company: '',
          position: '',
          workingLife: '',
          languages: [{
            value: '1',
            label: 'Java'
          }, {
            value: '2',
            label: 'C'
          }, {
            value: '3',
            label: 'C++'
          }, {
            value: '4',
            label: 'Python'
          }, {
            value: '5',
            label: 'JavaScript'
          }],
          langValue: '',
          domain:'',
          concernField: [{
              name: '云计算',
              domain: false
            },
            {
              name: '物联网',
              domain: false
            },
            {
              name: '大数据',
              domain: false
            },
            {
              name: '人工智能',
              domain: false
            }
          ]

        }, //form end
       
      }


    },
    mounted: function () { //钩子函数
      this.getUserInfo();
      this.getBBSUser();
      this.getUserImg();
    },
    methods: {
       toPath(url,params){
        this.$router.push({
            path:url,
            query:params
        });
    },
      signature(){
        var _this = this;
        var param ={
            signature:this.form.reason
        }
         var qs = require('qs')
        this.$http.post("bbsuser/signature",qs.stringify(param),{
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken'),
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(function(res){
            // console.log(res)
            if(0 == res.data.returnCode){
                console.log(res)
                _this.$message.success('更新成功！');
                _this.dialogFormVisible = false;
                _this.getBBSUser();
            }else if(1011 == res.data.returnCode){
                _this.$message.error('会话已过期，请重新登录！');
                _this.$router.push({
                    path:'/login'
                })
            }else {
                _this.$message.error('更新失败！');
            }
        })
      },
      getFile(){
          this.file = event.target.files;
            console.log(this.file);
             var that = this;
            var reader = new FileReader();
            reader.readAsDataURL(this.file[0]);
            reader.onload = function(){
                 console.log(this.result);
                that.ImgUrl = this.result;
            }

            this.upload();
            // this.getImg()
      },
      upload(){
         var _this = this;
            var url = 'bbsuser/avatar';
            let formData = new FormData();
            formData.append("logoFile", this.file[0]);
            this.$http.post(url,formData,{
                headers: {
                'X-Access-Token': sessionStorage.getItem('accessToken'),
                'Content-Type': 'multipart/form-data'
                }
            }).then(function(res){
                if(0 == res.data.returnCode){
                    console.log(res)
                    _this.$message.success('更新成功！');
                }else if(1011 == res.data.returnCode){
                    _this.$message.error('会话已过期，请重新登录！');
                    _this.$router.push({
                        path:'/login'
                    })
                }else {
                    _this.$message.error('查询失败！');
                }
            })
      },
      getUserImg(){
        if(this.customid){
          this.ImgUrl = this.GLOBAL.BASE_URL.substring(0,26)+'isvportal/bbsuser/avatar/'+this.customid;
        }else{
          this.ImgUrl = '../../static/images/forum/user.png';
        }
          
      },
      getBBSUser(){
          var _this = this;
        this.$http({
            url:'/bbsuser'+'?date='+new Date().getTime(),
            method:'get',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken')
            }
        }).then(function(res){
            if(0 == res.data.returnCode){
              var result = res.data.data;
              _this.userInfo = Object.assign({},result,result.info);
              _this.form.reason = _this.userInfo.signature;
              console.log(_this.form.reason);
            }else if(1011 == res.data.returnCode){
                    _this.$message.error('会话已过期，请重新登录！');
                    _this.$router.push(
                        {path:'/login'}
                )
            }
        })
      },
      checkEmail() {
        var _this = this;
        if (!_this.form.email || !/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(_this.form.email)) {
          _this.$message({
            message: '账号不能为空!',
            type: 'warning'
          });
          return;
        }
      },
      getUserInfo: function () {

        var _this = this;
        _this.form.phone = _this.$route.query.phone;
        _this.form.email = _this.$route.query.email;
        _this.form.userId = _this.$route.query.userId;
        //设置请求路径
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        this.$http({
          url: 'user/userinfo'+'?date='+new Date().getTime(),
          method: 'get',
          headers: {
            'X-Access-Token': sessionStorage.getItem('accessToken')
          },
          data: {}
        }).then(function (resp) {
          if (resp.data.returnCode == 0) {
            var positions = ['管理','技术','市场','其他'];
            var workYears = ['1-5年','6-10年','10年以上'];
            var languages = [{
            value: '1',
            label: 'Java'
          }, {
            value: '2',
            label: 'C'
          }, {
            value: '3',
            label: 'C++'
          }, {
            value: '4',
            label: 'Python'
          }, {
            value: '5',
            label: 'JavaScript'
          },{
            value: '',
            label: '无'
          }];
          var areas= [{
            value: '1',
            label: '南京 雨花区'
          }, {
            value: '2',
            label: '深圳 南山区'
          }, {
            value: '3',
            label: '北京 朝阳区'
          }, {
            value: '4',
            label: '海南 三亚'
          }, {
            value: '5',
            label: '上海 浦东'
          }];

          var jobs=[{
            value: '1',
            label: 'IT技术'
          }, {
            value: '2',
            label: 'HR人事'
          }, {
            value: '3',
            label: '行政管理'
          }, {
            value: '4',
            label: '金融理财'
          }, {
            value: '5',
            label: '销售'
          }];

            var data = resp.data.data;
            _this.form.userId = data.userId;
            _this.form.name = data.userName;
            _this.form.statusCn = data.statusCn;
            _this.form.userPassword = data.userPassword;
            _this.form.phone = data.phone;
            _this.form.hasPhone = data.phone ? true : false
            _this.form.email = data.email;
            _this.form.gender = data.sex== null? '':data.sex == 0?'男':'女';
            _this.form.company = data.company;
            var concernField = ['云计算','物联网','大数据','人工智能'];

            // var concernField = [{
            //     name: '云计算',
            //     domain: true
            //   },
            //   {
            //     name: '物联网',
            //     domain: true
            //   },
            //   {
            //     name: '大数据',
            //     domain: true
            //   },
            //   {
            //     name: '人工智能',
            //     domain: true
            //   }
            // ];
            
            // _this.form.concernField =[];
            for (var i = 0; i < fileds.length; i++) {
              // _this.form.concernField.push(concernField[fileds[i]-1]);
              _this.form.domain+='、'+concernField[fileds[i] - 1];
            }
            _this.form.domain = _this.form.domain.substring(1);
            //  _this.form = response.data.data;
          } else if (resp.data.returnCode == 1011) {
            _this.$message({
              message: '会话失效，请重新登录!',
              type: 'error'
            });
            _this.$router.push('/login')
          }
        }).catch(function (error) {
          //  _this.$message.error(  '查询失败！ ');
        });
      },
      edit(){
         this.$router.push({
          path: '/profileedit'         
        });
      },
      onSave(formName) {
        var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var qs = require('qs');
            var params = {
              "codeLanguage": _this.form.langValue,
              "company": _this.form.company,
              "sex": +_this.form.gender,
              "concernField": _this.form.concernField.map((currentValue, index, array) => {
                return {
                  domain: currentValue.domain,
                  index: index + 1
                }
              }).filter((currentValue, index, array) => {
                return currentValue.domain;
              }).map((currentValue, index, array) => {
                return currentValue.index;
              }).join(';'),

              "email": _this.form.email,
              "nickname": _this.form.name,
              "phone": _this.form.phone,
              "position": +_this.form.position,
              "profession": _this.form.jobValue,
              "realName": _this.form.name,
              "region": _this.form.areaValue,
              "userId": _this.form.userId,
              "userName": _this.form.name,
              "workYears": +_this.form.workingLife
            };
            //设置请求路径
            // 发送请求:将数据返回到一个回到函数中
            // 并且响应成功以后会执行then方法中的回调函数
            _this.$http({
                url: 'user/update',
                method: 'post',
                headers: {
                  'X-Access-Token': sessionStorage.getItem('accessToken'),
                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                data: qs.stringify(params)
              })
              .then(function (response) {
                if (0 == response.data.returnCode) {
                  _this.$message({
                    message: response.data.message || '提交成功！',
                    type: 'success'
                  });
                  // if (!sessionStorage.getItem('username'))
                  //   _this.$router.push('/login')
                  if (!sessionStorage.getItem('accessToken')) {
                    _this.login();

                  }
                } else {
                  _this.$message({
                    message: response.data.message || '提交失败！',
                    type: 'error'
                  });
                }
              })
              .catch(function (error) {
                // _this.$message({
                //   message: '会话失效，请重新登录!',
                //   type: 'error'
                // });
              });
          }
        });
      },
      onCancel() {
        history.back();
      },
      login() {
        var _this = this;
        //设置请求路径
        var url = "auth";
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        var params = {
          username: sessionStorage.getItem('username'),
          password: sessionStorage.getItem('password')
        };
        var qs = require('qs');
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
              accessToken = data.accessToken;
              sessionStorage.setItem('userId', userId);
              sessionStorage.setItem('accessToken', accessToken);
              var location = accessToken ? '/' : '/login';
              _this.$router.push(location)
            } else {
              _this.$message.error(response.data.message || '登录失败！');
            }
          }).catch(function (error) {});

      }
    },
    components: {}
  }

</script>
<style scoped>
.sectionBody {
    width: 100%;
    overflow: hidden;
   
}
.sectionBody .sectionblock {
    width: 6%;
    float: left;
    margin-right: 3%;
    padding-top: 10px;
    overflow: hidden;
}

.sectionblock img {
    position: absolute;
    top: 32px;
    left: 50px;
    width: 80px;
    height: 80px;
}
.sectionhead-portrait .two {
    position: absolute;
    top: 120px;
}
.upfile {
    margin-top: 108px;
}
.upfile span {
    display: block;
    width: 60px;
    height: 30px;
    background-color: #66b1ff;
    color:  #fff;
    position: absolute;
    top:0;
    left: 0%;
    cursor: pointer;
    font: 12px/30px 'microsoft yahei';
    text-align: center;
    /* border-radius: 10% */
}
.shutup{
  background-color:#fb3232;
  color:  #fff;
  margin-left: 10px;
  font:12px/15px 'microsoft yahei'; 
  padding: 3px 5px;
}
.blueBtn{
    background-color: #66b1ff;
    color:  #fff;
    font:12px/15px 'microsoft yahei'; 
    padding: 5px;
    margin-left: 10px;
    cursor: pointer;
}
.upfile input {
    width: 96px;
    height: 38px;
    position: absolute;
    top: 0;
    left: 0%;
    opacity: 0;
    cursor: pointer;
}
.sectiontheme {
    width: 53%;
    margin-left: 2%;
    float: left;
    margin:0;
    text-align: left;
    position: relative;
}
.sectiontheme h4 {
    font:14px 'microsoft yahei';
    text-align: left;
    margin: 0;
    margin-left: 10px;
}

.sectiontheme p {
    font:15px/20px 'microsoft yahei';
    margin-top:6px;
    text-align:left;
    margin-bottom: 6px;
}
.sectiontheme span{
   font:13px 'microsoft yahei';
}
.sectiontheme span.distance {
    font:14px/20px 'microsoft yahei';
}.sectionBody .sectiontheme .userbody {
    width: 100%;
    margin:0 0;
    overflow: hidden;
    display: flex;
    justify-content: left;
    margin-bottom: 20px;
    margin-top: 10px;
}

.sectionBody .sectiontheme .userbody span  {
    display: block;
    width: 40px;
    font:14px 'microsoft yahei';
    text-align:center;
    float: left;
}
.sectionBody .sectiontheme .userbody span.border {
    border-right: 1px solid #eee;
}
.sectionBody .sectiontheme .userbody span i {
    font-style: normal;
    color: #2D97FF;
}
.page.profile-page dd {
        margin-left: 0;
  }
  .page.profile-page ul li{
    list-style: none;
  }
  .page.profile-page ul li .theme_wrapper
  {
    text-align: left;
  }
  .page.profile-page ul li .theme
  {
    padding-left: 0;
  }
  .page.profile-page  ul.nickname li,
  .page.profile-page  ul.grade li,
  .page.profile-page  ul.theme li {
    float: left;
  }
  .page.profile-page  ul.theme li{
    margin-right: 20px;
  }
  .page.profile-page  ul.theme_wrapper li span{
    font-family: 'Microsoft YaHei';
    font-size: 14px;
    font-weight: normal;
    font-weight: normal;
  }
  .page.profile-page  ul.theme li label{
    margin-right: 0;
  }
  .page.profile-page .line {
    width: 1px;
    height: 14px;
    background-color: #e5e5e5;
    position: relative;
    top: 6px;
  }
  .page.profile-page .level-line{
    width: 1px;
    height: 50px;
    background-color: #e5e5e5;
    position: relative;
    top: 14px;
  }
  .page.profile-page  ul.grade li{
    margin-right: 20px;
    text-align: left;
    font-family: 'Microsoft YaHei';
    font-size: 14px;
    font-weight: normal;
  }
  .page.profile-page  ul.nickname li:nth-child(2) label
  {
    font-size: 12px;
    font-weight: normal;
    line-height:18px;
    letter-spacing: 0px;
    /* background:lawngreen; */
  }
  .page.profile-page  ul.nickname .abnormal{
    color: #ffffff;
    background: red;

  }
  .page.profile-page  a.logo-edit,
  .page.profile-page  ul.nickname li a,
  .page.profile-page ul li .sign + a{
    font-family: 'Microsoft YaHei';
    text-decoration: none;
    font-size: 12px;
    font-weight: normal;
  }

.page.profile-page  .form-title{
  width: 56px;
	height: 12px;
	font-family: 'Microsoft YaHei';
	font-size: 14px;
	font-weight: bold;
	font-stretch: normal;
	line-height: 0px;
	letter-spacing: 0px;
	color: #666666;
  margin-bottom: 20px;
}

.page.profile-page .gap {
	height: 1px;
	background-color: #e5e5e5;
}
  
.page.profile-page .form_wrapper{
  /* margin-top: 2%; */
  /* width: 1200px;	 */
	background-color: #ffffff;
	box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.1);
	border: solid 1px #e5e5e5;
}
.page.profile-page .form_wrapper.bbsform{
  height: 230px;
  margin-bottom: 10px;
   padding-top: 0%;
}
.page.profile-page .form_wrapper.pfrofileform{
  height: 556px;
}
  .page.profile-page .el-table th>.cell {
    text-align: left;
  }

  .profile-page .el-menu--horizontal {
    border-bottom: solid 1px #5C6A7B;
  }


  .profile-page .form_wrapper {
    padding: 5%;
    padding-top: 2%;
    background: #fff;
    position: relative;
  }

  .profile-page h2 {
    text-align: left;
    font-weight: normal;
    margin-bottom: 34px;
    font-size: 24px;
    margin-left: 8%;
  }

  .profile-page .form_wrapper input {
    border-radius: 0;
  }

  .profile-page .el-button {
    background: #66b1ff;
    border-color: #66b1ff;
    width: 80px;
    font-size: 14px;
    position: absolute;
    right: 50px;
    top: 20px;
    color: #fff;
  }

  .profile-page .el-form-item {
    text-align: left;
    margin-bottom: 0;
  }

  .profile-page .el-select {
    width: 100%;
  }



  .profile-page .form_wrapper .register.el-menu--horizontal>.el-menu-item {
    padding-left: 10px;
  }

  .profile-page .el-menu--horizontal>.el-menu-item a,
  .profile-page .el-menu--horizontal>.el-menu-item a:hover {
    text-decoration: none;
    color: #0084FF;
  }

  .profile-page .fast-profile .el-menu--horizontal>.el-menu-item:hover {
    background: none;
    border: 0;
  }

  .profile-page .fast-profile .el-menu-item {
    background: none;
    padding: 0;
    border: 0;
  }
  .profile-page .el-row {
    height: 60%;
  }

  .profile-page .el-col {
    height: 100%;
  }
    .profile-page .form-title .el-form-item__content {
    margin: 0 !important;
  }

  .profile-page .form_wrapper .el-menu--horizontal>.el-menu-item {
    float: right;
    line-height: 36px;
  }
  .profile-page .copy-right {
    width: 80%;
    color: #fff;
    font-size: 14px;
    margin-left: 10%;
    margin-bottom: 20px;
    position: absolute;
    bottom: 0;
  }
  .profile-page .img-bg {
    background: url(../../static/images/product.png) center center no-repeat;
  }
  .el-dialog__footer {
    height: 50px;
  }
  .el-dialog__footer .dialog-footer{
    height: 40px;
    /* background-color: royalblue; */
  }
  
 .el-dialog__footer .dialog-footer .el-button[data-v-620a395b] {
    position: absolute;
    top: 72%;
    left: 20%;
    /* background-color: red; */
}
.el-dialog__footer .dialog-footer #sure{
    position: absolute;
    top: 72%;
    left:37%;
    /* background-color: red; */
}
.el-dialog__footer .dialog-footer #cancel{
    position: absolute;
    top: 72%;
    left:50%;
    color:  #0084FF;
    background-color: #fff;
    border: 1px solid #0084ff;
}
/* .page.profile-page label,
.page.profile-page .el-form-item__label{
  font-family: 'MicrosoftYaHei';
	font-size: 14px;
	font-weight: bold;
	font-stretch: normal;
  color: #666666;
  margin-right: 20px;
  padding-right: 0;
  text-align: left;
} */
#form .el-form-item__label {
    text-align: left!important;
    float: left;
    font-size: 14px;
    font-weight: bold;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    /* -webkit-box-sizing: border-box; */
    box-sizing: border-box;
}
</style>




