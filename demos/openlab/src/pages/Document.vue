<template>
  <div class="page">
    <!--banner开始-->
    <banner :banner-msg="bannerMsg"></banner>
    <!--banner结束-->


    <!--资源获取开始-->
    <div class="content" style="margin-top: 30px;" id="document">
      <el-tabs :tab-position="tabPosition" style="margin-top: 50px;" @tab-click="handleClick" :value="defaultValue">
        <el-tab-pane v-bind:label="item.name" v-for="item in productList" :key="item.id" :name="item.name" :value="item.id">
          <el-row :gutter="0">
            <el-col :span="24" v-for="(item,docIndex) in documentList" :key="docIndex">
              <div class="font-middle-b doc-title" :class="{'doc-title-top':docIndex==0}" v-if="item.fileListOne.length>0">
              {{item.title}}
              </div>
              <el-table :data="item.fileListOne" v-if="item.fileListOne.length>0" style="float: left" :row-class-name="tableRowClassName">
                <el-table-column class="document-tr" prop="docTitle" width="180">
                </el-table-column>
                <el-table-column class="document-tr" prop="name" width="180" align="right">
                  <template slot-scope="scope">
                    <el-button @click="isDownload(scope.row)" type="text" size="small">
                      <img src="static/images/document/download.png" />
                      <span style="font-size: 14px;">下载</span>
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-table :data="item.fileListTwo" v-if="item.fileListTwo.length>0" style="float: right" :row-class-name="tableRowClassName">
                <el-table-column prop="docTitle" width="225">
                </el-table-column>
                <el-table-column prop="name" width="225" align="right">
                  <template slot-scope="scope">
                    <el-button @click="isDownload(scope.row)" type="text" size="small">
                      <img src="static/images/document/download.png" />下载
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--资源获取结束-->
  </div>
</template>

