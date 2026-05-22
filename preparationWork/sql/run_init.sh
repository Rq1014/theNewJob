#!/usr/bin/env bash
# 初始化 kairos 库表（避免 mysql -p 与 stdin 重定向冲突）

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SQL_FILE="${SCRIPT_DIR}/kairos_init_schema.sql"

echo "将执行: ${SQL_FILE}"
read -r -s -p "MySQL root 密码: " MYSQL_PWD_INPUT
echo

if [[ -z "${MYSQL_PWD_INPUT}" ]]; then
  echo "错误: 密码不能为空" >&2
  exit 1
fi

mysql -u root "-p${MYSQL_PWD_INPUT}" < "${SQL_FILE}"

echo "执行完成。正在检查表..."
mysql -u root "-p${MYSQL_PWD_INPUT}" -e "USE kairos; SHOW TABLES;"
