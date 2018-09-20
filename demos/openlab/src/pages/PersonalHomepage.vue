<template>
  <div class="page resource-page" style="overflow:hidden">
   <div class="content" style="margin-top:0;margin-left:1%;width:98%;overflow:auto;height:500px">
       <el-row>
            <div class="personal">
                <div class="personal-list-select personal-list-select-active"  id="postList">
                    <a class="text-style" @click="selectListType('post','#postList')">
                        <div><span>我的帖子</span></div>
                    </a>
                </div>
                <div class="personal-list-select" id="replyList">
                    <a class="text-style" @click="selectListType('reply','#replyList')">
                        <div><span>我的回复</span></div>
                    </a>
                </div>
                <div class="personal-list-select"  id="draftList">
                    <a class="text-style" @click="selectListType('draft','#draftList')">
                        <div><span>我的草稿</span></div>
                    </a>
                </div>
                <div class="personal-list-select" id="storeList">
                    <a class="text-style" @click="selectListType('store','#storeList')">
                        <div><span>我的收藏</span></div>
                    </a>
                </div>
                <div class="personal-list-select"  id="attentionList">
                    <a class="text-style" @click="selectListType('attention','#attentionList')">
                        <div><span>我的关注</span></div>
                    </a>
                </div>
            </div>
       </el-row>
       <el-row>
            <el-col>
                <div class="sectionbody" id="siftDiv">
                    <div class="sectiontop" v-if="contentList != 'attention'">
                        <div class="select" v-show="contentList != 'reply'&& contentList != 'draft'"> 
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
                            <el-input  placeholder="搜索" v-model="keyWords" class="search-input" size="mini"></el-input>
                            <el-button  type="primary" class="search-button" icon="el-icon-search" @click="search" size="mini"></el-button>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
         <el-row>
                <el-col>
                    <div class="invitation-content">
                        <!-- 我的帖子 -->
                        <div v-if="contentList == 'post'">
                            <div class="invitation-body" v-for="(item,index) in invitationBody" :key="index">
                            <!-- 帖子主题 -->
                            <div class="theme">
                                <h3 @click.stop="toPath('/invitationDetail',{topicId:item.id,customerId:userID,id:item.moduleId})" :title="item.title">{{item.title}}
                                    <!-- <div class="subtitle" v-show="isShowSubtitle">
                                        <span class="top" v-show="top">置顶</span><span class="main" v-show="main">精华</span>
                                    </div> -->
                                </h3>
                                <p>
                                <!-- <span>{{item.author}}</span> -->
                                <span class="distance">{{item.createTime | fliterDate}}</span>
                                <span class="distance">发表版块: <i @click.stop="toPath('/sectionDetail',{id:item.moduleId})">{{item.mouleName}}</i></span>
                                </p>
                            </div>
                           
                            <!-- 帖子动态 -->
                            <div class="state">
                                <span>浏览<br>{{item.pv}}</span>
                                <span>回复<br>{{item.postCount}}</span>
                            </div>
                             <!-- 帖子操作 -->
                            <div class="operator">
                               <span class="delete" @click="deleteTopic(item.id,'bbsuser/delTopic/')">删除</span>
                            </div>
                            <div class="state">
                                <el-button type="text" @click="isForbidden(item.id)">编辑</el-button>
                            </div>
                            </div>
                        </div>
                        <!-- 我的回复 -->
                         <div v-if="contentList == 'reply'">
                            <div class="invitation-body" v-for="(item,index) in invitationBody" :key="index">
                            <!-- 帖子主题 -->
                            <div class="theme">
                                <h3 @click.stop="toURL(item.topicId,item.topicState,item.moduleId)" v-html="item.content" style="overflow:visible;text-overflow: clip;white-space:normal">{{item.content}}
                                    <!-- <div class="subtitle" v-show="isShowSubtitle">
                                        <span class="top" v-show="top">置顶</span><span class="main" v-show="main">精华</span>
                                    </div> -->
                                </h3>
                                <p>
                                <span class="distance">{{item.createTime | fliterDate}}</span>
                                <span class="distance" @click.stop="toPath('/invitationDetail',{topicId:item.topicId,customerId:userID,id:item.moduleId})">回复帖子: <i>{{item.topicTitle}}</i></span>
                                </p>
                            </div>
                       
                            <!-- 帖子动态 -->
                            <div class="operator">
                               <span class="delete" @click="deleteTopic(item.id,'bbsuser/delTopicPost/')">删除</span>
                            </div>
                            <div class="state">
                                <el-button type="text" @click="isForbiddenEdit(item.id,item.content)">编辑</el-button>
                            </div>
                             
                            </div>
                        </div>
                         <div v-if="contentList == 'draft'">
                            <div class="invitation-body" v-for="(item,index) in invitationBody" :key="index">
                            <!-- 帖子主题 -->
                            <div class="theme">
                                <h3 @click.stop="toPath('/invitationDetail',{topicId:item.id,customerId:userID,id:item.moduleId})" :title="item.title">{{item.title}}
                                    <!-- <div class="subtitle" v-show="isShowSubtitle">
                                        <span class="top" v-show="top">置顶</span><span class="main" v-show="main">精华</span>
                                    </div> -->
                                </h3>
                                <p>
                                <span class="distance">{{item.createTime | fliterDate}}</span>
                                </p>
                            </div>
                       
                            <!-- 帖子动态 -->
                             <div class="operator">
                               <span class="delete" @click="deleteTopic(item.id,'bbsuser/draft/')">删除</span>
                            </div>
                            </div>
                        </div>
                        <!-- 我的收藏 -->
                         <div v-if="contentList == 'store'">
                            <div class="invitation-body" v-for="(item,index) in invitationBody" :key="index">
                            <!-- 帖子主题 -->
                            <div class="theme">
                                <h3 @click.stop="toPath('/invitationDetail',{topicId:item.id,customerId:userID,id:item.moduleId})" :title="item.title">{{item.title}}
                                </h3>
                                <p>
                                <!-- <span>{{item.author}}</span> -->
                                <span class="distance">{{item.createTime | fliterDate}}</span>
                                <span class="distance">发表版块: <i @click.stop="toPath('/sectionDetail',{id:item.moduleId})">{{item.mouleName}}</i></span>
                                </p>
                            </div>
                            
                            <!-- 帖子动态 -->
                            <div class="state">
                                <span>浏览<br>{{item.pv}}</span>
                                <span>回复<br>{{item.postCount}}</span>
                            </div>
                            <!-- 帖子操作 -->
                            <div class="operator storeDiv">
                                <span class="delete" @click="cancelStore(item.id)">取消收藏</span>
                            </div>
                            </div>
                        </div>
                        <!-- 我的关注 -->
                        <div v-if="contentList == 'attention'">
                            <el-table :data="tableData"  align="left"  border style="width: 94%; margin:0 3%; margin-bottom:2%" :header-cell-class-name="tableheaderClassName" > 
                            <el-table-column  prop="moduleName"  label="版块名称" width="250">  </el-table-column>
                            <el-table-column  prop="moduleTypeName"  label="版块类别"   width="278">  </el-table-column>
                            <el-table-column  prop="topictCount"  label="总帖子"  width="130">  </el-table-column>
                            <el-table-column  prop="replyCount"  label="总回复"   width="130">  </el-table-column>
                            <el-table-column  prop="createTime"  label="操作时间"   width="220">  </el-table-column>
                             <el-table-column   label="操作">
                                 <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="text" size="small">取消关注</el-button>
                                </template>
                            </el-table-column>
                            </el-table>
                        </div>
                        <div class="footerPage" v-if="contentList != 'attention'">
                            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                                :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total">
                            </el-pagination>
                        </div>
                    </div>
                    <el-dialog title="编辑回复" :visible.sync="dialogFormVisible" :modal="false">
                        <div>
                            <UE :defaultMsg=defaultMsg :config=config ref="ue" v-if="dialogFormVisible"></UE>
                        </div>
                        <div slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="editSave">保 存</el-button>
                            <el-button style="border:1px solid #409eff " @click="cancel">取 消</el-button>
                           
                        </div>
                    </el-dialog>
                </el-col>
            </el-row>
   </div>
  </div>
