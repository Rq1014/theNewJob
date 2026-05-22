package org.example.karios.service.auth;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import java.util.List;
import org.example.karios.entity.UserAuthBindingEntity;
import org.example.karios.mapper.UserAuthBindingMapper;
import org.example.karios.model.response.auth.AuthBindingResponse;
import org.example.karios.model.response.auth.AuthBindingsResponse;
import org.example.karios.service.user.UserConverter;
import org.springframework.stereotype.Service;

/** 查询当前用户已绑定的登录方式（返回脱敏后的凭证标识）。 */
@Service
public class AuthBindingService {

    private final UserAuthBindingMapper bindingMapper;

    public AuthBindingService(UserAuthBindingMapper bindingMapper) {
        this.bindingMapper = bindingMapper;
    }

    public AuthBindingsResponse listBindings(Long userId) {
        List<AuthBindingResponse> bindings = bindingMapper
                .selectList(new LambdaQueryWrapper<UserAuthBindingEntity>().eq(UserAuthBindingEntity::getUserId, userId))
                .stream()
                .map(UserConverter::toBinding)
                .toList();
        return new AuthBindingsResponse(bindings);
    }
}
