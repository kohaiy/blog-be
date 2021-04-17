## blog-be

### 构建步骤

#### 安装依赖

```shell
yarn install
```

#### 开发调试

```shell
yarn dev
```

#### 打包部署

```shell
yarn build
```

终端运行：

```shell
yarn start
```

后台运行（使用`pm2`）：

```shell
yarn pm2
```

#### 开发相关

本项目基于 `yapi` 生成 api 接口结构，使用 `@kohapi/generator` 进行生成，使用步骤如下：

初始化配置文件：

```shell
yarn init-api-generator
```

配置可参考以下内容：

```js
const path = require('path');

module.exports = {
    type: 'yapi',
    yapi: {
        baseUrl: '<>',
        token: '<>',
    },
    output: path.join(__dirname, 'src'),
};
```

根据配置文件自动生成：

```shell
yarn generate-api
```