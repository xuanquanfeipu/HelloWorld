<template>
  <div class="page">
    <!-- <div class="row-bg banner" :style="bannerMsgs[0].bannerBg">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-carousel trigger="click" height="330px" arrow="never">
            <el-carousel-item v-for="item in bannerMsgs" :key="item.id">
              <banner :banner-msg="item"></banner>
              <el-button style="">{{item.btnText}}</el-button>
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </div> -->

    <div class="row-bg banner" v-if="bannerFlag">
      <el-carousel trigger="click" height="450px" arrow="never">
        <el-carousel-item v-for="(item,index) in bannerMsgs" :key="item.id" :style="bannerMsgs[index].bannerBg">
          <el-row :gutter="20">
            <el-col :span="24" style="padding:20px 10px 0 10px;">
              <banner :banner-msg="item"></banner>
              <router-link to="/develop">
                <el-button style="">
                  {{item.btnText}}
                </el-button>
              </router-link>
            </el-col>
          </el-row>
        </el-carousel-item>
      </el-carousel>
    </div>

    <el-row :gutter="0" class="news" v-if="newsFlag">
      <!-- <el-col :span="5" :offset="index==0?2:0" v-for="(item, index) in newsList" :key="item.id">
        <div class="grid-content ">

          <news-card :news-msg="item">
          </news-card>
        </div>
      </el-col> -->
      <div class="news-card-wrap" v-for="(item, index) in newsList" :key="item.id">
        <news-card :news-msg="item">
        </news-card>
      </div>

    </el-row>
    <div style="margin-bottom:40px;" v-if="productFlag">
      <h1>{{ecosphere.title}}</h1>
      <h2>{{ecosphere.subTitle}}</h2>
      <el-row :gutter="0" class="ecosphere">
        <el-col :span="24">
          <el-tabs v-model="activeName" @tab-click="handleTabClick">
            <!-- <el-tab-pane  :name="item.tabName" v-for="(item, index) in productList"><span slot="label">{{item.desc}}</span>{{item.desc}}</el-tab-pane> -->
            <el-tab-pane :name="item.tabName" v-for="(item, index) in categoryList">
              <div slot="label" @click="handleTabCardClick(item.dictId)">
                <tab-card :category-msg="item" style="height:100px;text-align:center">
                </tab-card>
              </div>
              <pane-card v-for="it in productList" :product-msg="it"></pane-card>
            </el-tab-pane>

          </el-tabs>
          <!-- <product-card v-for="item in productList" :product-msg="item" :key="item.id"></product-card> -->
        </el-col>
      </el-row>
    </div>

    <el-row :gutter="0" class="date-self" v-if="remoteLabFlag">
      <el-col :span="24" :style="dateMsg.dateBg">
        <el-row>
          <el-col :span="8" :offset="15" class="home-card">
            <div class="grid-content" style="">
              <date-yourself :date-msg="dateMsg"></date-yourself>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>


    <el-row :gutter="0" class="api-explorer" v-if="apiFlag">
      <h1>{{apiExplore.title}}</h1>
      <div class="api-wrap">
        <el-col :span="8" v-for="item in apiExplore.advantages" :key="item.id">
          <div class="grid-content">
            <advantage-card :advantage-msg="item"></advantage-card>
          </div>
        </el-col>
        <div style="clear:both;">
          <router-link to="/api" style="text-decoration:none;color:#fff;">
            <el-button :style="apiExplore.btnBg">
              {{apiExplore.btnTxt}}
            </el-button>
          </router-link>
        </div>
      </div>
    </el-row>

    <el-row :gutter="20" class="success-cases" v-if="casesFlag">
      <el-col :span="6" style="padding-left:0;height:250px;">
        <div class="grid-content ">
          <case-summary :summary-msg="summaryMsg" @prev='change' @next='change'></case-summary>
        </div>
      </el-col>
      <success-cases v-for="item in casesMsg" :case-msg="item" :key="item.id"></success-cases>
    </el-row>


  </div>
</template>

