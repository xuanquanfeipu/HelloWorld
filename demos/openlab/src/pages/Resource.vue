<template>
  <div class="page resource-page">
    <el-row>
      <el-col :span="23" class="form_wrapper" style="margin-left:1%">
        <!--显示组织架构图-->
        <div id='jOrgChart'>
          <!-- <ul id='org' style='display:none' v-for="(item,index) in productList">
            <li >
              <ul v-for="(it,id) in item.vms">
                <li>
                  <a href='javascript:void(0)' ><dl><dt><img src='../../static/images/product.png'></dt><dd><div><input :id='it.id' type='checkbox'  class=' status-switch'  ><label class='control-label' :for='it.id' style=''>启用</label>{{ it.name }}</div></dd></dl></a>
                </li>
              </ul>
              <a href='javascript:void(0)' ><dl><dt><img src='../../static/images/product.png'></dt><dd>{{item.productName}}</dd></dl></a>
            </li>
          </ul> -->
        </div>
        <div v-show="productList.length>0" class="vm-info" style="position: absolute;right: 240px;top: 20px;">
          <!-- <el-tooltip class="bottom" effect="dark" content="bottom" placement="bottom"> -->
          <el-tooltip class="bottom" effect="light" content="bottom" placement="bottom">
            <div slot="content" v-html="vminfo">
              <!-- Teamviewer虚机信息</br>
              IP:</br>
              用户名：</br>
              密码： -->
            </div>
           <span class="enable-remote-support" style="outline:none;" v-show="isNone">
              <label class="control-label" for="opt-normal" style="margin-right: 10px;">启用远程支持</label>
              <input id="opt-normal" type="checkbox"  :checked="isOn" class="status-switch"  >
            </span>
          </el-tooltip>
            <a class="help" href="#resource" @click="toHelp">帮助</a>
        </div>

        <el-dialog
        title="远程支持功能使用指导"
        :visible="centerDialogVisible"
        width="66%;"
        center>
        <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible=false">取消</el-button>
          <el-button type="primary" @click="centerDialogVisible=false">确定</el-button>
        </span> -->
          
          <p>1.在【我的资源】页面，打开远程支持开关。若您第一次使用远程支持，系统需要为你准备远程支持虚机，请您耐心等待片刻。如下图所示：</p>
          <img :src="helpImg1" alt="">
          <p>2.当远程支持虚机准备完成后，在【我的资源】页面，会展示该虚机的IP地址，及登录账号、密码。如下图所示：</p>
          <img :src="helpImg2" alt="">
          <p>3.请您按照页面展示的虚机信息，使用VPN连接并登录到该虚机内，启动TeamView应用，如下图：</p>
          <img :src="helpImg3" alt="">
          <p>4.电话联系云上实验室支持人员，并将您的TeamView连接信息告知云上实验室的支持人员。</p> <!-- </br>远程支持热线：18696668888 -->
        </el-dialog>
        
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import '../../static/lib/jquery.jOrgChart.css';
  import '../../static/lib/switchery.css';
  require('../../static/lib/jquery.jOrgChart.js');
 var Switchery =  require('../../static/lib/switchery.js');
  // import '../../static/lib/jquery.jOrgChart.js';
  // console.log($.fn.jOrgChart)
  export default {
    name: 'Resource',
    data() {

      return {
        vminfo:'',
        isOn:false,
        isOptSuccess:false,
        centerDialogVisible:false,
        productList:[],
        helpImg1:require('../../static/images/resource/help1.png'),
        helpImg2:require('../../static/images/resource/help2.png'),
        helpImg3:require('../../static/images/resource/help3.png'),
        switchery:null,
        isNone:true
      }

    },
    mounted: function () { //钩子函数
    var _this = this;     
    this.getUserRes();  
    this.queryTeamview();
     $('.el-dialog__header button').on('click',function(){
       _this.centerDialogVisible=false;
     });
     $('.el-dialog').css('margin-top',0).css('width','66%');
    },
    updated(){
      this.isNone = sessionStorage.getItem('userType')==4?false:true
    },
    methods: {
      
      getUserRes: function () {

        var _this = this;

        this.$http({
          url: 'vresource',
          method: 'get',
          headers: {
            'X-Access-Token': sessionStorage.getItem('accessToken'),
          }
        }).then(function (resp) {
          console.log(resp)
          if (resp.data.returnCode == 0 &&resp.data.data.resource.length>0) {
            var showlist = $("<ul id='org' style='display:none'></ul>");
            var imgs = ['cloud','bigdata','goldendb','yita','desktop','vcs','ngcc','cmd'];
            var wins = ['win7-on','win7-off','win10-on','invalid'];
            var linuxs = ['linux-on','linux-off'];
            _this.productList = resp.data.data.resource&&resp.data.data.resource.map(function(item, index){
              return{
                "id": index+3,
                "name": item.productName,
                "pid": 2,
                "img":imgs[index],
                "childrens": item.vms.map(function(it,idx){
                  return {
                    "id": it.id||(idx+3+resp.data.data.length),
                    "productCode":it.productCode||'',
                    "pid": index+3,
                    "ip": it.ip||'',
                    "username": it.username||'',
                    "password": it.password||'',
                    "osPassword":it.osPassword||'',
                    "state": it.state||'',
                    "os": it.os?('('+it.os+')'):'',
                    "name":it.name || '',
                    "img":it.state?(it.state.toLowerCase()=='active'?(it.os.toLowerCase().indexOf('window')>-1?wins[0]:linuxs[0]):(it.os.toLowerCase().indexOf('window')>-1?wins[1]:linuxs[1])):wins[0],
                    childrens:[]
                  }
                })
              }
            });
            var data = [{
                "id": 1,
                "name": "VPN",
                "pid": null,
                "img":'vpn',
                "vpnip":resp.data.data.vpnip||'',
                "childrens": [{
                  "id": 2,
                  "name": "租户网络",
                  "pid": 1,
                  "img":'net',
                  "childrens":_this.productList
                  }
                ]
            }];
            _this.showall(data, showlist);
            // $("#jOrgChart").append(showlist);
            $("#jOrgChart").html(showlist);
            $("#org").jOrgChart( {
                chartElement : '#jOrgChart',//指定在某个dom生成jorgchart
                dragAndDrop : false //设置是否可拖动
            });
     

          $('#jOrgChart div.product').click();
          $('#jOrgChart div.product').on('click',function(){
            $(this).closest('.node-container').siblings('.node-container').find('.expanded').css('cursor','s-resize')
            .closest("tr").removeClass('expanded').addClass('contracted').nextAll("tr").css('visibility', 'hidden');
          });
          $('#jOrgChart div.product')[0].click();

          $('#jOrgChart .opt-btn').on('click',function(){
            var text = $(this).text();
            var vmId = $(this).data('vm');
            if(text=='启用'){
              _this.startVm(vmId,this);
            }else{
              _this.stopVm(vmId);
            }
          });
          
            // $('.status-switch').each(function (i, elem) {
            //   var switchery = new Switchery(elem, {
            //     size: 'small',
            //     disabled: false,
            //     disabledOpacity: 1,
            //     color: '#2ecc71',
            //     secondaryColor: '#bbbfc7',
            //     clickCallback: _this.clickCallback
               
            //   });
            // });
            if(_this.switchery==null)
            _this.switchery = new Switchery($('#opt-normal').get(0), {
                size: 'small',
                disabled: false,
                disabledOpacity: 1,
                color: '#2ecc71',
                secondaryColor: '#bbbfc7',
                clickCallback: _this.clickCallback
               
              });

          }else if(resp.data.data=='' ||resp.data.data.resource.length==0){
            
          }else if(resp.data.returnCode=='1011'){
            _this.$message.error(  '用户会话过期! ');
            _this.$router.push('/login');
          }

        }).catch(function (error) {
           _this.$message.error(  '查询失败！ ');
        });
  
      },
      
      showall(menu_list, parent) {
        
        let _this = this;
        $.each(menu_list, function (index, val) {
          if (val.childrens.length > 0 || val.pid<=2) {
            var className = val.pid==2?'product':'';
            var vpnip  = '';
            if(val.id==1)
            vpnip = val.vpnip?('VPN IP:'+val.vpnip ) : 'VPN IP:';

            var li = $("<li class="+className+"></li>");
            li.append("<a href='javascript:void(0)' ><dl title='"+vpnip+"'><dt><img src=" + require('../../static/images/resource/'+val.img+'.png')+"></dt><dd>" + val.name + "</dd></dl></a>").append(
              "<ul></ul>").appendTo(parent);
            //递归显示
            _this.showall(val.childrens, $(li).children().eq(1));
          } else {
             var title = 'IP地址：'+val.ip+'\n';
            title+= '账户：'+val.username +'\n';
            title+= '密码：'+val.password+'\n';
            if(val.productCode=='CloudDesktop') title+='操作系统密码：'+val.osPassword;
            var status = val.state.toLowerCase()=='active'?'停用':'启用';
            // $("<li class='vm'></li>").append("<a href='javascript:void(0)' ><dl><dt><img src=" + require('../../static/images/resource/'+val.img+'.png') +"></dt><dd><div style='height:24px;'><label class='control-label' for='opt-" + val.id +
            //   "' style=''>启用</label><input id='opt-" + val.id +
            //   "' type='checkbox'  class=' status-switch'  ></div><div title="+title+">" + val.name+"(" + val.os +")"+"</div></dd></dl></a>").appendTo(parent);
            if(!val.state||val.state.toLowerCase()=='active'){
               $("<li class='vm'></li>").append("<a href='javascript:void(0)' title='"+title+"'><dl><dt><img src=" + require('../../static/images/resource/'+val.img+'.png') +"></dt><dd><div style=''></div><div title='"+title+"'>" + val.name+"" + val.os +""+"</div></dd></dl></a>").appendTo(parent);

            } else{
              $("<li class='vm'></li>").append("<a href='javascript:void(0)' title='"+title+"'><dl><dt><img src=" + require('../../static/images/resource/'+val.img+'.png') +"></dt><dd><div style='line-height: 24px;padding: 10px 0;' title='"+title+"'>" + val.name+"" + val.os +""+"</div><div style='height:24px;'><button id='"+val.id+"' class='control-label opt-btn' name='opt-" + val.id +
              "' style='' data-vm="+(val.id||'')+">"+status+"</button></div></dd></dl></a>").appendTo(parent);

            } 
          }
        }); 
      },
      startVm(vmId,btnDom){
        var _this = this;

        this.$http({
          url: 'vresource/start/'+vmId,
          method: 'get',
          headers: {
            'X-Access-Token': sessionStorage.getItem('accessToken'),
          }
        }).then(function (resp) {
          if (resp.data.returnCode == 0) {
             _this.$message.success(  '启动虚机成功！ 请稍候刷新页面');
            //  $('#jOrgChart').html('');
            //  _this.getUserRes();  
            // $(btnDom).prop('disabled',true);
            $('.jOrgChart button[name="opt-'+vmId+'"]').attr('disabled',true);
            $('.jOrgChart button[name="opt-'+vmId+'"]').addClass('btn-disabled');

          }else{
            _this.$message.error(  resp.data.message||'启动虚机失败！ ');
          }
        }).catch(function (error) {
           _this.$message.error(  '启动虚机失败！ ');
        });
      },
      stopVm(vmname){
        var _this = this;

        this.$http({
          url: 'vresource/stop/'+vmname,
          method: 'get',
          headers: {
            'X-Access-Token': sessionStorage.getItem('accessToken'),
          }
        }).then(function (resp) {
          if (resp.data.returnCode == 0) {
             _this.$message.success(  '操作成功！ ');

          }else{
            _this.$message.error(  resp.data.message||'操作失败！ ');
          }
        }).catch(function (error) {
           _this.$message.error(  '操作失败！ ');
        });
      },
      getVmInfo(resp){
        var _this = this;
        var data = resp.data.data;
        
        if(data.status=='on'&&data.vm){
         _this.isOn = true;
		 this.switchery.changeStatus();
          _this.vminfo = 'Teamviewer虚机信息:</br>';
          _this.vminfo += 'IP：'+(data.vm.ip||'')+'</br>';
          _this.vminfo += '用户名：'+(data.vm.username||'')+'</br>';
          _this.vminfo += '密码：'+(data.vm.password||'')+'</br>';
        }else if(data.status=='on'&&!data.vm){
           _this.isOn = true;
          _this.vminfo = '正在创建虚机，</br>';
          _this.vminfo += '请稍候...';
        }else{
            _this.isOn = false;
          _this.vminfo = '';
        }

      },
      queryTeamview(obj){
         var _this = this;

        this.$http({
          url: 'vresource/queryTeamview',
          method: 'get',
          headers: {
            'X-Access-Token': sessionStorage.getItem('accessToken'),
          }
        }).then(function (resp) {
          if (resp.data.returnCode == 0) {
            // resp.data.data.status='on'
            // if(resp.data.data&&resp.data.data.status=='on')
            // obj&&obj.changeStatus();
            _this.getVmInfo(resp);
            
            }else{
              _this.$message.error( resp.data.message || '查询失败！ ');
          }
        }).catch(function (error) {
           _this.$message.error(  '查询失败！ ');
        });
      },
      clickCallback(obj) {
        var normalFlag = $('#opt-normal').prop('checked');
      
        if (normalFlag) {
          //GET /isvportal/vresource/stopTeamview
          this.stopTeamview(obj);
        }else{
          //GET /isvportal/vresource/startTeamview
          this.startTeamview(obj);
        }
        // this.isOptSuccess&&obj.changeStatus();
      },
      startTeamview(obj){
        var _this = this;

        this.$http({
          url: 'vresource/startTeamview',
          method: 'get',
          headers: {
            'X-Access-Token': sessionStorage.getItem('accessToken'),
          }
        }).then(function (resp) {
//            resp.data ={
//   "returnCode": "5002",
//   "message": "启动TeamView虚机失败",
//   "data": {
//     "status": "off",
//     "vm": null
//   },
//   "success": false
// }

//           resp.data = {
//   "returnCode": "0",
//   "message": "启动TeamView虚机成功",
//   "data": {
//     "status": "on",
//     "vm": {
//       ip:'1.1.1.1',
//       username:'hhy',
//       password:'123456'
//     }
//   },
//   "success": false
// };

          if (resp.data.returnCode == 0) {
            // _this.isOptSuccess = true;
            obj.changeStatus();
            // $('#opt-normal').prop('checked',true);
          _this.isOn = true;
            _this.$message.success(  '启动TeamView虚机成功！ ');
            _this.getVmInfo(resp);
            //  _this.queryTeamview();
          }else{
            _this.$message.error(  resp.data.message||'启动TeamView虚机失败！ ');
          }
        }).catch(function (error) {
           _this.$message.error(  '启动TeamView虚机失败！ ');
        });
      },
      stopTeamview(obj){
        var _this = this;

        this.$http({
          url: 'vresource/stopTeamview',
          method: 'get',
          headers: {
            'X-Access-Token': sessionStorage.getItem('accessToken'),
          }
        }).then(function (resp) {
//           resp.data = {
//   "returnCode": "0",
//   "message": "停止TeamView虚机成功",
//   "data": {
//     "status": "off",
//     "vm": null
//   },
//   "success": false
// }

//             resp.data = {
//   "returnCode": "5003",
//   "message": "启动TeamView虚机失败",
//   "data": {
//     "status": "on",
//     "vm": {
//       ip:'1.1.1.1',
//       username:'hhy',
//       password:'123456'
//     }
//   },
//   "success": false
// };
          if (resp.data.returnCode == 0) {
            // _this.isOptSuccess = true;
            obj.changeStatus();
            // $('#opt-normal').prop('checked',false);
            _this.isOn = false;
            _this.$message.success(  '停止TeamView虚机成功！ ');
            _this.getVmInfo(resp);
              //  _this.queryTeamview();
          }else{
            _this.$message.error(  resp.data.message||'停止TeamView虚机失败！ ');
          }
        }).catch(function (error) {
           _this.$message.error(  '停止TeamView虚机失败！ ');
        });
      },
      toHelp(){
        // this.$router.push('/help');
        this.centerDialogVisible=true;
      }

    },
    components: {}
  }

