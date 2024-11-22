package com.mydata.hms.service;

import java.util.List;
import java.util.stream.Collectors;

import com.mydata.hms.entity.Appointment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mydata.hms.dto.DoctorDto;
import com.mydata.hms.entity.Doctor;
import com.mydata.hms.exception.ResourceNotFoundException;
import com.mydata.hms.mapper.DoctorMapper;
import com.mydata.hms.repository.DoctorRepository;

@Service
public class DoctorServiceImpl implements DoctorService{
	@Autowired
	private DoctorRepository doctorRepository;

	@Autowired
	private AppointmentService appointmentService;

	@Override
	public DoctorDto createDoctor(DoctorDto doctorDto) {
		Doctor doctor=DoctorMapper.mapToDoctor(doctorDto);
		Doctor savedDoctor=doctorRepository.save(doctor);
		DoctorDto ddDto=DoctorMapper.mapToDoctorDto(savedDoctor);
		return ddDto;
	}
	@Override
	public DoctorDto getDoctorById(Long docId) throws ResourceNotFoundException{
		Doctor doc=doctorRepository.findById(docId).orElseThrow(() ->
		new ResourceNotFoundException("doctor is not exit with given is:"+docId));
		
		
		return DoctorMapper.mapToDoctorDto(doc);
	}
	@Override
	public List<DoctorDto> getAllDoctors() {
		List<Doctor> allDoc=doctorRepository.findAll();
		
		return allDoc.stream()
					 .map((doc) -> DoctorMapper.mapToDoctorDto(doc))
					 .collect(Collectors.toList());
		
	}
	@Override
	public DoctorDto updateDoctor(Long id, DoctorDto dd) throws ResourceNotFoundException {
		Doctor d=doctorRepository.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("doctor is not exit with given id"+id));
//		d.setDrname(dd.getDrname());
//		d.setAge(dd.getAge());
//		d.setGender(dd.getGender());
//        d.setSpecialist(dd.getSpecialist());
//		d.setExperience(dd.getExperience());
//		d.setEmail(dd.getEmail());
//		d.setPass(dd.getPass());
//		d.setContact(dd.getContact());
		Doctor updateDoc=doctorRepository.save(d);
		
		return DoctorMapper.mapToDoctorDto(updateDoc);
	}
	@Override
	public void deleteDoctor(Long id) throws ResourceNotFoundException {
		Doctor d=doctorRepository.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("doctor is not exit with given id"+id));

		List<Appointment> appointmentList = appointmentService.getAppointmentByDoctorId(id);
		appointmentList.forEach(appointment -> appointmentService.assignAppointment(appointment.getId(),null));

		doctorRepository.deleteById(id);
	}
//	public List<DoctorDto> getAllspecialists()
//	{
//		doctorRepository
	//}
	@Override
	public boolean login(String email, String password) {
		String dbPass=doctorRepository.findPasswordByEmail(email);
		if(dbPass.equals(password)) {
			return true;
		}
		return false;
		
	}

	@Override
	public DoctorDto findDoctorByEmail(String email) {
		Doctor doctor = doctorRepository.findByEmail(email);

		return DoctorMapper.mapToDoctorDto(doctor);
	}


}
