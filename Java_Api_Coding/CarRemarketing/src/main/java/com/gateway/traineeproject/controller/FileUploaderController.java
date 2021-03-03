/**
 * 
 */
package com.gateway.traineeproject.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gateway.traineeproject.helper.FileUploadHelper;
import com.gateway.traineeproject.model.VehicleMaster;

/**
 * @author Hiren Khatri
 *
 */
@RestController
public class FileUploaderController {

//	@Autowired
//	private FileUploadHelper fileUploadHelper;
//
//	@PostMapping("/api/upload-file")
//	public ResponseEntity<?> uploadFile(@RequestParam("vehicle") String vehicle, @RequestParam("files") MultipartFile[] files) {
//		
//		ObjectMapper objMapper = new ObjectMapper();
//		try {
//			VehicleMaster vehicleMaster = objMapper.readValue(vehicle, VehicleMaster.class);
//		} catch (IOException e) {
//		}
//		
//		String[] storedImagesPath = new String[files.length];
//		
//		try {
//
//			if (files.length == 0) {
//				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Images not provided!");
//			}
//			
//			for(MultipartFile file:files) {
//				System.out.println(""+file.getOriginalFilename()+file.getContentType());
//				String mimeType = file.getContentType();
//				String type = mimeType.split("/")[0];
//				if(!type.equalsIgnoreCase("image")) {
//					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File must be an image!!"); 
//				}
//			}
//
//			for (int i=0;i<files.length;i++) {
//				MultipartFile file = files[i];
//				boolean isUploaded = fileUploadHelper.uploadFile(file);
//				
//				if(!isUploaded) {
//					return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new String[] {"Something went wrong! Try again!!"});
//				}
//				
//				storedImagesPath[i] = ServletUriComponentsBuilder.fromCurrentContextPath().path("/images/"+file.getOriginalFilename()).toUriString();
//			}
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//
//		return ResponseEntity.ok(storedImagesPath);
//	}
}
