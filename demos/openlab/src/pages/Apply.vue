<template>
  <div class="page apply-page">
    <h2 for="">预约申请</h2>
    <el-row>
      <el-col :span="20" :offset="2" class="form_wrapper">
        <div class="source-bg" :style="bg"></div>
        <el-form ref="submit_form" :model="submit_form" :rules="rules" label-width="100px">
          <el-form-item class="form-title">
          </el-form-item>
          <el-form-item label="申请类型" required>
            <el-col :span="11">
              <el-form-item prop="dictId">
                <el-select :disabled="isQueryJust" v-model="submit_form.dictId" placeholder="产品类型" @change="get_product_list">
                  <el-option :key="-1" label="请选择" value="">
                  </el-option>
                  <el-option v-for="item in product_category_data" :key="item.id" :label="item.dictName" :value="item.dictId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1">-</el-col>
            <el-col :span="11">
              <el-form-item prop="product_id">
                <el-select :disabled="isQueryJust" v-model="submit_form.product_id" placeholder="产品名称" @change="get_product_code">
                  <el-option :key="0" label="请选择" value="">
                  </el-option>
                  <el-option v-for="item of product_list" :key="item.productId" :label="item.productName" :value="item.productId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
          
          <div v-if="submit_form.isDesktop">
            <el-col class="apply-form">

              <el-form-item label="操作系统" required class="center" v-for="(domain,index) in submit_form.domains" :key="index">
               
                <el-col :span="11" :offset="1" class="apply-col">
                  <el-form-item :prop="'domains.'+index+'.os'" :rules="{required:true,trigger:'blur，change',validator:validateOs}">
                    <el-select :disabled="isQueryJust" v-model="domain.os" placeholder="请选择" @change="change">
                    <el-option :key="0" label="请选择" value="">
                    </el-option>
                   <el-option v-for="item of osList" :key="item.osId" :label="item.osName" :value="item.osName">
                    </el-option>



                   <!-- <el-option label="win7" value="win7"></el-option>
                    <el-option label="win10" value="win10"></el-option>-->
                  </el-select>
                  </el-form-item>
                </el-col>

                <el-col class="line" :span="1">-</el-col>
                <el-col :span="10">
                  <el-form-item :prop="'domains.'+index+'.amount'" :rules="{required:true,trigger:'blur,change',validator:validateAmount}">
                    <el-input :disabled="isQueryJust" type="text" v-model="domain.amount" placeholder="请输入操作系统数量"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2" class="btnGrounp">
                  <span>个</span>
                  <div class="apply-btn" @click.prevent="removeDomain(domain)" v-show="(submit_form.domains.length!==1) && (!isQueryJust)">
                    <i class="el-icon-delete"></i>
                  </div>
                </el-col>
              </el-form-item>
            </el-col>

            <el-form-item class="apply-add">
              <el-button @click="addDomain" icon="el-icon-plus" v-show="!isQueryJust" class="apply-addbtn">添加操作系统</el-button>
            </el-form-item>
          </div>

          <el-form-item label="预约时间" required>
            <el-col :span="11">
              <el-form-item prop="beginTime">
                <el-date-picker :disabled="isQueryJust" :editable="false" type="date" value-format="yyyy-MM-dd hh:mm:ss" :picker-options="pickerbeginTimeOptions"
                   v-model="submit_form.beginTime" @change="beginTime_change" style="width: 100%;">

                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1">-</el-col>
            <el-col :span="11">
              <el-form-item prop="endTime">
                <el-date-picker :disabled="isQueryJust&&!isRenewal" :editable="false" type="date" value-format="yyyy-MM-dd hh:mm:ss" :picker-options="pickerEndTimeOptions"
                   v-model="submit_form.endTime" style="width: 100%;">

                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="测试用途" required prop="purpose">
            <el-col :span="23">
              <el-input :disabled="isQueryJust" type="textarea" v-model="submit_form.purpose" placeholder="请输入" :rows=10 resize="none"></el-input>
            </el-col>
          </el-form-item>
          <div style="width: 400px;margin: 0 auto;padding: 40px 118px 50px">
            <el-button type="primary" :style="bgBtn" :class="{'submit-form-btn':isQueryJust&&!isRenewal}" @click="submitForm('submit_form')">提交
            </el-button>
            <el-button @click="onCancel" style="color: #0084ff;">返回</el-button>
          </div>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
