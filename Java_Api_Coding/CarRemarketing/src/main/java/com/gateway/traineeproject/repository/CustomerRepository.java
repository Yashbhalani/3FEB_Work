/**
 * 
 */
package com.gateway.traineeproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gateway.traineeproject.model.Customer;

/**
 * @author Hiren Khatri
 *CustomerRepository Interface for SpringBoot and Hibernate for the Customers
 */
public interface CustomerRepository extends JpaRepository<Customer, Long>{
	public Customer findByEmail(String email);
}
