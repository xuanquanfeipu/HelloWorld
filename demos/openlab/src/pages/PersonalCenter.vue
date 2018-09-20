<template>
  <div class="forum-container">
      <div class="forum-all">
        <forum-title @selectTitleType='showType'></forum-title>
        <forum-index v-if="isShow"></forum-index>
        <!-- 版块详情面包削导航 -->
        <div>
        <el-row>
            <el-col :span="24">
                <div class="breadLink">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item><span style="color: #008fd5;">{{userInfo.aliasName}}的个人主页</span></el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </el-col>
        </el-row>
        <!-- 版块详情页面主体 -->
        <div class="sectioncontent">
            <el-row>
                <div class="sectionBody">
                    <div class="sectionblocks">
                        <div class="sectionblock">
                            <div class="sectionhead-portrait">
                                <span class="imgbg">
                                    <img :src="ImgUrl">
                                </span>
                                
                            </div>
                            <!-- 帖子主题 -->
                            <div class="sectiontheme">
                                <h4>{{userInfo.realName}}</h4>
                                <div class="userbody">
                                    <span class="border"><i>{{userInfo.topicCount}}</i><br/>发帖</span>
                                    <span><i>{{userInfo.topicPostCount}}</i><br/>回复</span>
                                </div>
                                <p><span class="distance">个性签名：</span>{{userInfo.signature}}</p>
                                <span class="distance">最后访问时间：</span>
                                <span >{{userInfo.lastLoginTime}}</span>
                                <span class="distance">上次发表时间：</span>
                                <span >{{userInfo.lastTopicTime}}</span>                                   
                            </div>
                            <div class="btnGroup" v-show="isOperatorShow != false && ismoderator == false">
                                <el-button style="background-color:red;" type="primary" @click="dialogFormVisible = true" v-show="userInfo.topic == 0">禁言</el-button>
                                <el-button style="background-color:#66b1ff;" type="primary" @click="relieveForbid(userInfo.userId)" v-show="userInfo.topic == 1">已禁言</el-button>
                                <el-dialog title="管理员禁言" :visible.sync="dialogFormVisible" center width="30%">
                                <el-form :model="form">
                                    <el-form-item label="禁言原因" :label-width="formLabelWidth">
                                        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.reason">
                                        </el-input>
                                    </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <el-button type="primary" @click="shutup(userInfo.userId)">确 定</el-button>
                                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                                </div>
                                </el-dialog>
                            </div>
                        </div>
                    </div>
                </div>
            </el-row>
            <!-- 版块详情帖子中心 -->
            <el-row>
                <div class="title-category-list">
                    <div class="title-category-list-select title-category-list-select-active"  id="postList">
                        <a class="text-style" @click="selectListType('#postList')">
                            <div><span>帖子</span></div>
                        </a>
                    </div>
                    <div class="title-category-list-select" id="replyList">
                        <a class="text-style" @click="selectListType('#replyList')">
                            <div><span>回复</span></div>
                        </a>
                    </div>
                </div>
            </el-row>
            <el-row>
                <el-col>
                    <div class="sectionbody">
                        <div class="sectiontop">
                            <div class="select">
                            <el-select v-model="value" placeholder="请选择" size="mini" @change="selectList">
                                <el-option value="createTime" label="默认排序">默认排序</el-option>
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                            </div>
                            <div class="btn">
                                <el-input  placeholder="版内搜索" v-model="keyWords" class="search-input" size="mini"></el-input>
                                <el-button  type="primary" class="search-button" icon="el-icon-search" @click="search" size="mini"></el-button>
                            </div>
                            <div class="word">
                                <span @click="invitation('#new')" id="new" class="active">最新</span>
                                <span @click="invitation('#essence')" id="essence">精华</span>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>

            <el-row>
                <el-col>
                    <div class="invitation-content">
                        <div v-if="contentList == 'post'">
                            <div class="invitation-body" v-for="(item,index) in invitationBody" :key="index">
                                <!-- 帖子主题 -->
                                <div class="theme">
                                    <h3 @click.stop="toPath('/invitationDetail',{topicId:item.id,customerId:customerId,id:item.moduleId})">{{item.title}}
                                    </h3>
                                    <p>
                                    <span class="distance">{{item.createTime | fliterDate}}</span>
                                    <span class="distance">版块: <i>{{item.mouleName}}</i></span>
                                    </p>
                                </div>
                                  <!-- 帖子动态 -->
                                <div class="state">
                                    <span>浏览<br>{{item.pv}}</span>
                                    <span>回复<br>{{item.postCount}}</span>
                                </div>
                                <!-- 帖子操作 -->
                                <div class="operator" v-show="isMe">
                                    <span class="delete"  @click="deleteList(item.id,'bbsuser/delTopic/')">删除</span>
                                </div>
                              
                            </div>
                        </div> 
                        <div v-if="contentList == 'reply'">
                            <div class="invitation-body" v-for="(item,index) in invitationBody" :key="index">
                                <!-- 帖子主题 -->
                                <div class="theme">
                                    <h3 @click.stop="toPath('/invitationDetail',{topicId:item.id,customerId:customerId,id:item.moduleId})" v-html="item.title">{{item.title}}
                                    </h3>
                                    <p>
                                    <span class="distance">{{item.createTime | fliterDate}}</span>
                                    <span class="distance">版块: <i>{{item.mouleName}}</i></span>
                                    <span class="distance">发帖人: <i>{{item.authorName}}</i></span>
                                    </p>
                                </div>
                                <!-- 帖子动态 -->
                                <div class="state">
                                    <span>浏览<br>{{item.pv}}</span>
                                    <span>回复<br>{{item.postCount}}</span>
                                </div>
                                <!-- 帖子操作 -->
                                <div class="operator" v-show="isMe">
                                    <span class="delete" @click="deleteList(item.id,'bbsuser/delTopicPost/')">删除</span>
                                </div>
                                
                                
                            </div>
                        </div>    
                            <div class="footerPage">
                                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                                    :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total">
                                </el-pagination>
                            </div>
                        </div>
                </el-col>
            </el-row>
        </div>
      </div>
  </div>
  </div>