</script>
<style>
  /* @import url('../../static/lib/switchery.css'); */
.page.resource-page .form_wrapper{
    border: 1px solid #e5e5e5;
    box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.1);
    padding: 20px;
    background: #fff;
    min-height: 400px;
	overflow-x: scroll;
}
  .page.resource-page h2 {
    text-align: left;
    font-weight: normal;
    margin-bottom: 34px;
    font-size: 24px;
    margin-left: 8%;
  }

   .page.resource-page .jOrgChart a {
      text-decoration: none;
      color: #666;
      font-size: 14px;
  }
  .page.resource-page .jOrgChart .node {
    background: none;
      width: 120px;
      height: 100px;
      line-height: 50px;
      border-radius: 4px;
      margin: 0 8px 0px 8px;
  }

  .page.resource-page .jOrgChart .line {
    height: 20px;
    width: 2px;
}

.page.resource-page .jOrgChart .right {
    border-left: 1px solid #7FC1FF;
}

.page.resource-page .jOrgChart .left {
    border-right: 1px solid #7FC1FF;
}

.page.resource-page .jOrgChart .top {
    border-top: 2px solid #7FC1FF;
}
.page.resource-page .jOrgChart .down {
  background-color: #7FC1FF;
  padding: 0 !important;
}
.page.resource-page .jOrgChart dd{
  margin-left: 0;
  margin-top: -14px;
  line-height: 24px;
}

