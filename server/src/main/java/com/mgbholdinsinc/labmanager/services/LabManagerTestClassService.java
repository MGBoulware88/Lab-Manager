package com.mgbholdinsinc.labmanager.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mgbholdinsinc.labmanager.models.LabManagerTestClass;
import com.mgbholdinsinc.labmanager.repositories.LabManagerTestClassRepository;

@Service
public class LabManagerTestClassService {
	@Autowired
	LabManagerTestClassRepository testingRepo;
	
	//create
	public LabManagerTestClass create(LabManagerTestClass test) {
		return testingRepo.save(test);
		
	}
	
	//get
	public LabManagerTestClass getOne(Long id) {
		Optional<LabManagerTestClass> maybeThing = testingRepo.findById(id);
		if (maybeThing.isPresent()) {
			return maybeThing.get();
		} else return null;
	}
}
