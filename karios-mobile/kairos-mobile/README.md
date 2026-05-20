# Kairos Mobile (iOS)

React Native + TypeScript 客户端，对应 Figma 原型 MVP 功能。

## 功能

- 邮箱 / 手机验证码登录（开发验证码 `123456`）
- Sign in with Apple（iOS 真机）
- 微信登录入口预留（灰显）
- 社区 Feed（关注 / 发现 / 同城）
- 帖子详情、评论、点赞
- 搜索、标签页、用户主页
- 发布帖子、草稿
- 个人中心、编辑资料、设置、退出登录

## 开发

```bash
cd karios-mobile/kairos-mobile
npm install
cd ios && pod install && cd ..
npm start
npm run ios
```

## 配置

- `src/config.ts`：`API_BASE_URL`、`USE_MOCK_API`（默认 `true`，无需后端即可运行）
- 对接后端时设 `USE_MOCK_API = false`，并启动 `kairos-service`

## 目录

```
src/
├── api/           # 请求与 Mock 服务
├── components/    # 通用 UI
├── features/      # 按模块划分的页面
├── navigation/    # 路由
├── store/         # Zustand 状态
├── theme/         # 设计 Token
└── data/          # Mock 数据
```
