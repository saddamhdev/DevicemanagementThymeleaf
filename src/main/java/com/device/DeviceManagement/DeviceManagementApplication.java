package com.device.DeviceManagement;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableCaching
@EnableMongoRepositories(basePackages = "com.device.DeviceManagement.repository")
public class DeviceManagementApplication {
	private static final Logger logger = LogManager.getLogger(DeviceManagementApplication.class);
	public static void main(String[] args) {
		SpringApplication.run(DeviceManagementApplication.class, args);
		logger.info("DeviceManagementApp started successfully");
		System.out.println("Program Are started");
	}
}
