# ProjectAgora

## Server部分

必需环境：`Anaconda 3`

建议配置：
    - `Anaconda Scripts`: 适用于VS Code (Windows版) + PowerShell的Anaconda虚拟环境切换脚本
        - 将文件夹中文件放入本机的`Anaconda\Scripts`目录中

### 环境配置

创建环境：`conda create -n ProjectAgora python=3.6`
启动环境：`activate ProjectAgora`
配置环境：`pip install -r .\server\requirements.txt`


## Client部分

必需环境： `Node`
框架组成： `React` + `TypeScript` + `Dva` + `React-UWP`
    - React提供模块工程化框架
    - TypeScript实现强类型
    - Dva实现全局异步数据流
    - React-UWP提供UWP Fluent风格的组件

### 环境配置
配置环境: 
    - `cd client` 
    - `npm install -g typescript` 全局安装typescript
    - `npm install --save-dev @types/react @types/react-dom ts-loader ts-lint` 安装Typescript的各类工具包
    - `npm install`
启动环境： `npm start`

## 第一期模块计划
- 用户模块
    - 登录
    - 录入新生
- 项目式学习模块
    - 项目列表
    - 项目详情
    - 自由项目
    - 引导项目
        - 引导模块设计