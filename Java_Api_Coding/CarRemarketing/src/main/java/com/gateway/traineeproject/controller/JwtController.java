/**
 * 
 */
package com.gateway.traineeproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.gateway.traineeproject.helper.JwtUtil;
import com.gateway.traineeproject.model.JwtRequest;
import com.gateway.traineeproject.model.JwtResponse;
import com.gateway.traineeproject.service.CustomerDetailsService;

/**
 * @author Hiren Khatri
 *
 */
@RestController
@CrossOrigin(origins = "*")
public class JwtController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private CustomerDetailsService customerDetailsService;
	@Autowired
	private JwtUtil jwtUtil;
	
	@RequestMapping(value = "/getToken",method = RequestMethod.POST)
	public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception{	
		System.out.println(jwtRequest.toString());
		
		try {
			this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(),jwtRequest.getPassword()));
		} catch (UsernameNotFoundException|BadCredentialsException e) {
			e.printStackTrace();
			throw new BadCredentialsException("Bad Credentials");
		}
		
		//fine area
		UserDetails userDetails = this.customerDetailsService.loadUserByUsername(jwtRequest.getUsername());
		
		String token = this.jwtUtil.generateToken(userDetails);
		System.out.println(token);
		
		return ResponseEntity.ok(new JwtResponse(token));
	}
	
}
