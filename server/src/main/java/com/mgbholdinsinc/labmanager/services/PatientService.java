package com.mgbholdinsinc.labmanager.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mgbholdinsinc.labmanager.models.Patient;
import com.mgbholdinsinc.labmanager.repositories.PatientRepository;

@Service
public class PatientService {
	@Autowired
	private PatientRepository patientRepo;
	// get all
	public List<Patient> findAllPatients() {
		List<Patient> allPatients = patientRepo.findAll();
		return allPatients;
	}

	// get one by ID
	public Patient findPatientById(Long id) {
		Optional<Patient> optionalPatient = patientRepo.findById(id);
		if (optionalPatient.isPresent()) {
			return optionalPatient.get();
		} else
			return null;
	}

	// create one
	public Patient createPatient(Patient patient) {
		return patientRepo.save(patient);
	}

	// update one by ID
	public Patient updatePatient(Patient patient) {
		return patientRepo.save(patient);
	}

	// delete one by ID
	public void deletePatientById(long id) {
		patientRepo.deleteById(id);
	}
}
