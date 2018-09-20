<template>
  <div class="page">
    <!--banner开始-->
    <banner :banner-msg="bannerMsg"></banner>
    <!--banner结束-->

    <!--learn服务-->
    <div class="learn-title content">
      <el-row :gutter="0">
        <el-col :span="12" v-for="(item ,index) in newsList" :key="index">
          <div class="grid-content">
            <el-card>
              <div style="text-align: left;margin: 20px 0 0 30px;" :class="{'border-right': index==0 }">
                <img :src="item.img" class="image">
                  <img :src="item.icon" class="icon">
                  <div class="font-normal">{{item.title}}</div>
                <div class="font-normal-bg font-small clearfix">
                  <div class="learn-desc">{{item.desc}}</div>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--learn服务end-->

    <!--learn搜索-->
    <div class="learn-search content">
      <el-row :gutter="0">
        <el-col :span="8">
          <div class="grid-content">
            <div class="cell font-small" @click="sortFormName(5,'default')">
              <span :class="{'ask':sort.isA == 5}">默认排序</span>
            </div>
            <div class="cell font-small">
              <span :class="{'ask':sort.isA == 1||sort.isA == 2}" @click="sortFormName('','visitors')">按访问量排序</span>
              <span class="caret-wrapper">
                <i class="sort-caret ascending" :class="{'active':sort.isA == 1}" @click="sortMake(1,'asc','visitors')"></i>
                <i class="sort-caret descending" :class="{'active':sort.isA == 2}" @click="sortMake(2,'desc','visitors')"></i>
              </span>
            </div>
            <div class="cell font-small">
              <span :class="{'ask':sort.isA == 3||sort.isA == 4}" @click="sortFormName('','create_time')">按上线时间排序</span>
              <span class="caret-wrapper">
                <i class="sort-caret ascending" :class="{'active':sort.isA == 3}" @click="sortMake(3,'asc','create_time')"></i>
                <i class="sort-caret descending" :class="{'active':sort.isA == 4}" @click="sortMake(4,'desc','create_time')"></i>
              </span>
            </div>
          </div>
        </el-col>
        <el-col style="width: 420px;margin-left: 380px">
          <div class="grid-content">
            <el-select :style="selectBg"
                       v-model="sort.courseType"
                       placeholder="请选择产品"
                       size="small"
                       @change="productChage">
              <el-option value="" label="全部">全部</el-option>
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-input  :style="inputBg" placeholder="请输入关键字" size="small" v-model="sort.keyWords"></el-input>
            <el-button  :style="searchBg" type="primary" class="search-button"  @click="search">搜索</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--learn搜索end-->

    <!--learn内容-->
    <div class="learn-source content">
        <div class="case-item" v-for="(item,index) in apiList" :key="item.apiId" :class="{'case-item-border':index<apiList.length-1}">
          <el-row :gutter="0">
            <el-col :span="13">
              <div class="grid-content">
                <img :src="item.apiLogo" style="float:left;"/>
              </div>
            </el-col>
            <el-col :span="11">
              <div class="grid-content font-color">
                <div class="font-big" style="margin-bottom: 30px;">{{item.apiTitle}}</div>
                <div class="font-normal"><span style="margin-right: 16px;">访问人数：</span>{{item.visitors}}</div>
                <div class="font-normal"><span style="margin-right: 16px;">上线时间：</span>{{item.createTime&&item.createTime.substring(0,10)}}</div>
                <div class="font-normal"><span style="margin-right: 16px;">API类型 ：</span>{{item.apiType}}</div>
                <div class="font-normal api-desc">
                 <span style="margin-right: 16px;width: 80px;">API介绍 ：</span>{{item.apiDesc}}
                </div>
                <router-link :to="{path:'/APIDetail/'+item.apiId}"><el-button :style="experienceBg">立即体验</el-button></router-link>
              </div>
            </el-col>
          </el-row>
      </div>
    </div>
    <!--learn内容end-->
  </div>
</template>

