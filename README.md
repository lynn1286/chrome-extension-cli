# Chrome Extension CLI

一个用于快速创建基于 Manifest V3 的 Chrome 扩展项目的命令行工具。

## 功能特点

- 基于 TypeScript 开发
- 支持交互式项目配置
- 提供完整的项目模板
- 支持多种包管理器 (npm, yarn, pnpm)
- 友好的命令行界面

## 安装

### 全局安装

```bash
npm install -g chrome-extension-cli
# 或
yarn global add chrome-extension-cli
# 或
pnpm add -g chrome-extension-cli
```

### 使用 npx 直接运行

```bash
npx chrome-extension-cli create my-extension
```

## 使用方法

### 创建新项目

```bash
# 使用交互式命令创建项目
chrome-cli create my-extension

# 跳过依赖安装
chrome-cli create my-extension --skip-install

# 指定包管理器
chrome-cli create my-extension --package-manager yarn
```

## 模板源码

此项目使用 [lynn1286/chrome-extension-mv3](https://github.com/lynn1286/chrome-extension-mv3) 作为基础模板。

## 开发指南

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 开发模式

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

### 构建

```bash
npm run build
# 或
yarn build
# 或
pnpm build
```

## 许可证

MIT 