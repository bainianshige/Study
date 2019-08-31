# Vue

## webpack

### `nrm`的安装使用

作用： 提供了一些常用的 NPM 包镜像地址

+ 运行 `npm install nrm -g` 全局安装 `nrm` 包
+ 使用 `nrm ls` 查看当前所有的可用的镜像源地址以及当前所使用的镜像源地址
+ 使用 `nrm use npm` 或 `nrm use taobao`  切换不同的镜像源地址

> 注意： `nrm` 只收单纯的提供了几个常用的 下载包的 URL地址，并能够让在几个地址中很方便的进行切换
>
> ​			但是在装包的时候用的还是 `npm`

### webpack安装的两种方式

+ 运行`npm i webpack -g`全局安装webpack，这样就能在全局使用webpack的命令
+ 在项目根目录中运行`npm i webpack --save-dev`安装到项目依赖中

