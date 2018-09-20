<template>
  <div class="forum-container">
      <div class="forum-all">
        <forum-title @selectTitleType='showType'></forum-title>
        <forum-index v-if="isShow"></forum-index>
        <!-- 发表新帖子 -->
        <div v-if="!isShow">
            <!-- 面包学导航 -->
            <el-row>
                <el-col :span="24" style="box-sizing: border-box;position:relative">
                    <div class="breadLink">
                        <el-breadcrumb separator-class="el-icon-arrow-right">
                            <el-breadcrumb-item :to="{ path: '/forum' }" class="fontcolor">社区</el-breadcrumb-item>
                            <el-breadcrumb-item :to="{path:'/sectionDetail',query:{id:1}}" v-if="name">{{name}}</el-breadcrumb-item>
                            <el-breadcrumb-item><span style="color: #008fd5;">发表新帖子</span></el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                </el-col>
            </el-row>
            <!-- 标题,版块,名称 -->
            <el-row style="margin-bottom:10px">
                <el-col :span="24">
                    <div class="titlebody">
                        <el-form :model="form" ref="form" :rules="rules">
                        <!-- <div class="input"> -->
                            <el-form-item prop="inputtitle" style="width:50%;float:left">
                                <el-input placeholder="请输入内容" v-model="form.inputtitle">
                                    <template slot="prepend">标题</template>
                                </el-input>
                            </el-form-item>
                        <!-- </div> -->
                        <!-- <div class="select"> -->
                                <el-form-item prop="moduleTypeId" style="float:left;margin-left:60px">
                                    <el-select v-model="form.moduleTypeId" placeholder="请选择" @change="sectionNameList">
                                        <el-option value="" label="版块类别">版块类别</el-option>
                                        <el-option
                                        v-for="item in categoryList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item prop="moduleId" style="float:left;margin-left:34px">
                                    <el-select v-model="form.moduleId" placeholder="请选择">
                                        <el-option value="" label="版块名称">版块名称</el-option>
                                            <el-option
                                            v-for="item in nameList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                            </el-option>
                                    </el-select>
                                </el-form-item>
                            <!-- </div> -->
                        </el-form>
                    </div>
                </el-col>
            </el-row>
            <!-- 输入框 -->
            <el-row>
                <el-col :span="24" style="width:100%;position:relative;padding:0 20px 60px 20px;margin-bottom:40px;">
                    <div class="uedit">
                        <UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>
                    </div>
                    <div class="btnGroup">
                        
                        <div class="upfile">
                            <span>上传文件</span>
                            <input type="file" id="file" @change="getFile($event)" multiple>
                        </div>
                        <!-- <el-upload
                        class="upload-demo"
                        ref="upload"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        :auto-upload="false">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                        </el-upload> -->


                        <el-button type="primary" style="background-color:#0084FF;float:left;width:96px" @click="submit('1','form')">发表</el-button>
                        <el-button type="primary" style="background-color:#10A386;float:left;margin-left:10px" @click="submit('0','form')">保存草稿</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
      </div>
  </div>
