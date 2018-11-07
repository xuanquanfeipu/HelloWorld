<template>
  <div id="app">
    <template>
      <main-layout></main-layout>
    </template>
  </div>
</template>

<script>
  import MainLayout from '@/components/MainLayout'
  export default {
    name: 'App',
    components: {
      MainLayout
    }
  }

</script>

<style>
  html,
  body,
  .el-container {
    margin: 0;
    padding: 0;
    min-width: 1250px;
  }

  #app {
    font-family: 'Microsoft YaHei';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #333333;
    line-height: 25px;
    height: 100%;
  }

  .page {
    padding-bottom: 90px;
  }

  .content {
    width: 1200px;
    margin: 18px auto;
    background-color: #ffffff;
    border: 1px solid #e5e5e5;
  }

  .main {
    width: 1200px;
    margin: 18px auto;
  }

  .btn-big {
    width: 206px;
    height: 44px;
  }

  .btn-middle {
    width: 160px;
    height: 38px;
  }

  .btn-small {
    width: 140px;
    height: 36px;
  }

  .font-small {
    font-size: 12px;
  }

  .font-normal,
  h2 {
    font-size: 14px;
  }

  .font-middle {
    font-size: 16px;
  }

  .font-middle-b,
  h1 {
    font-size: 18px;
  }

  .font-middle-l {
    font-size: 20px;
  }

  .font-big {
    font-size: 24px;
  }

  .font-h1-bg {
    color: #ffffff;
  }

  .font-middle-bg {
    color: #666666;
  }

  .font-a {
    color: #0084ff!important;
  }

  .font-normal-bg {
    color: #373d41;
  }

  h1 {
    font-size: 18px;
  }

  .el-row {
    margin: 0 auto !important;
  }

  .el-button,
  .el-input__inner {
    border-radius: 0;
  }

  .el-button {
    border: 0;
  }
  .el-dropdown{
    outline: none;
    cursor: pointer;
  }
.el-dropdown-menu__item{
  padding: 0;
}
  .el-dropdown-menu__item a {
    text-decoration: none;
    padding: 0 20px;
  }

  .el-dropdown-menu__item a i {
    margin-right: 5px;
  }

  .el-card,
  .el-notification {
    border: 0;
    border-radius: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  .el-card__body {
    padding: 0;
  }

  .el-tabs--left .el-tabs__header.is-left {
    width: 274px;
    border-right: 1px solid #e5e5e5;
  }

  .el-table::before {
    height: 0;
  }

  .el-tabs__item {
    height: 34px;
    margin: 34px 0;
    font-size: 16px;
    color: #666666;
  }

  .el-tabs__item.is-active {
    color: #0084ff;
    background: url("/static/images/common/bb.png") no-repeat center;
    border-right: 3px solid #0084ff;
  }

  .ecosphere .el-tabs__nav {
    /* margin-left: 150px; */
  }

  .ecosphere .el-tabs__header {
    width: 900px;
    padding-left: 150px;
}
.ecosphere .el-icon-arrow-left,
.ecosphere .el-icon-arrow-right{
    font-size: 42px;
    padding-top: 50px;
    width: 100px;
    height: 100px;
    margin-left: -38px;
    margin-right: -38px;
}

  .ecosphere .el-tabs__nav-wrap::after {
    content: '';
    background-color: transparent;
  }

  .ecosphere .el-tabs__item {
    height: 100px;
    width: 300px;
    padding: 0;
    margin-top: -18px;
  }

  .ecosphere .el-tabs__item.is-active {
    color: #0084ff;
    background: none;
    border-right: 0;
  }

  .ecosphere .el-tabs__active-bar {
    height: 3px;
    width: 200px !important;
    position: absolute;
    bottom: 0;
    left: 50px;
  }

  .banner ul.el-carousel__indicators {
    position: absolute;
    bottom: 80px !important;
    left: 50%;
  }

  .el-tabs--left .el-tabs__active-bar.is-left {
    width: 0;
  }

  .el-tab-pane {
    text-align: left;
    padding: 0 60px;
  }

  .ecosphere .el-tab-pane {
    padding: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  }

  .el-breadcrumb__item {
    height: 14px;
  }

  .vjs-poster {
    background-size: inherit;
  }

  .video-js>.vjs-big-play-button {
    left: 42% !important;
    top: 20% !important;
    line-height: 1.6em !important;
    height: 1.6em !important;
    width: 1.6em !important;
    border-radius: 1.3em !important;
    border: 0 !important;
  }

  .el-table .doc-scripe-row {
    background-color: #f7f8fa;
  }

  .el-table {
    color: #333333;
  }

  .btn {
    border: 0;
    border-radius: 0;
  }

  .el-tabs__item:focus.is-active.is-focus:not(:active) {
    border: 0;
    box-shadow: unset;
    border-radius: unset;
  }

  #document .has-gutter {
    display: none !important;
  }

  #document .el-table .cell {
    padding: 0 20px;
  }

  #document .el-tabs--left .el-tabs__header.is-left {
    width: 220px;
  }

  #nav_bar .el-menu--horizontal>.el-submenu .el-submenu__icon-arrow {
    display: none;
  }
  #nav_bar .el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
    border-bottom:2px solid #409EFF!important;
  }
  .el-header {
    padding: 0;
  }
  .guide-breadcrumb .el-breadcrumb__inner, .el-breadcrumb__inner a {
    font-weight: unset;
  }
  #guideDetail .card {
    border:0;
    background-color: #f7f8fa;
  }
  #guideDetail .card-header {
    height: 60px;
    width: 1200px;
    border: 1px solid #e5e5e5;
    border-bottom: 0;
    margin: 0 auto;
    background-color: #ffffff;
    padding: 0.75em 0.18em;
  }
  #guideDetail .card-body {
    padding: 0;
  }
  #guideDetail .main {
    border: 1px solid #e5e5e5;
    margin-top: 0;
    background-color: #ffffff;
  }
  #guideDetail .el-main {
    width: 1100px;
    margin: 40px auto;
    text-align: left;
    background-color: #ffffff;
  }
  #test-vpn .el-collapse-item__header {
    font-size: 18px;
    font-weight: bold;
  }

  

.page.mypage-page .wrapper .el-input__inner{
  height: 32px;
  line-height: 32px;
  font-size: 12px;
}
</style>