<script type="text/javascript">
  import Banner from '../components/Banner'
  export default {
    name:'API',
    data() {
      return {
        bannerMsg:{
          bgBtn:{
            // backgroundImage:'url(' + require('../../static/images/api/banner.png') + ')',
            backgroundImage:'url(' + this.GLOBAL.BASE_URL + 'api/banner' + ')',
            backgroundPosition:'center',
            height: '300px'
          },
          title:'API EXPLORER 在线体验',
          desc:'在线学习体验中兴开放的API',
          file:"咨询服务  1步完善行业信息，方便后续提供更优服务和行业优惠",
          fileUrl:"/support",
          textAlign:{
            'text-align':"left"
          },
          hWidth:{
            width:'546px'
          }
        },
        sort:{
          isA:5,//排序
          keyWords:"",//关键字
          courseType:"",//课程类型
        },
        params:{
          name:"",
          productId:"",
          sort:""
        },
        newsList:[{
          img:"static/images/api/money.png",
          icon:"static/images/api/new.png",
          title:'中兴智慧金融信息云服务',
          desc:'大智慧金融云服务室通过信息服务模块化量身定制，为客户快速实现移动版、网页版、终端以及数据'
        },{
          img:"static/images/api/energy.png",
          icon:"static/images/api/hot.png",
          title:"能源平台数据保全服务",
          desc:"国信电子数据保全平台为能源交易中心、交易所、商城等能源互联网交易平台提供全证据链风险防控"
        }],
        options: [],
        apiList:[],
        selectBg:{backgroundImage:'url(' + require('../../static/images/api/200.png') + ')'},
        inputBg:{backgroundImage:'url(' + require('../../static/images/api/140.png') + ')'},
        experienceBg:{backgroundImage:'url(' + require('../../static/images/api/206.png') + ')'},
        searchBg:{backgroundImage:'url(' + require('../../static/images/api/60.png') + ')'}
      }
    },
    components:{
      Banner
    },
    mounted:function() { //钩子函数
      window.scrollTo(0,0);//初始化页面在最顶部
      if(this.$route.query.id){
        //从产品api模块进入，带入产品id
        this.fromProductById();
      }else{
        this.getApiList();//获取所有API信息
      }
      this.getProductList()//获取产品下拉信息

    },
    methods:{
      getApiList:function () {
        let _this = this;
        this.$http.get('api/list', {}).then(function (response) {
          if(0 == response.data.returnCode && response.data.data) {
            _this.apiList = response.data.data?response.data.data.map((item) => {
              return {
                apiId: item.apiId,
                apiTitle:item.apiTitle,
                visitors:item.visitors,
                createTime:item.createTime,
                apiType:item.apiType,
                apiDesc:item.apiDesc,
                apiLogo:_this.GLOBAL.BASE_URL+"api/logo/"+ item.apiId
              }
            }):[];
          }else{
            _this.$message('获取API列表失败！');
          }
        }).catch(function (error) {});
      },
      getProductList:function () {
        let _this = this;
        this.$http.get('product/listbytype?category=-1', {
        }).then(function (response) {
          if(0 == response.data.returnCode && response.data.data) {
            _this.options = response.data.data?response.data.data.map((item) => {
              return {
                id: item.productId,
                name: item.productName
              }
            }):[];
          }else{
            _this.$message('获取产品列表失败！');
          }
        }).catch(function (error) {});
      },
      sortMake:function (num,type,sort) {
        let _this = this;
        _this.sort.keyWords = "";
        _this.sort.courseType = "";
        _this.sort.isA = num ;
        _this.params={
          name:"",
          productId:"",
          sort:sort+" "+type
        }
        _this.ajaxAPIList(_this.params);
      },
      fromProductById(){
        let _this = this;
        _this.sort.courseType = +_this.$route.query.id;
        _this.productChage();
      },
      productChage(){
        let _this = this;
        _this.sort.keyWords = "";
        _this.sort.isA = 5;
        _this.params={
          name:"",
          productId:_this.sort.courseType,
          sort:""
        }
        _this.ajaxAPIList(_this.params);
      },
      ajaxAPIList(params){
        let _this = this;
        this.$http.get('api/listbycond', {
          params:params
        }).then(function (response) {
          if(0 == response.data.returnCode && response.data.data) {
            _this.apiList = response.data.data.length>0?response.data.data.map((item) => {
              return {
                apiId: item.apiId,
                apiTitle:item.apiTitle,
                visitors:item.visitors,
                createTime:item.createTime,
                apiType:item.apiType,
                apiDesc:item.apiDesc,
                apiLogo:_this.GLOBAL.BASE_URL+"api/logo/"+ item.apiId
              }
            }):[];
          }else{
            _this.apiList = [];
            _this.$message('获取API列表失败！');
          }
        }).catch(function (error) {});
      },
      sortFormName(num,sort){
        let _this = this;
        _this.sort.keyWords = "";
        _this.sort.courseType = "";
        _this.params={
          name:"",
          productId:"",
          sort:""
        }
        var type = "";
        if(sort == "default"){
          _this.params.sort = "";
          _this.sort.isA = 5;
        }else if(sort == "visitors"){
          if(_this.sort.isA == 1) {
            _this.sort.isA = 2;
            type = "desc";
          }else{
            _this.sort.isA = 1;
            type = "asc";
          }
          _this.params.sort = sort+" "+type;
        }else{
          if(_this.sort.isA == 3) {
            type = "desc";
            _this.sort.isA = 4;
          }else{
            type = "asc";
            _this.sort.isA = 3;
          }
          _this.params.sort = sort+" "+type;
        }
        _this.ajaxAPIList(_this.params);
      },
      search(){
        let _this = this;
        _this.sort.courseType = "";
        _this.sort.isA = 5;
        _this.params={
          name:_this.sort.keyWords,
          productId:"",
          sort:""
        }
        _this.ajaxAPIList(_this.params);
      }
    }
  }
