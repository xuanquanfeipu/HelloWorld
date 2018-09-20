<template>
    <el-container style="margin:10px">
        <el-aside width="200px">
            <people-center-nav></people-center-nav>
        </el-aside>
        <el-main>
            <router-view/>
        </el-main>
    </el-container>
</template>
<script>
import PeopleCenterNav from '@/components/PeopleCenterNav'
export default {
    data(){
        return{

        }
    },
    methods:{

    },
    components:{
        PeopleCenterNav
    },
}
</script>
<style scoped>
    .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    }
  
    .el-aside {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 200px;
    }
  
    body > .el-container {
    margin-bottom: 40px;
    }
  
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
    line-height: 260px;
    }
  
    .el-container:nth-child(7) .el-aside {
    line-height: 320px;
    }
</style>