<script>
  import Banner from '../components/Banner'
  import NewsCard from '../components/NewsCard'
  import ProductCard from '../components/ProductCard'
  import TabCard from '../components/TabCard'
  import PaneCard from '../components/PaneCard'
  import DateYourself from '../components/DateYourself'
  import AdvantageCard from '../components/AdvantageCard'
  import SuccessCases from '../components/SuccessCases'
  import CaseSummary from '../components/CaseSummary'

  export default {
    name: 'Home',
    data() {

      return {
        bannerFlag:false,
        newsFlag:false,
        productFlag:false,
        remoteLabFlag:false,
        apiFlag:false,
        casesFlag:false,
        newsList: [{
          img: 'static/images/home/news.png',
          title: '最新动态',
          desc: '中兴正在发布“智慧城市2.0”'
        }, {
          img: 'static/images/home/news.png',
          title: '免费体验套餐',
          desc: '免费试用3个月'
        }, {
          img: 'static/images/home/news.png',
          title: '云优惠套餐',
          desc: '多款优化套餐全面升级'
        }, {
          img: 'static/images/home/news.png',
          title: '云平台合作方案',
          desc: '云平台成功方案展示'
        }],
        bannerMsgs: [{
            bannerBg: {
              backgroundImage: 'url(' + require('../../static/images/home/banner-1.png') + ')',
               backgroundColor:'#026aca',
              backgroundPosition:'center'
            },
            img: '',
            title: '中兴通讯云上实验室',
            desc: '便捷稳定的产品对接环境，完善的技术支持与咨询服务',
            file: '',
            btnText: '立即体验',
            btnUrl: '',
            textAlign:{
              'text-align':"left"
            },
            hWidth:""
          },
          {
            bannerBg: {
              backgroundImage: 'url(' + require('../../static/images/home/banner-2.png') + ')',
              backgroundPosition:'center'
            },
            img: '',
            title: '随时随地，快速接入',
            desc: '提供7x24小时的云上对接测试环境，高效便捷的远程接入',
            file: '',
            btnText: '立即体验',
            btnUrl: ''
            // btnUrl:'/develop'
          },
          {
            bannerBg: {
              backgroundImage: 'url(' + require('../../static/images/home/banner-3.png') + ')',
              backgroundPosition:'center'
            },
            img: '',
            title: '合作创新 实现共赢',
            desc: '构建合作伙伴生态圈，共同打造具有竞争力的行业解决方案',
            file: '',
            btnText: '立即体验',
            btnUrl: ''
            // btnUrl:'/develop'
          }
        ],
        activeName: 'first',
        ecosphere: {
          title: '构建多功能生态圈',
          subTitle: '了解我们的云产品'
        },
        categoryList:[],
        productList:[],
        // categoryList: [{
        //   tabName: 'first',
        //   img: 'static/images/cloud.png',
        //   dictId: '1',
        //   dictName: "云计算&分布式数据库"
        // }, {
        //   tabName: 'second',
        //   img: 'static/images/cloud.png',
        //   dictId: '2',
        //   dictName: "大数据&AI"
        // }, {
        //   tabName: 'third',
        //   img: 'static/images/cloud.png',
        //   dictId: '3',
        //   dictName: "通讯及协作"
        // }],
        // productList: [{
        //   name: '',
        //   tabName: 'first',
        //   img: 'static/images/cloud.png',
        //   desc: '云平台'
        // }, {
        //   name: '',
        //   tabName: 'second',
        //   img: 'static/images/cloud.png',
        //   desc: '大数据'
        // }, {
        //   name: '',
        //   tabName: 'third',
        //   img: 'static/images/cloud.png',
        //   desc: '分布式数据库'
        // }, {
        //   name: '',
        //   tabName: 'fourth',
        //   img: 'static/images/cloud.png',
        //   desc: 'YITA'
        // }, {
        //   name: '',
        //   tabName: 'fifth',
        //   img: 'static/images/cloud.png',
        //   desc: '云桌面'
        // }, {
        //   name: '',
        //   tabName: 'sixth',
        //   img: 'static/images/cloud.png',
        //   desc: '视频会议'
        // }, {
        //   name: '',
        //   tabName: 'seventh',
        //   img: 'static/images/cloud.png',
        //   desc: 'NGCC'
        // }],
        dateMsg: {
          dateBg: {
            backgroundImage: 'url(' + require('../../static/images/home/banner_date.png') + ')'
          },
          title: '预约云化实验室，马上开始测试！',
          desc: '提供7x24小时的稳定产品对接环境，完善的技术支持与咨询服务',
          btnText: '自助预约',
          list: [{
            img: 'static/images/home/1.png',
            advantage: '一键预约，快速启动'
          }, {
            img: 'static/images/home/2.png',
            advantage: '远程接入，按需使用'
          }, {
            img: 'static/images/home/3.png',
            advantage: '多维度支持，即时响应'
          }]
        },
        apiExplore: {
          title: 'API explorer在线体验',
          btnBg: {
            backgroundImage: 'url(' + require('../../static/images/home/btn-api-explorer.png') + ')'
          },
          btnTxt: '立即体验',
          advantages: [{
            img: 'static/images/home/learn.png',
            title: '快速学习',
            desc: '提供API接口对接详细信息，方便高效学习'
          }, {
            img: 'static/images/home/debug.png',
            title: '便捷调试',
            desc: '一键快速进入API接口调试，实现业务互通'
          }, {
            img: 'static/images/home/feedback.png',
            title: '线上反馈',
            desc: '随时对任何问题进行响应,满足用户需求'
          }],
        },

        casesMsg: [{
            caseId: '',
            img: 'static/images/home/case1.png',
            desc: '真实设备，全业务体验;随时随地，远程接入;按需使用，自主预约.'
          },
          {
            caseId: '',
            img: 'static/images/home/case2.png',
            desc: '真实设备，全业务体验;随时随地，远程接入;按需使用，自主预约.'
          },
          {
            caseId: '',
            img: 'static/images/home/case3.png',
            desc: '真实设备，全业务体验;随时随地，远程接入;按需使用，自主预约.'
          }
        ],
        summaryMsg: {
          title: '成功案例',
          desc: '开创新业务，获取技术、资源，实现更快速成长',
          btnText: '点击获取更多案例',
          casesList: [{
              caseId: '',
              img: 'static/images/home/case.png',
              caseTitle: '真实设备，全业务体验;随时随地，远程接入;按需使用，自主预约.',
              caseDesc: ''
            },
            {
              caseId: '',
              img: 'static/images/home/case.png',
              caseTitle: '真实设备，全业务体验;随时随地，远程接入;按需使用，自主预约.',
              caseDesc: ''
            },
            {
              caseId: '',
              img: 'static/images/home/case.png',
              caseTitle: '真实设备，全业务体验;随时随地，远程接入;按需使用，自主预约.',
              caseDesc: ''
            }
          ],
        }
      }
    },
    ready: function () {},
    mounted: function () { //钩子函数
      this.getHomePageArea();
      // this.getCategoryList();
      // this.getProductList();
      // this.getApiList();
      // this.getCasesList();
      window.scrollTo(0, 0); //初始化页面在最顶部
    },
    created: function () {},
    methods: {
      getHomePageArea: function () {
        let _this = this;
         _this.$http({
          url: "homepage/areas",
          method: 'get'
        }).then(function (response) {
          console.log(response)
            if (0 == response.data.returnCode && response.data.data) {
              var data = response.data.data;
              for(let i=0;i<data.length;i++){
                switch(data[i].hpCode){
                  case 'banner':
                  _this.bannerFlag = true;
                  _this.bannerMsgs = data[i].units ? data[i].units.map((item, index) => {
                    return {
                      bannerBg: {
                        // backgroundImage: 'url(' + require('../../static/images/home/banner-1.png') + ')',
                        // backgroundImage: 'url(' + require(item.attachment) + ')',
                        backgroundImage: 'url(' + _this.GLOBAL.BASE_URL + 'homepage/unitlogo/'+ item.unitId + ')',
                        backgroundPosition:'center'
                      },
                      title: item.name,
                      desc: item.desc,
                      btnText: '立即体验'
                    }
                  }) : [];
                  break;

                  case 'news':
                  _this.newsFlag = true;
                  _this.newsList = data[i].units ? data[i].units.map((item, index) => {
                    return {
                      img:  _this.GLOBAL.BASE_URL + 'homepage/unitlogo/'+ item.unitId ,
                      // img: 'static/images/home/news.png',
                      title: item.name,
                      desc: item.desc
                    }
                  }) : [];
                  break;

                  case 'product':
                  _this.productFlag = true;
                  _this.getCategoryList();
                  // _this.getProductList();
              
                  break;

                   case 'remote_lab':
                  _this.remoteLabFlag = true;
                  // _this.dateMsg.dateBg.backgroundImage = data[i].units && data[i].units[0].attachment;
                  var unit = data[i].units && data[i].units[0];
                  if(unit){
                    _this.dateMsg.dateBg = {
                      backgroundImage:'url(' + _this.GLOBAL.BASE_URL + 'homepage/unitlogo/'+ (unit.unitId )+ ')'
                    };
                    _this.dateMsg.title = unit.name;
                    _this.dateMsg.desc = unit.desc;

                  }

                  // _this.dateMsg = data[i].units ? data[i].units.map((item, index) => {
                  //   return {
                  //     dateBg:{
                  //       backgroundImage:item.attachment
                  //     },
                  //     title: item.name,
                  //     desc: item.desc
                  //   }
                  // }) : [];
                  break;

                   case 'api':
                  _this.apiFlag = true;
                  _this.apiExplore.title = data[i].hpName;
                  _this.apiExplore.advantages = data[i].units ? data[i].units.map((item, index) => {
                    return {
                      img: _this.GLOBAL.BASE_URL + 'homepage/unitlogo/'+ item.unitId ,
                      title: item.name,
                      desc: item.desc
                    }
                  }) : [];
                  //  this.getApiList();
                  break;

                   case 'success_case':
                  _this.casesFlag = true;
                  _this.getCasesList();        
                  break;

                }
              }
            }
        }).catch(function (error) {
        });
      },
      change(casesList) {
        this.casesMsg = casesList.slice(0, 3);
      },
      handleTabClick(tab, event) {
        // console.log(tab, event);
      },
      handleTabCardClick(dictId) {
        // console.log(dictId);
        this.getProductList(dictId);
      },
      getCategoryList: function () {
        var _this = this;
        var logos = ['static/images/home/platform.png', 'static/images/home/bigdata.png',
          'static/images/home/distribution.png', 'static/images/home/yita.png',
          'static/images/home/desktop.png', 'static/images/home/cv.png', 'static/images/home/ngcc.png'
        ];
        var tabNames = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh']
        //设置请求路径
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        this.$http.get('product/category', {})
          .then(function (response) {
            if (0 == response.data.returnCode && response.data.data) {
              _this.categoryList = response.data.data.map((item,index) => {
                return {
                  // img: item.logo,
                  // tabName: tabNames[item.dictId - 1],
                  tabName: tabNames[index],
                  dictId: item.dictId,
                  img: logos[item.dictId - 1],
                  dictName: item.dictName
                }
              });

              _this.getProductList(_this.categoryList[0].dictId);
            }
          })
          .catch(function (error) {});
      },
      getProductList: function (dictId) {
        var _this = this;
        var logos = ['static/images/home/platform.png', 'static/images/home/bigdata.png',
          'static/images/home/distribution.png', 'static/images/home/yita.png',
          'static/images/home/desktop.png', 'static/images/home/cv.png', 'static/images/home/ngcc.png'
        ];
        var tabNames = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh']
        //设置请求路径
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        _this.$http.get('product/listbytype?category=' + (dictId || _this.categoryList[0].dictId), {})
          .then(function (response) {
            // console.log(+_this.categoryList[0].dictId)
            if (0 == response.data.returnCode && response.data.data) {
              _this.productList = response.data.data.map((item) => {
                return {
                  // img: item.logo,
                  // tabName:tabNames[item.id - 1],
                  id: item.productId,
                  // img: logos[item.productId - 1],
                  name: item.productName,
                  desc: item.summary
                }
              });
            }
          })
          .catch(function (error) {});
      },
      getApiList: function () {
        var _this = this;
        //设置请求路径
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        this.$http.get('api/list', {})
          .then(function (response) {
            if (0 == response.data.returnCode && response.data.data) {
              // _this.advantages = response.data.data.map((item) => {
              //   return {
              //     img: item.apiLogo,
              //     title: item.apiTitle,
              //     desc: item.apiDesc
              //   }
              // });
            }
          })
          .catch(function (error) {});
      },
      getCasesList: function () {
        var _this = this;
        //设置请求路径
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        this.$http.get('successcase/list', {})
          .then(function (response) {
            if (0 == response.data.returnCode && response.data.data) {
              _this.summaryMsg.casesList = response.data.data.map((item) => {
                return {
                  caseId: item.caseId,
                  // img: item.logo,
                  img: 'static/images/home/case' + (item.caseId % 3 + 1) + '.png',
                  caseTitle: item.caseTitle,
                  caseDesc: item.caseDesc
                }
              });
              _this.casesMsg = _this.summaryMsg.casesList.slice(0, 3);
            }
          })
          .catch(function (error) {});
      },
    },
    components: {
      NewsCard,
      Banner,
      ProductCard,
      TabCard,
      PaneCard,
      DateYourself,
      AdvantageCard,
      SuccessCases,
      CaseSummary
    }
  }

