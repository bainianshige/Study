/*
art-template 不仅可以在浏览器使用，也可以在node中使用


安装：
  npm install art-template
  该命令在哪执行就会把包下载到哪里。默认下载到 node_modules 目录中
  node_modules 不要改，也不支持改


nodejs 中使用 art-template 模板引擎
模板引擎最早诞生于服务端领域，后来才发展到了前端


1.安装 npm install art-template
2.在需要使用的文件模块中加载 art-template
  只需要使用 require 方法加载就可以了
  参数中的 art-template 就是你下载的包名称(install的名字什么，则你 require 的参数就是什么)
3.查文档，使用模板引擎的API
*/


let template = require('art-template')
let fs = require('fs')


// template('script 标签 id', {对象})

// 将模板源代码编译成函数
// template.compile(source, options);

// 将模板源代码编译成函数并立刻执行
// template.render('模板字符串', 替换对象)

// let tplStr = 
// `<!DOCTYPE html>
// <html lang="en">
// <head>
// <meta charset="UTF-8" />
// <title>Document</title>
// </head>
// <body>
//   <a> 名字： {{ name }} </a>
//   <a> 年龄： {{ age }} </a>
//   <a> 地址： {{ province }} </a>
//   <a> 爱好： {{ each hobbies }} {{ $value }} {{ /each }} </a>
// </body>
// </html>`

fs.readFile('./resource/art-template.html', (err, data) => {
  if (err) {
    return console.log('读取文件失败')
  }
  // 读取到的 data 是二进制数据,模板引擎的 render 方法需要接收的是字符串,需要把 data 二进制数据转为字符串
  let ret = template.render(data.toString(), {
    name: 'Jack',
    age: 18,
    province: '地址',
    hobbies: ['电脑', '动漫', '未知'],
    title: '个人信息'
  })

  console.log(ret)
})



