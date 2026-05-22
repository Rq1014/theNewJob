package org.example.karios.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.example.karios.entity.UserEntity;

/** 用户主表 {@code users} 数据访问。 */
@Mapper
public interface UserMapper extends BaseMapper<UserEntity> {}
