import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import axios from 'axios'
import VueVideoPlayer from 'vue-video-player'
import BootstrapVue from 'bootstrap-vue'
import 'babel-polyfill'


import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'

Vue.use(ElementUI)
Vue.use(VueVideoPlayer);
Vue.use(BootstrapVue);

Vue.config.productionTip = false

axios.get('./static/devUrl.js').then(response => {
  Vue.prototype.GLOBAL = eval(response.data);
  axios.defaults.baseURL = eval(response.data).BASE_URL;
  Vue.prototype.$http = axios
  var vm = new Vue({
    el: '#app',
    data() {
      return {
        path: this.$router.currentRoute.path
      }
    },
    watch: {
      '$route'(to, from) {
        this.path = this.$router.currentRoute.path;
      }
    },
    router,
    components: {App},
    template: '<App/>'
  })
});
