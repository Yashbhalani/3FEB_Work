package com.gateway.traineeproject.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gateway.traineeproject.model.Brand;
import com.gateway.traineeproject.model.LeaseMaster;
import com.gateway.traineeproject.service.LeaseMasterService;

/**
 *@author yash.bhalani
 *
 */
@RestController
@CrossOrigin(origins = "*")
public class LeaseController {
	
	@Autowired
	private LeaseMasterService leaseMasterService;
	
	@GetMapping("api/lease")
	public List<LeaseMaster> getAllLeases() {
		return leaseMasterService.findAll();
	}
	
	@GetMapping("api/search-lease")
	public ResponseEntity<?> findLeaseFromVehicleId(long vehicleId,long kilometers,int duration){
		Optional<LeaseMaster> foundLease = leaseMasterService.findByVehicleIdAndKilometersAndLeaseDuration(vehicleId, kilometers, duration);
		
		if(!foundLease.isPresent()) {
			return new ResponseEntity<>("Not Found!!",HttpStatus.NOT_FOUND);
		}
		LeaseMaster lease = foundLease.get();

		return ResponseEntity.ok(lease);
	}
	
	@GetMapping("api/lease/{id}")
	public ResponseEntity<?>getLease(long id){
		Optional<LeaseMaster> foundLease = leaseMasterService.findById(id);

		if (!foundLease.isPresent()) {
			return new ResponseEntity<>("Not Found!!",HttpStatus.NOT_FOUND);
		}

		LeaseMaster lease = foundLease.get();

		return ResponseEntity.ok(lease);
	}
	
	@PostMapping("api/lease")
	public ResponseEntity<?> createLeaseMaster(@RequestBody LeaseMaster leaseMasterToBeSaved) {
		try {
			LeaseMaster leaseMaster =	leaseMasterService.create(leaseMasterToBeSaved);
		return ResponseEntity.ok(leaseMaster);
		}catch (EntityExistsException e) {
			return new ResponseEntity<LeaseMaster>(HttpStatus.CONFLICT);
		}
	}
	
	
	
	@PutMapping("api/lease")
	public ResponseEntity<?> updateLeaseMaster(@RequestBody LeaseMaster leaseMasterToBeUpdated){
		try {
			LeaseMaster leaseMaster = leaseMasterService.update(leaseMasterToBeUpdated);
			return ResponseEntity.created(new URI("/api/lease/" + leaseMaster.getId())).body(leaseMaster);
		}catch (EntityNotFoundException e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
		}catch (Exception e) {
			return new ResponseEntity<>("Something went wrong! Please try again!!",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
