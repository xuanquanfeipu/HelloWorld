<template>
  <el-col :span="6">
    <div class="grid-content " @click='toDetail(productMsg.id)'>
      <el-card :body-style="{ padding: '0px' }">

        <div style="padding: 14px;">
          <span>
            <img :src="productMsg.img" class="image">
          </span>
          <div class="bottom clearfix">
            <div>
              <h1>{{productMsg.desc}}</h1>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </el-col>
</template>
<script>
  export default {
    name: 'ProductCard',
    props: ['productMsg'],
    methods: {
      toDetail: function (id) { //立即体验
        this.$router.push('/product/' + id)
      },
    }
  }

</script>
<style scoped>
  .el-card {
    height: 100%;
    border: none;
    box-shadow: none;
    background: none;
  }

  .el-card__body>div {
    margin: 22px;
  }

  .el-card__body>div>span {
    font-size: 18px;
  }

  .el-card__body>div .bottom {
    font-size: 14px;
    line-height: 12px;
  }

  h1 {
    font-size: 18px;
    font-weight: normal;
    font-family: 'Microsoft YaHei';
    color: #666;
  }

  h1:hover {
    color: #0084ff;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

</style>
