# Kairos iOS App 开发计划（MVP）

## 1. 产品定位与范围

**产品**：面向在日/赴日留学生的社区 App（原型代号 Kairos），核心场景为留学生活信息分享、同城/同校内容发现。

**MVP 范围**（约 6–8 周）：

| 模块 | 包含 | 暂不包含（后续迭代） |
|------|------|----------------------|
| 社区 | 首页 Feed（关注/发现/同城）、帖子详情、搜索、标签/用户主页入口 | 树洞、匹配、过去问、职业/生活子频道深度页 |
| 发布 | 中心发布按钮、多类型帖子草稿与发布 | 树洞发帖、机构评价提交流程 |
| 我的 | 资料展示、编辑资料、设置、我的帖子/收藏/草稿列表 | 机构评价列表、树洞、过去问、消息中心 |
| 认证 | 邮箱/手机 + Apple + 第三方 OAuth 预留（微信等） | 榜单 Tab、实时 IM |

**设计来源**：`Figma basics/src/app` — Vite + React Web 原型，需迁移为 React Native。

---

## 2. 架构总览

```
theNewJob/
├── Figma basics/          # 设计原型（只读参考）
├── kairos-service/        # Spring Boot 后端
├── karios-mobile/
│   └── kairos-mobile/     # React Native iOS 客户端
└── preparationWork/       # 计划与契约文档
```

- **前端**：React Native + TypeScript + React Navigation
- **后端**：Spring Boot 4 + Java 17 + MyBatis + MySQL + Redis
- **认证**：邮箱/手机 OTP、Sign in with Apple、OAuth 预留（微信 stub）

---

## 3. 认证方案

| 方式 | MVP | 说明 |
|------|-----|------|
| 邮箱 + 验证码 | 是 | Redis 存储，5 分钟有效 |
| 手机号 + 验证码 | 是 | `SmsProvider` 抽象 |
| Apple 登录 | 是 | 校验 `identityToken` |
| 微信等第三方 | 预留 | 表结构 + `501` stub 接口 |

详见 [api-contract.md](./api-contract.md) 与 [database-schema.md](./database-schema.md)。

---

## 4. Figma → RN 屏幕映射（MVP）

| RN Screen | 原型组件 |
|-----------|----------|
| AuthWelcomeScreen | 新建 |
| OtpLoginScreen | 新建 |
| ProfileSetupScreen | ProfileCompletePage |
| CommunityHomeScreen | JapanCommunityTab |
| PostDetailScreen | PostDetailPage |
| SearchScreen | SearchPage |
| UserProfileScreen | UserProfilePage |
| TagFeedScreen | TagPage |
| PublishComposeScreen | PublishNavigator（精简） |
| DraftsScreen | DraftsPage |
| ProfileHomeScreen | ProfileHomePage |
| EditProfileScreen | EditProfilePage |
| SettingsScreen | SettingsPage |

验收清单见 [screen-checklist.md](./screen-checklist.md)。

---

## 5. 设计 Token

| Token | 值 |
|-------|-----|
| primary | `#3B82F6` |
| primaryDark | `#2563EB` |
| background | `#F8FAFC` |
| card | `#FFFFFF` |
| textPrimary | `#0F172A` |
| textSecondary | `#64748B` |
| border | `#E2E8F0` |
| radiusCard | 16 |
| radiusButton | 12 |

---

## 6. 实施阶段

| Phase | 周次 | 内容 |
|-------|------|------|
| 0 | 1 | 文档、RN 工程、DB 迁移 |
| 1 | 2 | Auth 前后端 |
| 2 | 3–4 | 社区 Feed |
| 3 | 5 | 发布与草稿 |
| 4 | 6 | 个人中心 |
| 5 | 7–8 | 打磨、TestFlight |

---

## 7. 后续迭代

1. 消息 — MessagesNavigator
2. 榜单/机构 — NewRankingTab、ReviewSubmitFlow
3. 树洞 — TreeholeNavigator
4. 匹配 — MatchNavigator
5. 过去问 — Kakomon 模块
6. 微信登录 — 启用 WeChatOAuthProvider

---

## 8. 风险与约束

- Web 原型不可直接复用，需按 Screen 重写 UI
- 开发环境 OTP 固定为 `123456`（可配置）
- Apple 审核需同时提供邮箱/手机登录
- 微信 MVP 仅预留接口

---

## 9. 相关文档

- [api-contract.md](./api-contract.md) — REST API 契约
- [database-schema.md](./database-schema.md) — 数据库表结构
- [screen-checklist.md](./screen-checklist.md) — 屏幕验收清单
