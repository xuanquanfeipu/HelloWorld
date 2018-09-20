<template>
  <div class="forum-container">
      <div class="forum-all">
        <forum-title @selectTitleType='showType'></forum-title>
        <forum-index v-if="isShow"></forum-index>
        <!-- 版块详情面包削导航 -->
        <div v-if="!isShow">
            <el-row>
            <el-col :span="24">
                <div class="breadLink">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/forum' }" class="fontcolor">社区</el-breadcrumb-item>
                        <el-breadcrumb-item><span style="color: #008fd5;">{{sectionTitleList.name}}</span></el-breadcrumb-item>
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
                                <div class="two" v-show="isOperatorShow" style="position:relative">
                                    <div class="upfile">
                                        <span>点击上传</span>
                                        <input type="file" id="file" @change="upload($event)">
                                    </div>
                                </div>
                                
                            </div>
                            <!-- 帖子主题 -->
                            <div class="sectiontheme">
                                <h4>{{sectionTitleList.name}}<span v-show="!tailor" @click.prevent="show"><i class="el-icon-plus"></i>关注</span><span v-show="tailor" @click.prevent="show" class="attention">取消关注</span></h4>
                                <p>
                                <span>今日帖子: {{sectionTitleList.todayTopicCount}}</span>
                                <span class="distance">今日回复: {{sectionTitleList.todayReplyCount}}</span>
                                <span class="distance">总帖子: {{sectionTitleList.totalTopicCount}}</span>
                                <span class="distance">总回复: {{sectionTitleList.totalReplyCount}}</span><br/>
                                <span>版主:  <i v-for="(item,index) in sectionTitleList.moderators" :key="index">{{item.userName}}</i></span>
                                </p>
                                <p>{{sectionTitleList.sumary}}</p>
                                <span class="edit" v-show="isOperatorShow" @click="dialogFormVisible = true">
                                    编辑简介
                                </span>

                                <!-- 弹窗内容 -->
                                <el-dialog title="编辑简介" :visible.sync="dialogFormVisible" center width="30%">
                                    <el-form :model="form">
                                        <el-form-item >
                                            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.sumary" :autosize="{ minRows: 2, maxRows: 4}">
                                            </el-input>
                                        </el-form-item>
                                    </el-form>
                                    <div slot="footer" class="dialog-footer">
                                        <el-button type="primary" @click="updateSumary">确 定</el-button>
                                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                                    </div>
                                </el-dialog>


                            </div>
                            <!-- 按钮发表新帖子 -->
                            <div class="btnGroup">
                                <el-button type="primary" @click="isForbidden">发表新帖子</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </el-row>
            <!-- 版块详情帖子中心 -->
            <el-row>
                <el-col>
                    <div class="sectionbody">
                        <div class="sectiontop">
                            <div class="select">
                            <el-select v-model="value" placeholder="请选择" size="mini" @change="getChange">
                                <el-option value="sortByDefault" label="默认排序">默认排序</el-option>
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
                                <el-button  type="primary" class="search-button" icon="el-icon-search" @click="search" size="mini">搜索</el-button>
                            </div>
                            <div class="word">
                                <span @click="invitation('url','#new','listByNew')" id="new" class="active">最新</span>
                                <span @click="invitation('url','#essence','listByNice')" id="essence">精华</span>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>

            <el-row>
                <el-col>
                    <div class="invitation-content">
                            <div class="invitation-body" v-for="(item,index) in invitationBody" :key="index">
                                <!-- 用户头像 -->
                                <!-- <div class="head-portrait">
                                    <img :src="ImgUserUrl+1">
                                </div> -->
                                <!-- 帖子主题 -->
                                <div class="theme" style="padding-left:20px">
                                    <div class="subtitle">
                                            <span class="top" v-show="item.top==1">置顶</span>
                                            <span class="main" v-show="item.nice==1">精华</span>
                                    </div>
                                    <h3 @click.stop="toPath('/invitationDetail',{topicId:item.id,customerId:item.customerId,id:id})" :class="{'leftPadding':(item.top == 1) ||(item.nice == 1),'leftpadding':(item.top == 1) &&(item.nice == 1),'Leftpadding':(item.top != 1) &&(item.nice != 1)}" :title="item.title">{{item.title}}
                                    </h3>
                                    <p>
                                    <span>{{item.customerName}}</span>
                                    <span class="distance">{{item.createTime | fliterDate}}</span>
                                    <span class="distance">发表版块: <i style="font-style:normal">{{item.moduleName}}</i></span>
                                    <span class="distance">最后回复: {{item.lastReplyTime | fliterDate}}</span>
                                    </p>
                                </div>
                                <!-- 帖子操作 -->
                                <div class="operator" v-show="isShowSubtitle" style="position:relative">
                                    <span v-if="item.top == 0" @click="cancelTop(item.id,item.top,$event)">置顶</span>
                                    <span v-else-if="item.top== 1" @click="cancelTop(item.id,item.top,$event)">取消置顶</span>
                                    <span class="distance" v-if="item.nice==0" @click="cancelNice(item.id,item.nice,$event)">精华</span>
                                    <span class="distance" v-else-if="item.nice==1" @click="cancelNice(item.id,item.nice,$event)">取消精华</span>
                                    <!-- 管理员删帖 ,删除后边为草稿-->
                                    <span class="delete" @click="deleteByAdmin(item.customerId,item.moduleName,item.title,item.id)" v-show="isShowSubtitle && (item.customerId != customersId)" style="position:absolute;top:0;
                                    right:10px;">删除</span>
                                </div>
                                <!-- 作者删帖 ,能够删除完全-->
                                <div>
                                    <span class="deleteSelf" @click="deleteBySelf(item.id,item.title,item.reason)" v-show="item.customerId == customersId">删除</span>
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
                            <el-dialog title="管理员删帖" :visible.sync="dialogFormVisible1" center width="40%">
                                <el-form :model="deleteform" ref="deleteform" :rules="rules" class="demo-dynamic">
                                    <el-form-item label="帖子标题" :label-width="formLabelWidth1" prop="title">
                                        <el-input v-model="deleteform.title" auto-complete="off" :disabled="true"></el-input>
                                    </el-form-item>
                                    <el-form-item label="删帖原因" :label-width="formLabelWidth1" prop="reason">
                                        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="deleteform.reason">
                                        </el-input>
                                    </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <el-button type="primary" @click="deleteInvitation('deleteform')">确 定</el-button>
                                    <el-button @click="cancelDeleteInvitation('deleteform')">取 消</el-button>
                                </div>
                            </el-dialog>
                            <!-- 作者删帖 -->
                            <el-dialog title="作者删帖" :visible.sync="dialogFormVisible2" center width="40%">
                                <el-form :model="deleteform1" ref="deleteform1" :rules="rules1" class="demo-dynamic">
                                    <el-form-item label="帖子标题" :label-width="formLabelWidth2" prop="title">
                                        <el-input v-model="deleteform1.title" auto-complete="off" :disabled="true"></el-input>
                                    </el-form-item>
                                    <el-form-item label="删帖原因" :label-width="formLabelWidth2" prop="reason">
                                        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="deleteform1.reason">
                                        </el-input>
                                    </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <el-button type="primary" @click="deleteInvitation1('deleteform1')">确 定</el-button>
                                    <el-button @click="cancelDeleteInvitation1('deleteform1')">取 消</el-button>
                                </div>
                            </el-dialog>
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
      var validatePass = (rule,value,callback)=>{
        if (!value) {
          return callback(new Error('删帖原因不能为空'));
        }else {
            callback()
        }
    }
    var validatePass1 = (rule,value,callback)=>{
        if (!value) {
          return callback(new Error('删帖原因不能为空'));
        }else {
            callback()
        }
    }
      return{
        rules:{
            reason:[{
                validator:validatePass,trigger:'blur'
            }]
        },
        rules1:{
            reason:[{
                validator:validatePass1,trigger:'blur'
            }]
        },
        tailor:'',
        customerId:'',
        customersId:JSON.parse(sessionStorage.getItem('customerId')),//当前登录用户id
        moduleName:'',
        title:'',
        ImgUrl:'',
        ImgUserUrl:'',
        file:"",
        dialogFormVisible:false,
        formLabelWidth: '68px',
        formLabelWidth2: '100px',
        deleteform:{
            title:'',
            reason:''
        },
        deleteform1:{
            title:'',
            reason:''
        },
        isOperatorShow:false,//上传,编辑简介
        isShowSubtitle:false,//置顶,精华,删除
        isDeleteButton:false,//删除
        top:'',//控制帖子展示置顶
        nice:'',//控制帖子展示精华
        isPost:'',//是否是发帖人
        moduleId:'',
        dialogFormVisible1:false,
        dialogFormVisible2:false,
        isAttention:true,
        pageSizes: [10, 20, 30, 40],
        pageSize: 10,
        form:{
            id:'',
            sumary:''
        },
        formLabelWidth1:'100px',
        currentPage: 1,
        total: 0,
        isShow:false,
        options: [{
          value: 'sortByReply',
          label: '回复数'
        },{
          value: 'sortByPageView',
          label: '浏览数'
        }],
        list:'',
        value: 'sortByDefault',
        keyWords:'',
        invitationBody:[],
        sectionTitleList:[],
        id:this.$route.query.id,
        listid:"",
        selfId:'',
        typeId:'',
        name:''
      }
  },
  mounted(){
      this.getSectionList()
      this.getInvitationList('','listByNew','sortByDefault',this.pageSize,this.currentPage-1,this.id);
      this.getImg();
      this.getUserImg();
      console.log(this.customerId)
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
                    _this.toPath('/newInvitation',{moduleId:_this.moduleId,typeId:_this.typeId,name:_this.name})
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
    //判断是否是版块管理员
    showisAdmin(){
        var _this = this
          var moderator = JSON.parse(sessionStorage.getItem('moderator'));
          var moduleIds = JSON.parse(sessionStorage.getItem('moduleIds'));
          var customerId = JSON.parse(sessionStorage.getItem('customerId'));
          if(moduleIds != null){
              var isModerator = moduleIds.some((value) =>{
              return value == _this.moduleId
            })
          }
          //判断用户是否是登录用户
          if(sessionStorage.getItem("userId")== ''||sessionStorage.getItem("userId")== undefined ||sessionStorage.getItem("userId")== null){
              _this.isShowSubtitle = false;
          }else{
              //登录,判断是否是版块管理员
              if(moderator && isModerator){
                  _this.isOperatorShow = true;
                  _this.isShowSubtitle = true;
              }
          }
    },
    //版块帖子列表
    getSectionList(){
        var _this = this;
        this.$http({
            url:'bbsModule/module/detail/'+_this.id+'?date='+new Date().getTime(),
            method:'get',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken'),
            }
        }).then(function(res){
            if(0 == res.data.returnCode){
                // console.log(res)
                _this.sectionTitleList = res.data.data;
                _this.form.id = _this.sectionTitleList.id;
                _this.form.sumary = _this.sectionTitleList.sumary;
                _this.moduleId = res.data.data.id;
                _this.typeId = res.data.data.typeId;
                _this.name = res.data.data.name;
                _this.showisAdmin()
                _this.tailor = res.data.data.tailor == 1 ? true:false//1表示已关注,0表示未关注
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
    //更新简介
    updateSumary(){
        var _this = this;
        var url = 'bbsModule/module/sumary/update';
        var params = {
            id:this.form.id,
            sumary:this.form.sumary,
            
        };
        var qs = require('qs')
        this.$http.post(url,qs.stringify(params),{
            headers: {
            'X-Access-Token': sessionStorage.getItem('accessToken'),
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(function(res){
            if(0 == res.data.returnCode){
                // console.log(res)
                _this.$message.success('更新成功！');
                _this.dialogFormVisible = false
                _this.getSectionList()
            }else if(1011 == res.data.returnCode){
                _this.$message.error('会话已过期，请重新登录！');
                _this.$router.push({
                    path:'/login'
                })
            }else {
                _this.$message.error('更新失败！');
            }
        })
    },
    //控制页面跳转
    toPath(url,params){
        this.$router.push({
            path:url,
            query:params
        });
    },
    showType(data){
          this.isShow = data
      },
    search(){
        this.getInvitationList(this.keyWords,this.list,this.value,this.pageSize,this.currentPage-1,this.id)
    },
    //关注,取消关注
    show(){
        if(sessionStorage.getItem("userId")== ''||sessionStorage.getItem("userId")== undefined ||sessionStorage.getItem("userId")== null){
              this.$message('请先登录!');
              return;
          }
        var url = '';
        var message = '';
        var _this =this;
        // this.isAttention = !this.isAttention
        // console.log(this.tailor)
        if(!this.tailor){
            url = 'bbsModule/module/tailor/set/'
            message='关注成功!'
        }else{
            url = 'bbsModule/module/tailor/cancel/'
            message='取消关注成功!'
        }
        this.$http({
            url:url+this.id,
            method:'post',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken'),
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(function(res){
            // console.log(res)
            if(0 == res.data.returnCode){
                _this.tailor = !_this.tailor
                _this.$message({message:message,type:'success'});
            }else if(1011 == res.data.returnCode){
                _this.$message('您必须登录后才能进行该操作！');
                _this.$router.push(
                    {path:'/login'}
            )
        }
        })
    },
    //切换
    invitation(url,selected,status){
        this.list = status;
        this.getInvitationList(this.keyWords,this.list,this.value,this.pageSize,this.currentPage-1,this.id)
        $(".word").find("span").each(function(){
            $(this).removeClass("active")
        })
        $(selected).addClass("active")
      },
    //获取列表帖子
    getInvitationList(cond,list,sort,limit,start,listid){
        var _this = this;
        var url = 'bbsModule/module/topic/list/'+listid;
        var params = "cond="+cond+"&list="+list+"&sort="+sort+"&limit="+limit+"&start="+start
        var qs = require('qs')
        this.$http.post(url,params,{
            headers: {
            'X-Access-Token': sessionStorage.getItem('accessToken'),
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(function(res){
            if(0 == res.data.returnCode){
                // console.log(res)
                _this.total = res.data.page.totalCount
                _this.invitationBody = res.data.data;
                 _this.invitationBody.forEach((item)=>{
                    if(item.customerId == _this.customerId){
                        _this.isDeleteButton = true
                    }
                });
                // console.log(_this.isPost)
                
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
    //改变页面展示条数
    handleSizeChange(val){
        this.pageSize = val;
        this.currentPage = 1;
        this.getInvitationList(this.keyWords,this.list,this.value,this.pageSize,this.currentPage-1,this.id)
    },
    handleCurrentChange(val){
        this.currentPage = val;
        this.getInvitationList(this.keyWords,this.list,this.value,this.pageSize,this.pageSize * (this.currentPage - 1),this.id)
        window.scrollTo(0, 0); //初始化页面在最顶部
    },
    
    getChange(){
        this.getInvitationList(this.keyWords,this.list,this.value,this.pageSize,this.currentPage-1,this.id)
    },
    //取消置顶,置顶方法
      cancelTop(topicId,top){
        var target =  $(event.target);
        var _this = this;
        var url = '';
        if(1== top){//top=0 代表非置顶贴;top=1代表置顶贴
            url = 'topic/cancelTop/';
        }else if (0 == top){
            url = 'topic/top/';
        }
        this.$http({
            url:url+topicId,
            method:'post',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken'),
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(function(res){
            if(0 == res.data.returnCode){
                if(target.html() == "置顶"){
                    _this.$message.success('置顶成功!');
                }else{
                    _this.$message.success('取消置顶成功!');
                }
                 _this.getInvitationList(_this.keyWords,_this.list,_this.value,_this.pageSize,_this.currentPage-1,_this.id)
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
      //精华,取消精华
      cancelNice(topicId,nice,){
        var target =  $(event.target);
        var _this = this;
        var url = '';
        if(1==nice){
            url = 'topic/cancelNice/'
        }else if (0==nice){
            url = 'topic/nice/'
        }
        this.$http({
            url:url+topicId,
            method:'post',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken'),
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(function(res){
            // console.log(res)
            if(0 == res.data.returnCode){
                if(target.html() == "精华"){
                    _this.$message.success('精华成功!');
                }else{
                    _this.$message.success('取消精华!');
                }
                _this.getInvitationList(_this.keyWords,_this.list,_this.value,_this.pageSize,_this.currentPage-1,_this.id)
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
      //管理员点击删除,将当前节点的参数赋值
      deleteByAdmin(customerId,moduleName,title,id){
          this.dialogFormVisible1 = true;
          this.customerId = customerId;
          this.moduleName = moduleName;
          this.deleteform.title = title;
          this.listid = id;
      },
      //作者删除自己的帖子
      deleteBySelf(id,title,reason){
          this.dialogFormVisible2 = true;
          this.selfId = id
          this.deleteform1.title = title;
      },
      //管理员删除帖子
      deleteInvitation(form){
            var _this = this;
            this.$refs[form].validate((valid) => {
                if(valid){
                    var url = 'topic/deleteByManager';
                    var params = {
                        posterId:this.customerId,
                        moduleName:this.moduleName,
                        reason:this.deleteform.reason,
                        title:this.deleteform.title,
                        topicId:this.listid
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
                            _this.dialogFormVisible1 = false;
                            _this.getInvitationList('','listByNew','sortByDefault',_this.pageSize,_this.currentPage-1,_this.id);
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
      },
      //作者删除自己的帖子
      deleteInvitation1(form){
          var _this = this;
            this.$refs[form].validate((valid) => {
                if(valid){
                    var url = 'bbsuser/delTopic/'+this.selfId;;
                    this.$http({
                        url:url,
                        method:'delete',
                        headers:{
                            'X-Access-Token': sessionStorage.getItem('accessToken'),
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        }
                    }).then(function(res){
                        // console.log(res)
                        if(0 == res.data.returnCode){
                            // console.log(res)
                            _this.$message.success('删除成功！');
                            _this.dialogFormVisible2 = false;
                            _this.getInvitationList('','listByNew','sortByDefault',_this.pageSize,_this.currentPage-1,_this.id);
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
      },
      //弹出框取消后,清楚表单验证
      cancelDeleteInvitation(form){
          var _this = this
          _this.dialogFormVisible1 = false
          this.$refs[form].resetFields()
      },
      //弹出框取消后,清楚表单验证
      cancelDeleteInvitation1(form){
          var _this = this
          _this.dialogFormVisible2 = false
          this.$refs[form].resetFields()
      },
      //获取上传的文件
      getFile(){
            this.file = event.target.files;
            var that = this;
            var reader = new FileReader();
            reader.readAsDataURL(this.file[0]);
            reader.onload = function(){
                that.ImgUrl = this.result;
            }

            this.upload();
            // this.getImg()
      },
      //执行上传操作
        upload(){
            this.file = event.target.files;
            var _this = this;
            var reader = new FileReader();
            reader.readAsDataURL(this.file[0]);
            reader.onload = function(){
                _this.ImgUrl = this.result;
            }
            var url = 'bbsModule/module/logo/update'+'?date='+new Date().getTime();
            let formData = new FormData();
            formData.append("logo", this.file[0]);
            formData.append("id",this.form.id);
            formData.append("sumary",this.form.sumary)
            this.$http.post(url,formData,{
                headers: {
                'X-Access-Token': sessionStorage.getItem('accessToken'),
                'Content-Type': 'multipart/form-data'
                }
            }).then(function(res){
                if(0 == res.data.returnCode){
                    // console.log(res)
                    _this.$message.success('更新成功！');
                    _this.getSectionList()
                    // _this.getImg()
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
      //上传头像展示
      getImg(){   
        this.ImgUrl = this.GLOBAL.BASE_URL.substring(0,26)+'adminportal/bbs/module/logo/'+this.id+'?date='+new Date().getTime();
      },
      //用户头像展示
      getUserImg(){
          this.ImgUserUrl = this.GLOBAL.BASE_URL.substring(0,26)+'isvportal/bbsuser/avatar/'
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
        ForumIndex
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
    top:0;
    left: 0%;
    cursor: pointer;
    font: 12px/30px 'microsoft yahei';
    text-align: center;
    /* border-radius: 10% */
}
.upfile input {
    width: 96px;
    height: 38px;
    position: absolute;
    top: 0;
    left: 0%;
    opacity: 0;
}
.deleteSelf {
    position: absolute;
    top: 32px;
    right: 25%;
    color: #ff3040;
    cursor: pointer;
    font: 12px 'microsoft yahei';
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
    top: 0px;
    left: 0px;
    width: 60px;
    height: 60px;
}
.sectionhead-portrait .two {
    position: relative;
}
.sectionhead-portrait .two span.upload{
    display: block;
    font:14px/20px 'microsoft yahei';
    position: absolute;
    width: 60px;
    text-align: center;
    top: 18px;
    left: 0; 
    background-color: #18a68a;
    color: #fff;
    cursor: pointer;
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
    /* cursor: pointer; */
    position: relative;
}
.sectiontheme h4 span {
    display: block;
    font:14px/20px 'microsoft yahei';
    position: absolute;
    width: 60px;
    text-align: center;
    top: 0;
    right: 0; 
    background-color: #18a68a;
    color: #fff;
    cursor: pointer;
    margin-left: 134px
}
.sectiontheme h4 span.attention{
    background-color: #ccc;
    color: #fff;
    cursor: pointer;
}
.sectiontheme p {
    font:12px/20px 'microsoft yahei';
    margin-top:6px;
    text-align:left
}
.sectiontheme p span.distance {
    margin-left: 10px;
}
.sectiontheme p span i {
    font-style: normal;
    color: skyblue;
    margin-left:4px;
}
.sectiontheme span.edit {
    display: block;
    font:14px/20px 'microsoft yahei';
    position: absolute;
    width: 60px;
    text-align: center;
    bottom: 14%;
    right: -60%; 
    color: #0084ff;
    cursor: pointer;
}
.imgbg {
    display: block;
    width: 60px;
    height: 60px;
    /* background-color: #0084ff; */
    position: relative;
    padding:0 auto;
    border: 1px solid #ccc;
    box-sizing: border-box
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
    width: 16%;
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
    width: 38%;
    float: right;
    margin-right: 4%;
    margin-top: 4px;
}
.search-input {
    width: 79%;
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
    position: relative;
}
.head-portrait {
    width: 6%;
    float: left;
    text-align: left;
    padding-left: 10px;
}
.head-portrait img {
    width: 40px;
    height: 40px;
    border-radius: 50%
}
.theme {
    width: 53%;
    margin-left: 2%;
    float: left;
    margin:0;
    text-align: left;
    position: relative;
}
.theme h3 {
    font:14px 'microsoft yahei';
    text-align: left;
    margin: 0;
    cursor: pointer;
    position: relative;
    overflow:hidden;
    text-overflow: ellipsis;
    white-space:nowrap
}
.subtitle {
    position: absolute;
    top: -3px;
    left: 14px;
}
.subtitle>span {
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
.subtitle>span.top {
    background-color: #0084ff;
}
.subtitle>span.main {
    margin-left: 8px;
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
    color: skyblue
}
.operator {
    margin-top: 8px;
    width: 22%;
    overflow: hidden;
    float: left;
    padding-left: 70px;
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
.leftPadding {
    padding-left: 46px !important;
}
.leftpadding{
    padding-left: 90px !important;
}
.Leftpadding {
    padding-left: 0px !important;
}
</style>

