package com.mydata.hms.service;

import java.util.List;
import java.util.stream.Collectors;

import com.mydata.hms.entity.Appointment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mydata.hms.dto.PatientDto;
import com.mydata.hms.entity.Patient;
import com.mydata.hms.exception.ResourceNotFoundException;
import com.mydata.hms.mapper.PatientMapper;
import com.mydata.hms.repository.PatientRepository;

@Service
public class PatientServiceImpl implements PatientService{
	@Autowired
	private PatientRepository patientRepository;

	@Autowired
	private AppointmentService appointmentService;

	@Override
	public PatientDto createPatient(PatientDto patientDto) {
		Patient patient=PatientMapper.mapToPatient(patientDto);
		Patient savedPatient=patientRepository.save(patient);
		PatientDto pdDto=PatientMapper.mapToPatientDto(savedPatient);
		return pdDto;
	}
	@Override
	public PatientDto getPatientById(Long patId) throws ResourceNotFoundException{
		Patient pat=patientRepository.findById(patId).orElseThrow(() ->
		new ResourceNotFoundException("patient is not exit with given is:"+patId));
		
		
		return PatientMapper.mapToPatientDto(pat);
	}
	@Override
	public List<PatientDto> getAllPatients() {
		List<Patient> allPat=patientRepository.findAll();
		
		return allPat.stream()
					 .map((pat) -> PatientMapper.mapToPatientDto(pat))
					 .collect(Collectors.toList());
		
	}
	@Override
	public PatientDto updatePatient(Long id,PatientDto pd) throws ResourceNotFoundException {
		Patient p=patientRepository.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("patient is not exit with given id"+id));
//		p.setName(pd.getName());
//		p.setAge(pd.getAge());
//		p.setGender(pd.getGender());
//        p.setBloodgroup(pd.getBloodgroup());
//		p.setEmail(pd.getEmail());
//		p.setPass(pd.getPass());
//		p.setContactno(pd.getContactno());
        
		Patient updatePat=patientRepository.save(p);
		return PatientMapper.mapToPatientDto(updatePat);
	}
	@Override
	public void deletePatient(Long id) throws ResourceNotFoundException {
		Patient d=patientRepository.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("doctor is not exit with given id"+id));

		List<Appointment> appointmentList = appointmentService.getAppointmentByPatientId(id);
		appointmentList.forEach(appointment -> appointmentService.deleteAppointmentById(appointment.getId()));

		patientRepository.deleteById(id);
	}
	@Override
	public boolean login(String email, String password) {
		String dbPass=patientRepository.findPasswordByEmail(email);
		if(dbPass.equals(password)) {
			return true;
		}
		return false;
	}

	@Override
	public PatientDto getPatientByEmail(String email) {
		Patient patient = patientRepository.findByEmail(email);

		return PatientMapper.mapToPatientDto(patient);
	}


}