</template>

<script scoped>
  import '../../static/lib/jquery.jOrgChart.css';
  import '../../static/lib/switchery.css';
  import UE from '../components/UE'
  require('../../static/lib/jquery.jOrgChart.js');
  export default {
    name: 'Resource',
    data() {

      return{
        contentList:"post",
        postId:'',
        userID:sessionStorage.getItem('customerId'),
        isShowSubtitle:false,//普通用户登录,总体控制帖子展示置顶和精华
        top:false,//普通用户登录,控制帖子展示置顶
        main:false,//普通用户登录,控制帖子展示精华
        isAttention:true,
        pageSizes: [10, 20, 30, 40],
        pageSize: 10,
        currentPage: 1,
        total: 0,
        isShow:false,
        form:{
            id:"",
            content:""
        },
        options:[{
          value: 'postCount',
          label: '回复数'
        },{
          value: 'pv',
          label: '浏览量'
        }],
        value: 'createTime',
        keyWords:'',
        invitationBody:[],
        tableData:[],
        paramList:{
            title:"",
            start:0,
            totalCount:0,
            limit:10,
            sort:"createTime",
            filter:""
        },
        listUrl:"bbsuser/topic",
        defaultMsg: '',
        dialogFormVisible:false,
        config: {
        initialFrameWidth: null,
        zIndex:30000,
        initialFrameHeight: 400,
        elementPathEnabled:false,//是否启用元素路劲
        wordCount:false,//是否开启字数统计
        autoFloatEnabled:false//是否保持toolbar的位置不动
    }
      }

    },
    mounted(){
        this.getList(this.paramList,this.listUrl);
    },
    methods: {
        //判断是否是被禁言用户
      isForbidden(id){
        var _this = this;
        this.$http({
            url:'topic/isForbid'+'?date='+new Date().getTime(),
            method:'get',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken'),
            }
        }).then(function(res){
            if(0 == res.data.returnCode){
                if(res.data.data == false){
                    _this.toPath('/myTopicEdit',{topicid:id,state:1})
                }else{
                    _this.$message.error(res.data.mesaage ||'您被禁言,请联系管理员');
                }
            }else if(1011 == res.returnCode){
                _this.$message('您需要登录后才能发表帖子!');
            }else{
                _this.$message.error('操作失败!')
            }
        })
      }, 
      isForbiddenEdit(id,content){
        var _this = this;
        this.$http({
            url:'topic/isForbid'+'?date='+new Date().getTime(),
            method:'get',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken'),
            }
        }).then(function(res){
            if(0 == res.data.returnCode){
                if(res.data.data == false){
                    _this.edit(id,content);
                }else{
                    _this.$message.error(res.data.mesaage ||'您被禁言,请联系管理员');
                }
            }else if(1011 == res.returnCode){
                _this.$message('您需要登录后才能发表帖子!');
            }else{
                _this.$message.error('操作失败!')
            }
        })
      }, 
        toURL(id,state,moduleid){
            if(id != null && id != ""){
                if(state == 0){
                    this.$message.error('该帖子已经被管理员删除');
                }else{
                     this.toPath('/invitationDetail',{topicId:id,customerId:this.userID,id:moduleid})
                }  
            }else{
                this.$message.error('该帖子不存在');
            }
            
        },
        tableheaderClassName({ row, rowIndex }) {
          return "table-head-th";
        }, 
        toPath(url,params){
        this.$router.push({
            path:url,
            query:params
        });
    },    
       selectListType(list,selected){
        $(".personal").find("div.personal-list-select").each(function(){
            $(this).removeClass("personal-list-select-active");
        })
        this.contentList = list;
        $(selected).addClass("personal-list-select-active");
        switch(list){
            case "post":
                this.listUrl = "bbsuser/topic";
                break; 
            case "reply":
                this.listUrl = "bbsuser/topicPost";break; 
            case "draft":
                this.listUrl = "bbsuser/draft";break; 
            case "store":
                this.listUrl = "bbsuser/favourite";break; 
            case "attention":
                $("#siftDiv").removeClass("sectionbody");
                $("#siftDiv").addClass("attentionStyle");
                this.myFocus();break;      
        }
        if(list != 'attention'){
            this.currentPage = 1;
            $("#siftDiv").removeClass("attentionStyle");
            $("#siftDiv").addClass("sectionbody");
            this.keyWords = "";
            this.value = "createTime";
            this.getList({
            title:"",
            start:0,
            totalCount:0,
            limit:10,
            sort:"createTime",
            filter:""
        }, this.listUrl);
        }
       
       
    },
    search(){
        this.paramList.title = this.keyWords;
        this.getList(this.paramList,this.listUrl);
    },
    edit(id,content){
        var _this = this;
        this.dialogFormVisible = true;
        this.defaultMsg = content;
        this.postId = id;
    },
    cancel(){
        this.dialogFormVisible = false;
    },
    editSave(){
        var _this = this;
        var param ={
            id:this.postId,
            content:this.$refs.ue.getUEContent()
        }
        console.log(param);
         var qs = require('qs')
        this.$http.post("topic/updateReply/"+this.postId,qs.stringify(param),{
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken'),
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(function(res){
            if(0 == res.data.returnCode){
             _this.dialogFormVisible = false;
             _this.getList(_this.paramList,_this.listUrl);
            }else if(1011 == res.data.returnCode){
                    _this.$message.error('会话已过期，请重新登录！');
                    _this.$router.push(
                        {path:'/login'}
                )
            }
        }) 
         

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
    getList(param,url_list){
        var _this = this;
        if(url_list == "bbsuser/topicPost"){
            param.sort = "createTime";
        }
        var str = "?";
         $.each(param,function(item){
            str += item+"="+param[item]+"&";
        });
        str = str.slice(0,-1);
         this.$http({
            url:url_list+str+'&date='+new Date().getTime(),
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
                    _this.$message.error('会话已过期，请重新登录！');
                    _this.$router.push(
                        {path:'/login'}
                )
            }else{
                 _this.total = 0;
                _this.invitationBody = {};
            }
        })
    },
     selectList(){
        this.paramList.sort = this.value;
        this.getList(this.paramList,this.listUrl);
    },
    deleteTopic(id,urlStr){
          var _this = this;
          var confirmStr = "";
          if(urlStr == "bbsuser/delTopic/"){
              confirmStr="帖子？";
          }else if(urlStr == "bbsuser/delTopicPost/"){
              confirmStr="回复？";
          } else{
              confirmStr = "草稿?";
          }
          this.$confirm('是否删除该'+confirmStr, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            showClose:false,
            cancelButtonClass:'cancel',
            confirmButtonClass:'confirm'
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
    myFocus(){
        var _this = this;
         this.$http({
            url:'bbsuser/tailorModule'+'?date='+new Date().getTime(),
            method:'get',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken')
            }
        }).then(function(res){
            if(0 == res.data.returnCode){
              _this.tableData =res.data.data;
            }else if(1011 == res.data.returnCode){
                    _this.$message.error('会话已过期，请重新登录！');
                    _this.$router.push(
                        {path:'/login'}
                )
            }else{
                _this.invitationBody = {};
            }
        })
    },
    cancelStore(id){
        var _this = this;
        this.$http({
            url:'topic/cancelCollection/'+id,
            method:'post',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken'),
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(function(res){
            if(0 == res.data.returnCode){
                 _this.$message.success('取消收藏成功！');
             _this.getList(_this.paramList,_this.listUrl);
            }else if(1011 == res.data.returnCode){
                    _this.$message.error('会话已过期，请重新登录！');
                    _this.$router.push(
                        {path:'/login'}
                )
            }
        }) 
    },
    handleClick(row){
        console.log(row);
        var _this = this;
        this.$http({
            url:'bbsModule/module/tailor/cancel/'+row.moduleId,
            method:'post',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken'),
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(function(res){
            if(0 == res.data.returnCode){
                 _this.$message.success('取消关注成功！');
                _this.myFocus();
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
    components: {UE}
  }

</script>
<style scoped>
  /* @import url('../../static/lib/switchery.css'); */
  .page.resource-page h2 {
    text-align: left;
    font-weight: normal;
    margin-bottom: 34px;
    font-size: 24px;
    margin-left: 8%;
  }
.personal{
    padding: 15px 0;
    
  }
.personal-list {
    /* border-bottom: 1px solid #eee; */
    box-sizing: border-box;
    overflow: hidden;
 }
 .personal-list-select {
        float: left;
        margin-left: 30px;
        cursor: pointer;
    }
.personal-list-select-active {
        color:#0084ff !important;
        border-bottom: 2px solid #0084ff!important; 
    }
.text-style{
    padding-bottom: 15px!important;
}
.page.resource-page .content{
     margin-left: 8%;
     border: 1px solid #eee;
}
.sectionbody {
    width: 100%;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    overflow: hidden;
    /* margin-bottom: 20px; */

}
.attentionStyle{
    width: 100%;
    border-top: 1px solid #eee;
    /* border-bottom: 1px solid #eee; */
    box-sizing: border-box;
    overflow: hidden;
    margin-bottom: 20px;
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
.btn {
    width: 28%;
    float: right;
    margin-right: 1%;
    margin-top: 4px;
}
.search-input {
    width: 60%;
    display: inline-table!important;
}
.el-input--small .el-input__inner {
    height: 40px!important;
    line-height: 40px;
}
.search-button {
    width: 20%;
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
    /* height: 76px; */
    padding: 16px;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    overflow: hidden;
}
.head-portrait {
    width: 10%;
    float: left;
    text-align: left;
    padding-left: 10px;
}
.head-portrait img {
    width: 40px;
    height: 40px;
}
.theme {
    width: 65%;
    margin-left: 2%;
    float: left;
    margin:0;
    text-align: left
}
.theme h3 {
    width: 100%;
    font:15px 'microsoft yahei';
    text-align: left;
    margin: 0;
    margin-left: 4px;
    cursor: pointer;
    position: relative;
    overflow:hidden;
    text-overflow: ellipsis;
    white-space:nowrap
}
.theme>h3>div.subtitle {
    position: absolute;
    top: 0;
    right: 80px;
}
.theme>h3>div.subtitle>span {
    display: block;
    color: #fff;
    font:14px 'microsoft yahei';
    width: 40px;
    height: 20px;
    float: left;
    line-height: 20px;
    text-align: center;
    cursor: none;
}
.theme>h3>div.subtitle>span.top {
    background-color: #409eff;
}
.theme>h3>div.subtitle>span.main {
    margin: 0;
    margin-left: 4px;
    background-color: #ff3040;
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
    color: skyblue;
    cursor: pointer;
}
.operator {
    margin-top: 8px;
    width: 4%;
    overflow: hidden;
    float: right;
    /* padding-left: 20px; */
    box-sizing: border-box
}
.storeDiv{
    width: 10%;
}

.operator span {
    display: block;
    font: 13px 'microsoft yahei';
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
.storeDiv span.delete{
     margin-left: 60px;
}
.state {
    overflow: hidden;
    float: right;
}
.state .el-button{
    color: #0084ff;
    padding-top: 13px;
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
.state a{
    font: 14px 'microsoft yahei';
    color: #0084ff;
    line-height: 24px;
    text-decoration: none;
}
.state a.delete{
    color: #ff3040
}
.footerPage {
    padding-right: 10px;
}
.footerPage .el-pagination {
    margin: 20px 0;
    float: right;
}


</style>
<style>
.el-table .table-head-th{
        background-color:#dce9f5;
        font-size: small;
    } 
.el-table td, .el-table th {
    padding:7px 0;
}   
.el-table td{
    font-size: small;
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
</style>