var validateAmount;
var validateOs;
  export default {
    name: 'Apply',
    data() {
      var validateProduct = (rule, value, callback) => {
        if(value=='' && this.submit_form.dictId != '0') {
          callback(new Error('请选择产品名称!'));
        }else{
          callback()
        }
      };
      return {
        rules: {
          dictId: [{
            required: true,
            message: '请选择产品类型',
            trigger: 'blur,change'
          }, ],
          product_id: [
            {
              required: true,
              message: '请选择产品名称',
              trigger: 'change,blur',
              validator: validateProduct
            },
          ],
          beginTime: [{
            required: true,
            message: '请选择预约开始时间',
            trigger: 'blur'
          }, ],
          endTime: [{
            required: true,
            message: '请选择预约结束时间',
            trigger: 'blur'
          }, ],
          purpose: [{
            required: true,
            message: '请输入测试用途',
            trigger: 'blur,change'
          }, ],
          amount:[{
              required:true,
              message:'请输入操作系统个数',
              trigger: 'blur,change',
              validator:validateAmount
          },],
          os:[{
            required:true,
            trigger:'change',
            validator:validateOs
          }]
        },
        formInline:{},
        length:'',
        bg: {
          backgroundImage: 'url(' + require('../../static/images/support/bg.png') + ')'
        },
        bgBtn: {
          backgroundImage: 'url(' + require('../../static/images/product/Api_btn.png') + ')'
        },
        //根据申请id获取的产品信息数据
        product_ids_data_byapplyid: {},

        //产品类型数据
        product_category_data: [],

        //产品列表数据
        product_list: [],
        osList:[],
        
        submit_form: {
          appliId: "", //申请id
          queryType: "", //我的申请页面跳转过来保存访问类型,query:{type:'query'} 和query:{type:'modify'}分别表示查询和修改
          dictId: "",
          product_id: "",
          productCode:"",
          purpose: "",
          beginTime: "",
          endTime: "",
          domains:[{
          os:'',
          amount:'',
        }],
        },
        isShowOs:false,
        isShowAmount:false,
        isShowAmount1:false,
        isShowAmount2:false,
        // isShow:submit_form.domains.forEach((item,index)=>{
        //   if(index==0)return 
        // }),
        isQueryJust: true, //true：仅查看，false：所有控件内容可编辑
        isRenewal:false,
        pickerbeginTimeOptions: {
          disabledDate: (time) => {
            return (time.getTime() < Date.now() - 24 * 3600 * 1000) || (time.getTime() > Date.now() + 14 * 24 * 3600 * 1000);
          }
        },
        pickerEndTimeOptions: {
          disabledDate: (time) => {
            let beginDateT = this.submit_form.beginTime.replace(/-/g,"/");
            if (beginDateT) {
              return (time.getTime() < new Date(beginDateT).getTime()) || (time.getTime() > new Date(beginDateT).getTime() +
                30 * 24 * 3600 * 1000);
            }
          }
        },
      }
    },
    computed: {
      
    },
    mounted: function () { //钩子函数
      window.scrollTo(0, 0); //初始化页面在最顶部
      //this.get_product_category();
      //this.formProduct();//从产品页面跳转过来
      this.fromOtherPages(); //从不同页面跳转过来的入口函数
      this.getDesktopOs();
    },
    methods: {
      getDesktopOs() {
        let _this = this;
        var url = "reservation/deskos";
        this.$http.get(url, {
        }).then(function (resp) {
          if (0 == resp.data.returnCode) {
            var result = resp.data.data;
            _this.length = resp.data.data.length
            if(_this.submit_form.domains[0].os != ''){
              Array.prototype.remove = function(val) {
              for(var i=0; i<this.length; i++) {
                if(this[i] == val) {
                  this.splice(i, 1);
                  break;
                }
              }
            }
            result.remove(_this.submit_form.domains[0].os);
            }
            _this.osList = result.map(function(item,index){
              return {
                osId:item,
                osName:item
              }
            })
          } else {
            _this.$message('获取操作系统类型失败！');
          }
        }).catch(function (response) {});
      },
      validateOs(rule,value,callback){
        if(value==''){
          callback(new Error('请选择操作系统'))
        }else{
          callback()
        }
      },
      validateAmount(rule,value,callback){
        console.log(value)
        if(value==''){
          callback(new Error('请输入操作系统个数'));
        }else if(!(/^[0-9]*$/.test(value))){
          callback(new Error('操作系统数量必须全为数字'))
        }else if(value<1 ||value>20){
          callback(new Error('操作系统个数的范围必须在1~20之间'));
        }else{
          callback()
        }
      },
      change(){
        this.getDesktopOs()
      },
      get_product_code(){
        var _this = this;
        
         _this.submit_form.isDesktop =  _this.product_list.find((value, index, arr)=>{
            return value.productId == _this.submit_form.product_id;
          }).productCode=='CloudDesktop';
      },
      //处理不同页面跳转过来逻辑，通过路由区分
      fromOtherPages() {
        let _this = this;
        _this.isQueryJust = false;
        _this.get_product_category();
        if (_this.$route.query.categoryId) { //产品列表页面跳转过来的，带了产品类型categoryId和产品id
          _this.submit_form.dictId = _this.$route.query.categoryId;
          _this.get_product_list(); //通过产品类型id查询出改类型下所有产品
          // _this.submit_form.product_id = _this.$route.query.id; //默认改产品被选中
         
        } else if (_this.$route.query.applyid) { //从“我的申请”页面跳转过来，两个参数申请id和访问类型
          //query:{type:'query'} 和query:{type:'modify'}分别表示查询 修改
          _this.submit_form.appliId = _this.$route.query.applyid;
          _this.submit_form.queryType = _this.$route.query.type;
          // _this.submit_form.os = _this.$route.query.os;
          // _this.submit_form.amount = _this.$route.query.amount
          _this.submit_form.desktopScale = _this.$route.query.desktopScale
          _this.setQueryType();
          _this.get_ids_byapplyid();
        } else { //不带参数的跳转
          //暂无处理
        }
      },

      //设置访问类型变量
      setQueryType() {
        let _this = this;
        if (_this.submit_form.queryType == "query") {
          _this.isQueryJust = true;
        } else if (_this.submit_form.queryType == "modify") {
          _this.isQueryJust = false;
        } else if (_this.submit_form.queryType == "renewal") {
          _this.isRenewal = true;
          _this.isQueryJust = true;
          _this.pickerEndTimeOptions={
            disabledDate: (time) => {
              let beginDateT = _this.submit_form.beginTime;
              if (beginDateT) {
                return (time.getTime() < new Date().getTime()) || (time.getTime() > new Date().getTime() +
                  30 * 24 * 3600 * 1000);
              }
            }
          }

        }else{
          _this.isQueryJust = false;
        }
      },
      // 返回首页
      toHome: function () {
        this.$router.push('/home');
      },

      //根据申请id获取产品类型id和产品id
      get_ids_byapplyid() {
        var _this = this;
        _this.$http.get(
            "reservation/" + _this.submit_form.appliId+'?date='+new Date().getTime(), {
              headers: {
                'X-Access-Token': sessionStorage.getItem('accessToken')
              },
            })
          .then(function (response) {
            console.log(response)
            if (0 == response.data.returnCode) {
              _this.submit_form.product_ids_data_byapplyid = response.data.data;
              _this.submit_form.dictId = _this.submit_form.product_ids_data_byapplyid.productType;
              _this.submit_form.beginTime = _this.submit_form.product_ids_data_byapplyid.beginTime ;
              console.log( _this.submit_form.beginTime)
              _this.submit_form.endTime = _this.submit_form.product_ids_data_byapplyid.endTime;
              console.log( _this.submit_form.endTime)
              _this.submit_form.purpose = _this.submit_form.product_ids_data_byapplyid.purpose;
              _this.get_product_list();
              _this.submit_form.product_id = _this.submit_form.product_ids_data_byapplyid.productId==-1?'':_this.submit_form.product_ids_data_byapplyid.productId;
              _this.submit_form.domains = _this.submit_form.product_ids_data_byapplyid.desktopScale;
              // _this.submit_form.id =  _this.submit_form.product_ids_data_byapplyid.id
            } else {
              _this.$message({
                message: '抱歉，连接数据失败!'
              });
            }
          })
          .catch(function (error) {
            _this.$message({
              message: '抱歉，连接数据失败!'
            });
          });
      },

      //产品类型
      get_product_category() {
        var _this = this;
        _this.$http.get('reservation/category', {
            //无参数
          })
          .then(function (response) {
            console.log(response)
            if (0 == response.data.returnCode) {
              _this.product_category_data = response.data.data;
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
        _this.submit_form.product_id = "";
        if(_this.submit_form.dictId != 3){
          _this.submit_form.isDesktop = false
        }
        _this.$http.get(
            "reservation/products?category=" + _this.submit_form.dictId, {})
          .then(function (response) {
            console.log(response)
            if (0 == response.data.returnCode) {
              _this.product_list = response.data.data;
              if(_this.$route.query.id)
              _this.submit_form.product_id = +_this.$route.query.id; 
              _this.get_product_code();
            } else {
              _this.$message({
                message: '抱歉，获取产品列表失败!'
              });
            }
          })
          .catch(function (error) {
            // _this.$message({
            //   message: '抱歉，获取产品列表失败!'
            // });
          });
      },
      beginTime_change() {
        this.submit_form.endTime = "";
      },
      //提交申请
      // submit() {
      //   let _this = this;
      //   let _beginTime = _this.submit_form.beginTime.substr(0,10)+' 00:00:00';
      //   let _endTime = _this.submit_form.endTime.substr(0,10)+' 23:59:59';
        
      //   //设置请求路径
      //   // 发送请求:将数据返回到一个回到函数中
      //   // 并且响应成功以后会执行then方法中的回调函数
      //   if (sessionStorage.getItem('accessToken')) {
      //     var qs = require('qs');
      //     debugger;
      //     if( _this.submit_form.isDesktop==true){
      //        _this.submit_form.domains = JSON.stringify(_this.submit_form.domains)
      //     }else{
      //       _this.submit_form.domains = ''
      //     }
      //     var url = "reservation/submit";
      //     if(_this.submit_form.queryType == "renewal"){
      //       url = "reservation/renewal";
      //     }
          
      //     var params = {
      //       productId: _this.submit_form.product_id,
      //       purpose: _this.submit_form.purpose,
      //       beginTime: _beginTime,
      //       endTime: _endTime,
      //       id: _this.submit_form.appliId,
      //       desktopScale:_this.submit_form.domains
      //     };
      //     _this.$http({
      //       url: url,
      //       method: 'post',
      //       headers: {
      //         'X-Access-Token': sessionStorage.getItem('accessToken'),
      //         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      //       },
      //       emulateJSON: true,
      //       data: qs.stringify(params),
      //     }).then(function (resp) {
      //       if (resp.data.returnCode) {
      //         _this.$message(resp.data.message || '提交成功，谢谢！');
      //         history.back();
      //       } else {
      //         _this.$message(resp.data.message);
      //       }
      //     });
      //   } else {
      //     _this.$message('请先登录账号！');
      //   }
      // },
      //取消按钮事件
      onCancel() {
        history.back();
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let _this = this;
            let _beginTime = _this.submit_form.beginTime.substr(0,10)+' 00:00:00';
            let _endTime = _this.submit_form.endTime.substr(0,10)+' 23:59:59';
            let dbDesktop = '';

            //设置请求路径
            // 发送请求:将数据返回到一个回到函数中
            // 并且响应成功以后会执行then方法中的回调函数
            if (sessionStorage.getItem('accessToken')) {
              var qs = require('qs');
              if( _this.submit_form.isDesktop==true){
                //_this.submit_form.domains = JSON.stringify(_this.submit_form.domains)
                dbDesktop =_this.submit_form.domains;
                dbDesktop = JSON.stringify(dbDesktop);
              }
              var url = "reservation/submit"+'?date='+new Date().getTime();
              if(_this.submit_form.queryType == "renewal"){
                url = "reservation/renewal"+'?date='+new Date().getTime();
              }
              var params = {
                productId: _this.submit_form.product_id,
                purpose: _this.submit_form.purpose,
                beginTime: _beginTime,
                endTime: _endTime,
                id: _this.submit_form.appliId,
                desktopScale:dbDesktop
              };
              _this.$http({
                url: url,
                method: 'post',
                headers: {
                  'X-Access-Token': sessionStorage.getItem('accessToken'),
                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                emulateJSON: true,
                data: qs.stringify(params),
              }).then(function (resp) {
                if (resp.data.returnCode) {
                  _this.$message(resp.data.message || '提交成功，谢谢！');
                  history.back();
                } else {
                  _this.$message(resp.data.message);
                }
              });
            } else {
              _this.$message('请先登录账号！');
            }
              } else {
                this.$message({
                  message: '校验失败!',
                  type: 'error'
                });
                return false;
              }
            });

          },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      apply() { //从云化实验室跳转到此处
        if (this.$route.params.id) {
          let _this = this;
          this.$http({
            url: "product/" + _this.$route.params.id+'?date='+new Date().getTime(),
            method: 'get'
          }).then(function (response) {
            if (0 == response.data.returnCode && response.data.data) {
              _this.form.type = response.data.data.category;
              _this.form.name = response.data.data.name;
            } else {
              _this.$message('获取产品详情失败！');
            }
          }).catch(function (response) {});
        }
      },
      addDomain() {
        if(this.submit_form.domains.length < this.length){
            this.submit_form.domains.push({
            os: '',
            amount:'',
          });
        }else{
          this.$message('没有可供选择的操作系统了!');
          return;
        }
      },
      removeDomain(item) {
        var index = this.submit_form.domains.indexOf(item)
        if (index !== -1) {
          this.submit_form.domains.splice(index, 1)
          this.getDesktopOs();
        }
      }
    },
    
    components: {}
  }

</script>
<style>
  .page.apply-page {
    height: 100%;
    padding: 0 2% 2%;
    margin-bottom: 50px;
  }

  .apply-page .el-menu--horizontal {
    border-bottom: solid 1px #5C6A7B;
  }

  .apply-page .el-row {
    height: 60%;
  }

  .apply-page .line {
    text-align: center;
  }

  .apply-page .el-col {
    height: 100%;
  }

  .apply-page .form_wrapper {
    padding-top: 50px;
    background: #fff;
    box-shadow: 0px 4px 4px #e5e5e5;
    position: relative;
    /* height: 600px; */
  }

  .source-bg {
    width: 456px;
    height: 190px;
    position: absolute;
    bottom: 0;
    right: 0;
    opacity: 1;
  }
  .showos {
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 78px;
  }
  .showamount {
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 315px;
  }
  .apply-page .el-form {
    width: 50%;
    margin-left: 25%;
    position: relative;
  }

  .apply-page .form-title {
    margin-bottom: 0;
  }

  .apply-page h2 {
    text-align: left;
    font-weight: normal;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 24px;
    margin-left: 8%;
  }

  .apply-page .form_wrapper input {
    border-radius: 0;
  }

  .apply-page .el-button {
    font-size: 14px;
    height: 36px;
    width: 140px;
    border: 1px solid #0084ff;
  }

  .apply-page .el-form-item {
    text-align: left;
  }

  .apply-page .el-select {
    width: 100%;
  }

  .apply-page .form-title .el-form-item__content {
    margin: 0 !important;
  }
  /* .el-form-item__content {
    position: static
  } */
  .apply-page .form_wrapper .el-menu--horizontal>.el-menu-item {
    float: right;
    line-height: 36px;
  }

  .apply-page .form_wrapper .register.el-menu--horizontal>.el-menu-item {
    padding-left: 10px;
  }

  .apply-page .el-menu--horizontal>.el-menu-item a,
  .apply-page .el-menu--horizontal>.el-menu-item a:hover {
    text-decoration: none;
    color: #0084FF;
  }

  .apply-page .fast-apply .el-menu--horizontal>.el-menu-item:hover {
    background: none;
    border: 0;
  }

  .apply-page .fast-apply .el-menu-item {
    background: none;
    padding: 0;
    border: 0;
  }

  .apply-page .copy-right {
    width: 80%;
    color: #fff;
    font-size: 14px;
    margin-left: 10%;
    margin-bottom: 20px;
    position: absolute;
    bottom: 0;
  }

  .apply-page .img-bg {
    background: url(../../static/images/product.png) center center no-repeat;
  }

  /* 提交按钮样式 */

  .submit-form-btn {
    display: none;
  }
  .btnGrounp{
    padding-left: 7px;
    position: relative;
  }
  .apply-btn {
    width: 25px;
    height:25px;
    margin-left: 5px;
    margin-top: 5px;
    line-height: 25px;
    font-size: 16px;
    background-color: #ff3040;
    text-align: center;
    color: #fff;
    cursor: pointer;
    position: absolute;
    right: -36%;
    top: 10%;
  }
  .apply-form {
    width: 100% !important;
    margin-left: 0!important;
    /* height: 80px !important; */
    /* padding-left: 4%; */
    /* display: inline; */
  }
  .apply-col {
    margin: 0;
  }
  .apply-add {
    width: 140px;
  }
  .apply-addbtn {
    width: 36px;
    height: 36px;
    color: #0084FF;
    display: block;
  }
</style>
