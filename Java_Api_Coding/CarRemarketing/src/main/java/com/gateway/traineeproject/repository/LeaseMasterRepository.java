package com.gateway.traineeproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import com.gateway.traineeproject.model.LeaseMaster;

/**
 * @author yash.bhalani
 *
 */
public interface LeaseMasterRepository extends JpaRepository<LeaseMaster, Long>{
	Optional<LeaseMaster> findByVehicleIdAndLeaseDurationAndKilometers(long vehicleId,int duration,long kilometers);
}
