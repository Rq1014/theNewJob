# MVP 屏幕验收清单

对照 Figma 原型路径：`Figma basics/src/app/components/`

## 认证流程

| 状态 | RN Screen | 原型参考 | 验收项 |
|------|-----------|----------|--------|
| [ ] | AuthWelcomeScreen | 新建 | 展示邮箱/手机、Apple 登录；微信入口灰显或隐藏 |
| [ ] | OtpLoginScreen | 新建 | 切换邮箱/手机；发送验证码；60s 倒计时；登录成功 |
| [ ] | ProfileSetupScreen | profile/ProfileCompletePage.tsx | 昵称、学校、城市、身份；提交后进入主页 |

## 主导航（3 Tab + 发布）

| 状态 | RN Screen | 原型参考 | 验收项 |
|------|-----------|----------|--------|
| [ ] | MainTabs | BottomNav.tsx | 社区、发布（中置按钮）、我的；无榜单/消息 Tab |
| [ ] | CommunityHomeScreen | JapanCommunityTab.tsx | 关注/发现/同城切换；帖子列表；下拉刷新 |
| [ ] | PostDetailScreen | community/PostDetailPage.tsx | 正文、作者、点赞、评论列表、发表评论 |
| [ ] | SearchScreen | community/SearchPage.tsx | 关键词搜索；结果跳转详情 |
| [ ] | UserProfileScreen | community/UserProfilePage.tsx | 他人资料与帖子列表 |
| [ ] | TagFeedScreen | community/TagPage.tsx | 标签下帖子聚合 |

## 发布

| 状态 | RN Screen | 原型参考 | 验收项 |
|------|-----------|----------|--------|
| [ ] | PublishComposeScreen | PublishNavigator.tsx（compose） | 选帖子类型；标题正文；保存草稿；发布 |
| [ ] | DraftsScreen | profile/DraftsPage.tsx | 草稿列表；编辑；删除 |

## 个人中心

| 状态 | RN Screen | 原型参考 | 验收项 |
|------|-----------|----------|--------|
| [ ] | ProfileHomeScreen | profile/ProfileHomePage.tsx | 资料卡；帖子/收藏 Tab |
| [ ] | EditProfileScreen | profile/EditProfilePage.tsx | 修改资料并保存 |
| [ ] | SettingsScreen | profile/SettingsPage.tsx | 退出登录；清除 token |

## 非 MVP（勿纳入本期验收）

- NewRankingTab / InstitutionDetail / ReviewSubmitFlow
- MessagesNavigator
- TreeholeNavigator / MatchNavigator
- NewKakomonPage / UniversityKakomonPage
- CareerCommunityPage / LifeCommunityPage（完整版）

## 联调检查

| 状态 | 项 |
|------|-----|
| [ ] | 邮箱 OTP 登录全流程 |
| [ ] | 手机 OTP 登录全流程 |
| [ ] | Apple 登录（真机） |
| [ ] | Token 刷新与 401 自动跳转登录 |
| [ ] | Feed 分页加载 |
| [ ] | 发帖 / 点赞 / 评论 |
| [ ] | iOS 模拟器 `npm run ios` 可启动 |
