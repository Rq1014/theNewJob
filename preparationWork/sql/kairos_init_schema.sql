-- ============================================================
-- Kairos 数据库初始化
-- 登录注册域：users, user_auth_bindings, user_terms_consents, user_sessions
-- MVP 业务域：posts, post_images, post_likes, post_comments, post_favorites,
--             user_follows, drafts
-- 文档：preparationWork/登录注册后端TRD.md §16
-- ============================================================

-- 注意：MySQL 的 CREATE DATABASE 不支持 COMMENT，库说明见本文件头部注释
CREATE DATABASE IF NOT EXISTS kairos
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE kairos;

-- ------------------------------------------------------------
-- 1. 用户主表
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id                 BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户主键 ID',
  nickname           VARCHAR(64)     NULL COMMENT '昵称，资料未完善时可为空',
  avatar_url         VARCHAR(512)    NULL COMMENT '头像 URL',
  bio                VARCHAR(500)    NULL COMMENT '个人简介',
  university         VARCHAR(128)    NULL COMMENT '学校名称',
  city               VARCHAR(32)     NULL COMMENT '常驻城市编码，如 tokyo、osaka',
  user_type          VARCHAR(32)     NULL COMMENT '用户身份类型，如 graduate_student',
  profile_status     VARCHAR(16)     NOT NULL DEFAULT 'incomplete' COMMENT '资料状态：incomplete 未完善 / complete 已完善',
  primary_credential VARCHAR(16)     NULL COMMENT '首次注册主凭证类型：phone / email / apple',
  status             VARCHAR(16)     NOT NULL DEFAULT 'active' COMMENT '账号状态：active 正常 / suspended 封禁 / deleted 注销',
  is_verified        TINYINT(1)      NOT NULL DEFAULT 0 COMMENT '是否平台认证用户：0 否 / 1 是',
  last_login_at      DATETIME(3)     NULL COMMENT '最近一次登录时间',
  created_at         DATETIME(3)     NOT NULL DEFAULT CURRENT_TIMESTAMP(3) COMMENT '创建时间',
  updated_at         DATETIME(3)     NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3) COMMENT '更新时间',
  PRIMARY KEY (id),
  KEY idx_users_status (status),
  KEY idx_users_city (city),
  KEY idx_users_profile_status (profile_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户主表';

-- ------------------------------------------------------------
-- 2. 登录凭证绑定（Passport）
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS user_auth_bindings (
  id               BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '绑定记录主键 ID',
  user_id          BIGINT UNSIGNED NOT NULL COMMENT '关联用户 ID，外键 users.id',
  provider         VARCHAR(32)     NOT NULL COMMENT '登录提供方：email / phone / apple / wechat / google',
  provider_user_id VARCHAR(255)    NOT NULL COMMENT '提供方侧唯一标识：邮箱、E.164 手机号、Apple sub、微信 openid 等',
  credential_meta  JSON            NULL COMMENT '凭证扩展元数据 JSON，如 Apple 邮箱掩码信息',
  created_at       DATETIME(3)     NOT NULL DEFAULT CURRENT_TIMESTAMP(3) COMMENT '绑定创建时间',
  updated_at       DATETIME(3)     NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3) COMMENT '绑定更新时间',
  PRIMARY KEY (id),
  UNIQUE KEY uk_provider_uid (provider, provider_user_id),
  KEY idx_bindings_user (user_id),
  CONSTRAINT fk_bindings_user FOREIGN KEY (user_id) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户登录凭证绑定表';

-- ------------------------------------------------------------
-- 3. 用户协议同意记录
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS user_terms_consents (
  id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '同意记录主键 ID',
  user_id         BIGINT UNSIGNED NOT NULL COMMENT '关联用户 ID，外键 users.id',
  terms_version   VARCHAR(32)     NOT NULL COMMENT '已同意的用户协议版本号',
  privacy_version VARCHAR(32)     NOT NULL COMMENT '已同意的隐私政策版本号',
  agreed_at       DATETIME(3)     NOT NULL DEFAULT CURRENT_TIMESTAMP(3) COMMENT '用户同意协议时间',
  client_ip       VARCHAR(64)     NULL COMMENT '同意时客户端 IP',
  user_agent      VARCHAR(256)    NULL COMMENT '同意时客户端 User-Agent',
  device_id       VARCHAR(64)     NULL COMMENT '同意时客户端设备 ID，对应 X-Device-Id',
  PRIMARY KEY (id),
  KEY idx_consents_user (user_id),
  KEY idx_consents_user_version (user_id, terms_version, privacy_version),
  CONSTRAINT fk_consents_user FOREIGN KEY (user_id) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户协议与隐私政策同意记录表';

-- ------------------------------------------------------------
-- 4. 登录会话（Token / 多设备）
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS user_sessions (
  id             BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '会话主键 ID，写入 JWT Claim sid',
  user_id        BIGINT UNSIGNED NOT NULL COMMENT '关联用户 ID，外键 users.id',
  refresh_jti    VARCHAR(64)     NOT NULL COMMENT 'Refresh Token 唯一标识 jti，用于吊销与校验',
  device_id      VARCHAR(64)     NULL COMMENT '登录设备 ID',
  device_name    VARCHAR(128)    NULL COMMENT '登录设备名称，如 iPhone 16',
  platform       VARCHAR(16)     NULL COMMENT '客户端平台：ios / android',
  ip             VARCHAR(64)     NULL COMMENT '登录时 IP 地址',
  last_active_at DATETIME(3)     NOT NULL DEFAULT CURRENT_TIMESTAMP(3) COMMENT '会话最后活跃时间',
  revoked_at     DATETIME(3)     NULL COMMENT '会话吊销时间，登出或踢下线时写入',
  created_at     DATETIME(3)     NOT NULL DEFAULT CURRENT_TIMESTAMP(3) COMMENT '会话创建时间',
  PRIMARY KEY (id),
  UNIQUE KEY uk_sessions_refresh_jti (refresh_jti),
  KEY idx_sessions_user (user_id),
  KEY idx_sessions_user_active (user_id, revoked_at),
  CONSTRAINT fk_sessions_user FOREIGN KEY (user_id) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户登录会话表';

-- ------------------------------------------------------------
-- 5. 帖子（MVP 社区，依赖 users）
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS posts (
  id             BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '帖子主键 ID',
  author_id      BIGINT UNSIGNED NOT NULL COMMENT '作者用户 ID，外键 users.id',
  domain         VARCHAR(16)     NOT NULL COMMENT '内容域：career 职场 / life 生活',
  category       VARCHAR(32)     NOT NULL COMMENT '帖子分类，如 interview、rental、experience',
  city           VARCHAR(32)     NULL COMMENT '同城 Feed 城市编码，可为空',
  title          VARCHAR(200)    NOT NULL COMMENT '帖子标题',
  summary        VARCHAR(500)    NULL COMMENT '列表展示摘要',
  content        TEXT            NOT NULL COMMENT '帖子正文',
  tags           JSON            NULL COMMENT '标签列表 JSON 数组',
  company_name   VARCHAR(128)    NULL COMMENT '关联公司名称，面经等场景使用',
  position       VARCHAR(128)    NULL COMMENT '关联岗位名称，面经等场景使用',
  like_count     INT UNSIGNED    NOT NULL DEFAULT 0 COMMENT '点赞数冗余计数',
  comment_count  INT UNSIGNED    NOT NULL DEFAULT 0 COMMENT '评论数冗余计数',
  bookmark_count INT UNSIGNED    NOT NULL DEFAULT 0 COMMENT '收藏数冗余计数',
  view_count     INT UNSIGNED    NOT NULL DEFAULT 0 COMMENT '浏览数冗余计数',
  featured       TINYINT(1)      NOT NULL DEFAULT 0 COMMENT '是否精选：0 否 / 1 是',
  status         VARCHAR(16)     NOT NULL DEFAULT 'published' COMMENT '帖子状态：published 已发布 / hidden 隐藏 / deleted 已删除',
  created_at     DATETIME(3)     NOT NULL DEFAULT CURRENT_TIMESTAMP(3) COMMENT '创建时间',
  updated_at     DATETIME(3)     NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3) COMMENT '更新时间',
  PRIMARY KEY (id),
  KEY idx_posts_author (author_id),
  KEY idx_posts_city_created (city, created_at),
  KEY idx_posts_created (created_at),
  CONSTRAINT fk_posts_author FOREIGN KEY (author_id) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='社区帖子表';

CREATE TABLE IF NOT EXISTS post_images (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '图片记录主键 ID',
  post_id    BIGINT UNSIGNED NOT NULL COMMENT '所属帖子 ID，外键 posts.id',
  url        VARCHAR(512)    NOT NULL COMMENT '图片访问 URL',
  sort_order INT             NOT NULL DEFAULT 0 COMMENT '帖子内图片排序序号，越小越靠前',
  PRIMARY KEY (id),
  KEY idx_post_images_post (post_id),
  CONSTRAINT fk_post_images_post FOREIGN KEY (post_id) REFERENCES posts (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='帖子图片表';

CREATE TABLE IF NOT EXISTS post_likes (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '点赞记录主键 ID',
  post_id    BIGINT UNSIGNED NOT NULL COMMENT '被点赞帖子 ID，外键 posts.id',
  user_id    BIGINT UNSIGNED NOT NULL COMMENT '点赞用户 ID，外键 users.id',
  created_at DATETIME(3)     NOT NULL DEFAULT CURRENT_TIMESTAMP(3) COMMENT '点赞时间',
  PRIMARY KEY (id),
  UNIQUE KEY uk_post_like (post_id, user_id),
  KEY idx_post_likes_user (user_id),
  CONSTRAINT fk_post_likes_post FOREIGN KEY (post_id) REFERENCES posts (id),
  CONSTRAINT fk_post_likes_user FOREIGN KEY (user_id) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='帖子点赞表';

CREATE TABLE IF NOT EXISTS post_comments (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '评论主键 ID',
  post_id    BIGINT UNSIGNED NOT NULL COMMENT '所属帖子 ID，外键 posts.id',
  author_id  BIGINT UNSIGNED NOT NULL COMMENT '评论作者用户 ID，外键 users.id',
  content    TEXT            NOT NULL COMMENT '评论正文内容',
  like_count INT UNSIGNED    NOT NULL DEFAULT 0 COMMENT '评论点赞数冗余计数',
  status     VARCHAR(16)     NOT NULL DEFAULT 'visible' COMMENT '评论状态：visible 可见 / deleted 已删除',
  created_at DATETIME(3)     NOT NULL DEFAULT CURRENT_TIMESTAMP(3) COMMENT '创建时间',
  updated_at DATETIME(3)     NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3) COMMENT '更新时间',
  PRIMARY KEY (id),
  KEY idx_comments_post (post_id, created_at),
  CONSTRAINT fk_comments_post FOREIGN KEY (post_id) REFERENCES posts (id),
  CONSTRAINT fk_comments_author FOREIGN KEY (author_id) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='帖子评论表';

CREATE TABLE IF NOT EXISTS post_favorites (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '收藏记录主键 ID',
  post_id    BIGINT UNSIGNED NOT NULL COMMENT '被收藏帖子 ID，外键 posts.id',
  user_id    BIGINT UNSIGNED NOT NULL COMMENT '收藏用户 ID，外键 users.id',
  created_at DATETIME(3)     NOT NULL DEFAULT CURRENT_TIMESTAMP(3) COMMENT '收藏时间',
  PRIMARY KEY (id),
  UNIQUE KEY uk_post_favorite (post_id, user_id),
  CONSTRAINT fk_favorites_post FOREIGN KEY (post_id) REFERENCES posts (id),
  CONSTRAINT fk_favorites_user FOREIGN KEY (user_id) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='帖子收藏表';

CREATE TABLE IF NOT EXISTS user_follows (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '关注关系主键 ID',
  follower_id BIGINT UNSIGNED NOT NULL COMMENT '关注者用户 ID，外键 users.id',
  followee_id BIGINT UNSIGNED NOT NULL COMMENT '被关注者用户 ID，外键 users.id',
  created_at  DATETIME(3)     NOT NULL DEFAULT CURRENT_TIMESTAMP(3) COMMENT '关注时间',
  PRIMARY KEY (id),
  UNIQUE KEY uk_follow (follower_id, followee_id),
  KEY idx_follows_followee (followee_id),
  CONSTRAINT fk_follows_follower FOREIGN KEY (follower_id) REFERENCES users (id),
  CONSTRAINT fk_follows_followee FOREIGN KEY (followee_id) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户关注关系表';

CREATE TABLE IF NOT EXISTS drafts (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '草稿主键 ID',
  user_id    BIGINT UNSIGNED NOT NULL COMMENT '草稿所属用户 ID，外键 users.id',
  category   VARCHAR(32)     NOT NULL COMMENT '草稿分类，与发帖 category 一致',
  title      VARCHAR(200)    NULL COMMENT '草稿标题，可为空',
  content    TEXT            NOT NULL COMMENT '草稿正文',
  tags       JSON            NULL COMMENT '草稿标签 JSON 数组',
  image_urls JSON            NULL COMMENT '草稿图片 URL 列表 JSON 数组',
  status     VARCHAR(16)     NOT NULL DEFAULT 'draft' COMMENT '草稿状态：draft 草稿中 / published 已发布 / discarded 已废弃',
  created_at DATETIME(3)     NOT NULL DEFAULT CURRENT_TIMESTAMP(3) COMMENT '创建时间',
  updated_at DATETIME(3)     NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3) COMMENT '更新时间',
  PRIMARY KEY (id),
  KEY idx_drafts_user (user_id, updated_at),
  CONSTRAINT fk_drafts_user FOREIGN KEY (user_id) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='发帖草稿表';
