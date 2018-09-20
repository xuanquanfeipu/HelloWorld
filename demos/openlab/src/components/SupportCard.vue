<template>
  <el-card :body-style="{ padding: '0px' }">
    <div style="padding: 14px;">
      <span style="color:#66A9FF;">{{supportItem.title}}</span>
      <div class="bottom clearfix">
        <div style="color:#7D888F;">{{supportItem.desc}}</div>
        <h2>{{supportItem.phone}}</h2>
      </div>
    </div>
  </el-card>
</template>
<script>
export default {
  name:'SupportCard',
  // data() {
  //     return {
  //       supportItem:{
  //         title:'开发与体验咨询',
  //         desc:'产品售前咨询、产品体验咨询、解决方案咨询、在线预约服务、交互操作指南',
  //           phone:'025-88889888'
  //       },
        
  //     }
  //   },
    props:['supportItem']
}
</script>
<style scoped>

  .el-card{
    height: 100%;
    text-align: left;
  }
  .el-card__body>div{
    margin: 22px;
  }
  .el-card__body>div>span{
    font-size: 18px;
  }
  .el-card__body>div .bottom{
    font-size: 14px;
    margin-top: 13px;
    line-height: 12px;
  }
  .el-card__body>div .bottom{
    line-height: 30px;
  }
 h2{
   font-weight: bold;
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
