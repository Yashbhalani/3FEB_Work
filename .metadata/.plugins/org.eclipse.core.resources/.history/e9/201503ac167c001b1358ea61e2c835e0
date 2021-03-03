package com.gateway.traineeproject.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.gateway.traineeproject.model.Customer;
import com.gateway.traineeproject.repository.CustomerRepository;

/**
 * @author Hiren Khatri
 *
 */
@RestController
@CrossOrigin(origins = "*")
public class HomeController {
	@Autowired
	private CustomerRepository customerRepository;

	@RequestMapping(value="/",method =RequestMethod.GET)
	public String showHome() {
		return "Home";
	}
	
	@RequestMapping(value="/getUserDetails",method =RequestMethod.GET)
	public Customer getUserDetails(Principal principal) {
		
		String email = principal.getName();
		Customer loggedInCustomer = customerRepository.findByEmail(email);
		return loggedInCustomer;	
	}
} 
