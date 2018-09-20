<template>
  <div class="page appliction-page">
    <el-row>
      <el-col :span="23" class="form_wrapper" style="margin-left:1%">
        <el-input placeholder="搜索" v-model="searchInput" class="">
          <el-button slot="append" icon="el-icon-search" @click="searchHandle"></el-button>
        </el-input>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部" name="zero">
            <el-table :data="tableData" border style="width: 100%" max-height="450">
              <el-table-column prop="id" label="id" v-if="1==0">
              </el-table-column>
               <el-table-column prop="categoryId" label="categoryId" v-if="1==0">
              </el-table-column>
               <el-table-column prop="productId" label="productId" v-if="1==0">
              </el-table-column>              
               <el-table-column prop="bugType" label="bugType" v-if="1==0">
              </el-table-column>
               <el-table-column prop="bugLevel" label="bugLevel" v-if="1==0">
              </el-table-column>
               <el-table-column prop="bugFrequency" label="bugFrequency" v-if="1==0">
              </el-table-column>
              <!-- <el-table-column v-if="isAdmin" prop="phone" label="申请人电话" sortable width="120">
              </el-table-column> -->
              <el-table-column prop="type" label="咨询类型" sortable width="150">
              </el-table-column>
              <el-table-column prop="productName" label="产品名称" sortable width="110">
              </el-table-column>
              <el-table-column prop="submitTime" label="提交时间" sortable width="200">
              </el-table-column>
              <!-- <el-table-column prop="status" label="处理状态" sortable width="110">
              </el-table-column> -->
               <el-table-column prop="ecflag" label="ecflag" v-if="1==0">
              </el-table-column>
              <el-table-column v-if="false" prop="status" label="处理状态" sortable width="110">                
              </el-table-column>
              <el-table-column v-if="false" prop="ecStatus" label="处理状态" sortable width="110">
              </el-table-column>
               <el-table-column  label="处理状态" sortable width="110">
                 <template slot-scope="scope">
                   <span>{{scope.row.ecflag!=1 ?scope.row.status:scope.row.ecStatus}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="summary" label="摘要" sortable width="200">
              </el-table-column>

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button @click="handleCheck(scope.row)" type="text" size="small">查看</el-button>
                  <el-button v-show="scope.row.status=='待处理'" @click="handleModify(scope.row)"
                    type="text" size="small">修改</el-button>
                  <el-button v-show="scope.row.status=='待反馈'" @click="handleFeedback(scope.row)" type="text" size="small">反馈</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="待处理" name="first">
            <el-table :data="tableData" border style="width: 100%" max-height="450">
              <el-table-column prop="id" label="id" v-if="1==0">
              </el-table-column>
              <!-- <el-table-column v-if="isAdmin" prop="phone" label="申请人电话" sortable width="120"> 
              </el-table-column>-->
              <el-table-column prop="type" label="咨询类型" sortable width="150">
              </el-table-column>
              <el-table-column prop="productName" label="产品名称" sortable width="110">
              </el-table-column>
              <el-table-column prop="submitTime" label="提交时间" sortable width="200">
              </el-table-column>
              <el-table-column prop="status" label="处理状态" sortable width="110">
              </el-table-column>
              <el-table-column prop="summary" label="摘要" sortable width="200">
              </el-table-column>

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button @click="handleCheck(scope.row)" type="text" size="small">查看</el-button>
                  <el-button v-show="scope.row.status=='待处理'" @click="handleModify(scope.row)"
                    type="text" size="small" style="color:#409EFF">修改</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="处理中" name="second">
            <el-table :data="tableData" border style="width: 100%" max-height="450">
              <el-table-column prop="id" label="id" v-if="1==0">
              </el-table-column>
              <!-- <el-table-column v-if="isAdmin" prop="phone" label="申请人电话" sortable width="120"> 
              </el-table-column>-->
              <el-table-column prop="type" label="咨询类型" sortable width="150">
              </el-table-column>
              <el-table-column prop="productName" label="产品名称" sortable width="110">
              </el-table-column>
              <el-table-column prop="submitTime" label="提交时间" sortable width="200">
              </el-table-column>
              <el-table-column prop="status" label="处理状态" sortable width="110">
              </el-table-column>
              <el-table-column prop="summary" label="摘要" sortable width="200">
              </el-table-column>

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button @click="handleCheck(scope.row)" type="text" size="small">查看</el-button>
                 
                </template>
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="待反馈" name="third">
            <el-table :data="tableData" border style="width: 100%" max-height="450">
              <el-table-column prop="id" label="id" v-if="1==0">
              </el-table-column>
              <!-- <el-table-column v-if="isAdmin" prop="phone" label="申请人电话" sortable width="120"> 
              </el-table-column>-->
              <el-table-column prop="type" label="咨询类型" sortable width="150">
              </el-table-column>
              <el-table-column prop="productName" label="产品名称" sortable width="110">
              </el-table-column>
              <el-table-column prop="submitTime" label="提交时间" sortable width="200">
              </el-table-column>
              <el-table-column prop="status" label="处理状态" sortable width="110">
              </el-table-column>
              <el-table-column prop="summary" label="摘要" sortable width="200">
              </el-table-column>

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button @click="handleCheck(scope.row)" type="text" size="small">查看</el-button>
                  <el-button @click="handleFeedback(scope.row)" type="text" size="small">反馈</el-button>
                 
                </template>
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="结束" name="fourth">
            <el-table :data="tableData" border style="width: 100%" max-height="450">
              <el-table-column prop="id" label="id" v-if="1==0">
              </el-table-column>
              <!-- <el-table-column v-if="isAdmin" prop="phone" label="申请人电话" sortable width="120"> 
              </el-table-column>-->
              <el-table-column prop="type" label="咨询类型" sortable width="150">
              </el-table-column>
              <el-table-column prop="productName" label="产品名称" sortable width="110">
              </el-table-column>
              <el-table-column prop="submitTime" label="提交时间" sortable width="200">
              </el-table-column>
              <el-table-column prop="status" label="处理状态" sortable width="110">
              </el-table-column>
              <el-table-column prop="summary" label="摘要" sortable width="200">
              </el-table-column>

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button @click="handleCheck(scope.row)" type="text" size="small" style="color:#18a68a">查看</el-button>
                  
                </template>
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total">
              </el-pagination>
            </div>
          </el-tab-pane>

        </el-tabs>
      </el-col>
    </el-row>
    <el-dialog title="反馈" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules" status-icon  class="dialogs-body">

        <el-form-item label="反馈结果" :label-width="formLabelWidth" prop="result" required>
          <el-select v-model="form.result" placeholder="请选择反馈结果">
            <el-option label="已解决" value="4"></el-option>
            <el-option label="未解决" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="反馈意见" :label-width="formLabelWidth" prop="advice">
          <el-input type="textarea" :rows="10" v-model="form.advice" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer diologs-user">
        <el-button type="primary" @click="feedback" style="color: #fff;font-size: 14px;width: 140px;height: 36px;border: 1px solid #0084ff;">确定</el-button>
        <el-button @click="cancel('form')" style="color: #0084ff;font-size: 14px;width: 140px;height: 36px;border: 1px solid #0084ff;">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Appliction',
    data() {
      return {
        activeIndex: 0,
        activeName: 'zero',
        searchInput: '',
        pageSizes: [10, 20, 30, 40],
        pageSize: 10,
        currentPage: 1,
        total: 0,
        tableData: [],
        // isAdmin: sessionStorage.getItem('userId') == 'admin',
        dialogFormVisible: false,
        form: {
          advice: '',
          result: "",
          id: -1
        },
        rules: {
          type: [{
            required: true,
            message: '请选择反馈结果',
            trigger: 'blur,change'
          }]
        },
        formLabelWidth: '80px'
      }


    },
    mounted: function () { //钩子函数
      this.getList({});
      window.scrollTo(0, 0); //初始化页面在最顶部
    },
    methods: {
      getList: function ({
        start = 0,
        limit = 10,
        sort = '',
        status = '-1',
        keyword = ''
      }) {
        var states = ['待处理', '处理中', '待反馈', '正常结束', '异常结束']; //全部 待处理 处理中 待反馈 结束
        var types = ['咨询与建议','故障申报']
        var _this = this;
        //设置请求路径
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        this.$http({
          url: 'support/list?start=' + start + '&limit=' + limit + '&sort=' + sort + '&status=' + status +
            '&keyword=' + keyword+'&date='+new Date().getTime(),
          method: 'get',
          headers: {
            'X-Access-Token': sessionStorage.getItem('accessToken')
          },
        }).then(function (resp) {
          if (resp.data.returnCode == 0) {
            _this.total = resp.data.data.length;
            _this.tableData = resp.data.data.map(item => {
              return {
                id: item.id,
                description: item.description,
                ecflag: item.ecflag,
                eclevel: item.eclevel,
                ectype: item.ectype,
                // feedback: item.feedback,
                frequency: item.frequency,
                productId: item.productId,
                // solveDesc: item.solveDesc,
                // solveTime: item.solveTime.substring(0, 19) ,
                // statusCn: item.statusCn,
                // userId: item.userId,
                // userName: item.userName,
                submitTime: item.submitTime.substring(0, 19),
                categoryId:1,//item.productType,
                productName: item.productName,
                status: states[+item.status-1],
                ecStatus: item.ecStatus,
                summary: item.summary,
                type: types[+item.type-1],
              }
            }); //状态，全部 待处理 处理中 待反馈 结束  -1    1      2      3     4,5
          } else if (resp.data.returnCode == 1011) {
            _this.$message.error('会话已过期，请重新登录！');
            _this.$router.push(
              {path:'/login'}
            )
          }
        }).catch(function (error) {
          _this.$message.error('查询失败！ ');
        });
      },
      searchHandle() {
        var states = ['-1','1','2','3','4,5'];
        this.getList({
          start: this.pageSize * (this.currentPage - 1),
          limit: this.pageSize,
          status: states[this.activeIndex],
          keyword: encodeURI(this.searchInput)
        });
      },
      handleClick(row) {
        var states = ['-1','1','2','3','4,5'];
        var activeNames = ['zero', 'first', 'second', 'third', 'fourth']
        this.activeIndex = row.$data.index;
        this.activeName = activeNames[this.activeIndex];
         this.getList({
            status: states[this.activeIndex]
          });
        
      },
      handleCheck(row) {

        this.$router.push({
          path: '/support/',
          query: {
            type: 'query',
            id: row.id
          }
        });

      },
      
      handleModify(row) {
        this.$router.push({
          path: '/support/',
          query: {
            type: 'modify',
            id: row.id,
            // consultType:row.type,
            // categoryId:row.categoryId,
            // categoryName:row.dictName,
            // productId:row.productId,
            // productName:row.productName,
            // general:row.general,
            // desc:row.description,
            // ecflag: row.ecflag,
            // eclevel: row.eclevel,
            // ectype: row.ectype,
            // frequency: row.frequency
          }
        });
      },
       handleFeedback(row) {
        if(undefined!==this.$refs.form){
          this.$refs.form.resetFields();
        }
        this.dialogFormVisible = true;
        this.form.id = row.id;

      },
      cancel(form){
        var _this = this;
        _this.$refs[form].resetFields();
        _this.dialogFormVisible = false;
      },
      feedback() {
        var _this = this;
        if(!_this.form.result){
          _this.$message.error('请选择反馈结果！');
          return;
        }
        _this.dialogFormVisible = false;
        var qs = require('qs');
        var params = {
            supportId: _this.form.id,
            status: _this.form.result,
            feedback: _this.form.advice
          };
        _this.$http({
          url: 'support/feedback'+'?date='+new Date().getTime(),
          method: 'post',
          headers: {
            'X-Access-Token': sessionStorage.getItem('accessToken'),
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          data: qs.stringify(params)
        }).then(function (resp) {
          if (resp.data.returnCode == 0) {
            _this.form.advice = '';
            _this.getList({
              start: _this.pageSize * (_this.currentPage - 1),
              limit: _this.pageSize,
              status: _this.activeIndex - 1,
              keyword: _this.searchInput
            });
            _this.$message('反馈成功！ ');
          } else if (resp.data.returnCode == 1011) {
            _this.$message.error('会话已过期，请重新登录！');
            _this.$router.push(
              {path:'/login'}
            )
          }
        }).catch(function (error) {
          // _this.$message.error('审批失败！ ');
        });
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.currentPage = 1;
        this.getList({
          start: 0,
          limit: this.pageSize,
          status: this.activeIndex - 1,
          keyword: this.searchInput
        });
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getList({
          start: this.pageSize * (this.currentPage - 1),
          limit: this.pageSize,
          status: this.activeIndex - 1,
          keyword: this.searchInput
        });
      },
      //时间格式化
      dateFormat(fmt, date) {
        var o = {
          "M+": date.getMonth() + 1, //月份
          "d+": date.getDate(), //日
          "h+": date.getHours(), //小时
          "m+": date.getMinutes(), //分
          "s+": date.getSeconds(), //秒
          "q+": Math.floor((date.getMonth() + 3) / 3), //季度
          "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
      }
    },
    components: {},
    watch: {
      '$route' (to, from) {
        if (to.name === 'Application') {
          let _this = this;
          _this.getList();
        }
      }
    }

  }

</script>
<style>
  .page.appliction-page .el-table th>.cell {
    text-align: center;
  }

  .page.appliction-page .el-tab-pane {
    padding: 0;
  }

  .page.appliction-page .el-tabs__header {
    width: 50%;
    margin: 0px;
  }

  .page.appliction-page .el-tabs__item {
    margin: 0 0 34px 0;
  }

  .page.appliction-page .el-tabs__item.is-active {
    border: 0;
    background: none;
  }

  .page.appliction-page .el-tabs__active-bar {
    position: absolute;
    bottom: 30px;
    left: 0;
  }

  .page.appliction-page .el-input-group {
    width: 25%;
    float: right;
  }

  .page.appliction-page .el-pagination {
    margin-top: 20px;
    float: right;
  }

  .page.appliction-page .el-tabs__nav-wrap::after {
    height: 0;
  }

  .appliction-page .el-menu--horizontal {
    border-bottom: solid 1px #5C6A7B;
  }

  .appliction-page .el-row {
    height: 60%;
  }

  .appliction-page .el-col {
    height: 100%;
  }

  .appliction-page .form_wrapper {
    padding: 2%;
    background: #fff;
  }

  .appliction-page .el-form {
    width: 70%;
    margin-left: 10%;
  }

  .appliction-page .form-title {
    margin-bottom: 0;
  }

  .appliction-page h2 {
    text-align: left;
    font-weight: normal;
    margin-bottom: 34px;
    font-size: 24px;
    margin-left: 8%;
  }

  .appliction-page .form_wrapper input {
    border-radius: 0;
  }

  /* .appliction-page .el-button {
    background: #66b1ff;
    border-color: #66b1ff;
    width: 30%;
    font-size: 16px;
  } */

  .appliction-page .el-form-item {
    text-align: left;
  }

  .appliction-page .el-select {
    width: 100%;
  }

  .appliction-page .form-title .el-form-item__content {
    margin: 0 !important;
  }

  .appliction-page .form_wrapper .el-menu--horizontal>.el-menu-item {
    float: right;
    line-height: 36px;
  }

  .appliction-page .form_wrapper .register.el-menu--horizontal>.el-menu-item {
    padding-left: 10px;
  }

  .appliction-page .el-menu--horizontal>.el-menu-item a,
  .appliction-page .el-menu--horizontal>.el-menu-item a:hover {
    text-decoration: none;
    color: #0084FF;
  }

  .page.appliction-page .el-button a {
    text-decoration: none;
    color: #fff;

  }

  .appliction-page .fast-appliction .el-menu--horizontal>.el-menu-item:hover {
    background: none;
    border: 0;
  }

  .appliction-page .fast-appliction .el-menu-item {
    background: none;
    padding: 0;
    border: 0;
  }

  .appliction-page .copy-right {
    width: 80%;
    color: #fff;
    font-size: 14px;
    margin-left: 10%;
    margin-bottom: 20px;
    position: absolute;
    bottom: 0;
  }

  .appliction-page .img-bg {
    background: url(../../static/images/product.png) center center no-repeat;
  }
  .diologs-user {
    text-align: center;
  }
  /* .dialogs-body {
    padding:10px 20px;
  } */
  .el-dialog__body {
    padding: 30px 20px 0px 20px; 
  }
</style>
