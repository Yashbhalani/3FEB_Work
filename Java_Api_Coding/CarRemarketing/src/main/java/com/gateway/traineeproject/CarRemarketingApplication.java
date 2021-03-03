package com.gateway.traineeproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author Hiren Khatri
 *
 */
@SpringBootApplication(scanBasePackages = "com.gateway.traineeproject")
@EnableAutoConfiguration
public class CarRemarketingApplication {

	public static void main(String[] args) {
		SpringApplication.run(CarRemarketingApplication.class, args);
	}
}
