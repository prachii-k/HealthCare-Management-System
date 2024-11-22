package com.mydata.hms.service;

import java.util.List;

import com.mydata.hms.dto.DoctorDto;
import com.mydata.hms.exception.ResourceNotFoundException;

public interface DoctorService {
	public DoctorDto createDoctor(DoctorDto doctorDto);
	public DoctorDto getDoctorById(Long Id) throws ResourceNotFoundException;
	
	public List<DoctorDto> getAllDoctors() ;
	public DoctorDto updateDoctor(Long id,DoctorDto dd) throws ResourceNotFoundException; 
		public void deleteDoctor(Long id) throws ResourceNotFoundException;
		public boolean login(String email, String password);

		DoctorDto findDoctorByEmail(String email);

}
