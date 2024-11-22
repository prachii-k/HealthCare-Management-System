package com.mydata.hms.controller;

import java.util.List;

import com.mydata.hms.dto.PatientDto;
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

import com.mydata.hms.dto.DoctorDto;
import com.mydata.hms.entity.Admin;
import com.mydata.hms.entity.User;
import com.mydata.hms.exception.ResourceNotFoundException;
import com.mydata.hms.service.DoctorService;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/doctors")
public class DoctorController {
	@Autowired
	private DoctorService ds;
	private DoctorDto dd;
	//build add employee rest api
	@PostMapping("/register")
	public ResponseEntity<DoctorDto> createDoctor(@RequestBody DoctorDto doctorDto)
	{
		DoctorDto savedDoctorDto=ds.createDoctor(doctorDto);
		return new ResponseEntity<>(savedDoctorDto,HttpStatus.CREATED);
	}
//	@GetMapping("{id}")
//	public ResponseEntity<DoctorDto> getDoctorById(@PathVariable Long id) throws ResourceNotFoundException
//	{
//		DoctorDto doc=ds.getDoctorById(id);
//		return ResponseEntity.ok(doc);
//	}
	
	@GetMapping("/allDoctors")
	public ResponseEntity<List<DoctorDto>> getDoctors() 
	{
		List<DoctorDto> allDoc=ds.getAllDoctors();
		return ResponseEntity.ok(allDoc);
	}
	
	@PutMapping("{id}")
	public ResponseEntity<DoctorDto> updateDoctor(@PathVariable Long id,@RequestBody DoctorDto dd) throws ResourceNotFoundException
	{
		DoctorDto docDto=ds.updateDoctor(id, dd);
		return ResponseEntity.ok(docDto);
	}
	@DeleteMapping("{id}")
	public ResponseEntity<String> deleteDoctor(@PathVariable Long id) throws ResourceNotFoundException
	{
	    ds.deleteDoctor(id);
		return ResponseEntity.ok("Doctor deleted successfully");
	}

	@PostMapping("/login")
	public boolean loginDoctor(@RequestBody User ad) {
		boolean isValid = ds.login(ad.getEmail(), ad.getPassword());
		if(isValid) {
			return true;
			
		}
		return false;
	}

	@GetMapping("{email}")
	public ResponseEntity<DoctorDto> getDoctorByEmail(@PathVariable String email) throws ResourceNotFoundException {
		DoctorDto doctor = ds.findDoctorByEmail(email);
		return ResponseEntity.ok(doctor);
	}
	
//	@GetMapping("specialist/all")
//	public ResponseEntity<List<DoctorDto>> getallspecialist()
//	{
//		List<DoctorDto> allDoc=ds.getAllspecialists();
//		return ResponseEntity.ok(allDoc);
//		
//	}
}

	
	
	
	


