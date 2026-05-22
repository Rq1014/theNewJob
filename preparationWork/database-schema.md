# Kairos 数据库设计（MVP）

数据库：MySQL 8.0+，字符集 `utf8mb4`，排序规则 `utf8mb4_unicode_ci`。

迁移脚本位置：`preparationWork/sql/kairos_init_schema.sql`（与 [登录注册后端TRD.md](./登录注册后端TRD.md) §16 一致）

---

## 1. 枚举

### auth_provider

`email` | `phone` | `apple` | `wechat` | `google`

### user_status

`active` | `suspended` | `deleted`

### profile_status

`incomplete` | `complete`

### post_channel（Feed 查询）

`follow` | `discover` | `local`

### post_category

`experience` | `question` | `rental` | `job` | `secondhand` | `course` | `visa` | `life` |
`interview` | `offer` | `es` | `career-qa` | `company-review` | `housing` | `medical` | `food` |
`finance` | `admin` | `moving` | `part-time` | `second-hand` | `guide`

### content_domain

`career` | `life`

### draft_status

`draft` | `published` | `discarded`

---

## 2. 表结构

### users

| 列 | 类型 | 说明 |
|----|------|------|
| id | BIGINT PK AUTO | 用户 ID |
| nickname | VARCHAR(64) | 昵称 |
| avatar_url | VARCHAR(512) | 头像 URL |
| bio | VARCHAR(500) | 简介 |
| university | VARCHAR(128) | 学校 |
| city | VARCHAR(32) | 城市 code（tokyo 等） |
| user_type | VARCHAR(32) | 身份：在读/已毕业等 |
| profile_status | VARCHAR(16) | incomplete / complete |
| status | VARCHAR(16) | active / suspended / deleted |
| is_verified | TINYINT(1) | 认证用户 |
| primary_credential | VARCHAR(16) NULL | 首次注册渠道 phone / email / apple |
| last_login_at | DATETIME NULL | 最近登录时间 |
| created_at | DATETIME | |
| updated_at | DATETIME | |

索引：`idx_users_status (status)`, `idx_users_city (city)`, `idx_users_profile_status (profile_status)`

---

### user_auth_bindings

| 列 | 类型 | 说明 |
|----|------|------|
| id | BIGINT PK AUTO | |
| user_id | BIGINT FK → users.id | |
| provider | VARCHAR(32) | email / phone / apple / wechat |
| provider_user_id | VARCHAR(255) | 邮箱、手机号、Apple sub、微信 openid |
| credential_meta | JSON | 扩展元数据 |
| created_at | DATETIME | |
| updated_at | DATETIME | |

唯一索引：`uk_provider_uid (provider, provider_user_id)`  
索引：`idx_bindings_user (user_id)`

---

### user_terms_consents

| 列 | 类型 | 说明 |
|----|------|------|
| id | BIGINT PK AUTO | |
| user_id | BIGINT FK → users.id | |
| terms_version | VARCHAR(32) | 用户协议版本 |
| privacy_version | VARCHAR(32) | 隐私政策版本 |
| agreed_at | DATETIME | |
| client_ip | VARCHAR(64) NULL | |
| user_agent | VARCHAR(256) NULL | |
| device_id | VARCHAR(64) NULL | 客户端设备 ID |

索引：`idx_consents_user (user_id)`

---

### user_sessions

| 列 | 类型 | 说明 |
|----|------|------|
| id | BIGINT PK AUTO | sessionId，对应 JWT `sid` |
| user_id | BIGINT FK → users.id | |
| refresh_jti | VARCHAR(64) | Refresh Token 的 jti |
| device_id | VARCHAR(64) NULL | |
| device_name | VARCHAR(128) NULL | |
| platform | VARCHAR(16) NULL | ios / android |
| ip | VARCHAR(64) NULL | |
| last_active_at | DATETIME | |
| revoked_at | DATETIME NULL | 登出时间 |
| created_at | DATETIME | |

唯一索引：`uk_sessions_refresh_jti (refresh_jti)`  
索引：`idx_sessions_user (user_id)`

---

### posts

