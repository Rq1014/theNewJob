# karios-service-api

Kairos 后端 API（登录注册 MVP），实现见 `preparationWork/登录注册后端TRD.md`。

## 前置条件

- JDK 17+
- MySQL 8（库 `kairos` 已建表，见 `preparationWork/sql/kairos_init_schema.sql`）
- Redis 6+

## 配置

`src/main/resources/application.yml`：

```yaml
spring:
  datasource:
    password: ${MYSQL_PASSWORD:你的密码}
```

或通过环境变量：

```bash
export MYSQL_PASSWORD=你的密码
```

开发 OTP 固定验证码：`123456`（`kairos.auth.otp.dev-code`）

### 登录态（App 滑动续期）

| 配置项 | 默认值 | 说明 |
|--------|--------|------|
| `kairos.auth.jwt.access-ttl-seconds` | 3600 | Access 1 小时，前端会提前 5 分钟静默刷新 |
| `kairos.auth.jwt.refresh-ttl-days` | 90 | Refresh 滑动窗口 90 天（每次活跃/刷新从当前起算） |
| `kairos.auth.jwt.slide-on-activity` | true | 已登录 API 请求每 5 分钟最多续期一次 |

持续使用 App 时无需反复登录；超过 90 天未打开 App 需重新登录。

## 启动

```bash
cd karios-service-api
export MYSQL_PASSWORD=你的密码   # 必填，与本地 MySQL root 密码一致
./mvnw spring-boot:run
```

启动日志出现 `MySQL 连接成功` 表示数据源正常。若连接失败，请检查 MySQL 是否运行、`kairos` 库是否已初始化。

若曾使用旧版 MyBatis XML Mapper，迁移到 MyBatis-Plus 后请执行 **`./mvnw clean spring-boot:run`**，避免 `target/classes/mapper/*.xml` 残留导致 `Parameter 'nickname' not found`。

服务地址：`http://127.0.0.1:8080`

## 主要接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/v1/health` | 健康检查（免登录） |
| POST | `/api/v1/auth/otp/send` | 发验证码，需 `termsVersion` |
| POST | `/api/v1/auth/otp/verify` | 登录/注册 |
| POST | `/api/v1/auth/oauth/apple` | Apple 登录（dev 可用 `mock-token`） |
| POST | `/api/v1/auth/refresh` | 刷新 Token |
| POST | `/api/v1/auth/logout` | 登出（需 Bearer） |
| GET | `/api/v1/auth/bindings` | 登录绑定列表 |
| GET/PUT | `/api/v1/users/me` | 用户资料 |

## 包结构（遵循后端规范）

```
org.example.karios
├── gateway/     # 网关鉴权、JWT
├── web/         # Controller
├── service/     # 业务逻辑
├── mapper/      # MyBatis-Plus BaseMapper
├── entity/      # 表实体
├── model/       # request / response / bo
├── config/
└── common/
```

## 前端联调

移动端 `src/config.ts` 已默认 `USE_REAL_AUTH_API = true`，请求会携带 `termsVersion` / `privacyVersion`（启动时从 `GET /api/v1/legal/terms` 同步）。真机请将 `DEV_HOST` 改为电脑局域网 IP。
