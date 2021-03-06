# ProjectAgora

ProjectAgora计划用于为先锋教育 - 安格学院提供电子化项目式学习系统和教务系统功能，并计划以开源的形式组织开发（尚未确定使用的开源协议）和开放使用。


## Client部分

- 必需环境： `Node`
- 框架组成： `React` + `TypeScript` + `Dva` + `React-UWP`
    - React提供模块工程化框架
    - TypeScript实现强类型
    - Dva实现全局异步数据流
    - React-UWP提供UWP Fluent风格的组件

### 环境配置
- 配置环境: 
    - `cd client` 
    - `npm install -g typescript` 全局安装typescript
    - `npm install --save-dev @types/react @types/react-dom ts-loader tslint` 安装Typescript的各类工具包
    - `npm install`
- 启动环境： `npm start`


## Server部分

- 必需环境：`Anaconda 3`
- 框架组成：`Swagger 2.0` + `Flask` + `mypy` + `Gunicorn`
    - Swagger提供API描述yaml文件，用于swagger-py-codegen生成基础代码
    - Flask作为Web框架
    - mypy提供强类型注释
    - Gunicorn提供WSGI接口

- 建议配置：
    - `Anaconda Scripts`: 适用于VS Code (Windows版) + PowerShell的Anaconda虚拟环境切换脚本
        - 将文件夹中文件放入本机的`Anaconda\Scripts`目录中
        - 需要在Powershell（管理员）中设定`Set-ExecutionPolicy -ExecutionPolicy RemoteSigned`

### 环境配置

- 创建环境：`conda create -n ProjectAgora python=3.6`
- 启动环境：`activate ProjectAgora`
- 配置环境：`pip install -r .\server\requirements.txt`

## 运维部分（开发中）

- 必需环境： `Docker`, `nginx`（或其他Web服务器）


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
