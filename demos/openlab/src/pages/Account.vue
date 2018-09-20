<template>
<div class="page appliction-page">
    <el-row>
      <el-col :span="23" class="form_wrapper" style="margin-left:1%">
          <el-button-group>
            <el-button type="danger" icon="el-icon-delete" @click='toggleSelection' class="danger" style="float:right">删除</el-button>
              <el-button type="success" icon='el-icon-plus' @click='newBtn' class="success" style="float:right">新增</el-button>
              <!-- <el-input placeholder="搜索" v-model="searchInput" class="">
                <el-button slot="append" icon="el-icon-search" @click='click'></el-button>
              </el-input> -->
          </el-button-group>
        <el-table
            :data="tableData2"
            border
            ref="multipleTable"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            :row-class-name="tableRowClassName" max-height="450">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
            prop="userId"
            label="账号"
            sortable
            width="180">
            </el-table-column>
            <!-- <el-table-column
            prop="userPassword"
            label="密码"
            sortable
            width="180">
            </el-table-column> -->
            <el-table-column
            prop="userName"
            label="姓名"
            sortable>
            </el-table-column>
            <el-table-column
            prop="company"
            label="公司"
            sortable>
            </el-table-column>
            <!-- <el-table-column
            prop="desc"
            label="描述说明"
            sortable>
            </el-table-column> -->
            <el-table-column
            prop="createTime"
            label="创建时间"
            sortable>
            </el-table-column>
            <el-table-column
            label="操作"
            sortable>
            <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
                <el-button @click="deleteUser(scope.row)" type="text" size="small" style="color:#ff3040">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <!-- <div class="block">
          <el-pagination background @size-change="handleSizeChange"           @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total">
          </el-pagination>
        </div> -->
      </el-col>
    </el-row>
</div>
</template>
<script>
export default {
  name:'Account',
  data() {
      return {
        tableData2:[],
        tableRowClassName:'',
        activeIndex:0,
        userId:'',
        currentPage:1,
        multipleSelection: [],
        pageSizes:[5,10,15,20],
        pageSize:5,
        total:0,
        searchInput:''
      }
    },
  mounted: function () { //钩子函数
      this.getList({});
      window.scrollTo(0, 0); //初始化页面在最顶部
    },
  methods: {
    //获取子账号列表数据
    getList:function({
      start = 0,
      limit = 5,
      sort = '',
    }){
      var _this = this;
      this.$http({
        url:'user/subaccount?start='+start+'&limit='+limit+'&sort='+sort+'&date='+new Date().getTime(),
        method:'get',
        headers: {
            'X-Access-Token': sessionStorage.getItem('accessToken')
          },
      }).then(function(res){
        // if(res.data.data.length){
        //    _this.total = res.data.data.length;
        // }
        if (res.data.returnCode == 0) {
           _this.tableData2 = res.data.data;
          } else if (res.data.returnCode == 1011) {
            _this.$message.error('会话已过期，请重新登录！');
            _this.$router.push(
          {path:'/login'}
      )
          }
      })
    },
    //删除单个子账户
    deleteUser(id){
      var _this = this;
      _this.$confirm('确认删除该账户, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        showClose:false,
        cancelButtonClass:'cancel',
        confirmButtonClass:'confirm'
      }).then(() => {
         _this.$http({
          url:'user/subaccount/'+id.userId+'?date='+new Date().getTime(),
          method:'delete',
          headers:{
            'X-Access-Token': sessionStorage.getItem('accessToken')
          }
        }).then(function(res){
          if(res.data.returnCode == 1011){
            _this.$message.error('会话已过期，请重新登录！');
              _this.$router.push(
                {path:'/login'}
              )
          }else if(res.data.returnCode == 0){
            _this.$message({
              type: 'success',
              message: res.data.message || '恭喜,删除成功!'
            });
            _this.getList({});
            }else{
              _this.$message({
              type: 'success',
              message: res.data.message || '抱歉,删除失败!'
            });
            }
        })
      }).catch(()=>{
        
      })
    },
    //删除多个子账户
    toggleSelection(rows) {
      console.log(this.multipleSelection)
      if(this.multipleSelection.length ===0){
        this.$message({
              type: 'info',
              message: '请选择要删除的账号'
        });
        return;
      }
     var _this = this;
      _this.$confirm('确认删除, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        showClose:false,
        cancelButtonClass:'cancel',
        confirmButtonClass:'confirm'
      }).then(()=>{
        var str = '';
        _this.multipleSelection.forEach(item=>{
          str+=item.userId+',';
        })
        console.log(str)
        _this.$http({
          url:'user/subaccount/'+str+'?date='+new Date().getTime(),
          method:'delete',
          headers:{
            'X-Access-Token': sessionStorage.getItem('accessToken')
          }
        }).then(function(res){
          if(res.data.returnCode == 1011){
            _this.$message.error('会话已过期，请重新登录！');
              _this.$router.push(
                {path:'/login'}
              )
          }else if(res.data.returnCode == 0){
            _this.$message({
              type: 'success',
              message: res.data.message || '恭喜,删除成功!'
            });
            _this.getList({});
            }else{
              _this.$message({
              type: 'success',
              message: res.data.message || '抱歉,删除失败!'
            });
            }
        })
      }).catch(()=>{

      })
    },
    //批量删除
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClick(row) {
      this.$router.push(
          {
            path:'/accountModification',
            query:{userId:row.userId,userName:row.userName,company:row.company,createTime:row.createTime}
          }
      )
    },
    handleSizeChange(val) {
        this.pageSize = val;
        this.currentPage = 1;
        this.getList({
          start: 0,
          limit: this.pageSize,
        });
      },
    handleCurrentChange(val) {
        this.currentPage = val;
        this.getList({
          start: this.pageSize * (this.currentPage - 1),
          limit: this.pageSize,
        });
      },
    newBtn(){
      this.$router.push({
        path:'/newSubaccount'
      })
    },
  }
}
</script>
<style scoped>
 .page.appliction-page {
    /* height: auto; */
    /* padding: 0 2% 2%; */
  }
