package com.mydata.hms.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mydata.hms.dto.DoctorDto;
import com.mydata.hms.entity.Appointment;
import com.mydata.hms.entity.Doctor;
import com.mydata.hms.exception.ResourceNotFoundException;
import com.mydata.hms.service.AppointmentService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/appointment")
public class AppointmentController {
	@Autowired
	AppointmentService as;
	@PostMapping
	public String addAppointment(@RequestBody Appointment app) {
		as.addAppointment(app);
		return "Appointment Done";	
	}
	@GetMapping
	public ResponseEntity<List<Appointment>> getAllAppointment(){
		List<Appointment> allApps=as.getallAppointments();
		return ResponseEntity.ok(allApps);
	}
	@GetMapping("doctor/{id}")
	public ResponseEntity<List<Appointment>> getAppointmentByDoctorId(@PathVariable Long id){
		List<Appointment> allapps=as.getAppointmentByDoctorId(id);
		return ResponseEntity.ok(allapps);
	}
	@GetMapping("patient/{id}")
	public ResponseEntity<List<Appointment>> getAppointmentByPatientId(@PathVariable Long id){
		List<Appointment> allapps=as.getAppointmentByPatientId(id);
		return ResponseEntity.ok(allapps);
	}
	@PutMapping("/admin/assign/doctor/{id}")
	public ResponseEntity<Appointment> assignDoctor(@PathVariable Long id ,@RequestBody Doctor doctor){
		Appointment app =as.assignAppointment(id, doctor);
		return ResponseEntity.ok(app);	
	}
	@GetMapping("{id}")
	public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long id) 
	{
		Appointment app=as.getAppointmentById(id);
		return ResponseEntity.ok(app);
	}

	@DeleteMapping("/deleteAppointment/{id}")
	public String deleteAppointmentById(@PathVariable Long id){
		as.deleteAppointmentById(id);
		return "Appointment Delete";
	}

	@PutMapping("updateAppointmentById/{id}")
	public ResponseEntity<?> updateAppointmentNyId(@PathVariable Long id, @RequestBody Appointment appointment){
		boolean isUpdated = as.updateAppointmentById(id,appointment);

		if(isUpdated)
			return ResponseEntity.ok(true);

		return ResponseEntity.status(500).build();
	}

	@PutMapping("updateAppointmentPrescription/{id}")
	public ResponseEntity<?> updateAppointment(@PathVariable Long id, @RequestBody Appointment appointment){
		boolean isUpdated = as.updateAppointmentPrescription(id,appointment);

		if(isUpdated)
			return ResponseEntity.ok(true);

		return ResponseEntity.status(500).build();
	}
}
