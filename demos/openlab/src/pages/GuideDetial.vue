<template>
    <div class="page">
        <!--面包屑开始-->
        <el-breadcrumb separator-class="el-icon-arrow-right" class="guide-breadcrumb">
          <el-breadcrumb-item :to="{ path: '/develop' }">
            <span class="font-a">开发与体验</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/develop' }">
            <span class="font-a">云上实验室</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>使用指导</el-breadcrumb-item>
        </el-breadcrumb>
        <!--面包屑结束-->

        <!--牟点菜单开始-->
      <div id="guideDetail">
        <b-card no-body ref="navContent">
          <b-nav justified pills slot="header" v-b-scrollspy>
            <b-nav-item active href="#one" @click="scrollIntoView">测试预约</b-nav-item>
            <b-nav-item href="#two" @click="scrollIntoView">对接测试VPN接入</b-nav-item>
            <b-nav-item href="#three" @click="scrollIntoView">产品测试对接</b-nav-item>
            <b-nav-item href="#four" @click="scrollIntoView">产品对接测试报告及证书获取</b-nav-item>
          </b-nav>
          <b-card-body>
            <div class="main" id="one">
              <el-main>
                <div class="guide-title" >
                  测试预约
                </div>
                <h5 id="1.1">访问云上实验室</h5>
                <p>
                  云上实验室对接测试平台支持microsoft internet explorer 10及以上版本、google chrome 43及以上版本访问。
                </p>
                <p>
                  1.打开远程实验室网址http://cloudlab.zte.com.cn，页面如下图所示。在首页中您可以查看到当前云上实验室产品动态、成功案例等展示信息
                </p>
                <img src="static/images/guide/1_index.png" class="guide-img">
                <p>2.如需进一步预约产品测试，请点击首页上方的“注册”进行用户注册</p>
                <img src="static/images/guide/2_index.png" class="guide-img">
                <p>3.使用您注册成功的用户名和密码登录系统</p>
                <img src="static/images/guide/3_index.png" class="guide-img">
                <p>
                  4.首页-开发与体验，点击“云上实验室”，在云上实验室页面展示云上实验室功能、云上实验室列表、预约流程、使用指导。点击云上实验室列表可以进行产品预约测试。
                </p>
                <img src="static/images/guide/4_index.png" class="guide-img">
                <p>预约申请</p>
                <img src="static/images/guide/5_index.png" class="guide-img">
                <p>我的账户-我的申请，查看预约进度，并可以进行续约。</p>
                <img src="static/images/guide/6_index.png" class="guide-img">
                <p>预约通过后，在我的账户-我的资源，可查看申请的资源状况。（产品环境接入方式，请参考下一章节：对接测试vpn接入）</p>
                <img src="static/images/guide/7_index.png" class="guide-img">
                <p>我的账户-子账户管理，可以添加多个子账户，用于登录产品环境，进行产品测试对接。</p>
                <img src="static/images/guide/8_index.png" class="guide-img">
                <p id="two">
                测试申请审批通过后，管理员会通过邮件向您发送预约成功确认邮件，包括环境信息、对接测试的vpn接入用户名和密码，请注意查收邮件
                </p>
                <h4 class="guide-title">对接测试vpn接入</h4>
                <el-collapse v-model="activeNames" id="test-vpn">
                  <el-collapse-item title="Windows" name="1">
                    <p>1.下载CloudLab VPN软件安装文件</p>
                    <p><a  href="static/VPN/windows/CloudLabVPN_setup.exe"
                          class="upload"
                          download="CloudLabVPN_setup.exe">CloudLabVPN_setup.exe</a>
                    </p>
                    <p>2.vpn客户端安装指导</p>
                    <p>1)双击安装文件进行安装，在弹出窗口中选择“下一步”。</p>
                    <img  src="static/images/guide/CloudLabVPN01.png">
                    <p>2)选择安装的路径，点击“安装”进行安装。</p>
                    <img  src="static/images/guide/CloudLabVPN02.png">
                    <p>3)在安装过程中如弹出设备软件安装确认对话框请点击“安装”。</p>
                    <img  src="static/images/guide/CloudLabVPN03.png">
                    <p>4)提示安装完成后，点击“关闭”结束安装。</p>
                    <img  src="static/images/guide/CloudLabVPN04.png">
                    <p>3.vpn客户端使用指导</p>
                    <p>1)预约申请成功后，登录云上实验室门户，请先前往 个人中心-我的资源 中查询VPN地址和端口号并记录。 </p>
                    <img  src="static/images/guide/CloudLabVPN05.png">
                    <p>2)双击打开CloudLab VPN软件。</p>
                    <p>3)首次运行VPN，会提示输入VPN的IP地址和端口号，根据我的资源中查询到信息输入，点击“确定”。</p>
                    <img  src="static/images/guide/CloudLabVPN06.png">

                    <p>4)输入用户名密码，用户名密码和云上实验室的注册用户名密码相同，然后点击“登录”。</p>
                    <img  src="static/images/guide/CloudLabVPN07.png">
                    <p>5)登录成功后，图标会变蓝，变成<img  src="static/images/guide/CloudLabVPN08.png">。</p>
                    <p>6)此时就可以连接相关系统进行对接测试了。</p>
                    <p>7)使用完毕后，可右键点击任务栏图标，并单击“断开”可断开VPN连接或“退出”可退出程序。如果VPN的IP地址或端口输入错误了可以点击这里的“设置”进行修改，VPN登录过程相关的日志可点击“查看日志”进行查看。</p>
                    <img  src="static/images/guide/CloudLabVPN09.png">
                  </el-collapse-item>
                  <el-collapse-item title="Linux" name="2">
                    <p class="guide-vpntest-title">支持系统</p>
                    <!-- <p>CGSL V5及以上系统</p> -->
                    <p><a  href="static/VPN/linux/CGS-Linux-MAIN.V5.01.20.P1-x86_64.dvd.iso"
                          class="upload"
                          download="CGS-Linux-MAIN.V5.01.20.P1-x86_64.dvd.iso">CGSL V5</a>及以上系统</p>
                    <p>CentOS V7.0及以上系统</p>
                    <p class="guide-vpntest-title">使用场景</p>
                    <p>1.支持VPN客户端的Linux系统可单独作为VPN客户端使用。</p>
                    <img  src="static/images/guide/linuxvpn1.png">
                    <p>2.作为VPN网关服务器提供给其他同一局域网内的PC或服务器使用。</p>
                    <img  src="static/images/guide/linuxvpn2.png">
                    <p class="guide-vpntest-title">VPN客户端安装使用指导</p>
                    <p>1.安装CGSL或CentOS操作系统并配置好网络，CentOS需要使用yum安装软件包，请确保yum源能正常使用。</p>
                    <!-- <p>2.下载CloudLab VPN软件安装文件CloudLabVPN.bin。</p> -->
                    <p>2.下载CloudLab VPN软件安装文件</p>
                    <p><a  href="static/VPN/linux/CloudLabVPN.bin"
                          class="upload"
                          download="CloudLabVPN.bin">CloudLabVPN.bin</a></p>
                    <p>3.上传CloudLab VPN安装文件至安装的操作系统上，例如上传到/home目录。</p>
                    <p>4.使用root用户登录操作系统，执行如下红色标注的命令（//符号后为注释。） </p>
                    <p style="border:1px solid #000;box-sizing:border-box;padding-left:10px;width:750px;padding-right:10px;" >
                      [root@localhost ~]# <span class="fontColor">cd /home/</span>       <span style="margin-left:60px;color:#ff3040">//进入VPN客户端所在目录</span><br/>
                      [root@localhost home]# <span class="fontColor">chmod 755 CloudLabVPN.bin</span>    <span style="margin-left:60px;color:#ff3040">//对VPN客户端安装文件增加执行权限</span><br/>
                      [root@localhost home]# ./CloudLabVPN.bin   <span style="margin-left:60px;color:#ff3040">//执行安装VPN客户端</span><br/>
                      ************************************please input install mode******************************************<br/>
                      1.cloud server  2.client proxy gateway installer ? (default:2):<span class="fontColor">2</span>    <span style="margin-left:60px;color:#ff3040">//输入2，或直接回车</span><br/>
                      *******************************************************************************************************<br/>
                      installing vpnclient:<br/>
                      The OS is not TAG_CGS_MAIN_V5_02_20_F3,When you have any question, please contact your technical supporter!<br/>

                      This rpm packet: pkcs11-helper-1.08-2.el7.centos.x86_64.rpm installed Successfully!<br/>
                      ************************************<br/>

                      This rpm packet: pkcs11-helper-devel-1.08-2.el7.centos.x86_64.rpm installed Successfully!<br/>
                      ************************************<br/>

                      warning: /home/bin/depend-rpms/python-pycrypto-2.6.1-40.1.x86_64.rpm: Header V3 RSA/SHA1 Signature, key ID 57c704fb: NOKEY<br/>
                      This rpm packet: python-pycrypto-2.6.1-40.1.x86_64.rpm installed Successfully!<br/>
                      ************************************<br/>

                      warning: /home/bin/depend-rpms/python2-six-1.10.0-9.el7.noarch.rpm: Header V4 RSA/SHA1 Signature, key ID 764429e6: NOKEY<br/>
                      This rpm packet: python2-six-1.10.0-9.el7.noarch.rpm installed Successfully!<br/>
                      ************************************<br/>

                      This rpm packet: python-ecdsa-0.11-3.el7.noarch.rpm installed Successfully!<br/>
                      ************************************<br/>

                      warning: /home/bin/depend-rpms/python-paramiko-1.15.1-1.el7.noarch.rpm: Header V4 RSA/SHA1 Signature, key ID 764429e6: NOKEY<br/>
                      This rpm packet: python-paramiko-1.15.1-1.el7.noarch.rpm installed Successfully!<br/>
                      ************************************<br/>

                      warning: /home/bin/depend-rpms/python-IPy-0.75-6.el7.noarch.rpm: Header V3 RSA/SHA256 Signature,key ID f4a80eb5: NOKEY<br/>
                      This rpm packet: python-IPy-0.75-6.el7.noarch.rpm installed Successfully!<br/>
                      ************************************<br/>

                      This rpm packet: vsftpd-3.0.2-10.el7.x86_64.rpm installed Successfully!<br/>
                      ************************************<br/>

                      {'lzo-minilzo': [{'spec': '', 'installed': False}], 'lzo-devel': [{'spec': '', 'installed': False}], 'lzo': [{'spec': '2.06-6.el7.x86_64', 'installed': True}]}
                      now begin to install the rpms fellowed ['lzo-minilzo']<br/>
                      warning: /home/bin/depend-rpms/lzo-minilzo-2.06-6.el7.x86_64.rpm: Header V4 DSA/SHA1 Signature, key ID bca3e38f: NOKEY<br/>
                      local install [lzo-minilzo-2.06-6.el7.x86_64.rpm] success!<br/>
                      Checks lzo OK!<br/>
                      Checks iptables-services OK!<br/>
                      {'openssl-static': [{'spec': '', 'installed': False}], 'openssl': [{'spec': '1.0.1e-42.el7.8.x86_64', 'installed': True}], 'openssl-devel': [{'spec': '1.0.1e-42.el7.8.x86_64', 'installed': True}], 'openssl-libs': [{'spec': '1.0.1e-42.el7.8.x86_64', 'installed': True}]}<br/>
                      now begin to install the rpms fellowed []<br/>
                      Checks openssl OK!<br/>
                      config vpnclient version complete successfully!<br/>
                      sshd restart complete successfully!<br/>
                      config nf_module install-on-boot success!<br/>
                      config the openvpn shared lib<br/>
                      **********************   config network begin   ************************<br/>
                      **********************   config network complte   **********************<br/>
                      ************************************************************************<br/>
                      **********************   config vpn begin   ****************************<br/>
                      please input remote server ip[sample: 1.2.3.4]: <span class="fontColor">8.8.8.8</span>   <span style="margin-left:60px;color:#ff3040">//   输入VPN服务器地址</span><br/>
                      please input remote server port[sample: 1194]: <span class="fontColor">20000</span>    <span style="margin-left:60px;color:#ff3040">//输入用户对应VPN服务器的端口号</span><br/>
                      please input user name: <span class="fontColor">user</span>     <span style="margin-left:60px;color:#ff3040">//输入用户名，和cloudlab.zte.com.cn登录用户相同</span><br/>
                      please input password:<span class="fontColor"> password</span>    <span style="margin-left:60px;color:#ff3040">//输入密码，和cloudlab.zte.com.cn登录密码相同</span><br/>
                      please choose an interface to communicate between local network and virtual private network:<br/>
                      0--eth0<br/>
                      1--eth1<br/>
                      input with the index number:<span class="fontColor">0 </span>   <span style="margin-left:60px;color:#ff3040">//如果有多张网卡，请输入业务服务器与此VPN网关服务器通讯的网卡</span><br/>
                      now backup old iptables default rules...<br/>
                      2018-07-20 18:00:49.866914<br/>
                      backup old iptables default rules success!<br/>
                      ln -s '/usr/lib/systemd/system/iptables.service'<br/> '/etc/systemd/system/basic.target.wants/iptables.service'<br/>
                      execute the cmd: systemctl start openvpn-server@client.service<br/>
                      vpn start success<br/>
                      start vpnmonitor process success<br/>
                      config vpnmonitor start with the host<br/>
                      config.py completes successfully<br/>
                      **********************   config vpn complete   *************************<br/>
                      [root@localhost home]# <span class="fontColor">ip route</span>    <span style="margin-left:40px;color:#ff3040">//查看路由是否存在172.31.252.0/22的路由，如果存在，说明VPN连接成功。</span><br/>
                      default via 192.168.0.1 dev eth1<br/>
                      default via 192.168.0.1 dev eth1  proto static  metric 1024<br/>
                      10.10.10.0/24 dev tun0  proto kernel  scope link  src 10.10.10.6<br/>
                      169.254.0.0/16 dev eth1  scope link  metric 1004<br/>
                      192.168.0.0/24 dev eth1  proto kernel  scope link  src 192.168.0.3<br/>
                      <span class="fontColorblue">172.31.252.0/22 via 10.0.8.1 dev tun0</span><br/>
                      [root@localhost home]#<br/>
                    </p>
                    <p>5.安装完成后会自动启动vpn进程以及监控进程，如需退出监控，可使用service vpnmonitord stop（不退出监控，监控会自动将vpn进程拉起）；可以使用systemctl start/stop openvpn-server@client来控制vpn 客户端的启/停。</p>
                    <p>6.如需要修改VPN地址端口，可以修改/usr/local/openvpn-2.2.3/etc/client.conf文件里的remote信息：</p>
                    <p style="border:1px solid #000;box-sizing:border-box;padding-left:10px;width:750px;">
                      client<br/>
                      dev tun<br/>
                      auth-user-pass /usr/local/openvpn-2.2.3/etc/client-cert<br/>
                      <span class="fontColor">remote 8.8.8.8 20000</span><br/>
                      proto udp<br/>
                      explicit-exit-notify<br/>
                      ca /usr/local/openvpn-2.2.3/keys/ca.crt<br/>
                      comp-lzo<br/>
                      nobind<br/>
                      persist-key<br/>
                      persist-tun<br/>
                      log-append /usr/local/openvpn-2.2.3/log/openvpn.log<br/>
                      verb 3<br/>
                    </p>
                    <p>7.如需要修改VPN的登录用户信息，可以修改/usr/local/openvpn-2.2.3/etc/client-cert文件：</p>
                    <p style="border:1px solid #000;box-sizing:border-box;padding-left:10px;width:750px;">
                      user<br/>
                      password<br/>
                    </p>
                    <p>8.修改完成后，重启VPN客户端生效：</p>
                    <p style="border:1px solid #000;box-sizing:border-box;padding-left:10px;width:750px;">
                      [root@localhost home]#<span class="fontColor">systemctl stop openvpn-server@client</span><br/>
                      [root@localhost home]#<span class="fontColor">systemctl start openvpn-server@client</span><br/>
                    </p>
                    <p>9.如果是同一局域网内的其他业务系统，需要增加路由到这台VPN网关服务器上。</p>
                    <p>1）Windows系统，使用管理员权限打开cmd，在命令行中输入如下命令（注意修改为实际的VPN网关服务器与业务服务器通讯的IP地址）</p>
                    <p style="border:1px solid #000;box-sizing:border-box;padding-left:10px;width:750px;">
                      route add 172.31.252.0 mask 255.255.<span class="fontColor">252</span>.0 <span class="fontColor">172.16.0.3</span> -p<br/>
                    </p>
                    <p>2）Linux服务器输入以下命令临时增加路由（注意修改为实际的VPN网关服务器与业务服务器通讯的IP地址）：</p>
                    <p style="border:1px solid #000;box-sizing:border-box;padding-left:10px;width:750px;">
                      [root@host-192-168-0-4 etc]#route add –net 172.31.252.0  netmask 255.255.<span class="fontColor">252</span>.0 gw
                      <span class="fontColor">172.16.0.3</span><br/>
                    </p>
                    <p>3）Linux服务器也可以在/etc/rc.local文件里添加下面一行永久路由：</p>
                    <p style="border:1px solid #000;box-sizing:border-box;padding-left:10px;width:750px;">
                      route add –net 172.31.252.0/<span class="fontColor">22</span> gw <span class="fontColor">172.16.0.3</span><br/>
                    </p>
                  </el-collapse-item>
                  <el-collapse-item title="Android" name="3">
                    <!-- <p>支持系统</p> -->
                    <p class="guide-vpntest-title">VPN客户端安装使用指导</p>
                    <p>1.扫描二维码，下载CloudLAB VPN客户端。</p>
                    <img  src="static/images/guide/Android1.png" style="width:200px;height:200px">
                    <p>2.打开CloudLAB VPN客户端软件，点击“立即升级”，将VPN客户端软件升级至最新版本。</p>
                    <p>3.升级后重新打开CloudLAB VPN客户端软件，在VPN服务器配置中输入服务器地址和端口号（个人中心-我的资源 中查询VPN地址和端口号）</p>
                    <img  src="static/images/guide/Android2.png" style="width:350px;height:550px">
                    <p>4.登录后有如下提示，点击“确定”。</p>
                    <img  src="static/images/guide/Android3.png" style="width:350px;height:550px">
                    <p>5.输入用户名密码，用户名密码和云上实验室的注册用户名密码相同。</p>
                    <img  src="static/images/guide/Android4.png" style="width:350px;height:550px">
                    <p>6.CloudLAB VPN日志显示“已连接：SUCCESS”，表明VPN登录成功。屏幕右上角有图标出现。</p>
                    <img  src="static/images/guide/Android5.png" style="width:350px;height:550px">
                  </el-collapse-item>
                </el-collapse>
                <h4 id="three" class="guide-title">产品测试对接</h4>
                <p id="four">接入vpn后我们就可以用远程对接实验室的产品环境了，对于不同业务的环境，请阅读平台提供的产品服务接口说明，根据说明中的指导来完成与环境的对接。根据产品信息中提供的产品资料以及对接测试样例，修改产品服务接口配置，与目标测试产品地址对接，进行对接测试。
                </p>
                <p>
                  用户应该在平台管理员分配的有效时间内完成产品对接测试，如有需要可以联系管理员进行对接测试时间延长。当用户已经使用完实验室的资源，请联系管理员及时释放，以免造成资源浪费。
                </p>
                <h4 class="guide-title">产品对接测试报告及证书获取</h4>
                <p>
                  对接测试完成后，用户可以通过电话和邮件的方式向平台管理员获取产品对接测试报告和认证证书，同时，在云上实验室官方首页也会提供通过对接测试企业的认证证书进行展示和下载。
                </p><img  src="static/images/guide/certificate.png" class="guide-img1">
              </el-main>
            </div>
          </b-card-body>
        </b-card>
        <b-card no-body style="position: fixed;top: 0;width: 100%" v-show="navTopShow">
          <b-nav justified pills slot="header" v-b-scrollspy>
            <b-nav-item active href="#one" @click="scrollIntoView">测试预约</b-nav-item>
            <b-nav-item href="#two" @click="scrollIntoView">对接测试VPN接入</b-nav-item>
            <b-nav-item href="#three" @click="scrollIntoView">产品测试对接</b-nav-item>
            <b-nav-item href="#four" @click="scrollIntoView">产品对接测试报告及证书获取</b-nav-item>
          </b-nav>
        </b-card>
      </div>
       <!-- </el-container>-->
    </div>
