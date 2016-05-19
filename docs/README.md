# windows下安装jekyll的过程

> 教程地址：http://jekyll.bootcss.com/

## 1.装ruby、pyhon、easy_install


## 2.安装 Pygments

easy_install Pygments
这个是Jekyll里面默认的语法高亮的插件
它需要安装 Python 并在网站的配置文件 _config.yml 里将 highlighter 的值设置为 pygments

## 3.安装Jekyll

gem install jekyll

## 4.新建一个应用存放目录

进入目录，使用jekyll new myblog命令新建一个名字叫‘myblog’的站点

## 5.启动站点

进入站点的目录，运行jekyll serve
站点成功启动，默认端口4000

打开浏览器本地访问下看看吧
正常访问，进入默认页面
