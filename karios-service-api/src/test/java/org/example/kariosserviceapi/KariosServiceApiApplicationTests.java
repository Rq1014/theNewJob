package org.example.kariosserviceapi;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(properties = {
    "spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration,"
            + "org.mybatis.spring.boot.autoconfigure.MybatisAutoConfiguration,"
            + "org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration"
})
class KariosServiceApiApplicationTests {

    @Test
    void contextLoads() {
    }

}