</template>
<script>
import ForumTitle from '../components/ForumTitle'
import ForumIndex from '../components/ForumIndex'
export default {
  data(){
      return{
        isOperatorShow:false,//版主用户登录展示部件,包含上传,置顶,取消置顶,精华,删除
        top:false,//普通用户登录,控制帖子展示置顶
        main:false,//普通用户登录,控制帖子展示精华
        isAttention:true,
        pageSizes: [10, 20, 30, 40],
        pageSize: 10,
        currentPage: 1,
        total: 0,
        ImgUrl:'',
        userid:this.$route.query.userid,
        customerId:this.$route.query.customerId,
        ismoderator:false,
        isShow:false,
        isMe:false,
        options: [{
          value: 'postCount',
          label: '回复数'
        },{
          value: 'pv',
          label: '浏览量'
        }],
        value: 'createTime',
        keyWords:'',
        invitationBody:[],
        userInfo:{},
        paramList:{
              title:"",
              start:0,
              totalCount:0,
              limit:10,
              sort:"createTime",
              filter:""
          },
        contentList:"post",
        listUrl:"bbsuser/topic/",
        dialogFormVisible:false,
        formLabelWidth: '68px',
        form:{
              reason:""
          }
      }
      
  },
  mounted(){
      this.getUser();
      this.getList(this.paramList,this.listUrl);
      this.isModerator();
      this.getUserImg()
  },
  created(){
      this.isOperatorShow = JSON.parse(sessionStorage.getItem('moderator'))
  },
  methods:{
    getUserImg(){
        this.ImgUrl = this.GLOBAL.BASE_URL.substring(0,26)+'isvportal/bbsuser/avatar/'+this.customerId;
    },
    toPath(url,params){
        this.$router.push({
            path:url,
            query:params
        });
    },
    isModerator(){
        var _this = this;
        this.$http({
            url:'topic/isModerator/'+this.userid,
            method:'get',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken')
            }
        }).then(function(res){
            console.log(res)
            if(0 == res.data.returnCode){
              _this.ismoderator = res.data.data;
            }else if(1011 == res.data.returnCode){
                    _this.$message('会话已过期，请重新登录！')
                    _this.$router.push(
                        {path:'/login'}
                )
            }
        })
    },
    getUser(){
        var _this = this;
        this.$http({
            url:'bbsuser/'+this.userid,
            method:'get',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken')
            }
        }).then(function(res){
            if(0 == res.data.returnCode){
              var result = res.data.data;
              _this.userInfo = Object.assign({},result,result.info);
            }else if(1011 == res.data.returnCode){
                    _this.$message('会话已过期，请重新登录！')
                    _this.$router.push(
                        {path:'/login'}
                )
            }
        })
    },
    getList(param,url_list){
        var _this = this;
        var str = "?";
        $.each(param,function(item){
            str += item+"="+param[item]+"&";
        });
        str = str.slice(0,-1);
        this.$http({
            url:url_list+this.userid+str,
            method:'get',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken')
            }
        }).then(function(res){
            if(0 == res.data.returnCode){
             _this.total = res.data.page.totalCount;
             _this.paramList.totalCount = _this.total;
              _this.invitationBody = res.data.data;
            }else if(1011 == res.data.returnCode){
                   _this.$message('会话已过期，请重新登录！')
                    _this.$router.push(
                        {path:'/login'}
                )
            }
        })
    },
    showType(data){
          this.isShow = data
      },
    search(){
        this.paramList.title = this.keyWords;
        this.getList(this.paramList,this.listUrl);
    },
    show(){
        this.isAttention = !this.isAttention
    },
    invitation(selected){
        $(".word").find("span").each(function(){
            $(this).removeClass("active")
        })
        $(selected).addClass("active")
        if(selected ==  "#new"){
            this.paramList.filter = ""
        }else{
            this.paramList.filter = "nice"
        }
        this.getList(this.paramList,this.listUrl);
      },
   //当改变页面的展示数据时
      handleSizeChange(val){
        this.pageSize = val;
        this.currentPage = 1;
        this.paramList.totalCount = this.total;
        this.paramList.limit = this.pageSize;
        this.getList(this.paramList,this.listUrl);
      },
      //当改变当前页码时
      handleCurrentChange(val){
        this.currentPage = val;          
        this.paramList.limit = this.pageSize;
        this.paramList.start = this.pageSize*(this.currentPage -1);
        this.getList(this.paramList,this.listUrl);
        window.scrollTo(0, 0); //初始化页面在最顶部
      },
    selectListType(selected){
        $(".title-category-list").find("div.title-category-list-select").each(function(){
            $(this).removeClass("title-category-list-select-active");
        })
        $(selected).addClass("title-category-list-select-active");
        if(selected == "#replyList"){
            this.contentList = "reply";
            this.listUrl = "bbsuser/topicPost/" 
        }else{
            this.contentList = "post";
            this.listUrl = "bbsuser/topic/";  
        }
        this.currentPage = 1;
         this.getList({
            title:"",
            start:0,
            totalCount:0,
            limit:10,
            sort:"createTime",
            filter:""
        },this.listUrl);
    },
    selectList(){
        this.paramList.sort = this.value;
        this.getList(this.paramList,this.listUrl);
        // this.value
    },
    deleteList(id,urlStr){
        // console.log(id);
        var _this = this;
         var confirmStr = "";
          if(urlStr == "bbsuser/delTopic/"){
              confirmStr="帖子？";
          }else{
              confirmStr = "回复?";
          }
          this.$confirm('是否删除该'+confirmStr, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
            }).then(() => {
           this.$http({
            url:urlStr+id,
            method:'delete',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken')
            }
             }).then(function(res){
            if(0 == res.data.returnCode){
                 _this.$message.success('删除成功！');
                    _this.getList(_this.paramList,_this.listUrl);
              
            }else if(1011 == res.data.returnCode){
                    _this.$message.error('会话已过期，请重新登录！');
                    _this.$router.push(
                        {path:'/login'}
                )
            }
        })
        })
    },
    shutup(user_id){
        var _this = this;
        var param ={
            reason:this.form.reason
        }
         var qs = require('qs')
        this.$http.post("bbsuser/forbid/"+user_id,qs.stringify(param),{
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken'),
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(function(res){
            // console.log(res)
            if(0 == res.data.returnCode){
                // console.log(res)
                _this.$message.success('禁言成功！');
                _this.dialogFormVisible = false;
                _this.getUser();
            }else if(1011 == res.data.returnCode){
                _this.$message.error('会话已过期，请重新登录！');
                _this.$router.push({
                    path:'/login'
                })
            }else {
                _this.$message.error(res.data.message||'查询失败！');
            }
        })

    },
    relieveForbid(user_id){
        var _this = this;
        this.$http({
            url:'bbsuser/relieveForbid/'+user_id,
            method:'post',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken'),
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(function(res){
            if(0 == res.data.returnCode){
             _this.getUser();
            }else if(1011 == res.data.returnCode){
                    _this.$message.error('会话已过期，请重新登录！');
                    _this.$router.push(
                        {path:'/login'}
                )
            }
        })
    }
  },
  filters:{
      fliterDate:function(value){
        //   console.log(value)
        var time = value.replace(new RegExp("-","gm"),"/");
        var date = (new Date(time)).getTime();
        // var nowTime = Date.now()-date;
        // var minute = nowTime/1000/60
        // return date
        let minute = 1000 * 60;
        let hour = minute * 60;
        let day = hour * 24;
        let halfamonth = day * 15;
        let month = day * 30;
        let now = new Date().getTime();
        let diffValue = now - date;
        if(diffValue < 0){return;}
        let monthC =diffValue/month;
        let weekC =diffValue/(7*day);
        let dayC =diffValue/day;
        let hourC =diffValue/hour;
        let minC =diffValue/minute;
        if(monthC>=1){
            return "" + parseInt(monthC) + "月前";
        }
        else if(weekC>=1){
            return "" + parseInt(weekC) + "周前";
        }
        else if(dayC>=1){
            return ""+ parseInt(dayC) +"天前";
        }
        else if(hourC>=1){
            return ""+ parseInt(hourC) +"小时前";
        }
        else if(minC>=1){
            return ""+ parseInt(minC) +"分钟前";
        }else
        return "刚刚";
      }
  },

  components:{
        ForumTitle,
        ForumIndex,
    }
}
</script>
<style scoped>
.forum-container {
    width: 80%;
    margin: 0 auto;
    padding:2% 6%;
    overflow: hidden;
}
.forum-all {
    width: 100%;
    background-color: #fff;
    border: 1px solid #eee;
    overflow: hidden;
}
/* 面包屑导航 */
.breadLink {
    width: 100%;
    padding: 20px 20px
}
/* 版块详情 */
.sectioncontent {
    font: 14px/28px "microsoft yahei";
    padding: 0 2%;
}
.sectionBody {
    width: 100%;
    /* height: 80px; */
    /* padding: 20px; */
    border: 1px solid #eee;
    box-sizing: border-box;
    overflow: hidden;
    margin-bottom: 20px;
}
.sectionBody .sectionblocks {
    width: 100%;
    padding: 20px 10px;
    overflow: hidden;
}
.sectionBody .sectionblock {
    width: 100%;
    float: left;
    margin-right: 3%;
    padding-top: 10px;
}
.sectionhead-portrait {
    width: 8%;
    float: left;
    text-align: left;
    padding-left: 10px;
}
.sectionhead-portrait img {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 40px;
    height: 40px;
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
    cursor: pointer;
    margin-left: 10px;
}

.sectiontheme p {
    font:15px/20px 'microsoft yahei';
    margin-top:6px;
    text-align:left;
    margin-bottom: 6px;
}
.sectiontheme span.distance {
    /* margin-left: 10px; */
    font-weight: bold;
}


.imgbg {
    display: block;
    width: 60px;
    height: 60px;
    /* background-color: #0084ff; */
    position: relative;
    padding:0 auto;
}
.imgbg img {
    width: 100%;
    height: 100%;
}
.btnGroup {
    position: absolute;
    top: 20%;
    right: 2%;
}
.sectionbody {
    width: 100%;
    border: 1px solid #eee;
}
.sectiontop {
    width: 100%;
    padding:2%;
    overflow: hidden;
}
.select {
    width: 10%;
    height: 40px;
    float: left;
}
.word {
    width: 10%;
    float: right;
    padding-top: 10px;
}
.word span {
    display: block;
    float: left;
    margin-left: 10px;
    font:14px 'microsoft yahei';
    padding-right:10px;
    cursor: pointer;
}
.word span:first-of-type {
    border-right: 1px solid #eee;
}
.word span.active {
    color: #0084ff
}
.btn {
   width: 28%;
    float: right;
    margin-right: 1%;
    margin-top: 4px;
}
.search-input {
    width: 60%;
}
.el-input--small .el-input__inner {
    height: 40px!important;
    line-height: 40px;
}
.search-button {
    width: 20%;
}

.invitation-content {
    width: 100%;
    border: 1px solid #eee;
    overflow: hidden;
    margin-bottom: 40px;
}
.invitation-title {
    width: 100%;
    height: 19px;
    padding:20px;
    overflow: hidden;
    position: relative;
    border-bottom: 1px solid #eee;
}
.invitation-title span {
    width: 60px;
    height: 20px;
    display: inline-block;
    cursor: pointer;
    float: left;
    text-align: center;
    margin-left: 10px;
    font: 14px "microsoft yahei";
}
.active {
    color: #fff;
}

.invitation-body {
    width: 100%;
    height: 80px;
    padding: 20px;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    overflow: hidden;
}

.theme {
    width: 53%;
    margin-left: 2%;
    float: left;
    margin:0;
    text-align: left
}
.theme h3 {
    font:14px 'microsoft yahei';
    text-align: left;
    margin: 0;
    margin-left: 4px;
    cursor: pointer;
    position: relative;
}

.theme p {
    font:12px 'microsoft yahei';
    margin-top:6px;
    text-align:left
}
.theme p span.distance {
    margin-left: 4px;
}
.theme p span.distance i {
    color: skyblue
}
.operator {
    margin-top: 8px;
    width: 10%;
    overflow: hidden;
    float: right;
    /* padding-left: 20px; */
    box-sizing: border-box
}
.operator span {
    display: block;
    font: 12px 'microsoft yahei';
    float: left;
    color: #0084ff;
    line-height: 24px;
    cursor: pointer;
}
.operator span.delete{
    color: #ff3040
}
.operator span.delete,.operator span.distance {
    margin-left: 15px;
}
.state {
    overflow: hidden;
    float: right;
}
.state span {
    display: block;
    width: 60px;
    height: 40px;
    margin-left: 10px;
    text-align: center;
    font:12px/20px 'microsoft yahei';
    background-color: #eee;
    float: left;
}
.footerPage {
    padding-right: 10px;
}
.footerPage .el-pagination {
    margin: 20px 0;
    float: right;
}
.sectionBody .sectiontheme .userbody {
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
    /* cursor: pointer; */
}
.sectionBody .sectiontheme .userbody span.border {
    border-right: 1px solid #eee;
}
.sectionBody .sectiontheme .userbody span i {
    font-style: normal;
    color: #2D97FF;
}
 .title-category-list {
    /* border-bottom: 1px solid #eee; */
    box-sizing: border-box;
    overflow: hidden;
 }
 .title-category-list-select {
        float: left;
        margin-left: 30px;
        cursor: pointer;
    }
.title-category-list-select-active {
        color:#0084ff !important;
        border-bottom: 2px solid #0084ff!important; 
    }
</style>

