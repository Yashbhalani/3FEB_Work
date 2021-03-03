package com.gateway.traineeproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gateway.traineeproject.model.Quote;

/**
 *@author yash.bhalani
 *
 */
public interface QuoteRepository extends JpaRepository<Quote, Long>{
	boolean existsByVehicleIdAndCustomerId(long vehicleId,long customerId);
}
