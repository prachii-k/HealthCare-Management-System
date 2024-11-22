package com.mydata.hms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mydata.hms.entity.Admin;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AdminRepository extends JpaRepository<Admin, Long> {
	@Query(value = "SELECT a.password FROM Admin a WHERE a.email = :email", nativeQuery = true)
	String findPasswordByEmail(@Param("email") String email);

}