<script>
  import Banner from '../components/Banner'
  export default {
    name: 'Document',
    data() {
      return {
        bannerMsg: {
          bgBtn: {
            // backgroundImage: 'url(' + require('../../static/images/document/banner.png') + ')',
            backgroundImage: 'url(' + this.GLOBAL.BASE_URL + 'document/banner' + ')',
            backgroundPosition: 'center',
            height: '300px'
          },
          title: '资源中心',
          desc: '获取更多云化实验室资源，开始您的测试第一步',
          textAlign: {
            'text-align': "left"
          },
          hWidth: ""
        },
        tabPosition: "left", //资源获取tab的展示方式
        productList: [], //所有产品列表
        documentList: [],
        defaultValue: "",
      }
    },
    components: {
      Banner
    },
    mounted: function () { //钩子函数
      window.scrollTo(0, 0); //初始化页面在最顶部
      this.getList(); //获取所有产品类型
      //判断是否从产品页访问
      // if(this.$route.query.id && this.$route.query.name){
      //   this.getDocById(this.$route.query.id);//获取所有产品下的文档
      //   this.defaultValue = this.$route.query.name;
      // }else{
      //   this.getDocById(1);//获取所有产品下的文档
      // }
    },
    methods: {
      getList: function () {
        let _this = this;
        this.$http.get('product/listbytype', {
          params: {
            category: "-1"
          }
        }).then(function (response) {
          console.log(response)
          if (0 == response.data.returnCode && response.data.data) {
            _this.productList = response.data.data ? response.data.data.map((item) => {
              return {
                id: item.productId,
                name: item.productName
              }
            }) : [];
            if (_this.$route.query.id && _this.$route.query.name) {
              _this.getDocById(_this.$route.query.id); 
              _this.defaultValue = _this.$route.query.name;
            } else {
              _this.getDocById(_this.productList[0]&&_this.productList[0].id); 
              _this.defaultValue = _this.productList[0] && _this.productList[0].name;
            }

          } else {
            _this.$message('查询失败！');
          }
        }).catch(function (response) {});
      },
      handleClick(tab, event) {
        this.getDocById(tab.$attrs.value);
      },
      getDocById: function (id) {
        let _this = this;
        this.$http.get('document/' + id, {}).then(function (response) {
          if (0 == response.data.returnCode) {

            var data = response.data.data ? response.data.data.map((item) => {
              return {
                title: item.title,
                docList: item.docList,
                fileList: [],
              }
            }) : [];
            _this.documentList = data;
            //将原有数组平分为两个数组
            if (data.length > 0) {
              _this.documentList = data ? data.map((item) => {
                return {
                  title: item.title,
                  fileListOne: item.docList.slice(0, item.docList.length / 2 + 1),
                  fileListTwo: item.docList.slice(item.docList.length / 2 + 1, item.docList.length)
                }
              }) : [];
            }
          } else {
            _this.$message('查询失败！');
          }
        }).catch(function (response) {});
      },
      tableRowClassName({
        row,
        rowIndex
      }) {
        if (rowIndex % 2 === 0) {
          return 'doc-scripe-row';
        }
        return '';
      },
      isDownload(row){
        let _this = this;
        if(sessionStorage.getItem('accessToken')){
          this.$http.get('document/download/check/'+row.docId,{
            headers: {
              'X-Access-Token': sessionStorage.getItem('accessToken')
            },
          }).then(function(response){
            if(0 == response.data.returnCode){
              _this.downLoad(row);
            }else{
              _this.$message(response.data.message || '下载资源失败！');
            }
          })
        }else{
           _this.$message('请先登录！');
           return;
        }
      },
      downLoad(row) {
        let _this = this;
        if (sessionStorage.getItem('accessToken')) {
          this.$http.get('document/download/' + row.docId, {
            headers: {
              'X-Access-Token': sessionStorage.getItem('accessToken')
            },
            responseType: "blob"
          }).then(function (response) {
            if (response.data) {
              var filename = decodeURI(response.headers['content-disposition'].split(';')[1]);
              var blob = new Blob([response.data]);
              if (window.navigator.msSaveOrOpenBlob) {
                navigator.msSaveBlob(blob, filename.match(/"(\S*)"/)[1]);
              } else {
                var a = document.createElement("a");
                a.download = filename.match(/"(\S*)"/)[1];
                a.href = window.URL.createObjectURL(blob);
                a.click();
              }
            } else if (1011 == resp.data.returnCode) {
              _this.$message.error('会话已过期，请重新登录！');
            } else {
              _this.$message(response.data.message || '下载资源失败！');
            }

          }).catch(function (error) {});
        } else {
          _this.$message('您还没有登录,没有下载权限,请先登录账号。');
        }
      }
    }
  }

</script>
<style>
.el-tabs--left .el-tabs__item.is-left {
  white-space: normal !important;
}
  .el-tab-pane {
    padding-left: 40px;
  }

  .el-tabs__item {
    color: #666666;
    white-space: normal 
  }

  .el-table {
    width: auto;
    z-index: 1;
  }

  .doc-title-top {
    margin: 30px 0 20px 0 !important;
  }

  .doc-title {
    width: 100%;
    float: left;
    text-align: left;
    z-index: 999;
    color: #333333;
    margin: 30px 0 20px 0 !important
  }

  .doc-text {
    float: right;
    cursor: pointer;
  }

  .el-tabs__content {
    margin-top: 0;
  }

  .down {
    height: 50px;
    line-height: 50px;
    border-top: 1px solid #e5e5e5;
    margin-right: 20px;
    padding: 0 20px;
  }

  .down-title {
    float: left;
  }

  .down-url {
    float: right;
  }
  .el-tabs--left .el-tabs__item.is-left {
    float: none;
    width: 221px;
    height: 100%;
    /* white-space: normal; */
    word-wrap: break-word;
    word-break: break-all;
    line-height: 20px;
    display: block
  }
</style>
