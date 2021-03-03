package com.gateway.traineeproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gateway.traineeproject.model.Brand;
import com.gateway.traineeproject.model.ModelMaster;

/**
 * @author Hiren Khatri
 *
 */
public interface ModelRepository extends JpaRepository<ModelMaster, Long>{
	public boolean existsByNameAndModelYearAndBrand(String name,String modelYear,Brand brand);
	public boolean existsByIdAndName(long id,String name);
	public boolean existsByBrand(Brand brand);

}
