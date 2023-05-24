package com.mgbholdinsinc.labmanager.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mgbholdinsinc.labmanager.models.Insurance;
import com.mgbholdinsinc.labmanager.repositories.InsuranceRepository;

@Service
public class InsuranceService {
	@Autowired
	private InsuranceRepository insuranceRepo;

	// get all
	public List<Insurance> findAllInsurances() {
		List<Insurance> allInsurances = insuranceRepo.findAll();
		return allInsurances;
	}

	// get one by ID
	public Insurance findInsuranceById(Long id) {
		Optional<Insurance> optionalInsurance = insuranceRepo.findById(id);
		if (optionalInsurance.isPresent()) {
			return optionalInsurance.get();
		} else
			return null;
	}

	// create one
	public Insurance createInsurance(Insurance insurance) {
		return insuranceRepo.save(insurance);
	}

	// update one by ID
	public Insurance updateInsurance(Insurance insurance) {
		return insuranceRepo.save(insurance);
	}

	// delete one by ID
	public void deleteInsuranceById(long id) {
		insuranceRepo.deleteById(id);
	}
}
