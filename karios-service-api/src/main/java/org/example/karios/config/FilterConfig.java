package org.example.karios.config;

import org.example.karios.gateway.AuthGatewayFilter;
import org.example.karios.gateway.TraceIdFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/** 注册 Servlet 过滤器顺序：TraceId → JWT 鉴权。 */
@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean<TraceIdFilter> traceIdFilter() {
        FilterRegistrationBean<TraceIdFilter> bean = new FilterRegistrationBean<>();
        bean.setFilter(new TraceIdFilter());
        bean.addUrlPatterns("/api/*");
        bean.setOrder(1);
        return bean;
    }

    @Bean
    public FilterRegistrationBean<AuthGatewayFilter> authGatewayFilterRegistration(AuthGatewayFilter filter) {
        FilterRegistrationBean<AuthGatewayFilter> bean = new FilterRegistrationBean<>();
        bean.setFilter(filter);
        bean.addUrlPatterns("/api/*");
        bean.setOrder(2);
        return bean;
    }
}
