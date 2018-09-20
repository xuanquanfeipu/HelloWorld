<template>
  <div class="page">
    <!--banner开始-->
    <banner :banner-msg="bannerMsg"></banner>
    <!--banner结束-->
    <!--<el-row :gutter="0" class="banner">
      <div class="img" :style="bannerMsg.bgBtn">
        <el-row :gutter="20" >
          <el-col :span="24">
            <div class="grid-content ">
              <div class="title">{{bannerMsg.title}}</div>
              <div class="desc">{{bannerMsg.desc}}</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-row>-->


    <!--案例列表开始-->
    <div class="cases content">
      <div class="case-item" v-for="(item ,index) in caseList" :key="item.caseId" :class="{'case-item-border':index<caseList.length-1}">
        <el-row :gutter="0">
          <el-col :span="13" >
            <div class="grid-content ">
              <img :src="GLOBAL.BASE_URL+'successcase/logo/'+item.caseId"/>
            </div>
          </el-col>
          <el-col :span="11">
            <div class="grid-content font-color">
              <div class="font-big" style="margin: 30px 0">{{item.caseTitle}}</div>
              <div class="font-normal">技术领域：{{item.region}}</div>
              <!-- <div class="font-normal">产品类型：{{item.type}}</div> -->
              <div class="font-normal">发布日期：{{item.createTime|dateFormat}}</div>
              <div class="font-normal">
                使用产品：<span class="font-a">{{item.product}}</span>
              </div>
              <router-link :to="{path:'/casesDetail/'+item.caseId}"><el-button :style="viewBtn">查看详情</el-button></router-link>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!--案例列表结束-->
    <div v-show="flag" class="more" @click="showMore">
      <a class="font-normal font-a" style="cursor: pointer;">
        点击加载更多
        <img src="static/images/common/Up_icon.png" style="margin: 0 5px;"/>
      </a>
    </div>
  </div>
</template>

<script>
  import Banner from '../components/Banner'
  var data = null;
  var num = 0;

  export default {
    name:'Cases',
    data() {
      return {
        bannerMsg:{
          title:'客户案例',
          desc:'为企业开发者提供全球领先的云计算服务',
          bgBtn:{
            height:"300px",
            backgroundPosition:'center',
            // backgroundImage:'url(' + require('../../static/images/case/banner.png') + ')'
            backgroundImage:'url(' + this.GLOBAL.BASE_URL + 'successcase/banner'  + ')'
          },
          textAlign:{
            'text-align':"left"
          },
          hWidth:""
        },
        flag:true,
        caseList:[],
        viewBtn:{
          backgroundImage:'url(' + require('../../static/images/case/Btn.png') + ')'
        }
      }
    },
    components:{
      Banner
    },
    filters: {
      dateFormat(value){
        return value&&value.substring(0,10)
      }
    },
    mounted:function() { //钩子函数
      this.getList();
      window.scrollTo(0,0);//初始化页面在最顶部
    },
    methods:{
      getList:function () {
        let _this = this;
        this.$http.get('successcase/list', {
        }).then(function (response) {
          console.log(response)
            if(0 == response.data.returnCode && response.data) {
              data = null;
              num = 0;
              _this.caseList = [];

              data = response.data.data;
              if(data.length<5){
                _this.caseList = data;
                _this.flag = false;
              }else{
                if(num < data.length){
                  for (var i=num ; i<num+4 ; i++){
                    if(i<data.length){
                      _this.caseList.push(data[i]);
                    }else{
                      _this.flag = false;
                    }
                  }
                  num=num+4;
                }else{
                  _this.flag = false;
                }
              }
            }else{
              _this.$message('获取案例列表失败！');
            }
          }).catch(function (error) {});
      },
      showMore:function () {
        let _this = this;
        if(data && num < data.length){
          for (var i=num ; i<num+4 ; i++){
            if(i<data.length){
              _this.caseList.push(data[i]);
            }else{
              _this.flag = false;
            }
          }
          // debugger
          // if(data.length%4==0){
          //   _this.flag = false;
          // }
          // else if(i==data.length-1 && data.length%4==0){
          //     _this.flag = false;
          //   }
          num=num+4;
          if(num==data.length && data.length%4==0){
             _this.flag = false;
          }
        }
        // }else{
        //   _this.flag = false;
        // }
      },
      // watch: {
      //   $route(to, from) {
      //     console.log(to)
      //     if(to.name === 'cases'){
      //       data = null;
      //       num = 0;
      //       this.caseList = [];
      //       this.getList();
      //     }
      //   }
      // }
    }
  }
</script>
<style scoped>
  .banner {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .banner .img {
    width:1920px;
    margin: 0 auto;
    position: relative;
  }

  .banner .title {
    font-weight: normal;
    font-size: 42px;
    font-family:"PingFang SC";
    color: #ffffff;
  }

  .banner .desc {
    color: #ffffff;
    font-size: 14px;
    font-weight: normal;
    margin-top: 30px;
  }

  .case-item {
    width: 1140px;
    margin: 40px 40px 0 30px;
    padding-bottom: 40px;
    line-height: 30px;
  }

  .case-item-border {
    border-bottom: 1px solid #e5e5e5;
  }
  .cases .el-col .grid-content {
    text-align: left;
    height: 280px;
  }
  .cases img {
    width: 520px;
    height: 280px;
  }

  .case-item .el-button {
    margin-top: 30px;
    width: 206px;
    height: 44px;
  }
  .el-button a {
    color: #409EFF;
    text-decoration: none;
  }
  .more {
    margin: 20px;
    color: #409EFF;
    cursor: pointer;
  }
</style>
