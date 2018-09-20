<template>
  <div>
    <script id="editor" type="text/plain"></script>
  </div>
</template>
<script>
  export default {
    name: 'UE',
    data () {
      return {
        editor: null
      }
    },
    props: {
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      }
    },
    mounted() {
      this.$nextTick(function(){
        const _this = this;
      this.editor = UE.getEditor('editor', this.config); // 初始化UE
      this.editor.addListener('ready',function () {
        console.log(_this.defaultMsg)
        _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
      });
      })
      
    },
    methods: {
      getUEContent() { // 获取内容方法
        return this.editor.getContent()
      },
      getUEContentTxt() { // 获取内容方法
        return this.editor.getContentTxt()
      },
      setUEFocus(){
        return this.editor.focus()
      },
      //清空内容
      clearContent(){
        return this.editor.execCommand('cleardoc')
      }
    },
    destroyed() {
      this.editor.destroy();
      // delete this.UE.instants[this.id]
      // this.editor = null;
    }
  }
</script>
