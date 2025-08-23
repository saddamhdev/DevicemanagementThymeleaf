package com.device.DeviceManagement;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableCaching
@EnableScheduling

@EnableMongoRepositories(basePackages = "com.device.DeviceManagement.repository")
public class DeviceManagementApplication {
	private static final Logger logger = LogManager.getLogger(DeviceManagementApplication.class);
	public static void main(String[] args) {
		//System.out.println("=== Application Starting ===");
		SpringApplication.run(DeviceManagementApplication.class, args);
		logger.info("DeviceManagementApp started successfully");
		System.out.println("Program Are started");
	}
}
