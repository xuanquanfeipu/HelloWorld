<template>
  <div class="comment-bodys">
    <div class="comment-body" v-for="(item,index) in responseTopic" :key="index" :style="indent">
        <input type="hidden" v-model="key">
        <div class="invitation-body">
            <div class="head-portrait">
                <!-- <span class="imgBg-skyblue-radius">
                    <img :src="ImgUserUrl+1">
                </span> -->
            </div>
            <!-- ???????? -->
            <div class="theme">
                <div class="commendtitle">
                    <span class="fontcolorblue">{{item.cusomer.realName}}</span>
                    <span class="distance">发表于 {{item.createTime}}</span>
                </div>
                <div v-html="item.content" class="contentP"></div>
            </div>
            <!-- ?????? -->
            <div class="state">
                <!-- <span class="floor">{{index++}}#</span> -->
                <div class="commendoperator" v-show="!(item.cusomer.id == customerId ||isLogin)">
                    <!-- <span class="colorblue">举报</span> -->
                    <span class="colorgreen distance" @click="response(item.id,item.anonymous,item.cusomer.id)">回复</span>
                </div>
                <div class="commendoperator" v-show="item.cusomer.id == customerId||isLogin">
                    <span class="colorgreen"  @click="isForbidden(item.id,item.anonymous,item.cusomer.id)">回复</span>
                    <span class="colorred distance" @click="deleteReply(item.id)">删除</span>
                </div>
            </div>
        </div>
        <review v-if="item.replyList" :responseTopic='item.replyList' :isLogin='isLogin' ref="review" :isFlag='isFlag'></review>
    </div>

</div>
</template>
<script>
import Review from './Review'
import UE from '../components/UE'
import store from '@/vuex/store'
export default {
  name:'review',
  props:['responseTopic','isLogin','isFlag'],
  data(){
      return{
        ImgUserUrl:'',
        defaultMsg: '',
        key:'',
        flag:false,
        dialogFormVisible:false,
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
          initialFrameHeight: 200,
          elementPathEnabled:false,//是否启用元素路劲
          wordCount:false,//是否开启字数统计
          autoFloatEnabled:false//是否保持toolbar的位置不动
        },
        anonymous:'',
        topicId:this.$route.query.topicId,
        postId:'',
        customerId:sessionStorage.getItem('customerId')
      }
  },
  store,
  created(){
      this.getUserImg()
  },
  methods:{
      //判断是否是被禁言用户
      isForbidden(postId,anonymous,customerId){
        var _this = this;
        this.$http({
            url:'topic/isForbid',
            method:'get',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken'),
            }
        }).then(function(res){
            if(0 == res.data.returnCode){
                if(res.data.data == false){
                   _this.response(postId,anonymous,customerId)
                }else{
                    _this.$message.error(res.data.mesaage ||'您被禁言了,不能发表帖子');
                }
            }else if(1011 == res.returnCode){
                _this.$message('您需要登录后才能发表帖子!');
            }else{
                _this.$message.error('操作失败!')
            }
        })
      },
      //用户头像展示
      getUserImg(){
          this.ImgUserUrl = this.GLOBAL.BASE_URL.substring(0,26)+'isvportal/bbsuser/avatar/'
      },
      response(postId,anonymous,customerId){
        console.log(postId)
        this.$store.commit('getId',postId,anonymous,customerId)
        $('html,body').stop().animate({scrollTop:$(".forum-container").height()-400},500)
      },
      cancel(){
          this.flag = false
          this.$emit('isFlag',this.flag)
          this.dialogFormVisible = false
          
      },
      deleteReply(id){
        this.$store.commit('deleteReplyId',id)
        var _this = this;
        this.$http({
            url:'topic/postDelete/'+this.$store.state.deleteId,
            method:'post',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken'),
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(function(res){
            if(0 == res.data.returnCode){
                _this.$message.success('删除成功！');
                window.location.reload()
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
  },
  computed:{
      indent(){
          return {
              'padding-right':0
          }
      }
  },
  components:{
      UE
  }
}
</script>
<style>
p{
    margin: 0;
    padding: 0;
}
</style>
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
    margin-top: -10%!important;
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
    width: 40%;
    /* padding: 20px 20px */
}
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
}
.detaiContent .intro .left h1 div.subtitle {
    position: absolute;
    top: 0;
    left: 70%;
}
.detaiContent .intro .left h1 div.subtitle span {
    display: block;
    text-align: center;
    font:12px 'microsoft yahei';
    color: #fff;
    line-height: 24px;
    width: 60px;
    float: left;
    margin: 0;
    border-radius: 8px;
}
.detaiContent .intro .left h1 div.subtitle span.top {
    background-color: #0084ff;
}
.detaiContent .intro .left h1 div.subtitle span.main {
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
    overflow: hidden;
    /* padding: 0 20px; */
    box-sizing: border-box
}
.comment-body {
    width: 100%;
    overflow: hidden;
    padding: 0 20px 0 40px;
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
    /* height: 80px; */
    padding: 10px;
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
    width: 90%;
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
.contentP >p{
    margin: 2px 0;
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
</style>

