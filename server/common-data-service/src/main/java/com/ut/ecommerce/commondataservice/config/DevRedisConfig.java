package com.ut.ecommerce.commondataservice.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.env.Environment;
import org.springframework.data.redis.connection.RedisPassword;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.Objects;

@Configuration
@Profile("dev")
public class DevRedisConfig {

    @Autowired
    Environment environment;

    @Bean
    JedisConnectionFactory jedisConnectionFactory() {
        String host = environment.getProperty("REDIS_HOST", "localhost");
        int port = Integer.parseInt(Objects.requireNonNull(environment.getProperty("REDIS_PORT", "6379")));

        RedisStandaloneConfiguration config = new RedisStandaloneConfiguration(host, port);

        return new JedisConnectionFactory(config);
    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate() {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(jedisConnectionFactory());
        return template;
    }
}
