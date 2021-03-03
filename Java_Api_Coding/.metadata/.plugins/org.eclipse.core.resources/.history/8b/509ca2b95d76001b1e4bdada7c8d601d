/**
 * 
 */
package com.gateway.traineeproject.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.gateway.traineeproject.model.Brand;
import com.gateway.traineeproject.model.ModelMaster;
import com.gateway.traineeproject.service.ModelMasterService;

import javassist.NotFoundException;

/**
 * @author Hiren Khatri
 *
 */
@RestController
@CrossOrigin(origins = "*")
public class ModelMasterController {

	@Autowired
	private ModelMasterService modelMasterService;
	
	@RequestMapping(value = "/api/models",method = RequestMethod.GET)
	public List<ModelMaster> getAllModels(){
		return modelMasterService.findAll();
	}
	
	@GetMapping("/api/models/{id}")
	public ResponseEntity<ModelMaster> getModel(@PathVariable Long id) throws NotFoundException {
		Optional<ModelMaster> foundBrand = modelMasterService.findById(id);

		if (!foundBrand.isPresent()) {
			throw new NotFoundException("Brand not found with id: " + id);
		}

		ModelMaster model = foundBrand.get();

		return ResponseEntity.ok(model);
	}
	
	@RequestMapping(value = "/api/models", method = RequestMethod.POST)
	public ResponseEntity<ModelMaster> createModel(@RequestBody ModelMaster modelToBeSaved) throws URISyntaxException {
		try {
			
			long brandId = modelToBeSaved.getBrandId();
			Brand brand = new Brand();
			brand.setId(brandId);
			modelToBeSaved.setBrand(brand);
		
			ModelMaster model = modelMasterService.save(modelToBeSaved);
			return ResponseEntity.created(new URI("/api/models/" + model.getId())).body(model);
		} catch (EntityExistsException e) {
			return new ResponseEntity<ModelMaster>(HttpStatus.CONFLICT);
		}
	}
	
	@RequestMapping(value = "/api/models", method = RequestMethod.PUT)
	public ResponseEntity<ModelMaster> updateModel(@RequestBody ModelMaster modelToBeUpdated) throws URISyntaxException {
		try {
			
			long brandId = modelToBeUpdated.getBrandId();
			Brand brand = new Brand();
			brand.setId(brandId);
			modelToBeUpdated.setBrand(brand);
			
			ModelMaster model = modelMasterService.update(modelToBeUpdated);
			return ResponseEntity.created(new URI("/api/models/" + model.getId())).body(model);
		} catch (EntityNotFoundException e) {
			return new ResponseEntity<ModelMaster>(HttpStatus.CONFLICT);
		}
	}

	@RequestMapping(value = "/api/models/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteModel(@PathVariable Long id) {
		try {
			modelMasterService.delete(id);
			return ResponseEntity.ok().build();
		} catch (EntityNotFoundException e) {
			return new ResponseEntity<Void>(HttpStatus.CONFLICT);
		}
	}
}
