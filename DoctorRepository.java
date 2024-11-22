package com.mydata.hms.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mydata.hms.entity.Doctor;

	public interface DoctorRepository extends JpaRepository<Doctor, Long>{
		@Query("SELECT d.password FROM Doctor d WHERE d.email = :email")
	    String findPasswordByEmail(@Param("email") String email);

		Doctor findByEmail(String email);
	}



