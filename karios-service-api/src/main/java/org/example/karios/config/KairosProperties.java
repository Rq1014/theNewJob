package org.example.karios.config;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/** 绑定 application.yml 中 {@code kairos.*} 配置项。 */
@Data
@Component
@ConfigurationProperties(prefix = "kairos")
public class KairosProperties {
    private Legal legal = new Legal();
    private Auth auth = new Auth();
    private Gateway gateway = new Gateway();

    /** 当前生效的协议与隐私政策版本号 */
    @Data
    public static class Legal {
        private String termsVersion = "2026-05-01";
        private String privacyVersion = "2026-05-01";
    }

    @Data
    public static class Auth {
        private Jwt jwt = new Jwt();
        private Otp otp = new Otp();
        private Apple apple = new Apple();
        private Risk risk = new Risk();
    }

    @Data
    public static class Jwt {
        private String secret;
        /** Access Token 有效期（秒），App 内会静默刷新 */
        private long accessTtlSeconds = 3600;
        /** Refresh 滑动窗口（天）：每次活跃/刷新从此刻起重新计算 */
        private int refreshTtlDays = 7;
        /** 是否在已登录 API 请求时自动滑动续期 */
        private boolean slideOnActivity = true;
    }

    @Data
    public static class Otp {
        private int ttlSeconds = 300;
        private int cooldownSeconds = 60;
        private int dailyLimit = 10;
        private String devCode;
    }

    @Data
    public static class Apple {
        private String bundleId;
        private boolean devMode = true;
    }

    @Data
    public static class Risk {
        private int ipPerMinute = 30;
        private int devicePerMinute = 20;
    }

    /** 无需 JWT 的接口列表，格式 METHOD:URI */
    @Data
    public static class Gateway {
        private List<String> whitelist = new ArrayList<>();
    }
}
