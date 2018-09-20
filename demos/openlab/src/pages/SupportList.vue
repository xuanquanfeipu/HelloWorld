<template>
  <div class="page supportlist-page">
     <h2 class="page-title" for="">咨询列表</h2>
    <el-row :gutter="20" class="SupportList">
      <el-col :span="8"  v-for="(item, index) in SupportList" :key="item.id">
        <div class="grid-content ">
          <!-- <el-card :body-style="{ padding: '0px' }" >
            <div style="padding: 14px;">
              <span>{{item.title}}</span>
              <div class="bottom clearfix">
                <div>{{item.desc}}</div>
              </div>
            </div>
          </el-card> -->
          <support-card :support-item="item">
          </support-card>
        </div>
      </el-col>
      <!-- <el-col :span="5"><div class="grid-content "></div></el-col>
      <el-col :span="5"><div class="grid-content "></div></el-col>
      <el-col :span="5"><div class="grid-content "></div></el-col> -->
    </el-row>
  </div>
</template>

<script type="text/javascript">

import SupportCard from '@/components/SupportCard'
  export default {
    name: 'SupportList',
    data() {
      return {
        SupportList: [{
          title:'开发与体验咨询',
          desc:'产品售前咨询、产品体验咨询、解决方案咨询、在线预约服务、交互操作指南',
            phone:'025-88889888'
        },{
          title:'开发与体验咨询',
          desc:'产品售前咨询、产品体验咨询、解决方案咨询、在线预约服务、交互操作指南',
            phone:'025-88889888'
        },{
          title:'开发与体验咨询',
          desc:'产品售前咨询、产品体验咨询、解决方案咨询、在线预约服务、交互操作指南',
            phone:'025-88889888'
        },{
          title:'开发与体验咨询',
          desc:'产品售前咨询、产品体验咨询、解决方案咨询、在线预约服务、交互操作指南',
            phone:'025-88889888'
        },{
          title:'开发与体验咨询',
          desc:'产品售前咨询、产品体验咨询、解决方案咨询、在线预约服务、交互操作指南',
            phone:'025-88889888'
        }]
      }
    },
    methods: {
      submitForm() {}
    },
    components:{
      SupportCard
    }
  };

</script>

<style>
  .container {
    width: 100%;
  }
    .page.supportlist-page {
    height: 100%;
    padding: 0 2% 2%;
  }
    .supportlist-page > .el-row {
    height: 60%;
        margin: 0 8%!important;
    background: #fff;
  }

  .supportlist-page .el-col {
    height: 100%;
  }
 .supportlist-page  .page-title{

   text-align: left;
    font-weight: normal;
    margin-bottom: 34px;
    font-size: 24px;
    margin-left: 8%;
 }

 .supportlist-page .el-card{
    border:none;
    background: none;
    box-shadow: none;
}
  .supportlist-page h3 {
    width: 84%;
    margin-left: 8%;
    font-size: 24px;
    text-align: left;
  }


</style>
