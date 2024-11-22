package com.mydata.hms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mydata.hms.entity.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long>{
	List<Appointment> findByDoctorId(long doctorId);
	List<Appointment> findByPatientId(long patientId);

}
