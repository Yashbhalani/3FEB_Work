/**
 * 
 */
package com.gateway.traineeproject.service;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gateway.traineeproject.model.Brand;
import com.gateway.traineeproject.model.ModelMaster;
import com.gateway.traineeproject.repository.ModelRepository;
import com.gateway.traineeproject.repository.VehicleRepository;

/**
 * @author Hiren Khatri
 *
 */
@Service
public class ModelMasterService {
	@Autowired
	private ModelRepository modelRepository;
	@Autowired
	private VehicleRepository vehicleRepository;
	
	
	public List<ModelMaster> findAll() {
		return modelRepository.findAll();
	}
	
	public Optional<ModelMaster> findById(Long id) {
		return modelRepository.findById(id);
	}
	
	public ModelMaster save(ModelMaster modelToBeSaved) {
		if(modelRepository.existsById(modelToBeSaved.getId())) {
			throw new EntityExistsException("There is already existing entity with such ID in the database.");
		}
		Brand brand = new Brand();
		brand.setId(modelToBeSaved.getBrandId());
		if (modelRepository.existsByNameAndModelYearAndBrand(modelToBeSaved.getName(),modelToBeSaved.getModelYear(),brand)) {
			throw new ConstraintViolationException("There is already existing entity with same name in the database.",
					null, null);
		}
		return modelRepository.save(modelToBeSaved);
	}
	
	public ModelMaster update(ModelMaster modelToBeUpdated) {
		if(!modelRepository.existsById(modelToBeUpdated.getId())) {
			throw new EntityNotFoundException("There is no existing entity with such ID in the database.");
		}
		Brand brand = new Brand();
		brand.setId(modelToBeUpdated.getBrandId());
		if (modelRepository.existsByNameAndModelYearAndBrand(modelToBeUpdated.getName(),modelToBeUpdated.getModelYear(),brand)
				&& !modelRepository.existsByIdAndName(modelToBeUpdated.getId(), modelToBeUpdated.getName())) {
			throw new EntityExistsException("There is already existing entity with same name in the database.");
		}
		return modelRepository.save(modelToBeUpdated);
	}
	
	public void delete(Long id) {
		if(!modelRepository.existsById(id)) {
			throw new EntityNotFoundException("There is no existing entity with such ID in the database.");
		}
		ModelMaster modelMaster = new ModelMaster();
		modelMaster.setId(id);
		if(vehicleRepository.existsByModelMaster(modelMaster)) {
			throw new ConstraintViolationException("Model can not be deleted as vehicles are associated with this model!",
					null, null);
		}
		modelRepository.deleteById(id);
	}
}