| 列 | 类型 | 说明 |
|----|------|------|
| id | BIGINT PK AUTO | |
| author_id | BIGINT FK → users.id | |
| domain | VARCHAR(16) | career / life |
| category | VARCHAR(32) | 帖子类型 |
| city | VARCHAR(32) NULL | 同城 Feed |
| title | VARCHAR(200) | |
| summary | VARCHAR(500) | 列表摘要 |
| content | TEXT | 正文 |
| tags | JSON | 标签数组 |
| company_name | VARCHAR(128) NULL | |
| position | VARCHAR(128) NULL | |
| like_count | INT DEFAULT 0 | |
| comment_count | INT DEFAULT 0 | |
| bookmark_count | INT DEFAULT 0 | |
| view_count | INT DEFAULT 0 | |
| featured | TINYINT(1) DEFAULT 0 | |
| status | VARCHAR(16) | published / hidden / deleted |
| created_at | DATETIME | |
| updated_at | DATETIME | |

索引：`idx_posts_author (author_id)`, `idx_posts_city_created (city, created_at DESC)`, `idx_posts_created (created_at DESC)`

---

### post_images

| 列 | 类型 | 说明 |
|----|------|------|
| id | BIGINT PK AUTO | |
| post_id | BIGINT FK → posts.id | |
| url | VARCHAR(512) | |
| sort_order | INT | |

---

### post_likes

| 列 | 类型 | 说明 |
|----|------|------|
| id | BIGINT PK AUTO | |
| post_id | BIGINT | |
| user_id | BIGINT | |
| created_at | DATETIME | |

唯一索引：`uk_post_like (post_id, user_id)`

---

### post_comments

| 列 | 类型 | 说明 |
|----|------|------|
| id | BIGINT PK AUTO | |
| post_id | BIGINT | |
| author_id | BIGINT | |
| content | TEXT | |
| like_count | INT DEFAULT 0 | |
| status | VARCHAR(16) | visible / deleted |
| created_at | DATETIME | |
| updated_at | DATETIME | |

索引：`idx_comments_post (post_id, created_at)`

---

### post_favorites

| 列 | 类型 | 说明 |
|----|------|------|
| id | BIGINT PK AUTO | |
| post_id | BIGINT | |
| user_id | BIGINT | |
| created_at | DATETIME | |

唯一索引：`uk_post_favorite (post_id, user_id)`

---

### user_follows

| 列 | 类型 | 说明 |
|----|------|------|
| id | BIGINT PK AUTO | |
| follower_id | BIGINT | 关注者 |
| followee_id | BIGINT | 被关注者 |
| created_at | DATETIME | |

唯一索引：`uk_follow (follower_id, followee_id)`

---

### drafts

| 列 | 类型 | 说明 |
|----|------|------|
| id | BIGINT PK AUTO | |
| user_id | BIGINT | |
| category | VARCHAR(32) | |
| title | VARCHAR(200) NULL | |
| content | TEXT | |
| tags | JSON NULL | |
| image_urls | JSON NULL | |
| status | VARCHAR(16) | draft |
| created_at | DATETIME | |
| updated_at | DATETIME | |

索引：`idx_drafts_user (user_id, updated_at DESC)`

---

## 3. Redis 键设计

| Key | TTL | 说明 |
|-----|-----|------|
| `otp:{channel}:{target}` | 300s | 验证码 |
| `otp:rate:{channel}:{target}` | 60s | 发送频率限制 |
| `otp:daily:{channel}:{target}` | 24h | 日发送计数 |
| `rate:ip:{ip}` | 60s | IP 限流 |
| `rate:device:{deviceId}` | 60s | 设备限流 |
| `jwt:blacklist:{jti}` | 至 token 过期 | 登出黑名单 |
| `refresh:{userId}:{jti}` | 7d | refresh token |

---

## 4. ER 关系（简图）

```
users 1──* user_auth_bindings
users 1──* user_terms_consents
users 1──* user_sessions
users 1──* posts
users 1──* drafts
posts 1──* post_images
posts 1──* post_comments
posts *──* post_likes (via user)
users *──* user_follows (self-ref)
```
