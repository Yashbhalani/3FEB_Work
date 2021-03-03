package com.gateway.traineeproject.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.gateway.traineeproject.model.Customer;

@RestController
public class UserRegistrationController {
	
	@RequestMapping(value = "/register",method = RequestMethod.POST)
	public ResponseEntity<?> registerUser(@RequestBody Customer customer){
		return null;
	}
}
