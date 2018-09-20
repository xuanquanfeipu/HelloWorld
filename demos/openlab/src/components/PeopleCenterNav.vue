<template>
    <div>
        <el-row class="tac">
            <el-col :span="24">
                <el-menu
                :default-active="path"
                class="el-menu-vertical-demo"
                @select="handPath"
                style="padding-top:20px;padding-bottom:30px;padding-left:50px;text-align:left">
                    <el-menu-item index="/peopleCenter/application" @click="toPath('/peopleCenter/application',1)" v-if="isNone" :class="{'is-active':$route.path == '/peopleCenter/application'}">
                        <i class="el-icon-menu"></i>
                        <span slot="title">我的申请</span>
                    </el-menu-item>
                    <el-menu-item index="/peopleCenter/consult"  @click="toPath('/peopleCenter/consult',2)" v-if="isNone">
                        <i class="el-icon-menu"></i>
                        <span slot="title">我的咨询</span>
                    </el-menu-item>
                    <el-menu-item index="/peopleCenter/profile"  @click="toPath('/peopleCenter/profile',3)" v-if="isNone">
                        <i class="el-icon-document"></i>
                        <span slot="title">个人资料</span>
                    </el-menu-item>
                    <el-menu-item index="/peopleCenter/resource"  @click="toPath('/peopleCenter/resource',4)">
                        <i class="el-icon-setting"></i>
                        <span slot="title">我的资源</span>
                    </el-menu-item>
                    <el-menu-item index="/peopleCenter/personalHomepage"  @click="toPath('/peopleCenter/personalHomepage',5)">
                        <i class="el-icon-setting"></i>
                        <span slot="title">我的主页</span>
                    </el-menu-item>
                    <el-menu-item index="/peopleCenter/operationLog"  @click="toPath('/peopleCenter/operationLog',6)" v-if="isNone&&isFlag">
                        <i class="el-icon-setting"></i>
                        <span slot="title">我的操作</span>
                    </el-menu-item>
                    <el-menu-item index="/peopleCenter/account"  @click="toPath('/peopleCenter/account',7)" v-if="isNone">
                        <i class="el-icon-setting"></i>
                        <span slot="title">子账号管理</span>
                    </el-menu-item>
                    <el-menu-item index="/peopleCenter/password"  @click="toPath('/peopleCenter/password',8)">
                        <i class="el-icon-setting"></i>
                        <span slot="title">修改密码</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data(){
        return{
            path:'/peopleCenter/application',
            isNone:false,
            isFlag:false
        }
    },
    mounted(){
        // console.log(this.$route.path)
        this.path = this.$route.path
        this.getNone();
        // this.handPath();
    },
    updated(){
      this.getNone();
    },
    methods: {
      handPath(index,indexPath){
        //   console.log(index)
        //   console.log(indexPath)
      },

      toPath(url,index){
        this.$router.push(url);
      },

      getNone(){
        this.isNone = JSON.parse(sessionStorage.getItem('userType'))==4?false:true
        // console.log(this.isNone)
        this.isFlag = JSON.parse(sessionStorage.getItem('moderator'))
      },
    },
    watch:{
        "$route"(to,from){
            console.log(to)
        }
    }
}
</script>
<style scoped>

</style>
