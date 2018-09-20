<template>
  <div>
    <h1>{{dateMsg.title}}</h1>
    <h2>{{dateMsg.desc}}</h2>
    <router-link to="/apply">
      <el-button :style="btnBg" style="color: #ffffff;">
        {{dateMsg.btnText}}
      </el-button>
    </router-link>
    <ul>
      <li v-for="item in dateMsg.list" >
        <!-- <i class="el-icon-check"></i> {{item}} -->
        <span class="img-wrap"><img :src="item.img" alt=""> </span> {{item.advantage}}
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'DateYourself',
    props: ['dateMsg'],
    data() {
      return {
        btnBg: {
           backgroundImage: 'url(' + require('../../static/images/home/btn-date.png') + ')'
        }
      }
    },
    methods: {
     
    }
  }

</script>
<style scoped>
  h1 {
    font-size: 24px;
    position: relative;

    color: #fff;
    margin-top: 50px;
    margin-bottom: 30px;
  }

  h1::before {
    content: '';
    height: 2px;
    width: 52px;
    background: #017CEE;
    position: absolute;
    bottom: -10px;
  }

  h2 {
    font-size: 16px;
    color: rgba(255, 255, 255, .8);
    margin-bottom: 30px;
  }

  h1,
  h2 {
    font-weight: normal;
    font-family: 'Mircosoft YaHei';
  }

  ul {
    padding-left: 0;
    opacity: 0.8;
  }

  li {
    list-style: none;
    margin: 14px 0;
  }
.img-wrap{
      position: relative;
    top: 3px;
    margin-right: 5px;
}
  .el-button {
    /* background: no-repeat center;
    background-size: cover; */
    width: 206px;
    color: #0081F8;
    font-size: 18px;
    border: 1px solid #026ACA;
    margin-bottom: 20px;
  }
.el-button:hover{
  background-position: 0 -45px;
}
.el-button:active{
  background-position: 0 -90px;
}
  a {
    text-decoration: none;
    color: #fff;
  }

</style>
