<template>
  <div class="page">
    <!-- 开发咨询title-->
    <div class="font-big deve-source-title">开发咨询</div>
    <!--  开发咨询title结束-->

    <!--form表单开始-->
    <div class="deve-source-content">
      <div class="deve-source-bg" :style="bg"></div>
      <el-form :model="supportForm" :rules="rules" ref="supportForm" :label-position="labelPosition" label-width="100px"
        class="deve-support-form">

        <el-form-item label="咨询类型" prop="type" required>
          <el-select :disabled="isQueryJust" v-model="supportForm.type" placeholder="请选择">
            <el-option :key="0" label="请选择" value="">
            </el-option>
            <el-option v-for="item in typeList" :key="item.dictId" :label="item.dictName" :value="item.dictId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品">
          <el-col :span="11">
            <el-form-item prop="categoryId">
              <el-select :disabled="isQueryJust" v-model="supportForm.categoryId" placeholder="产品类型" @change="get_product_list">
                <el-option :key="0" disabled  label="请选择" value="">
                </el-option>
                <el-option v-for="item in product_category_data" :key="item.dictId" :label="item.dictName" :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="productId">
              <el-select :disabled="isQueryJust" v-model="supportForm.productId" placeholder="产品名称">
                <el-option :key="0" disabled label="请选择" value="">
                </el-option>
                <el-option v-for="item in product_list" :key="item.productId" :label="item.productName" :value="item.productId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="故障类型" prop="bugType" v-if="supportForm.productId && supportForm.type =='2' && supportForm.userType == 3 ">
          <el-select :disabled="isQueryJust" v-model="supportForm.bugType" placeholder="请选择">
            <el-option :key="0" label="请选择" value="">
            </el-option>
            <el-option v-for="item in bugTypeList" :key="item.bugTypeId" :label="item.bugTypeName" :value="item.bugTypeName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="故障级别" prop="bugLevel" v-if="supportForm.productId && supportForm.type =='2' && supportForm.userType == 3  ">
          <el-select :disabled="isQueryJust" v-model="supportForm.bugLevel" placeholder="请选择">
            <el-option :key="0" label="请选择" value="">
            </el-option>
            <el-option v-for="item in bugLevelList" :key="item.bugLevelId" :label="item.bugLevelName" :value="item.bugLevelName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发现频度" prop="bugFrequency" v-if="supportForm.productId && supportForm.type =='2' && supportForm.userType == 3  ">
          <el-select :disabled="isQueryJust" v-model="supportForm.bugFrequency" placeholder="请选择">
            <el-option :key="0" label="请选择" value="">
            </el-option>
            <el-option v-for="item in bugFrequencyList" :key="item.bugFrequencyId" :label="item.bugFrequencyName" :value="item.bugFrequencyName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="概要" prop="general" >
          <el-input :disabled="isQueryJust" v-model="supportForm.general" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desc" required>
          <el-input :disabled="isQueryJust" type="textarea" :autosize="{ minRows: 12}" v-model="supportForm.desc"></el-input>
        </el-form-item>

        <el-form-item label="处理状态" prop="statusDesc" v-if="supportForm.status==3 || supportForm.status==4 || supportForm.status==5">
          <el-input :disabled="true" v-model="supportForm.statusDesc" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="处理结果" prop="solveDesc" v-if="supportForm.status==3 || supportForm.status==4 || supportForm.status==5" >
          <el-input :disabled="true" v-model="supportForm.solveDesc" placeholder="请输入"></el-input>
        </el-form-item>

        <!--提交按钮开始-->
        <el-form-item>
          <el-button class="deve-button" :style="bgBtn" :class="{'submit-form-btn':isQueryJust}" size="medium" @click="submitForm('supportForm')">
            <a>提交</a>
          </el-button>
           <el-button @click="onCancel" style="color: #0084ff;font-size: 14px;width: 140px;height: 36px;border: 1px solid #0084ff;">返回</el-button>
        </el-form-item>
        <!--提交按钮结束-->
      </el-form>
    </div>
    <!--form表单结束-->
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'Support',
    data() {
      var validateGeneral = (rule, value, callback) => {
        if (value&&value.trim() === '') {
          callback(new Error('请输入咨询概要'));
        } else {
          callback();
        }
      };

      return {
        queryType: "",
        isQueryJust: false, //true：仅查看，false：所有控件内容可编辑

        labelPosition: 'right',
        //产品类型数据
        product_category_data: [],

        //产品列表数据
        product_list: [],

        typeList: [],
        bugTypeList: [{
          bugTypeId: '1',
          bugTypeName: '功能(A类)'
        }, {
          bugTypeId: '2',
          bugTypeName: '稳定性(A类)'
        }, {
          bugTypeId: '3',
          bugTypeName: '可用性(B类)'
        }, {
          bugTypeId: '4',
          bugTypeName: '可生产性(B类)'
        }, {
          bugTypeId: '5',
          bugTypeName: '性能(C类)'
        }, {
          bugTypeId: '6',
          bugTypeName: '其他(D类)'
        }, {
          bugTypeId: '7',
          bugTypeName: '易用性(F类)'
        }, {
          bugTypeId: '8',
          bugTypeName: '安全性(G类)'
        }, {
          bugTypeId: '9',
          bugTypeName: '技术通知单（H类）'
        }],
        bugLevelList: [{
          bugLevelId: 'A',
          bugLevelName: 'A-致命'
        }, {
          bugLevelId: 'B',
          bugLevelName: 'B-严重'
        }, {
          bugLevelId: 'C',
          bugLevelName: 'C-一般'
        }, {
          bugLevelId: 'D',
          bugLevelName: 'D-轻微'
        }],
        bugFrequencyList: [{
          bugFrequencyId: '1',
          bugFrequencyName: '发生一次'
        }, {
          bugFrequencyId: '2',
          bugFrequencyName: '未知'
        }, {
          bugFrequencyId: '3',
          bugFrequencyName: '间歇性'
        }, {
          bugFrequencyId: '4',
          bugFrequencyName: '复现'
        }],
        supportForm: {
          categoryId: "",
          productId: "",
          product_id: "",
          type: '',
          bugType: '',
          bugLevel: '',
          bugFrequency: '',
          general: '',
          desc: '',
          status:"",
          statusDesc:"",
          solveDesc:'',
          userType:JSON.parse(sessionStorage.getItem('userType'))
        },
        rules: {
          // dictId: [{
          //   required: true,
          //   message: '请选择产品类型',
          //   trigger: 'change'
          // }, ],
          // productId: [{
          //   required: true,
          //   message: '请选择产品名称',
          //   trigger: 'change'
          // }, ],
          type: [{
            required: true,
            message: '请选择咨询类型',
            trigger: 'change'
          }],
          desc: [{
            required: true,
            message: '请输入咨询描述',
            trigger: 'blur,change'
          },{
            min: 1,
            max: 1024,
            message: '咨询描述长度不能超过1024个字符',
            trigger: 'blur,change'
          }],
           general: [{
            required: true,
            message: '请输入咨询概要',
            trigger: 'blur,change'
          }],
          // general: [{
          //   validator: validateGeneral,
          //   trigger: 'blur,change'
          // }]
        },
        bg: {
          backgroundImage: 'url(' + require('../../static/images/support/bg.png') + ')'
        },
        bgBtn: {
          backgroundImage: 'url(' + require('../../static/images/product/Api_btn.png') + ')'
        }
      }
    },
    watch: {
      '$route'(to, from) {
          let _this = this;
        if (to.name === 'Support'&&this.$route.query.type=='query') {
          _this.isQueryJust = true;
        }else if(to.name === 'Support'&&this.$route.query.type=='modify'){
          _this.isQueryJust = false;
        }
        else{
          _this.isQueryJust = false;
          _this.$refs['supportForm'].resetFields();
          // console.log(_this.supportForm);
          _this.supportForm.status = '';
          _this.supportForm.product_id = '';
        }
      }
    },
    mounted: function () {
      // this.get_product_category();
      this.getQueryString();
      this.getSupportType();
      window.scrollTo(0, 0); //初始化页面在最顶部
    },
    methods: {
       //设置访问类型变量
      setQueryType() {
        let _this = this;
        if (_this.queryType == "query") {
          // _this.getSupportById(_this.$route.query.id);
          _this.isQueryJust = true;
        } else if (_this.queryType == "modify") {
          _this.isQueryJust = false;
        } else {
          _this.isQueryJust = false;
        }
      },
      getQueryString(){
         let _this = this;
         
          _this.get_product_category();

        if(_this.$route.query&&_this.$route.query.type){
         _this.queryType =  _this.$route.query.type;
          // if (_this.$route.query.categoryId) { //产品列表页面跳转过来的，带了产品类型categoryId和产品id
            // _this.supportForm.categoryId = _this.$route.query.categoryId;
            // _this.get_product_list(); //通过产品类型id查询出改类型下所有产品
            // _this.supportForm.productId = _this.$route.query.productId; //默认改产品被选中
          // } 
          // _this.supportForm.type = _this.$route.query.consultType;
          // _this.supportForm.desc= _this.$route.query.desc;
          // _this.supportForm.general = _this.$route.query.general;
          // _this.supportForm.bugType = _this.$route.query.bugType;
          // _this.supportForm.bugLevel= _this.$route.query.bugLevel;
          // _this.supportForm.bugFrequency= _this.$route.query.bugFrequency;

          _this.setQueryType();
          _this.getSupportById(_this.$route.query.id);

        }else{//不带参数的跳转
          //暂无处理
        }
        
      },
      getSupportById(id) {
        var _this = this;
        _this.$http.get(
            "support/" + id+'?date='+new Date().getTime(), {
              headers: {
                'X-Access-Token': sessionStorage.getItem('accessToken')
              },
            })
          .then(function (response) {
            console.log(response)
            if (0 == response.data.returnCode) {
              var states = ['待处理', '处理中', '待反馈', '正常结束', '异常结束'];
                // _this.get_product_category();
                // console.log(_this.product_category_data)
                _this.supportForm.categoryId = response.data.data.productType&&response.data.data.productType+'';
                _this.get_product_list(); //通过产品类型id查询出改类型下所有产品
                _this.supportForm.product_id = response.data.data.productId&&response.data.data.productId+'';
                _this.supportForm.status = response.data.data.status;
                _this.supportForm.statusDesc = response.data.data.type=='1'?states[+response.data.data.status-1]:response.data.data.ecStatus;
                _this.supportForm.solveDesc = response.data.data.solveDesc;
                _this.supportForm.type = response.data.data.type;
                _this.supportForm.desc= response.data.data.description;
                _this.supportForm.general = response.data.data.summary;
                _this.supportForm.bugType = response.data.data.ectype;
                _this.supportForm.bugLevel= response.data.data.eclevel;
                _this.supportForm.bugFrequency= response.data.data.frequency;

            } else {
              _this.$message({
                message: response.data.message || '抱歉，获取数据失败!'
              });
            }
          })
          .catch(function (error) {
            _this.$message({
              message: '抱歉，获取数据失败!'
            });
          });
      },
      getSupportType() {
        let _this = this;
        var url = "support/type"+'?date='+new Date().getTime();
        this.$http.get(url, {

        }).then(function (resp) {
          if (0 == resp.data.returnCode) {
            _this.typeList = resp.data.data;
          } else {
            _this.$message('获取咨询类型失败！');
          }
        }).catch(function (response) {});
      },
      //产品类型
      get_product_category() {
        var _this = this;
        _this.supportForm.categoryId = "";
        _this.$http.get('product/category'+'?date='+new Date().getTime(), {
            //无参数
          })
          .then(function (response) {
            if (0 == response.data.returnCode) {
              _this.product_category_data = response.data.data || [];
            } else {
              _this.$message({
                message: '抱歉，获取产品类型失败!'
              });
            }
          })
          .catch(function (error) {
            _this.$message({
              message: '抱歉，获取产品类型失败!'
            });
          });
      },

      //产品列表
      get_product_list() {
        var _this = this;
        _this.supportForm.product_id = "";
        _this.supportForm.productId = "";
        if (!_this.supportForm.categoryId) return;
        _this.$http.get(
            "product/listbytype?category=" + _this.supportForm.categoryId+'&date='+new Date().getTime(), {})
          .then(function (response) {
            if (0 == response.data.returnCode) {
              _this.product_list = response.data.data.map(function(e,i){
                return {
                  productId:e.productId+'',
                  productName:e.productName
                }
              });
              _this.supportForm.productId = _this.supportForm.product_id;
            } else {
              _this.$message({
                message: '抱歉，获取产品列表失败!'
              });
            }
          })
          .catch(function (error) {
            _this.$message({
              message: '抱歉，获取产品列表失败!'
            });
          });
      },
      submitForm(supportForm) {
        let _this = this;
        _this.$refs[supportForm].validate((valid) => {
          if (valid) {
            var qs = require('qs');
            var params = {
              type: _this.supportForm.type,
              description: _this.supportForm.desc,
              summary: _this.supportForm.general,
              productId: _this.supportForm.productId || '',
              ectype: _this.supportForm.bugType,
              eclevel: _this.supportForm.bugLevel,
              frequency: _this.supportForm.bugFrequency,
              // status:_this.supportForm.status,
              // solveDesc:_this.supportForm.solveDesc
            };
            if (sessionStorage.getItem('accessToken')) {
              var url = '';
              if(_this.$route.query&&_this.$route.query.type=='modify'){
                url = "support/update";
                params.id = _this.$route.query.id;
              }else{
                url = "support/submit"+'?date='+new Date().getTime();
              }
              _this.$http({
                url: url,
                method: 'post',
                headers: {
                  'X-Access-Token': sessionStorage.getItem('accessToken'),
                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                data: qs.stringify(params),
              }).then(function (resp) {
                if (0 == resp.data.returnCode) {
                  _this.$refs[supportForm].resetFields();
                  _this.$message(resp.data.message || '提交成功！');
                } else if(4 == sessionStorage.getItem('userType')){
                  _this.$message.error('您无权限使用此功能');
                } else if (1011 == resp.data.returnCode) {
                  _this.$message.error('会话已过期，请重新登录！');
                } else if (2 == resp.data.returnCode) {
                  _this.$message.error(resp.data.message || '校验失败！');
                } else {
                  _this.$message.error('提交失败！');
                }
              });
            } else {
              _this.$message('请先登录账号！');
            }
          } else {
            return false;
          }
        });
      },
      //取消按钮事件
      onCancel() {
        history.back();
      }
    }
  }

</script>

<style>
  .deve-source-title {
    width: 84%;
    margin: 20px 0 20px 8%;
    text-align: left;
    color: #333333;
  }

  .deve-source-content {
    width: 80%;
    /* height: 900px; */
    margin: 0 auto;
    padding: 24px;
    transition: .2s;
    border: 1px solid #e5e5e5;
    background-color: #ffffff;
    position: relative;
    box-shadow: 0px 4px 4px #e5e5e5;
  }

  .deve-source-bg {
    width: 456px;
    height: 190px;
    position: absolute;
    bottom: 0;
    right: 0;
    opacity: 1;
  }

  .deve-support-form {
    margin: 50px 258px 50px 254px;
  }

  .el-select {
    display: block;
  }

  .deve-button {
    height: 36px;
    width: 140px;
    color: #ffffff;
    padding:13px 20px;
  }

  .deve-button a {
    color: #ffffff;
  }

  .submit-form-btn {
    display: none;
  }
  
</style>
