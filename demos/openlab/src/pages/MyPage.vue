<template>
  <div class="page mypage-page">
    <h2 for="">个人主页</h2>
    <el-row>
      <el-col :span="20" :offset="2" class="wrapper">
        <div class="row" style="">
          <ul>
            <li>
              <label for="">主题：</label>
              <span>52</span>
            </li>
            <li>
              <label for="">回复：</label>
              <span>52/520</span>
            </li>
            <li>
              <label for="">系统消息：</label>
              <span>5/52</span>
            </li>
          </ul>
        </div>

        <div class="row" style="">
          <ul>
            <li>
              <el-select v-model="theme" placeholder="请选择" >
                <el-option :key="0" label="全部主题" value="">
                </el-option>
                <el-option v-for="item in themes" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <el-select v-model="range" placeholder="请选择">
                <el-option :key="0" label="全部时间" value="">
                </el-option>
                <el-option v-for="item in timeranges" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </li>
            <li>
              <el-select v-model="sort" placeholder="请选择">
                <el-option :key="0" label="默认排序" value="">
                </el-option>
                <el-option v-for="item in sorts" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </li>
          </ul>

          <el-button type="primary" style="float: right;margin-left:10px;">
            搜索
          </el-button>
          <el-input placeholder="主页内搜索" v-model="searchInput" class="" style="float: right;margin-right:10px;width:200px;font-size: 12px;">
            <el-button slot="append" icon="el-icon-search" @click="searchHandle" style="font-size: 12px;"></el-button>
          </el-input>
        </div>
        <div class="" style="">
          <!-- <el-table :data="tableData"  style="width: 100%">
          </el-table> -->
          <ul class="theme-list">
            <li>
              <ul class="theme-item">
                <li>
                  <p class="theme-title">OpenPaaS开源社区是公司为基于PaaS平台的开源共创而生。 OpenPaaS开源社区的运作模式参考OPNFV社区</p>
                  <div class="theme-info"><span class="time">7分钟以前</span> 发表版块：<a class="block" href="#">OpenPaaS</a></div>
                </li>
                
                <li class="theme-view">
                    <dl>
                      <dt>浏览</dt>
                      <dd>458</dd>
                    </dl>
                    <dl>
                      <dt>回复</dt>
                      <dd>250</dd>
                    </dl>
                </li>

                <li class="theme-opt">
                  <a href="#">详情</a><a href="#">编辑</a><a href="#">删除</a>
                </li>
              </ul>
              
            </li>
          </ul>
        </div>

      </el-col>
    </el-row>


  </div>
</template>

<script>
  export default {
    name: 'mypage',
    data() {

      return {
        theme: '',
        themes: [{
          label: '云计算',
          value: '1'
        }, {
          label: '云桌面',
          value: '2'
        }, {
          label: '云化实验室',
          value: '3'
        }],
        range: '',
        timeranges: ['最近一天', '最近一周', '最近一月'],
        sort: '',
        sorts: ['按主题排序', '按时间升序', '按时间降序'],
        searchInput:'',
        tableData:[]
      }
    },
    mounted: function () { //钩子函数
      // this.searchHandle();
    },
    methods: {

      searchHandle: function () {

        var _this = this;
        //设置请求路径
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        this.$http({
          url: 'user/userinfo',
          method: 'get',
          headers: {
            'X-Access-Token': sessionStorage.getItem('accessToken')
          },
          data: {}
        }).then(function (resp) {
          if (resp.data.returnCode == 0) {

          } else if (resp.data.returnCode == 1011) {
            _this.$message({
              message: '会话失效，请重新登录!',
              type: 'error'
            });
            _this.$router.push('/login')
          }
        }).catch(function (error) {
          //  _this.$message.error(  '查询失败！ ');
        });
      },

    },
    components: {}
  }

</script>
<style scoped>
  .page.mypage-page {
    height: auto;
    padding: 0 2% 2%;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
  }

  .row {
    border-bottom: 1px solid #e5e5e5;
    clear: both;
    overflow: hidden;
    padding: 15px 20px;
    height: 64px;
    box-sizing: border-box;
  }

  ul {
    margin: 0;
    padding: 0;
  }
ul li{
    list-style: none;
}
  .row>ul>li {
    margin-right: 20px;
    height: 32px;
    line-height: 32px;
  }
.row>ul>li,
.theme-view dl,
ul.theme-item>li:first-of-type{
  float: left;
}
.theme-view dl
{
    padding: 5px 10px;
    background: #e5e5e5;
    margin: 17px 10px;
}
ul.theme-item{
  overflow: hidden;
  border-bottom: 1px solid #e5e5e5;
}
ul.theme-item>li.theme-opt{
  padding-top: 34px;
}

ul.theme-item>li{
  float: right;
}
ul.theme-item>li{
  text-align: left;
  padding: 0 20px;
}

ul.theme-item li:first-of-type{
  width: 65%;
}

.theme-info a,
.theme-opt a{
  text-decoration: none;
  margin-left: 10px;
}
.theme-opt a:last-of-type{
  color: red;
}
.theme-view dl:first-of-type{
  margin-right: 10px;
}
.theme-view dd{
  margin: 0;
}
  .mypage-page h2 {
    text-align: left;
    font-weight: normal;
    margin-bottom: 34px;
    font-size: 24px;
    margin-left: 8%;
  }

  .page.mypage-page .wrapper {
    width: 1200px;
    background-color: #ffffff;
    box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.1);
    border: solid 1px #e5e5e5;
    padding: 0%;
    background: #fff;
    padding-bottom: 20px;
  }

.el-button{
  height: 32px;
  font-size: 12px;
}


</style>
