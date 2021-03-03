package com.gateway.traineeproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gateway.traineeproject.model.ModelMaster;
import com.gateway.traineeproject.model.VehicleMaster;

/**
 * @author Hiren Khatri
 *
 */
public interface VehicleRepository extends JpaRepository<VehicleMaster, Long>{
	public boolean existsByModelMaster(ModelMaster modelMaster);
	public boolean existsByvINNum(String vINNum);
	public boolean existsByLicencePlate(String licencePlate);
	public boolean existsByvINNumAndId(String vINNum,long id);
	public boolean existsByLicencePlateAndId(String licencePlate,long id);
}