</template>

<script>
export default {
  name: "GuideDetial",
  data() {
    return {
      navTopShow: false,
      activeNames: ["1"]
    };
  },
  mounted: function() {
    //钩子函数
    // 添加页面滚动监听
    window.addEventListener("scroll", this.scrollListener);
    window.scrollTo(0, 0);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollListener);
  },
  methods: {
    scrollIntoView(evt) {
      let _this = this;
      evt.preventDefault();
      const href = evt.target.getAttribute("href");
      const el = href ? document.querySelector(href) : null;
      if (el) {
        window.scrollTo(0, el.offsetTop + _this.$refs.navContent.offsetTop);
      }
    },

    scrollListener() {
      let _this = this;
      let scrollTop =
        document.body.scrollTop == 0
          ? document.documentElement.scrollTop
          : document.body.scrollTop;
      if (scrollTop > _this.$refs.navContent.offsetTop) {
        _this.navTopShow = true;
      } else {
        _this.navTopShow = false;
      }
    }
  }
};
</script>

<style scoped>
@import "bootstrap-vue/dist/bootstrap-vue.css";
@import "bootstrap/dist/css/bootstrap.css";
.fontColor {
  color: #ff3040;
}
.fontColorblue {
  color: skyblue;
}
.guide-breadcrumb {
  width: 1200px;
  margin: 20px auto;
}
#guideDetail .nav-justified .nav-item {
  flex-basis: unset;
}
.nav {
  width: 1200px;
  margin: 0 auto;
}
.nav-link {
  padding: 10px 0;
  color: #333333;
}
.guide-img {
  width: 600px;
}
.guide-img1 {
  width: 400px;
}
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #0084ff;
  background-color: #ffffff;
  border-radius: 0;
  border-bottom: 3px solid #0084ff;
}
.guide-title {
  border-left: 3px solid #0084ff;
  padding-left: 10px;
  height: 18px;
  line-height: 18px;
}
.guide-vpntest-title {
  font-family: 微软雅黑;
  font-size: 13px;
  font-weight: bold;
  text-align: justify;
}
p {
  margin-bottom: 1px;
  font-family: 微软雅黑;
  font-size: 13px;
  text-align: justify;
}
img {
  margin: 20px 0;
}

h3 {
  font-weight: bold;
}
h4 {
  margin-top: 20px;
  font-size: 18px;
}
h5 {
  margin-top: 20px;
  font-weight: bold;
  font-size: 14px;
}
table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 20px;
  background-color: transparent;
  border-spacing: 0;
  border-collapse: collapse;
}
table > tbody > tr > td {
  border: 1px solid #ddd;
  padding: 7px;
  line-height: 1.42857143;
  vertical-align: top;
  max-width: 200px;
  font-size: 13px;
}
table > tbody > tr:nth-child(0) {
  text-align: center;
}
p a {
  color: #52aeff;
  cursor: pointer;
}
.upload {
  color: #0084ff !important;
}
</style>
