package com.mydata.hms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DoctorDto {
	private long id;
	private String doctorName;
	private String email;
	private String gender;
	private String password;
	private String specialist;
	private long contactNo;
	private long experience;
	private long age;
}
