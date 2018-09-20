<template>
    <div class="forum-container" @mousewheel="goTop">
      <div class="forum-all">
            <forum-title @selectTitleType='showType'></forum-title>
            <forum-index v-if="isShow"></forum-index>
            <div v-if="!isShow">
                <el-row>
                    <el-col :span="24" style="padding:20px;box-sizing: border-box;position:relative">
                        <div class="breadLink">
                            <el-breadcrumb separator-class="el-icon-arrow-right">
                                <el-breadcrumb-item :to="{ path: '/forum' }" class="fontcolor">社区</el-breadcrumb-item>
                                <el-breadcrumb-item  :to="{path:'/sectionDetail',query:{id:id}}">{{moduleName}}</el-breadcrumb-item>
                                <el-breadcrumb-item><span style="color: #008fd5;">帖子详情</span></el-breadcrumb-item>
                            </el-breadcrumb>
                        </div>
                        <div class="btn" >
                                <el-button type='primary' style="float:left;background-color:#008FD5;width:96px" @click="cancelTop($event)" v-show="isAdmin">{{topMessage}}</el-button>
                                <el-button type='primary' style="float:left;background-color:#0084FF;width:96px" @click="cancelNice($event)" v-show="isAdmin">{{niceMessage}}</el-button>
                                <el-button type='primary' style="float:left;background-color:#0084FF;width:96px"  v-show="isPost" @click="isForbiddenPublish">发表</el-button>
                                <el-button type='primary' style="float:left;background-color:#0084FF;width:96px"  v-show="isEdit" @click="isForbiddenEdit">编辑</el-button>
                                <el-button type='primary' style="float:left;background-color:#E04436;width:96px" @click="dialogFormVisible = true" v-show="isDelete">删除</el-button>

                            <!-- 弹窗内容 -->
                            <el-dialog title="管理员删帖" :visible.sync="dialogFormVisible" center width="30%">
                                <el-form :model="form" ref="form" :rules="rules">
                                    <el-form-item label="帖子标题" :label-width="formLabelWidth">
                                        <el-input v-model="form.title" auto-complete="off" :disabled="true"></el-input>
                                    </el-form-item>
                                    <el-form-item label="删帖原因" :label-width="formLabelWidth" prop="reason">
                                        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.reason">
                                        </el-input>
                                    </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <el-button type="primary" @click="deleteInvitation('form')">确 定</el-button>
                                    <el-button @click="cancelDeleteInvitation('form')">取 消</el-button>
                                </div>
                            </el-dialog>
                        </div>
                    </el-col>
                </el-row>
                <!-- ???????? -->
                <el-row style="width:100%;overflow:hidden">
                    <div class="detaiContent">
                        <!-- ?????? -->
                        <div class="intro">
                            <div class="introtitle">
                                <div class="left">
                                    <h1>{{topicDetail.title}}
                                    </h1>
                                    <p>
                                        <span>{{topicDetail.createTime | fliterDate}}</span>
                                        <span class="distance">发表版块:<i>{{topicDetail.mouleName}}</i></span>
                                    </p>
                                </div>
                                <div class="subtitle">
                                    <span class="top" v-show="topicDetail.top=='1'">置顶</span><span class="main" v-show="topicDetail.nice=='1'">精华</span>
                                </div>
                                <div class="right">
                                    <span class="star" @click.stop="show" :class="{'fontcolororange':isActive}"><i class="el-icon-star-on"></i></span>
                                    <p class="operator"><span>浏览:  {{topicDetail.pv}}</span><span class="distance">回复:  {{topicDetail.postCount}}</span></p>
                                </div>
                            </div>

                            <div class="introbody">
                                <!-- <h3>云应用解决方案</h3> -->
                                <div class="desc" v-html="topicDetail.body">
                                    <!-- <pre>{{topicDetail.body}}</pre> -->
                                </div>
                                <div class="dowload" style="font:14px 'microsoft yahei';text-align:left;position:relative;boxsing-sizing:border-box;padding-bottom:40px;">
                                    <span style="margin-left:28px;" v-if="attachments.length>0">附件 :  
                                        <span style="cursor:pointer;font-style:normal;color:#0285FF;margin-left:40px;height:20px;display:block;margin-top:10px;position:relative;color:#000" v-for="(item,index) in attachments" :key="index" @click.stop="isDownload(item.attachId)">
                                            {{item.attachName}}
                                            <i class="el-icon-close" style="position:absolute;top:6px;right:20px;color:#ff3040" v-show="flagdelete" @click.stop="deletefile(item.attachId)"></i>
                                            <i class="el-icon-download" style="position:absolute;top:6px;right:0;color:#0084ff" v-show="flagdowload" @click.stop="isDownload(item.attachId)"></i>
                                        </span>
                                    </span>
                                    <div class="upfile" v-show="isEdit">
                                        <span>上传附件</span>
                                        <input type="file" id="file" @change="isForbiddenUpfile($event)">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- ???????? -->
                        <div class="comment">
                            <div class="invitation-content">
                            <div class="invitation-title">
                                <span @click="invitation('url','#new','desc')" id="new" class="active">最新</span>
                                <span @click="invitation('url','#essence','asc')" id="essence">正序</span>
                            </div>
                            <review :responseTopic="responseTopic" :isLogin="isLogin"  ref="review" @deleteRe ='resTopic({})' :isFlag='isFlag'></review>
                            <div class="footerPage">
                                <!-- v-on:subResponseInvitation="getChildData(obj)" -->
                                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                                    :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total">
                                </el-pagination>
                            </div>
                            </div>
                        </div>
                        <!-- ???????? -->
                        <div class="publish" v-if="isDraft">
                            <!-- <div class="user-portrait">
                                <img :src="ImgUserUrl+1">
                            </div> -->
                            <div class="uedit">
                                <UE :config=config ref="ue"></UE>
                            </div>
                            <div class="btnGroup">
                                <el-button type="primary" style="background-color:#10A386;width:100%" @click="isForbiddenResTopic()">回帖</el-button>
                            </div>
                        </div>
                    </div>
                    <div class="detailRight">
                        <div class="usercontent">
                            <div class="userImage"   @click.stop="toURL()">
                                <img :src="ImgUrl">
                            </div>
                            <h3>{{preventUserName}}</h3>
                            <div class="userbody">
                                <span class="border"><i>{{topicCount}}</i><br/>发帖</span>
                                <span><i>{{topicPostCount}}</i><br/>回复</span>
                            </div>
                        </div>
                        <div class="dynamic">
                            <h3>最近发表</h3>
                            <div class="article">
                                <span @click="toPath('/invitationDetail',{topicId:item.id,customerId:userid,id:item.moduleId})" v-for="(item,index) in loginInvitationLists" :key="index">> {{item.title | filterContent}}</span>
                            </div>
                        </div>
                    </div>
                    <!-- 侧边菜单栏 -->
                    <div class="blocks" :class="{'toTOP':scrollTop>=80 ?true:false}">
                        <!-- <span class="one" @click="replyInvitation()">回帖</span> -->
                        <span class="two" @click="isForbiddenResponse">发帖</span>
                        <span class="three" @click="backList()">返回列表</span>
                        <span class="back" v-show="isTop" @click="goback"><i class="el-icon-caret-top"></i><br/>顶部</span>
                    </div>
                </el-row>
            </div>
      </div>
    </div>