</script>
<style scoped>
  #app {
    background-color: #F7F8FA;
  }
  .page {
    overflow-x: hidden;
  }

  h1 {
    font-size: 24px;
    color: #333;
    font-family: 'Microsoft YaHei';
    font-weight: normal;
  }

  h2 {
    font-size: 16px;
    color: #666;
    font-family: 'Microsoft YaHei';
    font-weight: normal;
  }
  .el-row {
    /* margin-bottom: 20px; */
    /* padding-bottom: 20px; */
    width: 1200px;
  }

  .banner.el-row {
    width: 100%;
  }

  .el-col {
    border-radius: 4px;
  }

  .banner .grid-content {
    height: 300px;
    color: #fff;
    border-radius: 4px;
    min-height: 36px;
  }

  .banner.row-bg {
    height: 430px;
    text-align: left;
    /* background-size: cover; */
  }

  .banner.row-bg .banner.el-row {
    height: 220px;
  }

  .banner.row-bg .banner.el-row .banner-msg {
    position: absolute;
    left: 0 !important;
  }


  .el-dropdown {
    outline: none;
  }

  .home-card {
    text-align: left!important;
  }
  .news .grid-content {
    background: #fff;
    height: 100px;
    position: relative;
    top: -50px;
    border-right: 0;
  }

  .news-card-wrap .el-card {
    border-right: none;
  }

  .news-card-wrap:last-of-type  .el-card{
    border: 1px solid #ebeef5;
  }

  .news.el-row {
    position: relative;
    top: -30px;
    z-index: 3;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  }

  .el-button {
    background: transparent;
    height: 44px;
    margin-top: 0px;
    width: 206px;
    color: #fff;
    font-size: 16px;
  }

  .banner .el-button {
    border: 1px solid #fff;
    margin-top: 0;
  }

  .banner .el-button a {
    color: #fff;
    font-size: 16px;
    text-decoration: none;
  }

  .ecosphere {
    /* display: flex;
    justify-content: center;
    align-items: center; */
    align-content: flex-start;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .ecosphere .el-col {
    /* width: 20%; */
    flex: 0 0 33%;
  }

  .ecosphere .el-tabs__content {
    background: #fafafa
  }

  .ecosphere .el-col .grid-content {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .date-self {
    /* background: #064F76; */
    color: #fff;
    text-align: left;
    height: 460px;
    width: 100%;
  }

  .date-self>.el-col {
    /* background: #064F76; */
    height: 100%;
    background: center center no-repeat;
    /* background-size: cover; */
  }

  .date-self>.el-col .el-row {
    padding-top: 20px;
  }

  .api-explorer {
    padding: 40px 0;
  }

  .api-wrap {
    background: #fff;
    margin-top: 40px;
    border: 1px solid #E5E5E5;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1); 
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1); 
    height: 370px;
  }

  .api-explorer h1 {
    font-weight: normal;
  }

  .api-explorer .el-card {
    border: none;
    background: none;
    box-shadow: none;
  }

  .api-explorer .el-button {
    /* background: #409EFF no-repeat center;
    background-size: cover; */
    color: #fff;
    width: 160px;
    height: 38px;
    font-family: 'Microsoft YaHei';
    font-size: 16px;
    padding: 11px 20px;
    /* margin-bottom: 50px; */
    position: absolute;
    bottom: 50px;
    left: 0;
    right: 0;
    margin: 50px auto;
  }
.api-explorer .el-button:hover{
background-position: 0 -32px;
}
  .success-cases {
    height: 320px;
    padding: 40px 0 0 0;
    position: relative;
        top: 10px;
    /* background: #fff; */
  }

  .el-menu--horizontal .el-dropdown {
    outline: none;
  }

</style>
