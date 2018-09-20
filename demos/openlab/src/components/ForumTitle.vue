<template>
        <div class="forum-title">
            <h3>开发者社区</h3>
            <div class="title-category">
                <div class="title-category-select" :class="{'title-category-select-active':path=='/forum'}" 
                id="forumIndex">
                    <a class="text-style" @click="selectTitleType(true,'#forumIndex')">
                        <div><span>社区首页</span></div>
                    </a>
                </div>
                <div class="title-category-select" :class="{'title-category-select-active':path!='/forum'}" id="forumSection">
                    <a class="text-style" @click="selectTitleType(false,'#forumSection')">
                        <div><span>论坛版块</span></div>
                    </a>
                </div>
            </div>
        </div>
</template>
<script>
export default {
    data(){
        return {
            
        }
    },
    props:['path'],
    methods:{
        //ath!='/forum' ||path != '/sectionDetail' || path != '/invitationDetail' || path != '/newInvitation' || path != '/personalCenter' || path != '/personalHomepage' || path != '/operationLog'
      selectTitleType(flag,selected){
          $(".title-category").find("div.title-category-select").each(function(){
               $(this).removeClass("title-category-select-active");
          })
          $(selected).addClass("title-category-select-active");
          this.$router.push({
                    path:'/forum'
                })
          this.$emit("selectTitleType",flag)
          
        //   window.location.reload()
      },
  }
}
</script>
<style scoped>
.forum-all {
        width: 100%;
        background-color: #fff;
        border: 1px solid #eee;
        overflow: hidden;
    }
.forum-title {
        width: 100%;
        padding-left: 2%;
        border-bottom: 1px solid #eee;
        overflow: hidden;
        position: relative;
        font: 14px/28px "microsoft yahei";
    }
    .forum-title h3 {
        font: 600 14px "microsoft yahei";
        text-align: left;
    }
    .title-category {
        position: absolute;
        top: 0;
        right: 4%;
    }
    .title-category-select {
        float: left;
        margin-left: 30px;
        cursor: pointer;
    }
    .title-category-select-active {
        color:#0084ff !important;
        border-bottom: 2px solid #0084ff!important; 
    }
    .text-style {
        display: block;
        height: 43px;
        text-align: center;
        font: 14px/43px "microsoft yahei";
        line-height: 43px;
        border-bottom: 2px solid transparent
    }
</style>


