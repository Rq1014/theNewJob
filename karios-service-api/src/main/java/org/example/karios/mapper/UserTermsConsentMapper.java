package org.example.karios.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.example.karios.entity.UserTermsConsentEntity;

/** 协议同意记录表 {@code user_terms_consents} 数据访问。 */
@Mapper
public interface UserTermsConsentMapper extends BaseMapper<UserTermsConsentEntity> {}