.page.resource-page .jOrgChart > table{
  margin:0 auto;
}
.page.resource-page .jOrgChart .opt-btn{
  width: 60px;
    height: 32px;
    line-height: 32px;
    display: block;
    background: royalblue;
    color: #fff;
    margin: 0px auto;
    cursor: pointer;
}

.page.resource-page .jOrgChart td.line.left,.page.resource-page .jOrgChart td.line.right{
  position: relative;
}
.page.resource-page .jOrgChart td.line.left.top,.page.resource-page .jOrgChart td.line.right.top{
  /* width: 68px; */
}
.page.resource-page .jOrgChart td.line.left::before{
      content: '';
    width: 0;
    height: 0;
    border-top: 4px solid #7fc1ff;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid transparent;
    position: absolute;
    bottom: -8px;
    right: -5px;
}
.page.resource-page .jOrgChart>table>tbody>tr:nth-child(2) .line.down{
height: 0;
}
 .el-tooltip__popper.is-light{
    line-height: 22px;
    border: 1px solid #e5e5e5;
    box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.1);
    font-family: 'Microsoft YaHei';
    font-size: 16px;
    color:#666;
}
 .el-tooltip__popper.is-light[x-placement^=bottom] .popper__arrow{
  border-bottom-color: #e5e5e5;
}
.el-dialog__header {
    padding: 10px 20px;
    text-align: left;
    background: #F7F8FA;
}
.el-dialog__headerbtn{
  top: 14px;
}
.el-dialog__body img{
  height: 150px;
}
.page.resource-page .jOrgChart .opt-btn.btn-disabled{
  background-color: #999;
}
</style>
