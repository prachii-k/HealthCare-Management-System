package com.mydata.hms.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mydata.hms.entity.Patient;

	public interface PatientRepository extends JpaRepository<Patient, Long>{
		@Query(value ="SELECT p.password FROM Patients p WHERE p.email = :email",nativeQuery = true)
	    String findPasswordByEmail(@Param("email") String email);

		Patient findByEmail(String email);
	}



