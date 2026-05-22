package org.example.karios.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.example.karios.entity.UserSessionEntity;

/** 登录会话表 {@code user_sessions} 数据访问。 */
@Mapper
public interface UserSessionMapper extends BaseMapper<UserSessionEntity> {}
