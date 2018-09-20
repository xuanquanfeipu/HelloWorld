<template>
  <el-card :body-style="{ padding: '0px' }" class="case-summary">
    <div style="padding: 0 14px 14px 0px;margin-top: 0;">
      <h1>
        <span>{{summaryMsg.title}}</span>
      </h1>
      <div class="bottom clearfix">
        <div>
          <h2>{{summaryMsg.desc}}</h2>
        </div>
        <a href="#" style="text-decoration:none;color:#0084FF;font-family: 'Microsoft YaHei';">
          <router-link to="/cases" style="font-size:16px;text-decoration:none;color:#0084FF;font-family: 'Microsoft YaHei';">{{summaryMsg.btnText}}</router-link>
        </a>
        <div>
          <span class="icon-wrap prev" @click='prev(summaryMsg.casesList)'>
            <!-- <i class="icon el-icon-arrow-left"></i> -->
          </span>
          <span class="icon-wrap next" @click='next(summaryMsg.casesList)'>
            <!-- <i class="icon el-icon-arrow-right"></i> -->
          </span>
        </div>
      </div>
    </div>
  </el-card>
</template>
<script>
  export default {
    name: 'CaseSummary',
    props: ['summaryMsg'],
    methods: {
      prev(casesList) {
      casesList.unshift(casesList.pop());
        this.$emit('prev', casesList);
      },
      next(casesList) {
        casesList.push(casesList.shift());
        this.$emit('next', casesList);
      }
    }
  }

</script>
<style scoped>
  .el-card {
    height: 100%;
    border: none;
    background: none;
    box-shadow: none;
  }

  .el-card__body>div {
    margin: 22px;
    width: 60%;
    margin-left: 0%;
    text-align: left;
  }

  .el-card__body>div>span {
    font-size: 18px;
  }

  .el-card__body>div .bottom {
    font-size: 14px;
    margin-top: 13px;
    text-align: left;
    line-height: 30px;
    width: 230px;
  }

  h1 {
    font-size: 24px;
    font-weight: normal;
    margin-top: 0;
    color: #333;
    font-family: 'Microsoft YaHei';
    position: relative;
  }

  h1:after {
    content: '';
    height: 4px;
    background: #0084FF;
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 48px;
  }

  h2 {
    font-size: 16px;
    font-weight: normal;
    color: #666;
    font-family: 'Microsoft YaHei';
  }

  .image {
    display: block;
    margin: auto;
    margin-bottom: 10px;
  }

  .icon-wrap {
    color: #BCBCBC;
    /* border: 1px solid #BCBCBC; */
    margin: 25px 5px 25px 0px;
    padding: 5px;
    display: inline-block;
    width: 38px;
    height: 38px;
    cursor: pointer;
  }

  .icon-wrap.prev {
    background: url(../../static/images/home/prev.png) 0 0 no-repeat;
  }

  .icon-wrap.prev:hover {
    background: url(../../static/images/home/prev.png) 0 -48px no-repeat;
  }

  .icon-wrap.next {
    background: url(../../static/images/home/next.png) 0 0 no-repeat;
  }

  .icon-wrap.next:hover {
    background: url(../../static/images/home/next.png) 0 -48px no-repeat;
  }

  i {
    color: #BCBCBC;
    font-size: 30px;
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
