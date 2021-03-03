/**
 * 
 */
package com.gateway.traineeproject.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gateway.traineeproject.model.Brand;
import com.gateway.traineeproject.model.Media;
import com.gateway.traineeproject.model.ModelMaster;
import com.gateway.traineeproject.model.VehicleMaster;
import com.gateway.traineeproject.repository.BrandRepository;
import com.gateway.traineeproject.repository.MediaRepository;
import com.gateway.traineeproject.repository.ModelRepository;
import com.gateway.traineeproject.repository.VehicleRepository;

/**
 * @author Hiren Khatri
 *
 */
@Service
public class VehicleMasterService {
	
	@Autowired
	private VehicleRepository vehicleRepository;
	
	@Autowired
	private ModelRepository modelRepository;
	
	@Autowired
	private BrandRepository brandRepository;
	
	@Autowired
	private MediaRepository mediaRepository;
	
	public List<VehicleMaster> findAll(){
		List<VehicleMaster> allVehicles = new ArrayList<VehicleMaster>();
		allVehicles = vehicleRepository.findAll();
		List<String> images = new ArrayList<String>();
		List<Media> medialList = new ArrayList<Media>();
		for (VehicleMaster vehicleMaster : allVehicles) {
			 medialList = mediaRepository.findByVehicleMaster(vehicleMaster);
			medialList.forEach((media) -> {
				images.add(media.getPath());
			});
			
			vehicleMaster.setVehicleImagesPath(images);
		}
		
		
		return allVehicles;
	}
	
	public Optional<VehicleMaster> findById(Long id) {
		Optional<VehicleMaster> vehicleMaster = vehicleRepository.findById(id);
		
		List<Media>mediaList = mediaRepository.findByVehicleMaster(vehicleMaster.get());
		List<String> images = new ArrayList<String>();
		mediaList.forEach((media) -> {
			images.add(media.getPath());
		});
		
		if(vehicleMaster.isPresent()) {
			vehicleMaster.get().setVehicleImagesPath(images);
		}	
		
		return vehicleMaster;
	}
	
	public VehicleMaster save(VehicleMaster vehicleToBeSaved) {
		if(vehicleRepository.existsById(vehicleToBeSaved.getId())) {
			throw new EntityExistsException("There is already existing entity with such ID in the database.");
		}
		if (vehicleRepository.existsByvINNum(vehicleToBeSaved.getvINNum())
				) {
			throw new ConstraintViolationException("There is already existing entity with same VIN number in the database.",
					null, null);
		}
		if (vehicleRepository.existsByLicencePlate(vehicleToBeSaved.getLicencePlate())
				) {
			throw new ConstraintViolationException("There is already existing entity with same Licence Plate  in the database.",
					null, null);
		}
		
		VehicleMaster savedVehicle = vehicleRepository.save(vehicleToBeSaved);
	
		ModelMaster modelMaster = modelRepository.findById(savedVehicle.getModelId()).get();
		
		Brand brand = brandRepository.findById(savedVehicle.getBrandId()).get();
		
		modelMaster.setBrand(brand);
		savedVehicle.setModelMaster(modelMaster);
	
		return savedVehicle;
	}
	
	public VehicleMaster update(VehicleMaster vehicleToBeUpdated) {
		if(!vehicleRepository.existsById(vehicleToBeUpdated.getId())) {
			throw new EntityNotFoundException("There is no existing entity with such ID in the database.");
		}
		if(vehicleRepository.existsByvINNum(vehicleToBeUpdated.getvINNum()) && 
				!vehicleRepository.existsByvINNumAndId(vehicleToBeUpdated.getvINNum(), vehicleToBeUpdated.getId())) {
			throw new EntityExistsException("There is already existing entity with same VIN number in the database.");
		}
		if(vehicleRepository.existsByLicencePlate(vehicleToBeUpdated.getLicencePlate()) && 
				!vehicleRepository.existsByLicencePlateAndId(vehicleToBeUpdated.getLicencePlate(), vehicleToBeUpdated.getId())) {
			throw new EntityExistsException("There is already existing entity with same Licence plate number in the database.");
		}
		return vehicleRepository.save(vehicleToBeUpdated);
	}
	
	public void delete(Long id) {
		if(!vehicleRepository.existsById(id)) {
			throw new EntityNotFoundException("There is no existing entity with such ID in the database.");
		}
		vehicleRepository.deleteById(id);
	}
}
