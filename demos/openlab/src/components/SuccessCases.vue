<template>

  <el-col :span="6" style="width:300px;">
    <div class="grid-content" @mouseover="overShow" @click='toCaseDetail(caseMsg.caseId)' style="cursor:pointer;">
      <el-card :body-style="{ padding: '0px' }" style="position:relative;">
        <div class="overlay" :style="overshow" @mouseout="outHide">
          <div class="overlay-content">{{caseMsg.caseDesc}}</div>
        </div>
        <div style="">
          <span>
            <img :src="caseMsg.img" class="image">
          </span>
          <div class="bottom clearfix">
            <div>
              <h2>{{caseMsg.caseTitle}}</h2>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </el-col>
</template>
<script>
  export default {
    name: 'SuccessCases',
    data() {
      return {
        overshow: {
          visibility: 'hidden'
        }
      }
    },
    props: ['caseMsg'],
    methods: {
      overShow() {
        this.overshow.visibility = 'visible';
      },
      outHide() {
        this.overshow.visibility = 'hidden';
      },
      toCaseDetail(caseId) {
        debugger
        this.$router.push({
          path: '/casesDetail/' + caseId
        });
      }
    }
  }

</script>
<style scoped>
  ul {
    padding-left: 0;
  }

  li {
    list-style: none;
    margin: 14px 0;
  }

  .grid-content {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  }

  .overlay {
    visibility: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #0c2959;
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .overlay:hover {
    visibility: visible;
    opacity: 0.75;
  }

  .overlay-content {
    color: #fff;
    font-size: 14px;
    width: 210px;
    font-family: 'Microsoft YaHei';
  }

  .bottom {
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bottom h2 {
    font-family: 'Microsoft YaHei';
    font-size: 16px;
    color: #333;
    font-weight: normal;
  }

</style>
