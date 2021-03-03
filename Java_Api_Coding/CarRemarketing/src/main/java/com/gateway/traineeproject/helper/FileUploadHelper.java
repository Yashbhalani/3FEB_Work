/**
 * 
 */
package com.gateway.traineeproject.helper;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.gateway.traineeproject.model.VehicleMaster;

/**
 * @author Hiren Khatri
 *
 */

@Component
public class FileUploadHelper {
	
//	private final String uploadDirectory = new ClassPathResource("static/images/").getFile().getAbsolutePath();
	
	File uploadDirectory;
	
	public FileUploadHelper() throws IOException{
		
	}
	
	public boolean uploadFile(MultipartFile file,VehicleMaster vehicleMaster) {
		boolean isUploaded = false;
		
		try {
			uploadDirectory = new ClassPathResource("static/images/"+vehicleMaster.getModelMaster().getBrand().getName()+"/"+vehicleMaster.getModelMaster().getName()).getFile();
//			if(!uploadDirectory.exists()) {
//				if(uploadDirectory.mkdir()) {
//					System.out.println(""+up);
//				}
//			}
			
			Files.copy(file.getInputStream(), Paths.get(uploadDirectory.getAbsolutePath()+File.separator+file.getOriginalFilename()),StandardCopyOption.REPLACE_EXISTING);
			isUploaded=true;
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return isUploaded;
	}
}