</script>

<style scoped>
  .page {
    padding-bottom: 40px;
  }
  .learn-search {
    height:48px;
  }

  .learn-search .grid-content {
    margin-top: 9px;
  }
  .learn-source {
    height:auto;
  }

  .font-color {
    color:#373d41;
    line-height: 30px;
  }

  .el-card {
    height: 120px;
    color:#373d41;
  }

  .el-card__body>div .bottom{
    font-size: 12px;
    margin-top: 14px;
  }

  .learn-desc {
    line-height: 20px;
    width: 400px;
    overflow: hidden;
    margin-top: 3px;
  }
  .learn-title .icon {
    float: left;
    margin-right: 10px;
    margin-top: 3px;
  }

  .image {
    float: left;
    width: 80px;
    height: 80px;
    margin-right: 20px;
  }

  .learn-source .grid-content{
    text-align: left;
  }

  .case-item {
    width: 1140px;
    margin: 0 auto;
    padding: 40px 0;
  }

  .case-item-border {
    border-bottom: 1px solid #e5e5e5;
  }

  .learn-source img {
    height: 280px;
    width: 520px;
  }
  .case-item .el-button {
    color: #0084ff;
    margin-top: 30px;
    width: 206px;
    height: 44px;
  }
  .el-button a {
    color: #0084ff;
    text-decoration: none;
  }

  .caret-wrapper {
    display: inline-flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: 16px;
    vertical-align: middle;
    cursor: pointer;
    overflow: initial;
    position: relative;
  }

  .cell {
    width: 124px;
    float: left;
    border-right: 1px solid #e5e5e5;
    margin-top: 5px;
    cursor: pointer;
  }

   .sort-caret.ascending {
     border-bottom-color: #c0c4cc;
     top: -10px;
  }
   .sort-caret.descending {
     border-top-color: #c0c4cc;
     bottom: -11px;

  }
   .sort-caret{
      border: 5px solid transparent;
      position: absolute;
      left: 6px;
  }
  .el-select {
    width: 140px;
    float: left;
  }

  .el-input {
    height: 32px;
    width: 200px;
  }
  .ask {
    color: #0084ff;
  }
   .ascending.active {
     border-bottom-color: #0084ff!important;
   }

  .descending.active {
    border-top-color: #0084ff!important;
  }

  .border-right {
    border-right: 1px solid #e5e5e5;
  }

  .search-button {
    width: 60px;
    height: 31px;
    padding: 0;
  }
  .api-desc {
    max-height: 53px;
    overflow: hidden;
  }

</style>
