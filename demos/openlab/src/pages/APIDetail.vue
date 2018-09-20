<template>
  <div class="page" >
    <!--面包屑开始-->
    <div class="api-experience">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/API' }">在线体验</el-breadcrumb-item>
        <el-breadcrumb-item><span style="color: #008fd5;">{{newsList.apiTitle}}</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--面包屑结束-->

    <div class="content">
      <!--online experience 上-->
      <div class="experience-title">
        <el-row :gutter="0">
          <el-col :span="24">
            <div class="grid-content">
              <el-card>
                <div style="text-align: left;" >
                  <el-col :span="3" >
                    <img :src="this.GLOBAL.BASE_URL+'api/icon/'+this.$route.params.apiId" class="api-image">
                  </el-col>
                  <el-col :span="21">
                    <div class="title font-normal">{{newsList.apiTitle}}</div>
                    <div class="bottom-desc clearfix">
                      <div style="line-height: 20px;overflow: hidden">{{newsList.apiDesc}}</div>
                    </div>
                  </el-col>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
      <!--online experience end-->
      <div class="experience-content ">
        <el-tabs   :tab-position="tabPosition"
                   @tab-click="handleClick">
          <el-tab-pane :label="item.title"
                       :value="item.methodId"
                       v-for="(item ,num) in sideList"
                       :key="item.methodId"
                        >
            <div class="tabs-title ">
              <el-row :gutter="0">
                <el-col :span="24" >
                  <div class="grid-content">
                    <el-card class="divbox">
                      <div class="pulicSty" style="margin-top: 16px;">{{contentList.title}}</div>
                      <div style="margin-top: 10px;"><pre>{{contentList.description}}</pre></div>
                      <div style="margin-top: 10px;"><span class="wayName">方法名 : </span>&nbsp;&nbsp;&nbsp;&nbsp;{{contentList.method }}</div>
                      <div v-if="contentList.methodType === 0">
                        <p class="requestName pulicSty">请求参数</p>
                        <div v-if="contentList.requestParam">
                          <div>
                            <div class="requestTable" style="width:773px;">
                              <el-table
                                :data="requestList"
                                border
                                style="width: 100%">
                                <el-table-column
                                  prop="name"
                                  label="参数名"
                                  width="180">
                                </el-table-column>
                                <el-table-column
                                  prop="type"
                                  label="类型"
                                  width="180">
                                </el-table-column>
                                <el-table-column
                                  prop="required"
                                  label="必选"
                                  width="180">
                                </el-table-column>
                                <el-table-column
                                  prop="description"
                                  label="说明"
                                  width="230">
                                </el-table-column>
                              </el-table>
                            </div>
                          </div>
                        </div>
                        <div v-else style="margin-top: 10px;">无</div>
                        <p class="responseName pulicSty">响应参数</p>
                        <div v-if="contentList.responseParam">
                          <div style="margin-top: 10px;">
                            <div class="responseTable"  style="width:611px;">
                              <el-table
                                :data="responseList"
                                border
                                >
                                <el-table-column
                                  prop="name"
                                  label="参数名"
                                  width="180">
                                </el-table-column>
                                <el-table-column
                                  prop="type"
                                  label="类型"
                                  width="180">
                                </el-table-column>
                                <el-table-column
                                  prop="description"
                                  label="说明"
                                  width="250">
                                </el-table-column>
                              </el-table>
                            </div>
                          </div>
                        </div>
                        <div v-else style="margin-top: 10px;">无</div>
                      </div>
                      <div class="pulicSty">请求示例</div>
                      <div style="margin-top: 10px;" v-if="contentList.demo"><pre>{{contentList.demo}}</pre></div>
                      <div v-else style="margin-top: 10px;">无</div>
                      <div v-if="contentList.methodType === 1">
                        <div style="margin-top: 10px;" v-if="contentList.inParams"><pre>{{contentList.inParams}}</pre></div>
                        <div v-else style="margin-top: 10px;">无</div>
                      </div>
                      <div v-if="contentList.methodType === 1">
                        <div class="pulicSty">响应示例</div>
                        <div style="margin-top: 10px;" v-if="contentList.responseDemo"><pre>{{contentList.responseDemo}}</pre></div>
                        <div v-else style="margin-top: 10px;">无</div>
                      </div>
                    </el-card>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'APIDetail',
  data() {
    return {
      newsList:[],
      sideList:[],
      requestList:[],
      responseList:[],
      tabPosition:"left",//资源获取tab的展示方式
     // activeName: 'first',
      contentList:[]
    }
  },
  mounted:function() { //钩子函数
    this.getNewsLists();//获取头部信息
    window.scrollTo(0,0);//初始化页面在最顶部
  },
  methods: {
    getNewsLists:function () {
      let _this = this;
      this.$http({
        url: 'api/explore/'+_this.$route.params.apiId,
        method: 'get',
        headers: {
          'X-Access-Token': sessionStorage.getItem('accessToken')
        }
      }).then(function (response) {
        if (0 == response.data.returnCode) {
          // response.data.data.apiDesc = response.data.data.apiDesc.replace(/(\r\n)/g,'<br/>')
          // response.data.data.apiDesc = response.data.data.apiDesc.replace(/(^\s+)|(\s+$)|\s+/g,'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
          _this.newsList = response.data.data;
          _this.sideList = response.data.data.methods;
          if(_this.sideList.length>0){
            let methodIds = _this.sideList[0].methodId;
            _this.getContentLists(methodIds);
          }
        }else{
           _this.$message('查询失败！');
        }
      }).catch(function (error) {
        _this.$message('查询失败！');
      });
    },
    handleClick:function (tab,event) {
      let methodId = tab.$attrs.value;
      let _this = this;
      this.$http({
        url: 'api/detail/'+methodId,
        method: 'get',
        headers: {
          'X-Access-Token': sessionStorage.getItem('accessToken')
        }
      }).then(function (response) {
        if (0 == response.data.returnCode) {
          _this.contentList = response.data.data;
          _this.requestList = response.data.data.requestParam;
          _this.responseList = response.data.data.responseParam;

        }else{
          _this.$message('查询失败！');
        }
      }).catch(function (error) {
        _this.$message('查询失败！');
      });
    },
    getContentLists:function (methodId) {
      let _this = this;
      this.$http({
        url: 'api/detail/'+methodId,
        method: 'get',
        headers: {
          'X-Access-Token': sessionStorage.getItem('accessToken')
        }
      }).then(function (response) {
        if (0 == response.data.returnCode) {
          _this.contentList = response.data.data;
          _this.requestList = response.data.data.requestParam;
          _this.responseList = response.data.data.responseParam;
        }else{
          _this.$message('查询失败！');
        }
      }).catch(function (error) {
        _this.$message('查询失败！');
      });
    }
  }

}
</script>