</template>
<script>
import ForumTitle from '../components/ForumTitle'
import ForumIndex from '../components/ForumIndex'
import UE from '../components/UE'
import Review from '../components/Review'
import store from '@/vuex/store'

export default {
  data(){
        var validatePass = (rule,value,callback)=>{
        if (!value) {
          return callback(new Error('删帖原因不能为空'));
        }else {
            callback()
        }
    }
      return {
        ImgUrl:'',
        id:this.$route.query.id,
        userId:sessionStorage.getItem('userId'),
        customid:sessionStorage.getItem('customerId'),
        obj:{},
        top:'',
        topMessage:'',
        nice:'',
        niceMessage:'',
        flagdelete:false,//版主和作者可删除
        flagdowload:false,//版主和作者可下载
        scrollTop:90,
        isShow:false,
        isActive:false,
        isTop:false,
        flag:false,
        isAdmin:false,//j置顶,精华
        isDelete:false,//删除
        isPost:false,//发表
        isEdit:false,//编辑
        isSelf:false,
        state:'',
        anonymous:'',
        postId:'',
        customerId:'',
        moduleName:'',
        pageSizes: [10, 20, 30, 40],
        pageSize: 10,
        currentPage: 1,
        total: 0,
        attachments:[],
        isLogin:false,
        isFlag:false,
        topicId:this.$route.query.topicId,
        userid:this.$route.query.customerId,//发帖人id
        dialogFormVisible:false,
        // topicId:48741,
        defaultMsg: '',//uedit默认显示内容
        topicDetail:[],//存放帖子详情数据
        responseTopic:[],//存放回复帖子列表
        form:{
            title:'',
            reason:''
        },
        rules:{
            reason:[{validator:validatePass,trigger:'blur'}]
        },
        moduleId:'',
        formLabelWidth: '68px',
        config: {
          initialFrameWidth: null,
          toolbars:[[
                    'undo', //撤销
                    'bold', //加粗
                    'italic', //斜体
                    'underline', //下划线
                    'strikethrough', //删除线
                    'formatmatch', //格式刷
                    'selectall', //全选
                    'print', //打印
                    'link', //超链接
                    'unlink', //取消链接
                    'fontfamily', //字体
                    'fontsize', //字号
                    'help', //帮助
                    'justifyleft', //居左对齐
                    'justifyright', //居右对齐
                    'justifycenter', //居中对齐
                    'justifyjustify', //两端对齐
                    'forecolor', //字体颜色
                    'backcolor', //背景色
                    'touppercase', //字母大写
                    'tolowercase', //字母小写
                        ]],
        //   toolbars:['fullscreen','source','undo','redo','bold'],
          initialFrameHeight: 200,
          elementPathEnabled:false,//是否启用元素路劲
          wordCount:false,//是否开启字数统计
          autoFloatEnabled:false//是否保持toolbar的位置不动
        },
        loginInvitationLists:[],
        moderator:false,
        topicCount:'',
        topicPostCount:'',
        presentUserId:'',
        preventUserName:'',
        file:'',
        isDraft:false,
        isState:'',
    }
  },
  store,
  mounted(){
        window.scrollTo(0, 0); //初始化页面在最顶部
        this.goTop();
        this.getTopicList();
        this.resTopic({});
        this.moderator = JSON.parse(sessionStorage.getItem('moderator'));
        this.getUserCount();
        this.loginInvitationList();
  },
  methods:{
      getUserImg(){
          var _this = this
          _this.ImgUrl = this.GLOBAL.BASE_URL.substring(0,26)+'isvportal/bbsuser/avatar/'+_this.customerId;
        //   console.log(_this.ImgUrl)
      },
      //判断是否是被禁言用户
      isForbiddenUpfile(){
        var _this = this;
        _this.file = event.target.files;
        this.$http({
            url:'topic/isForbid'+'?date='+new Date().getTime(),
            method:'get',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken'),
            }
        }).then(function(res){
            if(0 == res.data.returnCode){
                if(res.data.data == false){
                    _this.getFile()
                }else{
                    _this.$message.error(res.data.mesaage ||'您被禁言,请联系管理员');
                }
            }else if(1011 == res.returnCode){
                _this.$message('您需要登录后才能发表帖子!');
            }else{
                _this.$message.error(res.data.mesaage || '上传失败!')
            }
        })
      },
      isForbiddenEdit(){
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
                    _this.edit()
                }else{
                    _this.$message.error(res.data.mesaage ||'您被禁言,请联系管理员');
                }
            }else if(1011 == res.returnCode){
                _this.$message('您需要登录后才能发表帖子!');
            }else{
                _this.$message.error(res.data.mesaage || '编辑失败!')
            }
        })
      },
      isForbiddenPublish(){
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
                   _this.submit()
                }else{
                    _this.$message.error(res.data.mesaage ||'您被禁言,请联系管理员');
                }
            }else if(1011 == res.returnCode){
                _this.$message('您需要登录后才能发表帖子!');
            }else{
                _this.$message.error(res.data.mesaage || '发表失败!')
            }
        })
      },
      isForbiddenResTopic(){
        var _this = this;
        this.$http({
            url:'topic/isForbid'+'?date='+new Date().getTime(),
            method:'get',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken'),
            }
        }).then(function(res){
            if(sessionStorage.getItem("userId")== ''||sessionStorage.getItem("userId")==undefined ||sessionStorage.getItem("userId")==null){
                 _this.$message('请先登录!')
            }
            else if(0 == res.data.returnCode){
                if(res.data.data == false){
                   _this.responseInvitation(0)
                }else{
                    _this.$message.error(res.data.mesaage ||'您被禁言,请联系管理员');
                }
            }else if(1011 == res.returnCode){
                _this.$message('您需要登录后才能发表帖子!');
            }else{
                _this.$message.error(res.data.mesaage || '回帖失败!')
            }
        })
      },
      isForbiddenResponse(){
        var _this = this;
        _this.file = event.target.files;
        this.$http({
            url:'topic/isForbid'+'?date='+new Date().getTime(),
            method:'get',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken'),
            }
        }).then(function(res){
            if(sessionStorage.getItem("userId")== ''||sessionStorage.getItem("userId")==undefined ||sessionStorage.getItem("userId")==null){
                 _this.$message('请先登录!')
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
                _this.$message.error(res.data.mesaage || '发帖失败!')
            }
        })
      },
      //上传附件
      getFile(){
        var _this = this;
        // _this.file = event.target.files;
        let formData = new FormData();
        for(var i=0;i<_this.file.length;i++){    
            formData.append("attachment", _this.file[i]);
        }
        formData.append('topicId', _this.topicId);
        var url = 'topic/attachUpload/'+_this.topicId;
        _this.$http.post(url,formData,{
            headers: {
            'X-Access-Token': sessionStorage.getItem('accessToken'),
            'Content-Type': 'multipart/form-data'
            }
        }).then(function(res){
            if(0 == res.data.returnCode){
                _this.$message.success('上传成功');
                _this.getRefreshInvitation()
            }else if (1011 == res.data.returnCode){
                _this.$message.error('您必须登陆后才能进行该操作！');
                _this.$router.push({
                    path:'/login'
                })
            }else {
                _this.$message.error('上传失败!');
            }
        })
      },
      //获取帖子详情,不会更新浏览量
      getRefreshInvitation(){
          var _this = this;
        this.$http({
            url:'topic/getRefresh/'+this.topicId+'?date='+new Date().getTime(),
            method:'get',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken')
            }
        }).then(function(res){
            if(0 == res.data.returnCode){
                // console.log(res)
                let isActive = res.data.data.isHaveFavourited;
                let top = res.data.data.top;
                let nice = res.data.data.nice;
                let isSelf = res.data.data.isSelf;
                let state = res.data.data.state;
                _this.state = state == 0 ? true:false//0表示草稿,1表示发表
                _this.moduleId = res.data.data.moduleId;
                _this.isSelf = isSelf == 0 ? false:true//0表示非作者,1是作者
                _this.showisAdmin();
                _this.isActive = isActive == '0'? false:true//0表示没有收藏,1表示收藏
                _this.top = top == '0'? false:true//0表示非置顶贴,1表示置顶贴
                _this.nice = nice == '0'?false:true//0表示非精华帖子,1表示置顶贴
                 if(_this.top){
                    _this.topMessage = '取消置顶'
                }else{
                    _this.topMessage = '置顶'
                }
                if(_this.nice) {
                    _this.niceMessage = '取消精华'
                }else {
                    _this.niceMessage = '精华'
                }
                var moduleIds = JSON.parse(sessionStorage.getItem('moduleIds'));
                if(moduleIds != null){
                    var isModerator = moduleIds.some((value) =>{
                    return value == _this.moduleId
                    })
                }
                if(sessionStorage.getItem("userId")== ''||sessionStorage.getItem("userId")==undefined ||sessionStorage.getItem("userId")==null){
                    
                }else{
                    if(_this.isSelf || (_this.moderator&&isModerator)){
                        _this.flagdelete = true
                        _this.flagdowload = true
                    }else{
                        _this.flagdowload = true
                    }
                }
                
                _this.customerId = res.data.data.customerId;
                _this.moduleName = res.data.data.mouleName;
                _this.form.title = res.data.data.title;
                _this.attachments = res.data.data.attachments;
                _this.topicDetail = res.data.data;
            }else{
                _this.$message(res.data.message || '获取列表失败')
            }
        })
      },
      edit(){
          var _this = this
          _this.toPath('/myTopicEdit',{topicid:_this.$route.query.topicId,isURL:'/sectionDetail',state:_this.isState})
      },
      //发表草稿
      submit(){
            var _this = this;
            var url = 'topic/publish/'+_this.topicId;
            var qs = require('qs')
            this.$http({
                url:url,
                method:"post",
                headers: {
                'X-Access-Token': sessionStorage.getItem('accessToken'),
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }).then(function(res){
                // console.log(res)
                if(0 == res.data.returnCode){
                    _this.$message.success('发表成功');
                    _this.$router.push({
                        path:'/SectionDetail?',
                        query:{
                            id:_this.moduleId
                        }
                    })
                }else if (1011 == res.data.returnCode){
                    _this.$message.error('会话过期,请重新登录！');
                    _this.$router.push({
                        path:'/login'
                    })
                }else {
                    _this.$message.error('保存草稿失败!');
                }
            })
      },
      toURL(){
          if(sessionStorage.getItem("userId")== ''||sessionStorage.getItem("userId")== undefined ||sessionStorage.getItem("userId")== null){
              this.$message('请先登录!');
          }
          else if(this.customid != this.userid){
            //   console.log(this.customerId)
              this.toPath('/personalCenter',{userid:this.userid,customerId:this.customerId})
          }else{
              this.toPath('/peopleCenter/personalHomepage')
          }
      },
      //页面加载判断用户有没有登录
    isUserLogin(){
         var _this = this
          var moderator = JSON.parse(sessionStorage.getItem('moderator'));
          var moduleIds = JSON.parse(sessionStorage.getItem('moduleIds'));
          var customerId = JSON.parse(sessionStorage.getItem('customerId'));
          var isModerator = false;
          if(moduleIds != null){
              isModerator = moduleIds.some((value) =>{
              return value == _this.moduleId
            })
          }
         if(sessionStorage.getItem("userId")== ''||sessionStorage.getItem("userId")== undefined ||sessionStorage.getItem("userId")== null){
              _this.isLogin = false;
              _this.isFlag = false;

            //若用户登录,判断是不是该板块管理员
          }else{
            //   console.log('zaa'+_this.moduleId)
            //   console.log(isModerator)
              if(isModerator){
                  _this.isLogin = true;
              }else{
                  //不是当前版块管理员,判断是不是发表回复的那个人
                  
              }
          }
    },
      //判断是否是版块管理员
      showisAdmin(){
          var _this = this
          var moderator = JSON.parse(sessionStorage.getItem('moderator'));
          var moduleIds = JSON.parse(sessionStorage.getItem('moduleIds'));
          if(moduleIds != null){
              var isModerator = moduleIds.some((value) =>{
              return value == _this.moduleId
            })
          }
          //首先判断用户是否登录
          if(sessionStorage.getItem("userId")== ''||sessionStorage.getItem("userId")== undefined ||sessionStorage.getItem("userId")== null){
            //若用户登录,判断帖子是不是草稿状态  
          }else{
              //是草稿
              if(_this.state){
                    this.isPost = true;
                    this.isEdit = true;
                    this.isDelete = true;
              }else{
                  //不是草稿,判断是不是管理员
                  if(moderator && isModerator){
                      this.isAdmin = true;
                      this.isDelete = true;
                      //是管理员,判断是不是发帖人
                      if(_this.isSelf){
                          this.isEdit = true
                      }else{

                      }
                      //不是管理员,判断是不是发帖人
                  }else{
                      if(_this.isSelf){
                          this.isEdit = true;
                          this.isDelete = true;
                      }else{
                      }
                  }
              }  
          }
      },
      //父子通讯,tap栏切换
      showType(data){
          this.isShow = data
      },
    //   控制收藏逻辑
      show(){
          if(sessionStorage.getItem("userId")== ''||sessionStorage.getItem("userId")== undefined ||sessionStorage.getItem("userId")== null){
              this.$message('请先登录!');
              return;
          }
          var url = '';
          var message = '';
          var _this =this;
          var flag = false;
          if(this.isActive){
              url = 'topic/cancelCollection/'
              message='取消收藏成功!'
          }else{
              url = 'topic/collection/'
              message='收藏成功!'
          }
          this.$http({
              url:url+this.topicId,
              method:'post',
              headers:{
                  'X-Access-Token': sessionStorage.getItem('accessToken'),
                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              }
          }).then(function(res){
              if(0 == res.data.returnCode){
                  _this.isActive = !_this.isActive
                  _this.$message({message:message,type:'success'});
              }else if(1011 == res.data.returnCode){
                    _this.$message.error('会话已过期，请重新登录！');
                    _this.$router.push(
                        {path:'/login'}
                )
            }
          })
      },
    //页面跳转逻辑
    toPath(url,params){
        this.$router.push({
            path:url,
            query:params
        });
    },
    //获取帖子详情
    getTopicList(){
        var _this = this;
        this.$http({
            url:'topic/get/'+this.topicId+'?date='+new Date().getTime(),
            method:'get',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken')
            }
        }).then(function(res){
            if(0 == res.data.returnCode){
                // console.log(res)
                let isActive = res.data.data.isHaveFavourited;
                let top = res.data.data.top;
                let nice = res.data.data.nice;
                let isSelf = res.data.data.isSelf;
                let state = res.data.data.state;
                _this.isState =state;
                _this.state = state == 0 ? true:false//0表示草稿,1表示发表
               if(!_this.state){
                   console.log(_this.state)
                   _this.isDraft = true
               }
                _this.moduleId = res.data.data.moduleId;
                _this.isUserLogin();
                _this.isSelf = isSelf == 0 ? false:true//0表示非作者,1是作者
                _this.showisAdmin();
                _this.isActive = isActive == '0'? false:true//0表示没有收藏,1表示收藏
                _this.top = top == '0'? false:true//0表示非置顶贴,1表示置顶贴
                _this.nice = nice == '0'?false:true//0表示非精华帖子,1表示置顶贴
                 if(_this.top){
                    _this.topMessage = '取消置顶'
                }else{
                    _this.topMessage = '置顶'
                }
                if(_this.nice) {
                    _this.niceMessage = '取消精华'
                }else {
                    _this.niceMessage = '精华'
                }
                var moduleIds = JSON.parse(sessionStorage.getItem('moduleIds'));
                if(moduleIds != null){
                    var isModerator = moduleIds.some((value) =>{
                    return value == _this.moduleId
                    })
                }
                if(sessionStorage.getItem("userId")== ''||sessionStorage.getItem("userId")==undefined ||sessionStorage.getItem("userId")==null){
                    
                }else{
                    if(_this.isSelf || (_this.moderator&&isModerator)){
                        _this.flagdelete = true
                        _this.flagdowload = true
                    }else{
                        _this.flagdowload = true
                    }
                }
                
                _this.customerId = res.data.data.customerId;
                _this.getUserImg();
                _this.moduleName = res.data.data.mouleName;
                _this.form.title = res.data.data.title;
                _this.attachments = res.data.data.attachments;
                _this.topicDetail = res.data.data;
            }else{
                _this.$message(res.data.message || '获取列表失败')
            }
        })
    },
    //获取回帖详情
    resTopic:function({
        start=0,
        totalCount=0,
        limit=10,
        sort='desc',
    }){
        var _this = this;
        this.$http({
            url:'topic/postList/'+this.topicId+'?start='+start+'&totalCount='+totalCount+'&limit='+limit+'&sort='+sort+'&date='+ new Date().getTime(),
            method:'get',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken'),
            }
        }).then(function(res){
            if(0 == res.data.returnCode){
                _this.responseTopic = res.data.data;
                _this.total = res.data.page.totalCount;
            }else {
                    _this.$message(res.data.message||'获取回帖详情失败！');
                    
            }
        })
    },
    //tap顶部切换样式
      invitation(url,selected,sort){
          $(".invitation-title").find("span").each(function(){
              $(this).removeClass("active")
          })
          $(selected).addClass("active");
          this.resTopic({
            start:0,
            totalCount:0,
            limit:10,
            sort:sort,
          })
      },
      //获取文本框输入的值
      getUEContentTxt() {
        let content = this.$refs.ue.getUEContent();
        this.$notify({
          title: '0000',
          message: content,
          type: 'success'
        });
      },
      goTop(){  
            var _this = this;
            //获取浏览器滚轴滚动的距离  
            this.scrollTop = $(window).scrollTop();
            // console.log(this.scrollTop)
            // console.log($(window).height())  
            //当浏览器滚轴滚动的距离 大于 设定的高度时 显示“点击返回顶部”按钮，否则隐藏  
            if(this.scrollTop > 80) {  
                this.isTop = true  
            } else{  
                this.isTop = false  
            }  
      },
    //   返回顶部操作
      goback(){
          let _this = this
        //点击返回顶部500ms的滑动效果  
        $('html').stop().animate({scrollTop:0},500,function(){
            // console.log(_this.scrollTop)
            if(_this.scrollTop > 80) {  
                _this.isTop = false  
            } else{  
                _this.isTop = true  
            }
            _this.scrollTop = 0
        }); 
      },
      //侧边栏回帖滚动到最底部
      replyInvitation(){
          var _this = this
          let height = $(window).height();//获取浏览器的屏幕的高度
          $('html,body').stop().animate({scrollTop:300},500,function(){
              _this.flag = false
          })
      },
      //返回列表
      backList(){
           this.$router.push({
                    path:'/sectionDetail',
                    query:{
                        id:this.id
                    }
                })
      },
      //回帖操作
      responseInvitation(){
            var _this = this;
            var url = 'topic/reply/'+_this.topicId;
            var params = {
            anonymous:_this.$store.state.anonymous,
            content:_this.$refs.ue.getUEContent(),
            type:'',
            quote:'',
            topicId:_this.topicId,
            postId:_this.$store.state.id
        };
        var qs = require('qs')
        _this.$http.post(url,qs.stringify(params),{
            headers: {
            'X-Access-Token': sessionStorage.getItem('accessToken'),
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(function(res){
            if(0 == res.data.returnCode){
                _this.$message.success('回帖成功！');
                _this.$refs.ue.clearContent()
                _this.$store.commit('clearId',0,0)
                 _this.resTopic({})
           }else if(1011 == res.data.returnCode){
               _this.$message(res.data.message||'您需要登录才能够回帖!');
               _this.$router.push({
                   path:'/login'
               })
           }else{
               _this.$message.error('回帖失败!')
           }
            
        })
      },
      //当改变页面的展示数据时
      handleSizeChange(val){
        this.pageSize = val;
        this.currentPage = 1;
        this.resTopic({
            start:0,
            totalCount:this.total,
            limit:this.pageSize,
            sort:'createTime desc'
        })
      },
      //当改变当前页码时
      handleCurrentChange(val){
          this.currentPage = val;
          this.resTopic({
          start: this.pageSize * (this.currentPage - 1),
          limit: this.pageSize,
          totalCount:this.total,
          sort:'createTime desc'
        });
        window.scrollTo(0, 0); //初始化页面在最顶部
      },
      //页面一加载,判断是不是置顶贴
      pageOnload(){
        //   console.log(this.top)
        //   console.log(this.nice)
          if(this.top){
              this.topMessage = '取消置顶'
          }else{
              this.topMessage = '置顶'
          }
          if(this.nice) {
              this.niceMessage = '取消精华'
          }else {
              this.niceMessage = '精华'
          }
      },
       //取消置顶,置顶方法
      cancelTop(){
        var _this = this;
        var url = '';
        var innerH = $(event.target)
        if(this.top){
            url = 'topic/cancelTop/'
        }else {
            url = 'topic/top/'
        }
        this.$http({
            url:url+_this.topicId,
            method:'post',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken'),
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(function(res){
            if(0 == res.data.returnCode){
                // console.log(res)
                if(_this.top){
                   _this.topMessage = '取消置顶'
                    _this.top = ! _this.top
                    _this.getTopicList()
                   _this.$message.success('取消置顶成功！');
                }else{
                    _this.topMessage=='置顶'
                    _this.top = ! _this.top
                    _this.getTopicList()
                    _this.$message.success('置顶成功！');
                }
            }else if(1011 == res.data.returnCode){
                _this.$message.error('您需要登陆后才能执行该操作！');
                _this.$router.push({
                    path:'/login'
                })
            }else {
                _this.$message.error('操作失败！');
            }
        })
      },
      //精华,取消精华
      cancelNice(){
        var _this = this;
        var url = '';
        if(_this.nice){
            url = 'topic/cancelNice/'
        }else if (!_this.nice){
            url = 'topic/nice/'
        }
        _this.$http({
            url:url+_this.topicId,
            method:'post',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken'),
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(function(res){
            if(0 == res.data.returnCode){
                // console.log(res)
                if(_this.nice){
                   _this.niceMessage = '取消精华'
                    _this.nice = ! _this.nice
                    _this.getTopicList()
                   _this.$message.success('取消精华成功！');
                }else{
                    _this.niceMessage=='精华'
                    _this.nice = ! _this.nice
                    _this.getTopicList()
                    _this.$message.success('精华成功！');
                }
            }else if(1011 == res.data.returnCode){
                _this.$message.error('您需要登陆后才能执行该操作！');
                _this.$router.push({
                    path:'/login'
                })
            }else {
                _this.$message.error('操作失败！');
            }
        })
      },
      //删除帖子
      deleteInvitation(form){
           var _this = this
          var moderator = JSON.parse(sessionStorage.getItem('moderator'));
          var moduleIds = JSON.parse(sessionStorage.getItem('moduleIds'));
          if(moduleIds != null){
              var isModerator = moduleIds.some((value) =>{
              return value == _this.moduleId
            })
          }
          if(this.isSelf){

              this.$refs[form].validate((valid) => {
                if(valid){
                    this.$http({
                url:'bbsuser/delTopic/'+this.topicId,
                method:'delete',
                headers:{
                    'X-Access-Token': sessionStorage.getItem('accessToken')
                }
                }).then(function(res){
                if(0 == res.data.returnCode){
                    _this.$message.success('删除成功！');
                    _this.dialogFormVisible = false
                    _this.$router.push({path:'/sectionDetail',query:{id:_this.id}})
                
                }else if(1011 == res.data.returnCode){
                        _this.$message.error('会话已过期，请重新登录！');
                        _this.$router.push(
                            {path:'/login'}
                    )
                }
            }) 
              }
           })
              
          }else{
              if(isModerator&&moderator){
                this.$refs[form].validate((valid) => {
                if(valid){
                    var url = 'topic/deleteByManager';
                    var params = {
                        posterId:this.customerId,
                        moduleName:this.moduleName,
                        reason:this.form.reason,
                        title:this.form.title,
                        topicId:this.topicId
                    };
                    var qs = require('qs')
                    this.$http.post(url,qs.stringify(params),{
                        headers:{
                            'X-Access-Token': sessionStorage.getItem('accessToken'),
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        }
                    }).then(function(res){
                        // console.log(res)
                        if(0 == res.data.returnCode){
                            // console.log(res)
                            _this.$message.success('删除成功！');
                           _this.dialogFormVisible = false
                            _this.$router.push({path:'/sectionDetail',query:{id:_this.id}})
                        }else if(1011 == res.data.returnCode){
                            _this.$message.error('会话已过期，请重新登录！');
                            _this.$router.push({
                                path:'/login'
                            })
                        }else {
                            _this.$message.error('查询失败！');
                        }
                    })
              }
           })
            }
          }
            

       
      },
       //弹出框取消后,清楚表单验证
      cancelDeleteInvitation(form){
          var _this = this
          _this.dialogFormVisible = false
          this.$refs[form].resetFields()
      },
      isDownload(attachId){
          var _this = this;
        if(sessionStorage.getItem('accessToken')){
          this.$http.get('topic/download/check/'+attachId+'?date='+new Date().getTime(),{
            headers: {
              'X-Access-Token': sessionStorage.getItem('accessToken')
            },
          }).then(function(response){
            if(0 == response.data.returnCode){
              console.log(response)
              _this.downloadfile(attachId)
            }else{
              _this.$message(response.data.message || '下载资源失败！');
            }
          })
        }else{
           _this.$message('请先登录！');
           return;
        }
      },
      //下载帖子附件
    downloadfile(attachId){
        var _this = this;
        if (sessionStorage.getItem('accessToken')) {
          this.$http({
            url:'topic/download/'+attachId,
            method:'post',
            headers: {
              'X-Access-Token': sessionStorage.getItem('accessToken')
            },
            responseType: "blob"
          }).then(function (response) {
            if (response.data) {
              var filename = decodeURI(response.headers['content-disposition'].split(';')[1]);
              var blob = new Blob([response.data]);
              if (window.navigator.msSaveOrOpenBlob) {
                navigator.msSaveBlob(blob, filename.match(/"(\S*)"/)[1]);
              } else {
                var a = document.createElement("a");
                a.download = filename.match(/"(\S*)"/)[1];
                a.href = window.URL.createObjectURL(blob);
                a.click();
              }
            } else if (1011 == response.data.returnCode) {
              _this.$message.error('会话已过期，请重新登录！');
            } else {
              _this.$message(response.data.message || '下载资源失败！');
            }
          }).catch(function (error) {});
        } else {
          _this.$message('您还没有登录,没有下载权限,请先登录账号。');
        }
    },
    deletefile(attachId){
        this.$confirm('是否删除该附件', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            showClose:false,
            cancelButtonClass:'cancel',
            confirmButtonClass:'confirm'
            }).then(() =>{
                var _this = this;
                var url = 'topic/attachDelete/'+attachId;
                this.$http({
                    url:'topic/attachDelete/'+attachId,
                    method:'post',
                    headers:{
                        'X-Access-Token': sessionStorage.getItem('accessToken'),
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function(res){
                    if(0 == res.data.returnCode){
                        _this.$message.success('删除成功！');
                        _this.file = '';
                       _this.getRefreshInvitation()
                    }else if(1011 == res.data.returnCode){
                        _this.$message.error('会话已过期，请重新登录！');
                        _this.$router.push({
                            path:'/login'
                        })
                    }else {
                        _this.$message.error('删除失败！');
                    }
                })
            })
        
    },
    //登录用户最近发表帖子列表
    loginInvitationList(){
        var _this = this;
        this.$http({
            url:'bbsuser/newTopic/'+this.userid+'?date='+new Date().getTime(),
            method:'get',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken')
            }
        }).then(function(res){
            if(0 == res.data.returnCode){
                // console.log(res)
                _this.loginInvitationLists = res.data.data
            }else{
                _this.$message.error(res.data.message||'获取最近发表帖子失败！');
            }   
        })
    },
    //获取当前登录用户的发帖数和回复数
    getUserCount(){
        var _this = this;
        this.$http({
            url:'bbsuser/'+this.userid+'?date='+new Date().getTime(),
            method:'get',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken')
            }
        }).then(function(res){
            if(0 == res.data.returnCode){
                // console.log(res)
                _this.topicCount = res.data.data.topicCount;
                _this.topicPostCount = res.data.data.topicPostCount;
                _this.presentUserId = res.data.data.info.id;
                _this.preventUserName = res.data.data.info.realName
            }else{
                _this.$message.error(res.data.message||'获取发帖数,回复数失败！');
            }
        })
    }
  },
  filters:{
      fliterDate:function(value){
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
              return value.substring(0,15)+"..."
          }else{
              return value
          }
      }
  },
  watch: {
   '$route' (to, from) {
     if(this.$route.path === '/invitationDetail'){

        this.$router.go(0)
     }
   }
 },
  components:{
    ForumTitle,
    ForumIndex,
    UE,
    Review
  }
}
</script>
<style scoped>
.forum-container {
    width: 80%;
    margin: 0 auto;
    padding:2% 6%;
    clear: both;
    position: relative
}
.forum-all .blocks {
    position: fixed;
    margin-left: 81%;
    margin-top: 10%;
    z-index: 99;
    transition: all ease .8s;
}
.forum-all .blocks span {
    display: block;
    width: 40px;
    height: 40px;
    font: 14px 'microsoft yahei';
    color: #fff;
    z-index: 1;
    box-sizing: border-box;
    margin-bottom: 10px;
    text-align: center;
    cursor: pointer;
}
.forum-all .blocks span.one {
    line-height: 40px;
    background-color: #10A386;
}
.forum-all .blocks span.two {
    line-height: 40px;
    background-color: #0084FF;
}
.forum-all .blocks span.three {
    background-color: #008FD5;
}
.forum-all .blocks span.back {
    /* margin-top: 350px; */
    background-color: #008FD5;
}
.toTOP {
    transform: translateY(-150px);
    transition: all ease .9s
}

.forum-all {
    width: 100%;
    background-color: #fff;
    border: 1px solid #eee;
    overflow: hidden;
    position: relative;
}
.forum-all .btn {
    float:right;
    box-sizing: border-box;
    position: absolute;
    top: 8px;
    right: 26px;
}
/* ????��???? */
.fontcolorblue {
    color: #0285FF;
}
.imgBg-skyblue-radius {
    display: block;
    width: 40px;
    height: 40px;
    background-color: #86C0E4;
    position: relative;
    border-radius: 50%;
}
.colorblue {
    color: #369EFF
}
.colorgreen {
    color: #42B69F
}
.colorred {
    color: #E04639
}
/* ???��???? */
.breadLink {
    width: 100%;
    /* padding: 20px 20px */
}
.upfile {
    margin-top: 10px;
}
.upfile span {
    display: block;
    width: 60px;
    height: 30px;
    background-color: #10A386;
    color: #ffffff;
    position: absolute;
    bottom:0px;
    left: 4%;
    cursor: pointer;
    font: 12px/30px 'microsoft yahei';
    text-align: center;
    /* border-radius: 10% */
}
.upfile input {
    width: 96px;
    height: 38px;
    position: absolute;
    bottom: 0px;
    left: 4%;
    opacity: 0;
}
/* ???????? */
.detaiContent {
    width: 70%;
    overflow: hidden;
    padding: 0 20px ;
    float: left;
}
.detaiContent .intro {
    width: 100%;
    padding: 20px;
    border: 1px solid #eee;
    overflow: hidden;
    box-sizing: border-box;
    margin-bottom: 20px;
}
.detaiContent .intro .introtitle {
    width: 100%;
    overflow: hidden;
    border-bottom: 1px solid #eee;
    position: relative;
}
.detaiContent .intro .left {
    width: 60%;
    float: left;
}
.detaiContent .intro .left h1 {
    margin: 0;
    font: 16px 'microsoft yahei';
    text-align: left;
    position: relative;
    word-wrap: break-all;
    word-wrap: break-word;
}
.detaiContent .intro div.subtitle {
    position: absolute;
    top: 0;
    left: 70%;
}
.detaiContent .intro  div.subtitle span {
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
.detaiContent .intro div.subtitle span.top {
    background-color: #0084ff;
}
.detaiContent .intro div.subtitle span.main {
    margin-left: 8px;
    background-color: #ff3040;
}
.detaiContent .intro .left p {
    text-align: left
}
.detaiContent .intro .left p span{
    font: 14px/28px 'microsoft yahei';
}
.detaiContent .intro .left p span i {
    font-style: normal;
    color: #0084ff;
    margin-left: 8px;
}
/* .detaiContent .intro .left p span.distance {
    margin-left: 8px
} */
.detaiContent .intro .right {
    float: right;
    text-align: right
}
.detaiContent .intro .right .star {
    display: block;
    width: 32px;
    height: 32px;
    font:24px/32px 'microsoft yahei';
    text-align: center;
    background-color:#F2F4F7;
    margin-left: 86px;
    cursor: pointer;
}
.fontcolororange {
    color: #FFBA00;
}
.detaiContent .intro .right .operator {
    font: 14px/28px 'microsoft yahei'
}
/* .detaiContent .intro .right .operator span.distance {
    margin-left: 14px;
} */
.detaiContent .intro .introbody {
    width: 100%;
    padding-top: 28px;
}
.detaiContent .intro .introbody h3 {
    font: 14px/28px 'microsoft yahei';
    text-align: left;
}
.detaiContent .intro .introbody .desc {
    font: 14px/28px 'microsoft yahei';
    text-align: left;
    text-indent: 2em;
    margin-bottom: 20px;
}

.detaiContent .comment {
    width: 100%;
    /* padding: 20px; */
    border: 1px solid #eee;
    overflow: hidden;
    box-sizing: border-box;
    margin-bottom: 20px;
}
.invitation-content {
    width: 100%;
    /* border: 1px solid #eee; */
    overflow: hidden;
    /* margin-bottom: 40px; */
}
.invitation-title {
    width: 100%;
    padding:10px 10px;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    position: relative;
    border-bottom: 1px solid #eee;
    box-sizing: border-box
}
.invitation-title span {
    width: 60px;
    display: inline-block;
    cursor: pointer;
    float: left;
    text-align: center;
    font: 14px "microsoft yahei";
}
.invitation-title #new {
    border-right: 1px solid #eee;
}
.active {
    color: #0084ff;
    /* background-color: #0084ff; */
}
.comment-bodys {
    width: 100%;
    /* overflow: hidden;
    padding: 0 20px;
    box-sizing: border-box */
}
.comment-body {
    width: 100%;
    overflow: hidden;
    padding: 0 20px;
    box-sizing: border-box
}
.comment-body-first {
    width: 100%;
    overflow: hidden;
    padding: 0 0 0 30px;
    box-sizing: border-box
}
.invitation-body {
    width: 100%;
    height: 80px;
    padding: 20px;
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
    position: absolute;
    top: 5px;
    left: 5px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
.theme {
    width: 53%;
    margin-left: 2%;
    float: left;
    margin:0;
    text-align: left;
}
.theme .commendtitle {
    font:14px 'microsoft yahei';
    text-align: left;
    margin: 0;
    cursor: pointer;
}
.theme p {
    font:12px 'microsoft yahei';
    margin-top:6px;
    text-align:left;
    
}
.theme p span.distance i {
    color: skyblue
}
.distance {
    margin-left: 8px;
}
.state {
    float: right;
}
.state .floor {
    display: block;
    text-align: right;
    font:14px/20px 'microsoft yahei';
}
.state .commendoperator {
    
}
.state .commendoperator span {
    display: block;
    float: left;
    cursor: pointer;
    font:14px/20px 'microsoft yahei';
}
.footerPage {
    padding-right: 10px;
}
.footerPage .el-pagination {
    margin: 20px 0;
    float: right;
}
.publish {
    width: 100%;
    padding: 10px 10px 10px 10px;
    box-sizing: border-box;
    border: 1px solid #eee;
    overflow: hidden;
    position: relative;
    margin-bottom: 20px;
}
.uedit {
    margin-bottom: 10px
}
.btnGroup {
    width: 100px;
}
.user-portrait {
    position: absolute;
    top: 16px;
    left: 4px;
}
.user-portrait img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}


.detailRight {
    width: 26%;
    float: left;
    padding:0 20px 0 0;
    box-sizing: border-box
    /* margin-right: 1%; */
}
.detailRight .usercontent {
    width: 100%;
    border: 1px solid #eee;
    box-sizing: border-box;
    margin-bottom: 10px;
}
.detailRight .usercontent .userImage {
    background-color: #EBEEF5;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    box-sizing: border-box;
    padding-top: 5px;
    margin: 20px auto;
    cursor: pointer;
}
.detailRight .usercontent .userImage  img{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    cursor: pointer;
}
.detailRight .usercontent .userbody {
    width: 100%;
    margin:0 auto;
    overflow: hidden;
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
}
.detailRight .usercontent .userbody span  {
    display: block;
    width: 60px;
    font:14px 'microsoft yahei';
    text-align:center;
    float: left;
    /* cursor: pointer; */
}
.detailRight .usercontent .userbody span.border {
    border-right: 1px solid #eee;
}
.detailRight .usercontent .userbody span i {
    font-style: normal;
    color: #2D97FF;
}
.detailRight .usercontent h3 {
    font: 600 14px 'microsoft yahei'
}
.detailRight .dynamic {
    border: 1px solid #eee;
    box-sizing: border-box;
}
.detailRight .dynamic h3 {
    height: 40px;
    background-color: #F7F8FA;
    font: 600 14px/28px 'microsoft yahei';
    line-height: 40px;
    text-align: center;
    margin:0;
    border-bottom: 1px solid #eee;
}
.detailRight .dynamic .article span{
    display: block;
    font: 14px 'microsoft yahei';
    cursor: pointer;
    height: 40px;
    line-height: 40px;
    text-align: left;
    border-bottom: 1px solid #eee;
    padding-left: 20px;
}
.detailRight .dynamic .article span:last-of-type {
    border-bottom: none
}
/* .detailRight .dynamic .article span:hover {
    color: #0084ff;
    text-decoration: underline
} */
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>


