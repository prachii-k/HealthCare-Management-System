package com.mydata.hms.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.mydata.hms.dto.PatientDto;
import com.mydata.hms.entity.User;
import com.mydata.hms.exception.ResourceNotFoundException;
import com.mydata.hms.service.PatientService;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/patients")
public class PatientController {
	@Autowired
	private PatientService ps;
	private PatientDto pd;
	//build add employee rest api
	@PostMapping("/register")
	public ResponseEntity<PatientDto> createPatient(@RequestBody PatientDto patientDto)
	{
		PatientDto savedPatientDto=ps.createPatient(patientDto);
		return new ResponseEntity<>(savedPatientDto,HttpStatus.CREATED);
	}
	@GetMapping("/id/{id}")
	public ResponseEntity<PatientDto> getPatientById(@PathVariable Long id) throws ResourceNotFoundException
	{
		PatientDto pat=ps.getPatientById(id);
		return ResponseEntity.ok(pat);
	}
	
	@GetMapping("/allPatients")
	public ResponseEntity<List<PatientDto>> getPatients() 
	{
		List<PatientDto> allPat=ps.getAllPatients();
		return ResponseEntity.ok(allPat);
	}
	
	@PutMapping("{id}")
	public ResponseEntity<PatientDto> updatePatient(@PathVariable Long id,@RequestBody PatientDto pd) throws ResourceNotFoundException
	{
		PatientDto patDto=ps.updatePatient(id, pd);
		return ResponseEntity.ok(patDto);
	}
	@DeleteMapping("{id}")
	public ResponseEntity<String> deletePatient(@PathVariable Long id) throws ResourceNotFoundException
	{
	    ps.deletePatient(id);
		return ResponseEntity.ok("Patient deleted successfully");
	}
	@PostMapping("/login")
	public boolean loginPatient(@RequestBody User ad) {
		boolean isValid = ps.login(ad.getEmail(), ad.getPassword());
		if(isValid) {
			return true;

		}
		return false;
	}

	@GetMapping("{email}")
	public ResponseEntity<PatientDto> getPatientById(@PathVariable String email) throws ResourceNotFoundException {
		PatientDto pat = ps.getPatientByEmail(email);
		return ResponseEntity.ok(pat);
	}
}