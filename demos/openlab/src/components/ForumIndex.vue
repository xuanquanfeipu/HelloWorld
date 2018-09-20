<template>
  <div class="forumIndex-content" v-if="caseType==='forumIndex'">
            <div class="forum-content">
                <el-row>
                    <el-col :span="2">今日发帖：{{topicCount}}</el-col>
                    <el-col :span="2" :offset="1">今日回复：{{replyCount}}</el-col>
                </el-row>
                <!-- 最新贴子主体 -->
                <el-row>
                    <el-col :span="18">
                        <div class="invitation-content">
                            <div class="invitation-title">
                                <span @click="invitation('url','#new','new')" id="new" class="active">最新</span>
                                <span @click="invitation('url','#essence','nice')" id="essence">精华</span>
                                <div class="btnGroup">
                                    <el-button type="primary" @click="isForbidden">发表新帖子</el-button>
                                </div>
                            </div>
                            <div class="invitation-body" v-for="(item,index) in invitationBody" :key="index">
                                <!-- 用户头像 -->
                                <!-- <div class="head-portrait">
                                    <img :src="item.imgUrl">
                                </div> -->
                                <!-- 帖子主题 -->
                                <div class="theme" style="padding-left:20px">
                                    <div class="subtitle">
                                        <span class="top" v-show="item.top==1">置顶</span><span class="main" v-show="item.nice==1">精华</span>
                                    </div>
                                    <h3 @click.stop="toPath('/invitationDetail',{topicId:item.id,customerId:item.customerId,id:item.moduleId})" :class="{'leftPadding':((item.top == 1) && (item.nice != 1)||(item.top != 1) && (item.nice == 1)),'leftpadding':(item.top == 1) && (item.nice == 1),'Leftpadding':(item.top != 1) &&(item.nice != 1)}" :title="item.title">
                                    {{item.title}}
                                    </h3>
                                    <p>
                                    <span>{{item.customerName}}</span>
                                    <!-- item.createTime -->
                                    <span class="distance">{{ item.createTime | fliterDate}}</span>
                                    <span class="distance" style="cursor:pointer" @click="toPath('/sectionDetail',{id:item.moduleId})">发表版块: <i style="font-style:normal">{{item.moduleName}}</i></span>
                                    <span class="distance">最后回复: {{item.lastReplyTime | fliterDate}}</span>
                                    </p>
                                </div>
                                <!-- 帖子动态 -->
                                <div class="state">
                                    <span>浏览<br>{{item.pv}}</span>
                                    <span>回复<br>{{item.replyCount}}</span>
                                </div>
                            </div>
                            <div class="footerPage">
                                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                                    :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total">
                                </el-pagination>
                            </div>
                        </div>
                    </el-col>
                    <!-- 版块推荐,我的关注,活跃用户部分 -->
                    <el-col :span="6">
                        <!-- 版块推荐 -->
                        <div class="sectionRecommend">
                            <h3>版块推荐</h3>
                            <div class="block" style="position:relative">
                                <span v-for="(item,index) in sectionList" :key="index" @click="toPath('/sectionDetail',{id:item.id})" :title="item.name">{{item.name}}</span>
                            </div>
                        </div>
                        <!-- 我的关注 -->
                        <div class="sectionRecommend" v-show="sectionRecommendflag">
                            <h3>我的关注</h3>
                            <div class="block">
                                <span v-for="(item,index) in tailorList" :key="index" @click="toPath('/sectionDetail',{id:item.id})" :title="item.name">{{item.name}}</span>
                            </div>
                        </div>
                        <!-- 活跃用户 -->
                        <div class="sectionRecommend">
                            <h3>活跃用户</h3>
                            <div class="users" v-for="(item,index) in userList" :key="index">
                                <div class="userImg">
                                    <!-- <img :src="ImgUserUrl+1"> -->
                                </div>
                                <div class="userBody">
                                    <h4 @click="toURL(item.id)">{{item.name}}</h4>
                                    <p>
                                        <span>发帖: {{item.topicCount}}</span>
                                        <span class="distance">回复: {{item.replyCount}}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