.appliction-page .el-row {
    height: 60%;
  }
.appliction-page .el-col {
    height: 100%;
  }
  .appliction-page h2 {
    text-align: left;
    font-weight: normal;
    margin-bottom: 34px;
    font-size: 24px;
    margin-left: 8%;
  }
.page.appliction-page {
    /* height: auto; */
    /* padding: 0 2% 2%; */
  }
.form_wrapper{
    padding: 10%;
    padding-top: 2%;
    background: #fff;
}
.form_wrapper input {
    border-radius: 0;
}
.page.appliction-page .el-table th>.cell {
  text-align: center!important;
  position: relative;
  word-wrap: normal;
  text-overflow: ellipsis;
  vertical-align: middle;
  width: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.page.appliction-page .el-input-group {
    float:right;
    width: 30%;
    margin-bottom:1%;
    margin-right: 1%;
  }
.page.appliction-page .el-button-group {
    width: 100%;
    float:right;
    margin-bottom:1%;
    overflow: hidden;
}
.page.appliction-page .el-button-group .el-button{
    width: 12%;
    float: right;
}
.page.appliction-page .el-table__header-wrapper {
      background-color:skyblue;
  }
.el-button--text:first-of-type {
    color: #18a68a;
}
.el-button--text:last-of-type {
    color: #ff3040
}
.page.appliction-page .page {
  margin-top: 20px;
  float: right;
}
.page.appliction-page .success {
  background-color: #18a68a;
}
.page.appliction-page .danger {
  margin-left: 10px;
}
.page.appliction-page .block {
  height: 0;
}
.page.appliction-page .el-pagination {
  margin-top: 20px;
  float: right;
}
.el-message-box__status {
  font-size: 65px !important
}
.el-message-box__content {
  font-size: 20px;
  margin-bottom: 4%;
}
.el-message-box__message p {
  line-height: 60px;
}
.el-message-box--center {
  padding-bottom: 30px;
}
.cancel {
  width:129px;
  height: 38px;
  border: 1px solid #409eff;
  font-size:14px;
  float:right
}
.confirm {
  width:129px;
  height: 38px;
  border: 1px solid #409eff;
  font-size:14px;
  float: left;
}
.el-message-box__btns {
  padding: 5px 60px;
}
.el-message-box--center .el-message-box__header {
  padding-top: 20px;
}
.el-message-box {}
</style>

