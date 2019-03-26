## linux下mysql数据库导入导出命令

首先linux 下查看mysql相关目录

root@ubuntu14:~# whereis mysql  
mysql:   
/usr/bin/mysql----   mysql的运行路径   
/etc/mysql   
/usr/lib/mysql-----   mysql的安装路径  
/usr/bin/X11/mysql   
/usr/share/mysql  
/usr/share/man/man1/mysql.1.gz  

此外还有一个：

var/lib/mysql --------mysql数据库data文件的存放路径 

确定了运行路径，执行导入、导出mysql数据库命令  

一、导出数据库用mysqldump命令  
（注意:先cd到mysql的运行路径下，再执行一下命令）：  

1. 导出数据和表结构：  
mysqldump -u用户名 -p密码 数据库名 > 数据库名.sql   
mysqldump -uroot -p dbname > dbname .sql    
敲回车后会提示输入密码

2. 只导出表结构  
mysqldump -u用户名 -p密码 -d 数据库名 > 数据库名.sql    
mysqldump -uroot -p -d dbname > dbname .sql   

二、导入数据库  
1. 首先建空数据库  
mysql>create database dbname ;  

2. 导入数据库
方法一：   
（1）选择数据库  
mysql>use dbname ;  
（2）设置数据库编码   
mysql>set names utf8;   
（3）导入数据（注意sql文件的路径）    
mysql>source /home/xxxx/dbname .sql; 

方法二：  
mysql -u用户名 -p密码 数据库名 < 数据库名.sql

