package org.example.karios.web;

import java.util.Map;
import org.example.karios.common.ApiResponse;
import org.example.karios.config.KairosProperties;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** 协议版本查询，供客户端登录前拉取并展示。 */
@RestController
@RequestMapping("/api/v1/legal")
public class LegalController {

    private final KairosProperties properties;

    public LegalController(KairosProperties properties) {
        this.properties = properties;
    }

    @GetMapping("/terms")
    public ApiResponse<Map<String, String>> terms() {
        return ApiResponse.ok(Map.of(
                "termsVersion", properties.getLegal().getTermsVersion(),
                "privacyVersion", properties.getLegal().getPrivacyVersion()));
    }
}
