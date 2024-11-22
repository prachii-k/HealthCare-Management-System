package com.mydata.hms.service;

import java.util.List;

import com.mydata.hms.dto.PatientDto;
import com.mydata.hms.exception.ResourceNotFoundException;

public interface PatientService {
	public PatientDto createPatient(PatientDto patientDto);
	public PatientDto getPatientById(Long Id) throws ResourceNotFoundException;
	
	public List<PatientDto> getAllPatients() ;
	public PatientDto updatePatient(Long id,PatientDto pd) throws ResourceNotFoundException; 
		public void deletePatient(Long id) throws ResourceNotFoundException;
		public boolean login(String email, String password);

	PatientDto getPatientByEmail(String email);
}
