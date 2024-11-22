package com.mydata.hms.mapper;

import com.mydata.hms.dto.PatientDto;
import com.mydata.hms.entity.Patient;

public class PatientMapper {
		public static PatientDto mapToPatientDto(Patient patient) {
			return new PatientDto(patient.getId(), patient.getPatientName(), patient.getEmail(), patient.getPassword(), patient.getGender(), patient.getBloodGroup(), patient.getContactNo(), patient.getAge());
		}
		
		public static Patient mapToPatient(PatientDto patientDto) {
			return new Patient(patientDto.getId(), patientDto.getPatientName(), patientDto.getEmail(), patientDto.getPassword(), patientDto.getGender(), patientDto.getBloodGroup(), patientDto.getContactNo(), patientDto.getAge());
		}
	}

