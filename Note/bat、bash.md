## linux远程拷贝命令-scp

### 基本命令格式

由于使用ssh，登录之后的本机地址是不需要给出的。但是也可以不登录直接跨主机拷贝文件，可能会需要用户名及密码。

scp基本命令格式如下：
```
scp [...] src_file dst_file
```
### 文件复制
```
$scp local_file remote_username@remote_ip:remote_folder
$scp local_file remote_username@remote_ip:remote_file
$scp local_file remote_ip:remote_folder
$scp local_file remote_ip:remote_file
```
### 目录复制
```
$scp -r local_folder remote_username@remote_ip:remote_folder
$scp -r local_folder remote_ip:remote_folder
```

指定用户名是需要输入密码，不指定用户名需要同时输入用户名和密码。

假设主机A的ip是192.168.0.200，主机B的ip地址是192.168.0.100。

### SSH登录之后

我们在主机A（0.200）上通过ssh远程登录到主机B（0.100）。  

从远程主机复制文件到本地
```
$ scp a.txt tocy@192.168.0.200:~/a.txt    # 文件  
$ scp -r src tocy@192.168.0.200:~/src    # 目录   
```
上传本地文件到远程主机
```
$ scp tocy@192.168.0.200:~/a.txt a.txt  
$ scp -r tocy@192.168.0.200:~/src src  
```
直接指定两个主机拷贝

$scp tocy@192.168.0.200:/b.txt v@192.168.0.100:/from_b.txt  

**注意有些主机不支持这样拷贝**
```
scp root@10.47.180.145:/usr/bin/beas_center.sql root@10.47.180.4:/home/uocbcp/beas_center.sql  

```

//window、linux下显示目录结构，并保存到文件

tree > tree.txt

//Windows下复制目录结构

因为特殊的工作要求，需要复制一个复杂的（如果是简单的目录结构手工建立就可以了）目录结构树，而不拷贝文件。

xcopy d:\source  d:\target  /e /t

/t 创建目录结构,但不复制文件
/e 包括空目录和子目录

如：xcopy /T /E D:\filetest\FB\BK\bs\ D:\filetest\asdf
建立完空的目录结构树后，把需要修改的文件拷贝到目录树相应位置，就可以通过覆盖实现对原目录结构的更新。

//windows如何创建多级文件夹

md 11\22\33\44

//要想删掉整个目录

rd 11\22\33\44

//windows 快速复制文件(文件夹)路径

选中这个文件,   然后按住shift键不放  --> 鼠标右键单击该文件


//linux下查看进程树

pstree

//linux创建多级目录结构

mkdir -p 

//linux复制指定目录下的全部文件到另一个目录中，linux cp 文件夹

cp -r dir1 dir2 #//如果dir2目录不存在，则可以直接使用即可。

cp -r dir1/. dir2 #//如果dir2目录已存在，则需要使用

//如果这时使用cp -r dir1 dir2,则也会将dir1目录复制到dir2中，明显不符合要求。
//ps:dir1、dir2改成对应的目录路径即可。

如：cp -r /home/www/xxx/statics/. /home/www/statics

//如果存在文件需要先删除，否则会一个个文件提示你确认，使用cp -rf 也一样提示

rm -rf /home/www/statics/*  

//linux下cp整个文件夹的文件到另一个文件夹*/

cp -ri A/B/* A1/B1/ 

//若复制过程中询问是否覆盖，输入y按回车，若不想看到提示直接覆盖使用-rf
//另外若A A1不在同一目录下，最好填绝对路径，就是/xxx/xxx/A/B/* /xxx/A1/B1/

//linux下 bash语句 -- 只复制目录结构，不复制文件，替换src和dst即可

find src -type d | sed 's/src/mkdir -p dst/' | sh

或者

find /root/sh/01 -type d -print| sed 's;01;04;'| sed 's/^/mkdir /'|sh -x


//Linux复制指定目录下的文件夹结构

cd $APPL_TOP/inv
find . -type d -exec mkdir -p $APPL_TOP/cux/{} \;


#网段可用IP地址
#!/bin/sh
ip=1
while [ $ip != "254" ]; do
ping 10.86.87.$ip -c 2 |grep -q "ttl=" && echo "10.86.87.$ip yes" || echo "10.86.87.$ip no"
ip=`expr "$ip" "+" "1"`
done


