package com.mydata.hms.mapper;

import com.mydata.hms.dto.DoctorDto;
import com.mydata.hms.entity.Doctor;

public class DoctorMapper {
	public static DoctorDto mapToDoctorDto(Doctor doctor) {
		return new DoctorDto(doctor.getId(), doctor.getDoctorName(), doctor.getEmail(), doctor.getGender(), doctor.getPassword(), doctor.getSpecialist(), doctor.getContactNo(), doctor.getExperience(), doctor.getAge());
	}
	
	public static Doctor mapToDoctor(DoctorDto doctorDto) {
		return new Doctor(doctorDto.getId(), doctorDto.getDoctorName(), doctorDto.getEmail(), doctorDto.getGender(), doctorDto.getPassword(), doctorDto.getSpecialist(), doctorDto.getContactNo(), doctorDto.getExperience(), doctorDto.getAge());
	}
}
