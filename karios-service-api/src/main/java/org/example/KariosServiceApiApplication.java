package org.example.kariosserviceapi;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Kairos 后端服务启动入口。
 * <p>扫描 {@code org.example.karios} 业务包及 MyBatis Mapper。
 */
@SpringBootApplication(scanBasePackages = "org.example.karios")
@MapperScan("org.example.karios.mapper")
public class KariosServiceApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(KariosServiceApiApplication.class, args);
    }

}
