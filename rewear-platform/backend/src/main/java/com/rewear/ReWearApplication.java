package com.rewear;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Main Spring Boot application class for ReWear platform
 * 
 * ReWear is a sustainable fashion platform that enables users to exchange
 * unused clothing through direct swaps or a point-based redemption system.
 */
@SpringBootApplication
@EnableJpaAuditing
@EnableAsync
@EnableTransactionManagement
public class ReWearApplication {

    public static void main(String[] args) {
        SpringApplication.run(ReWearApplication.class, args);
        System.out.println("""
            
            ╭─────────────────────────────────────────────────────╮
            │                                                     │
            │    🌱 ReWear Platform Backend Started Successfully  │
            │                                                     │
            │    🚀 API Server running on: http://localhost:8080 │
            │    📊 H2 Console: http://localhost:8080/api/h2-console │
            │    📋 Health Check: http://localhost:8080/api/actuator/health │
            │                                                     │
            │    Building a sustainable fashion future! ♻️        │
            │                                                     │
            ╰─────────────────────────────────────────────────────╯
            """);
    }
}