</template>
<script>
import ForumTitle from '../components/ForumTitle'
import ForumIndex from '../components/ForumIndex'
import UE from '../components/UE'
export default {
  data(){
      return {
        fileList:[],
        isShow:false,
        defaultMsg: '',
        form:{
            inputtitle:'',
            moduleTypeId:'',
            moduleId: '',
        },
        categoryList: [],//版块分类列表
        nameList: [],//版块名称列表
        inputtitle:'',
        rules:{
            inputtitle:[{ required: true, message: '请输入标题', trigger: 'blur,change' }],
            moduleTypeId:[{ required: true, message: '请选择版块类别', trigger: 'change' }],
            moduleId:[{ required: true, message: '请选择版块名称', trigger: 'change' }]
        },
        moduleId:this.$route.query.moduleId,
        moduleTypeId:this.$route.query.typeId,
        name:this.$route.query.name,
        config: {
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
        initialFrameWidth: null,
        initialFrameHeight: 400,
        elementPathEnabled:false,//是否启用元素路劲
        wordCount:false,//是否开启字数统计
        autoFloatEnabled:false,//是否保持toolbar的位置不动
        file:'',
       
    }
      }
  },
  mounted(){
    //   console.log(document.querySelector("#file").files)
      
      this.sectionCategoryList()
  },
  methods:{
      showType(data){
          this.isShow = data
      },
    //   获取版块分类下拉框列表
      sectionCategoryList(){
          var _this = this;
          this.$http({
              url:"topic/moduleType",
              method:'get',
              headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken'),
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              }
          }).then(function(res){
              if(0 == res.data.returnCode){
                  _this.categoryList = res.data.data;
                  _this.form.moduleTypeId = _this.moduleTypeId;
                //   console.log(_this.mo)
                  _this.sectionNameList()
              }else if(1011 == res.data.returnCode){
                _this.$message.error('会话已过期，请重新登录！');
                _this.$router.push({
                    path:'/login'
                })
              }else {
                   _this.$message.error('获取下拉列表失败！');
              }
          })
      },
    //   根据下拉列表分类id获取版块名称
    sectionNameList(){
        var _this = this;
        
        this.form.moduleId = "";
        if(!this.form.moduleTypeId) return;
        this.$http({
            url:'topic/module/'+this.form.moduleTypeId,
            method:'get',
            headers:{
                'X-Access-Token': sessionStorage.getItem('accessToken'),
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              }
        }).then(function(res){
            if(0 == res.data.returnCode){
                  _this.nameList = res.data.data;
                  _this.form.moduleId = _this.moduleId;
                  _this.moduleId = "";
                //   console.log( _this.form.moduleId)
                //   console.log(_this.moduleId)
              }else if(1011 == res.data.returnCode){
                _this.$message.error('会话已过期，请重新登录！');
                _this.$router.push({
                    path:'/login'
                })
              }else {
                _this.$message.error('获取下拉列表失败！');
              }
        })
    },
    getFile(){
          this.file = event.target.files;
          this.$message.success('文件上传成功');
      },
    submit(state,form){
        var _this = this;
        this.$refs[form].validate((valid) => {
            if (valid) {
                let formData = new FormData();
            if(this.file){
                for(var i=0;i<this.file.length;i++){    
                formData.append("attachment", this.file[i]);
                }
            }
            if(state==0){
                var message='保存草稿成功'
                var message1 = '保存草稿失败'
                var pathUrlParams = {path:'/peopleCenter/personalHomepage'}
            }else{
                var message='发帖成功'
                var message1 = '发帖失败'
                var pathUrlParams = {
                        path:'/SectionDetail?',
                        query:{
                            id:_this.form.moduleId
                        }
                    }
            }
            // console.log(formData)
            formData.append('channelId', this.form.moduleId);
            formData.append('moduleId', this.form.moduleTypeId);
            formData.append('title', this.form.inputtitle);
            formData.append('type','');
            formData.append('body', this.$refs.ue.getUEContent());
            formData.append('state', state);
            // console.log(formData)
            var url = 'topic/add';
            var qs = require('qs')
            this.$http.post(url,formData,{
                headers: {
                'X-Access-Token': sessionStorage.getItem('accessToken'),
                'Content-Type': 'multipart/form-data'
                }
            }).then(function(res){
                if(0 == res.data.returnCode){
                    _this.$message.success(message);
                    _this.$router.push(pathUrlParams)
                }else if (1011 == res.data.returnCode){
                    _this.$message.error('您必须登陆后才能进行该操作！');
                    _this.$router.push({
                        path:'/login'
                    })
                }else {
                    _this.$message.error(message1);
                }
            })
          } else {
            
            return false;
          }
        });
    }
  },
  components:{
      ForumTitle,
      ForumIndex,
      UE
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
.upfile span {
    display: block;
    width: 96px;
    height: 38px;
    background-color: #0084ff;
    color: #ffffff;
    position: absolute;
    top:0;
    left: 31%;
    cursor: pointer;
    font: 14px/40px 'microsoft yahei';
    /* border-radius: 10% */
}
.upfile input {
    width: 96px;
    height: 38px;
    position: absolute;
    top: 0;
    left: 31%;
    opacity: 0;
}
/* 面包屑导航 */
.breadLink {
    width: 100%;
    padding: 20px 20px
}

.titlebody {
    width: 100%;
    padding: 0 20px;
    overflow: hidden;
    /* margin-bottom: 20px */
}
.titlebody .input {
    float: left;
    width: 60%;
}
.titlebody .select {
    float: left;
    margin-left: 2%;
    width: 38%;
    box-sizing: border-box;
}
.btnGroup {
    /* position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translate(-50%) */
    display: flex;
    justify-content: center;
    margin-top: 30px;
    position: relative;
}
</style>


