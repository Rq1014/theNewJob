-- 为已有 kairos 库增加兴趣爱好字段（已建库时执行，可重复执行）
USE kairos;

-- MySQL 无 ADD COLUMN IF NOT EXISTS 时用存储过程判断
DROP PROCEDURE IF EXISTS kairos_add_users_interests;
DELIMITER //
CREATE PROCEDURE kairos_add_users_interests()
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'users'
      AND COLUMN_NAME = 'interests'
  ) THEN
    ALTER TABLE users
      ADD COLUMN interests VARCHAR(500) NULL COMMENT '兴趣爱好，逗号分隔，如 探店,摄影,日语学习'
      AFTER bio;
  END IF;
END //
DELIMITER ;
CALL kairos_add_users_interests();
DROP PROCEDURE kairos_add_users_interests;
