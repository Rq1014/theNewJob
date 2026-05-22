package org.example.karios.common;

/**
 * 手机号/邮箱规范化，保证同一用户在不同输入格式下得到稳定的 {@code provider_user_id}。
 */
public final class PhoneNormalizer {

    private PhoneNormalizer() {}

    /** 邮箱转小写并去首尾空格。 */
    public static String normalizeEmail(String email) {
        return email == null ? null : email.trim().toLowerCase();
    }

    /** 大陆 11 位手机号补全为 E.164 {@code +86...}。 */
    public static String normalizePhone(String phone) {
        if (phone == null) {
            return null;
        }
        String digits = phone.replaceAll("[^0-9+]", "");
        if (digits.startsWith("+")) {
            return digits;
        }
        if (digits.length() == 11 && digits.startsWith("1")) {
            return "+86" + digits;
        }
        return digits;
    }

    /** 按 channel（email/phone）生成凭证侧唯一 ID。 */
    public static String providerUserId(String channel, String target) {
        if ("email".equals(channel)) {
            return normalizeEmail(target);
        }
        if ("phone".equals(channel)) {
            return normalizePhone(target);
        }
        return target;
    }
}
