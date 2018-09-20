<template>
  <div class="page profileedit-page">
    <h2 for="">个人资料</h2>
    <el-row>
      <el-col :span="20" :offset="2" class="form_wrapper">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item class="form-title">
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="form.phone" :disabled="form.hasPhone" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="form.gender" label='0'>男</el-radio>
            <el-radio v-model="form.gender" label='1'>女</el-radio>
          </el-form-item>
          <!-- <el-form-item label="地区">
            <el-input v-model="form.areaValue" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="行业">
            <el-select v-model="form.jobValue" placeholder="请选择">
              <el-option v-for="item in form.jobs" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="公司名称">
            <el-input v-model="form.company" placeholder="请输入"></el-input>
          </el-form-item>
          <!-- <el-form-item label="职位">
            <el-radio v-model="form.position" label='0'>管理</el-radio>
            <el-radio v-model="form.position" label='1'>技术</el-radio>
            <el-radio v-model="form.position" label='2'>市场</el-radio>
            <el-radio v-model="form.position" label='3'>其他</el-radio>
          </el-form-item>
          <el-form-item label="工作年限">
            <el-radio v-model="form.workingLife" label='0'>1-5年</el-radio>
            <el-radio v-model="form.workingLife" label='1'>6-10年</el-radio>
            <el-radio v-model="form.workingLife" label='2'>10年以上</el-radio>
          </el-form-item>
          <el-form-item label="擅长语言">
            <el-select v-model="form.langValue" placeholder="请选择">
              <el-option v-for="item in form.languages" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关注领域">
            <el-checkbox v-for="(item,index) in form.concernField" v-model="item.domain">{{item.name}}</el-checkbox>
          </el-form-item> -->

          <el-form-item style="margin-bottom: 0px;">
            <el-button type="primary" :style="bgBtn" @click="onSave('form')" style="margin-left: 40px;">保存</el-button>
            <el-button type="primary" @click="onCancel" style="color: #0084ff;background:transparent;border: 1px solid #0084ff;">取消</el-button>
          </el-form-item>

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

      var validateName = (rule,value,callback)=>{
        if(value.length<2 || value.length>20){
          callback(new Error('输入的字符长度应该在2-20之间'));
        }else if(value.match(/^[ ]+$/)){
          callback(new Error('输入的内容不能全部为空格'))
        }else{
          callback()
        }
      }

      return {
        bgBtn: {
          backgroundImage: 'url(' + require('../../static/images/product/Api_btn.png') + ')'
        },
        form: {
          userId: '',
          userPassword: '',
          name: '',
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
          position: '1',
          workingLife: '1',
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

        }, 
        rules: {
          name: [{
              required: true,
              message: '请输入姓名',
              trigger: 'blur'
            },
            {
              validator:validateName,
              trigger: 'blur'
            }
          ],
          phone: [{
              required: true,
              message: '请输入手机号码',
              trigger: 'blur'
            },
            {
              validator: validatePhone,
              trigger: 'blur'
            }
          ],
          email: [{
              required: true,
              message: '请输入邮箱',
              trigger: 'blur,change'
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
          ]
        }
      }


    },
    mounted: function () { //钩子函数
      this.getUserInfo();
    },
    methods: {
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
          console.log(resp)
          if (resp.data.returnCode == 0) {
            var data = resp.data.data;
            _this.form.userId = data.userId;
            _this.form.name = data.userName;
            _this.form.userPassword = data.userPassword;
            _this.form.phone = data.phone;
            _this.form.hasPhone = data.phone ? true : false
            _this.form.email = data.email;
            _this.form.gender = data.sex? data.sex+ '':'0';
            _this.form.areaValue = data.region;
            _this.form.jobValue = data.profession;
            _this.form.company = data.company;
            _this.form.position = data.position?data.position + '':'0';
            _this.form.workingLife = data.workYears?data.workYears + '':'0';
            _this.form.langValue = data.codeLanguage;

            var concernField = [{
                name: '云计算',
                domain: true
              },
              {
                name: '物联网',
                domain: true
              },
              {
                name: '大数据',
                domain: true
              },
              {
                name: '人工智能',
                domain: true
              }
            ];
            var fileds = data.concernField.split(";");
            // _this.form.concernField =[];
            for (var i = 0; i < fileds.length; i++) {
              // _this.form.concernField.push(concernField[fileds[i]-1]);
              _this.form.concernField[fileds[i] - 1].domain = true;
            }
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
                    _this.$router.push('/peopleCenter/profile')
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
        this.$router.push({
          path: '/peopleCenter/profile'         
        });
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
<style>


  .page.profileedit-page {
    height: auto;
    padding: 0 2% 2%;
  }

  .page.profileedit-page .el-table th>.cell {
    text-align: center;
  }

  .profileedit-page .el-menu--horizontal {
    border-bottom: solid 1px #5C6A7B;
  }

  .profileedit-page .el-row {
    height: 60%;
  }

  .profileedit-page .el-col {
    height: 100%;
  }

  .profileedit-page .form_wrapper {
    padding: 5%;
    padding-top: 2%;
    background: #fff;
  }

  .profileedit-page .el-form {
    width: 50%;
    margin-left: 25%;
  }

  .profileedit-page .form-title {
    margin-bottom: 0;
  }

  .profileedit-page h2 {
    text-align: left;
    font-weight: normal;
    margin-bottom: 34px;
    font-size: 24px;
    margin-left: 8%;
  }

  .profileedit-page .form_wrapper input {
    border-radius: 0;
  }

  .profileedit-page .el-button {
    background: #66b1ff;
    border-color: #66b1ff;
    width: 30%;
    font-size: 16px;
  }

  .profileedit-page .el-form-item {
    text-align: left;
  }

  .profileedit-page .el-select {
    width: 100%;
  }

  .profileedit-page .form-title .el-form-item__content {
    margin: 0 !important;
  }

  .profileedit-page .form_wrapper .el-menu--horizontal>.el-menu-item {
    float: right;
    line-height: 36px;
  }

  .profileedit-page .form_wrapper .register.el-menu--horizontal>.el-menu-item {
    padding-left: 10px;
  }

  .profileedit-page .el-menu--horizontal>.el-menu-item a,
  .profileedit-page .el-menu--horizontal>.el-menu-item a:hover {
    text-decoration: none;
    color: #0084FF;
  }

  .profileedit-page .fast-profile .el-menu--horizontal>.el-menu-item:hover {
    background: none;
    border: 0;
  }

  .profileedit-page .fast-profile .el-menu-item {
    background: none;
    padding: 0;
    border: 0;
  }

  .profileedit-page .copy-right {
    width: 80%;
    color: #fff;
    font-size: 14px;
    margin-left: 10%;
    margin-bottom: 20px;
    position: absolute;
    bottom: 0;
  }

  .profileedit-page .img-bg {
    background: url(../../static/images/product.png) center center no-repeat;
  }

</style>
