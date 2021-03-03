package com.gateway.traineeproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gateway.traineeproject.model.Media;
import com.gateway.traineeproject.model.VehicleMaster;

/**
 * @author hiren.khatri
 *
 */
public interface MediaRepository extends JpaRepository<Media, Long>{
	public List<Media> findByVehicleMaster(VehicleMaster vehicleMaster);
}
