<template>
  <el-col :span="8">
    <div class="grid-content home-card"  @click='toDetail(productMsg.id)'>
      <el-card :body-style="{ padding: '0px' }">
        
        <div style="">
          <!-- <span><img :src="productMsg.img" class="image"></span> -->
          <span><h2>{{productMsg.name}}</h2></span>
          <div class="bottom clearfix">
            <div style="height:70px;overflow:hidden;">{{productMsg.desc}}</div>
          </div>
        </div>
      </el-card>
    </div>
  </el-col>
</template>
<script>
  export default {
    name: 'PaneCard',
    props: ['productMsg'],
    methods:{
      toDetail:function (id) {//立即体验
         this.$router.push('/product/'+id)
      },
    }
  }

</script>
<style scoped>
  .el-card {
    height: 140px;
    border: none;
    box-shadow: none;
    background: none;
    cursor: pointer;
    box-sizing: border-box;
    
  }
.el-card:hover{
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  background: #fff;
}
  .el-card__body>div {
    margin: 0 22px 22px 22px;
  }

  .el-card__body>div>span {
    font-size: 18px;
  }

  .el-card__body>div .bottom {
    font-size: 14px;
    font-weight: normal;
    font-family: 'Microsoft YaHei';
    color:#666;
  }

h2 {
    font-size: 16px;
    font-weight: normal;
    font-family: 'Microsoft YaHei';
    color:#333;
}
h2:hover{
  color:#0084ff;
}

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
  .home-card {
    text-align: left !important;
  }
</style>