</template>
<script>
export default {
  data(){
      return {
        caseType:'forumIndex',
        customid:sessionStorage.getItem('customerId'),
        pageSizes: [10, 20, 30, 40],
        pageSize: 10,
        currentPage: 1,
        total: 0,
        sectionList:[],//版块推荐列表
        invitationBody:[],//最新帖子列表,精华帖子列表
        userList:[],//活跃用户列表
        tailorList:[],//关注版块列表
        type:'new',
        replyCount:'',
        topicCount:'',
        startTime:'',
        sectionRecommendflag:true,
        ImgUserUrl:''
      }
  },
  mounted(){
      this.invitationCount();
      this.activeList();
      this.isUserLogin();
      this.getUserImg()
      this.invitationList({},'new');
      this.getSectionList();
  },
  methods:{
      //判断是否是被禁言用户
      isForbidden(){
        var _this = this;
        this.$http({
            url:'topic/isForbid'+'?date='+new Date().getTime(),
            method:'get',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken'),
            }
        }).then(function(res){
            if(sessionStorage.getItem("userId")== ''||sessionStorage.getItem("userId")== undefined ||sessionStorage.getItem("userId")== null){
              _this.$message('请先登录!');
          }
            else if(0 == res.data.returnCode){
                if(res.data.data == false){
                    _this.toPath('/newInvitation')
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
       toURL(id){
           if(sessionStorage.getItem("userId")== ''||sessionStorage.getItem("userId")== undefined ||sessionStorage.getItem("userId")== null){
              this.$message('请先登录!');
          }
          else if(this.customid != id){
              this.toPath('/personalCenter',{userid:id,customerId:id})
          }else{
              this.toPath('/peopleCenter/personalHomepage')
          }
      },
      //用户头像展示
      getUserImg(){
          this.ImgUserUrl = this.GLOBAL.BASE_URL.substring(0,26)+'isvportal/bbsuser/avatar/'
      },
    invitation(url,selected,type){
        this.type= type;
        $(".invitation-title").find("span").each(function(){
            $(this).removeClass("active")
        })
        $(selected).addClass("active")
        this.invitationList({},type)
    },
    handleSizeChange(val){
        window.scrollTo(0, 0); //初始化页面在最顶部
        this.pageSize = val;
        this.currentPage = 1;
        var type = this.type
        this.invitationList({
            start:0,
            totalCount:this.total,
            limit:this.pageSize,
            sort:''
        },type)
        window.scrollTo(0, 0); //初始化页面在最顶部
    },
    handleCurrentChange(val){
        this.currentPage = val;
        var type = this.type
          this.invitationList({
          start: this.pageSize * (this.currentPage - 1),
          limit: this.pageSize,
          totalCount:this.total,
          sort:''
        },type);
        window.scrollTo(0, 0); //初始化页面在最顶部
    },
    toPath(url,params){
        this.$router.push({
            path:url,
            query:params
        });
    },
    //版块推荐列表
    getSectionList(){
        var _this = this;
        this.$http({
            url:'bbsIndex/list/module/recommend'+'?date='+new Date().getTime(),
            method:'get',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken'),
            }
        }).then(function(res){
            if(0 == res.data.returnCode){
                _this.sectionList = res.data.data
            }else {
                _this.$message.error(res.data.mesaage ||'查询失败！');
            }
        })
    },
    //最新帖子列表,精华帖子列表
    invitationList:function({
        start=0,
        totalCount=0,
        limit=10,
        sort=''
    },type){
        var url = '';
        if(type=='new'){
            url= 'bbsIndex/list/topic/new'
        }else if(type == 'nice'){
            url= 'bbsIndex/list/topic/nice'
        }else{
            url= 'bbsIndex/list/topic/new'
        }
        var _this = this;
        this.$http({
            url:url+'?start='+start+'&totalCount='+totalCount+'&limit='+limit+'&sort='+sort+'&date='+new Date().getTime(),
            method:'get',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken'),
            }
        }).then(function(res){
            if(0 == res.data.returnCode){
                console.log(res)
                var that = _this
                _this.total = res.data.page.totalCount;
                _this.invitationBody = res.data.data;
                _this.invitationBody = _this.invitationBody.map(function(item){
                   return {
                       createTime:item.createTime,
                       customerId:item.customerId,
                       customerName:item.customerName,
                       id:item.id,
                       lastReplyTime:item.lastReplyTime,
                       moduleId:item.moduleId,
                       moduleName:item.moduleName,
                       nice:item.nice,
                       pv:item.pv,
                       replyCount:item.replyCount,
                       title:item.title,
                       top:item.top
                   }
               })
              
            }else{
                _this.$message.error(res.data.mesaage ||'查询失败！');
            }
        })
    },
    //页面加载判断用户有没有登录
    isUserLogin(){
        if(sessionStorage.getItem("userId")== ''||sessionStorage.getItem("userId")==undefined ||sessionStorage.getItem("userId")==null){
            this.sectionRecommendflag = false
        }else {
            this.sectionRecommendflag = true
            this.tailor()
        }
    },
    //关注版块列表
    tailor(){
        var _this = this;
        this.$http({
            url:'bbsIndex/list/module/tailor'+'?date='+new Date().getTime(),
            method:'get',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken'),
            }
        }).then(function(res){
            // console.log(res)
            if(0 == res.data.returnCode){
                _this.tailorList = res.data.data
            }else {
                _this.$message.error(res.data.mesaage ||'查询失败！');
            }
        })
    },
    //活跃用户列表
    activeList(){
        var _this = this;
        this.$http({
            url:'bbsIndex/list/user/active'+'?date='+new Date().getTime(),
            method:'get',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken'),
            }
        }).then(function(res){
            // console.log(res)
            if(0 == res.data.returnCode){
                _this.userList = res.data.data
            }else {
                _this.$message.error(res.data.mesaage|| '查询失败！');
            }
        })
    },
    //今日发帖,回贴数
    invitationCount(){
       var _this = this;
        this.$http({
            url:'bbsIndex/today/all'+'?date='+new Date().getTime(),
            method:'get',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken'),
            }
        }).then(function(res){
            if(0 == res.data.returnCode){
            //    console.log(res)
               _this.topicCount = res.data.data.topicCount;
               _this.replyCount = res.data.data.replyCount;
            }else {
                _this.$message.error(res.data.mesaage ||'查询失败！');
            }
        }) 
    },
   
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
      },
      filterContent:function(value){
          if(value.length>7){
              return value.substring(0,6)+"..."
          }else{
              return value
          }
      }
  },
  
}
</script>
<style scoped>
.leftPadding {
    padding-left: 46px;
}
.leftpadding{
    padding-left: 90px;
}
.Leftpadding {
    padding-left: 0px;
}
    .forum-content {
        font: 14px/28px "microsoft yahei";
        padding: 0 2%;
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
        background-color: #0084ff;
    }
    .btnGroup {
        position: absolute;
        top: 10px;
        right: 60px;
    }
    .invitation-body {
        width: 100%;
        height: 80px;
        padding: 20px;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        overflow: hidden;
        position: relative;
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
        width: 53%;
        margin-left: 2%;
        float: left;
        margin:0;
        text-align: left
    }
    .theme h3 {
        width: 100%;
        font:14px 'microsoft yahei';
        text-align: left;
        margin: 0;
        cursor: pointer;
        /* padding-left: 100px; */
        position: relative;
        overflow:hidden;
        text-overflow: ellipsis;
        white-space:nowrap
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
    .state {
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
    .sectionRecommend {
        width: 86%;
        border-top: 1px solid #eee;
        border-right: 1px solid #eee;
        border-left: 1px solid #eee;
        margin: 0 9% 5% 5%;
    }
    .sectionRecommend h3 {
        width: 100%;
        height: 40px;
        text-align: center;
        font:14px/40px 'microsoft yahei';
        border-bottom:1px solid #eee;
        margin: 0;
        background-color: #f7f8fa;
    }
    .sectionRecommend .block {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        box-sizing: border-box;
    }
    
    .sectionRecommend .block span {
        display: block;
        width: 50%;
        height: 40px;
        box-sizing: border-box;
        text-align: center;
        font:12px/40px 'microsoft yahei';
        border-right: 1px solid #eee;
        border-bottom: 1px solid #eee;
        cursor: pointer;
        overflow:hidden;
        text-overflow: ellipsis;
        white-space:nowrap
    }
    .sectionRecommend .block span:nth-child(even) {
        border-right: none;
    }
    .sectionRecommend .users {
        width:100%;
        padding: 10px 8px;
        height: 60px;
        box-sizing: border-box;
        border-bottom:1px solid #eee;
        overflow: hidden;
    }
    .sectionRecommend .users .userImg {
        width: 20%;
        float: left;
    }
    .sectionRecommend .users .userImg img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    .sectionRecommend .users .userBody {
        width: 60%;
        float: left;
        margin:0;
        margin-left: 12%;
        text-align: left
    }
    .sectionRecommend .users .userBody h4 {
        font:14px 'microsoft yahei';
        text-align: left;
        margin: 0;
        cursor: pointer;
    }
    .sectionRecommend .users .userBody p {
        font:12px 'microsoft yahei';
        margin-top:6px;
        text-align:left;
        float: left;
    }
    .sectionRecommend .users .userBody p span.distance {
        margin-left: 4px;
    }
    .subtitle {
    position: absolute;
    top: 16px;
    left: 30px;
}
.subtitle span {
    display: block;
    text-align: center;
    font:12px 'microsoft yahei';
    color: #fff;
    line-height: 24px;
    width: 40px;
    float: left;
    margin: 0;
    border-radius: 8px;
}
.subtitle span.top {
    background-color: #0084ff;
}
.subtitle span.main {
    margin-left: 8px;
    background-color: #ff3040;
}
</style>

