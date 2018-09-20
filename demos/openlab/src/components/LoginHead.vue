<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">
      <router-link to="/" class="head-logo">
        <img src="../../static/images/common/logo-home.png" alt="">
      </router-link>
    </el-menu-item>
    <el-menu-item index="1">
      <router-link to="/home">首页</router-link>
    </el-menu-item>
  </el-menu>
</template>
<script>
  export default {
    name: 'LoginHead',
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        // sessionStorage.setItem('isLogin',0);
        // this.$emit('triggerHide', '0');
        this.$router.push('/');
      }
    }
  }

</script>
<style scoped>
  .head-logo {
    /* background: url('../../static/images/Logo-blue.png') center center no-repeat; */
  }

  .el-menu {
    background: #2F3E4F;
  }

  .el-menu--horizontal>.el-menu-item,
  .el-submenu__title {
    color: #373D41;
    font-size: 16px;
  }

  .el-menu--horizontal>.el-menu-item a {
    text-decoration: none;
    color: #fff;
    margin-right: 20px;
  }

  .el-menu--horizontal>.el-menu-item:first-of-type {
    font-size: 24px;
    color: #008FD5;
  }

  .el-menu--horizontal>.el-menu-item:last-of-type {
    float: right;
    border: none;
  }

  .el-menu--horizontal>.el-menu-item {
    border: none;
  }

  .el-dropdown-menu__item--divided:before,
  .el-menu,
  .el-menu--horizontal>.el-menu-item:focus,
  .el-menu--horizontal>.el-menu-item:hover,
  .el-menu--horizontal>.el-submenu .el-submenu__title:hover {
    background-color: transparent;
  }

</style>
