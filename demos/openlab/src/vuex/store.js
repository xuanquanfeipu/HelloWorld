import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    // 定义状态
    state: {
        id: 0,
        anonymous:0,
        isLogin:false,
        moderator:false,
        moduleIds:JSON.parse(sessionStorage.getItem('moduleIds')),
        customerId:JSON.parse(sessionStorage.getItem('customerId')),
        deleteId:'',
    },
    mutations:{
        getId(state,id,anonymous,customerId){
            state.id = id
            state.anonymous = anonymous
            state.customerId = customerId
        },
        clearId(state,id,anonymous){
            state.id = id
            state.anonymous = anonymous
        },
        getModerator(state,moderator,moduleIds){
            state.moderator = moderator
            state.moduleIds = moduleIds
        },
        deleteReplyId(state,deleteid){
            state.deleteId = deleteid
        },
        getModerator(state,moderator){
            state.moderator = moderator
        }
    },
    actions:{
    
    }
})
export default store
