package org.example.karios.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.example.karios.entity.UserAuthBindingEntity;

/** 登录凭证绑定表 {@code user_auth_bindings} 数据访问。 */
@Mapper
public interface UserAuthBindingMapper extends BaseMapper<UserAuthBindingEntity> {}
