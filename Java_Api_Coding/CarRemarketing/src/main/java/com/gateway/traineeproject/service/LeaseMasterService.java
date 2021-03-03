package com.gateway.traineeproject.service;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gateway.traineeproject.model.LeaseMaster;
import com.gateway.traineeproject.repository.LeaseMasterRepository;

/**
 * @author yash.bhalani
 *
 */
@Service
public class LeaseMasterService {
	@Autowired
	private LeaseMasterRepository leaseMasterRepository;

	public List<LeaseMaster> findAll() {
		return leaseMasterRepository.findAll();
	}

	public Optional<LeaseMaster> findById(long id) {
		return leaseMasterRepository.findById(id);
	}
	
	public Optional<LeaseMaster> findByVehicleIdAndKilometersAndLeaseDuration(long vehicleId,long kilometers,int duration) {
		return leaseMasterRepository.findByVehicleIdAndLeaseDurationAndKilometers(vehicleId, duration, kilometers);
	}




	public LeaseMaster create(LeaseMaster leaseMasterToBeSaved) {
		if (leaseMasterRepository.existsById(leaseMasterToBeSaved.getId())) {
			throw new EntityExistsException("There is already existing entity with such ID in the database.");
		}
		return leaseMasterRepository.save(leaseMasterToBeSaved);
	}

	public LeaseMaster update(LeaseMaster leaseMasterToBeUpdated) {
		if (!leaseMasterRepository.existsById(leaseMasterToBeUpdated.getId())) {
			throw new EntityNotFoundException("There is no existing entity with such ID in the database.");
		}
		return leaseMasterRepository.save(leaseMasterToBeUpdated);
	}
	
	public void delete(long id) {
		if (!leaseMasterRepository.existsById(id)) {
			throw new EntityNotFoundException("There is no existing entity with such ID in the database.");
		}
		
		leaseMasterRepository.deleteById(id);
	}
}
