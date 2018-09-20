<template>
<div>
  <h1 class="font-normal footer-title">{{footerMsg.title}}</h1>
  <img v-if="footerMsg.img" :src="footerMsg.img" alt="">
  <ul>
    <li v-for="(item,num) in footerMsg.list" :class="{'footer-bottom':footerIndex==2 && num==1}">
       <a class="font-small a-cursor" @click="toPath(item.url)">{{item.name}}</a>
    </li>
  </ul>
</div>
</template>
<script>
  export default {
    name:'FooterLink',
    props: ['footerMsg','footerIndex'],
    methods:{
      toPath(url){
        if(url.substring(0,4) == "http"){
          window.location.href=url;
        }else{
          this.$router.push(url);
        }
      }
    }
  }

</script>
<style scoped>
.a-cursor{
  cursor: pointer;
}
.footer-title {
  font-weight: bold;
  margin-bottom: 30px;
  color: #f0f0f0;
}

 ul{
    padding-left: 0;
    text-align: left;
 }

 li{
   list-style: none;
 }

 a{
   text-decoration: none;
   color: rgba(240,240,240,0.9);
 }

.footer-bottom {
  margin-bottom: 40px;
}
</style>
