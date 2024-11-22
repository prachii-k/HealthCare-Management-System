package com.mydata.hms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientDto {
	private long id;
	private String patientName;
	private String email;
	private String password;
	private String gender;
	private String bloodGroup;
	private long contactNo;
	private long age;
}
