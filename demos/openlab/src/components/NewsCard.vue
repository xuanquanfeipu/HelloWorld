<template>
  <el-card :body-style="{ paddingLeft: '20px' }">
    <img :src="newsMsg.img" class="image">
    <div style="padding: 14px;text-align: left;margin-left: 55px;padding-top: 0;margin-right: 0;">
      <span>{{newsMsg.title}}</span>
      <div class="bottom clearfix">
        <div>{{newsMsg.desc}}</div>
        <!-- <time class="time">{{ currentDate }}</time>
        <el-button type="text" class="button">操作按钮</el-button> -->
      </div>
    </div>
  </el-card>
</template>
<script>
  export default {
    name: 'NewsCard',
    // data() {
    // return {
    //   currentDate: new Date()
    // };
    //   return {
    //     newsMsg:{
    //       title:'最新动态',
    //       desc:'中兴正在发布 “智慧城市2.0”'
    //     },

    //   }
    // },
    props: ['newsMsg']
  }

</script>
<style scoped>
  .el-card {
    height: 100%;
    border: 1px solid #ebeef5;
    background-color: #fff;
    /* -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1); */
    color: #303133;
    width: 300px;
    float: left;
    box-sizing: border-box;
    height: 100px;
  }

  .el-card__body>div {
    margin: 22px;
  }

  .el-card__body>div>span {
    font-size: 18px;
    font-weight: normal;
    font-family: 'Mircosoft YaHei';
    color: #666;
    position: relative;
  }

  .el-card__body>div>span::after {
    content: '';
    height: 2px;
    background: #0084FF;
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 24px;
  }

  .el-card__body>div .bottom {
    font-size: 14px;
    margin-top: 13px;
    line-height: 14px;
    font-weight: normal;
    font-family: 'Mircosoft YaHei';
    color: #9b9b9b;
  }

  .image {
    float: left;
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