<style>
  pre {
white-space: pre-wrap;
word-wrap: break-word;
}
  .divbox {
    text-align: left
  }
  .content{
    font-size: 14px;
    font-family: "微软雅黑";
    color: #666;
  }
  .api-image {
    float: left;
    width: 80px;
    height: 80px;
    margin-right: 20px;
  }
  .title{
    color: #373d41;
    font-size: 24px;
  }
  .bottom-desc{
    margin-top: 10px;
  }
  .bottom-desc div,.bottoms div{
    color: #666;
    font-size: 14px;
  }
  .tabs-title{
    width: 771px;
    margin-top: -20px;
  }
  .api-experience {
    margin-left: 100px;
    margin-top: 20px;
  }
  .experience-title{
    border-bottom: 1px solid #eee;
    margin: 20px 82px;
    padding-bottom: 20px;
  }
  .pulicSty{
    color: #373d41;
    font-size: 16px;
    margin-top: 40px;
  }
  .wayName{
    font-size: 16px;
    color: #373d41;
  }
  .el-tabs--left .el-tabs__active-bar.is-left, .el-tabs--left .el-tabs__nav-wrap.is-left::after{
    height: 0;
  }
/* .el-table__body-wrapper .is-scrolling-none{
    overflow-y: hidden !important;
  }*/
  .el-table--scrollable-y .el-table__body-wrapper{
    overflow-y: hidden !important;
  }
  .experience-content th,.cell{
    text-align: center;
  }
  pre{
    font-size: 14px !important;
    font-family: "\5FAE\8F6F\96C5\9ED1" !important;
  }
</style>
