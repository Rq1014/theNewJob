# Kairos 数据库脚本

## 为什么 `mysql -u root -p < kairos_init_schema.sql` 像没反应？

`-p` 会提示 `Enter password:`，并从**标准输入**读密码；同时 `< file.sql` 也把**标准输入**重定向成 SQL 文件。  
两者冲突时，可能出现：密码读错、脚本未执行、或执行成功但**无任何输出**（MySQL 成功时默认不打印信息）。

## 推荐执行方式

### 方式一：密码写在 `-p` 后面（无空格）

```bash
mysql -u root -p你的密码 < /Users/renquan.11/theNewJob/preparationWork/sql/kairos_init_schema.sql
```

注意：`-p` 与密码之间**不能有空格**。

### 方式二：交互式（最安全）

```bash
mysql -u root -p
```

输入密码进入 `mysql>` 后执行：

```sql
source /Users/renquan.11/theNewJob/preparationWork/sql/kairos_init_schema.sql;
```

### 方式三：使用脚本（会提示输入密码，不回显）

```bash
cd /Users/renquan.11/theNewJob/preparationWork/sql
chmod +x run_init.sh
./run_init.sh
```

## 验证是否建表成功

```bash
mysql -u root -p你的密码 -e "USE kairos; SHOW TABLES;"
```

应看到 `users`、`user_auth_bindings`、`user_terms_consents`、`user_sessions` 等表。
