<template>
  <div class="forumSection-content">
            <div class="forum-content">
                <el-row>
                    <el-col :span="2">总帖子：{{topicCount}}</el-col>
                    <el-col :span="2" :offset="1">总回复：{{responseCount}}</el-col>
                </el-row>
                <el-row>
                    <div class="sectionBody" v-for="(item,index) in forumSectionList" :key="index">
                        <h3>{{item.name}}</h3>
                        <div class="sectionblocks">
                            <div class="sectionblock" v-for="(block,index) in item.modules" :key="index" :class="{lastblock:(item.modules.length)>3&& (index>0)}">
                                <div class="sectionhead-portrait">
                                    <span class="imgbg">
                                        <img :src="ImgUrl+block.id+'?date='+new Date().getTime()">
                                    </span>
                                    
                                </div>
                                <!-- 帖子主题 -->
                                <div class="sectiontheme" style="margin-left:20px;">
                                    <h4 @click.stop="toPath('/sectionDetail',{id:block.id})">{{block.name}}</h4>
                                    <p>
                                    <span>帖子: {{block.topicCount}}</span>
                                    <span class="distance">回复: {{block.replyCount}}</span><br/>
                                    <span>版主:  <i v-for="(it,index) in block.moderators" :key="index" style="cursor:pointer" @click.stop="toPath('/personalCenter',{userid:it.userId})">{{it.userName || '无'}}、</i></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-row>
            </div>
        </div>
</template>
<script>
export default {
  data(){
      return {
          caseType:'forumSection',
          topicCount:'',
          responseCount:'',
          forumSectionList:[],
          ImgUrl:''
      }
  },
  mounted(){
      this.totalCount();
      this.section();
      this.getImg()
  },
  methods:{
    //上传头像展示
      getImg(){   
        this.ImgUrl = this.GLOBAL.BASE_URL.substring(0,26)+'adminportal/bbs/module/logo/';
      },
    toPath(url,params){
        this.$router.push({
            path:url,
            query:params
        });
    },
    //总发帖量,回复数
    totalCount(){
        var _this = this;
        this.$http({
            url:'bbsIndex/total/all'+'?date='+new Date().getTime(),
            method:'get',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken'),
            }
        }).then(function(res){
            // console.log(res)
            if(0 == res.data.returnCode){
                _this.topicCount = res.data.data.replyCount
                _this.responseCount = res.data.data.topicCount
            }else {
                _this.$message.error(res.data.mesaage ||'查询失败！');
            }
        })
    },
    section(){
        var _this = this;
        this.$http({
            url:'bbsIndex/list/module/square'+'?date='+new Date().getTime(),
            method:'get',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken'),
            }
        }).then(function(res){
            // console.log(res)
            if(0 == res.data.returnCode){
                // console.log(res)
                _this.forumSectionList = res.data.data
            }else {
                _this.$message.error(res.data.mesaage ||'查询失败！');
            }
        })
    }
  }
}
</script>
<style scoped>
    .forum-content {
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
    .sectionBody h3 {
        margin: 0;
        width: 100%;
        height: 40px;
        padding-left: 20px;
        font: 500 14px/40px 'microsoft yahei';
        text-align: left;
        background-color: #f7f8fa;
        border-bottom: 1px solid #eee
    }
    .sectionBody .sectionblocks {
        width: 100%;
        padding: 20px 10px;
        overflow: hidden;
    }
    .sectionBody .sectionblock {
        width: 30%;
        float: left;
        margin-right: 3%;
        padding-top: 10px;
    }
    .sectionhead-portrait {
        width: 20%;
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
    .sectiontheme {
        width: 70%;
        margin-left: 20px;
        float: left;
        margin:0;
        text-align: left
    }
    .sectiontheme h4 {
        font:14px 'microsoft yahei';
        text-align: left;
        margin: 0;
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
    .imgbg {
        display: block;
        width: 60px;
        height: 60px;
        /* background-color: #0084ff; */
        position: relative;
        padding:0 auto;
    }
    .lastblock {
        margin-bottom: 30px;
    }
</style>


