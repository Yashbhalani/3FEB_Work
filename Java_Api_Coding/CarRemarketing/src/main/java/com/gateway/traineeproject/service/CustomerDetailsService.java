package com.gateway.traineeproject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.gateway.traineeproject.model.CustomCustomerDetails;
import com.gateway.traineeproject.model.Customer;
import com.gateway.traineeproject.repository.CustomerRepository;

/**
 * @author Hiren Khatri
 *Service class for CustomerDetails
 *finds the customer and returns the customer by email
 */
@Service
public class CustomerDetailsService implements UserDetailsService{
	@Autowired
	private CustomerRepository customerRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		
		/*
		 * if(userName.equals("Hiren")) { return new User("Hiren", "Hiren123", new
		 * ArrayList<>()); }else { throw new
		 * UsernameNotFoundException("User not found!"); }
		 */
		
		final Customer customer = this.customerRepository.findByEmail(email);
						
		if(customer == null) {
			throw new UsernameNotFoundException("User not found!");
		}else {
			return new CustomCustomerDetails(customer);
		}
		
	}	

}
