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

import org.hibernate.exception.ConstraintViolationException;
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
import com.gateway.traineeproject.service.BrandService;

import javassist.NotFoundException;

/**
 * @author yash.bhalani
 *
 */
@RestController
@CrossOrigin(origins = "*")
public class BrandController {
	@Autowired
	private BrandService brandService;

	@RequestMapping(value = "/api/brands", method = RequestMethod.GET)
	public List<Brand> getAllBrands() {
		return brandService.findAll();
	}

	@GetMapping("/api/brands/{id}")
	public ResponseEntity<?> getBrand(@PathVariable Long id) throws NotFoundException {
		Optional<Brand> foundBrand = brandService.findById(id);

		if (!foundBrand.isPresent()) {
			return new ResponseEntity<>("Not Found!!",HttpStatus.NOT_FOUND);
		}

		Brand brand = foundBrand.get();

		return ResponseEntity.ok(brand);
	}

	@RequestMapping(value = "/api/brands", method = RequestMethod.POST)
	public ResponseEntity<?> createBrand(@RequestBody Brand brandToBeSaved) throws URISyntaxException {
		try {
			Brand brand = brandService.save(brandToBeSaved);
			return ResponseEntity.created(new URI("/api/brands/" + brand.getId())).body(brand);
		} catch (EntityExistsException e) {
			return new ResponseEntity<Brand>(HttpStatus.CONFLICT);
		}catch (ConstraintViolationException e) {
			// TODO: handle exception
			return new ResponseEntity<>("Brand with name "+brandToBeSaved.getName()+" is already stored!",HttpStatus.BAD_REQUEST);
		}catch (Exception e) {
			return new ResponseEntity<>("Something went wrong! Please try again!!",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@RequestMapping(value = "/api/brands", method = RequestMethod.PUT)
	public ResponseEntity<?> updateBrand(@RequestBody Brand brandToBeUpdated) throws URISyntaxException {
		try {
			Brand brand = brandService.update(brandToBeUpdated);
			return ResponseEntity.created(new URI("/api/brands/" + brand.getId())).body(brand);
		} catch (EntityNotFoundException e) {
			return new ResponseEntity<Brand>(HttpStatus.CONFLICT);
		}catch (EntityExistsException e) {
			return new ResponseEntity<>("Brand with name "+brandToBeUpdated.getName()+" is already stored!",HttpStatus.BAD_REQUEST);
		}catch (Exception e) {
			return new ResponseEntity<>("Something went wrong! Please try again!!",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@RequestMapping(value = "/api/brands/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
		try {
			brandService.delete(id);
			return ResponseEntity.ok().build();
		} catch (EntityNotFoundException e) {
			return new ResponseEntity<>("The brand not found!",HttpStatus.CONFLICT);
		}catch (ConstraintViolationException e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
		}catch (Exception e) {
			return new ResponseEntity<>("Something went wrong! Please try again!!",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
