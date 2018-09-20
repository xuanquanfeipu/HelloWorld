<template>
  <div class="page appliction-page">
    <el-row>
      <el-col :span="23" class="form_wrapper" style="margin-left:1%">
        <router-link to="/apply"><el-button type="primary" style="float: right;margin-left:10px;">
            <i class="el-icon-plus"></i>预约申请
        </el-button></router-link>
        <el-input placeholder="搜索" v-model="searchInput" class="">
          <el-button slot="append" icon="el-icon-search" @click="searchHandle"></el-button>
        </el-input>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部" name="zero">
            <el-table :data="tableData" border style="width: 100%" max-height="450">
              <el-table-column prop="id" label="id" v-if="1==0">
              </el-table-column>
              <el-table-column prop="desktopScale" label="desktopScale" v-if="1==0">
              </el-table-column>
               <el-table-column prop="renewal" label="renewal" v-if="1==0">
              </el-table-column>
              <el-table-column v-if="isAdmin" prop="phone" label="申请人电话" sortable width="120">
              </el-table-column>
              <el-table-column prop="type" label="申请类型" sortable width="150">
              </el-table-column>
              <el-table-column prop="date" label="预约时间" sortable width="200">
              </el-table-column>
              <el-table-column prop="status" label="审批状态" sortable width="110">
              </el-table-column>
              <el-table-column prop="use" label="测试用途" sortable width="110">
              </el-table-column>
              <el-table-column prop="appliedTime" label="申请时间" sortable width="200">
              </el-table-column>
              

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button v-show="scope.row.status!='已撤销'" @click="handleCheck(scope.row)" type="text" size="small">查看</el-button>
                  <el-button v-show="scope.row.status=='未审批'" @click="handleRevoke(scope.row)" type="text" size="small">撤销</el-button>
                  <el-button v-show="scope.row.status!='审批中'&&scope.row.status!='审批通过'&&scope.row.status!='审批不通过'&&scope.row.status!='已撤销'" @click="handleModify(scope.row)"
                    type="text" size="small">修改</el-button>
                  <el-button v-show="scope.row.status=='未审批'&&isAdmin" @click="handleApprove(scope.row)" type="text" size="small">审批</el-button>
                  <el-button v-show="scope.row.status=='审批通过'&&scope.row.renewal==1" @click="handleRenewal(scope.row)" type="text" size="small">续约</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="未审批" name="first">
            <el-table :data="tableData" border style="width: 100%" max-height="450">
              <el-table-column prop="id" label="id" v-if="1==0">
              </el-table-column>
              <el-table-column v-if="isAdmin" prop="phone" label="申请人电话" sortable width="120">
              </el-table-column>
              <el-table-column prop="type" label="申请类型" sortable width="150">
              </el-table-column>
              <el-table-column prop="date" label="预约时间" sortable width="200">
              </el-table-column>
              <el-table-column prop="status" label="审批状态" sortable width="110">
              </el-table-column>
              <el-table-column prop="use" label="测试用途" sortable width="110">
              </el-table-column>
              <el-table-column prop="appliedTime" label="申请时间" sortable width="200">
              </el-table-column>

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button v-show="scope.row.status!='已撤销'" @click="handleCheck(scope.row)" type="text" size="small">查看</el-button>
                  <el-button v-show="scope.row.status=='未审批'" @click="handleRevoke(scope.row)" type="text" size="small">撤销</el-button>
                  <el-button v-show="scope.row.status!='审批中'&&scope.row.status!='审批通过'&&scope.row.status!='已撤销'" @click="handleModify(scope.row)"
                    type="text" size="small">修改</el-button>
                    <el-button v-show="scope.row.status=='未审批'&&isAdmin" @click="handleApprove(scope.row)" type="text" size="small" style="color:#409EFF">审批</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total">
              </el-pagination>
            </div>
          </el-tab-pane>
                    <el-tab-pane label="已撤销" name="second">
            <el-table :data="tableData" border style="width: 100%" max-height="450">
             <el-table-column prop="id" label="id" v-if="1==0">
              </el-table-column>
              <el-table-column v-if="isAdmin" prop="phone" label="申请人电话" sortable width="120">
              </el-table-column>
              <el-table-column prop="type" label="申请类型" sortable width="150">
              </el-table-column>
              <el-table-column prop="date" label="预约时间" sortable width="200">
              </el-table-column>
              <el-table-column prop="status" label="审批状态" sortable width="110">
              </el-table-column>
              <el-table-column prop="use" label="测试用途" sortable width="110">
              </el-table-column>
              <el-table-column prop="appliedTime" label="申请时间" sortable width="200">
              </el-table-column>


              <el-table-column label="操作">
                <template slot-scope="scope">

                </template>
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="审批中" name="third">
            <el-table :data="tableData" border style="width: 100%" max-height="450">
            <el-table-column prop="id" label="id" v-if="1==0">
              </el-table-column>
              <el-table-column v-if="isAdmin" prop="phone" label="申请人电话" sortable width="120">
              </el-table-column>
              <el-table-column prop="type" label="申请类型" sortable width="150">
              </el-table-column>
              <el-table-column prop="date" label="预约时间" sortable width="200">
              </el-table-column>
              <el-table-column prop="status" label="审批状态" sortable width="110">
              </el-table-column>
              <el-table-column prop="use" label="测试用途" sortable width="110">
              </el-table-column>
              <el-table-column prop="appliedTime" label="申请时间" sortable width="200">
              </el-table-column>


              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button v-show="scope.row.status!='已撤销'" @click="handleCheck(scope.row)" type="text" size="small" style="color:#18a68a">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="审批通过" name="fourth">
            <el-table :data="tableData" border style="width: 100%" max-height="450">
             <el-table-column prop="id" label="id" v-if="1==0">
              </el-table-column>
              <el-table-column prop="renewal" label="renewal" v-if="1==0">
              </el-table-column>
              <el-table-column v-if="isAdmin" prop="phone" label="申请人电话" sortable width="120">
              </el-table-column>
              <el-table-column prop="type" label="申请类型" sortable width="150">
              </el-table-column>
              <el-table-column prop="date" label="预约时间" sortable width="200">
              </el-table-column>
              <el-table-column prop="status" label="审批状态" sortable width="110">
              </el-table-column>
              <el-table-column prop="use" label="测试用途" sortable width="110">
              </el-table-column>
              <el-table-column prop="appliedTime" label="申请时间" sortable width="200">
              </el-table-column>


              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button v-show="scope.row.status!='已撤销'" @click="handleCheck(scope.row)" type="text" size="small">查看</el-button>
                  <el-button v-show="scope.row.renewal==1" @click="handleRenewal(scope.row)" type="text" size="small">续约</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="审批不通过" name="fifth">
            <el-table :data="tableData" border style="width: 100%" max-height="450">
              <el-table-column prop="id" label="id" v-if="1==0">
              </el-table-column>
              <el-table-column v-if="isAdmin" prop="phone" label="申请人电话" sortable width="120">
              </el-table-column>
              <el-table-column prop="type" label="申请类型" sortable width="150">
              </el-table-column>
              <el-table-column prop="date" label="预约时间" sortable width="200">
              </el-table-column>
              <el-table-column prop="status" label="审批状态" sortable width="110">
              </el-table-column>
              <el-table-column prop="use" label="测试用途" sortable width="110">
              </el-table-column>
              <el-table-column prop="appliedTime" label="申请时间" sortable width="200">
              </el-table-column>

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button v-show="scope.row.status!='已撤销'" @click="handleCheck(scope.row)" type="text" size="small" style="color:#18a68a">查看</el-button>
                  <!-- <el-button v-show="scope.row.status!='审批中'&&scope.row.status!='审批通过'&&scope.row.status!='已撤销'" @click="handleModify(scope.row)"
                    type="text" size="small">修改</el-button> -->
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
    <el-dialog title="审批" :visible.sync="dialogFormVisible">
      <el-form  ref="form" :model="form" :rules="rules" status-icon>

        <el-form-item label="类型" :label-width="formLabelWidth" prop="type" required>
          <el-select v-model="form.type" placeholder="请选择审批类型">
            <el-option label="审批通过" value="4"></el-option>
            <el-option label="审批不通过" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="意见" :label-width="formLabelWidth" prop="advice">
          <el-input type="textarea" :rows="10" v-model="form.advice" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="approve">确 定</el-button>
        <el-button @click="cancel('form')">取 消</el-button>
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
        os:'',
        amount:'',
        isAdmin: sessionStorage.getItem('userId') == 'admin',
        dialogFormVisible: false,
        form: {
          advice: '',
          type: "",
          approveId: -1
        },
         rules: {
          type: [{
              required: true,
              message: '请选择审批类型',
              trigger: 'blur,change'
            }]
         },
        formLabelWidth: '60px'
      }


    },
    mounted: function () { //钩子函数
    window.scrollTo(0, 0); //初始化页面在最顶部
      this.getList({});
    },
    methods: {
      //状态，未审批是0，审批中1，通过2，驳回是3,已撤销4
      /**
       * 补充：预约审批状态有变动：
        1. 未审批
        2. 已撤销
        3. 审批中
        4. 审批通过
        5. 审批不通过
       */
      getList: function ({
        start = 0,
        limit = 10,
        sort = '',
        status = -1,
        keyword = ''
      }) {
        // var states = ['未审批', '审批中', '通过', '驳回', '已撤销'];
        var states = ['未审批', '已撤销', '审批中', '审批通过', '审批不通过'];
        var _this = this;
        //设置请求路径
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        this.$http({
          url: 'reservation/list?start=' + start + '&limit=' + limit + '&sort=' + sort + '&status=' + status +
            '&keyword=' + keyword+'&date='+new Date().getTime(),
          method: 'get',
          headers: {
            'X-Access-Token': sessionStorage.getItem('accessToken')
          },
        }).then(function (resp) {
          console.log(resp)
          if (resp.data.returnCode == 0) {
            _this.total = resp.data.page.totalCount;
            _this.tableData = resp.data.data.map(item => {
              return {
                id: item.id,
                phone:item.phone?item.phone:'',
                date: item.beginTime.substring(0,10) + ' - ' + item.endTime.substring(0,10),
                appliedTime: item.submitTime.substring(0,19),
                use: item.purpose,
                type: item.productName||'其他',
                status: states[item.status-1],
                renewal:item.renewal,
                // os:item.os,
                // amount:item.amount
                desktopScale:item.desktopScale
              }
            }); 
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
        this.getList({
          start: this.pageSize * (this.currentPage - 1),
          limit: this.pageSize,
          status: this.activeIndex==0?-1:this.activeIndex ,
          keyword: encodeURI(this.searchInput)
        });
      },
      handleClick(row) {
        var activeNames = ['zero', 'first', 'second', 'third', 'fourth', 'fifth']
        this.activeIndex = row.$data.index;
        this.activeName = activeNames[this.activeIndex];
        this.getList({
          status: this.activeIndex==0?-1:this.activeIndex 
        });
      },
      handleCheck(row) {
        console.log(row)
        this.$router.push({
          path: '/apply/',
          query: {
            type: 'query',
            applyid: row.id,
            desktopScale:row.desktopScale
          }
        });

      },
      handleRevoke(row) {
        var _this = this;
        this.$http({
          url: 'reservation/cancel/' + row.id+'?date='+new Date().getTime(),
          method: 'get',
          headers: {
            'X-Access-Token': sessionStorage.getItem('accessToken')
          }
        }).then(function (resp) {
          if (resp.data.returnCode == 0) {
            _this.getList({
              start: _this.pageSize * (_this.currentPage - 1),
              limit: _this.pageSize,
              status: _this.activeIndex==0?-1:this.activeIndex ,
              keyword: _this.searchInput
            });
            _this.$message('撤销成功！ ');
          } else if (resp.data.returnCode == 1011) {
            _this.$message.error('会话已过期，请重新登录！');
          }
        }).catch(function (error) {
          // _this.$message.error('撤销失败！ ');
        });

      },
      handleModify(row) {
        this.$router.push({
          path: '/apply/',
          query: {
            type: 'modify',
            applyid: row.id,
            // os:row.os,
            // amount:row.amount
            // desktopScale:row.desktopScale
          }
        });
      },
      handleApprove(row) {
        // this.form.advice = '';
        // this.form.type = '';
        if(undefined!==this.$refs.form){
          this.$refs.form.resetFields();
        }
        this.dialogFormVisible = true;
        this.form.approveId = row.id;

      },
      handleRenewal(row) {
        this.$router.push({
          path: '/apply/',
          query: {
            type: 'renewal',
            applyid: row.id
          }
        });
      },
      cancel(form){
        var _this = this;
        _this.$refs[form].resetFields();
        _this.dialogFormVisible = false;
      },
      approve() {
        var _this = this;
        if(!_this.form.type){
          _this.$message.error('请选择审批类型！');
          return;
        }
        _this.dialogFormVisible = false;
        var qs = require('qs');
        var params = {
            id: _this.form.approveId,
            status: _this.form.type,
            desc: _this.form.advice
          };
        _this.$http({
          url: 'reservation/approval'+'?date='+new Date().getTime(),
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
              status: _this.activeIndex==0?-1:this.activeIndex ,
              keyword: _this.searchInput
            });
            _this.$message('审批成功！ ');
          } else if (resp.data.returnCode == 1011) {
            _this.$message.error('会话已过期，请重新登录！');
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
          status: this.activeIndex==0?-1:this.activeIndex ,
          keyword: this.searchInput
        });
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getList({
          start: this.pageSize * (this.currentPage - 1),
          limit: this.pageSize,
          status: this.activeIndex==0?-1:this.activeIndex ,
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
      '$route'(to, from) {
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
    width: 50%;
    margin-left: 25%;
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
  .el-tab-pane {
    text-align: center
  }
  .el-button--text:first-of-type{
    color: #18a68a;
  }
  .el-button--text:last-of-type{
    color: #ff3040
  }
  .appliction-page .img-bg {
    background: url(../../static/images/product.png) center center no-repeat;
  }

</style>
