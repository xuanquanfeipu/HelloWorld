<template>
  <div class="page appliction-page">
    <el-row>
      <el-col :span="23" class="form_wrapper" style="margin-left:1%">
        <div style="padding-top:20px">
            <!-- <el-button type="primary" style="float:right;background-color:#5A71FF">筛选</el-button> -->
            <el-input placeholder="搜索" v-model="searchInput" style="float:right;margin-right:10px">
                <el-button type="primary" slot="append" icon="el-icon-search" @click="searchHandle" ></el-button>
            </el-input>
        </div>
        <el-tabs v-model="activeName">
            <el-tab-pane label="禁言人员名单" name="first">
                <el-table :data="tableData" stripe style="width: 100%" border max-height="450">
                    <el-table-column
                    prop="userName"
                    label="用户名称"
                    align="center"
                    width="180"
                    sortable>
                    </el-table-column>
                    <el-table-column
                    prop="reason"
                    label="禁言原因"
                    align="center"
                    width="180"
                    sortable>
                    </el-table-column>
                    <el-table-column
                    prop="operUserName"
                    label="操作人"
                    align="center"
                    sortable>
                    </el-table-column>
                    <el-table-column
                    prop="operTime"
                    label="操作时间"
                    align="center"
                    sortable>
                    </el-table-column>
                    <el-table-column
                    prop="opera"
                    label="操作"
                    align="center"
                    sortable>
                    <template slot-scope="scope">
                        <el-button @click="handleCancelClick(scope.row)" type="text" size="small">取消禁言</el-button>
                    </template>
                    </el-table-column>
                </el-table>
                <div class="footerPage">
                  <el-pagination background @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page="currentPage1"
                      :page-sizes="pageSizes1" :page-size="pageSize1" layout="total, sizes, prev, pager, next" :total="total1">
                  </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="删帖记录" name="second">
                <el-table :data="tableData1" stripe style="width: 100%" border max-height="450">
                    <el-table-column
                    prop="topicName"
                    label="帖子名称"
                    align="center"
                    width="180"
                    sortable>
                    </el-table-column>
                    <el-table-column
                    prop="posterName"
                    label="发帖人"
                    align="center"
                    width="180"
                    sortable>
                    </el-table-column>
                    <el-table-column
                    prop="reason"
                    label="删除原因"
                    align="center"
                    sortable>
                    </el-table-column>
                    <el-table-column
                    prop="moduleName"
                    label="帖子类别"
                    align="center"
                    sortable>
                    </el-table-column>
                    <el-table-column
                    prop="operUserName"
                    label="操作人"
                    align="center"
                    sortable>
                    </el-table-column>
                    <el-table-column
                    prop="operTime"
                    label="操作时间"
                    align="center"
                    sortable>
                    </el-table-column>
                    <el-table-column
                    prop="opera"
                    label="操作"
                    align="center"
                    sortable>
                    <template slot-scope="scope">
                        <el-button @click="handleResetClick(scope.row)" type="text" size="small" style="color:#2F9BFF">复原</el-button>
                    </template>
                    </el-table-column>
                </el-table>
                <div class="footerPage">
                  <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                      :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total">
                  </el-pagination>
              </div>
            </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'Appliction',
    data() {
      return {
        activeIndex: 0,
        activeName: 'first',
        pageSizes: [10, 20, 30, 40],
        pageSizes1: [10, 20, 30, 40],
        pageSize: 10,
        pageSize1: 10,
        currentPage: 1,
        currentPage1: 1,
        total: 0,
        total1: 0,
        screen:'',
        searchInput: '',
        start:0,
        start1:0,
        totalCount:0,
        totalCount1:0,
        limit:10,
        limit1:10,
        sort:'',
        sort1:'',
        tableData: [],
        tableData1: []
      }
    },
    mounted: function () { //钩子函数
      window.scrollTo(0, 0); //初始化页面在最顶部
      this.getTableList();
      this.getInvitationList()
    },
    methods: {
      searchHandle() {
        // console.log(this.activeName);
        if(this.activeName == 'first'){
          this.getTableList();
        }else{
          this.getInvitationList();
        }
      },
      
      handleSizeChange(val) {
        window.scrollTo(0, 0); //初始化页面在最顶部
        this.pageSize = val;
        this.currentPage = 1;
        this.limit = this.pageSize
        this.getInvitationList()
        window.scrollTo(0, 0); //初始化页面在最顶部
      },
      handleSizeChange1(val) {
        window.scrollTo(0, 0); //初始化页面在最顶部
        this.pageSize = val;
        this.currentPage = 1;
        this.limit = this.pageSize
        this.getTableList()
        window.scrollTo(0, 0); //初始化页面在最顶部
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.start = this.pageSize * (this.currentPage - 1)
        this.getInvitationList();
        window.scrollTo(0, 0); //初始化页面在最顶部
      },
      handleCurrentChange1(val) {
        this.currentPage1 = val;
        this.start = this.pageSize1 * (this.currentPage1 - 1)
        this.getTableList();
        window.scrollTo(0, 0); //初始化页面在最顶部
      },
    //获取被禁言人员列表
    getTableList(){
        var _this = this;
        this.$http({
            url:'bbsLog/forbidUser/list?search='+this.searchInput+'&start='+this.start+'&totalCount='+this.totalCount+'&limit='+this.limit+'&sort='+this.sort+'&date='+new Date().getTime(),
            method:'get',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken'),
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(function(res){
            // console.log(res)
            if(0 == res.data.returnCode){
                console.log(res)
                _this.total = res.data.page.totalCount
                _this.tableData = res.data.data
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
    //取消被禁人员
    handleCancelClick(row) {
        console.log(row)
        var _this = this;
        this.$http({
            url:'bbsuser/relieveForbid/'+row.userId,
            method:'post',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken'),
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(function(res){
            if(0 == res.data.returnCode){
                console.log(res)
                _this.$message.success('取消禁言成功！');
                _this.getTableList();
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
    //获取被删帖子列表
    getInvitationList:function(){
        var _this = this;
        this.$http({
            url:'bbsLog/deletedTopic/list?search='+this.searchInput+'&screen='+this.screen+'&start='+this.start+'&totalCount='+this.totalCount+'&limit='+this.limit+'&sort='+this.sort+'&date='+new Date().getTime(),
            method:'get',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken'),
            }
        }).then(function(res){
            // console.log(res)
            if(0 == res.data.returnCode){
                console.log(res)
                _this.total = res.data.page.totalCount
                _this.tableData1 = res.data.data
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
    //删帖复原
    handleResetClick(row){
        var _this = this;
        var url = 'bbsLog/deletedTopic/recovery/'+row.topicId;
        this.$http({
            url:url,
            method:'post',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken'),
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(function(res){
            // console.log(res)
            if(0 == res.data.returnCode){
                _this.getInvitationList()
            }else if(1011 == res.data.returnCode){
                _this.$message.error('会话已过期，请重新登录！');
            }else {
                _this.$message.error('操作失败！');
            }
        })
    },
    },

  }

</script>
<style scoped>
  .page.appliction-page {
    height: auto;
    padding: 0 2% 2%;
  }

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
