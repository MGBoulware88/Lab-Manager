package com.mgbholdinsinc.labmanager.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.mgbholdinsinc.labmanager.models.Patient;

public interface PatientRepository extends CrudRepository<Patient, Long>{
	List<Patient> findAll();
}