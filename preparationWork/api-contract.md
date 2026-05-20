# Kairos API 契约（MVP）

- **Base URL**：`https://api.kairos.example.com`（开发：`http://localhost:8080`）
- **版本前缀**：`/api/v1`
- **认证**：`Authorization: Bearer {accessToken}`
- **统一响应**：

```json
{
  "code": 0,
  "message": "ok",
  "data": { }
}
```

错误码：`code != 0`，HTTP 状态码与业务码对应。

| code | HTTP | 说明 |
|------|------|------|
| 0 | 200 | 成功 |
| 40001 | 400 | 参数错误 |
| 40101 | 401 | 未登录或 token 无效 |
| 40301 | 403 | 无权限 |
| 40401 | 404 | 资源不存在 |
| 42901 | 429 | 请求过于频繁 |
| 50101 | 501 | 功能未实现（如微信登录） |
| 50001 | 500 | 服务器错误 |

---

## 1. 认证 Auth

### POST /api/v1/auth/otp/send

发送验证码。

**Request**

```json
{
  "channel": "email",
  "target": "user@example.com"
}
```

`channel`: `email` | `phone`

**Response**

```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "expiresIn": 300,
    "cooldown": 60
  }
}
```

---

### POST /api/v1/auth/otp/verify

验证码登录（自动注册）。

**Request**

```json
{
  "channel": "email",
  "target": "user@example.com",
  "code": "123456"
}
```

**Response**

```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "accessToken": "eyJ...",
    "refreshToken": "eyJ...",
    "expiresIn": 900,
    "user": {
      "id": "1",
      "nickname": null,
      "avatarUrl": null,
      "profileStatus": "incomplete",
      "isVerified": false
    }
  }
}
```

---

### POST /api/v1/auth/oauth/apple

Apple 登录。

**Request**

```json
{
  "identityToken": "eyJ...",
  "authorizationCode": "c123...",
  "user": {
    "email": "privaterelay@icloud.com",
    "fullName": { "givenName": "张", "familyName": "同学" }
  }
}
```

**Response**：同 `otp/verify`

---

### POST /api/v1/auth/oauth/{provider}

通用 OAuth（预留）。

| provider | MVP 行为 |
|----------|----------|
| `wechat` | `501`，`code: 50101`，`message: "WeChat login is not available yet"` |
| `google` | 同上 |

**Request（微信预留）**

```json
{
  "code": "wx_auth_code",
  "state": "optional"
}
```

---

### POST /api/v1/auth/refresh

**Request**

```json
{ "refreshToken": "eyJ..." }
```

**Response**

```json
{
  "code": 0,
  "data": {
    "accessToken": "eyJ...",
    "expiresIn": 900
  }
}
```

---

### POST /api/v1/auth/logout

需 Bearer token。

**Request**

```json
{ "refreshToken": "eyJ..." }
```

---

### GET /api/v1/auth/bindings

返回当前用户已绑定的登录方式。

```json
{
  "code": 0,
  "data": {
    "bindings": [
      { "provider": "email", "maskedTarget": "u***@example.com", "createdAt": "2026-05-01T10:00:00Z" },
      { "provider": "apple", "maskedTarget": "Apple ID", "createdAt": "2026-05-01T10:05:00Z" }
    ]
  }
}
```

---

## 2. 用户 Users

### GET /api/v1/users/me

当前用户完整资料。

### PUT /api/v1/users/me

**Request**

```json
{
  "nickname": "张同学",
  "avatarUrl": "https://...",
  "bio": "在东京的留学生活",
  "university": "东京大学",
  "city": "tokyo",
  "userType": "graduate_student"
}
```

设置 `profileStatus` 为 `complete` 当必填字段齐全。

### GET /api/v1/users/{id}

公开资料（他人主页）。

### GET /api/v1/users/me/posts

Query: `page=1&size=20`

### GET /api/v1/users/me/favorites

Query: `page=1&size=20`

---

## 3. 帖子 Posts

### GET /api/v1/posts

Feed 列表。

| Query | 说明 |
|-------|------|
| channel | `follow` \| `discover` \| `local` |
| city | local 频道必填，如 `tokyo` |
| tag | 可选标签筛选 |
| page | 默认 1 |
| size | 默认 20，最大 50 |

**Response data**

```json
{
  "items": [
    {
      "id": "1",
      "domain": "career",
      "category": "interview",
      "city": "tokyo",
      "title": "字节跳动后端实习面经",
      "summary": "...",
      "author": {
        "id": "2",
        "name": "匿名用户",
        "avatar": "https://...",
        "university": "东京大学",
        "verified": true
      },
      "timestamp": "2026-05-10T08:00:00Z",
      "likes": 128,
      "comments": 32,
      "bookmarks": 45,
      "views": 1200,
      "tags": ["面经", "互联网"],
      "featured": false,
      "images": ["https://..."]
    }
  ],
  "page": 1,
  "size": 20,
  "total": 100,
  "hasMore": true
}
```

### GET /api/v1/posts/{id}

帖子详情（含 `content`）。

### POST /api/v1/posts

**Request**

```json
{
  "domain": "career",
  "category": "interview",
  "city": "tokyo",
  "title": "标题",
  "content": "正文",
  "tags": ["面经"],
  "imageUrls": ["https://..."]
}
```

### PUT /api/v1/posts/{id}

编辑自己的帖子。

### DELETE /api/v1/posts/{id}

软删除。

### GET /api/v1/posts/search

Query: `q=关键词&page=1&size=20`

### POST /api/v1/posts/{id}/like

点赞。

### DELETE /api/v1/posts/{id}/like

取消点赞。

### GET /api/v1/posts/{id}/comments

Query: `page=1&size=20`

### POST /api/v1/posts/{id}/comments

**Request**

```json
{ "content": "评论内容" }
```

---

## 4. 草稿 Drafts

### GET /api/v1/drafts

### POST /api/v1/drafts

```json
{
  "category": "experience",
  "title": "草稿标题",
  "content": "正文",
  "tags": [],
  "imageUrls": []
}
```

### PUT /api/v1/drafts/{id}

### DELETE /api/v1/drafts/{id}

---

## 5. 上传（可选 MVP）

### POST /api/v1/uploads/presign

**Request**

```json
{ "filename": "photo.jpg", "contentType": "image/jpeg" }
```

**Response**

```json
{
  "code": 0,
  "data": {
    "uploadUrl": "https://oss.../presigned",
    "publicUrl": "https://cdn.../photo.jpg"
  }
}
```

---

## 6. 开发环境约定

- OTP 验证码：配置 `kairos.auth.otp.dev-code=123456` 时始终接受
- CORS：允许 `http://localhost:*` 与 RN 调试地址
