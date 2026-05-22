package org.example.karios.config;

import java.sql.Connection;
import javax.sql.DataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

/** 启动时预热数据源，连接失败时尽早打日志便于排查。 */
@Component
public class DataSourceWarmup implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSourceWarmup.class);

    private final DataSource dataSource;

    public DataSourceWarmup(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        try (Connection connection = dataSource.getConnection()) {
            log.info("MySQL 连接成功: {}", connection.getMetaData().getURL());
        } catch (Exception ex) {
            log.error(
                    "MySQL 连接失败，请检查 MySQL 是否启动、kairos 库是否存在、MYSQL_PASSWORD 是否正确",
                    ex);
            throw ex;
        }
    }
}
