<template>
  <el-card :body-style="{ padding: '0px' }">
    <div style="padding: 14px;">
      <div>
        <img :src="AdvantageMsg.img" class="image">
      </div>
      <span>{{AdvantageMsg.title}}</span>
      <div class="bottom clearfix">
        <div>{{AdvantageMsg.desc}}</div>
      </div>
    </div>
  </el-card>
</template>
<script>
  export default {
    name: 'AdvantageCard',
    props: ['AdvantageMsg']
  }

</script>
<style scoped>
  .el-card {
    height: 100%;
  }

  .el-card__body>div {
    margin: 22px;
    width: 60%;
    margin-left: 20%;
  }

  .el-card__body>div>span {
    font-size: 16px;
    font-family: 'Microsoft YaHei';
    color: #333;
  }

  .el-card__body>div .bottom {
    font-size: 14px;
    margin-top: 13px;
    text-align: center;
    line-height: 24px;
    width: 182px;
    padding: 0 39px;
  }

  .image {
    display: block;
    margin: auto;
    margin-bottom: 10px;
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
