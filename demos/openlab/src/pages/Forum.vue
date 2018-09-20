<template>
    <div class="forum-container">
      <div class="forum-all">
        <forum-title @selectTitleType='showType' :path='routePath'></forum-title>
        <forum-index v-if="isShow"></forum-index>
        <forum-section v-if="!isShow"></forum-section>
    </div>
  </div>
</template>
<script>
import ForumTitle from '../components/ForumTitle'
import ForumIndex from '../components/ForumIndex'
import forumSection from './forumSection'
import store from '@/vuex/store'
export default {
  data(){
    return{
        isShow:true,
        routePath:this.$route.path,
      }
    },
    store,
    mounted(){
        window.scrollTo(0, 0); //初始化页面在最顶部
    },
    methods:{
      showType(data){
        //   console.log(data)
          this.isShow = data
      },
    },
        

  components:{
      ForumTitle,
      ForumIndex,
      forumSection
  }
}
</script>
<style scoped>
/* 社区头部切换开始 */
    .forum-container {
        width: 80%;
        margin: 0 auto;
        padding:2% 6%;
        overflow: hidden;
    }
    .forum-all {
        width: 100%;
        background-color: #fff;
        border: 1px solid #eee;
        overflow: hidden;
    }
</style>


