package com.mydata.hms.service;

import java.util.List;
import java.util.Optional;

import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mydata.hms.entity.Appointment;
import com.mydata.hms.entity.Doctor;
import com.mydata.hms.repository.AppointmentRepository;

@Service
public class AppointmentService {
 @Autowired
 AppointmentRepository appointrepo;
 public List<Appointment> getallAppointments()
 {
	return appointrepo.findAll();
	 
 }
 public List<Appointment>getAppointmentByDoctorId(Long appoId) {
		List<Appointment> appo=appointrepo.findByDoctorId(appoId);
	   return appo;
	}
 public List<Appointment>getAppointmentByPatientId(Long appoId) {
		List<Appointment> appo=appointrepo.findByPatientId(appoId);
	   return appo;
	}
 public Appointment getAppointmentById(Long appoId) {
	 	Appointment app=appointrepo.findById(appoId).get();
	   return app;
	}
 public void addAppointment(Appointment app) {
	 Appointment savedAppointment = appointrepo.save(app);
 }
	 public Appointment assignAppointment(Long id,Doctor doctor) {
		 Appointment app =appointrepo.findById(id).get();
		 app.setDoctor(doctor);
		 appointrepo.save(app);
		 return app;
	 }

	public void deleteAppointmentById(Long id) {
	 	appointrepo.deleteById(id);
	}

	@SneakyThrows
	public boolean updateAppointmentById(Long id, Appointment newAppointment) {
		Optional<Appointment> optionalAppointment = appointrepo.findById(id);

		if(optionalAppointment.isPresent()){
			Appointment appointment = optionalAppointment.get();

			appointment.setProblem(newAppointment.getProblem());
			appointment.setAppointmentDate(newAppointment.getAppointmentDate());
			try{
				appointrepo.save(appointment);
			} catch (Exception e){
				System.out.println("Error updating appointment");
				System.out.println("error : "+ e.getMessage());
			}
            return true;
		} else {
			throw new Exception("Appointment does not exist with id "+id);
		}
	}

	@SneakyThrows
	public boolean updateAppointmentPrescription(Long id, Appointment newAppointment) {
		Optional<Appointment> optionalAppointment = appointrepo.findById(id);

		if(optionalAppointment.isPresent()){
			Appointment appointment = optionalAppointment.get();
			appointment.setPrescription(newAppointment.getPrescription());
			appointment.setProblem(newAppointment.getProblem());
			appointment.setAppointmentDate(newAppointment.getAppointmentDate());
			try{
				appointrepo.save(appointment);
			} catch (Exception e){
				System.out.println("Error updating appointment");
				System.out.println("error : "+ e.getMessage());
			}
			return true;
		} else {
			throw new Exception("Appointment does not exist with id "+id);
		}
	}
}
