<template>
  <div class="nav-bar" id="nav_bar">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      :default-active="$route.path">
      <el-menu-item index="/">
          <img  @click="toPath('/',1)" src="../../static/images/home/logo-home.png" style="margin-left: 20px;">
      </el-menu-item>
      <el-submenu index="2"
                  :hide-timeout="hideTimeout"
                  class="nav-bar-submenu"
                  :class="{'is-active':routePath == '/product'}"
                  style="margin-right: 40px">
        <template slot="title">
          <div @mouseenter="showProduct">产品和解决方案</div>
        </template>
        <div ref="product_categoryName"
             style="position: relative;width: 959px;height: auto;overflow: auto">
          <li style="float: left">
            <div v-for="(item,index) in productList"
              :index="'2-'+(index+1)"
              :key="item.categoryId"
              :class="{'nav-bar-top':index==0}"
              class="nav-bar-submenu-item nav-bar-submenu-category">
              <div  slot="title"
                    class="nav-bar-category"
                    :class="{'nav-bar-hover':product_hover==item.categoryId}"
                    @mouseenter="enter(item.categoryId)">
                <a class="nav-bar-category-name">
                  {{item.categoryName}}
                </a>
              </div>
            </div>
          </li>
          <li class="nav-bar-three">
            <div class="nav-bar-three-content"
                 v-for="em in products"
                 :key="em.id"
                 :index="'/product/'+em.id"
                 @click="toPath('/product/'+em.id,2)">
              <div class="nav-bar-three-name">
                {{em.name}}
              </div>
              <div class="nav-bar-three-summary">
                {{em.summary}}
              </div>
            </div>
          </li>
        </div>
      </el-submenu>
      <el-submenu index="3"
                  class="nav-bar-submenu"
                  :class="{'is-active':routePath == '/learnDetail'}">
        <template slot="title">学习中心</template>
         <el-menu-item
          index="/document"
          class="nav-bar-submenu-name"
          @click="toPath('/document',3)">
          <div>资源获取</div>
        </el-menu-item>
        <el-menu-item
          index="/learn"
          class="nav-bar-submenu-name"
          @click="toPath('/learn',3)">
          <div>在线学习</div>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="4"
                  class="nav-bar-submenu"
                  :class="{'is-active':routePath == '/APIDetail' ||routePath == '/GuideDetial'}"
                  style="margin-right: 40px">
        <template slot="title">开发与体验</template>
        <el-menu-item
          index="/develop"
          class="nav-bar-submenu-name"
          @click="toPath('/develop',4)">
          <div>云上实验室</div>
        </el-menu-item>
        <el-menu-item
          index="/api"
          class="nav-bar-submenu-name"
          @click="toPath('/api',4)">
          <div>API在线体验</div>
        </el-menu-item>

      </el-submenu>
      <el-menu-item index="/support"
                    @click="toPath('/support',5)"
                    style="margin-right: 60px">
        服务中心
      </el-menu-item>
      <el-menu-item
        index="/cases"
        :class="{'case-active':routePath == '/casesDetail'}"
        @click="toPath('/cases',6)">
        案例中心
      </el-menu-item>
      <el-menu-item
          index="/forum"
          :class="{'forum-active':routePath == '/sectionDetail' || routePath == '/invitationDetail' || routePath == '/newInvitation' || routePath == '/personalCenter' || routePath == '/personalHomepage' || routePath == '/operationLog'}"
          @click="toPath('/forum',10)"
          class="forum">
          社区
      </el-menu-item>
      <el-menu-item v-show="!isLogin" index="8" @click="toPath('/register',8)">
        注册
      </el-menu-item>
      <span v-show="!isLogin" class="delimiter"></span>
      <el-menu-item v-show="!isLogin" index="7" @click="toPath('/login',7)" style="float:right;">
        登录
      </el-menu-item>

      <el-submenu index="9" style="float:right;" v-show="isLogin">
         <template slot="title">{{username}}
        <i class="el-icon-arrow-down el-icon--right"></i>
        </template>
          <el-menu-item
          index="/peopleCenter"
          class="nav-bar-submenu-name"
          @click="toPath('/peopleCenter',9)"
         >
          <div> <i class="icon el-icon-edit-outline" style="margin-right: 6px;"></i>个人中心</div>
        </el-menu-item>

          <!-- <el-menu-item
          index="/consult"
          class="nav-bar-submenu-name"
          @click="toPath('/consult',9)"
          v-show='isNone'>
          <div> <i class="icon el-icon-edit-outline" style="margin-right: 6px;"></i>我的咨询</div>
        </el-menu-item>
         
        <el-menu-item
          index="/profile"
          class="nav-bar-submenu-name"
          @click="toPath('/profile',9)"
          v-show='isNone'>
          <div><i class="icon el-icon-info" style="margin-right: 6px;"></i>个人资料</div>
        </el-menu-item>
        
        <el-menu-item
          index="/resource"
          class="nav-bar-submenu-name"
          @click="toPath('/resource',9)">
          <div><i class="icon el-icon-info" style="margin-right: 6px;"></i>我的资源</div>
        </el-menu-item>
        <el-menu-item
          index="/personalHomepage"
          class="nav-bar-submenu-name"
          @click="toPath('/personalHomepage',9)">
          <div><i class="icon el-icon-info" style="margin-right: 6px;"></i>我的主页</div>
        </el-menu-item>
        <el-menu-item
          index="/operationLog"
          class="nav-bar-submenu-name"
          @click="toPath('/operationLog',9)" v-if="isFlag">
          <div><i class="icon el-icon-info" style="margin-right: 6px;"></i>我的操作</div>
        </el-menu-item>
          <el-menu-item
          index="/account"
          class="nav-bar-submenu-name"
          @click="toPath('/account',9)"
          v-show='isNone'>
          <div><i class="icon el-icon-info" style="margin-right: 6px;"></i>子账号管理</div>
        </el-menu-item>
        
        <el-menu-item
          index="/password"
          class="nav-bar-submenu-name"
          @click="toPath('/password',9)">
          <div><i class="icon el-icon-edit" style="margin-right: 6px;"></i>修改密码</div>
        </el-menu-item> -->
        <el-menu-item
          index="/logout"
          class="nav-bar-submenu-name"
          @click="logout">
          <div><i class="icon el-icon-setting" style="margin-right: 6px;"></i>退出</div>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import store from '@/vuex/store'
  export default {
    name: 'NavBar',
    data() {
      return {
        productList: [],
        location: '/login',
        products: [],
        product_hover: 0,
        hideTimeout:0,
        // isNone:true,
        isFlag:false
      };
    },
    props: ['isLogin','username','routePath'],
    mounted() { //钩子函数
      this.getList();
    },
    updated(){
      this.getNone();
    },
    methods: {
      getNone(){
        // this.isNone = sessionStorage.getItem('userType')==4?false:true
        this.isFlag = JSON.parse(sessionStorage.getItem('moderator'))
      },
      showProduct(){
        this.$refs.product_categoryName.style.display = "block";
      },
      toPath(url,index){
        // debugger;
        if(index == 2){
          this.$refs.product_categoryName.style.display = "none";
        }
        this.$router.push(url);
      },
      getList: function () {
        var _this = this;
        //设置请求路径
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        this.$http({
          url: 'product/list',
          method: 'get',
          headers: {
            'X-Access-Token': sessionStorage.getItem('accessToken')
          }
        }).then(function (response) {
          if (0 == response.data.returnCode) {
            _this.productList = response.data.data;
            _this.enter(_this.productList[0].categoryId);
          }else if(resp.data.returnCode==1011){
            _this.$message.error('会话已过期，请重新登录！');
          }else{
            _this.$message('查询失败！');
          }
        }).catch(function (error) {
          _this.$message('查询失败！');
        });
      },
      enter(id){
        let _this = this;
        _this.product_hover = id;//鼠标悬浮时产品类型菜单默认选中
        this.$http.get('product/listbytype?category='+id, {
        }).then(function (response) {
          if (0 == response.data.returnCode) {
            _this.products = response.data.data.map((item)=> {
              return {
                category:item.productType,
                id:item.productId,
                name:item.productName,
                summary:item.summary
              }
            });
          }else{
            _this.$message('查询失败！');
          }
        }).catch(function (error) {
          _this.$message('查询失败！');
        });
      },
      logout: function () {
        var _this = this;
        //设置请求路径
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        _this.$http({
          url: 'auth/logout',
          method: 'get',
          headers: {
             'X-Access-Token': sessionStorage.getItem('accessToken')
         }
        })
          .then(function (response) {

            if (0 == response.data.returnCode ||1011 == response.data.returnCode) {
              sessionStorage.removeItem('accessToken');
              sessionStorage.removeItem('username');
              sessionStorage.removeItem('userId');
              sessionStorage.removeItem('customerId');
              sessionStorage.removeItem('moderator');
              sessionStorage.removeItem('moduleIds');
              sessionStorage.removeItem('userType');
              _this.$message('注销成功！');
              _this.location = '/login';
              _this.$router.push({
                path: '/login'
              });
            }  else {
              _this.$message(response.data.message || '注销失败！');
            }
          })
          .catch(function (error) {
            _this.$message('注销失败！');
          });
      } //logout
    },
  //   computed:{
  //     isFlag:function(){
  //       this.moderator = JSON.parse(sessionStorage.getItem("moderator"))
  //       if(this.moderator){
  //         if(this.moderator){
  //           return this.moderator
  //         }else{
  //           return this.moderator
  //       }
  //     }
  //   }
  // }
}
</script>
<style>
  .nav-bar .el-menu-demo {
    box-shadow:0px 4px 9px -8px;
  }
  .nav-bar .el-dropdown-link {
    outline: none;
  }

  .nav-bar .el-dropdown-menu a {
    text-decoration: none;
  }

  .nav-bar .el-dropdown-menu a i.icon {
    margin-right: 5px;
  }

  .el-menu-item {
    padding: 0!important;
  }

  .el-menu-item a:hover{
    color: #0084ff;
  }
  .nav-bar-submenu-name:hover {
    color: #0084ff!important;
  }

  .el-menu--horizontal .el-menu .el-menu-item,
  .el-menu--horizontal .el-menu .el-submenu__title
   {
    color: #333333!important;
  }

  .nav-bar-hover {
    width: 177px;
    background-color: #d9edff;
    opacity: 0.85;
    color: #0084ff!important;
    border-right: 3px solid #0084ff;
  }

  .nav-bar .el-menu--horizontal>.el-menu-item,
  .nav-bar .nav-bar-submenu>.el-submenu__title{
    margin: 0;
    color:#333333;
    font-size: 16px;
  }
  .nav-bar .el-menu--horizontal>.el-menu-item:hover,
  .nav-bar .el-menu--horizontal>.el-menu-item:focus,
  .nav-bar .nav-bar-submenu>.el-submenu__title:hover,
  .nav-bar .nav-bar-submenu>.el-submenu__title:focus{
    color:#0084ff;
  }


  .nav-bar .el-menu--horizontal>.el-menu-item:first-of-type {
    border: 0;
    margin-left: 0;
    margin-right: 50px;
  }

  .nav-bar .el-menu--horizontal>.el-menu-item:last-of-type,
  .nav-bar .el-menu--horizontal>.el-menu-item:nth-last-child(4),
  .delimiter {
    float: right;
    border: none;
    margin-right: 40px;
  }

  .nav-bar .delimiter {
    height: 18px;
    width: 0px;
    border-right: 1px solid #ddd;
    margin: 22px 20px 0 20px;
  }
  .el-menu--horizontal >.el-menu--popup-bottom-start,
  .el-menu--horizontal >.el-menu--popup-right-start
  {
    margin: 0;
  }
  .nav-bar-three {
    float: right;
    width: 718px;
    height: auto;
    padding: 20px 20px 0 20px;
    border-left:1px solid #e5e5e5;
    text-align: justify;
  }

  .nav-bar-three-content {
    float: right;
    margin: 0 0 20px 20px;
  }
  .nav-bar-three-name{
    width: 718px;
    margin-top: 0px;
    margin-bottom: 12px;
    font-size: 14px;
    font-family:'Microsoft YaHei';
    color: #333333;
    cursor: pointer;
  }
  .nav-bar-three-name:focus .nav-bar.el-menu--horizontal{
    display: none;
  }

  .nav-bar-three-name:hover,
  .nav-bar-hover-color {
    color: #0084ff!important;
  }
  .nav-bar-three-summary{
    width: 718px;
    overflow: hidden;
    font-size: 14px;
    font-family:'Microsoft YaHei';
    margin-bottom: 20px;
    color: #666666;
  }
  .nav-bar-top {
    margin-top: 40px!important;
  }
  .nav-bar-category {
    float: left;
    padding-left: 20px;
  }
  .nav-bar-category-name {
    width: 100%;
    height: 36px;
    line-height: 36px;
    font-size:14px;
  }
  .nav-bar-submenu {
    margin-right: 40px;
  }
  .nav-bar-submenu-item {
    margin: 14px 0!important;
  }
  .nav-bar-submenu-name {
    margin: 14px 0!important;
    padding-left: 15px !important;
  }
  .nav-bar-submenu-name:hover{
    background-color: #d9edff!important;
    opacity: 0.85;
  }
  .nav-bar-submenu-name:hover div {
    color: #0084ff!important;
  }

  .nav-bar-submenu-category {
    height: 36px;
    width: 200px;
  }
  .case-active {
    border-bottom: 2px solid #0084ff!important;
  }
  .forum-active {
    border-bottom: 2px solid #0084ff!important;
  }
  .forum {
    margin-left: 60px !important;
  }
</style>
