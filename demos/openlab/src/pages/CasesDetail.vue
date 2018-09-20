<template>
  <div class="page">
    <!--banner开始-->
    <banner :banner-msg="bannerMsg"></banner>
    <!--banner结束-->

    <!--面包屑开始-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/cases' }">案例中心</el-breadcrumb-item>
      <el-breadcrumb-item><span style="color: #008fd5;">{{caseDetail.caseTitle}}</span></el-breadcrumb-item>
    </el-breadcrumb>
    <!--面包屑结束-->

    <!--案例详情内容-->
    <div class="cases">
      <div class="case-item">
        <el-row :gutter="20">
          <el-col :span="7" >
            <div class="grid-content ">
              <img :src="GLOBAL.BASE_URL+'successcase/detaillogo/'+caseDetail.caseId"/>
              <div class="grid-content font-color aligns" style="text-align: left">
                <div class="font-big" style="margin: 30px 0 38px 0">{{caseDetail.caseTitle}}</div>
                <div class="font-normal font-margin">技术领域：{{caseDetail.region}}</div>
                <!-- <div class="font-normal font-margin">产品类型：{{caseDetail.type}}</div> -->
                <div class="font-normal font-margin">发布日期：{{caseDetail.createTime|dateFormat}}</div>
                <div class="font-normal font-margin">
                  使用产品：<span class="font-a">{{caseDetail.product}}</span>
                 <!-- <span v-for="product in item.product">
                    <a>{{product.name}}</a>&nbsp;&nbsp;
                  </span>-->
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="17">
              <el-row>
                <div class="grid-content" style="text-align: justify">
                  <div class="font-middle-l font-blod" style="margin-bottom: 18px">客户需求</div>
                  <div class="font-normal font-middle-bg"><pre>{{caseDetail.demandDesc}}</pre></div>
                  <div class="font-middle-l font-blod" style="margin: 48px 0 18px 0">解决方案</div>
                  <div class="font-normal font-middle-bg"><pre>{{caseDetail.solutionDesc}}</pre></div>
                  <div class="font-middle-l font-blod" style="margin: 48px 0 18px 0">客户利益</div>
                  <div class="font-normal font-middle-bg"><pre>{{caseDetail.benefitDesc}}</pre></div>
                </div>
              </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
    <!--案例列表结束-->
  </div>
</template>

<script>

  import Banner from '../components/Banner'
  export default {
    name:'CasesDetail',
    data() {
      return {
        bannerMsg:{
          title:'客户案例',
          desc:'为企业开发者提供全球领先的云计算服务',
          bgBtn:{
            height:"300px",
            backgroundPosition:'center',
            // backgroundImage:'url(' + require('../../static/images/case/banner.png') + ')'
            backgroundImage:'url(' + this.GLOBAL.BASE_URL + 'successcase/banner' + ')'
          },
          textAlign:{
            'text-align':"left"
          },
          hWidth:""
        },
        caseDetail:{
          caseId:this.$route.params.caseId
        },
      };
    },
    filters: {
      dateFormat(value){
        return value&&value.substring(0,10)
      }
    },
    components:{
      Banner
    },
    mounted:function() { //钩子函数
      this.getCase();
      window.scrollTo(0,0);//初始化页面在最顶部
    },
    methods:{
      getCase:function () {
        var _this = this;
        debugger;
        this.$http.get('successcase/'+_this.$route.params.caseId, {
        }).then(function (response) {
            if(0 == response.data.returnCode && response.data) {
              _this.caseDetail = response.data.data;
            }else{
              _this.$message('获取案例详情失败！');
            }
        }).catch(function (error) {});
      }
    }
  }
</script>
<style scoped>
  .banner {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .banner .title {
    font-weight: normal;
    font-size: 42px;
    font-family:"PingFang SC";
    color: #ffffff;
  }
  .aligns{
    width: 288px;
  }
  .banner .desc {
    color: #ffffff;
    font-size: 14px;
    font-weight: normal;
    margin-top: 30px;
  }

  .grid-content{
    display: flex;
    justify-content: left;
    align-items: left;
    flex-direction: column;
  }

  .el-breadcrumb{
    width:1200px;
    margin: 20px auto;
    font-size: 14px;
    text-align:left ;
  }
  .font-margin {
    margin: 10px 0;
  }

  .font-blod {
    font-weight: bold;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #3a8ee6;
  }
   .cases {
     width: 1200px;
     margin:0 auto;
     min-height: 400px;
     background-color: #ffffff;
     border: 1px solid #e5e5e5;
  }

  .case-item {
    padding: 30px;
    margin-bottom: 90px;
  }

  img {
    height:280px;
    width: 280px;
  }
  pre {
    font-size: 14px !important;
    white-space: pre-wrap; /*css-3*/ 
    white-space: -moz-pre-wrap; /*Mozilla,since1999*/ 
    white-space: -pre-wrap; /*Opera4-6*/ 
    white-space: -o-pre-wrap; /*Opera7*/ 
    word-wrap: break-word; /*InternetExplorer5.5+*/ 
  }
  pre.layer{
    font-size: 15px !important;
  }
  pre#layer {
    color: #fff !important;
    font-size: 16px !important;
  }
  pre#heights {
    height: 53px;
  }
</style>
