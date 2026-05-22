package org.example.karios.service.auth;

import org.example.karios.common.BusinessException;
import org.example.karios.common.ErrorCode;
import org.example.karios.config.KairosProperties;
import org.springframework.stereotype.Service;

/** 校验客户端提交的协议/隐私版本是否与服务器当前版本一致。 */
@Service
public class LegalService {

    private final KairosProperties properties;

    public LegalService(KairosProperties properties) {
        this.properties = properties;
    }

    public void validateTermsVersion(String termsVersion, String privacyVersion) {
        if (termsVersion == null || !termsVersion.equals(properties.getLegal().getTermsVersion())) {
            throw new BusinessException(ErrorCode.BAD_REQUEST, "用户协议版本不匹配，请重新同意");
        }
        String expectedPrivacy = properties.getLegal().getPrivacyVersion();
        String actualPrivacy = privacyVersion != null && !privacyVersion.isBlank() ? privacyVersion : termsVersion;
        if (!actualPrivacy.equals(expectedPrivacy)) {
            throw new BusinessException(ErrorCode.BAD_REQUEST, "隐私政策版本不匹配，请重新同意");
        }
    }
}
